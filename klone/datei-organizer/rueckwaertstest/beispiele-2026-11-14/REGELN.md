# Rückwärtsprüfung der Needs-Beispiele, Lauf K3 (14.11.2026) — Regeln, vorab festgelegt

Auftrag Klaus 14.11.: „die neuen Beispiele sind nicht wie die 4 Pro-Apps rückgeprüft … Wolltest du das nicht noch machen?“
Es gelten die Regeln aus `../REGELN.md` (Grenze ≥ 80 % der Kern-Merkmale, kein Kern-Merkmal verkehrt, zwei Bewerter, die strengere
Wertung zählt). Neu oder anders in diesem Lauf:

- **Was geprüft wird:** die 14 Beispiele aus fertigen Apps in Workflow Needs (Stand main nach PR #38, mit Rahmen 1/2 und
  `beispiel-rahmen.js`). Es gibt keine simulierten Kunden: der Bauauftrag kommt direkt aus dem Beispiel
  (`werkzeug/beispiel-auftrag.mjs`, unveränderter Needs-Code). Das prüft die **Beispiele**, nicht Needs’ Fragen.
- **Referenz:** für die vier Pro-Apps die eingefrorenen `../<app>/REFERENZ.json` vom 13.11. (unverändert). Für die neun weiteren
  Apps je eine neue `REFERENZ.json`, geschrieben von einem Agenten aus dem Repo, der das Beispiel in Needs und diesen Ordner **nicht**
  liest; sie ist fertig, bevor ein Bewerter läuft. Für den Pro-Verbund die Vereinigung der vier Pro-Referenzen (Kennungen mit Präfix).
- **Bau:** je Beispiel ein frischer Agent, der nur `bauauftrag.md` liest und einen Bauplan schreibt (kein Code). Er sieht keine
  Referenz und kein Repo (per Anweisung, nicht technisch erzwungen).
- **Bewerten:** zwei Bewerter-Agenten, jeder sieht Referenz und Bauplan, nicht den anderen Bewerter.
- **Benannte Grenze:** Die Bauaufträge nennen Partner-Apps beim Namen (z. B. „Belege aus Workflow PDF Pro“) und manchmal den
  eigenen (Rezeptbuch, BookLedgerPro, Needs). Das ist echter Inhalt; der Bau-Agent darf die Repos trotzdem nicht lesen.
- Je Beispiel ein Lauf. Ein Lauf schwankt nach dem 13.11. um rund 10 Punkte (`../ERGEBNIS.md`).
