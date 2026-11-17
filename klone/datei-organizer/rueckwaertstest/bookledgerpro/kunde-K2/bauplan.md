# Bauplan · Vorgang V-2026-0001 · Fassung 4 · Kunde ⟦KUNDE-1⟧

## 1. Zweck und Nutzer
Offline laufende, verschlüsselte Buchhaltung für einen kleinen Betrieb mit offener Ladenkasse: doppelte Buchführung (SKR03), Belege ohne Abtippen vorkontieren, USt-Voranmeldung/EÜR und DATEV-orientierter Export für den Steuerberater (B-11–B-22).
Nutzer ist die Inhaberin (B-06); der Steuerberater (B-07) bekommt nur die Exportdatei (B-17, B-22).

## 2. Plattformen und Laufzeit
- Native App auf Android-Tablet und Windows-PC (B-37, B-41, K-08); Daten auch auf SD-Karte (B-41).
- Läuft ohne Internet und ohne Konto beim Anbieter (B-18, B-24); kein Abo (B-32).
- Netz nur für: Updates vom eigenen Server (K-08) und optional EU-Texterkennung/KI mit eigenem Schlüssel nach Bestätigung (B-34, K-07).
- Eine App bedient mehrere Buchhaltungen auf einem Gerät (B-44).

## 3. Bereiche der Oberfläche
- Startseite: fällige USt, Steuer-Rücklage, Kassenstand, Wahl der Buchhaltung (K-13)
- Buchungen/Journal mit Storno (K-01) · Konten (SKR03)
- Belege: Einlesen, Scannen, geteilte Mails, Vorschlag, Suche (K-02, K-10, K-11, K-14)
- Kunden · Aufträge · Rechnungen (K-03)
- Kasse & Shop: Tagesabschluss, Quittungsvorlage (K-12)
- Auswertungen: USt-Voranmeldung, EÜR, Export (K-04)
- Übernahme aus Auftrags-App/Angebotsplaner/Warenwirtschaft (K-06)
- Einstellungen: Tresor, Passwort, Ersatzschlüssel, Sicherung, Tresorordner, Nutzungsmodus, KI-Schlüssel, Updates

## 4. Funktionen (prüfbar)
1. Konten nach SKR03 anlegen/anzeigen; jede Buchung ist Soll/Haben ausgeglichen (B-20).
2. USt wird beim Buchen automatisch auf das Steuerkonto aufgeteilt (B-20).
3. Jede Buchung trägt Beleg und Zeitstempel (B-19).
4. Festgeschriebene Buchung lässt sich nicht ändern oder löschen, nur per Gegenbuchung stornieren (B-12, B-21).
5. Hash-Kette über festgeschriebene Buchungen; eine Manipulation wird beim Prüfen gemeldet (B-21).
6. Beleg (Foto/PDF) einlesen ergibt einen Buchungsvorschlag, der erst auf Bestätigung bucht (B-13, K-02).
7. Erkennung ohne KI auf dem Gerät: Konto, Datum, Steuersatz, Rechnungsnummer (B-45, K-14).
8. Optional: EU-Texterkennung/Kontierungshilfe nur mit eigenem Schlüssel und nach Bestätigung; Namen werden vorher verdeckt (B-34, B-36, K-07).
9. Beleg mit Kamera/Scanner erfassen; geteilte Rechnungsmail wird Beleg, Positionen werden gelesen (B-39, K-10).
10. Suche über Belege nach Wörtern; zusätzlich nach Bedeutung (B-40, K-11).
11. Kunden, Aufträge, Rechnungen anlegen; eine Rechnung erzeugt ihre Buchung (B-14, K-03).
12. USt-Voranmeldung und EÜR für einen Zeitraum auf Knopfdruck (B-15).
13. Export als DATEV-orientierte CSV (B-22, B-27).
14. Daten mit Passwort verschlüsselt; ohne Passwort keine Einsicht (B-16).
15. Ersatzschlüssel stellt den Zugang bei vergessenem Passwort wieder her (B-16).
16. Pflicht-Sicherung: App erinnert/erzwingt Sicherung (K-05; Form: Annahme, siehe 9).
17. Gemeinsamer verschlüsselter Tresorordner mit den anderen Apps, automatische Sicherung dorthin (B-38, K-09).
18. Übernahme von Aufträgen/Angeboten aus Auftrags-App und Angebotsplaner, Daten aus der Shop-Warenwirtschaft (B-33, B-35, K-06).
19. Tagesabschluss der offenen Ladenkasse aus gezähltem Bestand mit Foto, danach festgeschrieben (B-47).
20. Quittungsvorlage für die Ladenkasse (B-42, K-12).
21. Rückfrage bei auffällig hoher Einnahme (K-12).
22. Startseite zeigt fällige USt, Steuer-Rücklage, Kassenstand (B-43).
23. Mehrere getrennte Buchhaltungen (Laden, zweiter Laden, Haushalt) auf einem Gerät (B-44).
24. Vier Nutzungsmodi: Privat, Kleinunternehmer, Selbstständig, Berater (B-46).
25. Updates vom eigenen Server ohne App-Laden (B-37, K-08).

## 5. Datenhaltung und Sicherheit
- Alles lokal, verschlüsselt (Passwort-Schlüssel, nur im Speicher solange entsperrt); getrennt je Buchhaltung (Annahme).
- Daten: Belege (Fotos, PDF), Buchungen, Konten, Kunden, Rechnungen (B-28); personenbezogen (B-29).
- Aufbewahrung nach GoBD: nichts Festgeschriebenes löschbar (B-21, B-30).
- Sicherung lokal/SD-Karte/Tresorordner; Ersatzschlüssel getrennt aufbewahren (B-16, B-38).
- Vor jedem KI-Aufruf Namen verdecken, Senden nur nach Bestätigung (B-34, B-36).

## 6. Schnittstellen
- Auftrags-App, Angebotsplaner, Warenwirtschaft des Ladens → Übernahme (B-35, K-06); Format offen.
- Steuerberater ← DATEV-orientierte CSV (B-22).
- EU-Texterkennung/KI-Anbieter, optional, eigener Schlüssel (B-34).
- Eigener Update-Server (K-08).
- Gemeinsamer Tresorordner der anderen Apps (K-09).
- Android-Teilen für Mails/Dateien, Scanner/Kamera (K-10).

## 7. Bewusste Grenzen
- Kontoauszug als Text einlesen: nicht gebaut, „erst nach weiterer Messung“ (O-02).
- Kein Cloud-Konto, kein Abo, kein Online-Zwang (B-10, B-18, B-32).
- Keine direkte Übermittlung ans Finanzamt (ELSTER) — im Auftrag steht nur Export an den Steuerberater (Annahme).
- KI nicht Pflicht; Erkennung ohne KI ist der Standardweg (B-34 „Kann“, B-45).
- Keine automatische Buchung ohne Bestätigung (B-13 „Vorschlag“).

## 8. Reihenfolge
1. K-05 Tresor, Passwort, Ersatzschlüssel, Sicherung (Grundlage für alles Gespeicherte)
2. K-01 Buchhaltungs-Kern mit Festschreibung, Storno, Hash-Kette; K-13 mehrere Buchhaltungen + Modi
3. K-04 USt/EÜR/Export
4. K-02 Belege + K-14 Erkennung ohne KI, dann K-10 Scanner/Mail
5. K-12 Kasse & Tagesabschluss
6. K-03 Kunden/Aufträge/Rechnungen
7. K-13 Startseite-Kennzahlen
8. K-08 Android/Windows-Hülle + Updates (früh als Gerüst, Abschluss hier)
9. K-09 Tresorordner, K-06 Übernahme, K-11 Suche, K-07 EU-KI (Kann-Teile zuletzt)

## 9. Offene Fragen an den Kunden
- O-01: Welcher Kontenrahmen gilt beim Steuerberater? (Frist 2026-06-15 liegt vor dem Auftragsdatum — ist sie beantwortet?)
- Was bedeutet „Pflicht-Sicherung“ genau: Erinnerung oder Sperre ohne Sicherung? (K-05)
- Ab welchem Betrag gilt eine Einnahme als „hoch“, und was soll die Rückfrage bewirken? (K-12)
- Was unterscheidet die vier Modi im Ablauf, besonders „Berater“? (B-46)
- Welche Daten aus der Shop-Warenwirtschaft, in welchem Format? (K-06)
- Welche „anderen Apps“ teilen den Tresorordner? (B-38, K-09)
- Wie wird die Steuer-Rücklage berechnet? (B-43)
- Welcher EU-Anbieter für Texterkennung/KI? (B-34)
- Was ist mit B-25 „Geräte“ und B-31 „Vorgaben“ konkret gemeint?

## 10. Unklar, widersprüchlich, doppelt
- B-20 legt SKR03 fest, O-01 fragt den Kontenrahmen noch offen (Z. 69 vs. Z. 87/91).
- O-01 „bis 2026-06-15“ liegt vor dem Auftragsdatum 2026-11-14 (Z. 7, 91).
- „Anlass: Die App wirkte wie ein Haushaltsbuch“ (Z. 17) setzt eine bestehende App voraus; Kopf sagt `vorher: -`, alle Zeilen NEU BAUEN (Z. 6, 24–37).
- K-08 „Updates vom eigenen Server“ und K-07 KI brauchen Netz; B-18 „ohne Internet“ — als optional gelesen (Annahme).
- K-12 „Rückfrage bei hoher Einnahme“ steht in keinem Bedarf (Z. 35 vs. B-42).
- K-06 nennt Shop-Warenwirtschaft, der gedeckte B-33 nur Auftrags-App/Angebotsplaner; Warenwirtschaft steht nur in B-35 (Z. 29, 56, 80).
- B-46 (Modi), B-47 (Tagesabschluss mit Foto), B-36 (Namen verdecken), B-19/B-21/B-22 werden von keinem K ausdrücklich gedeckt; zugeordnet zu K-01/K-04/K-07/K-12/K-13 (Annahme).
- Überschneidung K-02 (Erkennung) und K-14 (trainierte Erkennung) bzw. K-07; Abgrenzung unklar.
- Doppelt: B-15/B-22/B-27 (Export) und B-24/B-18 (offline); B-41 und B-37 (Geräte).
- Summe: Zeilen ergeben 208,7–378,5 h; Abstimmung 15 % davon wären 31,3–56,8 h, angegeben 31,6–57,7 h; 284,4–519,1 h passt nicht exakt zur Zeilensumme (Z. 95–97).
- Kein Eintrag NOCH NICHT GESCHÄTZT, keine UNVERÄNDERT-Zeilen.
