// Kreuztest (Auftrag 002): zwei getrennt gebaute Kontosysteme an zwei getrennt geschriebenen Prüfstapeln.
//   Claude-System = BookLedgerPro kontoVorschlag (Regeln + Wortmodell, Lehrdaten von Claude-Agenten)
//   Codex-System  = gegenlauf-codex/SYSTEM (TF-IDF, Lehrdaten von Codex-Agenten), dessen Vorhersagen liegen gespeichert vor
//   Stapel 4 (Claude-Agent, Soll = Mehrheit dreier Einordner) und Codex-Stapel (Codex-Agent, Soll = dessen Erwartung, EIN Einordner)
// Aufruf: node scripts/kreuztest-blp.mjs [--json datei]   – einmal messen.
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { wilson, mcnemar } from "./statistik.mjs";
const W = fileURLToPath(new URL("..", import.meta.url));
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const J = (p) => JSON.parse(readFileSync(join(W, p), "utf8"));
const { kontoVorschlag } = await import(resolve(W, "../bookledgerpro/src/ai/kontoModell.js"));
// Soll Stapel 4: Mehrheit
const q4 = ["ERWARTUNG.json", "ZWEITER.json", "DRITTER.json"].map((f) => new Map(J("pruefstapel-blp-4/" + f).dateien.map((x) => [x.datei, String(x.konto)])));
const soll4 = new Map(); for (const d of q4[0].keys()) { const z = {}; for (const m of q4) z[m.get(d)] = (z[m.get(d)] || 0) + 1; const [k, n] = Object.entries(z).sort((a, b) => b[1] - a[1])[0]; if (n >= 2) soll4.set(d, k); }
const ec = J("gegenlauf-codex/PRUEFSTAPEL/ERWARTUNG.json"), sollC = new Map(ec.dateien.map((x) => [x.datei, String(x.konto)]));
const vor = (f) => new Map(J("gegenlauf-codex/" + f).dateien.map((x) => [x.datei, String(x.konto)]));
const claude = async (ordner, dateien, name) => new Map(await Promise.all(dateien.map(async (d) => [d, String((await kontoVorschlag(readFileSync(join(W, ordner, d), "utf8"), name ? { eigenerName: name } : {})).konto)])));
const ist = {
  "Stapel 4 (Claude)": { soll: soll4, einordner: 3, "Claude-System mit Namen": await claude("pruefstapel-blp-4", [...soll4.keys()], "Buchhandlung Lindenblatt"), "Claude-System ohne Namen": await claude("pruefstapel-blp-4", [...soll4.keys()], ""), "Codex-System mit Namen": vor("VORHERSAGEN-STAPEL-4.json"), "Codex-System ohne Namen": vor("VORHERSAGEN-STAPEL-4-OHNE-FIRMENNAME.json") },
  "Codex-Stapel": { soll: sollC, einordner: 1, "Claude-System mit Namen": await claude("gegenlauf-codex/PRUEFSTAPEL", [...sollC.keys()], ec.betrieb), "Claude-System ohne Namen": await claude("gegenlauf-codex/PRUEFSTAPEL", [...sollC.keys()], ""), "Codex-System mit Namen": vor("VORHERSAGEN-EIGENER-STAPEL.json"), "Codex-System ohne Namen": vor("VORHERSAGEN-EIGENER-STAPEL-OHNE-FIRMENNAME.json") },
};
const erg = {}; const pz = (ok, n) => `${ok}/${n} = ${(100 * ok / n).toFixed(1)} % (${wilson(ok, n).map((v) => (100 * v).toFixed(0)).join("–")} %)`;
for (const [stapel, s] of Object.entries(ist)) {
  const ds = [...s.soll.keys()]; erg[stapel] = { belege: ds.length, einordner: s.einordner }; console.log(`\n== ${stapel}: ${ds.length} Belege, Soll von ${s.einordner} Einordner(n) ==`);
  const sys = Object.keys(s).filter((k) => k.includes("System"));
  for (const k of sys) { const fehlt = ds.filter((d) => !s[k].has(d)).length, ok = ds.filter((d) => s[k].get(d) === s.soll.get(d)).length; erg[stapel][k] = { ok, n: ds.length, spanne: wilson(ok, ds.length), fehlt }; console.log(`  ${k.padEnd(26)} ${pz(ok, ds.length)}${fehlt ? ` · ${fehlt} ohne Vorhersage` : ""}`); }
  for (const v of ["mit Namen", "ohne Namen"]) { const a = s["Claude-System " + v], b = s["Codex-System " + v]; const nurA = ds.filter((d) => a.get(d) === s.soll.get(d) && b.get(d) !== s.soll.get(d)).length, nurB = ds.filter((d) => b.get(d) === s.soll.get(d) && a.get(d) !== s.soll.get(d)).length, beide = ds.filter((d) => a.get(d) === s.soll.get(d) && b.get(d) === s.soll.get(d)).length, eins = ds.filter((d) => a.get(d) === s.soll.get(d) || b.get(d) === s.soll.get(d)).length;
    erg[stapel]["McNemar " + v] = { nurClaude: nurA, nurCodex: nurB, beideRichtig: beide, mindestensEins: eins, p: mcnemar(nurA, nurB) }; console.log(`  ${v}: nur Claude richtig ${nurA}, nur Codex richtig ${nurB}, beide ${beide}, mindestens eines ${eins}/${ds.length}, p=${mcnemar(nurA, nurB).toFixed(3)}`); }
}
if (arg("--json")) writeFileSync(resolve(W, arg("--json")), JSON.stringify(erg, null, 1));
