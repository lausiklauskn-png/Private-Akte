/**
 * Woher die Dateien kommen. Die Originale bleiben, wo sie sind – gelesen wird nur; zurückgeschrieben wird
 * höchstens organizer-index.json (und nur, wo der Ordner das erlaubt) – und, seit Klaus' Entscheidung vom 17.11., ein Scan aus
 * „Foto / Scan“ in den Unterordner „Scans“ (ablegen; bisher nur „Ordner am PC“).
 *
 * 1 Ordner am PC (Chrome/Edge): Ordnerwahl des Browsers, lesen und schreiben.
 * 2 Datei-Organizer Pro bzw. Familienakte Pro (Android, Windows): der Ordnerzugriff der App (Plugin „FamilyFolders“, Android-Ordnerwahl
 *   auch SD-Karte bzw. Windows-Ordnerdialog; android/…/DoOrdnerPlugin.java und windows/engine/…/DesktopOrdner.java mit denselben
 *   Aufrufen). Datei-Organizer Pro merkt sich die zuletzt gewählten Ordner (gemerkt/wiederOeffnen). Am Gerät noch ungeprüft.
 * 3 Dateien oder Ordner wählen (jeder Browser, auch am Handy): nur lesen, der Index wird heruntergeladen.
 * 4 Testordner: die erfundenen Testdaten aus dem Repo.
 */
export type QuellDatei = {
  pfad: string; name: string; geaendert: number; lesen: () => Promise<Uint8Array>;
  /** Große Ordner (0.4.3): Größe vorab, Dateikopf und Prüfsumme ohne die ganze Datei zu laden. Fehlt das, wird ganz gelesen. */
  groesse?: number; kopf?: (n: number) => Promise<Uint8Array>; pruefsumme?: () => Promise<string>;
};
/** Eine Browser-Datei (File) als Quelldatei: Kopf und Prüfsumme über Stücke (file.slice), nie die ganze Datei auf einmal. */
function ausFile(pfad: string, f: File): QuellDatei {
  return { pfad, name: f.name, geaendert: f.lastModified, groesse: f.size, lesen: async () => new Uint8Array(await f.arrayBuffer()),
    kopf: async (n) => new Uint8Array(await f.slice(0, n).arrayBuffer()),
    pruefsumme: () => sha256Stueckweise(f.size, async (o, l) => new Uint8Array(await f.slice(o, o + l).arrayBuffer())) };
}
export type Quelle = {
  art: "ordner" | "nativ" | "auswahl" | "test";
  name: string;
  dateien: () => Promise<QuellDatei[]>;
  /** Index in den Ordner schreiben; fehlt, wenn der Ordner nur gelesen werden kann. */
  schreiben?: (name: string, text: string) => Promise<void>;
  /** Eine neue Datei in einen Unterordner legen (Scans); überschreibt nie, bei gleichem Namen kommt „_2“ … dazu. Fehlt, wo das nicht geht. */
  ablegen?: (ordner: string, datei: File) => Promise<QuellDatei>;
  /** Vorhandenen Index lesen, falls da. */
  indexLesen?: () => Promise<string | null>;
  /** Ordner am PC: das Handle zum Merken (Weitermachen nach Abbruch ohne Auswahl-Fenster). */
  handle?: unknown;
  /** Gemerkter Ordner der App (Datei-Organizer Pro): Kennung für „Zuletzt“ und Weitermachen. */
  merkId?: string;
};

export const INDEX_NAME = "organizer-index.json";
import { ueberspringen as UEBERSPRINGEN } from "../lib/einlesen.ts";
import { sha256Stueckweise } from "./sha256.ts";

// ---------- 1 Ordner am PC ----------
type DirHandle = { name: string; kind: "directory"; values: () => AsyncIterable<FileHandle | DirHandle>; getFileHandle: (n: string, o?: { create?: boolean }) => Promise<FileHandle>; getDirectoryHandle: (n: string, o?: { create?: boolean }) => Promise<DirHandle>; queryPermission?: (o: { mode: string }) => Promise<string>; requestPermission?: (o: { mode: string }) => Promise<string> };
type FileHandle = { name: string; kind: "file"; getFile: () => Promise<File>; createWritable: () => Promise<{ write: (d: string | Blob) => Promise<void>; close: () => Promise<void> }> };
type FensterMitOrdner = Window & { showDirectoryPicker?: (o?: { mode?: string; id?: string }) => Promise<DirHandle> };

export const ordnerWahlMoeglich = () => typeof window !== "undefined" && typeof (window as FensterMitOrdner).showDirectoryPicker === "function";

export async function ordnerWaehlen(): Promise<Quelle | null> {
  try {
    const h = await (window as FensterMitOrdner).showDirectoryPicker!({ mode: "readwrite", id: "datei-organizer" });
    return ausHandle(h);
  } catch (e) { if ((e as Error).name === "AbortError") return null; throw e; }
}

export function ausHandle(h: DirHandle): Quelle {
  return {
    art: "ordner", name: h.name, handle: h,
    async dateien() {
      const aus: QuellDatei[] = [];
      const lauf = async (d: DirHandle, pfad: string, tiefe: number) => {
        if (tiefe > 12) return;
        for await (const e of d.values()) {
          if (UEBERSPRINGEN(e.name)) continue;
          const p = pfad ? `${pfad}/${e.name}` : e.name;
          if (e.kind === "directory") await lauf(e, p, tiefe + 1);
          else { const f = await e.getFile(); aus.push(ausFile(p, f)); }
        }
      };
      await lauf(h, "", 0);
      return aus.sort((a, b) => a.pfad.localeCompare(b.pfad, "de"));
    },
    async schreiben(name, text) { const f = await h.getFileHandle(name, { create: true }); const w = await f.createWritable(); await w.write(text); await w.close(); },
    async ablegen(ordner, datei) {
      const d = await h.getDirectoryHandle(ordner, { create: true });
      const punkt = datei.name.lastIndexOf("."), stamm = punkt > 0 ? datei.name.slice(0, punkt) : datei.name, endung = punkt > 0 ? datei.name.slice(punkt) : "";
      let name = datei.name;
      for (let i = 2; i < 1000; i++) { try { await d.getFileHandle(name); name = `${stamm}_${i}${endung}`; } catch { break; } }
      const f = await d.getFileHandle(name, { create: true }); const w = await f.createWritable(); await w.write(datei); await w.close();
      return ausFile(`${ordner}/${name}`, await f.getFile());
    },
    async indexLesen() { try { return await (await (await h.getFileHandle(INDEX_NAME)).getFile()).text(); } catch { return null; } },
  };
}

/** Unterordner des gewählten Ordners, in den Scans aus „Foto / Scan“ geschrieben werden (Klaus 17.11.). */
export const SCAN_ORDNER = "Scans";

export async function erlaubnisPruefen(h: DirHandle): Promise<boolean> {
  try {
    if ((await h.queryPermission?.({ mode: "readwrite" })) === "granted") return true;
    return (await h.requestPermission?.({ mode: "readwrite" })) === "granted";
  } catch { return false; }
}

// ---------- 2 Datei-Organizer Pro / Familienakte Pro: nativer Ordnerzugriff (Android und Windows) ----------
type Eintrag = { name: string; art: "datei" | "ordner"; groesse: number; geaendert?: number };
export type GemerkterOrdner = { id: string; name: string; da: boolean };
type OrdnerPlugin = {
  ordnerWaehlen(a: { titel?: string }): Promise<{ token?: string; name?: string; id?: string; cancelled?: boolean }>;
  ordnerListe(a: { token: string; pfad: string }): Promise<{ eintraege: Eintrag[] }>;
  dateiLesen(a: { token: string; pfad: string; offset: number; laenge: number }): Promise<{ data: string }>;
  dateiBeginn(a: { token: string; pfad: string }): Promise<{ id: string }>;
  dateiAnhaengen(a: { id: string; offset: number; data: string }): Promise<{ size: number }>;
  dateiFertig(a: { id: string; size: number }): Promise<{ size: number; sha256: string }>;
  /** Große Ordner (Datei-Organizer Pro 0.4.3; fehlt in der Familienakte → Rückfall über Stücke). */
  pruefsumme?(a: { token: string; pfad: string }): Promise<{ sha256: string; groesse: number }>;
  speicherFrei?(a: { token: string }): Promise<{ frei: number }>;
  arbeitsordner?(a: { token: string }): Promise<{ pfad: string; neu: boolean }>;
  /** Dauerhafte Freigabe (Datei-Organizer Pro 0.4.1; die Familienakte kennt sie noch nicht → fehlt dort). */
  gemerkt?(): Promise<{ ordner: GemerkterOrdner[] }>;
  wiederOeffnen?(a: { id: string }): Promise<{ token: string; name: string }>;
  vergessen?(a: { id: string }): Promise<unknown>;
};
/** „Teilen an die App“ (Android) bzw. „Öffnen mit“ (Windows): Kopien im App-Speicher, abgeholt als Stapel. */
type EingangPlugin = {
  abholen(): Promise<{ stapel: string; dateien: Array<{ name: string; groesse: number; geaendert?: number }>; weitere?: number }>;
  lesen(a: { stapel: string; name: string; offset: number; laenge: number }): Promise<{ data: string }>;
  addListener?(name: "neu", f: () => void): Promise<{ remove?: () => unknown }> | { remove?: () => unknown };
};
type DateienPlugin = { speichern(a: { name: string; mime?: string; data: string }): Promise<{ gespeichert: boolean }> };
type CapPlugins = { FamilyFolders?: OrdnerPlugin; DoEingang?: EingangPlugin; DoDateien?: DateienPlugin };
type CapFenster = Window & { Capacitor?: { isNativePlatform?: () => boolean; getPlatform?: () => string; Plugins?: CapPlugins } };
const capPlugins = (): CapPlugins | null => {
  const cap = typeof window !== "undefined" ? (window as CapFenster).Capacitor : undefined;
  return cap?.isNativePlatform?.() ? cap.Plugins || null : null;
};
export const nativerOrdner = (): OrdnerPlugin | null => { const p = capPlugins()?.FamilyFolders; return p?.ordnerWaehlen ? p : null; };
/** Windows-App: der Ordner liegt „am PC“, sonst „auf dem Gerät“. */
export const nativPlattform = (): string => (typeof window !== "undefined" ? (window as CapFenster).Capacitor?.getPlatform?.() || "" : "");
const STUECK = 1024 * 1024;
const b64zuBytes = (s: string) => { const bin = atob(s); const o = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) o[i] = bin.charCodeAt(i); return o; };
const bytesZuB64 = (b: Uint8Array) => { let s = ""; for (let i = 0; i < b.length; i += 0x8000) s += String.fromCharCode(...b.subarray(i, i + 0x8000)); return btoa(s); };
async function stueckweise(groesse: number, holen: (offset: number, laenge: number) => Promise<string>) {
  const o = new Uint8Array(groesse); let k = 0;
  for (let off = 0; off < groesse; off += STUECK) { const t = b64zuBytes(await holen(off, Math.min(STUECK, groesse - off))); o.set(t.subarray(0, groesse - k), k); k += t.length; }
  return k < groesse ? o.subarray(0, k) : o;
}

function nativeQuelle(p: OrdnerPlugin, token: string, name: string): Quelle {
  const lesen = (pfad: string, groesse: number) => stueckweise(groesse, async (offset, laenge) => (await p.dateiLesen({ token, pfad, offset, laenge })).data);
  return {
    art: "nativ", name: name || "Ordner",
    async dateien() {
      const aus: QuellDatei[] = [];
      const lauf = async (pfad: string, tiefe: number) => {
        if (tiefe > 12) return;
        for (const e of (await p.ordnerListe({ token, pfad })).eintraege) {
          if (UEBERSPRINGEN(e.name)) continue;
          const pp = pfad ? `${pfad}/${e.name}` : e.name;
          if (e.art === "ordner") await lauf(pp, tiefe + 1);
          else aus.push({ pfad: pp, name: e.name, geaendert: typeof e.geaendert === "number" ? e.geaendert : 0, groesse: e.groesse, lesen: () => lesen(pp, e.groesse),
            kopf: async (n) => b64zuBytes((await p.dateiLesen({ token, pfad: pp, offset: 0, laenge: Math.min(n, e.groesse) })).data),
            // Die App rechnet am Ort (die Bytes gehen nicht durch die Brücke); ohne diesen Aufruf (Familienakte) über Stücke.
            pruefsumme: p.pruefsumme ? async () => (await p.pruefsumme!({ token, pfad: pp })).sha256
              : () => sha256Stueckweise(e.groesse, async (offset, laenge) => b64zuBytes((await p.dateiLesen({ token, pfad: pp, offset, laenge: Math.min(laenge, STUECK) })).data), STUECK) });
        }
      };
      await lauf("", 0);
      return aus.sort((a, b) => a.pfad.localeCompare(b.pfad, "de"));
    },
    async schreiben(name, text) {
      const bytes = new TextEncoder().encode(text);
      const { id } = await p.dateiBeginn({ token, pfad: name });
      for (let off = 0; off < bytes.length; off += STUECK) await p.dateiAnhaengen({ id, offset: off, data: bytesZuB64(bytes.subarray(off, off + STUECK)) });
      await p.dateiFertig({ id, size: bytes.length });
    },
    async indexLesen() {
      try { const e = (await p.ordnerListe({ token, pfad: "" })).eintraege.find((x) => x.name === INDEX_NAME); return e ? new TextDecoder().decode(await lesen(INDEX_NAME, e.groesse)) : null; } catch { return null; }
    },
  };
}

export async function nativWaehlen(): Promise<Quelle | null> {
  const p = nativerOrdner();
  if (!p) return null;
  const r = await p.ordnerWaehlen({ titel: "Ordner „Datei-Organizer“ wählen (z. B. auf der SD-Karte)" });
  if (r.cancelled || !r.token) return null;
  return nativeQuelle(p, r.token, r.name || "Ordner");
}
/** Zuletzt gewählte Ordner (dauerhafte Freigabe), neueste zuerst; leer, wo die App das nicht kann. */
export async function nativGemerkt(): Promise<GemerkterOrdner[]> {
  const p = nativerOrdner();
  if (!p?.gemerkt) return [];
  try { return ((await p.gemerkt()).ordner || []).filter((o) => o && typeof o.id === "string"); } catch { return []; }
}
/** Gemerkten Ordner ohne Auswahl-Fenster wieder öffnen. Ist die Freigabe weg (Ordner verschoben, SD-Karte fehlt), kommt ein Fehler. */
export async function nativWieder(id: string): Promise<Quelle> {
  const p = nativerOrdner();
  if (!p?.wiederOeffnen) throw new Error("Diese App kann sich keinen Ordner merken.");
  try { const r = await p.wiederOeffnen({ id }); return { ...nativeQuelle(p, r.token, r.name), merkId: id }; }
  catch { throw new Error("Der Ordner ist nicht mehr erreichbar (verschoben, umbenannt oder Speicherkarte entfernt). Bitte neu wählen."); }
}
export async function nativVergessen(id: string) { try { await nativerOrdner()?.vergessen?.({ id }); } catch { /* egal */ } }

/** Geteilte bzw. mit „Öffnen mit“ übergebene Dateien als Quelle (Kopien im App-Speicher); null, wenn nichts wartet. */
export const nativerEingang = (): EingangPlugin | null => { const p = capPlugins()?.DoEingang; return p?.abholen ? p : null; };
export async function eingangAbholen(): Promise<Quelle | null> {
  const p = nativerEingang();
  if (!p) return null;
  const r = await p.abholen();
  if (!r.stapel || !r.dateien?.length) return null;
  const { stapel } = r;
  const dateien = r.dateien.filter((d) => !UEBERSPRINGEN(d.name));
  if (!dateien.length) return null;
  return {
    art: "auswahl", name: dateien.length === 1 ? dateien[0].name : "Geteilte Dateien",
    async dateien() {
      const stueck = (name: string) => async (offset: number, laenge: number) => b64zuBytes((await p.lesen({ stapel, name, offset, laenge: Math.min(laenge, STUECK) })).data);
      return dateien.map((d) => ({ pfad: d.name, name: d.name, geaendert: typeof d.geaendert === "number" ? d.geaendert : Date.now(), groesse: d.groesse,
        lesen: () => stueckweise(d.groesse, async (offset, laenge) => (await p.lesen({ stapel, name: d.name, offset, laenge })).data),
        kopf: (n: number) => stueck(d.name)(0, Math.min(n, d.groesse)), pruefsumme: () => sha256Stueckweise(d.groesse, stueck(d.name), STUECK) }));
    },
  };
}

export const nativSpeichernMoeglich = (): boolean => !!capPlugins()?.DoDateien?.speichern;
/** „Speichern unter …“ der App (WebView kann kein <a download>). null = nicht verfügbar (Browser), sonst gespeichert ja/nein. */
export async function nativSpeichern(name: string, text: string, mime = "application/json"): Promise<boolean | null> {
  const p = capPlugins()?.DoDateien;
  if (!p?.speichern) return null;
  return !!(await p.speichern({ name, mime, data: bytesZuB64(new TextEncoder().encode(text)) })).gespeichert;
}

// ---------- 3 Auswahl ----------
export function ausAuswahl(liste: FileList | File[], name: string): Quelle {
  const dateien = [...liste];
  return {
    art: "auswahl", name,
    async dateien() {
      return dateien.filter((f) => !UEBERSPRINGEN(f.name)).map((f) => {
        const rel = (f as File & { webkitRelativePath?: string }).webkitRelativePath;
        const pfad = rel ? rel.split("/").slice(1).join("/") || f.name : f.name;
        return ausFile(pfad, f);
      }).sort((a, b) => a.pfad.localeCompare(b.pfad, "de"));
    },
    async indexLesen() { const f = dateien.find((x) => x.name === INDEX_NAME); return f ? f.text() : null; },
  };
}

// ---------- 3b Hineingezogen (Drag and Drop): Dateien und ganze Ordner ----------
type ZiehEintrag = { isFile: boolean; isDirectory: boolean; name: string; fullPath: string; file?: (ok: (f: File) => void, nein: (e: unknown) => void) => void; createReader?: () => { readEntries: (ok: (l: ZiehEintrag[]) => void, nein: (e: unknown) => void) => void } };
export async function ausZiehen(dt: DataTransfer): Promise<Quelle | null> {
  const wurzeln = [...dt.items].filter((i) => i.kind === "file").map((i) => (i as unknown as { webkitGetAsEntry?: () => ZiehEintrag | null }).webkitGetAsEntry?.() || null) as (ZiehEintrag | null)[];
  const lose = [...dt.files];
  const gefunden: { pfad: string; datei: File }[] = [];
  const lauf = async (e: ZiehEintrag): Promise<void> => {
    if (e.isFile && e.file) { const f = await new Promise<File>((ok, nein) => e.file!(ok, nein)); gefunden.push({ pfad: e.fullPath.replace(/^\//, ""), datei: f }); return; }
    if (e.isDirectory && e.createReader) {
      const leser = e.createReader();
      for (;;) { const teil = await new Promise<ZiehEintrag[]>((ok, nein) => leser.readEntries(ok, nein)); if (!teil.length) break; for (const k of teil) await lauf(k); }
    }
  };
  if (wurzeln.some(Boolean)) { for (const w of wurzeln) if (w) await lauf(w); }
  else for (const f of lose) gefunden.push({ pfad: f.name, datei: f });
  if (!gefunden.length) return null;
  const ordner = wurzeln.filter((w) => w?.isDirectory);
  const name = ordner.length === 1 && wurzeln.length === 1 ? ordner[0]!.name : "Hineingezogene Dateien";
  return {
    art: "auswahl", name,
    async dateien() {
      return gefunden.filter((g) => !UEBERSPRINGEN(g.datei.name)).map((g) => ausFile(g.pfad, g.datei)).sort((a, b) => a.pfad.localeCompare(b.pfad, "de"));
    },
  };
}

// ---------- 4 Testordner ----------
export function testOrdner(vorgabe?: string): Quelle {
  // Im Repo liegt der Testordner neben app/ (../testdaten/), in einer Vorschau neben der Seite (./testdaten/).
  let basis = vorgabe || "";
  return {
    art: "test", name: "Testordner (erfunden)",
    async dateien() {
      let r: Response | null = null;
      for (const b of vorgabe ? [vorgabe] : ["../testdaten/", "./testdaten/"]) {
        basis = new URL(b, document.baseURI).href;
        r = await fetch(new URL("dateien.json", basis)).catch(() => null);
        if (r?.ok && (r.headers.get("content-type") || "").includes("json")) break;
      }
      if (!r?.ok) throw new Error("Testordner nicht gefunden.");
      const liste: string[] = await r.json();
      return liste.map((pfad) => ({ pfad, name: pfad.split("/").pop()!, geaendert: datumAusName(pfad), lesen: async () => { const a = await fetch(new URL(pfad.split("/").map(encodeURIComponent).join("/"), basis)); if (!a.ok) throw new Error(`${pfad} fehlt`); return new Uint8Array(await a.arrayBuffer()); } }));
    },
  };
}
/** Im Testordner gibt es kein Änderungsdatum über HTTP; ein festes, damit „Doppelt“ und Datum ohne Text gleich bleiben. */
const datumAusName = (pfad: string) => { const m = pfad.match(/(20\d{2})[-_]?(\d{2})[-_]?(\d{2})/); return m ? Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : Date.UTC(2026, 10, 1); };

export function herunterladen(name: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
  const a = document.createElement("a"); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
