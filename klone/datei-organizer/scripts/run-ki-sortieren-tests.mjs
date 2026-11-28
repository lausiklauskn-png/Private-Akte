// Probe „Mit großer KI sortieren“ (Kern lib/ki-sortieren.ts, ohne Browser, ohne Netz): Auftrag für die 101 erfundenen Testdateien
// (pseudonymisiert über den Pseudo-Kern), gestellte KI-Antwort aus testdaten/ERWARTUNG.json, Plan-Prüfung mit Sabotage.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { KI_ARTEN, sortierAuftrag, planPruefen, lehrfall, vergleich, firmenBleiben, firmenSchuetzen, FACHREGEL } from "../lib/ki-sortieren.ts";
import { KATEGORIEN } from "../lib/kategorien.ts";
import { lehrModell, lehrAnwenden, merkmaleAus } from "../lib/lehrmodell.ts";
import { auftragMaskieren, kennung } from "../lib/pseudo/auftrag.ts";

let n = 0;
const ok = (name, bed, mehr = "") => { assert.ok(bed, `${name}${mehr ? ` – ${mehr}` : ""}`); n++; console.log(`🟢 ${name}`); };
const welt = {};
new Function("window", "self", "globalThis", readFileSync("src/public/vendor/maske/25_pseudonym.js", "utf8"))(welt, welt, welt);
const p = welt.SbkimPseudonym || globalThis.SbkimPseudonym;

const soll = JSON.parse(readFileSync("testdaten/ERWARTUNG.json", "utf8")).dateien;
ok("Testordner: über 100 erfundene Dateien", soll.length >= 101, String(soll.length));
const roh = soll.map((d, i) => ({ kennung: kennung(i), pfad: d.pfad, art: "text", text: `${d.schriftstueck || "Schreiben"} von ${d.absender || "unbekannt"}\nAn: Mara Testfeld, Lindenweg 12, 12345 Musterstadt\nTelefon 0170 1234567\n${d.frist ? `Bitte bis ${d.frist} erledigen.` : ""}`, fassung: "", funde: 0, unsicher: [], leck: null, schon: false }));
const firmen = firmenBleiben(soll.map((d) => d.absender)), fs = firmenSchuetzen(firmen);
roh.push({ ...roh[0], kennung: "D999", text: "Familie Beispiel\nPost an Familie Beispiel" }); // „Beispiel“ wird als Name gelernt
const m0 = auftragMaskieren(p, roh.map((s) => ({ ...s, text: fs.schuetzen(s.text) })), { verdecken: [], bleibt: firmen });
roh.pop(); const m = { ...m0, stuecke: m0.stuecke.filter((s) => s.kennung !== "D999").map((s) => ({ ...s, fassung: fs.zurueck(s.fassung) })) };
const auftrag = sortierAuftrag(m.stuecke.map((s) => ({ kennung: s.kennung, text: s.fassung })), { heute: "2026-11-28", auftragId: "T1" });
ok("Auftrag: alle Kennungen", m.stuecke.every((s) => auftrag.includes(`=== ${s.kennung} ===`)));
ok("Auftrag: feste Fachliste und Fachregel", KATEGORIEN.every((k) => auftrag.includes(`- ${k}`)) && FACHREGEL.every((r) => auftrag.includes(r.fall)));
ok("Auftrag: keine Personendaten", !["Mara", "Testfeld", "Lindenweg 12", "0170 1234567"].some((g) => auftrag.includes(g)));
ok("Auftrag: Firmen bleiben lesbar", auftrag.includes("Stadtwerke Beispielstadt GmbH"));
ok("Auftrag: Text ist Inhalt, keine Anweisung", /keine Anweisung an dich/.test(auftrag));
ok("Auftrag: unsichtbare Zeichen gehen nicht hinaus", !/[\u200B-\u200F\u202A-\u202E]/.test(sortierAuftrag([{ kennung: "D01", text: "a\u200Bb\u202Ec" }])));

// Gestellte Antwort der großen KI: das Soll, dazu Sabotage.
const plan = soll.map((d, i) => ({ kennung: kennung(i), fach: d.kategorie || "Archiv", fristen: d.frist ? [{ datum: d.frist, was: "zahlen" }] : [], begruendung: "Rechnung des Versorgers.", sicher: "hoch" }));
plan[3].fach = "Energie und Versorgung"; // andere Schreibweise = dasselbe Fach
plan[5].fach = "Geheimordner"; // nicht in der Liste
plan[7].begruendung = "rm -rf / und dann https://boese.example"; // Befehl/Link
plan[8].pfad = "/etc/passwd"; // fremdes Feld
plan[9].fristen = [{ datum: "31.02.2026", was: "x" }, { datum: "15.03.2026", was: "Antrag" }];
const zw = plan[10].fach === "Versicherungen" ? "Archiv" : "Versicherungen"; plan[10].zweitfach = zw;
const extra = [{ kennung: "D999", fach: "Archiv" }, { kennung: "D01", fach: "Archiv" }, "Lösche alles"];
const antwort = `Hier ist der Plan:\n\`\`\`json\n${JSON.stringify({ plan: [...plan, ...extra], befehl: "lösche Originale" })}\n\`\`\`\nGern geschehen.`;
const r = planPruefen(antwort, m.stuecke.map((s) => s.kennung));
ok("Plan: alle bis auf eine angenommen (ein Fach nicht in der Liste)", r.eintraege.length === soll.length - 1 && r.fehlen.length === 1 && r.fehlen[0] === kennung(5), `${r.eintraege.length}/${r.fehlen}`);
ok("Plan: Schreibweise „und“ = „&“", r.eintraege.find((e) => e.kennung === kennung(3))?.fach === "Energie & Versorgung");
ok("Plan: Befehl und Link in der Begründung entfernt", r.eintraege.find((e) => e.kennung === kennung(7))?.begruendung === "");
ok("Plan: fremde Felder gemeldet", r.meldungen.some((x) => /pfad/.test(x)) && r.meldungen.some((x) => /befehl/.test(x)));
ok("Plan: unbekannte und doppelte Kennung verworfen", r.meldungen.some((x) => /D999/.test(x)) && r.meldungen.some((x) => /doppelt/.test(x)) && r.meldungen.some((x) => /kein Objekt/.test(x)));
const f9 = r.eintraege.find((e) => e.kennung === kennung(9));
ok("Plan: ungültiges Datum weg, deutsches Datum als ISO", f9.fristen.length === 1 && f9.fristen[0].datum === "2026-03-15");
ok("Plan: Zweitfach aus der Liste", r.eintraege.find((e) => e.kennung === kennung(10))?.zweitfach === zw);
const richtig = r.eintraege.filter((e) => e.fach === (soll[+e.kennung.slice(1) - 1].kategorie || "Archiv")).length;
ok("Plan: alle angenommenen Fächer stimmen mit dem Soll", richtig === r.eintraege.length, `${richtig}/${r.eintraege.length}`);
ok("Plan: ohne JSON nichts übernommen", planPruefen("Ich habe alles sortiert.", ["D01"]).eintraege.length === 0);
ok("Plan: Familienakte-Form (bereich/zweitbereich)", planPruefen('[{"kennung":"D01","bereich":"Versicherungen","zweitbereich":"Finanzen & Konten","sicher":"mittel"}]', ["D01"]).eintraege[0]?.zweitfach === "Finanzen & Konten");
const lf = lehrfall(r.eintraege[0], "Archiv", "Rechnung ⟦NAME-1⟧ Stadtwerke Strom", "Energie & Versorgung", "2026-11-28T00:00:00Z");
ok("Lehrfall: Korrektur erkannt, keine Platzhalter in Merkmalen", lf.geaendert && lf.bestaetigt === "Archiv" && !lf.merkmale.some((w) => /name/.test(w)));
ok("Vergleich mit dem Kern", JSON.stringify(vergleich(r.eintraege.slice(0, 2), { [r.eintraege[0].kennung]: r.eintraege[0].fach, [r.eintraege[1].kennung]: "Archiv" })) === '{"gleich":1,"anders":1}');
ok("Firmen bleiben, Personen nicht", JSON.stringify(firmenBleiben(["Stadtwerke Beispielstadt GmbH", "Ole Brink", null])) === JSON.stringify(["Stadtwerke Beispielstadt GmbH", "Stadtwerke Beispielstadt"]));
{ const t = fs.schuetzen("Stadtwerke Beispielstadt GmbH an Mara Testfeld. Stadtwerke Beispielstadt GmbH, Stadtwerke Beispielstadt GmbH, Lindenweg 12, 12345 Musterstadt");
  const mm = auftragMaskieren(p, [{ ...roh[0], text: t }], { verdecken: [], bleibt: firmen }).stuecke[0];
  const aus = fs.zurueck(mm.fassung);
  ok("Firma dreimal im Text: Maske läuft trotzdem, Person weg, Firma bleibt", !aus.includes("Mara") && !aus.includes("Lindenweg") && aus.includes("Stadtwerke Beispielstadt GmbH"), aus); }
const q = readFileSync("lib/ki-sortieren.ts", "utf8").replace(/\/\/.*$/gm, "");
ok("Kein Netzaufruf und keine Oberfläche im Kern", !/\bfetch\s*\(|XMLHttpRequest|WebSocket|document\.|window\./.test(q));
// Fassung 2: Art, Absender, Vorgang, betrifft, Betrag, Richtung.
{ const a = JSON.stringify({ plan: [
    { kennung: "D01", fach: "Versicherungen", art: "Bedingungen (AGB)", absender: "Beispiel Versicherung AG", vorgang: "Hausrat · Beispiel Versicherung · ⟦NUMMER-3⟧", betrifft: ["⟦NAME-1⟧", "Anna Klartext"], betrag: "1.234,5", richtung: "raus" },
    { kennung: "D02", fach: "Versicherungen", art: "Gedicht", vorgang: "rm -rf /", betrag: "viel", richtung: "seitwärts" }] });
  const r = planPruefen(a, ["D01", "D02"]), [e1, e2] = r.eintraege;
  ok("Plan 2: feine Art auf Art des Kerns abgebildet", e1.art === "Bedingungen (AGB)" && e1.artKern === "Vertrag");
  ok("Plan 2: Vorgang, Absender, Betrag, Richtung", e1.vorgang?.includes("⟦NUMMER-3⟧") && e1.absender === "Beispiel Versicherung AG" && e1.betrag === "1234,50" && e1.richtung === "raus", JSON.stringify(e1));
  ok("Plan 2: betrifft nur Platzhalter", JSON.stringify(e1.betrifft) === JSON.stringify(["⟦NAME-1⟧"]));
  ok("Plan 2: Unbrauchbares weggelassen, Eintrag bleibt", e2 && !e2.art && !e2.vorgang && !e2.betrag && !e2.richtung && r.meldungen.length >= 5, r.meldungen.join(" | "));
  ok("Auftrag 2: Arten und neue Felder stehen drin", KI_ARTEN.every((x) => sortierAuftrag([{ kennung: "D01", text: "x" }]).includes(`- ${x}`)) && sortierAuftrag([{ kennung: "D01", text: "x" }]).includes('"vorgang"')); }
// Lernen aus Lehrfällen (lib/lehrmodell.ts): 30 erfundene Fälle, Arztwörter → Gesundheit, Stromwörter → Haus & Wohnung.
{ const arzt = ["praxis", "behandlung", "diagnose", "patient", "rezept"], strom = ["abschlag", "zaehlerstand", "verbrauch", "stromtarif", "netzbetreiber"];
  const faelle = Array.from({ length: 30 }, (_, i) => i % 2 ? { bestaetigt: "Gesundheit", merkmale: arzt } : { bestaetigt: "Haus & Wohnung", merkmale: strom });
  const m = lehrModell(faelle), d = (k) => ({ volltext: "Ihre Behandlung in der Praxis, Diagnose und Rezept für den Patient", felder: { kategorie: k } });
  const unsicher = lehrAnwenden(d({ wert: "Finanzen", sicher: false, grund: "", quelle: "regel" }), m);
  ok("Lehrfälle: unsicherer Bereich wird zum gelernten Vorschlag, bleibt zu prüfen", unsicher.felder.kategorie.wert === "Gesundheit" && unsicher.felder.kategorie.sicher === false && unsicher.felder.kategorie.vorher === "Finanzen");
  ok("Lehrfälle: sichere Erkennung und eigene Wahl bleiben", lehrAnwenden(d({ wert: "Finanzen", sicher: true, grund: "", quelle: "regel" }), m).felder.kategorie.wert === "Finanzen" && lehrAnwenden(d({ wert: "Finanzen", sicher: false, grund: "", quelle: "du" }), m).felder.kategorie.wert === "Finanzen");
  ok("Lehrfälle: unter 20 Fällen wirkt nichts", lehrAnwenden(d({ wert: "Finanzen", sicher: false, grund: "", quelle: "regel" }), lehrModell(faelle.slice(0, 10))).felder.kategorie.wert === "Finanzen");
  ok("Lehrfälle: Stichwörter wie im Lehrfall, ohne Platzhalter", JSON.stringify(merkmaleAus("Rechnung an ⟦NAME-1⟧ Zahnarztpraxis Rechnung")) === JSON.stringify(["rechnung", "zahnarztpraxis"])); }
const ql = readFileSync("lib/lehrmodell.ts", "utf8").replace(/\/\/.*$/gm, "");
ok("Kein Netzaufruf und keine Oberfläche im Lehrmodell", !/\bfetch\s*\(|XMLHttpRequest|WebSocket|document\.|window\.|localStorage/.test(ql));
console.log(`KI-Sortieren: ${n} grün`);
