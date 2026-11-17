import type { Datei, Korrektur, Lernregel, Wert } from "./typen.ts";
import { dringlichkeit } from "./erkennen.ts";
import { STUFEN } from "./siebe.ts";

/**
 * organizer-index.json – liegt neben den Originalen im Ordner und ist für die Familienakte gemacht:
 * Steckbrief je Datei (feste Felder mit Sicherheit und Grund), Text für Sprachmodelle, Abschnitte für die
 * Vektorsuche. Feldnamen zusätzlich wie Paperless-ngx (correspondent, document_type, created, tags),
 * damit ein Export später möglich ist. Die Originale werden nie verändert.
 */
export const INDEX_FORMAT = "datei-organizer-index";
export const INDEX_FASSUNG = 1;
export const INDEX_DATEI = "organizer-index.json";
export const TEXT_MAX = 20000;

export type Steckbrief = {
  pfad: string; name: string; groesse: number; sha256?: string; art?: string; archivnummer?: string;
  pruefstand: "frei" | "auffällig" | "doppelt";
  auffaellig?: string; doppeltVon?: string;
  gesiebt_bis: string;
  schriftstueck?: string; datum?: string; kategorie?: string; absender?: string; betrifft?: string;
  frist?: string; betrag?: string; dringlichkeit: string;
  nummern: Array<{ art: string; wert: string }>;
  sicherheit: Record<string, "sicher" | "bitte prüfen" | "von dir" | "gelernt">;
  gruende: Record<string, string>;
  foto?: Datei["bild"]; email?: Datei["email"];
  kurzfassung: string;
  text?: string; text_gekuerzt?: boolean;
  abschnitte?: string[];
  paperless: { correspondent?: string; document_type?: string; created?: string; tags: string[]; archive_serial_number?: string };
};

export type OrganizerIndex = {
  format: typeof INDEX_FORMAT; fassung: number; erstellt: string; app: string;
  hinweis: string;
  dateien: Steckbrief[];
  lernregeln: Lernregel[];
  verlauf: Korrektur[];
};

const sicherheit = (v?: Wert) => !v ? undefined : v.quelle === "du" ? "von dir" : v.quelle === "gelernt" ? "gelernt" : v.sicher ? "sicher" : "bitte prüfen";

export function kurzfassung(d: Datei): string {
  const f = d.felder;
  if (d.auffaellig) return `Gesperrt: ${d.auffaellig}.`;
  if (d.doppeltVon) return `Doppelt (gleicher Inhalt wie ${d.doppeltVon}).`;
  const teile = [f.schriftstueck?.wert, f.absender && f.absender.wert !== "unbekannt" ? `von ${f.absender.wert}` : "", f.datum ? `vom ${deutsch(f.datum.wert)}` : "",
    f.betrifft && !["unbekannt", "allgemein"].includes(f.betrifft.wert) ? `für ${f.betrifft.wert}` : "", f.betrag ? `über ${f.betrag.wert}` : "", f.frist ? `Frist ${deutsch(f.frist.wert)}` : ""].filter(Boolean);
  return teile.length ? `${teile.join(", ")}.` : "Noch nicht gesiebt.";
}

export const deutsch = (iso: string) => /^\d{4}-\d{2}-\d{2}/.test(iso) ? `${iso.slice(8, 10)}.${iso.slice(5, 7)}.${iso.slice(0, 4)}` : iso;

/** Text in Abschnitte für Embedding-Modelle – jeder mit dem Steckbrief als Kopf, damit der Zusammenhang mitreist. */
export function abschnitte(d: Datei, text: string, max = 900): string[] {
  const kopf = [d.felder.schriftstueck?.wert, d.felder.absender?.wert, d.felder.kategorie?.wert, d.felder.datum ? deutsch(d.felder.datum.wert) : ""].filter(Boolean).join(" · ");
  const bloecke = text.split(/\n\s*\n/).map((b) => b.replace(/\s+/g, " ").trim()).filter(Boolean);
  const aus: string[] = [];
  let jetzt = "";
  for (const b of bloecke) {
    if ((jetzt + " " + b).length > max && jetzt) { aus.push(jetzt); jetzt = ""; }
    jetzt = jetzt ? `${jetzt} ${b}` : b;
    while (jetzt.length > max) { aus.push(jetzt.slice(0, max)); jetzt = jetzt.slice(max); }
  }
  if (jetzt) aus.push(jetzt);
  return aus.slice(0, 40).map((a) => `[${kopf}] ${a}`);
}

export function steckbrief(d: Datei, heute: string, mitText = true): Steckbrief {
  const f = d.felder;
  const s: Steckbrief = {
    pfad: d.pfad, name: d.name, groesse: d.groesse, sha256: d.sha256, art: d.artText, archivnummer: d.archivnummer,
    pruefstand: d.auffaellig ? "auffällig" : d.doppeltVon ? "doppelt" : "frei",
    auffaellig: d.auffaellig, doppeltVon: d.doppeltVon,
    gesiebt_bis: STUFEN[Math.min(d.stufe, 5)].name,
    schriftstueck: f.schriftstueck?.wert, datum: f.datum?.wert, kategorie: f.kategorie?.wert, absender: f.absender?.wert,
    betrifft: f.betrifft?.wert, frist: f.frist?.wert, betrag: f.betrag?.wert,
    dringlichkeit: dringlichkeit(f.frist?.wert, heute),
    nummern: f.nummern || [],
    sicherheit: {}, gruende: {},
    foto: d.bild, email: d.email,
    kurzfassung: kurzfassung(d),
    paperless: { correspondent: f.absender?.wert, document_type: f.schriftstueck?.wert, created: f.datum?.wert, tags: [f.kategorie?.wert, f.betrifft?.wert].filter((x): x is string => !!x && x !== "unbekannt"), archive_serial_number: d.archivnummer },
  };
  for (const feld of ["schriftstueck", "datum", "kategorie", "absender", "betrifft", "frist", "betrag"] as const) {
    const v = f[feld];
    const si = sicherheit(v);
    if (v && si) { s.sicherheit[feld] = si; s.gruende[feld] = v.grund; }
  }
  const text = d.volltext || d.kopfText;
  if (mitText && text) {
    s.text = text.slice(0, TEXT_MAX);
    if (text.length > TEXT_MAX) s.text_gekuerzt = true;
    s.abschnitte = abschnitte(d, text);
  }
  return s;
}

export function organizerIndex(dateien: Datei[], regeln: Lernregel[], verlauf: Korrektur[], heute: string, app: string, mitText = true): OrganizerIndex {
  return {
    format: INDEX_FORMAT, fassung: INDEX_FASSUNG, erstellt: new Date().toISOString(), app,
    hinweis: "Vom Datei-Organizer erzeugt. Die Originale liegen unverändert daneben. Werte mit „bitte prüfen“ sind Vorschläge.",
    dateien: dateien.map((d) => steckbrief(d, heute, mitText)), lernregeln: regeln, verlauf,
  };
}

/** Einen vorhandenen Index lesen (z. B. beim erneuten Öffnen des Ordners). Fremde oder spätere Fassungen werden abgewiesen. */
export function indexLesen(text: string): { ok: true; index: OrganizerIndex } | { ok: false; grund: string } {
  let j: unknown;
  try { j = JSON.parse(text); } catch { return { ok: false, grund: "keine gültige JSON-Datei" }; }
  const o = j as Partial<OrganizerIndex>;
  if (o.format !== INDEX_FORMAT) return { ok: false, grund: "kein Index des Datei-Organizers" };
  if (typeof o.fassung !== "number" || o.fassung > INDEX_FASSUNG) return { ok: false, grund: `Fassung ${o.fassung} ist neuer als diese App` };
  if (!Array.isArray(o.dateien)) return { ok: false, grund: "Dateiliste fehlt" };
  return { ok: true, index: o as OrganizerIndex };
}
