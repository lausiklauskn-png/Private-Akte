// Offline-Vorrat des Datei-Organizers: nur die App selbst, nie Nutzerdateien.
// Neue Fassung = neue Nummer; alte Vorräte werden beim Aktivieren entfernt.
const VORRAT = "datei-organizer-v42";
self.addEventListener("install", (e) => { e.waitUntil(caches.open(VORRAT).then((c) => c.addAll(["./", "./index.html", "./manifest.webmanifest", "./favicon.svg", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./datenschutz.html", "./landkarte.html", "./discovery.html", "./discovery-kreislauf.jpg", "./discovery-film-brieftraeger.jpg", "./pseudonymisierer.html", "./pseudonymisierer.webmanifest", "./pseudonymisierer.svg", "./pseudonymisierer-192.png", "./pseudonymisierer-512.png", "./pseudonymisierer-datenschutz.html", "./vendor/maske/25_pseudonym.js"])).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((n) => n.startsWith("datei-organizer-v") && n !== VORRAT).map((n) => caches.delete(n)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin || !u.pathname.startsWith(new URL("./", self.registration.scope).pathname)) return;
  if (u.pathname.endsWith("/version.json")) return; // Update-Fähnchen fragt immer das Netz, nie den Vorrat
  // Seite: erst Netz (neue Fassung), sonst Vorrat. Gebaute Dateien (Name mit Prüfsumme): erst Vorrat.
  if (e.request.mode === "navigate") {
    // Auch die Landkarte (im Rahmen) ist eine Seite – sie darf nie als index.html im Vorrat landen.
    const nebenseite = /\/[^/]+\.html$/.test(u.pathname) && !u.pathname.endsWith("/index.html");
    e.respondWith(fetch(e.request).then((r) => { const k = r.clone(); if (r.ok) caches.open(VORRAT).then((c) => c.put(nebenseite ? e.request : "./index.html", k)); return r; }).catch(() => caches.match(nebenseite ? e.request : "./index.html", { ignoreSearch: true })));
    return;
  }
  e.respondWith(caches.match(e.request).then((t) => t || fetch(e.request).then((r) => { if (r.ok && (u.pathname.includes("/assets/") || u.pathname.includes("/vendor/"))) { const k = r.clone(); caches.open(VORRAT).then((c) => c.put(e.request, k)); } return r; })));
});
