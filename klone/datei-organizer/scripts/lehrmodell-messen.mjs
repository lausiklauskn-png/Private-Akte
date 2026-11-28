// Richtwert, kein Nachweis: hilft das Lernen aus Lehrfällen (lib/lehrmodell.ts)? Nachgestellt wie in der App: der Kern rät, die
// „große KI“ (hier das Soll des Stapels) bestätigt, daraus entstehen Lehrfälle. Gelernt an N Stücken, gemessen am Rest (andere Stücke).
// Aufruf: node scripts/lehrmodell-messen.mjs <stapel> [weitere …] [--n 50] [--abstand 2] [--quer <lernstapel>]
import { readFileSync, existsSync } from "node:fs"; import { join, resolve } from "node:path";
import { einlesen } from "../lib/einlesen.ts"; import { siebe } from "../lib/siebe.ts";
import { lehrModell, lehrAnwenden, merkmaleAus } from "../lib/lehrmodell.ts";
import { mcnemar } from "./statistik.mjs";
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const N = +arg("--n", 50), AB = +arg("--abstand", 4), MAX = +arg("--max", 24), quer = arg("--quer", null);
const stapel = process.argv.slice(2).filter((x, i, a) => !x.startsWith("--") && !a[i - 1]?.startsWith("--"));
async function lese(S) {
  S = resolve(S); const soll = JSON.parse(readFileSync(join(S, existsSync(join(S, "SOLL.json")) ? "SOLL.json" : "ERWARTUNG.json"), "utf8")).dateien;
  const out = [];
  for (const x of soll) {
    const b = x.bereich || x.kategorie; if (!b || !existsSync(join(S, x.datei))) continue;
    const text = readFileSync(join(S, x.datei), "utf8");
    const d = (await einlesen({ pfad: x.datei, name: x.datei, geaendert: Date.UTC(2025, 5, 1), bytes: new TextEncoder().encode(text) }, async () => ""))[0];
    const g = siebe(d, 5);
    out.push({ datei: x.datei, soll: b, kern: g.felder?.kategorie?.wert || "", d: g, merkmale: merkmaleAus(text, MAX) });
  }
  return out;
}
let rnd = 7; const zufall = () => ((rnd = (rnd * 1103515245 + 12345) % 2 ** 31) / 2 ** 31);
const mische = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(zufall() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
function messe(lern, pruef) {
  const m = lehrModell(lern.map((x) => ({ bestaetigt: x.soll, merkmale: x.merkmale })));
  let alt = 0, neu = 0, b = 0, c = 0, geaendert = 0;
  for (const x of pruef) {
    const w = lehrAnwenden(x.d, m, AB).felder?.kategorie?.wert || ""; if (w !== x.kern) geaendert++;
    const a = x.kern === x.soll, n = w === x.soll; alt += a; neu += n; if (a && !n) b++; if (!a && n) c++;
  }
  return { n: pruef.length, alt, neu, schlechter: b, besser: c, geaendert };
}
const zeile = (name, r) => console.log(`${name}: ${r.n} Stücke · Kern ${(100 * r.alt / r.n).toFixed(1)} % → mit Lehrfällen ${(100 * r.neu / r.n).toFixed(1)} % · besser ${r.besser}, schlechter ${r.schlechter}, geändert ${r.geaendert} · McNemar p=${mcnemar(r.schlechter, r.besser).toFixed(3)}`);
if (quer) { const l = await lese(quer); for (const S of stapel) zeile(`${quer} → ${S}`, messe(mische(l).slice(0, N), await lese(S))); }
else for (const S of stapel) {
  const alle = await lese(S); const sum = { n: 0, alt: 0, neu: 0, schlechter: 0, besser: 0, geaendert: 0 };
  for (let r = 0; r < 5; r++) { const g = mische(alle); const e = messe(g.slice(0, N), g.slice(N)); for (const k in sum) sum[k] += e[k]; }
  zeile(`${S} (5 Mischungen, je ${N} gelernt)`, sum);
}
