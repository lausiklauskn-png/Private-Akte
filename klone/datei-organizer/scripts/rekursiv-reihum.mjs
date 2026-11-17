// Reihum-Abstimmung der eingebauten Methode im ganzen Kern (15.11.2026, docs/PRUEFSTAPEL-REKURSIV-REGELN.md Punkt 5):
//   A = Kern 0.4.4 wie ausgeliefert · B = bisheriges Vorgehen (Wortmodell ohne den Teststapel neu gelernt)
//   N = neue Methode (Art-Modell ohne den Teststapel gelernt, Bereich wie B). Braucht die Kern-Kopie mit Haken (--kern).
// Nur Abstimmung an verbrauchten Stapeln, kein Nachweis. Aufruf: node scripts/rekursiv-reihum.mjs --kern /tmp/claude-0/kern-emu [--mit stadt-lern]
const V = await import("./rekursiv-versuch.mjs");
const AL = await import("./artmodell-lernen.mjs");
const AW = await import("./absenderwahl-lernen.mjs");
const FW = await import("./fristwahl-lernen.mjs");
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const mit = (arg("--mit", "") || "").split(",").filter(Boolean);
const NEU = [...arg("--neu", "familie-k3,runde-c,runde-d,runde-e,runde-f,rest,absender").split(","), ...mit];
const ALLE = [...AL.STAPEL, ...mit];
const ALT = AL.STAPEL.filter((s) => !NEU.includes(s) && !s.endsWith("-ocr") && !s.startsWith("stadt-"));
const NBNEU = NEU.filter((s) => !s.endsWith("-ocr"));
const F = ["bereich", "schriftstueck", "absender", "person", "frist"];
const z = { A: {}, B: {}, N: {} }, flips = { B: [0, 0], N: [0, 0] }, jeStapel = [];
const zaehl = (k, r) => { for (const f of F) { if (r.soll[f] === undefined || (f === "person" && r.soll[f] === null)) continue; const e = (z[k][f] ||= [0, 0]); e[1]++; if (r.rat[f] === r.soll[f]) e[0]++; } };
const ges = (rows) => { let o = 0, n = 0; for (const r of rows) for (const f of F) { if (r.soll[f] === undefined || (f === "person" && r.soll[f] === null)) continue; n++; if (r.rat[f] === r.soll[f]) o++; } return [o, n]; };
for (const t of NEU) {
  const nb = V.wortmodell([...ALT, ...NBNEU.filter((x) => x.replace(/-ocr$/, "") !== t.replace(/-ocr$/, ""))]);
  globalThis.__ARTM = undefined; globalThis.__ABSM = undefined; globalThis.__ARTALT = true; globalThis.__ABSALT = true; globalThis.__FRALT = true; globalThis.__FRM = undefined;
  const a = await V.lauf(t, null);
  const b = await V.lauf(t, nb);
  globalThis.__ARTALT = false; globalThis.__ABSALT = !process.argv.includes("--mit-absender"); globalThis.__FRALT = !process.argv.includes("--mit-frist"); globalThis.__FRM = FW.lerne(ALLE.filter((x) => x.replace(/-ocr$/, "") !== t.replace(/-ocr$/, ""))); globalThis.__ABSM = AW.lerne(ALLE.filter((x) => x.replace(/-ocr$/, "") !== t.replace(/-ocr$/, ""))); globalThis.__ARTM = AL.lerne(ALLE.filter((x) => x.replace(/-ocr$/, "") !== t.replace(/-ocr$/, ""))); globalThis.__ARTMIN = Number(arg("--min", "2")); globalThis.__ARTVOR = arg("--vor") ? Number(arg("--vor")) : undefined; globalThis.__ENSAUS = process.argv.includes("--ohne-ens"); globalThis.__KNAPP = arg("--knapp") ? Number(arg("--knapp")) : undefined; globalThis.__DEUTLICH = arg("--deutlich") ? Number(arg("--deutlich")) : undefined;
  const n = await V.lauf(t, nb); globalThis.__ARTM = undefined; globalThis.__ABSM = undefined; globalThis.__ABSALT = false;
  a.forEach((r) => zaehl("A", r)); b.forEach((r) => zaehl("B", r)); n.forEach((r) => zaehl("N", r));
  for (const [k, v] of [["B", b], ["N", n]]) v.forEach((r, i) => { for (const f of F) { if (r.soll[f] === undefined) continue; const vor = a[i].rat[f] === r.soll[f], nach = r.rat[f] === r.soll[f]; if (vor && !nach) flips[k][0]++; if (!vor && nach) flips[k][1]++; } });
  const [ga, gn] = ges(a), [gb] = ges(b), [gnn] = ges(n);
  console.log(`${t.split("/").pop().padEnd(14)} gesamt A ${(100 * ga / gn).toFixed(2)} · B ${(100 * gb / gn).toFixed(2)} · N ${(100 * gnn / gn).toFixed(2)}`);
}
for (const k of ["A", "B", "N"]) { const o = F.reduce((s, f) => s + z[k][f][0], 0), n = F.reduce((s, f) => s + z[k][f][1], 0); console.log(`ALLE ${k}: ${F.map((f) => `${f.slice(0, 6)} ${(100 * z[k][f][0] / z[k][f][1]).toFixed(1)}`).join(" · ")} · gesamt ${(100 * o / n).toFixed(2)}`); }
console.log(`Flips gegen A (verdorben/behoben): B ${flips.B.join("/")} · N ${flips.N.join("/")}`);
