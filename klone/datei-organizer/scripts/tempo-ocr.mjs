// Tempo der Texterkennung (Training 14.11.2026): dieselben gesetzten Stücke mit 1, 2, 3, 4 Erkennungen nebeneinander lesen
// (wie die App mit leistung.gleichzeitig), ohne Zwischenspeicher. Zeit je Seite und Gesamtzeit; dazu die Vorverarbeitung allein.
// Aufruf: LESER_OHNE_CACHE=1 node scripts/tempo-ocr.mjs <gesetzt-ordner> [--n 40] [--stufen 1,2,4]
import { readFileSync, readdirSync, mkdtempSync, rmSync } from "node:fs";
import { join, resolve } from "node:path"; import { tmpdir } from "node:os"; import { execFileSync, spawnSync } from "node:child_process";
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const G = resolve(process.argv[2]), N = Number(arg("--n", 40)), STUFEN = arg("--stufen", "1,2,4").split(",").map(Number);
const S = JSON.parse(readFileSync(join(G, "SETZEN.json"), "utf8"));
const seiten = [];
for (const s of Object.values(S).filter((x) => x.form === "pdf-scan" && !x.inScanVon).slice(0, N)) {
  const d = mkdtempSync(join(tmpdir(), "to-")); execFileSync("pdftoppm", ["-r", "144", "-f", "1", "-l", "1", "-png", join(G, s.datei), join(d, "s")]);
  for (const n of readdirSync(d)) seiten.push(readFileSync(join(d, n))); rmSync(d, { recursive: true, force: true });
}
console.log(`${seiten.length} Seiten (Scans, 144 dpi wie die App)`);
for (const w of STUFEN) {
  // eigener Prozess je Stufe, damit die Worker-Zahl sauber gilt
  const r = spawnSync("node", ["-e", `
    const { ocr, beenden } = await import(${JSON.stringify(new URL("./leser-node.mjs", import.meta.url).href)});
    const fs = await import("node:fs"); const seiten = JSON.parse(fs.readFileSync(0, "utf8")).map((b) => Buffer.from(b, "base64"));
    const t0 = Date.now(); let i = 0;
    await Promise.all(Array.from({ length: ${w} }, async () => { while (i < seiten.length) { const s = seiten[i++]; await ocr(new Uint8Array(s)); } }));
    console.log(JSON.stringify({ ms: Date.now() - t0 })); await beenden(); process.exit(0);`, "--input-type=module"], { input: JSON.stringify(seiten.map((b) => b.toString("base64"))), env: { ...process.env, OCR_WORKER: String(w), LESER_OHNE_CACHE: "1" }, encoding: "utf8", maxBuffer: 1e9 });
  const ms = JSON.parse(r.stdout.trim().split("\n").pop()).ms;
  console.log(`${w} gleichzeitig: ${(ms / 1000).toFixed(1)} s gesamt · ${(ms / seiten.length / 1000).toFixed(2)} s je Seite`);
}
