// Lernt die Frist-Wahl des Kerns (lib/fristwahl.ts) – rekursive Verbesserung Runde 2, docs/PRUEFSTAPEL-REKURSIV-REGELN.md.
// Aufruf: node scripts/fristwahl-lernen.mjs [--reihum] [--aus lib/fristwahl-daten.ts]
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
const W = fileURLToPath(new URL("..", import.meta.url));
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const F = await import("../lib/fristwahl.ts"), E = await import("../lib/erkennen.ts"), { KOPF_ZEICHEN } = await import("../lib/siebe.ts");
const V = await import("./rekursiv-versuch.mjs"), AW = await import("./absenderwahl-lernen.mjs");
export const STAPEL = AW.STAPEL;
const ordnerVon = (s) => s.startsWith("/") ? s : join(W, "pruefstapel-" + s);
export function regelVon(text) { const datum = E.erkenneDatum(text.slice(0, KOPF_ZEICHEN)) || { wert: "2026-11-01", sicher: false }; return { datum, regel: E.erkenneFrist(text, datum.wert, datum.sicher !== false) }; }
const cache = new Map();
export function daten(s) {
  if (cache.has(s)) return cache.get(s);
  const o = ordnerVon(s), d = [...V.sollVon(s)].filter(([f, x]) => x.frist !== undefined && existsSync(join(o, f))).map(([f, x]) => { const t = readFileSync(join(o, f), "utf8"), r = regelVon(t); return { soll: x.frist ?? F.FRIST_KEINE, regel: r.regel, liste: F.fristBeispiele(t, r.regel, r.datum) }; });
  cache.set(s, d); return d;
}
export function lerne(stapel, runden = 10) {
  const dd = stapel.flatMap(daten), w = new Map(), u = new Map(); let c = 1;
  const sc = (f) => f.reduce((s, x) => s + (w.get(x) || 0), 0);
  for (let r = 0; r < runden; r++) for (let j = 0; j < dd.length; j++) { const d = dd[(j * 104729 + r * 13) % dd.length]; const g = d.liste.find((x) => x.key === d.soll); if (!g) { c++; continue; }
    let best = d.liste[0], bs = -Infinity; for (const x of d.liste) { const s = sc(x.f); if (s > bs) { bs = s; best = x; } }
    if (best.key !== g.key) { for (const x of g.f) { w.set(x, (w.get(x) || 0) + 1); u.set(x, (u.get(x) || 0) + c); } for (const x of best.f) { w.set(x, (w.get(x) || 0) - 1); u.set(x, (u.get(x) || 0) - c); } }
    c++; }
  const gewichte = {}; for (const [x, v] of w) { const a = Math.round((v - (u.get(x) || 0) / c) * 100) / 100; if (Math.abs(a) >= 0.05) gewichte[x] = a; }
  return { fassung: 1, gewichte };
}
const wahl = (m, d) => { let best, bs = -Infinity; for (const x of d.liste) { const s = x.f.reduce((q, y) => q + (m.gewichte[y] || 0), 0); if (s > bs) { bs = s; best = x; } } return best?.key; };
if (process.argv[1].endsWith("fristwahl-lernen.mjs")) {
  const alle = STAPEL;
  if (process.argv.includes("--reihum")) { let n = 0, a = 0, b = 0;
    for (const t of alle) { const m = lerne(alle.filter((x) => x.replace(/-ocr$/, "") !== t.replace(/-ocr$/, ""))); let ra = 0, rb = 0;
      for (const d of daten(t)) { const rw = d.regel?.wert ?? F.FRIST_KEINE; if (rw === d.soll) ra++; const w = d.regel?.sicher && !process.argv.includes("--immer") ? rw : wahl(m, d); if (w === d.soll) rb++; }
      n += daten(t).length; a += ra; b += rb; console.log(t.padEnd(22), `Regel ${(100 * ra / daten(t).length).toFixed(1)} · mit Wahl ${(100 * rb / daten(t).length).toFixed(1)}`); }
    console.log(`reihum: Regel ${(100 * a / n).toFixed(2)} · mit Wahl ${(100 * b / n).toFixed(2)} (n=${n})`); }
  if (arg("--aus")) { const m = lerne(alle); const q = createHash("sha256").update(JSON.stringify(alle.map((s) => [s, daten(s).length]))).digest("hex").slice(0, 12);
    writeFileSync(join(W, arg("--aus")), `// Erzeugt von scripts/fristwahl-lernen.mjs aus verbrauchten Stapeln (${alle.join(", ")}). Nicht von Hand ändern.\nexport const FRISTWAHL_QUELLE = "${q}";\nexport const FRISTWAHL = ${JSON.stringify(m)};\n`);
    console.log("geschrieben:", arg("--aus"), Math.round(JSON.stringify(m).length / 1024), "KB"); }
}
