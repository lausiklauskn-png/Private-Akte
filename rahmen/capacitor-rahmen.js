/* Private Akte Pro für Android: Seiten im Rahmen der Akte (Private Brain Pro, Datei-Organizer, Workflow PDF, Kalender) nehmen die
   Capacitor-Brücke des Hauptfensters. Capacitor 8 nimmt Aufrufe an die Plugins nur aus dem Hauptfenster an („Plugin execution is
   allowed in Main Frame only“, MessageHandler) – aus dem Rahmen gingen sie verloren, die Seite wartete ewig („Mail wird geladen …“,
   Klaus am Tablet 19.11.2026). Gleiches Muster wie windows/bridge/capacitor-tauri.js. Nur in der Android-App (web-paket.mjs --android
   setzt die Zeile als erstes Skript nach <head> ein), nur bei derselben Adresse; in der PWA und ohne Rahmen tut die Datei nichts. */
(() => {
  'use strict';
  if (window === window.top) return;
  try {
    const oben = window.top.Capacitor;
    if (!oben || window.top.location.origin !== location.origin) return;
    if (!(oben.isNativePlatform && oben.isNativePlatform() && oben.getPlatform && oben.getPlatform() === 'android')) return;
    Object.defineProperty(window, 'Capacitor', { value: oben, writable: false, configurable: false });
  } catch { /* fremdes Fenster: keine Brücke */ }
})();
