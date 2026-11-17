// Fehlergetriebenes Regel-Lernen nach Brill (Transformation-Based Learning) auf dem Ausgang des Sortier-Kerns – Absprache
// „rekursive Verbesserung“ (Klaus 15.11.2026, Brief docs/BRIEF_SITZUNG_2026-11-15_REKURSIVE-VERBESSERUNG.md).
// Der Kern rät (Startannotierer), die Korrektur (Soll) liegt vor; je Runde wird aus Schablonen die EINE Regel gewählt, die auf den
// Lerndaten die meisten Fehler behebt (behoben minus neu verdorben), angewendet, und weiter, bis keine Regel mehr genug bringt.
// Nur Lerndaten (verbrauchte Stapel); Abstimmung reihum (ein Stapel ausgelassen). Kein Nachweis.
// Aufruf: node scripts/tbl-lernen.mjs [--feld bereich|schriftstueck] [--min 3] [--reihum] [--aus datei.json]
import { readFileSync, readdirSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const FELD = arg("--feld", "bereich"), MIN = Number(arg("--min", "3")), MAXREGELN = Number(arg("--max", "200"));
const ANDERES = FELD === "bereich" ? "schriftstueck" : "bereich";

// ---- Merkmale eines Stücks (dieselbe Rechnung muss später im Kern laufen) ----
const STOPP = new Set("der die das und oder für von vom mit bei den dem des ein eine einer eines einem einen ist sind wird wurde werden auf aus zum zur nach bis über unter ihre ihr ihrem ihren ihres wir sie uns unser unsere ihnen sehr geehrte geehrter freundlichen grüßen haben hat als auch nicht noch wie bitte dass wenn kann können oder diese dieser dieses sich einen".split(" "));
export function merkmaleTbl(text, stueck) {
  const zeilen = text.split(/\r?\n/).map((z) => z.trim()).filter(Boolean);
  const wort = (s) => (s.toLowerCase().match(/[a-zäöüß]{4,}/g) || []).filter((w) => !STOPP.has(w));
  const m = new Set();
  for (const w of wort(zeilen.slice(0, 12).join(" "))) m.add("k:" + w);          // im Kopf (erste 12 Zeilen)
  for (const w of wort(text)) m.add("t:" + w);                                    // irgendwo im Text
  for (const w of wort(stueck.absender || "")) m.add("a:" + w);                   // im erkannten Absender
  m.add("o:" + (("anders" in stueck ? stueck.anders : stueck[ANDERES]) ?? "-"));    // Vorschlag des anderen Feldes
  // Betreff: ausdrückliche Betreffzeile, sonst die Zeilen direkt vor der Anrede (Überschrift des Briefs)
  const an = zeilen.findIndex((z) => /^(sehr geehrte|liebe|hallo|guten tag)/i.test(z));
  const betr = zeilen.filter((z) => /^(betreff|betr\.|re:|aw:|wg\.)/i.test(z));
  if (an > 0) betr.push(...zeilen.slice(Math.max(0, an - 2), an));
  for (const w of wort(betr.join(" "))) m.add("b:" + w);
  if (/sehr geehrte|liebe |hallo /i.test(text)) m.add("x:anrede");
  return m;
}

// ---- Daten laden ----
const LERN = "laeufe/lern";
export function laden() {
  const daten = [];
  for (const f of readdirSync(LERN).filter((f) => /^stuecke-.*\.json$/.test(f))) {
    const stapel = f.slice(8, -5), ordner = "pruefstapel-" + stapel;
    for (const z of JSON.parse(readFileSync(join(LERN, f), "utf8"))) {
      const pfad = join(ordner, z.datei);
      if (!existsSync(pfad) || z.soll?.[FELD] == null || !z.neu) continue;
      daten.push({ stapel, datei: z.datei, soll: z.soll[FELD], rat: z.neu[FELD] ?? "-", m: merkmaleTbl(readFileSync(pfad, "utf8"), z.neu) });
    }
  }
  return daten;
}

// ---- Lernen: gierig die Regel mit dem größten Nettogewinn ----
export function lernen(daten, min = MIN, max = MAXREGELN) {
  const akt = daten.map((d) => d.rat), regeln = [];
  for (let r = 0; r < max; r++) {
    // Kandidaten: (wenn aktuell A [oder *] und Merkmal f) → B; gezählt: behoben (+1), verdorben (−1)
    const zahl = new Map();
    for (let i = 0; i < daten.length; i++) {
      const d = daten[i], a = akt[i], richtig = a === d.soll;
      for (const f of d.m) for (const von of [a, "*"]) {
        if (richtig) { // jede Regel mit Ziel ≠ soll würde verderben – nur für bekannte Ziele zählen (unten nachgetragen)
          const k = von + "\u0001" + f; let e = zahl.get(k); if (!e) zahl.set(k, e = { fix: new Map(), ok: 0 }); e.ok++;
        } else {
          const k = von + "\u0001" + f; let e = zahl.get(k); if (!e) zahl.set(k, e = { fix: new Map(), ok: 0 });
          e.fix.set(d.soll, (e.fix.get(d.soll) || 0) + 1);
        }
      }
    }
    // Nettogewinn je Ziel B: behoben(B) − verdorben; verdorben = Stücke, die schon richtig sind (ok), plus falsche mit anderem Soll bleiben falsch (0)
    let best = null;
    for (const [k, e] of zahl) for (const [ziel, fix] of e.fix) {
      // Stücke, die schon „ziel“ haben, bleiben unverändert: von ok abziehen, wo aktuell == ziel (nur bei von="*" möglich)
      const [von] = k.split("\u0001"); if (von === ziel) continue;
      const netto = fix - e.ok;
      if (netto >= min && (!best || netto > best.netto || (netto === best.netto && fix > best.fix))) best = { k, von, f: k.split("\u0001")[1], ziel, netto, fix, verdorben: e.ok };
    }
    if (!best) break;
    regeln.push({ von: best.von, merkmal: best.f, ziel: best.ziel, netto: best.netto, behoben: best.fix, verdorben: best.verdorben });
    for (let i = 0; i < daten.length; i++) if ((best.von === "*" || akt[i] === best.von) && akt[i] !== best.ziel && daten[i].m.has(best.f)) akt[i] = best.ziel;
  }
  return regeln;
}
export function anwenden(regeln, rat, m) {
  let a = rat;
  for (const r of regeln) if ((r.von === "*" || a === r.von) && a !== r.ziel && m.has(r.merkmal)) a = r.ziel;
  return a;
}

// ---- Hauptteil ----
if (process.argv[1].endsWith("tbl-lernen.mjs")) {
  const daten = laden();
  const stapel = [...new Set(daten.map((d) => d.stapel))];
  if (process.argv.includes("--reihum")) {
    let vorher = 0, nachher = 0, n = 0;
    for (const s of stapel) {
      const lern = daten.filter((d) => d.stapel !== s), test = daten.filter((d) => d.stapel === s);
      const regeln = lernen(lern);
      const v = test.filter((d) => d.rat === d.soll).length, nn = test.filter((d) => anwenden(regeln, d.rat, d.m) === d.soll).length;
      vorher += v; nachher += nn; n += test.length;
      console.log(`${s.padEnd(18)} n=${String(test.length).padStart(3)} ${FELD} ${(100 * v / test.length).toFixed(1)} → ${(100 * nn / test.length).toFixed(1)} %  (${regeln.length} Regeln)`);
    }
    console.log(`REIHUM ${FELD} (min ${MIN}): ${(100 * vorher / n).toFixed(1)} → ${(100 * nachher / n).toFixed(1)} %  n=${n}`);
  } else {
    const regeln = lernen(daten);
    for (const r of regeln.slice(0, 40)) console.log(`${r.von} + ${r.merkmal} → ${r.ziel}   netto ${r.netto} (behoben ${r.behoben}, verdorben ${r.verdorben})`);
    if (arg("--aus")) writeFileSync(arg("--aus"), JSON.stringify(regeln, null, 1));
    console.log(`${regeln.length} Regeln aus ${daten.length} Stücken`);
  }
}
