// Absender-Runde (Regeln: docs/PRUEFSTAPEL-TRAINING-WOCHENENDE-REGELN.md): Absender an allen LERN-Mengen (verbrauchte Stapel, je als Text,
// mit eigenem Setzer und mit dem ersten fremden Simulator gesetzt) – aktueller Kern gegen Kern vor dem Lernen. Nur Abstimmwerte, kein Nachweis.
// Aufruf: node scripts/absender-lernstand.mjs [--fehler [--max N]] [--nur c,d] [--arten text,setzer,sim1]
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, mkdtempSync } from "node:fs";
import { join } from "node:path"; import { tmpdir } from "node:os";
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const RUNDEN = arg("--nur", "c,d,e,f,rest").split(",");
const ARTEN = arg("--arten", "text,setzer,sim1").split(",");
const d = mkdtempSync(join(tmpdir(), "abs-"));
let summe = {};
for (const r of RUNDEN) {
  const st = r === "rest" ? "pruefstapel-rest" : `pruefstapel-runde-${r}`;
  const mengen = [["text", null], ["setzer", r === "rest" ? "laeufe/rest-gesetzt" : `laeufe/runde-${r}-gesetzt`], ["sim1", r === "rest" ? "/tmp/claude-0/training/kreuz/aus" : `laeufe/runde-${r}-sim1`]];
  for (const [art, g] of mengen.filter(([a]) => ARTEN.includes(a))) {
    if (g && !existsSync(join(g, "SETZEN.json"))) { console.log(`${r} ${art}: fehlt`); continue; }
    const j = join(d, `${r}-${art}.json`);
    const out = execFileSync("node", ["scripts/messen-briefe.mjs", st, "--alt", "laeufe/kern-vor-absender", "--soll", "SOLL.json", ...(g ? ["--gesetzt", g] : []), "--json", j, ...(process.argv.includes("--fehler") ? ["--fehler", "absender"] : [])], { encoding: "utf8", maxBuffer: 1e8, stdio: ["ignore", "pipe", "ignore"] });
    const e = JSON.parse(readFileSync(j, "utf8")).felder;
    const s = (summe[art] ??= { neu: 0, alt: 0, n: 0, nurAlt: 0, nurNeu: 0 });
    s.neu += e.absender.neu.ok; s.alt += e.absender.alt.ok; s.n += e.absender.neu.n; s.nurAlt += e.absender.mcnemar.nurAltRichtig; s.nurNeu += e.absender.mcnemar.nurNeuRichtig;
    const andere = ["bereich", "schriftstueck", "person", "frist"].map((f) => `${f} ${e[f].mcnemar.nurAltRichtig}/${e[f].mcnemar.nurNeuRichtig}`).join(" ");
    console.log(`${r.padEnd(5)} ${art.padEnd(7)} Absender alt ${e.absender.alt.ok}/${e.absender.alt.n} → neu ${e.absender.neu.ok} (nur alt ${e.absender.mcnemar.nurAltRichtig}, nur neu ${e.absender.mcnemar.nurNeuRichtig}) · andere nurAlt/nurNeu: ${andere}`);
    if (process.argv.includes("--fehler")) console.log(out.split("\n").filter((z) => z.includes("statt")).slice(0, Number(arg("--max", 25))).map((z) => `${r}/${art} ${z.trim()}`).join("\n"));
  }
}
for (const [art, s] of Object.entries(summe)) console.log(`SUMME ${art}: alt ${s.alt}/${s.n} = ${(100 * s.alt / s.n).toFixed(1)} % → neu ${s.neu} = ${(100 * s.neu / s.n).toFixed(1)} % (nur alt ${s.nurAlt}, nur neu ${s.nurNeu})`);
