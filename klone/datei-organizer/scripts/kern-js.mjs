// Übersetzt den Sortier-Kern (lib/*.ts) einmal nach JavaScript (ES-Module) für Apps ohne Bau-Schritt (BookLedgerPro, Workflow PDF,
// Private Brain). Keine zweite Fassung: die Ausgabe entsteht nur hier, die Apps ziehen sie byte-gleich mit Pin
// (Werkzeug dort: tools/sortierkern-nachziehen.mjs). Aufruf: node scripts/kern-js.mjs [--pruefen]
//   --pruefen: nur vergleichen, ob kern-js/ zum heutigen lib/ passt (für CI); Ausgabe 1 bei Abweichung.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path"; import { createHash } from "node:crypto"; import { transformSync } from "esbuild";
const W = new URL("..", import.meta.url).pathname, LIB = join(W, "lib"), AUS = join(W, "kern-js");
const sha = (b) => createHash("sha256").update(b).digest("hex");
const dateien = readdirSync(LIB).filter((f) => f.endsWith(".ts")).sort();
const neu = {};
for (const f of dateien) {
  const ts = readFileSync(join(LIB, f), "utf8");
  let js = transformSync(ts, { loader: "ts", format: "esm", target: "es2020", legalComments: "none" }).code;
  js = js.replace(/(from\s+["']\.\/[^"']+)\.ts(["'])/g, "$1.js$2").replace(/(import\(\s*["']\.\/[^"']+)\.ts(["'])/g, "$1.js$2");
  neu[f.replace(/\.ts$/, ".js")] = `// Erzeugt aus Datei-Organizer lib/${f} (scripts/kern-js.mjs). Nicht von Hand ändern.\n${js}`;
}
const herkunft = { quelle: "Datei-Organizer lib/", werkzeug: "scripts/kern-js.mjs", libSha256: Object.fromEntries(dateien.map((f) => [f, sha(readFileSync(join(LIB, f)))])), dateien: Object.fromEntries(Object.entries(neu).map(([f, t]) => [f, sha(t)])) };
if (process.argv.includes("--pruefen")) {
  const alt = existsSync(join(AUS, "HERKUNFT.json")) ? JSON.parse(readFileSync(join(AUS, "HERKUNFT.json"), "utf8")) : {};
  const ok = JSON.stringify(alt.dateien) === JSON.stringify(herkunft.dateien);
  console.log(ok ? "kern-js passt zu lib/" : "kern-js veraltet: node scripts/kern-js.mjs"); process.exit(ok ? 0 : 1);
}
mkdirSync(AUS, { recursive: true });
for (const [f, t] of Object.entries(neu)) writeFileSync(join(AUS, f), t);
writeFileSync(join(AUS, "HERKUNFT.json"), JSON.stringify(herkunft, null, 1) + "\n");
console.log(`kern-js: ${Object.keys(neu).length} Dateien geschrieben`);
