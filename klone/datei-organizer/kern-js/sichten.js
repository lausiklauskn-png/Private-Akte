// Erzeugt aus Datei-Organizer lib/sichten.ts (scripts/kern-js.mjs). Nicht von Hand ändern.
import { dringlichkeit } from "./erkennen.js";
import { gesperrt, istUnsicher } from "./siebe.js";
const MONATE = ["Januar", "Februar", "M\xE4rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const f = (d, feld, leer) => d.felder[feld]?.wert || leer;
const sperrOrdner = (d) => d.auffaellig ? "\u26A0 Auff\xE4llig \u2013 gesperrt" : d.doppeltVon ? "Doppelt" : "";
const SICHTEN = [
  { id: "ordnung", name: "Ordnung (Bereich \u203A Art)", ab: 3, ebenen: [(d) => [sperrOrdner(d) || f(d, "kategorie", "noch nicht gesiebt")], (d) => [f(d, "schriftstueck", "\u2013")]] },
  { id: "absender", name: "Absender", ab: 4, ebenen: [(d) => [sperrOrdner(d) || f(d, "absender", "noch nicht gesiebt")], (d) => [f(d, "schriftstueck", "\u2013")]] },
  { id: "betrifft", name: "Wen es betrifft", ab: 5, ebenen: [(d) => [sperrOrdner(d) || f(d, "betrifft", "noch nicht gesiebt")], (d) => [f(d, "kategorie", "\u2013")]] },
  { id: "datum", name: "Datum (Jahr \u203A Monat)", ab: 2, ebenen: [(d) => [sperrOrdner(d) || (d.felder.datum?.wert.slice(0, 4) ?? "ohne Datum")], (d) => [d.felder.datum ? MONATE[Number(d.felder.datum.wert.slice(5, 7)) - 1] : "\u2013"]] },
  { id: "dringlich", name: "Dringlichkeit", ab: 5, ebenen: [(d, h) => [sperrOrdner(d) || dringlichkeit(d.felder.frist?.wert, h)], (d) => [f(d, "kategorie", "\u2013")]] },
  { id: "nummern", name: "Nummern (Kunden-, Auftrags-, Akten-)", ab: 3, ebenen: [(d) => d.felder.nummern?.length ? [...new Set(d.felder.nummern.map((n) => n.art))] : [sperrOrdner(d) || "ohne Nummer"], (d) => d.felder.nummern?.length ? d.felder.nummern.map((n) => n.wert) : ["\u2013"]] },
  { id: "art", name: "Art der Datei", ab: 1, ebenen: [(d) => [sperrOrdner(d) || d.artText || "noch nicht gesiebt"]] },
  { id: "pruefen", name: "Zu pr\xFCfen", ab: 1, ebenen: [(d) => [sperrOrdner(d) || (d.stufe >= 2 && [2, 3, 4, 5].some((s) => s <= d.stufe && istUnsicher(d, s)) ? "Bitte pr\xFCfen" : "In Ordnung")]] },
  { id: "ordner", name: "Urspr\xFCnglicher Ordner", ab: 0, ebenen: [(d) => [d.pfad.includes("/") ? d.pfad.slice(0, d.pfad.lastIndexOf("/")) : "(oberste Ebene)"]] }
];
const RANG = (t) => t.startsWith("\u26A0") ? 0 : t === "Bitte pr\xFCfen" || t === "Frist \xFCberschritten" ? 1 : t === "Doppelt" ? 8 : /^(noch nicht|ohne|–|unbekannt|Unklar)/.test(t) ? 9 : 2;
const ordnen = (a, b) => RANG(a.titel) - RANG(b.titel) || a.titel.localeCompare(b.titel, "de", { numeric: true });
function baum(dateien, sicht, heute) {
  const wurzel = { id: "alle", titel: "Alle Dateien", anzahl: dateien.length, kinder: [], dateien: [] };
  for (const d of dateien) {
    const pfade = [[]];
    for (const ebene of sicht.ebenen) {
      const werte = ebene(d, heute);
      const neu = [];
      for (const p of pfade) for (const v of werte) neu.push([...p, v]);
      pfade.splice(0, pfade.length, ...neu.slice(0, 12));
      if (sperrOrdner(d)) break;
    }
    for (const p of pfade) {
      let k = wurzel;
      for (const teil of p) {
        let kind = k.kinder.find((x) => x.titel === teil);
        if (!kind) {
          kind = { id: `${k.id}/${teil}`, titel: teil, anzahl: 0, kinder: [], dateien: [] };
          k.kinder.push(kind);
        }
        kind.anzahl++;
        k = kind;
      }
      k.dateien.push(d.pfad);
    }
  }
  const toene = (k) => {
    k.kinder.sort(ordnen);
    k.kinder.forEach(toene);
    if (k.titel.startsWith("\u26A0")) k.ton = "warn";
    else if (k.titel === "Doppelt") k.ton = "doppelt";
    else if (k.titel === "Bitte pr\xFCfen" || k.titel === "Frist \xFCberschritten") k.ton = "pruefen";
  };
  toene(wurzel);
  return wurzel;
}
function dateienUnter(k) {
  const s = new Set(k.dateien);
  for (const c of k.kinder) for (const p of dateienUnter(c)) s.add(p);
  return [...s];
}
function suche(dateien, frage) {
  const worte = frage.toLowerCase().split(/\s+/).filter((x) => x.length >= 2);
  if (!worte.length) return dateien;
  return dateien.filter((d) => {
    const t = [d.pfad, d.artText, ...Object.values(d.felder).flatMap((v) => Array.isArray(v) ? v.map((n) => `${n.art} ${n.wert}`) : v ? [v.wert] : []), d.email?.betreff, d.volltext || d.kopfText].join(" ").toLowerCase();
    return worte.every((w) => t.includes(w));
  });
}
export {
  SICHTEN,
  baum,
  dateienUnter,
  gesperrt,
  suche
};
