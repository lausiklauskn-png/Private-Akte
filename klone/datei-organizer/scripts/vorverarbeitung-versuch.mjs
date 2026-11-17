// Teil 2 des Trainings (14.11.2026): Bringt eine Vorverarbeitung vor der Texterkennung mehr gelesene Wörter? Objektiv gemessen, ohne Einordner:
// je gesetztem Stück (Scan, Foto) Anteil der Ausgangswörter, die im erkannten Text vorkommen, und Wortfehler – roh (wie die App heute)
// und mit Varianten (Graustufen+Kontrast, Schatten herausrechnen, Schräglage, Binarisierung). Vorverarbeitung im Versuch mit Python.
// Aufruf: node scripts/vorverarbeitung-versuch.mjs <stapel>:<gesetzt>[,…] [--json datei] [--python skript]
import { readFileSync, writeFileSync, mkdtempSync, readdirSync, rmSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { ocr, beenden } from "./leser-node.mjs";
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const PY = arg("--python", new URL("./vorverarbeiten.py", import.meta.url).pathname);
const VAR = (arg("--varianten", "roh,a_grau,b_schatten,c_schatten_gerade,d_binaer,e_app")).split(",");
const { vorverarbeiten } = await import("../src/vorverarbeitung.ts");
// PGM (P5) lesen und schreiben, für die JS-Fassung der App
const pgmLesen = (buf) => { const t = buf.toString("latin1"); const m = t.match(/^P5\s+(?:#.*\s+)*(\d+)\s+(\d+)\s+(\d+)\s/); const off = m[0].length; return { b: +m[1], h: +m[2], daten: new Uint8ClampedArray(buf.subarray(off, off + (+m[1]) * (+m[2]))) }; };
const pgmSchreiben = (g) => Buffer.concat([Buffer.from(`P5\n${g.b} ${g.h}\n255\n`, "latin1"), Buffer.from(g.daten.buffer, g.daten.byteOffset, g.daten.length)]);
const woerter = (t) => (t || "").toLowerCase().replace(/[^a-z0-9äöüß€,.]+/g, " ").split(" ").filter((w) => w.length > 1);
const levW = (a, b) => { let v = Array.from({ length: b.length + 1 }, (_, i) => i); for (let i = 1; i <= a.length; i++) { const n = [i]; for (let j = 1; j <= b.length; j++) n[j] = Math.min(v[j] + 1, n[j - 1] + 1, v[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); v = n; } return v[b.length]; };
const aus = [];
for (const paar of process.argv[2].split(",")) {
  const [st, ge] = paar.split(":").map((p) => resolve(p)); const S = JSON.parse(readFileSync(join(ge, "SETZEN.json"), "utf8"));
  const jobs = Object.entries(S).filter(([, s]) => (s.form === "pdf-scan" || s.form === "foto") && !s.inScanVon && !s.zweitesStueck);
  await Promise.all(Array.from({ length: 4 }, async (_, w) => { for (let i = w; i < jobs.length; i += 4) {
    const [txt, s] = jobs[i]; const d = mkdtempSync(join(tmpdir(), "vv-"));
    try {
      const datei = join(ge, s.datei); let seiten;
      if (s.form === "pdf-scan") { execFileSync("pdftoppm", ["-r", "144", "-f", "1", "-l", "2", "-png", datei, join(d, "s")]); seiten = readdirSync(d).filter((n) => n.endsWith(".png")).sort().map((n) => join(d, n)); }
      else seiten = [datei];
      const texte = Object.fromEntries(VAR.map((v) => [v, []]));
      for (const [k, p] of seiten.entries()) {
        if (VAR.some((v) => v.length > 2 && v !== "roh" && v !== "e_app")) execFileSync("python3", [PY, p, join(d, `v${k}`)]);
        if (VAR.includes("e_app")) { execFileSync("python3", [PY, "--pgm", p, join(d, `g${k}.pgm`)]); writeFileSync(join(d, `e${k}.pgm`), pgmSchreiben(vorverarbeiten(pgmLesen(readFileSync(join(d, `g${k}.pgm`)))))); execFileSync("python3", [PY, "--png", join(d, `e${k}.pgm`), join(d, `v${k}_e_app.png`)]); }
        for (const v of VAR) texte[v].push(await ocr(readFileSync(v === "roh" ? p : join(d, `v${k}_${v}.png`))));
      }
      const quelle = woerter(readFileSync(join(st, txt), "utf8")).slice(0, 400);
      const r = { stapel: st.split("/").pop(), datei: txt, form: s.form, qualitaet: s.qualitaet };
      for (const v of VAR) { const b = woerter(texte[v].join("\n")); const m = new Set(b); r[v] = { gefunden: quelle.filter((x) => m.has(x)).length / quelle.length, wortfehler: Math.min(1, levW(quelle, b.slice(0, 600)) / quelle.length) }; }
      aus.push(r); process.stderr.write(".");
    } catch (e) { process.stderr.write("x"); } finally { rmSync(d, { recursive: true, force: true }); }
  } }));
}
await beenden();
const zus = {};
for (const r of aus) for (const k of [`${r.form}/${r.qualitaet}`, "alle"]) { const z = (zus[k] ??= { n: 0 }); z.n++; for (const v of VAR) { z[v] ??= { gefunden: 0, wortfehler: 0, besser: 0, schlechter: 0 }; z[v].gefunden += r[v].gefunden; z[v].wortfehler += r[v].wortfehler; if (v !== "roh") { if (r[v].gefunden > r.roh.gefunden + 0.02) z[v].besser++; else if (r[v].gefunden < r.roh.gefunden - 0.02) z[v].schlechter++; } } }
console.log("\nForm/Güte            n   " + VAR.map((v) => v.padEnd(20)).join(""));
for (const [k, z] of Object.entries(zus).sort()) console.log(k.padEnd(20) + String(z.n).padEnd(4) + VAR.map((v) => `${(100 * z[v].gefunden / z.n).toFixed(1)}%${v === "roh" ? "" : ` +${z[v].besser}/-${z[v].schlechter}`}`.padEnd(20)).join(""));
if (arg("--json")) writeFileSync(resolve(arg("--json")), JSON.stringify({ zusammen: zus, dateien: aus }, null, 1));
