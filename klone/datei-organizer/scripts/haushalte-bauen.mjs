// Testdaten „Haushalte“ (Klaus 12.11.2026): verschiedene erfundene Nutzer mit verschiedenen Lebensumständen in einer
// norddeutschen „Beispielstadt“ (Stadtstaat: Bezirksamt, Landesbetrieb Verkehr, Familienkasse …). Rollenmuster wie in KimHub,
// aber fest im Code: Haushalte, Absender und Schreibstile (Behörde, Firma, Praxis, Schule, Mail). Kein Netz, keine Kosten.
// ALLES ERFUNDEN: Namen, Anschriften, Nummern, Kennzeichen (BSP-…), IBANs mit Nullen. Keine echten Briefe, keine echten Personen.
// Aufruf: node scripts/haushalte-bauen.mjs [startwert]  →  testdaten-haushalte/ (Eingang/…, dateien.json, ERWARTUNG.json, HAUSHALTE.json)
// Gleicher Startwert = gleicher Stapel; neuer Startwert = neue Runde (andere Formulierungen, Daten, Beträge, Dateinamen, Stile).
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { textPdf } from "../lib/test-pdf.ts";

const START = Number(process.argv[2] || 1);
/** --chaos: ein Nutzer „neben der Spur“: abfotografierte statt gescannte Briefe, schief/unscharf/dunkel, Unsinnsnamen, Mehrfachkopien. */
const CHAOS = process.argv.includes("--chaos");
/** --komplex (Block 0, Trainings-Sitzung 14.11.2026): 26 Haushalte mit mehr Mitgliedern; Briefe gesetzt wie echte Post (scripts/setzen-komplex.py:
 *  Logo, Spalten, Tabellen, fett/dünn, Fußzeilen, Stempel) als PDF mit Textebene, PDF nur aus Seitenbildern (Texterkennung nötig), Handyfoto
 *  oder Bildschirmfoto; Scanqualität gut/mittel/schlecht. Ohne --komplex bleibt der Stapel bytegleich wie bisher (alle Zufallsaufrufe dahinter). */
const KOMPLEX = process.argv.includes("--komplex");
const AUS_NAME = process.argv.includes("--aus") ? process.argv[process.argv.indexOf("--aus") + 1] : "testdaten-haushalte";
const WURZEL = join(dirname(fileURLToPath(import.meta.url)), "..");
const AUS = join(WURZEL, AUS_NAME);
rmSync(AUS, { recursive: true, force: true });
let z = (START * 2654435761) % 2147483648 || 1;
// Befund 14.11.2026: die alte Formel rechnet über 2^53 hinaus, verliert Stellen und läuft in einen kurzen Kreis – bei 26 Haushalten
// kamen dieselben Bons byte-gleich in mehreren Haushalten vor. Mit --komplex deshalb mulberry32; ohne bleibt der alte Stapel bytegleich.
let m32 = (START * 2654435761) >>> 0;
const mulberry = () => { m32 = (m32 + 0x6d2b79f5) >>> 0; let t = m32; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const rnd = () => process.argv.includes("--komplex") ? mulberry() : (z = (z * 1103515245 + 12345) % 2147483648) / 2147483648;
const wahl = (a) => a[Math.floor(rnd() * a.length)];
const ja = (p) => rnd() < p;
const zahl = (a, b) => a + Math.floor(rnd() * (b - a + 1));
const betrag = (a, b) => (a + rnd() * (b - a)).toFixed(2).replace(".", ",");
const de = (iso) => `${iso.slice(8, 10)}.${iso.slice(5, 7)}.${iso.slice(0, 4)}`;
const MON = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const lang = (iso) => `${Number(iso.slice(8, 10))}. ${MON[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;
const plus = (iso, t) => { const d = new Date(`${iso}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + t); return d.toISOString().slice(0, 10); };
const tag = () => { const d = new Date(Date.UTC(2025, 0, 1) + Math.floor(rnd() * 680) * 86400000); return d.toISOString().slice(0, 10); };
const nr = (p, n = 6) => `${p}${Array.from({ length: n }, () => zahl(0, 9)).join("")}`;

// ---------- Kategorien (wie in der Familienakte) ----------
const K = {
  fam: "Familie & persönliche Dokumente", fin: "Finanzen & Konten", vers: "Versicherungen", steu: "Steuern & Behörden", haus: "Haus & Wohnung",
  ener: "Energie & Versorgung", kauf: "Einkäufe, Rechnungen & Garantien", ges: "Gesundheit & Pflege", arb: "Rente, Arbeit & Sozialversicherung",
  auto: "Auto & Mobilität", moto: "Motorrad", tech: "Technik, Geräte & Reparaturen", vert: "Verträge & Abonnements", erb: "Erbschaft, Vollmachten & Vorsorge",
  reis: "Reisen & Freizeit", korr: "Korrespondenz",
};

// ---------- Absender (erfunden) ----------
const S = (name, strasse, plz, kat, stil, extra = {}) => ({ name, zeile: `${name} · ${strasse} · ${plz} Beispielstadt`, kat, stil, ...extra });
const ABS = {
  bezirk: S("Bezirksamt Beispielstadt-Nord", "Amtsplatz 1", "20001", K.steu, "behoerde"),
  finanzamt: S("Finanzamt Beispielstadt-Mitte", "Steuerwall 4", "20002", K.steu, "behoerde"),
  steueramt: S("Steueramt Beispielstadt – Grundsteuer", "Kämmereistraße 2", "20003", K.steu, "behoerde"),
  lbv: S("Landesbetrieb Verkehr Beispielstadt", "Zulassungsring 9", "20004", K.auto, "behoerde"),
  familienkasse: S("Familienkasse Beispiel-Nord", "Kinderweg 3", "20005", K.fam, "behoerde"),
  jugendamt: S("Jugendamt Beispielstadt-Nord", "Amtsplatz 3", "20001", K.fam, "behoerde"),
  wohngeld: S("Wohngeldstelle Bezirksamt Beispielstadt-Nord", "Amtsplatz 5", "20001", K.haus, "behoerde"),
  jobcenter: S("Jobcenter Beispielstadt", "Arbeitsallee 12", "20006", K.arb, "behoerde"),
  agentur: S("Agentur für Arbeit Beispielstadt", "Arbeitsallee 10", "20006", K.arb, "behoerde"),
  rente: S("Rentenversicherung Beispiel-Nord", "Rentenhof 1", "20007", K.arb, "behoerde"),
  bafoeg: S("Studierendenwerk Beispielstadt – Amt für Ausbildungsförderung", "Mensaweg 2", "20008", K.fam, "behoerde"),
  rundfunk: S("Rundfunkbeitrag Beispiel-Service", "Sendeplatz 1", "20009", K.steu, "behoerde"),
  besoldung: S("Zentrum für Personaldienste Beispielstadt", "Bezügestraße 6", "20010", K.arb, "behoerde"),
  beihilfe: S("Beihilfestelle Beispielstadt", "Bezügestraße 8", "20010", K.ges, "behoerde"),
  schulbehoerde: S("Schulbehörde Beispielstadt", "Lernweg 1", "20011", K.fam, "behoerde"),
  stadtreinigung: S("Stadtreinigung Beispielstadt", "Kehrweg 5", "20012", K.haus, "firma"),
  wasser: S("Wasserwerke Beispielstadt GmbH", "Quellenstraße 1", "20013", K.ener, "firma"),
  strom: S("Nordstrom Beispiel GmbH", "Netzring 4", "20014", K.ener, "firma"),
  fernwaerme: S("Wärme Beispielstadt GmbH", "Heizwerkweg 2", "20015", K.ener, "firma"),
  kk: S("Nord-Krankenkasse Beispiel", "Gesundplatz 7", "20016", K.ges, "firma"),
  pkv: S("Hanse Private Krankenversicherung Beispiel AG", "Policenhof 3", "20017", K.ges, "firma"),
  pflegekasse: S("Pflegekasse der Nord-Krankenkasse Beispiel", "Gesundplatz 9", "20016", K.ges, "firma"),
  kfzvers: S("Elbe Kfz-Versicherung Beispiel AG", "Schadenkai 4", "20018", K.vers, "firma"),
  hausrat: S("Küsten Hausrat- und Haftpflicht Beispiel AG", "Deichweg 11", "20019", K.vers, "firma"),
  bank: S("Hafensparkasse Beispiel", "Kontorstraße 1", "20020", K.fin, "firma"),
  direktbank: S("Beispiel Direktbank AG", "Onlineweg 1", "20021", K.fin, "firma"),
  depot: S("Beispiel Broker AG", "Börsenplatz 2", "20022", K.fin, "firma"),
  vermieter: S("Wohnungsbaugenossenschaft Beispielstadt eG", "Mietshof 4", "20023", K.haus, "firma"),
  hausverw: S("Hausverwaltung Kai Beispiel GmbH", "Fleetstraße 8", "20024", K.haus, "firma"),
  mobil: S("Funkwelle Beispiel GmbH", "Antennenweg 3", "20025", K.vert, "firma"),
  internet: S("Glasfaser Nord Beispiel GmbH", "Kabelstraße 6", "20026", K.vert, "firma"),
  streaming: S("Filmabend Beispiel GmbH", "Kinoallee 1", "20027", K.vert, "mail"),
  fitness: S("Hafen-Fitness Beispiel GmbH", "Muskelkai 2", "20028", K.vert, "firma"),
  verein: S("Turnverein Beispielstadt von 1890 e. V.", "Sportplatz 1", "20029", K.reis, "schule"),
  kita: S("Kita Möwennest Beispielstadt", "Spielweg 4", "20030", K.fam, "schule"),
  grundschule: S("Grundschule am Beispielfleet", "Schulweg 2", "20031", K.fam, "schule"),
  gymnasium: S("Gymnasium Beispielstadt-Nord", "Schulweg 20", "20032", K.fam, "schule"),
  hort: S("Hort Seestern Beispielstadt", "Spielweg 8", "20030", K.fam, "schule"),
  uni: S("Universität Beispielstadt", "Campusring 1", "20033", K.arb, "behoerde"),
  kinderarzt: S("Kinderarztpraxis Dr. med. Ina Beispiel", "Pflasterweg 2", "20034", K.ges, "praxis"),
  hausarzt: S("Hausarztpraxis Dr. med. Tim Beispiel", "Pflasterweg 6", "20034", K.ges, "praxis"),
  zahnarzt: S("Zahnarztpraxis Dr. Ole Beispiel", "Lächelkai 1", "20035", K.ges, "praxis"),
  kfo: S("Kieferorthopädie Dr. Jana Beispiel", "Lächelkai 3", "20035", K.ges, "praxis"),
  klinik: S("Klinikum Beispielstadt-Nord", "Heilallee 50", "20036", K.ges, "praxis"),
  labor: S("Labor Nord Beispiel MVZ GmbH", "Probenring 2", "20037", K.ges, "praxis"),
  hoergeraet: S("Hörstudio Beispiel GmbH", "Klangweg 1", "20038", K.ges, "firma"),
  apotheke: S("Hafen-Apotheke Beispiel", "Pillenstraße 3", "20039", K.ges, "firma"),
  werkstatt: S("Kfz-Werkstatt Schrauber Beispiel GmbH", "Ölweg 7", "20040", K.auto, "firma"),
  tuv: S("Prüfstelle Fahrzeugtechnik Beispiel", "Prüfweg 2", "20041", K.auto, "firma"),
  motoversand: S("Zweirad Beispiel GmbH", "Kurvenweg 9", "20042", K.moto, "firma"),
  elektro: S("Elektronikmarkt Beispiel GmbH", "Steckerstraße 5", "20043", K.kauf, "firma"),
  moebel: S("Möbelhaus Nordlicht Beispiel GmbH", "Sofaring 2", "20044", K.kauf, "firma"),
  versand: S("Versandhandel Beispiel GmbH", "Paketweg 1", "20045", K.kauf, "mail"),
  reparatur: S("Reparaturservice Beispiel GmbH", "Lötstraße 4", "20046", K.tech, "firma"),
  reise: S("Reisebüro Kompass Beispiel GmbH", "Fernweh 2", "20047", K.reis, "firma"),
  bahn: S("Nordbahn Beispiel GmbH", "Gleisweg 1", "20048", K.reis, "mail"),
  notar: S("Notariat am Beispielhafen", "Siegelstraße 1", "20049", K.erb, "behoerde"),
  nachlass: S("Amtsgericht Beispielstadt – Nachlassgericht", "Justizplatz 1", "20050", K.erb, "behoerde"),
  inkasso: S("Inkasso Nord Beispiel GmbH", "Forderungsweg 13", "20051", K.fin, "firma"),
  steuerberater: S("Steuerberatung Hansen Beispiel", "Belegweg 2", "20052", K.steu, "firma"),
  hwk: S("Handwerkskammer Beispielstadt", "Meisterstraße 1", "20053", K.arb, "behoerde"),
  bg: S("Berufsgenossenschaft Bau Beispiel", "Gerüstweg 4", "20054", K.vers, "behoerde"),
  gewerbe: S("Steueramt Beispielstadt – Gewerbesteuer", "Kämmereistraße 4", "20003", K.steu, "behoerde"),
  verlag: S("Wissenschaftsverlag Beispiel GmbH", "Buchweg 7", "20055", K.arb, "firma"),
  konferenz: S("Tagungsbüro Beispiel GmbH", "Kongressplatz 1", "20056", K.reis, "mail"),
  arbeitgeber1: S("Logistik Nord Beispiel GmbH", "Hafenkai 20", "20057", K.arb, "firma"),
  arbeitgeber2: S("Pflegedienst Sonnenseite Beispiel gGmbH", "Pflegeweg 2", "20058", K.arb, "firma"),
  arbeitgeber3: S("Softwarehaus Beispiel GmbH", "Codeweg 1", "20059", K.arb, "firma"),
  arbeitgeber4: S("Modehaus Beispiel KG", "Einkaufsstraße 9", "20060", K.arb, "firma"),
  minijob: S("Café Möwe Beispiel", "Hafenstraße 2", "20061", K.arb, "firma"),
  arbeitgeber5: S("Hafenservice Nord Beispiel GmbH", "Kaispeicher 3", "20074", K.arb, "firma"),
  zahlungsdienst: S("Zahldienst Beispiel Europe S.A.", "Rue de l'Exemple 1", "20075", K.fin, "mail"),
  serverhaus: S("Serverhaus Nord Beispiel GmbH", "Rechenweg 1", "20076", K.vert, "firma"),
  kidienst: S("KI-Dienst Beispiel Inc.", "Model Street 5", "20077", K.vert, "mail"),
  domain: S("Domainhafen Beispiel GmbH", "Adressweg 1", "20078", K.vert, "mail"),
  boutique: S("Boutique Moderaum Beispiel", "Jungfernstieg-Beispiel 3", "20110", K.steu, "firma"),
  modaitalia: S("Moda Italia Beispiel S.r.l.", "Via Esempio 7", "20111", K.steu, "firma"),
  kosmetikgh: S("Kosmetik-Großhandel Nord Beispiel GmbH", "Puderweg 2", "20112", K.steu, "firma"),
  kartenterminal: S("Kartenzahlung Beispiel Payment GmbH", "Terminalweg 1", "20113", K.fin, "firma"),
  gewerbevermieter: S("Ladenflächen Hanse Beispiel GmbH", "Passage 1", "20114", K.haus, "firma"),
  ihk: S("Handelskammer Beispielstadt", "Börsenhof 1", "20115", K.arb, "behoerde"),
  gewerbevers: S("Betriebsversicherung Nord Beispiel AG", "Policenhof 7", "20017", K.vers, "firma"),
  werbung: S("Sozialwerbung Beispiel Ltd.", "Ad Lane 1", "20116", K.vert, "mail"),
  verpackung: S("Verpackungshandel Beispiel GmbH", "Kartonweg 4", "20117", K.kauf, "firma"),
  spendenverein: S("Familienprojekt Beispiel e. V.", "Gemeinsinnweg 1", "20079", K.steu, "firma"),
};

// ---------- Läden für Kassenbons (erfunden; stehen für Supermarkt, Discounter, Drogerie …) ----------
const LADEN = {
  supermarkt: { name: "Frischmarkt Beispiel", kat: K.kauf, buchung: "Lebensmittel", waren: [["Vollmilch 1L", 1.19], ["Bauernbrot", 3.49], ["Äpfel 1kg", 2.79], ["Butter", 2.29], ["Joghurt", 0.89], ["Kaffee 500g", 6.99], ["Nudeln", 1.29], ["Tomaten", 1.99]] },
  discounter: { name: "Discount Nord Beispiel", kat: K.kauf, buchung: "Lebensmittel", waren: [["Toast", 0.99], ["Bananen", 1.49], ["Käse Scheiben", 1.79], ["Mineralwasser 6x1,5L", 2.94], ["Pfand", 1.50], ["Eier 10 St", 2.39]] },
  drogerie: { name: "Drogerie Hafenlicht Beispiel", kat: K.kauf, buchung: "Drogerie", waren: [["Zahnpasta", 1.95], ["Shampoo", 2.45], ["Windeln Gr. 4", 9.95], ["Duschgel", 1.25]] },
  baecker: { name: "Bäckerei Krümel Beispiel", kat: K.kauf, buchung: "Lebensmittel", waren: [["Franzbrötchen", 1.60], ["Roggenbrot", 4.20], ["Kaffee to go", 2.80]] },
  baumarkt: { name: "Baumarkt Werkzeugkiste Beispiel", kat: K.haus, buchung: "Haus & Garten", waren: [["Wandfarbe weiß 10L", 39.95], ["Schrauben-Set", 7.49], ["Pinsel", 4.99], ["Blumenerde 40L", 5.99]] },
  apotheke: { name: "Hafen-Apotheke Beispiel", kat: K.ges, buchung: "Gesundheit", waren: [["Ibuprofen 400", 4.97], ["Nasenspray", 3.95], ["Zuzahlung Rezept", 5.00]] },
};
const TANKE = { name: "Tankstelle Nordstern Beispiel", kat: K.auto, buchung: "Tanken" };
const AUTOHAUS = { name: "Autohaus Nordlicht Beispiel", kat: K.auto };

// ---------- Haushalte (erfunden) ----------
const P = (vorname, name, rolle, anrede, extra = {}) => ({ vorname, name, voll: `${vorname} ${name}`, rolle, anrede, ...extra });
const HAUSHALTE = [
  { id: "familie-petersen", titel: "Familie mit drei Kindern", name: "Petersen", strasse: "Möwenstieg 4", plz: "20101",
    personen: [P("Jan", "Petersen", "Vater, Lagerlogistiker", "Herr"), P("Maren", "Petersen", "Mutter, Pflegekraft in Teilzeit", "Frau"),
      P("Finn", "Petersen", "Kind, 12, Gymnasium", "Kind"), P("Ida", "Petersen", "Kind, 8, Grundschule", "Kind"), P("Lotta", "Petersen", "Kind, 3, Kita", "Kind")],
    fahrzeuge: ["BSP-JP 210", "BSP-MP 77"], arbeitgeber: { Jan: "arbeitgeber1", Maren: "arbeitgeber2" }, wohnen: "eigentum" },
  { id: "alleinerziehend-brodersen", titel: "Alleinerziehend mit Kind", name: "Brodersen", strasse: "Lindenhof 12", plz: "20102",
    personen: [P("Sabine", "Brodersen", "Mutter, Verkäuferin", "Frau"), P("Mia", "Brodersen", "Kind, 6, Grundschule und Hort", "Kind")],
    fahrzeuge: [], arbeitgeber: { Sabine: "arbeitgeber4" }, wohnen: "miete" },
  { id: "einzelperson-clausen", titel: "Einzelperson", name: "Clausen", strasse: "Kaiweg 3", plz: "20103",
    personen: [P("Thomas", "Clausen", "Softwareentwickler", "Herr")], fahrzeuge: [], motorrad: "BSP-TC 77", arbeitgeber: { Thomas: "arbeitgeber3" }, wohnen: "miete" },
  { id: "arbeitslos-lorenzen", titel: "Arbeitslos, Bürgergeld", name: "Lorenzen", strasse: "Am Kanal 21", plz: "20104",
    personen: [P("Dirk", "Lorenzen", "arbeitsuchend, 52", "Herr")], fahrzeuge: [], arbeitgeber: {}, wohnen: "miete", buergergeld: true },
  { id: "professorin-asmussen", titel: "Professorin, verbeamtet", name: "Asmussen", strasse: "Professorenweg 9", plz: "20105",
    personen: [P("Katrin", "Asmussen", "Professorin", "Frau", { titel: "Prof. Dr." })], fahrzeuge: ["BSP-KA 1"], arbeitgeber: {}, wohnen: "eigentum", beamtin: true },
  { id: "selbststaendig-thomsen", titel: "Selbstständiger Malermeister", name: "Thomsen", strasse: "Farbenweg 5", plz: "20106",
    personen: [P("Ole", "Thomsen", "Malermeister, Einzelunternehmer", "Herr"), P("Anke", "Thomsen", "Ehefrau, Büro", "Frau")],
    fahrzeuge: ["BSP-OT 5"], arbeitgeber: {}, wohnen: "eigentum", selbststaendig: true },
  { id: "rentner-jessen", titel: "Rentnerpaar", name: "Jessen", strasse: "Rosenstieg 2", plz: "20107",
    personen: [P("Hinrich", "Jessen", "Rentner, 78", "Herr"), P("Gerda", "Jessen", "Rentnerin, 75, Pflegegrad", "Frau")],
    fahrzeuge: [], arbeitgeber: {}, wohnen: "eigentum", rente: true },
  { id: "entwickler-fleetmann", titel: "Selbstständiger App-Entwickler (wie Klaus), nebenher angestellt", name: "Fleetmann", strasse: "Elbblick 14", plz: "20109",
    personen: [P("Klaus", "Fleetmann", "App-Entwickler, Android-Nutzer, Haushaltsbuch", "Herr")], fahrzeuge: [], arbeitgeber: { Klaus: "arbeitgeber5" }, wohnen: "miete", entwickler: true },
  { id: "boutique-hafenrose", titel: "Inhaberin einer Boutique (Mode, Dessous, Parfüm, Beauty)", name: "Hafenrose", strasse: "Jungfernstieg-Beispiel 3", plz: "20110",
    personen: [P("Ali", "Hafenrose", "Inhaberin Boutique Moderaum Beispiel", "Frau"), P("Tom", "Hafenrose", "Ehemann, angestellt", "Herr")], fahrzeuge: ["BSP-AH 12"], arbeitgeber: { Tom: "arbeitgeber1" }, wohnen: "miete", boutique: true },
  { id: "studentin-ketelsen", titel: "Studentin", name: "Ketelsen", strasse: "WG Hafenblick 7", plz: "20108",
    personen: [P("Lena", "Ketelsen", "Studentin, 22", "Frau")], fahrzeuge: [], arbeitgeber: { Lena: "minijob" }, wohnen: "wg", studentin: true },
];
if (KOMPLEX) HAUSHALTE.push(
  { id: "mehrgenerationen-hansen", titel: "Mehrgenerationenhaus: Großeltern, Eltern, zwei Kinder", name: "Hansen", strasse: "Lindenallee 30", plz: "20120",
    personen: [P("Bernd", "Hansen", "Vater, Elektriker", "Herr"), P("Svenja", "Hansen", "Mutter, Erzieherin", "Frau"), P("Jonas", "Hansen", "Kind, 15, Gymnasium", "Kind"), P("Emma", "Hansen", "Kind, 7, Grundschule", "Kind"),
      P("Walter", "Hansen", "Großvater, Rentner, 81", "Herr"), P("Ilse", "Hansen", "Großmutter, 79, Pflegegrad 3", "Frau")],
    fahrzeuge: ["BSP-BH 300"], arbeitgeber: { Bernd: "arbeitgeber5", Svenja: "arbeitgeber2" }, wohnen: "eigentum", rentner: ["Walter", "Ilse"], pflege: "Ilse" },
  { id: "pflegefamilie-mommsen", titel: "Pflegefamilie mit eigenem Kind und Pflegekind", name: "Mommsen", strasse: "Kastanienweg 8", plz: "20121",
    personen: [P("Heike", "Mommsen", "Mutter, Bürokauffrau", "Frau"), P("Rolf", "Mommsen", "Vater, Busfahrer", "Herr"), P("Paula", "Mommsen", "Kind, 11, Gymnasium", "Kind"), P("Noah", "Krüger", "Pflegekind, 9, Grundschule", "Kind")],
    fahrzeuge: ["BSP-RM 44"], arbeitgeber: { Heike: "arbeitgeber4", Rolf: "arbeitgeber1" }, wohnen: "miete", pflegekind: "Noah" },
  { id: "patchwork-carstensen-wulf", titel: "Patchwork: zwei Erwachsene, Kinder aus zwei Ehen", name: "Carstensen", strasse: "Holunderweg 15", plz: "20122",
    personen: [P("Nina", "Carstensen", "Mutter, Steuerfachangestellte", "Frau"), P("Marco", "Wulf", "Partner, Koch", "Herr"), P("Leni", "Carstensen", "Kind, 13, Gymnasium", "Kind"),
      P("Tim", "Wulf", "Kind, 10, Grundschule", "Kind"), P("Ben", "Wulf", "Kind, 4, Kita", "Kind")],
    fahrzeuge: ["BSP-NC 13"], arbeitgeber: { Nina: "arbeitgeber3", Marco: "minijob" }, wohnen: "miete", patchwork: true },
  { id: "wg-hafenstrasse", titel: "Wohngemeinschaft mit vier Erwachsenen", name: "WG Hafenstraße", strasse: "Hafenstraße 101", plz: "20123",
    personen: [P("Jule", "Sievers", "Studentin, 24", "Frau"), P("Can", "Yilmaz", "Auszubildender, 20", "Herr"), P("Malte", "Brandt", "Pfleger, 29", "Herr"), P("Sophie", "Lange", "Doktorandin, 27", "Frau")],
    fahrzeuge: [], arbeitgeber: { Can: "arbeitgeber1", Malte: "arbeitgeber2", Jule: "minijob" }, wohnen: "wg", studentin: true },
  { id: "selbststaendig-physio-ahrens", titel: "Selbstständige Physiotherapeutin mit Mann und Kind", name: "Ahrens", strasse: "Brunnenstraße 2", plz: "20124",
    personen: [P("Merle", "Ahrens", "Physiotherapeutin, eigene Praxis", "Frau"), P("Lars", "Ahrens", "Ehemann, Lehrer", "Herr"), P("Fiete", "Ahrens", "Kind, 5, Kita", "Kind")],
    fahrzeuge: ["BSP-MA 22"], arbeitgeber: {}, wohnen: "eigentum", selbststaendig: true },
  { id: "taxiunternehmer-oezdemir", titel: "Selbstständiger Taxiunternehmer, Großfamilie", name: "Özdemir", strasse: "Bahnhofstraße 77", plz: "20125",
    personen: [P("Murat", "Özdemir", "Taxiunternehmer", "Herr"), P("Aylin", "Özdemir", "Ehefrau, Verkäuferin", "Frau"), P("Deniz", "Özdemir", "Kind, 17, Ausbildung", "Kind"),
      P("Elif", "Özdemir", "Kind, 14, Gymnasium", "Kind"), P("Emir", "Özdemir", "Kind, 8, Grundschule", "Kind"), P("Fatma", "Özdemir", "Großmutter, 74, Rentnerin", "Frau")],
    fahrzeuge: ["BSP-TX 1", "BSP-TX 2"], arbeitgeber: { Aylin: "arbeitgeber4" }, wohnen: "miete", selbststaendig: true, rentner: ["Fatma"] },
  { id: "alleinerziehend-vater-friedrichsen", titel: "Alleinerziehender Vater mit zwei Kindern", name: "Friedrichsen", strasse: "Uferweg 6", plz: "20126",
    personen: [P("Sven", "Friedrichsen", "Vater, Lagerist", "Herr"), P("Mila", "Friedrichsen", "Kind, 9, Grundschule", "Kind"), P("Luca", "Friedrichsen", "Kind, 12, Gymnasium", "Kind")],
    fahrzeuge: ["BSP-SF 9"], arbeitgeber: { Sven: "arbeitgeber1" }, wohnen: "miete" },
  { id: "rentnerin-allein-paulsen", titel: "Rentnerin, verwitwet, Hörgerät", name: "Paulsen", strasse: "Seniorenhof 3", plz: "20127",
    personen: [P("Edith", "Paulsen", "Rentnerin, 84, Witwe", "Frau")], fahrzeuge: [], arbeitgeber: {}, wohnen: "miete", rentner: ["Edith"] },
  { id: "paar-ohne-kinder-voss", titel: "Doppelverdiener ohne Kinder, Motorrad", name: "Voß", strasse: "Deichstraße 41", plz: "20128",
    personen: [P("Julia", "Voß", "Ingenieurin", "Frau"), P("Henrik", "Voß", "Bankkaufmann", "Herr")], fahrzeuge: ["BSP-JV 41"], motorrad: "BSP-HV 4", arbeitgeber: { Julia: "arbeitgeber3", Henrik: "arbeitgeber5" }, wohnen: "eigentum" },
  { id: "buergergeld-familie-schulz", titel: "Familie im Bürgergeld mit drei Kindern", name: "Schulz", strasse: "Am Bahndamm 9", plz: "20129",
    personen: [P("Daniel", "Schulz", "arbeitsuchend, 41", "Herr"), P("Jessica", "Schulz", "Mutter, Minijob", "Frau"), P("Kevin", "Schulz", "Kind, 16, Schule", "Kind"), P("Lea", "Schulz", "Kind, 10, Grundschule", "Kind"), P("Mats", "Schulz", "Kind, 2, Kita", "Kind")],
    fahrzeuge: [], arbeitgeber: { Jessica: "minijob" }, wohnen: "miete", buergergeld: true },
  { id: "beamtenpaar-lorenz", titel: "Beamtenpaar (Polizei, Lehrerin) mit Kind", name: "Lorenz", strasse: "Rathausweg 12", plz: "20130",
    personen: [P("Stefanie", "Lorenz", "Lehrerin, verbeamtet", "Frau", { titel: "Dr." }), P("Michael", "Lorenz", "Polizeibeamter", "Herr"), P("Hanna", "Lorenz", "Kind, 6, Grundschule", "Kind")],
    fahrzeuge: ["BSP-ML 110"], arbeitgeber: {}, wohnen: "eigentum", beamtin: true },
  { id: "student-azubi-geschwister-petersen", titel: "Geschwister in einer Wohnung (Student, Auszubildende) – gleicher Nachname wie Familie Petersen", name: "Petersen", strasse: "Studentenhof 2", plz: "20131",
    personen: [P("Ole", "Petersen", "Student, 21", "Herr"), P("Frieda", "Petersen", "Auszubildende, 19", "Frau")], fahrzeuge: [], arbeitgeber: { Frieda: "arbeitgeber4", Ole: "minijob" }, wohnen: "wg", studentin: true },
  { id: "pflegebeduerftig-mueller", titel: "Ehepaar, Mann pflegebedürftig, Frau pflegt", name: "Müller", strasse: "Gartenstadt 5", plz: "20132",
    personen: [P("Gisela", "Müller", "Rentnerin, 70, pflegende Angehörige", "Frau"), P("Horst", "Müller", "Rentner, 73, Pflegegrad 4", "Herr")], fahrzeuge: ["BSP-GM 70"], arbeitgeber: {}, wohnen: "eigentum", rentner: ["Gisela", "Horst"], pflege: "Horst" },
  { id: "landwirt-claussen", titel: "Nebenerwerbslandwirt mit Familie und Altenteiler", name: "Claußen", strasse: "Hofstelle 1", plz: "20133",
    personen: [P("Jens", "Claußen", "Landwirt im Nebenerwerb, Hausmeister", "Herr"), P("Birte", "Claußen", "Ehefrau, Bäckereifachverkäuferin", "Frau"), P("Lasse", "Claußen", "Kind, 18, Ausbildung", "Kind"),
      P("Karl", "Claußen", "Altenteiler, 80", "Herr")], fahrzeuge: ["BSP-JC 1", "BSP-BC 2"], arbeitgeber: { Jens: "arbeitgeber5", Birte: "arbeitgeber4" }, wohnen: "eigentum", rentner: ["Karl"] },
  { id: "zugezogen-nowak", titel: "Zugezogene Familie (Pflegekraft aus dem Ausland) mit Kind", name: "Nowak", strasse: "Neubauweg 20", plz: "20134",
    personen: [P("Agnieszka", "Nowak", "Pflegefachkraft", "Frau"), P("Piotr", "Nowak", "Lagerarbeiter", "Herr"), P("Zofia", "Nowak", "Kind, 4, Kita", "Kind")],
    fahrzeuge: [], arbeitgeber: { Agnieszka: "arbeitgeber2", Piotr: "arbeitgeber1" }, wohnen: "miete" },
  { id: "kuenstler-dreyer", titel: "Freischaffender Musiker, Künstlersozialkasse, Hund", name: "Dreyer", strasse: "Atelierhof 4", plz: "20135",
    personen: [P("Matthias", "Dreyer", "Musiker, freischaffend", "Herr")], fahrzeuge: ["BSP-MD 7"], arbeitgeber: {}, wohnen: "miete", entwickler: true },
);

// ---------- Schreibstile (Rollenmuster) ----------
function kopfzeilen(h, an) {
  if (an === "familie") return [`Familie ${h.name}`, h.strasse, `${h.plz} Beispielstadt`];
  if (an.anrede === "Kind") return [`An die Eltern von ${an.voll}`, h.strasse, `${h.plz} Beispielstadt`];
  return [an.anrede === "Herr" ? "Herrn" : "Frau", `${an.titel ? an.titel + " " : ""}${an.voll}`, h.strasse, `${h.plz} Beispielstadt`];
}
function anredeSatz(h, an, stil) {
  if (an === "familie") return wahl([`Sehr geehrte Familie ${h.name},`, `Liebe Familie ${h.name},`]);
  if (an.anrede === "Kind") return stil === "schule" ? "Liebe Eltern," : "Sehr geehrte Damen und Herren,";
  const t = an.titel ? `${an.titel.replace("Prof. Dr.", "Professorin")} ` : "";
  if (stil === "schule" || stil === "mail") return wahl([`Liebe${an.anrede === "Herr" ? "r" : ""} ${an.anrede} ${an.name},`, `Hallo ${an.vorname} ${an.name},`, `Sehr geehrte${an.anrede === "Herr" ? "r" : ""} ${an.anrede} ${an.name},`]);
  return an.titel ? `Sehr geehrte Frau ${t}${an.name},`.replace("Frau Professorin", "Frau Professorin") : `Sehr geehrte${an.anrede === "Herr" ? "r" : ""} ${an.anrede} ${an.name},`;
}
/** Ein Brief in einem von mehreren Layouts. nummern = [["Kundennummer", "KD-1"], …] */
function brief({ h, abs, an, datum, betreff, absatz, nummern = [], schluss, rolleZeile }) {
  const stil = abs.stil;
  const datumText = ja(0.5) ? de(datum) : lang(datum);
  const datumZeile = wahl([`Beispielstadt, ${datumText}`, `Datum: ${datumText}`, `Beispielstadt, den ${datumText}`]);
  const nr = nummern.map(([k, v]) => `${k}: ${v}`);
  const betr = stil === "behoerde" && ja(0.5) ? betreff : wahl([betreff, `Betreff: ${betreff}`, betreff]);
  const gruss = stil === "schule" ? wahl(["Herzliche Grüße", "Viele Grüße"]) : wahl(["Mit freundlichen Grüßen", "Freundliche Grüße", "Mit freundlichem Gruß"]);
  const rueck = ja(stil === "behoerde" ? 0.9 : 0.6) ? [abs.zeile] : [];
  const kopf = ja(0.85) ? [`# ${abs.name}`] : [];
  const fuss = stil === "firma" ? [wahl([`${abs.name} · Sitz Beispielstadt · Amtsgericht Beispielstadt HRB ${zahl(10000, 99999)}`, `${abs.name} · Bankverbindung: IBAN DE00 0000 0000 0000 0000 00`, ""])]
    : stil === "behoerde" ? [wahl(["Rechtsbehelfsbelehrung: Gegen diesen Bescheid kann innerhalb eines Monats nach Bekanntgabe Widerspruch erhoben werden.", "Dieses Schreiben wurde maschinell erstellt und ist ohne Unterschrift gültig.", ""])] : [""];
  const vorn = stil === "behoerde" && ja(0.5) ? [...nr, datumZeile] : [datumZeile, ...nr];
  if (KOMPLEX) {
    // Komplexer Satz: Hinweisblock in Spalten, Bankverbindung im Fuß, Unterschrift, manchmal Eingangsstempel oder zweite Seite
    const hinweise = stil === "behoerde" ? ["## Rechtsbehelfsbelehrung", "Gegen diesen Bescheid kann innerhalb eines Monats nach Bekanntgabe schriftlich Widerspruch erhoben werden.", "## Datenschutz", "Informationen zur Verarbeitung Ihrer Daten finden Sie unter beispiel.invalid/datenschutz.", "## Sprechzeiten", "Mo–Fr 8–12 Uhr, Do 14–18 Uhr, Termine nach Vereinbarung."]
      : ["## Ihr Kundenservice", "Montag bis Freitag 8 bis 20 Uhr erreichbar, Samstag 9 bis 14 Uhr.", "## Widerruf und Datenschutz", "Hinweise zum Widerruf und zur Datenverarbeitung finden Sie in unseren Geschäftsbedingungen.", "## Online-Konto", "Rechnungen und Verträge auch im Kundenportal."];
    const fussK = [`@fuss ${abs.name} · ${abs.zeile.split(" · ").slice(1).join(", ")} · Telefon 0400 ${zahl(100000, 999999)}`, `@fuss Bankverbindung: Hafensparkasse Beispiel · IBAN DE00 0000 0000 0000 0000 00 · BIC BSPXDEXX`, ...(stil === "firma" ? [`@fuss Amtsgericht Beispielstadt HRB ${zahl(10000, 99999)} · Geschäftsführung: ${wahl(["K. Beispiel", "M. Muster", "A. Probe"])}`] : [])];
    const mitte = ja(0.45) ? ["", `@spalten ${wahl([2, 2, 3])}`, ...hinweise, "@ende"] : [];
    const umbruch = ja(0.15) ? ["@seite", "## Anlage", "Diese Seite enthält die allgemeinen Hinweise zu Ihrem Schreiben.", ...hinweise.filter((x) => !x.startsWith("##"))] : [];
    return [...kopf, ...rueck, "", ...kopfzeilen(h, an), "", ...vorn, ...(rolleZeile ? [rolleZeile] : []), "", `# ${betr}`, "", anredeSatz(h, an, stil), "", ...absatz, ...mitte, "", schluss || gruss, ...(ja(0.6) ? ["@unterschrift"] : []), abs.name, "", ...umbruch, ...fussK];
  }
  return [...kopf, ...rueck, "", ...kopfzeilen(h, an), "", ...vorn, ...(rolleZeile ? [rolleZeile] : []), "", `# ${betr}`, "", anredeSatz(h, an, stil), "", ...absatz, "", schluss || gruss, abs.name, "", ...fuss];
}
function mail({ h, abs, an, datum, betreff, absatz }) {
  const adr = `${an.vorname?.toLowerCase() || h.name.toLowerCase()}.${h.name.toLowerCase()}@beispiel.invalid`;
  const von = `${abs.name} <service@${abs.name.toLowerCase().replace(/[^a-z]/g, "").slice(0, 16)}.beispiel.invalid>`;
  const text = [anredeSatz(h, an, "mail"), "", ...absatz, "", "Viele Grüße", abs.name].join("\r\n");
  return [`From: ${von}`, `To: ${adr}`, `Subject: ${betreff}`, `Date: ${new Date(`${datum}T10:00:00Z`).toUTCString()}`, "MIME-Version: 1.0", "Content-Type: text/plain; charset=utf-8", "Content-Transfer-Encoding: 8bit", "", text, ""].join("\r\n");
}

// ---------- Ablage mit unordentlichen Dateinamen ----------
const dateien = [], erwartung = [];
let zaehler = 1;
const UNSINN = () => wahl(["neu", "asdf", "Unbenannt", "Dokument", "scan", "Bild", "xx", "WhatsApp Image 2026-0" + zahl(1, 9) + "-" + zahl(10, 28) + " at 1" + zahl(0, 9) + "." + zahl(10, 59) + ".22", "rechnung.pdf", "Kopie von Kopie"]);
const kopien = [];
const setzAuftrag = [], quelltext = {};
const klarText = (zeilen) => zeilen.filter((z) => !/^@(spalten|ende|seite|unterschrift)/.test(z)).map((z) => z.replace(/^@(fuss|stempel)\s*/, "").replace(/^#+\s*/, "").replace(/^\|(.*)\|$/, (m, x) => x.split("|").map((c) => c.trim()).join(" "))).join("\n");
const ohneAuszeichnung = (zeilen) => zeilen.filter((z) => !/^@(spalten|ende|seite|unterschrift)/.test(z)).map((z) => z.replace(/^@(fuss|stempel)\s*/, "").replace(/^\|(.*)\|$/, (m, x) => x.split("|").map((c) => c.trim()).join("   ")));
function komplexAblegen(h, inhalt, soll, sprechend) {
  const x = rnd(), form = x < 0.3 ? "pdf-text" : x < 0.72 ? "pdf-scan" : x < 0.88 ? "foto" : "einfach";
  const q = rnd(), qualitaet = form === "pdf-scan" || form === "foto" ? (q < 0.35 ? "gut" : q < 0.75 ? "mittel" : "schlecht") : null;
  const n = zaehler++;
  const ordner = form === "foto" ? wahl(["Handy/DCIM/Camera", "Handy/WhatsApp/Media"]) : wahl(["Scanner", "Scanner", "Downloads", "Durcheinander", "alt"]);
  const name = form === "foto" ? `IMG_2026${String(1000 + n).slice(-4)}_${zahl(100000, 235959)}.jpg` : form === "pdf-scan" && ja(0.6) ? `scan_${String(n).padStart(4, "0")}.pdf`
    : `${(sprechend || "Dokument").replace(/[^\wäöüÄÖÜß-]+/g, "_")}_${n}.pdf`;
  const pfad = `Eingang/${h.id}/${ordner}/${name}`, voll = join(AUS, pfad);
  mkdirSync(dirname(voll), { recursive: true });
  if (form === "einfach") writeFileSync(voll, textPdf([ohneAuszeichnung(inhalt)]));
  else setzAuftrag.push({ ziel: voll, zeilen: inhalt, form, qualitaet, saat: `${START}:${pfad}`, art: /^Kontoauszug|Buchungstag/m.test(inhalt.join("\n")) ? "bank" : "brief" });
  quelltext[pfad] = klarText(inhalt);
  dateien.push(pfad);
  erwartung.push({ pfad, haushalt: h.id, ...soll, form, ...(qualitaet ? { qualitaet } : {}) });
}
function ablegen(h, art, inhalt, soll, sprechend) {
  if (KOMPLEX && art === "pdf") return komplexAblegen(h, inhalt, soll, sprechend);
  if (KOMPLEX && art === "eml" && ja(0.15)) {  // Bildschirmfoto der Mail statt der Mail selbst
    const n = zaehler++, pfad = `Eingang/${h.id}/Handy/Screenshots/Screenshot_2026${String(100 + n).slice(-3)}_${zahl(100000, 235959)}.png`;
    const text = inhalt.split("\r\n\r\n").slice(1).join("\n").replace(/\r/g, ""), betreff = (inhalt.match(/^Subject: (.*)$/m) || [])[1] || "", von = (inhalt.match(/^From: (.*)$/m) || [])[1] || "";
    const zeilen = [`# ${betreff}`, `Von: ${von.replace(/ <.*>/, "")}`, "", ...text.split("\n")];
    mkdirSync(dirname(join(AUS, pfad)), { recursive: true });
    setzAuftrag.push({ ziel: join(AUS, pfad), zeilen, form: "bildschirm", saat: `${START}:${pfad}` });
    quelltext[pfad] = klarText(zeilen); dateien.push(pfad); erwartung.push({ pfad, haushalt: h.id, ...soll, form: "bildschirm" });
    return;
  }
  if (CHAOS && art === "pdf" && ja(0.45)) { bildAblegen(h, "blatt", inhalt, soll, wahl([-9, -6, -4, 4, 6, 9]), true); return; }
  if (CHAOS && ja(0.5)) sprechend = `${UNSINN()}${ja(0.3) ? ` (${zahl(1, 9)})` : ""}`;
  const ordner = wahl(["Scanner", "Scanner", "Downloads", "Handy", "Durcheinander", "alt"]);
  const n = zaehler++;
  const name = art === "eml" ? `${sprechend || "Mail"}_${n}.eml`
    : ja(0.35) ? `scan_${String(n).padStart(4, "0")}.pdf` : ja(0.15) ? `IMG_${2025 + (n % 2)}${String(1000 + n).slice(1)}.pdf` : ja(0.1) ? `Dokument (${n}).pdf`
    : ja(0.08) ? `${wahl(["Rechnung", "Brief", "Wichtig", "Post"])}_${n}.pdf` : `${(sprechend || "Dokument").replace(/[^\wäöüÄÖÜß-]+/g, "_")}_${n}.pdf`;
  const pfad = `Eingang/${h.id}/${ordner}/${name}`;
  const voll = join(AUS, pfad);
  mkdirSync(dirname(voll), { recursive: true });
  writeFileSync(voll, art === "eml" ? inhalt : textPdf([inhalt]));
  dateien.push(pfad);
  erwartung.push({ pfad, haushalt: h.id, ...soll });
  if (CHAOS && ja(0.15)) kopien.push({ von: pfad, h, soll });
}
const wer = (h, an) => an === "familie" ? `Familie ${h.name}` : an.anrede === "Kind" ? an.voll : `${an.anrede} ${an.name}`;
const sollFuer = (h, abs, an, art, extra = {}) => ({ schriftstueck: art, kategorie: extra.kategorie || abs.kat, absender: abs.name, betrifft: wer(h, an), person: an === "familie" ? `Familie ${h.name}` : an.voll, ...extra });

// ---------- Bilder: Belege und Fotos (Inhalt erst per Texterkennung lesbar) ----------
const bildAuftrag = [];
function bildAblegen(h, art, zeilen, soll, drehung = 0, abfotografiert = false, klein = false) {
  const n = zaehler++;
  const ordner = wahl(["Handy/DCIM/Camera", "Handy/DCIM/Camera", "Handy/WhatsApp/Media", "Scanner"]);
  const name = ordner === "Scanner" ? `scan_${String(n).padStart(4, "0")}.jpg` : ordner.includes("WhatsApp") ? `IMG-2026${String(100 + n).slice(-3)}-WA00${zahl(10, 99)}.jpg` : `IMG_2026${String(1000 + n).slice(-4)}_${zahl(100000, 235959)}.jpg`;
  const pfad = `Eingang/${h.id}/${ordner}/${name}`;
  mkdirSync(dirname(join(AUS, pfad)), { recursive: true });
  const wild = CHAOS || abfotografiert;
  bildAuftrag.push({ datei: pfad, ziel: join(AUS, pfad), art, zeilen, drehung: wild ? drehung + (ja(0.5) ? zahl(-3, 3) : 0) : drehung, rauschen: wild ? (ja(0.6) ? 0.8 + rnd() * 0.7 : 0.4) : ja(0.4) ? 0.6 : 0, hell: wild ? (ja(0.4) ? 0.62 + rnd() * 0.15 : 0) : ja(0.3) ? 0.85 : 0, tisch: [zahl(80, 160), zahl(80, 140), zahl(70, 120)], ...(klein ? { klein: true } : {}) });
  dateien.push(pfad);
  erwartung.push({ pfad, haushalt: h.id, ...soll, ...(abfotografiert ? { abfotografiert: true } : {}) });
  if (CHAOS && ja(0.15)) kopien.push({ von: pfad, h, soll });
}
// Großeinkauf (Klaus 14.11.: „die langen Bons … hunderte Euro … sehr schlecht zu lesen, weil sie klein sind“): 40–120 Posten,
// kleine Schrift, Pfand, Rabatte, Zwischensumme, Steuertabelle. App-Bons (eBon aus der Supermarkt-App) als PDF oder Bildschirmfoto.
const MEHR_WAREN = [["Hähnchenbrust 1kg", 8.99], ["Rinderhack 500g", 4.99], ["Lachsfilet", 6.49], ["Gurke", 0.69], ["Paprika rot", 0.99], ["Kartoffeln 2,5kg", 2.99], ["Zwiebeln 1kg", 1.29],
  ["Orangensaft 1L", 1.89], ["Cola 1,5L", 1.39], ["Bier Kasten 20x0,5", 15.99], ["Pfand Kasten", 3.10], ["Pfand Flasche", 0.25], ["Spülmittel", 1.45], ["Waschmittel 20WL", 5.95], ["Toilettenpapier 8er", 3.79],
  ["Müsli 750g", 2.99], ["Haferflocken", 0.89], ["Reis 1kg", 1.99], ["Olivenöl 0,75L", 7.99], ["Mehl 1kg", 0.79], ["Zucker 1kg", 0.99], ["Schokolade", 1.29], ["Chips", 1.69], ["Pizza TK", 2.49],
  ["Gemüsemischung TK", 1.99], ["Katzenfutter 12x100g", 4.29], ["Blumenstrauß", 5.99], ["Batterien AA 8er", 4.99], ["Rabatt Aktion", -1.00], ["Coupon 10 %", -2.50]];
function langerBon(h, laden, an) {
  const d = tag(), uhr = `${zahl(8, 20)}:${String(zahl(0, 59)).padStart(2, "0")}`;
  const posten = Array.from({ length: zahl(40, 120) }, () => wahl(rnd() < 0.3 ? laden.waren : MEHR_WAREN));
  const cent = posten.reduce((a, [, p]) => a + Math.round(p * 100), 0), summe = (cent / 100).toFixed(2).replace(".", ",");
  const zw = Math.floor(posten.length / 2), f = (p) => p.toFixed(2).replace(".", ",");
  const zeilen = [`# ${laden.name.toUpperCase()}`, `${wahl(["Hafenstraße", "Marktplatz", "Nordring"])} ${zahl(1, 80)}, 201${zahl(10, 99)} Beispielstadt`, `Filiale ${zahl(100, 999)}  Kasse ${zahl(1, 12)}`, "",
    ...posten.slice(0, zw).map(([w, p]) => `${w.padEnd(24)}${f(p).padStart(7)} ${p < 0 ? "" : wahl(["A", "B"])}`), `ZWISCHENSUMME${f(posten.slice(0, zw).reduce((a, [, p]) => a + p, 0)).padStart(18)}`,
    ...posten.slice(zw).map(([w, p]) => `${w.padEnd(24)}${f(p).padStart(7)} ${p < 0 ? "" : wahl(["A", "B"])}`), "-".repeat(33), `SUMME EUR${summe.padStart(22)}`, `${posten.length} Artikel`,
    wahl(["Kartenzahlung girocard", "Kreditkarte kontaktlos", "Bar gegeben"]), "", "Steuer   Netto     MwSt    Brutto", `A 19%  ${f(cent / 100 * 0.3 / 1.19).padStart(8)} ${f(cent / 100 * 0.3 * 0.19 / 1.19).padStart(7)} ${f(cent / 100 * 0.3).padStart(8)}`,
    `B  7%  ${f(cent / 100 * 0.7 / 1.07).padStart(8)} ${f(cent / 100 * 0.7 * 0.07 / 1.07).padStart(7)} ${f(cent / 100 * 0.7).padStart(8)}`, "", `${de(d)}  ${uhr}   Bon-Nr ${zahl(1000, 9999)}`, "Vielen Dank für Ihren Einkauf!"];
  bildAblegen(h, "kassenbon", zeilen, { schriftstueck: "Kassenbon", kategorie: laden.kat, absender: laden.name, betrag: summe, datum: d, buchung: laden.buchung, fotografiert: an.voll, langerBon: true }, wahl([0, -1, 1, -3]), false, true);
}
function appBon(h, laden, an) {
  const d = tag(), posten = Array.from({ length: zahl(3, 30) }, () => wahl(rnd() < 0.4 ? laden.waren : MEHR_WAREN));
  const cent = posten.reduce((a, [, p]) => a + Math.round(p * 100), 0), summe = (cent / 100).toFixed(2).replace(".", ","), f = (p) => p.toFixed(2).replace(".", ",") + " €";
  const app = `${laden.name.split(" ")[0]}-App`;
  const zeilen = [`# ${laden.name}`, `Digitaler Kassenbon · ${app}`, "", `Datum: ${de(d)}`, `Uhrzeit: ${zahl(8, 20)}:${String(zahl(0, 59)).padStart(2, "0")}`, `Bon-Nr.: ${nr("", 6)}`, `Kundenkarte: ${nr("**** ", 4)}`, "",
    "|Artikel|Menge|Preis|", ...posten.map(([w, p]) => `|${w}|1|${f(p)}|`), `||Summe|${f(cent / 100)}|`, "", `Gesamtbetrag: ${summe} EUR`, `Bezahlt mit ${wahl(["App-Pay", "girocard", "Kreditkarte"])}`, `Gesammelte Punkte: ${zahl(5, 300)}`, "",
    `@fuss ${laden.name} · Beispielstadt · Dieser Bon wurde digital über die ${app} ausgestellt.`];
  const n = zaehler++, bild = ja(0.45);
  const pfad = bild ? `Eingang/${h.id}/Handy/Screenshots/Screenshot_eBon_${String(100 + n).slice(-3)}.png` : `Eingang/${h.id}/Downloads/eBon_${laden.name.split(" ")[0]}_${d.replaceAll("-", "")}_${n}.pdf`;
  mkdirSync(dirname(join(AUS, pfad)), { recursive: true });
  setzAuftrag.push({ ziel: join(AUS, pfad), zeilen, form: bild ? "bildschirm" : "pdf-text", saat: `${START}:${pfad}` });
  quelltext[pfad] = klarText(zeilen); dateien.push(pfad);
  erwartung.push({ pfad, haushalt: h.id, schriftstueck: "Kassenbon", kategorie: laden.kat, absender: laden.name, betrag: summe, datum: d, buchung: laden.buchung, form: bild ? "bildschirm" : "pdf-text", appBon: true });
}
function kassenbon(h, laden, an) {
  const d = tag(), uhr = `${zahl(8, 20)}:${String(zahl(0, 59)).padStart(2, "0")}`;
  const posten = Array.from({ length: zahl(2, 6) }, () => wahl(laden.waren));
  const summe = posten.reduce((a, [, p]) => a + p, 0).toFixed(2).replace(".", ",");
  const zeilen = [`# ${laden.name.toUpperCase()}`, `${wahl(["Hafenstraße", "Marktplatz", "Nordring"])} ${zahl(1, 80)}, 201${zahl(10, 99)} Beispielstadt`, "", ...posten.map(([w, p]) => `${w.padEnd(24)}${p.toFixed(2).replace(".", ",").padStart(7)}`), "-".repeat(31), `SUMME EUR${summe.padStart(22)}`, wahl(["Kartenzahlung", "Bar gegeben", "EC-Karte kontaktlos"]), `MwSt 7% ${(Number(summe.replace(",", ".")) * 0.065).toFixed(2).replace(".", ",")}`, "", `${de(d)}  ${uhr}   Bon-Nr ${zahl(1000, 9999)}`, "Vielen Dank für Ihren Einkauf!"];
  bildAblegen(h, "kassenbon", zeilen, { schriftstueck: "Kassenbon", kategorie: laden.kat, absender: laden.name, betrag: summe, datum: d, buchung: laden.buchung, fotografiert: an.voll }, wahl([0, 0, -2, 2, -4]));
}
function tankquittung(h, kz, an) {
  const d = tag(), liter = 20 + rnd() * 35, preis = 1.65 + rnd() * 0.25, summe = (liter * preis).toFixed(2).replace(".", ",");
  const zeilen = [`# ${TANKE.name.toUpperCase()}`, `Elbchaussee ${zahl(1, 200)}, 20199 Beispielstadt`, "", `Säule ${zahl(1, 8)}  ${wahl(["Super E10", "Super E5", "Diesel"])}`, `${liter.toFixed(2).replace(".", ",")} l x ${preis.toFixed(3).replace(".", ",")} EUR/l`, "-".repeat(31), `SUMME EUR${summe.padStart(22)}`, wahl(["Kartenzahlung", "EC-Karte"]), ja(0.6) ? `Kennzeichen: ${kz}` : "", "", `${de(d)}  ${zahl(6, 22)}:${String(zahl(0, 59)).padStart(2, "0")}   Beleg-Nr ${zahl(10000, 99999)}`];
  bildAblegen(h, "kassenbon", zeilen, { schriftstueck: "Kassenbon", kategorie: TANKE.kat, absender: TANKE.name, betrag: summe, datum: d, buchung: TANKE.buchung, fotografiert: an.voll }, wahl([0, -3, 3]));
}
function autohausFoto(h, an) {
  const preis = zahl(9, 39) * 1000 + 990, rate = zahl(149, 459);
  bildAblegen(h, "schild", [`# ${AUTOHAUS.name}`, `# Angebot: ${wahl(["Kompaktwagen", "Kombi", "Familienvan", "Elektro-Kleinwagen"])}`, `Erstzulassung ${zahl(1, 12)}/${zahl(2019, 2024)}`, `Kilometerstand ${zahl(8, 120)}.000 km`, `Preis ${preis.toLocaleString("de-DE")},- EUR`, `Finanzierung ab ${rate} EUR mtl.`, "Jetzt Probefahrt vereinbaren"],
    { schriftstueck: "Angebot/Werbung", kategorie: AUTOHAUS.kat, absender: AUTOHAUS.name, betrag: `${preis}`, rate: `${rate}`, fotografiert: an.voll, notiz: "Foto zum Vergleich mit dem Haushaltsbuch" }, wahl([0, -5, 5]));
}
function plakatFoto(h) {
  const t = tag();
  bildAblegen(h, "schild", ["# Hafenfest Beispielstadt", `# ${lang(t)}`, "Musik · Essen · Kinderprogramm", "Eintritt frei", "Landungsbrücken Beispiel"], { schriftstueck: "Termin", kategorie: K.reis, frist: t }, wahl([0, -4]));
}
function landschaftFoto(h) { bildAblegen(h, "landschaft", [], { schriftstueck: "Foto", kategorie: "Fotos" }); }

// ---------- Vorlagen ----------
function postenTabelle(was, b) {
  // Rechnungsposten als Tabelle (nur --komplex): netto, MwSt, Summe passen zum Betrag
  const brutto = Number(b.replace(",", ".")), netto = brutto / 1.19, teil = Math.round(netto * (0.55 + rnd() * 0.3) * 100) / 100;
  const f = (x) => x.toFixed(2).replace(".", ",") + " €";
  return ["", "|Pos.|Beschreibung|Menge|Betrag|", `|1|${was}|1|${f(teil)}|`, `|2|${wahl(["Grundgebühr", "Servicepauschale", "Material", "Arbeitszeit"])}|1|${f(netto - teil)}|`, `|||Summe netto|${f(netto)}|`, `|||MwSt 19 %|${f(brutto - netto)}|`, `|||Rechnungsbetrag|${f(brutto)}|`, ""];
}
function rechnung(h, abs, an, was, sprechend, nummern = [["Kundennummer", nr("KD-", 7)]], kat) {
  const d = tag(), frist = plus(d, 14), b = betrag(12, 480);
  ablegen(h, "pdf", brief({ h, abs, an, datum: d, betreff: `Ihre Rechnung ${was}`, nummern: [...nummern, ["Rechnungsnummer", nr("RE-2026-", 5)]],
    absatz: [`für ${was} stellen wir Ihnen ${b} € in Rechnung.`, ...(KOMPLEX ? postenTabelle(was, b) : []), `Bitte überweisen Sie den Betrag bis zum ${de(frist)}.`, "Vielen Dank für Ihr Vertrauen."] }), sollFuer(h, abs, an, "Rechnung", { frist, ...(kat ? { kategorie: kat } : {}) }), sprechend);
}
function mahnung(h, abs, an) {
  const d = tag(), frist = plus(d, 10);
  ablegen(h, "pdf", brief({ h, abs, an, datum: d, betreff: wahl(["1. Mahnung", "Zahlungserinnerung", "2. Mahnung – offener Betrag"]), nummern: [["Kundennummer", nr("KD-", 7)]],
    absatz: ["leider konnten wir zu unserer Rechnung noch keinen Zahlungseingang feststellen.", `Bitte überweisen Sie den offenen Betrag von ${betrag(20, 300)} € bis spätestens ${de(frist)}.`] }), sollFuer(h, abs, an, "Mahnung", { frist }), "Mahnung");
}
function bescheid(h, abs, an, thema, absatz, sprechend, extra = {}) {
  const d = tag();
  const frist = extra.frist;
  ablegen(h, "pdf", brief({ h, abs, an, datum: d, betreff: `Bescheid über ${thema}`, nummern: [["Aktenzeichen", nr(`${abs.name.slice(0, 2).toUpperCase()}-`, 6)]], absatz: absatz(d) }),
    sollFuer(h, abs, an, "Bescheid", { ...(frist ? { frist: frist(d) } : {}), ...(extra.kategorie ? { kategorie: extra.kategorie } : {}) }), sprechend);
}
function termin(h, abs, an, was, sprechend, rolle) {
  const d = tag(), t = plus(d, zahl(7, 30));
  ablegen(h, "pdf", brief({ h, abs, an, datum: d, betreff: wahl([`Einladung: ${was}`, `Terminbestätigung ${was}`, `Ihr Termin: ${was}`]), rolleZeile: rolle,
    absatz: [`wir laden Sie zu ${was} ein.`, `Ihr Termin am ${de(t)} um ${zahl(8, 17)}:${wahl(["00", "30"])} Uhr.`, "Bitte bringen Sie Ihre Unterlagen mit."] }), sollFuer(h, abs, an, "Termin", { frist: t }), sprechend);
}
function aufforderung(h, abs, an, was, sprechend) {
  const d = tag(), frist = plus(d, 21);
  ablegen(h, "pdf", brief({ h, abs, an, datum: d, betreff: wahl([`Bitte um Unterlagen: ${was}`, `Mitwirkung: ${was}`, `Fehlende Angaben – ${was}`]), nummern: [["Aktenzeichen", nr("AZ-", 6)]],
    absatz: [`bitte reichen Sie uns ${was} bis zum ${de(frist)} ein.`, "Ohne diese Angaben können wir Ihren Antrag nicht weiter bearbeiten."] }), sollFuer(h, abs, an, "Aufforderung", { frist }), sprechend);
}
function vertrag(h, abs, an, was, sprechend) {
  const d = tag();
  ablegen(h, "pdf", brief({ h, abs, an, datum: d, betreff: wahl([`Ihr Vertrag: ${was}`, `Vertragsbestätigung ${was}`, `Versicherungsschein ${was}`]).replace("Versicherungsschein", abs.kat === K.vers || abs.kat === K.ges ? "Versicherungsschein" : "Vertragsbestätigung"),
    nummern: [["Vertragsnummer", nr("V-", 8)]], absatz: [`hiermit bestätigen wir Ihren Vertrag über ${was} ab dem ${de(d)}.`, "Die Vertragsunterlagen und die Bedingungen liegen bei."] }), sollFuer(h, abs, an, "Vertrag"), sprechend);
}
function kuendigung(h, abs, an, was) {
  const d = tag();
  ablegen(h, "pdf", brief({ h, abs, an, datum: d, betreff: `Kündigungsbestätigung ${was}`, nummern: [["Kundennummer", nr("KD-", 7)]],
    absatz: [`wir bestätigen die Kündigung Ihres Vertrags über ${was} zum ${de(plus(d, 60))}.`, "Schade, dass Sie uns verlassen."] }), sollFuer(h, abs, an, "Kündigung"), "Kuendigung");
}
function abrechnung(h, abs, an, was, sprechend) {
  const d = tag();
  ablegen(h, "pdf", brief({ h, abs, an, datum: d, betreff: `${was}abrechnung ${Number(d.slice(0, 4)) - 1}`, nummern: [["Kundennummer", nr("KD-", 7)]],
    absatz: [`anbei erhalten Sie die ${was}abrechnung für das Jahr ${Number(d.slice(0, 4)) - 1}.`, wahl([`Es ergibt sich ein Guthaben von ${betrag(5, 300)} €.`, `Es ergibt sich eine Nachzahlung von ${betrag(5, 300)} €.`])] }), sollFuer(h, abs, an, "Abrechnung"), sprechend);
}
function befund(h, abs, an, was) {
  const d = tag();
  ablegen(h, "pdf", brief({ h, abs, an: an.anrede === "Kind" ? an : an, datum: d, betreff: wahl([`Befundbericht ${was}`, `Arztbrief ${was}`, `Laborbefund vom ${de(d)}`]),
    rolleZeile: `Patient${an.anrede === "Frau" ? "in" : ""}: ${an.voll}, geb. ${zahl(1, 28)}.${zahl(1, 12)}.${zahl(1945, 2023)}`,
    absatz: [`wir berichten über die Untersuchung (${was}).`, "Die Werte liegen im Normbereich. Eine Kontrolle wird in sechs Monaten empfohlen."] }), { ...sollFuer(h, abs, an, "Befund"), betrifft: an.voll }, "Befund");
}
function kontoauszug(h, abs, an) {
  const d = tag();
  ablegen(h, "pdf", [`# ${abs.name}`, "", ...kopfzeilen(h, an), "", `Kontoauszug Nr. ${zahl(1, 12)}/${d.slice(0, 4)}`, `IBAN DE00 0000 0000 ${zahl(1000, 9999)} 0000 00`, `Datum: ${de(d)}`, "",
    "Buchungstag  Verwendungszweck  Betrag", `${de(plus(d, -20))}  Lastschrift ${wahl(["Nordstrom", "Funkwelle", "Miete"])}  -${betrag(20, 900)}`, `${de(plus(d, -10))}  Gutschrift  +${betrag(100, 3000)}`,
    ...(KOMPLEX ? Array.from({ length: zahl(4, 14) }, (_, i) => `${de(plus(d, -19 + i))}  ${wahl(["Kartenzahlung Supermarkt", "Lastschrift Versicherung", "Dauerauftrag Sparen", "Überweisung Verein", "Bargeldauszahlung", "Lastschrift Rundfunkbeitrag"])}  -${betrag(5, 300)}`) : []),
    "", `Neuer Saldo: ${betrag(100, 9000)} EUR`],
  sollFuer(h, abs, an, "Kontoauszug"), "Kontoauszug");
}
function werbung(h, abs) {
  ablegen(h, "pdf", [`# ${abs.name}`, "", `# Angebot der Woche`, "", "Nur für kurze Zeit: 20 % Rabatt auf alles!", `Gültig bis ${de(plus(tag(), 7))}.`, "Jetzt bestellen und sparen."],
    { schriftstueck: "Angebot/Werbung", kategorie: abs.kat, absender: abs.name }, "Prospekt");
}
function mailVon(h, abs, an, betreff, absatz, art, extra = {}) {
  const d = tag();
  ablegen(h, "eml", mail({ h, abs, an, datum: d, betreff, absatz }), { ...sollFuer(h, abs, an, art, extra) }, betreff.split(" ")[0]);
}

// ---------- Lebensereignisse (Krankheit, Kinder, Arbeit, Familie, Wohnen, Geld …) ----------
const ABS2 = {
  versorgungsamt: S("Versorgungsamt Beispielstadt", "Amtsplatz 7", "20001", K.ges, "behoerde"),
  elterngeld: S("Elterngeldstelle Bezirksamt Beispielstadt-Nord", "Amtsplatz 9", "20001", K.fam, "behoerde"),
  standesamt: S("Standesamt Beispielstadt-Nord", "Rathausmarkt 2", "20062", K.fam, "behoerde"),
  meldeamt: S("Kundenzentrum Bezirksamt Beispielstadt-Nord", "Amtsplatz 2", "20001", K.fam, "behoerde"),
  familiengericht: S("Amtsgericht Beispielstadt – Familiengericht", "Justizplatz 1", "20050", K.fam, "behoerde"),
  hundesteuer: S("Steueramt Beispielstadt – Hundesteuer", "Kämmereistraße 6", "20003", K.steu, "behoerde"),
  tierarzt: S("Tierarztpraxis Pfote Beispiel", "Wiesenweg 3", "20063", K.reis, "praxis"),
  kleingarten: S("Kleingartenverein Sonnenblick Beispiel e. V.", "Parzellenweg 1", "20064", "Garten & Grundstück", "schule"),
  optiker: S("Optik Klarblick Beispiel", "Brillenweg 2", "20065", K.ges, "firma"),
  physio: S("Physiotherapie Bewegung Beispiel", "Rückenweg 4", "20066", K.ges, "praxis"),
  psycho: S("Psychotherapeutische Praxis Dipl.-Psych. Ruth Beispiel", "Ruheweg 1", "20067", K.ges, "praxis"),
  kur: S("Kurklinik Ostseeblick Beispiel", "Strandweg 9", "20068", K.ges, "praxis"),
  lebensvers: S("Hanse Lebensversicherung Beispiel AG", "Policenhof 5", "20017", K.vers, "firma"),
  rechtsschutz: S("Nord Rechtsschutz Beispiel AG", "Paragraphenweg 1", "20069", K.vers, "firma"),
  bauspar: S("Bausparkasse Leuchtturm Beispiel AG", "Ziegelweg 3", "20070", K.fin, "firma"),
  auskunftei: S("Auskunftei Nord Beispiel GmbH", "Datenweg 1", "20071", K.fin, "firma"),
  gewerkschaft: S("Gewerkschaft Arbeit Nord Beispiel", "Solidaritätsweg 1", "20072", K.arb, "firma"),
  spende: S("Seenotretter Beispiel e. V.", "Rettungskai 1", "20073", K.steu, "firma"),
  nachlassgericht: ABS.nachlass, notar: ABS.notar,
};
/** Briefe aus dem Arbeitgeber / der Krankenkasse für eine bestimmte Person */
function einfach(h, abs, an, art, betreff, absatz, sprechend, extra = {}) {
  const d = tag();
  const frist = extra.fristTage ? plus(d, extra.fristTage) : undefined;
  ablegen(h, "pdf", brief({ h, abs, an, datum: d, betreff, nummern: extra.nummern || [], rolleZeile: extra.rolle, absatz: absatz(d, frist) }),
    { ...sollFuer(h, abs, an, art, { ...(frist ? { frist } : {}), ...(extra.kategorie ? { kategorie: extra.kategorie } : {}) }), ...(extra.betrifft ? { betrifft: extra.betrifft } : {}) }, sprechend);
}
const EREIGNISSE = [
  // Gesundheit und Arbeit
  { wer: "erwachsen", f: (h, p) => einfach(h, ABS.hausarzt, p, "Bescheinigung", "Arbeitsunfähigkeitsbescheinigung", (d) => [`${p.voll} ist vom ${de(d)} bis ${de(plus(d, zahl(3, 14)))} arbeitsunfähig.`, "Die Bescheinigung wurde elektronisch an die Krankenkasse übermittelt."], "AU", { rolle: `Patient${p.anrede === "Frau" ? "in" : ""}: ${p.voll}`, betrifft: p.voll }) },
  { wer: "angestellt", f: (h, p) => einfach(h, ABS.kk, p, "Bescheid", "Krankengeld – Bewilligung", (d) => [`ab dem ${de(d)} zahlen wir Ihnen Krankengeld.`, `Kalendertägliches Krankengeld: ${betrag(40, 95)} €.`], "Krankengeld", { nummern: [["Versichertennummer", `A${zahl(100000000, 999999999)}`]] }) },
  { wer: "angestellt", f: (h, p) => einfach(h, ABS[h.arbeitgeber[p.vorname]], p, "Brief", "Ihr Antrag auf Teilzeit aus gesundheitlichen Gründen", (d) => [`Ihrem Antrag auf Verringerung der Arbeitszeit auf ${zahl(20, 30)} Wochenstunden ab ${de(plus(d, 30))} stimmen wir zu.`, "Grund laut Antrag: gesundheitliche Einschränkungen nach ärztlichem Attest."], "Teilzeit", { kategorie: K.arb }) },
  { wer: "angestellt-kind", f: (h, p) => einfach(h, ABS[h.arbeitgeber[p.vorname]], p, "Brief", "Teilzeit wegen Kinderbetreuung", (d) => ["wir bestätigen die Reduzierung Ihrer Arbeitszeit wegen der Betreuung Ihres Kindes.", `Neue Arbeitszeit ab ${de(plus(d, 14))}: ${zahl(15, 30)} Stunden pro Woche.`], "Teilzeit", { kategorie: K.arb }) },
  { wer: "angestellt", f: (h, p) => einfach(h, ABS.rente, p, "Bescheid", "Bescheid über Leistungen zur medizinischen Rehabilitation", (d) => ["Ihrem Antrag auf eine stationäre Rehabilitation wird entsprochen.", `Die Maßnahme beginnt voraussichtlich am ${de(plus(d, 40))} in der Kurklinik Ostseeblick Beispiel.`], "Reha", { kategorie: K.ges }) },
  { wer: "erwachsen", f: (h, p) => einfach(h, ABS2.versorgungsamt, p, "Bescheid", "Feststellung nach dem Schwerbehindertenrecht", () => [`bei Ihnen wird ein Grad der Behinderung von ${wahl([30, 40, 50, 60])} festgestellt.`, "Ein Ausweis wird bei einem GdB ab 50 ausgestellt."], "GdB") },
  { wer: "erwachsen", f: (h, p) => einfach(h, ABS2.physio, p, "Rechnung", "Rechnung Krankengymnastik (6 Behandlungen)", (d, f) => [`für die verordnete Krankengymnastik berechnen wir die gesetzliche Zuzahlung von ${betrag(20, 45)} €.`, `Zahlbar bis ${de(f)}.`], "Physio", { fristTage: 14, rolle: `Patient${p.anrede === "Frau" ? "in" : ""}: ${p.voll}` }) },
  { wer: "erwachsen", f: (h, p) => einfach(h, ABS2.psycho, p, "Brief", "Bewilligung der Kurzzeittherapie", () => ["die Krankenkasse hat 12 Sitzungen Kurzzeittherapie bewilligt.", "Die nächsten Termine vereinbaren wir telefonisch."], "Therapie", { rolle: `Patient${p.anrede === "Frau" ? "in" : ""}: ${p.voll}`, kategorie: K.ges }) },
  { wer: "erwachsen", f: (h, p) => einfach(h, ABS.zahnarzt, p, "Brief", "Heil- und Kostenplan Zahnersatz", () => ["anbei der Heil- und Kostenplan für eine Krone.", `Voraussichtlicher Eigenanteil: ${betrag(300, 1200)} €. Bitte reichen Sie den Plan bei Ihrer Krankenkasse ein.`], "HKP", { kategorie: K.ges }) },
  { wer: "erwachsen", f: (h, p) => einfach(h, ABS2.optiker, p, "Rechnung", "Rechnung Gleitsichtbrille", (d, f) => [`Gleitsichtbrille: ${betrag(250, 900)} €.`, `Zahlbar bis ${de(f)}.`], "Brille", { fristTage: 14 }) },
  { wer: "mutter-kind", f: (h, p) => einfach(h, ABS.kk, p, "Bescheid", "Bewilligung einer Mutter-Kind-Kur", (d) => ["die Mutter-Kind-Maßnahme in der Kurklinik Ostseeblick Beispiel wird bewilligt.", `Beginn: ${de(plus(d, 60))}, Dauer drei Wochen.`], "Kur", { kategorie: K.ges }) },
  // Familie
  { wer: "eltern", f: (h, p) => einfach(h, ABS2.elterngeld, p, "Bescheid", "Bescheid über Elterngeld", () => [`Ihnen wird Basiselterngeld in Höhe von ${betrag(300, 1800)} € monatlich bewilligt.`, "Bezugszeitraum: 12 Lebensmonate."], "Elterngeld") },
  { wer: "erwachsen", f: (h, p) => einfach(h, ABS2.meldeamt, p, "Bescheinigung", "Meldebescheinigung", () => [`hiermit wird bescheinigt, dass ${p.voll} unter der Anschrift ${h.strasse}, ${h.plz} Beispielstadt gemeldet ist.`], "Meldebescheinigung", { kategorie: K.fam }) },
  { wer: "erwachsen", f: (h, p) => einfach(h, ABS2.meldeamt, p, "Termin", "Ihr Personalausweis liegt zur Abholung bereit", (d, f) => ["Ihr neuer Personalausweis kann abgeholt werden.", `Bitte holen Sie ihn bis zum ${de(f)} ab.`], "Ausweis", { fristTage: 90, kategorie: K.fam }) },
  { wer: "paar", f: (h, p) => einfach(h, ABS2.standesamt, p, "Bescheinigung", "Ausfertigung der Eheurkunde", () => ["anbei erhalten Sie die beantragte Ausfertigung der Eheurkunde.", "Gebühr: 12,00 €."], "Eheurkunde") },
  { wer: "alleinerziehend", f: (h, p) => einfach(h, ABS2.familiengericht, p, "Brief", "Beschluss zum Umgangsrecht", () => ["in der Familiensache wird folgender Umgang geregelt.", "Der Beschluss ist sofort wirksam."], "Familiengericht", { nummern: [["Geschäftszeichen", `F ${zahl(100, 999)}/26`]] }) },
  // Tiere, Garten, Freizeit
  { wer: "erwachsen", f: (h, p) => { einfach(h, ABS2.hundesteuer, p, "Bescheid", "Bescheid über Hundesteuer", () => ["für Ihren Hund wird Hundesteuer festgesetzt.", `Jahresbetrag: ${betrag(90, 120)} €.`], "Hundesteuer"); einfach(h, ABS2.tierarzt, p, "Rechnung", "Rechnung Impfung Hund „Bello“", (d, f) => [`Impfung und Untersuchung: ${betrag(40, 160)} €.`, `Zahlbar bis ${de(f)}.`], "Tierarzt", { fristTage: 14 }); } },
  { wer: "erwachsen", f: (h, p) => einfach(h, ABS2.kleingarten, p, "Rechnung", "Pacht und Umlagen Parzelle 17", (d, f) => [`Jahrespacht und Wassergeld: ${betrag(180, 420)} €.`, `Bitte überweisen bis ${de(f)}.`], "Garten", { fristTage: 30 }) },
  // Geld und Vorsorge
  { wer: "erwachsen", f: (h, p) => einfach(h, ABS2.lebensvers, p, "Brief", "Standmitteilung Ihrer Lebensversicherung", () => [`Rückkaufswert zum 31.12.: ${betrag(2000, 40000)} €.`, "Ihre Beiträge werden unverändert fortgeführt."], "Lebensversicherung") },
  { wer: "erwachsen", f: (h, p) => einfach(h, ABS2.bauspar, p, "Kontoauszug", "Jahreskontoauszug Bausparvertrag", () => [`Kontoauszug Ihres Bausparvertrags zum 31.12.`, `Guthaben: ${betrag(1000, 25000)} €.`], "Bausparen") },
  { wer: "erwachsen", f: (h, p) => einfach(h, ABS2.auskunftei, p, "Brief", "Ihre Datenkopie nach Art. 15 DSGVO", () => ["anbei erhalten Sie die bei uns gespeicherten Daten.", "Ihr Basisscore ist unverändert."], "Datenkopie") },
  { wer: "erwachsen", f: (h, p) => einfach(h, ABS2.spende, p, "Bescheinigung", "Zuwendungsbestätigung für Spenden", () => [`Bestätigung über Geldzuwendungen in Höhe von ${betrag(20, 300)} €.`, "Zur Vorlage beim Finanzamt."], "Spende") },
  { wer: "erwachsen", f: (h, p) => einfach(h, ABS2.rechtsschutz, p, "Brief", "Deckungszusage Rechtsschutz", () => ["für Ihre Angelegenheit erteilen wir Deckungszusage.", "Die Selbstbeteiligung beträgt 150 €."], "Rechtsschutz") },
  { wer: "angestellt", f: (h, p) => einfach(h, ABS2.gewerkschaft, p, "Rechnung", "Beitragsrechnung Mitgliedschaft", (d, f) => [`Ihr Mitgliedsbeitrag beträgt ${betrag(10, 40)} € monatlich.`, `Bitte begleichen bis ${de(f)}.`], "Gewerkschaft", { fristTage: 14 }) },
  // Erbe
  { wer: "erwachsen", f: (h, p) => einfach(h, ABS.nachlass, p, "Brief", "Eröffnung eines Testaments", () => ["in der Nachlasssache wurde ein Testament eröffnet.", "Eine Abschrift liegt diesem Schreiben bei."], "Nachlass", { nummern: [["Aktenzeichen", `VI ${zahl(100, 999)}/26`]] }) },
  // Auto
  { wer: "auto", f: (h, p) => einfach(h, ABS.kfzvers, p, "Brief", `Schadenmeldung Fahrzeug ${h.fahrzeuge[0]}`, () => [`wir haben Ihre Schadenmeldung zum Fahrzeug ${h.fahrzeuge[0]} erhalten.`, "Ein Gutachter wird sich bei Ihnen melden."], "Schaden", { kategorie: K.vers, nummern: [["Schadennummer", nr("S-", 7)]] }) },
];
function passt(h, wer) {
  const erw = h.personen.filter((x) => x.anrede !== "Kind");
  const kinder = h.personen.some((x) => x.anrede === "Kind");
  const ang = erw.filter((x) => h.arbeitgeber[x.vorname]);
  const kandidaten = { erwachsen: erw, angestellt: ang, "angestellt-kind": kinder ? ang : [], "mutter-kind": kinder ? erw.filter((x) => x.anrede === "Frau") : [],
    eltern: kinder ? erw : [], paar: erw.length > 1 ? erw : [], alleinerziehend: h.id.startsWith("allein") ? erw : [], auto: h.fahrzeuge.length ? erw : [] }[wer] || [];
  return kandidaten;
}

// ---------- Gehaltsabrechnungen (vereinfachte Sätze, erfunden) ----------
const KONF = ["ev", "rk", "--", "--"];
function gehaltsStamm(h, p, ag) {
  const kinder = h.personen.filter((x) => x.anrede === "Kind").length;
  return {
    personalNr: String(zahl(1000, 99999)).padStart(5, "0"), eintritt: `01.${String(zahl(1, 12)).padStart(2, "0")}.${zahl(2005, 2023)}`,
    steuerId: `${zahl(10, 99)} ${zahl(100, 999)} ${zahl(100, 999)} ${zahl(100, 999)}`, svNr: `${zahl(10, 65)} ${String(zahl(10101, 311299)).padStart(6, "0")} ${p.name[0]} ${String(zahl(0, 999)).padStart(3, "0")}`,
    stkl: h.personen.filter((x) => x.anrede !== "Kind").length > 1 ? wahl([3, 4, 5]) : kinder ? 2 : 1, kfb: kinder ? (kinder * 0.5 * (h.personen.length > 2 ? 2 : 1)).toFixed(1).replace(".", ",") : "0,0",
    konf: wahl(KONF), kk: wahl([ABS.kk.name, "BKK Hafen Beispiel", "Ersatzkasse Nord Beispiel"]), grund: ag === ABS.minijob ? 556 : zahl(18, 62) * 100, teilzeit: ja(0.25),
    iban: `DE00 0000 0000 ${zahl(1000, 9999)} ${zahl(1000, 9999)} 00`,
  };
}
const eur = (x) => x.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
function gehaltsabrechnung(h, p, ag, st, jahr, monat) {
  const minijob = ag === ABS.minijob;
  const posten = [["1000", minijob ? "Aushilfslohn" : "Gehalt", st.grund * (st.teilzeit ? 0.75 : 1)]];
  if (!minijob) {
    if (ja(0.3)) posten.push(["1200", "Provision", zahl(50, 900)]);
    if (ja(0.3)) posten.push(["1300", wahl(["Nachtzuschlag stfr.", "Sonntagszuschlag stfr.", "Überstunden 25 %"]), zahl(40, 400)]);
    if (ja(0.4)) posten.push(["1400", "VWL-Zuschuss AG", 40]);
    if (ja(0.3)) posten.push(["1500", "Fahrtkostenzuschuss pausch.", zahl(30, 120)]);
    if (monat === 6 && ja(0.6)) posten.push(["1600", "Urlaubsgeld", zahl(300, 1500)]);
    if (monat === 11 && ja(0.7)) posten.push(["1700", "Weihnachtsgeld", zahl(500, 3000)]);
    if (ja(0.15)) posten.push(["1800", "Sachbezug Gutschein", 50]);
  }
  const brutto = posten.reduce((a, x) => a + x[2], 0);
  const lst = minijob ? 0 : Math.max(0, (brutto - [0, 1250, 1450, 2550, 1250, 0, 0][st.stkl]) * [0, 0.19, 0.17, 0.12, 0.19, 0.27, 0.3][st.stkl]);
  const kist = st.konf === "--" ? 0 : lst * 0.09;
  const kv = minijob ? 0 : brutto * 0.0875, rv = minijob ? brutto * 0.036 : brutto * 0.093, av = minijob ? 0 : brutto * 0.013, pv = minijob ? 0 : brutto * (h.personen.some((x) => x.anrede === "Kind") ? 0.017 : 0.023);
  const netto = brutto - lst - kist - kv - rv - av - pv;
  const vwl = posten.some((x) => x[0] === "1400") ? 40 : 0;
  const auszahlung = netto - vwl;
  const zr = `${String(monat).padStart(2, "0")}.${jahr}`;
  const mon = MON[monat - 1];
  const layoutA = ja(0.6);
  const kopf = layoutA
    ? [`# ${ag.name}`, `# Abrechnung der Brutto/Netto-Bezüge für ${mon} ${jahr}`, `Personal-Nr. ${st.personalNr}   Eintritt ${st.eintritt}   Abrechnungszeitraum ${zr}`, "", ...kopfzeilen(h, p), "",
      `Steuer-ID ${st.steuerId}   St.Kl. ${st.stkl}   Kinderfreibetrag ${st.kfb}   Konfession ${st.konf}`, `SV-Nummer ${st.svNr}   Krankenkasse ${st.kk}`, "", "Lohnart  Bezeichnung                      Betrag"]
    : [`# Gehaltsabrechnung ${mon} ${jahr}`, ag.zeile, "", ...kopfzeilen(h, p), "", `Personalnummer: ${st.personalNr}`, `Steuerliche Identifikationsnummer: ${st.steuerId}`, `Steuerklasse: ${st.stkl}`, `Sozialversicherungsnummer: ${st.svNr}`, `Krankenkasse: ${st.kk}`, "", "Bezüge"];
  const zeilen = [...kopf, ...posten.map(([nrr, b, x]) => layoutA ? `${nrr}     ${b.padEnd(30)} ${eur(x).padStart(10)}` : `${b}: ${eur(x)} EUR`),
    layoutA ? `Gesamt-Brutto ${eur(brutto).padStart(33)}` : `Bruttolohn gesamt: ${eur(brutto)} EUR`, "", layoutA ? "Steuer- und Sozialversicherungsabzüge" : "Abzüge",
    `Lohnsteuer ${eur(lst).padStart(30)}`, `Solidaritätszuschlag ${eur(0).padStart(20)}`, `Kirchensteuer ${eur(kist).padStart(27)}`,
    `Krankenversicherung ${eur(kv).padStart(21)}`, `Rentenversicherung ${eur(rv).padStart(22)}`, `Arbeitslosenversicherung ${eur(av).padStart(16)}`, `Pflegeversicherung ${eur(pv).padStart(22)}`, "",
    layoutA ? `Nettobezüge ${eur(netto).padStart(30)}` : `Nettolohn: ${eur(netto)} EUR`, ...(vwl ? [`VWL-Überweisung ${eur(vwl).padStart(26)}`] : []),
    layoutA ? `Auszahlungsbetrag ${eur(auszahlung).padStart(24)}` : `Auszahlung: ${eur(auszahlung)} EUR`, `Überweisung an ${st.iban}`];
  const soll = { schriftstueck: "Abrechnung", kategorie: K.arb, absender: ag.name, betrifft: `${p.anrede} ${p.name}`, person: p.voll,
    gehalt: { zeitraum: `${jahr}-${String(monat).padStart(2, "0")}`, brutto: eur(brutto), netto: eur(netto), auszahlung: eur(auszahlung), lohnsteuer: eur(lst), steuerklasse: String(st.stkl), steuerId: st.steuerId.replace(/\s/g, ""), svNummer: st.svNr.replace(/\s/g, ""), krankenkasse: st.kk } };
  if (ja(0.2)) bildAblegen(h, "blatt", zeilen, soll, wahl([0, -1, 1]));
  else ablegen(h, "pdf", zeilen, soll, `Gehalt_${jahr}_${String(monat).padStart(2, "0")}`);
}
function lohnsteuerbescheinigung(h, p, ag, st) {
  const jahr = 2025, brutto = st.grund * 12 * (st.teilzeit ? 0.75 : 1), lst = brutto * 0.12;
  ablegen(h, "pdf", [`# Ausdruck der elektronischen Lohnsteuerbescheinigung für ${jahr}`, `Arbeitgeber: ${ag.name}`, "", ...kopfzeilen(h, p), "", `Identifikationsnummer: ${st.steuerId}`, `Personalnummer: ${st.personalNr}`, `Steuerklasse ${st.stkl}`, "",
    `3. Bruttoarbeitslohn ${eur(brutto)}`, `4. Einbehaltene Lohnsteuer ${eur(lst)}`, `5. Einbehaltener Solidaritätszuschlag 0,00`, `22. Arbeitgeberanteil zur gesetzlichen Rentenversicherung ${eur(brutto * 0.093)}`, `23. Arbeitnehmeranteil zur gesetzlichen Rentenversicherung ${eur(brutto * 0.093)}`, "",
    "Diese Bescheinigung wurde dem Finanzamt elektronisch übermittelt."],
  { schriftstueck: "Bescheinigung", kategorie: K.steu, absender: ag.name, betrifft: `${p.anrede} ${p.name}`, person: p.voll }, "Lohnsteuerbescheinigung");
}
function svMeldung(h, p, ag, st) {
  ablegen(h, "pdf", [`# Meldebescheinigung zur Sozialversicherung`, ag.zeile, "", ...kopfzeilen(h, p), "", `Versicherungsnummer: ${st.svNr}`, `Krankenkasse: ${st.kk}`, "Grund der Abgabe: 50 Jahresmeldung", `Beschäftigungszeit: 01.01.2025 – 31.12.2025`, `Beitragspflichtiges Bruttoarbeitsentgelt: ${eur(st.grund * 12)} EUR`],
    { schriftstueck: "Bescheinigung", kategorie: K.arb, absender: ag.name, betrifft: `${p.anrede} ${p.name}`, person: p.voll }, "SV_Meldung");
}
function renteninformation(h, p, st) {
  const d = tag();
  ablegen(h, "pdf", brief({ h, abs: ABS.rente, an: p, datum: d, betreff: "Ihre Renteninformation", nummern: [["Versicherungsnummer", st.svNr]],
    absatz: [`Ihre bisher erreichte Rentenanwartschaft entspräche einer monatlichen Rente von ${betrag(300, 1400)} €.`, `Ihre Regelaltersrente können Sie ab dem ${de(plus(d, zahl(3000, 9000)))} erhalten.`, `Höhe der künftigen Regelaltersrente bei gleichbleibenden Beiträgen: ${betrag(900, 2400)} €.`] }),
    sollFuer(h, ABS.rente, p, "Brief"), "Renteninformation");
}
function jahresabschluss(h, p) {
  const ein = zahl(30000, 140000), aus = zahl(10000, 60000);
  ablegen(h, "pdf", brief({ h, abs: ABS.steuerberater, an: p, datum: tag(), betreff: `Jahresabschluss 2025 – Einnahmenüberschussrechnung`, nummern: [["Mandantennummer", nr("M-", 5)]],
    absatz: [`Betriebseinnahmen: ${eur(ein)} €`, `Betriebsausgaben: ${eur(aus)} €`, `Gewinn: ${eur(ein - aus)} €`, "Die Anlage EÜR wurde elektronisch an das Finanzamt übermittelt."] }),
    sollFuer(h, ABS.steuerberater, p, "Abrechnung", { kategorie: K.steu }), "Jahresabschluss");
}
function schenkung(h, p) {
  const b = zahl(2, 60) * 1000;
  ablegen(h, "pdf", brief({ h, abs: ABS.notar, an: p, datum: tag(), betreff: "Schenkungsvertrag – Ausfertigung", nummern: [["Urkundenrolle", nr("UR ", 4)]], absatz: [`anbei die Ausfertigung des Schenkungsvertrags über einen Geldbetrag von ${eur(b)} €.`, "Die Schenkung wird dem Finanzamt angezeigt."] }),
    sollFuer(h, ABS.notar, p, "Vertrag", { kategorie: K.erb }), "Schenkung");
  ablegen(h, "pdf", brief({ h, abs: ABS.finanzamt, an: p, datum: tag(), betreff: "Schenkungsteuer – Anforderung einer Steuererklärung", nummern: [["Steuernummer", `${zahl(10, 99)}/${zahl(100, 999)}/${zahl(10000, 99999)}`]], absatz: ["uns wurde eine Schenkung angezeigt.", `Bitte reichen Sie die Schenkungsteuererklärung bis zum ${de(plus(tag(), 30))} ein.`] }),
    sollFuer(h, ABS.finanzamt, p, "Aufforderung", { kategorie: K.steu }), "Schenkungsteuer");
}
function versicherungsleistung(h, p) {
  const abs = wahl([ABS.hausrat, ABS.kfzvers, ABS2.lebensvers]);
  const b = betrag(150, 9000);
  ablegen(h, "pdf", brief({ h, abs, an: p, datum: tag(), betreff: wahl(["Leistungsabrechnung zu Ihrem Schaden", "Regulierung Ihres Schadens", "Auszahlung der Versicherungsleistung"]), nummern: [["Schadennummer", nr("S-", 7)]],
    absatz: [`wir zahlen Ihnen ${b} € aus.`, `Die Überweisung erfolgt auf Ihr Konto DE00 0000 0000 0000 0000 00.`] }), sollFuer(h, abs, p, "Abrechnung", { kategorie: K.vers }), "Versicherung_Auszahlung");
}
function entwicklerPost(h, p) {
  for (let i = 0; i < zahl(3, 6); i++) mailVon(h, ABS.zahlungsdienst, p, "Sie haben eine Spende erhalten", [`über Ihre App „Familienakte Beispiel“ ist eine Spende eingegangen: ${betrag(2, 50)} €.`, "Der Betrag wird Ihrem Guthaben gutgeschrieben."], "Brief", { kategorie: K.fin });
  for (let i = 0; i < zahl(2, 4); i++) rechnung(h, ABS.serverhaus, p, `Server CX22 ${MON[zahl(0, 11)]}`, "Rechnung_Server", [["Kundennummer", nr("K", 7)]]);
  for (let i = 0; i < zahl(2, 4); i++) mailVon(h, ABS.kidienst, p, "Your receipt / Ihre Rechnung", ["Thank you for your subscription. Vielen Dank für Ihr Abo.", `Amount paid: $${betrag(20, 200)} USD`, `Rechnungsnummer: ${nr("INV-", 8)}`], "Rechnung");
  mailVon(h, ABS.domain, p, "Ihre Domain wurde verlängert", ["Ihre Domain beispiel-familie.invalid wurde um ein Jahr verlängert.", `Rechnungsbetrag: ${betrag(10, 30)} €`], "Rechnung");
  rechnung(h, ABS.elektro, p, "Tablet mit Stift", "Rechnung_Kauf");
  for (let q = 1; q <= 2; q++) ablegen(h, "pdf", brief({ h, abs: ABS.finanzamt, an: p, datum: tag(), betreff: `Umsatzsteuer-Voranmeldung ${q}. Quartal`, nummern: [["Steuernummer", `${zahl(10, 99)}/${zahl(100, 999)}/${zahl(10000, 99999)}`]], absatz: ["die Umsatzsteuer-Voranmeldung wurde verarbeitet.", `Zahllast: ${betrag(0, 400)} €.`] }), sollFuer(h, ABS.finanzamt, p, "Bescheid", { kategorie: K.steu }), "USt");
  vertrag(h, ABS.kk, p, "freiwillige Mitgliedschaft (Selbstständige)", "Krankenkasse");
}

// ---------- Boutique (Vorbild: Alinas Moderaum / Perfect Skin Fashion; alles erfunden). konto = SKR03 für BookLedgerPro ----------
function boutiquePost(h, p) {
  for (let i = 0; i < zahl(3, 6); i++) { const d = tag(); const b = zahl(800, 6000);
    ablegen(h, "pdf", brief({ h, abs: ABS.modaitalia, an: p, datum: d, betreff: `Fattura / Rechnung Nr. ${nr("IT-", 5)}`, nummern: [["USt-IdNr.", `IT0${zahl(1000000000, 9999999999)}`], ["Kundennummer", "C-0815"]],
      absatz: [`Kollektion ${wahl(["Primavera", "Autunno"])} ${d.slice(0, 4)}: ${zahl(10, 60)} Teile Damenbekleidung (Kleider, Blusen, Strick).`, `Warenwert netto: ${eur(b)} €. Steuerschuldnerschaft des Leistungsempfängers (innergemeinschaftliche Lieferung).`, `Zahlbar bis ${de(plus(d, 30))}.`] }),
      { ...sollFuer(h, ABS.modaitalia, p, "Rechnung", { frist: plus(d, 30) }), konto: "3400" }, "Lieferant_Rechnung"); }
  for (let i = 0; i < zahl(2, 4); i++) { const d = tag();
    ablegen(h, "pdf", brief({ h, abs: ABS.kosmetikgh, an: p, datum: d, betreff: "Rechnung Wareneingang Parfüm und Pflege", nummern: [["Kundennummer", nr("KG-", 5)], ["Rechnungsnummer", nr("R", 6)]],
      absatz: [`Parfüm ${zahl(5, 30)} Flakons, Pflegeserie Perfect Skin ${zahl(10, 40)} Stück.`, `Rechnungsbetrag: ${betrag(300, 2500)} € inkl. 19 % USt.`, `Zahlbar bis ${de(plus(d, 14))}.`] }),
      { ...sollFuer(h, ABS.kosmetikgh, p, "Rechnung", { frist: plus(d, 14) }), konto: "3400" }, "Wareneingang"); }
  for (let i = 0; i < zahl(2, 3); i++) { const d = tag();
    ablegen(h, "pdf", brief({ h, abs: ABS.kartenterminal, an: p, datum: d, betreff: `Abrechnung Kartenumsätze ${MON[Number(d.slice(5, 7)) - 1]}`, nummern: [["Händlernummer", nr("H", 8)]],
      absatz: [`Kartenumsätze: ${betrag(4000, 20000)} €.`, `Disagio und Transaktionsgebühren: ${betrag(40, 300)} €.`, "Die Auszahlung erfolgt abzüglich der Gebühren."] }), { ...sollFuer(h, ABS.kartenterminal, p, "Abrechnung"), konto: "4970" }, "Kartenabrechnung"); }
  rechnung(h, ABS.gewerbevermieter, p, "Miete Ladenlokal Passage", "Ladenmiete", [["Mietobjekt", "Laden 3"]]);
  erwartung.at(-1).konto = "4210"; erwartung.at(-1).kategorie = K.haus;
  rechnung(h, ABS.ihk, p, "Kammerbeitrag Handelskammer", "IHK", [["Mitgliedsnummer", nr("IHK-", 6)]], K.arb); erwartung.at(-1).konto = "4380";
  vertrag(h, ABS.gewerbevers, p, "Inhalts- und Betriebshaftpflichtversicherung Boutique", "Versicherung"); erwartung.at(-1).konto = "4360";
  for (let i = 0; i < 2; i++) { mailVon(h, ABS.werbung, p, "Rechnung Werbeanzeigen", ["Ihre Werbekampagne für die Boutique ist abgeschlossen.", `Rechnungsbetrag: ${betrag(50, 600)} €`, `Rechnungsnummer: ${nr("AD-", 7)}`], "Rechnung"); erwartung.at(-1).konto = "4600"; }
  rechnung(h, ABS.verpackung, p, "Tüten und Seidenpapier mit Logo", "Verpackung"); erwartung.at(-1).konto = "4980";
  ablegen(h, "pdf", brief({ h, abs: ABS.steuerberater, an: p, datum: tag(), betreff: "Betriebswirtschaftliche Auswertung (BWA) September", nummern: [["Mandantennummer", nr("M-", 5)]], absatz: [`Umsatzerlöse: ${eur(zahl(15000, 60000))} €`, `Wareneinsatz: ${eur(zahl(6000, 25000))} €`, `Vorläufiges Ergebnis: ${eur(zahl(1000, 15000))} €`] }),
    sollFuer(h, ABS.steuerberater, p, "Abrechnung", { kategorie: K.steu }), "BWA");
  for (let q = 1; q <= 2; q++) ablegen(h, "pdf", brief({ h, abs: ABS.finanzamt, an: p, datum: tag(), betreff: `Umsatzsteuer-Voranmeldung ${q}. Quartal`, nummern: [["Steuernummer", `${zahl(10, 99)}/${zahl(100, 999)}/${zahl(10000, 99999)}`]], absatz: ["die Umsatzsteuer-Voranmeldung wurde verarbeitet.", `Zahllast: ${betrag(500, 4000)} €.`] }), sollFuer(h, ABS.finanzamt, p, "Bescheid", { kategorie: K.steu }), "USt");
  // eigene Kassenbons (Kartenzahlung) und Online-Bestellungen
  const WAREN = [["Leinenkleid", 129.0], ["Seidenbluse", 89.9], ["Strickjacke", 109.0], ["Dessous-Set", 69.9], ["Ledertasche", 179.0], ["Eau de Parfum 50 ml", 79.0], ["Pflegeserum", 39.9]];
  for (let i = 0; i < zahl(3, 5); i++) { const d = tag(); const pos = Array.from({ length: zahl(1, 3) }, () => wahl(WAREN)); const summe = pos.reduce((a, x) => a + x[1], 0).toFixed(2).replace(".", ",");
    bildAblegen(h, "kassenbon", [`# BOUTIQUE MODERAUM BEISPIEL`, "Damenmode · Dessous · Parfüm", "", ...pos.map(([w, x]) => `${w.padEnd(22)}${x.toFixed(2).replace(".", ",").padStart(9)}`), "-".repeat(31), `SUMME EUR${summe.padStart(22)}`, "Kartenzahlung", "", `${de(d)}  Bon-Nr ${zahl(100, 999)}`, "Danke für Ihren Besuch!"],
      { schriftstueck: "Kassenbon", kategorie: K.steu, absender: "Boutique Moderaum Beispiel", betrag: summe, datum: d, konto: "8400", notiz: "eigener Verkauf (Einnahme)" }); }
  for (let i = 0; i < zahl(1, 3); i++) mailVon(h, ABS.boutique, p, `Neue Bestellung im Onlineshop`, [`Bestellung ${nr("WEB-", 5)}: ${wahl(WAREN)[0]}, Größe ${wahl(["S", "M", "L"])}.`, `Bestellwert: ${betrag(40, 300)} € (bezahlt).`], "Brief", { kategorie: K.steu });
}

// ---------- E-Mails mit Anhängen (wie aus dem Postfach gespeichert) ----------
function emailMitAnhang(h, p) {
  const abs = wahl([ABS.strom, ABS.kk, ABS.mobil, ABS.versand, ABS.hausrat]);
  const d = tag(), frist = plus(d, 14);
  const zeilen = brief({ h, abs, an: p, datum: d, betreff: `Ihre Rechnung ${MON[Number(d.slice(5, 7)) - 1]}`, nummern: [["Kundennummer", nr("KD-", 7)], ["Rechnungsnummer", nr("RE-", 6)]], absatz: [`Rechnungsbetrag: ${betrag(15, 300)} €, zahlbar bis ${de(frist)}.`] });
  const pdfB64 = Buffer.from(textPdf([zeilen])).toString("base64").replace(/.{76}/g, "$&\r\n");
  const grenze = `----=_Teil_${zahl(100000, 999999)}`;
  const adr = `${p.vorname.toLowerCase()}.${h.name.toLowerCase()}@beispiel.invalid`;
  const roh = [`From: ${abs.name} <rechnung@${abs.name.toLowerCase().replace(/[^a-z]/g, "").slice(0, 12)}.beispiel.invalid>`, `To: ${adr}`, `Subject: Ihre Rechnung ist da`, `Date: ${new Date(`${d}T09:00:00Z`).toUTCString()}`, "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${grenze}"`, "", `--${grenze}`, "Content-Type: text/plain; charset=utf-8", "Content-Transfer-Encoding: 8bit", "", `${anredeSatz(h, p, "mail")}`, "", "im Anhang finden Sie Ihre aktuelle Rechnung als PDF.", "", "Viele Grüße", abs.name, "",
    `--${grenze}`, `Content-Type: application/pdf; name="Rechnung_${d.slice(0, 7)}.pdf"`, "Content-Transfer-Encoding: base64", `Content-Disposition: attachment; filename="Rechnung_${d.slice(0, 7)}.pdf"`, "", pdfB64, `--${grenze}--`, ""].join("\r\n");
  ablegen(h, "eml", roh, sollFuer(h, abs, p, "Rechnung"), "Rechnung_Mail");
  const mailPfad = dateien.at(-1);
  if (mailPfad.endsWith(".png")) return; // als Bildschirmfoto abgelegt: keine Anlage zum Auspacken
  erwartung.push({ pfad: `${mailPfad} › Rechnung_${d.slice(0, 7)}.pdf`, haushalt: h.id, ...sollFuer(h, abs, p, "Rechnung", { frist }), anhang: true });
}

// ---------- OneDrive: so sieht ein synchronisierter Ordner im echten Leben aus ----------
function oneDrive(h, p) {
  const basis = `Eingang/${h.id}/OneDrive`;
  const schreib = (rel, inhalt, soll) => { const pfad = `${basis}/${rel}`; mkdirSync(dirname(join(AUS, pfad)), { recursive: true }); writeFileSync(join(AUS, pfad), inhalt); dateien.push(pfad); if (soll) erwartung.push({ pfad, haushalt: h.id, ...soll }); };
  // Scan-App („Office Lens“-artig) und Kamera-Upload mit Datumsnamen
  const d = tag(), frist = plus(d, 21);
  const z1 = brief({ h, abs: ABS.bezirk, an: p, datum: d, betreff: "Bitte um Rückmeldung", nummern: [["Aktenzeichen", nr("AZ-", 6)]], absatz: [`bitte teilen Sie uns bis zum ${de(frist)} mit, ob Sie den Termin wahrnehmen.`] });
  const scanName = `Dokumente/Scans/Scan ${d.replaceAll("-", "")} ${zahl(10, 23)}${zahl(10, 59)}.pdf`;
  schreib(scanName, textPdf([z1]), sollFuer(h, ABS.bezirk, p, "Aufforderung", { frist }));
  // Konfliktkopie (gleicher Inhalt, Gerätename im Namen) → doppelt
  schreib(scanName.replace(".pdf", `-DESKTOP-${String(zahl(1000, 9999))}K.pdf`), textPdf([z1]), { doppelt: true, ...sollFuer(h, ABS.bezirk, p, "Aufforderung", { frist }) });
  // „(1)“-Kopie einer Rechnung → doppelt
  const z2 = brief({ h, abs: ABS.strom, an: p, datum: tag(), betreff: "Ihre Rechnung Strom", nummern: [["Kundennummer", nr("NS-", 7)]], absatz: ["Rechnungsbetrag: 84,00 €."] });
  schreib("Dokumente/Rechnung Strom.pdf", textPdf([z2]), sollFuer(h, ABS.strom, p, "Rechnung"));
  schreib("Dokumente/Rechnung Strom (1).pdf", textPdf([z2]), { doppelt: true, ...sollFuer(h, ABS.strom, p, "Rechnung") });
  // Systemreste und abgebrochene Synchronisierung
  schreib("desktop.ini", "[.ShellClassInfo]\r\nIconResource=C:\\Program Files\\Microsoft OneDrive\\OneDrive.exe,0\r\n", null);
  schreib("Bilder/Thumbs.db", Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1, 0, 0, 0, 0]), null);
  schreib(`Dokumente/Kontoauszug_${d.slice(0, 7)}.pdf`, Buffer.alloc(0), { leer: true });
}

// ---------- Was jeder Haushalt bekommt ----------
for (const h of HAUSHALTE) {
  const [p1, p2] = h.personen;
  const kinder = h.personen.filter((p) => p.anrede === "Kind");
  const erw = h.personen.filter((p) => p.anrede !== "Kind");
  const jemand = () => wahl(erw);
  // Für alle
  for (let i = 0; i < zahl(2, 4); i++) rechnung(h, ABS.strom, wahl(["familie", jemand()]), `Strom ${MON[zahl(0, 11)]}`, "Rechnung_Strom", [["Kundennummer", nr("NS-", 7)], ["Zählernummer", nr("Z-", 8)]]);
  abrechnung(h, ABS.strom, jemand(), "Jahresverbrauchs", "Jahresabrechnung");
  for (let i = 0; i < zahl(1, 2); i++) kontoauszug(h, ja(0.6) ? ABS.bank : ABS.direktbank, jemand());
  vertrag(h, ABS.mobil, jemand(), "Mobilfunk Tarif Nord M", "Mobilfunk");
  rechnung(h, ABS.mobil, jemand(), `Mobilfunk ${MON[zahl(0, 11)]}`, "Rechnung");
  if (ja(0.5)) mahnung(h, wahl([ABS.mobil, ABS.strom, ABS.versand]), jemand());
  vertrag(h, ABS.kk, jemand(), "Ihre Mitgliedschaft", "Krankenkasse");
  befund(h, wahl([ABS.hausarzt, ABS.labor]), jemand(), wahl(["Blutbild", "Vorsorgeuntersuchung", "Belastungs-EKG"]));
  termin(h, ABS.zahnarzt, jemand(), "Kontrolluntersuchung", "Termin_Zahnarzt");
  rechnung(h, ABS.elektro, jemand(), wahl(["Waschmaschine", "Laptop", "Kühlschrank"]), "Rechnung_Kauf");
  if (ja(0.6)) werbung(h, wahl([ABS.moebel, ABS.elektro, ABS.versand]));
  mailVon(h, ABS.versand, jemand(), "Ihre Bestellung wurde versandt", ["Ihre Bestellung ist unterwegs.", `Bestellnummer: ${nr("B-", 8)}`, `Rechnungsbetrag: ${betrag(10, 200)} €`], "Rechnung", { kategorie: K.kauf });
  mailVon(h, ABS.streaming, jemand(), "Rechnung für Ihr Abo", ["vielen Dank, dass Sie Filmabend nutzen.", `Ihre Rechnung über ${betrag(5, 18)} € ist beigefügt.`, `Rechnungsnummer: ${nr("FA-", 7)}`], "Rechnung");
  mailVon(h, ABS.bahn, jemand(), "Ihre Fahrkarte", ["anbei Ihre Buchungsbestätigung.", `Reise am ${de(tag())} nach Beispielhafen.`], "Brief");
  vertrag(h, ABS.hausrat, wahl(erw), "Hausratversicherung", "Versicherung");
  if (ja(0.5)) rechnung(h, ABS.hausrat, jemand(), "Jahresbeitrag Haftpflicht", "Beitrag", [["Versicherungsnummer", nr("HH-", 8)]]);
  bescheid(h, ABS.finanzamt, wahl(erw), `Einkommensteuer ${zahl(2023, 2025)}`, (d) => [`die Einkommensteuer wird festgesetzt auf ${betrag(0, 6000)} €.`, `Erstattung: ${betrag(0, 900)} €.`], "Steuerbescheid");
  rechnung(h, ABS.rundfunk, jemand(), "Rundfunkbeitrag Quartal", "Beitrag", [["Beitragsnummer", nr("", 9)]], K.steu);
  // Wohnen
  if (h.wohnen === "eigentum") {
    bescheid(h, ABS.steueramt, "familie", `Grundsteuer ${zahl(2025, 2026)}`, (d) => [`die Grundsteuer für das Grundstück ${h.strasse} wird festgesetzt.`, `Vierteljährlich fällig: ${betrag(80, 300)} €.`], "Grundsteuer", { kategorie: K.steu });
    rechnung(h, ABS.stadtreinigung, "familie", "Müllgebühren", "Gebuehren", [["Objektnummer", nr("OB-", 6)]]);
    rechnung(h, ABS.wasser, "familie", "Wasser und Abwasser", "Wasser");
  } else {
    vertrag(h, h.wohnen === "wg" ? ABS.hausverw : ABS.vermieter, p1, h.wohnen === "wg" ? "WG-Zimmer Hafenblick" : "Wohnung Mietvertrag", "Mietvertrag");
    abrechnung(h, h.wohnen === "wg" ? ABS.hausverw : ABS.vermieter, p1, "Betriebskosten", "Nebenkosten");
    if (ja(0.5)) aufforderung(h, ABS.vermieter, p1, "die Zählerstände", "Vermieter");
  }
  if (h.wohnen !== "wg") vertrag(h, ABS.internet, jemand(), "Glasfaser 500", "Internet");
  // Arbeit: Gehaltsabrechnungen (Aufbau wie in Lohnprogrammen), Jahresunterlagen
  for (const [vor, ag] of Object.entries(h.arbeitgeber)) {
    const p = h.personen.find((x) => x.vorname === vor);
    const stamm = gehaltsStamm(h, p, ABS[ag]);
    const start = zahl(0, 6);
    for (let m = start; m < start + zahl(6, 12); m++) gehaltsabrechnung(h, p, ABS[ag], stamm, 2025 + Math.floor(m / 12), (m % 12) + 1);
    lohnsteuerbescheinigung(h, p, ABS[ag], stamm);
    svMeldung(h, p, ABS[ag], stamm);
    renteninformation(h, p, stamm);
  }
  // Fahrzeuge
  for (const kz of h.fahrzeuge) {
    const p = jemand();
    rechnung(h, ABS.kfzvers, p, `Kfz-Haftpflicht ${kz}`, "Kfz_Versicherung", [["Versicherungsnummer", nr("KFZ-", 8)], ["Kennzeichen", kz]], K.vers);
    rechnung(h, ABS.werkstatt, p, `Inspektion Fahrzeug ${kz}`, "Werkstatt", [["Auftragsnummer", nr("A-", 6)], ["Kennzeichen", kz]]);
    if (ja(0.6)) termin(h, ABS.tuv, p, `Hauptuntersuchung Fahrzeug ${kz}`, "HU");
    if (ja(0.4)) bescheid(h, ABS.lbv, p, `Zulassung Fahrzeug ${kz}`, () => [`das Fahrzeug mit dem Kennzeichen ${kz} ist zugelassen.`, "Zulassungsbescheinigung Teil I liegt bei (Feld A: Kennzeichen, Feld B: Erstzulassung, Feld E: Fahrzeug-Identifizierungsnummer)."], "Zulassung", { kategorie: K.auto });
  }
  if (h.motorrad) {
    rechnung(h, ABS.motoversand, p1, `Motorradreifen für ${h.motorrad}`, "Motorrad", [["Kennzeichen", h.motorrad]]);
    rechnung(h, ABS.kfzvers, p1, `Saisonkennzeichen Motorrad ${h.motorrad}`, "Versicherung", [["Versicherungsnummer", nr("KR-", 8)], ["Kennzeichen", h.motorrad]], K.vers);
  }
  // Lebensereignisse: 8 bis 12 passende
  for (let i = 0, n = zahl(8, 12), versuche = 0; i < n && versuche < 80; versuche++) {
    const e = wahl(EREIGNISSE), wer = passt(h, e.wer);
    if (!wer.length) continue;
    e.f(h, wahl(wer)); i++;
  }
  // Belege und Fotos
  for (let i = 0; i < zahl(3, 6); i++) kassenbon(h, wahl([LADEN.supermarkt, LADEN.supermarkt, LADEN.discounter, LADEN.drogerie, LADEN.baecker]), jemand());
  if (ja(0.6)) kassenbon(h, h.wohnen === "eigentum" ? LADEN.baumarkt : LADEN.apotheke, jemand());
  if (KOMPLEX) { for (let i = 0; i < zahl(1, h.personen.length > 3 ? 3 : 2); i++) langerBon(h, wahl([LADEN.supermarkt, LADEN.discounter, LADEN.supermarkt]), jemand());
    for (let i = 0; i < zahl(1, 3); i++) appBon(h, wahl([LADEN.supermarkt, LADEN.discounter, LADEN.drogerie]), jemand()); }
  if (h.rente || ja(0.3)) kassenbon(h, LADEN.apotheke, jemand());
  for (const kz of [...h.fahrzeuge, ...(h.motorrad ? [h.motorrad] : [])]) for (let i = 0; i < zahl(1, 2); i++) tankquittung(h, kz, jemand());
  if (h.fahrzeuge.length || ja(0.4)) autohausFoto(h, jemand());
  if (ja(0.5)) plakatFoto(h);
  landschaftFoto(h);
  // Kinder
  for (const k of kinder) {
    const alter = Number(k.rolle.match(/\d+/)?.[0] || 6);
    const schule = alter >= 10 ? ABS.gymnasium : alter >= 6 ? ABS.grundschule : ABS.kita;
    termin(h, schule, k, wahl(["Elternabend", "Elterngespräch", "Schulfest"]), "Schule", `${alter >= 6 ? "Schüler" : "Kind"}: ${k.voll}`);
    if (alter >= 6 && ja(0.7)) ablegen(h, "pdf", brief({ h, abs: schule, an: k, datum: tag(), betreff: wahl(["Klassenfahrt", "Zeugnisausgabe", "Informationen zum Halbjahr"]), rolleZeile: `Schüler: ${k.voll}`, absatz: ["wir möchten Sie über Folgendes informieren.", "Rückfragen gern an das Sekretariat."] }), { ...sollFuer(h, schule, k, "Brief"), betrifft: k.voll }, "Schule");
    if (alter < 6) rechnung(h, ABS.kita, k, `Essensgeld ${MON[zahl(0, 11)]}`, "Kita", [["Kind", k.voll]], K.fam);
    befund(h, ABS.kinderarzt, k, wahl(["U-Untersuchung", "Impfung", "Allergietest"]));
    if (alter >= 10 && ja(0.8)) rechnung(h, ABS.kfo, k, "kieferorthopädische Behandlung", "KFO", [["Patient", k.voll]], K.ges);
    if (ja(0.5)) rechnung(h, ABS.verein, k, "Mitgliedsbeitrag Turnen", "Verein", [["Mitglied", k.voll]], K.reis);
  }
  if (kinder.length) bescheid(h, ABS.familienkasse, erw[erw.length > 1 ? 1 : 0], "Kindergeld", () => [`Kindergeld wird für ${kinder.map((k) => k.vorname).join(", ")} festgesetzt.`, `Monatlicher Betrag: ${255 * kinder.length},00 €.`], "Kindergeld");
  if (h.id.startsWith("alleinerziehend")) {
    bescheid(h, ABS.jugendamt, p1, "Unterhaltsvorschuss", (d) => [`für das Kind ${p2.voll} wird Unterhaltsvorschuss bewilligt.`, `Bewilligungszeitraum ab ${de(d)}.`], "Unterhaltsvorschuss");
    bescheid(h, ABS.wohngeld, p1, "Wohngeld", (d) => [`Wohngeld wird in Höhe von ${betrag(80, 350)} € monatlich bewilligt.`, "Änderungen der Einkünfte sind unverzüglich mitzuteilen."], "Wohngeld", { kategorie: K.haus });
    rechnung(h, ABS.hort, p2, "Hortbeitrag", "Hort", [["Kind", p2.voll]], K.fam);
  }
  if (h.buergergeld) {
    bescheid(h, ABS.jobcenter, p1, "Bürgergeld (Bewilligungsbescheid)", (d) => [`Ihnen wird Bürgergeld ab ${de(d)} bewilligt.`, `Regelbedarf: 563,00 €, Kosten der Unterkunft: ${betrag(400, 650)} €.`], "Buergergeld");
    termin(h, ABS.jobcenter, p1, "Gespräch zu Ihrem Kooperationsplan", "Einladung_Jobcenter");
    aufforderung(h, ABS.jobcenter, p1, "Kontoauszüge der letzten drei Monate", "Jobcenter");
    termin(h, ABS.agentur, p1, "Beratungsgespräch berufliche Weiterbildung", "Agentur");
    ablegen(h, "pdf", brief({ h, abs: ABS.rente, an: p1, datum: tag(), betreff: "Kontenklärung", nummern: [["Versicherungsnummer", `00 ${zahl(100000, 999999)} B ${zahl(100, 999)}`]], absatz: ["in Ihrem Versicherungsverlauf fehlen Zeiten.", "Bitte füllen Sie den beiliegenden Fragebogen aus."] }), sollFuer(h, ABS.rente, p1, "Aufforderung"), "Rente");
    mahnung(h, ABS.inkasso, p1);
    bescheid(h, ABS.rundfunk, p1, "Befreiung von der Rundfunkbeitragspflicht", () => ["Sie werden von der Rundfunkbeitragspflicht befreit.", "Grundlage ist Ihr Bürgergeldbescheid."], "Befreiung", { kategorie: K.steu });
  }
  if (h.beamtin) {
    for (let i = 0; i < 2; i++) { const d = tag(); ablegen(h, "pdf", brief({ h, abs: ABS.besoldung, an: p1, datum: d, betreff: `Bezügemitteilung ${MON[Number(d.slice(5, 7)) - 1]} ${d.slice(0, 4)}`, nummern: [["Personalnummer", nr("", 7)]], absatz: ["Besoldungsgruppe W 2.", `Auszahlung: ${betrag(4000, 6500)} €.`] }), sollFuer(h, ABS.besoldung, p1, "Abrechnung"), "Bezuege"); }
    bescheid(h, ABS.beihilfe, p1, "Beihilfe", () => [`zu Ihrem Antrag wird eine Beihilfe von ${betrag(40, 900)} € gewährt.`, "Belege: Arztrechnungen laut Aufstellung."], "Beihilfe", { kategorie: K.ges });
    vertrag(h, ABS.pkv, p1, "Krankheitskostentarif 50 %", "PKV");
    rechnung(h, ABS.hausarzt, p1, "privatärztliche Leistungen nach GOÄ", "Arztrechnung", [["Patientin", p1.voll]], K.ges);
    vertrag(h, ABS.verlag, p1, "Lehrbuch Meeresbiologie, 3. Auflage", "Verlagsvertrag");
    mailVon(h, ABS.konferenz, p1, "Anmeldebestätigung Jahrestagung", ["Ihre Anmeldung zur Jahrestagung ist eingegangen.", `Tagungsgebühr: ${betrag(200, 450)} €, zahlbar bis ${de(plus(tag(), 20))}.`], "Rechnung");
    ablegen(h, "pdf", brief({ h, abs: ABS.uni, an: p1, datum: tag(), betreff: "Dienstreiseabrechnung", nummern: [["Aktenzeichen", nr("DR-", 5)]], absatz: ["die Reisekosten werden erstattet.", `Erstattungsbetrag: ${betrag(100, 900)} €.`] }), sollFuer(h, ABS.uni, p1, "Abrechnung"), "Reisekosten");
  }
  if (h.selbststaendig) {
    for (let q = 1; q <= 2; q++) ablegen(h, "pdf", brief({ h, abs: ABS.finanzamt, an: p1, datum: tag(), betreff: `Umsatzsteuer-Voranmeldung ${q}. Quartal`, nummern: [["Steuernummer", `${zahl(10, 99)}/${zahl(100, 999)}/${zahl(10000, 99999)}`]], absatz: ["die Umsatzsteuer-Voranmeldung wurde verarbeitet.", `Zahllast: ${betrag(200, 3000)} €.`] }), sollFuer(h, ABS.finanzamt, p1, "Bescheid", { kategorie: K.steu }), "USt");
    bescheid(h, ABS.gewerbe, p1, "Gewerbesteuer-Vorauszahlungen", (d) => ["die Vorauszahlungen werden festgesetzt.", `Fällig am ${de(plus(d, 30))}.`], "Gewerbesteuer", { frist: (d) => plus(d, 30) });
    rechnung(h, ABS.hwk, p1, "Kammerbeitrag", "Kammerbeitrag", [["Betriebsnummer", nr("HWK-", 6)]], K.arb);
    rechnung(h, ABS.bg, p1, "Beitrag Unfallversicherung", "BG", [["Mitgliedsnummer", nr("BG-", 7)]], K.vers);
    rechnung(h, ABS.steuerberater, p1, "Jahresabschluss und Steuererklärung", "Steuerberater", [["Mandantennummer", nr("M-", 5)]], K.steu);
    aufforderung(h, ABS.finanzamt, p1, "Belege zur Einnahmenüberschussrechnung", "Finanzamt");
  }
  if (h.rente) {
    for (const p of erw) bescheid(h, ABS.rente, p, "Rentenanpassung zum 1. Juli", () => [`Ihre Rente wird angepasst. Neuer Zahlbetrag: ${betrag(900, 1900)} €.`, "Die Anpassung beruht auf gesetzlichen Vorgaben."], "Rente");
    bescheid(h, ABS.pflegekasse, p2, "Pflegegrad 2", () => [`für ${p2.voll} wird Pflegegrad 2 anerkannt.`, "Pflegegeld: 347,00 € monatlich."], "Pflegekasse");
    rechnung(h, ABS.hoergeraet, p1, "Hörgeräteversorgung Eigenanteil", "Hoergeraet", [["Patient", p1.voll]], K.ges);
    rechnung(h, ABS.apotheke, p2, "Zuzahlungen Arzneimittel", "Apotheke", [["Patientin", p2.voll]], K.ges);
    ablegen(h, "pdf", brief({ h, abs: ABS.notar, an: p1, datum: tag(), betreff: "Vorsorgevollmacht und Patientenverfügung", nummern: [["Urkundenrolle", nr("UR ", 4)]], absatz: ["anbei erhalten Sie die Ausfertigung der Vorsorgevollmacht.", "Die Kostenrechnung folgt gesondert."] }), sollFuer(h, ABS.notar, p1, "Vertrag"), "Vollmacht");
    rechnung(h, ABS.fernwaerme, "familie", "Fernwärme Abschlag", "Fernwaerme");
    befund(h, ABS.klinik, p2, "Entlassungsbericht Hüft-OP");
  }
  if (h.studentin) {
    bescheid(h, ABS.bafoeg, p1, "Ausbildungsförderung nach dem BAföG", (d) => [`Ihnen wird Ausbildungsförderung von ${betrag(400, 934)} € monatlich bewilligt.`, `Bewilligungszeitraum ab ${de(d)}.`], "BAfoeG");
    rechnung(h, ABS.uni, p1, "Semesterbeitrag Sommersemester", "Semesterbeitrag", [["Matrikelnummer", nr("", 7)]], K.fam);
    aufforderung(h, ABS.bafoeg, p1, "den Leistungsnachweis nach § 48 BAföG", "BAfoeG");
    vertrag(h, ABS.bahn, p1, "Deutschlandticket im Abo", "Ticket");
  }
  if (h.selbststaendig || h.entwickler) jahresabschluss(h, p1);
  if (KOMPLEX) {
    for (const v of h.rentner || []) { const p = h.personen.find((x) => x.vorname === v);
      bescheid(h, ABS.rente, p, "Rentenanpassung zum 1. Juli", () => [`Ihre Rente wird angepasst. Neuer Zahlbetrag: ${betrag(700, 1900)} €.`, "Die Anpassung beruht auf gesetzlichen Vorgaben."], "Rente");
      if (ja(0.6)) rechnung(h, ABS.apotheke, p, "Zuzahlungen Arzneimittel", "Apotheke", [[p.anrede === "Frau" ? "Patientin" : "Patient", p.voll]], K.ges); }
    if (h.pflege) { const p = h.personen.find((x) => x.vorname === h.pflege);
      bescheid(h, ABS.pflegekasse, p, `Pflegegrad ${p.rolle.match(/Pflegegrad (\d)/)?.[1] || 3}`, () => [`für ${p.voll} wird ein Pflegegrad anerkannt.`, `Pflegegeld: ${betrag(300, 800)} € monatlich.`], "Pflegekasse");
      befund(h, ABS.klinik, p, "Entlassungsbericht"); }
    if (h.pflegekind) { const k = h.personen.find((x) => x.vorname === h.pflegekind);
      bescheid(h, ABS.jugendamt, p1, "Pflegegeld für Vollzeitpflege", () => [`für das Pflegekind ${k.voll} wird Pflegegeld nach § 39 SGB VIII gezahlt.`, `Monatlicher Betrag: ${betrag(900, 1300)} €.`], "Pflegegeld");
      termin(h, ABS.jugendamt, p1, `Hilfeplangespräch für ${k.voll}`, "Hilfeplan"); }
    if (h.patchwork) { const k = h.personen.filter((x) => x.anrede === "Kind" && x.name !== h.name)[0];
      if (k) bescheid(h, ABS.familienkasse, p2, "Kindergeld (Berechtigtenwechsel)", () => [`Kindergeld für ${k.voll} wird ab sofort an Sie gezahlt.`, "Der bisherige Berechtigte erhält eine Mitteilung."], "Kindergeld"); }
  }
  // BookLedgerPro-Fälle: Schenkung, Versicherungsleistung, Spende
  if (ja(0.4)) schenkung(h, jemand());
  if (ja(0.6)) versicherungsleistung(h, jemand());
  if (ja(0.5)) einfach(h, ABS2.spende, jemand(), "Bescheinigung", "Zuwendungsbestätigung für Spenden", () => [`Bestätigung über Geldzuwendungen in Höhe von ${betrag(20, 300)} €.`, "Zur Vorlage beim Finanzamt."], "Spende");
  if (h.entwickler) entwicklerPost(h, p1);
  if (h.boutique) boutiquePost(h, p1);
  emailMitAnhang(h, jemand());
  oneDrive(h, jemand());
  if (erw.length > 1 && ja(0.5)) kuendigung(h, ABS.fitness, jemand(), "Mitgliedschaft Fitness");
  if (ja(0.5)) rechnung(h, ABS.reparatur, jemand(), wahl(["Reparatur Geschirrspüler", "Displaytausch Smartphone"]), "Reparatur");
  if (ja(0.6)) rechnung(h, ABS.reise, jemand(), wahl(["Pauschalreise Beispielinsel", "Ferienhaus an der Küste"]), "Reise");
}

// ---------- Bilder rendern ----------
if (bildAuftrag.length) {
  const auftragDatei = join(AUS, ".bilder-auftrag.json");
  mkdirSync(AUS, { recursive: true });
  writeFileSync(auftragDatei, JSON.stringify(bildAuftrag));
  const r = spawnSync("python3", [join(WURZEL, "scripts/belege-bilder.py"), auftragDatei], { stdio: "inherit" });
  rmSync(auftragDatei, { force: true });
  if (r.status !== 0) throw new Error("Bilder konnten nicht gebaut werden (python3 mit Pillow nötig).");
}

// ---------- Komplex gesetzte Seiten rendern (scripts/setzen-komplex.py) ----------
if (setzAuftrag.length) {
  const auftragDatei = join(AUS, ".setz-auftrag.json");
  writeFileSync(auftragDatei, JSON.stringify(setzAuftrag));
  const teile = Number(process.env.SETZ_PROZESSE || 4), stueck = Math.ceil(setzAuftrag.length / teile);
  const { spawn } = await import("node:child_process");
  await Promise.all(Array.from({ length: teile }, (_, i) => new Promise((ok, fehler) => {
    const d = join(AUS, `.setz-${i}.json`); writeFileSync(d, JSON.stringify(setzAuftrag.slice(i * stueck, (i + 1) * stueck)));
    spawn("python3", [join(WURZEL, "scripts/setzen-komplex.py"), d], { stdio: "inherit" }).on("exit", (c) => { rmSync(d, { force: true }); c === 0 ? ok() : fehler(new Error("Setzen fehlgeschlagen")); });
  })));
  rmSync(auftragDatei, { force: true });
  writeFileSync(join(AUS, ".quelltext.json"), JSON.stringify(quelltext));
}

// ---------- Mehrfachkopien (dieselben Bytes, über WhatsApp/Handy nochmal gespeichert) ----------
for (const k of kopien) {
  const n = zaehler++;
  const pfad = `Eingang/${k.h.id}/${wahl(["Handy/WhatsApp/Media", "Handy/Download", "Durcheinander"])}/${k.von.split("/").pop().replace(/(\.\w+)$/, ` (${zahl(1, 4)})$1`)}`;
  mkdirSync(dirname(join(AUS, pfad)), { recursive: true });
  writeFileSync(join(AUS, pfad), readFileSync(join(AUS, k.von)));
  dateien.push(pfad);
  erwartung.push({ pfad, haushalt: k.h.id, ...k.soll, doppelt: true });
}

// ---------- Schreiben ----------
mkdirSync(AUS, { recursive: true });
writeFileSync(join(AUS, "dateien.json"), JSON.stringify(dateien, null, 1));
writeFileSync(join(AUS, "ERWARTUNG.json"), JSON.stringify({ hinweis: "Soll-Werte je Datei (erfunden). person = wen es wirklich betrifft; betrifft = wie die Anrede es nennt.", startwert: START, dateien: erwartung }, null, 1));
writeFileSync(join(AUS, "HAUSHALTE.json"), JSON.stringify({ hinweis: "Was ein Start-Assistent in der Familienakte abfragen würde (alles erfunden).", haushalte: HAUSHALTE.map(({ id, titel, name, strasse, plz, personen, fahrzeuge, motorrad, arbeitgeber }) => ({ id, titel, name, anschrift: `${strasse}, ${plz} Beispielstadt`, personen, fahrzeuge: [...fahrzeuge, ...(motorrad ? [motorrad] : [])], arbeitgeber: Object.fromEntries(Object.entries(arbeitgeber).map(([k, v]) => [k, ABS[v].name])) })) }, null, 1));
writeFileSync(join(AUS, "LIES-MICH.txt"), `Testdaten „Haushalte“ – alles erfunden (Startwert ${START}${KOMPLEX ? ", komplex" : ""}).\n${HAUSHALTE.length} Haushalte, ${dateien.length} Dateien, durcheinander abgelegt.\nNeu bauen: node scripts/haushalte-bauen.mjs <startwert>\n`);
const jeH = Object.fromEntries(HAUSHALTE.map((h) => [h.id, erwartung.filter((e) => e.haushalt === h.id).length]));
console.log(`Startwert ${START}: ${dateien.length} Dateien in ${HAUSHALTE.length} Haushalten`, jeH);
