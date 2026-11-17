// Briefe (Textdateien) mit dem Sortier-Kern lesen und je Feld gegen ein Soll werten – für alt/neu-Vergleiche (docs/PRUEFSTAPEL-BRIEFE-2-REGELN.md).
// Aufruf: node scripts/messen-briefe.mjs <ordner>[,<ordner>…] [--kern pfad-zum-repo] [--alt pfad-zum-alten-repo] [--soll ERWARTUNG.json|mehrheit] [--json datei] [--fehler feld]
//   --gesetzt <ordner>: statt der Texte die gesetzten Stücke (scripts/setzen-komplex.py, SETZEN.json) lesen – PDF mit Textebene,
//                       PDF nur aus Seitenbildern und Fotos, mit der Texterkennung wie in der App (scripts/leser-node.mjs).
//   --soll mehrheit: Mehrheit aus ERWARTUNG.json, ZWEITER.json, DRITTER.json (je Feld; ohne Mehrheit nicht gewertet).
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { wilson, mcnemar } from "/home/user/Datei-Organizer/scripts/statistik.mjs";

const WURZEL = "/home/user/Datei-Organizer/";
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const ordner = process.argv[2].split(",").flatMap((p) => { const v = resolve(WURZEL, p); return existsSync(join(v, "ERWARTUNG.json")) ? [v] : readdirSync(v).map((u) => join(v, u)).filter((u) => statSync(u).isDirectory() && existsSync(join(u, "ERWARTUNG.json"))); });
const GROB = { "Arbeit & Sozialversicherung": "Rente, Arbeit & Sozialversicherung", "Rente": "Rente, Arbeit & Sozialversicherung", "Einkäufe": "Einkäufe, Rechnungen & Garantien", "Rechnungen & Garantien": "Einkäufe, Rechnungen & Garantien", "Erbschaft": "Erbschaft, Vollmachten & Vorsorge", "Vollmachten & Vorsorge": "Erbschaft, Vollmachten & Vorsorge" };
const norm = (s) => s == null || s === "" || s === "null" ? null : String(s).toLowerCase().replace(/\b(gmbh|ag|e\.?\s?k\.?|kg|ohg|mbh|e\.?\s?v\.?|co\.?|&|und)\b/g, " ").replace(/[^a-zäöüß0-9]+/g, " ").trim() || null;
const leer = (v) => v == null || v === "" || v === "null" ? null : v;
const FORM = { bereich: (x) => { const b = leer(x.bereich ?? x.kategorie); return b ? (GROB[b] ?? b) : null; }, schriftstueck: (x) => leer(x.schriftstueck), absender: (x) => norm(x.absender), person: (x) => norm(x.person), frist: (x) => leer(x.frist) };
const FELDER = Object.keys(FORM);

const GESETZT = arg("--gesetzt") ? resolve(WURZEL, arg("--gesetzt")) : null;
const SETZEN = GESETZT ? JSON.parse(readFileSync(join(GESETZT, "SETZEN.json"), "utf8")) : null;
const leser = GESETZT ? await import("./leser-node.mjs") : null;
const TEXTE = new Map();
const quelle = (o, datei) => SETZEN ? { pfad: join(GESETZT, SETZEN[datei].datei), name: SETZEN[datei].datei.split("/").pop() } : { pfad: join(o, datei), name: datei };
async function kern(pfad) {
  const L = (f) => import(join(pfad, "lib", f));
  const [{ einlesen }, { siebe }, { absenderVereinheitlichen }, { personZuordnen }] = await Promise.all([L("einlesen.ts"), L("siebe.ts"), L("abgleich.ts"), L("personen.ts")]);
  return async (o) => {
    const e = JSON.parse(readFileSync(join(o, "ERWARTUNG.json"), "utf8")).dateien;
    const hh = existsSync(join(o, "HAUSHALTE.json")) ? Object.fromEntries(JSON.parse(readFileSync(join(o, "HAUSHALTE.json"), "utf8")).haushalte.map((h) => [h.id, h])) : {};
    let ds = [];
    for (const [i, x] of e.entries()) { if (SETZEN?.[x.datei]?.inScanVon) continue; const q = quelle(o, x.datei);
      const t = await einlesen({ pfad: x.datei, name: q.name, geaendert: Date.UTC(2026, 10, 1) + i, bytes: new Uint8Array(readFileSync(q.pfad)) }, leser ? leser.pdfLeser(true) : async () => "", 0, leser ? leser.ocr : async () => "");
      t[0].pfad = x.datei; ds.push(...t); }
    const org = new Map(absenderVereinheitlichen(ds.map((d) => siebe(d, 5, []))).map((d) => [d.pfad, d]));
    return new Map(e.map((x) => { const d = org.get(x.datei), h = hh[x.haushalt], f = d?.felder || {};
      const p = h && d ? personZuordnen(`${d.email?.an || ""}\n${d.volltext || ""}`, f.betrifft?.wert, h) : undefined;
      const w = { bereich: f.kategorie, schriftstueck: f.schriftstueck, absender: f.absender, person: p, frist: f.frist };
      if (SETZEN && d) TEXTE.set(x.datei, d.volltext || "");
      return [x.datei, { wert: Object.fromEntries(FELDER.map((k) => [k, FORM[k]({ [k]: w[k]?.wert })])), sicher: Object.fromEntries(FELDER.map((k) => [k, !!w[k]?.sicher])), zweit: f.kategorie?.zweitfach ?? null }]; }));
  };
}
function soll(o) {
  // --soll SOLL.json: Mehrheit der drei Einordner (scripts/soll-aus-einordnern.mjs); strittige Felder werden nicht gewertet
  if (arg("--soll", "").endsWith(".json") && arg("--soll") !== "ERWARTUNG.json") {
    const d = JSON.parse(readFileSync(join(o, arg("--soll")), "utf8")).dateien;
    return new Map(d.map((x) => [x.datei, { ...Object.fromEntries(FELDER.map((k) => [k, (x.strittig || []).includes(k) ? undefined : FORM[k](x)])), zweit: leer(x.zweitfach) }]));
  }
  const e = JSON.parse(readFileSync(join(o, "ERWARTUNG.json"), "utf8"));
  if (arg("--soll") !== "mehrheit") return new Map(e.dateien.map((x) => [x.datei, { ...Object.fromEntries(FELDER.map((k) => [k, FORM[k](x)])), zweit: leer(x.zweitfach) }]));
  const q = [e, ...["ZWEITER.json", "DRITTER.json"].filter((f) => existsSync(join(o, f))).map((f) => JSON.parse(readFileSync(join(o, f), "utf8")))].map((d) => new Map(d.dateien.map((x) => [x.datei, x])));
  return new Map(e.dateien.map((x) => [x.datei, { ...Object.fromEntries(FELDER.map((k) => { const z = new Map(); for (const m of q) { const v = JSON.stringify(m.has(x.datei) ? FORM[k](m.get(x.datei)) : "fehlt"); z.set(v, (z.get(v) || 0) + 1); }
    const [v, n] = [...z.entries()].sort((a, b) => b[1] - a[1])[0]; return [k, n >= 2 ? JSON.parse(v) : undefined]; })), zweit: leer(x.zweitfach) }]));
}
const systeme = { neu: await kern(resolve(WURZEL, arg("--kern", "."))) }; if (arg("--alt")) systeme.alt = await kern(resolve(WURZEL, arg("--alt")));
const erg = { ordner: ordner.map((o) => o.replace(WURZEL, "")), felder: {} }, zeilen = [];
for (const o of ordner) { const s = soll(o), ist = {};
  // gesetzt: ein Stück, das als zweites in einem fremden Scan steckt, ist keine eigene Datei – es zählt nicht einzeln
  if (SETZEN) for (const d of [...s.keys()]) if (SETZEN[d]?.inScanVon) s.delete(d); for (const k of Object.keys(systeme)) ist[k] = await systeme[k](o); for (const [d, sw] of s) zeilen.push({ o, d, soll: sw, ...Object.fromEntries(Object.keys(systeme).map((k) => [k, ist[k].get(d)])) }); }
const pz = (x) => x.n ? `${x.ok}/${x.n} = ${(100 * x.ok / x.n).toFixed(1)} %` + (x.spanne ? ` (${x.spanne.map((v) => (100 * v).toFixed(0)).join("–")} %)` : "") : "nicht gemessen";
console.log(`${zeilen.length} Schriftstücke aus ${ordner.length} Ordner(n), Soll: ${arg("--soll", "ERWARTUNG.json")}`);
for (const f of FELDER) {
  const menge = zeilen.filter((z) => z.soll[f] !== undefined && !((f === "person" || f === "frist") && z.soll[f] === null && (f === "person" || process.env.NUR_FRIST)));
  const r = {};
  for (const k of Object.keys(systeme)) { const tr = (z) => z[k].wert[f] === z.soll[f]; const ok = menge.filter(tr).length;
    r[k] = { ok, n: menge.length, spanne: wilson(ok, menge.length), falschSicher: menge.filter((z) => !tr(z) && z[k].sicher[f]).length, offen: menge.filter((z) => !tr(z) && !z[k].sicher[f]).length };
    if (f === "bereich") r[k].mitZweitfach = menge.filter((z) => tr(z) || (z.soll.zweit && z[k].wert[f] === z.soll.zweit)).length; }
  if (systeme.alt) { const a = menge.filter((z) => z.alt.wert[f] === z.soll[f] && z.neu.wert[f] !== z.soll[f]).length, n = menge.filter((z) => z.neu.wert[f] === z.soll[f] && z.alt.wert[f] !== z.soll[f]).length; r.mcnemar = { nurAltRichtig: a, nurNeuRichtig: n, p: mcnemar(a, n) }; }
  erg.felder[f] = r;
  console.log(`\n== ${f} ==`); for (const k of Object.keys(systeme)) console.log(`  ${k.padEnd(4)} ${pz(r[k])} · falsch und sicher ${r[k].falschSicher} · falsch und offen ${r[k].offen}${f === "bereich" ? ` · Fach oder Zweitfach ${r[k].mitZweitfach}` : ""}`);
  if (r.mcnemar) console.log(`  McNemar: nur alt richtig ${r.mcnemar.nurAltRichtig}, nur neu richtig ${r.mcnemar.nurNeuRichtig}, p=${r.mcnemar.p < 0.001 ? r.mcnemar.p.toExponential(1) : r.mcnemar.p.toFixed(3)}`);
  if (arg("--fehler") === f) for (const z of menge.filter((z) => z.neu.wert[f] !== z.soll[f])) console.log(`    ${z.d}: „${z.neu.wert[f]}“ statt „${z.soll[f]}“${z.neu.sicher[f] ? " (sicher)" : ""}`);
}
// Je Form und Scanqualität (nur mit --gesetzt): Treffer des neuen Kerns je Feld
if (SETZEN) { erg.jeForm = {};
  // Lesegüte je Stück: Wortfehler (Levenshtein auf Wörtern, erste 400) und Anteil gefundener Wörter gegen den reinen Text
  const woerter = (t) => (t || "").toLowerCase().replace(/[^a-z0-9äöüß€,.]+/g, " ").split(" ").filter((w) => w.length > 1);
  const levW = (a, b) => { let v = Array.from({ length: b.length + 1 }, (_, i) => i); for (let i = 1; i <= a.length; i++) { const n = [i]; for (let j = 1; j <= b.length; j++) n[j] = Math.min(v[j] + 1, n[j - 1] + 1, v[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); v = n; } return v[b.length]; };
  const guete = [];
  for (const z of zeilen) { const s0 = SETZEN[z.d]; const k = s0.zweitesStueck ? "zwei-in-einem-scan" : s0.qualitaet ? `${s0.form}/${s0.qualitaet}` : s0.form; const e0 = (erg.jeForm[k] ??= { n: 0 });
    e0.n++; for (const f of FELDER) { if (z.soll[f] === undefined) continue; const x = (e0[f] ??= { n: 0, ok: 0 }); x.n++; if (z.neu.wert[f] === z.soll[f]) x.ok++; }
    if (s0.form !== "pdf-text") { const a = woerter(readFileSync(join(z.o, z.d), "utf8")).slice(0, 400), b = woerter(TEXTE.get(z.d)).slice(0, 600), m = new Set(b);
      guete.push({ datei: z.d, form: k, wortfehler: a.length ? Math.min(1, levW(a, b) / a.length) : 0, gefunden: a.length ? a.filter((w) => m.has(w)).length / a.length : 1,
        richtig: Object.fromEntries(FELDER.filter((f) => z.soll[f] !== undefined).map((f) => [f, z.neu.wert[f] === z.soll[f]])) }); } }
  erg.ocrGuete = {}; for (const g of guete) { const e0 = (erg.ocrGuete[g.form] ??= { n: 0, wortfehler: 0, gefunden: 0 }); e0.n++; e0.wortfehler += g.wortfehler / 1; e0.gefunden += g.gefunden; }
  for (const e0 of Object.values(erg.ocrGuete)) { e0.wortfehler = Math.round(1000 * e0.wortfehler / e0.n) / 1000; e0.gefunden = Math.round(1000 * e0.gefunden / e0.n) / 1000; }
  // Liegt ein Fehler am Lesen oder am Einordnen? Treffer je Feld bei gut gelesenen (≥ 80 % der Wörter gefunden) und schlecht gelesenen Stücken
  erg.lesenOderEinordnen = Object.fromEntries(["gut gelesen", "schlecht gelesen"].map((t) => { const g0 = guete.filter((g) => (g.gefunden >= 0.8) === (t === "gut gelesen"));
    return [t, { n: g0.length, ...Object.fromEntries(FELDER.map((f) => { const m = g0.filter((g) => f in g.richtig); return [f, m.length ? Math.round(100 * m.filter((g) => g.richtig[f]).length / m.length) : null]; })) }]; }));
  writeFileSync(join(GESETZT, "OCR-GUETE.json"), JSON.stringify({ zusammen: erg.ocrGuete, lesenOderEinordnen: erg.lesenOderEinordnen, dateien: guete }, null, 1));
  console.log("\nLesegüte je Form:", JSON.stringify(erg.ocrGuete)); console.log("Lesen oder Einordnen:", JSON.stringify(erg.lesenOderEinordnen));
  console.log("\nJe Form/Güte (neu):"); for (const [k, v] of Object.entries(erg.jeForm).sort()) console.log(`  ${k.padEnd(18)} n=${v.n} ` + FELDER.map((f) => `${f} ${v[f] ? Math.round(100 * v[f].ok / v[f].n) : "–"} %`).join(" · "));
  await leser.beenden(); }
if (arg("--json")) writeFileSync(resolve(WURZEL, arg("--json")), JSON.stringify(erg, null, 1));
