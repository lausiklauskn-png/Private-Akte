# Brief für die Plansitzung – Bankkonto, Portemonnaie, BookLedgerPro (Stand 18.11.2026, Private Akte 0.7.7)

Eine **Besprechung**, kein Bauauftrag: erst die Wege durchgehen, dann entscheidet Klaus, was gebaut wird.

## Klaus' Frage (18.11., wörtlich zusammengefasst)

Wie sehe ich neben dem Bargeld im Portemonnaie auch, was auf meinem Bankkonto passiert – nur lesen, keine Bankgeschäfte? Ideen:
(a) Bankzugang in der App hinterlegen und am Ende des Tages „aktualisieren“ – wohl nur in der nativen App (APK); (b) Kontoauszug
herunterladen und einlesen; (c) Abgleich über die Mails, die die Bank bei jeder Abbuchung schickt (sie kommen in Private Brain an);
am Monatsende der Kassenüberschlag: läuft alles parallel? Dazu: Weitergabe Portemonnaie → BookLedgerPro und die Anpassung von
BookLedgerPro an das Portemonnaie.

## Was es heute gibt

- **Portemonnaie** (Private Akte 0.7.1): Posten „Geld rein / Geld raus“ im Tresor, Bon als Unterlage, Rechnen mit `money.js` und
  `kassenbuch.js` aus BookLedgerPro (Klon @ `9df9bee`), Monatsbericht, „An BookLedgerPro geben“ = CSV des Monats.
- **Private Brain**: holt Mails in der Browserfassung nur über einen eigenen Mail-Dienst; echte Geräte-Mail nur in Android/Windows.

## Eine Richtigstellung vorweg

„Öffentliche App“ heißt: der **Programmcode** ist öffentlich (GitHub Pages). Die **Daten** bleiben im Browser bzw. auf dem Gerät –
ein eingelesener Kontoauszug geht nirgendwohin. Ein Kontoauszug-Import geht darum auch in der Basic-Fassung. Was im Browser nicht
geht, ist der **direkte** Zugang zur Bank (die Bankserver lassen fremde Webseiten nicht zu, und ein Passwort gehört nicht in den
Browser-Speicher).

## Die Wege – Einschätzung zum Besprechen

| Weg | Wo | Aufwand | Sicherheit | Grenzen |
|---|---|---|---|---|
| **1. Kontoauszug einlesen** (CSV, CAMT.053, MT940 aus dem Online-Banking) | Basic und APK | klein | gut: nur eine Datei, kein Zugang | von Hand herunterladen; Formate je Bank leicht verschieden |
| **2. FinTS/HBCI direkt aus der APK** (PIN + TAN, Umsätze abrufen) | nur nativ | mittel bis groß | PIN nur im Geräte-Tresor; TAN-Freigabe in der Bank-App | Bank muss FinTS anbieten; für FinTS verlangt die Deutsche Kreditwirtschaft eine (kostenlose) Produktregistrierung der Software – vorher klären |
| **3. PSD2 über einen Kontoinformationsdienst** (Anbieter mit BaFin-Zulassung) | nativ oder Server | mittel | Zugang läuft über den Anbieter | Fremddienst sieht die Umsätze; meist kostenpflichtig, Verträge; Zustimmung alle 90 bzw. 180 Tage erneuern |
| **4. Mails der Bank** (Push-/Mail-Hinweis je Abbuchung, über Private Brain) | wo Private Brain Mails hat | mittel | keine Bankdaten in der App | nicht jede Bank schickt je Buchung eine Mail; Text ändert sich; keine Vollständigkeit – nur Ergänzung |

**Vorschlag zum Besprechen:** Schritt 1 zuerst (Kontoauszug einlesen, auch Basic): Umsätze als eigene Liste „Bank“ neben dem Bargeld,
gleiche Buchung nur einmal (Datum, Betrag, Verwendungszweck), Monatsabschluss zeigt Bargeld, Bank und die Summe. Schritt 2 (FinTS in
der APK) erst, wenn Klaus' Bank FinTS anbietet und die Registrierung geklärt ist. Weg 4 als Hinweis („neue Abbuchung laut Mail“), nicht
als Buchung. Weg 3 nur, wenn 2 nicht geht.

## Fragen an Klaus

1. Welche Bank(en)? Bietet sie FinTS an, und kann das Online-Banking CSV oder CAMT exportieren?
2. Reicht zuerst „Kontoauszug einlesen“ (einmal im Monat oder nach Bedarf)?
3. Soll die Bank im Portemonnaie stehen (zweites Fach „Bank“) oder nur in BookLedgerPro?
4. Schickt die Bank Mails je Abbuchung, und in welches Postfach von Private Brain?
5. BookLedgerPro: soll es die CSV des Portemonnaies einlesen (Kasse) und den Kontoauszug (Bank) – oder bekommt es beides fertig aus der Akte?
6. Wohin gehört das am Ende: Portemonnaie der Akte, eigene App, oder BookLedgerPro Basic/Pro?

## Grenzen dieses Briefs

Nichts davon ist gebaut oder an einer echten Bank geprüft. Die Angaben zu FinTS-Registrierung und PSD2-Zulassung sind aus dem
allgemeinen Wissen der Sitzung, nicht frisch nachgelesen – vor dem Bauen nachsehen.

## Startauftrag für die Plansitzung

```
Lies im Repo Private-Akte zuerst CLAUDE.md, dann docs/BRIEF_PLANSITZUNG_2026-11-19_BANK-PORTEMONNAIE-BOOKLEDGER.md.
Das ist eine Besprechung: geh die Wege mit mir durch, beantworte meine Fragen, bau noch nichts.
Zum Schluss schreibst du auf, was entschieden ist, und einen Bauauftrag für die nächste Sitzung.
```
