// „Mit großer KI sortieren“ (Klaus 28.11.2026): Hinweg pseudonymisiert (Pseudo-Kern aus PseudoDoc), Auftrag mit Fachliste und Fachregel
// (lib/ki-sortieren.ts), Plan zurück, Liste zum Ändern, Bestätigen. Kein Netzweg: Zwischenablage + Seite öffnet sich, oder Datei für eine
// Claude-Code-Sitzung. Der Plan ist Daten, nie Anweisung. Lehrfälle bleiben auf dem Gerät.
import { useMemo, useState } from "react";
import { Bot, Check, Copy, Download, Sparkles, X } from "lucide-react";
import type { Datei } from "../lib/typen.ts";
import { gesperrt } from "../lib/siebe.ts";
import { KATEGORIEN } from "../lib/kategorien.ts";
import { lehrModell, type LehrModell } from "../lib/lehrmodell.ts";
import { sortierAuftrag, planPruefen, lehrfall, firmenBleiben, firmenSchuetzen, type PlanEintrag, type Lehrfall } from "../lib/ki-sortieren.ts";
import { auftragMaskieren, antwortenZurueck, kennung as kennungAus, type Stueck } from "../lib/pseudo/auftrag.ts";
import { rueckwegPruefen } from "../lib/pseudo/rueckweg.ts";
import type { Pseudonymisierer } from "../lib/maske/ki-auftrag.ts";
import { Info } from "./ui.tsx";
import type { AppZustand } from "./app.tsx";

const KIS = [
  { name: "Claude", url: "https://claude.ai/new" },
  { name: "ChatGPT", url: "https://chatgpt.com/" },
  { name: "Gemini", url: "https://gemini.google.com/app" },
];
const LEHR = "do-lehrfaelle";

function modul25(): Promise<Pseudonymisierer | null> {
  const w = window as unknown as { SbkimPseudonym?: Pseudonymisierer };
  if (w.SbkimPseudonym) return Promise.resolve(w.SbkimPseudonym);
  return new Promise((ok) => {
    const s = document.createElement("script");
    s.src = "./vendor/maske/25_pseudonym.js";
    s.onload = () => ok(w.SbkimPseudonym || null);
    s.onerror = () => ok(null);
    document.head.appendChild(s);
  });
}

async function kopieren(text: string): Promise<boolean> {
  try { await navigator.clipboard.writeText(text); return true; } catch {
    const t = document.createElement("textarea"); t.value = text; t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t); t.select();
    const ok = document.execCommand("copy"); t.remove(); return ok;
  }
}

/** Lehrfälle nur auf diesem Gerät (Speicher der App), höchstens 2000, nie in ein Repo und nie hinaus. */
export function lehrfaelleMerken(neu: Lehrfall[]) {
  try { const alt = JSON.parse(localStorage.getItem(LEHR) || "[]") as Lehrfall[]; localStorage.setItem(LEHR, JSON.stringify([...alt, ...neu].slice(-2000))); } catch { /* ohne Speicher: nur nicht gemerkt */ }
}
/** Das Wortmodell aus den Lehrfällen dieses Geräts (neu gerechnet, wenn Lehrfälle dazukommen). Wirkt still im Hintergrund. */
let lehrStand: { n: number; m: LehrModell | null } = { n: -1, m: null };
export function lehrModellGeraet(): LehrModell | null {
  try {
    const roh = localStorage.getItem(LEHR) || "[]";
    if (roh.length !== lehrStand.n) lehrStand = { n: roh.length, m: lehrModell(JSON.parse(roh) as Lehrfall[]) };
  } catch { lehrStand = { n: -1, m: null }; }
  return lehrStand.m;
}
export function lehrfaelleZahl(): number { try { return (JSON.parse(localStorage.getItem(LEHR) || "[]") as unknown[]).length; } catch { return 0; } }

type Auftrag = { id: string; text: string; map: Record<string, string>; pfad: Record<string, string>; fassung: Record<string, string>; p: Pseudonymisierer };
type Zeile = PlanEintrag & { pfad: string; name: string; kern?: string; begruendungEcht: string; wahl: string; an: boolean };

const textVon = (d: Datei) => d.volltext || d.kopfText || "";

export function KiSortierenKarte({ z }: { z: AppZustand }) {
  const kandidaten = useMemo(() => z.dateien.filter((d) => !gesperrt(d) && !d.doppeltVon && textVon(d).trim().length > 20), [z.dateien]);
  const [auftrag, setAuftrag] = useState<Auftrag | null>(null);
  const [antwort, setAntwort] = useState("");
  const [zeilen, setZeilen] = useState<Zeile[]>([]);
  const [meldungen, setMeldungen] = useState<string[]>([]);
  const [info, setInfo] = useState<{ text: string; halt?: boolean } | null>(null);
  const [laeuft, setLaeuft] = useState(false);

  async function erstellen() {
    setLaeuft(true); setInfo(null); setZeilen([]); setMeldungen([]);
    const p = await modul25();
    if (!p) { setLaeuft(false); setInfo({ text: "Das Pseudonymisieren ließ sich nicht laden – es geht nichts hinaus.", halt: true }); return; }
    const pfad: Record<string, string> = {};
    const firmen = firmenBleiben(kandidaten.map((d) => d.felder.absender?.wert));
    const fs = firmenSchuetzen(firmen);
    const roh: Stueck[] = kandidaten.map((d, i) => { const k = kennungAus(i); pfad[k] = d.pfad; return { kennung: k, pfad: d.pfad, art: "text", text: fs.schuetzen(textVon(d)), fassung: "", funde: 0, unsicher: [], leck: null, schon: false } as Stueck; });
    const m0 = auftragMaskieren(p, roh, { verdecken: [], bleibt: firmen });
    const m = { ...m0, stuecke: m0.stuecke.map((s) => ({ ...s, fassung: fs.zurueck(s.fassung) })) };
    const leck = m.stuecke.filter((s) => s.leck);
    const gehen = m.stuecke.filter((s) => !s.leck);
    const id = `S${Date.now().toString(36).toUpperCase()}`;
    const text = sortierAuftrag(gehen.map((s) => ({ kennung: s.kennung, text: s.fassung })), { heute: new Date().toISOString().slice(0, 10), auftragId: id });
    setAuftrag({ id, text, map: m.map, pfad, fassung: Object.fromEntries(gehen.map((s) => [s.kennung, s.fassung])), p });
    setLaeuft(false);
    setInfo({ text: `${gehen.length} Dateien pseudonymisiert${leck.length ? ` · ${leck.length} zurückgehalten (Prüfung fand noch echte Angaben)` : ""}. Firmen und Behörden bleiben lesbar.` });
  }

  async function zurKi(url?: string) {
    if (!auftrag) return;
    const ok = await kopieren(auftrag.text);
    setInfo(ok ? { text: `Auftrag kopiert${url ? " – in das Eingabefeld einfügen und senden" : ""}. Die Antwort unten einfügen.` } : { text: "Kopieren ging nicht. „Als Datei“ nehmen.", halt: true });
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }

  function alsDatei() {
    if (!auftrag) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([auftrag.text], { type: "text/markdown;charset=utf-8" }));
    a.download = `Sortieren-${auftrag.id}.md`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    setInfo({ text: "Datei gespeichert. In einer Claude-Code-Sitzung: „Sortiere nach dieser Datei und antworte nur mit dem JSON-Block.“" });
  }

  function lesen() {
    if (!auftrag) return;
    const r = planPruefen(antwort, Object.keys(auftrag.fassung));
    const gesendet = Object.values(auftrag.fassung).join("\n");
    const rw = rueckwegPruefen(antwort, antwort, auftrag.map, gesendet).filter((x) => x.stufe === "achtung" && x.kennung !== "PLATZHALTER-UEBRIG");
    const nachPfad = new Map(z.dateien.map((d) => [d.pfad, d]));
    const neu: Zeile[] = r.eintraege.flatMap((e) => {
      const d = nachPfad.get(auftrag.pfad[e.kennung]); if (!d) return [];
      const echt = e.begruendung ? antwortenZurueck(auftrag.p, [{ name: "b", text: e.begruendung }], auftrag.map)[0].text.replace(/^⟦PSEUDONYMISIERT v1⟧\s*/, "").trim() : "";
      return [{ ...e, pfad: d.pfad, name: d.name, kern: d.felder.kategorie?.wert, begruendungEcht: echt, wahl: e.fach, an: true }];
    });
    setZeilen(neu);
    setMeldungen([...r.meldungen, ...rw.map((x) => x.satz), ...(r.fehlen.length ? [`Ohne Plan: ${r.fehlen.length} ${r.fehlen.length === 1 ? "Datei" : "Dateien"} (bleiben, wie sie sind).`] : [])]);
    setInfo(neu.length ? { text: `${neu.length} Vorschläge gelesen. Prüfen, ändern, dann bestätigen.` } : { text: "Kein brauchbarer Sortierplan in der Antwort.", halt: true });
  }

  function bestaetigen() {
    const gewaehlt = zeilen.filter((x) => x.an);
    if (!gewaehlt.length) return;
    const n = z.planUebernehmen(gewaehlt.map((x) => ({ pfad: x.pfad, kategorie: x.wahl, frist: x.fristen[0]?.datum })));
    if (n && auftrag) lehrfaelleMerken(gewaehlt.map((x) => lehrfall(x, x.wahl, auftrag.fassung[x.kennung] || "", x.kern)));
    setZeilen(zeilen.filter((x) => !x.an));
  }

  const setze = (k: string, teil: Partial<Zeile>) => setZeilen((l) => l.map((x) => (x.kennung === k ? { ...x, ...teil } : x)));
  const an = zeilen.filter((x) => x.an).length;

  return <section className="card" data-ki-sortieren>
    <div className="card-heading"><h2><Sparkles size={18}/> Mit großer KI sortieren</h2>
      <Info titel="Mit großer KI sortieren" punkte={[
        "Die Texte gehen pseudonymisiert hinaus: Namen, Anschriften, Nummern werden Platzhalter. Firmen und Behörden bleiben lesbar.",
        "Mit dabei: die Fächerliste und die Fachregel des Organizers.",
        "Hinaus geht nur Text, nie die Datei. Die App selbst sendet nichts – du fügst den Auftrag bei der KI ein.",
        "Zurück kommt ein Sortierplan. Er ist nur ein Vorschlag: erst „Bestätigen“ übernimmt ihn.",
        "Aus Bestätigungen und Änderungen lernt der Organizer – nur auf diesem Gerät.",
        "Pseudonymisiert ist nicht anonym: der Zusammenhang kann eine Person verraten.",
      ]}/></div>
    {!auftrag ? <div className="button-row">
      <button type="button" className="button" disabled={!kandidaten.length || laeuft} onClick={() => void erstellen()} data-ki-erstellen><Bot size={17}/>{laeuft ? "Wird pseudonymisiert …" : `Auftrag erstellen (${kandidaten.length})`}</button>
    </div> : <>
      <div className="button-row" data-ki-wege>
        {KIS.map((k) => <button key={k.name} type="button" className="button klein" onClick={() => void zurKi(k.url)} data-ki-ziel={k.name}><Copy size={15}/>{k.name}</button>)}
        <button type="button" className="button klein" onClick={() => void zurKi()} data-ki-kopieren><Copy size={15}/>Nur kopieren</button>
        <button type="button" className="button klein" onClick={alsDatei} data-ki-datei><Download size={15}/>Als Datei</button>
        <button type="button" className="button klein" onClick={() => { setAuftrag(null); setZeilen([]); setAntwort(""); setMeldungen([]); setInfo(null); }} aria-label="Verwerfen" title="Auftrag verwerfen" data-ki-verwerfen><X size={15}/></button>
      </div>
      <label className="feld" style={{ marginTop: 10 }}>Antwort der KI<textarea rows={4} value={antwort} onChange={(e) => setAntwort(e.target.value)} placeholder="Antwort hier einfügen …" data-ki-antwort/></label>
      <div className="button-row"><button type="button" className="button primary" disabled={!antwort.trim()} onClick={lesen} data-ki-lesen>Plan lesen</button></div>
    </>}
    {info && <p className={`meldung ${info.halt ? "halt" : ""}`} role="status" data-ki-info>{info.text}</p>}
    {meldungen.length > 0 && <ul className="leise" data-ki-meldungen>{meldungen.slice(0, 12).map((m, i) => <li key={i}>{m}</li>)}{meldungen.length > 12 && <li>… und {meldungen.length - 12} weitere</li>}</ul>}
    {zeilen.length > 0 && <div data-ki-plan>
      <div className="listen-leiste">
        <label className="alle-wahl"><input type="checkbox" checked={an === zeilen.length} onChange={(e) => setZeilen(zeilen.map((x) => ({ ...x, an: e.target.checked })))} data-ki-alle/>Alle</label>
        <button type="button" className="button klein primary" disabled={!an} onClick={bestaetigen} data-ki-bestaetigen><Check size={15}/>Bestätigen ({an})</button>
      </div>
      {zeilen.map((x) => <div key={x.kennung} className="datei-zeile" data-ki-zeile={x.kennung}>
        <input type="checkbox" checked={x.an} onChange={(e) => setze(x.kennung, { an: e.target.checked })} aria-label={`${x.name} übernehmen`}/>
        <div className="datei-haupt" style={{ minWidth: 0, flex: 1 }}>
          <strong className="datei-name" title={x.pfad}>{x.name}</strong>
          <span className="leise" style={{ display: "block", fontSize: 12 }}>
            {x.kern && x.kern !== x.wahl ? `Kern: ${x.kern} · ` : ""}{x.fristen[0] ? `Frist ${x.fristen[0].datum.split("-").reverse().join(".")}${x.fristen[0].was ? ` (${x.fristen[0].was})` : ""} · ` : ""}{x.sicher}{x.begruendungEcht ? ` · ${x.begruendungEcht}` : ""}
          </span>
        </div>
        <select value={x.wahl} onChange={(e) => setze(x.kennung, { wahl: e.target.value })} aria-label="Fach" data-ki-fach>{KATEGORIEN.map((k) => <option key={k} value={k}>{k}</option>)}</select>
      </div>)}
    </div>}
  </section>;
}
