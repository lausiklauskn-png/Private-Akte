// Rechnung des kleinen Kontomodells: rein, ohne Dateien, ohne Abhängigkeiten – läuft in Node und im Browser.
// Merkmale = Wörter (und Wortpaare) eines Belegs; Modell = Naive Bayes mit je Klasse den aussagekräftigsten Merkmalen.

const STOPP = new Set("der die das und oder für von vom mit bei den dem des ein eine einer eines einem einen ist sind wird wurde werden auf aus zum zur nach bis über unter ihre ihr ihrem ihren ihres wir sie uns unser unsere unserer bitte danke vielen dank gmbh kg ohg ag mbh inh inhaber inhaberin tel telefon fax mail www http https iban bic bank konto blz str straße strasse weg platz allee ring nr no seite datum eur euro betrag summe gesamt netto brutto mwst ust umsatzsteuer steuernummer ustidnr idnr usb".split(" "));

/** Wörter eines Belegs: klein, nur Buchstaben, ab drei Zeichen; der eigene Betriebsname zählt nicht mit. */
export function woerter(text, eigenerName = "") {
  const eigen = new Set(String(eigenerName).toLowerCase().match(/[a-zäöüß]{3,}/g) || []);
  return (String(text).toLowerCase().match(/[a-zäöüß]{3,}/g) || []).filter((w) => !STOPP.has(w) && !eigen.has(w));
}
/** Merkmale: jedes Wort einmal, dazu benachbarte Wortpaare und der erkennbare Steuersatz. */
export function merkmale(text, eigenerName = "", paare = true) {
  const w = woerter(text, eigenerName), m = new Set(w);
  if (paare) for (let i = 0; i + 1 < w.length; i++) m.add(w[i] + " " + w[i + 1]);
  const t = String(text);
  if (/(?<![\d,.])19(?:[.,]0{1,2})?\s?%/.test(t)) m.add("§satz19");
  if (/(?<![\d,.])7(?:[.,]0{1,2})?\s?%/.test(t)) m.add("§satz7");
  return [...m];
}

/**
 * Lernt das Modell. belege: [{gruppe, konto, merkmale[]}]
 * minGruppen: ein Merkmal zählt nur, wenn es in so vielen verschiedenen Gruppen (Gewerben) vorkommt – hält Firmennamen und Orte heraus.
 * proKlasse: je Konto bleiben nur die aussagekräftigsten Merkmale (kleines Modell).
 */
export function trainiere(belege, { minGruppen = 2, proKlasse = 400, glatt = 0.5, schnitt = 0.5 } = {}) {
  const konten = [...new Set(belege.map((b) => b.konto))].sort();
  const gruppenJe = new Map(), zahlJe = new Map(), klassenZahl = Object.fromEntries(konten.map((k) => [k, 0]));
  for (const b of belege) {
    klassenZahl[b.konto]++;
    for (const f of b.merkmale) {
      if (!gruppenJe.has(f)) { gruppenJe.set(f, new Set()); zahlJe.set(f, {}); }
      gruppenJe.get(f).add(b.gruppe); const z = zahlJe.get(f); z[b.konto] = (z[b.konto] || 0) + 1;
    }
  }
  const N = belege.length, behalten = new Set();
  const logit = (f, k) => {            // wie viel wahrscheinlicher ist das Merkmal in Klasse k als außerhalb
    const z = zahlJe.get(f), inK = z[k] || 0, gesamt = Object.values(z).reduce((a, b) => a + b, 0);
    const pIn = (inK + glatt) / (klassenZahl[k] + 2 * glatt), pAus = (gesamt - inK + glatt) / (N - klassenZahl[k] + 2 * glatt);
    return Math.log(pIn / pAus);
  };
  const kandidaten = [...gruppenJe.keys()].filter((f) => gruppenJe.get(f).size >= minGruppen);
  for (const k of konten) {
    kandidaten.map((f) => [f, logit(f, k) * Math.log(1 + (zahlJe.get(f)[k] || 0))]).filter(([, s]) => s > 0).sort((a, b) => b[1] - a[1]).slice(0, proKlasse).forEach(([f]) => behalten.add(f));
  }
  // Sparsam ablegen: je Merkmal zählt nur der Abstand zum mittleren Wert über alle Konten (das ändert weder die Reihenfolge
  // noch den Abstand der Konten); kleine Abstände fallen weg. So bleiben je Merkmal wenige Zahlen statt einer je Konto.
  const gewichte = {};
  for (const f of behalten) {
    const w = konten.map((k) => logit(f, k)), mitte = [...w].sort((x, y) => x - y)[Math.floor(w.length / 2)];
    const duenn = []; w.forEach((v, i) => { const d = Math.round((v - mitte) * 10) / 10; if (Math.abs(d) >= schnitt) duenn.push(i, d); });
    if (duenn.length) gewichte[f] = duenn;
  }
  return { fassung: 2, konten, vorab: konten.map((k) => Math.round(Math.log((klassenZahl[k] + 1) / (N + konten.length)) * 100) / 100), gewichte, belege: N };
}

/** Vorhersage: bestes Konto, Abstand zum zweitbesten (Maß für Sicherheit) und die drei stärksten Merkmale als Begründung. */
export function vorhersage(modell, merkmaleDesBelegs) {
  const s = modell.vorab.slice(), treffer = [];
  for (const f of merkmaleDesBelegs) { const g = modell.gewichte[f]; if (!g) continue; treffer.push(f); for (let i = 0; i < g.length; i += 2) s[g[i]] += g[i + 1]; }
  let a = 0; for (let i = 1; i < s.length; i++) if (s[i] > s[a]) a = i;
  let b = -1; for (let i = 0; i < s.length; i++) if (i !== a && (b < 0 || s[i] > s[b])) b = i;
  const wert = (f) => { const g = modell.gewichte[f]; for (let i = 0; i < g.length; i += 2) if (g[i] === a) return g[i + 1]; return 0; };
  const grund = treffer.map((f) => [f, wert(f)]).sort((x, y) => y[1] - x[1]).slice(0, 3).map(([f]) => f);
  return { konto: modell.konten[a], zweites: modell.konten[b], abstand: treffer.length ? s[a] - s[b] : 0, merkmale: treffer.length, grund };
}
