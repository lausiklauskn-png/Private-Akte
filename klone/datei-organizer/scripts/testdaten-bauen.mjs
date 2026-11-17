// Erfundene, unsortierte Testdaten für den Datei-Organizer und die Familienakte (Klaus 12.11.2026:
// „schön durcheinander, damit wir das Programm trainieren können“). Alles erfunden: Familie Beispiel,
// Firmen „… Beispiel“, ungültiges Kennzeichen BSP-FA 12, IBANs mit Nullen. Deterministisch.
// Aufruf: node scripts/testdaten-bauen.mjs  →  testdaten/Eingang/… und testdaten/ERWARTUNG.json
import { mkdirSync, readFileSync, rmSync, writeFileSync, utimesSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { textPdf } from "../lib/test-pdf.ts";
import { exifStueck, verbinde } from "../lib/exif.ts";

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), "..");
const ZIEL = join(WURZEL, "testdaten", "Eingang");
rmSync(join(WURZEL, "testdaten"), { recursive: true, force: true });
const erwartung = [];
let zufall = 12345;
const rnd = () => (zufall = (zufall * 1103515245 + 12345) % 2147483648) / 2147483648;
const wahl = (a) => a[Math.floor(rnd() * a.length)];
const zeit = (iso) => new Date(`${iso}T09:00:00Z`);
const de = (iso) => `${iso.slice(8, 10)}.${iso.slice(5, 7)}.${iso.slice(0, 4)}`;
const plus = (iso, tage) => { const d = new Date(`${iso}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + tage); return d.toISOString().slice(0, 10); };

function ablegen(pfad, bytes, iso, soll) {
  const voll = join(ZIEL, pfad);
  mkdirSync(dirname(voll), { recursive: true });
  writeFileSync(voll, bytes);
  utimesSync(voll, zeit(iso), zeit(iso));
  if (soll) erwartung.push({ pfad: `Eingang/${pfad}`, ...soll });
}

// ---------- Absender ----------
const A = {
  stadtwerke: { name: "Stadtwerke Beispielstadt GmbH", zeile: "Stadtwerke Beispielstadt GmbH · Werkstraße 5 · 00001 Beispielstadt", kat: "Energie & Versorgung" },
  versicherung: { name: "Beispiel-Versicherung AG", zeile: "Beispiel-Versicherung AG · Policenplatz 2 · 00002 Beispielstadt", kat: "Versicherungen" },
  finanzamt: { name: "Finanzamt Beispielstadt", zeile: "Finanzamt Beispielstadt · Steuerallee 10 · 00003 Beispielstadt", kat: "Steuern & Behörden" },
  buergeramt: { name: "Bürgeramt Beispielstadt", zeile: "Bürgeramt Beispielstadt · Rathausmarkt 1 · 00004 Beispielstadt", kat: "Steuern & Behörden" },
  praxis: { name: "Praxis Dr. med. Anna Muster", zeile: "Praxis Dr. med. Anna Muster · Gesundweg 3 · 00005 Beispielstadt", kat: "Gesundheit & Pflege" },
  zahnarzt: { name: "Zahnarztpraxis Dr. Beispiel", zeile: "Zahnarztpraxis Dr. Beispiel · Lächelstraße 8 · 00006 Beispielstadt", kat: "Gesundheit & Pflege" },
  labor: { name: "Labor Beispielstadt GmbH", zeile: "Labor Beispielstadt GmbH · Probenweg 4 · 00007 Beispielstadt", kat: "Gesundheit & Pflege" },
  kasse: { name: "BKK Beispiel Krankenkasse", zeile: "BKK Beispiel Krankenkasse · Kassenring 9 · 00008 Beispielstadt", kat: "Gesundheit & Pflege" },
  autohaus: { name: "Autohaus Brummwerk GmbH", zeile: "Autohaus Brummwerk GmbH · Motorweg 12 · 00009 Beispielstadt", kat: "Auto & Mobilität" },
  bank: { name: "Beispielbank eG", zeile: "Beispielbank eG · Geldgasse 1 · 00010 Beispielstadt", kat: "Finanzen & Konten" },
  schule: { name: "Schule am Beispielpark", zeile: "Schule am Beispielpark · Parkstraße 20 · 00011 Beispielstadt", kat: "Familie & persönliche Dokumente" },
  fitness: { name: "Fitnesshaus Beispiel GmbH", zeile: "Fitnesshaus Beispiel GmbH · Sportplatz 7 · 00012 Beispielstadt", kat: "Verträge & Abonnements" },
  mobilfunk: { name: "Mobilfunk Beispiel GmbH", zeile: "Mobilfunk Beispiel GmbH · Funkturm 1 · 00013 Beispielstadt", kat: "Verträge & Abonnements" },
  hausverwaltung: { name: "Hausverwaltung Beispiel GmbH", zeile: "Hausverwaltung Beispiel GmbH · Mietweg 2 · 00014 Beispielstadt", kat: "Haus & Wohnung" },
  arbeitgeber: { name: "Beispiel Technik GmbH", zeile: "Beispiel Technik GmbH · Fabrikstraße 30 · 00015 Beispielstadt", kat: "Rente, Arbeit & Sozialversicherung" },
  rente: { name: "Rentenversicherung Beispiel", zeile: "Rentenversicherung Beispiel · Rentenplatz 1 · 00016 Beispielstadt", kat: "Rente, Arbeit & Sozialversicherung" },
  elektro: { name: "Elektromarkt Beispiel GmbH", zeile: "Elektromarkt Beispiel GmbH · Steckerweg 1 · 00017 Beispielstadt", kat: "Einkäufe, Rechnungen & Garantien" },
  moebel: { name: "Möbelhaus Beispiel GmbH", zeile: "Möbelhaus Beispiel GmbH · Sofaweg 5 · 00018 Beispielstadt", kat: "Einkäufe, Rechnungen & Garantien" },
  reise: { name: "Reisebüro Beispiel GmbH", zeile: "Reisebüro Beispiel GmbH · Fernweg 3 · 00019 Beispielstadt", kat: "Reisen & Freizeit" },
};
const PERSONEN = [{ anrede: "Frau", name: "Lea Beispiel" }, { anrede: "Herr", name: "Ole Beispiel" }];
const KIND = "Mattis Beispiel";
const ADRESSE = ["Musterweg 1", "00000 Beispielstadt"];

function brief({ abs, an, datum, betreff, absatz, extra = [] }) {
  const anrede = an === "familie" ? "Sehr geehrte Familie Beispiel," : an === "eltern" ? "Liebe Eltern," : an === "dh" ? "Sehr geehrte Damen und Herren," : `Sehr geehrte${an.anrede === "Herr" ? "r" : ""} ${an.anrede} ${an.name.split(" ")[1]},`;
  const feld = an === "familie" || an === "eltern" || an === "dh" ? ["Familie Beispiel"] : [an.anrede === "Herr" ? "Herrn" : "Frau", an.name];
  return [
    `# ${abs.name}`, abs.zeile, "", ...feld, ...ADRESSE, "", `Beispielstadt, ${de(datum)}`, "", ...extra, "", `# ${betreff}`, "", anrede, "", ...absatz, "", "Mit freundlichen Grüßen", abs.name,
  ];
}
const pdf = (zeilen) => textPdf([zeilen]);
const sollBrief = (art, abs, betrifft, extra = {}) => ({ schriftstueck: art, kategorie: abs.kat, absender: abs.name, betrifft, ...extra });
const wer = (an) => an === "familie" ? "Familie Beispiel" : an === "eltern" || an === "dh" ? "allgemein" : `${an.anrede} ${an.name.split(" ")[1]}`;

// ---------- Briefe als PDF ----------
let scan = 1;
const scanName = () => `scan_${String(scan++).padStart(4, "0")}.pdf`;
const monate = ["2026-01-15", "2026-02-12", "2026-03-10", "2026-04-14", "2026-05-12", "2026-06-09", "2026-07-14", "2026-08-11", "2026-09-08", "2026-10-02"];
// Stadtwerke: Abschlag-Rechnungen, eine Mahnung, Zählerstand-Aufforderung
for (const [k, d] of monate.slice(0, 6).entries()) {
  const ordner = k % 2 ? "Scanner" : "Downloads";
  ablegen(`${ordner}/${k % 2 ? scanName() : `Rechnung_${d.slice(0, 7)}.pdf`}`, pdf(brief({ abs: A.stadtwerke, an: "familie", datum: d, betreff: `Rechnung Strom ${de(d).slice(3)}`, extra: ["Kundennummer: KD-40 1187", `Rechnungsnummer: RE-2026-${380 + k}`], absatz: [`der Abschlag für Strom beträgt 84,00 €.`, `Rechnungsbetrag: 84,00 €, zahlbar bis ${de(plus(d, 14))}.`, "Wir buchen den Betrag von Ihrem Konto DE00 0000 0000 0000 0000 00 ab."] })), d,
    sollBrief("Rechnung", A.stadtwerke, "Familie Beispiel", { frist: plus(d, 14), nummer: "KD-40 1187" }));
}
ablegen(`Scanner/${scanName()}`, pdf(brief({ abs: A.stadtwerke, an: "familie", datum: "2026-11-05", betreff: "1. Mahnung", extra: ["Kundennummer: KD-40 1187", "Rechnungsnummer: RE-2026-385"], absatz: ["leider konnten wir Ihre Zahlung noch nicht feststellen.", "Bitte überweisen Sie den offenen Betrag von 84,00 € bis spätestens 19.11.2026."] })), "2026-11-05",
  sollBrief("Mahnung", A.stadtwerke, "Familie Beispiel", { frist: "2026-11-19" }));
ablegen(`Downloads/Zaehlerstand_Aufforderung.pdf`, pdf(brief({ abs: A.stadtwerke, an: PERSONEN[1], datum: "2026-11-06", betreff: "Ablesung Ihres Zählerstandes", extra: ["Kundennummer: KD-40 1187", "Zählernummer: Z-1 2345 678"], absatz: ["bitte teilen Sie uns Ihren Zählerstand bis zum 15.11.2026 mit.", "Sie können ihn online oder per Karte melden."] })), "2026-11-06",
  sollBrief("Aufforderung", A.stadtwerke, "Herr Beispiel", { frist: "2026-11-15" }));
// Versicherung
ablegen(`alt/2025/Versicherungsschein_Hausrat.pdf`, pdf(brief({ abs: A.versicherung, an: PERSONEN[0], datum: "2025-03-01", betreff: "Ihr Versicherungsschein Hausrat", extra: ["Versicherungsnummer: V-778 001"], absatz: ["anbei erhalten Sie Ihren Versicherungsschein für die Hausratversicherung.", "Der Vertrag beginnt am 01.04.2025."] })), "2025-03-01",
  sollBrief("Vertrag", A.versicherung, "Frau Beispiel"));
for (const d of ["2025-10-01", "2026-10-01"]) ablegen(`${d.startsWith("2025") ? "alt/2025" : "Scanner"}/${d.startsWith("2025") ? "Beitrag_2025.pdf" : scanName()}`, pdf(brief({ abs: A.versicherung, an: PERSONEN[0], datum: d, betreff: "Beitragsrechnung", extra: ["Versicherungsnummer: V-778 001"], absatz: [`der Jahresbeitrag beträgt 129,60 €.`, `Bitte zahlen Sie bis zum ${de(plus(d, 14))}.`] })), d,
  sollBrief("Rechnung", A.versicherung, "Frau Beispiel", { frist: plus(d, 14) }));
// Finanzamt
ablegen(`Scanner/${scanName()}`, pdf(brief({ abs: A.finanzamt, an: "familie", datum: "2026-10-08", betreff: "Bescheid für 2025 über Einkommensteuer", extra: ["Steuernummer: 12/345/67890"], absatz: ["die Steuer wird festgesetzt auf 0,00 €. Sie erhalten eine Erstattung von 412,00 €.", "Gegen diesen Bescheid kann innerhalb eines Monats nach Bekanntgabe Einspruch eingelegt werden."] })), "2026-10-08",
  sollBrief("Bescheid", A.finanzamt, "Familie Beispiel"));
ablegen(`alt/2024/Steuerbescheid_2023.pdf`, pdf(brief({ abs: A.finanzamt, an: "familie", datum: "2024-09-20", betreff: "Bescheid für 2023 über Einkommensteuer", extra: ["Steuernummer: 12/345/67890"], absatz: ["die Steuer wird festgesetzt. Erstattung 288,00 €."] })), "2024-09-20",
  sollBrief("Bescheid", A.finanzamt, "Familie Beispiel"));
// Bürgeramt
ablegen(`Durcheinander/Dokument(3).pdf`, pdf(brief({ abs: A.buergeramt, an: PERSONEN[1], datum: "2026-10-19", betreff: "Aufforderung zur Vorlage von Unterlagen", extra: ["Aktenzeichen: AZ 12-3456/26"], absatz: ["bitte reichen Sie bis 20.11.2026 eine Meldebescheinigung ein."] })), "2026-10-19",
  sollBrief("Aufforderung", A.buergeramt, "Herr Beispiel", { frist: "2026-11-20" }));
// Gesundheit
ablegen(`Downloads/Laborwerte_Oktober.pdf`, pdf(brief({ abs: A.labor, an: PERSONEN[0], datum: "2026-10-25", betreff: "Laborbefund", extra: ["Auftragsnummer: L-2026-88412", "Patientin: Lea Beispiel"], absatz: ["anbei die Laborwerte vom 23.10.2026. Alle Werte im Referenzbereich."] })), "2026-10-25",
  sollBrief("Befund", A.labor, "Frau Beispiel"));
ablegen(`Scanner/${scanName()}`, pdf(brief({ abs: A.praxis, an: PERSONEN[1], datum: "2026-09-12", betreff: "Arztbrief", absatz: ["Diagnose: Erkältung, ausgeheilt. Keine weitere Behandlung nötig."] })), "2026-09-12",
  sollBrief("Befund", A.praxis, "Herr Beispiel"));
ablegen(`Downloads/Rechnung_Zahnarzt.pdf`, pdf(brief({ abs: A.zahnarzt, an: PERSONEN[0], datum: "2026-08-20", betreff: "Rechnung Zahnreinigung", extra: ["Rechnungsnummer: ZA-2026-117"], absatz: ["für die professionelle Zahnreinigung berechnen wir 95,00 €.", "Zahlbar bis 03.09.2026."] })), "2026-08-20",
  sollBrief("Rechnung", A.zahnarzt, "Frau Beispiel", { frist: "2026-09-03" }));
ablegen(`alt/2025/Krankenkasse_Mitgliedschaft.pdf`, pdf(brief({ abs: A.kasse, an: PERSONEN[1], datum: "2025-01-10", betreff: "Bestätigung Ihrer Mitgliedschaft", extra: ["Versichertennummer: K-1234 5678"], absatz: ["wir bestätigen Ihre Mitgliedschaft in der BKK Beispiel."] })), "2025-01-10",
  sollBrief("Brief", A.kasse, "Herr Beispiel"));
// Auto
ablegen(`Downloads/Rechnung_Werkstatt.pdf`, pdf(brief({ abs: A.autohaus, an: PERSONEN[1], datum: "2026-10-16", betreff: "Rechnung Inspektion", extra: ["Rechnungsnummer: WS-2026-117", "Kennzeichen: BSP-FA 12"], absatz: ["für die Inspektion Ihres Fahrzeugs berechnen wir 312,40 €.", "Zahlbar bis 30.10.2026."] })), "2026-10-16",
  sollBrief("Rechnung", A.autohaus, "Herr Beispiel", { frist: "2026-10-30", nummer: "BSP-FA 12" }));
ablegen(`Scanner/${scanName()}`, pdf(brief({ abs: A.autohaus, an: PERSONEN[1], datum: "2026-11-02", betreff: "Erinnerung Hauptuntersuchung", extra: ["Kennzeichen: BSP-FA 12"], absatz: ["die Hauptuntersuchung für Ihr Fahrzeug ist im Dezember fällig.", "Termin am 04.12.2026 um 9 Uhr."] })), "2026-11-02",
  sollBrief("Termin", A.autohaus, "Herr Beispiel", { frist: "2026-12-04" }));
// Bank
for (const [k, d] of ["2026-08-31", "2026-09-30", "2026-10-31"].entries()) ablegen(`Downloads/Kontoauszug_${d.slice(0, 7)}.pdf`, pdf(brief({ abs: A.bank, an: "familie", datum: d, betreff: `Kontoauszug Nr. ${8 + k}/2026`, extra: ["IBAN: DE00 0000 0000 0000 0000 00"], absatz: ["Alter Kontostand 1.204,55 €", "Neuer Kontostand 1.388,10 €"] })), d,
  sollBrief("Kontoauszug", A.bank, "Familie Beispiel"));
// Schule
ablegen(`Durcheinander/Einladung_Elternabend.pdf`, pdf(brief({ abs: A.schule, an: "eltern", datum: "2026-11-04", betreff: "Einladung zum Elternabend", absatz: ["wir laden Sie herzlich zum Elternabend der Klasse 4b ein.", "Termin am 24.11.2026 um 19 Uhr in der Aula.", `Schüler: ${KIND}`] })), "2026-11-04",
  sollBrief("Termin", A.schule, KIND, { frist: "2026-11-24" }));
ablegen(`Durcheinander/Dokument(4).pdf`, pdf(brief({ abs: A.schule, an: "eltern", datum: "2026-10-01", betreff: "Informationen zum Schulhalbjahr", absatz: ["das Halbjahr beginnt mit neuen Arbeitsgemeinschaften.", `Kind: ${KIND}`] })), "2026-10-01",
  sollBrief("Brief", A.schule, KIND));
// Verträge
ablegen(`Downloads/Vertragsbestaetigung_Mobilfunk.pdf`, pdf(brief({ abs: A.mobilfunk, an: PERSONEN[0], datum: "2026-06-01", betreff: "Vertragsbestätigung", extra: ["Kundennummer: MF-221 908", "Vertragsnummer: VT-55 2211"], absatz: ["vielen Dank für Ihren Vertrag. Laufzeit 24 Monate."] })), "2026-06-01",
  sollBrief("Vertrag", A.mobilfunk, "Frau Beispiel"));
for (const d of ["2026-09-03", "2026-10-03", "2026-11-03"]) ablegen(`Scanner/${scanName()}`, pdf(brief({ abs: A.mobilfunk, an: PERSONEN[0], datum: d, betreff: "Ihre Rechnung", extra: ["Kundennummer: MF-221 908", `Rechnungsnummer: MF-${d.replace(/-/g, "")}`], absatz: ["Rechnungsbetrag: 19,99 €. Der Betrag wird abgebucht."] })), d,
  sollBrief("Rechnung", A.mobilfunk, "Frau Beispiel"));
ablegen(`Durcheinander/Kuendigung_Fitness.pdf`, pdf(brief({ abs: A.fitness, an: PERSONEN[0], datum: "2026-09-30", betreff: "Kündigungsbestätigung", extra: ["Mitgliedsnummer: M-55210"], absatz: ["wir bestätigen die Kündigung Ihrer Mitgliedschaft zum 31.12.2026."] })), "2026-09-30",
  sollBrief("Kündigung", A.fitness, "Frau Beispiel"));
// Wohnung
ablegen(`alt/2025/Nebenkostenabrechnung_2024.pdf`, pdf(brief({ abs: A.hausverwaltung, an: "familie", datum: "2025-05-15", betreff: "Nebenkostenabrechnung 2024", absatz: ["für das Jahr 2024 ergibt sich eine Nachzahlung von 143,20 €.", "Bitte zahlen Sie innerhalb von 30 Tagen."] })), "2025-05-15",
  sollBrief("Abrechnung", A.hausverwaltung, "Familie Beispiel"));
ablegen(`Scanner/${scanName()}`, pdf(brief({ abs: A.hausverwaltung, an: "familie", datum: "2026-10-20", betreff: "Einladung zur Eigentümerversammlung", absatz: ["Termin am 03.12.2026 um 18 Uhr im Gemeinschaftsraum."] })), "2026-10-20",
  sollBrief("Termin", A.hausverwaltung, "Familie Beispiel", { frist: "2026-12-03" }));
// Arbeit, Rente
for (const d of ["2026-08-28", "2026-09-28", "2026-10-28"]) ablegen(`Downloads/Gehalt_${d.slice(0, 7)}.pdf`, pdf(brief({ abs: A.arbeitgeber, an: PERSONEN[1], datum: d, betreff: `Entgeltabrechnung ${de(d).slice(3)}`, extra: ["Personalnummer: P-0815"], absatz: ["Netto 2.410,33 €"] })), d,
  sollBrief("Abrechnung", A.arbeitgeber, "Herr Beispiel"));
ablegen(`alt/2024/Renteninformation.pdf`, pdf(brief({ abs: A.rente, an: PERSONEN[0], datum: "2024-06-30", betreff: "Ihre Renteninformation", extra: ["Versicherungsnummer: 12 345678 B 999"], absatz: ["diese Information zeigt Ihre bisherigen Anwartschaften."] })), "2024-06-30",
  sollBrief("Brief", A.rente, "Frau Beispiel"));
// Einkäufe, Werbung, Reise
ablegen(`Downloads/Bestellung_4711.pdf`, pdf(brief({ abs: A.elektro, an: PERSONEN[1], datum: "2026-10-30", betreff: "Rechnung zu Ihrer Bestellung", extra: ["Bestellnummer: B-4711", "Rechnungsnummer: EM-88123"], absatz: ["Wasserkocher WK-200 29,99 €. Garantie 2 Jahre."] })), "2026-10-30",
  sollBrief("Rechnung", A.elektro, "Herr Beispiel"));
for (const [k, d] of ["2026-10-22", "2026-11-05"].entries()) ablegen(`Durcheinander/Prospekt_${k + 1}.pdf`, pdf([`# ${A.moebel.name}`, "", "# Angebot der Woche", "", "Sofas jetzt mit 20 % Rabatt – nur für kurze Zeit!", "Jetzt bestellen unter moebel-beispiel.example", `Gültig bis ${de(plus(d, 10))}`]), d,
  { schriftstueck: "Angebot/Werbung", kategorie: A.moebel.kat, absender: A.moebel.name });
ablegen(`Downloads/Reisebestaetigung.pdf`, pdf(brief({ abs: A.reise, an: "familie", datum: "2026-07-01", betreff: "Buchungsbestätigung Ihrer Reise", extra: ["Buchungsnummer: RB-2026-551"], absatz: ["Ihre Reise nach Beispielinsel vom 01.08.2026 bis 14.08.2026 ist gebucht. Flug und Hotel inklusive."] })), "2026-07-01",
  sollBrief("Brief", A.reise, "Familie Beispiel"));
// Unklare Scans (schwer: kaum Merkmale)
ablegen(`Scanner/${scanName()}`, pdf(["Notiz", "", "Ole: Reifen wechseln vor dem Winter", "Lea: Geschenk für Oma besorgen"]), "2026-10-27", { schriftstueck: "Unklar" });
ablegen(`Durcheinander/Unbenannt.pdf`, pdf(["Seite 2 von 2", "", "… und bitten um Ihr Verständnis.", "Mit freundlichen Grüßen"]), "2026-09-15", { schriftstueck: "Unklar" });

// ---------- E-Mails mit Anhängen ----------
const b64 = (u8) => Buffer.from(u8).toString("base64").replace(/.{76}/g, "$&\r\n");
function eml({ von, an = "lea.beispiel@example.org", datum, betreff, text, anhaenge = [] }) {
  const grenze = "----=_Teil_" + Math.floor(rnd() * 1e9);
  const kopf = [`From: ${von}`, `To: ${an}`, `Subject: =?UTF-8?Q?${Buffer.from(betreff).toString("binary").split("").map((c) => /[A-Za-z0-9]/.test(c) ? c : "=" + c.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0")).join("")}?=`, `Date: ${new Date(`${datum}T10:15:00Z`).toUTCString()}`, "MIME-Version: 1.0"];
  if (!anhaenge.length) return Buffer.from([...kopf, "Content-Type: text/plain; charset=utf-8", "Content-Transfer-Encoding: 8bit", "", text, ""].join("\r\n"));
  const teile = [`--${grenze}`, "Content-Type: text/plain; charset=utf-8", "Content-Transfer-Encoding: 8bit", "", text, ""];
  for (const a of anhaenge) teile.push(`--${grenze}`, `Content-Type: ${a.mime}; name="${a.name}"`, "Content-Transfer-Encoding: base64", `Content-Disposition: attachment; filename="${a.name}"`, "", b64(a.daten), "");
  teile.push(`--${grenze}--`, "");
  return Buffer.from([...kopf, `Content-Type: multipart/mixed; boundary="${grenze}"`, "", ...teile].join("\r\n"));
}
ablegen("Mail-Anhaenge/Termin_Zahnarzt.eml", eml({ von: `"${A.zahnarzt.name}" <termine@zahnarzt-beispiel.example>`, datum: "2026-11-03", betreff: "Terminbestätigung", text: `Sehr geehrte Frau Beispiel,\n\nwir bestätigen Ihren Termin am 18.11.2026 um 10:30 Uhr.\n\nIhre ${A.zahnarzt.name}` }), "2026-11-03",
  { schriftstueck: "Termin", kategorie: A.zahnarzt.kat, absender: A.zahnarzt.name, betrifft: "Frau Beispiel", frist: "2026-11-18" });
const anhangRechnung = pdf(brief({ abs: A.stadtwerke, an: "familie", datum: "2026-11-01", betreff: "Rechnung Strom 11.2026", extra: ["Kundennummer: KD-40 1187", "Rechnungsnummer: RE-2026-390"], absatz: ["Rechnungsbetrag: 84,00 €, zahlbar bis 15.11.2026."] }));
ablegen("Mail-Anhaenge/Ihre_Rechnung_November.eml", eml({ von: `"Stadtwerke Beispielstadt" <service@stadtwerke-beispiel.example>`, datum: "2026-11-01", betreff: "Ihre Rechnung November", text: "Sehr geehrte Familie Beispiel,\n\nim Anhang finden Sie Ihre Rechnung.\n\nIhre Stadtwerke", anhaenge: [{ name: "Rechnung_11-2026.pdf", mime: "application/pdf", daten: anhangRechnung }] }), "2026-11-01",
  { schriftstueck: "Rechnung", kategorie: A.stadtwerke.kat, absender: "Stadtwerke Beispielstadt", betrifft: "Familie Beispiel" });
erwartung.push({ pfad: "Eingang/Mail-Anhaenge/Ihre_Rechnung_November.eml › Rechnung_11-2026.pdf", schriftstueck: "Rechnung", kategorie: A.stadtwerke.kat, absender: A.stadtwerke.name, betrifft: "Familie Beispiel", frist: "2026-11-15" });
ablegen("Mail-Anhaenge/Fotos_vom_Schaden.eml", eml({ von: `"Ole Beispiel" <ole.beispiel@example.org>`, datum: "2026-10-12", betreff: "Fotos vom Wasserschaden für die Versicherung", text: "Hallo Lea,\n\nhier die Fotos für die Schadenmeldung an die Versicherung.\n\nOle", anhaenge: [{ name: "schaden1.jpg", mime: "image/jpeg", daten: readFileSync(join(WURZEL, "scripts/bilder/wasserschaden-kueche.jpg")) }] }), "2026-10-12",
  { kategorie: "Versicherungen", absender: "Ole Beispiel" });
ablegen("Mail-Anhaenge/Newsletter.eml", eml({ von: `"Möbelhaus Beispiel" <news@moebel-beispiel.example>`, datum: "2026-11-08", betreff: "Newsletter: Angebot der Woche", text: "Liebe Kundin, lieber Kunde,\n\nnur für kurze Zeit 20 % Rabatt auf alle Sofas." }), "2026-11-08",
  { schriftstueck: "Angebot/Werbung", absender: "Möbelhaus Beispiel" });
ablegen("Mail-Anhaenge/Laborbefund_weitergeleitet.eml", eml({ von: `"Praxis Dr. med. Anna Muster" <praxis@muster-beispiel.example>`, datum: "2026-10-26", betreff: "Ihr Laborbefund", text: "Sehr geehrte Frau Beispiel,\n\nanbei Ihr Befund.\n\nIhre Praxis", anhaenge: [{ name: "Befund.pdf", mime: "application/pdf", daten: readFileSync(join(ZIEL, "Downloads/Laborwerte_Oktober.pdf")) }] }), "2026-10-26",
  { schriftstueck: "Befund", kategorie: A.praxis.kat, absender: "Praxis Dr. med. Anna Muster", betrifft: "Frau Beispiel" });

// ---------- Word und Text ----------
function zipSpeichern(eintraege) {
  const teile = [], zentral = []; let off = 0;
  const crc = (b) => { let c, t = []; for (let n = 0; n < 256; n++) { c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } let r = 0xffffffff; for (const x of b) r = t[(r ^ x) & 0xff] ^ (r >>> 8); return (r ^ 0xffffffff) >>> 0; };
  for (const [name, inhalt] of eintraege) {
    const n = Buffer.from(name), d = Buffer.from(inhalt), c = crc(d);
    const lokal = Buffer.alloc(30); lokal.writeUInt32LE(0x04034b50, 0); lokal.writeUInt16LE(20, 4); lokal.writeUInt32LE(c, 14); lokal.writeUInt32LE(d.length, 18); lokal.writeUInt32LE(d.length, 22); lokal.writeUInt16LE(n.length, 26);
    const z = Buffer.alloc(46); z.writeUInt32LE(0x02014b50, 0); z.writeUInt16LE(20, 4); z.writeUInt16LE(20, 6); z.writeUInt32LE(c, 16); z.writeUInt32LE(d.length, 20); z.writeUInt32LE(d.length, 24); z.writeUInt16LE(n.length, 28); z.writeUInt32LE(off, 42);
    teile.push(lokal, n, d); zentral.push(z, n); off += 30 + n.length + d.length;
  }
  const zl = zentral.reduce((s, b) => s + b.length, 0);
  const ende = Buffer.alloc(22); ende.writeUInt32LE(0x06054b50, 0); ende.writeUInt16LE(eintraege.length, 8); ende.writeUInt16LE(eintraege.length, 10); ende.writeUInt32LE(zl, 12); ende.writeUInt32LE(off, 16);
  return Buffer.concat([...teile, ...zentral, ende]);
}
const docx = (zeilen) => zipSpeichern([
  ["[Content_Types].xml", `<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`],
  ["word/document.xml", `<?xml version="1.0" encoding="UTF-8"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${zeilen.map((z) => `<w:p><w:r><w:t xml:space="preserve">${z.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</w:t></w:r></w:p>`).join("")}</w:body></w:document>`],
]);
ablegen("Durcheinander/Kuendigung_Entwurf.docx", docx(["Lea Beispiel · Musterweg 1 · 00000 Beispielstadt", "", "Fitnesshaus Beispiel GmbH", "Sportplatz 7", "00012 Beispielstadt", "", "Kündigung meiner Mitgliedschaft", "Mitgliedsnummer: M-55210", "", "Sehr geehrte Damen und Herren,", "hiermit kündige ich fristgerecht zum 31.12.2026.", "Mit freundlichen Grüßen", "Lea Beispiel"]), "2026-09-25",
  { schriftstueck: "Kündigung", kategorie: "Verträge & Abonnements" });
ablegen("Durcheinander/Vollmacht_Entwurf.docx", docx(["Vollmacht", "", "Hiermit bevollmächtige ich Ole Beispiel, mich in allen Angelegenheiten gegenüber Behörden zu vertreten.", "Beispielstadt, 01.06.2026", "Lea Beispiel"]), "2026-06-01",
  { kategorie: "Erbschaft, Vollmachten & Vorsorge" });
ablegen("Notizen/Einkaufsliste.txt", Buffer.from("Einkauf Samstag\n- Milch\n- Brot\n- Batterien für Rauchmelder\n"), "2026-11-07", { schriftstueck: "Unklar" });
ablegen("Notizen/Passwoerter_NICHT_HIER.txt", Buffer.from("Dies ist eine erfundene Testdatei.\nHier stehen absichtlich keine Passwörter.\n"), "2026-11-07", { schriftstueck: "Unklar" });
ablegen("Notizen/Termine.ics", Buffer.from("BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nSUMMARY:Zahnarzt Lea\r\nDTSTART:20261118T103000\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n"), "2026-11-03", {});

// ---------- Fotos mit EXIF ----------
function foto(quelle, ziel, aufnahme, extra = {}, soll = {}) {
  const roh = readFileSync(join(WURZEL, "scripts/bilder", quelle));
  const exif = exifStueck({ aufnahme, hersteller: "Beispiel", modell: extra.modell || "Handy S21 (Beispiel)", gps: extra.gps });
  const bytes = verbinde([roh.subarray(0, 2), exif, roh.subarray(2)]);
  ablegen(ziel, bytes, aufnahme.slice(0, 10), { schriftstueck: "Foto", ...soll });
}
foto("auto-vorne.jpg", "Handy/DCIM/Camera/IMG_20261014_081233.jpg", "2026-10-14T08:12:33", { gps: { lat: 53.55, lon: 10.0 } }, { notiz: "Kennzeichen BSP-FA 12 im Bild (Texterkennung später)" });
foto("auto-parkplatz.jpg", "Handy/DCIM/Camera/IMG_20261015_174501.jpg", "2026-10-15T17:45:01");
foto("zaehler-strom.jpg", "Handy/DCIM/Camera/IMG_20261102_090010.jpg", "2026-11-02T09:00:10", {}, { notiz: "Zählerstand im Bild" });
foto("zaehler-wasser.jpg", "Handy/DCIM/Camera/IMG_20261102_090120.jpg", "2026-11-02T09:01:20");
foto("kassenbon.jpg", "Handy/WhatsApp/Media/IMG-20261030-WA0003.jpg", "2026-10-30T14:20:00", { modell: "WhatsApp" }, { notiz: "Kassenbon mit Garantie" });
foto("brief-foto.jpg", "Handy/DCIM/Camera/IMG_20261020_174501.jpg", "2026-10-20T17:45:01", {}, { notiz: "abfotografiertes Schreiben (Texterkennung später)" });
foto("urlaub-strand.jpg", "Handy/DCIM/Camera/IMG_20260805_120000.jpg", "2026-08-05T12:00:00", { gps: { lat: 54.1, lon: 7.9 } });
foto("garten-beet.jpg", "Bilder/Garten/beet_mai.jpg", "2026-05-20T16:30:00");
foto("geburtstag.jpg", "Bilder/Familie/Geburtstag_Mattis.jpg", "2026-03-14T15:00:00");
foto("wasserschaden-kueche.jpg", "Handy/DCIM/Camera/IMG_20261011_210500.jpg", "2026-10-11T21:05:00", {}, { notiz: "Schaden für die Versicherung" });
foto("typenschild-waschmaschine.jpg", "Handy/DCIM/Camera/IMG_20260901_101010.jpg", "2026-09-01T10:10:10", {}, { notiz: "Typenschild mit Seriennummer" });
// Foto ohne EXIF
ablegen("Bilder/ohne_Daten.jpg", readFileSync(join(WURZEL, "scripts/bilder/garten-beet.jpg")), "2026-06-01", { schriftstueck: "Foto" });

// ---------- Fallen: Doppelte, Auffälliges ----------
const erst = readFileSync(join(ZIEL, "Downloads/Rechnung_2026-01.pdf"));
ablegen("Durcheinander/Rechnung_2026-01 (Kopie).pdf", erst, "2026-01-20", { doppelt: true });
ablegen("Scanner/Kopie von scan_0004.pdf", readFileSync(join(ZIEL, "Scanner/scan_0004.pdf")), "2026-11-07", { doppelt: true });
ablegen("Durcheinander/Rechnung_Oktober.pdf.exe", Buffer.concat([Buffer.from("MZ"), Buffer.alloc(200)]), "2026-10-31", { auffaellig: true });
ablegen("Durcheinander/Lebenslauf.pdf", Buffer.from("Dies ist keine PDF-Datei, sondern Text mit falscher Endung.\n"), "2026-10-01", { auffaellig: true });
ablegen("Durcheinander/rechnung.js", Buffer.from("// erfundenes Skript – darf nie ausgeführt werden\nconsole.log('test');\n"), "2026-10-01", { auffaellig: true });

// ---------- weitere Altbestand-Briefe (mehr Masse, mehr Training) ----------
const alt = [
  [A.stadtwerke, "Jahresabrechnung Strom 2024", "Abrechnung", "familie", "2025-01-20"],
  [A.stadtwerke, "Jahresabrechnung Strom 2025", "Abrechnung", "familie", "2026-01-22"],
  [A.versicherung, "Schadenmeldung – Eingangsbestätigung", "Brief", PERSONEN[0], "2026-10-14"],
  [A.bank, "Änderung der Entgelte", "Brief", "familie", "2026-04-01"],
  [A.praxis, "Terminbestätigung Vorsorge", "Termin", PERSONEN[0], "2026-11-09"],
  [A.kasse, "Bescheid über Zuzahlungsbefreiung", "Bescheid", PERSONEN[1], "2026-02-02"],
  [A.arbeitgeber, "Arbeitsvertrag – Änderung", "Vertrag", PERSONEN[1], "2025-12-15"],
  [A.rente, "Bescheid über Ihre Rente", "Bescheid", PERSONEN[0], "2026-07-01"],
  [A.buergeramt, "Terminbestätigung Personalausweis", "Termin", PERSONEN[1], "2026-11-10"],
  [A.reise, "Rechnung Reise Beispielinsel", "Rechnung", "familie", "2026-07-02"],
];
for (const [k, [abs, betreff, art, an, d]] of alt.entries()) {
  const terminSatz = art === "Termin" ? [`Termin am ${de(plus(d, 12))} um 10 Uhr.`] : [];
  const rechnungsSatz = art === "Rechnung" ? [`Rechnungsbetrag: 1.240,00 €, zahlbar bis ${de(plus(d, 14))}.`] : [];
  const pfad = k % 3 === 0 ? `alt/${d.slice(0, 4)}/${betreff.replace(/[^A-Za-z0-9äöüÄÖÜß]+/g, "_")}.pdf` : `Scanner/${scanName()}`;
  ablegen(pfad, pdf(brief({ abs, an, datum: d, betreff, absatz: ["anbei erhalten Sie die gewünschten Unterlagen.", ...terminSatz, ...rechnungsSatz] })), d,
    sollBrief(art, abs, wer(an), art === "Termin" ? { frist: plus(d, 12) } : art === "Rechnung" ? { frist: plus(d, 14) } : {}));
}

// ---------- noch mehr Altbestand: gleiche Absender in vielen Jahren (zum Lernen) ----------
const mehr = [
  [A.stadtwerke, "Rechnung", "familie"], [A.versicherung, "Rechnung", PERSONEN[0]], [A.mobilfunk, "Rechnung", PERSONEN[0]], [A.bank, "Kontoauszug", "familie"],
  [A.arbeitgeber, "Abrechnung", PERSONEN[1]], [A.zahnarzt, "Rechnung", PERSONEN[0]], [A.praxis, "Termin", PERSONEN[1]], [A.hausverwaltung, "Abrechnung", "familie"],
  [A.finanzamt, "Bescheid", "familie"], [A.autohaus, "Rechnung", PERSONEN[1]], [A.kasse, "Brief", PERSONEN[0]],
];
const BETREFF = { Rechnung: "Rechnung", Kontoauszug: "Kontoauszug", Abrechnung: "Abrechnung", Termin: "Terminbestätigung", Bescheid: "Bescheid", Brief: "Information zu Ihrem Konto" };
let n = 0;
for (const jahr of ["2023", "2024"]) for (const [abs, art, an] of mehr) {
  const d = `${jahr}-${String(1 + (n % 12)).padStart(2, "0")}-${String(5 + (n % 20)).padStart(2, "0")}`; n++;
  const satz = art === "Rechnung" ? [`Rechnungsbetrag: ${(20 + n * 7.5).toFixed(2).replace(".", ",")} €, zahlbar bis ${de(plus(d, 14))}.`] : art === "Termin" ? [`Termin am ${de(plus(d, 10))} um 8:30 Uhr.`] : ["anbei die Unterlagen für Ihre Akte."];
  const name = n % 4 === 0 ? `alt/${jahr}/IMG_${jahr}${String(n).padStart(4, "0")}.pdf` : n % 4 === 1 ? `alt/${jahr}/Dokument_${n}.pdf` : n % 4 === 2 ? `alt/${jahr}/${abs.name.split(" ")[0]}_${jahr}_${n}.pdf` : `alt/${jahr}/scan ${n}.pdf`;
  ablegen(name, pdf(brief({ abs, an, datum: d, betreff: `${BETREFF[art]} ${de(d).slice(3)}`, absatz: satz })), d,
    sollBrief(art, abs, wer(an), art === "Rechnung" ? { frist: plus(d, 14) } : art === "Termin" ? { frist: plus(d, 10) } : {}));
}

// ---------- Lies-mich und Erwartung ----------
writeFileSync(join(WURZEL, "testdaten", "LIES-MICH.txt"), [
  "Erfundene Testdaten für den Datei-Organizer (Familie Beispiel, Firmen „… Beispiel“).",
  "Keine echten Personen, Firmen, Kennzeichen oder Kontonummern.",
  "Den Ordner „Eingang“ in den Datei-Organizer-Ordner legen oder in der App „Testordner laden“ wählen.",
  "ERWARTUNG.json sagt je Datei, was richtig wäre – die Probe misst daran die Trefferquote.",
  "",
].join("\n"));
const liste = [];
const lauf = (dir, rel = "") => { for (const e of readdirSync(dir, { withFileTypes: true })) { const r = rel ? `${rel}/${e.name}` : e.name; if (e.isDirectory()) lauf(join(dir, e.name), r); else liste.push(`Eingang/${r}`); } };
lauf(ZIEL);
liste.sort((a, b) => a.localeCompare(b, "de"));
writeFileSync(join(WURZEL, "testdaten", "ERWARTUNG.json"), JSON.stringify({ hinweis: "Soll-Werte für die Probe; leere Felder werden nicht gemessen.", dateien: erwartung }, null, 1));
writeFileSync(join(WURZEL, "testdaten", "dateien.json"), JSON.stringify(liste, null, 1));
console.log(`${liste.length} Dateien in testdaten/Eingang, ${erwartung.length} mit Erwartung`);
