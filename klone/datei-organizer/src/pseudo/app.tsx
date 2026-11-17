// Pseudonymisierer (Klaus 14.11.2026): Ordner oder Dateien rein → pseudonymisierte Fassung für jede KI (Ordner, eine Datei,
// Kopieren, ZIP) → Antwort der KI zurück → echte Angaben wieder drin. Bilder: schwarze Flächen frei setzen, Original bleibt.
// Maske byte-gleich aus der Familienakte (lib/maske/, Pin). Gestaltung wie Familienakte/Datei-Organizer. Kein Netz.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArchiveRestore, Copy, Download, Eye, FileDown, FileText, FolderOpen, KeyRound, Pencil, RotateCcw, Trash2, Upload, Undo2, VenetianMask, X } from "lucide-react";
import { Info, Ablaufbild, FesterBaum } from "../ui.tsx";
import { auftragMaskieren, kiDateien, allesInEinerDatei, antwortenZurueck, stellenImBild, kennzeichenImBild, kennung as kennungAus, artName, korrekturAusText, auftragAusText, STILE, ZIELE, ORDNER, type Stueck, type AuftragWahl, type Wort, type Zurueck } from "../../lib/pseudo/auftrag.ts";
import { ausPixeln, type Flaeche } from "../../lib/pseudo/flaechen.ts";
import { zipBauen, docxBauen } from "../../lib/pseudo/pakete.ts";
import { officeText } from "../../lib/zip.ts";
import type { Pseudonymisierer } from "../../lib/maske/ki-auftrag.ts";
import { lesen, type Eingang, type Gelesen } from "./lesen.ts";
import { abgedeckt, bildZurueck, gesichter } from "./bild.ts";
import { Abdecken } from "./abdecken.tsx";
import { beispielDateien } from "./beispiel.ts";
import * as speicher from "./speicher.ts";
import { auftragOrdner, unterordner, datei, erlaubt, herunterladen, kopieren, ordnerLesen, ordnerSchreibbar, ortWaehlen, type DirHandle } from "./ordner.ts";

export const FASSUNG = "0.1.0";
const istNativ = () => !!(window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor?.isNativePlatform?.();
export const VARIANTE = istNativ() ? "Pro" : "Basic";
const modul25 = () => (window as unknown as { SbkimPseudonym?: Pseudonymisierer }).SbkimPseudonym;

type Seite = "pseudo" | "zurueck" | "auftraege";
type Eintrag = { kennung: string; g: Gelesen; vorschlaege: Flaeche[] };

const neueId = () => `${new Date().toISOString().slice(0, 10)}-${Math.random().toString(36).slice(2, 8)}`;
const stdName = () => `Auftrag ${new Date().toLocaleString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}`;

function Doppelblatt() { return <Copy size={17} aria-hidden="true"/>; }

function markiert(text: string, map: Record<string, string>, klick?: (tok: string) => void): ReactNode[] {
  return text.split(/(⟦[^⟧]+⟧)/g).map((t, i) => /^⟦[A-Z][A-Z0-9_]*-\d+⟧$/.test(t)
    ? <mark key={i} className="pseudo-platzhalter" title={map[t] ? `steht für: ${map[t]}` : undefined} onClick={klick ? () => klick(t) : undefined}>{t}</mark> : t);
}

export function App() {
  const [seite, setSeite] = useState<Seite>(() => (location.hash.slice(1) as Seite) || "pseudo");
  useEffect(() => { const h = () => setSeite((location.hash.slice(1) as Seite) || "pseudo"); addEventListener("hashchange", h); return () => removeEventListener("hashchange", h); }, []);
  const gehe = (s: Seite) => { location.hash = s; setSeite(s); scrollTo(0, 0); };
  const [zurueckId, setZurueckId] = useState<string>("");

  return <>
    <header className="site-header">
      <div className="masthead">
        <button type="button" className="site-brand" onClick={() => gehe("pseudo")}>
          <span className="brand-symbol"><VenetianMask size={24}/></span>
          <span><strong>Pseudonymisierer {VARIANTE}</strong><small>Fassung {FASSUNG} · alles bleibt auf diesem Gerät</small></span>
        </button>
        <div className="header-actions">
          <Info titel="Was ist das?" punkte={[
            "Du gibst Dateien hinein (Brief, Vertrag, AGB, Fotos …). Namen, Anschriften, Nummern werden zu Platzhaltern wie ⟦NAME-1⟧, in Bildern deckst du Stellen schwarz ab.",
            "Die Fassung für die KI kopierst du oder lädst sie als Datei/Ordner in ChatGPT, Claude oder eine andere KI.",
            "Die Antwort der KI holst du zurück: die echten Angaben kommen wieder hinein.",
            "Die Zuordnung (welcher Platzhalter wofür steht) bleibt verschlüsselt auf diesem Gerät, höchstens 90 Tage.",
            "Pseudonymisiert ist nicht anonym: mit der Zuordnung lässt es sich zurückführen (DSGVO Art. 4 Nr. 5).",
          ]}/>
        </div>
      </div>
      <nav className="main-navigation" aria-label="Bereiche">
        {([["pseudo", "Pseudonymisieren"], ["zurueck", "Zurückführen"], ["auftraege", "Aufträge"]] as Array<[Seite, string]>).map(([s, n]) =>
          <button key={s} type="button" className={seite === s ? "active" : ""} aria-current={seite === s ? "page" : undefined} onClick={() => gehe(s)} data-seite={s}>{n}</button>)}
      </nav>
    </header>
    <main className="site-main">
      <div hidden={seite !== "pseudo"}><PseudoSeite zumRueckweg={(id) => { setZurueckId(id); gehe("zurueck"); }}/></div>
      {seite === "zurueck" && <ZurueckSeite start={zurueckId}/>}
      {seite === "auftraege" && <AuftraegeSeite zumRueckweg={(id) => { setZurueckId(id); gehe("zurueck"); }}/>}
    </main>
    <footer className="site-footer"><div className="footer-inner"><span className="leise">Pseudonymisierer {VARIANTE} {FASSUNG} · Maske aus der Familienakte · Teil der Pro-App-Familie</span> · <a href="./pseudonymisierer-datenschutz.html">Impressum &amp; Datenschutz</a></div></footer>
  </>;
}

// ── Seite 1: Pseudonymisieren ─────────────────────────────────────────────────────────────────────────────────────────
function PseudoSeite({ zumRueckweg }: { zumRueckweg: (id: string) => void }) {
  const [eintraege, setEintraege] = useState<Eintrag[]>([]);
  const [stuecke, setStuecke] = useState<Stueck[]>([]);
  const [map, setMap] = useState<Record<string, string>>({});
  const [verdecken, setVerdecken] = useState("");
  const [bleibt, setBleibt] = useState("");
  const [wahl, setWahl] = useState<AuftragWahl>({ ziel: "antwort", stile: ["formell"], frei: "" });
  const [auftragId, setAuftragId] = useState(neueId);
  const [name, setName] = useState(stdName);
  const [meldung, setMeldung] = useState<{ text: string; art?: "halt" | "gut" } | null>(null);
  const [laeuft, setLaeuft] = useState("");
  const [ansehen, setAnsehen] = useState<string | null>(null);
  const [abdecken, setAbdecken] = useState<string | null>(null);
  const [weg, setWeg] = useState<Eintrag[]>([]);
  const [ort, setOrt] = useState<DirHandle | null>(null);
  const [ablage, setAblage] = useState<DirHandle | null>(null);
  const [ziehen, setZiehen] = useState(false);
  const urls = useRef(new Map<string, string>());
  const dateiWahl = useRef<HTMLInputElement>(null), ordnerWahl = useRef<HTMLInputElement>(null);
  const p = modul25();

  const bildUrl = (k: string, b?: Blob) => { if (!b) return ""; if (!urls.current.has(k)) urls.current.set(k, URL.createObjectURL(b)); return urls.current.get(k)!; };

  /** Alles neu rechnen: Texte maskieren, Vorschläge für Bilder, Auftrag speichern. */
  async function rechnen(liste: Eintrag[], v = verdecken, b = bleibt) {
    if (!p) { setMeldung({ text: "Die Maske ist nicht geladen – Seite neu laden.", art: "halt" }); return; }
    const roh: Stueck[] = liste.map((e) => {
      const alt = stuecke.find((s) => s.kennung === e.kennung);
      return { ...e.g.stueck, kennung: e.kennung, weglassen: alt?.weglassen, bild: e.g.stueck.bild ? { ...e.g.stueck.bild, flaechen: alt?.bild?.flaechen ?? e.g.stueck.bild.flaechen } : undefined } as Stueck;
    });
    const r = auftragMaskieren(p, roh, korrekturAusText(v, b));
    const werte = Object.values(r.map);
    const neu = await Promise.all(liste.map(async (e) => {
      if (!e.g.stueck.bild) return e;
      const { breite, hoehe } = e.g.stueck.bild;
      const vor = [...stellenImBild(e.g.woerter || [], werte).map((s) => ausPixeln(s, breite, hoehe, "text")),
        ...kennzeichenImBild(e.g.woerter || []).map((s) => ausPixeln(s, breite, hoehe, "kennzeichen")),
        ...(e.vorschlaege.some((f) => f.auto === "gesicht") ? e.vorschlaege.filter((f) => f.auto === "gesicht") : (await gesichter(e.g.bild!)).map((s) => ausPixeln(s, breite, hoehe, "gesicht")))];
      return { ...e, vorschlaege: vor };
    }));
    const fertig = r.stuecke.map((s) => {
      const e = neu.find((x) => x.kennung === s.kennung)!;
      const alt = stuecke.find((x) => x.kennung === s.kennung);
      if (s.bild && !alt?.bild) s.bild = { ...s.bild, flaechen: e.vorschlaege };
      return s;
    });
    setEintraege(neu); setStuecke(fertig); setMap(r.map);
    await merken(fertig, r.map, neu);
  }

  async function merken(st = stuecke, m = map, liste = eintraege, w = wahl) {
    const originalNamen = Object.fromEntries(liste.map((e) => [e.kennung, e.g.stueck.pfad]));
    await speicher.speichern({ id: auftragId, name, erstellt: Date.now(), geaendert: Date.now(), wahl: { ...w, auftragId }, korrektur: korrekturAusText(verdecken, bleibt), stuecke: st.map(speicher.zumSpeichern), originalNamen, ordner: ablage || undefined }, m).catch(() => setMeldung({ text: "Konnte den Auftrag nicht auf dem Gerät merken (privates Fenster?). Zurückführen geht dann nur in dieser Sitzung.", art: "halt" }));
    for (const e of liste) if (e.g.bild) await speicher.bildMerken(auftragId, e.kennung, e.g.bild).catch(() => {});
  }

  async function einlesen(eingaenge: Eingang[]) {
    if (!eingaenge.length) { setMeldung({ text: "Es wurden keine Dateien übergeben.", art: "halt" }); return; }
    setMeldung(null);
    let nr = eintraege.reduce((m, e) => Math.max(m, Number(e.kennung.slice(1))), 0);
    const neu: Eintrag[] = [];
    for (let i = 0; i < eingaenge.length; i++) {
      setLaeuft(`Datei ${i + 1} von ${eingaenge.length}: ${eingaenge[i].name}`);
      for (const g of await lesen(eingaenge[i], (s) => setLaeuft(`Datei ${i + 1} von ${eingaenge.length} · ${s}`))) neu.push({ kennung: kennungAus(nr++), g, vorschlaege: [] });
    }
    setLaeuft("Pseudonymisieren …");
    await rechnen([...eintraege, ...neu]);
    setLaeuft("");
    setMeldung({ text: `${neu.length} ${neu.length === 1 ? "Stück" : "Stücke"} gelesen und pseudonymisiert. Bitte unten prüfen.`, art: "gut" });
  }

  const ausFiles = async (l: FileList | File[]) => einlesen(await Promise.all([...l].map(async (f) => ({ pfad: (f as File & { webkitRelativePath?: string }).webkitRelativePath || f.name, name: f.name, bytes: new Uint8Array(await f.arrayBuffer()) }))));

  async function ausZiehen(dt: DataTransfer) {
    type E = { isFile: boolean; isDirectory: boolean; name: string; fullPath: string; file?: (ok: (f: File) => void, n: (e: unknown) => void) => void; createReader?: () => { readEntries: (ok: (l: E[]) => void, n: (e: unknown) => void) => void } };
    const gefunden: Eingang[] = [];
    const lauf = async (e: E): Promise<void> => {
      if (e.isFile && e.file) { const f = await new Promise<File>((ok, n) => e.file!(ok, n)); gefunden.push({ pfad: e.fullPath.replace(/^\//, ""), name: f.name, bytes: new Uint8Array(await f.arrayBuffer()) }); return; }
      if (e.isDirectory && e.createReader) { const r = e.createReader(); for (;;) { const t = await new Promise<E[]>((ok, n) => r.readEntries(ok, n)); if (!t.length) break; for (const k of t) await lauf(k); } }
    };
    const wurzeln = [...dt.items].filter((i) => i.kind === "file").map((i) => (i as unknown as { webkitGetAsEntry?: () => E | null }).webkitGetAsEntry?.() || null);
    if (wurzeln.some(Boolean)) { for (const w of wurzeln) if (w) await lauf(w); await einlesen(gefunden); } else await ausFiles(dt.files);
  }

  async function ordnerLesenUndEinlesen() {
    const h = await ortWaehlen().catch(() => null); if (!h) return;
    const gefunden: Eingang[] = [];
    const lauf = async (d: DirHandle, pfad: string) => { for await (const e of d.values()) {
      if (e.kind === "directory") { if (!/^\d-/.test(e.name)) await lauf(await d.getDirectoryHandle(e.name), `${pfad}${e.name}/`); }
      else { const f = await (await d.getFileHandle(e.name)).getFile(); gefunden.push({ pfad: pfad + f.name, name: f.name, bytes: new Uint8Array(await f.arrayBuffer()) }); }
    } };
    await lauf(h, ""); await einlesen(gefunden);
  }

  function neuAnfangen() {
    for (const u of urls.current.values()) URL.revokeObjectURL(u); urls.current.clear();
    setEintraege([]); setStuecke([]); setMap({}); setWeg([]); setVerdecken(""); setBleibt(""); setAuftragId(neueId()); setName(stdName()); setMeldung(null); setOrt(null); setAblage(null);
  }

  const entfernen = (k: string) => { const e = eintraege.find((x) => x.kennung === k); if (!e) return; setWeg([e, ...weg]); void rechnen(eintraege.filter((x) => x.kennung !== k)); };
  const zurueckholen = () => { const [e, ...rest] = weg; if (!e) return; setWeg(rest); void rechnen([...eintraege, e].sort((a, b) => a.kennung.localeCompare(b.kennung))); };
  const umschalten = (k: string) => { const st = stuecke.map((s) => (s.kennung === k ? { ...s, weglassen: !s.weglassen } : s)); setStuecke(st); void merken(st); };
  const darfBleiben = (wert: string) => { const b = bleibt ? `${bleibt}\n${wert}` : wert; setBleibt(b); void rechnen(eintraege, verdecken, b); };
  const immerVerdecken = (wert: string) => { const v = verdecken ? `${verdecken}\n${wert}` : wert; setVerdecken(v); void rechnen(eintraege, v, bleibt); };

  const wahlMitId: AuftragWahl = { ...wahl, auftragId };
  const offen = stuecke.filter((s) => !s.weglassen && (s.fassung || s.bild));
  const lecks = offen.filter((s) => s.leck);
  const bilderAus = async () => Promise.all(offen.filter((s) => s.bild).map(async (s) => ({ name: `${s.kennung}.png`, blob: await abgedeckt(eintraege.find((e) => e.kennung === s.kennung)!.g.bild!, s.bild!.flaechen) })));
  const gesperrt = () => { if (lecks.length) { setMeldung({ text: `Halt: In ${lecks.map((s) => s.kennung).join(", ")} steht noch ein verdeckter Wert im Klartext. Bitte ansehen und korrigieren.`, art: "halt" }); return true; } if (!offen.length) { setMeldung({ text: "Noch nichts zum Ausgeben.", art: "halt" }); return true; } return false; };

  async function inOrdner() {
    if (gesperrt()) return;
    let h = ort;
    if (!h) { h = await ortWaehlen().catch(() => null); if (!h) return; setOrt(h); }
    if (!(await erlaubt(h))) { setMeldung({ text: "Der Ordner darf nicht beschrieben werden.", art: "halt" }); return; }
    setLaeuft("Arbeitsordner schreiben …");
    try {
      const o = await auftragOrdner(h, name);
      for (const e of eintraege) if (e.g.original) await datei(o.originale, e.g.original.pfad.replace(/[\\/]/g, " – "), new Blob([e.g.original.bytes as BlobPart]));
      for (const d of kiDateien(wahlMitId, stuecke)) await datei(o.ki, d.name, d.text);
      for (const b of await bilderAus()) await datei(o.ki, b.name, b.blob);
      setAblage(o.auftrag);
      await speicher.speichern({ ...(await speicher.laden(auftragId).catch(() => null))?.auftrag ?? { id: auftragId, name, erstellt: Date.now(), geaendert: Date.now(), wahl: wahlMitId, korrektur: korrekturAusText(verdecken, bleibt), stuecke: [], originalNamen: {} }, ordner: o.auftrag }, map).catch(() => {});
      setMeldung({ text: `Gespeichert in „${h.name}/${name}“: Originale in ${ORDNER.originale}, für die KI in ${ORDNER.ki}. Antworten der KI später in ${ORDNER.antworten} legen.`, art: "gut" });
    } catch (err) { setMeldung({ text: `Konnte nicht schreiben: ${(err as Error).message}`, art: "halt" }); }
    setLaeuft("");
  }
  async function eineDatei() { if (gesperrt()) return; await merken(); await herunterladen(`${name} – fuer die KI.md`, allesInEinerDatei(wahlMitId, stuecke), "text/markdown;charset=utf-8"); const b = await bilderAus(); for (const x of b) await herunterladen(x.name, x.blob); setMeldung({ text: `Datei für die KI gespeichert${b.length ? ` (dazu ${b.length} abgedeckte ${b.length === 1 ? "Bild" : "Bilder"})` : ""}.`, art: "gut" }); }
  async function alsZip() { if (gesperrt()) return; await merken(); const b = await bilderAus(); const z = zipBauen([...kiDateien(wahlMitId, stuecke).map((d) => ({ name: `${ORDNER.ki}/${d.name}`, daten: d.text })), ...(await Promise.all(b.map(async (x) => ({ name: `${ORDNER.ki}/${x.name}`, daten: new Uint8Array(await x.blob.arrayBuffer()) }))))]); await herunterladen(`${name} – fuer die KI.zip`, new Blob([z as BlobPart], { type: "application/zip" })); }
  async function allesKopieren() { if (gesperrt()) return; const ok = await kopieren(allesInEinerDatei(wahlMitId, stuecke)); await merken(); setMeldung(ok ? { text: `Kopiert – in ChatGPT, Claude oder eine andere KI einfügen.${offen.some((s) => s.bild) ? " Bilder bitte als Datei dazulegen („Eine Datei“ lädt sie mit herunter)." : ""}`, art: "gut" } : { text: "Kopieren ging nicht – bitte „Eine Datei für die KI“ nehmen.", art: "halt" }); }

  const anzeige = ansehen ? stuecke.find((s) => s.kennung === ansehen) : null;
  const deck = abdecken ? stuecke.find((s) => s.kennung === abdecken) : null;
  const deckE = abdecken ? eintraege.find((e) => e.kennung === abdecken) : null;

  return <>
    <div className="page-title"><span className="page-title-icon"><VenetianMask size={24}/></span><h1>Pseudonymisieren</h1>
      <Info titel="So geht es" mehr={<Ablaufbild label="Ablauf" schritte={[{ titel: "Dateien rein", unter: "Ordner, Dateien, Fotos, Mails" }, { titel: "Prüfen", unter: "Platzhalter, Bilder abdecken" }, { titel: "An die KI", unter: "Kopieren, Datei, Ordner" }, { titel: "Zurückführen", unter: "echte Angaben wieder drin", art: "hervor" }]}/>}/></div>
    {meldung && <p className={`meldung ${meldung.art === "halt" ? "halt" : ""}`} role="status" data-meldung>{meldung.text}</p>}
    {laeuft && <p className="meldung" role="status" data-laeuft><span className="drehen"/> {laeuft}</p>}

    <section className="card" data-karte="dateien">
      <div className="card-heading"><h2>1 · Dateien hinein</h2>{eintraege.length > 0 && <button type="button" className="button klein" onClick={neuAnfangen} data-neu><RotateCcw size={16}/> Neu anfangen</button>}</div>
      <div className={`pseudo-ablage ${ziehen ? "aktiv" : ""}`} onDragOver={(e) => { e.preventDefault(); setZiehen(true); }} onDragLeave={() => setZiehen(false)} onDrop={(e) => { e.preventDefault(); setZiehen(false); void ausZiehen(e.dataTransfer); }} data-ablage>
        <Upload size={26}/><span>Dateien oder einen ganzen Ordner hierher ziehen</span>
        <span className="leise">Brief, Vertrag, AGB, PDF, Scan, Foto, E-Mail (.eml mit Anhängen), Word</span>
      </div>
      <div className="button-row" style={{ marginTop: 12 }}>
        <button type="button" className="button primary" onClick={() => dateiWahl.current?.click()} data-dateien-waehlen><FileText size={18}/> Dateien wählen</button>
        {ordnerSchreibbar() ? <button type="button" className="button" onClick={() => void ordnerLesenUndEinlesen()}><FolderOpen size={18}/> Ordner wählen</button>
          : <button type="button" className="button" onClick={() => ordnerWahl.current?.click()}><FolderOpen size={18}/> Ordner wählen</button>}
        <button type="button" className="button" onClick={async () => einlesen(await beispielDateien())} data-beispiel>Beispiel (erfunden)</button>
        <input ref={dateiWahl} type="file" multiple hidden onChange={(e) => { if (e.target.files) void ausFiles(e.target.files); e.target.value = ""; }} data-datei-eingabe/>
        <input ref={ordnerWahl} type="file" multiple hidden {...({ webkitdirectory: "" } as object)} onChange={(e) => { if (e.target.files) void ausFiles(e.target.files); e.target.value = ""; }}/>
      </div>
    </section>

    {eintraege.length > 0 && <section className="card" data-karte="pruefen">
      <div className="card-heading"><h2>2 · Prüfen</h2><span className="leise">{offen.length} von {stuecke.length} gehen an die KI · {Object.keys(map).length} Angaben verdeckt</span></div>
      {weg.length > 0 && <p className="leise">{weg.length} entfernt · <button type="button" className="text-link" onClick={zurueckholen} data-zurueckholen><Undo2 size={15}/> Zurückholen</button></p>}
      <ul className="pseudo-liste">
        {stuecke.map((s) => <li key={s.kennung} className={`pseudo-zeile ${s.weglassen ? "aus" : ""}`} data-stueck={s.kennung}>
          <span className="pseudo-kennung">{s.kennung}</span>
          <span className="pseudo-name"><strong>{s.pfad}</strong>
            <span className="chips">
              <span className="badge">{artName(s.art)}</span>
              {s.fassung && <span className="badge gut" data-verdeckt>{(s.fassung.match(/⟦[A-Z][A-Z0-9_]*-\d+⟧/g) || []).length} Stellen verdeckt</span>}
              {s.bild && <span className="badge du" data-flaechen>{s.bild.flaechen.length} {s.bild.flaechen.length === 1 ? "Fläche" : "Flächen"} schwarz</span>}
              {s.schon && <span className="badge">war schon pseudonymisiert</span>}
              {s.leck && <span className="badge warn" data-leck>Klartext übrig: „{s.leck}“</span>}
              {!s.fassung && !s.bild && <span className="badge pruefen">bleibt draußen</span>}
              {s.hinweis && <span className="leise">{s.hinweis}</span>}
            </span>
            {s.unsicher.length > 0 && <span className="unsicher-zeile">Unsicher, verdeckt: {s.unsicher.map((u) => <button key={u} type="button" className="chip unsicher" title="Tippen: darf bleiben" onClick={() => darfBleiben(u)} data-unsicher={u}>{u} ✓ darf bleiben</button>)}</span>}
          </span>
          <span className="pseudo-knoepfe">
            <button type="button" className="info-knopf" title="Ansehen" aria-label={`${s.kennung} ansehen`} onClick={() => setAnsehen(s.kennung)} data-auge><Eye size={18}/></button>
            {s.bild && <button type="button" className="info-knopf" title="Bild bearbeiten: Stellen schwarz abdecken" aria-label={`${s.kennung} abdecken`} onClick={() => setAbdecken(s.kennung)} data-stift><Pencil size={18}/></button>}
            <label className="umschalter" title="Geht an die KI"><input type="checkbox" checked={!s.weglassen} onChange={() => umschalten(s.kennung)} disabled={!s.fassung && !s.bild} data-mit/> an die KI</label>
            <button type="button" className="info-knopf" title="Aus dem Auftrag entfernen" aria-label={`${s.kennung} entfernen`} onClick={() => entfernen(s.kennung)} data-papierkorb><Trash2 size={18}/></button>
          </span>
        </li>)}
      </ul>
      <details className="korrigieren" data-korrigieren>
        <summary>Korrigieren: Wörter immer verdecken oder stehen lassen</summary>
        <div className="raster-2">
          <label>Immer verdecken (je Zeile ein Wort/Name)<textarea rows={3} value={verdecken} onChange={(e) => setVerdecken(e.target.value)} data-verdecken/></label>
          <label>Darf bleiben (je Zeile)<textarea rows={3} value={bleibt} onChange={(e) => setBleibt(e.target.value)} data-bleibt/></label>
        </div>
        <button type="button" className="button klein" onClick={() => void rechnen(eintraege)} data-neu-rechnen>Neu pseudonymisieren</button>
      </details>
    </section>}

    {eintraege.length > 0 && <section className="card" data-karte="auftrag">
      <div className="card-heading"><h2>3 · Auftrag an die KI</h2><Info titel="Auftrag" punkte={["Der Auftrag kommt als AUFTRAG.md mit – die KI weiß dann, was sie tun soll und dass sie die Platzhalter stehen lassen muss.", "Den Stil kannst du auch später direkt bei der KI ändern."]}/></div>
      <div className="chips">{ZIELE.map((z) => <button key={z.id} type="button" className={`chip ${wahl.ziel === z.id ? "an" : ""}`} aria-pressed={wahl.ziel === z.id} onClick={() => setWahl({ ...wahl, ziel: z.id })} data-ziel={z.id}>{z.name}</button>)}</div>
      <p className="leise" style={{ margin: "10px 0 4px" }}>Stil</p>
      <div className="chips">{STILE.map((s) => { const an = wahl.stile.includes(s.id); return <button key={s.id} type="button" className={`chip ${an ? "an" : ""}`} aria-pressed={an} onClick={() => setWahl({ ...wahl, stile: an ? wahl.stile.filter((x) => x !== s.id) : [...wahl.stile, s.id] })} data-stil={s.id}>{s.name}</button>; })}</div>
      {wahl.ziel === "antwort" && <label className="feld">Welche Datei ist der Brief?<select value={wahl.brief || ""} onChange={(e) => setWahl({ ...wahl, brief: e.target.value || undefined })} data-brief><option value="">– nicht festgelegt –</option>{offen.map((s) => <option key={s.kennung} value={s.kennung}>{s.kennung} · {s.pfad}</option>)}</select></label>}
      <label className="feld">Eigener Auftrag (frei){wahl.ziel === "frei" ? "" : ", zusätzlich"}<textarea rows={2} value={wahl.frei} onChange={(e) => setWahl({ ...wahl, frei: e.target.value })} placeholder="z. B. Bitte um Ratenzahlung in drei Raten" data-frei/></label>
    </section>}

    {eintraege.length > 0 && <section className="card" data-karte="ausgabe">
      <div className="card-heading"><h2>4 · Für die KI ausgeben</h2>
        <Info titel="Arbeitsordner" mehr={<FesterBaum label="Arbeitsordner" wurzel={{ titel: name, kinder: [{ titel: ORDNER.originale, unter: "Kopie der Originale – bleibt bei dir" }, { titel: ORDNER.ki, unter: "pseudonymisiert – das geht an die KI" }, { titel: ORDNER.antworten, unter: "hier legst du die Antworten ab" }, { titel: ORDNER.zurueck, unter: "Ergebnis mit echten Angaben" }] }}/>}/></div>
      <label className="feld">Name des Auftrags<input value={name} onChange={(e) => setName(e.target.value)} data-auftrag-name/></label>
      <div className="button-row">
        <button type="button" className="button primary" onClick={() => void allesKopieren()} data-kopieren><Doppelblatt/> Kopieren</button>
        <button type="button" className="button" onClick={() => void eineDatei()} data-eine-datei><FileDown size={18}/> Eine Datei für die KI</button>
        {ordnerSchreibbar() && <button type="button" className="button" onClick={() => void inOrdner()} data-in-ordner><FolderOpen size={18}/> {ort ? `In „${ort.name}“ speichern` : "In Arbeitsordner speichern"}</button>}
        <button type="button" className="button" onClick={() => void alsZip()} data-zip><Download size={18}/> Als ZIP</button>
      </div>
      <p className="leise" style={{ marginTop: 10 }}>Dann einfügen oder hochladen bei: <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">ChatGPT</a> · <a href="https://claude.ai/new" target="_blank" rel="noopener noreferrer">Claude</a> · oder jede andere KI. Die Antwort holst du unter <button type="button" className="text-link" onClick={() => { void merken().then(() => zumRueckweg(auftragId)); }} data-zum-rueckweg>Zurückführen</button>.</p>
    </section>}

    {anzeige && <Fenster titel={`${anzeige.kennung} · ${anzeige.pfad}`} zu={() => setAnsehen(null)}>
      <Ansicht s={anzeige} e={eintraege.find((x) => x.kennung === anzeige.kennung)!} map={map} url={bildUrl(anzeige.kennung, eintraege.find((x) => x.kennung === anzeige.kennung)?.g.bild)}
        darfBleiben={darfBleiben} verdecken={immerVerdecken} meldung={(t) => setMeldung({ text: t, art: "gut" })}
        abdecken={() => { setAnsehen(null); setAbdecken(anzeige.kennung); }}/>
    </Fenster>}
    {deck?.bild && deckE?.g.bild && <div className="fenster-grund"><Abdecken bildUrl={bildUrl(deck.kennung, deckE.g.bild)} breite={deck.bild.breite} hoehe={deck.bild.hoehe} anfang={deck.bild.flaechen} vorschlaege={deckE.vorschlaege} titel={`${deck.kennung} · ${deck.pfad}`}
      abbrechen={() => setAbdecken(null)} fertig={(f) => { const st = stuecke.map((s) => (s.kennung === deck.kennung ? { ...s, bild: { ...s.bild!, flaechen: f } } : s)); setStuecke(st); setAbdecken(null); void merken(st); }}/></div>}
  </>;
}

function Fenster({ titel, zu, children }: { titel: string; zu: () => void; children: ReactNode }) {
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === "Escape") zu(); }; addEventListener("keydown", k); return () => removeEventListener("keydown", k); });
  return <div className="fenster-grund" onClick={(e) => { if (e.target === e.currentTarget) zu(); }}>
    <div className="fenster" role="dialog" aria-label={titel} data-fenster>
      <div className="fenster-kopf"><strong>{titel}</strong><button type="button" className="info-knopf" aria-label="Schließen" onClick={zu} data-fenster-zu><X size={18}/></button></div>
      <div className="fenster-inhalt">{children}</div>
    </div>
  </div>;
}

function Ansicht({ s, e, map, url, darfBleiben, verdecken, meldung, abdecken }: { s: Stueck; e: Eintrag; map: Record<string, string>; url: string; darfBleiben: (w: string) => void; verdecken: (w: string) => void; meldung: (t: string) => void; abdecken: () => void }) {
  const [reiter, setReiter] = useState<"ki" | "original">("ki");
  const [tok, setTok] = useState<string | null>(null);
  const [vorschau, setVorschau] = useState("");
  useEffect(() => { let u = ""; if (s.bild && e.g.bild) void abgedeckt(e.g.bild, s.bild.flaechen).then((b) => { u = URL.createObjectURL(b); setVorschau(u); }); return () => { if (u) URL.revokeObjectURL(u); }; }, [s, e]);
  const auswahlVerdecken = () => { const t = String(getSelection() || "").trim(); if (t.length >= 2) { verdecken(t); meldung(`„${t}“ wird ab jetzt verdeckt.`); } };
  return <>
    <div className="reiter-leiste" role="tablist">
      <button type="button" role="tab" aria-selected={reiter === "ki"} className={reiter === "ki" ? "aktiv" : ""} onClick={() => setReiter("ki")} data-reiter="ki">Für die KI</button>
      <button type="button" role="tab" aria-selected={reiter === "original"} className={reiter === "original" ? "aktiv" : ""} onClick={() => setReiter("original")} data-reiter="original">Original</button>
    </div>
    {reiter === "ki" ? <>
      {s.bild && vorschau && <figure className="pseudo-bild"><img src={vorschau} alt="Abgedecktes Bild für die KI" data-vorschau-bild/><figcaption className="leise">{s.bild.flaechen.length} schwarze {s.bild.flaechen.length === 1 ? "Fläche" : "Flächen"} · <button type="button" className="text-link" onClick={abdecken}><Pencil size={14}/> bearbeiten</button></figcaption></figure>}
      {s.fassung ? <>
        <pre className="pseudo-text" data-fassung>{markiert(s.fassung, map, setTok)}</pre>
        {tok && <p className="meldung" data-platzhalter-info>{tok} steht für „{map[tok]}“ · <button type="button" className="text-link" onClick={() => { darfBleiben(map[tok]); setTok(null); }}>darf bleiben</button></p>}
        <div className="button-row"><button type="button" className="button klein" onClick={async () => meldung((await kopieren(s.fassung)) ? "Kopiert." : "Kopieren ging nicht.")}><Doppelblatt/> Kopieren</button><span className="leise">Tipp auf einen Platzhalter zeigt, wofür er steht.</span></div>
      </> : !s.bild && <p className="leise">Kein Text lesbar – diese Datei geht nicht an die KI.</p>}
    </> : <>
      {url && <figure className="pseudo-bild"><img src={url} alt="Original" data-original-bild/></figure>}
      {s.text && <><pre className="pseudo-text" data-original-text>{s.text}</pre>
        <div className="button-row"><button type="button" className="button klein" onClick={auswahlVerdecken} data-auswahl-verdecken>Markiertes immer verdecken</button><span className="leise">Text markieren, dann tippen.</span></div></>}
    </>}
  </>;
}

// ── Seite 2: Zurückführen ────────────────────────────────────────────────────────────────────────────────────────────
type Ergebnis = (Zurueck & { art: "text" }) | { art: "bild"; name: string; url: string; blob: Blob; hinweis: string };

function ZurueckSeite({ start }: { start: string }) {
  const [liste, setListe] = useState<speicher.Auftrag[]>([]);
  const [id, setId] = useState(start);
  const [geladen, setGeladen] = useState<{ auftrag: speicher.Auftrag; map: Record<string, string> } | null>(null);
  const [eingabe, setEingabe] = useState("");
  const [ergebnisse, setErgebnisse] = useState<Ergebnis[]>([]);
  const [meldung, setMeldung] = useState<{ text: string; art?: "halt" } | null>(null);
  const wahl = useRef<HTMLInputElement>(null);
  const p = modul25();
  useEffect(() => { void speicher.alle().then((l) => { setListe(l); if (!start && l[0]) setId(l[0].id); }).catch(() => setMeldung({ text: "Gespeicherte Aufträge sind in diesem Fenster nicht lesbar.", art: "halt" })); }, [start]);
  useEffect(() => { if (id) void speicher.laden(id).then(setGeladen).catch(() => setGeladen(null)); else setGeladen(null); }, [id]);

  async function verarbeiten(antworten: Array<{ name: string; text?: string; bild?: Blob }>) {
    if (!p) return;
    let g = geladen;
    const erkannt = antworten.map((a) => a.text && auftragAusText(a.text)).find(Boolean);
    if (erkannt && erkannt !== id && liste.some((x) => x.id === erkannt)) { setId(erkannt); g = await speicher.laden(erkannt); setMeldung({ text: "Auftrag an der Kennung in der Antwort erkannt." }); }
    if (!g) { setMeldung({ text: "Bitte zuerst den Auftrag wählen.", art: "halt" }); return; }
    const neu: Ergebnis[] = antwortenZurueck(p, antworten.filter((a) => a.text != null).map((a) => ({ name: a.name, text: a.text! })), g.map).map((z) => ({ ...z, art: "text" as const }));
    for (const a of antworten.filter((x) => x.bild)) {
      const k = a.name.match(/D\d{2,}/)?.[0];
      const st = g.auftrag.stuecke.find((s) => s.kennung === k);
      const orig = k ? await speicher.bildHolen(g.auftrag.id, k) : undefined;
      if (!st?.bild || !orig) { neu.push({ art: "bild", name: a.name, url: URL.createObjectURL(a.bild!), blob: a.bild!, hinweis: "Kein Original dazu gefunden (Name muss die Kennung tragen, z. B. D04.png) – unverändert." }); continue; }
      const b = await bildZurueck(orig, a.bild!, st.bild.flaechen);
      neu.push({ art: "bild", name: `${k} (zurückgeführt).png`, url: URL.createObjectURL(b), blob: b, hinweis: `${st.bild.flaechen.length} abgedeckte Stellen aus dem Original wieder eingesetzt.` });
    }
    setErgebnisse([...neu, ...ergebnisse]);
  }

  async function dateienLesen(files: File[]) {
    await verarbeiten(await Promise.all(files.map(async (f) => {
      if (/\.(png|jpe?g|webp)$/i.test(f.name)) return { name: f.name, bild: f as Blob };
      if (/\.(docx|odt)$/i.test(f.name)) return { name: f.name, text: await officeText(new Uint8Array(await f.arrayBuffer()), f.name) };
      return { name: f.name, text: await f.text() };
    })));
  }

  async function ausOrdner() {
    const h = geladen?.auftrag.ordner as DirHandle | undefined; if (!h) return;
    if (!(await erlaubt(h))) { setMeldung({ text: "Kein Zugriff auf den Arbeitsordner.", art: "halt" }); return; }
    const o = await unterordner(h);
    const files = await ordnerLesen(o.antworten);
    if (!files.length) { setMeldung({ text: `In ${ORDNER.antworten} liegt noch nichts.`, art: "halt" }); return; }
    await dateienLesen(files);
  }

  async function inOrdnerSpeichern() {
    const h = geladen?.auftrag.ordner as DirHandle | undefined; if (!h || !(await erlaubt(h))) return;
    const o = await unterordner(h);
    for (const e of ergebnisse) await datei(o.zurueck, e.name, e.art === "text" ? e.text : e.blob);
    setMeldung({ text: `${ergebnisse.length} in ${ORDNER.zurueck} gespeichert.` });
  }

  const aendern = (i: number, text: string) => setErgebnisse(ergebnisse.map((e, k) => (k === i && e.art === "text" ? { ...e, text } : e)));
  const loeschen = (i: number) => { const e = ergebnisse[i]; if (e.art === "bild") URL.revokeObjectURL(e.url); setErgebnisse(ergebnisse.filter((_, k) => k !== i)); };

  return <>
    <div className="page-title"><span className="page-title-icon"><ArchiveRestore size={24}/></span><h1>Zurückführen</h1>
      <Info titel="Zurückführen" punkte={["Antwort der KI einfügen oder als Datei wählen (Text, Markdown, Word; Bilder mit der Kennung im Namen, z. B. D04.png).", "Die Platzhalter werden durch die echten Angaben ersetzt – nur hier auf dem Gerät.", "Hat die KI einen Platzhalter verändert oder erfunden, steht er gelb da.", "Bilder: die abgedeckten Stellen kommen aus dem Original zurück."]}/></div>
    {meldung && <p className={`meldung ${meldung.art === "halt" ? "halt" : ""}`} role="status" data-meldung>{meldung.text}</p>}
    <section className="card">
      <label className="feld">Auftrag<select value={id} onChange={(e) => setId(e.target.value)} data-auftrag-wahl>
        {!liste.length && <option value="">– noch kein Auftrag –</option>}
        {liste.map((a) => <option key={a.id} value={a.id}>{a.name} · {a.stuecke.length} Dateien</option>)}
      </select></label>
      <label className="feld">Antwort der KI einfügen<textarea rows={6} value={eingabe} onChange={(e) => setEingabe(e.target.value)} placeholder="Antwort hier einfügen …" data-antwort/></label>
      <div className="button-row">
        <button type="button" className="button primary" disabled={!eingabe.trim() || !geladen} onClick={() => { void verarbeiten([{ name: "antwort.md", text: eingabe }]); setEingabe(""); }} data-zurueckfuehren><ArchiveRestore size={18}/> Zurückführen</button>
        <button type="button" className="button" disabled={!geladen} onClick={() => wahl.current?.click()}><FileText size={18}/> Antwort-Dateien wählen</button>
        {!!geladen?.auftrag.ordner && <button type="button" className="button" onClick={() => void ausOrdner()} data-aus-ordner><FolderOpen size={18}/> Aus {ORDNER.antworten} holen</button>}
        <input ref={wahl} type="file" multiple hidden accept=".md,.txt,.markdown,.docx,.odt,.png,.jpg,.jpeg,.webp,text/*,image/*" onChange={(e) => { if (e.target.files) void dateienLesen([...e.target.files]); e.target.value = ""; }} data-antwort-dateien/>
      </div>
    </section>
    {ergebnisse.length > 0 && <section className="card" data-karte="ergebnisse">
      <div className="card-heading"><h2>Ergebnis</h2>{!!geladen?.auftrag.ordner && <button type="button" className="button klein" onClick={() => void inOrdnerSpeichern()}><FolderOpen size={16}/> Alle in {ORDNER.zurueck}</button>}</div>
      {ergebnisse.map((e, i) => <article key={`${e.name}-${i}`} className="ergebnis" data-ergebnis={e.art}>
        <div className="titel-zeile"><strong>{e.name}</strong>
          {e.art === "text" ? <>{e.ersetzt > 0 && <span className="badge gut">{e.ersetzt} Angaben eingesetzt</span>}{e.offen.length > 0 && <span className="badge pruefen" data-offen>unbekannt: {e.offen.join(", ")}</span>}</> : <span className="leise">{e.hinweis}</span>}
        </div>
        {e.art === "text" ? <>
          <textarea className="ergebnis-text" rows={Math.min(18, Math.max(5, e.text.split("\n").length + 1))} value={e.text} onChange={(x) => aendern(i, x.target.value)} data-ergebnis-text/>
          <div className="button-row">
            <button type="button" className="button klein primary" onClick={async () => setMeldung((await kopieren(e.text)) ? { text: "Kopiert." } : { text: "Kopieren ging nicht.", art: "halt" })} data-ergebnis-kopieren><Doppelblatt/> Kopieren</button>
            <button type="button" className="button klein" onClick={() => void herunterladen(e.name.replace(/\.md$/, ".docx"), new Blob([docxBauen(e.text) as BlobPart], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }))} data-word><FileDown size={16}/> Word</button>
            <button type="button" className="button klein" onClick={() => void herunterladen(e.name, e.text, "text/markdown;charset=utf-8")}><FileDown size={16}/> Text</button>
            <button type="button" className="button klein" onClick={() => loeschen(i)} data-ergebnis-loeschen><Trash2 size={16}/> Löschen</button>
          </div>
        </> : <>
          <img className="ergebnis-bild" src={e.url} alt={e.name}/>
          <div className="button-row">
            <button type="button" className="button klein primary" onClick={() => void herunterladen(e.name, e.blob)}><Download size={16}/> Speichern</button>
            <button type="button" className="button klein" onClick={() => loeschen(i)}><Trash2 size={16}/> Löschen</button>
          </div>
        </>}
      </article>)}
    </section>}
  </>;
}

// ── Seite 3: Aufträge ────────────────────────────────────────────────────────────────────────────────────────────────
function AuftraegeSeite({ zumRueckweg }: { zumRueckweg: (id: string) => void }) {
  const [liste, setListe] = useState<speicher.Auftrag[] | null>(null);
  const [meldung, setMeldung] = useState<{ text: string; art?: "halt" } | null>(null);
  const datei = useRef<HTMLInputElement>(null);
  const neu = () => void speicher.alle().then(setListe).catch(() => setListe([]));
  useEffect(neu, []);
  const tage = (a: speicher.Auftrag) => Math.max(0, Math.ceil((a.geaendert + speicher.HALTBAR_TAGE * 864e5 - Date.now()) / 864e5));
  async function sichern(a: speicher.Auftrag) {
    const pw = prompt("Passwort für die Sicherung (mindestens 8 Zeichen). Ohne Passwort lässt sie sich nicht öffnen.");
    if (!pw) return; if (pw.length < 8) { setMeldung({ text: "Passwort zu kurz.", art: "halt" }); return; }
    await herunterladen(`${a.name}.zuordnung.json`, await speicher.sicherungDatei(a.id, pw), "application/json");
    setMeldung({ text: "Zuordnung verschlüsselt gesichert. Diese Datei nie an eine KI geben." });
  }
  async function einlesen(f: File) {
    const pw = prompt("Passwort der Sicherung"); if (!pw) return;
    try { const a = await speicher.sicherungEinlesen(await f.text(), pw); setMeldung({ text: `„${a.name}“ wieder da.` }); neu(); } catch (e) { setMeldung({ text: (e as Error).message, art: "halt" }); }
  }
  return <>
    <div className="page-title"><span className="page-title-icon"><KeyRound size={24}/></span><h1>Aufträge</h1>
      <Info titel="Aufträge" punkte={["Jeder Auftrag merkt sich die Zuordnung – verschlüsselt, nur auf diesem Gerät.", `Nach ${speicher.HALTBAR_TAGE} Tagen ohne Änderung wird er gelöscht; „Erledigt“ löscht sofort.`, "„Sichern“ legt die Zuordnung mit Passwort in eine Datei – für ein anderes Gerät. Nie an eine KI geben."]}/></div>
    {meldung && <p className={`meldung ${meldung.art === "halt" ? "halt" : ""}`} role="status" data-meldung>{meldung.text}</p>}
    <section className="card">
      {liste === null ? <p className="leise">Lade …</p> : !liste.length ? <p className="leise" data-keine-auftraege>Noch kein Auftrag. Unter „Pseudonymisieren“ fängt einer an.</p> :
        <ul className="pseudo-liste">{liste.map((a) => <li key={a.id} className="pseudo-zeile" data-auftrag={a.id}>
          <span className="pseudo-name"><strong>{a.name}</strong><span className="leise">{a.stuecke.length} Dateien · {new Date(a.geaendert).toLocaleDateString("de-DE")} · noch {tage(a)} Tage</span></span>
          <span className="pseudo-knoepfe">
            <button type="button" className="button klein" onClick={() => zumRueckweg(a.id)}><ArchiveRestore size={16}/> Zurückführen</button>
            <button type="button" className="button klein" onClick={() => void sichern(a)}><KeyRound size={16}/> Sichern</button>
            <button type="button" className="button klein" onClick={async () => { if (confirm(`„${a.name}“ erledigt? Die Zuordnung wird gelöscht – Zurückführen geht danach nicht mehr.`)) { await speicher.loeschen(a.id); neu(); } }} data-erledigt><Trash2 size={16}/> Erledigt</button>
          </span>
        </li>)}</ul>}
      <div className="button-row" style={{ marginTop: 12 }}>
        <button type="button" className="button" onClick={() => datei.current?.click()}><Upload size={18}/> Sicherung einlesen</button>
        <input ref={datei} type="file" accept=".json,application/json" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) void einlesen(f); e.target.value = ""; }}/>
      </div>
    </section>
    <section className="card">
      <h2>Verbindung zu anderen Apps</h2>
      <p className="leise">Vorbereitet, nicht eingeschaltet: Familienakte, Private Brain Pro und BookLedgerPro können später einen Auftrag hierher geben (Austauschordner oder Pro-Tresor) – erst nach deiner Freigabe.</p>
    </section>
  </>;
}

