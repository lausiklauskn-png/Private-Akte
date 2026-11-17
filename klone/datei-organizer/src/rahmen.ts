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
