# Bauplan · Vorgang V-2026-0001 · Fassung 4 · Kunde ⟦KUNDE-1⟧

## 1. Zweck und Nutzer
Eine App, mit der Mails, Dokumente und Fotos privat auf dem eigenen Gerät gemeinsam durchsucht werden – auch nach dem Sinn –, ohne dass Daten ungefragt das Gerät verlassen (B-09, B-14, B-08).
Nutzer ist die Inhaberin (B-05, Anzahl 1); laut Anlass sollen auch Mitarbeiter und Familie arbeitsplatzübergreifend finden und weitergeben (siehe Punkt 10).

## 2. Plattformen und Laufzeit
- Android-Tablet mit SD-Karte als Hauptgerät (B-19); dazu Windows mit gemeinsamem Kern (K-07, B-27).
- Suche läuft ohne Internet (B-15, B-18). Netz nur für Postfach (K-02), KI beim Schreiben (K-06) und auf Wunsch eigenes Netz (K-11, K-12).
- Kein Konto bei einem Dienst, keine Cloud (B-24). Postfach-Anmeldung je Anbieter über IMAP/SMTP bzw. Google-Anmeldung (B-21).

## 3. Bereiche der Oberfläche
- Suche (Start), Dateien hinzufügen, Explorer (K-01)
- Postfach mit mehreren Konten: lesen, schreiben (K-02)
- Speicherort und Verschlüsselung, Ersatzschlüssel (K-03)
- Prüfbericht/Schutz-Hinweise an Dateien und Mails (K-04)
- Schreiben-Fenster mit KI-Gegenlesen und Vorschau „was hinausgeht“ (K-06)
- „Überall suchen“ (K-11); Netz-Einstellungen mit Chef-PIN und Beitritt (K-12)
- Einstellungen: Farbthemen, Texterkennung, Übersetzung (K-08, K-09)

## 4. Funktionen (prüfbar)
1. Dateien einlesen; jede Datei wird genau einmal gelesen, es bleibt ein kleiner Katalog (B-16).
2. Wortsuche über Mails, Dokumente und Fotos gemeinsam (B-09).
3. Bedeutungssuche auf dem Gerät, ohne Internet (B-09, B-15).
4. Explorer zeigt alle eingelesenen Einträge; Original öffnet sich unverändert (B-10).
5. Originale werden nie verändert (B-10) – Prüfung per Fingerabdruck vor/nach.
6. Postfach: mehrere Konten (Telekom, Gmail, WEB.DE, GMX …), Mails lesen und senden direkt vom Gerät (B-11).
7. Gmail über Google-Anmeldung, übrige über IMAP/SMTP (B-21).
8. Alle Daten verschlüsselt auf Tablet oder SD-Karte, Speicherort wählbar (B-12).
9. Ersatzschlüssel erzeugen und damit wieder entsperren (B-12).
10. Warnung vor Viren, Spam, Betrug, ohne Dateien hochzuladen (B-13).
11. Dateien/Text aus anderen Apps über „Teilen“ hereinnehmen (B-25).
12. KI liest beim Schreiben gegen; Namen werden vorher verdeckt, Vorschau zeigt den gesendeten Text (B-26).
13. Windows-App mit demselben Kern und denselben Funktionen (B-27).
14. Farbthemen, Liniensymbole, kompakte Zeilen (B-28).
15. Text in Fotos und Scans auf dem Gerät lesen und durchsuchbar machen (B-29).
16. Mails auf dem Gerät übersetzen (B-29).
17. Bildbeschreibung auf dem Gerät (K-09; nicht im Bedarf B-29 genannt, siehe Punkt 10).
18. Gemeinsamer verschlüsselter Tresorordner mit den anderen Apps (B-30).
19. Mail an die Buchhaltung geben (B-30).
20. „Überall suchen“: eigener Katalog, gemeinsamer Ablageort, auf Wunsch eigenes Netz (B-31).
21. Chef legt das eigene Netz per PIN fest; Mitarbeiter treten mit einem Zettel bei (B-32).
22. Mails mit Anhängen an die Familien-App geben (B-33).

## 5. Datenhaltung und Sicherheit
- Katalog (Steckbrief, Text, Bedeutungswerte, Zeiger aufs Original) und Kopien liegen nur auf dem Gerät bzw. der SD-Karte, verschlüsselt (B-12).
- Passwort plus Ersatzschlüssel; ohne beides kein Zugriff (Annahme: keine Wiederherstellung durch den Hersteller, da keine Cloud).
- Postfach-Zugangsdaten nur verschlüsselt auf dem Gerät (Annahme).
- Personenbezogene Daten: ja (B-23) → nichts verlässt das Gerät ungefragt (B-14); jede Übertragung (KI, Netz, Teilen) nur nach Tipp.
- Sicherung: Ersatzschlüssel; eine eigene Katalogsicherung ist nicht beauftragt (siehe Frage 6).

## 6. Schnittstellen
- Mail-Anbieter: IMAP/SMTP, Google-Anmeldung (B-21); Microsoft offen (O-02).
- Android-Teilen als Empfänger (K-05).
- KI-Dienst für Gegenlesen (K-06; Anbieter nicht genannt).
- Gemeinsamer Tresorordner mit „den anderen Apps“ (K-10) und Buchhaltungs-App (B-30).
- Familien-App (K-13).
- Eigenes Netz zwischen Geräten (K-11, K-12; Technik nicht festgelegt).
- Dateisystem/Explorer, Web-Postfächer als bisherige Arbeitsweise (B-20) – nur als Ausgangslage.

## 7. Bewusste Grenzen
- Keine Cloud, kein eigener Server für Nutzerdaten (B-24).
- Keine Microsoft-Konten, solange die Registrierung fehlt (O-02).
- Kein vollständiger Virenscanner: Warnung nur, ohne Hochladen (B-13); keine Garantie „virenfrei“.
- Kein Bearbeiten der Originale (B-10).
- Keine Preise/Beträge – Auftrag ist ohne Euro (Kopf `euro: nein`).
- Platzhalter wie ⟦KUNDE-1⟧ bleiben unverändert.

## 8. Reihenfolge der Bauschritte
1. K-03 Verschlüsselter Speicherort (Grundlage für alles Gespeicherte)
2. K-01 Einlesen, Katalog, Suche, Explorer, Bedeutungssuche
3. K-09 Texterkennung (macht Fotos/Scans durchsuchbar), danach Übersetzung, Bildbeschreibung
4. K-02 Postfach (nach Klärung O-01)
5. K-04 Schutz-Prüfstelle
6. K-05 Teilen-Empfang
7. K-08 Designumbau (Annahme: früh als Grundstil, Feinschliff hier)
8. K-10 Tresorordner, Buchhaltung · K-13 Familien-App
9. K-11 Überall suchen · K-12 Chef-PIN/Beitritt
10. K-06 KI beim Schreiben (Kann)
11. K-07 Windows-App mit gemeinsamem Kern (Annahme: Kern von Anfang an trennbar halten)

## 9. Offene Fragen an den Kunden
1. O-01: Welche Mail-Anbieter genau? (Frist 2026-10-20 liegt vor dem Auftragsdatum.)
2. O-02: Microsoft – kommt die Registrierung, und bis wann?
3. Wer nutzt die App: nur die Inhaberin oder auch Mitarbeiter und Familie (wie viele Geräte)?
4. Welche „anderen Apps“, welche Buchhaltungs- und welche Familien-App? Gibt es deren Schnittstellen?
5. Welcher KI-Anbieter fürs Gegenlesen, und wer stellt den Schlüssel?
6. Soll es eine Sicherung des Katalogs geben (außer Ersatzschlüssel)?
7. Was heißt „eigenes Netz“ technisch – nur im lokalen Netz oder über das Internet? Wie passt das zu „keine Cloud“?
8. Bildbeschreibung (K-09) gewünscht, obwohl B-29 sie nicht nennt?
9. Welche Sprachen für Übersetzung und Texterkennung?
10. Soll die Windows-App auch Postfach und SD-Karten-Funktionen haben?

## 10. Unklar, widersprüchlich, doppelt
- Summe: Kopf nennt „Stunden F4 295,9–559,6“; die 13 Zeilen in „Zu tun“ ergeben 217,2–408,5 h. Widerspruch (Abschnitt „Summe“).
- „Grenzlinie vor K-01“ (Abschnitt „Summe“): steht alles hinter der Grenzlinie, wäre jeder Baustein optional – passt nicht zu den Muss-Punkten B-09 bis B-12.
- Kopf `fassung: 4`, aber `vorher: -` – eine vierte Fassung ohne Vorgänger.
- O-01 „klärt Inhaberin bis 2026-10-20“ liegt vor `datum: 2026-11-14`; B-11 ist Muss, hängt aber an O-01.
- Anlass „Mitarbeiter und Familie“ gegen B-05 „Inhaberin“ (Anzahl 1); K-12 nennt Mitarbeiter, sonst niemand.
- B-18 „offline“, B-24 „keine Cloud“ gegen K-02 Postfach, K-06 KI, K-11 „Netz“ – nur die Suche muss offline sein (B-15).
- K-09 enthält „Bildbeschreibung“, B-29 nicht.
- K-10 bündelt zwei Bedarfe (Tresorordner, Buchhaltung) unter B-30; „die anderen Apps“ nicht benannt.
- K-12 im Katalog „lizenz“ eingeordnet, inhaltlich aber Netz-Beitritt.
- B-17 „Geräte“ ohne Inhalt; B-07 und B-09 sowie B-02 und B-20 beschreiben teils dasselbe.
- Doppelt: „Bedarfsprotokoll – Änderungen“, „Vollständiger Stand“ und der JSON-Block enthalten dieselben Einträge dreimal.
- Reihenfolge: B-25 bis B-33 stehen vor B-14 (Nummern nicht fortlaufend).
- Kein Punkt NOCH NICHT GESCHÄTZT, keine Zeilen ANPASSEN/ENTFERNEN/UNVERÄNDERT.
