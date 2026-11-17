// Familienakte an einem Prüfstapel (Text oder gescannt), Soll = Mehrheit der Einordner: Bereich (Eingang wie in der App, Stücke als
// PDF mit gelesenem Text), Absender (Briefkopf-Baustein bzw. ab 2.28.67 Sortier-Kern) und Titel „Brief von …“ (berichtet).
// Aufruf: node scripts/messen-familienakte-stapel.mjs <stapel> [<textordner>] --fa <familienakte> [--json datei]
import { readFileSync, existsSync, writeFileSync } from "node:fs"; import { join, resolve } from "node:path"; import { runInThisContext } from "node:vm";
const pos = process.argv.slice(2).filter((a, i, l) => !a.startsWith("--") && !(l[i - 1] || "").startsWith("--"));
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const S = resolve(pos[0]), T = resolve(pos[1] || pos[0]), FA = resolve(arg("--fa", "../Meine-Familienakte"));
const { buildDocumentIntakePlan } = await import(join(FA, "lib/document-intake.ts"));
const { briefAngaben, briefTitel } = await import(join(FA, "lib/briefkopf-titel.ts"));
const { mitKernAbsender } = await import(join(FA, "lib/sortier-vorschlag.ts")).catch(() => ({}));
runInThisContext(readFileSync(join(FA, "public/apps/workflow-pdf/assets/briefkopf.js"), "utf8"));
const B = globalThis.__WFP_BRIEFKOPF;
const lese = (p) => JSON.parse(readFileSync(p, "utf8"));
const q = ["ERWARTUNG.json", "ZWEITER.json", "DRITTER.json"].filter((f) => existsSync(join(S, f))).map((f) => new Map(lese(join(S, f)).dateien.map((x) => [x.datei, x])));
const mehr = (datei, feld) => { const v = q.map((m) => { const x = m.get(datei); return x ? (feld === "bereich" ? x.bereich ?? x.kategorie : x[feld]) ?? "" : undefined; }).filter((v) => v !== undefined); const z = {}; v.forEach((x) => z[x] = (z[x] || 0) + 1); const t = Object.entries(z).find(([, n]) => n >= 2); return q.length === 1 ? v[0] : t ? t[0] : null; };
const norm = (s) => String(s || "").toLowerCase().replace(/\b(gmbh|ag|kg|e\.?\s?v|gbr|ohg|mbh|co|eg|se|ug)\b/g, "").replace(/[^a-z0-9äöüß]/g, "");
const z = { n: 0, bereich: [0, 0], absender: [0, 0], titelMitAbsender: 0, titel: 0 }; const fehler = [], je = {};
for (const datei of q[0].keys()) {
  const text = readFileSync(join(T, datei), "utf8"); z.n++;
  const kopf0 = B.lesen(text.split(/\r?\n/).slice(0, 400)); const kopf = mitKernAbsender ? mitKernAbsender(kopf0, text) : kopf0;
  const brief = briefAngaben(kopf), titel = briefTitel(kopf);
  const name = datei.replace(/\.txt$/, ".pdf");
  const plan = buildDocumentIntakePlan({ file: { name, size: text.length, type: "application/pdf", lastModified: 0, textHint: text, titleHint: titel || undefined, brief }, source: "file-picker", documents: [], records: [] });
  const sb = mehr(datei, "bereich"); if (sb) { z.bereich[1]++; if (plan.lifeArea === sb) z.bereich[0]++; (je[datei] ||= {}).bereich = plan.lifeArea === sb; }
  const sa = mehr(datei, "absender");
  if (sa) { z.absender[1]++; const a = brief?.absender; const ok = !!a && (norm(a).includes(norm(sa)) || norm(sa).includes(norm(a))) && norm(a).length > 2; (je[datei] ||= {}).absender = ok; if (ok) z.absender[0]++; else fehler.push(`${datei}: „${a || "–"}“ statt „${sa}“`);
    if (titel) { z.titel++; if (ok) z.titelMitAbsender++; } }
}
const p = ([a, b]) => `${a}/${b} = ${(100 * a / b).toFixed(1)} %`;
console.log(`${S.split("/").pop()}${T !== S ? " (" + T.split("/").pop() + ")" : ""} · Familienakte ${FA.split("/").pop()}: Bereich ${p(z.bereich)} · Absender ${p(z.absender)} · Titel vorgeschlagen ${z.titel}, davon mit richtigem Absender ${z.titelMitAbsender}`);
if (arg("--json")) writeFileSync(arg("--json"), JSON.stringify({ stapel: S, text: T, fa: FA, ...z, fehler, je }, null, 1) + "\n");
if (process.argv.includes("--fehler")) fehler.forEach((f) => console.log("  " + f));
