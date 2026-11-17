// Leser für Node-Proben wie in der App: PDF-Text mit pdf.js; PDF ohne Textebene → erste Seiten als Bild (pdftoppm, 144 dpi wie
// die App mit scale 2) → Texterkennung (tesseract.js, deutsche Sprachdaten aus src/public/vendor, byte-gleich mit der Familienakte).
// Zwischenspeicher je Fingerabdruck in .ocr-cache.json (Wurzel, nicht im Repo). Mehrere Erkennungs-Worker parallel (OCR_WORKER, Standard 4).
import { readFileSync, writeFileSync, existsSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { pdfTextLesen } from "../lib/pdf-text.ts";

const WURZEL = fileURLToPath(new URL("..", import.meta.url));
export const LANG = join(WURZEL, "src/public/vendor/tesseract/lang");
const SCAN_SEITEN = 2; // wie src/pdf.ts
const cacheDatei = join(WURZEL, ".ocr-cache.json");
let cache = null, geaendert = 0;
// LESER_OHNE_CACHE=1: nichts aus dem Zwischenspeicher nehmen und nichts hineinschreiben (für Tempo-Messungen)
const OHNE_CACHE = !!process.env.LESER_OHNE_CACHE;
const ladeCache = () => (cache ??= OHNE_CACHE ? {} : existsSync(cacheDatei) ? JSON.parse(readFileSync(cacheDatei, "utf8")) : {});
export function cacheSichern() { if (cache && geaendert && !OHNE_CACHE) { writeFileSync(cacheDatei, JSON.stringify(cache)); geaendert = 0; } }

let pdfjs = null;
async function pdfJs() {
  if (!pdfjs) { pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs"); pdfjs.GlobalWorkerOptions.workerSrc = new URL("../node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs", import.meta.url).href; }
  return pdfjs;
}
let planer = null;
async function ocrPlaner() {
  if (planer) return planer;
  const { createWorker, createScheduler } = await import("tesseract.js");
  planer = createScheduler();
  const n = Number(process.env.OCR_WORKER || 4);
  for (let i = 0; i < n; i++) planer.addWorker(await createWorker("deu", 1, { langPath: LANG, gzip: false, cachePath: join(tmpdir(), "do-tess") }));
  return planer;
}
export const statistik = { ocrBilder: 0, ocrMs: 0, ausCache: 0, scanPdf: 0, haenger: 0, seitenFehler: 0 };
const OCR_FRIST = Number(process.env.OCR_FRIST || 60000);
/** Texterkennung für ein Bild (Bytes); Ergebnis zwischengespeichert. */
const LOG = process.env.LESER_LOG ? (x) => process.stderr.write(`[leser ${new Date().toISOString().slice(11, 19)}] ${x}\n`) : () => {};
// LESER_VORVERARBEITUNG=1: vor der Erkennung dieselbe Rechnung wie die App (src/vorverarbeitung.ts); Bild über Python (Pillow) zu Graustufen
// und zurück zu PNG, weil Node kein Bild dekodieren kann. Eigener Schlüssel im Zwischenspeicher.
const VV = !!process.env.LESER_VORVERARBEITUNG;
async function vorbereiten(bytes) {
  const { vorverarbeiten } = await import("../src/vorverarbeitung.ts");
  const d = mkdtempSync(join(tmpdir(), "vv-")); const py = fileURLToPath(new URL("./vorverarbeiten.py", import.meta.url));
  try {
    writeFileSync(join(d, "ein"), bytes); execFileSync("python3", [py, "--pgm", join(d, "ein"), join(d, "g.pgm")]);
    const buf = readFileSync(join(d, "g.pgm")), t = buf.toString("latin1"), m = t.match(/^P5\s+(?:#.*\s+)*(\d+)\s+(\d+)\s+(\d+)\s/), off = m[0].length;
    const g = vorverarbeiten({ b: +m[1], h: +m[2], daten: new Uint8ClampedArray(buf.subarray(off, off + (+m[1]) * (+m[2]))) });
    writeFileSync(join(d, "a.pgm"), Buffer.concat([Buffer.from(`P5\n${g.b} ${g.h}\n255\n`, "latin1"), Buffer.from(g.daten.buffer, g.daten.byteOffset, g.daten.length)]));
    execFileSync("python3", [py, "--png", join(d, "a.pgm"), join(d, "a.png")]);
    return new Uint8Array(readFileSync(join(d, "a.png")));
  } finally { rmSync(d, { recursive: true, force: true }); }
}
export async function ocr(bytes) {
  if (VV) bytes = await vorbereiten(bytes).catch(() => bytes);
  const k = createHash("sha256").update(bytes).digest("hex"); const c = ladeCache();
  if (k in c) { statistik.ausCache++; return c[k]; }
  const t0 = Date.now(); LOG(`ocr ${k.slice(0, 8)} ${bytes.length}`);
  // Auch das Anlegen der Worker bekommt eine Frist (hing in der Sitzung zweimal ohne Rückmeldung)
  let uhr0; const p = await Promise.race([ocrPlaner(), new Promise((ok) => { uhr0 = setTimeout(() => ok(null), OCR_FRIST); })]); clearTimeout(uhr0);
  if (!p) { statistik.haenger++; planer = null; return ""; }
  LOG(`planer bereit ${k.slice(0, 8)}`);
  // Frist wie in der App (src/vendor.ts): hängt die Erkennung, bleibt das Bild ohne Text. Nach zwei Hängern werden die Worker neu gestartet.
  let uhr; const frist = new Promise((ok) => { uhr = setTimeout(() => ok(null), OCR_FRIST); });
  const r = await Promise.race([p.addJob("recognize", Buffer.from(bytes)).catch(() => ({ data: { text: "" } })), frist]); clearTimeout(uhr);
  if (!r) { statistik.haenger++; if (statistik.haenger % 2 === 0 && planer === p) { planer = null; p.terminate().catch(() => {}); } return ""; }
  const t = r.data.text;
  statistik.ocrBilder++; statistik.ocrMs += Date.now() - t0;
  if (t.trim()) { c[k] = t; if (++geaendert % 25 === 0) cacheSichern(); }
  return t;
}
/** PdfLeser wie die App: Textebene, sonst Seitenbilder per Texterkennung (mitOcr = false: nur Textebene). */
export function pdfLeser(mitOcr = true) {
  return async (bytes) => {
    const t = await pdfTextLesen(await pdfJs(), bytes);
    if (t.voll.trim() || !mitOcr) return t;
    statistik.scanPdf++;
    const k = (VV ? "scanpdf-vv:" : "scanpdf:") + createHash("sha256").update(bytes).digest("hex"); const c = ladeCache();
    let text = c[k];
    if (text === undefined) {
      const d = mkdtempSync(join(tmpdir(), "do-pdf-"));
      try {
        writeFileSync(join(d, "a.pdf"), bytes);
        execFileSync("pdftoppm", ["-r", "144", "-f", "1", "-l", String(SCAN_SEITEN), "-png", join(d, "a.pdf"), join(d, "s")]);
        // je Seite einzeln abfangen: eine Seite, die nicht gelesen werden kann, lässt die anderen stehen
        const teile = await Promise.all(readdirSync(d).filter((n) => n.endsWith(".png")).sort().map((n) => ocr(readFileSync(join(d, n))).catch(() => { statistik.seitenFehler++; return ""; })));
        text = teile.map((x) => x.trim()).filter(Boolean).join("\n\n");
      } catch { text = ""; } finally { rmSync(d, { recursive: true, force: true }); }
      if (text) { c[k] = text; geaendert++; } // Leeres nie merken: beim nächsten Mal wird neu gelesen
    }
    return (text.match(/[A-Za-zÄÖÜäöüß]{3,}/g) || []).length >= 4 ? { kopf: text.slice(0, 1500), voll: text } : t;
  };
}
export async function beenden() { cacheSichern(); if (planer) { const p = planer; planer = null; await Promise.race([p.terminate().catch(() => {}), new Promise((ok) => setTimeout(ok, 5000).unref())]); } }
