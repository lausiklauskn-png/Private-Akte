#!/usr/bin/env node
// Probe der Pro-Akte ohne Android und Windows: Web-Paket, Kennung, Fassung, Rechte, Gerätezugriffe aus den Klonen, Start im Browser.
//   node tools/native/test-native.mjs
import { existsSync, readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { extname, join } from 'node:path';
import { bauen, WURZEL, NAME, BRAIN_WURZEL, RAHMEN_SEITEN } from './web-paket.mjs';
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
const PB_RECHTE = ['android.permission.ACCESS_NETWORK_STATE', 'android.permission.FOREGROUND_SERVICE', 'android.permission.FOREGROUND_SERVICE_DATA_SYNC', 'android.permission.MODIFY_AUDIO_SETTINGS', 'android.permission.POST_NOTIFICATIONS'];
soll('nur Internet, Kamera, Kalender, Updates und die von Private Brain Pro', JSON.stringify(rechte) === JSON.stringify(['android.permission.CAMERA', 'android.permission.INTERNET', 'android.permission.READ_CALENDAR', 'android.permission.REQUEST_INSTALL_PACKAGES', 'android.permission.WRITE_CALENDAR', ...PB_RECHTE].sort()), rechte.join());
{ const meta = (n) => (new RegExp(`android:name="de\\.familyprojekt\\.update\\.${n}" android:value="([^"]*)"`).exec(manifest) || [])[1];
  const k = Buffer.from(meta('schluessel') || '', 'base64');
  soll('Update-Ziel der Akte im Manifest (eigener Ordner, eigener Name, gültiger Ed25519-Schlüssel)', meta('basis') === 'https://family-projekt.de/updates/private-akte/'
    && meta('app') === 'private-akte' && meta('datei') === 'Private-Akte-Pro' && k.length === 44 && k.subarray(0, 12).toString('hex') === '302a300506032b6570032100');
  soll('Update-Schlüssel der Akte ist nicht der des Organizers', !lies('klone/datei-organizer/android/app/src/main/java/de/familyprojekt/dateiorganizer/UpdateFeed.java').includes(meta('schluessel')));
  soll('Update-APK liegt im Cache-Ordner update/ (FileProvider)', lies('android/app/src/main/res/xml/file_paths.xml').includes('<cache-path name="update" path="update/" />')); }
{ const pbm = readFileSync(join(WURZEL, 'klone/privat-brain-pro/android/app/src/main/AndroidManifest.xml'), 'utf8');
  const pbr = [...pbm.matchAll(/uses-permission android:name="([^"]+)"/g)].map((m) => m[1]).filter((r) => r !== 'android.permission.REQUEST_INSTALL_PACKAGES');
  soll('Rechte von Private Brain Pro stehen in dessen Manifest (keins erfunden)', JSON.stringify(PB_RECHTE) === JSON.stringify(pbr.filter((r) => r !== 'android.permission.INTERNET').sort()), pbr.join());
  soll('Hintergrunddienst von Private Brain Pro angemeldet', manifest.includes('android:name="de.familyprojekt.hintergrund.ProHintergrundDienst"')); }
soll('keine Android-Sicherung des App-Speichers, kein Klartext-Netz', manifest.includes('android:allowBackup="false"') && manifest.includes('android:usesCleartextTraffic="false"'));

console.log('Gerätezugriffe aus den Klonen');
const main = lies('android/app/src/main/java/de/familyprojekt/privateakte/MainActivity.java');
const angemeldet = [...main.matchAll(/registerPlugin\(([\w.]+)\.class\)/g)].map((m) => m[1]);
const liste = Object.entries(QUELLEN.android.dateien).flatMap(([k, d]) => d.map((p) => ({ k, p })));
for (const kl of angemeldet) {
  const datei = liste.find(({ p }) => p.endsWith(kl.replace(/\./g, '/') + '.java'));
  soll(`${kl.split('.').pop()} kommt aus dem Klon ${datei?.k || '?'}`, !!datei);
}
soll('Hülle erbt von der MainActivity aus dem Klon Private Brain Pro', /class MainActivity extends de\.familyprojekt\.privatebrain\.pro\.MainActivity/.test(main)
  && liste.some(({ k, p }) => k === 'privat-brain-pro' && p.endsWith('privatebrain/pro/MainActivity.java')));
{ const pbMain = readFileSync(join(WURZEL, 'klone/privat-brain-pro/android/app/src/main/java/de/familyprojekt/privatebrain/pro/MainActivity.java'), 'utf8');
  const pbPlugins = [...pbMain.matchAll(/registerPlugin\(([\w.]+)\.class\)/g)].map((m) => m[1].split('.').pop());
  soll(`Alle ${pbPlugins.length} Plugins von Private Brain Pro (auch ProMail) kommen aus dem Klon`, pbPlugins.includes('ProMailPlugin')
    && pbPlugins.every((n) => liste.some(({ p }) => p.endsWith('/' + n + '.java')))); }
for (const n of ['Ablage', 'DateiAblage', 'Eintrag', 'Ersatzschluessel']) {
  const a = readFileSync(join(WURZEL, `klone/privat-brain-pro/android/app/src/main/java/de/familyprojekt/tresor/${n}.java`));
  const b = readFileSync(join(WURZEL, `klone/familienakte/android/app/src/main/java/de/familyprojekt/tresor/${n}.java`));
  soll(`tresor/${n}.java in Private Brain Pro und Familienakte byte-gleich (einmal übersetzt)`, a.equals(b));
}
{ const g = lies('android/app/build.gradle'), pg = readFileSync(join(WURZEL, 'klone/privat-brain-pro/android/app/build.gradle'), 'utf8');
  const dep = [...pg.matchAll(/implementation '([^']+)'/g)].map((m) => m[1]);
  soll('Mail-Bibliotheken in derselben Fassung wie Private Brain Pro', dep.length === 3 && dep.every((d) => g.includes(`implementation '${d}'`)), dep.join()); }
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
      // Diktat (Fold 7, 24.11.): die WebView hat keine eigene Spracherkennung – in der App hört Androids Sprachfenster (ProSpeech) zu.
      { const sp = await ctx.newPage(); const spFehler = []; sp.on('pageerror', (e) => spFehler.push(String(e)));
        await sp.addInitScript(() => { window.__gehoert = []; delete window.webkitSpeechRecognition; delete window.SpeechRecognition;
          window.Capacitor = { isNativePlatform: () => true, getPlatform: () => 'android', Plugins: { ProSpeech: { listen: async (o) => { window.__gehoert.push(o.language); return { cancelled: false, text: 'Rechnung Zahnarzt' }; } } } }; });
        await sp.goto(`http://127.0.0.1:${srv.address().port}/`); await sp.waitForTimeout(2500);
        const knopf = await sp.$('[data-a=suche-mikro]');
        soll('Mikrofon am Suchfeld auch ohne Spracherkennung der WebView', !!knopf);
        if (knopf) { await knopf.click(); await sp.waitForTimeout(600); }
        const wert = await sp.evaluate(() => document.querySelector('form.suche input[name=q]')?.value || '');
        soll('Tipp aufs Mikrofon öffnet Androids Sprachfenster, das Gehörte steht im Suchfeld', wert.includes('Rechnung Zahnarzt') && (await sp.evaluate(() => window.__gehoert.join())) === 'de-DE', wert);
        soll('keine Fehler beim Diktat', spFehler.length === 0, spFehler.slice(0, 2).join(' | ')); }
      const pb = await ctx.newPage(); const pbFehler = []; pb.on('pageerror', (e) => pbFehler.push(String(e)));
      await pb.goto(`http://127.0.0.1:${srv.address().port}/klone/privat-brain-pro/index.html`); await pb.waitForTimeout(3000);
      soll('Private Brain Pro (Klon 1:1) startet aus dem Paket', (await pb.evaluate(() => document.body.innerText)).includes('Private Brain') && !pbFehler.length, pbFehler.slice(0, 2).join(' | '));
    } finally { await browser.close(); srv.close(); }
  }
}
rmSync(www, { recursive: true, force: true });

console.log('Android: Private Brain Pro als App-Seite (Mail nativ)');
{
  const pb = process.env.PA_BRAIN_WEB || join(WURZEL, '.cache/privat-brain-pro-www');
  if (!existsSync(join(pb, 'index.html'))) console.log('  · übersprungen: erst node tools/native/brain-web.mjs (lädt Texterkennung und Film)');
  else {
    const a = bauen(mkdtempSync(join(tmpdir(), 'pa-www-a-')), { android: true, brain: pb });
    const pi = readFileSync(join(a, 'klone/privat-brain-pro/index.html'), 'utf8');
    soll('App-Seite mit der nativen Mail (native-mail.js) statt der Web-Seite', pi.includes('<script src="native-mail.js"></script>') && existsSync(join(a, 'klone/privat-brain-pro/native-mail.js')) && !existsSync(join(a, 'klone/privat-brain-pro/sw.js')));
    soll('Kalender im Rahmen: Diktat über Androids Sprachfenster nach der Brücke', readFileSync(join(a, 'rahmen/kalender/index.html'), 'utf8').includes('<script src="/rahmen/capacitor-rahmen.js"></script>\n<script src="/klone/familienakte/public/native/familienakte-android.js"></script>') && existsSync(join(a, 'klone/familienakte/public/native/familienakte-android.js')));
    soll('jede Seite im Rahmen nimmt als erstes Skript die Brücke des Hauptfensters',RAHMEN_SEITEN.every((p) => /<head>\s*<script src="\/rahmen\/capacitor-rahmen\.js"><\/script>/.test(readFileSync(join(a, p), 'utf8'))) && existsSync(join(a, 'rahmen/capacitor-rahmen.js')));
    soll('an der Wurzel, was Java und Seite dort erwarten', BRAIN_WURZEL.every((t) => existsSync(join(a, t))), BRAIN_WURZEL.filter((t) => !existsSync(join(a, t))).join());
    soll('Hülle der Akte unverändert im Paket', ['app.js', 'tresor.js', 'rahmen/kalender/kalender.js'].every((p) => readFileSync(join(a, p)).equals(readFileSync(join(WURZEL, p)))));
    // Wie Capacitor 8 am Gerät: im Rahmen gibt es eine eigene Brücke, die nie antwortet; nur das Hauptfenster antwortet.
    let chromium = null; try { chromium = createRequire(import.meta.url)('playwright').chromium; } catch { /* oben schon gemeldet */ }
    if (chromium) {
      const srv = createServer((q, r) => { try { let p = decodeURIComponent(new URL(q.url, 'http://x').pathname); if (p.endsWith('/')) p += 'index.html'; if (p.includes('..')) throw 0;
        const b = readFileSync(join(a, p)); r.writeHead(200, { 'content-type': ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.wasm': 'application/wasm' })[extname(p)] || 'application/octet-stream' }); r.end(b); } catch { r.writeHead(404); r.end(); } });
      await new Promise((ok) => srv.listen(0, '127.0.0.1', ok));
      const browser = await chromium.launch();
      try {
        const ctx = await browser.newContext({ viewport: { width: 1200, height: 800 } });
        await ctx.addInitScript(() => {
          const oben = window === window.top, calls = oben ? (window.__aufrufe = []) : null;
          const plugin = (n) => new Proxy({}, { get: (_, m) => m === 'then' ? undefined : (m === 'addListener' ? async () => ({ remove() {} })
            : (...x) => oben ? (calls.push(n + '.' + String(m)), Promise.resolve({})) : new Promise(() => {})) });
          window.Capacitor = { isNativePlatform: () => true, getPlatform: () => 'android', isPluginAvailable: () => true, Plugins: new Proxy({}, { get: (_, n) => plugin(String(n)) }), registerPlugin: (n) => plugin(n) };
        });
        const page = await ctx.newPage(); const port = srv.address().port;
        await page.goto(`http://127.0.0.1:${port}/rechtliches.html`);
        await page.evaluate(() => { const f = document.createElement('iframe'); f.src = '/klone/privat-brain-pro/index.html'; document.body.append(f); });
        await page.waitForTimeout(5000);
        const aufrufe = await page.evaluate(() => [...new Set(window.__aufrufe)]);
        soll('Private Brain im Rahmen ruft die Plugins über das Hauptfenster (ProVault, ProMail …)', aufrufe.some((x) => x.startsWith('ProVault.')) && aufrufe.some((x) => x.startsWith('ProMail') || x.startsWith('ProFiles.')), aufrufe.slice(0, 8).join(' '));
      } finally { await browser.close(); srv.close(); }
    }
    rmSync(a, { recursive: true, force: true });
  }
}
console.log(`Native: ${gruen} grün · ${rot} ROT`);
process.exit(rot ? 1 : 0);
