import type { Datei, Aehnlich } from "./typen.ts";

/**
 * Doppelungen über den exakt gleichen Inhalt hinaus (Klaus 13.11.2026: „anhand der Größe der Datei und dem Ordner … auch
 * Code-Doppelungen … ein Name doppelt vergeben … wenn Dateien nicht gelesen werden können, aus dem Code heraus“).
 * Exakt gleiche Dateien (gleicher Fingerabdruck) markiert weiter doppelteMarkieren und nimmt sie aus der Sicht.
 * Hier werden nur MARKIERT, nie entfernt – ähnlich ist nicht gleich:
 *   fassung – gleicher Name ohne Kopie-/Versionszusatz („Kopie von“, „(2)“, „_v2“, „_final“, „neu“), anderer Inhalt
 *   herkunft – gleiche PDF-Kennung (Trailer /ID), anderer Inhalt: aus derselben Datei entstanden (Art „fassung“)
 *   inhalt  – gleicher Text, andere Datei (neu gespeichert, gedruckt und wieder eingescannt, als PDF und als Word)
 *   beleg   – gleicher Absender und gleiche Rechnungs-, Vertrags- oder Kundennummer im selben Schriftstück-Typ
 *   foto    – gleiche Aufnahme (Zeitpunkt und Kamera), andere Größe oder Bearbeitung
 *   name    – gleicher Dateiname in anderem Ordner, aber anderer Inhalt und keine Fassung (Namenskonflikt)
 * Je Gruppe bleibt die neueste Datei ohne Marke; die übrigen zeigen auf sie. Rein, ohne Browser.
 */

/** Dateiname ohne Endung, Kopie- und Versionszusätze, klein geschrieben. */
export function namensStamm(name: string): string {
  let s = name.toLowerCase().replace(/\.[a-z0-9]{1,5}$/, "");
  s = s.replace(/^(kopie( \(\d+\))? von|copy of)\s+/, "");
  for (let i = 0; i < 3; i++) s = s
    .replace(/[\s_-]*(-\s*)?(kopie|copy)(\s*\(\d+\))?$/, "")
    .replace(/[\s_-]*\(\d+\)$/, "")
    .replace(/[\s_-]+(v|ver|version|fassung|stand)[\s_.-]?\d+([.]\d+)*$/, "")
    .replace(/[\s_-]+(final|endg(ü|ue)ltig|neu|new|alt|old|entwurf|draft|korr(ektur)?|geändert|aktuell)$/, "")
    .replace(/[\s_-]+\d{4}-?\d{2}-?\d{2}$/, "");
  return s.replace(/[\s_.-]+/g, " ").trim();
}

/** Kurzer Fingerabdruck des Textes (cyrb53): Kleinbuchstaben, nur Buchstaben und Ziffern. */
export function textFingerabdruck(text: string | undefined): string | undefined {
  const t = (text || "").toLowerCase().replace(/[^a-z0-9äöüß]+/g, "");
  if (t.length < 200) return undefined;
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < t.length; i++) { const c = t.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

const endung = (n: string) => (/\.([a-z0-9]{1,5})$/i.exec(n)?.[1] || "").toLowerCase();
const ordner = (p: string) => p.includes("/") ? p.slice(0, p.lastIndexOf("/")) : "";
const BELEGNUMMER = /^(Rechnungsnummer|Vertragsnummer|Auftragsnummer|Kundennummer)$/;

export function aehnlicheFinden(dateien: Datei[]): Datei[] {
  const kandidaten = dateien.filter((d) => !d.doppeltVon && !d.auffaellig && d.groesse > 0);
  const marke = new Map<string, Aehnlich>();
  const neueste = (g: Datei[]) => [...g].sort((a, b) => b.geaendert - a.geaendert || a.pfad.localeCompare(b.pfad, "de"))[0];
  const gruppen = (schluessel: (d: Datei) => string | undefined) => {
    const m = new Map<string, Datei[]>();
    for (const d of kandidaten) { const k = schluessel(d); if (!k) continue; const g = m.get(k); g ? g.push(d) : m.set(k, [d]); }
    return [...m.values()].filter((g) => g.length > 1 && new Set(g.map((d) => d.sha256 || d.pfad)).size > 1);
  };
  const markiere = (g: Datei[], art: Aehnlich["art"], grund: (zu: Datei) => string) => {
    const zu = neueste(g);
    for (const d of g) if (d !== zu && !marke.has(d.pfad)) marke.set(d.pfad, { art, zu: zu.pfad, grund: grund(zu) });
  };
  // Reihenfolge = Stärke des Hinweises: gleicher Text vor gleichem Beleg vor Fassung vor Foto vor bloßem Namen.
  for (const g of gruppen((d) => textFingerabdruck(d.volltext))) markiere(g, "inhalt", (z) => `gleicher Text wie „${z.name}“, aber andere Datei (neu gespeichert, gescannt oder anderes Format)`);
  // Gleiche PDF-Kennung: aus derselben Datei entstanden. Teilen mehr als 20 Dateien eine Kennung, vergibt das Programm sie fest
  // (manche Scanner und Druckertreiber) – dann sagt sie nichts über die Herkunft und wird übergangen.
  for (const g of gruppen((d) => d.innen?.pdfKennung?.herkunft)) {
    if (g.length <= 20) markiere(g, "fassung", (z) => `gleiche PDF-Kennung wie „${z.name}“ – aus derselben Datei entstanden (andere Fassung oder neu gespeichert)`);
  }
  for (const g of gruppen((d) => {
    const a = d.felder.absender?.wert, art = d.felder.schriftstueck?.wert, n = d.felder.nummern?.find((x) => BELEGNUMMER.test(x.art));
    return a && n ? `${a.toLowerCase()}|${art || ""}|${n.art}|${n.wert.replace(/\s/g, "")}` : undefined;
  })) markiere(g, "beleg", (z) => `gleicher Absender und gleiche Nummer wie „${z.name}“ – derselbe Beleg in anderer Fassung?`);
  for (const g of gruppen((d) => { const s = namensStamm(d.name); return s.length >= 3 ? `${s}.${endung(d.name)}` : undefined; })) {
    const namen = new Set(g.map((d) => d.name.toLowerCase()));
    if (namen.size > 1) markiere(g, "fassung", (z) => `ältere Fassung von „${z.name}“ (Name bis auf Kopie-/Versionszusatz gleich)`);
  }
  for (const g of gruppen((d) => d.bild?.aufnahme ? `${d.bild.aufnahme}|${d.bild.modell || ""}` : undefined)) markiere(g, "foto", (z) => `gleiche Aufnahme wie „${z.name}“, andere Größe oder Bearbeitung`);
  for (const g of gruppen((d) => d.name.toLowerCase())) {
    if (new Set(g.map((d) => ordner(d.pfad))).size > 1) markiere(g, "name", (z) => `gleicher Name wie „${z.pfad}“, aber anderer Inhalt – Namenskonflikt`);
  }
  return dateien.map((d) => { const a = marke.get(d.pfad); return a ? { ...d, aehnlich: a } : (d.aehnlich ? { ...d, aehnlich: undefined } : d); });
}

/** Größe zuerst (Reduktion vor der Arbeit): nur Dateien gleicher Größe können byte-gleich sein. Für große Bestände: erst danach den Fingerabdruck rechnen. */
export function gleicheGroesse<T extends { groesse: number }>(liste: T[]): T[][] {
  const m = new Map<number, T[]>();
  for (const d of liste) if (d.groesse > 0) { const g = m.get(d.groesse); g ? g.push(d) : m.set(d.groesse, [d]); }
  return [...m.values()].filter((g) => g.length > 1);
}
