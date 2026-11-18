import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { drucken, druckZiel, druckZielHoeren } from "./drucken.ts";
import { Archive, ChevronDown, ChevronUp, FolderOpen, FolderTree, HelpCircle, History, ListChecks, Download, Map as KarteSymbol, Printer, RefreshCw, Search, Telescope } from "lucide-react";
import type { Datei, FeldName, Korrektur, Lernregel } from "../lib/typen.ts";
import { einlesen, doppelteMarkieren } from "../lib/einlesen.ts";
import { aehnlicheFinden } from "../lib/aehnlich.ts";
import { bildLeser, kernLeser, ocrGleichzeitig } from "./vendor.ts";
import { leseEml } from "../lib/eml.ts";
import { siebe, istUnsicher, offeneFelder } from "../lib/siebe.ts";
import { absenderVereinheitlichen } from "../lib/abgleich.ts";
const DOPPELT_SCHLUESSEL = "datei-organizer-doppelt-wahl";
import { korrigieren as korrigiereDatei, lernen, regelnAufAlle } from "../lib/lernen.ts";
import { archivnummernVergeben } from "../lib/archivnummer.ts";
import { indexLesen, organizerIndex, INDEX_DATEI } from "../lib/index-format.ts";
import { pdfLeser } from "./pdf.ts";
import { ausHandle, eingangAbholen, erlaubnisPruefen, herunterladen, nativerEingang, ordnerWahlMoeglich, SCAN_ORDNER, nativGemerkt, nativSpeichern, nativWieder, testOrdner, type Quelle, type QuellDatei } from "./quellen.ts";
import { laden, laufLaden, laufLoeschen, laufNeuBeginnen, laufSpeichern, loeschen, ordnerHolen, ordnerMerken, speichern } from "./zustand.ts";
import { fortsetzen, passt, schluessel, type Lauf } from "./lauf.ts";
import { erkenneArt } from "../lib/dateiart.ts";
import { ArbeitSpeicher, arbeitAnzeige, arbeitFehler, arbeitFrei, arbeitGemerkt, arbeitMoeglich, arbeitVergessen, arbeitWaehlen, blockBedarf, leistungMessen, leistungText, mbText, schlank, speicherReicht, type Arbeitsordner, type Leistung } from "./arbeit.ts";
import { OrdnerSeite, SortierenSeite, FindenSeite, VerlaufSeite, AkteSeite, HilfeSeite } from "./seiten.tsx";
import { LandkarteSeite } from "./landkarte.tsx";
import { installHoeren, installMoeglich, installieren } from "./installieren.ts";
import { rahmen } from "./rahmen.ts";
import { verlernen } from "./verlauf.ts";
import { Seitenleiste } from "./seitenleiste.tsx";
import { APP_NAME, APP_VARIANTE, direktLaden, istNativ, nativeUpdates, stillPruefen } from "./nativ.ts";

export const FASSUNG = "0.4.18";
// Ladeanzeige: „suchen“ = Ordner wird durchgesehen (Zahl noch unbekannt), „lesen“ = Datei für Datei, „stand“ = gemerkter Stand beim Start.
export type Fortschritt = { phase: "stand" | "suchen" | "lesen" | "uebergeben"; fertig: number; gesamt: number; name?: string };
const luft = () => new Promise<void>((r) => setTimeout(r)); // dem Browser Zeit zum Zeichnen geben
export type SeitenId = "ordner" | "sortieren" | "finden" | "verlauf" | "akte" | "hilfe" | "landkarte";
/** Sprungziel für „Finden“: eine Sicht und darin ein Ordner (Titel im Baum). Kommt vom Dashboard. */
export type FindenZiel = { sicht: string; knoten?: string; nr: number } | null;
export type Meldung = { text: string; art?: "halt" | "fehler" } | null;
export const heute = () => new Date().toISOString().slice(0, 10);

const SEITEN: Array<{ id: SeitenId; name: string; symbol: typeof FolderOpen }> = [
  { id: "ordner", name: "Ordner", symbol: FolderOpen }, { id: "sortieren", name: "Sortieren", symbol: ListChecks },
  { id: "finden", name: "Finden", symbol: FolderTree }, { id: "verlauf", name: "Verlauf", symbol: History },
  { id: "akte", name: "Familienakte", symbol: Archive }, { id: "hilfe", name: "Hilfe", symbol: HelpCircle },
];
const seiteAusHash = (): SeitenId => { const h = location.hash.replace("#", ""); return (SEITEN.some((s) => s.id === h) || h === "landkarte" ? h : "ordner") as SeitenId; };

export type AppZustand = ReturnType<typeof useOrganizer>;

function useOrganizer() {
  const [dateien, setDateien] = useState<Datei[]>([]);
  const [stufe, setStufe] = useState(0);
  const [verlauf, setVerlauf] = useState<Korrektur[]>([]);
  const [regeln, setRegeln] = useState<Lernregel[]>([]);
  const [ordnerName, setOrdnerName] = useState("");
  const [quelleArt, setQuelleArt] = useState("");
  const [quelle, setQuelle] = useState<Quelle | null>(null);
  const [meldung, setMeldung] = useState<Meldung>(null);
  const [fortschritt, setFortschritt] = useState<Fortschritt | null>({ phase: "stand", fertig: 0, gesamt: 0 });
  const [geladen, setGeladen] = useState(false);
  // Angefangenes Einlesen (große Mengen in Blöcken): gemerkt nach jedem Block, „Weitermachen“ liest den Rest.
  const [angefangen, setAngefangen] = useState<Lauf | null>(null);
  const anhaltenRef = useRef(false);
  // Große Ordner (0.4.3): Leistung des Geräts, Arbeitsordner (nur App), lange Texte dort.
  const [leistung] = useState<Leistung>(() => leistungMessen());
  const [arbeit, setArbeit] = useState<Arbeitsordner | null>(() => (arbeitMoeglich() ? arbeitGemerkt() : null));
  const [arbeitFehlt, setArbeitFehlt] = useState("");
  const arbeitRef = useRef<ArbeitSpeicher | null>(null);
  if (arbeit && arbeitRef.current?.a.id !== arbeit.id) arbeitRef.current = new ArbeitSpeicher(arbeit);
  if (!arbeit) arbeitRef.current = null;
  const langeTexte = useRef<Record<string, string>>({});
  // Stand des Einlesens: im Arbeitsordner, wenn es einen gibt, sonst im App-Speicher.
  const laufHolen = useCallback(async (): Promise<Lauf | null> => (arbeitRef.current ? arbeitRef.current.laufLaden<Lauf>() : laufLaden()), []);
  const laufMerken = useCallback(async (l: Lauf) => { if (arbeitRef.current) await arbeitRef.current.laufSpeichern(l); else await laufSpeichern(l); }, []);
  const laufWeg = useCallback(async () => { if (arbeitRef.current) await arbeitRef.current.laufEnde().catch(() => {}); await laufLoeschen(); }, []);
  // Jeder Eintrag merkt die Stufe, zu der er gehört: „Zurück“ nach Entfernen oder Behalten bleibt im selben Sieb.
  const stapel = useRef<Array<Datei[] & { stufe?: number }>>([]);
  const doppeltWahl = useRef<Record<string, string>>((() => { try { return JSON.parse(localStorage.getItem(DOPPELT_SCHLUESSEL) || "{}"); } catch { return {}; } })());
  const originale = useRef(new Map<string, QuellDatei | { blob: Uint8Array }>());

  // gemerkten Stand holen
  useEffect(() => { (async () => {
    const z = await laden();
    if (arbeitRef.current) {
      // Arbeitsordner: Liste und Stand kommen von dort (Karte, Festplatte), nicht aus dem App-Speicher.
      try {
        const st = await arbeitRef.current.laden();
        const quelle = st || z;
        if (quelle) { setDateien(quelle.dateien); setStufe(quelle.stufe); setVerlauf(quelle.verlauf as Korrektur[]); setRegeln(quelle.regeln as Lernregel[]); setOrdnerName(quelle.ordnerName); setQuelleArt(quelle.quelle); }
        langeTexte.current = (st?.langeTexte as Record<string, string>) || {};
        setAngefangen(await arbeitRef.current.laufLaden<Lauf>());
      } catch (e) {
        // Nicht erreichbar: nichts überschreiben, bis er wieder da ist.
        setArbeitFehlt(arbeitFehler(e)); setMeldung({ text: arbeitFehler(e), art: "fehler" });
      }
    } else {
      setAngefangen(await laufLaden());
      if (z) { setDateien(z.dateien); setStufe(z.stufe); setVerlauf(z.verlauf); setRegeln(z.regeln); setOrdnerName(z.ordnerName); setQuelleArt(z.quelle); }
    }
    setGeladen(true); setFortschritt((f) => (f?.phase === "stand" ? null : f));
  })(); }, []);
  useEffect(() => {
    if (!geladen || arbeitFehlt) return;
    const zeit = new Date().toISOString(), ar = arbeitRef.current;
    if (ar) {
      // Im Arbeitsordner: nur geänderte Teile schreiben; der App-Speicher behält nur einen leeren Stand (schlank, übersteht nichts Wichtiges).
      const t = setTimeout(() => {
        void ar.speichern({ ordnerName, quelle: quelleArt, stufe, dateien, verlauf, regeln, zeit, langeTexte: langeTexte.current })
          .catch((e) => setMeldung({ text: `Speichern im Arbeitsordner fehlgeschlagen: ${arbeitFehler(e)}`, art: "fehler" }));
        void speichern({ fassung: 1, ordnerName, quelle: quelleArt, stufe, dateien: [], verlauf: [], regeln, zeit });
      }, 1500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { void speichern({ fassung: 1, ordnerName, quelle: quelleArt, stufe, dateien, verlauf, regeln, zeit }); }, 400);
    return () => clearTimeout(t);
  }, [geladen, arbeitFehlt, arbeit, dateien, stufe, verlauf, regeln, ordnerName, quelleArt]);

  const einlesenAus = useCallback(async (q: Quelle, dazu = false) => {
    setMeldung({ text: `Lese „${q.name}“ …` });
    setFortschritt({ phase: "suchen", fertig: 0, gesamt: 0, name: q.name }); await luft();
    let liste: QuellDatei[];
    try { liste = await q.dateien(); } catch (e) { setFortschritt(null); setMeldung({ text: `Ordner „${q.name}“ nicht lesbar: ${(e as Error).message}. Die Anzeige ist unverändert.`, art: "fehler" }); return; }
    if (!liste.length) { setFortschritt(null); setMeldung({ text: `In „${q.name}“ liegen keine lesbaren Dateien. Die Anzeige ist unverändert.`, art: "halt" }); return; }
    const lesePdf = await pdfLeser(bildLeser);
    let neu: Datei[] = [];
    if (!dazu) originale.current.clear();
    // Große Mengen in Blöcken: ein passender angefangener Lauf wird fortgesetzt, schon Gelesenes übersprungen.
    const alt = await laufHolen().catch(() => null);
    laufNeuBeginnen(); arbeitRef.current?.laufNeuBeginnen();
    let erledigt = new Set<string>(), fortgesetzt = 0;
    if (alt && passt(alt, q, liste, dazu)) { const f = fortsetzen(alt, liste); neu = [...f.fertig]; erledigt = f.erledigt; fortgesetzt = erledigt.size; }
    if (q.handle) void ordnerMerken(q.handle);
    const jetzt = () => new Date().toISOString();
    const laufStand = (): Lauf => ({ fassung: 1, quelleName: q.name, quelleArt: q.art, merkId: q.merkId || (fortgesetzt ? alt?.merkId : undefined), dazu, gesamt: liste.length,
      erledigt: [...erledigt], dateien: neu, begonnen: fortgesetzt && alt ? alt.begonnen : jetzt(), zeit: jetzt() });
    anhaltenRef.current = false;
    setFortschritt({ phase: "lesen", fertig: erledigt.size, gesamt: liste.length });
    let gezeichnet = performance.now(), seitBlock = 0, ganzGeladen = 0, stueckweise = 0, speicherHalt = "";
    const ar = arbeitRef.current;
    let blockTexte: Record<string, string> = {};
    const texteAblegen = async () => {
      if (!ar || !Object.keys(blockTexte).length) return;
      const datei = await ar.texte(blockTexte);
      for (const p of Object.keys(blockTexte)) langeTexte.current[p] = datei;
      blockTexte = {};
    };
    const offen = liste.filter((qd) => !erledigt.has(schluessel(qd)));
    // Eine Datei lesen (Bytes, Text, Texterkennung). Mehrere laufen nebeneinander (leistung.gleichzeitig), Ergebnis in Listen-Reihenfolge.
    const leseEine = async (qd: QuellDatei): Promise<Datei[]> => {
      try {
        let teile: Datei[];
        // A: große Dateien nicht ganz laden – nur Kopf (für die Art) und Prüfsumme Stück für Stück (in der App am Ort).
        // Starke Geräte laden bis leistung.vollBis ganz. Text wird ohnehin nur bis 30 MB gelesen (lib/einlesen.ts); vollBis ist nie kleiner.
        if (qd.groesse !== undefined && qd.groesse > leistung.vollBis && qd.kopf && qd.pruefsumme) {
          const kopf = await qd.kopf(600), art = erkenneArt(qd.name, kopf);
          teile = [{ pfad: qd.pfad, name: qd.name, groesse: qd.groesse, geaendert: qd.geaendert, art: art.art, artText: art.artText, auffaellig: art.auffaellig,
            stufe: 1, felder: {}, sha256: await qd.pruefsumme(), textQuelle: "keiner" }];
          stueckweise++;
        } else {
          const bytes = await qd.lesen();
          teile = await einlesen({ pfad: qd.pfad, name: qd.name, geaendert: qd.geaendert, bytes }, lesePdf, 0, bildLeser, kernLeser);
          ganzGeladen++;
        }
        originale.current.set(qd.pfad, qd);
        // C: mit Arbeitsordner bleibt im Speicher nur der Anfang langer Texte; der ganze Text kommt in den Arbeitsordner.
        if (ar) teile = teile.map((t) => { const s = schlank(t); if (s.lang) blockTexte[t.pfad] = s.lang; return s.d; });
        return teile;
      } catch (e) {
        return [{ pfad: qd.pfad, name: qd.name, groesse: 0, geaendert: qd.geaendert, stufe: 1, felder: { schriftstueck: { wert: "Unklar", sicher: false, grund: `nicht lesbar: ${(e as Error).message}`, quelle: "regel" } } }];
      }
    };
    ocrGleichzeitig(leistung.gleichzeitig);
    for (let i = 0; i < offen.length;) {
      if (anhaltenRef.current) break;
      // D: vor jedem Block prüfen, ob der Speicher reicht (Arbeitsordner bzw. App-Speicher). Unbekannt → weiter, aber gesagt.
      if (seitBlock === 0) {
        const noetig = blockBedarf(offen.slice(i, i + leistung.block).map((x) => x.groesse || 0));
        const frei = ar ? await arbeitFrei(ar.a) : await navigator.storage?.estimate?.().then((e) => (e.quota !== undefined && e.usage !== undefined ? e.quota - e.usage : null)).catch(() => null) ?? null;
        if (!speicherReicht(frei, noetig)) { speicherHalt = `Zu wenig Speicher ${ar ? `im Arbeitsordner (${arbeitAnzeige(ar.a)})` : "in der App"}: frei ${mbText(frei!)}, für den nächsten Block gebraucht ${mbText(noetig)}.`; break; }
      }
      // Ein Schub geht nie über das Ende eines Blocks hinaus: Merken und Speicherprüfung bleiben je Block wie bisher.
      const schub = offen.slice(i, i + Math.max(1, Math.min(leistung.gleichzeitig, leistung.block - seitBlock)));
      if (performance.now() - gezeichnet > 80) { setFortschritt({ phase: "lesen", fertig: erledigt.size, gesamt: liste.length, name: schub[0].name }); await luft(); gezeichnet = performance.now(); }
      const ergebnisse = await Promise.all(schub.map(leseEine));
      for (const [k, qd] of schub.entries()) {
        neu.push(...ergebnisse[k]);
        erledigt.add(schluessel(qd));
        // Nach jedem Block merken: bricht es danach ab, ist höchstens ein Block verloren.
        if (++seitBlock >= leistung.block) {
          seitBlock = 0;
          await texteAblegen();
          if (liste.length > leistung.block && erledigt.size < liste.length) await laufMerken(laufStand());
        }
      }
      i += schub.length;
    }
    await texteAblegen().catch((e) => setMeldung({ text: `Lange Texte nicht abgelegt: ${arbeitFehler(e)}`, art: "fehler" }));
    if (erledigt.size < liste.length) {
      const l = laufStand(); await laufMerken(l); setAngefangen(l); setFortschritt(null);
      setMeldung({ text: `${speicherHalt || "Angehalten:"} ${erledigt.size} von ${liste.length} Dateien aus „${q.name}“ gelesen. „Weitermachen“ liest nur den Rest – auch nach dem Schließen der App.`, art: "halt" });
      return;
    }
    await laufWeg(); setAngefangen(null);
    void ganzGeladen;
    const grossText = stueckweise ? ` · ${stueckweise} große Datei${stueckweise === 1 ? "" : "en"} Stück für Stück geprüft` : "";
    setFortschritt({ phase: "lesen", fertig: liste.length, gesamt: liste.length }); await luft();
    const weiter = (fortgesetzt ? ` · fortgesetzt: ${fortgesetzt} schon gelesen, ${liste.length - fortgesetzt} neu gelesen` : "") + grossText;
    if (dazu) {
      // Hinzufügen (Drag and Drop): Vorhandenes bleibt; gleiche Pfade werden ersetzt, gleiche Inhalte als doppelt markiert.
      // Neue Stücke laufen durch dieselben Siebe wie der Bestand.
      let frisch = neu;
      for (let s = 2; s <= stufe; s++) frisch = frisch.map((x) => siebe(x, s, regeln));
      const pfade = new Set(frisch.map((d) => d.pfad));
      let alle = doppelteMarkieren([...dateien.filter((d) => !pfade.has(d.pfad)).map((d) => ({ ...d, doppeltVon: undefined })), ...frisch], doppeltWahl.current);
      if (stufe >= 4) alle = absenderVereinheitlichen(alle);
      stapel.current = [];
      setDateien(alle); setFortschritt(null); if (!ordnerName) { setOrdnerName(q.name); setQuelleArt(q.art); if (!stufe) setStufe(1); }
      const dopp = alle.filter((d) => pfade.has(d.pfad) && d.doppeltVon).length;
      setMeldung({ text: `${frisch.length} Dateien hinzugefügt – jetzt ${alle.length} im Eingang${dopp ? ` · ${dopp} davon doppelt (gleicher Inhalt liegt schon da)` : ""}${weiter}.`, art: dopp ? "halt" : undefined });
      return;
    }
    let fertig = doppelteMarkieren(neu, doppeltWahl.current);
    // Vorhandenen Index übernehmen: Archivnummern, Bestätigtes, Regeln, Verlauf (Nummern ändern sich nie)
    let ausIndex = 0;
    const roh = await q.indexLesen?.().catch(() => null);
    let alteRegeln: Lernregel[] = [], alterVerlauf: Korrektur[] = [];
    if (roh) {
      const r = indexLesen(roh);
      if (r.ok) {
        alteRegeln = r.index.lernregeln || []; alterVerlauf = r.index.verlauf || [];
        const nachSha = new Map(r.index.dateien.filter((s) => s.sha256).map((s) => [s.sha256!, s]));
        fertig = fertig.map((d) => {
          const s = (d.sha256 && nachSha.get(d.sha256)) || r.index.dateien.find((x) => x.pfad === d.pfad);
          if (!s) return d;
          ausIndex++;
          const n: Datei = { ...d, archivnummer: s.archivnummer, bestaetigt: {}, felder: { ...d.felder } };
          for (const [feld, si] of Object.entries(s.sicherheit || {})) if (si === "von dir") {
            const wert = (s as unknown as Record<string, string>)[feld];
            if (wert) { n.felder[feld as FeldName] = { wert, sicher: true, grund: "von dir (aus dem gespeicherten Index)", quelle: "du" }; n.bestaetigt![feld as FeldName] = true; }
          }
          return n;
        });
      }
    }
    stapel.current = [];
    setQuelle(q); setOrdnerName(q.name); setQuelleArt(q.art); setDateien(fertig); setStufe(1); setRegeln(alteRegeln); setVerlauf(alterVerlauf); setFortschritt(null);
    const auff = fertig.filter((d) => d.auffaellig).length, dopp = fertig.filter((d) => d.doppeltVon).length;
    setMeldung({ text: `${fertig.length} Dateien im Eingang · Sieb 1 fertig: ${auff} auffällig, ${dopp} doppelt${ausIndex ? ` · ${ausIndex} aus dem gespeicherten Index wiedererkannt` : ""}${weiter}.`, art: auff ? "halt" : undefined });
  }, [dateien, stufe, regeln, ordnerName, leistung, laufHolen, laufMerken, laufWeg]);

  // Geteilt an die App (Android) bzw. „Öffnen mit“ (Windows): Kopien kommen zum Bestand dazu, wie beim Hineinziehen.
  // Abgeholt beim Start, wenn die App meldet, dass etwas kam, und beim Zurückholen der App.
  const einlesenRef = useRef(einlesenAus); einlesenRef.current = einlesenAus;
  const anzahlRef = useRef(0); anzahlRef.current = dateien.length;
  useEffect(() => {
    const p = nativerEingang();
    if (!geladen || !p) return;
    let weg = false, laeuft = false;
    const holen = async () => {
      if (laeuft) return; laeuft = true;
      try { for (let i = 0; i < 20 && !weg; i++) { const q = await eingangAbholen(); if (!q) break; await einlesenRef.current(q, anzahlRef.current > 0); await new Promise((r) => setTimeout(r, 60)); /* neu zeichnen lassen: der nächste Stapel braucht den neuen Bestand */ } }
      catch { /* nichts geteilt oder App ohne Eingang */ } finally { laeuft = false; }
    };
    void holen();
    const sicht = () => { if (document.visibilityState === "visible") void holen(); };
    document.addEventListener("visibilitychange", sicht);
    let hoerer: { remove?: () => unknown } | null = null;
    void Promise.resolve(p.addListener?.("neu", () => void holen())).then((h) => { if (weg) h?.remove?.(); else hoerer = h || null; });
    return () => { weg = true; document.removeEventListener("visibilitychange", sicht); hoerer?.remove?.(); };
  }, [geladen]);

  /** Laufendes Einlesen nach der aktuellen Datei anhalten; der Stand bleibt gemerkt. */
  const anhalten = useCallback(() => { anhaltenRef.current = true; }, []);
  /** Angefangenes Einlesen fortsetzen: dieselbe Quelle ohne Auswahl-Fenster, wo das geht – sonst die Bitte, sie noch einmal zu wählen. */
  const weitermachen = useCallback(async () => {
    const l = angefangen ?? (await laufHolen());
    if (!l) return;
    let q: Quelle | null = null;
    if (l.quelleArt === "test") q = testOrdner();
    else if (l.quelleArt === "ordner") { const h = await ordnerHolen(); if (h && (await erlaubnisPruefen(h as never))) { const k = ausHandle(h as never); if (k.name === l.quelleName) q = k; } }
    else if (l.quelleArt === "nativ") {
      const id = l.merkId || (await nativGemerkt()).find((g) => g.da && g.name === l.quelleName)?.id;
      if (id) q = await nativWieder(id).catch(() => null);
    }
    if (!q) { setMeldung({ text: `Bitte „${l.quelleName}“ noch einmal wählen, wie beim ersten Mal. Die ${l.erledigt.length} schon gelesenen Dateien werden übersprungen.`, art: "halt" }); return; }
    await einlesenAus(q, l.dazu);
  }, [angefangen, einlesenAus]);
  /** Angefangenes Einlesen verwerfen (das bisher Gelesene wird nicht übernommen). */
  const laufVerwerfen = useCallback(async () => { await laufWeg(); setAngefangen(null); setMeldung({ text: "Angefangenes Einlesen verworfen." }); }, [laufWeg]);
  /** B: Laufwerk wählen → Arbeitsordner anlegen; die aktuelle Liste wird dorthin geschrieben (nächstes Speichern). */
  const arbeitEinrichten = useCallback(async () => {
    try {
      const a = await arbeitWaehlen();
      if (!a) return;
      const st = await new ArbeitSpeicher(a).laden().catch(() => null);
      setArbeitFehlt("");
      setArbeit(a);
      if (st && st.dateien.length && !dateien.length) {
        // Vorhandener Arbeitsordner mit Liste (z. B. nach Neuinstallation): übernehmen.
        setDateien(st.dateien); setStufe(st.stufe); setVerlauf(st.verlauf as Korrektur[]); setRegeln(st.regeln as Lernregel[]); setOrdnerName(st.ordnerName); setQuelleArt(st.quelle);
        langeTexte.current = (st.langeTexte as Record<string, string>) || {};
        setMeldung({ text: `Arbeitsordner ${arbeitAnzeige(a)}: ${st.dateien.length} Dateien aus dem gespeicherten Stand übernommen.` });
      } else setMeldung({ text: `Arbeitsordner ist jetzt ${arbeitAnzeige(a)}. Liste, Texte und Sortierung liegen ab jetzt dort.` });
    } catch (e) { setMeldung({ text: arbeitFehler(e), art: "fehler" }); }
  }, [dateien.length]);
  const arbeitAus = useCallback(() => {
    arbeitVergessen(); setArbeit(null); setArbeitFehlt("");
    setMeldung({ text: "Arbeitsordner nicht mehr genutzt. Was dort liegt, bleibt; ab jetzt speichert die App wieder im App-Speicher." });
  }, []);

  const pcOrdnerWieder = useCallback(async () => {
    const h = await ordnerHolen();
    if (!h || !(await erlaubnisPruefen(h as never))) return false;
    await einlesenAus(ausHandle(h as never));
    return true;
  }, [einlesenAus]);

  // Foto / Scan: der fertige Scan kommt als gewöhnliche Datei in den Unterordner „Scans“ des gewählten Ordners (Klaus 17.11.) und
  // zum Bestand dazu. Geht nur, wo der Ordner schreibbar ist (bisher „Ordner am PC“); sonst false – dann bleibt es bei der Kopie.
  const scanZiel = quelle?.ablegen ? `${quelle.name}/${SCAN_ORDNER}` : !quelle && quelleArt === "ordner" && ordnerName && ordnerWahlMoeglich() ? `${ordnerName}/${SCAN_ORDNER}` : "";
  const scanAblegen = useCallback(async (f: File): Promise<boolean> => {
    let q = quelle?.ablegen ? quelle : null;
    if (!q && !quelle && quelleArt === "ordner") {
      // Nach einem Neustart: den gemerkten Ordner still wieder öffnen (wie beim Ansehen des Originals).
      const h = await ordnerHolen();
      if (h && (await erlaubnisPruefen(h as never))) { const k = ausHandle(h as never); if (k.name === ordnerName) q = k; }
    }
    if (!q?.ablegen) return false;
    let qd: QuellDatei;
    try { qd = await q.ablegen(SCAN_ORDNER, f); } catch { return false; }
    await einlesenAus({ art: "auswahl", name: SCAN_ORDNER, dateien: async () => [qd] }, true);
    setMeldung({ text: `Scan gespeichert: ${q.name}/${qd.pfad}` });
    return true;
  }, [quelle, quelleArt, ordnerName, einlesenAus]);

  const naechstes = useCallback((bis?: number) => {
    let s = stufe, d = dateien;
    const ziel = bis ?? Math.min(5, stufe + 1);
    while (s < ziel) {
      stapel.current.push(Object.assign([...d], { stufe: s }));
      s++;
      d = d.map((x) => siebe(x, s, regeln));
      if (s >= 4) d = absenderVereinheitlichen(d);
      // Nach jedem Sieb neu: gleicher Beleg wird erst mit Absender und Nummer sichtbar.
      d = aehnlicheFinden(d);
      const offen = d.filter((x) => istUnsicher(x, s)).length;
      if (bis !== undefined && offen) { setDateien(d); setStufe(s); setMeldung({ text: `Halt bei Sieb ${s}: ${offen} ${offen === 1 ? "Datei" : "Dateien"} bitte prüfen. Danach geht es weiter.`, art: "halt" }); return; }
      if (bis === undefined) { const gesamt = d.filter((x) => offeneFelder(x).length > 0).length; setMeldung(offen ? { text: `Sieb Nr. ${s} ist durchgelaufen: ${offen} neu zu prüfen${gesamt > offen ? `, zusammen mit den früheren ${gesamt} offen` : ""}. Die neuen stehen unten zuerst.`, art: "halt" } : gesamt ? { text: `Sieb Nr. ${s} ist durchgelaufen: nichts Neues zu prüfen, ${gesamt} von früher noch offen.`, art: "halt" } : { text: `Sieb Nr. ${s} ist durchgelaufen: alles sicher.` }); }
    }
    setDateien(d); setStufe(s);
    if (bis !== undefined) setMeldung({ text: "Ganz durchgesiebt. Alles sicher oder von dir bestätigt." });
  }, [stufe, dateien, regeln]);

  const zurueck = useCallback(() => {
    const vorher = stapel.current.pop();
    if (!vorher) return;
    setDateien(vorher); setStufe((s) => vorher.stufe ?? Math.max(1, s - 1));
    setMeldung({ text: "Ein Sieb zurück. Korrekturen aus diesem Sieb sind zurückgenommen." });
  }, []);

  const aendern = useCallback((pfad: string, feld: FeldName, zu: string) => {
    const d = dateien.find((x) => x.pfad === pfad);
    if (!d) return;
    const von = d.felder[feld]?.wert ?? "";
    const k: Korrektur = { zeit: new Date().toISOString(), pfad, feld, von, zu, bestaetigt: von === zu || undefined };
    const neu = korrigiereDatei(d, feld, zu);
    const neueRegeln = lernen(regeln, neu, k);
    setRegeln(neueRegeln);
    setVerlauf((v) => [...v, k]);
    setDateien((alle) => regelnAufAlle(alle.map((x) => x.pfad === pfad ? neu : x), neueRegeln));
  }, [dateien, regeln]);

  // Alles auf einmal übernehmen (Klaus 18.11.: „Was ist, wenn man keine Zeit hat zum Prüfen?“): für jede gewählte Datei wird in jedem
  // offenen Feld der Vorschlag bestätigt – wie „Stimmt“ an der einzelnen Zeile (Verlauf, Lernen). Felder ohne Vorschlag bleiben offen.
  const alleUebernehmen = useCallback((pfade: string[]) => {
    const wahl = new Set(pfade), zeit = new Date().toISOString();
    const neuV: Korrektur[] = [];
    let r = regeln, ohne = 0, stueck = 0;
    const alle = dateien.map((d) => {
      if (!wahl.has(d.pfad)) return d;
      let n = d, etwas = false;
      for (const feld of offeneFelder(d) as FeldName[]) {
        const wert = d.felder[feld]?.wert;
        if (!wert) { ohne++; continue; }
        const k: Korrektur = { zeit, pfad: d.pfad, feld, von: wert, zu: wert, bestaetigt: true };
        n = korrigiereDatei(n, feld, wert); r = lernen(r, n, k); neuV.push(k); etwas = true;
      }
      if (etwas) stueck++;
      return n;
    });
    if (!neuV.length) { setMeldung({ text: "Nichts zu übernehmen: es gibt keinen Vorschlag.", art: "halt" }); return; }
    setRegeln(r); setVerlauf((v) => [...v, ...neuV]); setDateien(regelnAufAlle(alle, r));
    setMeldung({ text: `Vorschlag übernommen bei ${stueck === 1 ? "1 Datei" : `${stueck} Dateien`}${ohne ? ` · ${ohne} ohne Vorschlag ${ohne === 1 ? "bleibt" : "bleiben"} offen` : ""}. Zurücknehmen geht unter „Verlauf“.` });
  }, [dateien, regeln]);

  // Rückgängig: ein Schritt oder mehrere gewählte. Die Datei steht danach wieder bei „bitte prüfen“; von den gelernten Regeln wird nur
  // die Stimme dieses Schritts zurückgenommen (src/verlauf.ts) – was aus anderen, auch aus gelöschten Einträgen gelernt wurde, bleibt.
  const rueckgaengig = useCallback((welche: number | number[]) => {
    const idx = new Set(typeof welche === "number" ? [welche] : welche);
    const weg = verlauf.filter((_, j) => idx.has(j));
    if (!weg.length) return;
    let r = regeln;
    for (const k of weg) { const d = dateien.find((y) => y.pfad === k.pfad); if (d) r = verlernen(r, d, k); }
    // Mehrere Schritte am selben Feld: der Wert vor dem ältesten gilt.
    const zurueckAuf = new Map<string, Korrektur>();
    for (const k of weg) { const s = `${k.pfad}\u0000${k.feld}`; if (!zurueckAuf.has(s)) zurueckAuf.set(s, k); }
    const neu = dateien.map((d) => {
      const hier = [...zurueckAuf.values()].filter((k) => k.pfad === d.pfad);
      if (!hier.length) return d;
      const n: Datei = { ...d, felder: { ...d.felder }, bestaetigt: { ...d.bestaetigt } };
      for (const k of hier) { delete n.bestaetigt![k.feld]; n.felder[k.feld] = { wert: k.von, sicher: false, grund: "zurückgenommen – bitte prüfen", quelle: "regel" }; }
      return n;
    });
    setVerlauf(verlauf.filter((_, j) => !idx.has(j))); setRegeln(r); setDateien(regelnAufAlle(neu, r));
    setMeldung({ text: `${weg.length === 1 ? "1 Schritt" : `${weg.length} Schritte`} rückgängig gemacht. Unter „Sortieren“ ${weg.length === 1 ? "steht die Datei" : "stehen die Dateien"} wieder bei „bitte prüfen“.` });
  }, [verlauf, regeln, dateien]);

  // Aus dem Verlauf löschen (Klaus 18.11.): nur der Eintrag verschwindet. Die Sortierung der Dateien und alles Gelernte bleiben.
  const verlaufLoeschen = useCallback((welche: number[]) => {
    const idx = new Set(welche), n = verlauf.filter((_, j) => idx.has(j)).length;
    if (!n) return;
    setVerlauf(verlauf.filter((_, j) => !idx.has(j)));
    setMeldung({ text: `${n === 1 ? "1 Eintrag" : `${n} Einträge`} aus dem Verlauf gelöscht. Die Dateien bleiben sortiert, das Gelernte bleibt.` });
  }, [verlauf]);

  const nummern = useCallback(() => {
    const r = archivnummernVergeben(dateien);
    setDateien(r.dateien);
    setMeldung({ text: r.neu ? `${r.neu} Archivnummern vergeben.` : "Keine neue Datei bereit." });
  }, [dateien]);

  const indexText = useCallback((mitText: boolean) => JSON.stringify(organizerIndex(dateien, regeln, verlauf, heute(), `Datei-Organizer ${FASSUNG}`, mitText), null, 1), [dateien, regeln, verlauf]);
  const indexSichern = useCallback(async (mitText: boolean) => {
    const text = indexText(mitText);
    try {
      if (quelle?.schreiben) { await quelle.schreiben(INDEX_DATEI, text); setMeldung({ text: `${INDEX_DATEI} liegt jetzt im Ordner „${quelle.name}“.` }); }
      else {
        // In der App gibt es kein Herunterladen (WebView): „Speichern unter …“ des Systems.
        const gespeichert = await nativSpeichern(INDEX_DATEI, text);
        if (gespeichert === null) { herunterladen(INDEX_DATEI, text); setMeldung({ text: `${INDEX_DATEI} heruntergeladen. Lege sie in den Ordner neben die Dateien.` }); }
        else setMeldung({ text: gespeichert ? `${INDEX_DATEI} gespeichert. Lege sie in den Ordner neben die Dateien.` : "Nicht gespeichert." });
      }
    } catch (e) { setMeldung({ text: `Speichern nicht möglich: ${(e as Error).message}`, art: "fehler" }); }
  }, [indexText, quelle]);

  const original = useCallback(async (pfad: string): Promise<Blob | null> => {
    // Anhang einer Mail: aus der Mail neu lesen
    const haupt = pfad.split(" › ")[0];
    let q = originale.current.get(haupt) as QuellDatei | undefined;
    if (!q) {
      // Nach einem Neustart (Klaus 16.11.: das Original soll sich ansehen lassen): den gemerkten Ordner ohne Auswahl-Fenster wieder öffnen.
      let wieder: Quelle | null = null;
      try {
        if (quelleArt === "test") wieder = testOrdner();
        else if (quelleArt === "ordner") { const h = await ordnerHolen(); if (h && (await erlaubnisPruefen(h as never))) { const k = ausHandle(h as never); if (k.name === ordnerName) wieder = k; } }
        else if (quelleArt === "nativ") { const id = (await nativGemerkt()).find((g) => g.da && g.name === ordnerName)?.id; if (id) wieder = await nativWieder(id); }
        if (wieder) for (const qd of await wieder.dateien()) if (!originale.current.has(qd.pfad)) originale.current.set(qd.pfad, qd);
      } catch { /* bleibt unerreichbar */ }
      q = originale.current.get(haupt) as QuellDatei | undefined;
    }
    if (!q) return null;
    const bytes = await q.lesen();
    if (haupt === pfad) return new Blob([bytes as BlobPart]);
    const teile = await einlesenTeile(bytes, haupt);
    const a = teile.find((t) => t.pfad === pfad);
    return a ? new Blob([a.daten as BlobPart]) : null;
  }, [quelleArt, ordnerName]);

  // Im Rahmen einer anderen App (src/rahmen.ts): der sortierte Stapel geht samt Index und Originalen direkt an die Hülle.
  // Gesperrtes und Doppeltes gibt der Organizer nicht weiter; Anhänge aus Mails reisen als eigene Dateien mit.
  const uebergeben = useCallback(async (mitText: boolean) => {
    const r = rahmen(); if (!r) return;
    try {
      // Ladeanzeige (0.4.18, Klaus 18.11.: „hat lange gedauert, kein Ladebalken zu sehen“): Datei für Datei, dann das Übergeben selbst.
      const paket: Array<{ pfad: string; datei: File }> = [], fehlen: string[] = [], mit = dateien.filter((d) => !d.auffaellig && !d.doppeltVon);
      setFortschritt({ phase: "uebergeben", fertig: 0, gesamt: mit.length });
      for (const [i, d] of mit.entries()) {
        if (i % 5 === 0) { setFortschritt({ phase: "uebergeben", fertig: i, gesamt: mit.length, name: d.name }); await luft(); }
        const b = await original(d.pfad).catch(() => null);
        if (b) paket.push({ pfad: d.pfad, datei: new File([b], d.name, { lastModified: d.geaendert || Date.now() }) }); else fehlen.push(d.pfad);
      }
      if (!paket.length) { setMeldung({ text: fehlen.length ? "Die Originale sind nicht mehr erreichbar. Bitte den Ordner noch einmal wählen." : "Nichts zum Übergeben.", art: "fehler" }); return; }
      setFortschritt({ phase: "uebergeben", fertig: 0, gesamt: 0, name: r.name }); await luft();
      const a = await r.uebergeben({ ordner: ordnerName || "Datei-Organizer", index: indexText(mitText), dateien: paket, fehlen });
      setFortschritt(null);
      setMeldung(a.ok ? { text: a.text || `${paket.length} ${paket.length === 1 ? "Datei" : "Dateien"} an die ${r.name} übergeben.${fehlen.length ? ` ${fehlen.length} nicht erreichbar.` : ""}` } : { text: a.text || "Die Übergabe wurde nicht angenommen.", art: "fehler" });
    } catch (e) { setMeldung({ text: `Übergabe nicht möglich: ${(e as Error).message}`, art: "fehler" }); } finally { setFortschritt((f) => (f?.phase === "uebergeben" ? null : f)); }
  }, [dateien, indexText, original, ordnerName]);

  const neuBeginnen = useCallback(async () => {
    await loeschen(); stapel.current = []; originale.current.clear(); setAngefangen(null);
    setDateien([]); setStufe(0); setVerlauf([]); setRegeln([]); setOrdnerName(""); setQuelleArt(""); setQuelle(null); setMeldung({ text: "Alles zurückgesetzt. Die Originale im Ordner sind unverändert." });
  }, []);

  // Leeren nach dem Weitergeben: Dateiliste, Verlauf und gemerkter Ordner weg; Gelerntes (Regeln) bleibt. Der Organizer liest nur –
  // an den Originalen und am Ordner selbst wird nichts geändert oder gelöscht (auch die Index-Datei im Ordner bleibt).
  const leeren = useCallback(async () => {
    const n = dateien.length;
    await loeschen(); stapel.current = []; originale.current.clear(); setAngefangen(null);
    setDateien([]); setStufe(0); setVerlauf([]); setOrdnerName(""); setQuelleArt(""); setQuelle(null);
    setMeldung({ text: `Organizer geleert: ${n} Dateien aus der Liste genommen. Die Originale und der Ordner sind unverändert${regeln.length ? `; ${regeln.length} gelernte Regeln bleiben` : ""}.` });
  }, [dateien.length, regeln.length]);

  // Doppelte: welche Datei bleibt, entscheidet der Nutzer (Haken je Paar, „Alle: ältere/jüngere“); die Wahl wird gemerkt.
  const behalten = useCallback((auswahl: Array<{ sha: string; pfad: string }>, was?: string) => {
    for (const a of auswahl) doppeltWahl.current[a.sha] = a.pfad;
    try { localStorage.setItem(DOPPELT_SCHLUESSEL, JSON.stringify(doppeltWahl.current)); } catch { /* ohne Speicher gilt die Wahl bis zum Schließen */ }
    stapel.current.push(Object.assign([...dateien], { stufe }));
    let d = doppelteMarkieren(dateien.map((x) => ({ ...x, doppeltVon: undefined })), doppeltWahl.current);
    // die jetzt behaltene Datei war gesperrt und hat die Siebe noch nicht gesehen: bis zum heutigen Stand nachholen
    d = d.map((x) => !x.doppeltVon && x.stufe < stufe ? siebe(x, stufe, regeln) : x);
    if (stufe >= 4) d = absenderVereinheitlichen(d);
    setDateien(d);
    setMeldung({ text: was || "Gemerkt: diese Datei wird behalten, die andere gilt als Kopie. „Zurück“ auf der Seite Sortieren macht es rückgängig." });
  }, [dateien, stufe, regeln]);

  // Einzelne Dateien oder einen ganzen Ordner aus dem Organizer nehmen. Nur die Liste ändert sich – die Originale bleiben, wo sie sind.
  const entfernen = useCallback((pfade: string[], was?: string) => {
    const weg = new Set(pfade);
    const bleibt = dateien.filter((d) => !weg.has(d.pfad) && !weg.has(d.pfad.split(" › ")[0]));
    const n = dateien.length - bleibt.length;
    if (!n) return;
    stapel.current.push(Object.assign([...dateien], { stufe }));
    setDateien(doppelteMarkieren(bleibt.map((d) => ({ ...d, doppeltVon: undefined })), doppeltWahl.current));
    setMeldung({ text: `${was || (n === 1 ? "1 Datei" : `${n} Dateien`)} aus dem Organizer genommen. ${n === 1 ? "Das Original ist" : "Die Originale sind"} unverändert. „Zurück“ auf der Seite Sortieren holt sie wieder.` });
  }, [dateien, stufe]);

  return { dateien, stufe, verlauf, regeln, ordnerName, quelleArt, quelle, meldung, setMeldung, fortschritt, einlesenAus, scanZiel, scanAblegen, angefangen, anhalten, weitermachen, laufVerwerfen, leistung, arbeit, arbeitFehlt, arbeitEinrichten, arbeitAus, pcOrdnerWieder, naechstes, zurueck, aendern, alleUebernehmen, rueckgaengig, verlaufLoeschen, nummern, indexSichern, indexText, uebergeben, original, neuBeginnen, leeren, entfernen, behalten, ordnerMerken, kannZurueck: () => stapel.current.length > 0 };
}

async function einlesenTeile(bytes: Uint8Array, pfad: string) {
  const m = leseEml(new TextDecoder().decode(bytes));
  return m.anhaenge.map((a) => ({ pfad: `${pfad} › ${a.name}`, daten: a.daten }));
}

// Ladebalken: oben im Kopf (auf jeder Seite sichtbar) und in der Ordner-Karte. Ohne bekannte Zahl läuft ein Streifen.
export function Ladebalken({ f, oben, anhalten }: { f: Fortschritt | null; oben?: boolean; anhalten?: () => void }) {
  if (!f) return null;
  const offen = (f.phase !== "lesen" && f.phase !== "uebergeben") || !f.gesamt, pz = offen ? 0 : Math.round((100 * f.fertig) / f.gesamt);
  const text = f.phase === "stand" ? "Gemerkte Sortierung wird geladen …" : f.phase === "suchen" ? `Ordner${f.name ? ` „${f.name}“` : ""} wird durchgesehen …` : f.phase === "uebergeben" ? (f.gesamt ? `${f.fertig} von ${f.gesamt} Dateien für die Übergabe vorbereitet · ${pz} %` : `Wird an die ${f.name || "App"} übergeben …`) : `${f.fertig} von ${f.gesamt} Dateien gelesen · ${pz} %`;
  return <div className={`ladeanzeige ${oben ? "oben" : ""}`} data-ladeanzeige={f.phase}>
    <div className={`fortschritt ${offen ? "offen" : ""}`} role="progressbar" aria-label="Laden" {...(offen ? {} : { "aria-valuemin": 0, "aria-valuemax": f.gesamt, "aria-valuenow": f.fertig })}><span style={offen ? undefined : { width: `${pz}%` }}/></div>
    <p className="leise" aria-live="polite"><span>{text}</span>{f.phase === "lesen" && f.name && <span className="lade-name">{f.name}</span>}</p>
    {anhalten && f.phase === "lesen" && <button type="button" className="button" data-anhalten title="Nach der aktuellen Datei anhalten. Der Stand bleibt gemerkt; „Weitermachen“ liest später nur den Rest." onClick={anhalten}>Anhalten</button>}
  </div>;
}

// Aktualisieren: neueste Fassung holen (Service-Worker fragen), dann neu laden. Die Sortierung liegt gemerkt im Browser.
async function aktualisieren(laeuft: boolean) {
  if (laeuft && !confirm("Das Einlesen läuft noch. Trotzdem neu laden? Der Ordner muss danach noch einmal gewählt werden.")) return;
  await new Promise((r) => setTimeout(r, 450)); // gemerkten Stand noch wegschreiben lassen
  try { const r = await navigator.serviceWorker?.getRegistration(); await r?.update(); } catch { /* ohne Netz: nur neu laden */ }
  location.reload();
}

// Update-Fähnchen: fragt beim Start, beim Zurückholen der App und stündlich nach version.json (liegt neben der Seite, nie aus dem Vorrat).
// Steht dort eine andere Fassung als diese, erscheint das Fähnchen neben der Fassungsnummer – ein Tipp aktualisiert.
// In der App (Datei-Organizer Pro) fragt stattdessen useNativesUpdate den eigenen Update-Server.
function useNeueFassung() {
  const [neu, setNeu] = useState("");
  useEffect(() => {
    if (istNativ()) return;
    let weg = false;
    const pruefen = async () => {
      if (navigator.onLine === false) return;
      try {
        const r = await fetch(`./version.json?t=${Date.now()}`, { cache: "no-store" });
        const f = r.ok ? String((await r.json()).fassung || "") : "";
        if (!weg && /^\d+\.\d+\.\d+$/.test(f)) setNeu(f !== FASSUNG ? f : "");
      } catch { /* ohne Netz: kein Fähnchen */ }
    };
    void pruefen();
    const sicht = () => { if (document.visibilityState === "visible") void pruefen(); };
    document.addEventListener("visibilitychange", sicht);
    const takt = setInterval(pruefen, 60 * 60 * 1000);
    return () => { weg = true; document.removeEventListener("visibilitychange", sicht); clearInterval(takt); };
  }, []);
  return neu;
}

// Update-Fähnchen der App (Datei-Organizer Pro): still beim Start, beim Zurückholen, höchstens stündlich (src/nativ.ts).
// Tipp auf Fähnchen oder Fassung lädt direkt und öffnet Androids Installieren-Fenster; aktuell → kurze Meldung; ohne Netz → still.
function useNativesUpdate() {
  const api = useMemo(() => nativeUpdates(), []);
  const [neu, setNeu] = useState("");
  const [prozent, setProzent] = useState<number | null>(null);
  const [hinweis, setHinweis] = useState("");
  useEffect(() => {
    if (!api) return;
    let weg = false;
    const still = async () => { const v = await stillPruefen(api, FASSUNG); if (!weg && v !== null) setNeu(v); };
    const start = setTimeout(() => void still(), 2500);
    const sicht = () => { if (document.visibilityState === "visible") void still(); };
    document.addEventListener("visibilitychange", sicht);
    const takt = setInterval(still, 15 * 60 * 1000);
    return () => { weg = true; clearTimeout(start); document.removeEventListener("visibilitychange", sicht); clearInterval(takt); };
  }, [api]);
  useEffect(() => { if (!hinweis) return; const t = setTimeout(() => setHinweis(""), 4500); return () => clearTimeout(t); }, [hinweis]);
  const laden = useCallback(async () => {
    if (!api || prozent !== null) return;
    setProzent(0);
    try { const satz = await direktLaden(api, FASSUNG, setProzent); if (satz) setHinweis(satz); if (/^Aktuelle Fassung/.test(satz)) setNeu(""); }
    finally { setProzent(null); }
  }, [api, prozent]);
  return { nativ: !!api, neu, prozent, hinweis, laden };
}

export function App() {
  const z = useOrganizer();
  const neueFassung = useNeueFassung();
  const upd = useNativesUpdate();
  const [seite, setSeite] = useState<SeitenId>(seiteAusHash);
  // Eigener Weg durch die Seiten: „Zurück“ in der Seitenleiste gibt es nur, wenn es in der App eine Seite davor gibt (verlässt die App nie).
  // Ein Wechsel auf die Seite davor – auch über die Zurück-Taste des Geräts – nimmt den letzten Schritt wieder weg.
  const weg = useRef<string[]>([seiteAusHash()]);
  const [schritte, setSchritte] = useState(0);
  useEffect(() => { const f = () => {
    const s = seiteAusHash(), w = weg.current;
    if (w.length > 1 && w[w.length - 2] === s) w.pop(); else if (w[w.length - 1] !== s) w.push(s);
    setSchritte(w.length - 1); setSeite(s);
  }; window.addEventListener("hashchange", f); return () => window.removeEventListener("hashchange", f); }, []);
  const gehe = useCallback((s: SeitenId) => { location.hash = s; setSeite(s); window.scrollTo({ top: 0 }); }, []);
  const imRahmen = !!rahmen();
  const offen = useMemo(() => z.dateien.filter((d) => offeneFelder(d).length > 0).length, [z.dateien]);
  const [ziel, setZiel] = useState<FindenZiel>(null);
  // Handy (Klaus 17.11.): die runden Knöpfe des Kopfs stecken hinter einem Pfeil, damit der Kopf zwei Zeilen hoch bleibt.
  const [mehr, setMehr] = useState(false);
  const installBar = useSyncExternalStore(installHoeren, installMoeglich);
  const offenZumDruck = useSyncExternalStore(druckZielHoeren, druckZiel), [drucktGerade, setDrucktGerade] = useState(false);
  const oeffne = useCallback((sicht: string, knoten?: string) => { setZiel({ sicht, knoten, nr: Date.now() }); gehe("finden"); }, [gehe]);
  const props = { z, gehe, oeffne, ziel };
  // Leiste oben einklappbar (Klaus 18.11.2026, Organizer in der Privaten Akte: „die Navi-Leiste mit einem Klick einklappbar; im Handyformat
  // nur das Flying Widget“). Nur im Rahmen einer anderen App: ab Werk am Handy (unter 700 px) zu – die Seiten stehen in der Seitenleiste –,
  // am breiten Bildschirm offen; die eigene Wahl wird gemerkt (`do-nav-zu`). Zu: nur ein kleiner Pfeil oben rechts holt die Leiste zurück.
  const [navZu, setNavZuRoh] = useState(() => { if (!imRahmen) return false; try { const w = localStorage.getItem("do-nav-zu"); if (w === "1" || w === "0") return w === "1"; } catch { /* Werkseinstellung */ } return window.innerWidth < 700; });
  const setNavZu = (zu: boolean) => { setNavZuRoh(zu); setMehr(false); try { localStorage.setItem("do-nav-zu", zu ? "1" : "0"); } catch { /* gilt bis zum Neuladen */ } };
  return <div className={`app-shell${imRahmen ? " im-rahmen" : ""}${navZu ? " nav-zu" : ""}`} data-im-rahmen={imRahmen || undefined}>
    {navZu && <button type="button" className="nav-auf" aria-label="Leiste oben zeigen" title="Leiste oben zeigen" data-nav-auf onClick={() => setNavZu(false)}><ChevronDown size={18}/></button>}
    <header className="site-header">
      <div className="masthead">
        <div className="marke" data-variante={APP_VARIANTE}>
        <button type="button" className="site-brand" onClick={() => gehe("ordner")} aria-label={`${APP_NAME} – zum Ordner`}>
          <span className={`brand-symbol ${APP_VARIANTE === "Basic" ? "basic" : ""}`} data-kopf-symbol={APP_VARIANTE}><FolderTree size={24}/></span>
          <span><strong data-app-name>Datei-Organizer <span className="variante">{APP_VARIANTE}</span></strong></span>
        </button>
        {/* Klaus 16.11.: Fassung (Link fürs Update) und Fähnchen beim Namen; seit 17.11. flach unter dem Namen (`.marke`). */}
        <div className="fassung-platz" data-fassung-platz>
          {upd.nativ && upd.neu && <button type="button" className="update-fahne" data-update-fahne data-nativ title={`Update ${upd.neu} steht bereit. Antippen lädt und installiert.`} onClick={() => void upd.laden()}><Download size={14}/>{upd.prozent !== null ? `Lädt ${upd.prozent} %` : `Update ${upd.neu}`}</button>}
          {upd.nativ && <button type="button" className="fassung-knopf" data-fassung-knopf title="Fassung – antippen sucht ein Update und installiert es" onClick={() => void upd.laden()}>{upd.prozent !== null && !upd.neu ? `${upd.prozent} %` : `V ${FASSUNG}`}</button>}
          {/* Web-App (Klaus 17.11.: unter dem Namen kein langer Text, nur die Nummer als Knopf): antippen holt die neueste Fassung. */}
          {!upd.nativ && <button type="button" className="fassung-knopf" data-fassung-knopf title="Aktualisieren" onClick={() => void aktualisieren(!!z.fortschritt && z.fortschritt.phase !== "stand")}>V {FASSUNG}</button>}
          {!upd.nativ && installBar && <button type="button" className="fassung-knopf install-knopf" data-installieren title="Als App installieren" onClick={() => void installieren()}><Download size={12}/>Installieren</button>}
          {neueFassung && <button type="button" className="update-fahne" data-update-fahne title={`Fassung ${neueFassung} steht bereit. Tippen aktualisiert; die Sortierung bleibt gemerkt.`} onClick={() => void aktualisieren(!!z.fortschritt && z.fortschritt.phase !== "stand")}><RefreshCw size={14}/>Update {neueFassung}</button>}
        </div>
        </div>
        <div className={`header-actions ${mehr ? "offen" : ""}`} data-kopf-knoepfe onClick={() => setMehr(false)}>
          {(() => { const pille = z.fortschritt && z.fortschritt.phase !== "stand" ? "Wird geladen …" : z.ordnerName ? `${z.ordnerName} · ${z.dateien.length}` : "Kein Ordner";
            // aria-label = sichtbarer Text: Android liest sonst nur den Tooltip (Name ohne Anzahl) – Vorleser und Emulator-Probe der APK.
            // Ohne Ordner keine Pille (Klaus 17.11.: „man merkt ja, ob man keinen Ordner drin hat“).
            return pille === "Kein Ordner" ? null : <span className={`ordner-pill ${z.ordnerName ? "verbunden" : ""}`} data-ordner-pill title={z.ordnerName} aria-label={pille}>{pille}</span>; })()}
          {/* Drucker (Klaus 17.11., zuerst nur Web-App): druckt die gerade geöffnete Datei über das Druckfenster des Geräts; ohne offene Datei ausgegraut. */}
          {!istNativ() && <button type="button" className="info-knopf" aria-label={offenZumDruck ? `Drucken: ${offenZumDruck.name}` : "Drucken"} title={offenZumDruck ? `Drucken: ${offenZumDruck.name}` : "Drucken"} data-drucken disabled={drucktGerade}
            onClick={() => { const zi = offenZumDruck; if (!zi) { window.print(); return; } /* ohne offene Datei: die Seite, wie sie ist (Klaus 17.11.) */ setDrucktGerade(true); void drucken(zi).then((f) => { if (f) z.setMeldung({ text: f, art: "halt" }); }).finally(() => setDrucktGerade(false)); }}><Printer size={18}/></button>}
          <button type="button" className="info-knopf" aria-label="Aktualisieren" title="Aktualisieren: App neu laden (neueste Fassung). Die Sortierung bleibt gemerkt." data-aktualisieren onClick={() => void aktualisieren(!!z.fortschritt && z.fortschritt.phase !== "stand")}><RefreshCw size={18}/></button>
          <button type="button" className={`info-knopf ${seite === "landkarte" ? "aktiv" : ""}`} aria-label="Landkarte und Dashboard" title="Landkarte und Dashboard: was sortiert wurde, wohin es geht, wie die App arbeitet" onClick={() => gehe("landkarte")} data-landkarte-knopf><KarteSymbol size={18}/></button>
          <a className="info-knopf" href="discovery.html" aria-label="Discovery" title="Discovery: so wurde der Sortier-Kern trainiert – Test-Welten, Kugeln, Filme mit Ton" data-discovery-knopf><Telescope size={18}/></a>
          <button type="button" className="info-knopf" aria-label="Suchen" onClick={() => gehe("finden")}><Search size={18}/></button>
        </div>
        <button type="button" className={`info-knopf mehr-knopf ${mehr ? "aktiv" : ""}`} aria-label="Weitere Knöpfe" aria-expanded={mehr} title="Weitere Knöpfe" data-mehr-knopf onClick={() => setMehr(!mehr)}><ChevronDown size={18}/></button>
        {imRahmen && <button type="button" className="info-knopf nav-zu-knopf" aria-label="Leiste einklappen" title="Leiste einklappen" data-nav-klapp onClick={() => setNavZu(true)}><ChevronUp size={18}/></button>}
      </div>
      <nav className="main-navigation" aria-label="Bereiche">
        {SEITEN.map((s) => <button key={s.id} type="button" className={seite === s.id ? "active" : ""} aria-current={seite === s.id ? "page" : undefined} onClick={() => gehe(s.id)} data-nav={s.id}>
          <s.symbol size={16}/>{s.name}{s.id === "sortieren" && offen > 0 && <span className="zahl" aria-label={`${offen} bitte prüfen`}>{offen}</span>}
        </button>)}
      </nav>
      <Ladebalken f={z.fortschritt} oben/>
    </header>
    {upd.hinweis && <div className="update-meldung" role="status" data-update-meldung>{upd.hinweis}</div>}
    <main className="site-main" id="inhalt">
      {seite === "ordner" && <OrdnerSeite {...props}/>}
      {seite === "sortieren" && <SortierenSeite {...props}/>}
      {seite === "finden" && <FindenSeite {...props}/>}
      {seite === "verlauf" && <VerlaufSeite {...props}/>}
      {seite === "akte" && <AkteSeite {...props}/>}
      {seite === "hilfe" && <HilfeSeite {...props}/>}
      {seite === "landkarte" && <LandkarteSeite {...props}/>}
    </main>
    <Seitenleiste seite={seite} seiten={SEITEN} gehe={gehe} fassung={FASSUNG} zurueck={schritte > 0 ? () => history.back() : undefined}/>
    {/* Fuß (Klaus 18.11.2026): nur eine schmale Zeile – Family-Projekt, Name und Fassung, die rechtlichen Seiten und die Hilfe.
        Der große Fuß mit „Arbeiten / Weitergeben“ ist heraus; dieselben Wege stehen oben in der Leiste und in der Seitenleiste. */}
    <footer className="site-footer" data-fuss>
      <span>Family-Projekt · {APP_NAME} {FASSUNG}</span>
      <nav aria-label="Rechtliches">
        <a href="./datenschutz.html#impressum">Impressum</a>
        <a href="./datenschutz.html#datenschutz">Datenschutz</a>
        <a href="./datenschutz.html#haftung">Haftungsausschluss</a>
        <a href="./datenschutz.html#lizenz">Lizenz</a>
        <button type="button" onClick={() => gehe("hilfe")}>Hilfe</button>
      </nav>
    </footer>
  </div>;
}
