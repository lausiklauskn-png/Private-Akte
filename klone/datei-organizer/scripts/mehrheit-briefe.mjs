// Mehrere unabhängige Einordner am Briefstapel der Familienakte (Gruppenregeln 1–10, docs/PRUEFREGELN-GRUPPE.md):
// Übereinstimmung je Paar und Feld, Fleiss' Kappa, Mehrheits-Soll; danach der Sortier-Kern gegen die Mehrheit, wenn --kern.
// Aufruf: node scripts/mehrheit-briefe.mjs <ordner> [--dateien ZWEITER.json,DRITTER-CLAUDE.json,DRITTER.json] [--json datei]
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const WURZEL = fileURLToPath(new URL("..", import.meta.url));
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const ORDNER = resolve(WURZEL, process.argv[2]);
const lade = (f) => existsSync(join(ORDNER, f)) ? JSON.parse(readFileSync(join(ORDNER, f), "utf8")) : null;
const norm = (s) => s == null || s === "" ? null : String(s).toLowerCase().replace(/\b(gmbh|ag|e\.?\s?k\.?|kg|ohg|mbh|e\.?\s?v\.?|co\.?|&|und)\b/g, " ").replace(/[^a-zäöüß0-9]+/g, " ").trim() || null;
// Der Stapel-Autor schrieb nach der feineren Liste des Kerns (21 Fächer), die Einordner bekamen die Liste der Familienakte (18 Fächer,
// drei Paare zusammengelegt). Für den Vergleich wird die feinere Liste eindeutig auf die gröbere abgebildet.
const GROB = { "Arbeit & Sozialversicherung": "Rente, Arbeit & Sozialversicherung", "Rente": "Rente, Arbeit & Sozialversicherung", "Einkäufe": "Einkäufe, Rechnungen & Garantien", "Rechnungen & Garantien": "Einkäufe, Rechnungen & Garantien", "Erbschaft": "Erbschaft, Vollmachten & Vorsorge", "Vollmachten & Vorsorge": "Erbschaft, Vollmachten & Vorsorge" };
const grob = (b) => b == null ? null : (GROB[b] ?? b);
const FORM = { bereich: (x) => grob(x.bereich ?? x.kategorie ?? null), schriftstueck: (x) => x.schriftstueck ?? null, absender: (x) => norm(x.absender), person: (x) => norm(x.person), frist: (x) => x.frist || null };
const FELDER = Object.keys(FORM);
const erw = lade("ERWARTUNG.json"), dateien = erw.dateien.map((x) => x.datei);
const quellen = [["Erster (Stapel-Autor)", erw], ...arg("--dateien", "ZWEITER.json,DRITTER-CLAUDE.json,DRITTER.json").split(",").map((f) => [f.replace(".json", ""), lade(f)])].filter(([, d]) => d);
const einordner = quellen.map(([name, d]) => ({ name, modell: d.einordner || null, wert: new Map(d.dateien.map((x) => [x.datei, Object.fromEntries(FELDER.map((f) => [f, FORM[f](x)]))])) }));
const pz = (ok, n) => `${ok}/${n} = ${(100 * ok / n).toFixed(1)} %`;
const erg = { ordner: ORDNER.replace(WURZEL, ""), belege: dateien.length, einordner: einordner.map((e) => ({ name: e.name, modell: e.modell, fehlt: dateien.filter((d) => !e.wert.has(d)).length })), felder: {} };
console.log(`${erg.ordner}: ${dateien.length} Schriftstücke, ${einordner.length} Einordner`, JSON.stringify(erg.einordner));
for (const f of FELDER) {
  const w = (e, d) => e.wert.get(d)?.[f] ?? null, m = einordner.length;
  const paare = []; for (let i = 0; i < m; i++) for (let j = i + 1; j < m; j++) paare.push({ a: einordner[i].name, b: einordner[j].name, gleich: dateien.filter((d) => w(einordner[i], d) === w(einordner[j], d)).length });
  const kat = [...new Set(einordner.flatMap((e) => dateien.map((d) => String(w(e, d)))))]; let P = 0; const pj = Object.fromEntries(kat.map((k) => [k, 0]));
  let einstimmig = 0; const strittig = [];
  for (const d of dateien) {
    const n = {}; for (const e of einordner) { const k = String(w(e, d)); n[k] = (n[k] || 0) + 1; pj[k]++; }
    P += (Object.values(n).reduce((s, v) => s + v * v, 0) - m) / (m * (m - 1));
    const top = Math.max(...Object.values(n)); if (top === m) einstimmig++; else if (top < 2 || (m === 2)) strittig.push({ datei: d, stimmen: einordner.map((e) => w(e, d)) });
  }
  P /= dateien.length; const Pe = kat.reduce((s, k) => s + (pj[k] / (dateien.length * m)) ** 2, 0);
  erg.felder[f] = { paare, fleissKappa: (P - Pe) / (1 - Pe), einstimmig, strittig };
  console.log(`\n== ${f} ==`); for (const p of paare) console.log(`  ${p.a} ⟷ ${p.b}: ${pz(p.gleich, dateien.length)} gleich`);
  console.log(`  Fleiss' Kappa ${erg.felder[f].fleissKappa.toFixed(3)} · einstimmig ${einstimmig} · ohne Mehrheit ${strittig.length}`);
}
if (arg("--json")) writeFileSync(resolve(WURZEL, arg("--json")), JSON.stringify(erg, null, 1));
