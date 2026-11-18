// Kalender und Notizen der Privaten Akte: die unveränderten Ansichten der Familienakte (klone/familienakte) – „Mein Kalender“,
// der Notiz-Knopf mit seinem Fenster, „Notiz bearbeiten“, Löschen, die App-Glocke. Hier steht nur das Gestell: Tresor öffnen,
// Register lesen, die Ansichten hinstellen. Die Seite läuft im Rahmen der Akte (rahmen/kalender/index.html), damit die Stile der
// Familienakte gelten, ohne die der Hülle zu berühren. Gespeichert wird im selben Tresor wie die Unterlagen.
import { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { browserVault, readLocalVaultData, updateLocalScheduleStatus } from "../klone/familienakte/app/local-vault.ts";
import { MeinKalender, AppGlocke, meinKalenderOeffnen } from "../klone/familienakte/app/mein-kalender.tsx";
import { KalenderVerbinden, KalenderAnmeldeHinweis, useKalenderAutoAbgleich } from "../klone/familienakte/app/kalender-karte.tsx";
import { anmeldeRueckkehr } from "../klone/familienakte/app/kalender-anbieter.ts";
import { KALENDER_OEFFNEN } from "../klone/familienakte/app/erinnern-teil.tsx";
import { NotizKnopf } from "../klone/familienakte/app/notiz-knopf.tsx";
import { MemoryBearbeiten } from "../klone/familienakte/app/memory-bearbeiten.tsx";
import { NotizLoeschen } from "../klone/familienakte/app/loesch-knopf.tsx";
import { AugeKnopf, FlachText, KnopfLeiste, StiftKnopf } from "../klone/familienakte/app/flach-zeile.tsx";
import { Seitenleiste } from "../klone/familienakte/app/seitenleiste.tsx";
import { PageDialogHost } from "../klone/familienakte/app/page-dialogs.tsx";
import { memoryData } from "../klone/familienakte/lib/family-memory.ts";
import type { FamilyRecordUnion, FamilyRelation } from "../klone/familienakte/lib/family-data-model.ts";

type Stand = { handle: FileSystemDirectoryHandle | null; records: FamilyRecordUnion[]; relations: FamilyRelation[] };
const frage = new URLSearchParams(location.search);
const NUR_GLOCKE = frage.get("nur") === "glocke";
/** Nachricht an die Hülle (nur an den eigenen Ursprung). */
const anAkte = (m: Record<string, unknown>) => { try { if (parent !== window) parent.postMessage(m, location.origin); } catch { /* ohne Hülle geöffnet */ } };
const aufgabenZu = (s: Stand, id: string) => s.records.filter((r) => (r.recordType === "task" || r.recordType === "deadline") && r.status !== "erledigt" && s.relations.some((rel) => rel.fromId === r.id && rel.toId === id));

function Seite() {
  const [stand, setStand] = useState<Stand>({ handle: null, records: [], relations: [] });
  const [fehler, setFehler] = useState("");
  const [meldung, setMeldung] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const [auf, setAuf] = useState<string | null>(null);
  const [aendern, setAendern] = useState<string | null>(null);
  const laden = useCallback(async () => {
    try { const handle = await browserVault(), d = await readLocalVaultData(handle); setStand({ handle, records: d.records, relations: d.relations }); setFehler(""); anAkte({ typ: "pa-kalender-geaendert" }); }
    catch (g) { setFehler(g instanceof Error ? g.message : String(g)); }
  }, []);
  useEffect(() => { void laden(); }, [laden]);
  // Verbundener Kalender (Google, Microsoft, Gerätekalender, Datei): Abgleich und Anmeldung der Familienakte, unverändert.
  useKalenderAutoAbgleich(NUR_GLOCKE ? null : stand.handle, stand.records, stand.relations, laden, setMeldung);
  useEffect(() => { const hin = () => document.querySelector("[data-pa-verbinden]")?.scrollIntoView({ behavior: "smooth", block: "start" }); window.addEventListener(KALENDER_OEFFNEN, hin); return () => window.removeEventListener(KALENDER_OEFFNEN, hin); }, []);
  useEffect(() => { if (!meldung) return; anAkte({ typ: "pa-kalender-meldung", gut: meldung.kind === "success", text: meldung.text }); const t = window.setTimeout(() => setMeldung(null), 8000); return () => window.clearTimeout(t); }, [meldung]);
  // Einstieg aus der Hülle: ?tag=JJJJ-MM-TT&id=… zeigt den Tag (und den Eintrag), ?notiz=1 öffnet gleich das Notiz-Fenster.
  useEffect(() => {
    if (!stand.handle || NUR_GLOCKE) return;
    const tag = frage.get("tag"), id = frage.get("id");
    if (tag) meinKalenderOeffnen(tag, id || undefined);
    if (frage.get("notiz")) document.querySelector<HTMLButtonElement>("[data-notiz-knopf]")?.click();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stand.handle]);
  const notizen = useMemo(() => stand.records.filter((r) => memoryData(r) && r.status !== "archiviert").sort((a, b) => memoryData(b)!.eventAt.localeCompare(memoryData(a)!.eventAt)), [stand.records]);
  const glocke = <AppGlocke records={stand.records} relations={stand.relations}
    onOeffnen={(z) => { const tag = new Date(z.beginn).toLocaleDateString("sv-SE"); if (NUR_GLOCKE) anAkte({ typ: "pa-kalender-oeffnen", tag, id: z.recordId }); else meinKalenderOeffnen(tag, z.recordId); }}
    onErledigt={async (z) => { if (stand.handle) { await updateLocalScheduleStatus(stand.handle, z.recordId, "erledigt"); await laden(); } }}/>;
  if (NUR_GLOCKE) return glocke;
  const bearbeitet = aendern ? stand.records.find((r) => r.id === aendern) || null : null;
  // Dieselbe Umgebung wie in der Familienakte (app-shell, site-main), damit ihre Stile
  // unverändert greifen: Maße und Lage der Knöpfe kommen von dort, nicht von hier (Klaus 18.11.).
  // Kein eigener Kopf: der Erinnerungs-Knopf des Klons sitzt im Kopf der Karte „Notizen“ (Klaus 18.11.: oben keine ganze Reihe
  // verschenken, am Handy zählt die Höhe). Die Seitenleiste ist die der Familienakte (Griff am rechten Rand).
  const notizKnopf = <NotizKnopf vaultHandle={stand.handle} records={stand.records} relations={stand.relations}
      onGespeichert={async (text) => { await laden(); setMeldung({ kind: "success", text }); }} onFehler={(text) => setMeldung({ kind: "error", text })} onKalender={(tag) => meinKalenderOeffnen(tag)}/>;
  return <div className="app-shell pa-kalender">
    <main className="site-main">
    {fehler && <p className="form-error" role="alert">{fehler}</p>}
    <KalenderAnmeldeHinweis vaultHandle={stand.handle} records={stand.records} relations={stand.relations} onRefresh={laden} onNotice={setMeldung}/>
    {meldung && <p className={meldung.kind === "success" ? "erledigt-meldung" : "form-error"} role="status" data-pa-meldung>{meldung.text}</p>}
    <MeinKalender vaultHandle={stand.handle} records={stand.records} relations={stand.relations} onRefresh={laden} onNotice={setMeldung}/>
    <section className="card" data-pa-notizen>
      <div className="card-heading"><div><h2>Notizen</h2></div>{notizKnopf}</div>
      {notizen.length ? <ul className="mk-liste">{notizen.map((r) => { const d = memoryData(r)!, offen = auf === r.id;
        return <li key={r.id} data-pa-notiz={r.id} className={offen ? "offen" : undefined}><div className="fz-kopf fz-voll">
          <span className="mk-zeit">{new Date(d.eventAt).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}</span>
          <span className="mk-text"><strong><FlachText text={d.title} ganz={offen}/></strong>{offen && d.originalText && d.originalText !== d.title && <small>{d.originalText}</small>}</span>
          <KnopfLeiste titel={d.title}>
            {stand.handle && <StiftKnopf titel={d.title} onClick={() => setAendern(r.id)} data-pa-notiz-stift/>}
            {stand.handle && <NotizLoeschen id={r.id} titel={d.title} vaultHandle={stand.handle} onGeloescht={async (text) => { await laden(); setMeldung({ kind: "success", text }); }}/>}
            <AugeKnopf offen={offen} titel={d.title} onClick={() => setAuf(offen ? null : r.id)}/>
          </KnopfLeiste></div></li>; })}</ul> : <p className="muted">Noch keine Notiz.</p>}
    </section>
    <div data-pa-verbinden><KalenderVerbinden vaultHandle={stand.handle} records={stand.records} relations={stand.relations} onRefresh={laden} onNotice={setMeldung}/></div>
    {bearbeitet && stand.handle && memoryData(bearbeitet) && <MemoryBearbeiten event={bearbeitet} data={memoryData(bearbeitet)!} aufgaben={aufgabenZu(stand, bearbeitet.id)} vaultHandle={stand.handle}
      onZu={() => setAendern(null)} onGespeichert={async (text) => { await laden(); setMeldung({ kind: "success", text: text || "Notiz gespeichert." }); }}/>}
    {glocke}
    <PageDialogHost/>
    </main>
    <Seitenleiste seite="kalender" kannZurueck zurueck={() => anAkte({ typ: "pa-kalender-geh", wohin: "zurueck" })} zurStartseite={() => anAkte({ typ: "pa-kalender-geh", wohin: "start" })}
      zurAuswahl={() => anAkte({ typ: "pa-kalender-geh", wohin: "baum" })} zurHilfe={() => anAkte({ typ: "pa-kalender-geh", wohin: "hilfe" })}/>
    </div>;
}

// Nur die Glocke (unsichtbarer Rahmen in der Akte): der Hülle sagen, wann sie läutet, damit sie den Rahmen zeigt.
if (NUR_GLOCKE) {
  document.documentElement.classList.add("pa-nur-glocke");
  let an = false;
  new MutationObserver(() => { const jetzt = Boolean(document.querySelector("[data-app-glocke]")); if (jetzt !== an) { an = jetzt; anAkte({ typ: "pa-glocke", an }); } }).observe(document.body, { childList: true, subtree: true });
}
// Das Anmeldefenster (Google, Microsoft) kehrt auf diese Seite zurück: dann nur das Ergebnis weitergeben und schließen.
if (!anmeldeRueckkehr()) createRoot(document.getElementById("pa-kalender")!).render(<Seite/>);
