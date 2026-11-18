#!/usr/bin/env node
// Probe der Pro-Akte ohne Android und Windows: Web-Paket, Kennung, Fassung, Rechte, Gerätezugriffe aus den Klonen, Start im Browser.
//   node tools/native/test-native.mjs
import { existsSync, readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { extname, join } from 'node:path';
import { bauen, WURZEL, NAME } from './web-paket.mjs';
import { QUELLEN } from './klon-quellen.mjs';

let gruen = 0, rot = 0;
const soll = (n, b, m = '') => { if (b) { gruen++; console.log('  ✓ ' + n); } else { rot++; console.log('  ✗ ROT: ' + n + (m ? ' – ' + m : '')); } };
const lies = (p) => readFileSync(join(WURZEL, p), 'utf8');
const KENNUNG = 'de.familyprojekt.privateakte';

console.log('Web-Paket');
const www = bauen(mkdtempSync(join(tmpdir(), 'pa-www-')));
soll('index.html, Hülle und Rahmen im Paket', ['index.html', 'app.js', 'tresor.js', 'rahmen/kalender/index.html', 'rahmen/datei-organizer/app/index.html'].every((p) => existsSync(join(www, p))));
soll('kein sw.js der Akte im Paket', !existsSync(join(www, 'sw.js')));
soll('Klone ohne Prüfstapel, docs, android/, windows/', !['klone/datei-organizer/pruefstapel-rest', 'klone/datei-organizer/android', 'klone/familienakte/docs', 'klone/familienakte/windows'].some((p) => existsSync(join(www, p))));
const html = readFileSync(join(www, 'index.html'), 'utf8');
soll('Pro-Zeichen im Kopf und als Favicon, Titel „Private Akte Pro“', html.includes('src="./bilder/logo-pro-rund.png"') && html.includes('rel="icon" href="./bilder/logo-pro-rund.png"') && html.includes(`<title>${NAME}</title>`));
soll('keine absoluten Pfade in index.html', ![...html.matchAll(/\s(?:src|href)="(\/[^"]*)"/g)].length);

console.log('Kennung, Name, Fassung');
const cap = JSON.parse(lies('capacitor.config.json')), gradle = lies('android/app/build.gradle'), strings = lies('android/app/src/main/res/values/strings.xml');
const tauri = JSON.parse(lies('windows/src-tauri/tauri.conf.json')), cargo = lies('windows/src-tauri/Cargo.toml'), wpkg = JSON.parse(lies('windows/package.json'));
soll('Kennung überall ' + KENNUNG, cap.appId === KENNUNG && gradle.includes(`applicationId "${KENNUNG}"`) && gradle.includes(`namespace = "${KENNUNG}"`) && tauri.identifier === KENNUNG);
soll('Name „Private Akte Pro“ überall', cap.appName === NAME && strings.includes(`<string name="app_name">${NAME}</string>`) && tauri.productName === NAME);
const vName = (/versionName "([^"]+)"/.exec(gradle) || [])[1], vCode = Number((/versionCode (\d+)/.exec(gradle) || [])[1]);
soll('Fassung gleich in Android, Windows, Cargo', vName === tauri.version && tauri.version === wpkg.version && cargo.includes(`version = "${vName}"`), [vName, tauri.version, wpkg.version].join(' / '));
{ const [a, b, c] = vName.split('.').map(Number); soll('versionCode = Haupt×1000 + Neben×10 + Flick', vCode === a * 1000 + b * 10 + c, String(vCode)); }
soll('webDir www, keine Fehlersuche in der WebView', cap.webDir === 'www' && cap.android?.webContentsDebuggingEnabled === false);

console.log('Rechte');
const manifest = lies('android/app/src/main/AndroidManifest.xml');
const rechte = [...manifest.matchAll(/uses-permission android:name="([^"]+)"/g)].map((m) => m[1]).sort();
soll('nur Internet, Kamera, Kalender', JSON.stringify(rechte) === JSON.stringify(['android.permission.CAMERA', 'android.permission.INTERNET', 'android.permission.READ_CALENDAR', 'android.permission.WRITE_CALENDAR']), rechte.join());
soll('keine Android-Sicherung des App-Speichers, kein Klartext-Netz', manifest.includes('android:allowBackup="false"') && manifest.includes('android:usesCleartextTraffic="false"'));

console.log('Gerätezugriffe aus den Klonen');
const main = lies('android/app/src/main/java/de/familyprojekt/privateakte/MainActivity.java');
const angemeldet = [...main.matchAll(/registerPlugin\(([\w.]+)\.class\)/g)].map((m) => m[1]);
const liste = Object.entries(QUELLEN.android.dateien).flatMap(([k, d]) => d.map((p) => ({ k, p })));
for (const kl of angemeldet) {
  const datei = liste.find(({ p }) => p.endsWith(kl.replace(/\./g, '/') + '.java'));
  soll(`${kl.split('.').pop()} kommt aus dem Klon ${datei?.k || '?'}`, !!datei);
}
const java = Object.fromEntries(liste.map(({ k, p }) => { const t = readFileSync(join(WURZEL, 'klone', k, p), 'utf8'); return [(/@CapacitorPlugin\(name = "(\w+)"/.exec(t) || [])[1], t]; }).filter(([n]) => n));
const vertr = JSON.parse(lies('windows/bridge/contracts.json'));
for (const [plugin, methoden] of Object.entries(vertr)) for (const m of methoden)
  soll(`Windows-Vertrag ${plugin}.${m} gibt es auch unter Android`, (java[plugin] || '').includes('public void ' + m + '(PluginCall call)'));
soll('Windows-Brücke kennt genau die Plugins des Vertrags', JSON.stringify(Object.keys(vertr).sort()) === JSON.stringify([...lies('windows/bridge/capacitor-tauri.js').matchAll(/'(FamilyFolders|DoEingang|DoDateien|DoUpdates)'/g)].map((m) => m[1]).sort()));

console.log('Start aus dem Paket (Wurzel wie https://localhost/, Capacitor gestellt)');
{
  let chromium = null;
  try { chromium = createRequire(import.meta.url)('playwright').chromium; } catch { console.log('  · übersprungen: Playwright fehlt'); }
  if (chromium) {
    const TYP = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.wasm': 'application/wasm', '.webmanifest': 'application/manifest+json' };
    const srv = createServer((q, r) => {
      try { let p = decodeURIComponent(new URL(q.url, 'http://x').pathname); if (p.endsWith('/')) p += 'index.html'; if (p.includes('..')) throw 0;
        const b = readFileSync(join(www, p)); r.writeHead(200, { 'content-type': TYP[extname(p)] || 'application/octet-stream' }); r.end(b); }
      catch { r.writeHead(404); r.end(); }
    });
    await new Promise((ok) => srv.listen(0, '127.0.0.1', ok));
    const browser = await chromium.launch();
    try {
      const ctx = await browser.newContext({ viewport: { width: 400, height: 800 } });
      await ctx.addInitScript(() => { window.Capacitor = { isNativePlatform: () => true, getPlatform: () => 'android', Plugins: {} }; });
      const page = await ctx.newPage(); const fehler = []; page.on('pageerror', (e) => fehler.push(String(e)));
      await page.goto(`http://127.0.0.1:${srv.address().port}/`);
      await page.waitForTimeout(2500);
      soll('Startseite steht, Pro-Zeichen im Kopf', await page.evaluate(() => !!document.querySelector('img.logo[src*="logo-pro-rund"]') && document.body.innerText.length > 50));
      soll('keine Fehler in der Seite', fehler.length === 0, fehler.slice(0, 2).join(' | '));
    } finally { await browser.close(); srv.close(); }
  }
}
rmSync(www, { recursive: true, force: true });
console.log(`Native: ${gruen} grün · ${rot} ROT`);
process.exit(rot ? 1 : 0);
