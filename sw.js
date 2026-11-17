'use strict';
/* Offline-Vorrat der Privaten Akte. Bei jeder neuen Fassung VERSION erhöhen. */
const VERSION = '0.3.1';
const PREFIX = 'private-akte-';
const CACHE = PREFIX + VERSION;
const ROOT = new URL('./', self.location.href);
const DATEIEN = [
  './', 'index.html', 'app.css', 'app.js', 'tresor.js', 'rechtliches.html', 'manifest.webmanifest', 'favicon.ico',
  'icons/favicon-32.png', 'icons/apple-touch-icon.png', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png',
  'bilder/baum.jpg', 'bilder/zur-akte.mp4', 'bilder/logo-basic-rund.png', 'bilder/logo-pro-rund.png'
].map(pfad => new URL(pfad, ROOT).href);
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
  event.respondWith((async () => {
    const cache = await caches.open(CACHE), key = schluessel(request);
    if (request.headers.has('range')) { const da = await cache.match(key); return da ? ausschnitt(request, da) : fetch(request); }
    try {
      const frisch = await fetch(request);
      if (frisch.ok && DATEIEN.includes(key)) cache.put(key, frisch.clone());
      return frisch;
    } catch (fehler) {
      const da = await cache.match(key);
      if (da) return da;
      throw fehler;
    }
  })());
});
