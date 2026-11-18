/* Private Akte Pro für Windows (Muster Datei-Organizer Pro windows/bridge): stellt dieselben Capacitor-Plugins bereit wie die
   Android-Hülle (Gerätezugriffe aus den Klonen). Jeder Aufruf geht mit dem Sitzungsschlüssel an die Hülle (do_call); welche Methoden es
   gibt, legt bridge/contracts.json fest (dort geprüft, nicht hier). Die Tools im Rahmen (Datei-Organizer, Kalender …) laufen in einem
   Fenster derselben Adresse und bekommen dieselbe Brücke vom Hauptfenster – nie eine eigene, nie auf fremden Seiten. */
(() => {
  'use strict';
  if (location.protocol !== 'https:' || location.hostname !== 'tauri.localhost') return;
  if (window !== window.top) {
    try {
      const oben = window.top.Capacitor;
      if (oben && window.top.location.origin === location.origin) Object.defineProperty(window, 'Capacitor', { value: oben, writable: false, configurable: false });
    } catch { /* fremdes Fenster: keine Brücke */ }
    return;
  }
  const invoke = window.__TAURI_INTERNALS__?.invoke; if (typeof invoke !== 'function') return;
  const TOKEN = __DO_SESSION_TOKEN__;
  const listeners = new Map();
  window.addEventListener('do-native', (event) => {
    for (const listener of listeners.get(event.detail?.name) || []) { try { listener(event.detail.data); } catch { /* Hörer der Seite */ } }
  });
  const plugins = {};
  for (const name of ['FamilyFolders', 'DoEingang', 'DoDateien']) {
    plugins[name] = new Proxy(Object.freeze({}), { get(_, method) {
      if (method === 'then') return undefined;
      if (method === 'addListener') return async (event, listener) => {
        const key = name + ':' + event; let set = listeners.get(key); if (!set) listeners.set(key, set = new Set()); set.add(listener);
        return { remove: async () => set.delete(listener) };
      };
      return async (options = {}) => {
        try {
          return await invoke('do_call', { plugin: name, method: String(method), options }, { headers: { 'x-do-session': TOKEN } });
        } catch (error) {
          const code = typeof error === 'string' ? error : error?.code || 'APP_RUNTIME_UNAVAILABLE';
          throw Object.assign(new Error(code), { code });
        }
      };
    } });
  }
  Object.defineProperty(window, 'Capacitor', { value: Object.freeze({ Plugins: Object.freeze(plugins), isNativePlatform: () => true, getPlatform: () => 'windows' }), writable: false, configurable: false });
})();
