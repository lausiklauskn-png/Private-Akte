#!/usr/bin/env node
// Baut tresor.js: die Brücke src/tresor.ts samt dem unveränderten Tresor der Familienakte (klone/familienakte) in einer Datei.
// Die Hülle (index.html, app.js, app.css) wird nicht gebaut. `--pruefen` vergleicht die eingecheckte tresor.js mit einem frischen Bau.
import { build, transform } from "esbuild";
import { compile as twCompile } from "@tailwindcss/node";
import { Scanner } from "@tailwindcss/oxide";
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
// Kalender und Notizen: die unveränderten React-Ansichten der Familienakte (src/kalender-seite.tsx ist nur das Gestell) und ihre
// Stildatei, für die Seite rahmen/kalender/index.html.
const kalBanner = `/* Private Akte – Kalender und Notizen: gebaut aus src/kalender-seite.tsx und klone/familienakte @ ${pin.commit.slice(0, 7)}. Nicht von Hand ändern: npm run bau */`;
const kalJs = (await build({ entryPoints: [`${wurzel}src/kalender-seite.tsx`], bundle: true, format: "iife", target: "es2020", minify: true, legalComments: "none", write: false, jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' }, banner: { js: kalBanner } })).outputFiles[0].text;
// Die Stildatei wie in der Familienakte: Tailwind (dieselbe Fassung wie dort) mit seinem Grundstil und den Klassen aus den Ansichten
// des Klons, danach verkleinert. Ohne den Grundstil sitzen Knöpfe und Abstände anders als im Original (Klaus 18.11.).
const klon = `${wurzel}klone/familienakte`;
const tw = await twCompile(await readFile(`${klon}/app/globals.css`, "utf8"), { base: `${klon}/app`, onDependency() {} });
const klassen = new Scanner({ sources: [{ base: klon, pattern: "app/**/*.tsx", negated: false }, { base: klon, pattern: "index.html", negated: false }] }).scan().sort();
const kalCss = `${kalBanner}\n${(await transform(tw.build(klassen), { loader: "css", minify: true, legalComments: "none" })).code}`;
const kalZiele = [[`${wurzel}rahmen/kalender/kalender.js`, kalJs], [`${wurzel}rahmen/kalender/kalender.css`, kalCss]];
// Der Rechen-Worker der Bedeutungssuche liegt byte-gleich aus dem Klon unter native/ (dort sucht ihn der Klon: document.baseURI).
const workerQuelle = await readFile(`${wurzel}klone/familienakte/public/native/familienakte-meaning-worker.js`);
const workerZiel = `${wurzel}native/familienakte-meaning-worker.js`;
if (process.argv.includes("--pruefen")) {
  const w = await readFile(workerZiel).catch(() => null);
  if (!w || !w.equals(workerQuelle)) { console.error("🔴 native/familienakte-meaning-worker.js ist nicht gleich mit dem Klon. Bitte `npm run bau` und einchecken."); process.exit(1); }
  const alt = await readFile(ziel, "utf8").catch(() => "");
  if (alt !== neu) { console.error("🔴 tresor.js passt nicht zu src/tresor.ts und dem Klon. Bitte `npm run bau` und einchecken."); process.exit(1); }
  console.log("🟢 tresor.js ist der frische Bau.");
  for (const [datei, inhalt] of kalZiele) if (await readFile(datei, "utf8").catch(() => "") !== inhalt) { console.error(`🔴 ${datei.slice(wurzel.length)} passt nicht zu src/kalender-seite.tsx und dem Klon. Bitte \`npm run bau\` und einchecken.`); process.exit(1); }
  console.log("🟢 rahmen/kalender ist der frische Bau.");
} else { await mkdir(`${wurzel}native`, { recursive: true }); await writeFile(workerZiel, workerQuelle); await writeFile(ziel, neu); await mkdir(`${wurzel}rahmen/kalender`, { recursive: true }); for (const [datei, inhalt] of kalZiele) await writeFile(datei, inhalt); console.log(`tresor.js geschrieben (${Math.round(neu.length / 1024)} KB)`); }
