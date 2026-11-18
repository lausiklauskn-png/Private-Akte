// Brücke zwischen der Hülle (app.js) und dem unveränderten Tresor der Familienakte (klone/familienakte).
// Hier steht keine eigene Speicherlogik: jede Funktion reicht nur an den Klon weiter.
import { browserVault, browserStorageKind, listLocalDocuments, saveLocalDocument, readLocalDocumentFile, dokumenteAussortieren, dokumenteEndgueltigLoeschen, LIMITS,
  getVaultSummary, sicherungsOrdnerWaehlbar, chooseExportDestination, writeFullFamilyBackup, sicherungArt, sicherungProben, sicherungEinlesen } from "../klone/familienakte/app/local-vault.ts";
import { readLocalVaultData, updateLocalScheduleStatus, deleteLocalScheduleRecord, deleteLocalMemoryRecord, papierkorbLesen, papierkorbEndgueltig, createLocalScheduleBundle } from "../klone/familienakte/app/local-vault.ts";
import { saveLocalStammRecord, createLocalFamilyRelation, confirmLocalContextLink, dokumenteZuordnen, akteFuerAbgleich, akteNachAbgleichSchreiben } from "../klone/familienakte/app/local-vault.ts";
import { stammLesen } from "../klone/familienakte/lib/familie-stamm.ts";
import { createLocalFamilyRecord } from "../klone/familienakte/app/local-vault.ts";
import { parseEuroToCents, formatEuro } from "../klone/bookledger/src/domain/money.js";
import { kassenbericht } from "../klone/bookledger/src/domain/kassenbuch.js";
import { istTermin, kalenderFelder } from "../klone/familienakte/lib/kalender.ts";
import { memoryData } from "../klone/familienakte/lib/family-memory.ts";
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
  /** Akte leeren (Klaus 18.11.): alle Unterlagen endgültig löschen – erst aussortieren, dann „Papierkorb leeren“ des Klons (auch
   *  früher Herausgenommenes). Dazu die eigenen Merker der Suche (gerechnete Abschnitte, gelesener Text). Kein Zurück ohne Backup. */
  async leeren() {
    const tresor = await browserVault(), alle = await listLocalDocuments(tresor);
    const offen = alle.filter((d) => !d.aussortiert).map((d) => d.id);
    if (offen.length) await dokumenteAussortieren(tresor, offen);
    const r = alle.length ? await dokumenteEndgueltigLoeschen(tresor, alle.map((d) => d.id)) : { geloescht: 0, dateiBlieb: [] as string[], fehler: [] as string[] };
    for (const db of ["PrivateAkteSuche1", "PrivateAkteText1"]) await new Promise<void>((ok) => { const q = indexedDB.deleteDatabase(db); q.onsuccess = q.onerror = q.onblocked = () => ok(); });
    return { geloescht: r.geloescht, blieb: r.dateiBlieb.length, fehler: r.fehler };
  },
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
// ---- Das Gelernte im Backup (Klaus 18.11.2026: „das Gelernte soll niemals gelöscht werden – das ist der Kern“) ----
// Was der Datei-Organizer in der Akte aus Korrekturen gelernt hat (Regeln „Absender → Bereich“ mit Stimmen) und die eigenen Kategorien
// liegen nur im Speicher des Browsers. Sie reisen als eigene Datei im Backup-Ordner mit: Gelerntes.json, mit dem Passwort des
// Backups verschlüsselt (AES-GCM, Schlüssel aus PBKDF2 mit 600.000 Runden). Einlesen fügt hinzu und überschreibt nie.
const GELERNT_DATEI = "Gelerntes.json", ORGANIZER_DB = "PrivateAkteOrganizer1", KAT_MERKER = "pa_do-eigene-kategorien";
type Regel = { wenn: { absender: string; sache?: string }; feld: string; dann: string; anzahl: number; stimmen?: Record<string, number> };
type Gelerntes = { regeln: Regel[]; kategorien: string[] };
const kv = <T,>(modus: IDBTransactionMode, f: (s: IDBObjectStore) => IDBRequest<T>) => new Promise<T>((ok, nein) => {
  const auf = indexedDB.open(ORGANIZER_DB, 1);
  auf.onupgradeneeded = () => auf.result.createObjectStore("kv");
  auf.onerror = () => nein(auf.error);
  auf.onsuccess = () => { const db = auf.result; try { const t = db.transaction("kv", modus), r = f(t.objectStore("kv")); t.oncomplete = () => { db.close(); ok(r.result); }; t.onerror = t.onabort = () => { db.close(); nein(t.error); }; } catch (e) { db.close(); nein(e); } };
});
async function gelerntesLesen(): Promise<Gelerntes> {
  const z = await kv("readonly", (s) => s.get("zustand")) as { regeln?: Regel[] } | undefined;
  let kategorien: string[] = []; try { const l = JSON.parse(localStorage.getItem(KAT_MERKER) || "[]"); if (Array.isArray(l)) kategorien = l.filter((x) => typeof x === "string"); } catch { /* keine */ }
  return { regeln: Array.isArray(z?.regeln) ? z!.regeln! : [], kategorien };
}
const regelSchluessel = (r: Regel) => `${String(r.wenn?.absender || "").toLowerCase().replace(/\s+/g, " ").trim()}|${r.feld}|${r.wenn?.sache || ""}`;
const regelGut = (r: unknown): r is Regel => { const x = r as Regel; return !!x && typeof x === "object" && !!x.wenn && typeof x.wenn.absender === "string" && typeof x.feld === "string" && typeof x.dann === "string" && typeof x.anzahl === "number"; };
/** Fügt hinzu, was hier noch fehlt. Eine Regel, die es hier schon gibt (gleicher Absender, gleiches Feld, gleiche Sache), bleibt wie sie ist. */
async function gelerntesDazu(neu: Gelerntes) {
  const hier = await gelerntesLesen(), da = new Set(hier.regeln.map(regelSchluessel));
  const dazu = neu.regeln.filter(regelGut).filter((r) => !da.has(regelSchluessel(r)));
  if (dazu.length) {
    const z = (await kv("readonly", (s) => s.get("zustand")) as Record<string, unknown> | undefined) || { fassung: 1, ordnerName: "", quelle: "", stufe: 0, dateien: [], verlauf: [], zeit: new Date().toISOString() };
    await kv("readwrite", (s) => s.put({ ...z, regeln: [...hier.regeln, ...dazu] }, "zustand"));
  }
  const kat = [...new Set([...hier.kategorien, ...neu.kategorien.filter((x) => typeof x === "string" && x.length <= 60)])].slice(-50);
  if (kat.length !== hier.kategorien.length) localStorage.setItem(KAT_MERKER, JSON.stringify(kat));
  return { regeln: dazu.length, kategorien: kat.length - hier.kategorien.length };
}
const b64 = (b: ArrayBuffer | Uint8Array) => btoa(String.fromCharCode(...new Uint8Array(b as ArrayBuffer)));
const ab64 = (t: string) => Uint8Array.from(atob(t), (c) => c.charCodeAt(0));
async function passwortSchluessel(passwort: string, salz: Uint8Array) {
  const roh = await crypto.subtle.importKey("raw", new TextEncoder().encode(passwort), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name: "PBKDF2", salt: salz, iterations: 600000, hash: "SHA-256" }, roh, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
}
async function gelerntesSchreiben(ordner: FileSystemDirectoryHandle, passwort: string | null, fassung: string) {
  const g = await gelerntesLesen(), klar = new TextEncoder().encode(JSON.stringify(g));
  const kopf = { format: "private-akte-gelerntes", fassung: 1, app: fassung, erstellt: new Date().toISOString(), hinweis: "Was der Datei-Organizer in der Privaten Akte aus Korrekturen gelernt hat. Wird beim Einlesen des Backups hinzugefügt, nie überschrieben." };
  let inhalt: Record<string, unknown>;
  if (passwort) { const salz = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12)); inhalt = { ...kopf, verschluesselt: true, salz: b64(salz), iv: b64(iv), daten: b64(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await passwortSchluessel(passwort, salz), klar)) }; }
  else inhalt = { ...kopf, verschluesselt: false, gelerntes: g };
  const w = await (await ordner.getFileHandle(GELERNT_DATEI, { create: true })).createWritable(); await w.write(JSON.stringify(inhalt)); await w.close();
  return { regeln: g.regeln.length, kategorien: g.kategorien.length };
}
/** Liest Gelerntes.json aus dem Backup-Ordner. `grund` sagt, warum nichts kam (fehlt = älteres Backup; notfall = nur mit dem Passwort lesbar). */
async function gelerntesEinlesen(ordner: FileSystemDirectoryHandle, zugang?: Zugang): Promise<{ regeln: number; kategorien: number; grund?: string }> {
  let text: string; try { text = await (await (await ordner.getFileHandle(GELERNT_DATEI)).getFile()).text(); } catch { return { regeln: 0, kategorien: 0, grund: "fehlt" }; }
  try {
    const j = JSON.parse(text) as { format?: string; verschluesselt?: boolean; salz?: string; iv?: string; daten?: string; gelerntes?: Gelerntes };
    if (j.format !== "private-akte-gelerntes") return { regeln: 0, kategorien: 0, grund: "fremd" };
    let g: Gelerntes;
    if (j.verschluesselt) {
      if (!zugang?.passwort) return { regeln: 0, kategorien: 0, grund: "notfall" };
      g = JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: ab64(j.iv || "") }, await passwortSchluessel(zugang.passwort, ab64(j.salz || "")), ab64(j.daten || ""))));
    } else g = j.gelerntes as Gelerntes;
    return await gelerntesDazu({ regeln: Array.isArray(g?.regeln) ? g.regeln : [], kategorien: Array.isArray(g?.kategorien) ? g.kategorien : [] });
  } catch { return { regeln: 0, kategorien: 0, grund: "unlesbar" }; }
}
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
    // Das Gelernte reist mit (eigene Datei neben der Vollsicherung des Klons); klappt das nicht, bleibt das Backup der Akte gültig.
    let gelernt: { regeln: number; kategorien: number } | null = null; try { gelernt = await gelerntesSchreiben(aussen, passwort, fassung); } catch { gelernt = null; }
    return { gelernt, ziel: ziel.name, ordner: aussen.name, dateien: r.manifest.files.length, erstellt: r.manifest.createdAt, notfall: r.notfall ?? null,
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
  async importieren(zugang?: Zugang, revision?: number) {
    if (!importOrdner) throw new Error("Bitte zuerst den Ordner wählen.");
    const r = await sicherungEinlesen(importOrdner, await browserVault(), {}, revision, zugang);
    return { ...r, gelernt: await gelerntesEinlesen(importOrdner, zugang) };
  },
  /** Was hier gelernt ist (Zahlen für die Anzeige). */
  async gelernt() { try { const g = await gelerntesLesen(); return { regeln: g.regeln.length, kategorien: g.kategorien.length }; } catch { return { regeln: 0, kategorien: 0 }; } },
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
    const aus = { abgelegt: 0, schonDa: 0, fehler: [] as string[], ids: [] as string[] };
    for (const [i, w] of auswahl.entries()) {
      fortschritt?.(i, auswahl.length, w.name);
      const s = organizerOrdner.stuecke.find((x) => x.name === w.name); if (!s) continue;
      try {
        const datei = await organizerOrdner.hole(s.name);
        let text = s.text; if (!text && (istBild(datei) || istPdf(datei))) { try { text = (await textLesen(datei)).text; } catch { text = ""; } }
        const neu = await saveLocalDocument(await browserVault(), datei, { category: w.bereich || "Sonstiges", documentDate: s.datum, notes: s.hinweis ? `Aus dem Datei-Organizer – ${s.hinweis}`.slice(0, 1000) : null, titel: null, textAuszug: text || null });
        aus.abgelegt++; aus.ids.push(neu.id);
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

// Kalender und Notizen: die Ansicht ist die der Familienakte (src/kalender-seite.tsx, im Rahmen). Die Hülle braucht hier nur, was
// offen ist – für „Fällig“ auf der Startseite und die Zahl am Baum. Dieselbe Auswahl wie „Mein Kalender“ im Klon: offene Aufgaben
// und Fristen mit Tag, dazu freie Erinnerungen.
const NICHT_OFFEN = ["erledigt", "zurückgestellt", "archiviert"], TAG = /^\d{4}-\d{2}-\d{2}/;
const kalender = {
  async termine() {
    const { records } = await readLocalVaultData(await browserVault());
    const offen = records.filter((r) => !NICHT_OFFEN.includes(r.status));
    const fest = offen.filter((r) => istTermin(r) && TAG.test(String((r.data as { dueAt?: string }).dueAt || ""))).map((r) => ({ id: r.id, titel: String((r.data as { title: string }).title), tag: String((r.data as { dueAt: string }).dueAt).slice(0, 10), zeit: kalenderFelder(r).dueTime || "", art: r.recordType === "deadline" ? "Frist" : "Aufgabe" }));
    const frei = offen.filter((r) => r.recordType === "reminder" && TAG.test(String((r.data as { remindAt?: string }).remindAt || ""))).map((r) => { const am = String((r.data as { remindAt: string }).remindAt); return { id: r.id, titel: String((r.data as { title: string }).title), tag: am.slice(0, 10), zeit: am.slice(11, 16), art: "Erinnerung" }; });
    return { termine: [...fest, ...frei].sort((a, b) => `${a.tag}${a.zeit || "99"}`.localeCompare(`${b.tag}${b.zeit || "99"}`)), notizen: records.filter((r) => memoryData(r) && r.status !== "archiviert").length };
  },
  /** Abhaken im Glockenfeld der Hülle: derselbe Schritt wie ✓ in „Mein Kalender“. */
  async erledigen(id: string) { await updateLocalScheduleStatus(await browserVault(), id, "erledigt"); },
  /** Akte leeren: alle Termine, Fristen, Erinnerungen und Notizen löschen (Löschen des Klons), danach seinen Papierkorb leeren. */
  async leeren() {
    const handle = await browserVault(), { records } = await readLocalVaultData(handle); let n = 0;
    for (const r of records) { if (!memoryData(r) || r.status === "archiviert") continue; try { await deleteLocalMemoryRecord(handle, r.id, { keepLinkedSchedules: false }); n++; } catch { /* schon weg */ } }
    for (const r of (await readLocalVaultData(handle)).records) { if (!["deadline", "task", "reminder"].includes(r.recordType) || r.status === "archiviert") continue; try { await deleteLocalScheduleRecord(handle, r.id); n++; } catch { /* schon weg */ } }
    const korb = await papierkorbLesen(handle); if (korb.length) await papierkorbEndgueltig(handle, korb.map((x) => x.id));
    return n;
  },
};
// Akten, Personen, Absender (0.7.0, Klaus 18.11.: „Akte = ein Fach mit Namen, einer Person zugeordnet“; Antworten A–F ja): alles im
// Register des Klons, nichts Eigenes. Person = Datensatz „person“, Akte = Datensatz „case“ (in der Familienakte „Vorgang“; Art „Akte“),
// ihre Person über die Verknüpfung case → person „betrifft“. Eine Unterlage gehört über document → case „gehört zu“ zu beliebig vielen
// Akten, betrifft über document → person „betrifft“ Personen, und ihr Absender ist eine Organisation (document → organisation „Absender“).
// Lösen einer Verknüpfung: der Klon hat dafür nur „Vorgangsbezug lösen“; für Person und Absender wird das Register über den Weg des
// Abgleichs (akteFuerAbgleich/akteNachAbgleichSchreiben, mit Prüfung des Stands) ohne diese eine Verknüpfung zurückgeschrieben.
const lebt = (r: { status: string }) => r.status !== "archiviert";
const gleicherName = (a: string, b: string) => a.replace(/\s+/g, " ").trim().toLocaleLowerCase("de") === b.replace(/\s+/g, " ").trim().toLocaleLowerCase("de");
const akten = {
  async lesen() {
    const { records, relations } = await readLocalVaultData(await browserVault());
    const personen = records.filter((r) => r.recordType === "person" && lebt(r)).map((r) => ({ id: r.id, name: stammLesen(r).name, rolle: stammLesen(r).art }));
    const faelle = records.filter((r) => r.recordType === "case" && lebt(r)).map((r) => ({ id: r.id, titel: stammLesen(r).name, person: relations.find((x) => x.fromType === "case" && x.fromId === r.id && x.toType === "person")?.toId || null }));
    const orgs = new Map(records.filter((r) => r.recordType === "organisation" && lebt(r)).map((r) => [r.id, stammLesen(r).name]));
    const ids = new Set([...personen.map((p) => p.id), ...faelle.map((a) => a.id)]);
    const bezug: Record<string, { akten: string[]; personen: string[]; absender: string[] }> = {};
    for (const x of relations) {
      if (x.fromType !== "document") continue;
      const b = bezug[x.fromId] ||= { akten: [], personen: [], absender: [] };
      if (x.toType === "case" && ids.has(x.toId)) b.akten.push(x.toId);
      else if (x.toType === "person" && ids.has(x.toId)) b.personen.push(x.toId);
      else if (x.toType === "organisation" && x.relationType === "Absender" && orgs.has(x.toId)) b.absender.push(orgs.get(x.toId)!);
    }
    return { personen, akten: faelle, bezug, absender: [...new Set(orgs.values())] };
  },
  async personAnlegen(name: string, rolle = "") { return (await saveLocalStammRecord(await browserVault(), { recordType: "person", angaben: { name, art: rolle, notiz: "" } })).id; },
  async akteAnlegen(titel: string, person: string | null) {
    const h = await browserVault(), r = await saveLocalStammRecord(h, { recordType: "case", angaben: { name: titel, art: "Akte", notiz: "" } });
    if (person) await createLocalFamilyRelation(h, { fromType: "case", fromId: r.id, toType: "person", toId: person, relationType: "betrifft", source: "Private Akte", notes: null });
    return r.id;
  },
  /** Setzt die Bezüge einer Unterlage genau so: Akten (mehrere), Personen (mehrere), Absender (Name oder leer). */
  async zuordnen(docId: string, soll: { akten: string[]; personen: string[]; absender: string | null }) {
    const h = await browserVault(), { records, relations } = await readLocalVaultData(h);
    let absenderId: string | null = null;
    const name = (soll.absender || "").replace(/\s+/g, " ").trim().slice(0, 120);
    if (name) absenderId = records.find((r) => r.recordType === "organisation" && lebt(r) && gleicherName(stammLesen(r).name, name))?.id
      || (await saveLocalStammRecord(h, { recordType: "organisation", angaben: { name, art: "Absender", notiz: "" } })).id;
    const weg = relations.filter((x) => x.fromType === "document" && x.fromId === docId && (
      (x.toType === "case" && !soll.akten.includes(x.toId)) || (x.toType === "person" && !soll.personen.includes(x.toId)) || (x.toType === "organisation" && x.relationType === "Absender" && x.toId !== absenderId)));
    if (weg.length) {
      const { akte, revision } = await akteFuerAbgleich(h), aus = new Set(weg.map((x) => x.id));
      (akte as unknown as { relations: Array<{ id: string }> }).relations = (akte as unknown as { relations: Array<{ id: string }> }).relations.filter((x) => !aus.has(x.id));
      await akteNachAbgleichSchreiben(h, akte, revision, "Zusammenhang gelöst", `${docId}: ${weg.length} Verknüpfung${weg.length === 1 ? "" : "en"} in der Privaten Akte gelöst; Datensätze blieben erhalten.`);
    }
    for (const a of soll.akten) await confirmLocalContextLink(h, { sourceType: "document", sourceId: docId, caseId: a, reason: "Private Akte" });
    for (const p of soll.personen) await dokumenteZuordnen(h, [docId], { type: "person", id: p });
    if (absenderId) await createLocalFamilyRelation(h, { fromType: "document", fromId: docId, toType: "organisation", toId: absenderId, relationType: "Absender", source: "Private Akte", notes: null });
  },
};
// Termin zu einer echten Unterlage (0.7.0): Frist oder Aufgabe des Klons mit Bezug auf die Unterlage (references), wie „+ Eintrag“ im Kalender.
Object.assign(kalender, {
  async anlegen(e: { titel: string; tag: string; zeit: string | null; art: "deadline" | "task"; docId: string }) {
    return createLocalScheduleBundle(await browserVault(), { recordType: e.art, title: e.titel, dueAt: e.tag, dueTime: e.zeit || null, source: "Private Akte", references: [{ recordType: "document", id: e.docId, relationType: "betrifft" }] });
  },
});
// Portemonnaie (0.7.0, Klaus 17.11.: „neu, schlank“, 18.11.: „gleich im Tresor“): Geld rein / Geld raus, ohne Buchhaltung. Ein Posten ist
// ein Datensatz „payment“ des Registers (Titel, Betrag in Cent, Währung; dazu Richtung, Tag, wofür), damit im Backup und für die
// Familienakte lesbar. Der Bon ist eine Unterlage (Bereich „Einkäufe, Rechnungen & Garantien“), verknüpft payment → document „Beleg“.
// Rechnen: Betrag lesen/zeigen und Monatsbericht aus BookLedgerPro (klone/bookledger: money.js, kassenbuch.js – unverändert).
type Posten = { id: string; titel: string; cent: number; am: string; wofuer: string; bon: string | null };
const BON_BEREICH = "Einkäufe, Rechnungen & Garantien";
/** Betrag auf einem Bon: die Zahl hinter „Summe“, „Gesamt“, „zu zahlen“, „Total“; sonst die größte Zahl mit Komma. Nur ein Vorschlag. */
function bonBetrag(text: string) {
  const zahl = (t: string) => parseEuroToCents(t), alle = [...text.matchAll(/(\d{1,4}(?:\.\d{3})*,\d{2})/g)].map((m) => ({ cent: zahl(m[1]), i: m.index || 0 }));
  const wort = [...text.toLowerCase().matchAll(/summe|gesamt|zu zahlen|total|betrag/g)].map((m) => m.index || 0);
  for (const w of wort) { const z = alle.find((x) => x.i > w && x.i - w < 60); if (z && z.cent > 0) return z.cent; }
  return alle.reduce((m, x) => (x.cent > m ? x.cent : m), 0) || null;
}
const geld = {
  euro: (cent: number) => formatEuro(cent),
  cent: (eingabe: string) => parseEuroToCents(eingabe),
  async posten(): Promise<Posten[]> {
    const { records, relations } = await readLocalVaultData(await browserVault());
    return records.filter((r) => r.recordType === "payment" && lebt(r) && (r.data as { portemonnaie?: boolean }).portemonnaie).map((r) => {
      const d = r.data as { title?: string; amountCents?: number; richtung?: string; am?: string; wofuer?: string };
      return { id: r.id, titel: d.title || "", cent: (d.richtung === "rein" ? 1 : -1) * (d.amountCents || 0), am: d.am || r.createdAt.slice(0, 10), wofuer: d.wofuer || "",
        bon: relations.find((x) => x.fromType === "payment" && x.fromId === r.id && x.toType === "document")?.toId || null };
    }).sort((a, b) => a.am.localeCompare(b.am) || a.id.localeCompare(b.id));
  },
  /** Monat „JJJJ-MM“: Anfangsbestand = alles davor, dann der Bericht aus BookLedgerPro (Einnahmen, Ausgaben, Endbestand). */
  bericht(alle: Posten[], monat: string) {
    const vorher = alle.filter((p) => p.am.slice(0, 7) < monat).reduce((a, p) => a + p.cent, 0);
    const im = alle.filter((p) => p.am.slice(0, 7) === monat).map((p, i) => ({ datum: p.am, seq: i, beschreibung: p.titel, einnahme: p.cent > 0 ? p.cent : 0, ausgabe: p.cent < 0 ? -p.cent : 0, id: p.id }));
    return kassenbericht(im, vorher);
  },
  async eintragen(e: { titel: string; cent: number; rein: boolean; wofuer: string; am: string; bon?: File | null; bonText?: string }) {
    if (!Number.isInteger(e.cent) || e.cent <= 0) throw new Error("Bitte einen Betrag eintragen.");
    const h = await browserVault();
    let bon: string | null = null;
    if (e.bon) bon = (await saveLocalDocument(h, e.bon, { category: BON_BEREICH, documentDate: e.am, notes: `Bon aus dem Portemonnaie – ${formatEuro(e.cent)}${e.wofuer ? " · wofür: " + e.wofuer : ""}`, titel: `Bon ${e.titel}`.slice(0, 200), textAuszug: e.bonText || null })).id;
    const r = await createLocalFamilyRecord(h, { recordType: "payment", status: "aktiv", source: "Portemonnaie", notes: null,
      data: { title: e.titel.slice(0, 200), amountCents: e.cent, currency: "EUR", portemonnaie: true, richtung: e.rein ? "rein" : "raus", am: e.am, wofuer: e.wofuer.slice(0, 120) } as never });
    if (bon) await createLocalFamilyRelation(h, { fromType: "payment", fromId: r.id, toType: "document", toId: bon, relationType: "Beleg", source: "Portemonnaie", notes: null });
    return { id: r.id, bon };
  },
  /** Posten herausnehmen: im Register „archiviert“ (nicht gelöscht); der Bon bleibt als Unterlage. */
  async entfernen(id: string) {
    const h = await browserVault(), { akte, revision } = await akteFuerAbgleich(h);
    const r = (akte as unknown as { records: Array<{ id: string; status: string; updatedAt: string }> }).records.find((x) => x.id === id); if (!r) return;
    r.status = "archiviert"; r.updatedAt = new Date().toISOString();
    await akteNachAbgleichSchreiben(h, akte, revision, "Posten herausgenommen", `${id}: im Portemonnaie herausgenommen (archiviert).`);
  },
  async bonLesen(datei: File) { const t = await textLesen(datei); return { text: t.text, cent: bonBetrag(t.text || "") }; },
  /** Der Monat als Datei für BookLedgerPro (CSV, Semikolon, Beträge mit Komma). */
  csv(alle: Posten[], monat: string) {
    const z = (t: string) => `"${String(t).replace(/"/g, '""')}"`;
    return ["Datum;Was;Wofür;Einnahme;Ausgabe", ...alle.filter((p) => p.am.slice(0, 7) === monat).map((p) => [p.am, z(p.titel), z(p.wofuer), p.cent > 0 ? formatEuro(p.cent).replace(" €", "") : "", p.cent < 0 ? formatEuro(-p.cent).replace(" €", "") : ""].join(";"))].join("\r\n");
  },
  bonBetrag,
};
const alles = { ...tresor, sicherung, organizer, suchen, teilWoerter, diktat, bedeutung, kalender, akten, geld };
(window as unknown as { PrivateAkteTresor: typeof alles }).PrivateAkteTresor = alles;
