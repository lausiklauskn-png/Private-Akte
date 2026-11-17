/**
 * Wer ist gemeint – mit dem, was der Nutzer beim Start angegeben hat (Start-Assistent der Familienakte):
 * Personen des Haushalts, Fahrzeuge (Kennzeichen), feste Nummern. Diese Angaben bleiben auf dem Gerät.
 * Reine Rechnung, ohne Browser. Unsicher heißt: kein Name, nie geraten.
 */
import type { Wert } from "./typen.ts";

export type HaushaltPerson = { vorname: string; name: string; anrede: "Herr" | "Frau" | "Kind" | string; titel?: string };
export type Haushalt = { name: string; personen: HaushaltPerson[]; fahrzeuge?: Array<string | { kennzeichen: string; halter?: string }>; nummern?: Array<{ wert: string; person: string }> };

const voll = (p: HaushaltPerson) => `${p.vorname} ${p.name}`;
const kurz = (s: string) => s.toLowerCase().replace(/[^a-z0-9äöüß]/g, "");
const w = (wert: string, sicher: boolean, grund: string): Wert => ({ wert, sicher, grund, quelle: "regel" });

const B = "A-Za-zÄÖÜäöüß";
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const KZ = /[A-ZÄÖÜ]{1,3}[- ][A-Z]{1,2}[ -]?\d{1,4}[EH]?/;
const ROLLE = "patient(?:in)?|pat\\.|schüler(?:in)?|kind|versicherte[rs]?(?: person)?|versicherungsnehmer(?:in)?|mitglied|teilnehmer(?:in)?|karteninhaber(?:in)?|kontoinhaber(?:in)?|auszubildende[r]?|reisende[r]?|fahrer(?:in)?|halter(?:in)?|arbeitnehmer(?:in)?|mitarbeiter(?:in)?|antragsteller(?:in)?|steuerpflichtige[r]?|name|für|betrifft|betr\\.";

type Nennung = { p: HaushaltPerson; voll: boolean; kurz: boolean; vorname: boolean; rolle: boolean; anrede: boolean; anschrift: boolean };

/** Wo und wie eine Person des Haushalts im Text vorkommt: voller Name, „Name, Vorname“, „V. Name“, nur Vorname, mit Rollenwort, in der Anrede. */
function nennung(t: string, p: HaushaltPerson, eindeutigInitial: boolean): Nennung {
  const v = esc(p.vorname), n = esc(p.name), i = esc(p.vorname[0]);
  const voll = new RegExp(`(?<![${B}])${v}(?:\\s+[A-ZÄÖÜ][${B}-]+)?\\s+${n}(?![${B}])|(?<![${B}])${n},\\s*${v}(?![${B}])|(?<![${B}.])${v}[._-]?${n}@`, "i").test(t);
  const kurz = eindeutigInitial && new RegExp(`(?<![${B}])${i}\\.\\s?${n}(?![${B}])|(?<![${B}])${n},\\s*${i}\\.`).test(t);
  const vorname = new RegExp(`(?<![${B}])${v}s?(?![${B}])`).test(t);
  const rolle = new RegExp(`(?:${ROLLE})\\s*:\\s*(?:(?:herrn?|frau)\\s+)?(?:${v}(?![${B}])|${n},\\s*${v})|(?:${ROLLE.replace("|name|für|betrifft|betr\\.", "")})\\s+${v}\\s+${n}`, "i").test(t);
  const anrede = new RegExp(`(?:^|\\n)\\s*(?:mein[e]?\\s+)?(?:lieber?|hallo|hi|hey|moin|servus|guten\\s+(?:tag|morgen|abend))[ ,]+(?:(?:herr|frau)\\s+)?${v}(?![${B}])`, "i").test(t);
  const anschrift = new RegExp(`(?:^|\\n)\\s*(?:herrn?|frau)\\s*\\n?\\s*(?:dr\\.\\s+)?(?:${v}|${i}\\.)\\s+${n}(?![${B}])(?!\\s+und\\b)`, "i").test(t);
  return { p, voll, kurz, vorname, rolle, anrede, anschrift };
}

export function personZuordnen(text: string, betrifft: string | undefined, h: Haushalt | null | undefined): Wert | undefined {
  if (!h?.personen?.length) return undefined;
  const t = text || "";
  const initialEinmal = (p: HaushaltPerson) => h.personen.filter((x) => x.name === p.name && x.vorname[0] === p.vorname[0]).length === 1;
  const ns = h.personen.map((p) => nennung(t, p, initialEinmal(p)));
  const istKind = (p: HaushaltPerson) => /kind/i.test(p.anrede);
  // 1. Hinterlegte Nummer (Versicherten-, Kunden-, Personalnummer …)
  for (const n of h.nummern || []) if (n.wert && kurz(t).includes(kurz(n.wert))) return w(n.person, true, `Nummer ${n.wert} gehört zu ${n.person}`);
  // 2. Ausdrücklich genannte Person (Patient, Schülerin, Kind, Versicherte, „für: …“) – wenn es genau eine ist
  const mitRolle = ns.filter((x) => x.rolle);
  if (mitRolle.length === 1) return w(voll(mitRolle[0].p), true, `„${mitRolle[0].p.vorname}“ ausdrücklich genannt (Rolle)`);
  // 3. Genau ein Kind des Haushalts kommt vor: um das Kind geht es, auch wenn der Brief an die Eltern geht
  const kinder = ns.filter((x) => istKind(x.p) && (x.voll || x.vorname));
  if (kinder.length === 1) return w(voll(kinder[0].p), kinder[0].voll, kinder[0].voll ? `${voll(kinder[0].p)} im Text, einziges genanntes Kind` : `Vorname „${kinder[0].p.vorname}“ im Text, einziges genanntes Kind`);
  // 4. Persönliche Anrede mit Vornamen („Liebe Anna“, „Hallo Herr …“)
  const angeredet = ns.filter((x) => x.anrede);
  if (angeredet.length === 1) return w(voll(angeredet[0].p), true, `Anrede mit Vornamen „${angeredet[0].p.vorname}“`);
  // 5. Anrede / Anschrift aus Sieb 5 – nicht, wenn Herr und Frau zusammen angeschrieben sind (gemeinsame Sache)
  const erwachsene = h.personen.filter((p) => !istKind(p));
  const beide = /sehr geehrte frau [^\n]{0,40}(?:,|und)\s*(?:sehr geehrter )?herr\b|sehr geehrter herr [^\n]{0,40}(?:,|und)\s*(?:sehr geehrte )?frau\b|herrn und frau|frau und herrn|eheleute|(?:^|\n)\s*(?:familie|fam\.)\s/i.test(t);
  const allein = erwachsene.length <= 1;
  if (betrifft && !beide) {
    const m = betrifft.match(/^(herr|frau)\s+(?:dr\.\s+)?(.+)$/i);
    if (m) {
      const passend = erwachsene.filter((p) => p.anrede.toLowerCase() === m[1].toLowerCase() && m[2].toLowerCase().includes(p.name.toLowerCase()));
      // Bei mehreren Erwachsenen kann ein Brief an eine Person auch eine gemeinsame Sache sein (Miete, Strom): dann nicht sicher.
      if (passend.length === 1) return w(voll(passend[0]), allein, `${betrifft} – einzige ${m[1].toLowerCase() === "herr" ? "männliche" : "weibliche"} erwachsene Person im Haushalt${allein ? "" : "; nur Empfänger, gemeinsame Sache möglich"}`);
      if (passend.length > 1) {
        const mitVorname = passend.filter((p) => new RegExp(`(?<![${B}])${esc(p.vorname)}(?![${B}])`).test(t));
        if (mitVorname.length === 1) return w(voll(mitVorname[0]), true, `${betrifft}, Vorname im Text`);
        return w(betrifft, false, `${passend.length} Personen passen zu „${betrifft}“`);
      }
    }
    const direkt = h.personen.find((p) => betrifft.toLowerCase() === voll(p).toLowerCase());
    if (direkt) return w(voll(direkt), true, "Name aus dem Schreiben");
  }
  // 6. Genau eine erwachsene Person mit vollem Namen (auch „Name, Vorname“, „V. Name“, Mail-Adresse)
  const genannt = ns.filter((x) => !istKind(x.p) && (x.voll || x.kurz));
  if (genannt.length === 1 && !beide) return w(voll(genannt[0].p), genannt[0].voll && allein, genannt[0].voll ? "einziger voller Name aus dem Haushalt im Text" : `„${genannt[0].p.vorname[0]}. ${genannt[0].p.name}“ im Text`);
  if (genannt.length > 1) { const ang = genannt.filter((x) => x.anschrift); if (ang.length === 1 && !beide) return w(voll(ang[0].p), false, "im Anschriftfeld genannt"); }
  // 7. Kennzeichen eines eigenen Fahrzeugs: Halter, wenn hinterlegt; sonst nur das Fahrzeug
  for (const f of h.fahrzeuge || []) {
    const roh = typeof f === "string" ? f : f.kennzeichen;
    const kz = roh?.match(KZ)?.[0] || roh;
    if (!kz || !kurz(t).includes(kurz(kz))) continue;
    if (typeof f !== "string" && f.halter) return w(f.halter, true, `Kennzeichen ${kz}`);
    if (h.personen.length === 1) return w(voll(h.personen[0]), true, `Kennzeichen ${kz}, einzige Person im Haushalt`);
    if (genannt.length === 0) { const nurVorname = ns.filter((x) => !istKind(x.p) && x.vorname); if (nurVorname.length === 1) return w(voll(nurVorname[0].p), false, `Kennzeichen ${kz}, Vorname im Text`); }
    return genannt.length ? undefined : w(`Fahrzeug ${kz}`, false, `Kennzeichen ${kz}`);
  }
  if (genannt.length > 1 || beide) return betrifft && /^familie\b/i.test(betrifft) ? w(`Familie ${h.name.replace(/^familie\s+/i, "")}`, true, "an die Familie gerichtet") : undefined;
  if (betrifft && /^familie\b/i.test(betrifft)) return w(`Familie ${h.name.replace(/^familie\s+/i, "")}`, true, "an die Familie gerichtet");
  // 8. Nur ein Vorname eines Erwachsenen
  const nurVorname = ns.filter((x) => !istKind(x.p) && x.vorname);
  if (nurVorname.length === 1) return w(voll(nurVorname[0].p), false, `Vorname „${nurVorname[0].p.vorname}“ im Text`);
  // 9. Haushalt mit einer einzigen Person: es kann nur um sie gehen – ohne Namen im Text aber nie sicher
  if (h.personen.length === 1) return w(voll(h.personen[0]), false, "einzige Person im Haushalt, kein Name im Text");
  return undefined;
}
