/* Auswertung Lauf K3 (14.11.2026): je Beispiel Kern-Trefferquote, strengere der zwei Wertungen je Merkmal (../REGELN.md).
   node auswertung-k3.mjs  → schreibt ../beispiele-2026-11-14/ERGEBNIS.json und gibt eine Tabelle aus */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const D = join(dirname(fileURLToPath(import.meta.url)), "../beispiele-2026-11-14");
const RANG = { verkehrt: 0, fehlt: 1, teilweise: 2, getroffen: 3 }, PUNKT = { verkehrt: 0, fehlt: 0, teilweise: 0.5, getroffen: 1 };
const erg = {};
/* K4 (Nachbesserung): je App ein Unterordner k4/ mit eigener Referenz-Kopie, Bauplan und zwei Bewertungen */
const ordner = readdirSync(D).filter((x) => existsSync(join(D, x, "REFERENZ.json"))).flatMap((x) => existsSync(join(D, x, "k4", "bewertung-1.json")) ? [x, x + "/k4"] : [x]);
for (const app of ordner) {
  const ref = JSON.parse(readFileSync(join(D, app, "REFERENZ.json"), "utf8"));
  const bw = [1, 2].map((n) => join(D, app, `bewertung-${n}.json`)).filter(existsSync).map((p) => JSON.parse(readFileSync(p, "utf8")));
  if (bw.length < 2) { erg[app] = { offen: `${bw.length} von 2 Bewertungen` }; continue; }
  const kern = ref.merkmale.filter((m) => m.gewicht === "kern");
  let summe = 0, gleich = 0; const fehlt = [], verkehrt = [], einzeln = [0, 0];
  for (const m of kern) {
    const w = bw.map((b) => b.wertung[m.id] || "fehlt");
    w.forEach((x, i) => { einzeln[i] += PUNKT[x]; });
    const streng = RANG[w[0]] <= RANG[w[1]] ? w[0] : w[1];
    if (w[0] === w[1]) gleich++;
    summe += PUNKT[streng];
    if (streng === "fehlt") fehlt.push(m.id + " " + m.text);
    if (streng === "verkehrt") verkehrt.push(m.id + " " + m.text);
  }
  const quote = Math.round(summe / kern.length * 100);
  erg[app] = { kern: kern.length, quote, bewerter: einzeln.map((x) => Math.round(x / kern.length * 100)), einig: Math.round(gleich / kern.length * 100),
    bestanden: quote >= 80 && !verkehrt.length, fehlt, verkehrt };
}
writeFileSync(join(D, "ERGEBNIS.json"), JSON.stringify(erg, null, 1));
for (const [app, e] of Object.entries(erg)) console.log(e.offen ? `${app}: ${e.offen}` : `${app}: ${e.quote} % (Bewerter ${e.bewerter.join("/")} %, einig ${e.einig} %, ${e.kern} Kern) ${e.bestanden ? "✓ bestanden" : "✗"}${e.verkehrt.length ? " · verkehrt " + e.verkehrt.length : ""}`);
