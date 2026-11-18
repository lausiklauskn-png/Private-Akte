# Plan – Portemonnaie mit Bank, BookLedgerPro, Private Brain (Plansitzung 18.11.2026, Private Akte 0.7.7)

Ergebnis der Besprechung zum Brief `docs/BRIEF_PLANSITZUNG_2026-11-19_BANK-PORTEMONNAIE-BOOKLEDGER.md`. Nichts davon ist gebaut.

## Entschieden (Klaus 18.11.2026)

1. **Kontoauszug einlesen zuerst** (Weg 1): CSV oder CAMT aus dem Online-Banking, etwa einmal die Woche oder zum Monatsanfang.
   Der **Kontoauszug ist die Grundlage** – für den Kontostand, für den Abgleich und später für die Steuererklärung in BookLedgerPro.
2. **Das Portemonnaie liest den Auszug ein**, nicht BookLedgerPro getrennt. Portemonnaie und BookLedgerPro arbeiten nebeneinander
   und haben **immer dieselben Daten**: was im Portemonnaie eingelesen wird, hat BookLedgerPro auch – ohne zweites Einlesen.
3. **Portemonnaie ist das Nächste**, damit es abgehakt werden kann: Bargeld und Bank, Abgleich, Weitergabe an BookLedgerPro.
4. **BookLedgerPro getrennt und später:** es muss verbessert werden (noch nicht auf dem Stand, den Klaus erwartet) und bekommt dort
   **Open Banking** (Weg 2 FinTS in der nativen App; Weg 3 PSD2 nur, wenn FinTS nicht geht). Eigene Sitzung im Repo BookLedgerPro.
5. **Hauptaufgaben jetzt:** Portemonnaie, dann Private Brain. Datei-Organizer weitgehend fertig, Kalender da, Familienbüro eigene App.
6. **Durchlauf-Tools bleiben leer:** Datei-Organizer, Workflow PDF und Familienbüro halten nichts dauerhaft – was fertig ist, geht in
   die Akte. Bestand haben nur Akte, Kalender, Portemonnaie (tagesaktuell) und Private Brain.

## Wie „immer dieselben Daten“ gebaut wird (Vorschlag der Sitzung)

- **Eine Quelle, keine zwei Kopien:** die eingelesenen Umsätze liegen einmal im Tresor (Register, wie die Bargeld-Posten als
  `payment`, Fach „Bank“; das Original des Auszugs als Unterlage). Zwei Kopien, die sich gegenseitig abgleichen, laufen früher oder
  später auseinander.
- **Doppeltes Einlesen schadet nicht:** jede Buchung hat einen Schlüssel (bei CAMT die Referenz der Bank, sonst Buchungstag + Betrag
  + Verwendungszweck + Gegenkonto). Wer jede Woche den Auszug der letzten Wochen einliest, bekommt nur Neues dazu.
- **Abgleich:** der Auszug nennt den Kontostand (CAMT: Schlusssaldo; CSV oft in der Kopfzeile). Das Portemonnaie rechnet nach und
  zeigt „stimmt“ oder die Lücke. Monatsabschluss: Bargeld, Bank, Summe.
- **Zu BookLedgerPro, Stufe 1 (mit dem Portemonnaie):** „An BookLedgerPro geben“ gibt Bargeld **und** Bank des Monats als eine
  Datei, dazu den Original-Auszug unverändert. BookLedgerPro erkennt dieselben Schlüssel und nimmt nichts doppelt. Ein Knopf, kein
  zweites Einlesen. **Stufe 2 (mit dem gemeinsamen Speicher, siehe unten):** BookLedgerPro liest direkt denselben Tresor – dann ist
  es wirklich ohne Zutun gleich. Im Browser gilt: Apps unter derselben Adresse (`lausiklauskn-png.github.io`) teilen sich den
  Browser-Speicher; BookLedgerPro müsste dafür den Tresor der Familienakte als Klon tragen.
- **Mails der Bank (Weg 4):** nur Hinweis „Abbuchung laut Mail, noch nicht im Auszug“, keine Buchung. Erst wenn Private Brain Mails an
  die Akte übergeben kann.

## Private Brain und Private Akte – Klaus' Idee (18.11.), noch nicht entschieden

**Die Idee:** beide Apps sind im Gedanken fast gleich. Die Private Akte führt die **letzten 5 Jahre**, Private Brain das **Ältere**
(5 bis 10 Jahre und mehr). Wer in der Akte nichts findet, schaltet Private Brain an und sucht weiter zurück. So bleibt die Akte
klein, und man weiß, wo man suchen muss. Beide greifen auf **denselben Speicherkern** zu – in APK und Windows-App auf einer
**SD-Karte**, auf der alle Daten zusammenkommen. Kalender und Portemonnaie greifen auf dieselben Daten zu.

**Vorschlag der Sitzung:** nichts verschieben, nur zeigen. Alle Unterlagen bleiben in einem Tresor; die Akte zeigt und durchsucht ab
Werk die letzten 5 Jahre (nach dem Datum der Unterlage), Private Brain das Ältere, und „weiter zurück suchen“ ist ein Tipp. Grund:
ein Umzug zwischen zwei Speichern kann Unterlagen verlieren oder doppeln; eine Grenze in der Ansicht nicht.

**Klaus' Antworten (18.11.):**
- Es zählt das **Datum der Unterlage**, nicht das Datum des Ablegens.
- **Ausweise, Urkunden, Verträge bleiben immer in der Akte**, auch wenn sie älter sind – es sind wenige, und alte Verträge muss man
  später nachprüfen können. Man soll die Wahl haben.
- **Verschlüsselter Speicher auf der SD-Karte ist in Ordnung.**
- Noch offen: was gilt bei Unterlagen ohne Datum (Vorschlag: bleiben in der Akte, bis ein Datum gesetzt ist).

**Damals zu klären (jetzt beantwortet, zur Nachverfolgung):**
- Gilt das **Datum der Unterlage** (Rechnungsdatum) oder das Datum des Ablegens? Was gilt bei Unterlagen ohne Datum?
- Was ist mit Dingen, die nicht altern dürfen (Ausweis, Urkunden, Verträge, Versicherungen) – bleiben die immer in der Akte?
- **SD-Karte gegen „Verschlüsselung an einem Ort“:** in `CLAUDE.md` steht (Klaus 17.11.), offen gearbeitet wird nur im eigenen
  Speicher der App, **nicht auf SD-Karte**. Ein gemeinsamer Kern auf der SD-Karte heißt dann: dort liegt er **verschlüsselt**
  (wie die Sicherung). Klaus muss das bestätigen.
- Private Brain hat heute einen anderen Speicher und kein Register wie die Familienakte – der gemeinsame Kern ist ein eigener
  größerer Schritt (Plan in einer eigenen Sitzung).

## Noch offen bei Klaus (aus dem Brief)

- **Bank: Openbank (Santander)** (Klaus 18.11.). Welches Format das Online-Banking ausgibt (CSV, CAMT, Excel, nur PDF), weiß Klaus
  noch nicht – er sieht nach (Online-Banking › Umsätze › Herunterladen/Exportieren). In der Sitzung nichts Openbank-Eigenes gefunden.
  Einschätzung, nicht geprüft: Openbank ist eine spanische Bank; ob sie **FinTS** anbietet, ist fraglich (FinTS ist ein Standard
  der deutschen Kreditwirtschaft) – dann bliebe für BookLedgerPro nur PSD2 (Weg 3). Die nächste Sitzung baut CSV mit
  Spaltenzuordnung und CAMT.053; kommt bei Openbank nur Excel heraus, auch .xlsx. Liefert sie nur PDF, gesondert besprechen.
- **Mails je Abbuchung?** In welches Postfach? (Erst für Weg 4 nötig.)

## Nachgesehen in dieser Sitzung (Quellen: Bank- und Projektseiten, nicht fints.org selbst)

- **FinTS-Produktregistrierung** bei der Deutschen Kreditwirtschaft: kostenlos, Anmeldung über fints.org, Freigabe dauert einige
  Wochen; ohne Registrierung lehnen die Banken ab; jede App braucht ihre eigene Nummer. → für BookLedgerPro rechtzeitig beantragen.
- **PSD2:** Zustimmung für Kontoinformationen seit 25.07.2023 alle **180 Tage** neu (vorher 90).

## Bauauftrag für die nächste Sitzung (Portemonnaie mit Bank)

```
Lies im Repo Private-Akte zuerst CLAUDE.md, dann docs/PLAN_2026-11-18_PORTEMONNAIE-BANK-BOOKLEDGER.md.
Bau das Portemonnaie fertig, Teil „Bank“ (Private Akte 0.8.0):
1. Kontoauszug einlesen: CAMT.053 (XML) und CSV (Spalten zuordnen, Zuordnung je Bank merken; Klaus hat Openbank –
   sein Exportformat zuerst erfragen, ggf. auch .xlsx). Das Original wird Unterlage
   in der Akte (Bereich „Bank & Finanzen“ o. ä. aus den Bereichen des Klons), jede Buchung ein Posten im Fach „Bank“ im Register.
2. Jede Buchung nur einmal (Schlüssel: Referenz der Bank, sonst Tag + Betrag + Zweck + Gegenkonto). Wiederholtes Einlesen
   bringt nur Neues; die Meldung nennt neu / schon da.
3. Kontostand aus dem Auszug, nachgerechnet; „stimmt“ oder die Lücke. Monatsansicht: Bargeld, Bank, Summe.
4. Bargeld-Posten und Bank-Buchungen bleiben getrennte Fächer; ein Bon kann an eine Bank-Buchung (Kartenzahlung) geknüpft werden.
5. „An BookLedgerPro geben“: Bargeld und Bank des Monats als eine Datei, dazu der Original-Auszug; Schlüssel mitgeben, damit
   BookLedgerPro nichts doppelt nimmt. Format mit dem Repo BookLedgerPro abstimmen (dort nur lesen, nichts ändern).
6. Rechnen nur mit money.js/kassenbuch.js aus dem Klon; nichts davon neu schreiben. Beispieldateien nur erfunden.
Keine Bankzugänge, kein FinTS, kein PSD2 in der Akte – das kommt nach BookLedgerPro (eigene Sitzung).
Was nicht fertig wird, mit einem Brief weitergeben.
```
