#!/usr/bin/env node
// Baut tresor.js: die Brücke src/tresor.ts samt dem unveränderten Tresor der Familienakte (klone/familienakte) in einer Datei.
// Die Hülle (index.html, app.js, app.css) wird nicht gebaut. `--pruefen` vergleicht die eingecheckte tresor.js mit einem frischen Bau.
import { build } from "esbuild";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const wurzel = fileURLToPath(new URL("..", import.meta.url));
const pin = JSON.parse(await readFile(`${wurzel}klone/familienakte.herkunft.json`, "utf8"));
const ergebnis = await build({
  entryPoints: [`${wurzel}src/tresor.ts`], bundle: true, format: "iife", target: "es2020", minify: true, legalComments: "none", write: false,
  // Der Klon bleibt unverändert; nur sein Import der Anzeige (React) wird beim Bau auf src/pdf-ersatz.ts umgeleitet.
  plugins: [{ name: "pdf-ersatz", setup(b) { b.onResolve({ filter: /\/file-viewer$/ }, () => ({ path: `${wurzel}src/pdf-ersatz.ts` })); } }],
  banner: { js: `/* Private Akte – tresor.js: gebaut aus src/tresor.ts und klone/familienakte @ ${pin.commit.slice(0, 7)}. Nicht von Hand ändern: npm run bau */` },
});
const neu = ergebnis.outputFiles[0].text;
const ziel = `${wurzel}tresor.js`;
// Der Rechen-Worker der Bedeutungssuche liegt byte-gleich aus dem Klon unter native/ (dort sucht ihn der Klon: document.baseURI).
const workerQuelle = await readFile(`${wurzel}klone/familienakte/public/native/familienakte-meaning-worker.js`);
const workerZiel = `${wurzel}native/familienakte-meaning-worker.js`;
if (process.argv.includes("--pruefen")) {
  const w = await readFile(workerZiel).catch(() => null);
  if (!w || !w.equals(workerQuelle)) { console.error("🔴 native/familienakte-meaning-worker.js ist nicht gleich mit dem Klon. Bitte `npm run bau` und einchecken."); process.exit(1); }
  const alt = await readFile(ziel, "utf8").catch(() => "");
  if (alt !== neu) { console.error("🔴 tresor.js passt nicht zu src/tresor.ts und dem Klon. Bitte `npm run bau` und einchecken."); process.exit(1); }
  console.log("🟢 tresor.js ist der frische Bau.");
} else { await mkdir(`${wurzel}native`, { recursive: true }); await writeFile(workerZiel, workerQuelle); await writeFile(ziel, neu); console.log(`tresor.js geschrieben (${Math.round(neu.length / 1024)} KB)`); }
