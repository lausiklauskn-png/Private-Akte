# Bauplan · Vorgang V-2026-0001 · Fassung 4 · Kunde ⟦KUNDE-1⟧

## 1. Zweck und Nutzer
Buchhaltung für einen kleinen Betrieb, die offline und verschlüsselt läuft, Belege ohne Tipparbeit vorkontiert und auf einen Blick Kasse, Umsatzsteuer und Rücklage zeigt (Anlass, B-09, B-40).
Nutzer ist die Inhaberin (B-06); der Steuerberater bekommt nur eine Exportdatei (B-07, B-17, B-24).

## 2. Plattformen und Laufzeit
- Android-Tablet und Windows-PC als installierte App (B-34, B-38, K-08); SD-Karte als Ablageort möglich (B-38).
- Läuft ohne Internet und ohne Konto beim Anbieter (B-18, B-21); kein Abo (B-29).
- Netz nur für: Updates vom eigenen Server (K-08) und die freiwillige EU-Texterkennung/Kontierungshilfe (K-07, B-31).

## 3. Bereiche der Oberfläche
- Startseite: fällige Umsatzsteuer, Steuer-Rücklage, Kassenstand; Wahl der Buchhaltung (K-13).
- Buchungen und Konten (K-01).
- Belege: einlesen, scannen, geteilte Mails, Suche (K-02, K-10, K-11, K-14).
- Kunden, Aufträge, Rechnungen (K-03).
- Kasse & Shop: Tagesabschluss, Quittungsvorlage (K-12).
- Auswertungen: USt-Voranmeldung, EÜR, Export (K-04).
- Übernahme aus anderen Apps (K-06).
- Einstellungen: Tresor, Sicherung, Ersatzschlüssel, Tresorordner, KI-Schlüssel, Updates (K-05, K-07, K-08, K-09).

## 4. Funktionen (je prüfbar)
1. Konten anlegen und doppelt buchen (Soll/Haben gleich) (K-01, B-11).
2. Festschreiben: gebuchte Einträge nicht änderbar, Korrektur nur als Storno/Gegenbuchung (K-01, B-12).
3. Jede Buchung trägt Beleg und Zeitstempel unveränderbar (B-19).
4. Beleg (Foto, PDF) einlesen und Buchungsvorschlag erhalten (K-02, B-13, B-25).
5. Auf dem Gerät ohne KI erkennen: Konto, Datum, Steuersatz, Rechnungsnummer (K-14, B-42).
6. Belege scannen; Rechnungsmail teilen, Rechnungspositionen werden gelesen (K-10, B-36).
7. Kunden, Aufträge, Rechnungen anlegen; Rechnung erzeugt Buchung (K-03, B-14).
8. USt-Voranmeldung und EÜR auf Knopfdruck (K-04, B-15).
9. Export an den Steuerberater, DATEV-orientiert (K-04, B-24).
10. Alle Daten mit Passwort verschlüsselt (K-05, B-16).
11. Pflicht-Sicherung und Ersatzschlüssel bei vergessenem Passwort (K-05, B-16).
12. Gemeinsamer verschlüsselter Tresorordner mit den anderen Apps, automatische Sicherung dorthin (K-09, B-35).
13. Übernahme aus Auftrags-App, Angebotsplaner und Shop-Warenwirtschaft (K-06, B-30, B-32).
14. Texterkennung/Kontierung über EU-Anbieter nur mit eigenem Schlüssel und nach Bestätigung (K-07, B-31).
15. Vor jeder KI-Anfrage werden Namen verdeckt und die Prüfung läuft vor dem Senden (K-07, B-33).
16. Suche über Belege nach Wörtern und nach Bedeutung (K-11, B-37).
17. Offene Ladenkasse: Tagesabschluss, Quittungsvorlage, Rückfrage bei auffällig hoher Einnahme (K-12, B-39).
18. Startseite zeigt fällige Umsatzsteuer, Steuer-Rücklage, Kassenstand (K-13, B-40).
19. Mehrere Buchhaltungen (Laden, zweiter Laden, Haushalt) auf einem Gerät, getrennt (K-13, B-41).
20. Updates kommen vom eigenen Server, ohne App-Laden (K-08, B-34).

## 5. Datenhaltung und Sicherheit
- Alle Daten nur auf dem Gerät bzw. im gewählten Ablageort (SD-Karte, Tresorordner) (B-18, B-38, B-35).
- Verschlüsselt mit Passwort; Ersatzschlüssel für den Notfall (B-16). Verfahren: (Annahme) gängige Schlüsselableitung aus Passwort + authentifizierte Verschlüsselung.
- Sicherung ist Pflicht und läuft automatisch in den Tresorordner (K-05, K-09).
- Personenbezogene Daten vorhanden (B-26); vor KI werden Namen verdeckt (B-33).
- Aufbewahrung nach GoBD: Festschreibung, keine Löschung gebuchter Daten, nur Storno (B-27, B-19).

## 6. Schnittstellen
- Auftrags-App, Angebotsplaner, Warenwirtschaft des Ladens → Übernahme (K-06, B-32). Format offen.
- Export an den Steuerberater, DATEV-orientiert (B-24).
- EU-Texterkennung/Kontierungshilfe, optional (K-07).
- Eigener Update-Server (K-08).
- Andere Apps über gemeinsamen Tresorordner (K-09).
- Teilen-Empfang für Rechnungsmails (K-10).

## 7. Bewusste Grenzen
- Kein Kontoauszug als Text einlesen (O-02: erst nach weiterer Messung).
- Kein Cloud-Konto, kein Abo (B-10, B-18, B-29).
- Keine KI ohne Bestätigung und eigenen Schlüssel; nur EU-Anbieter (B-31).
- Kontenrahmen nicht festgelegt, bevor O-01 geklärt ist (nur austauschbar vorbereitet).
- (Annahme) Keine Kassensicherung (TSE) und keine direkte Übermittlung ans Finanzamt – steht nicht im Auftrag.
- Keine Preise/Beträge: Auftrag hat `euro: nein`, Beträge sind weggelassen, nicht null.

## 8. Reihenfolge der Bauschritte
1. K-05 Tresor, Sicherung, Ersatzschlüssel (Grundlage für alle Daten).
2. K-01 Buchhaltungs-Kern mit Festschreibung/Storno.
3. K-04 USt-Voranmeldung, EÜR, Export (Grenzlinie liegt nach K-04).
4. K-13 Startseite und mehrere Buchhaltungen.
5. K-12 Kasse & Shop.
6. K-02, dann K-14 Belege und Erkennung auf dem Gerät.
7. K-03 Kunden, Aufträge, Rechnungen.
8. K-08 Android- und Windows-App mit Updates (früh als Hülle beginnen, wenn Gerätetest nötig – Annahme).
9. K-09 Tresorordner, K-10 Scanner/Mail, K-06 Übernahme.
10. K-11 Suche, K-07 EU-KI (beide „Kann“ bzw. Zusatz).

## 9. Offene Fragen an den Kunden
- O-01: Welcher Kontenrahmen gilt beim Steuerberater? (Frist 2026-06-15 ist bereits verstrichen.)
- O-02: Wann und wie wird über das Einlesen von Kontoauszügen entschieden?
- Grenzlinie nach K-04: Werden K-05 bis K-14 beauftragt? Darunter liegen Muss-Bedarfe (B-16, B-34, B-39).
- Welches Format liefern Auftrags-App, Angebotsplaner und Warenwirtschaft?
- Welche DATEV-Form genau will der Steuerberater?
- Ab welchem Betrag gilt eine Einnahme als „hoch“ (K-12)?
- Welcher EU-Anbieter für Texterkennung/Kontierung?
- Was meint der Anlass „wirkte wie ein Haushaltsbuch“ – Kritik oder Wunschbild?

## 10. Unklar, widersprüchlich, doppelt
- Summe: Kopf sagt „Stunden F4 284,4–519,1“; die 14 Zeilen in „Zu tun“ ergeben 208,7–378,5 h.
- Grenzlinie „nach K-04“ schneidet Muss-Bedarfe ab: B-16 (K-05), B-34 (K-08), B-39 (K-12).
- O-01 „bis 2026-06-15“ liegt vor dem Auftragsdatum 2026-11-14.
- Kopf „fassung: 4“, aber „vorher: -“; Änderungsliste führt alles als „NEU“.
- `repo: "Workflow-Needs"` – Name passt nicht zu einer Buchhaltungs-App.
- B-18 „ohne Internet“ vs. K-07 (EU-KI) und K-08 (Updates vom Server): nur als optional vereinbar.
- K-06 nennt „Shop-Warenwirtschaft“, der zugehörige B-30 nur Auftrags-App und Angebotsplaner (Warenwirtschaft nur in B-32).
- K-12 „Rückfrage bei hoher Einnahme“ steht in keinem Bedarf (B-39).
- Überschneidung: K-02 (Erkennung + Vorschlag), K-14 (Erkennung auf dem Gerät), K-07 (KI-Kontierung) und K-10 (Positionen lesen).
- B-42 „ohne KI“ vs. K-14 „trainierte Belegerkennung“ – Abgrenzung (kein Sprachmodell?) unklar.
- B-21 „offline“ doppelt zu B-18; B-22 „Geräte“, B-28 „Vorgaben“ sind ohne Inhalt.
- B-12 und B-19 überlappen (Festschreibung).
- B-31 ist „Kann“, wird aber mit K-07 vollständig gebaut.
