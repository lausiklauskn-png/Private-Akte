/* Bauauftrag aus einem Beispiel von Workflow Needs, mit dem UNVERÄNDERTEN Code von Needs (Gesamtauftrag der letzten Fassung).
   node beispiel-auftrag.mjs <beispiel-id> <aus.md>      NEEDS=/pfad/zu/Workflow-Needs (Vorgabe: ../../../Workflow-Needs) */
import { createRequire } from "node:module";
import { writeFileSync, readFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const HIER = dirname(fileURLToPath(import.meta.url));
const NEEDS = resolve(process.env.NEEDS || join(HIER, "../../../Workflow-Needs"));
const require = createRequire(import.meta.url);
const still = console.log; console.log = () => {};
/* dieselbe Ladeliste wie Needs' eigene Kernprobe (tests/kern.mjs), nur die assets */
const liste = readFileSync(join(NEEDS, "tests/kern.mjs"), "utf8").match(/for \(const f of \[([\s\S]*?)\]\)/)[1].match(/"([^"]+)"/g).map((x) => x.slice(1, -1)).filter((f) => !f.startsWith("tests/"));
for (const f of liste) require(join(NEEDS, f));
console.log = still;
const WN = globalThis.WN, P = globalThis.SbkimPseudonym;
const EINST = { satzCent: 8000, ust: { modus: "regel", satz: 19 }, zeitraum: 24, firma: {} };
const [id, aus] = process.argv.slice(2);
const b = WN.beispiel.liste().find((x) => x.id === id);
if (!b) { console.error("unbekanntes Beispiel: " + id); process.exit(2); }
const v = b.bauen(1, EINST), f = WN.fassungen.aktuelle(v);
const md = WN.bauauftrag.erzeuge(v, null, f, {}, P);
if (!md.ok) { console.error("Bauauftrag angehalten: " + (md.grund || md.fund)); process.exit(1); }
writeFileSync(aus, md.md);
console.log(id + ": " + md.md.length + " Zeichen → " + aus);
