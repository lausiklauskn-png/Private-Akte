# Plan – Portemonnaie, Bank, BookLedgerPro (18.11.2026, Private Akte 0.7.7)

Grundlage: `docs/BRIEF_PLANSITZUNG_2026-11-19_BANK-PORTEMONNAIE-BOOKLEDGER.md`. **Plan, nichts gebaut.** Wo Klaus' Antwort noch
fehlt, steht ein Vorschlag mit „wartet auf Klaus“.

## 1. Befund: was in BookLedgerPro schon fertig ist

Nachgesehen in BookLedgerPro @ `9df9bee` – mehr, als der Brief annahm:

| Baustein | Datei | Stand |
|---|---|---|
| Kontoauszug **MT940** und **CAMT .052/.053/.054** lesen | `src/domain/bankimport.js` (`parseBankauszug`, `parseMT940`, `parseCAMT`) | rein, ohne Netz und DOM, node-geprüft |
| Saldo gegenrechnen (Anfang ± Umsätze = Schluss) | `pruefeBankauszug` | fertig |
| Formate prüfen (SWIFT-/ISO-20022-Struktur) | `src/domain/bankschema.js` (`validiereBankauszug`) | fertig |
| Kontoauszug als **PDF-Text** / Texterkennung → Umsätze | `src/domain/auszugText.js` | hinter Vorschau-Schalter, ab Werk **aus** (89 % richtig, Grenze 90 %) |
| Rechnen mit Cent, Kassenbericht | `money.js`, `kassenbuch.js` | schon als Klon in der Akte (`klone/bookledger`) |
| **CSV** der Banken (Sparkasse, Volksbank, DKB …) | – | **fehlt** |
| Portemonnaie-CSV der Akte einlesen | – | **fehlt** (BookLedgerPro kennt das Format nicht) |
| FinTS / PSD2 | – | nicht gebaut; Bauplan BLP 09.11.: „Stufe 3, später, offen“ (J6, Klaus: Ja) |

Folge: **Weg 1 (Kontoauszug einlesen) ist in der Akte fast nur Anschluss** – `bankimport.js`, `bankschema.js`, `auszugText.js`,
`vorschau.js` kommen über `tools/klon-nachziehen.mjs bookledger --nur …` dazu (alle vier rein, nur untereinander und an `money.js`
gebunden). Nichts davon neu schreiben (Regel „Klone nie von Hand ändern“).

## 2. Die Wege – Empfehlung

1. **Kontoauszug einlesen (MT940/CAMT, später CSV)** – zuerst. Geht in Basic, Akte und APK gleich, kein Zugang zur Bank, Daten
   bleiben auf dem Gerät. Die meisten deutschen Banken bieten im Online-Banking CAMT.053 oder MT940 an; wo nur CSV geht, braucht
   es einen CSV-Leser (in BookLedgerPro bauen, nicht in der Akte – ein Kern).
2. **Mails der Bank** – nur als **Hinweis** („laut Mail: −42,90 € Lastschrift, noch nicht im Auszug“), nie als Buchung. Erst, wenn
   Private Brain eine Übergabe-Stelle hat (fehlt, siehe CLAUDE.md 0.7.1).
3. **FinTS aus der APK** – erst, wenn Klaus' Bank FinTS anbietet **und** die Produktregistrierung bei der Deutschen Kreditwirtschaft
   geklärt ist (vor dem Bau frisch nachlesen; Angaben hier aus dem Wissen der Sitzung).
4. **PSD2-Kontoinformationsdienst** – nur, wenn 3 nicht geht (Fremddienst sieht die Umsätze, meist Kosten, Zustimmung erneuern).

## 3. Wie es in der Akte aussieht (Vorschlag)

- Im Portemonnaie zwei Fächer: **Bargeld** (wie heute) und **Bank**. Die Bank-Umsätze sind eigene Datensätze im Register
  (`payment` mit Merkmal `bank`, Konto = letzte vier Stellen der IBAN), der Kontoauszug selbst eine **Unterlage**
  („Bank & Finanzen“) mit Verknüpfung `payment → document „Kontoauszug“`.
- **Einlesen:** Datei wählen → `parseBankauszug` → `pruefeBankauszug`; stimmt der Saldo nicht, steht es dabei (rot), eingelesen
  wird trotzdem nur auf Tipp.
- **Doppelte:** gleiche Buchung nur einmal – Schlüssel aus Konto, Buchungsdatum, Betrag, Verwendungszweck (gekürzt). Ein zweiter
  Auszug desselben Zeitraums legt nichts doppelt an und sagt „N waren schon da“.
- **Bargeld ↔ Bank:** eine Barabhebung am Automaten steht in beiden Fächern (Bank −200, Bargeld +200). Vorschlag: im Bargeld als
  „vom Konto“ markieren und im Monatsabschluss nicht doppelt zählen.
- **Monatsabschluss:** Bargeld, Bank, Summe; je Fach Anfang, rein, raus, Ende (`kassenbericht`, schon da). Bei der Bank Ende =
  Schlusssaldo des letzten Auszugs; weicht die eigene Rechnung ab, steht es dabei.
- **Keine Erklärsätze** auf der Oberfläche (feste Regel); Farben des Portemonnaies.

## 4. Weitergabe an BookLedgerPro

- Heute: „An BookLedgerPro geben“ = CSV des Monats (Semikolon, Komma-Beträge), BookLedgerPro **liest sie nicht**.
- Vorschlag: **ein Format, ein Leser in BookLedgerPro** – „Portemonnaie-Monat“ als JSON (Fassung 1: Monat, Fächer, Posten mit Datum,
  Cent, Richtung, Text, Bon-/Auszug-Verweis; Anfangsbestand). BookLedgerPro macht daraus **Entwürfe** (Kasse 1000 bzw. Bank 1200
  gegen ein vorgeschlagenes Konto, `ai/categorize`), festgeschrieben erst auf Tipp. Bank-Umsätze kann BookLedgerPro auch direkt
  aus dem Auszug lesen (dort schon gebaut) – dann gibt die Akte nur das Bargeld weiter, damit nichts doppelt gebucht wird.
- Weg dorthin: Datei (Teilen/Herunterladen) in Basic und Akte; in der APK über das Tresor-Fach `Eingang-BookLedgerPro`
  (Bauplan BLP 09.11., Abschnitt 5).
- CSV bleibt als Ausgabe für Tabellen (Excel), nicht als Übergabe.

## 5. Fragen an Klaus (offen)

1. Welche Bank(en)? Gibt das Online-Banking **CAMT.053, MT940 oder nur CSV** aus? Bietet sie FinTS?
2. Reicht zuerst „Kontoauszug einlesen“ nach Bedarf?
3. Bank als zweites Fach im Portemonnaie (Vorschlag) oder nur in BookLedgerPro?
4. Schickt die Bank Mails je Abbuchung, und in welches Postfach von Private Brain?
5. Übergabe an BookLedgerPro als JSON mit Entwürfen (Vorschlag), Bank dort direkt aus dem Auszug?
6. Wohin am Ende: Portemonnaie der Akte (Vorschlag für privat), BookLedgerPro für den Betrieb?

## 6. Bauauftrag für die nächste Sitzung (wartet auf Klaus' Ja zu 2, 3, 5)

**Schritt A – Private-Akte, „Bank“ im Portemonnaie (0.8.0):**
1. `klone/bookledger` erweitern: `node tools/klon-nachziehen.mjs bookledger --quelle ../BookLedgerPro --stand <main> --nur
   src/domain/money.js,src/domain/kassenbuch.js,src/domain/bankimport.js,src/domain/bankschema.js,src/domain/auszugText.js,src/domain/vorschau.js,LICENSE`,
   dann `--pruefen`.
2. `src/tresor.ts`: `T().bank` – `einlesen(datei)` (parse + prüfen + doppelte), `liste(monat)`, `herausnehmen(id)`; Auszug als
   Unterlage mit Verknüpfung. `npm run bau`, `bau:pruefen`.
3. `app.js`: Fach „Bank“ im Portemonnaie, Knopf „Kontoauszug einlesen“, Monatsabschluss mit Summe; Barabhebung „vom Konto“.
4. Probe: gestellte MT940- und CAMT-Datei (erfunden, keine echten Daten), doppelt eingelesen → nichts doppelt, Saldo falsch → rot,
   Monatsabschluss rechnet.

**Schritt B – BookLedgerPro (eigener PR dort, danach Basic nachziehen):**
1. `src/domain/portemonnaieImport.js` (rein): JSON Fassung 1 lesen → Buchungsentwürfe; Probe in `tests/run.mjs`.
2. Einstieg unter Belege/Import („Portemonnaie-Monat einlesen“), Entwürfe wie beim Bankimport.
3. Optional: CSV-Leser für Bank-CSV, sobald Klaus' Bank und ihr Format bekannt sind (eine Beispieldatei mit erfundenen Werten).

**Danach Akte:** „An BookLedgerPro geben“ schreibt das JSON (CSV bleibt als „Als Tabelle“).

**Nicht in dieser Runde:** FinTS, PSD2, Mails der Bank, Auszug als PDF (bleibt hinter dem Schalter, bis BookLedgerPro ihn freigibt).

## Grenzen

Nicht an einer echten Bank, nicht mit einem echten Auszug geprüft. Angaben zu FinTS-Registrierung und PSD2 nicht frisch
nachgelesen. Das JSON-Format ist ein Vorschlag.
