// Runde C (docs/PRUEFSTAPEL-TRAINING-WOCHENENDE-REGELN.md): (b) Person bei Rollenwechsel, alt gegen neu; (c) Vorgang – erkennt der Kern,
// was zusammengehört? Zwei Stücke desselben Haushalts gelten beim Kern als verbunden, wenn sie eine gleiche Nummer tragen
// (felder.nummern: Aktenzeichen, Kunden-, Vertrags-, Versicherten-, Steuernummer …). Nur berichtet, nicht gewertet.
// Aufruf: node scripts/messen-vorgang.mjs <stapel> [--alt pfad] [--soll SOLL.json] [--json datei]
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { wilson, mcnemar } from "./statistik.mjs";
const WURZEL = fileURLToPath(new URL("..", import.meta.url));
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const O = resolve(WURZEL, process.argv[2]);
const erw = JSON.parse(readFileSync(join(O, "ERWARTUNG.json"), "utf8")).dateien;
const soll = new Map(JSON.parse(readFileSync(join(O, arg("--soll", "SOLL.json")), "utf8")).dateien.map((x) => [x.datei, x]));
const hh = Object.fromEntries(JSON.parse(readFileSync(join(O, "HAUSHALTE.json"), "utf8")).haushalte.map((h) => [h.id, h]));
const norm = (s) => s == null || s === "" ? null : String(s).toLowerCase().replace(/\b(gmbh|ag|e\.?\s?k\.?|kg|ohg|mbh|e\.?\s?v\.?|co\.?|&|und)\b/g, " ").replace(/[^a-zäöüß0-9]+/g, " ").trim() || null;
async function kern(pfad) {
  const L = (f) => import(join(pfad, "lib", f));
  const [{ einlesen }, { siebe }, { personZuordnen }] = await Promise.all([L("einlesen.ts"), L("siebe.ts"), L("personen.ts")]);
  const m = new Map();
  for (const [i, x] of erw.entries()) {
    const [d0] = await einlesen({ pfad: x.datei, name: x.datei, geaendert: Date.UTC(2026, 10, 1) + i, bytes: new Uint8Array(readFileSync(join(O, x.datei))) }, async () => ({ kopf: "", voll: "" }), 0, async () => "");
    const d = siebe(d0, 5, []);
    m.set(x.datei, { nummern: (d.felder.nummern || []).map((n) => n.wert.replace(/[\s./-]/g, "").toLowerCase()).filter((w) => w.length >= 5),
      person: personZuordnen(d.volltext || "", d.felder.betrifft?.wert, hh[x.haushalt])?.wert });
  }
  return m;
}
const neu = await kern(WURZEL), alt = arg("--alt") ? await kern(resolve(WURZEL, arg("--alt"))) : null;
const erg = {};
// (b) Person bei Rollenwechsel
const rw = erw.filter((x) => x.rollenwechsel && soll.get(x.datei) && !(soll.get(x.datei).strittig || []).includes("person") && norm(soll.get(x.datei).person));
const tr = (m, x) => norm(m.get(x.datei).person) === norm(soll.get(x.datei).person);
erg.rollenwechsel = { n: rw.length, neu: rw.filter((x) => tr(neu, x)).length };
if (alt) { erg.rollenwechsel.alt = rw.filter((x) => tr(alt, x)).length; const a = rw.filter((x) => tr(alt, x) && !tr(neu, x)).length, b = rw.filter((x) => !tr(alt, x) && tr(neu, x)).length; erg.rollenwechsel.mcnemar = { nurAlt: a, nurNeu: b, p: mcnemar(a, b) }; }
erg.rollenwechsel.spanneNeu = wilson(erg.rollenwechsel.neu, rw.length);
// (c) Vorgang als Paare im Haushalt
for (const [k, m] of [["neu", neu], ...(alt ? [["alt", alt]] : [])]) {
  let wahr = 0, gefunden = 0, verbunden = 0, verbundenRichtig = 0;
  for (let i = 0; i < erw.length; i++) for (let j = i + 1; j < erw.length; j++) {
    const a = erw[i], b = erw[j]; if (a.haushalt !== b.haushalt) continue;
    const gleich = !!a.vorgang && a.vorgang === b.vorgang;
    const na = new Set(m.get(a.datei).nummern), v = m.get(b.datei).nummern.some((n) => na.has(n));
    if (gleich) { wahr++; if (v) gefunden++; }
    if (v) { verbunden++; if (gleich) verbundenRichtig++; }
  }
  erg[`vorgang_${k}`] = { paareImVorgang: wahr, davonVerbunden: gefunden, trefferquote: wahr ? gefunden / wahr : null, verbundenePaare: verbunden, davonImSelbenVorgang: verbundenRichtig, genauigkeit: verbunden ? verbundenRichtig / verbunden : null };
}
console.log(JSON.stringify(erg, null, 1));
if (arg("--json")) writeFileSync(resolve(WURZEL, arg("--json")), JSON.stringify(erg, null, 1));
