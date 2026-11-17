// „Merken wie ein Nutzer“ – nachgestellt als Werkzeug (Regeln: docs/PRUEFSTAPEL-VERMIETERIN-REGELN.md, Nachtrag Folgejahre).
// lernen: aus einem gemessenen (verbrauchten) Jahr die bestätigten Zuordnungen eines Haushalts merken – so, als hätte der Nutzer
//         jeden Vorschlag berichtigt: Absender → Bereich (Schriftstücke), Aussteller → Konto (Belege),
//         Gegenparteien, deren Zahlungen nie zu einem Beleg gehörten (Kontoauszüge).
// messen: ein neues Jahr mit und ohne das Gemerkte gegen die Mehrheit der Einordner; Unterschied mit McNemar.
// In den Apps gibt es diese Bedienung noch nicht; das Gemerkte gilt nur für diesen Haushalt und ist kein Nachweis für fremde.
// Aufruf: node scripts/merken.mjs lernen <stapel> <ziel.json>
//         node scripts/merken.mjs messen <stapel> <textordner> <gemerkt.json> [--blp ../bookledgerpro] [--json datei]
import { readFileSync, writeFileSync, existsSync } from "node:fs"; import { join, resolve } from "node:path";
import { einlesen } from "../lib/einlesen.ts"; import { siebe } from "../lib/siebe.ts"; import { aehnlich } from "../lib/abgleich.ts";
import { wilson, mcnemar } from "./statistik.mjs";
const [, , modus, a1, a2, a3] = process.argv, arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const lese = (p) => JSON.parse(readFileSync(p, "utf8"));
const fest = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\b(gmbh|ag|eg|kg|ug|mbh|co|e\.?v\.?|ohg|gbr)\b/g, "").replace(/[^a-z0-9]/g, "");
const mehrheit = (werte) => { const z = new Map(); for (const w of werte) { const k = JSON.stringify(w ?? null); z.set(k, (z.get(k) || 0) + 1); } const [k, n] = [...z.entries()].sort((x, y) => y[1] - x[1])[0]; return n >= 2 || werte.length === 1 ? JSON.parse(k) : undefined; };
/** Soll je Datei: Mehrheit der vorhandenen Einordner; feldAutor/feldAndere wegen der zwei Schreibweisen (kategorie/bereich). */
function soll(ordner, feldAutor, feldAndere = feldAutor) {
  const e = lese(join(ordner, "ERWARTUNG.json")).dateien, q = ["ZWEITER.json", "DRITTER.json"].filter((f) => existsSync(join(ordner, f))).map((f) => new Map(lese(join(ordner, f)).dateien.map((x) => [x.datei, x])));
  return new Map(e.map((x) => [x.datei, mehrheit([x[feldAutor], ...q.map((m) => m.get(x.datei)?.[feldAndere])])]));
}
const haeufigster = (liste) => { const z = new Map(); for (const w of liste) z.set(w, (z.get(w) || 0) + 1); const [w, n] = [...z.entries()].sort((x, y) => y[1] - x[1])[0]; return { w, n, von: liste.length }; };
/** Nachschlagen: gleicher oder sehr ähnlicher Name (Texterkennung, Zusätze) */
const finde = (tafel, name) => { const k = fest(name); if (!k) return null; if (tafel[k]) return tafel[k]; const t = Object.keys(tafel).find((x) => aehnlich(x, k) >= 0.85 || (k.length >= 8 && (x.includes(k) || k.includes(x)))); return t ? tafel[t] : null; };
async function kern(ordner, datei) { const text = readFileSync(join(ordner, datei), "utf8"); const d = (await einlesen({ pfad: datei, name: datei.split("/").pop(), geaendert: Date.UTC(2025, 5, 1), bytes: new TextEncoder().encode(text) }, async () => ""))[0]; const f = siebe(d, 5).felder || {}; return { text, bereich: f.kategorie?.wert || null, absender: f.absender?.wert || null }; }

if (modus === "lernen") {
  const S = resolve(a1), bereich = soll(S, "kategorie", "bereich"), absender = soll(S, "absender"), proAbs = {}, proAus = {};
  for (const [d, b] of bereich) { const a = fest(absender.get(d)); if (a && b) (proAbs[a] ||= []).push(b); }
  const konto = soll(join(S, "belege"), "konto"), aus = soll(join(S, "belege"), "aussteller");
  for (const [d, k] of konto) { const a = fest(aus.get(d)); if (a && k) (proAus[a] ||= []).push(k); }
  // nur eindeutige Erfahrungen merken: der häufigste Wert muss mindestens zwei Drittel ausmachen
  const eindeutig = (o) => Object.fromEntries(Object.entries(o).map(([k, l]) => [k, haeufigster(l)]).filter(([, h]) => h.n * 3 >= h.von * 2).map(([k, h]) => [k, h.w]));
  const u = lese(join(S, "bank/UMSAETZE.json")), q = [u, ...["ZWEITER-BANK.json", "DRITTER-BANK.json"].map((n) => join(S, "bank", n)).filter(existsSync).map(lese)], mit = {}, ohne = {};
  for (const a of u.auszuege) for (const x of a.umsaetze) { const st = mehrheit(q.map((e) => JSON.stringify([...(e.auszuege.find((y) => y.datei === a.datei)?.umsaetze.find((y) => y.nr === x.nr)?.stuecke || [])].sort()))); const g = fest(x.gegenpartei); if (!g || st === undefined) continue; (JSON.parse(st).some((s) => s.startsWith("belege/")) ? mit : ohne)[g] = 1; }
  // Punkt 7 (13.11.2026): nach Sache merken – Absender UND Vorschlag des Kerns → Bereich, den der Nutzer gewählt hat; dazu nur die
  // Absender, deren Schriftstücke alle in einem Bereich lagen (sonst entscheidet die Sache, nicht der Absender).
  const sache = {}, proAbsAlle = {};
  for (const [d, b] of bereich) { const a = fest(absender.get(d)); if (!a || !b) continue; const k = (await kern(S, d)).bereich || "";
    ((sache[a] ||= {})[k] ||= []).push(b); (proAbsAlle[a] ||= []).push(b); }
  const sacheBereich = Object.fromEntries(Object.entries(sache).map(([a, o]) => [a, Object.fromEntries(Object.entries(o).map(([k, l]) => [k, haeufigster(l)]).filter(([, h]) => h.n * 3 >= h.von * 2).map(([k, h]) => [k, h.w]))]));
  const absenderEinig = Object.fromEntries(Object.entries(proAbsAlle).filter(([, l]) => new Set(l).size === 1).map(([a, l]) => [a, l[0]]));
  const gemerkt = { quelle: a1, sacheBereich, absenderEinig, absenderBereich: eindeutig(proAbs), ausstellerKonto: eindeutig(proAus), gegenparteiOhneBeleg: Object.keys(ohne).filter((g) => !mit[g]) };
  writeFileSync(resolve(a2), JSON.stringify(gemerkt, null, 1));
  console.log(`gemerkt: ${Object.keys(gemerkt.absenderBereich).length} Absender → Bereich, ${Object.keys(gemerkt.ausstellerKonto).length} Aussteller → Konto, ${gemerkt.gegenparteiOhneBeleg.length} Gegenparteien ohne Beleg`);
} else if (modus === "messen") {
  const S = resolve(a1), T = resolve(a2), M = lese(resolve(a3)), BLP = resolve(arg("--blp", "../bookledgerpro")), aus = { stapel: a1, text: a2, gemerkt: a3 };
  const paar = (zeilen) => { const n = zeilen.length, o = zeilen.filter((z) => z.ohne).length, m = zeilen.filter((z) => z.mit).length, b = zeilen.filter((z) => z.mit && !z.ohne).length, c = zeilen.filter((z) => !z.mit && z.ohne).length; return { n, ohne: `${o}/${n}`, mit: `${m}/${n}`, spanneOhne: wilson(o, n), spanneMit: wilson(m, n), besserDurchMerken: b, schlechterDurchMerken: c, p: +mcnemar(b, c).toFixed(4), gemerktGegriffen: zeilen.filter((z) => z.griff).length }; };
  // Schriftstücke: Bereich
  { const sb = soll(S, "kategorie", "bereich"), z = []; for (const [d, b] of sb) { if (b === undefined) continue; const k = await kern(T, d), g = finde(M.absenderBereich, k.absender); z.push({ ohne: k.bereich === b, mit: (g || k.bereich) === b, griff: !!g });
    if (M.sacheBereich) { const t = finde(M.sacheBereich, k.absender), gs = (t && t[k.bereich || ""]) || finde(M.absenderEinig, k.absender); (aus._sache ||= []).push({ ohne: k.bereich === b, mit: (gs || k.bereich) === b, griff: !!gs }); } }
    aus.bereich = paar(z); if (aus._sache) { aus.bereichNachSache = paar(aus._sache); delete aus._sache; } }
  // Belege: Konto (BookLedgerPro Regeln + Wortmodell; Aussteller aus dem Kern des Datei-Organizers)
  if (existsSync(join(BLP, "src/ai/kontoModell.js"))) { const { kontoVorschlag } = await import(join(BLP, "src/ai/kontoModell.js")); const name = lese(join(S, "HAUSHALTE.json")).haushalte[0].personen.map((p) => `${p.vorname} ${p.name}`)[0];
    const sk = soll(join(S, "belege"), "konto"), z = []; for (const [d, k] of sk) { if (k === undefined) continue; const kk = await kern(join(T, "belege"), d), ist = String((await kontoVorschlag(kk.text, { eigenerName: name })).konto), g = finde(M.ausstellerKonto, kk.absender); z.push({ ohne: ist === k, mit: (g || ist) === k, griff: !!g }); } aus.konto = paar(z);
    // Kontoauszüge: Umsätze ohne Beleg – fälschlich zugeordnet, mit und ohne „diese Gegenpartei hatte nie einen Beleg“
    const { findeOffenePosten } = await import(join(BLP, "src/domain/zahlungsabgleich.js")); const cent = (b) => Math.round(parseFloat(String(b).replace(/\./g, "").replace(",", ".")) * 100);
    const posten = lese(join(S, "belege/ERWARTUNG.json")).dateien.map((b) => ({ id: "belege/" + b.datei, betragCent: cent(b.betrag), datum: b.datum, referenz: b.rechnungsnummer || "", name: b.aussteller, richtung: b.richtung }));
    const u = lese(join(S, "bank/UMSAETZE.json")), q = [u, ...["ZWEITER-BANK.json", "DRITTER-BANK.json"].map((n) => join(S, "bank", n)).filter(existsSync).map(lese)]; let n = 0, fo = 0, fm = 0, nb = 0, ro = 0, rm = 0;
    for (const a of u.auszuege) for (const x of a.umsaetze) { const st = mehrheit(q.map((e) => JSON.stringify([...(e.auszuege.find((y) => y.datei === a.datei)?.umsaetze.find((y) => y.nr === x.nr)?.stuecke || [])].sort()))); if (st === undefined) continue; const sb = JSON.parse(st).filter((s) => s.startsWith("belege/")); if (sb.length > 1) continue;
      const c = cent(x.betrag), um = { valuta: x.wert, betragCent: Math.abs(c), richtung: c < 0 ? "ausgabe" : "einnahme", zweck: x.zweck || "", gegen: x.gegenpartei || "" }, t = findeOffenePosten(um, posten);
      const gesperrt = M.gegenparteiOhneBeleg.includes(fest(x.gegenpartei)) && !(t && t.posten.referenz && um.zweck.toLowerCase().includes(t.posten.referenz.toLowerCase())), tm = gesperrt ? null : t;
      if (sb.length === 0) { n++; fo += !!t; fm += !!tm; } else { nb++; ro += t?.posten.id === sb[0]; rm += tm?.posten.id === sb[0]; } }
    aus.bank = { ohneBeleg: n, faelschlichOhneMerken: fo, faelschlichMitMerken: fm, mitBeleg: nb, richtigOhneMerken: ro, richtigMitMerken: rm }; }
  if (arg("--json", "")) writeFileSync(arg("--json"), JSON.stringify(aus, null, 1)); console.log(JSON.stringify(aus, null, 1));
} else { console.error("Aufruf: lernen <stapel> <ziel.json> | messen <stapel> <textordner> <gemerkt.json>"); process.exit(2); }
