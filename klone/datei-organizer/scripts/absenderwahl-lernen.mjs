// Lernt die Absender-Wahl des Kerns (lib/absenderwahl.ts) – rekursive Verbesserung 15.11.2026, docs/PRUEFSTAPEL-REKURSIV-REGELN.md.
// Quelle: verbrauchte Prüfstapel (Soll = Mehrheit der Einordner bzw. Lernstadt-Schreiber). Merkmale = lib/absenderwahl.ts.
// Aufruf: node scripts/absenderwahl-lernen.mjs [--ohne stapel] [--mit stapel,…] [--aus lib/absenderwahl-daten.ts] [--reihum]
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
const W = fileURLToPath(new URL("..", import.meta.url));
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const A = await import("../lib/absenderwahl.ts"), E = await import("../lib/erkennen.ts"), { KOPF_ZEICHEN } = await import("../lib/siebe.ts").catch(() => ({}));
const V = await import("./rekursiv-versuch.mjs");
export const STAPEL = ["unabhaengig", "briefe-2", "briefe-a", "briefe-b", "briefe-h", "vermieterin", "vermieterin-2026", "familie-k3", "runde-c", "runde-d", "runde-e", "runde-f", "rest", "absender",
  // Runde 2: verbrauchte Prüfstadt (Text und so, wie die App die gesetzten Stücke liest) und ältere Stapel als gelesener Text
  "stadt-pruef", "stadt-pruef-ocr", "familie-k3-ocr", "vermieterin-ocr", "vermieterin-2026-ocr",
  // Runde 3: Welt 3 (Text und gelesen)
  "stadt-3", "stadt-3-ocr"];
const norm = (s) => s == null || s === "" ? null : String(s).toLowerCase().replace(/\b(gmbh|ag|e\.?\s?k\.?|kg|ohg|mbh|e\.?\s?v\.?|co\.?|&|und)\b/g, " ").replace(/[^a-zäöüß0-9]+/g, " ").trim() || null;
const ordnerVon = (s) => s.startsWith("/") ? s : join(W, "pruefstapel-" + s);
const cache = new Map();
export function regelVon(text) { const kopf = text.slice(0, KOPF_ZEICHEN || 1500); let kopfW, gruss; try { kopfW = E.erkenneAbsender(kopf); } catch {} try { gruss = E.absenderAusGruss(text); } catch {} return { kopf: kopfW, gruss }; }
export function daten(s) {
  if (cache.has(s)) return cache.get(s);
  const o = ordnerVon(s), d = [...V.sollVon(s)].filter(([f, x]) => x.absender != null && existsSync(join(o, f))).map(([f, x]) => { const t = readFileSync(join(o, f), "utf8"), r = regelVon(t); return { s, soll: x.absender, regel: r, liste: A.absenderBeispiele(t, r) }; });
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
if (process.argv[1].endsWith("absenderwahl-lernen.mjs")) {
  const mit = (arg("--mit", "") || "").split(",").filter(Boolean), alle = [...STAPEL, ...mit].filter((s) => s !== arg("--ohne"));
  if (process.argv.includes("--reihum")) { let n = 0, a = 0, b = 0;
    for (const t of alle) { const m = lerne(alle.filter((x) => x.replace(/-ocr$/, "") !== t.replace(/-ocr$/, ""))); let ra = 0, rb = 0;
      for (const d of daten(t)) { const r = d.regel.kopf || d.regel.gruss; const rw = norm(r?.wert || "unbekannt"); if (rw === d.soll) ra++; const w = r?.sicher ? rw : norm(A.absenderWaehlen("", d.regel, m) && (() => { let best, bs = -Infinity; for (const x of d.liste) { const s = x.f.reduce((q, y) => q + (m.gewichte[y] || 0), 0); if (s > bs) { bs = s; best = x; } } return best?.wert; })()); if (w === d.soll) rb++; }
      n += daten(t).length; a += ra; b += rb; console.log(t.padEnd(18), `Regel ${(100 * ra / daten(t).length).toFixed(1)} · mit Wahl ${(100 * rb / daten(t).length).toFixed(1)}`); }
    console.log(`reihum: Regel ${(100 * a / n).toFixed(2)} · mit Wahl ${(100 * b / n).toFixed(2)} (n=${n})`); }
  if (arg("--aus")) { const m = lerne(alle); const q = createHash("sha256").update(JSON.stringify(alle.map((s) => [s, daten(s).length]))).digest("hex").slice(0, 12);
    writeFileSync(join(W, arg("--aus")), `// Erzeugt von scripts/absenderwahl-lernen.mjs aus verbrauchten Stapeln (${alle.join(", ")}). Nicht von Hand ändern.\nexport const ABSENDERWAHL_QUELLE = "${q}";\nexport const ABSENDERWAHL = ${JSON.stringify(m)};\n`);
    console.log("geschrieben:", arg("--aus"), Math.round(JSON.stringify(m).length / 1024), "KB", Object.keys(m.gewichte).length, "Merkmale"); }
}
