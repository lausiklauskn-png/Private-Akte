// Hauptkennzahl der rekursiven Verbesserung (docs/PRUEFSTAPEL-REKURSIV-REGELN.md Punkt 8): Anteil richtiger Feld-Urteile über fünf
// Felder, gepaarte Differenz je Stück, Bootstrap über Absender (10 000 Ziehungen, fester Zufall), 90-%-Spanne.
// Aufruf: node scripts/rekursiv-nachweis.mjs <stuecke.json> [--json aus.json]   (stuecke aus scripts/messen-briefe.mjs --stuecke)
import { readFileSync, writeFileSync } from "node:fs";
const z = JSON.parse(readFileSync(process.argv[2], "utf8")), F = ["bereich", "schriftstueck", "absender", "person", "frist"];
const je = z.map((r) => { let a = 0, n = 0, m = 0; for (const f of F) { const s = r.soll[f]; if (s === undefined || (f === "person" && s === null)) continue; m++; if (r.alt?.[f] === s) a++; if (r.neu?.[f] === s) n++; } return { g: r.soll.absender ?? r.datei, a, n, m }; });
const sum = (xs, k) => xs.reduce((s, x) => s + x[k], 0);
const A = sum(je, "a"), N = sum(je, "n"), M = sum(je, "m");
const gruppen = [...je.reduce((m, x) => m.set(x.g, [...(m.get(x.g) || []), x]), new Map()).values()];
let s = 12345; const zufall = () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648;
const d = []; for (let b = 0; b < 10000; b++) { let a = 0, n = 0, m = 0; for (let i = 0; i < gruppen.length; i++) { const g = gruppen[Math.floor(zufall() * gruppen.length)]; a += sum(g, "a"); n += sum(g, "n"); m += sum(g, "m"); } d.push((n - a) / m); }
d.sort((x, y) => x - y); const q = (p) => d[Math.floor(p * d.length)];
const erg = { alt: A / M, neu: N / M, differenz: (N - A) / M, spanne90: [q(0.05), q(0.95)], anteilNichtBesser: d.filter((x) => x <= 0).length / d.length, stuecke: z.length, urteile: M, absenderGruppen: gruppen.length };
console.log(`alt ${(100 * erg.alt).toFixed(2)} % · neu ${(100 * erg.neu).toFixed(2)} % · Differenz ${(100 * erg.differenz).toFixed(2)} Punkte · 90-%-Spanne ${(100 * erg.spanne90[0]).toFixed(2)} bis ${(100 * erg.spanne90[1]).toFixed(2)} · p(einseitig) ≈ ${erg.anteilNichtBesser.toFixed(4)} · ${M} Urteile, ${gruppen.length} Absender`);
console.log(erg.spanne90[0] > 0 ? "→ gesichert besser (untere Grenze über 0)" : "→ NICHT gesichert besser");
if (process.argv.includes("--json")) writeFileSync(process.argv[process.argv.indexOf("--json") + 1], JSON.stringify(erg, null, 1));
