import { innenKurz } from "../lib/innen.ts";
import { ausZiehen } from "./quellen.ts";
import { useEffect, useMemo, useRef, useState } from "react";
import { Archive, Camera, Check, Download, File, FileImage, FileText, FolderOpen, FolderTree, HelpCircle, History, ListChecks, Mail, Pencil, Plus, Eye, RotateCcw, Search, Settings, Share2, Trash2, Upload, ShieldAlert, Smartphone, Monitor, Undo2, X } from "lucide-react";
import type { Datei, FeldName } from "../lib/typen.ts";
import { STUFEN, offeneFelder, gesperrt, istUnsicher } from "../lib/siebe.ts";
import { SICHTEN, baum, dateienUnter, suche, type BaumKnoten } from "../lib/sichten.ts";
import { KATEGORIEN, FOTOS, UNKLAR } from "../lib/kategorien.ts";
import { SCHRIFTSTUECKE, dringlichkeit } from "../lib/erkennen.ts";
import { offeneFuerNummer } from "../lib/archivnummer.ts";
import { stichprobe, anteilText } from "../lib/stichprobe.ts";
import { deutsch, kurzfassung, INDEX_DATEI } from "../lib/index-format.ts";
import { Ablaufbild, FesterBaum, Info, OrdnerBaum, Seitentitel, type Schritt } from "./ui.tsx";
import { ausAuswahl, nativGemerkt, nativPlattform, nativVergessen, nativSpeichernMoeglich, nativWaehlen, nativWieder, nativerOrdner, ordnerWaehlen, ordnerWahlMoeglich, testOrdner, type GemerkterOrdner } from "./quellen.ts";
import { heute, Ladebalken, type AppZustand, type FindenZiel, type SeitenId } from "./app.tsx";
import { druckZielSetzen, druckZielWeg } from "./drucken.ts";
import { fotoAufbereiten, scanDatei, scanFreigeben, scanSpeichern, type ScanSeite } from "./scan.ts";
import { ARBEIT, arbeitAnzeige, arbeitFrei, arbeitMoeglich, leistungText, mbText, TEXT_IM_SPEICHER } from "./arbeit.ts";

export type P = { z: AppZustand; gehe: (s: SeitenId) => void; oeffne?: (sicht: string, knoten?: string) => void; ziel?: FindenZiel };

export const FELD_NAMEN: Record<FeldName, string> = { schriftstueck: "Art", kategorie: "Bereich", absender: "Absender", betrifft: "Betrifft", datum: "Datum", frist: "Frist" };
export const AUSWAHL: Partial<Record<FeldName, string[]>> = { kategorie: [...KATEGORIEN, FOTOS, UNKLAR], schriftstueck: [...SCHRIFTSTUECKE] };

// Eigene Kategorien (Klaus 16.11.): überall, wo ein Bereich gewählt wird, steht am Ende „Neue Kategorie erstellen“. Der Name wird
// auf diesem Gerät gemerkt und steht danach in jeder Liste; im Index reist er als Bereich der Datei mit, die Familienakte schlägt
// ihn dort als neuen Lebensbereich vor (lib/organizer-uebernahme.ts dort).
const EIGENE_SCHLUESSEL = "do-eigene-kategorien", NEU = "\u0001neu";
export const kategorieName = (v: string) => v.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, 60);
export function eigeneKategorien(): string[] {
  try { const l = JSON.parse(localStorage.getItem(EIGENE_SCHLUESSEL) || "[]"); return Array.isArray(l) ? l.filter((x): x is string => typeof x === "string" && !!x).slice(0, 50) : []; } catch { return []; }
}
function kategorieMerken(name: string) {
  const n = kategorieName(name); if (!n || (AUSWAHL.kategorie || []).includes(n)) return;
  const l = eigeneKategorien(); if (l.some((x) => x.toLocaleLowerCase("de") === n.toLocaleLowerCase("de"))) return;
  try { localStorage.setItem(EIGENE_SCHLUESSEL, JSON.stringify([...l, n].slice(-50))); } catch { /* ohne Speicher: gilt nur für diese Datei */ }
}
/** Übernehmen mit Merken: ein neuer Bereich steht danach in jeder Liste. */
function uebernimm(z: AppZustand, pfad: string, feld: FeldName, wert: string) {
  const w = feld === "kategorie" ? kategorieName(wert) : wert.trim();
  if (!w) return;
  if (feld === "kategorie") kategorieMerken(w);
  z.aendern(pfad, feld, w);
}
/** Auswahl eines Werts: Liste (Bereich, Art) oder freies Feld; beim Bereich als letzter Eintrag „Neue Kategorie erstellen“. */
function WertWahl({ feld, wert, setWert }: { feld: FeldName; wert: string; setWert: (w: string) => void }) {
  const fest = AUSWAHL[feld];
  const [neu, setNeu] = useState(false);
  useEffect(() => setNeu(false), [feld]);
  if (!fest) return <input value={wert} onChange={(e) => setWert(e.target.value)} aria-label={FELD_NAMEN[feld]} type={feld === "datum" || feld === "frist" ? "date" : "text"} data-wert className="wert-feld"/>;
  const liste = feld === "kategorie" ? [...fest, ...eigeneKategorien().filter((k) => !fest.includes(k))] : fest;
  if (neu) return <span className="neue-kategorie">
    <input autoFocus value={wert} maxLength={60} onChange={(e) => setWert(e.target.value)} aria-label="Name der neuen Kategorie" placeholder="Name der neuen Kategorie" data-neue-kategorie className="wert-feld"/>
    <button type="button" className="text-link" onClick={() => { setNeu(false); setWert(""); }}>Liste</button>
  </span>;
  const wahl = <select value={wert} onChange={(e) => { if (e.target.value === NEU) { setNeu(true); setWert(""); } else setWert(e.target.value); }} aria-label={FELD_NAMEN[feld]} data-wert>
    {!liste.includes(wert) && <option value={wert}>{wert || "–"}</option>}{liste.map((k) => <option key={k}>{k}</option>)}
    {feld === "kategorie" && <option value={NEU} data-neu-option>+ Neue Kategorie erstellen …</option>}
  </select>;
  // Klaus 16.11.: „Unklar“ in der Liste ist keine neue Kategorie – darum zusätzlich ein eigener, sichtbarer Knopf.
  return feld !== "kategorie" ? wahl : <>{wahl}<button type="button" className="button klein" onClick={() => { setNeu(true); setWert(""); }} title="Eigene Kategorie anlegen" data-neue-kategorie-knopf><Plus size={15}/>Neue Kategorie</button></>;
}
export const offenBei = (d: Datei) => offeneFelder(d).length > 0;

function Meldung({ z }: P) {
  if (!z.meldung) return null;
  return <p className={`meldung ${z.meldung.art || ""}`} role="status" data-meldung>{z.meldung.text}</p>;
}

function DateiSymbol({ d }: { d: Datei }) {
  if (d.auffaellig) return <ShieldAlert size={18} className="ico" color="#b42318"/>;
  if (d.art === "bild") return <FileImage size={18} className="ico"/>;
  if (d.art === "email") return <Mail size={18} className="ico"/>;
  if (d.art === "pdf" || d.art === "text" || d.art === "office") return <FileText size={18} className="ico"/>;
  return <File size={18} className="ico"/>;
}

const AEHNLICH_WORT: Record<NonNullable<Datei["aehnlich"]>["art"], string> = { fassung: "ältere Fassung", inhalt: "gleicher Text", beleg: "gleicher Beleg", foto: "gleiches Foto", name: "gleicher Name" };

function Zustand({ d }: { d: Datei }) {
  if (d.auffaellig) return <span className="badge warn">gesperrt</span>;
  if (d.doppeltVon) return <span className="badge">doppelt</span>;
  if (d.aehnlich) return <span className="badge pruefen" title={d.aehnlich.grund} data-aehnlich={d.aehnlich.art}>{AEHNLICH_WORT[d.aehnlich.art]}</span>;
  if (d.archivnummer) return <span className="badge gut">{d.archivnummer}</span>;
  if (offenBei(d)) return <span className="badge pruefen">bitte prüfen</span>;
  if (d.stufe >= 5) return <span className="badge gut">fertig</span>;
  return <span className="badge">Sieb {d.stufe}</span>;
}

// ---------------- Ordner ----------------
const SD_BAUM = { titel: "SD-Karte", kinder: [
  { titel: "Family_Projekt_de", unter: "Pro-Tresor (verschlüsselt) – hier nicht hinein" },
  { titel: "Datei-Organizer", unter: "diesen Ordner wählen", kinder: [
    { titel: "Eingang", unter: "Scanner, Handy, Mail-Anhänge – alles durcheinander" },
    { titel: INDEX_DATEI, unter: "schreibt der Organizer, sonst nichts" },
  ] },
] };

/** Arbeitsordner (Klaus 14.11.: „nur aufs Laufwerk gehen – automatisch immer in den richtigen Ordner“). Nur in Datei-Organizer Pro. */
function ArbeitKarte({ z, laeuft, los }: { z: AppZustand; laeuft: boolean; los: (f: () => Promise<unknown>) => Promise<void> }) {
  const [frei, setFrei] = useState<number | null>(null);
  useEffect(() => { let weg = false; if (z.arbeit && !z.arbeitFehlt) void arbeitFrei(z.arbeit).then((f) => { if (!weg) setFrei(f); }); else setFrei(null); return () => { weg = true; }; }, [z.arbeit, z.arbeitFehlt, z.dateien.length]);
  const amPc = nativPlattform() === "windows";
  return <section className="einstellungen" data-arbeitsordner>
    <div className="card-heading"><h3>Einstellungen · Arbeitsordner</h3>
      <Info titel="Wofür der Arbeitsordner?" punkte={[
        `Für große Ordner: Liste, Texte und Sortierung liegen dann auf ${amPc ? "der Festplatte" : "der SD-Karte"} statt im App-Speicher.`,
        `Du wählst nur das Laufwerk – der Ordner „${ARBEIT}“ entsteht darin von selbst. So landet nichts aus Versehen im falschen Ordner.`,
        "Nie im Pro-Tresor: der ist verschlüsselt, dort schreibt der Organizer nichts hinein.",
        "Deinstallieren oder neu installieren verliert nichts: Laufwerk wieder wählen, der Stand ist da.",
        `Schlank: im Speicher nur die ersten ${TEXT_IM_SPEICHER.toLocaleString("de-DE")} Zeichen langer Texte, der ganze Text liegt im Arbeitsordner.`,
      ]}/></div>
    {z.arbeit
      ? <p data-arbeit-pfad>{z.arbeitFehlt ? <span className="badge warn">{z.arbeitFehlt}</span> : <>Arbeitsordner: <b>{arbeitAnzeige(z.arbeit)}</b>{frei !== null && <span className="leise"> · frei {mbText(frei)}</span>}</>}</p>
      : <p className="leise">Noch keiner – die App speichert im App-Speicher. Für große Ordner empfohlen.</p>}
    <div className="button-row">
      <button type="button" className={`button ${z.arbeit ? "" : "primary"}`} disabled={laeuft} data-arbeit-waehlen onClick={() => los(() => z.arbeitEinrichten())}>{amPc ? <Monitor size={18}/> : <Smartphone size={18}/>}{z.arbeit ? "Anderes Laufwerk" : "Laufwerk wählen"}</button>
      {z.arbeit && <button type="button" className="button" disabled={laeuft} data-arbeit-aus onClick={() => z.arbeitAus()}>Nicht mehr nutzen</button>}
    </div>
    <p className="leise" data-leistung>{leistungText(z.leistung)}.</p>
  </section>;
}

export function OrdnerSeite({ z, gehe }: P) {
  const dateiWahl = useRef<HTMLInputElement>(null), ordnerWahl = useRef<HTMLInputElement>(null);
  const [laeuft, setLaeuft] = useState(false);
  const los = async (f: () => Promise<unknown>) => { setLaeuft(true); try { await f(); } catch (e) { z.setMeldung({ text: (e as Error).message, art: "fehler" }); } finally { setLaeuft(false); } };
  // In der App (Android/Windows) der eigene Ordnerweg; der Browser-Ordnerweg nur ohne App (WebView2 hätte ihn auch – doppelt wäre verwirrend).
  const nativ = nativerOrdner(), pc = !nativ && ordnerWahlMoeglich(), amPc = nativPlattform() === "windows";
  // Gemerkte Ordner der App (dauerhafte Freigabe): ein Tipp liest wieder ein, ohne Auswahl-Fenster.
  const [gemerkt, setGemerkt] = useState<GemerkterOrdner[]>([]);
  useEffect(() => { if (nativ) void nativGemerkt().then(setGemerkt); }, [nativ, z.ordnerName]);
  const [ziehtDrueber, setZiehtDrueber] = useState(false);
  // Einstellungen der Seite (Zahnrad): der Arbeitsordner (Klaus 16.11.). Fehlt er, klappt die Karte von selbst auf.
  const [einst, setEinst] = useState(false);
  // Foto / Scan (Klaus 17.11.: zuerst nur in der Web-App „Basic“, nicht in der Android- und Windows-App): die Kamera des Geräts
  // macht das Bild, die Seiten sammeln sich im Scan-Kasten, „Fertig“ übernimmt sie als ein Dokument.
  const kamera = useRef<HTMLInputElement>(null);
  const nurWeb = !nativPlattform() || nativPlattform() === "web";
  const [scan, setScan] = useState<ScanSeite[]>([]);
  const [scanKopie, setScanKopie] = useState(() => { try { return localStorage.getItem("do-scan-kopie") !== "nein"; } catch { return true; } });
  const scanWeg = () => { scanFreigeben(scan); setScan([]); };
  const scanFertig = () => los(async () => {
    const f = scanDatei(scan);
    scanWeg();
    // Schreibbarer Ordner: der Scan liegt danach in dessen Unterordner „Scans“. Sonst (oder wenn das Schreiben scheitert) die Kopie.
    if (z.scanZiel && await z.scanAblegen(f)) return;
    if (scanKopie || z.scanZiel) scanSpeichern(f);
    await z.einlesenAus(ausAuswahl([f], "Scans"), z.dateien.length > 0);
  });
  const zahlen = useMemo(() => ({
    gesamt: z.dateien.length, auff: z.dateien.filter((d) => d.auffaellig).length, dopp: z.dateien.filter((d) => d.doppeltVon).length, aehnl: z.dateien.filter((d) => d.aehnlich).length,
    offen: z.dateien.filter(offenBei).length, fertig: z.dateien.filter((d) => d.stufe >= 5 && !offenBei(d) && !gesperrt(d)).length,
  }), [z.dateien]);
  return <>
    <Seitentitel symbol={<FolderOpen size={24}/>} titel="Ordner" info={<Info titel="Ein Ordner für alles" punkte={[
      "Alles kommt in einen Ordner: Scans, Fotos, Mail-Anhänge, alte Dateien.",
      "Die Originale bleiben, wo sie sind. Der Organizer liest nur.",
      `Er schreibt nur eine Datei dazu: ${INDEX_DATEI} (die Sortierung).`,
      "Die Familienakte holt sich Kopien und ordnet sie nach dieser Datei zu.",
    ]} mehr={<FesterBaum wurzel={SD_BAUM} label="Wo der Ordner auf der SD-Karte liegt"/>}/>}/>
    <section className="card" data-ordner-wahl>
      <div className="card-heading mit-knoepfen"><h2 data-ordner-pfad>{z.ordnerName ? `Ordner: ${z.ordnerName}` : "Ordner oder Dateien einfügen"}</h2>
        {arbeitMoeglich() && <button type="button" className={`info-knopf ${einst ? "aktiv" : ""}`} data-einstellungen aria-expanded={einst} aria-label="Einstellungen: Arbeitsordner" title="Einstellungen: Arbeitsordner" onClick={() => setEinst(!einst)}><Settings size={18}/></button>}
        <Info titel="So kommen Dateien hinein" punkte={[
          "Antippen: einen Ordner auf dem Gerät wählen – auch SD-Karte. Am PC mit Chrome oder Edge: „Ordner am PC“.",
          "Oder Dateien und ganze Ordner auf die Fläche ziehen. Sie kommen zu dem dazu, was schon da ist; gleicher Inhalt wird als doppelt angezeigt.",
          "Darunter: einzelne Dateien wählen, einen Ordner hochladen oder den Testordner mit 101 erfundenen Dateien.",
          "Datei-Organizer Pro merkt sich den Ordner: beim nächsten Mal reicht ein Tipp unter „Zuletzt“.",
          "Die Originale bleiben, wo sie sind. Der Organizer liest nur.",
        ]}/></div>
      {z.arbeit && !z.arbeitFehlt && <p className="leise" data-arbeit-zeile>Arbeitsordner: {arbeitAnzeige(z.arbeit)}</p>}
      <button type="button" className={`ablage-feld ablage ${ziehtDrueber ? "drueber" : ""}`} data-ablage disabled={laeuft} {...(nativ ? { "data-nativ-ordner": "" } : pc ? { "data-pc-ordner": "" } : {})}
        onClick={() => { if (nativ) void los(async () => { const q = await nativWaehlen(); if (q) await z.einlesenAus(q); }); else if (pc) void los(async () => { const q = await ordnerWaehlen(); if (q) await z.einlesenAus(q); }); else dateiWahl.current?.click(); }}
        onDragOver={(e) => { e.preventDefault(); setZiehtDrueber(true); }} onDragLeave={() => setZiehtDrueber(false)}
        onDrop={(e) => { e.preventDefault(); setZiehtDrueber(false); const dt = e.dataTransfer; void los(async () => { const q = await ausZiehen(dt); if (q) await z.einlesenAus(q, z.dateien.length > 0); else z.setMeldung({ text: "Darin war keine Datei.", art: "halt" }); }); }}>
        <Upload size={24}/>
        <span><strong>{ziehtDrueber ? "Loslassen zum Einfügen" : nativ ? (amPc ? "Ordner am PC wählen oder hierher ziehen" : "Ordner auf dem Gerät wählen oder hierher ziehen") : pc ? "Ordner am PC wählen oder hierher ziehen" : "Dateien wählen oder hierher ziehen"}</strong>
          <small>{z.ordnerName ? `Jetzt: ${z.ordnerName} · ${z.dateien.length} Dateien` : "Dateien und ganze Ordner – die Originale bleiben, wo sie sind"}</small></span>
      </button>
      <div className="ablage-wege" data-ablage-wege>
        {nurWeb && <button type="button" className="text-link" disabled={laeuft} data-scan-knopf onClick={() => kamera.current?.click()}><Camera size={15}/>Foto / Scan</button>}
        <button type="button" className="text-link" disabled={laeuft} data-dateien-waehlen onClick={() => dateiWahl.current?.click()}><File size={15}/>Einzelne Dateien</button>
        <button type="button" className="text-link" disabled={laeuft} data-ordner-hochladen onClick={() => ordnerWahl.current?.click()}><FolderTree size={15}/>Ordner hochladen</button>
        <button type="button" className="text-link" disabled={laeuft} onClick={() => los(() => z.einlesenAus(testOrdner()))} data-testordner><Archive size={15}/>Testordner</button>
      </div>
      {gemerkt.some((g) => g.da && g.id !== z.arbeit?.id) && <div className="chips" data-gemerkt style={{ marginTop: 10 }}>
        <span className="leise">Zuletzt:</span>
        {gemerkt.filter((g) => g.da && g.id !== z.arbeit?.id).slice(0, 3).map((g) => <span key={g.id} className="chip">
          <button type="button" className="text-link" disabled={laeuft} data-ordner-wieder onClick={() => los(async () => { await z.einlesenAus(await nativWieder(g.id)); })}><FolderOpen size={15}/>{g.name}</button>
          <button type="button" className="text-link" aria-label={`„${g.name}“ vergessen`} title="Vergessen (der Ordner selbst bleibt)" onClick={() => void nativVergessen(g.id).then(nativGemerkt).then(setGemerkt)}><X size={14}/></button>
        </span>)}
      </div>}
      <input ref={dateiWahl} type="file" multiple hidden onChange={(e) => { const l = e.target.files; if (l?.length) void los(() => z.einlesenAus(ausAuswahl(l, "Ausgewählte Dateien"))); else z.setMeldung({ text: `Der Browser hat keine Dateien übergeben${z.ordnerName ? ` – angezeigt wird weiter „${z.ordnerName}“` : ""}. Bitte „Ordner am PC“ oder „Dateien wählen“ nehmen.`, art: "halt" }); e.target.value = ""; }}/>
      <input ref={ordnerWahl} type="file" multiple hidden {...{ webkitdirectory: "" }} onChange={(e) => { const l = e.target.files; if (l?.length) { const n = (l[0] as File & { webkitRelativePath?: string }).webkitRelativePath?.split("/")[0] || "Ordner"; void los(() => z.einlesenAus(ausAuswahl(l, n))); } else z.setMeldung({ text: `Der Browser hat keine Dateien übergeben${z.ordnerName ? ` – angezeigt wird weiter „${z.ordnerName}“` : ""}. Bitte „Ordner am PC“ oder „Dateien wählen“ nehmen.`, art: "halt" }); e.target.value = ""; }}/>
      {nurWeb && <input ref={kamera} type="file" accept="image/*" capture="environment" hidden data-kamera-eingabe onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) void los(async () => { const s = await fotoAufbereiten(f); setScan((a) => [...a, s]); }); }}/>}
      {scan.length > 0 && <div className="weiter-kasten scan-kasten" data-scan role="status">
        <p><b>Scan: {scan.length === 1 ? "1 Seite" : `${scan.length} Seiten`}</b></p>
        <div className="scan-seiten">
          {scan.map((s, i) => <figure key={s.url} data-scan-seite>
            <img src={s.url} alt={`Seite ${i + 1}`}/>
            <figcaption>{i + 1}<button type="button" className="text-link" aria-label={`Seite ${i + 1} entfernen`} title="Seite entfernen" onClick={() => { URL.revokeObjectURL(s.url); setScan((a) => a.filter((x) => x !== s)); }}><X size={14}/></button></figcaption>
          </figure>)}
        </div>
        {z.scanZiel ? <p className="leise" data-scan-ziel><FolderOpen size={15}/> {z.scanZiel}</p> : <label className="scan-kopie"><input type="checkbox" checked={scanKopie} data-scan-kopie onChange={(e) => { setScanKopie(e.target.checked); try { localStorage.setItem("do-scan-kopie", e.target.checked ? "ja" : "nein"); } catch { /* egal */ } }}/> Kopie speichern</label>}
        <div className="button-row">
          <button type="button" className="button primary" disabled={laeuft} data-scan-fertig onClick={() => void scanFertig()}><Check size={18}/>Fertig – übernehmen</button>
          <button type="button" className="button" disabled={laeuft} data-scan-weitere onClick={() => kamera.current?.click()}><Camera size={18}/>Weitere Seite</button>
          <button type="button" className="button" disabled={laeuft} data-scan-verwerfen onClick={scanWeg}>Verwerfen</button>
        </div>
      </div>}
      <Ladebalken f={z.fortschritt} anhalten={z.anhalten}/>
      {z.angefangen && !z.fortschritt && <div className="weiter-kasten" data-angefangen role="status">
        <p><b>Einlesen angefangen:</b> {z.angefangen.erledigt.length} von {z.angefangen.gesamt} Dateien aus „{z.angefangen.quelleName}“ gelesen ({new Date(z.angefangen.zeit).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" })}).</p>
        <div className="button-row">
          <button type="button" className="button primary" disabled={laeuft} data-weitermachen onClick={() => los(() => z.weitermachen())}>Weitermachen</button>
          <button type="button" className="button" disabled={laeuft} data-lauf-verwerfen onClick={() => los(() => z.laufVerwerfen())}>Verwerfen</button>
        </div>
      </div>}
      <Meldung z={z} gehe={gehe}/>
      {arbeitMoeglich() && (einst || !!z.arbeitFehlt) && <ArbeitKarte z={z} laeuft={laeuft} los={los}/>}
    </section>
    {zahlen.gesamt > 0 && <section className="card" data-ueberblick>
      <div className="card-heading"><h2>Überblick</h2><button type="button" className="text-link" onClick={() => { if (confirm("Sortierung in diesem Browser vergessen? Die Originale im Ordner bleiben.")) void z.neuBeginnen(); }}><RotateCcw size={15}/>Neu beginnen</button><button type="button" className="text-link" onClick={() => { if (confirm(LEEREN_FRAGE)) void z.leeren(); }} data-leeren-ordner><Trash2 size={15}/>Leeren</button></div>
      <Ablaufbild label="Stand der Siebe" schritte={STUFEN.map((s): Schritt => ({ titel: s.name, unter: s.kurz, art: s.nr < z.stufe ? "gut" : s.nr === z.stufe ? "hervor" : "aus" }))}/>
      <div className="chips" style={{ marginTop: 12 }}>
        <span className="chip" data-zahl="gesamt">{zahlen.gesamt} Dateien</span>
        <span className="chip" data-zahl="fertig">{zahlen.fertig} fertig</span>
        {zahlen.offen > 0 && <span className="chip" data-zahl="offen">{zahlen.offen} bitte prüfen</span>}
        {zahlen.auff > 0 && <span className="chip" data-zahl="auffaellig">{zahlen.auff} gesperrt</span>}
        {zahlen.dopp > 0 && <span className="chip" data-zahl="doppelt">{zahlen.dopp} doppelt</span>}
        {zahlen.aehnl > 0 && <span className="chip" data-zahl="aehnlich" title="ältere Fassungen, gleicher Text, gleicher Beleg, gleiches Foto oder gleicher Name – markiert, nicht entfernt">{zahlen.aehnl} ähnlich</span>}
      </div>
      <div className="button-row" style={{ marginTop: 12 }}>
        <button type="button" className="button primary" onClick={() => gehe("sortieren")}><ListChecks size={18}/>Weiter sortieren</button>
        <button type="button" className="button" onClick={() => gehe("finden")}><FolderTree size={18}/>Ansehen</button>
      </div>
    </section>}
  </>;
}

// ---------------- Sortieren ----------------
function SicherZeile({ z, d }: { z: AppZustand; d: Datei }) {
  const [auge, setAuge] = useState(false);
  const [stift, setStift] = useState(false);
  return <div className="pruef-zeile sicher" data-sicher={d.pfad}>
    <div><strong><Check size={15} style={{ verticalAlign: "-2px", marginRight: 6 }}/>{d.name}</strong><span className="grund">{kurzfassung(d)}</span></div>
    <DateiAktionen z={z} d={d} auge={auge} setAuge={setAuge} stift={stift} setStift={setStift}/>
    {stift && <div style={{ gridColumn: "1 / -1" }}><FeldAendern z={z} d={d} fertig={() => setStift(false)}/></div>}
    {auge && <div style={{ gridColumn: "1 / -1" }}><Steckbrief z={z} d={d}/></div>}
  </div>;
}

/** Auge (ansehen), Stift (von Hand ändern), Papierkorb (aus dem Organizer nehmen) – an jeder Datei gleich (Klaus 13.11.). */
export function DateiAktionen({ z, d, auge, setAuge, stift, setStift }: { z: AppZustand; d: Datei; auge: boolean; setAuge: (b: boolean) => void; stift: boolean; setStift: (b: boolean) => void }) {
  return <div className="pruef-aktionen">
    <button type="button" className="button klein" aria-pressed={auge} aria-label={`${d.name} ansehen`} title="Ansehen" onClick={() => setAuge(!auge)} data-auge><Eye size={15}/></button>
    <button type="button" className="button klein" aria-pressed={stift} aria-label={`${d.name} ändern`} title="Von Hand ändern: Art, Bereich, Absender, Betrifft, Datum, Frist" onClick={() => setStift(!stift)} data-stift><Pencil size={15}/></button>
    <button type="button" className="button klein" aria-label={`${d.name} entfernen`} title="Aus dem Organizer nehmen (Original bleibt)" onClick={() => { if (confirm(`„${d.name}“ aus dem Organizer nehmen? Das Original bleibt unverändert.`)) z.entfernen([d.pfad]); }} data-papierkorb><Trash2 size={15}/></button>
  </div>;
}

const ALLE_FELDER: FeldName[] = ["kategorie", "schriftstueck", "absender", "betrifft", "datum", "frist"];
/** Jedes Feld von Hand ändern – auch was die App schon sicher eingeordnet hat. Geht durch z.aendern: Verlauf, Rückgängig, Lernen. */
export function FeldAendern({ z, d, fertig }: { z: AppZustand; d: Datei; fertig: () => void }) {
  const FELDER = ALLE_FELDER;
  const [feld, setFeld] = useState<FeldName>("kategorie");
  const [wert, setWert] = useState(d.felder.kategorie?.wert || "");
  const waehle = (f: FeldName) => { setFeld(f); setWert(d.felder[f]?.wert || ""); };
  return <div className="feld-aendern" data-feld-aendern={d.pfad}>
    <select value={feld} onChange={(e) => waehle(e.target.value as FeldName)} aria-label="Welches Feld" data-feld-wahl>{FELDER.map((f) => <option key={f} value={f}>{FELD_NAMEN[f]}{d.felder[f]?.wert ? `: ${d.felder[f]!.wert}` : ""}</option>)}</select>
    <WertWahl feld={feld} wert={wert} setWert={setWert}/>
    <button type="button" className="button klein primary" disabled={!wert.trim() || wert.trim() === (d.felder[feld]?.wert || "")} onClick={() => { uebernimm(z, d.pfad, feld, wert); fertig(); }} data-uebernehmen>Übernehmen</button>
    <button type="button" className="button klein" onClick={fertig}>Abbrechen</button>
  </div>;
}

function PruefZeile({ z, d, neu }: { z: AppZustand; d: Datei; neu?: number }) {
  const felder = offeneFelder(d) as FeldName[];
  const [feld, setFeld] = useState<FeldName>(felder[0]);
  const [aendern, setAendern] = useState(false);
  const [wert, setWert] = useState("");
  // Klaus 16.11.: in jedem Sieb jedes Feld von Hand ändern – nicht nur das gerade offene (vorher ging der Bereich erst im letzten Sieb).
  const [was, setWas] = useState<FeldName>(felder[0]);
  useEffect(() => { if (!felder.includes(feld)) setFeld(felder[0]); }, [felder.join(), feld]);
  const [auge, setAuge] = useState(false);
  if (!feld) return null;
  const w = d.felder[feld];
  return <div className="pruef-zeile" data-pruef={d.pfad}>
    <div><strong>{d.name}{neu ? <span className="badge pruefen" style={{ marginLeft: 8 }} data-neu-marke>neu in Sieb {neu}</span> : null}</strong>
      <span className="grund">{FELD_NAMEN[feld]}: <b>{w?.wert || "–"}</b> · {w?.grund || "nicht erkannt"}</span>
      {felder.length > 1 && <span className="grund">Noch offen: {felder.map((f) => FELD_NAMEN[f as FeldName]).join(", ")}</span>}
    </div>
    <div className="pruef-aktionen">
      <button type="button" className="button klein" aria-pressed={auge} aria-label={`${d.name} ansehen`} title="Ansehen, teilen oder entfernen" onClick={() => setAuge(!auge)} data-auge><Eye size={15}/></button>
      {!aendern ? <>
        {w?.wert && <button type="button" className="button klein" onClick={() => z.aendern(d.pfad, feld, w.wert)} data-stimmt><Check size={15}/>Stimmt</button>}
        <button type="button" className="button klein" onClick={() => { setWas(feld); setWert(w?.wert || ""); setAendern(true); }} aria-label="Ändern" title="Von Hand ändern: Art, Bereich, Absender, Betrifft, Datum, Frist" data-korrigieren><Pencil size={15}/></button>
      </> : <>
        <select value={was} onChange={(e) => { const f = e.target.value as FeldName; setWas(f); setWert(d.felder[f]?.wert || ""); }} aria-label="Welches Feld" data-feld-wahl>{ALLE_FELDER.map((f) => <option key={f} value={f}>{FELD_NAMEN[f]}</option>)}</select>
        <WertWahl feld={was} wert={wert} setWert={setWert}/>
        <button type="button" className="button klein primary" disabled={!wert.trim()} onClick={() => { uebernimm(z, d.pfad, was, wert); setAendern(false); }} data-uebernehmen>Übernehmen</button>
        <button type="button" className="button klein" onClick={() => setAendern(false)}>Abbrechen</button>
      </>}
    </div>
    {auge && <div style={{ gridColumn: "1 / -1" }}><Steckbrief z={z} d={d}/></div>}
  </div>;
}


// Doppelte (gleicher Inhalt, Byte für Byte): je Paar die Dateien nebeneinander, Haken = behalten (Muster wie in der Familienakte
// beim Einlesen einer Sicherung, Klaus 15.11.2026). Die Wahl merkt sich der Organizer.
function DoppelteKarte({ z }: { z: AppZustand }) {
  const gruppen = useMemo(() => {
    const m = new Map<string, Datei[]>();
    for (const d of z.dateien) if (d.sha256 && !d.auffaellig) { const l = m.get(d.sha256) || []; l.push(d); m.set(d.sha256, l); }
    return [...m.entries()].filter(([, l]) => l.length > 1 && l.some((d) => d.doppeltVon));
  }, [z.dateien]);
  const [alle, setAlle] = useState(false);
  const [menue, setMenue] = useState(false);
  if (!gruppen.length) return null;
  const kopien = (l: Datei[]) => l.filter((d) => d.doppeltVon).map((d) => d.pfad);
  const datum = (t: number) => t ? new Date(t).toLocaleDateString("de-DE") : "–";
  const alleNach = (juenger: boolean) => z.behalten(gruppen.map(([sha, l]) => ({ sha, pfad: [...l].sort((a, b) => juenger ? b.geaendert - a.geaendert : a.geaendert - b.geaendert)[0].pfad })), `Bei allen ${gruppen.length} Paaren die ${juenger ? "jüngere" : "ältere"} Datei behalten.`);
  const sichtbar = alle ? gruppen : gruppen.slice(0, 10);
  return <section className="card" data-doppelte>
    <div className="card-heading"><h2>Doppelte: welche behalten? <span className="badge">{gruppen.length}</span></h2>
      <Info titel="Doppelt" punkte={["Gleicher Inhalt, Byte für Byte.", "Vorgewählt ist die Datei ohne „Kopie“ im Namen, sonst die ältere – du entscheidest per Haken.", "Die andere wird nur nicht weitergegeben. Die Originale auf dem Gerät bleiben unberührt.", "Geänderte Fassungen sind nie „doppelt“, sondern „ähnlich“: beide bleiben."]}/></div>
    <div className="doppelt-menue-ort"><button type="button" className="button klein" aria-expanded={menue} aria-label="Alle Paare auf einmal" title="Alle Paare auf einmal: ältere oder jüngere behalten, Kopien herausnehmen" onClick={() => setMenue(!menue)} data-doppelt-menue><Trash2 size={15}/></button>
      {menue && <div className="doppelt-menue" role="menu">
        <button type="button" role="menuitem" onClick={() => { setMenue(false); alleNach(false); }} data-doppelt-alle-aelter>Alle: ältere behalten</button>
        <button type="button" role="menuitem" onClick={() => { setMenue(false); alleNach(true); }} data-doppelt-alle-juenger>Alle: jüngere behalten</button>
        <button type="button" role="menuitem" onClick={() => { setMenue(false); const k = kopien(gruppen.flatMap(([, l]) => l)); if (confirm(`${k.length} Kopien aus dem Organizer nehmen? Die Originale auf dem Gerät bleiben unverändert.`)) z.entfernen(k, `${k.length} Kopien`); }} data-doppelt-alle-raus>Alle Kopien aus dem Organizer nehmen</button>
      </div>}</div>
    {sichtbar.map(([sha, l]) => <div key={sha} className="doppelt-paar" data-doppelt-paar={sha}>
      <div className="doppelt-name"><span>{(l.find((d) => !d.doppeltVon) || l[0]).name}</span><button type="button" className="button klein" aria-label="Kopie dieses Paars aus dem Organizer nehmen" title="Kopie aus dem Organizer nehmen (Original bleibt)" onClick={() => z.entfernen(kopien(l), "Kopie")} data-doppelt-paar-raus><Trash2 size={14}/></button></div>
      <div className="doppelt-seiten">{l.map((d) => <label key={d.pfad} className={`doppelt-seite${d.doppeltVon ? "" : " behalten"}`}>
        <input type="radio" name={`dp-${sha}`} checked={!d.doppeltVon} onChange={() => z.behalten([{ sha, pfad: d.pfad }])} data-doppelt-behalten={d.pfad}/>
        <span><strong className="leise" style={{ fontSize: 12 }}>{d.doppeltVon ? "Kopie" : "behalten"}</strong><br/><span className="doppelt-ort">{d.pfad}</span><br/><span className="leise" style={{ fontSize: 12 }}>geändert {datum(d.geaendert)}</span></span>
      </label>)}</div>
    </div>)}
    {gruppen.length > sichtbar.length && <button type="button" className="text-link" onClick={() => setAlle(true)}>Alle {gruppen.length} zeigen</button>}
  </section>;
}

// Fotos ohne lesbaren Text: selbst zuordnen oder gesammelt aus dem Organizer nehmen (Klaus 15.11.2026). Gelöscht wird nichts.
function FotosOhneTextKarte({ z }: { z: AppZustand }) {
  const fotos = useMemo(() => z.dateien.filter((d) => d.art === "bild" && !d.volltext && !d.doppeltVon && !d.auffaellig), [z.dateien]);
  if (!fotos.length) return null;
  return <section className="card" data-fotos-ohne-text>
    <div className="card-heading"><h2>Fotos ohne Text <span className="badge">{fotos.length}</span></h2>
      <Info titel="Fotos ohne Text" punkte={["Die Texterkennung hat darin keine Schrift gefunden (Urlaubsbild, Bildschirmfoto ohne Text, zu unscharf).", "Selbst zuordnen: Auge an der Datei, dann Stift.", "Oder alle aus dem Organizer nehmen – sie werden dann nicht sortiert und nicht weitergegeben.", "Gelöscht wird nichts: wer ein Bild nicht mehr braucht, löscht es selbst auf dem Gerät."]}/></div>
    <div className="button-row"><button type="button" className="button" onClick={() => { if (confirm(`${fotos.length} Fotos ohne Text aus dem Organizer nehmen? Die Originale bleiben unverändert.`)) z.entfernen(fotos.map((d) => d.pfad), `${fotos.length} Fotos ohne Text`); }} data-fotos-entfernen><Trash2 size={16}/>Alle aus dem Organizer nehmen</button></div>
  </section>;
}

export function SortierenSeite({ z, gehe }: P) {
  // Zuerst, was im letzten Sieb neu hängen blieb (Marke „neu in Sieb N“), dann das Ältere.
  const neuOffen = (d: Datei) => istUnsicher(d, z.stufe);
  const offen = useMemo(() => { const l = z.dateien.filter(offenBei); return [...l.filter(neuOffen), ...l.filter((d) => !neuOffen(d))]; }, [z.dateien, z.stufe]);
  const neuZahl = useMemo(() => offen.filter(neuOffen).length, [offen, z.stufe]);
  const sicher = useMemo(() => z.dateien.filter((d) => !offenBei(d) && !gesperrt(d)), [z.dateien]);
  const liegen = z.dateien.length - offen.length - sicher.length;
  const [alle, setAlle] = useState(false);
  const [alleSicher, setAlleSicher] = useState(false);
  if (!z.dateien.length) return <><Seitentitel symbol={<ListChecks size={24}/>} titel="Sortieren"/><section className="card"><p>Noch kein Ordner gelesen.</p><button type="button" className="button primary" onClick={() => gehe("ordner")}><FolderOpen size={18}/>Ordner wählen</button></section></>;
  const sichtbar = alle ? offen : offen.slice(0, 15);
  return <>
    <Seitentitel symbol={<ListChecks size={24}/>} titel="Sortieren" info={<Info titel="Die Siebe" punkte={[
      "Jedes Sieb schaut genauer hin: erst die Art, dann der Briefkopf, dann Bereich und Nummern, dann der Absender, zuletzt der ganze Text.",
      "Was sicher ist, fällt durch. Was unsicher ist, bleibt hängen: „bitte prüfen“.",
      "Deine Korrektur gilt sofort für alle Dateien vom selben Absender.",
      "Gesperrte und doppelte Dateien bleiben liegen – sie werden nicht weitergegeben.",
    ]}/>}/>
    <section className="card" data-siebe>
      <Ablaufbild label="Siebe" schritte={STUFEN.map((s): Schritt => ({ titel: s.name, unter: s.kurz, art: s.nr < z.stufe ? "gut" : s.nr === z.stufe ? "hervor" : "aus" }))}/>
      <div className="button-row" style={{ marginTop: 14 }}>
        <button type="button" className="button primary" disabled={z.stufe >= 5} onClick={() => z.naechstes()} data-naechstes>Nächstes Sieb</button>
        <button type="button" className="button" disabled={z.stufe >= 5} onClick={() => z.naechstes(5)} data-durchsieben>Ganz durchsieben</button>
        <button type="button" className="button" disabled={!z.kannZurueck()} onClick={() => z.zurueck()} data-zurueck><Undo2 size={17}/>Sieb zurück</button>
        <Info titel="Ganz durchsieben" punkte={["Läuft alle Siebe nacheinander.", "Hält an, sobald etwas zu prüfen ist. Danach einfach noch einmal drücken."]}/>
      </div>
      <Meldung z={z} gehe={gehe}/>
    </section>
    <section className="card" data-pruefliste>
      <div className="card-heading"><h2>Bitte prüfen <span className="badge pruefen">{offen.length}</span>{neuZahl > 0 && neuZahl < offen.length && <span className="leise" style={{ marginLeft: 8, fontWeight: 400 }} data-neu-zahl>davon {neuZahl} neu aus Sieb {z.stufe}</span>}</h2>
        <Info titel="Prüfen" punkte={["„Stimmt“ bestätigt den Vorschlag.", "„Ändern“ setzt einen eigenen Wert.", "Beides merkt sich der Organizer und lernt daraus.", "Rückgängig unter „Verlauf“."]}/></div>
      {offen.length === 0 ? <p className="leise" data-nichts-offen>Nichts zu prüfen{z.stufe >= 5 ? " – alles sortiert." : "."}</p>
        : <>{sichtbar.map((d) => <PruefZeile key={d.pfad} z={z} d={d} neu={neuOffen(d) && neuZahl < offen.length ? z.stufe : 0}/>)}
          {offen.length > sichtbar.length && <button type="button" className="text-link" style={{ marginTop: 10 }} onClick={() => setAlle(true)}>Alle {offen.length} zeigen</button>}</>}
    </section>
    <section className="card" data-sicherliste>
      <div className="card-heading"><h2>{z.stufe >= 5 ? "Fertig" : "Sicher bis hierher"} <span className="badge gut">{sicher.length}</span></h2>
        <Info titel="Grün" punkte={["Hier steht, was durch alle bisherigen Siebe gefallen ist: nichts mehr zu prüfen.", "Nach dem letzten Sieb heißt das: fertig sortiert.", "Das Auge zeigt die Datei; dort lässt sie sich auch ändern, teilen oder entfernen."]}/></div>
      {sicher.length === 0 ? <p className="leise">Noch nichts.</p>
        : <>{(alleSicher ? sicher : sicher.slice(0, 8)).map((d) => <SicherZeile key={d.pfad} z={z} d={d}/>)}
          {sicher.length > 8 && !alleSicher && <button type="button" className="text-link" style={{ marginTop: 10 }} onClick={() => setAlleSicher(true)}>Alle {sicher.length} zeigen</button>}</>}
      {liegen > 0 && <p className="leise" style={{ marginTop: 10 }}>{liegen} gesperrt oder doppelt – sie bleiben liegen und werden nicht weitergegeben.</p>}
    </section>
    <DoppelteKarte z={z}/>
    <FotosOhneTextKarte z={z}/>
    {z.stufe >= 5 && offen.length === 0 && <section className="card"><div className="button-row"><button type="button" className="button primary" onClick={() => gehe("akte")}><Archive size={18}/>Weiter zur Familienakte</button><button type="button" className="button" onClick={() => gehe("finden")}><FolderTree size={18}/>Ansehen</button></div></section>}
  </>;
}

// ---------------- Finden ----------------
function Steckbrief({ z, d }: { z: AppZustand; d: Datei }) {
  const [bild, setBild] = useState<string | null>(null);
  const [pdf, setPdf] = useState<{ bilder: string[]; seiten: number } | "laedt" | null>(null);
  const [stift, setStift] = useState(false);
  const [gross, setGross] = useState(false);
  useEffect(() => { setBild(null); setPdf(null); setGross(false); }, [d.pfad]);
  // Drucken, was gerade offen ist: der zuletzt geöffnete Steckbrief ist das Ziel des Drucker-Knopfs im Kopf.
  const druckbar = !d.auffaellig && (d.art === "bild" || d.art === "pdf" || !!d.volltext);
  useEffect(() => {
    if (!druckbar) return;
    druckZielSetzen({ pfad: d.pfad, name: d.name, art: d.art === "bild" || d.art === "pdf" ? d.art : "text", holen: () => z.original(d.pfad), text: d.volltext });
    return () => druckZielWeg(d.pfad);
  }, [d.pfad, d.name, d.art, d.volltext, druckbar, z.original]);
  const f = d.felder;
  const zeile = (name: string, w?: { wert: string; sicher: boolean; grund: string; quelle: string }, anzeige?: string) => w ? <><dt>{name}</dt><dd><span className="feld-wert">{anzeige ?? w.wert}{w.quelle === "du" ? <span className="badge du">von dir</span> : w.quelle === "gelernt" ? <span className="badge du">gelernt</span> : !w.sicher ? <span className="badge pruefen">unsicher</span> : null}</span><span className="grund">{w.grund}</span></dd></> : null;
  const oeffnen = async (anzeigen: boolean) => {
    const b = await z.original(d.pfad);
    if (!b) { z.setMeldung({ text: "Original nur nach dem Einlesen in dieser Sitzung erreichbar. Ordner neu wählen.", art: "halt" }); return; }
    const url = URL.createObjectURL(d.art === "bild" ? new Blob([b], { type: "image/jpeg" }) : d.art === "pdf" ? new Blob([b], { type: "application/pdf" }) : b);
    if (anzeigen && d.art === "bild") { setBild(url); return; }
    if (anzeigen && d.art === "pdf") {
      // Vorschau des Originals in der App (Klaus 16.11.) – ein neues Fenster geht am Handy oft nicht auf.
      URL.revokeObjectURL(url);
      if (pdf && pdf !== "laedt") { setPdf(null); return; }
      setPdf("laedt");
      try { const { pdfVorschau } = await import("./pdf.ts"); setPdf(await pdfVorschau(new Uint8Array(await b.arrayBuffer()))); }
      catch { setPdf(null); z.setMeldung({ text: "Die Vorschau dieser PDF ließ sich nicht zeichnen.", art: "halt" }); }
      return;
    }
    window.open(url, "_blank", "noopener"); setTimeout(() => URL.revokeObjectURL(url), 60000);
  };
  const teilen = async () => {
    const b = await z.original(d.pfad);
    if (!b) { z.setMeldung({ text: "Original nur nach dem Einlesen in dieser Sitzung erreichbar. Ordner neu wählen.", art: "halt" }); return; }
    const datei = new globalThis.File([b], d.name);
    const nav = navigator as Navigator & { canShare?: (x: { files: File[] }) => boolean };
    try { if (nav.canShare?.({ files: [datei] })) { await nav.share({ files: [datei], title: d.name }); return; } } catch (e) { if ((e as Error).name === "AbortError") return; }
    const url = URL.createObjectURL(datei), a = document.createElement("a"); a.href = url; a.download = d.name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 60000);
  };
  return <section className="card steckbrief" data-steckbrief={d.pfad}>
    <div className="titel-zeile"><DateiSymbol d={d}/><h2 style={{ overflowWrap: "anywhere" }}>{d.name}</h2><Zustand d={d}/></div>
    <p className="leise">{kurzfassung(d)}</p>
    <dl>
      <dt>Liegt in</dt><dd>{d.pfad}</dd>
      <dt>Datei</dt><dd>{d.artText || "–"} · {Math.max(1, Math.round(d.groesse / 1024))} KB</dd>
      {d.auffaellig && <><dt>Gesperrt</dt><dd className="grund" style={{ color: "var(--red)" }}>{d.auffaellig}</dd></>}
      {d.doppeltVon && <><dt>Doppelt von</dt><dd>{d.doppeltVon}</dd></>}
      {d.aehnlich && <><dt>Ähnlich</dt><dd className="grund" data-aehnlich-grund>{d.aehnlich.grund}</dd></>}
      {d.innen && innenKurz(d.innen) && <><dt>Aus der Datei</dt><dd data-innen>{innenKurz(d.innen)}</dd></>}
      {zeile("Art", f.schriftstueck)}{zeile("Bereich", f.kategorie)}{zeile("Absender", f.absender)}{zeile("Betrifft", f.betrifft)}
      {zeile("Datum", f.datum, f.datum && deutsch(f.datum.wert))}{zeile("Frist", f.frist, f.frist && `${deutsch(f.frist.wert)} · ${dringlichkeit(f.frist.wert, heute())}`)}{zeile("Betrag", f.betrag)}
      {f.nummern?.length ? <><dt>Nummern</dt><dd>{f.nummern.map((n) => <span key={n.art + n.wert} className="chip" style={{ marginRight: 4 }}>{n.art}: {n.wert}</span>)}</dd></> : null}
      {d.bild && <><dt>Foto</dt><dd>{[d.bild.aufnahme && deutsch(d.bild.aufnahme), [d.bild.hersteller, d.bild.modell].filter(Boolean).join(" "), d.bild.breite && `${d.bild.breite}×${d.bild.hoehe}`, d.bild.gps && "mit Ort"].filter(Boolean).join(" · ")}</dd></>}
      {d.email && <><dt>Mail</dt><dd>{d.email.betreff}{d.email.anhaenge.length ? ` · ${d.email.anhaenge.length} Anhang/Anhänge` : ""}</dd></>}
    </dl>
    <div className="button-row" style={{ marginTop: 12 }}>
      {!d.auffaellig && <button type="button" className="button klein" aria-label="Ansehen" title="Ansehen" onClick={() => oeffnen(true)} data-original><Eye size={15}/></button>}
      {!d.auffaellig && <button type="button" className="button klein" onClick={teilen} data-teilen><Share2 size={15}/>Teilen</button>}
      <button type="button" className="button klein" aria-pressed={stift} aria-label="Von Hand ändern" title="Von Hand ändern" onClick={() => setStift(!stift)} data-steckbrief-stift><Pencil size={15}/></button>
      <button type="button" className="button klein" onClick={() => { if (confirm(`„${d.name}“ aus dem Organizer nehmen? Das Original bleibt unverändert.`)) z.entfernen([d.pfad]); }} aria-label="Entfernen" title="Aus dem Organizer nehmen (Original bleibt)" data-entfernen><Trash2 size={15}/></button>
      <Info titel="Original" punkte={["Öffnet die Datei aus dem Ordner. Sie wird nicht verändert.", "Gesperrte Dateien öffnet der Organizer nicht."]}/>
    </div>
    {stift && <div style={{ marginTop: 10 }}><FeldAendern z={z} d={d} fertig={() => setStift(false)}/></div>}
    {pdf === "laedt" && <p className="leise" role="status">Vorschau wird gezeichnet …</p>}
    {pdf && pdf !== "laedt" && <div data-pdf-vorschau>
      {pdf.bilder.map((u, i) => <img key={u} src={u} alt={`${d.name}, Seite ${i + 1}`} className={`vorschau-bild ${gross ? "gross" : ""}`} onClick={() => setGross(!gross)} title={gross ? "Tippen: kleiner" : "Tippen: größer"}/>)}
      <p className="leise">{pdf.seiten > pdf.bilder.length ? `Seite 1–${pdf.bilder.length} von ${pdf.seiten}. ` : ""}<button type="button" className="text-link" onClick={() => oeffnen(false)} data-pdf-ganz>Ganze PDF öffnen</button></p>
    </div>}
    {bild && <img src={bild} alt={`Foto ${d.name}`} className={`vorschau-bild ${gross ? "gross" : ""}`} onClick={() => setGross(!gross)} title={gross ? "Tippen: kleiner" : "Tippen: größer"}/>}
    {d.volltext && <details style={{ marginTop: 10 }}><summary className="leise">Erkannter Text</summary><pre style={{ whiteSpace: "pre-wrap", fontSize: ".8rem", maxHeight: 260, overflow: "auto" }}>{d.volltext.slice(0, 3000)}</pre></details>}
  </section>;
}

export function FindenSeite({ z, gehe, ziel }: P) {
  const moeglich = SICHTEN.filter((s) => s.ab <= Math.max(z.stufe, 0));
  const [sichtId, setSichtId] = useState("ordnung");
  const sicht = moeglich.find((s) => s.id === sichtId) || [...moeglich].sort((a, b) => b.ab - a.ab)[0] || SICHTEN[SICHTEN.length - 1];
  const [frage, setFrage] = useState("");
  const [knoten, setKnoten] = useState<BaumKnoten | null>(null);
  const [gewaehlt, setGewaehlt] = useState<string>("");
  const wurzel = useMemo(() => baum(z.dateien, sicht, heute()), [z.dateien, sicht]);
  useEffect(() => { setKnoten(null); }, [sicht.id]);
  const nachPfad = useMemo(() => new Map(z.dateien.map((d) => [d.pfad, d])), [z.dateien]);
  // Der gewählte Ordner wird bei jeder Änderung aus dem neuen Baum geholt (sonst zeigte die Liste nach „Stift“ noch den alten Stand).
  const aktuell = useMemo(() => {
    if (!knoten) return null;
    const finde = (k: BaumKnoten): BaumKnoten | null => { if (k.id === knoten.id) return k; for (const c of k.kinder) { const t = finde(c); if (t) return t; } return null; };
    return finde(wurzel) || { ...knoten, anzahl: 0, kinder: [], dateien: [] };
  }, [knoten, wurzel]);
  const liste = useMemo(() => {
    if (frage.trim()) return suche(z.dateien, frage);
    const k = aktuell || wurzel;
    return dateienUnter(k).map((p) => nachPfad.get(p)!).filter(Boolean);
  }, [frage, aktuell, wurzel, z.dateien, nachPfad]);
  const datei = gewaehlt ? nachPfad.get(gewaehlt) : undefined;
  const [stiftBei, setStiftBei] = useState("");
  // Sprung vom Dashboard: Sicht wählen, dann den Ordner im Baum (Titel, erste passende Ebene).
  const angewandt = useRef(0);
  useEffect(() => { if (ziel && ziel.nr !== angewandt.current && moeglich.some((s) => s.id === ziel.sicht)) setSichtId(ziel.sicht); }, [ziel]);
  useEffect(() => {
    if (!ziel || ziel.nr === angewandt.current || sicht.id !== ziel.sicht) return;
    angewandt.current = ziel.nr; setFrage("");
    if (!ziel.knoten) { setKnoten(null); return; }
    const suchen = (k: BaumKnoten): BaumKnoten | null => { for (const c of k.kinder) if (c.titel === ziel.knoten) return c; for (const c of k.kinder) { const t = suchen(c); if (t) return t; } return null; };
    setKnoten(suchen(wurzel));
  }, [ziel, sicht.id, wurzel]);
  if (!z.dateien.length) return <><Seitentitel symbol={<FolderTree size={24}/>} titel="Finden"/><section className="card"><p>Noch kein Ordner gelesen.</p><button type="button" className="button primary" onClick={() => gehe("ordner")}><FolderOpen size={18}/>Ordner wählen</button></section></>;
  return <>
    <Seitentitel symbol={<FolderTree size={24}/>} titel="Finden" info={<Info titel="Sichten" punkte={["Ein Ordner, viele Bäume: nach Bereich, Absender, Person, Datum, Frist, Nummer …", "Die Dateien liegen dabei nicht doppelt – der Baum ist nur eine Ansicht.", "Weitere Sichten erscheinen, sobald das passende Sieb gelaufen ist."]}/>}/>
    <div className="werkzeug-leiste">
      <label className="suchfeld"><Search size={17}/><input type="search" placeholder="Suchen: Name, Absender, Nummer, Text …" value={frage} onChange={(e) => setFrage(e.target.value)} aria-label="Suchen" data-suche/></label>
      <label className="sicht-wahl"><span className="leise">Sicht</span><select value={sicht.id} onChange={(e) => setSichtId(e.target.value)} data-sicht>{moeglich.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
    </div>
    <div className="explorer" style={{ marginTop: 14 }}>
      <section className="card"><OrdnerBaum wurzel={wurzel} gewaehlt={knoten?.id || "alle"} waehlen={(k) => { setKnoten(k); setFrage(""); }} label={`Baum: ${sicht.name}`}/></section>
      <div style={{ display: "grid", gap: 16, minWidth: 0 }}>
        <section className="card" data-liste>
          <div className="card-heading"><h2>{frage.trim() ? `Treffer für „${frage.trim()}“` : (knoten?.titel || "Alle Dateien")}</h2><span style={{ display: "inline-flex", gap: 10, alignItems: "center" }}>{liste.length > 0 && <button type="button" className="text-link" onClick={() => { const was = frage.trim() ? `${liste.length} Treffer` : knoten ? `„${knoten.titel}“ (${liste.length})` : `Alle ${liste.length} Dateien`; if (confirm(`${was} aus dem Organizer nehmen? Die Originale bleiben unverändert.`)) z.entfernen(liste.map((d) => d.pfad), was); }} aria-label="Alle in dieser Liste entfernen" title="Alle in dieser Liste aus dem Organizer nehmen (Originale bleiben)" data-entfernen-liste><Trash2 size={15}/></button>}<span className="badge">{liste.length}</span></span></div>
          <ul className="dateiliste">{liste.slice(0, 200).map((d) => <li key={d.pfad} className="datei-eintrag"><div className="datei-zeile-mit"><button type="button" className="datei-zeile" aria-current={gewaehlt === d.pfad} onClick={() => setGewaehlt(d.pfad)} data-datei={d.pfad}>
            <DateiSymbol d={d}/><span><strong>{d.felder.absender?.wert && d.felder.schriftstueck?.wert ? `${d.felder.schriftstueck.wert} · ${d.felder.absender.wert}` : d.name}</strong><small>{d.pfad}{d.felder.datum ? ` · ${deutsch(d.felder.datum.wert)}` : ""}</small></span><Zustand d={d}/>
          </button><DateiAktionen z={z} d={d} auge={gewaehlt === d.pfad} setAuge={(b) => setGewaehlt(b ? d.pfad : "")} stift={stiftBei === d.pfad} setStift={(b) => setStiftBei(b ? d.pfad : "")}/></div>
            {stiftBei === d.pfad && <FeldAendern z={z} d={d} fertig={() => setStiftBei("")}/>}</li>)}</ul>
          {liste.length > 200 && <p className="leise">Erste 200 von {liste.length}. Suche genauer.</p>}
          {liste.length === 0 && <p className="leise">Nichts gefunden.</p>}
        </section>
        {datei && <Steckbrief z={z} d={datei}/>}
      </div>
    </div>
  </>;
}

// ---------------- Verlauf ----------------
export function VerlaufSeite({ z }: P) {
  const liste = [...z.verlauf.entries()].reverse();
  return <>
    <Seitentitel symbol={<History size={24}/>} titel="Verlauf" info={<Info titel="Verlauf" punkte={["Jede Bestätigung und Korrektur steht hier.", "„Rückgängig“ nimmt sie zurück – die Datei landet wieder bei „bitte prüfen“.", "Aus den Korrekturen lernt der Organizer Regeln je Absender."]}/>}/>
    <div className="raster-2">
      <section className="card" data-verlauf>
        <div className="card-heading"><h2>Korrekturen</h2><span className="badge">{z.verlauf.length}</span></div>
        {liste.length === 0 ? <p className="leise">Noch nichts korrigiert.</p> : <ul className="verlauf-liste">{liste.map(([i, k]) => <li key={k.zeit + i}>
          <span><strong>{FELD_NAMEN[k.feld]}</strong> {k.bestaetigt ? <>bestätigt: „{k.zu}“</> : <>„{k.von || "–"}“ → „{k.zu}“</>}<span className="grund">{k.pfad.split("/").pop()} · {new Date(k.zeit).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" })}</span></span>
          <button type="button" className="button klein" onClick={() => z.rueckgaengig(i)} data-rueckgaengig><Undo2 size={15}/>Rückgängig</button>
        </li>)}</ul>}
      </section>
      <section className="card" data-regeln>
        <div className="card-heading"><h2>Gelernt</h2><span className="badge du">{z.regeln.length}</span></div>
        {z.regeln.length === 0 ? <p className="leise">Noch keine Regel.</p> : <ul className="verlauf-liste">{z.regeln.map((r) => <li key={r.wenn.absender + r.feld + (r.wenn.sache || "")}><span>Absender „{r.wenn.absender}“{r.wenn.sache ? <> bei Vorschlag „{r.wenn.sache}“</> : null} → {FELD_NAMEN[r.feld]} „{r.dann}“</span><span className="leise">{r.anzahl}×</span></li>)}</ul>}
      </section>
      <StichprobeKarte z={z}/>

    </div>
  </>;
}

// ---------------- Stichprobe (Punkt 9): nur Zahlen ----------------
function StichprobeKarte({ z }: { z: AppZustand }) {
  const sp = useMemo(() => stichprobe(z.verlauf), [z.verlauf]);
  const [kopiert, setKopiert] = useState(false);
  const felder = Object.entries(sp.felder);
  return <section className="card" data-stichprobe>
    <div className="card-heading"><h2>Stichprobe – nur Zahlen</h2><span className="badge">{sp.dateien}</span></div>
    <Info titel="Stichprobe eigener Unterlagen" punkte={["Lege 30 bis 50 eigene Unterlagen ein und bestätige oder berichtige bei jeder Datei Bereich, Art, Absender und Frist.", "Hier steht nur, wie oft der erste Vorschlag stimmte – keine Namen, keine Texte, keine Dateinamen.", "Nichts verlässt das Gerät. „Zahlen kopieren“ legt nur diese Zahlen in die Zwischenablage."]}/>
    {felder.length === 0 ? <p className="leise">Noch nichts bestätigt oder berichtigt.</p> : <ul className="verlauf-liste">{felder.map(([f, w]) => <li key={f}><span><strong>{FELD_NAMEN[f as FeldName] || f}</strong> {anteilText(w)}</span><span className="leise">{w.berichtigt} berichtigt</span></li>)}</ul>}
    {felder.length > 0 && <button type="button" className="button klein" data-stichprobe-kopieren onClick={() => { void navigator.clipboard?.writeText(JSON.stringify(sp)).then(() => setKopiert(true)); }}><Check size={15}/>{kopiert ? "Kopiert" : "Zahlen kopieren"}</button>}
  </section>;
}

// ---------------- Familienakte ----------------
export function AkteSeite({ z, gehe }: P) {
  const [mitText, setMitText] = useState(true);
  const { bereit, wartet } = useMemo(() => offeneFuerNummer(z.dateien), [z.dateien]);
  const mitNummer = z.dateien.filter((d) => d.archivnummer).length;
  const gesperrt_ = z.dateien.filter(gesperrt).length;
  return <>
    <Seitentitel symbol={<Archive size={24}/>} titel="An die Familienakte" info={<Info titel="Übergabe" punkte={[
      "Die Originale bleiben im Ordner.",
      `Die Sortierung steht in ${INDEX_DATEI} im selben Ordner.`,
      "Die Familienakte holt Kopien (Sicherheit › Cloud-Ordner hereinholen) und ordnet sie danach zu.",
      "Gesperrte und doppelte Dateien gibt der Organizer nicht weiter.",
    ]} mehr={<FesterBaum label="Weg der Dateien" wurzel={{ titel: "Datei-Organizer (Ordner)", unter: "Originale bleiben", kinder: [{ titel: INDEX_DATEI, unter: "Sortierung" }, { titel: "Familienakte", unter: "holt Kopien, ordnet zu" }] }}/>}/>}/>
    <section className="card" data-archivnummern>
      <div className="card-heading"><h2>Archivnummern</h2><Info titel="Archivnummer" punkte={[
        "Für Papier im Ordner: Nummer auf das Blatt schreiben, dann findet man es wieder.",
        "Vergeben wird erst, wenn eine Datei ganz gesiebt ist und nichts mehr zu prüfen ist.",
        "Reihenfolge: Datum, dann Bereich, dann Absender.",
        "Eine Nummer ändert sich nie. Neue Dateien bekommen die nächste.",
      ]}/></div>
      <div className="chips"><span className="chip">{mitNummer} mit Nummer</span><span className="chip" data-bereit>{bereit.length} bereit</span><span className="chip">{wartet.length} warten</span>{gesperrt_ > 0 && <span className="chip">{gesperrt_} gesperrt/doppelt</span>}</div>
      <div className="button-row" style={{ marginTop: 12 }}>
        <button type="button" className="button primary" disabled={!bereit.length} onClick={() => z.nummern()} data-nummern-vergeben>{bereit.length ? `${bereit.length} Nummern vergeben` : "Keine bereit"}</button>
        {wartet.length > 0 && <button type="button" className="text-link" onClick={() => gehe("sortieren")}>Zuerst sortieren ›</button>}
      </div>
    </section>
    <section className="card" data-index>
      <div className="card-heading"><h2>Sortierung speichern</h2><Info titel={INDEX_DATEI} punkte={[
        "Steckbrief je Datei: Art, Bereich, Absender, Betrifft, Datum, Frist, Nummern, Archivnummer.",
        "Mit Text: der erkannte Text in Abschnitten – für Suche und KI.",
        "Ohne Text: kleiner, nur die Steckbriefe.",
        "Am PC und mit Familienakte Pro landet sie im Ordner, sonst als Download.",
      ]}/></div>
      <label className="titel-zeile"><input type="checkbox" checked={mitText} onChange={(e) => setMitText(e.target.checked)} data-mit-text/>Erkannten Text mitgeben</label>
      <div className="button-row" style={{ marginTop: 12 }}>
        <button type="button" className="button primary" disabled={!z.dateien.length} onClick={() => z.indexSichern(mitText)} data-index-sichern><Download size={18}/>{z.quelle?.schreiben ? "In den Ordner schreiben" : nativSpeichernMoeglich() ? "Speichern unter …" : "Herunterladen"}</button>
      </div>
      <Meldung z={z} gehe={gehe}/>
    </section>
    <LeerenKarte z={z} gehe={gehe}/>
  </>;
}

// Nach dem Weitergeben: den Organizer leeren. Die Originale bleiben, wo sie sind.
const LEEREN_FRAGE = "Organizer leeren? Die Liste der Dateien und der Verlauf in diesem Browser werden entfernt. Die Originale und der Ordner bleiben unverändert, nichts wird gelöscht. Vorher „Sortierung speichern“, falls die Familienakte sie noch braucht.";
function LeerenKarte({ z, gehe }: { z: AppZustand; gehe: (s: SeitenId) => void }) {
  if (!z.dateien.length) return null;
  return <section className="card" data-leeren>
    <div className="card-heading"><h2>Organizer leeren</h2><Info titel="Was „Leeren“ tut" punkte={[
      "Nimmt alle Dateien aus der Liste dieses Organizers – für den nächsten Ordner.",
      "Die Originale werden nicht verändert und nicht gelöscht. Auch der Ordner und die gespeicherte Sortierung darin bleiben.",
      "Was der Organizer aus deinen Korrekturen gelernt hat, bleibt.",
      "Vorher die Sortierung speichern, wenn die Familienakte sie noch braucht.",
    ]}/></div>
    <p className="leise">Fertig sortiert und weitergegeben? Dann kann die Liste hier weg. Die Originale bleiben, wo sie sind.</p>
    <div className="button-row" style={{ marginTop: 12 }}>
      <button type="button" className="button" onClick={() => { if (confirm(LEEREN_FRAGE)) { void z.leeren(); gehe("ordner"); } }} data-leeren-knopf><Trash2 size={18}/>Organizer leeren ({z.dateien.length})</button>
    </div>
  </section>;
}

// ---------------- Hilfe ----------------
export function HilfeSeite({ gehe }: P) {
  return <>
    <Seitentitel symbol={<HelpCircle size={24}/>} titel="Hilfe"/>
    <section className="card">
      <h2>So geht es</h2>
      <Ablaufbild label="Ablauf" schritte={[
        { titel: "Ordner", unter: "alles hinein" }, { titel: "Sieben", unter: "Klick für Klick" }, { titel: "Prüfen", unter: "nur das Unsichere" },
        { titel: "Nummern", unter: "wenn alles steht" }, { titel: "Familienakte", unter: "holt Kopien", art: "gut" },
      ]}/>
      <div className="button-row" style={{ marginTop: 12 }}><button type="button" className="button primary" onClick={() => gehe("ordner")}><FolderOpen size={18}/>Zum Ordner</button></div>
    </section>
    <section className="card">
      <div className="card-heading"><h2>Wo liegt was?</h2><Info titel="SD-Karte" punkte={["Den Ordner „Datei-Organizer“ neben den Tresor legen, nicht hinein.", "Der Tresor verschlüsselt – dort kann der Organizer nicht lesen."]}/></div>
      <FesterBaum wurzel={SD_BAUM} label="Ordner auf der SD-Karte"/>
    </section>
    <section className="card">
      <h2>Häufige Fragen</h2>
      <details><summary>Werden meine Dateien verändert?</summary><p className="leise">Nein. Der Organizer liest nur. Er schreibt höchstens {INDEX_DATEI} dazu.</p></details>
      <details><summary>Geht etwas ins Internet?</summary><p className="leise">Nein. Alles läuft in diesem Gerät. Die Sortierung merkt sich nur dieser Browser.</p></details>
      <details><summary>Was heißt „gesperrt“?</summary><p className="leise">Die Datei sieht anders aus, als ihr Name sagt (z. B. ein Programm mit „.pdf“). Nicht öffnen, löschen.</p></details>
      <details><summary>Was heißt „doppelt“?</summary><p className="leise">Gleicher Inhalt, Byte für Byte, wie eine andere Datei. Vorgewählt bleibt die ohne „Kopie“ im Namen, sonst die ältere – unter Sortieren › „Doppelte: welche behalten?“ entscheidest du per Haken, auch für alle auf einmal. Geänderte Fassungen sind nie „doppelt“, sondern „ähnlich“: beide bleiben.</p></details>
      <details><summary>Werden Fotos gelesen?</summary><p className="leise">Ja. Aufnahmedatum, Gerät und Ort aus den Foto-Daten, dazu der Text im Bild über die Texterkennung auf dem Gerät – nichts geht ins Internet. Fotos ohne Text kannst du selbst zuordnen oder unter Sortieren gesammelt aus dem Organizer nehmen; gelöscht wird nichts.</p></details>
    </section>
  </>;
}
