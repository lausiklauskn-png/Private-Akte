// Auswertung des Nachweises der Absender-Runde (Regeln: docs/PRUEFSTAPEL-TRAINING-WOCHENENDE-REGELN.md, Abschnitt „Absender-Runde“).
// Eingabe: je Stück Soll/alt/neu aus messen-briefe.mjs --stuecke (Text und gesetzt). Hauptfeld: Absender gesetzt (McNemar exakt, 5 %).
// Nebenfelder mit Holm-Bonferroni (dürfen nicht gesichert schlechter werden). Abhängigkeit: Bootstrap nach Absender (gleicher Soll-Absender = ein Block).
// Aufruf: node scripts/absender-nachweis.mjs <text-stuecke.json> <gesetzt-stuecke.json>
import { readFileSync } from "node:fs";
const [ft, fg] = process.argv.slice(2);
const FELDER = ["bereich", "schriftstueck", "absender", "person", "frist"];
const binom = (k, n) => { let s = 0, c = 1; for (let i = 0; i <= n; i++) { if (i <= k) s += c; c = c * (n - i) / (i + 1); } return s / 2 ** n; };
const mcnemar = (a, b) => { const n = a + b; if (!n) return 1; return Math.min(1, 2 * binom(Math.min(a, b), n)); };
function feld(stuecke, f) {
  const m = stuecke.filter((s) => s.soll[f] !== undefined && !(f === "person" && s.soll[f] === null));
  const ok = (s, k) => s[k]?.[f] === s.soll[f];
  const a = m.filter((s) => ok(s, "alt") && !ok(s, "neu")).length, b = m.filter((s) => ok(s, "neu") && !ok(s, "alt")).length;
  return { n: m.length, alt: m.filter((s) => ok(s, "alt")).length, neu: m.filter((s) => ok(s, "neu")).length, nurAlt: a, nurNeu: b, p: mcnemar(a, b), m, ok };
}
// Bootstrap: Blöcke = Soll-Absender; Ziehen mit Zurücklegen; Anteil der Ziehungen mit neu <= alt (einseitig)
function bootstrap(r, runden = 10000) {
  const bloecke = new Map(); for (const s of r.m) { const k = s.soll.absender ?? "?"; (bloecke.get(k) ?? bloecke.set(k, []).get(k)).push(r.ok(s, "neu") - r.ok(s, "alt")); }
  const B = [...bloecke.values()].map((x) => x.reduce((a, b) => a + b, 0)); let x = 12345, schlecht = 0; const d = [];
  const zufall = () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return (x >>> 0) / 4294967296; };
  for (let i = 0; i < runden; i++) { let s = 0; for (let j = 0; j < B.length; j++) s += B[Math.floor(zufall() * B.length)]; d.push(s); if (s <= 0) schlecht++; }
  d.sort((a, b) => a - b); return { bloecke: B.length, p: schlecht / runden, ki: [d[Math.floor(runden * 0.025)], d[Math.floor(runden * 0.975)]] };
}
const pr = (r) => `${r.alt}/${r.n} = ${(100 * r.alt / r.n).toFixed(1)} % → ${r.neu} = ${(100 * r.neu / r.n).toFixed(1)} % (nur alt ${r.nurAlt}, nur neu ${r.nurNeu}, p = ${r.p.toPrecision(2)})`;
const T = JSON.parse(readFileSync(ft, "utf8")), G = JSON.parse(readFileSync(fg, "utf8"));
const haupt = feld(G, "absender"), bs = bootstrap(haupt);
console.log(`HAUPTFELD Absender gesetzt: ${pr(haupt)}`);
console.log(`  Bootstrap nach Absender (${bs.bloecke} Blöcke): Gewinn in Stück 95-%-Bereich [${bs.ki[0]}, ${bs.ki[1]}], Anteil ≤ 0: ${bs.p}`);
const neben = [...FELDER.filter((f) => f !== "absender").map((f) => ["gesetzt", f, feld(G, f)]), ...FELDER.map((f) => ["Text", f, feld(T, f)])];
const sortiert = [...neben].sort((a, b) => a[2].p - b[2].p); let k = sortiert.length;
console.log("NEBENFELDER (Holm-Bonferroni, je Feld: gesichert schlechter?)");
let weiter = true;
for (const [art, f, r] of sortiert) { const grenze = 0.05 / k--; const ges = weiter && r.p < grenze; if (!ges) weiter = false; console.log(`  ${art.padEnd(8)} ${f.padEnd(14)} ${pr(r)} · Holm-Grenze ${grenze.toPrecision(2)} → ${ges ? (r.nurNeu > r.nurAlt ? "gesichert BESSER" : "gesichert SCHLECHTER") : "kein gesicherter Unterschied"}`); }
