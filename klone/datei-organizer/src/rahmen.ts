/**
 * Betrieb im Rahmen einer anderen App (Klaus 17.11.2026: der Datei-Organizer läuft als Klon in der Privaten Akte).
 * Die Hülle setzt VOR dem Start der App `window.DO_RAHMEN` (ihre Brücke ist das erste Skript der Seite). Dann gilt:
 *  - kein eigener Service Worker (der Vorrat gehört der Hülle),
 *  - auf der Seite „Familienakte“ steht zuerst „An die <Name> übergeben“: der sortierte Stapel geht samt Index
 *    (organizer-index.json als Text) und den Originalen als Dateien direkt an die Hülle – ohne Ordnerwahl, ohne Download.
 * Ohne `DO_RAHMEN` (Web-App, Android, Windows) ändert sich nichts.
 */
export type RahmenPaket = { ordner: string; index: string; dateien: Array<{ pfad: string; datei: File }>; fehlen: string[] };
export type Rahmen = { name: string; uebergeben: (p: RahmenPaket) => Promise<{ ok: boolean; text?: string }> };

export function rahmen(): Rahmen | null {
  const r = typeof window !== "undefined" ? (window as Window & { DO_RAHMEN?: Partial<Rahmen> }).DO_RAHMEN : undefined;
  return r && typeof r.name === "string" && r.name && typeof r.uebergeben === "function" ? (r as Rahmen) : null;
}

/**
 * Übergabe aus der eigenständigen Web-App (0.4.19, Klaus 18.11.2026: „oben fehlt der Knopf an die Familienakte übergeben“).
 * Die Private Akte liegt unter derselben Adresse (github.io) wie der Organizer. Der Knopf öffnet sie im selben Browser
 * (`/Private-Akte/?empfang=organizer`); sie meldet sich, sobald ihr Tresor offen ist („pa-empfang-bereit“), und bekommt dann
 * dasselbe Paket wie im Rahmen („pa-organizer-uebergabe“) – Nachrichten nur zwischen Fenstern derselben Adresse.
 */
export const AKTE_ADRESSE = "/Private-Akte/?empfang=organizer";
export function aktePartner(w: Window | null): Rahmen {
  return {
    name: "Private Akte",
    uebergeben: (p) => new Promise((fertig) => {
      if (!w) { fertig({ ok: false, text: "Die Private Akte ließ sich nicht öffnen (Pop-ups erlaubt?)." }); return; }
      const id = Math.random().toString(36).slice(2); let gesendet = false;
      const ende = (e: { ok: boolean; text?: string }) => { removeEventListener("message", hoer); clearTimeout(uhr); fertig(e); };
      const hoer = (ev: MessageEvent) => {
        if (ev.origin !== location.origin || ev.source !== w) return;
        const d = (ev.data || {}) as { typ?: string; id?: string; ok?: boolean; text?: string };
        if (d.typ === "pa-empfang-bereit" && !gesendet) { gesendet = true; w.postMessage({ typ: "pa-organizer-uebergabe", id, ordner: p.ordner, index: p.index, dateien: p.dateien, fehlen: p.fehlen }, location.origin); }
        if (d.typ === "pa-organizer-angenommen" && d.id === id) ende({ ok: !!d.ok, text: d.text });
      };
      const uhr = setTimeout(() => ende({ ok: false, text: "Die Private Akte hat nicht geantwortet. Bitte dort einmal öffnen und noch einmal versuchen." }), 120000);
      addEventListener("message", hoer);
    }),
  };
}
