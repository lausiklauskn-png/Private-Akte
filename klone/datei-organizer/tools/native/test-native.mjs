// Probe der Android-Hülle ohne Android (Datei-Organizer Pro): Web-Paket, Kennungen, Fassungen, Rechte, Update-Feed.
//   npm run build && node tools/native/test-native.mjs
import { readFile, readdir, mkdtemp, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, extname } from 'node:path';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { prepareWeb, absolutePfade, istLaufzeit, root } from './prepare-web.mjs';

let gruen = 0, rot = 0;
const soll = (name, bed, mehr = '') => { if (bed) { gruen++; console.log('  ✓ ' + name); } else { rot++; console.log('  ✗ ROT: ' + name + (mehr ? ' – ' + mehr : '')); } };
const lies = (p) => readFile(join(root, p), 'utf8');
const JAVA = 'android/app/src/main/java/de/familyprojekt/dateiorganizer/';

console.log('Web-Paket');
const beleg = await prepareWeb();
const www = join(root, 'www');
soll('index.html im Paket', existsSync(join(www, 'index.html')));
soll('Service Worker nicht im Paket', !existsSync(join(www, 'sw.js')));
soll('Texterkennung und Prüfkern im Paket', existsSync(join(www, 'vendor/tesseract/tesseract.min.js')) && existsSync(join(www, 'vendor/pruefkern/pruefer-mail.js')));
soll('Beleg nennt jede Datei mit Prüfsumme', beleg.dateien.length > 5 && beleg.dateien.every((d) => /^[a-f0-9]{64}$/.test(d.sha256)));
{
  const app = (await readdir(join(root, 'app'), { recursive: true, withFileTypes: true })).filter((e) => e.isFile()).length;
  let gleich = true;
  const web = beleg.dateien.filter((d) => !d.pfad.startsWith('testdaten/'));
  for (const d of web) if (!(await readFile(join(root, 'app', d.pfad))).equals(await readFile(join(www, d.pfad)))) gleich = false;
  soll('Paket = app/ ohne sw.js, byte-gleich', gleich && web.length === app - 1, web.length + ' / ' + app);
  const liste = JSON.parse(await readFile(join(root, 'testdaten/dateien.json'), 'utf8'));
  soll('Testordner im Paket (dateien.json und alle genannten Dateien)', liste.every((p) => existsSync(join(www, 'testdaten', p))) && existsSync(join(www, 'testdaten/dateien.json')), liste.length + ' Dateien');
}
soll('absolute Pfade werden erkannt', absolutePfade('<script src="/assets/x.js"></script><link href="./a.css">').join() === '/assets/x.js');
soll('index.html im Paket nutzt nur relative Pfade', absolutePfade(await readFile(join(www, 'index.html'), 'utf8')).length === 0);
soll('Punktdateien und Quellkarten nie im Paket', !istLaufzeit('.env') && !istLaufzeit('assets/a.js.map') && !istLaufzeit('sw.js') && istLaufzeit('assets/a.js'));

console.log('Kennungen und Namen');
const cap = JSON.parse(await lies('capacitor.config.json'));
const gradle = await lies('android/app/build.gradle'), strings = await lies('android/app/src/main/res/values/strings.xml');
soll('Paket de.familyprojekt.dateiorganizer überall', cap.appId === 'de.familyprojekt.dateiorganizer' && gradle.includes('applicationId "de.familyprojekt.dateiorganizer"') && gradle.includes('namespace = "de.familyprojekt.dateiorganizer"'));
soll('App heißt „Datei-Organizer Pro“', cap.appName === 'Datei-Organizer Pro' && strings.includes('<string name="app_name">Datei-Organizer Pro</string>'));
soll('Web-App heißt „Datei-Organizer Basic“', JSON.parse(await lies('src/public/manifest.webmanifest')).name === 'Datei-Organizer Basic');
soll('webDir www, keine Fehlersuche in der WebView', cap.webDir === 'www' && cap.android?.webContentsDebuggingEnabled === false && cap.android?.allowMixedContent === false);

console.log('Fassung');
const pkg = JSON.parse(await lies('package.json')), ver = JSON.parse(await lies('src/public/version.json'));
const fassung = (/export const FASSUNG = "([^"]+)"/.exec(await lies('src/app.tsx')) || [])[1];
const vName = (/versionName "([^"]+)"/.exec(gradle) || [])[1], vCode = Number((/versionCode (\d+)/.exec(gradle) || [])[1]);
soll('package.json = version.json = FASSUNG = versionName', pkg.version === ver.fassung && ver.fassung === fassung && fassung === vName, [pkg.version, ver.fassung, fassung, vName].join(' / '));
{ const [a, b, c] = vName.split('.').map(Number); soll('versionCode passt zur Fassung (Haupt×1000 + Neben×10 + Flick)', vCode === a * 1000 + b * 10 + c, String(vCode)); }

console.log('Rechte und Freigaben');
const manifest = await lies('android/app/src/main/AndroidManifest.xml');
const rechte = [...manifest.matchAll(/uses-permission android:name="([^"]+)"/g)].map((m) => m[1]).sort();
soll('nur INTERNET und REQUEST_INSTALL_PACKAGES', JSON.stringify(rechte) === JSON.stringify(['android.permission.INTERNET', 'android.permission.REQUEST_INSTALL_PACKAGES']), rechte.join());
soll('keine Android-Sicherung des App-Speichers, kein Klartext-Netz', manifest.includes('android:allowBackup="false"') && manifest.includes('android:usesCleartextTraffic="false"'));
const pfade = await lies('android/app/src/main/res/xml/file_paths.xml');
soll('FileProvider gibt nur update/ frei', [...pfade.matchAll(/<(\w+-path)/g)].length === 1 && pfade.includes('<cache-path name="update" path="update/" />'));

console.log('Plugins');
const main = await lies(JAVA + 'MainActivity.java'), ordner = await lies(JAVA + 'DoOrdnerPlugin.java'), upd = await lies(JAVA + 'DoUpdatesPlugin.java'), feed = await lies(JAVA + 'UpdateFeed.java');
soll('MainActivity meldet Ordner- und Update-Plugin an', main.includes('registerPlugin(DoOrdnerPlugin.class)') && main.includes('registerPlugin(DoUpdatesPlugin.class)'));
soll('Ordner-Plugin heißt „FamilyFolders“ wie in src/quellen.ts', ordner.includes('@CapacitorPlugin(name = "FamilyFolders")') && (await lies('src/quellen.ts')).includes('?.FamilyFolders'));
for (const m of ['ordnerWaehlen', 'ordnerListe', 'dateiLesen', 'dateiBeginn', 'dateiAnhaengen', 'dateiFertig'])
  soll('Ordner-Plugin kann ' + m + ' (Aufruf in src/quellen.ts)', ordner.includes('public void ' + m + '(PluginCall call)'));
for (const m of ['gemerkt', 'wiederOeffnen', 'vergessen'])
  soll('Ordner-Plugin merkt dauerhaft: ' + m + ' (Aufruf in src/quellen.ts)', ordner.includes('public void ' + m + '(PluginCall call)') && new RegExp('\\.' + m + '\\??\\.?\\(').test(await lies('src/quellen.ts')));
soll('dauerhafte Ordnerfreigabe (takePersistableUriPermission, höchstens 5)', ordner.includes('takePersistableUriPermission') && ordner.includes('FLAG_GRANT_PERSISTABLE_URI_PERMISSION') && ordner.includes('releasePersistableUriPermission'));
const eing = await lies(JAVA + 'DoEingangPlugin.java'), dat = await lies(JAVA + 'DoDateienPlugin.java');
soll('MainActivity meldet Eingang (Teilen/Öffnen mit) und Speichern unter an', main.includes('registerPlugin(DoEingangPlugin.class)') && main.includes('registerPlugin(DoDateienPlugin.class)'));
soll('Eingang-Plugin „DoEingang“ mit abholen/lesen wie src/quellen.ts', eing.includes('@CapacitorPlugin(name = "DoEingang")') && ['abholen', 'lesen'].every((m) => eing.includes('public void ' + m + '(PluginCall call)')) && (await lies('src/quellen.ts')).includes('DoEingang'));
soll('Speichern-Plugin „DoDateien“ mit speichern (Zwischenspeicher vor dem Dialog)', dat.includes('@CapacitorPlugin(name = "DoDateien")') && dat.includes('public void speichern(PluginCall call)') && dat.includes('ACTION_CREATE_DOCUMENT') && dat.includes('getCacheDir()'));
soll('Manifest: Teilen (SEND/SEND_MULTIPLE) und „Öffnen mit“ (VIEW, nur content:)', manifest.includes('android.intent.action.SEND_MULTIPLE') && /action\.VIEW[\s\S]*?android:scheme="content"/.test(manifest));
soll('nie call.getLong (kleine Zahlen kommen als Integer)', ![ordner, upd, eing, dat].some((t) => /call\.getLong\(/.test(t)));
soll('Update-Plugin heißt „DoUpdates“ wie in src/nativ.ts', upd.includes('@CapacitorPlugin(name = "DoUpdates")') && (await lies('src/nativ.ts')).includes('DoUpdates'));
soll('Feed-Adresse family-projekt.de/updates/datei-organizer/', feed.includes('"https://family-projekt.de/updates/datei-organizer/"'));
const schluessel = (/static final String SCHLUESSEL = "([^"]*)"/.exec(feed) || [])[1];
soll('Update-Schlüssel: Platzhalter leer oder gültiger Ed25519-Schlüssel', schluessel === '' || /^MCowBQYDK2VwAyEA[A-Za-z0-9+/]{43}=$/.test(schluessel));
if (schluessel === '') console.log('  · Hinweis: öffentlicher Update-Schlüssel fehlt noch (Klaus, docs/ANDROID.md Schritt b) – Updates melden „nicht eingerichtet“.');

console.log('Windows (gleiche Verträge wie Android)');
{
  const vertr = JSON.parse(await lies('windows/bridge/contracts.json'));
  const tauri = JSON.parse(await lies('windows/src-tauri/tauri.conf.json')), cargo = await lies('windows/src-tauri/Cargo.toml'), wpkg = JSON.parse(await lies('windows/package.json'));
  soll('Windows-Fassung = Fassung (tauri.conf, Cargo.toml, windows/package.json)', tauri.version === fassung && cargo.includes(`version = "${fassung}"`) && wpkg.version === fassung, [tauri.version, wpkg.version].join(' / '));
  soll('Windows heißt „Datei-Organizer Pro“, Kennung wie Android', tauri.productName === 'Datei-Organizer Pro' && tauri.identifier === 'de.familyprojekt.dateiorganizer');
  const java = { FamilyFolders: ordner, DoUpdates: upd, DoEingang: eing, DoDateien: dat };
  for (const [plugin, methoden] of Object.entries(vertr)) for (const m of methoden)
    soll(`Windows-Vertrag ${plugin}.${m} gibt es auch unter Android`, (java[plugin] || '').includes('public void ' + m + '(PluginCall call)'));
  const wSchl = (/static final String SCHLUESSEL = "([^"]*)"/.exec(await lies('windows/engine/src/DesktopUpdates.java')) || [])[1];
  soll('Update-Schlüssel unter Windows = Android (ein Schlüssel für beide)', wSchl === schluessel);
  soll('Windows-Updates aus dem eigenen Ordner', (await lies('windows/engine/src/DesktopUpdates.java')).includes('"https://family-projekt.de/updates/datei-organizer/"'));
}

console.log('Update-Feed');
{
  const t = await mkdtemp(join(tmpdir(), 'do-feed-'));
  try {
    const apk = join(t, `Datei-Organizer-Pro-${vName}.apk`); await writeFile(apk, Buffer.from('probe'));
    execFileSync(process.execPath, [join(root, 'tools/native/update-feed-android.mjs'), apk, join(t, 'aktuell-android.json')], { stdio: 'pipe' });
    const f = JSON.parse(await readFile(join(t, 'aktuell-android.json'), 'utf8'));
    soll('Feed: app, Version, Dateiname, versionCode, Prüfsumme', f.format === 1 && f.app === 'datei-organizer' && f.version === vName && f.android.datei === `Datei-Organizer-Pro-${vName}.apk` && f.android.versionCode === vCode && f.android.groesse === 5 && /^[a-f0-9]{64}$/.test(f.android.sha256));
    const falsch = join(t, 'BookLedgerPro-' + vName + '.apk'); await writeFile(falsch, 'x');
    let ab = false; try { execFileSync(process.execPath, [join(root, 'tools/native/update-feed-android.mjs'), falsch, join(t, 'x.json')], { stdio: 'pipe' }); } catch { ab = true; }
    soll('Feed: fremder Dateiname wird abgewiesen', ab);
  } finally { await rm(t, { recursive: true, force: true }); }
}
console.log('App-Paket im Browser (Wurzel wie https://localhost/, Capacitor gestellt)');
{
  let chromium = null;
  try { chromium = createRequire(import.meta.url)('playwright').chromium; } catch { console.log('  · übersprungen: Playwright fehlt'); }
  if (chromium) {
    const TYP = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.wasm': 'application/wasm' };
    const srv = createServer(async (q, r) => {
      try { let p = decodeURIComponent(new URL(q.url, 'http://x').pathname); if (p.endsWith('/')) p += 'index.html'; if (p.includes('..')) throw 0;
        const b = await readFile(join(www, p)); r.writeHead(200, { 'content-type': TYP[extname(p)] || 'application/octet-stream' }); r.end(b); }
      catch { r.writeHead(404); r.end(); }
    });
    await new Promise((ok) => srv.listen(0, '127.0.0.1', ok));
    const browser = await chromium.launch();
    try {
      const ctx = await browser.newContext({ viewport: { width: 400, height: 800 } });
      await ctx.addInitScript(() => { window.Capacitor = { isNativePlatform: () => true, Plugins: {} }; });
      const page = await ctx.newPage(); const fehler = []; page.on('pageerror', (e) => fehler.push(String(e)));
      await page.goto(`http://127.0.0.1:${srv.address().port}/`);
      await page.waitForSelector('[data-app-name]', { timeout: 15000 }).catch(() => {});
      soll('App startet aus dem Paket an der Wurzel und heißt „Datei-Organizer Pro“', (await page.locator('[data-app-name]').innerText().catch(() => '')).replace(/\s+/g, ' ') === 'Datei-Organizer Pro');
      await page.locator('[data-testordner]').click();
      await page.waitForFunction(() => /· \d+/.test(document.querySelector('[data-ordner-pill]')?.textContent || ''), null, { timeout: 60000 }).catch(() => {});
      const pill = await page.locator('[data-ordner-pill]').innerText().catch(() => '');
      soll('Knopf „Testordner“ liest den Testordner aus dem Paket', /Testordner.*· (\d+)/.test(pill) && Number(pill.match(/· (\d+)/)[1]) >= 101, pill);
      soll('keine Fehler in der Seite', fehler.length === 0, fehler.slice(0, 2).join(' | '));
    } finally { await browser.close(); srv.close(); }
  }
}
console.log(`Native: ${gruen} grün · ${rot} ROT`);
process.exit(rot ? 1 : 0);
