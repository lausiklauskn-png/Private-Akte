// Lauf „Vermieterin“, Kontoauszüge (Regeln: docs/PRUEFSTAPEL-VERMIETERIN-REGELN.md).
// (a) Lesbarkeit: steht jeder Soll-Umsatz im Text des Auszugs vollständig da (Tag+Betrag auf einer Zeile, Gegenpartei, Zweck)?
//     – am Ausgangstext (Kontrolle des Prüfers) und am Text aus der Texterkennung.
// (b) BookLedgerPro: dieselben Umsätze als MT940 gesetzt → parseBankauszug, Saldoprüfung, Zahlungsabgleich Umsatz → Beleg
//     (offene Posten = die Belege des Stapels mit Soll-Betrag, -Datum, -Rechnungsnummer, -Aussteller).
// Aufruf: node scripts/messen-bank.mjs <stapel> [--ocr <ordner>] [--blp ../bookledgerpro] [--soll mehrheit] [--json datei]
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const S = resolve(process.argv[2]), OCR = arg("--ocr", ""), BLP = resolve(arg("--blp", "../bookledgerpro"));
const lese = (p) => JSON.parse(readFileSync(p, "utf8"));
const soll = lese(join(S, "bank/UMSAETZE.json"));
const wilson = (k, n) => { if (!n) return "–"; const z = 1.96, p = k / n, m = (p + z * z / (2 * n)) / (1 + z * z / n), h = z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / (1 + z * z / n); return `${(100 * p).toFixed(1)} % (${k}/${n}; ${(100 * (m - h)).toFixed(0)}–${(100 * (m + h)).toFixed(0)})`; };
const cent = (b) => Math.round(parseFloat(String(b).replace(/\./g, "").replace(",", ".")) * 100);
const fest = (t) => String(t).toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9]/g, "");
const betragText = (b) => String(b).replace(/^[-+]/, "");
const aus = { stapel: S };

// Mehrheit der Einordner für die Zuordnung Umsatz → Stücke (Autor + ZWEITER-BANK + DRITTER-BANK, soweit vorhanden)
const einordner = [soll, ...["ZWEITER-BANK.json", "DRITTER-BANK.json"].map((n) => join(S, "bank", n)).filter(existsSync).map(lese)];
const key = (x) => JSON.stringify([...(x || [])].sort());
function stueckeSoll(datei, nr) {
  const st = einordner.map((e) => e.auszuege.find((a) => a.datei === datei)?.umsaetze.find((u) => u.nr === nr)?.stuecke).filter((x) => x !== undefined);
  const z = {}; for (const s of st) z[key(s)] = (z[key(s)] || 0) + 1;
  const [best, n] = Object.entries(z).sort((a, b) => b[1] - a[1])[0];
  return n * 2 > st.length || st.length === 1 ? JSON.parse(best) : null; // null = strittig
}

// ---------- (a) Lesbarkeit ----------
function lesbar(ordner) {
  let n = 0, zeile = 0, gegen = 0, zweck = 0, alle = 0, renr = 0, renrN = 0;
  for (const a of soll.auszuege) {
    const p = join(ordner, "bank", a.datei); if (!existsSync(p)) continue;
    const text = readFileSync(p, "utf8"), zeilen = text.split("\n"), f = fest(text);
    for (const u of a.umsaetze) {
      n++;
      const tag = u.buchung.slice(8, 10) + "." + u.buchung.slice(5, 7) + ".", b = betragText(u.betrag);
      const z = zeilen.some((l) => l.includes(tag) && l.replace(/\s/g, "").includes(b)); // Tag und Betrag auf derselben Zeile
      const g = f.includes(fest(u.gegenpartei || "")), w = f.includes(fest(u.zweck || ""));
      zeile += z; gegen += g; zweck += w; alle += z && g && w;
      for (const r of u.rechnungsnummern) { renrN++; renr += f.includes(fest(r)) || w; }
    }
  }
  return { umsaetze: n, tagUndBetrag: wilson(zeile, n), gegenpartei: wilson(gegen, n), zweck: wilson(zweck, n), vollstaendig: wilson(alle, n), rechnungsnummer: wilson(renr, renrN) };
}
aus.lesbarText = lesbar(S);
if (OCR) aus.lesbarGescannt = lesbar(resolve(OCR));

// ---------- (b) BookLedgerPro: MT940 und Zahlungsabgleich ----------
if (existsSync(join(BLP, "src/domain/bankimport.js"))) {
  const { parseBankauszug, pruefeBankauszug } = await import(join(BLP, "src/domain/bankimport.js"));
  const { findeOffenePosten, findeSammelzuordnung } = await import(join(BLP, "src/domain/zahlungsabgleich.js"));
  const yy = (d) => d.slice(2, 4) + d.slice(5, 7) + d.slice(8, 10), mt = (c) => (Math.abs(c) / 100).toFixed(2).replace(".", ",");
  const belege = lese(join(S, "belege/ERWARTUNG.json")).dateien;
  const posten = belege.map((b) => ({ id: "belege/" + b.datei, betragCent: cent(b.betrag), datum: b.datum, referenz: b.rechnungsnummer || "", name: b.aussteller, richtung: b.richtung }));
  let gelesen = 0, saldoOk = 0, n = 0, richtig = 0, falsch = 0, keiner = 0, ohneN = 0, ohneFalsch = 0, strittig = 0, sammelN = 0, sammelOk = 0;
  const fehler = [];
  for (const a of soll.auszuege) {
    const iban = soll.konto.iban.replace(/\s/g, "");
    const zeilen = [":20:STARTUMS", `:25:${iban}`, ":28C:1/1", `:60F:${cent(a.saldoAlt) < 0 ? "D" : "C"}${yy(a.umsaetze[0].buchung)}EUR${mt(cent(a.saldoAlt))}`];
    for (const u0 of a.umsaetze) { const u = { ...u0, zweck: u0.zweck || "", gegenpartei: u0.gegenpartei || "" }, c = cent(u.betrag); zeilen.push(`:61:${yy(u.wert)}${yy(u.buchung).slice(2)}${c < 0 ? "D" : "C"}${mt(c)}NTRFNONREF`, `:86:166?00${u.art.toUpperCase()}?20${u.zweck.slice(0, 27)}?21${u.zweck.slice(27, 54)}?22${u.zweck.slice(54, 81)}?32${u.gegenpartei.slice(0, 27)}?33${u.gegenpartei.slice(27, 54)}`); }
    zeilen.push(`:62F:${cent(a.saldoNeu) < 0 ? "D" : "C"}${yy(a.umsaetze.at(-1).buchung)}EUR${mt(cent(a.saldoNeu))}`, "-");
    const p = parseBankauszug(zeilen.join("\n")); gelesen += p.umsaetze.length; saldoOk += pruefeBankauszug(p).ok ? 1 : 0;
    a.umsaetze.forEach((u, i) => {
      const st = stueckeSoll(a.datei, u.nr); if (st === null) { strittig++; return; }
      const sb = st.filter((s) => s.startsWith("belege/")), um = p.umsaetze[i]; if (!um) return;
      const t = findeOffenePosten(um, posten);
      if (sb.length === 1) { n++; if (t && t.posten.id === sb[0]) richtig++; else if (t) { falsch++; fehler.push(`${a.datei} #${u.nr}: ${t.posten.id} statt ${sb[0]}`); } else { keiner++; fehler.push(`${a.datei} #${u.nr}: kein Treffer für ${sb[0]}`); } }
      else if (sb.length > 1) { sammelN++; const k = findeSammelzuordnung(um, posten)[0]; sammelOk += !!k && key(k.posten.map((x) => x.id)) === key(sb); }
      else { ohneN++; if (t) { ohneFalsch++; fehler.push(`${a.datei} #${u.nr}: ${t.posten.id}, obwohl kein Beleg dazugehört`); } }
    });
  }
  aus.blp = { einordner: einordner.length, auszuegeSaldoStimmt: `${saldoOk}/${soll.auszuege.length}`, umsaetzeGelesen: gelesen, strittig,
    einBeleg: { richtig: wilson(richtig, n), falscherBeleg: falsch, keinTreffer: keiner }, mehrereBelegeInEinerZahlung: `${sammelOk}/${sammelN}`,
    ohneBeleg: { n: ohneN, faelschlichZugeordnet: ohneFalsch }, fehler };
}
if (arg("--json", "")) writeFileSync(arg("--json"), JSON.stringify(aus, null, 1));
console.log(JSON.stringify({ ...aus, blp: aus.blp && { ...aus.blp, fehler: aus.blp.fehler.length } }, null, 1));
