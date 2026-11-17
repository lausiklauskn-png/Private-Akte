import type { Datei } from "../lib/typen.ts";
import { LaufSchreiber, laufAusTeilen, type Lauf, type LaufAblage } from "./lauf.ts";
import { nativerOrdner, nativGemerkt, nativPlattform } from "./quellen.ts";

/**
 * Große Ordner (Klaus 14.11.2026, Punkte A–D von docs/PLAN_GROSSE-ORDNER.md):
 * A Leistung des Geräts prüfen: starke Rechner laden große Dateien gleich ganz, sonst Stück für Stück (nur Kopf und Prüfsumme).
 * B Arbeitsordner: Klaus wählt nur das Laufwerk (SD-Karte, Festplatte, …), darin entsteht „Datei-Organizer-Arbeit“ von selbst.
 *   Liste, Texte, Sortierung und der Stand der Blöcke liegen dann dort statt im App-Speicher (der beim Deinstallieren verschwindet).
 * C Schlanke Liste: im Arbeitsspeicher nur bis TEXT_IM_SPEICHER Zeichen Text je Datei; den ganzen Text langer Dokumente hält der Arbeitsordner.
 * D Speicherprüfung vor jedem Block.
 * Nur in Datei-Organizer Pro (App mit Ordnerzugriff); die Web-App (Basic) bleibt beim Speicher des Browsers.
 */
export const ARBEIT = "Datei-Organizer-Arbeit";
export const TEXT_IM_SPEICHER = 20_000;
const MB = 1024 * 1024;
/** Text wird nur bis 30 MB gelesen (lib/einlesen.ts MAX_TEXT_BYTES) – darunter muss jede Datei ganz geladen werden dürfen. */
const TEXT_GRENZE = 30 * MB;

// ---------- A Leistung ----------
/** gleichzeitig: wie viele Dateien zugleich gelesen werden (und wie viele Texterkennungen nebeneinander laufen) – Training 14.11.2026 */
export type Leistung = { stufe: "klein" | "mittel" | "stark"; block: number; vollBis: number; gleichzeitig: number; speicherGB?: number; kerne?: number };
/** Aus den Angaben des Geräts (Arbeitsspeicher in GB, Rechenkerne). Fehlt eine Angabe, gilt „mittel“. */
export function leistungAus(speicherGB?: number, kerne?: number): Leistung {
  const g = { speicherGB, kerne };
  if (speicherGB !== undefined && kerne !== undefined && speicherGB >= 8 && kerne >= 8) return { stufe: "stark", block: 100, vollBis: 256 * MB, gleichzeitig: Math.min(4, Math.max(2, Math.floor(kerne / 3))), ...g };
  if ((speicherGB !== undefined && speicherGB <= 3) || (kerne !== undefined && kerne <= 4)) return { stufe: "klein", block: 25, vollBis: TEXT_GRENZE, gleichzeitig: 1, ...g };
  return { stufe: "mittel", block: 50, vollBis: 64 * MB, gleichzeitig: 2, ...g };
}
export function leistungMessen(): Leistung {
  const n = typeof navigator !== "undefined" ? (navigator as Navigator & { deviceMemory?: number }) : undefined;
  return leistungAus(n?.deviceMemory, n?.hardwareConcurrency || undefined);
}
export const leistungText = (l: Leistung) =>
  `${l.stufe === "stark" ? "Starkes Gerät" : l.stufe === "klein" ? "Kleines Gerät" : "Gerät mittel"}: Blöcke zu ${l.block}, Dateien bis ${Math.round(l.vollBis / MB)} MB ganz laden, größere Stück für Stück, ${l.gleichzeitig === 1 ? "eine Datei" : `${l.gleichzeitig} Dateien`} zugleich lesen`;

// ---------- D Speicher ----------
export const RESERVE = 50 * MB;
/** Was ein Block ungefähr braucht: Texte und Liste sind viel kleiner als die Dateien; gerechnet mit höchstens 1 MB je Datei, doppelt, plus Reserve. */
export const blockBedarf = (groessen: number[]) => RESERVE + 2 * groessen.reduce((s, g) => s + Math.min(g || 0, MB), 0);
export type SpeicherStand = { frei: number | null; wo: string };
/** null = nicht gemessen (das Gerät sagt es nicht): dann wird weitergelesen, die Meldung sagt „nicht gemessen“. */
export const speicherReicht = (frei: number | null, noetig: number) => frei === null || frei < 0 || frei >= noetig;
export const mbText = (b: number) => b >= 10 * 1024 * MB ? `${Math.round(b / (1024 * MB))} GB` : b >= 1024 * MB ? `${(b / (1024 * MB)).toLocaleString("de-DE", { maximumFractionDigits: 1 })} GB` : `${Math.max(1, Math.round(b / MB))} MB`;

// ---------- B Arbeitsordner ----------
export type Arbeitsordner = { id: string; name: string; pfad: string };
const MERKER = "do_arbeitsordner_v1";
export const arbeitMoeglich = () => { const p = nativerOrdner(); return !!(p?.arbeitsordner && p.wiederOeffnen); };
export function arbeitGemerkt(): Arbeitsordner | null {
  try { const a = JSON.parse(localStorage.getItem(MERKER) || "null"); return a && typeof a.id === "string" && typeof a.name === "string" ? a : null; } catch { return null; }
}
function arbeitMerken(a: Arbeitsordner | null) { try { if (a) localStorage.setItem(MERKER, JSON.stringify(a)); else localStorage.removeItem(MERKER); } catch { /* ohne Merker: nur diese Sitzung */ } }
export const arbeitAnzeige = (a: Arbeitsordner) => `${a.name}/${a.pfad || ARBEIT}`.replace(/\/\/+/g, "/");

const FEHLER: Record<string, string> = {
  DO_TRESOR_ORDNER: "Das ist der Pro-Tresor (verschlüsselt) – dort hinein schreibt der Organizer nichts. Bitte das Laufwerk darüber wählen (z. B. die SD-Karte).",
  DO_FREIGABE_FEHLT: "Der Arbeitsordner ist nicht erreichbar (Karte entfernt oder Freigabe weg). Bitte die Karte einstecken oder das Laufwerk neu wählen.",
  DO_SCHREIBEN_FEHLT: "In diesem Laufwerk darf die App nichts anlegen. Bitte ein anderes wählen.",
};
export const arbeitFehler = (e: unknown) => { const c = (e as { code?: string; message?: string })?.code || (e as Error)?.message || ""; return FEHLER[c] || `Arbeitsordner: ${c || "unbekannter Fehler"}`; };

/** Laufwerk wählen → darin „Datei-Organizer-Arbeit“ anlegen (oder den vorhandenen nehmen). Abbrechen → null. */
export async function arbeitWaehlen(): Promise<Arbeitsordner | null> {
  const p = nativerOrdner();
  if (!p?.arbeitsordner) throw new Error("Diese Fassung kann keinen Arbeitsordner anlegen.");
  const titel = nativPlattform() === "windows" ? "Laufwerk für den Arbeitsordner wählen (z. B. D:\\)" : "Laufwerk für den Arbeitsordner wählen (z. B. SD-Karte)";
  const r = await p.ordnerWaehlen({ titel });
  if (r.cancelled || !r.token) return null;
  const a = await p.arbeitsordner({ token: r.token });
  const id = r.id || (await nativGemerkt()).find((g) => g.name === r.name)?.id || "";
  if (!id) throw new Error("Das Laufwerk lässt sich nicht dauerhaft merken. Bitte ein anderes wählen.");
  const ao = { id, name: r.name || "Laufwerk", pfad: a.pfad };
  arbeitMerken(ao); verbindung = { id, token: r.token };
  return ao;
}
export function arbeitVergessen() { arbeitMerken(null); verbindung = null; }

let verbindung: { id: string; token: string } | null = null;
async function token(a: Arbeitsordner): Promise<string> {
  if (verbindung?.id === a.id) return verbindung.token;
  const p = nativerOrdner();
  if (!p?.wiederOeffnen) throw Object.assign(new Error("DO_FREIGABE_FEHLT"), { code: "DO_FREIGABE_FEHLT" });
  const r = await p.wiederOeffnen({ id: a.id });
  verbindung = { id: a.id, token: r.token };
  return r.token;
}
const pfadIn = (a: Arbeitsordner, name: string) => (a.pfad ? `${a.pfad}/${name}` : name);
const STUECK = 1024 * 1024;
const b64 = (b: Uint8Array) => { let s = ""; for (let i = 0; i < b.length; i += 0x8000) s += String.fromCharCode(...b.subarray(i, i + 0x8000)); return btoa(s); };
const ausB64 = (s: string) => { const bin = atob(s); const o = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) o[i] = bin.charCodeAt(i); return o; };

export async function arbeitFrei(a: Arbeitsordner): Promise<number | null> {
  const p = nativerOrdner();
  if (!p?.speicherFrei) return null;
  try { const f = (await p.speicherFrei({ token: await token(a) })).frei; return typeof f === "number" && f >= 0 ? f : null; } catch { return null; }
}
export async function jsonSchreiben(a: Arbeitsordner, name: string, wert: unknown) {
  const p = nativerOrdner()!; const t = await token(a);
  const bytes = new TextEncoder().encode(JSON.stringify(wert));
  const { id } = await p.dateiBeginn({ token: t, pfad: pfadIn(a, name) });
  for (let off = 0; off < bytes.length; off += STUECK) await p.dateiAnhaengen({ id, offset: off, data: b64(bytes.subarray(off, off + STUECK)) });
  await p.dateiFertig({ id, size: bytes.length });
}
/** Liste der Dateien im Arbeitsordner (Name → Größe). */
async function inhalt(a: Arbeitsordner): Promise<Map<string, number>> {
  const p = nativerOrdner()!; const t = await token(a);
  return new Map((await p.ordnerListe({ token: t, pfad: a.pfad })).eintraege.filter((e) => e.art === "datei").map((e) => [e.name, e.groesse]));
}
export async function jsonLesen<T>(a: Arbeitsordner, name: string, groesse?: number): Promise<T | null> {
  const p = nativerOrdner()!; const t = await token(a);
  const g = groesse ?? (await inhalt(a)).get(name);
  if (g === undefined) return null;
  const teile: Uint8Array[] = [];
  for (let off = 0; off < g; off += STUECK) teile.push(ausB64((await p.dateiLesen({ token: t, pfad: pfadIn(a, name), offset: off, laenge: Math.min(STUECK, g - off) })).data));
  const alles = new Uint8Array(g); let k = 0; for (const x of teile) { alles.set(x, k); k += x.length; }
  return JSON.parse(new TextDecoder().decode(alles.subarray(0, k))) as T;
}

// ---------- Speichern in Teilen (stand.json + liste-NNNN.json + texte-NNNN.json) ----------
export const TEIL = 1000;
const nr = (i: number) => String(i + 1).padStart(4, "0");
export type ArbeitStand = { fassung: 1; ordnerName: string; quelle: string; stufe: number; verlauf: unknown[]; regeln: unknown[]; zeit: string; teile: number; anzahl: number;
  /** Pfad → Datei im Arbeitsordner mit dem ganzen Text (nur lange Dokumente, C). */
  langeTexte?: Record<string, string> };
/** C: Text im Arbeitsspeicher kürzen; den ganzen Text eines langen Dokuments gibt diese Funktion zurück, damit er in den Arbeitsordner kommt. */
export function schlank(d: Datei): { d: Datei; lang?: string } {
  if (!d.volltext || d.volltext.length <= TEXT_IM_SPEICHER) return { d };
  return { d: { ...d, volltext: d.volltext.slice(0, TEXT_IM_SPEICHER) }, lang: d.volltext };
}
/** Schreibt nur die Teile, die sich seit dem letzten Mal geändert haben (Vergleich über einen Fingerabdruck des Textes). */
export class ArbeitSpeicher {
  private zuletzt = new Map<string, string>();
  constructor(readonly a: Arbeitsordner) {}
  private static abdruck(s: string) { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return `${s.length}:${h >>> 0}`; }
  private async wennAnders(name: string, wert: unknown) {
    const text = JSON.stringify(wert), ab = ArbeitSpeicher.abdruck(text);
    if (this.zuletzt.get(name) === ab) return false;
    await jsonSchreiben(this.a, name, wert); this.zuletzt.set(name, ab); return true;
  }
  async speichern(z: Omit<ArbeitStand, "teile" | "anzahl" | "fassung"> & { dateien: Datei[] }): Promise<number> {
    let geschrieben = 0;
    const teile = Math.ceil(z.dateien.length / TEIL);
    for (let i = 0; i < teile; i++) if (await this.wennAnders(`liste-${nr(i)}.json`, z.dateien.slice(i * TEIL, (i + 1) * TEIL))) geschrieben++;
    const { dateien, ...rest } = z;
    if (await this.wennAnders("stand.json", { ...rest, fassung: 1, teile, anzahl: dateien.length })) geschrieben++;
    return geschrieben;
  }
  async laden(): Promise<(ArbeitStand & { dateien: Datei[] }) | null> {
    const da = await inhalt(this.a);
    const st = da.has("stand.json") ? await jsonLesen<ArbeitStand>(this.a, "stand.json", da.get("stand.json")) : null;
    if (!st) return null;
    const dateien: Datei[] = [];
    for (let i = 0; i < st.teile; i++) {
      const n = `liste-${nr(i)}.json`;
      const t = da.has(n) ? await jsonLesen<Datei[]>(this.a, n, da.get(n)) : null;
      if (!t) throw new Error(`Arbeitsordner unvollständig: ${n} fehlt.`);
      this.zuletzt.set(n, ArbeitSpeicher.abdruck(JSON.stringify(t)));
      dateien.push(...t);
    }
    this.zuletzt.set("stand.json", ArbeitSpeicher.abdruck(JSON.stringify(st)));
    return { ...st, dateien };
  }
  /** Lange Texte eines Blocks ablegen (C). Gibt den Dateinamen zurück (eindeutig je Block, nichts wird überschrieben). */
  async texte(texte: Record<string, string>): Promise<string> {
    const name = `texte-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}.json`;
    await jsonSchreiben(this.a, name, texte);
    return name;
  }
  // Stand des Einlesens (Blöcke, Weitermachen): lauf.json (Kopf) + lauf-d-NNNN.json/lauf-e-NNNN.json (src/lauf.ts, LaufSchreiber).
  // Seit Block 1 (14.11.2026) wird je Block nur der neue Teil geschrieben; vorher wurde jeder Teil neu in Text verwandelt und verglichen.
  private schreiber: LaufSchreiber | null = null;
  private laufAblage(): LaufAblage {
    return { schreiben: (n, w) => jsonSchreiben(this.a, `${n}.json`, n === "lauf" ? { ...(w as object), aktiv: true } : w),
      lesen: async (n) => { const x = await jsonLesen<Record<string, unknown>>(this.a, `${n}.json`); return n === "lauf" && !x?.aktiv ? null : x; } };
  }
  laufNeuBeginnen() { this.schreiber = null; }
  async laufSpeichern(l: Lauf) { this.schreiber ??= new LaufSchreiber(this.laufAblage()); await this.schreiber.merken(l); }
  async laufLaden<L>(): Promise<L | null> {
    const da = await inhalt(this.a);
    const meta = da.has("lauf.json") ? await jsonLesen<Record<string, unknown> & { aktiv?: boolean; teile?: number; erledigtTeile?: number }>(this.a, "lauf.json", da.get("lauf.json")) : null;
    if (!meta?.aktiv) return null;
    if (typeof meta.erledigtTeile === "number") return await laufAusTeilen(this.laufAblage()) as L | null;
    // alter Stand (bis 0.4.3): erledigt im Kopf, Dateien in lauf-NNNN.json
    const dateien: Datei[] = [];
    for (let i = 0; i < (meta.teile || 0); i++) { const n = `lauf-${nr(i)}.json`; const t = da.has(n) ? await jsonLesen<Datei[]>(this.a, n, da.get(n)) : null; if (!t) return null; dateien.push(...t); }
    const { aktiv, teile, ...rest } = meta; void aktiv; void teile;
    return { ...rest, dateien } as L;
  }
  /** Nichts wird gelöscht: der Lauf wird nur als beendet markiert. */
  async laufEnde() { this.schreiber = null; await jsonSchreiben(this.a, "lauf.json", { aktiv: false }); }

  async langerText(datei: string, pfad: string): Promise<string | null> {
    const t = await jsonLesen<Record<string, string>>(this.a, datei);
    return t?.[pfad] ?? null;
  }
}
