import type { Datei, Korrektur, Lernregel } from "../lib/typen.ts";
import { LaufSchreiber, laufAusTeilen, laufTeilNamen, type Lauf, type LaufAblage } from "./lauf.ts";

/**
 * Was sich die App merkt – nur in diesem Browser (IndexedDB), nie auf einem Server:
 * die gesiebten Dateien (ohne die Originale), Korrekturen, gelernte Regeln, den gewählten Ordner (am PC).
 */
export type Gespeichert = { fassung: 1; ordnerName: string; quelle: string; stufe: number; dateien: Datei[]; verlauf: Korrektur[]; regeln: Lernregel[]; zeit: string };
const DB = "DateiOrganizer1", STORE = "kv";

// Eine Verbindung für die ganze Sitzung (vorher je Schreibvorgang eine neue, die nie geschlossen wurde – bei 1.000 Blöcken 1.000 offene).
let verbindung: Promise<IDBDatabase> | null = null;
function oeffnen(): Promise<IDBDatabase> {
  if (!verbindung) verbindung = oeffnenNeu().catch((e) => { verbindung = null; throw e; });
  return verbindung;
}
function oeffnenNeu(): Promise<IDBDatabase> {
  return new Promise((ok, nein) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE);
    r.onsuccess = () => ok(r.result); r.onerror = () => nein(r.error);
  });
}
async function mit<T>(modus: IDBTransactionMode, f: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await oeffnen();
  return new Promise((ok, nein) => { const t = db.transaction(STORE, modus); const r = f(t.objectStore(STORE)); r.onsuccess = () => ok(r.result); r.onerror = () => nein(r.error); });
}
export async function laden(): Promise<Gespeichert | null> { try { return (await mit("readonly", (s) => s.get("zustand"))) as Gespeichert || null; } catch { return null; } }
export async function speichern(z: Gespeichert) { try { await mit("readwrite", (s) => s.put(z, "zustand")); } catch { /* ohne Speicher: nur für diese Sitzung */ } }
export async function loeschen() { try { await mit("readwrite", (s) => s.delete("zustand")); await mit("readwrite", (s) => s.delete("ordner")); } catch { /* egal */ } await laufLoeschen(); }
export async function ordnerMerken(h: unknown) { try { await mit("readwrite", (s) => s.put(h, "ordner")); } catch { /* manche Browser speichern Ordner nicht */ } }
export async function ordnerHolen(): Promise<unknown> { try { return await mit("readonly", (s) => s.get("ordner")); } catch { return null; } }
// Angefangenes Einlesen (große Mengen in Blöcken, src/lauf.ts): nach jedem Block gemerkt, nach dem Ende gelöscht.
// Seit Block 1 (14.11.2026) in Teilen: je Block nur der neue Teil (src/lauf.ts, LaufSchreiber); alter Stand unter „lauf“ wird weiter gelesen.
const idbAblage: LaufAblage = { schreiben: async (n, w) => { await mit("readwrite", (s) => s.put(w, n)); }, lesen: (n) => mit("readonly", (s) => s.get(n)) };
let schreiber: LaufSchreiber | null = null;
/** Vor jedem neuen Einlesen aufrufen: der nächste gemerkte Stand wird dann einmal ganz geschrieben, danach nur noch der neue Teil. */
export function laufNeuBeginnen() { schreiber = null; }
export async function laufLaden(): Promise<Lauf | null> { try { return await laufAusTeilen(idbAblage); } catch { return null; } }
export async function laufSpeichern(l: Lauf) { try { schreiber ??= new LaufSchreiber(idbAblage); await schreiber.merken(l); } catch { /* ohne Speicher: Weitermachen nur in dieser Sitzung nicht möglich */ } }
export async function laufLoeschen() { try { const kopf = await mit("readonly", (s) => s.get("lauf")) as { teile?: number; erledigtTeile?: number } | undefined; for (const n of laufTeilNamen(kopf)) await mit("readwrite", (s) => s.delete(n)); await mit("readwrite", (s) => s.delete("lauf")); } catch { /* egal */ } schreiber = null; }
