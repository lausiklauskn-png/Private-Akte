#!/usr/bin/env node
// Klon mit Pin: übernimmt ALLE Dateien einer Quell-App an einem festen Stand (Commit) unverändert nach klone/<name>/
// und hält Stand und Prüfsumme jeder Datei in klone/<name>.herkunft.json fest. Nichts wird abgeschrieben oder ausgewählt.
//
//   node tools/klon-nachziehen.mjs <name> --quelle <pfad-zum-quell-repo> [--stand <ref>]   Klon anlegen oder nachziehen
//   node tools/klon-nachziehen.mjs --pruefen [<name>]                                       Klone gegen ihre Pins prüfen
//
// Die Klone nie von Hand ändern. Eine Verbesserung entsteht in der Quell-App und kommt über dieses Werkzeug herein.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync, lstatSync, readlinkSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const WURZEL = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const KLONE = join(WURZEL, "klone");
const args = process.argv.slice(2);
const wert = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };
const git = (repo, ...a) => execFileSync("git", ["-C", repo, ...a], { encoding: "utf8", maxBuffer: 1 << 28 }).trim();
const sha = (daten) => createHash("sha256").update(daten).digest("hex");

/** Alle Dateien unter einem Ordner (relativ, sortiert); Verknüpfungen zählen als Datei mit ihrem Ziel als Inhalt. */
function dateienIn(ordner, unter = "") {
  const liste = [];
  for (const name of readdirSync(join(ordner, unter)).sort()) {
    const rel = unter ? `${unter}/${name}` : name;
    const st = lstatSync(join(ordner, rel));
    if (st.isDirectory()) liste.push(...dateienIn(ordner, rel)); else liste.push(rel);
  }
  return liste;
}
const inhalt = (pfad) => (lstatSync(pfad).isSymbolicLink() ? Buffer.from(readlinkSync(pfad)) : readFileSync(pfad));

function pruefen(name) {
  const pin = JSON.parse(readFileSync(join(KLONE, `${name}.herkunft.json`), "utf8"));
  const ziel = join(KLONE, name);
  const da = existsSync(ziel) ? dateienIn(ziel) : [];
  const fehler = [];
  const soll = pin.dateien;
  for (const rel of Object.keys(soll)) {
    if (!da.includes(rel)) { fehler.push(`fehlt: ${rel}`); continue; }
    if (sha(inhalt(join(ziel, rel))) !== soll[rel]) fehler.push(`geändert: ${rel}`);
  }
  const bekannt = new Set(Object.keys(soll));
  for (const rel of da) if (!bekannt.has(rel)) fehler.push(`zusätzlich: ${rel}`);
  if (fehler.length) { console.error(`🔴 ${name}: ${fehler.length} Abweichungen vom Pin ${pin.commit.slice(0, 7)}`); for (const f of fehler.slice(0, 30)) console.error(`   ${f}`); return false; }
  console.log(`🟢 ${name}: ${da.length} Dateien gleich mit ${pin.quelle} @ ${pin.commit.slice(0, 7)}`);
  return true;
}

if (args.includes("--pruefen")) {
  const nur = args.find((a) => !a.startsWith("--"));
  const namen = nur ? [nur] : readdirSync(KLONE).filter((f) => f.endsWith(".herkunft.json")).map((f) => f.replace(/\.herkunft\.json$/, ""));
  if (!namen.length) { console.log("Keine Klone vorhanden."); process.exit(0); }
  process.exit(namen.map(pruefen).every(Boolean) ? 0 : 1);
}

const name = args.find((a) => !a.startsWith("--") && a !== wert("--quelle") && a !== wert("--stand"));
const quelle = wert("--quelle");
if (!name || !/^[a-z0-9-]+$/.test(name) || !quelle) { console.error("Aufruf: node tools/klon-nachziehen.mjs <name> --quelle <pfad> [--stand <ref>]"); process.exit(2); }
const repo = resolve(quelle);
const commit = git(repo, "rev-parse", wert("--stand") || "HEAD");
const adresse = git(repo, "remote", "get-url", "origin").replace(/\.git$/, "");
const datum = git(repo, "show", "-s", "--format=%cI", commit);
const ziel = join(KLONE, name);
rmSync(ziel, { recursive: true, force: true });
mkdirSync(ziel, { recursive: true });
// git archive liefert genau die Dateien des Commits – ohne Arbeitsstände, ohne node_modules, ohne .git.
execFileSync("sh", ["-c", `git -C "${repo}" archive --format=tar ${commit} | tar -x -C "${ziel}"`], { stdio: "inherit" });
const liste = dateienIn(ziel);
const erwartet = git(repo, "ls-tree", "-r", "--name-only", "-z", commit).split("\0").filter(Boolean).length;
if (liste.length !== erwartet) { console.error(`🔴 ${liste.length} Dateien übernommen, der Commit hat ${erwartet}. Abbruch.`); process.exit(1); }
const dateien = {}; let bytes = 0;
for (const rel of liste) { const d = inhalt(join(ziel, rel)); dateien[rel] = sha(d); bytes += d.length; }
const oben = {};
for (const rel of liste) { const k = rel.includes("/") ? rel.split("/")[0] + "/" : "(Dateien oben)"; oben[k] = (oben[k] || 0) + 1; }
writeFileSync(join(KLONE, `${name}.herkunft.json`), JSON.stringify({ name, quelle: adresse, commit, standVom: datum, anzahl: liste.length, bytes, ordner: oben, dateien }, null, 1) + "\n");
console.log(`🟢 ${name}: ${liste.length} Dateien (${(bytes / 1048576).toFixed(0)} MB) aus ${adresse} @ ${commit.slice(0, 7)} übernommen.`);
