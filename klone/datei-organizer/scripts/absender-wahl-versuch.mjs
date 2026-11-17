// Versuch (15.11.2026, rekursive Verbesserung): Absender als gelernte Wahl unter Kandidaten-Zeilen. Nur Abstimmung, kein Nachweis.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
const V = await import("./rekursiv-versuch.mjs");
const E = await import("../lib/erkennen.ts");
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const STAPEL = arg("--stapel", "familie-k3,runde-c,runde-d,runde-e,runde-f,rest,absender,stadt-lern,briefe-2,briefe-a,briefe-b,briefe-h,unabhaengig,vermieterin,vermieterin-2026").split(",");
const norm = (s) => s == null || s === "" ? null : String(s).toLowerCase().replace(/\b(gmbh|ag|e\.?\s?k\.?|kg|ohg|mbh|e\.?\s?v\.?|co\.?|&|und)\b/g, " ").replace(/[^a-zäöüß0-9]+/g, " ").trim() || null;
export function kandidaten(text) {
  const zeilen = text.split(/\r?\n/).map((z) => z.trim()).filter(Boolean), n = zeilen.length, k = new Map();
  zeilen.forEach((z, i) => { if (i >= 25 && i < n - 10) return;
    for (const fuss of [false, true]) { let c; try { c = E.nameAusZeile(E.ocrRand(z), fuss); } catch { c = ""; } if (c && c.length >= 3 && c.length <= 80) { const key = norm(c); if (key && !k.has(key)) k.set(key, { wert: c, i, zeile: z, fuss }); } } });
  return { zeilen, k };
}
if (process.argv[1].endsWith("absender-wahl-versuch.mjs")) {
  let n = 0, kern = 0, drin = 0;
  for (const s of STAPEL) { const o = s.startsWith("/") ? s : join(V.KERN_PFAD ? "" : "", "pruefstapel-" + s); const soll = V.sollVon(s);
    let a = 0, b = 0, m = 0;
    for (const [d, x] of soll) { if (x.absender == null || !existsSync(join("pruefstapel-" + s, d))) continue; m++; const { k } = kandidaten(readFileSync(join("pruefstapel-" + s, d), "utf8")); if (k.has(x.absender)) a++; }
    console.log(s.padEnd(18), `n ${m} · Soll unter den Kandidaten ${(100 * a / m).toFixed(1)} %`); n += m; drin += a; }
  console.log(`ALLE: Soll unter den Kandidaten ${(100 * drin / n).toFixed(1)} % von ${n}`);
}

// ---- Merkmale eines Kandidaten und gelernte Wahl (gemitteltes Perzeptron, Rangfolge) ----
const ADR = /\b\d{5}\b|postfach|straße|strasse|str\.|weg\s*\d|platz\s*\d|gasse|allee/i;
const IMPRESSUM = /\b(hrb|hra|amtsgericht|registergericht|ust-?id|steuernummer|geschäftsführ|vorstand|sitz der gesellschaft|bankverbindung)\b/i;
const GRUSS = /(grüße|grüßen|gruß|grüsse|hochachtungsvoll|herzlichst)/i;
export function merkmaleKandidat(c, zeilen, regel) {
  const f = [], n = zeilen.length, i = c.i, z = c.zeile, w = c.wert;
  const oben = i < 25, pos = oben ? "o" + Math.min(i, 12) : "u" + Math.min(n - 1 - i, 9);
  f.push("pos:" + pos, "fuss:" + c.fuss);
  for (const t of (w.toLowerCase().match(/[a-zäöüß]{3,}/g) || [])) f.push("w:" + t);
  const t0 = (w.toLowerCase().match(/[a-zäöüß]{3,}/g) || [])[0]; if (t0) f.push("w0:" + t0);
  const worte = w.split(/\s+/).length; f.push("len:" + Math.min(worte, 6));
  if (/\d/.test(w)) f.push("ziffer");
  if (w === w.toUpperCase() && /[A-ZÄÖÜ]{3}/.test(w)) f.push("gross");
  if (/^(herr|frau|herrn|familie|an)\b/i.test(z)) f.push("empf");
  if (/ - |·|\|/.test(z) && ADR.test(z)) f.push("zeileMitAdresse");
  if (ADR.test(zeilen[i + 1] || "") || ADR.test(zeilen[i + 2] || "")) f.push("adrDarunter");
  if (IMPRESSUM.test(z)) f.push("impressum"); if (IMPRESSUM.test(zeilen.slice(Math.max(0, i - 2), i + 3).join(" "))) f.push("impressumNah");
  if (GRUSS.test(zeilen[i - 1] || "") || GRUSS.test(zeilen[i - 2] || "")) f.push("nachGruss");
  if (/^(betreff|betr|ihre?|unser|zur|zum|vom|nr|rechnung|mahnung|bescheid|kündigung)\b/i.test(w)) f.push("betreffartig");
  if (/^[A-ZÄÖÜ][a-zäöüß]+ [A-ZÄÖÜ][a-zäöüß]+$/.test(w)) f.push("personartig");
  if (regel.kopf && norm(regel.kopf.wert) === norm(w)) f.push("rk", "rk:" + regel.kopf.sicher);
  if (regel.gruss && norm(regel.gruss.wert) === norm(w)) f.push("rg", "rg:" + regel.gruss.sicher);
  if (!regel.kopf && !regel.gruss) f.push("keineRegel");
  if (oben && regel.kopf) f.push("pos+rk:" + pos); 
  return f;
}
export function beispiele(text) {
  const { zeilen, k } = kandidaten(text);
  const kopf = zeilen.slice(0, 30).join("\n");
  let rk, rg; try { rk = E.erkenneAbsender(kopf); } catch {} try { rg = E.absenderAusGruss(text); } catch {}
  const regel = { kopf: rk, gruss: rg };
  for (const r of [rk, rg]) if (r?.wert && !k.has(norm(r.wert))) k.set(norm(r.wert), { wert: r.wert, i: 0, zeile: r.wert, fuss: false, ausRegel: true });
  const liste = [...k.entries()].map(([key, c]) => ({ key, f: merkmaleKandidat(c, zeilen, regel) }));
  return { liste, regelWahl: norm(rk?.wert || rg?.wert || "unbekannt"), regelSicher: !!(rk || rg)?.sicher };
}
export function lerneWahl(daten, runden = 10) {
  const w = new Map(), u = new Map(); let c = 1;
  const sc = (f) => f.reduce((s, x) => s + (w.get(x) || 0), 0);
  for (let r = 0; r < runden; r++) for (let j = 0; j < daten.length; j++) { const d = daten[(j * 104729 + r * 13) % daten.length]; const g = d.liste.find((x) => x.key === d.soll); if (!g) { c++; continue; }
    let best = d.liste[0], bs = -Infinity; for (const x of d.liste) { const s = sc(x.f); if (s > bs) { bs = s; best = x; } }
    if (best.key !== g.key) { for (const x of g.f) { w.set(x, (w.get(x) || 0) + 1); u.set(x, (u.get(x) || 0) + c); } for (const x of best.f) { w.set(x, (w.get(x) || 0) - 1); u.set(x, (u.get(x) || 0) - c); } }
    c++; }
  const avg = new Map(); for (const [x, v] of w) avg.set(x, v - (u.get(x) || 0) / c); return avg;
}
export function waehle(m, d) { let best = null, bs = -Infinity, zweit = -Infinity; for (const x of d.liste) { const s = x.f.reduce((a, y) => a + (m.get(y) || 0), 0); if (s > bs) { zweit = bs; bs = s; best = x; } else if (s > zweit) zweit = s; } return { key: best?.key ?? null, abstand: bs - zweit }; }
if (process.argv[1].endsWith("absender-wahl-versuch.mjs") && process.argv.includes("--lernen")) {
  const D = {}; for (const s of STAPEL) D[s] = [...V.sollVon(s)].filter(([d, x]) => x.absender != null && existsSync(join("pruefstapel-" + s, d))).map(([d, x]) => ({ s, d, soll: x.absender, ...beispiele(readFileSync(join("pruefstapel-" + s, d), "utf8")) }));
  const TS = [0, 1, 2, 4, 8, 1e9]; let n = 0, a = 0; const b = TS.map(() => 0);
  for (const t of STAPEL) { const m = lerneWahl(STAPEL.filter((s) => s !== t).flatMap((s) => D[s])); let ra = 0; const rb = TS.map(() => 0);
    for (const d of D[t]) { if (d.regelWahl === d.soll) ra++; const v = waehle(m, d); TS.forEach((T, i) => { const w = !d.regelSicher || v.abstand >= T ? v.key : d.regelWahl; if (w === d.soll) rb[i]++; }); }
    n += D[t].length; a += ra; rb.forEach((x, i) => b[i] += x); console.log(t.padEnd(18), `Regel ${(100 * ra / D[t].length).toFixed(1)} · ` + TS.map((T, i) => `T${T}: ${(100 * rb[i] / D[t].length).toFixed(1)}`).join(" ")); }
  console.log(`ALLE: Regel ${(100 * a / n).toFixed(2)} · ` + TS.map((T, i) => `T${T} ${(100 * b[i] / n).toFixed(2)}`).join(" · ") + ` (n=${n})`);
}
