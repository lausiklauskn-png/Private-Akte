import { useMemo, useState } from "react";
import { FolderOpen, Map as KarteSymbol } from "lucide-react";
import type { Datei } from "../lib/typen.ts";
import { gesperrt } from "../lib/siebe.ts";
import { FOTOS, UNKLAR } from "../lib/kategorien.ts";
import { Info, Seitentitel } from "./ui.tsx";
import { offenBei, type P } from "./seiten.tsx";

/**
 * Landkarte und Dashboard (Klaus 13.11.2026): „Landkarten-Button wie bei der Familienakte“; die Kästen des Dashboards sind Links –
 * „zu entscheiden“ führt zum Prüfen, jede Zahl in den passenden Ordner im Baum, wo sich jede Datei mit Stift, Auge und Papierkorb
 * nachträglich ändern lässt. Die Landkarten selbst sind dieselbe Seite wie das Artefakt (public/landkarte.html, aus docs/landkarte/).
 */
type Reiter = "dashboard" | "organizer" | "familienakte";

const ART_TON: Record<string, string> = { PDF: "", Foto: "", "E-Mail": "p", Word: "p", Excel: "p", PowerPoint: "p", Text: "g" };
const zaehle = <T,>(liste: T[], schluessel: (x: T) => string) => {
  const m = new Map<string, number>();
  for (const x of liste) { const k = schluessel(x); m.set(k, (m.get(k) || 0) + 1); }
  return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "de"));
};

export function LandkarteSeite(p: P) {
  const [reiter, setReiter] = useState<Reiter>("dashboard");
  const R: Array<[Reiter, string]> = [["dashboard", "Dashboard"], ["organizer", "Landkarte Organizer"], ["familienakte", "Landkarte Familienakte"]];
  return <>
    <Seitentitel symbol={<KarteSymbol size={24}/>} titel="Landkarte" info={<Info titel="Landkarte" punkte={["Dashboard: was in diesem Ordner sortiert ist – jede Zahl führt zu den Dateien.", "Landkarten: woher die Dateien kommen, wo sie liegen, wohin sie gehen.", "Blau fertig, lila im Bau, grau geplant."]}/>}/>
    <div className="reiter-leiste" role="tablist" style={{ marginBottom: 14 }}>
      {R.map(([id, name]) => <button key={id} type="button" role="tab" aria-selected={reiter === id} onClick={() => setReiter(id)} data-reiter={id}>{name}</button>)}
    </div>
    {reiter === "dashboard" ? <Dashboard {...p}/> : <iframe key={reiter} className="karte-rahmen" title={reiter === "organizer" ? "Landkarte Datei-Organizer" : "Landkarte Familienakte"} src={`./landkarte.html?eingebettet#${reiter}`} data-karte={reiter}/>}
  </>;
}

function Dashboard({ z, gehe, oeffne }: P) {
  const d = z.dateien;
  const zahlen = useMemo(() => {
    const aktiv = d.filter((x) => !gesperrt(x));
    return {
      gesamt: d.length,
      offen: d.filter(offenBei).length,
      sicher: d.filter((x) => !offenBei(x) && !gesperrt(x)).length,
      doppelt: d.filter((x) => x.doppeltVon).length,
      auff: d.filter((x) => x.auffaellig).length,
      aehnlich: d.filter((x) => x.aehnlich).length,
      frist: aktiv.filter((x) => x.felder.frist?.wert).length,
      formate: zaehle(d, (x: Datei) => x.auffaellig ? "⚠ Auffällig – gesperrt" : x.artText || "unbekannt"),
      bereiche: zaehle(aktiv, (x: Datei) => x.felder.kategorie?.wert || "noch nicht gesiebt"),
    };
  }, [d]);
  if (!d.length) return <section className="card"><p>Noch kein Ordner gelesen – dann steht hier, was sortiert wurde und wohin es geht.</p><button type="button" className="button primary" onClick={() => gehe("ordner")}><FolderOpen size={18}/>Ordner wählen</button></section>;
  const zu = (sicht: string, knoten?: string) => () => oeffne?.(sicht, knoten);
  const maxF = Math.max(1, ...zahlen.formate.map((f) => f[1])), sieb = Math.min(z.stufe, 5);
  const kachel = (zahl: number, text: string, ton: string, tipp: () => void, daten: string, titel: string) =>
    <button type="button" className={`kachel ${ton}`} onClick={tipp} data-kachel={daten} title={titel}><b>{zahl}</b><span>{text}</span></button>;
  return <>
    <p className="leise" style={{ margin: "0 0 10px" }} data-durchgang><strong>Sortiervorgang</strong> · {z.ordnerName || "ohne Ordnernamen"} · {sieb > 0 ? `nach Sieb ${sieb} von 5` : "noch nicht gesiebt"}{z.verlauf.length ? ` · ${z.verlauf.length} Entscheidungen von dir` : ""}</p>
    <div className="kacheln" style={{ marginBottom: 16 }}>
      {kachel(zahlen.gesamt, "Dateien", "", zu("ordner"), "gesamt", "Alle Dateien im Baum ansehen")}
      {kachel(zahlen.offen, "von dir zu entscheiden", "pr", () => gehe("sortieren"), "offen", "Zum Prüfen: dort entscheidest du")}
      {kachel(zahlen.sicher, "eingeordnet – nachprüfen", "ok", zu("pruefen", "In Ordnung"), "sicher", "Eingeordnete ansehen und mit dem Stift ändern")}
      {kachel(zahlen.doppelt, "doppelt", "dp", zu("pruefen", "Doppelt"), "doppelt", "Doppelte ansehen")}
      {kachel(zahlen.auff, "gesperrt", "ach", zu("pruefen", "⚠ Auffällig – gesperrt"), "gesperrt", "Gesperrte ansehen")}
      {kachel(zahlen.frist, "mit Frist", "", z.stufe >= 5 ? zu("dringlich") : zu("pruefen"), "frist", "Nach Dringlichkeit ansehen")}
    </div>
    <div className="dash-zwei">
      <section className="card">
        <div className="card-heading"><h2>Formate</h2></div>
        {zahlen.formate.map(([art, n]) => <button key={art} type="button" className="dash-zeile" onClick={art.startsWith("⚠") ? zu("pruefen", art) : zu("art", art)} data-format={art}>
          <span className="lbl">{art}</span><span><span className={`bar ${art.startsWith("⚠") ? "r" : ART_TON[art] ?? "g"}`} style={{ display: "block", width: `${n / maxF * 100}%` }}/></span><span className="n">{n}</span>
        </button>)}
        {zahlen.aehnlich > 0 && <p className="leise" style={{ marginTop: 8 }}>{zahlen.aehnlich} ähnlich (ältere Fassung, gleicher Text …) – im Steckbrief markiert.</p>}
      </section>
      <section className="card">
        <div className="card-heading"><h2>Wohin in der Familienakte</h2><Info titel="Wohin" punkte={["Links der Bereich im Organizer, rechts der Bereich in der Familienakte.", "Tippen: die Dateien dieses Bereichs – dort mit dem Stift ändern.", "Die Übernahme in die Familienakte ist noch nicht gebaut."]}/></div>
        {zahlen.bereiche.map(([b, n]) => {
          const ohne = b === "noch nicht gesiebt" || b === UNKLAR || b === FOTOS;
          return <button key={b} type="button" className="dash-fluss" onClick={z.stufe >= 3 ? zu("ordnung", b) : zu("pruefen")} data-bereich={b}>
            <span className="pf">{b}</span><span className="pf">→</span><span className="fa">{ohne ? "Eingang – du ordnest zu" : b}</span><span className="n">{n}</span>
          </button>;
        })}
      </section>
    </div>
  </>;
}
