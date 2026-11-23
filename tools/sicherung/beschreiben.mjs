// Schreibt INHALT.md und Geschenkbox.html in den Paket-Ordner.
// Eingabe: TSV aus sammeln.sh (eine Zeile je App). Die Links in Geschenkbox.html sind relativ:
// liegen alle Dateien in einem Ordner, öffnet die Seite sie ohne Netz.
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const PAKET = process.env.PAKET;
const STAND = process.env.STAND;
const spalten = ['repo', 'name', 'rolle', 'zip', 'commits', 'zweige', 'tags', 'kopf', 'erster', 'zuletzt',
  'apk', 'apktag', 'exe', 'exetag', 'web', 'webart'];
const apps = readFileSync(process.argv[2], 'utf8').split('\n').filter(Boolean)
  .map((z) => Object.fromEntries(z.split('\t').map((w, i) => [spalten[i], w])));

const mb = (f) => {
  try { return `${Math.round(statSync(join(PAKET, f)).size / 1048576)} MB`; } catch { return ''; }
};
const fassung = (tag) => (tag || '').replace(/^(android|windows)-/, '').replace(/^v/, '');
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// INHALT.md
let md = `# Sicherung und Geschenkbox – Stand ${STAND}\n\n`;
md += 'Alle Apps rund um die Private Akte: Quellcode mit vollem Verlauf, Android-App, Windows-Installer und Web-App. ';
md += 'Private Brain V3 gehört nicht dazu (eigene App). Wie man daraus alles wiederherstellt: `WIEDERHERSTELLEN.md`.\n\n';
md += '| App | Wozu | Quellcode (Commits · Zweige · Tags · Zeitraum · Stand) | Android | Windows | Web-App |\n|---|---|---|---|---|---|\n';
for (const a of apps) {
  md += `| **${a.name}** (\`${a.repo}\`) | ${a.rolle} | \`${a.zip}\` (${mb(a.zip)}) · ${a.commits} · ${a.zweige} · ${a.tags} · ${a.erster} bis ${a.zuletzt} · \`${a.kopf}\` | `;
  md += `${a.apk ? `\`${a.apk}\` (${fassung(a.apktag)}, ${mb(a.apk)})` : '–'} | `;
  md += `${a.exe ? `\`${a.exe}\` (${fassung(a.exetag)}, ${mb(a.exe)})` : '–'} | `;
  md += `${a.web ? `\`${a.web}\` (${mb(a.web)}; ${a.webart})` : '–'} |\n`;
}
md += '\nPrüfsummen aller Dateien: `SHA256SUMS` (prüfen mit `sha256sum -c SHA256SUMS`).\n';
writeFileSync(join(PAKET, 'INHALT.md'), md);

// Geschenkbox.html
const weg = (titel, datei, info) => datei
  ? `<li class="weg"><b>${titel}</b><a class="knopf" href="${encodeURI(datei)}" download>Laden</a><small>${esc(info)}</small></li>`
  : '';
const karten = apps.map((a) => `
    <article class="app">
      <div class="app-kopf"><h2>${esc(a.name)}</h2><span class="fassung">${esc(fassung(a.apktag || a.exetag) ? 'Fassung ' + fassung(a.apktag || a.exetag) : '')}</span></div>
      <p class="rolle">${esc(a.rolle)}</p>
      <ul class="wege">
        ${weg('Android (APK)', a.apk, `${mb(a.apk)} · Installation aus dieser Quelle einmal erlauben.`)}
        ${weg('Windows', a.exe, `${mb(a.exe)} · Installer für Windows 10/11 (64 Bit).`)}
        ${weg('Web-App (PWA)', a.web, `${mb(a.web)} · ${a.webart}. Entpacken und mit einem Webserver ausliefern (siehe WIEDERHERSTELLEN.md); online: https://lausiklauskn-png.github.io/${a.repo}/`)}
        ${weg('Quellcode mit Verlauf', a.zip, `${mb(a.zip)} · ${a.commits} Commits, ${a.zweige} Zweige, ${a.tags} Tags, ${a.erster} bis ${a.zuletzt}.`)}
      </ul>
    </article>`).join('');

const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Geschenkbox Private Akte</title>
<style>
:root { --bg:#f3f6f8; --card:#fff; --fg:#10283d; --muted:#566b7c; --line:#d6e0e8; --akz:#1d7a4f; --akz-soft:#e2f3ea;
  --warn-bg:#fff6e0; --warn-fg:#7a5200; color-scheme: light }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --bg:#0e1923; --card:#152634; --fg:#e3edf5; --muted:#9bb0c1;
  --line:#27405a; --akz:#6fd0a0; --akz-soft:#173b2c; --warn-bg:#3a2f12; --warn-fg:#f2d38a; color-scheme: dark } }
:root[data-theme="dark"] { --bg:#0e1923; --card:#152634; --fg:#e3edf5; --muted:#9bb0c1; --line:#27405a; --akz:#6fd0a0;
  --akz-soft:#173b2c; --warn-bg:#3a2f12; --warn-fg:#f2d38a; color-scheme: dark }
* { box-sizing: border-box }
body { margin:0; background:var(--bg); color:var(--fg); font:15px/1.55 "Segoe UI", system-ui, sans-serif; padding:28px 16px 48px }
main { max-width:1040px; margin:0 auto; display:grid; gap:22px }
h1, h2 { margin:0; text-wrap:balance } h1 { font-size:1.8rem }
.lead { color:var(--muted); margin:6px 0 0; max-width:66ch }
.apps { display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:18px }
.app { background:var(--card); border:1px solid var(--line); border-radius:16px; overflow:hidden; min-width:0 }
.app-kopf { padding:14px 18px; background:var(--akz-soft); display:flex; justify-content:space-between; gap:10px; flex-wrap:wrap; align-items:baseline }
.app-kopf h2 { color:var(--akz); font-size:1.15rem }
.fassung { font-size:.82rem; color:var(--muted); font-variant-numeric:tabular-nums }
.rolle { margin:10px 18px 0; color:var(--muted); font-size:.88rem }
.wege { list-style:none; margin:0; padding:4px 18px 14px; display:grid }
.weg { display:grid; grid-template-columns:1fr auto; gap:2px 12px; align-items:center; padding:10px 0; border-top:1px solid var(--line) }
.weg:first-child { border-top:0 } .weg small { grid-column:1/-1; color:var(--muted); font-size:.82rem; overflow-wrap:anywhere }
.knopf { text-decoration:none; font-weight:600; font-size:.88rem; padding:6px 14px; border-radius:10px; background:var(--akz); color:#fff; white-space:nowrap }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .knopf { color:#0e1923 } }
:root[data-theme="dark"] .knopf { color:#0e1923 }
.hinweis { background:var(--warn-bg); color:var(--warn-fg); border-radius:12px; padding:12px 14px; font-size:.9rem }
.hinweis ul { margin:6px 0 0; padding-left:18px }
footer { color:var(--muted); font-size:.82rem }
</style>
</head>
<body>
<main>
  <header>
    <h1>Geschenkbox Private Akte</h1>
    <p class="lead">Die Private Akte und alle Apps, die in ihr als Tools angeschlossen sind – je als Android-App, für Windows und als Web-App,
    dazu der Quellcode jeder App mit ihrem ganzen Verlauf. Stand ${esc(STAND)}.</p>
  </header>
  <section class="apps">${karten}
  </section>
  <div class="hinweis"><b>Gut zu wissen</b>
    <ul>
      <li>Die Knöpfe laden die Dateien, die neben dieser Seite liegen. Am besten alles zusammen in einem Ordner aufbewahren.</li>
      <li>Windows warnt bei nicht signierten Installern: „Weitere Informationen“ › „Trotzdem ausführen“.</li>
      <li>Android fragt beim ersten Mal, ob Apps aus dieser Quelle installiert werden dürfen.</li>
      <li>Wiederherstellen ohne GitHub und Hinweise für eine KI: WIEDERHERSTELLEN.md. Inhalt und Zahlen: INHALT.md.</li>
    </ul>
  </div>
  <footer>Family-Projekt · alle Beispieldaten in den Apps sind erfunden.</footer>
</main>
</body>
</html>
`;
writeFileSync(join(PAKET, 'Geschenkbox.html'), html);
console.log(md);
