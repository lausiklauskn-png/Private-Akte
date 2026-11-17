// Wie Regeln (categorize) und Wortmodell zusammen ein Konto ergeben. Rein, ohne Dateien – dieselbe Fassung für Messung und App.
const ERLOESE = new Set(["8120", "8125", "8300", "8400", "8500"]);
/**
 * regel: Ergebnis von categorize ({konto, richtung, confidence}); modell: Ergebnis von vorhersage ({konto, zweites, abstand, merkmale}).
 * eigen: der eigene Firmenname steht im Briefkopf (Ausgangsbeleg). nameBekannt: ein Firmenname ist hinterlegt.
 */
export function kombiniere(regel, modell, { schwelle = 2, schwelleOhneHinweis = 1, eigen = false, nameBekannt = false } = {}) {
  const mErloes = ERLOESE.has(modell.konto), rErloes = ERLOESE.has(regel.konto);
  // 1. Die Richtung entscheidet der Briefkopf, wenn der Firmenname bekannt ist: ein eigener Beleg ist nie ein Aufwand und umgekehrt.
  if (nameBekannt) {
    if (eigen && !mErloes && regel.richtung === "einnahme") return { ...regel, quelle: "regeln (eigener Beleg)" };
    if (!eigen && mErloes && regel.richtung !== "einnahme") return { ...regel, quelle: "regeln (fremder Beleg)" };
  }
  // 2. Das Modell gilt, wenn es etwas erkannt hat und sein Abstand zum zweiten Konto groß genug ist …
  if (modell.merkmale > 0 && modell.abstand >= schwelle) return { konto: modell.konto, richtung: mErloes || modell.konto === "1890" ? "einnahme" : "ausgabe", quelle: "modell" };
  // 3. … sonst die Regeln, außer sie wissen selbst nichts (Sammelkonto) – dann doch das Modell.
  if (regel.konto === "4980" && modell.merkmale > 0 && modell.abstand >= schwelleOhneHinweis) return { konto: modell.konto, richtung: mErloes || modell.konto === "1890" ? "einnahme" : "ausgabe", quelle: "modell (Regeln ohne Hinweis)" };
  return { ...regel, quelle: "regeln" };
}
