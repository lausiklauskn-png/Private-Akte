import { readFileSync } from "node:fs"; import { join } from "node:path";
const R = "/home/user/Datei-Organizer"; const [stapel, altK, neuK] = process.argv.slice(2); const O = join(R, stapel);
const soll = new Map(JSON.parse(readFileSync(join(O, "SOLL.json"), "utf8")).dateien.map((x) => [x.datei, x]));
const erw = JSON.parse(readFileSync(join(O, "ERWARTUNG.json"), "utf8")).dateien;
const norm = (s) => s == null || s === "" || s === "null" ? null : String(s).toLowerCase().replace(/\b(gmbh|ag|e\.?\s?k\.?|kg|ohg|mbh|e\.?\s?v\.?|co\.?|&|und)\b/g, " ").replace(/[^a-zäöüß0-9]+/g, " ").trim() || null;
async function kern(p) { const I = (f) => import(join(R, p, "lib", f)); const [{ einlesen }, { siebe }, { absenderVereinheitlichen }] = await Promise.all([I("einlesen.ts"), I("siebe.ts"), I("abgleich.ts")]);
  const ds = []; for (const [i, x] of erw.entries()) { const t = await einlesen({ pfad: x.datei, name: x.datei, geaendert: Date.UTC(2026, 10, 1) + i, bytes: new Uint8Array(readFileSync(join(O, x.datei))) }, async () => "", 0, async () => ""); t[0].pfad = x.datei; ds.push(...t); }
  return new Map(absenderVereinheitlichen(ds.map((d) => siebe(d, 5, []))).map((d) => [d.pfad, d])); }
const A = await kern(altK), N = await kern(neuK); const z = {};
for (const x of erw) { const f = x.form || "?"; const s = norm(soll.get(x.datei)?.absender); const a = norm(A.get(x.datei)?.felder.absender?.wert) === s, b = norm(N.get(x.datei)?.felder.absender?.wert) === s; const e = (z[f] ??= { n: 0, alt: 0, neu: 0 }); e.n++; e.alt += a; e.neu += b; }
console.log(JSON.stringify(z));
