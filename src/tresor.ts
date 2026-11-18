// Brücke zwischen der Hülle (app.js) und dem unveränderten Tresor der Familienakte (klone/familienakte).
// Hier steht keine eigene Speicherlogik: jede Funktion reicht nur an den Klon weiter.
import { browserVault, browserStorageKind, listLocalDocuments, saveLocalDocument, readLocalDocumentFile, dokumenteAussortieren, LIMITS,
  getVaultSummary, sicherungsOrdnerWaehlbar, chooseExportDestination, writeFullFamilyBackup, sicherungArt, sicherungProben, sicherungEinlesen } from "../klone/familienakte/app/local-vault.ts";
import { passwortPruefen, notfallblattText, PASSWORT_MINDESTLAENGE } from "../klone/familienakte/lib/sicherung-krypto.ts";
import { FAMILY_CATEGORIES } from "../klone/familienakte/lib/family-categories.ts";
import { interpretFamilySearchQuery, hasFamilySearchContent, scoreFamilySearchText, normalizeFamilySearch } from "../klone/familienakte/lib/family-search.ts";
import { textLesen, textGemerkt, istBild, istPdf, leseLage, leseLageSetzen, pdfSeitenText } from "./text-lesen.ts";
import { loadPdfJs } from "./pdf-ersatz.ts";
import { organizerUebernahme, organizerSchluessel, ORGANIZER_INDEX, ORGANIZER_INDEX_MAX } from "../klone/familienakte/lib/organizer-uebernahme.ts";
import { familyDocumentSearchText } from "../klone/familienakte/lib/family-search-text.ts";
import { browserModelle, browserModelleMoeglich } from "../klone/familienakte/app/browser-modelle.ts";
import { MeaningRuntime, MEANING_MODELS, browserModelleEinhaengen } from "../klone/familienakte/app/private-meaning-runtime.ts";
import { meaningSections } from "../klone/familienakte/app/private-meaning-index.ts";
import "../klone/sage-protokol/src/modules/04_match.js"; // registriert window.SbkimMatch (Sage-Protokol Modul 04, unverändert)
import { readMeaningCorpus } from "../klone/familienakte/app/private-meaning-corpus.ts";
import { createDictationSession, speechConstructor, microphoneBlockedReason } from "../klone/familienakte/lib/browser-dictation.ts";

const tresor = {
  bereiche: [...FAMILY_CATEGORIES],
  hoechstBytes: LIMITS.documentBytes,
  speicherArt: () => browserStorageKind(),
  /** Was in der Akte liegt; Herausgenommenes (im Klon „aussortiert“) wird nicht gezeigt. */
  async liste() { return (await listLocalDocuments(await browserVault())).filter((d) => !d.aussortiert); },
  /** `text` = der beim Ablegen gelesene Inhalt; der Klon speichert ihn als Textauszug an der Unterlage (höchstens 20.000 Zeichen). */
  async ablegen(datei: File, angaben: { bereich: string; datum: string | null; titel: string | null; notiz: string | null; text?: string | null }) {
    return saveLocalDocument(await browserVault(), datei, { category: angaben.bereich, documentDate: angaben.datum, notes: angaben.notiz, titel: angaben.titel, textAuszug: angaben.text || null });
  },
  /** Liest den Text einer Datei vor dem Ablegen: Textebene des PDF, sonst Texterkennung (Fotos, Scans). Auf dem Gerät. */
  textLesen: (datei: File) => textLesen(datei),
  textLesbar: (datei: File) => istBild(datei) || istPdf(datei),
  /** Für den Leser: das geöffnete PDF (pdf.js des Klons) und der Text je Seite (klein geschrieben; null = kein PDF). */
  async pdf(id: string) {
    const datei = await readLocalDocumentFile(await browserVault(), id); if (!istPdf(datei)) return null;
    return (await loadPdfJs()).getDocument({ data: new Uint8Array(await datei.arrayBuffer()) }).promise;
  },
  seitenText: (id: string) => seitenVon(id),
  inhaltsWoerter: (frage: string) => teilWoerter(frage),
  async datei(id: string) { return readLocalDocumentFile(await browserVault(), id); },
  async herausnehmen(id: string) { return dokumenteAussortieren(await browserVault(), [id]); },
};

// Tresor exportieren / importieren: die Vollsicherung der Familienakte, unverändert. Der Ordner auf dem Gerät, der SD-Karte oder
// dem Stick wird vom Nutzer gewählt; mit Passwort ist er verschlüsselt. Eine Familienakte kann ihn genauso einlesen.
type Zugang = { passwort?: string; notfall?: string };
const BACKUP_PRAEFIX = "Privatakte_Backup_";
/** Legt am gewählten Ort „Privatakte_Backup_<Datum>_<Uhrzeit>“ an (Ortszeit); ist der Name vergeben, mit _2, _3 … */
async function backupOrdnerAnlegen(ziel: FileSystemDirectoryHandle) {
  const d = new Date(), z = (n: number) => String(n).padStart(2, "0");
  const grund = `${BACKUP_PRAEFIX}${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}_${z(d.getHours())}-${z(d.getMinutes())}-${z(d.getSeconds())}`;
  for (let i = 1; ; i++) {
    const name = i === 1 ? grund : `${grund}_${i}`;
    try { await ziel.getDirectoryHandle(name); } catch { return ziel.getDirectoryHandle(name, { create: true }); }
  }
}
let importOrdner: FileSystemDirectoryHandle | null = null;
const sicherung = {
  ordnerWaehlbar: () => sicherungsOrdnerWaehlbar(),
  passwortMindestens: PASSWORT_MINDESTLAENGE,
  passwortPruefen: (passwort: string) => passwortPruefen(passwort),
  /** Fragt nach dem Zielordner und schreibt die Sicherung hinein. `fassung` steht im Kopf der Sicherung und auf dem Notfallblatt. */
  async exportieren(passwort: string | null, fassung: string) {
    const ziel = await chooseExportDestination("Wohin soll das Backup?");
    // Der Ordner am gewählten Ort heißt nach dieser App (Klaus 17.11.: von der Familienakte unterscheidbar). Darin liegt die
    // unveränderte Vollsicherung des Klons unter ihrem eigenen Namen – so kann auch die Familienakte sie einlesen.
    const aussen = await backupOrdnerAnlegen(ziel);
    const r = await writeFullFamilyBackup({ destination: aussen, source: await browserVault(), appVersion: fassung, passwort });
    return { ziel: ziel.name, ordner: aussen.name, dateien: r.manifest.files.length, erstellt: r.manifest.createdAt, notfall: r.notfall ?? null,
      notfallblatt: r.notfall ? notfallblattText({ notfall: r.notfall, createdAt: r.manifest.createdAt, ordner: aussen.name, appVersion: fassung }) : null };
  },
  /** Fragt nach dem Ordner mit der Sicherung und sagt, was dort liegt. Geschrieben wird nichts. */
  async importWaehlen() {
    const gewaehlt = await chooseExportDestination("Wo liegt das Backup?");
    // Gewählt werden darf der Backup-Ordner selbst oder der Ordner darüber (dann das jüngste „Privatakte_Backup_…“ darin).
    const namen: string[] = [];
    for await (const e of (gewaehlt as unknown as { values(): AsyncIterable<{ kind: string; name: string }> }).values()) if (e.kind === "directory" && e.name.startsWith(BACKUP_PRAEFIX)) namen.push(e.name);
    namen.sort();
    importOrdner = namen.length ? await gewaehlt.getDirectoryHandle(namen[namen.length - 1]) : gewaehlt;
    const art = await sicherungArt(importOrdner);
    return importOrdner.name.startsWith(BACKUP_PRAEFIX) ? { ...art, name: importOrdner.name } : art;
  },
  /** Probe ohne Schreiben: jede Datei wird gelesen und mit ihrer Prüfsumme verglichen. */
  async importPruefen(zugang?: Zugang) { if (!importOrdner) throw new Error("Bitte zuerst den Ordner wählen."); return sicherungProben(importOrdner, await browserVault(), zugang); },
  /** Liest die geprüfte Sicherung ein. Leere Akte: alles kommt herein. Volle Akte: zusammenführen, bei Widerspruch bleibt die Fassung hier. */
  async importieren(zugang?: Zugang, revision?: number) { if (!importOrdner) throw new Error("Bitte zuerst den Ordner wählen."); return sicherungEinlesen(importOrdner, await browserVault(), {}, revision, zugang); },
};
// Ordner aus dem Datei-Organizer (Klaus 17.11.: große Mengen werden dort gelesen, sortiert und angelernt, die Akte übernimmt den
// fertigen Ordner). Die Einordnung liest die Familienakte unverändert (lib/organizer-uebernahme.ts: Bereich, Art, Hinweis, Doppelte,
// Gesperrtes). Zusätzlich hier aus demselben Index: Datum und der dort gelesene Text – er wird der Textauszug der Unterlage, damit
// die Akte nicht noch einmal lesen muss. Nur Dateien direkt im Ordner. Ohne Index ist es ein einfacher Stapel ohne Einordnung.
type OrdnerStueck = { name: string; groesse: number; bereich: string; neuerBereich: boolean; art: string; datum: string | null; hinweis: string; warnung: string; doppelt: boolean; text: string };
let organizerOrdner: { hole: (name: string) => Promise<File>; stuecke: OrdnerStueck[] } | null = null;
const MIME: Record<string, string> = { pdf: "application/pdf", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif", txt: "text/plain", eml: "message/rfc822" };
/** Der Organizer übergibt Dateien ohne Typ; der Tresor und das Lesen erkennen ihn dann an der Endung. */
const mitTyp = (f: File) => f.type ? f : new File([f], f.name, { type: MIME[(f.name.split(".").pop() || "").toLowerCase()] || "", lastModified: f.lastModified });
function organizerStapel(ordner: string, indexText: string | null, liste: Array<{ name: string; size: number }>, hole: (name: string) => Promise<File>) {
  const u = indexText ? organizerUebernahme(indexText, liste, [...FAMILY_CATEGORIES]) : null;
  const roh = new Map<string, { datum?: unknown; text?: unknown }>();
  if (u?.ok && indexText) for (const e of (JSON.parse(indexText) as { dateien: Array<{ pfad?: unknown; groesse?: unknown; datum?: unknown; text?: unknown }> }).dateien)
    if (e && typeof e.pfad === "string" && typeof e.groesse === "number") roh.set(organizerSchluessel({ name: e.pfad, size: e.groesse }), e);
  const fest = new Set(FAMILY_CATEGORIES.map((b) => b.toLocaleLowerCase("de")));
  const stuecke = liste.sort((a, b) => a.name.localeCompare(b.name, "de")).map((f): OrdnerStueck => {
    const k = organizerSchluessel(f), v = u?.vorschlaege.get(k), r = roh.get(k), d = typeof r?.datum === "string" && /^\d{4}-\d{2}-\d{2}/.test(r.datum) ? r.datum.slice(0, 10) : null;
    const bereich = v?.vorschlag.lebensbereich || "";
    return { name: f.name, groesse: f.size, bereich, neuerBereich: !!bereich && !fest.has(bereich.toLocaleLowerCase("de")), art: v?.vorschlag.dokumentart || "", datum: d,
      hinweis: v?.vorschlag.hinweis || "", warnung: v?.hinweis || "", doppelt: !!u?.doppelt.has(k), text: typeof r?.text === "string" ? r.text.slice(0, 20000) : "" };
  });
  organizerOrdner = { hole, stuecke };
  return { ordner, index: !!u?.ok, grund: indexText ? u?.grund || "" : "", stuecke: stuecke.map(({ text, ...s }) => ({ ...s, text: text.length > 0 })) };
}
const organizer = {
  async waehlen() {
    const handle = await chooseExportDestination("Welcher Ordner soll in die Akte?");
    const dateien: File[] = []; let indexText: string | null = null;
    for await (const e of (handle as unknown as { values: () => AsyncIterable<{ kind: string; name: string; getFile: () => Promise<File> }> }).values()) {
      if (e.kind !== "file" || e.name.startsWith(".")) continue;
      const f = await e.getFile();
      if (e.name === ORGANIZER_INDEX) { if (f.size <= ORGANIZER_INDEX_MAX) indexText = await f.text(); } else dateien.push(f);
    }
    return organizerStapel(handle.name, indexText, dateien.map((f) => ({ name: f.name, size: f.size })), async (name) => (await handle.getFileHandle(name)).getFile());
  },
  /** Direkte Übergabe aus dem Datei-Organizer im Rahmen (0.5.0): Index als Text und die Originale als Dateien, ohne Ordnerwahl.
   *  `pfad` ist der Name im Index (auch aus Unterordnern oder Anhang einer Mail); abgelegt wird unter dem Dateinamen. */
  ausStapel(ordner: string, indexText: string, dateien: Array<{ pfad: string; datei: File }>) {
    // Die Übernahme des Klons nimmt nur Dateien direkt im Ordner (Pfad ohne Schrägstrich). Bei der direkten Übergabe liegen die
    // Dateien aber vor – der Pfad wird darum für Index und Liste gleich „flach“ geschrieben (∕ statt /), dann greift die Einordnung
    // auch für Unterordner (0.5.1; in 0.5.0 kamen sie ohne Bereich an). Angezeigt wird wieder der echte Pfad.
    const flach = (p: string) => p.replace(/[\\/]/g, "∕");
    let text: string | null = indexText.length <= ORGANIZER_INDEX_MAX ? indexText : null;
    if (text) try {
      const j = JSON.parse(text) as { dateien?: Array<Record<string, unknown>> };
      if (Array.isArray(j.dateien)) { for (const e of j.dateien) if (e && typeof e === "object") { if (typeof e.pfad === "string") e.pfad = flach(e.pfad); if (typeof e.doppeltVon === "string") e.doppeltVon = flach(e.doppeltVon); } text = JSON.stringify(j); }
    } catch { /* unlesbar: die Übernahme sagt es */ }
    const nach = new Map(dateien.filter((x) => x && typeof x.pfad === "string" && x.datei instanceof File).map((x) => [flach(x.pfad), mitTyp(x.datei)]));
    return organizerStapel(ordner, text, [...nach].map(([pfad, f]) => ({ name: pfad, size: f.size })), async (name) => { const f = nach.get(name); if (!f) throw new Error("Datei fehlt in der Übergabe."); return f; });
  },
  /** Legt die genannten Dateien ab (Bereich je Datei wie übergeben). Fehlt der Text aus dem Organizer, liest die Akte selbst. */
  async uebernehmen(auswahl: Array<{ name: string; bereich: string }>, fortschritt?: (fertig: number, gesamt: number, name: string) => void) {
    if (!organizerOrdner) throw new Error("Bitte zuerst den Ordner wählen.");
    const aus = { abgelegt: 0, schonDa: 0, fehler: [] as string[] };
    for (const [i, w] of auswahl.entries()) {
      fortschritt?.(i, auswahl.length, w.name);
      const s = organizerOrdner.stuecke.find((x) => x.name === w.name); if (!s) continue;
      try {
        const datei = await organizerOrdner.hole(s.name);
        let text = s.text; if (!text && (istBild(datei) || istPdf(datei))) { try { text = (await textLesen(datei)).text; } catch { text = ""; } }
        await saveLocalDocument(await browserVault(), datei, { category: w.bereich || "Sonstiges", documentDate: s.datum, notes: s.hinweis ? `Aus dem Datei-Organizer – ${s.hinweis}`.slice(0, 1000) : null, titel: null, textAuszug: text || null });
        aus.abgelegt++;
      } catch (e) { const m = e instanceof Error ? e.message : String(e); if (/Dublette|schon abgelegt/.test(m)) aus.schonDa++; else aus.fehler.push(`${s.name}: ${m}`); }
    }
    fortschritt?.(auswahl.length, auswahl.length, "");
    return aus;
  },
};
// Suche: die Wortsuche der Familienakte (Alltagswörter, Monate, Daten, UND), unverändert. Gibt die Kennungen der Treffer zurück,
// beste zuerst. Gesucht wird in Titel, Dateiname, Bereich, Notiz und – falls gespeichert – im Textauszug.
type Suchbar = { id: string; originalName: string; category?: string | null; documentDate?: string | null; notes?: string | null; titel?: string | null };
function suchen(frage: string, liste: Suchbar[]) {
  const deutung = interpretFamilySearchQuery(frage);
  if (!hasFamilySearchContent(deutung)) return [] as string[];
  return liste.map((d) => ({ id: d.id, punkte: scoreFamilySearchText(`${d.titel || ""} ${familyDocumentSearchText(d)}`, deutung, [d.documentDate]) }))
    .filter((t) => t.punkte > 0).sort((a, b) => b.punkte - a.punkte).map((t) => t.id);
}
// Wörter für den Rückfall „nicht alle Wörter passen“ (Klaus 17.11., Bilder 0.4.0: „Dokumente für eine Auslandsreise“ zeigte alle
// Unterlagen): einzeln gesucht wird nur, was Inhalt trägt – keine Füllwörter und keine Bereichswörter des Klons („Dokumente“,
// „Brief“ …), die allein gesucht jede Unterlage treffen. Die Deutung kommt unverändert aus dem Klon.
function teilWoerter(frage: string) {
  const deutung = interpretFamilySearchQuery(frage);
  const neben = new Set([deutung, ...deutung.alternatives].flatMap((d) => d.groups.filter((g) => g.optional).map((g) => g.word)));
  return frage.split(/\s+/).filter((w) => w && !neben.has(normalizeFamilySearch(w)) && hasFamilySearchContent(interpretFamilySearchQuery(w)));
}
// Sprechen: das Diktat der Familienakte (Spracherkennung des Browsers), unverändert. Nichts wird aufgenommen oder gespeichert.
const diktat = {
  moeglich: () => !microphoneBlockedReason() && Boolean(speechConstructor(window as never)),
  sitzung: (r: { text: (t: string) => void; zustand: (an: boolean) => void; hinweis: (t: string, fehler: boolean) => void }) =>
    createDictationSession({ constructor: () => speechConstructor(window as never), online: () => navigator.onLine, onText: r.text, onState: r.zustand, onHint: r.hinweis }),
};
// Bedeutungssuche. Laden und Rechnen: Lader und Rechen-Worker der Familienakte, unverändert (kleinste Stufe multilingual-e5-small,
// nur auf ausdrücklichen Wunsch geladen, gerechnet wird auf dem Gerät). Lesen der Unterlagen und Teilen in Abschnitte: ebenfalls
// die Familienakte (readMeaningCorpus, meaningSections). Das Finden selbst folgt Sage-Protokol (Klaus 17.11.; dort gemessen,
// docs/LEHRE-EMBEDDING-MATCH-KALIBRIERUNG.md): der rohe Cosinus liegt auch bei Fremdem um 0,82 und ist nur eine Rangfolge. Darum
//   1. Wörter und Bedeutung in einer Rangliste – Sage Modul 04 queryLocal mit hybrid:true (BM25 + Vektor, Reciprocal Rank Fusion);
//   2. zentrierter Cosinus – der Mittelwert aller Abschnitte des eigenen Bestands wird abgezogen (ab drei Abschnitten), dann liegt
//      Fremdes um 0 und nur Verwandtes klar darüber. Kein fester Riegel auf dem rohen Wert.
// PDFs werden über ihre Textebene gelesen (src/pdf-ersatz.ts lädt die PDF-Bibliothek des Klons); Scans ohne Textebene nicht.
const STUFE = "klein" as const;
// Die Pins nennen für die kleine Stufe keine Dateigrößen; für den Ladebalken: Bibliothek rund 20 MB + Modell rund 119 MB.
const GESCHAETZT = 139_000_000;
const MODELL = { id: MEANING_MODELS[STUFE].id, revision: MEANING_MODELS[STUFE].revision, dim: MEANING_MODELS[STUFE].dim };
type Rechner = (text: string) => Promise<Float32Array>;
type Abschnitt = { label: string; text: string; passageVec: Float32Array; id: string };
type SageTreffer = { label: string; score: number; bm25: number; fused: number };
const sage = () => (window as unknown as { SbkimMatch: { queryLocal: (text: string, k: number, o: { corpus: Abschnitt[]; hybrid: boolean }) => Promise<SageTreffer[]> } }).SbkimMatch;
let eingehaengt = false, laufzeit: MeaningRuntime | null = null, ersatz: Rechner | null = null;
let korpus: { stand: string; abschnitte: Abschnitt[]; mitte: Float32Array | null; unterlagen: number; ohneInhalt: number } | null = null;
const einhaengen = () => { if (!eingehaengt) { browserModelleEinhaengen(browserModelle as never); eingehaengt = true; } };
const rechnen: Rechner = (text) => ersatz ? ersatz(text) : (laufzeit ||= new MeaningRuntime()).embed(text, MODELL);
// Sage Modul 04 holt den Vektor der Frage über window.SbkimEmbedding.embedQuery; hier liefert ihn der Rechner der Familienakte
// (e5 verlangt „query: “ vor der Frage und „passage: “ vor dem Text – dieselbe Regel wie in beiden Quellen).
(window as unknown as { SbkimEmbedding: { embedQuery: Rechner } }).SbkimEmbedding = { embedQuery: (text) => rechnen("query: " + text) };

// Gerechnete Abschnitte bleiben im Speicher des Browsers (eigene kleine Datenbank), damit nur Neues gerechnet wird.
const VEKTOR_DB = "PrivateAkteSuche1";
const vektorDb = () => new Promise<IDBDatabase>((ja, nein) => { const r = indexedDB.open(VEKTOR_DB, 1); r.onupgradeneeded = () => r.result.createObjectStore("vektoren"); r.onsuccess = () => ja(r.result); r.onerror = () => nein(r.error); });
const fingerabdruck = async (text: string) => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(MODELL.revision + "\n" + text)))].map((b) => b.toString(16).padStart(2, "0")).join("");
async function vektorZu(text: string): Promise<Float32Array> {
  const key = await fingerabdruck(text), db = await vektorDb();
  try {
    const da = await new Promise<unknown>((ja, nein) => { const r = db.transaction("vektoren").objectStore("vektoren").get(key); r.onsuccess = () => ja(r.result); r.onerror = () => nein(r.error); });
    if (da instanceof Float32Array && da.length === MODELL.dim) return da;
    const neu = await rechnen("passage: " + text);
    await new Promise<void>((ja, nein) => { const t = db.transaction("vektoren", "readwrite"); t.objectStore("vektoren").put(neu, key); t.oncomplete = () => ja(); t.onerror = () => nein(t.error); });
    return neu;
  } finally { db.close(); }
}
const punkt = (a: Float32Array, b: Float32Array) => { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * b[i]; return s; };
/** Zentrierter Cosinus nach der Sage-Lehre: Mittelwert abziehen, dann Cosinus. */
function zentriert(a: Float32Array, b: Float32Array, mitte: Float32Array) {
  const wa = a.map((v, i) => v - mitte[i]), wb = b.map((v, i) => v - mitte[i]), n = Math.sqrt(punkt(wa, wa) * punkt(wb, wb));
  return n > 0 ? punkt(wa, wb) / n : 0;
}
/** Liest die Unterlagen, teilt sie in Abschnitte und rechnet, was noch nicht gerechnet ist. `stand` = Kennung der Liste. */
async function korpusBauen(stand: string, fortschritt?: (fertig: number, gesamt: number) => void) {
  leseLageSetzen("Unterlagen werden gelesen");
  const gelesen = await readMeaningCorpus(await browserVault(), () => {}, { ocr: textGemerkt });
  const teile: Array<{ id: string; text: string; n: number }> = [];
  for (const d of gelesen.documents) if (d.id.startsWith("d:")) meaningSections(d.text).texts.forEach((text, n) => teile.push({ id: d.id.slice(2), text, n }));
  const abschnitte: Abschnitt[] = [];
  for (const t of teile) { abschnitte.push({ label: `${t.id}#${t.n}`, id: t.id, text: t.text, passageVec: await vektorZu(t.text) }); fortschritt?.(abschnitte.length, teile.length); leseLageSetzen(`Bedeutung wird gerechnet: Abschnitt ${abschnitte.length} von ${teile.length}`); }
  let mitte: Float32Array | null = null;
  if (abschnitte.length >= 3) { mitte = new Float32Array(MODELL.dim); for (const a of abschnitte) for (let i = 0; i < mitte.length; i++) mitte[i] += a.passageVec[i] / abschnitte.length; }
  leseLageSetzen("");
  korpus = { stand, abschnitte, mitte, unterlagen: gelesen.documents.filter((d) => d.id.startsWith("d:")).length, ohneInhalt: gelesen.metadataOnly };
  return korpus;
}
/** Ausschnitt um das erste Wort der Frage im Abschnitt (rund 180 Zeichen); steht keines darin, die Mitte des Abschnitts. */
/** Wo die Wörter der Frage am engsten beieinander stehen: Anfang und Spanne dieser Stelle (null = keines der Wörter steht darin). */
function engsteStelle(abschnitt: string, woerter: string[]) {
  const klein = abschnitt.toLowerCase();
  const orte = woerter.map((w) => { const aus: number[] = [], k = w.toLowerCase(); for (let i = klein.indexOf(k); i >= 0 && aus.length < 200; i = klein.indexOf(k, i + 1)) aus.push(i); return aus; }).filter((o) => o.length);
  if (!orte.length) return null;
  let best = { von: orte[0][0], spanne: Infinity };
  for (const anker of orte.reduce((a, b) => (b.length < a.length ? b : a))) {
    const naechste = orte.map((o) => o.reduce((x, y) => (Math.abs(y - anker) < Math.abs(x - anker) ? y : x)));
    const von = Math.min(...naechste), spanne = Math.max(...naechste) - von;
    if (spanne < best.spanne) best = { von, spanne };
  }
  return best;
}
function ausschnitt(abschnitt: string, woerter: string[]) {
  const eng = engsteStelle(abschnitt, woerter);
  const mitte = eng ? eng.von : Math.floor(abschnitt.length / 2);
  let von = Math.max(0, mitte - 70), bis = Math.min(abschnitt.length, mitte + 110);
  if (von > 0) { const l = abschnitt.indexOf(" ", von); if (l >= 0 && l < mitte) von = l + 1; }
  if (bis < abschnitt.length) { const l = abschnitt.lastIndexOf(" ", bis); if (l > mitte) bis = l; }
  return (von > 0 ? "… " : "") + abschnitt.slice(von, bis).trim() + (bis < abschnitt.length ? " …" : "");
}
// Seiten eines PDF als Text (klein, Leerraum vereinheitlicht), je Unterlage einmal gelesen – nur um die Seite einer Fundstelle zu finden.
const seiten = new Map<string, Promise<string[] | null>>();
const glatt = (s: string) => s.normalize("NFC").toLowerCase().replace(/\s+/g, " ").trim();
function seitenVon(id: string) {
  let da = seiten.get(id);
  if (!da) { da = (async () => {
    const datei = await readLocalDocumentFile(await browserVault(), id); if (!istPdf(datei)) return null;
    return (await pdfSeitenText(datei)).map(glatt);
  })(); seiten.set(id, da); da.catch(() => seiten.delete(id)); }
  return da;
}
function seiteFinden(liste: string[] | null, stelle: string) {
  if (!liste) return null;
  const kern = glatt(stelle.replace(/…/g, " "));
  for (const [von, laenge] of [[0, 60], [Math.floor(kern.length / 3), 40], [0, 25], [Math.floor(kern.length / 2), 25]] as Array<[number, number]>) {
    const probe = kern.slice(von, von + laenge); if (probe.length < 12) continue;
    const n = liste.findIndex((s) => s.includes(probe)); if (n >= 0) return n + 1;
  }
  return null;
}
const bedeutung = {
  moeglich: () => browserModelleMoeglich(),
  /** Liegt das Modell geprüft auf dem Gerät? Dazu der Stand eines laufenden Ladens in Bytes. */
  async zustand() {
    einhaengen(); const m = (await browserModelle.getState()).models[STUFE];
    return { geladen: m.installed, laeuft: m.running, fertig: m.done, gesamt: Math.max(m.total, GESCHAETZT), fehler: m.error, quelle: m.source };
  },
  async laden() { einhaengen(); await browserModelle.install({ stage: STUFE }); },
  async abbrechen() { einhaengen(); await browserModelle.cancel({ stage: STUFE }); },
  async lesen(stand: string, fortschritt?: (fertig: number, gesamt: number) => void) { einhaengen(); await korpusBauen(stand, fortschritt); },
  /** Rangliste der Unterlagen zur Frage, beste zuerst (Sage: BM25 und Vektor verschmolzen). Je Unterlage: `naehe` = zentrierter
   *  Cosinus ihres nächsten Abschnitts (null, solange der Bestand für einen Mittelwert zu klein ist), `roh` = roher Cosinus,
   *  `wort` = ein Wort der Frage steht im Text. */
  async suchen(frage: string, stand: string) {
    einhaengen(); const k = korpus && korpus.stand === stand ? korpus : await korpusBauen(stand);
    if (!k.abschnitte.length) return [];
    const text = frage.slice(0, 500), rang = await sage().queryLocal(text, k.abschnitte.length, { corpus: k.abschnitte, hybrid: true });
    const frageVec = k.mitte ? await rechnen("query: " + text) : null;
    // imText: alle Inhaltswörter der Frage stehen in einem Abschnitt der Unterlage (auch im gelesenen PDF) – ein Wort-Treffer im Inhalt.
    const woerter = teilWoerter(text).map(normalizeFamilySearch).filter(Boolean);
    const rohWoerter = teilWoerter(text);
    const steht = (abschnitt: string) => { const n = normalizeFamilySearch(abschnitt); return woerter.length > 0 && woerter.every((w) => n.includes(w)); };
    // Fundstelle: der Abschnitt, in dem die Wörter stehen – sonst der dem Sinn nach nächste. Daraus ein Ausschnitt und die Seite.
    const je = new Map<string, { id: string; naehe: number | null; roh: number; wort: boolean; imText: boolean; ort: string; ortNaehe: number; stelle?: string; seite?: number | null }>();
    for (const t of rang) {
      const a = k.abschnitte.find((x) => x.label === t.label); if (!a) continue;
      const naehe = frageVec && k.mitte ? zentriert(frageVec, a.passageVec, k.mitte) : null, da = je.get(a.id);
      // Rang der Fundstelle: Abschnitte mit allen Wörtern zuerst, darunter der, in dem sie am engsten stehen; sonst die Nähe.
      const hier = steht(a.text), guete = hier ? 3 - Math.min(1, (engsteStelle(a.text, rohWoerter)?.spanne ?? 1600) / 1600) : naehe ?? -1;
      if (!da) je.set(a.id, { id: a.id, naehe, roh: t.score, wort: t.bm25 > 0, imText: hier, ort: a.text, ortNaehe: guete });
      else { if (guete > da.ortNaehe) { da.ort = a.text; da.ortNaehe = guete; }
        da.imText ||= hier; da.roh = Math.max(da.roh, t.score); da.wort ||= t.bm25 > 0; if (naehe !== null) da.naehe = Math.max(da.naehe ?? -1, naehe); }
    }
    for (const e of je.values()) {
      if (!e.imText && (e.naehe ?? -1) < 0.1) continue;
      e.stelle = ausschnitt(e.ort, rohWoerter);
      try { e.seite = seiteFinden(await seitenVon(e.id), e.stelle); } catch { e.seite = null; }
    }
    return [...je.values()].map(({ ort, ortNaehe, ...rest }) => rest);
  },
  /** Was zuletzt gelesen wurde: Zahl der Unterlagen, wie viele davon ohne lesbaren Inhalt (nur Titel, Bereich, Notiz), Abschnitte. */
  /** Was gerade geschieht, solange gelesen oder gerechnet wird (leer = nichts). */
  lage: () => leseLage(),
  gelesen: () => korpus ? { unterlagen: korpus.unterlagen, ohneInhalt: korpus.ohneInhalt, abschnitte: korpus.abschnitte.length } : null,
  /** Nur für die Klick-Probe: ein gestellter Rechner statt des Sprachmodells (das die Probe nicht laden kann). */
  zurProbe(rechner: Rechner | null) { ersatz = rechner; korpus = null; },
};
const alles = { ...tresor, sicherung, organizer, suchen, teilWoerter, diktat, bedeutung };
(window as unknown as { PrivateAkteTresor: typeof alles }).PrivateAkteTresor = alles;
