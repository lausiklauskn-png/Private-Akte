// Erzeugt aus Datei-Organizer lib/personen.ts (scripts/kern-js.mjs). Nicht von Hand ändern.
const voll = (p) => `${p.vorname} ${p.name}`;
const kurz = (s) => s.toLowerCase().replace(/[^a-z0-9äöüß]/g, "");
const w = (wert, sicher, grund) => ({ wert, sicher, grund, quelle: "regel" });
const B = "A-Za-z\xC4\xD6\xDC\xE4\xF6\xFC\xDF";
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const KZ = /[A-ZÄÖÜ]{1,3}[- ][A-Z]{1,2}[ -]?\d{1,4}[EH]?/;
const ROLLE = "patient(?:in)?|pat\\.|sch\xFCler(?:in)?|kind|versicherte[rs]?(?: person)?|versicherungsnehmer(?:in)?|mitglied|teilnehmer(?:in)?|karteninhaber(?:in)?|kontoinhaber(?:in)?|auszubildende[r]?|reisende[r]?|fahrer(?:in)?|halter(?:in)?|arbeitnehmer(?:in)?|mitarbeiter(?:in)?|antragsteller(?:in)?|steuerpflichtige[r]?|name|f\xFCr|betrifft|betr\\.";
function nennung(t, p, eindeutigInitial) {
  const v = esc(p.vorname), n = esc(p.name), i = esc(p.vorname[0]);
  const voll2 = new RegExp(`(?<![${B}])${v}(?:\\s+[A-Z\xC4\xD6\xDC][${B}-]+)?\\s+${n}(?![${B}])|(?<![${B}])${n},\\s*${v}(?![${B}])|(?<![${B}.])${v}[._-]?${n}@`, "i").test(t);
  const kurz2 = eindeutigInitial && new RegExp(`(?<![${B}])${i}\\.\\s?${n}(?![${B}])|(?<![${B}])${n},\\s*${i}\\.`).test(t);
  const vorname = new RegExp(`(?<![${B}])${v}s?(?![${B}])`).test(t);
  const rolle = new RegExp(`(?:${ROLLE})\\s*:\\s*(?:(?:herrn?|frau)\\s+)?(?:${v}(?![${B}])|${n},\\s*${v})|(?:${ROLLE.replace("|name|f\xFCr|betrifft|betr\\.", "")})\\s+${v}\\s+${n}`, "i").test(t);
  const anrede = new RegExp(`(?:^|\\n)\\s*(?:mein[e]?\\s+)?(?:lieber?|hallo|hi|hey|moin|servus|guten\\s+(?:tag|morgen|abend))[ ,]+(?:(?:herr|frau)\\s+)?${v}(?![${B}])`, "i").test(t);
  const anschrift = new RegExp(`(?:^|\\n)\\s*(?:herrn?|frau)\\s*\\n?\\s*(?:dr\\.\\s+)?(?:${v}|${i}\\.)\\s+${n}(?![${B}])(?!\\s+und\\b)`, "i").test(t);
  return { p, voll: voll2, kurz: kurz2, vorname, rolle, anrede, anschrift };
}
function personZuordnen(text, betrifft, h) {
  if (!h?.personen?.length) return void 0;
  const t = text || "";
  const initialEinmal = (p) => h.personen.filter((x) => x.name === p.name && x.vorname[0] === p.vorname[0]).length === 1;
  const ns = h.personen.map((p) => nennung(t, p, initialEinmal(p)));
  const istKind = (p) => /kind/i.test(p.anrede);
  for (const n of h.nummern || []) if (n.wert && kurz(t).includes(kurz(n.wert))) return w(n.person, true, `Nummer ${n.wert} geh\xF6rt zu ${n.person}`);
  const mitRolle = ns.filter((x) => x.rolle);
  if (mitRolle.length === 1) return w(voll(mitRolle[0].p), true, `\u201E${mitRolle[0].p.vorname}\u201C ausdr\xFCcklich genannt (Rolle)`);
  const kinder = ns.filter((x) => istKind(x.p) && (x.voll || x.vorname));
  if (kinder.length === 1) return w(voll(kinder[0].p), kinder[0].voll, kinder[0].voll ? `${voll(kinder[0].p)} im Text, einziges genanntes Kind` : `Vorname \u201E${kinder[0].p.vorname}\u201C im Text, einziges genanntes Kind`);
  const angeredet = ns.filter((x) => x.anrede);
  if (angeredet.length === 1) return w(voll(angeredet[0].p), true, `Anrede mit Vornamen \u201E${angeredet[0].p.vorname}\u201C`);
  const erwachsene = h.personen.filter((p) => !istKind(p));
  const beide = /sehr geehrte frau [^\n]{0,40}(?:,|und)\s*(?:sehr geehrter )?herr\b|sehr geehrter herr [^\n]{0,40}(?:,|und)\s*(?:sehr geehrte )?frau\b|herrn und frau|frau und herrn|eheleute|(?:^|\n)\s*(?:familie|fam\.)\s/i.test(t);
  const allein = erwachsene.length <= 1;
  if (betrifft && !beide) {
    const m = betrifft.match(/^(herr|frau)\s+(?:dr\.\s+)?(.+)$/i);
    if (m) {
      const passend = erwachsene.filter((p) => p.anrede.toLowerCase() === m[1].toLowerCase() && m[2].toLowerCase().includes(p.name.toLowerCase()));
      if (passend.length === 1) return w(voll(passend[0]), allein, `${betrifft} \u2013 einzige ${m[1].toLowerCase() === "herr" ? "m\xE4nnliche" : "weibliche"} erwachsene Person im Haushalt${allein ? "" : "; nur Empf\xE4nger, gemeinsame Sache m\xF6glich"}`);
      if (passend.length > 1) {
        const mitVorname = passend.filter((p) => new RegExp(`(?<![${B}])${esc(p.vorname)}(?![${B}])`).test(t));
        if (mitVorname.length === 1) return w(voll(mitVorname[0]), true, `${betrifft}, Vorname im Text`);
        return w(betrifft, false, `${passend.length} Personen passen zu \u201E${betrifft}\u201C`);
      }
    }
    const direkt = h.personen.find((p) => betrifft.toLowerCase() === voll(p).toLowerCase());
    if (direkt) return w(voll(direkt), true, "Name aus dem Schreiben");
  }
  const genannt = ns.filter((x) => !istKind(x.p) && (x.voll || x.kurz));
  if (genannt.length === 1 && !beide) return w(voll(genannt[0].p), genannt[0].voll && allein, genannt[0].voll ? "einziger voller Name aus dem Haushalt im Text" : `\u201E${genannt[0].p.vorname[0]}. ${genannt[0].p.name}\u201C im Text`);
  if (genannt.length > 1) {
    const ang = genannt.filter((x) => x.anschrift);
    if (ang.length === 1 && !beide) return w(voll(ang[0].p), false, "im Anschriftfeld genannt");
  }
  for (const f of h.fahrzeuge || []) {
    const roh = typeof f === "string" ? f : f.kennzeichen;
    const kz = roh?.match(KZ)?.[0] || roh;
    if (!kz || !kurz(t).includes(kurz(kz))) continue;
    if (typeof f !== "string" && f.halter) return w(f.halter, true, `Kennzeichen ${kz}`);
    if (h.personen.length === 1) return w(voll(h.personen[0]), true, `Kennzeichen ${kz}, einzige Person im Haushalt`);
    if (genannt.length === 0) {
      const nurVorname2 = ns.filter((x) => !istKind(x.p) && x.vorname);
      if (nurVorname2.length === 1) return w(voll(nurVorname2[0].p), false, `Kennzeichen ${kz}, Vorname im Text`);
    }
    return genannt.length ? void 0 : w(`Fahrzeug ${kz}`, false, `Kennzeichen ${kz}`);
  }
  if (genannt.length > 1 || beide) return betrifft && /^familie\b/i.test(betrifft) ? w(`Familie ${h.name.replace(/^familie\s+/i, "")}`, true, "an die Familie gerichtet") : void 0;
  if (betrifft && /^familie\b/i.test(betrifft)) return w(`Familie ${h.name.replace(/^familie\s+/i, "")}`, true, "an die Familie gerichtet");
  const nurVorname = ns.filter((x) => !istKind(x.p) && x.vorname);
  if (nurVorname.length === 1) return w(voll(nurVorname[0].p), false, `Vorname \u201E${nurVorname[0].p.vorname}\u201C im Text`);
  if (h.personen.length === 1) return w(voll(h.personen[0]), false, "einzige Person im Haushalt, kein Name im Text");
  return void 0;
}
export {
  personZuordnen
};
