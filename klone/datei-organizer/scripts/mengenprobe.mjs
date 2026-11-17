// Mengen- und Tempoprobe (Block 1 der Trainings-Sitzung 14.11.2026): erfundene Dateien durch den Kern und den Block-Lauf der App,
// ohne Agenten. Bildet den Ablauf von src/app.tsx (einlesenAus) nach: Datei für Datei einlesen, nach je BLOCK Dateien den Stand
// merken (Lauf), am Ende doppelteMarkieren, dann Sieb 2–5 über alle und absenderVereinheitlichen. Gemessen je Stufe: Zeit je 1.000
// Dateien, Spitzenspeicher (Heap), Größe des gemerkten Stands. Texterkennung ist abgeschaltet (Bilder und Scans ohne Text), ihre Kosten
// werden getrennt gemessen (scripts/leser-node.mjs zählt sie) und hochgerechnet.
// Aufruf: node --expose-gc scripts/mengenprobe.mjs <ordner>[,<ordner>…] [--bis 50000] [--stufen 1000,5000,20000,50000]
//   [--merken idb|arbeit|keins] [--abbruch 0.6] [--json datei]
//   --merken idb    : Stand wie ohne Arbeitsordner (IndexedDB: der ganze Lauf je Block, Kosten = structuredClone)
//   --merken arbeit : Stand wie mit Arbeitsordner (ArbeitSpeicher.laufSpeichern: Teile zu 1.000, JSON)
//   --abbruch x     : nach dem Anteil x anhalten, den gemerkten Stand wie nach einem Neustart laden und weitermachen;
//                     danach wird geprüft, ob das Ergebnis dasselbe ist wie in einem Zug.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { performance } from "node:perf_hooks";
import { einlesen, doppelteMarkieren, ueberspringen } from "../lib/einlesen.ts";
import { siebe } from "../lib/siebe.ts";
import { absenderVereinheitlichen } from "../lib/abgleich.ts";
import { BLOCK, schluessel, fortsetzen, LaufSchreiber, laufAusTeilen } from "../src/lauf.ts";
import { pdfLeser } from "./leser-node.mjs";

// wie src/arbeit.ts (dort mit Browser-Abhängigkeiten, deshalb hier gespiegelt): Teile zu 1.000, Text im Speicher bis 20.000 Zeichen
const TEIL = 1000, TEXT_IM_SPEICHER = 20_000;
const schlank = (d) => !d.volltext || d.volltext.length <= TEXT_IM_SPEICHER ? { d } : { d: { ...d, volltext: d.volltext.slice(0, TEXT_IM_SPEICHER) }, lang: d.volltext };
const WURZEL = fileURLToPath(new URL("..", import.meta.url));
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const ORDNER = process.argv[2].split(",").map((o) => resolve(WURZEL, o));
const BIS = Number(arg("--bis", 50000));
const STUFEN = arg("--stufen", "1000,5000,20000,50000").split(",").map(Number).filter((n) => n <= BIS);
const MERKEN = arg("--merken", "idb");
const ABBRUCH = Number(arg("--abbruch", 0));
// --fassung vorher: Stand merken wie bis 0.4.3 (ganzer Lauf je Block); nachher: LaufSchreiber (nur neue Teile, src/lauf.ts)
const FASSUNG = arg("--fassung", "nachher");
const gc = globalThis.gc || (() => {});

// Quellliste wie q.dateien() der App: Pfad, Name, Änderungszeit, Größe; Bytes erst beim Lesen
const liste = [];
for (const o of ORDNER) for (const [i, p] of JSON.parse(readFileSync(join(o, "dateien.json"), "utf8")).entries()) {
  if (liste.length >= BIS) break;
  if (ueberspringen(p.split("/").pop())) continue;
  liste.push({ pfad: `${o.split("/").pop()}/${p}`, name: p.split("/").pop(), geaendert: Date.UTC(2026, 10, 1) + liste.length, voll: join(o, p) });
}
const lesePdf = pdfLeser(false);
let heapSpitze = 0; const heap = () => { const h = process.memoryUsage().heapUsed; if (h > heapSpitze) heapSpitze = h; return h; };

// Gemerkter Stand: idb = ganzer Lauf je Block (structuredClone wie IndexedDB.put), arbeit = Teile zu TEIL, nur geänderte (wie ArbeitSpeicher)
function merker(art) {
  if (FASSUNG === "nachher" && art !== "keins") {
    // dieselbe Ablage wie in der App, nur im Speicher: IndexedDB kopiert strukturiert, der Arbeitsordner schreibt JSON
    const lager = new Map(); let bytes = 0, schreibvorgaenge = 0;
    const ablage = { schreiben: async (n, w) => { schreibvorgaenge++; if (art === "idb") lager.set(n, structuredClone(w)); else { const t = JSON.stringify(w); bytes += t.length; lager.set(n, t); } },
      lesen: async (n) => { const x = lager.get(n); return x === undefined ? null : art === "idb" ? structuredClone(x) : JSON.parse(x); } };
    let sch = new LaufSchreiber(ablage);
    return { merken: (l) => sch.merken(l), neu: () => { sch = new LaufSchreiber(ablage); }, laden: () => laufAusTeilen(ablage), stand: () => ({ schreibvorgaenge, geschriebenMB: Math.round(bytes / 1e5) / 10 }) };
  }
  const zuletzt = new Map(); let bytes = 0, schreibvorgaenge = 0, gespeichert = null;
  const abdruck = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return `${s.length}:${h >>> 0}`; };
  return {
    neu() {},
    merken(l) {
      if (art === "keins") return;
      if (art === "idb") { gespeichert = structuredClone(l); schreibvorgaenge++; return; }
      const teile = Math.ceil(l.dateien.length / TEIL), aus = {};
      for (let i = 0; i < teile; i++) { const t = JSON.stringify(l.dateien.slice(i * TEIL, (i + 1) * TEIL)), a = abdruck(t); if (zuletzt.get(i) !== a) { zuletzt.set(i, a); bytes += t.length; schreibvorgaenge++; } aus[i] = t; }
      const { dateien, ...rest } = l; gespeichert = { meta: JSON.stringify(rest), teile: aus };
    },
    laden() { if (!gespeichert) return null; if (art === "idb") return structuredClone(gespeichert);
      return { ...JSON.parse(gespeichert.meta), dateien: Object.keys(gespeichert.teile).sort((a, b) => a - b).flatMap((k) => JSON.parse(gespeichert.teile[k])) }; },
    stand: () => ({ schreibvorgaenge, geschriebenMB: Math.round(bytes / 1e5) / 10 }),
  };
}

async function lauf(menge, m, { abbrechenBei = 0, vorher = null } = {}) {
  const teil = liste.slice(0, menge);
  const t = { lesen: 0, merken: 0 };
  let neu = [], erledigt = new Set(); m.neu();
  if (vorher) { const f = fortsetzen(vorher, teil); neu = [...f.fertig]; erledigt = f.erledigt; }
  const laufStand = () => ({ fassung: 1, quelleName: "Probe", quelleArt: "ordner", dazu: false, gesamt: teil.length, erledigt: [...erledigt], dateien: neu, begonnen: "", zeit: "" });
  let seitBlock = 0;
  const offen = teil.filter((q) => !erledigt.has(schluessel(q)));
  for (const qd of offen) {
    if (abbrechenBei && erledigt.size >= abbrechenBei) return { abgebrochen: true };
    const a = performance.now();
    const bytes = new Uint8Array(readFileSync(qd.voll));
    let teile = await einlesen({ pfad: qd.pfad, name: qd.name, geaendert: qd.geaendert, bytes }, lesePdf, 0, undefined, undefined);
    if (MERKEN === "arbeit") teile = teile.map((x) => schlank(x).d);
    neu.push(...teile); erledigt.add(schluessel(qd));
    t.lesen += performance.now() - a;
    if (++seitBlock >= BLOCK) { seitBlock = 0; const b = performance.now(); if (teil.length > BLOCK && erledigt.size < teil.length) await m.merken(laufStand()); t.merken += performance.now() - b; heap(); }
  }
  let x = performance.now(); let d = doppelteMarkieren(neu); t.doppelt = performance.now() - x; heap();
  x = performance.now(); for (let s = 2; s <= 5; s++) { d = d.map((y) => siebe(y, s, [])); if (s >= 4) d = absenderVereinheitlichen(d); } t.siebe = performance.now() - x; heap();
  return { dateien: d, zeit: t };
}

const ergebnis = { ordner: ORDNER.map((o) => o.replace(WURZEL, "")), quelldateien: liste.length, block: BLOCK, merken: MERKEN, stufen: [] };
ergebnis.fassung = FASSUNG;
console.log(`${liste.length} Quelldateien · Block ${BLOCK} · Stand merken: ${MERKEN} (${FASSUNG})`);
console.log("Menge     Dateien  lesen/1000  merken/1000  doppelt  Siebe 2–5  gesamt     Heap-Spitze  Schreibvorgänge");
for (const n of STUFEN) {
  gc(); heapSpitze = 0; const m = merker(MERKEN), a = performance.now();
  const r = await lauf(n, m);
  const ges = performance.now() - a, k = Math.min(n, liste.length) / 1000;
  const z = { menge: Math.min(n, liste.length), dateien: r.dateien.length, ms: Object.fromEntries(Object.entries(r.zeit).map(([x, v]) => [x, Math.round(v)])), gesamtS: Math.round(ges / 100) / 10,
    msJe1000: Object.fromEntries(Object.entries(r.zeit).map(([x, v]) => [x, Math.round(v / k)])), heapSpitzeMB: Math.round(heapSpitze / 1e6), ...m.stand() };
  ergebnis.stufen.push(z);
  console.log(`${String(z.menge).padEnd(10)}${String(z.dateien).padEnd(9)}${String(z.msJe1000.lesen).padStart(8)} ms${String(z.msJe1000.merken).padStart(10)} ms${String(z.ms.doppelt).padStart(8)} ms${String(z.ms.siebe).padStart(9)} ms${String(z.gesamtS).padStart(8)} s${String(z.heapSpitzeMB).padStart(10)} MB${String(z.schreibvorgaenge).padStart(10)}`);
}
if (ABBRUCH) {
  const n = STUFEN.at(-1), m = merker(MERKEN === "keins" ? "idb" : MERKEN);
  await lauf(n, m, { abbrechenBei: Math.floor(Math.min(n, liste.length) * ABBRUCH) });
  const r2 = await lauf(n, m, { vorher: await m.laden() });
  const r1 = await lauf(n, merker("keins"));
  const kurz = (d) => JSON.stringify(d.map((x) => [x.pfad, x.sha256, x.doppeltVon || "", x.felder.kategorie?.wert, x.felder.absender?.wert, x.felder.schriftstueck?.wert]).sort());
  ergebnis.abbruch = { bei: ABBRUCH, gleichesErgebnis: kurz(r1.dateien) === kurz(r2.dateien), dateien: r2.dateien.length };
  console.log(`Abbruch bei ${Math.round(ABBRUCH * 100)} %, gemerkten Stand geladen, weitergemacht: Ergebnis ${ergebnis.abbruch.gleichesErgebnis ? "gleich" : "ANDERS"} als in einem Zug (${r2.dateien.length} Dateien).`);
}
if (arg("--json")) writeFileSync(resolve(WURZEL, arg("--json")), JSON.stringify(ergebnis, null, 1));
process.exit(0);
