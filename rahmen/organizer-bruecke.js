/* rahmen/organizer-bruecke.js — Klebstoff der Privaten Akte im Klon des Datei-Organizers (Klaus 17.11.2026).
   Der Klon unter klone/datei-organizer/ ist byte-gleich; diese Datei steht in rahmen/organizer.html (tools/rahmen-bauen.mjs) als
   ERSTES Skript, vor jedem Skript des Organizers. Klassisches Skript, kein Modul. Vorbild: fa-wfpdf-bruecke.js der Familienakte.
   1. Eigener Speicher: die Private Akte liegt unter demselben Ursprung wie die Web-App „Datei-Organizer Basic“. Ohne Umleitung
      teilten sich beide die Datenbank „DateiOrganizer1“ und die Merker „do-…“, „do_…“, „datei-organizer-…“.
      Hier: Datenbank → „PrivateAkteOrganizer1“ (Pseudonymisierer → „PrivateAkte…“), Merker → „pa_…“.
   2. Kein eigener Service Worker, und nur eigene Vorräte („pa-organizer-…“) sind sichtbar.
   3. Übergabe: window.DO_RAHMEN (Stelle im Organizer: src/rahmen.ts) gibt Index und Originale als Nachricht an die Akte. */
(function () {
  "use strict";
  var W = window, eingebettet = W.parent !== W;
  // Adresse auf den Ordner des Klons umstellen (ohne neu zu laden): der Klon sucht seine Dateien neben seiner Adresse. „~rahmen“
  // gibt es dort nicht – ein Neuladen landet also nie auf der ungepatchten Startseite des Klons; die Akte lädt dann den Rahmen neu.
  try { if (/\/rahmen\//.test(location.pathname)) history.replaceState(null, "", location.pathname.replace(/\/rahmen\/(.*?)(index\.html)?$/, "/klone/$1~rahmen") + location.search + location.hash); } catch (e) { /* dann fehlen dem Klon Dateien */ }
  try {
    var SP = W.Storage && W.Storage.prototype;
    var um = function (k) { k = String(k); return /^(do-|do_|datei-organizer-)/.test(k) ? "pa_" + k : k; };
    ["getItem", "removeItem"].forEach(function (n) { var o = SP[n]; SP[n] = function (k) { return o.call(this, um(k)); }; });
    var set = SP.setItem; SP.setItem = function (k, v) { return set.call(this, um(k), v); };
  } catch (e) { /* ohne diese Fähigkeit läuft der Klon wie vorher */ }
  try {
    var IF = W.IDBFactory && W.IDBFactory.prototype;
    var dbUm = function (n) { return n === "DateiOrganizer1" ? "PrivateAkteOrganizer1" : /^(Datei|Pseudo)/.test(String(n)) ? "PrivateAkte" + n : n; };
    var open = IF.open; IF.open = function (n, v) { return arguments.length > 1 ? open.call(this, dbUm(n), v) : open.call(this, dbUm(n)); };
    var del = IF.deleteDatabase; IF.deleteDatabase = function (n) { return del.call(this, dbUm(n)); };
  } catch (e) { /* still */ }
  try {
    var CS = W.CacheStorage && W.CacheStorage.prototype;
    var vUm = function (n) { n = String(n); return n.indexOf("datei-organizer-") === 0 ? "pa-organizer-" + n.slice(16) : n; };
    var keys = CS.keys; CS.keys = function () { return keys.call(this).then(function (l) { return l.filter(function (n) { return n.indexOf("pa-organizer-") === 0; }); }); };
    ["open", "delete", "has"].forEach(function (n) { var o = CS[n]; CS[n] = function (x) { return o.call(this, vUm(x)); }; });
  } catch (e) { /* still */ }
  try {
    var SWC = W.ServiceWorkerContainer && W.ServiceWorkerContainer.prototype;
    if (SWC) {
      SWC.register = function () { return Promise.reject(new Error("Im Klon der Privaten Akte kein eigener Service Worker.")); };
      SWC.getRegistrations = function () { return Promise.resolve([]); };
      SWC.getRegistration = function () { return Promise.resolve(undefined); };
    }
  } catch (e) { /* still */ }
  var html = document.documentElement;
  html.setAttribute("data-pa-eingebettet", eingebettet ? "1" : "0");
  // Farbe des Tools aus der Akte (Farbpalette): ?a=…&b=… setzt die zwei Töne für rahmen/organizer-thema.css.
  try { var q = new URLSearchParams(location.search); ["a", "b"].forEach(function (n) { var w = q.get(n); if (w && /^#[0-9a-f]{6}$/i.test(w)) html.style.setProperty("--pa-" + n, w); }); } catch (e) { /* Farben ab Werk */ }
  function melde(d) { try { W.parent.postMessage(d, location.origin); } catch (e) { /* still */ } }
  if (eingebettet) {
    var offen = new Map();
    W.addEventListener("message", function (e) {
      if (e.origin !== location.origin || e.source !== W.parent) return;
      var d = e.data || {}, p = offen.get(d.id);
      if (d.typ !== "pa-organizer-angenommen" || !p) return;
      offen.delete(d.id); clearTimeout(p.timer); p.fertig({ ok: d.ok === true, text: typeof d.text === "string" ? d.text : undefined });
    });
    W.DO_RAHMEN = {
      name: "Private Akte",
      uebergeben: function (paket) {
        var id = (W.crypto && W.crypto.randomUUID) ? W.crypto.randomUUID() : String(Date.now()) + Math.random();
        return new Promise(function (fertig) {
          var timer = setTimeout(function () { offen.delete(id); fertig({ ok: false, text: "Die Private Akte hat nicht geantwortet. Bitte noch einmal versuchen." }); }, 120000);
          offen.set(id, { fertig: fertig, timer: timer });
          melde({ typ: "pa-organizer-uebergabe", id: id, ordner: paket.ordner, index: paket.index, dateien: paket.dateien, fehlen: paket.fehlen });
        });
      }
    };
    W.addEventListener("load", function () { melde({ typ: "pa-organizer-bereit" }); });
  }
})();
