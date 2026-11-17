# Bauplan · Vorgang V-2026-0001 · Fassung 4 · Kunde ⟦KUNDE-1⟧

## 1. Zweck und Nutzer
Eine App, die Mails, Dokumente und Fotos privat auf dem eigenen Gerät einliest, verschlüsselt ablegt und – auch nach dem Sinn – durchsuchbar macht, ohne dass etwas ungefragt das Gerät verlässt (B-08, B-09, B-14).
Nutzer ist die Inhaberin (B-05); laut Anlass zusätzlich Mitarbeiter und Familie, die Dokumente arbeitsplatzübergreifend finden und an andere Apps weitergeben.

## 2. Plattformen und Laufzeit
- Hauptgerät: Android-Tablet mit SD-Karte (B-22); zusätzlich Windows mit gemeinsamem Kern (K-07, B-30).
- Offline als Grundzustand: Suche, Katalog, Texterkennung, Übersetzung laufen ohne Internet (B-15, B-21, K-09).
- Online nur für: Postfächer (IMAP/SMTP, Google-Anmeldung, B-24), optionale KI beim Schreiben (K-06), optionales eigenes Netz (K-11, K-12) – jeweils nutzer-ausgelöst (Annahme, abgeleitet aus B-14).
- Kein Konto bei uns, keine Cloud (B-27); Mailkonten sind Konten der Anbieter.

## 3. Bereiche der Oberfläche
- Suche (Startseite), Dateien hinzufügen, Explorer (K-01)
- Postfach mit Ordnern, Entwürfen, Schreiben (K-02, B-19)
- Speicherort/Tresor und Ersatzschlüssel (K-03, K-10)
- Prüfbefund je Datei und Schutz-Prüfstelle (B-18, K-04)
- Einstellungen: Themen, Netz/Chef-PIN, KI-Schlüssel (K-08, K-12, K-06)
- „Überall suchen“ (K-11)

## 4. Funktionen (je prüfbar)
1. Dateien hinzufügen: jede Datei wird genau einmal gelesen, ein kleiner Katalogeintrag bleibt (B-16).
2. Beim Einlesen eine geprüfte Originalkopie speichern; Original bleibt unverändert und lässt sich öffnen (B-10, B-17).
3. Fehlende Originale lassen sich neu zuordnen (B-17).
4. Wortsuche über Mails, Dokumente, Fotos gemeinsam, ohne Internet (B-09, B-15).
5. Bedeutungssuche mit einem Modell auf dem Gerät, ohne Internet (K-01, B-07).
6. Explorer zeigt eingelesene Dateien (K-01, B-23).
7. Prüfung beim Hinzufügen: Anweisung an eine KI, versteckter Text, verdächtige Anhänge; Befund sichtbar (B-18).
8. Schutz-Prüfstelle warnt vor Viren, Spam, Betrug, ohne Dateien hochzuladen (K-04, B-13).
9. Postfach: Konto anlegen, lesen, schreiben, senden mit Anhang, Ordner, Entwürfe, direkt vom Gerät (K-02, B-11, B-19).
10. Mehrere Anbieter: Telekom, Gmail (Google-Anmeldung), WEB.DE, GMX (B-11, B-24); weitere nach O-01.
11. Speicherort auf Tablet oder SD-Karte wählen; Inhalt verschlüsselt mit Passwort (K-03, B-12).
12. Ersatzschlüssel erzeugen und damit das Passwort zurückholen (K-03, B-12).
13. Gemeinsamer Tresorordner mit den anderen Apps, ein Passwort, Einrichten nur durch Wahl des Speichers (K-10, B-33, B-34).
14. Mail an die Buchhaltung geben (K-10, B-33).
15. Mail mit Anhängen an die Familien-App geben (K-13, B-37).
16. Empfang über „Teilen“ aus anderen Apps, Datei landet im Einlesen (K-05, B-28).
17. KI gegenlesen beim Schreiben; Namen werden vorher durch Platzhalter ersetzt und nach der Antwort wieder eingesetzt (K-06, B-29).
18. Lokale Texterkennung in Fotos und Scans (K-09, B-32).
19. Lokale Übersetzung von Mails (K-09, B-32).
20. Bildbeschreibung lokal (K-09).
21. „Überall suchen“: eigener Katalog, gemeinsamer Ablageort, auf Wunsch eigenes Netz; Netz nur mit Haken (K-11, B-35).
22. Chef legt eigenes Netz per Chef-PIN fest; Mitarbeiter treten mit einem Beitritts-Zettel bei (K-12, B-36).
23. Farbthemen, Liniensymbole, kompakte Zeilen (K-08, B-31).
24. Windows-Fassung mit denselben Funktionen auf gemeinsamem Kern (K-07, B-30).

## 5. Datenhaltung und Sicherheit
- Personenbezogene Daten: ja (B-26) → alles verschlüsselt im gewählten Speicherort (B-12).
- Katalog klein, Originale als geprüfte Kopie getrennt vom Katalog (B-16, B-17).
- Mail-Zugangsdaten nur verschlüsselt auf dem Gerät, nie im Klartext gespeichert oder protokolliert (Annahme).
- Nichts verlässt das Gerät ungefragt (B-14); jeder Online-Weg nur nach Tipp (Annahme).
- Ersatzschlüssel als einziger Rückweg bei vergessenem Passwort; kein Herstellerzugang (Annahme, folgt aus B-27).
- Platzhalter ⟦…⟧ bleiben in allen Texten unverändert.

## 6. Schnittstellen
- IMAP/SMTP der Mail-Anbieter; Google-Anmeldung für Gmail (B-24).
- Betriebssystem-„Teilen“ (Empfang K-05; Weitergabe K-10, K-13).
- Gemeinsamer Tresorordner der anderen Apps (B-33, B-34) – Format/Partner-Apps nicht benannt.
- Buchhaltungs-App und Familien-App als Empfänger (K-10, K-13) – nicht benannt.
- KI-Dienst für K-06 (Anbieter nicht benannt).
- Eigenes Netz für K-11/K-12 (Technik nicht benannt).

## 7. Bewusste Grenzen
- Kein Microsoft-Konto, solange die Registrierung fehlt (O-02).
- Keine Cloud, kein eigener Server (B-27).
- Keine Preise/Beträge – euro: nein, Beträge weggelassen.
- Schutz-Prüfstelle ersetzt keinen Virenscanner; Aussage „virenfrei“ wird nicht gemacht (Annahme; K-04 mit 3–4,8 h reicht nicht für eine eigene Viren-Engine).
- Keine iOS-/Mac-Fassung (nicht beauftragt).

## 8. Reihenfolge der Bauschritte
1. K-03 Speicherort/Verschlüsselung (Grundlage für alles Gespeicherte).
2. K-01 Einlesen, Katalog, Originalkopie, Suche, Explorer, Bedeutungssuche; dazu Prüfung B-18.
3. K-02 Postfach (Anbieter laut O-01).
4. K-04 Schutz-Prüfstelle.
5. K-05 Teilen-Empfang.
6. K-09 Texterkennung, Übersetzung, Bildbeschreibung.
7. K-10 Tresorordner + Buchhaltung, K-13 Familien-App.
8. K-11 Überall suchen, danach K-12 Chef-PIN.
9. K-06 KI beim Schreiben.
10. K-08 Designumbau (Annahme: früh als Gerüst sinnvoll, Feinschliff am Ende).
11. K-07 Windows-App auf dem bis dahin stabilen Kern.

## 9. Offene Fragen an den Kunden
- O-01: Welche Mail-Anbieter genau? (Frist 2026-10-20 liegt vor dem Auftragsdatum – ist sie geklärt?)
- O-02: Kommt die Microsoft-Registrierung, und bis wann?
- Welche „anderen Apps“ teilen den Tresorordner, welches Format?
- Welche Buchhaltungs-App und welche Familien-App sind gemeint?
- Welcher KI-Anbieter für K-06, mit wessen Schlüssel?
- Wer sind die Nutzer: nur die Inhaberin (Anzahl 1) oder auch Mitarbeiter/Familie?
- Welche Sprachen für Übersetzung und Texterkennung?
- Welche Technik/Reichweite für das „eigene Netz“?
- Was heißt „Viren“-Warnung ohne Hochladen konkret (lokale Listen, Fingerabdruck-Abfrage)?

## 10. Unklar, widersprüchlich, doppelt
- Kopf `vorher: -` bei `fassung: 4`, und alle Bedarfe/Bausteine stehen als „NEU“ – keine Vorfassung erkennbar.
- `datum: 2026-11-14`, aber O-01 „klärt bis 2026-10-20“ – Frist liegt vor dem Auftrag.
- B-05 „Inhaberin“, Anzahl 1 vs. Anlass „Mitarbeiter und Familie“ und B-36 „Chef/Mitarbeiter“.
- B-15/B-21 offline vs. K-02 Postfach, K-06 KI, K-11 Netz – Online-Teile; Grenze nicht festgelegt.
- B-27 „keine Cloud“ vs. B-24 Google-Anmeldung und K-06 KI-Dienst.
- B-13 „Viren … ohne alles hochzuladen“ vs. Umfang K-04 (3–4,8 h) – Erwartung unklar.
- B-33 und B-34 beschreiben denselben gemeinsamen Ablageort doppelt (Soll vs. Muss-Anforderung).
- B-18 (Prüfung beim Hinzufügen), B-16, B-17, B-19, B-34 werden von keinem K-Baustein in „deckt“ genannt; ich ordne sie K-01, K-02, K-10 zu (Annahme).
- K-09 „Bildbeschreibung“ hat keinen eigenen Bedarf (B-32 nennt nur Texterkennung und Übersetzung).
- K-11 „Netz“ und K-12 „eigenes Netz“: ohne Bedarf zur Technik; B-35 sagt nur „auf Wunsch“.
- B-20 „Geräte“ nur ein Stichwort; B-30 Windows nicht in Bereich 10 (Geräte) genannt.
- Summe: Zeilen ergeben 217,2–408,5 h; Abstimmung/Puffer rechnen mit 219,2–414,7 h als Grundlage. Etwa 2–6,2 h stehen in keiner Zeile.
- Anlass „von: Kunde“, Offene Punkte „klärt Inhaberin“ – vermutlich dieselbe Person, nicht gesagt.
