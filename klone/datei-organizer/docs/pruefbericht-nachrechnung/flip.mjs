import { readFileSync, existsSync } from "node:fs"; import { join } from "node:path";
const R = "/home/user/Datei-Organizer"; const [stapel, gesetzt, altK, neuK] = process.argv.slice(2);
const L = await import("./leser-ro.mjs");
const O = join(R, stapel), G = join(R, gesetzt); const SET = JSON.parse(readFileSync(join(G, "SETZEN.json"), "utf8"));
const soll = new Map(JSON.parse(readFileSync(join(O, "SOLL.json"), "utf8")).dateien.map((x) => [x.datei, x]));
const erw = JSON.parse(readFileSync(join(O, "ERWARTUNG.json"), "utf8")).dateien;
const norm = (s) => s == null || s === "" || s === "null" ? null : String(s).toLowerCase().replace(/\b(gmbh|ag|e\.?\s?k\.?|kg|ohg|mbh|e\.?\s?v\.?|co\.?|&|und)\b/g, " ").replace(/[^a-zäöüß0-9]+/g, " ").trim() || null;
async function kern(p) { const I = (f) => import(join(R, p, "lib", f)); const [{ einlesen }, { siebe }, { absenderVereinheitlichen }] = await Promise.all([I("einlesen.ts"), I("siebe.ts"), I("abgleich.ts")]);
  const ds = []; for (const [i, x] of erw.entries()) { if (SET[x.datei]?.inScanVon) continue; const q = SET[x.datei].datei;
    const t = await einlesen({ pfad: x.datei, name: q.split("/").pop(), geaendert: Date.UTC(2026, 10, 1) + i, bytes: new Uint8Array(readFileSync(join(G, q))) }, L.pdfLeser(), 0, L.ocr); t[0].pfad = x.datei; ds.push(...t); }
  return new Map(absenderVereinheitlichen(ds.map((d) => siebe(d, 5, []))).map((d) => [d.pfad, d])); }
const A = await kern(altK), N = await kern(neuK); let a1 = 0, n1 = 0, okA = 0, okN = 0, n = 0;
for (const x of erw) { if (SET[x.datei]?.inScanVon) continue; const s = norm(soll.get(x.datei)?.absender); n++;
  const a = norm(A.get(x.datei)?.felder.absender?.wert), b = norm(N.get(x.datei)?.felder.absender?.wert); if (a === s) okA++; if (b === s) okN++;
  if ((a === s) !== (b === s)) { (b === s) ? n1++ : a1++; console.log(`${(b === s) ? "NEU+" : "ALT+"} [${SET[x.datei].form}/${SET[x.datei].qualitaet || ""}${SET[x.datei].zweitesStueck ? " zwei" : ""}] ${x.datei} | soll „${s}“ | alt „${A.get(x.datei)?.felder.absender?.wert}“ | neu „${N.get(x.datei)?.felder.absender?.wert}“ | ${N.get(x.datei)?.felder.absender?.grund}`); } }
console.log(`n=${n} alt ok ${okA} neu ok ${okN} nurNeu ${n1} nurAlt ${a1} cacheMiss ${L.st.miss}`);
