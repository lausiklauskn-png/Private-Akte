// Hauptzahl Runde 2 (docs/PRUEFSTAPEL-REKURSIV-REGELN.md R2-3): Text und gesetzte Fassung je Stück zusammengezählt, gepaarte Differenz,
// Bootstrap über Absender (10 000, fester Zufall), 90-%-Spanne. Aufruf: node scripts/rekursiv-nachweis2.mjs <stuecke-text.json> <stuecke-gesetzt.json> [--json aus]
import { readFileSync, writeFileSync } from "node:fs";
const F = ["bereich", "schriftstueck", "absender", "person", "frist"];
const lese = (p) => new Map(JSON.parse(readFileSync(p, "utf8")).map((r) => [r.datei, r]));
const T = lese(process.argv[2]), G = lese(process.argv[3]);
const zaehl = (r) => { let a = 0, n = 0, m = 0; if (!r) return { a, n, m }; for (const f of F) { const s = r.soll[f]; if (s === undefined || (f === "person" && s === null)) continue; m++; if (r.alt?.[f] === s) a++; if (r.neu?.[f] === s) n++; } return { a, n, m }; };
const je = [...T.keys()].map((d) => { const x = zaehl(T.get(d)), y = zaehl(G.get(d)); return { g: T.get(d).soll.absender ?? d, a: x.a + y.a, n: x.n + y.n, m: x.m + y.m }; });
const sum = (xs, k) => xs.reduce((s, x) => s + x[k], 0), A = sum(je, "a"), N = sum(je, "n"), M = sum(je, "m");
const gruppen = [...je.reduce((m, x) => m.set(x.g, [...(m.get(x.g) || []), x]), new Map()).values()];
let s = 12345; const zufall = () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648;
const d = []; for (let b = 0; b < 10000; b++) { let a = 0, n = 0, m = 0; for (let i = 0; i < gruppen.length; i++) { const g = gruppen[Math.floor(zufall() * gruppen.length)]; a += sum(g, "a"); n += sum(g, "n"); m += sum(g, "m"); } d.push((n - a) / m); }
d.sort((x, y) => x - y); const q = (p) => d[Math.floor(p * d.length)];
const erg = { alt: A / M, neu: N / M, differenz: (N - A) / M, spanne90: [q(0.05), q(0.95)], pEinseitig: d.filter((x) => x <= 0).length / d.length, urteile: M, absenderGruppen: gruppen.length };
console.log(`Text+gesetzt: alt ${(100 * erg.alt).toFixed(2)} % · neu ${(100 * erg.neu).toFixed(2)} % · Differenz ${(100 * erg.differenz).toFixed(2)} · 90-%-Spanne ${(100 * erg.spanne90[0]).toFixed(2)} bis ${(100 * erg.spanne90[1]).toFixed(2)} · p ≈ ${erg.pEinseitig.toFixed(4)} · ${M} Urteile`);
console.log(erg.spanne90[0] > 0 ? "→ gesichert besser" : "→ NICHT gesichert besser");
if (process.argv.includes("--json")) writeFileSync(process.argv[process.argv.indexOf("--json") + 1], JSON.stringify(erg, null, 1));
