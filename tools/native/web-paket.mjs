#!/usr/bin/env node
// Web-Paket der Pro-Akte (Android und Windows): dieselbe Seite wie die PWA, nur was die Seite lädt. Klone byte-gleich, aber nur
// ihre Laufzeit-Teile (keine Prüfstapel, Testdaten zum Lernen, docs, android/ und windows/ der Klone). Kein sw.js der Akte (in der
// App liegt alles im Paket). In index.html und manifest der App: Name „Private Akte Pro“, Pro-Zeichen als Symbol und Favicon.
// Android (--android): Private Brain Pro als App-Seite (deren prepare-web über tools/native/brain-web.mjs, Mail nativ) statt der
// Web-Seite; dazu an die Wurzel, was deren Java und Seite dort erwarten (public/*-model(s).json, /models/, /vendor/pdfjs/).
// Windows nimmt weiter die Web-Seite (dort gibt es die Plugins von Private Brain Pro nicht).
//   node tools/native/web-paket.mjs [--android] [ziel]   (Standard: www/)
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { brainWeb } from './brain-web.mjs';

export const WURZEL = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const OBEN = ['index.html', 'app.css', 'app.js', 'tresor.js', 'rechtliches.html', 'manifest.webmanifest', 'favicon.ico', 'icons', 'bilder', 'native', 'rahmen'];
/** Je Klon die Teile, die die Seite zur Laufzeit lädt. */
export const KLONE = {
  'datei-organizer': ['app', 'testdaten', 'README.md'],
  familienakte: ['public', 'README.md'],
  'workflow-pdf': ['index.html', 'manifest.webmanifest', 'sw.js', 'version.json', 'assets', 'vendor', 'icons', 'sbkim', 'beispiele', 'impressum.html', 'sicherheit.html', 'LICENSE', 'RECHTE.md', 'THIRD_PARTY.md'],
  bookledger: ['src', 'LICENSE'],
  'sage-protokol': ['src', 'LICENSE'],
  // Private Brain Pro 1:1 (Klaus 18.11.): die Web-Seite läuft Datei für Datei aus dem Klon (geprüft: index.html, modules/, assets/ …).
  'privat-brain-pro': ['index.html', 'app-manifest.json', 'apps', 'artwork', 'assets', 'catalog-emblem.png', 'icon-192.png', 'icon-512.png', 'impressum.html',
    'models', 'modules', 'pb-caption.js', 'sbkim', 'sicherheit.html', 'sw.js', 'vendor', 'LICENSE', 'RECHTE.md'],
};
export const NAME = 'Private Akte Pro';
/** Was die App-Seite von Private Brain Pro an der Wurzel erwartet (Java: getAssets() „public/…“; Seite: „/models/“, „/vendor/pdfjs/“). */
export const BRAIN_WURZEL = ['semantic-model.json', 'meaning-models.json', 'caption-model.json', 'translation-models.json', 'models', 'vendor/pdfjs'];

export function bauen(ziel = join(WURZEL, 'www'), { android = false, brain = null } = {}) {
  rmSync(ziel, { recursive: true, force: true }); mkdirSync(ziel, { recursive: true });
  for (const t of OBEN) { if (!existsSync(join(WURZEL, t))) throw new Error('fehlt: ' + t); cpSync(join(WURZEL, t), join(ziel, t), { recursive: true }); }
  for (const [k, teile] of Object.entries(KLONE)) for (const t of teile) {
    const q = join(WURZEL, 'klone', k, t); if (!existsSync(q)) throw new Error(`Klon ${k}: fehlt ${t}`);
    cpSync(q, join(ziel, 'klone', k, t), { recursive: true });
  }
  if (android) {
    const pb = brain || brainWeb();
    rmSync(join(ziel, 'klone/privat-brain-pro'), { recursive: true, force: true });
    cpSync(pb, join(ziel, 'klone/privat-brain-pro'), { recursive: true });
    for (const t of BRAIN_WURZEL) {
      if (existsSync(join(ziel, t))) throw new Error('Wurzel der Akte hat schon ' + t);
      cpSync(join(pb, t), join(ziel, t), { recursive: true });
    }
  }
  // Pro-Zeichen: Kopf, Favicon, Symbole der Seite. Nur die Hülle wird angepasst, nie ein Klon.
  let html = readFileSync(join(ziel, 'index.html'), 'utf8');
  const vorher = html;
  html = html.replace('./bilder/logo-basic-rund.png', './bilder/logo-pro-rund.png')
    .replace('<link rel="icon" href="./favicon.ico" sizes="any">', '<link rel="icon" href="./bilder/logo-pro-rund.png" type="image/png" sizes="192x192">')
    .replace('href="./icons/favicon-32.png"', 'href="./bilder/logo-pro-rund.png"')
    .replace('href="./icons/apple-touch-icon.png"', 'href="./bilder/logo-pro-rund.png"')
    .replace(/<title>[^<]*<\/title>/, `<title>${NAME}</title>`)
    .replace('<head>', '<head>\n<script>window.PA_PRO=true</script>');
  if (html === vorher || !html.includes('logo-pro-rund.png') || !html.includes('PA_PRO')) throw new Error('index.html: Pro-Zeichen nicht gesetzt');
  writeFileSync(join(ziel, 'index.html'), html);
  const m = JSON.parse(readFileSync(join(ziel, 'manifest.webmanifest'), 'utf8'));
  m.name = m.short_name = NAME; m.icons = [{ src: 'bilder/logo-pro-rund.png', sizes: '192x192', type: 'image/png', purpose: 'any' }];
  writeFileSync(join(ziel, 'manifest.webmanifest'), JSON.stringify(m, null, 2) + '\n');
  writeFileSync(join(ziel, 'favicon.ico'), ico(readFileSync(join(WURZEL, 'bilder/logo-pro-rund.png'))));
  let commit = ''; try { commit = execFileSync('git', ['-C', WURZEL, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(); } catch { /* ohne Git */ }
  const fassung = (/app\.js\?v=([\d.]+)/.exec(html) || [])[1] || '';
  writeFileSync(join(ziel, 'native-bundle.json'), JSON.stringify({ app: NAME, fassung, commit, klone: KLONE, privatBrain: android ? 'App-Seite (prepare-web)' : 'Web-Seite' }, null, 2) + '\n');
  const groesse = (p) => statSync(p).isDirectory() ? readdirSync(p).reduce((s, n) => s + groesse(join(p, n)), 0) : statSync(p).size;
  console.log(`Web-Paket ${NAME} ${fassung}: ${(groesse(ziel) / 1048576).toFixed(0)} MB nach ${ziel}`);
  return ziel;
}
/** ICO mit dem unveränderten PNG darin (192 px). */
export function ico(png) {
  const w = png.readUInt32BE(16), h = png.readUInt32BE(20);
  const k = Buffer.alloc(22); k.writeUInt16LE(1, 2); k.writeUInt16LE(1, 4); k[6] = w >= 256 ? 0 : w; k[7] = h >= 256 ? 0 : h;
  k.writeUInt16LE(1, 10); k.writeUInt16LE(32, 12); k.writeUInt32LE(png.length, 14); k.writeUInt32LE(22, 18);
  return Buffer.concat([k, png]);
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2), android = a.includes('--android'), z = a.find((x) => !x.startsWith('--'));
  bauen(z ? resolve(z) : undefined, { android });
}
