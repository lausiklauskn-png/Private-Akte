# Bauplan · V-2026-0001 · Fassung 4

Kunde: ⟦KUNDE-1⟧ · Fassungsdatum 2026-11-09 · keine frühere Fassung: alle 14 Bausteine (K-01 bis K-14) sind NEU BAUEN. Keine Zeile UNVERÄNDERT, ANPASSEN, ENTFERNEN oder NOCH NICHT GESCHÄTZT. Geschätzt 284,4–519,1 h (inkl. Anpassung, Abstimmung 15 %, Puffer 20 %); Beträge nicht im Auftrag (euro: nein).

## 1. Zweck und Nutzer
- Buchhaltung für einen kleinen Betrieb, offline und verschlüsselt. Ersetzt Papier, Excel, Quittungen im Schuhkarton und das Kassenbuch auf Papier (B-01–B-03, B-26).
- Anlass: auf einen Blick Kasse, Umsatzsteuer, Rücklage; Belege ohne Tipparbeit und ohne Datenweitergabe vorkontieren.
- Nutzer: Inhaberin (1), Steuerberater (1) als Empfänger der Exportdatei (B-06, B-07).
- Ziel am Monatsende: alles gebucht, Umsatzsteuer bekannt, eine Datei an den Steuerberater (B-17). Belege sofort statt am Monatsende erfassen (B-23).
- Schmerz heute: doppelte Eingabe, keine Übersicht über Umsatzsteuer und Kasse, Cloud-Lösungen mit Abo und Daten beim Anbieter (B-08–B-10, B-32 „kein Abo“).

## 2. Plattformen, Datenort, Sicherung, Netz
- Geräte: Android-Handy/-Tablet, Windows-PC, Browser (Rahmen, B-41). Native Apps mit Updates vom eigenen Server, ohne App-Laden (K-08, B-37).
- Ohne Internet: immer; kein Konto beim Anbieter (B-18, B-24).
- Daten nur auf dem Gerät, eigener Ordner oder Speicherkarte (Rahmen, B-41).
- Alles mit Passwort verschlüsselt, Ersatzschlüssel bei vergessenem Passwort (K-05, B-16).
- Sicherung verschlüsselt, an einen zweiten Ort, von allein — die App darf das selbst tun (B-16, B-38).
- Abgleich zwischen Geräten: „ab und zu reicht“ (Rahmen) — kein Baustein dafür, siehe 8.
- KI: der Nutzer wählt in der App (Rahmen); nur EU-Anbieter, eigener Schlüssel, nach Bestätigung, Namen vorher verdeckt (K-07, B-34, B-36).
- Personenbezogene Daten: ja; Aufbewahrung nach GoBD (B-29, B-30).

## 3. Bereiche/Seiten
1. Startseite: fällige Umsatzsteuer, Steuer-Rücklage, Kassenstand; Wechsel zwischen mehreren Buchhaltungen (K-13).
2. Buchungen und Konten (K-01).
3. Belege: einlesen, scannen, Mail-Eingang, Erkennung, Vorschlag, Suche (K-02, K-10, K-11, K-14).
4. Kunden, Aufträge, Rechnungen (K-03), Übernahmen von außen (K-06).
5. Auswertung: USt-Voranmeldung, EÜR, Export (K-04).
6. Kasse & Shop: Tagesabschluss, Quittungsvorlage (K-12).
7. Einstellungen: Tresor, Passwort, Ersatzschlüssel, Sicherung, Tresorordner, KI-Wahl und Schlüssel, Nutzungsmodus, Vorschau-Schalter Kontoauszug (K-05, K-07, K-09, B-46, B-47).

## 4. Funktionen
1. **K-01** Konten nach SKR03, doppelte Buchführung Soll/Haben, USt automatisch aufteilen (B-11, B-20). Prüfbar: Buchung erzeugt Soll- und Haben-Zeilen, Steuer getrennt.
2. **K-01** Festschreibung mit Zeitstempel und Belegbezug; Korrektur nur als Storno/Gegenbuchung, nie Löschen; Hash-Kette (B-12, B-19, B-21). Prüfbar: Änderung an festgeschriebener Buchung bricht die Kette erkennbar.
3. **K-01** Jede Buchung erst nach Bestätigung (N-03; B-11/B-12 „schlägt vor“).
4. **K-02** Beleg (Foto, PDF) einlesen, Erkennung, Buchungsvorschlag zur Bestätigung (B-13, B-28).
5. **K-14** Belegerkennung auf dem Gerät ohne KI: Konto, Datum, Steuersatz, Rechnungsnummer — als Vorschlag (B-45).
6. **K-10** Scannen und Rechnungsmails teilen; Positionen lesen; Vorschlag (B-39).
7. **K-11** Suche über Belege nach Wörtern und nach Bedeutung (B-40).
8. **K-03** Kunden, Aufträge, Rechnungen, die beim Erstellen als Buchungsvorschlag entstehen (B-14).
9. **K-04** USt-Voranmeldung und EÜR auf Knopfdruck; DATEV-orientierte CSV für den Steuerberater (B-15, B-22, B-27).
10. **K-05** Verschlüsselter Tresor, Pflicht-Sicherung, Ersatzschlüssel (B-16).
11. **K-06** Übernahme aus Auftrags-App, Angebotsplaner und Shop-Warenwirtschaft (B-33, B-35).
12. **K-07** EU-Texterkennung und Kontierungshilfe; vorher Prüfung des Inhalts und Verdecken von Namen; Senden nur nach Bestätigung (B-34, B-36).
13. **K-08** Android- und Windows-App, Updates vom eigenen Server (B-37).
14. **K-09** Gemeinsamer verschlüsselter Tresorordner mit den anderen Apps, automatische Sicherung, darf selbst handeln (B-38).
15. **K-12** Offene Ladenkasse: Tagesabschluss aus gezähltem Bestand mit Foto, festgeschrieben; Quittungsvorlage; Rückfrage bei hoher Einnahme (B-42, B-48).
16. **K-13** Startseite mit USt, Rücklage, Kassenstand; mehrere Buchhaltungen (Laden, zweiter Laden, Haushalt) auf einem Gerät, Anlegen als Vorschlag (B-43, B-44).
17. **ohne Baustein** Kontoauszug als Text einlesen, Saldo-Gegenrechnung gegen Buchungen, hinter Vorschau-Schalter, ab Werk aus (B-46, O-02).
18. **ohne Baustein** Vier Nutzungsmodi: Privat, Kleinunternehmer, Selbstständig, Berater (B-47).

Vorlagen laut Auftrag: K-01/K-04/K-12 BookLedgerPro (40 %), K-02/K-10 Workflow PDF (70 %), K-03 Mein WorkFloh (50 %), K-05/K-09 Datei-Post (60 %), K-07 Sende-Prüfer (70 %, Faktor KI ×1,25), K-11 Company Brain (40 %), K-14 „–“ (60 %). K-01 Faktor Offline ×1,15. Für K-06, K-08, K-13 keine Vorlage genannt.

## 5. Schnittstellen zu anderen Programmen
- Workflow PDF Pro: Belege herein (Rahmen, K-10).
- Private Brain Pro: Mails herein (Rahmen, K-10).
- Workflow Calculate und Needs: Angebote herein (Rahmen, K-06).
- Auftrags-App, Shop-Warenwirtschaft des Ladens (K-06, B-35).
- Mit den eigenen Apps: gemeinsamer Ablageort, Dateien hin und her, gemeinsame Suche (Rahmen, K-09).
- Steuerberater: DATEV-orientierte CSV (K-04).
- EU-KI-Anbieter für OCR/Kontierung, nur mit eigenem Schlüssel (K-07).
- Eigener Update-Server (K-08).
Datenformate der Übernahmen nennt der Auftrag nicht (siehe 8).

## 6. Ausdrücklich nicht
- N-01 keine Registrierkasse mit TSE.
- N-02 kein Bargeld in einer Kasse verwalten.
- N-03 keine Buchung ohne Bestätigung.
- Kein Konto beim Anbieter, kein Abo, keine Datenablage beim Anbieter (B-10, B-18, B-32).
- Keine KI ohne Bestätigung, keine Klarnamen an die KI (B-34, B-36).

## 7. Abnahme
- Je Baustein: zugehörige B-Kennung erfüllt (Liste in 4).
- Zusätzlich ohne Baustein abnehmen: B-18, B-19, B-20, B-21, B-22, B-46, B-47, B-48.
- „Schlägt vor, Kunde bestätigt“ nachweisen für B-11, B-12, B-13, B-14, B-39, B-40, B-44, B-45; „darf selbst“ nur für B-16, B-38.
- Monatsend-Durchlauf: Belege erfasst → gebucht → USt-Voranmeldung/EÜR → CSV-Datei (B-17).
- Offline-Test auf Android, Windows, Browser; Neuinstallation mit Sicherung und Ersatzschlüssel wiederherstellen.
- Sterne aus dem Auftrag (B-11, B-13, B-15, B-16) bei der Abnahme erneut erfragen.

## 8. Offene Fragen und Widersprüche im Auftrag
1. **O-01 Kontenrahmen** offen (Frist 2026-06-15, liegt vor dem Fassungsdatum) — B-20 setzt aber schon SKR03 fest. Gilt SKR03 oder kommt SKR04?
2. **O-02** Kontoauszug-Einlesen ab Werk erst nach Messung; welche Messung, welche Grenze?
3. **N-02 vs. K-12/B-42/B-48/B-43:** „kein Bargeld in einer Kasse verwalten“, aber Ladenkasse, Tagesabschluss aus gezähltem Bestand und Kassenstand auf der Startseite. Vermutlich: Kassenbuch ja, Bargeldverwaltung/Kassensystem nein — bitte bestätigen.
4. **Abgleich zwischen Geräten** („ab und zu“) steht im Rahmen, aber kein Baustein und keine B-Kennung; Weg (Tresorordner? Datei?) unklar.
5. **Browser als Gerät** im Rahmen, B-37/K-08 nennen nur Android und Windows. Volle Funktion im Browser? Updates dort?
6. B-46 und B-47 haben keinen Baustein und keine Stunden — gehören sie in K-01/K-04/K-13?
7. K-06 nennt Shop-Warenwirtschaft, B-33 nur Auftrags-App und Angebotsplaner; Datenformate/Übergabeweg aller Übernahmen fehlen.
8. „Rückfrage bei hoher Einnahme“ (K-12): ab welchem Betrag, was wird gefragt?
9. K-14 „Trainierte Belegerkennung“: Vorlage „–“, aber 60 % Wiederverwendung — woraus? Trainingsdaten?
10. K-11 Bedeutungssuche: offline-Modell auf dem Gerät oder KI? Größe, Plattformen.
11. KI „beides, Nutzer wählt“: was ist die zweite Möglichkeit neben EU-Anbieter (lokal? eigenes Abo)?
12. B-15 hat keine Handlungsangabe (selbst/vorschlagen); Export auf Knopfdruck vermutlich manuell.
13. Zweiter Sicherungsort (K-05/K-09): Speicherkarte, Stick, Cloud-Ordner? Häufigkeit?
14. Ersatzschlüssel: Art (Teile, Papier) nicht beschrieben.
15. Rechtstexte: Verschwiegenheitserklärung, Vereinbarung und Wartungsvertrag sind nicht aktiviert.
16. Aufbewahrungsfristen (B-30): Löschung nach Fristende gewünscht oder nur Sperre gegen Löschen?
