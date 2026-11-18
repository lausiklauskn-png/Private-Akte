# Abschluss – Bank im Portemonnaie, CSV/Excel/Monatsdatei in BookLedgerPro (18.11.2026, Private Akte 0.8.0)

Grundlage: `docs/PLAN_2026-11-18_PORTEMONNAIE-BANK-BOOKLEDGER.md`, Abschnitte 5 und 6 (Klaus' Entscheidungen vom 18.11.).
Alle drei Repos auf dem Zweig `claude/portemonnaie-bank-integration-qvmebl`, je ein Entwurfs-PR. **Nichts zusammengeführt, nichts
veröffentlicht** – `main` geht in allen drei Repos über GitHub Pages hinaus, das braucht Klaus' Wort.

## Gebaut

**BookLedgerPro (PR #480)** – Schritt B1–B3:
- `src/domain/bankCsv.js`: CSV lesen, Trennzeichen/Dezimal/Datumsform erraten, Kopfzeile unter Kontoangaben finden, Spalten-Zuordnung als JSON
  (Datum; Betrag oder Soll/Haben oder Betrag + S/H; Text; Gegenseite; Saldo; Konto), an den Spaltennamen wiedergefunden; Windows-1252;
  `umsatzSchluessel` gegen Doppeltes. Ergebnis wie `parseBankauszug`.
- `src/domain/xlsxZeilen.js`: .xlsx ohne fremdes Paket (`DecompressionStream`), Datumszellen, 1904; altes .xls → „als CSV speichern“.
- `src/domain/portemonnaieImport.js`: Monatsdatei `portemonnaie-monat` Fassung 1 – schreiben (für die Akte), lesen, prüfen, → Buchungs-Entwürfe
  (Kasse 1000 / Bank 1200 gegen 1800/1890; Barabhebung Kasse an Bank nur einmal; „nur Bargeld“).
- Belege → „Bankauszug einlesen“ nimmt .csv/.xlsx/.json; Zuordnung änderbar und gemerkt; Monatsdatei → „Als Entwürfe anlegen“. `sw.js` v309.
- Proben: `run.mjs` 2965/0 · `smoke_bankcsv` 13 · `smoke_design` 92. CI grün.

**BookLedger-Basic (PR #57):** Nachzug Pro `3c01ddb` über `tools/pro-nachziehen.mjs`. `basic_gleichstand` 27 · `run.mjs` 2958/0 · `smoke_bankcsv` 13. CI grün.

**Private Akte 0.8.0** (dieser Zweig): Klon `klone/bookledger` erweitert (`--nur`, 10 Dateien, @ `3c01ddb`, `--pruefen` grün), `T().bank` in
`src/tresor.ts`, Fach „Bank“ im Portemonnaie, „An BookLedgerPro geben“ = Monatsdatei, „Als Tabelle“ = CSV. Einzelheiten in `CLAUDE.md` (0.8.0).
Probe `tests/probe.cjs` mit erfundenen MT940-, CAMT- und CSV-Dateien.

## Offen / nicht gebaut

- **Pins auf Zweig-Commit:** `klone/bookledger` und Basic zeigen auf `3c01ddb` (Pro-Zweig). Nach dem Merge von Pro #480 (als Merge-Commit, dann bleibt
  der Hash gleich) Basic und Akte auf Pro-main neu pinnen.
- Konto umbenennen und Konto herausnehmen haben keinen Knopf (`kontoEntfernen` ist gebaut).
- Excel- und PDF-Auszug in der Akte nur über die Bausteine geprüft (in BookLedgerPro mit Excel im Browser), nicht in der Akten-Probe.
- Dieselbe Buchung aus zwei verschiedenen Verfahren (CSV und MT940) wird nicht als doppelt erkannt (der Text weicht ab).
- BookLedgerPro merkt die Zuordnung je Kopfzeile, nicht je Konto (es kennt kein Konto-Objekt).
- Nicht in dieser Runde (Plan): FinTS, PSD2, Mails der Bank, alte .xls.
- Kein echter Bankexport, nicht am Tablet.

## Stundennachweis

Sitzung am 18.11.2026 abends, ein Block (erste Spur: Lesen des Plans, letzte Spur: dieser Brief); Obergrenze rund 2 ½ Stunden. Klaus' eigene Angabe geht vor.

## Startauftrag zum Einfügen

```
Repos: Private-Akte, BookLedgerPro, BookLedger-Basic (Zweig claude/portemonnaie-bank-integration-qvmebl, je ein Entwurfs-PR: Akte, Pro #480, Basic #57).
Lies zuerst Private-Akte/CLAUDE.md (Abschnitt 0.8.0), dann Private-Akte/docs/BRIEF_ABSCHLUSS_2026-11-18_BANK-0.8.0.md.
Erst mit Klaus: Vorschau 0.8.0 ansehen (Portemonnaie → Bank), dann sein Ja zum Zusammenführen.
Nach dem Merge von Pro #480: Basic auf Pro-main neu pinnen (tools/pro-nachziehen.mjs), Akte klone/bookledger mit --stand <main> --nur (gleiche 10 Dateien) neu pinnen, --pruefen.
Danach: Konto umbenennen/herausnehmen als Knopf; Excel/PDF in die Akten-Probe.
Nicht: FinTS, PSD2, Mails der Bank, echte Kontodaten im Repo, Erklärsätze auf der Oberfläche, Klone von Hand ändern.
```
