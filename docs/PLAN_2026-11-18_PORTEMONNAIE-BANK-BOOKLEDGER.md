# Plan – Portemonnaie, Bank, BookLedgerPro (18.11.2026, Private Akte 0.7.7)

Grundlage: `docs/BRIEF_PLANSITZUNG_2026-11-19_BANK-PORTEMONNAIE-BOOKLEDGER.md`. **Plan, nichts gebaut.** Klaus hat am 18.11. abends
entschieden (Abschnitt 5); der Bauauftrag (Abschnitt 6) gilt.

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

## 5. Entschieden und offen

**Entschieden (Klaus 18.11., zu Frage 1):** keine feste Bank, niemand wird festgebunden – die App soll einmal frei oder auf dem
Markt erhältlich sein. Jeder legt sein Konto selbst an und wählt selbst, wie die Umsätze hineinkommen:

- **Konto anlegen:** Name der Bank frei eingetippt, Name des Kontos (z. B. „Girokonto“), IBAN freiwillig (gezeigt nur die letzten
  vier Stellen), Anfangssaldo, **Verfahren** zur Auswahl: von Hand · CSV · CAMT · MT940 · PDF · Excel. Mehrere Konten möglich, das
  Verfahren lässt sich je Konto jederzeit ändern; beim Einlesen wird es vorgewählt, aber nichts sperrt eine andere Datei.
- **Von Hand:** Umsatz eintragen wie beim Bargeld (Tag, Betrag, rein/raus, Text). Geht immer, auch neben einem Import.
- **CAMT / MT940:** fertig in BookLedgerPro (`bankimport.js`), nur anschließen.
- **CSV:** jede Bank schreibt andere Spalten. Darum keine Liste von Banken, sondern **Spalten zuordnen**: beim ersten Einlesen zeigt
  die App die ersten Zeilen, der Nutzer tippt an, welche Spalte Datum, Betrag (oder Soll/Haben), Text und Gegenseite ist;
  Trennzeichen, Dezimalkomma und Datumsform werden erraten und lassen sich ändern. Die Zuordnung wird **am Konto gemerkt** – das
  nächste Mal geht es ohne Fragen. Rein gebaut in BookLedgerPro (`src/domain/bankCsv.js`), damit Akte, Basic und Pro denselben
  Leser haben.
- **Excel (.xlsx):** wird zuerst in Zeilen gelesen, dann dieselbe Spalten-Zuordnung wie CSV. Kein fremdes Paket (BookLedgerPro ist
  build-frei): .xlsx ist ein ZIP mit XML, der Browser entpackt es selbst (`DecompressionStream`). Alte .xls nicht – dort „als CSV
  speichern“ empfehlen.
- **PDF:** `auszugText.js` aus BookLedgerPro liest Auszüge als Text; dort hinter dem Vorschau-Schalter (89 % ganz richtig,
  Grenze 90 %). In der Akte darum als **Vorschlag**: die gelesenen Umsätze stehen zum Prüfen da, jede Zeile änderbar, übernommen
  erst auf Tipp; ein Saldo, der nicht aufgeht, steht rot dabei.
- Für alle Verfahren gleich: doppelte Umsätze nur einmal, Saldo gegenrechnen wo möglich, der eingelesene Auszug wird Unterlage.

**Ebenfalls entschieden (Klaus 18.11.):**

- **Bank als zweites Fach im Portemonnaie** (neben Bargeld), wie in Abschnitt 3.
- **Übergabe an BookLedgerPro einmal im Monat**, als Monatsdatei (JSON Fassung 1, Abschnitt 4); BookLedgerPro macht daraus
  Entwürfe, festgeschrieben erst auf Tipp. Die CSV bleibt als „Als Tabelle“.

**Noch offen (nicht dringend):** FinTS für Banken, die es anbieten; Mails der Bank als Hinweis (braucht die Übergabe-Stelle in
Private Brain); ob das Portemonnaie später eine eigene App wird.

## 6. Bauauftrag für die nächste Sitzung (von Klaus freigegeben 18.11.)

**Schritt A – Private-Akte, „Bank“ im Portemonnaie (0.8.0):**
1. `klone/bookledger` erweitern: `node tools/klon-nachziehen.mjs bookledger --quelle ../BookLedgerPro --stand <main> --nur
   src/domain/money.js,src/domain/kassenbuch.js,src/domain/bankimport.js,src/domain/bankschema.js,src/domain/auszugText.js,src/domain/vorschau.js,LICENSE`,
   dann `--pruefen`.
2. `src/tresor.ts`: `T().bank` – `einlesen(datei)` (parse + prüfen + doppelte), `liste(monat)`, `herausnehmen(id)`; Auszug als
   Unterlage mit Verknüpfung. `npm run bau`, `bau:pruefen`.
3. `app.js`: Fach „Bank“ im Portemonnaie; „+ Konto“ (Bank, Kontoname, IBAN freiwillig, Anfangssaldo, Verfahren); Umsatz von
   Hand; „Kontoauszug einlesen“ (CAMT/MT940 sofort, CSV/Excel/PDF sobald Schritt B sie liefert); Monatsabschluss mit Summe;
   Barabhebung „vom Konto“.
4. Probe: gestellte MT940- und CAMT-Datei (erfunden, keine echten Daten), doppelt eingelesen → nichts doppelt, Saldo falsch → rot,
   Monatsabschluss rechnet.

**Schritt B – BookLedgerPro (eigener PR dort, danach Basic nachziehen):**
1. `src/domain/portemonnaieImport.js` (rein): JSON Fassung 1 lesen → Buchungsentwürfe; Probe in `tests/run.mjs`.
2. Einstieg unter Belege/Import („Portemonnaie-Monat einlesen“), Entwürfe wie beim Bankimport.
3. `src/domain/bankCsv.js` (rein): Trennzeichen/Dezimal/Datum erraten, Spalten-Zuordnung anwenden → dasselbe Umsatz-Modell wie
   `parseBankauszug`; `src/domain/xlsxZeilen.js` (rein, ZIP über `DecompressionStream`) → Zeilen für denselben Leser. Proben mit
   erfundenen Dateien im Aufbau mehrerer Banken. Danach Akte: beide über den Klon hereinholen.

**Danach Akte:** „An BookLedgerPro geben“ schreibt das JSON (CSV bleibt als „Als Tabelle“).

**Nicht in dieser Runde:** FinTS, PSD2, Mails der Bank, alte .xls-Dateien.

**Reihenfolge:** erst Schritt B1–B3 in BookLedgerPro (Leser für Monatsdatei, CSV, Excel; PR dort, danach Basic nachziehen), dann
Schritt A in der Akte mit allen Verfahren, zuletzt „An BookLedgerPro geben“ als Monatsdatei. Wird nicht alles fertig: Brief schreiben.

## Startauftrag zum Einfügen

```
Repos: Private-Akte, BookLedgerPro, BookLedger-Basic (Zweig laut Sitzung).
Lies zuerst Private-Akte/CLAUDE.md, dann Private-Akte/docs/PLAN_2026-11-18_PORTEMONNAIE-BANK-BOOKLEDGER.md (Abschnitte 5 und 6).
Klaus hat entschieden: Bank als zweites Fach im Portemonnaie; jedes Konto frei angelegt (Bankname, Kontoname, IBAN freiwillig,
Anfangssaldo, Verfahren: von Hand, CSV, CAMT, MT940, PDF, Excel); Übergabe an BookLedgerPro einmal im Monat als Monatsdatei.
Erst BookLedgerPro: src/domain/portemonnaieImport.js, bankCsv.js (Spalten zuordnen, am Konto gemerkt), xlsxZeilen.js – rein,
build-frei, Proben in tests/run.mjs mit erfundenen Dateien; PR, dann Basic nachziehen (tools/pro-nachziehen.mjs).
Dann Akte 0.8.0: klone/bookledger per tools/klon-nachziehen.mjs --nur erweitern (nie von Hand), T().bank in src/tresor.ts,
Fach „Bank“ in app.js, Probe in tests/probe.cjs.
Nicht: FinTS, PSD2, Mails der Bank, echte Kontodaten im Repo, Erklärsätze auf der Oberfläche, Klone von Hand ändern.
Was nicht fertig wird: Brief schreiben.
```

## Grenzen

Nicht an einer echten Bank, nicht mit einem echten Auszug geprüft. Angaben zu FinTS-Registrierung und PSD2 nicht frisch
nachgelesen. Das JSON-Format ist ein Vorschlag.
