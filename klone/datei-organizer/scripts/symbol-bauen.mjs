// App-Symbol „Datei-Organizer“ in 3D (Klaus 14.11.2026): das Ordnerbaum-Zeichen oben links in der App (lucide „FolderTree“, src/app.tsx,
// .brand-symbol) auf leichtem blauen Verlauf, mit Glanz und Schatten. Eine Quelle für PWA (src/public/icon-*.png, favicon.svg),
// Windows (windows/tools/prepare-runtime.mjs nimmt icon-192.png) und Android (mipmap-*).
// Basic (Web-App, Klaus 17.11.): umgedreht – blaues Zeichen auf weißem, zum Rand hin leicht bläulichem Grund; Pro (Android, Windows) bleibt
// weiß auf Blau. PWA-Dateien (icon-192/512, maskable, favicon.svg) = Basic; src/public/icon-pro-192.png (Windows) und mipmap-* = Pro.
// Aufruf: node scripts/symbol-bauen.mjs --vorschau <ziel.png>   |   node scripts/symbol-bauen.mjs --schreiben
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

// Pfade des Zeichens wie in lucide-react (FolderTree, 24er Raster, Strich 2)
const ZEICHEN = [
  "M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
  "M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
  "M3 5a2 2 0 0 0 2 2h3", "M3 3v13a2 2 0 0 0 2 2h3",
];

/** form: "kachel" (gerundetes Quadrat), "rund" (Kreis), "voll" (randlos, für „maskable“), "vorne" (nur Zeichen, Android-Vordergrund), "hinten" (nur Verlauf) */
export function symbolSvg(form = "kachel", groesse = 1024, variante = "pro") {
  const basic = variante === "basic";
  // Klaus 14.11.: runde Ecken (Kachel), aber keine helle Außenkante; „voll“ (maskable) und „hinten“ (Android) randlos, das System schneidet selbst zu
  const g = groesse, r = form === "rund" ? g / 2 : g * 0.22, randlos = form === "hinten" || form === "voll";
  const flaeche = form === "vorne" ? "" : `
    <rect x="0" y="0" width="${g}" height="${g}" rx="${randlos ? 0 : r}" fill="url(#${basic ? "hell" : "verlauf"})"/>
    ${basic ? "" : `<rect x="0" y="0" width="${g}" height="${g}" rx="${randlos ? 0 : r}" fill="url(#glanz)"/>`}
`;
  // Zeichen (Klaus 14.11.: Fläche gut gefüllt, nicht zu nah am Rand): Kachel 68 %, rund 62 %, randlos „maskable“ 60 %, Android-Vordergrund 56 % (sichere Zone 66/108)
  const anteil = { vorne: 0.56, voll: 0.6, rund: 0.62 }[form] ?? 0.68, s = (g * anteil) / 24, x0 = (g - 24 * s) / 2, y0 = (g - 24 * s) / 2 + g * 0.005;
  const pfade = ZEICHEN.map((d) => `<path d="${d}"/>`).join("");
  const zeichen = (farbe, dx, dy, filter = "", breite = 2.1) => `<g transform="translate(${x0 + dx} ${y0 + dy}) scale(${s})" fill="none" stroke="${farbe}" stroke-width="${breite}" stroke-linecap="round" stroke-linejoin="round" ${filter}>${pfade}</g>`;
  const alleZeichen = form === "hinten" ? "" : null;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${g} ${g}" width="${g}" height="${g}">
  <defs>
    <linearGradient id="verlauf" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3b8ed0"/><stop offset="0.55" stop-color="#1c5f98"/><stop offset="1" stop-color="#0b3154"/>
    </linearGradient>
    <radialGradient id="hell" cx="0.5" cy="0.5" r="0.64">
      <stop offset="0" stop-color="#ffffff"/><stop offset="0.34" stop-color="#ffffff"/><stop offset="0.6" stop-color="#bcd8ef"/><stop offset="0.8" stop-color="#5a9bd4"/><stop offset="1" stop-color="#1c5f98"/>
    </radialGradient>
    <linearGradient id="strichBlau" gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22">
      <stop offset="0" stop-color="#3b8ed0"/><stop offset="0.55" stop-color="#1c5f98"/><stop offset="1" stop-color="#0b3154"/>
    </linearGradient>
    <radialGradient id="glanz" cx="0.3" cy="0.12" r="0.75">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.32"/><stop offset="0.6" stop-color="#ffffff" stop-opacity="0.04"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="kante" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.45"/><stop offset="0.5" stop-color="#ffffff" stop-opacity="0.05"/><stop offset="1" stop-color="#000000" stop-opacity="0.25"/>
    </linearGradient>
    <linearGradient id="strich" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d6e6f4"/></linearGradient>
    <filter id="weich" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="${0.55}"/></filter>
  </defs>${flaeche}
  ${alleZeichen ?? (basic ? `${zeichen("#0b3154", 0.0 * s, 0.5 * s, 'opacity="0.18" filter="url(#weich)"')}
  ${zeichen("url(#strichBlau)", 0, 0)}` : `${zeichen("#04182b", 0.0 * s, 0.9 * s, 'opacity="0.45" filter="url(#weich)"')}
  ${zeichen("#06223d", 0.0 * s, 0.38 * s, 'opacity="0.55"')}
  ${zeichen("url(#strich)", 0, 0)}
  ${zeichen("#ffffff", 0, -0.12 * s, 'opacity="0.35"', 0.7)}`)}
</svg>`;
}

async function bild(seite, svg, b, h = b) {
  await seite.setViewportSize({ width: b, height: h });
  await seite.setContent(`<html><body style="margin:0;background:transparent">${svg.replace(/width="\d+" height="\d+"/, `width="${b}" height="${h}"`)}</body></html>`);
  return seite.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: b, height: h } });
}

const browser = await chromium.launch(); const seite = await browser.newPage({ deviceScaleFactor: process.argv.includes("--vorschau") ? 2 : 1 });
const arg = (n) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : null; };
if (arg("--vorschau")) {
  // Vergleich: altes Symbol, neues als Kachel, rund (Android), klein (Taskleiste) – auf hellem und dunklem Grund
  const alt = (await import("node:fs")).readFileSync("src/public/icon-512.png").toString("base64");
  const neu = (f, px) => `<img src="data:image/svg+xml;base64,${Buffer.from(symbolSvg(f, 512)).toString("base64")}" width="${px}" height="${px}">`;
  const zeile = (grund, schrift) => `<div style="display:flex;gap:36px;align-items:center;padding:28px 36px;background:${grund};color:${schrift};font:600 15px system-ui">
    <figure style="margin:0;text-align:center"><img src="data:image/png;base64,${alt}" width="128"><figcaption>bisher</figcaption></figure>
    <figure style="margin:0;text-align:center"><img src="data:image/svg+xml;base64,${Buffer.from(symbolSvg("kachel", 512, "basic")).toString("base64")}" width="128" height="128"><figcaption>Basic (Web-App)</figcaption></figure>
    <figure style="margin:0;text-align:center"><img src="data:image/svg+xml;base64,${Buffer.from(symbolSvg("kachel", 512, "basic")).toString("base64")}" width="48" height="48"><figcaption>Basic klein</figcaption></figure>
    <figure style="margin:0;text-align:center">${neu("kachel", 128)}<figcaption>Pro (Windows)</figcaption></figure>
    <figure style="margin:0;text-align:center">${neu("rund", 128)}<figcaption>neu rund (Android)</figcaption></figure>
    <figure style="margin:0;text-align:center">${neu("kachel", 48)}<br>${neu("kachel", 32)} ${neu("kachel", 16)}<figcaption>klein</figcaption></figure></div>`;
  await seite.setViewportSize({ width: 900, height: 420 });
  await seite.setContent(`<html><body style="margin:0">${zeile("#eef3f7", "#15283a")}${zeile("#1f2430", "#e6edf3")}</body></html>`);
  await seite.waitForFunction(() => [...document.images].every((i) => i.complete));
  const kaputt = await seite.evaluate(() => [...document.images].filter((i) => !i.naturalWidth).length);
  if (kaputt) { writeFileSync(arg("--vorschau") + ".svg", symbolSvg("kachel", 512)); throw new Error(`${kaputt} Bilder nicht geladen`); }
  writeFileSync(arg("--vorschau"), await seite.screenshot({ fullPage: true }));
} else if (process.argv.includes("--schreiben")) {
  const schreibe = (p, b) => { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, b); console.log(p); };
  schreibe("src/public/icon-192.png", await bild(seite, symbolSvg("kachel", 1024, "basic"), 192));
  schreibe("src/public/icon-512.png", await bild(seite, symbolSvg("kachel", 1024, "basic"), 512));
  schreibe("src/public/icon-maskable-512.png", await bild(seite, symbolSvg("voll", 1024, "basic"), 512));
  schreibe("src/public/favicon.svg", symbolSvg("kachel", 64, "basic"));
  schreibe("src/public/icon-pro-192.png", await bild(seite, symbolSvg("kachel"), 192));
  const dichten = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };
  for (const [d, px] of Object.entries(dichten)) {
    const ordner = join("android/app/src/main/res", `mipmap-${d}`), v = Math.round(px * 108 / 48);
    schreibe(join(ordner, "ic_launcher.png"), await bild(seite, symbolSvg("kachel"), px));
    schreibe(join(ordner, "ic_launcher_round.png"), await bild(seite, symbolSvg("rund"), px));
    schreibe(join(ordner, "ic_launcher_foreground.png"), await bild(seite, symbolSvg("vorne"), v));
    schreibe(join(ordner, "ic_launcher_background.png"), await bild(seite, symbolSvg("hinten"), v));
  }
}
await browser.close();
