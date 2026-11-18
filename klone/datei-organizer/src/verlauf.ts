import type { Datei, Korrektur, Lernregel } from "../lib/typen.ts";
import { schluessel } from "../lib/lernen.ts";

/**
 * Verlauf (Klaus 18.11.2026): Einträge lassen sich aus dem Verlauf löschen, ohne den Schritt rückgängig zu machen.
 * Darum werden die gelernten Regeln beim Rückgängig nicht mehr aus dem übrigen Verlauf neu aufgebaut (dabei ginge verloren, was aus
 * gelöschten Einträgen gelernt wurde), sondern es wird genau die eine Stimme zurückgenommen, die dieser Schritt gegeben hat –
 * das Gegenstück zu `lernen` in lib/lernen.ts (gleiche Bedingungen). Der Kern selbst bleibt unverändert.
 */
export function verlernen(regeln: Lernregel[], datei: Datei, k: Korrektur): Lernregel[] {
  if (k.feld !== "kategorie") return regeln;
  const abs = datei.felder.absender?.wert;
  if (!abs || abs === "unbekannt" || /^eigenes foto/i.test(abs)) return regeln;
  const sache = k.von && k.von !== "Archiv" ? k.von : undefined;
  let r = stimmeWeg(regeln, abs, undefined, k.zu);
  if (sache) r = stimmeWeg(r, abs, sache, k.zu);
  return r;
}

function stimmeWeg(regeln: Lernregel[], abs: string, sache: string | undefined, zu: string): Lernregel[] {
  const s = schluessel(abs);
  const alt = regeln.find((r) => schluessel(r.wenn.absender) === s && r.feld === "kategorie" && (r.wenn.sache || undefined) === sache);
  if (!alt) return regeln;
  const stimmen = { ...(alt.stimmen || { [alt.dann]: alt.anzahl }) };
  if (!stimmen[zu]) return regeln;
  if (--stimmen[zu] <= 0) delete stimmen[zu];
  const rest = Object.entries(stimmen).sort((a, b) => b[1] - a[1]);
  if (!rest.length) return regeln.filter((r) => r !== alt);
  const [dann, anzahl] = rest[0];
  return regeln.map((r) => (r === alt ? { ...alt, dann, anzahl, stimmen } : r));
}

export type VerlaufOrdnung = "neu" | "alt" | "art";
/** Reihenfolge für die Anzeige: [Stelle im Verlauf, Eintrag]. „art“ = erst Geändertes, dann Bestätigtes, je nach Feld, Neuestes zuerst. */
export function verlaufOrdnen(verlauf: Korrektur[], wie: VerlaufOrdnung): Array<[number, Korrektur]> {
  const l = [...verlauf.entries()];
  if (wie === "alt") return l;
  l.reverse();
  if (wie === "art") l.sort((a, b) => Number(!!a[1].bestaetigt) - Number(!!b[1].bestaetigt) || a[1].feld.localeCompare(b[1].feld));
  return l;
}
