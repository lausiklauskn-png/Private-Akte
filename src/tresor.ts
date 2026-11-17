// Brücke zwischen der Hülle (app.js) und dem unveränderten Tresor der Familienakte (klone/familienakte).
// Hier steht keine eigene Speicherlogik: jede Funktion reicht nur an den Klon weiter.
import { browserVault, browserStorageKind, listLocalDocuments, saveLocalDocument, readLocalDocumentFile, dokumenteAussortieren, LIMITS,
  getVaultSummary, sicherungsOrdnerWaehlbar, chooseExportDestination, writeFullFamilyBackup, sicherungArt, sicherungProben, sicherungEinlesen } from "../klone/familienakte/app/local-vault.ts";
import { passwortPruefen, notfallblattText, PASSWORT_MINDESTLAENGE } from "../klone/familienakte/lib/sicherung-krypto.ts";
import { FAMILY_CATEGORIES } from "../klone/familienakte/lib/family-categories.ts";
import { interpretFamilySearchQuery, hasFamilySearchContent, scoreFamilySearchText } from "../klone/familienakte/lib/family-search.ts";
import { familyDocumentSearchText } from "../klone/familienakte/lib/family-search-text.ts";
import { browserModelle, browserModelleMoeglich } from "../klone/familienakte/app/browser-modelle.ts";
import { MeaningRuntime, MEANING_MODELS, browserModelleEinhaengen } from "../klone/familienakte/app/private-meaning-runtime.ts";
import { buildMeaningIndex, searchMeaningIndex, type MeaningDocument } from "../klone/familienakte/app/private-meaning-index.ts";
import { readMeaningCorpus } from "../klone/familienakte/app/private-meaning-corpus.ts";
import { createDictationSession, speechConstructor, microphoneBlockedReason } from "../klone/familienakte/lib/browser-dictation.ts";

const tresor = {
  bereiche: [...FAMILY_CATEGORIES],
  hoechstBytes: LIMITS.documentBytes,
  speicherArt: () => browserStorageKind(),
  /** Was in der Akte liegt; Herausgenommenes (im Klon „aussortiert“) wird nicht gezeigt. */
  async liste() { return (await listLocalDocuments(await browserVault())).filter((d) => !d.aussortiert); },
  async ablegen(datei: File, angaben: { bereich: string; datum: string | null; titel: string | null; notiz: string | null }) {
    return saveLocalDocument(await browserVault(), datei, { category: angaben.bereich, documentDate: angaben.datum, notes: angaben.notiz, titel: angaben.titel });
  },
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
// Suche: die Wortsuche der Familienakte (Alltagswörter, Monate, Daten, UND), unverändert. Gibt die Kennungen der Treffer zurück,
// beste zuerst. Gesucht wird in Titel, Dateiname, Bereich, Notiz und – falls gespeichert – im Textauszug.
type Suchbar = { id: string; originalName: string; category?: string | null; documentDate?: string | null; notes?: string | null; titel?: string | null };
function suchen(frage: string, liste: Suchbar[]) {
  const deutung = interpretFamilySearchQuery(frage);
  if (!hasFamilySearchContent(deutung)) return [] as string[];
  return liste.map((d) => ({ id: d.id, punkte: scoreFamilySearchText(`${d.titel || ""} ${familyDocumentSearchText(d)}`, deutung, [d.documentDate]) }))
    .filter((t) => t.punkte > 0).sort((a, b) => b.punkte - a.punkte).map((t) => t.id);
}
// Sprechen: das Diktat der Familienakte (Spracherkennung des Browsers), unverändert. Nichts wird aufgenommen oder gespeichert.
const diktat = {
  moeglich: () => !microphoneBlockedReason() && Boolean(speechConstructor(window as never)),
  sitzung: (r: { text: (t: string) => void; zustand: (an: boolean) => void; hinweis: (t: string, fehler: boolean) => void }) =>
    createDictationSession({ constructor: () => speechConstructor(window as never), online: () => navigator.onLine, onText: r.text, onState: r.zustand, onHint: r.hinweis }),
};
// Bedeutungssuche: Lader, Rechen-Worker, Index und Korpus der Familienakte, unverändert. Kleinste Stufe (multilingual-e5-small).
// Das Modell wird nur auf ausdrücklichen Wunsch geladen (Klaus 17.11.: einmal, beim ersten „Finden“) und liegt dann im
// Speicher des Browsers; gerechnet wird auf dem Gerät. PDFs zählen vorerst nur mit Titel, Bereich und Notiz (src/pdf-ersatz.ts).
const STUFE = "klein" as const;
// Die Pins nennen für die kleine Stufe keine Dateigrößen; für den Ladebalken: Bibliothek rund 20 MB + Modell rund 119 MB.
const GESCHAETZT = 139_000_000;
const MODELL = { id: MEANING_MODELS[STUFE].id, revision: MEANING_MODELS[STUFE].revision, dim: MEANING_MODELS[STUFE].dim };
let eingehaengt = false, laufzeit: MeaningRuntime | null = null;
let korpus: { stand: string; scope: string; documents: MeaningDocument[] } | null = null;
const einhaengen = () => { if (!eingehaengt) { browserModelleEinhaengen(browserModelle as never); eingehaengt = true; } };
const rechnen = (text: string, model: typeof MODELL) => (laufzeit ||= new MeaningRuntime()).embed(text, model);
/** Liest die Unterlagen und rechnet, was neu ist (schon Gerechnetes bleibt). `stand` = Kennung der Liste, damit nach neuem Ablegen neu gelesen wird. */
async function indexBauen(stand: string, fortschritt?: (fertig: number, gesamt: number) => void) {
  const handle = await browserVault(), scope = (await getVaultSummary(handle)).vaultId;
  const gelesen = await readMeaningCorpus(handle, () => {});
  await buildMeaningIndex({ scope, model: MODELL, read: async () => gelesen.documents, currentScope: () => scope, embed: rechnen, progress: fortschritt });
  korpus = { stand, scope, documents: gelesen.documents };
  return korpus;
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
  async lesen(stand: string, fortschritt?: (fertig: number, gesamt: number) => void) { einhaengen(); await indexBauen(stand, fortschritt); },
  /** Treffer dem Sinn nach: Kennungen der Unterlagen mit ihrer Nähe zur Frage (0 bis 1), beste zuerst. */
  async suchen(frage: string, stand: string) {
    einhaengen(); const k = korpus && korpus.stand === stand ? korpus : await indexBauen(stand);
    const r = await searchMeaningIndex({ scope: k.scope, documents: k.documents, query: frage.slice(0, 500), currentScope: () => k.scope, embed: rechnen });
    return r.hits.filter((h) => h.id.startsWith("d:")).map((h) => ({ id: h.id.slice(2), naehe: h.score }));
  },
};
const alles = { ...tresor, sicherung, suchen, diktat, bedeutung };
(window as unknown as { PrivateAkteTresor: typeof alles }).PrivateAkteTresor = alles;
