'use strict';
/* Offline-Vorrat der Privaten Akte. Bei jeder neuen Fassung VERSION erhöhen. */
const VERSION = '0.9.6';
const PREFIX = 'private-akte-';
const CACHE = PREFIX + VERSION;
const ROOT = new URL('./', self.location.href);
const DATEIEN = [
  './', 'index.html', 'app.css', 'app.js', 'tresor.js', 'rahmen/datei-organizer/app/index.html', 'rahmen/organizer-bruecke.js', 'rahmen/organizer-thema.css', 'rahmen/workflow-pdf/index.html', 'rahmen/wfpdf-bruecke.js', 'rahmen/wfpdf-thema.css', 'rahmen/kalender/index.html', 'rahmen/kalender/kalender.js', 'rahmen/kalender/kalender.css', 'rahmen/kalender/seite.css', 'rahmen/kalender-thema.css', 'native/familienakte-meaning-worker.js', 'klone/familienakte/public/vendor/pdfjs/pdf.min.js', 'klone/familienakte/public/vendor/pdfjs/pdf.worker.min.js', 'rechtliches.html', 'manifest.webmanifest', 'favicon.ico',
  'icons/favicon-32.png', 'icons/apple-touch-icon.png', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png',
  'bilder/baum.jpg', 'bilder/zur-akte.mp4', 'bilder/logo-basic-rund.png', 'bilder/logo-pro-rund.png'
].map(pfad => new URL(pfad, ROOT).href);
const KLONE = ['/klone/datei-organizer/app/', '/klone/workflow-pdf/'];
const STARTSEITEN = [['klone/datei-organizer/app/', 'rahmen/datei-organizer/app/index.html'], ['klone/workflow-pdf/', 'rahmen/workflow-pdf/index.html']];
const schluessel = request => { const url = new URL(request.url); url.search = ''; url.hash = ''; return url.pathname.endsWith('/index.html') ? url.href.slice(0, -10) : url.href; };

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => Promise.all(DATEIEN.map(async url => {
    const antwort = await fetch(new Request(url, {cache:'reload'}));
    if (!antwort.ok) throw new Error('Nicht geladen: ' + url);
    await cache.put(url, antwort);
  }))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(namen => Promise.all(namen.filter(n => n.startsWith(PREFIX) && n !== CACHE).map(n => caches.delete(n)))).then(() => self.clients.claim()));
});
/* Der Film wird in Ausschnitten (Range) verlangt; aus dem Vorrat kommt dann der passende Teil als 206. */
async function ausschnitt(request, antwort) {
  const m = /bytes=(\d+)-(\d*)/.exec(request.headers.get('range') || '');
  if (!m) return antwort;
  const daten = await antwort.arrayBuffer(), von = +m[1], bis = m[2] ? Math.min(+m[2], daten.byteLength - 1) : daten.byteLength - 1;
  return new Response(daten.slice(von, bis + 1), {status:206, statusText:'Partial Content', headers:{
    'Content-Type': antwort.headers.get('Content-Type') || 'video/mp4', 'Content-Range': `bytes ${von}-${bis}/${daten.byteLength}`, 'Content-Length': String(bis - von + 1), 'Accept-Ranges':'bytes'}});
}
self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== ROOT.origin || !url.pathname.startsWith(ROOT.pathname) || url.pathname.endsWith('/sw.js')) return;
  /* Die Startseite eines Klons selbst wird nie gezeigt (sie hätte keine Brücke): statt ihrer kommt die Seite im Rahmen. */
  if (request.mode === 'navigate') { const klon = STARTSEITEN.find(([pfad]) => url.pathname === ROOT.pathname + pfad || url.pathname === ROOT.pathname + pfad + 'index.html' || url.pathname === ROOT.pathname + pfad + '~rahmen'); if (klon) { event.respondWith(Response.redirect(new URL(klon[1], ROOT).href, 302)); return; } }
  event.respondWith((async () => {
    const cache = await caches.open(CACHE), key = schluessel(request);
    if (request.headers.has('range')) { const da = await cache.match(key); return da ? ausschnitt(request, da) : fetch(request); }
    try {
      /* no-cache: beim Server nachfragen statt den Zwischenspeicher des Browsers zu nehmen (Pages hält ihn 10 Minuten). */
      const frisch = await fetch(request.mode === 'navigate' ? request.url : request, {cache:'no-cache'});
      /* Die Texterkennung (rund 5,5 MB) kommt beim ersten Gebrauch in den Vorrat, nicht schon beim Installieren. */
      /* Die Klone im Rahmen (Datei-Organizer, Workflow PDF) kommen ebenso beim Gebrauch in den Vorrat; ihre Filme nicht (zu groß). */
      if (frisch.ok && frisch.status === 200 && (DATEIEN.includes(key) || key.includes('/vendor/tesseract/') || (KLONE.some(k => key.includes(k)) && !/\.(mp4|webm)$/.test(key)))) cache.put(key, frisch.clone());
      return frisch;
    } catch (fehler) {
      const da = await cache.match(key);
      if (da) return da;
      throw fehler;
    }
  })());
});
