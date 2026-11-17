// Lernt das Art-Modell des Kerns (lib/artmodell.ts) – rekursive Verbesserung 15.11.2026, docs/PRUEFSTAPEL-REKURSIV-REGELN.md.
// Quelle: erfundene Lehrbriefe (lehrdaten-briefe/) und verbrauchte Prüfstapel (Soll = Mehrheit der Einordner). Lernen = gemitteltes
// Perzeptron (scripts/rekursiv-modell.mjs), Merkmale = lib/artmodell.ts artMerkmale; Merkmale aus nur einem Stapel bleiben draußen.
// Aufruf: node scripts/artmodell-lernen.mjs [--ohne stapel] [--mit stapel,…] [--aus lib/artmodell-daten.ts] [--reihum]
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
const W = fileURLToPath(new URL("..", import.meta.url));
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const { artMerkmale } = await import("../lib/artmodell.ts");
const M = await import("./rekursiv-modell.mjs");
const V = await import("./rekursiv-versuch.mjs");
export const STAPEL = ["unabhaengig", "briefe-2", "briefe-a", "briefe-b", "briefe-h", "vermieterin", "vermieterin-2026", "familie-k3", "runde-c", "runde-d", "runde-e", "runde-f", "rest", "absender",
  // Runde 2: verbrauchte Prüfstadt (Text und so, wie die App die gesetzten Stücke liest) und ältere Stapel als gelesener Text
  "stadt-pruef", "stadt-pruef-ocr", "familie-k3-ocr", "vermieterin-ocr", "vermieterin-2026-ocr"];
const ordnerVon = (s) => s.startsWith("/") ? s : join(W, "pruefstapel-" + s);
const cache = new Map();
export function belege(s) {
  if (cache.has(s)) return cache.get(s);
  const o = ordnerVon(s), b = [...V.sollVon(s)].filter(([d, x]) => x.schriftstueck && x.schriftstueck !== "Foto" && existsSync(join(o, d))).map(([d, x]) => ({ g: s, datei: d, y: x.schriftstueck, x: artMerkmale(readFileSync(join(o, d), "utf8")) }));
  cache.set(s, b); return b;
}
const LO = join(W, "lehrdaten-briefe");
const lehr = readdirSync(LO).map((u) => join(LO, u)).filter((u) => existsSync(join(u, "ERWARTUNG.json"))).flatMap((o) => JSON.parse(readFileSync(join(o, "ERWARTUNG.json"), "utf8")).dateien.filter((x) => x.schriftstueck).map((x) => ({ g: o, y: x.schriftstueck, x: artMerkmale(readFileSync(join(o, x.datei), "utf8")) })));
export function lerne(stapel) { return M.kompakt(M.perzeptron([...lehr, ...stapel.flatMap(belege)], 8, 2), 0.5); }

if (process.argv[1].endsWith("artmodell-lernen.mjs")) {
  const mit = (arg("--mit", "") || "").split(",").filter(Boolean);
  const alle = [...STAPEL, ...mit].filter((s) => s !== arg("--ohne"));
  if (process.argv.includes("--reihum")) {
    let ok = 0, n = 0;
    for (const t of alle) { const m = lerne(alle.filter((x) => x.replace(/-ocr$/, "") !== t.replace(/-ocr$/, ""))); const b = belege(t); const a = b.filter((x) => M.rateKompakt(m, x.x).wert === x.y).length; ok += a; n += b.length; console.log(t.padEnd(18), `${(100 * a / b.length).toFixed(1)} %`); }
    console.log(`reihum (Modell allein): ${(100 * ok / n).toFixed(2)} % von ${n}`);
  }
  if (arg("--aus")) {
    const m = lerne(alle);
    const quelle = createHash("sha256").update(JSON.stringify([lehr.length, ...alle.map((s) => [s, belege(s).length])])).digest("hex").slice(0, 12);
    writeFileSync(join(W, arg("--aus")), `// Erzeugt von scripts/artmodell-lernen.mjs aus lehrdaten-briefe/ und verbrauchten Stapeln (${alle.join(", ")}; ${lehr.length + alle.reduce((a, s) => a + belege(s).length, 0)} Schriftstücke). Nicht von Hand ändern.\nexport const ARTMODELL_QUELLE = "${quelle}";\nexport const ARTMODELL = ${JSON.stringify(m)};\n`);
    console.log("geschrieben:", arg("--aus"), Math.round(JSON.stringify(m).length / 1024), "KB");
  }
}
