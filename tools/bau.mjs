#!/usr/bin/env node
// Baut tresor.js: die Brücke src/tresor.ts samt dem unveränderten Tresor der Familienakte (klone/familienakte) in einer Datei.
// Die Hülle (index.html, app.js, app.css) wird nicht gebaut. `--pruefen` vergleicht die eingecheckte tresor.js mit einem frischen Bau.
import { build } from "esbuild";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const wurzel = fileURLToPath(new URL("..", import.meta.url));
const pin = JSON.parse(await readFile(`${wurzel}klone/familienakte.herkunft.json`, "utf8"));
const ergebnis = await build({
  entryPoints: [`${wurzel}src/tresor.ts`], bundle: true, format: "iife", target: "es2020", minify: true, legalComments: "none", write: false,
  banner: { js: `/* Private Akte – tresor.js: gebaut aus src/tresor.ts und klone/familienakte @ ${pin.commit.slice(0, 7)}. Nicht von Hand ändern: npm run bau */` },
});
const neu = ergebnis.outputFiles[0].text;
const ziel = `${wurzel}tresor.js`;
if (process.argv.includes("--pruefen")) {
  const alt = await readFile(ziel, "utf8").catch(() => "");
  if (alt !== neu) { console.error("🔴 tresor.js passt nicht zu src/tresor.ts und dem Klon. Bitte `npm run bau` und einchecken."); process.exit(1); }
  console.log("🟢 tresor.js ist der frische Bau.");
} else { await writeFile(ziel, neu); console.log(`tresor.js geschrieben (${Math.round(neu.length / 1024)} KB)`); }
