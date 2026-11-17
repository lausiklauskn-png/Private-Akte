// Liest die gesetzten Seiten eines Stapels (scripts/scan-setzen.py) mit der Texterkennung aus dem Workflow-PDF-Klon der Familienakte
// (tesseract.js, deutsche Sprachdaten) und schreibt je Stück den erkannten Text unter demselben Namen nach <ziel>.
// Dazu OCR-GUETE.json: Zeichen- und Wortfehler je Stück gegen den Ausgangstext. Aufruf: node scripts/ocr-stapel.mjs <scanordner> <stapel> <ziel>
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, statSync, copyFileSync } from "node:fs";
import { join, resolve, dirname, relative } from "node:path";
const [scan, stapel, ziel] = process.argv.slice(2, 5).map((p) => resolve(p));
const FA = resolve(process.env.FAMILIENAKTE || "../Meine-Familienakte"), LANG = join(FA, "public/apps/workflow-pdf/vendor/tesseract/lang");
if (!existsSync(join(LANG, "deu.traineddata"))) { console.error("Sprachdaten fehlen:", LANG); process.exit(2); }
const { createWorker } = await import("tesseract.js");
const worker = await createWorker("deu", 1, { langPath: LANG, gzip: false, cachePath: join(ziel, ".tess") });
const gehe = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? (n.endsWith(".txt") ? [p] : gehe(p)) : []; });
// Abstand nach Levenshtein auf Wörtern bzw. Zeichen (bei langen Texten auf Wortebene, Zeichen über die Wortpaare genähert)
const lev = (a, b) => { let v = Array.from({ length: b.length + 1 }, (_, i) => i); for (let i = 1; i <= a.length; i++) { const n = [i]; for (let j = 1; j <= b.length; j++) n[j] = Math.min(v[j] + 1, n[j - 1] + 1, v[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); v = n; } return v[b.length]; };
const norm = (t) => t.replace(/\s+/g, " ").trim();
const guete = [];
for (const sd of gehe(join(scan, ".seiten")).sort()) {
  const pfad = relative(join(scan, ".seiten"), sd);
  const seiten = readdirSync(sd).sort((a, b) => parseInt(a) - parseInt(b));
  let text = "";
  for (const s of seiten) text += (await worker.recognize(readFileSync(join(sd, s)))).data.text + "\n";
  mkdirSync(dirname(join(ziel, pfad)), { recursive: true }); writeFileSync(join(ziel, pfad), text);
  const soll = norm(readFileSync(join(stapel, pfad), "utf8")), ist = norm(text), sw = soll.split(" "), iw = ist.split(" ");
  guete.push({ datei: pfad, seiten: seiten.length, woerter: sw.length, wortfehler: lev(sw, iw), zeichen: soll.length, zeichenfehler: soll.length < 6000 ? lev(soll, ist) : null });
  process.stderr.write(".");
}
await worker.terminate();
for (const d of ["", "belege", "bank"]) for (const n of existsSync(join(stapel, d)) ? readdirSync(join(stapel, d)) : []) if (n.endsWith(".json")) { mkdirSync(join(ziel, d), { recursive: true }); copyFileSync(join(stapel, d, n), join(ziel, d, n)); }
const sum = (k) => guete.reduce((a, g) => a + (g[k] ?? 0), 0), mz = guete.filter((g) => g.zeichenfehler !== null);
writeFileSync(join(ziel, "OCR-GUETE.json"), JSON.stringify({ stuecke: guete.length, wortfehlerAnteil: sum("wortfehler") / sum("woerter"), zeichenfehlerAnteil: mz.reduce((a, g) => a + g.zeichenfehler, 0) / mz.reduce((a, g) => a + g.zeichen, 0), dateien: guete }, null, 1));
console.log(`\n${guete.length} Stücke gelesen · Wortfehler ${(100 * sum("wortfehler") / sum("woerter")).toFixed(1)} %`);
