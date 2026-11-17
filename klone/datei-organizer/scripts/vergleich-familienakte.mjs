// Vergleich: heutiger Eingang der Familienakte gegen den Kern des Datei-Organizers, am selben Testordner.
// Die Familienakte wird so nachgestellt, wie die App es tut: Text lesen → Briefkopf (briefkopf.js, byte-1:1 aus Workflow PDF)
// → buildDocumentIntakePlan(Dateiname, Text, Briefkopf). Nichts davon wird hier verändert, nur aufgerufen.
// Aufruf: node scripts/vergleich-familienakte.mjs [testordner] [pfad-zur-familienakte]
//   testordner: Standard testdaten (mit ERWARTUNG.json), Familienakte: ../Meine-Familienakte
import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { einlesen, doppelteMarkieren } from "../lib/einlesen.ts";
import { siebe } from "../lib/siebe.ts";
import { pdfTextLesen } from "../lib/pdf-text.ts";

const WURZEL = fileURLToPath(new URL("..", import.meta.url));
const ORDNER = resolve(WURZEL, process.argv[2] || "testdaten");
const FA = resolve(WURZEL, process.argv[3] || "../Meine-Familienakte");
if (!existsSync(join(FA, "lib/document-intake.ts"))) { console.log(`Familienakte nicht gefunden unter ${FA} – Vergleich übersprungen.`); process.exit(0); }

const { buildDocumentIntakePlan } = await import(join(FA, "lib/document-intake.ts"));
const { briefAngaben } = await import(join(FA, "lib/briefkopf-titel.ts"));
// seit Familienakte 2.28.67: Absender aus dem Sortier-Kern, wenn gelesener Text da ist (lib/sortier-vorschlag.ts mitKernAbsender) – wie die App
const { mitKernAbsender } = await import(join(FA, "lib/sortier-vorschlag.ts")).catch(() => ({}));
// briefkopf.js meldet sich als globalThis.__WFP_BRIEFKOPF (das Familienakte-Paket ist ein ES-Modul-Paket; module.exports greift dort nicht).
const { runInThisContext } = await import("node:vm");
runInThisContext(readFileSync(join(FA, "public/apps/workflow-pdf/assets/briefkopf.js"), "utf8"));
const Briefkopf = globalThis.__WFP_BRIEFKOPF;
if (!Briefkopf?.lesen) throw new Error("briefkopf.js meldet sich nicht – Vergleich wäre unfair");
const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
pdfjs.GlobalWorkerOptions.workerSrc = new URL("../node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs", import.meta.url).href;

const soll = JSON.parse(readFileSync(join(ORDNER, "ERWARTUNG.json"), "utf8")).dateien;
const liste = JSON.parse(readFileSync(join(ORDNER, "dateien.json"), "utf8"));
const datum = (p) => { const m = p.match(/(20\d{2})[-_]?(\d{2})[-_]?(\d{2})/); return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : Date.UTC(2026, 10, 1); };

let dateien = [];
for (const pfad of liste) {
  const bytes = new Uint8Array(readFileSync(join(ORDNER, pfad)));
  dateien.push(...(await einlesen({ pfad, name: pfad.split("/").pop(), geaendert: datum(pfad), bytes }, (b) => pdfTextLesen(pdfjs, b))).map((d) => ({ ...d, _bytes: d.pfad === pfad ? bytes.length : d.groesse })));
}
dateien = doppelteMarkieren(dateien);
const org = new Map(dateien.map((d) => [d.pfad, siebe(d, 5)]));

// Familienakte: Doppelte wie dort (gleicher Name und gleiche Größe wie eine schon abgelegte Datei)
const abgelegt = [];
let fehlerBrief = 0;
const fa = new Map();
for (const d of dateien) {
  const text = d.volltext || d.kopfText || "";
  let brief = null;
  try { brief = text.trim() ? briefAngaben((mitKernAbsender || ((k) => k))(Briefkopf.lesen(text.split(/\r?\n/).slice(0, 400)), text)) : null; } catch (e) { fehlerBrief++; brief = null; }
  const plan = buildDocumentIntakePlan({ file: { name: d.name, size: d.groesse, type: "", lastModified: d.geaendert, textHint: text, titleHint: d.email?.betreff, brief }, source: "file-picker", documents: abgelegt, records: [] });
  abgelegt.push({ id: d.pfad, originalName: d.name, sizeBytes: d.groesse });
  fa.set(d.pfad, { plan, brief });
}

const norm = (s) => (s || "").toLowerCase().replace(/\s+/g, " ").trim();
const z = { fa: { kat: 0, abs: 0, pruef: 0, dopp: 0, doppFalsch: 0 }, org: { kat: 0, abs: 0, pruef: 0, dopp: 0, doppFalsch: 0 }, nKat: 0, nAbs: 0, nDopp: 0, n: 0 };
const fehlerFA = [], fehlerOrg = [];
for (const e of soll) {
  const o = org.get(e.pfad), f = fa.get(e.pfad);
  if (!o || !f) continue;
  z.n++;
  if (f.plan.requiresReview) z.fa.pruef++;
  if ([2, 3, 4, 5].some((s) => o.felder && Object.values(o.felder).some((w) => w && w.sicher === false))) z.org.pruef++;
  if (e.doppelt) { z.nDopp++; if (o.doppeltVon) z.org.dopp++; if (f.plan.duplicateIds.length) z.fa.dopp++; }
  else { if (o.doppeltVon) z.org.doppFalsch++; if (f.plan.duplicateIds.length) z.fa.doppFalsch++; }
  if (e.kategorie && e.kategorie !== "Fotos" && !o.auffaellig) {
    z.nKat++;
    if (f.plan.lifeArea === e.kategorie) z.fa.kat++; else fehlerFA.push(`${e.pfad.split("/").pop()}: ${f.plan.lifeArea} statt ${e.kategorie}`);
    if (o.felder.kategorie?.wert === e.kategorie) z.org.kat++; else fehlerOrg.push(`${e.pfad.split("/").pop()}: ${o.felder.kategorie?.wert || "–"} statt ${e.kategorie}`);
  }
  if (e.absender && !o.auffaellig) {
    z.nAbs++;
    if (norm(f.brief?.absender).includes(norm(e.absender)) || (f.brief?.absender && norm(e.absender).includes(norm(f.brief.absender)))) z.fa.abs++;
    if (norm(o.felder.absender?.wert) === norm(e.absender)) z.org.abs++;
  }
}
const pz = (a, b) => `${a}/${b} = ${b ? Math.round((100 * a) / b) : 0} %`;
console.log(`Vergleich am Testordner ${ORDNER.replace(WURZEL, "")} (${z.n} Dateien mit Erwartung)\n`);
console.log("                         Familienakte heute      Datei-Organizer-Kern");
console.log(`Bereich richtig          ${pz(z.fa.kat, z.nKat).padEnd(24)}${pz(z.org.kat, z.nKat)}`);
console.log(`Absender erkannt         ${pz(z.fa.abs, z.nAbs).padEnd(24)}${pz(z.org.abs, z.nAbs)}`);
console.log(`Doppelte gefunden        ${pz(z.fa.dopp, z.nDopp).padEnd(24)}${pz(z.org.dopp, z.nDopp)}`);
console.log(`fälschlich doppelt       ${String(z.fa.doppFalsch).padEnd(24)}${z.org.doppFalsch}`);
console.log(`zur Prüfung vorgelegt    ${pz(z.fa.pruef, z.n).padEnd(24)}${pz(z.org.pruef, z.n)}`);
if (fehlerBrief) console.log(`\n⚠ Briefkopf-Leser warf ${fehlerBrief}× – diese Dateien ohne Briefkopf gemessen.`);
console.log(`\nFalscher Bereich, Familienakte (${fehlerFA.length}):`);
for (const x of fehlerFA.slice(0, 40)) console.log(`  ${x}`);
console.log(`\nFalscher Bereich, Organizer-Kern (${fehlerOrg.length}):`);
for (const x of fehlerOrg.slice(0, 40)) console.log(`  ${x}`);
