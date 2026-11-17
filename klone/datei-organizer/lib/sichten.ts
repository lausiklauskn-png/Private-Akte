import type { Datei } from "./typen.ts";
import { dringlichkeit } from "./erkennen.ts";
import { gesperrt, istUnsicher } from "./siebe.ts";

/**
 * Der Ordnerbaum als Sicht: dieselben Dateien unter verschiedenen Gesichtspunkten, nichts wird verschoben.
 * Jede Sicht hat zwei Ebenen (wie ein Explorer: Ordner › Unterordner › Dateien).
 */
export type Sicht = { id: string; name: string; ab: number; ebenen: Array<(d: Datei, heute: string) => string[]> };
export type BaumKnoten = { id: string; titel: string; anzahl: number; kinder: BaumKnoten[]; dateien: string[]; ton?: "warn" | "pruefen" | "doppelt" };

const MONATE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const f = (d: Datei, feld: "schriftstueck" | "kategorie" | "absender" | "betrifft", leer: string) => d.felder[feld]?.wert || leer;
const sperrOrdner = (d: Datei) => d.auffaellig ? "⚠ Auffällig – gesperrt" : d.doppeltVon ? "Doppelt" : "";

export const SICHTEN: Sicht[] = [
  { id: "ordnung", name: "Ordnung (Bereich › Art)", ab: 3, ebenen: [(d) => [sperrOrdner(d) || f(d, "kategorie", "noch nicht gesiebt")], (d) => [f(d, "schriftstueck", "–")]] },
  { id: "absender", name: "Absender", ab: 4, ebenen: [(d) => [sperrOrdner(d) || f(d, "absender", "noch nicht gesiebt")], (d) => [f(d, "schriftstueck", "–")]] },
  { id: "betrifft", name: "Wen es betrifft", ab: 5, ebenen: [(d) => [sperrOrdner(d) || f(d, "betrifft", "noch nicht gesiebt")], (d) => [f(d, "kategorie", "–")]] },
  { id: "datum", name: "Datum (Jahr › Monat)", ab: 2, ebenen: [(d) => [sperrOrdner(d) || (d.felder.datum?.wert.slice(0, 4) ?? "ohne Datum")], (d) => [d.felder.datum ? MONATE[Number(d.felder.datum.wert.slice(5, 7)) - 1] : "–"]] },
  { id: "dringlich", name: "Dringlichkeit", ab: 5, ebenen: [(d, h) => [sperrOrdner(d) || dringlichkeit(d.felder.frist?.wert, h)], (d) => [f(d, "kategorie", "–")]] },
  { id: "nummern", name: "Nummern (Kunden-, Auftrags-, Akten-)", ab: 3, ebenen: [(d) => d.felder.nummern?.length ? [...new Set(d.felder.nummern.map((n) => n.art))] : [sperrOrdner(d) || "ohne Nummer"], (d) => d.felder.nummern?.length ? d.felder.nummern.map((n) => n.wert) : ["–"]] },
  { id: "art", name: "Art der Datei", ab: 1, ebenen: [(d) => [sperrOrdner(d) || d.artText || "noch nicht gesiebt"]] },
  { id: "pruefen", name: "Zu prüfen", ab: 1, ebenen: [(d) => [sperrOrdner(d) || (d.stufe >= 2 && [2, 3, 4, 5].some((s) => s <= d.stufe && istUnsicher(d, s)) ? "Bitte prüfen" : "In Ordnung")]] },
  { id: "ordner", name: "Ursprünglicher Ordner", ab: 0, ebenen: [(d) => [d.pfad.includes("/") ? d.pfad.slice(0, d.pfad.lastIndexOf("/")) : "(oberste Ebene)"]] },
];

const RANG = (t: string) => t.startsWith("⚠") ? 0 : t === "Bitte prüfen" || t === "Frist überschritten" ? 1 : t === "Doppelt" ? 8 : /^(noch nicht|ohne|–|unbekannt|Unklar)/.test(t) ? 9 : 2;
const ordnen = (a: BaumKnoten, b: BaumKnoten) => RANG(a.titel) - RANG(b.titel) || a.titel.localeCompare(b.titel, "de", { numeric: true });

export function baum(dateien: Datei[], sicht: Sicht, heute: string): BaumKnoten {
  const wurzel: BaumKnoten = { id: "alle", titel: "Alle Dateien", anzahl: dateien.length, kinder: [], dateien: [] };
  for (const d of dateien) {
    const pfade: string[][] = [[]];
    for (const ebene of sicht.ebenen) {
      const werte = ebene(d, heute);
      const neu: string[][] = [];
      for (const p of pfade) for (const v of werte) neu.push([...p, v]);
      pfade.splice(0, pfade.length, ...neu.slice(0, 12));
      if (sperrOrdner(d)) break;
    }
    for (const p of pfade) {
      let k = wurzel;
      for (const teil of p) {
        let kind = k.kinder.find((x) => x.titel === teil);
        if (!kind) { kind = { id: `${k.id}/${teil}`, titel: teil, anzahl: 0, kinder: [], dateien: [] }; k.kinder.push(kind); }
        kind.anzahl++;
        k = kind;
      }
      k.dateien.push(d.pfad);
    }
  }
  const toene = (k: BaumKnoten) => {
    k.kinder.sort(ordnen); k.kinder.forEach(toene);
    if (k.titel.startsWith("⚠")) k.ton = "warn"; else if (k.titel === "Doppelt") k.ton = "doppelt"; else if (k.titel === "Bitte prüfen" || k.titel === "Frist überschritten") k.ton = "pruefen";
  };
  toene(wurzel);
  return wurzel;
}

/** Alle Dateien unter einem Knoten (auch in Unterordnern), ohne Doppelnennung. */
export function dateienUnter(k: BaumKnoten): string[] {
  const s = new Set<string>(k.dateien);
  for (const c of k.kinder) for (const p of dateienUnter(c)) s.add(p);
  return [...s];
}

/** Suche über Name, erkannte Felder und Text. Alle Wörter müssen vorkommen. */
export function suche(dateien: Datei[], frage: string): Datei[] {
  const worte = frage.toLowerCase().split(/\s+/).filter((x) => x.length >= 2);
  if (!worte.length) return dateien;
  return dateien.filter((d) => {
    const t = [d.pfad, d.artText, ...Object.values(d.felder).flatMap((v) => Array.isArray(v) ? v.map((n) => `${n.art} ${n.wert}`) : v ? [v.wert] : []), d.email?.betreff, d.volltext || d.kopfText].join(" ").toLowerCase();
    return worte.every((w) => t.includes(w));
  });
}

export { gesperrt };
