/* rahmen/wfpdf-bruecke.js — Klebstoff der Privaten Akte im Klon von Workflow PDF (Klaus 17.11.2026).
   Der Klon unter klone/workflow-pdf/ ist byte-gleich; diese Datei steht in rahmen/workflow-pdf.html (tools/rahmen-bauen.mjs) als
   ERSTES Skript. Klassisches Skript. Nach dem Vorbild fa-wfpdf-bruecke.js der Familienakte, ohne deren Arbeitsraum.
   1. Eigene Bibliothek: Datenbank „WorkflohPDF1“ → „PrivateAkteWFPDF1“, Merker „wfpdf_*“ → „pa_wfpdf_*“ (derselbe Ursprung
      wie die Web-App Workflow PDF und wie die Familienakte – jede hat ihre eigene Bibliothek).
   2. Kein eigener Service Worker; ⟳ sieht nur eigene Vorräte („pa-wfpdf-…“).
   3. „Teilen“ legt die Datei in der Privaten Akte ab (statt des Teilen-Fensters des Geräts); ein Scan, mit dem die Akte den
      Klon geöffnet hat (?scan=1&von=PrivateAkte), geht nach „PDF erstellen“ von selbst in die Akte.
   4. Eine Unterlage aus der Akte öffnen (Nachricht pa-wfpdf-oeffnen): normaler Import des Klons, dann geöffnet. */
(function () {
  "use strict";
  var W = window, eingebettet = W.parent !== W;
  // Adresse auf den Ordner des Klons umstellen (ohne neu zu laden): der Klon sucht seine Dateien neben seiner Adresse. „~rahmen“
  // gibt es dort nicht – ein Neuladen landet also nie auf der ungepatchten Startseite des Klons; die Akte lädt dann den Rahmen neu.
  try { if (/\/rahmen\//.test(location.pathname)) history.replaceState(null, "", location.pathname.replace(/\/rahmen\/(.*?)(index\.html)?$/, "/klone/$1~rahmen") + location.search + location.hash); } catch (e) { /* dann fehlen dem Klon Dateien */ }
  // Diktat (Klaus 24.11.2026, Galaxy Z Fold 7): die WebView der App hat keine eigene Spracherkennung. Die Akte setzt dafür
  // Androids Sprachfenster ein (Klebstoff der Familienakte, Marke FamilienakteDiktat); im Rahmen nimmt der Klon dasselbe, damit
  // sein Mikrofon (sprechen.js, byte-gleich) über die Akte hört. Wie fa-wfpdf-bruecke.js der Familienakte. Im Browser unverändert.
  try {
    var oben = eingebettet && W.parent.FamilienakteDiktat && (W.parent.SpeechRecognition || W.parent.webkitSpeechRecognition);
    if (oben) { W.SpeechRecognition = oben; W.webkitSpeechRecognition = oben; }
  } catch (e) { /* fremder Rahmen: Diktat wie vorher */ }
  var DB_ALT = "WorkflohPDF1", DB_NEU = "PrivateAkteWFPDF1", VORRAT = "pa-wfpdf-";
  try {
    var SP = W.Storage && W.Storage.prototype;
    var um = function (k) { k = String(k); return k.indexOf("wfpdf_") === 0 ? "pa_" + k : k; };
    ["getItem", "removeItem"].forEach(function (n) { var o = SP[n]; SP[n] = function (k) { return o.call(this, um(k)); }; });
    var set = SP.setItem; SP.setItem = function (k, v) { return set.call(this, um(k), v); };
  } catch (e) { /* ohne diese Fähigkeit läuft der Klon wie vorher */ }
  // „Durchsuchbar“ im Scanner ab Werk an (wie in der Familienakte): die Akte liest den Text des Scans für ihre Suche.
  try {
    var LS = W.localStorage;
    if (LS && !LS.getItem("pa_scan_durchsuchbar_ab_werk_v1")) {
      var merk = {}; try { merk = JSON.parse(LS.getItem("wfpdf_scan_v1") || "{}") || {}; } catch (e) { merk = {}; }
      merk.durchsuchbar = true; LS.setItem("wfpdf_scan_v1", JSON.stringify(merk)); LS.setItem("pa_scan_durchsuchbar_ab_werk_v1", "1");
    }
  } catch (e) { /* Scanner-Vorgabe wie bisher */ }
  try {
    var IF = W.IDBFactory && W.IDBFactory.prototype;
    var dbUm = function (n) { return n === DB_ALT ? DB_NEU : n; };
    var open = IF.open; IF.open = function (n, v) { return arguments.length > 1 ? open.call(this, dbUm(n), v) : open.call(this, dbUm(n)); };
    var del = IF.deleteDatabase; IF.deleteDatabase = function (n) { return del.call(this, dbUm(n)); };
  } catch (e) { /* still */ }
  try {
    var CS = W.CacheStorage && W.CacheStorage.prototype;
    var vUm = function (n) { n = String(n); return n === "workfloh-pdf-geteilt" ? VORRAT + "geteilt" : n; };
    var keys = CS.keys; CS.keys = function () { return keys.call(this).then(function (l) { return l.filter(function (n) { return n.indexOf(VORRAT) === 0; }); }); };
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
  try { var q0 = new URLSearchParams(location.search); ["a", "b"].forEach(function (n) { var w = q0.get(n); if (w && /^#[0-9a-f]{6}$/i.test(w)) html.style.setProperty("--pa-" + n, w); }); } catch (e) { /* Farben ab Werk */ }
  function melde(d) { try { W.parent.postMessage(d, location.origin); } catch (e) { /* still */ } }
  var sag = function (t) { try { W.__wfpdf.dlg.toast(t); } catch (e) { /* ohne Meldung */ } };
  if (!eingebettet) return;
  W.addEventListener("load", function () { melde({ typ: "pa-wfpdf-bereit" }); });
  var istDatei = function (f) { return f && typeof f.name === "string" && typeof f.size === "number"; };
  var offen = new Map();
  W.addEventListener("message", function (e) {
    if (e.origin !== location.origin || e.source !== W.parent) return;
    var d = e.data || {};
    if (d.typ === "pa-wfpdf-abgelegt") {
      var p = offen.get(d.id); if (!p) return;
      offen.delete(d.id); clearTimeout(p.timer);
      if (d.ok === true) { p.ja(); sag(d.text || "In der Privaten Akte abgelegt."); } else p.nein(new Error(d.text || "Die Private Akte hat die Datei nicht angenommen."));
      return;
    }
    if (d.typ === "pa-wfpdf-oeffnen" && Array.isArray(d.dateien) && d.dateien.length) {
      (async function () {
        for (var i = 0; i < 100 && !(W.__wfpdf && W.WFP && W.WFP.DB); i++) await new Promise(function (r) { setTimeout(r, 100); });
        if (!W.__wfpdf) throw new Error("Workflow PDF ist noch nicht bereit.");
        var neu = await W.__wfpdf.importDateien(d.dateien.filter(istDatei), undefined, { still: true });
        if (neu && neu.length === 1 && W.__wfpdf.oeffneDok) await W.__wfpdf.oeffneDok(neu[0].id);
        melde({ typ: "pa-wfpdf-geoeffnet", id: d.id, ok: !!(neu && neu.length) });
      })().catch(function (err) { sag(err.message); melde({ typ: "pa-wfpdf-geoeffnet", id: d.id, ok: false }); });
    }
  });
  var abgeben = function (fs, quelle) {
    for (var i = 0; i < fs.length; i++) if (!istDatei(fs[i])) return Promise.reject(new Error("Keine Datei zum Ablegen."));
    var id = (W.crypto && W.crypto.randomUUID) ? W.crypto.randomUUID() : String(Date.now()) + Math.random();
    return new Promise(function (ja, nein) {
      var timer = setTimeout(function () { offen.delete(id); nein(new Error("Die Private Akte hat nicht geantwortet. Die Datei bleibt in Workflow PDF.")); }, 180000);
      offen.set(id, { ja: ja, nein: nein, timer: timer });
      melde({ typ: "pa-wfpdf-ablegen", id: id, quelle: quelle, dateien: fs });
    });
  };
  // „Teilen“ fragt, wohin (Klaus 18.11.: Teilen ging nur an die Akte – E-Mail, BookLedgerPro und andere Programme waren versperrt).
  // Der Tipp auf einen der Knöpfe ist zugleich der frische Tipp, den das Teilen-Fenster des Geräts verlangt.
  var wohin = function (fs) {
    return new Promise(function (fertig) {
      var alt = document.getElementById("pa-teilen"); if (alt) alt.remove();
      var d = document.createElement("div"); d.id = "pa-teilen";
      d.setAttribute("style", "position:fixed;inset:0;z-index:2147483000;background:rgba(11,49,84,.45);display:flex;align-items:center;justify-content:center;padding:16px;font:15px system-ui,sans-serif");
      var name = fs.length === 1 ? "„" + fs[0].name + "“" : fs.length + " Dateien";
      var knopf = "display:block;width:100%;margin-top:10px;padding:12px 14px;border-radius:12px;border:1px solid #d8e2ea;font:600 15px system-ui,sans-serif;cursor:pointer;text-align:left;";
      d.innerHTML = '<div role="dialog" aria-modal="true" aria-label="Wohin teilen?" style="background:#fff;color:#15283a;border-radius:18px;padding:18px;max-width:420px;width:100%;box-shadow:0 12px 40px rgba(0,0,0,.25)">'
        + '<b style="font-size:17px">Wohin damit?</b><div data-pa-name style="margin-top:4px;color:#627181;font-size:13px;word-break:break-word"></div>'
        + '<button type="button" data-pa-teilen="akte" style="' + knopf + 'background:#107c41;color:#fff;border-color:#107c41">In die Private Akte legen</button>'
        + '<button type="button" data-pa-teilen="geraet" style="' + knopf + 'background:#fff;color:#15283a">An ein anderes Programm teilen<br><span style="font-weight:400;font-size:12.5px;color:#627181">E-Mail, BookLedgerPro, Messenger …</span></button>'
        + '<button type="button" data-pa-teilen="nein" style="' + knopf + 'background:#f2f7fa;color:#15283a;text-align:center">Abbrechen</button></div>';
      d.querySelector("[data-pa-name]").textContent = name;
      d.addEventListener("click", function (e) { var k = e.target.closest ? e.target.closest("[data-pa-teilen]") : null; if (!k && e.target !== d) return; d.remove(); fertig(k ? k.getAttribute("data-pa-teilen") : "nein"); });
      document.body.appendChild(d);
    });
  };
  try {
    var N = W.navigator, teilen = N.share ? N.share.bind(N) : null, kann = N.canShare ? N.canShare.bind(N) : null;
    N.share = function (daten) {
      var fs = daten && daten.files ? Array.from(daten.files) : [];
      if (fs.length) return wohin(fs).then(function (ziel) {
        if (ziel === "akte") return abgeben(fs, "teilen");
        if (ziel === "geraet") { if (!teilen) throw new Error("Dieses Gerät kann hier nicht teilen. Bitte „PDF ausgeben“ nehmen."); return teilen(daten); }
        var ab = new Error("Teilen abgebrochen."); ab.name = "AbortError"; throw ab;
      });
      return teilen ? teilen(daten) : Promise.reject(new Error("Teilen nicht möglich."));
    };
    N.canShare = function (daten) { if (daten && daten.files && daten.files.length) return Array.from(daten.files).every(istDatei); return kann ? kann(daten) : false; };
  } catch (e) { /* ohne Browserfähigkeit bleibt das Werkzeug verfügbar */ }
  try {
    var q = new URLSearchParams(location.search);
    if (q.get("scan") === "1" && q.get("von") === "PrivateAkte") {
      var wickeln = function (SC) {
        if (!SC || SC.__pa) return; SC.__pa = true;
        var auf = SC.oeffnen;
        SC.oeffnen = function (opt) {
          if (!SC.__paErst && opt && typeof opt.fertig === "function" && !opt.__pa) {
            SC.__paErst = true;   // nur der Scan, mit dem die Akte den Klon geöffnet hat
            var f0 = opt.fertig; opt.__pa = true;
            opt.fertig = function (bytes, info) {
              try { var n = String((info && info.name) || "Scan").replace(/[\\/:*?"<>|]+/g, "_").trim() || "Scan"; abgeben([new File([bytes], n + ".pdf", { type: "application/pdf" })], "scan").catch(function (e) { sag(e.message); }); } catch (e) { /* still */ }
              return f0.apply(this, arguments);
            };
          }
          return auf.apply(this, arguments);
        };
      };
      var wfp = W.WFP || {}, sc = wfp.Scanner;
      Object.defineProperty(wfp, "Scanner", { configurable: true, enumerable: true, get: function () { return sc; }, set: function (v) { sc = v; wickeln(v); } });
      if (sc) wickeln(sc);
      W.WFP = wfp;
    }
  } catch (e) { /* still */ }
})();
