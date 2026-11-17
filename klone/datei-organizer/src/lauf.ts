import type { Datei } from "../lib/typen.ts";

/**
 * Große Mengen in Blöcken (Klaus 13.11.: „Mengen über ~800 Dateien Schritt für Schritt“).
 * Das Einlesen merkt sich nach jedem Block, was schon gelesen ist (`Lauf`, in IndexedDB neben dem Zustand).
 * Bricht es ab (Knopf „Anhalten“, App geschlossen, Absturz, Akku), liest „Weitermachen“ nur den Rest:
 * dieselbe Quelle noch einmal, schon gelesene Dateien (gleicher Pfad und gleiches Änderungsdatum) werden übersprungen.
 * Reine Rechnung hier; Speichern in zustand.ts, Ablauf in app.tsx.
 */
export const BLOCK = 50;
export type Lauf = {
  fassung: 1;
  quelleName: string;
  quelleArt: string;
  /** gemerkter Ordner der App (Datei-Organizer Pro), falls bekannt – dann geht Weitermachen ohne Auswahl-Fenster */
  merkId?: string;
  /** hinzufügen (Drag and Drop, Teilen) statt neu einlesen */
  dazu: boolean;
  gesamt: number;
  /** Schlüssel der fertig gelesenen Quelldateien */
  erledigt: string[];
  /** was daraus wurde (Mail-Anhänge eingeschlossen) */
  dateien: Datei[];
  begonnen: string;
  zeit: string;
};
export const schluessel = (q: { pfad: string; geaendert: number }) => `${q.pfad}\u0000${q.geaendert}`;

/** Gehört ein angefangener Lauf zu dieser Quelle? Gleicher Name und gleiche Art, und die schon gelesenen Dateien liegen noch (fast alle) da. */
export function passt(l: Lauf | null, q: { name: string; art: string }, liste: Array<{ pfad: string; geaendert: number }>, dazu: boolean): boolean {
  if (!l || l.quelleName !== q.name || l.quelleArt !== q.art || l.dazu !== dazu || !l.erledigt.length) return false;
  const da = new Set(liste.map(schluessel));
  const noch = l.erledigt.filter((k) => da.has(k)).length;
  return noch >= Math.ceil(l.erledigt.length * 0.9);
}

/** Startpunkt: aus einem passenden Lauf die schon gelesenen Dateien übernehmen (nur die, deren Quelle noch da ist) und den Rest nennen. */
export function fortsetzen(l: Lauf, liste: Array<{ pfad: string; geaendert: number }>): { fertig: Datei[]; erledigt: Set<string>; rest: number } {
  const da = new Set(liste.map(schluessel));
  const erledigt = new Set(l.erledigt.filter((k) => da.has(k)));
  const pfade = new Set([...erledigt].map((k) => k.split("\u0000")[0]));
  // Mail-Anhänge heißen „Mail.eml › Anhang“: sie gehören zur Quelldatei vor dem ersten „ › “.
  const fertig = l.dateien.filter((d) => pfade.has(d.pfad.split(" › ")[0]));
  return { fertig, erledigt, rest: liste.filter((q) => !erledigt.has(schluessel(q))).length };
}

/** Text für die Meldung „angefangen“. */
export const laufText = (l: Lauf) => `Einlesen von „${l.quelleName}“ angefangen: ${l.erledigt.length} von ${l.gesamt} Dateien gelesen.`;

/**
 * Stand in Teilen merken (Block 1 der Trainings-Sitzung 14.11.2026, gemessen mit scripts/mengenprobe.mjs):
 * Vorher wurde nach jedem Block der ganze Lauf geschrieben – alle Dateien mit Text und alle erledigten Schlüssel. Bei 50.000 Dateien
 * sind das 1.000 Blöcke, die je die ganze bisherige Liste kopieren (Aufwand wächst mit dem Quadrat). Jetzt: Kopf (`lauf`) klein,
 * Dateien und erledigte Schlüssel in Teilen zu LAUF_TEIL; geschrieben werden nur die Teile, die seit dem letzten Mal dazugekommen
 * sind (der letzte, noch nicht volle Teil und neue). Volle Teile ändern sich nie mehr, weil der Lauf nur anhängt.
 * `ablage` ist IndexedDB (src/zustand.ts) oder der Arbeitsordner (src/arbeit.ts); hier nur die Rechnung, damit Proben sie nutzen.
 */
export const LAUF_TEIL = 1000;
export type LaufKopf = Omit<Lauf, "dateien" | "erledigt"> & { teile: number; erledigtTeile: number; anzahl: number; erledigtAnzahl: number };
export type LaufAblage = { schreiben: (name: string, wert: unknown) => Promise<void>; lesen: (name: string) => Promise<unknown> };
const teilName = (art: "d" | "e", i: number) => `lauf-${art}-${String(i + 1).padStart(4, "0")}`;

export class LaufSchreiber {
  /** wie viele Einträge in vollen, schon geschriebenen Teilen stehen (die nie wieder geschrieben werden) */
  private fest = { d: 0, e: 0 };
  /** Für einen neuen Lauf (oder nach Weitermachen) neu anlegen: dann wird beim ersten Mal alles geschrieben. */
  private ablage: LaufAblage;
  constructor(ablage: LaufAblage) { this.ablage = ablage; }
  async merken(l: Lauf): Promise<number> {
    let geschrieben = 0;
    const listen = { d: l.dateien as unknown[], e: l.erledigt as unknown[] };
    for (const art of ["d", "e"] as const) {
      const liste = listen[art];
      for (let i = Math.floor(this.fest[art] / LAUF_TEIL); i * LAUF_TEIL < liste.length; i++) {
        const teil = liste.slice(i * LAUF_TEIL, (i + 1) * LAUF_TEIL);
        await this.ablage.schreiben(teilName(art, i), teil); geschrieben++;
        if (teil.length === LAUF_TEIL) this.fest[art] = (i + 1) * LAUF_TEIL;
      }
    }
    const { dateien, erledigt, ...rest } = l;
    const kopf: LaufKopf = { ...rest, teile: Math.ceil(dateien.length / LAUF_TEIL), erledigtTeile: Math.ceil(erledigt.length / LAUF_TEIL), anzahl: dateien.length, erledigtAnzahl: erledigt.length };
    await this.ablage.schreiben("lauf", kopf);
    return geschrieben + 1;
  }
}

/** Lauf aus Teilen lesen; ein alter Stand (alles unter `lauf`, bis 0.4.3) wird weiter verstanden. Fehlt ein Teil, gilt er als nicht da. */
export async function laufAusTeilen(ablage: LaufAblage): Promise<Lauf | null> {
  const kopf = await ablage.lesen("lauf") as (LaufKopf & Partial<Lauf>) | null | undefined;
  if (!kopf || typeof kopf !== "object") return null;
  if (Array.isArray(kopf.dateien) && Array.isArray(kopf.erledigt)) return kopf as Lauf;
  if (typeof kopf.teile !== "number") return null;
  const holen = async (art: "d" | "e", n: number) => { const aus: unknown[] = []; for (let i = 0; i < n; i++) { const t = await ablage.lesen(teilName(art, i)); if (!Array.isArray(t)) return null; aus.push(...t); } return aus; };
  const dateien = await holen("d", kopf.teile), erledigt = await holen("e", kopf.erledigtTeile);
  if (!dateien || !erledigt || dateien.length < kopf.anzahl || erledigt.length < kopf.erledigtAnzahl) return null;
  const { teile, erledigtTeile, anzahl, erledigtAnzahl, ...rest } = kopf; void teile; void erledigtTeile;
  return { ...rest, dateien: (dateien as Datei[]).slice(0, anzahl), erledigt: (erledigt as string[]).slice(0, erledigtAnzahl) } as Lauf;
}
/** Namen aller Teile eines gemerkten Laufs (zum Löschen). */
export function laufTeilNamen(kopf: { teile?: number; erledigtTeile?: number } | null | undefined): string[] {
  if (!kopf) return [];
  return [...Array.from({ length: kopf.teile || 0 }, (_, i) => teilName("d", i)), ...Array.from({ length: kopf.erledigtTeile || 0 }, (_, i) => teilName("e", i))];
}
