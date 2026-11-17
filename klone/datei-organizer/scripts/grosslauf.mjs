// Großlauf: viele Runden erfundener Haushalte (normal und „neben der Spur“), je Runde messen, Trainingsdaten sammeln.
// Aufruf: node scripts/grosslauf.mjs [runden=6] [chaosRunden=2]  →  laeufe/<runde>/ (nicht im Repo), ergebnisse/grosslauf/*.json, ergebnisse/trainingsdaten.jsonl
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, existsSync } from "node:fs";
const N = Number(process.argv[2] || 6), C = Number(process.argv[3] || 2);
mkdirSync("ergebnisse/grosslauf", { recursive: true });
if (existsSync("ergebnisse/trainingsdaten.jsonl")) rmSync("ergebnisse/trainingsdaten.jsonl");
const runden = [...Array.from({ length: N }, (_, i) => ({ start: 101 + i, chaos: false })), ...Array.from({ length: C }, (_, i) => ({ start: 201 + i, chaos: true }))];
for (const r of runden) {
  const name = `${r.chaos ? "chaos" : "runde"}-${r.start}`;
  const t0 = Date.now();
  execFileSync("node", ["scripts/haushalte-bauen.mjs", String(r.start), "--aus", `laeufe/${name}`, ...(r.chaos ? ["--chaos"] : [])], { stdio: "ignore" });
  execFileSync("node", ["scripts/messen.mjs", `laeufe/${name}`, "--still", "--json", `ergebnisse/grosslauf/${name}.json`, "--trainingsdaten", "ergebnisse/trainingsdaten.jsonl"], { stdio: "ignore" });
  // Bedienung: aus dieser Runde lernen (sorgfältig / chaotisch), an der nächsten prüfen – nur für die ersten zwei Paare
  console.log(`${name} fertig in ${Math.round((Date.now() - t0) / 1000)} s`);
}
const paare = [["runde-101", "runde-102"], ["chaos-201", "runde-103"]];
for (const [lern, pruef] of paare) for (const nutzer of ["sorgfaeltig", "chaotisch"]) {
  execFileSync("node", ["scripts/messen.mjs", `laeufe/${pruef}`, "--still", "--lernen-aus", `laeufe/${lern}`, "--nutzer", nutzer, "--json", `ergebnisse/grosslauf/lernen-${lern}-${pruef}-${nutzer}.json`], { stdio: "ignore" });
  console.log(`Bedienung ${nutzer}: gelernt aus ${lern}, geprüft an ${pruef}`);
}
console.log("Großlauf fertig");
