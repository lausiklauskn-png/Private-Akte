// Lauf „Vermieterin“: Kette der Fristen (Regeln: docs/PRUEFSTAPEL-VERMIETERIN-REGELN.md, Nachtrag „Fristen bis zur Glocke“).
// Je Schriftstück: Soll-Frist (wo Autor und Einordner übereinstimmen) → Familienakte erkenneFristen(Text) → Aufgabe mit dueAt →
// glockenZeiten (lib/glocke.ts, Vorgabe 7 Tage und 1 Tag vorher). Daneben die Frist aus dem Kern des Datei-Organizers.
// In der App wird eine erkannte Frist erst nach Bestätigung angelegt; hier gilt „bestätigt, wie vorgeschlagen“.
// Aufruf: node scripts/messen-fristkette.mjs <stapel> <ordner-mit-text> [pfad-zur-familienakte] [--json datei]
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { einlesen } from "../lib/einlesen.ts"; import { siebe } from "../lib/siebe.ts";
const S = resolve(process.argv[2]), T = resolve(process.argv[3]), FA = resolve(process.argv[4] && !process.argv[4].startsWith("--") ? process.argv[4] : "../Meine-Familienakte");
const { erkenneFristen } = await import(join(FA, "lib/central-intake.ts")); const { glockenZeiten } = await import(join(FA, "lib/glocke.ts"));
const lese = (p) => JSON.parse(readFileSync(p, "utf8")), leer = (v) => (v === "" || v === undefined ? null : v);
const q = [lese(join(S, "ERWARTUNG.json")), ...["ZWEITER.json", "DRITTER.json"].filter((f) => existsSync(join(S, f))).map((f) => lese(join(S, f)))].map((d) => new Map(d.dateien.map((x) => [x.datei, leer(x.frist)])));
const wilson = (k, n) => { if (!n) return "–"; const z = 1.96, p = k / n, m = (p + z * z / (2 * n)) / (1 + z * z / n), h = z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / (1 + z * z / n); return `${k}/${n} = ${(100 * p).toFixed(1)} % (${(100 * (m - h)).toFixed(0)}–${(100 * (m + h)).toFixed(0)})`; };
const z = { mit: 0, ohne: 0, strittig: 0, fa: { richtig: 0, falschesDatum: 0, keine: 0, faelschlich: 0, glocke: 0 }, kern: { richtig: 0, falschesDatum: 0, keine: 0, faelschlich: 0 } }, verloren = [];
for (const [datei] of q[0]) {
  const st = q.map((m) => JSON.stringify(m.get(datei) ?? null)), anz = {}; for (const s of st) anz[s] = (anz[s] || 0) + 1;
  const [best, n] = Object.entries(anz).sort((a, b) => b[1] - a[1])[0]; if (n < 2 && q.length > 1) { z.strittig++; continue; }
  const soll = JSON.parse(best), text = readFileSync(join(T, datei), "utf8");
  const fa = erkenneFristen(text).find((f) => f.art === "frist")?.datum || null;
  const d = (await einlesen({ pfad: datei, name: datei, geaendert: Date.UTC(2025, 5, 1), bytes: new TextEncoder().encode(text) }, async () => ""))[0];
  const kern = siebe(d, 5).felder?.frist?.wert || null;
  if (soll) {
    z.mit++;
    for (const [k, ist] of [["fa", fa], ["kern", kern]]) { if (ist === soll) z[k].richtig++; else if (ist) z[k].falschesDatum++; else z[k].keine++; }
    if (fa === soll) {
      const rec = { id: "T-" + z.mit, recordType: "task", createdAt: "2025-01-01", updatedAt: "2025-01-01", status: "offen", source: "Lauf", notes: null, data: { title: datei, dueAt: soll } };
      const g = glockenZeiten([rec]).filter((x) => Date.parse(x.um) < Date.parse(soll + "T23:59:00")); if (g.length) z.fa.glocke++; else verloren.push(`${datei}: Frist ${soll} richtig, aber keine Erinnerung geplant`);
    } else verloren.push(`${datei}: Soll ${soll}, Familienakte ${fa || "keine"}, Kern ${kern || "keine"}`);
  } else { z.ohne++; if (fa) z.fa.faelschlich++; if (kern) z.kern.faelschlich++; }
}
const aus = { text: T, mitSollFrist: z.mit, ohneSollFrist: z.ohne, strittig: z.strittig,
  familienakte: { fristRichtig: wilson(z.fa.richtig, z.mit), falschesDatum: z.fa.falschesDatum, keineErkannt: z.fa.keine, faelschlichEineFrist: `${z.fa.faelschlich}/${z.ohne}`, erinnerungGeplant: wilson(z.fa.glocke, z.mit) },
  kern: { fristRichtig: wilson(z.kern.richtig, z.mit), falschesDatum: z.kern.falschesDatum, keineErkannt: z.kern.keine, faelschlichEineFrist: `${z.kern.faelschlich}/${z.ohne}` }, verloren };
const j = process.argv.indexOf("--json"); if (j > 0) writeFileSync(process.argv[j + 1], JSON.stringify(aus, null, 1));
console.log(JSON.stringify({ ...aus, verloren: verloren.length }, null, 1));
