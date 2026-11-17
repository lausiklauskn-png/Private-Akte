// Wortmodell für Bereich und Schriftstück-Art der Briefe: lernen aus lehrdaten-briefe/, prüfen reihum an dem Ordner, der nicht
// mitgelernt hat (und am verbrauchten Stapel pruefstapel-unabhaengig, Soll = Mehrheit). Nur Abstimmung, kein Nachweis.
// Aufruf: node scripts/briefmodell-abstimmen.mjs [--aus lib/wortmodell-daten.ts]
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { merkmale, trainiere, vorhersage } from "./lehrer-modell.mjs";
const W = fileURLToPath(new URL("..", import.meta.url));
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const GROB = { "Arbeit & Sozialversicherung": "Rente, Arbeit & Sozialversicherung", "Rente": "Rente, Arbeit & Sozialversicherung", "Einkäufe": "Einkäufe, Rechnungen & Garantien", "Rechnungen & Garantien": "Einkäufe, Rechnungen & Garantien", "Erbschaft": "Erbschaft, Vollmachten & Vorsorge", "Vollmachten & Vorsorge": "Erbschaft, Vollmachten & Vorsorge" };
const namen = (o) => { const f = join(o, "HAUSHALTE.json"); return existsSync(f) ? JSON.parse(readFileSync(f, "utf8")).haushalte.flatMap((h) => [h.name, ...h.personen.flatMap((p) => [p.vorname, p.name])]).join(" ") : ""; };
function lade(o, mehrheit) {
  const eig = namen(o);
  // Stapel des Trainings-Wochenendes: Soll = Mehrheit der drei Einordner (SOLL.json, scripts/soll-aus-einordnern.mjs); strittige Felder fehlen
  if (mehrheit && existsSync(join(o, "SOLL.json"))) return JSON.parse(readFileSync(join(o, "SOLL.json"), "utf8")).dateien.map((x) => ({ gruppe: o,
    bereich: (x.strittig || []).includes("bereich") ? null : (GROB[x.bereich] ?? x.bereich), art: (x.strittig || []).includes("schriftstueck") ? null : x.schriftstueck, zweit: x.zweitfach || null, merkmale: merkmale(readFileSync(join(o, x.datei), "utf8"), eig) }));
  const e = JSON.parse(readFileSync(join(o, "ERWARTUNG.json"), "utf8")).dateien;
  const q = mehrheit ? ["ZWEITER.json", "DRITTER.json"].map((f) => new Map(JSON.parse(readFileSync(join(o, f), "utf8")).dateien.map((x) => [x.datei, x]))) : [];
  const mh = (x, feld, alt) => { const v = [x[alt] ?? x[feld], ...q.map((m) => m.get(x.datei)?.[feld])].map((b) => GROB[b] ?? b); const z = {}; for (const b of v) z[b] = (z[b] || 0) + 1; const [b, n] = Object.entries(z).sort((a, c) => c[1] - a[1])[0]; return !q.length ? v[0] : n >= 2 ? b : null; };
  return e.map((x) => ({ gruppe: o, bereich: mh(x, "bereich", "kategorie"), art: mh(x, "schriftstueck"), zweit: x.zweitfach || null, merkmale: merkmale(readFileSync(join(o, x.datei), "utf8"), eig) }));
}
const LO = join(W, "lehrdaten-briefe"), ordner = readdirSync(LO).map((u) => join(LO, u)).filter((u) => existsSync(join(u, "ERWARTUNG.json")));
// --verbraucht a,b,…: weitere verbrauchte Stapel (Soll = Mehrheit aus drei Einordnern) lernen mit; --ohne x lässt einen davon aus
// (reihum ausgelassen messen, Punkt 5 der Empfehlung 13.11.2026). Ohne die Schalter bleibt alles wie bisher.
const verbraucht = (arg("--verbraucht", "") || "").split(",").filter(Boolean).filter((v) => v !== arg("--ohne", "")).map((v) => join(W, v));
const lehr = ordner.flatMap((o) => lade(o)), alt = [join(W, "pruefstapel-unabhaengig"), ...verbraucht].filter((v) => !v.endsWith("/" + arg("--ohne", "-"))).flatMap((v) => lade(v, true));
// Eigene Generator-Daten (andere Machart, 10 Haushalte): nur für die Art, je Haushalt höchstens 60, fest ausgewählt. Für den Bereich
// nicht, weil der Generator älter ist als die Fachregel.
const gen = readFileSync(join(W, "ergebnisse/trainingsdaten.jsonl"), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)).filter((x) => x.text.length > 50 && x.soll.schriftstueck && x.soll.schriftstueck !== "Foto");
const jeH = {}; const genBel = gen.filter((x, i) => i % 7 === 0 && (jeH[x.haushalt] = (jeH[x.haushalt] || 0) + 1) <= 60).map((x) => ({ gruppe: "gen-" + x.haushalt, bereich: null, art: x.soll.schriftstueck, zweit: null, merkmale: merkmale(x.text, "") }));
const OPT = { minGruppen: Number(arg("--minGruppen", 2)), proKlasse: Number(arg("--proKlasse", 250)) };
const lerne = (bel0, feld) => trainiere((feld === "art" ? [...bel0, ...genBel] : bel0).filter((b) => b[feld]).map((b) => ({ gruppe: b.gruppe, konto: b[feld], merkmale: b.merkmale })), OPT);
for (const feld of ["bereich", "art"]) {
  let ok = 0, n = 0; const stufen = [0, 1, 2, 3, 5].map((s) => ({ s, n: 0, ok: 0 }));
  for (const o of ordner) { const m = lerne(lehr.filter((b) => b.gruppe !== o), feld);
    for (const b of lehr.filter((b) => b.gruppe === o)) { const v = vorhersage(m, b.merkmale); n++; if (v.konto === b[feld]) ok++; for (const st of stufen) if (v.abstand >= st.s) { st.n++; if (v.konto === b[feld]) st.ok++; } } }
  console.log(`${feld}: reihum ausgelassen ${ok}/${n} = ${(100 * ok / n).toFixed(1)} % · nach Abstand: ${stufen.map((s) => `≥${s.s}: ${s.ok}/${s.n}`).join(" · ")}`);
  const m = lerne(lehr, feld); const a = alt.filter((b) => b[feld]); const t = a.filter((b) => vorhersage(m, b.merkmale).konto === b[feld]).length;
  console.log(`  verbrauchter Stapel (Mehrheit): ${t}/${a.length} = ${(100 * t / a.length).toFixed(1)} % · nach Abstand: ${[0, 1, 2, 3, 5].map((s) => { const x = a.filter((b) => vorhersage(m, b.merkmale).abstand >= s); return `≥${s}: ${x.filter((b) => vorhersage(m, b.merkmale).konto === b[feld]).length}/${x.length}`; }).join(" · ")}`);
}
if (arg("--aus")) {
  const alle = [...lehr, ...alt], mb = lerne(alle, "bereich"), ma = lerne(alle, "art");
  const quelle = createHash("sha256").update(JSON.stringify(alle.map((b) => [b.bereich, b.art, b.merkmale.length]))).digest("hex").slice(0, 12);
  writeFileSync(join(W, arg("--aus")), `// Erzeugt von scripts/briefmodell-abstimmen.mjs aus lehrdaten-briefe/ und verbrauchten Stapeln (${["pruefstapel-unabhaengig", ...verbraucht.map((v) => v.split("/").pop())].join(", ")}; ${alle.length} Schriftstücke). Nicht von Hand ändern.\nexport const WORTMODELL_QUELLE = "${quelle}";\nexport const WORTMODELL_BEREICH = ${JSON.stringify(mb)};\nexport const WORTMODELL_ART = ${JSON.stringify(ma)};\n`);
  console.log("geschrieben:", arg("--aus"), Math.round((JSON.stringify(mb).length + JSON.stringify(ma).length) / 1024), "KB");
}

// ---- Zusammenspiel Regeln + Modell (reihum ausgelassen) ----
if (process.argv.includes("--zusammen")) {
  const { einlesen } = await import("../lib/einlesen.ts"); (await import("../lib/wortmodell.ts")).wortmodellSchalter.an = false; const { siebe } = await import("../lib/siebe.ts");
  const regel = async (o) => { const e = JSON.parse(readFileSync(join(o, "ERWARTUNG.json"), "utf8")).dateien; const aus = [];
    for (const [i, x] of e.entries()) { const d = siebe((await einlesen({ pfad: x.datei, name: x.datei, geaendert: i, bytes: new Uint8Array(readFileSync(join(o, x.datei))) }, async () => "", 0, async () => ""))[0], 5, []); aus.push({ bereich: d.felder.kategorie, art: d.felder.schriftstueck }); } return aus; };
  const mengen = [...ordner.map((o) => [o, lehr.filter((b) => b.gruppe === o), (f) => lerne(lehr.filter((b) => b.gruppe !== o), f)]), [join(W, "pruefstapel-unabhaengig"), alt, (f) => lerne(lehr, f)]];
  for (const feld of ["bereich", "art"]) for (const schw of [2, 3, 5, 8]) {
    const z = { lehr: [0, 0], alt: [0, 0] };
    for (const [o, bel, mf] of mengen) { const m = mf(feld), r = await regel(o), k = o.includes("pruefstapel") ? "alt" : "lehr";
      bel.forEach((b, i) => { if (!b[feld]) return; const v = vorhersage(m, b.merkmale), rr = r[i][feld]; const duenn = !v.merkmale || v.grund.length < 2 || v.konto === "Archiv"; const w = duenn ? rr?.wert : rr?.sicher ? (v.abstand >= schw ? v.konto : rr.wert) : v.konto; z[k][1]++; if (w === b[feld]) z[k][0]++; }); }
    console.log(`${feld} Schwelle ${schw}: Lehrdaten reihum ${z.lehr[0]}/${z.lehr[1]} = ${(100 * z.lehr[0] / z.lehr[1]).toFixed(1)} % · verbrauchter Stapel ${z.alt[0]}/${z.alt[1]} = ${(100 * z.alt[0] / z.alt[1]).toFixed(1)} %`);
  }
}
