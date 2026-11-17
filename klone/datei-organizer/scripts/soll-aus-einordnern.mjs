// Soll eines Trainings-Stapels aus drei unabhängigen Einordnern (Regel 4, docs/PRUEFSTAPEL-TRAINING-WOCHENENDE-REGELN.md):
// je Feld Mehrheit der drei; bei drei verschiedenen Urteilen entscheidet der Stapel-Autor, wenn er einem der drei folgt, sonst „strittig“.
// Aufruf: node scripts/soll-aus-einordnern.mjs <stapel> <paketwurzel> [--einordner E1,E2,E3]
//   → <stapel>/EINORDNER-E1.json … (Ergebnisse beider Hälften zusammen), <stapel>/SOLL.json (mit "strittig":[Felder] und "autorEntschied":[Felder])
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
const [stapel, pw] = [resolve(process.argv[2]), resolve(process.argv[3])];
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const NAMEN = arg("--einordner", "E1,E2,E3").split(",");
const GROB = { "Arbeit & Sozialversicherung": "Rente, Arbeit & Sozialversicherung", "Rente": "Rente, Arbeit & Sozialversicherung", "Einkäufe": "Einkäufe, Rechnungen & Garantien", "Rechnungen & Garantien": "Einkäufe, Rechnungen & Garantien", "Erbschaft": "Erbschaft, Vollmachten & Vorsorge", "Vollmachten & Vorsorge": "Erbschaft, Vollmachten & Vorsorge" };
const norm = (s) => s == null || s === "" || s === "null" ? null : String(s).toLowerCase().replace(/\b(gmbh|ag|e\.?\s?k\.?|kg|ohg|mbh|e\.?\s?v\.?|co\.?|&|und)\b/g, " ").replace(/[^a-zäöüß0-9]+/g, " ").trim() || null;
const leer = (v) => v == null || v === "" || v === "null" ? null : v;
const FORM = { bereich: (x) => { const b = leer(x.bereich ?? x.kategorie); return b ? (GROB[b] ?? b) : null; }, schriftstueck: (x) => leer(x.schriftstueck), absender: (x) => norm(x.absender), person: (x) => norm(x.person), frist: (x) => leer(x.frist) };
const erw = JSON.parse(readFileSync(join(stapel, "ERWARTUNG.json"), "utf8")).dateien;
const haelften = readdirSync(pw).filter((d) => d.startsWith("haelfte-"));
const einordner = NAMEN.map((n) => {
  const dateien = haelften.flatMap((h) => { const f = join(pw, h, `ERGEBNIS-${n}.json`); return existsSync(f) ? JSON.parse(readFileSync(f, "utf8")).dateien : []; });
  writeFileSync(join(stapel, `EINORDNER-${n}.json`), JSON.stringify({ einordner: n, dateien }, null, 1));
  // Einordner sahen den Namen vor dem Umbenennen (Windows-Zeichen → „_“): über den gesäuberten Namen zuordnen
  return { n, m: new Map(dateien.map((x) => [x.datei.replace(/[<>:"\\|?*]/g, "_"), x])) };
});
for (const e of einordner) console.log(`${e.n}: ${e.m.size} von ${erw.length}`, erw.filter((x) => !e.m.has(x.datei)).length ? `– fehlt: ${erw.filter((x) => !e.m.has(x.datei)).map((x) => x.datei).slice(0, 5).join(", ")}` : "");
const zahl = { strittig: {}, autor: {} };
const soll = erw.map((x) => {
  const aus = { datei: x.datei, haushalt: x.haushalt, strittig: [], autorEntschied: [] };
  for (const f of Object.keys(FORM)) {
    const roh = einordner.map((e) => e.m.get(x.datei)).map((y) => y ? { w: FORM[f](y), y } : null).filter(Boolean);
    const z = new Map(); for (const r of roh) { const k = JSON.stringify(r.w); z.set(k, (z.get(k) || 0) + 1); }
    const [best, n] = [...z.entries()].sort((a, b) => b[1] - a[1])[0] || [null, 0];
    let wert;
    if (n >= 2) wert = JSON.parse(best);
    else { const a = JSON.stringify(FORM[f](x)); if (z.has(a)) { wert = JSON.parse(a); aus.autorEntschied.push(f); zahl.autor[f] = (zahl.autor[f] || 0) + 1; } else { aus.strittig.push(f); zahl.strittig[f] = (zahl.strittig[f] || 0) + 1; continue; } }
    // Rohwert zum Wert (für Absender/Person den Wortlaut des ersten passenden Einordners)
    const quelle = roh.find((r) => JSON.stringify(r.w) === JSON.stringify(wert));
    aus[f] = f === "bereich" ? wert : (quelle ? (quelle.y[f === "bereich" ? "bereich" : f] ?? wert) : wert);
    if (f === "bereich") { const zw = roh.filter((r) => JSON.stringify(r.w) === JSON.stringify(wert)).map((r) => leer(r.y.zweitfach)).filter(Boolean); aus.zweitfach = zw[0] || ""; }
  }
  return aus;
});
writeFileSync(join(stapel, "SOLL.json"), JSON.stringify({ hinweis: "Mehrheit der drei Einordner je Feld; Autor nur bei drei verschiedenen Urteilen (Regel 4).", einordner: NAMEN, dateien: soll }, null, 1));
console.log(`SOLL.json: ${soll.length} Stücke · Autor entschied ${JSON.stringify(zahl.autor)} · strittig ${JSON.stringify(zahl.strittig)}`);
