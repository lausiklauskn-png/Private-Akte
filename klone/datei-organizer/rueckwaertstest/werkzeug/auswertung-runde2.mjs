/* Runde 2: zwei Bewertungen je Idee (I1–I7) zusammenführen – bei Abweichung die strengere Wertung (runde-2/REGELN.md).
   Erwartet runde-2/I<n>/bewertung-1.json und -2.json: { "wertung": { "M01": "getroffen|teilweise|fehlt|verkehrt", … }, "zusaetze": [] }.
   node auswertung-runde2.mjs  → schreibt runde-2/ERGEBNIS.json und gibt eine Übersicht aus. */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const R = join(dirname(fileURLToPath(import.meta.url)), "..", "runde-2");
const RANG = { getroffen: 3, teilweise: 2, fehlt: 1, verkehrt: 0 };
const PUNKT = { getroffen: 1, teilweise: 0.5, fehlt: 0, verkehrt: 0 };
const strenger = (a, b) => ((RANG[a] ?? 1) <= (RANG[b] ?? 1) ? a : b);
const ergebnis = {};
for (let n = 1; n <= 7; n++) {
  const id = "I" + n;
  const ref = JSON.parse(readFileSync(join(R, id, "REFERENZ.json"), "utf8"));
  const bw = [1, 2].map((k) => join(R, id, `bewertung-${k}.json`)).filter(existsSync).map((p) => JSON.parse(readFileSync(p, "utf8")));
  if (bw.length < 2) { console.log(id, "— noch nicht beide Bewertungen"); continue; }
  const zaehle = (gewicht) => {
    const ms = ref.merkmale.filter((m) => m.gewicht === gewicht);
    let s = 0, s1 = 0, s2 = 0, gleich = 0; const fehlt = [], verkehrt = [], teilweise = [];
    for (const m of ms) {
      const a = bw[0].wertung[m.id] || "fehlt", b = bw[1].wertung[m.id] || "fehlt", w = strenger(a, b);
      if (a === b) gleich++;
      s += PUNKT[w]; s1 += PUNKT[a]; s2 += PUNKT[b];
      if (w === "fehlt") fehlt.push(m.id + " " + m.text);
      if (w === "verkehrt") verkehrt.push(m.id + " " + m.text);
      if (w === "teilweise") teilweise.push(m.id + " " + m.text);
    }
    const pct = (x) => (ms.length ? Math.round((x / ms.length) * 100) : null);
    return { anzahl: ms.length, quote: pct(s), bewerter1: pct(s1), bewerter2: pct(s2), einig: pct(gleich), fehlt, verkehrt, teilweise };
  };
  const kern = zaehle("kern"), wichtig = zaehle("wichtig");
  ergebnis[id] = { app: ref.app, kern, wichtig, bestanden: kern.quote >= 80 && kern.verkehrt.length === 0,
    zusaetze: [...new Set([...(bw[0].zusaetze || []), ...(bw[1].zusaetze || [])])].slice(0, 8) };
}
writeFileSync(join(R, "ERGEBNIS.json"), JSON.stringify(ergebnis, null, 1) + "\n");
for (const [id, e] of Object.entries(ergebnis)) {
  console.log(`${id} ${e.app}: Kern ${e.kern.quote} % (Bewerter ${e.kern.bewerter1}/${e.kern.bewerter2}, einig ${e.kern.einig} %) · wichtig ${e.kern ? e.wichtig.quote : "–"} % · ${e.bestanden ? "bestanden" : "nicht bestanden"}` +
    (e.kern.verkehrt.length ? ` · verkehrt: ${e.kern.verkehrt.join("; ")}` : "") + (e.kern.fehlt.length ? ` · fehlt: ${e.kern.fehlt.join("; ")}` : ""));
}
