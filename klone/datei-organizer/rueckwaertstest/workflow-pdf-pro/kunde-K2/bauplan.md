# Bauplan · Vorgang V-2026-0001 · Fassung 4 · Kunde ⟦KUNDE-1⟧

Grundlage: nur `bauauftrag.md` und `anleitung.txt`. Gebaut werden nur die Zeilen „NEU BAUEN“ K-01 bis K-12.

## 1. Zweck und Nutzer
Ein Büro (Inhaberin, zwei Mitarbeiterinnen, B-06/B-07) soll Briefe abfotografieren, Formulare am Gerät erkennen,
ausfüllen und übersetzen, statt zu drucken und wieder einzuscannen (B-02, B-11–B-13, B-16). Alles läuft als App ohne
Konto, offline, mit verschlüsselter Ablage in einem selbst gewählten Ordner (B-14, B-15, B-17).

## 2. Plattformen und Laufzeit
- Android-App (Tablet) und Windows-App, je mit dauerhafter Signatur (K-03, B-14).
- Offline; KI nur auf Wunsch mit eigenem Schlüssel (B-17). Kein Konto (B-10, B-14).
- Handy: in B-11 genannt, in B-14 nicht (Annahme: Android-App läuft auch am Handy, kein eigener Zuschnitt).
- Die heutige Web-App im Browser (B-03, B-22) wird abgelöst bzw. übernommen (B-19), nicht weiterentwickelt (Annahme).

## 3. Bereiche der Oberfläche
1. Bibliothek (Dokumente, Originale, ausgefüllte PDFs, B-24)
2. Scannen (Kamera; unter Windows auch Scanner)
3. Formular-Editor (Felder erkennen, ausfüllen, Schriftgröße, Feldarten)
4. Übersetzen
5. Suche „Überall suchen“
6. Übergabe / Eingang (andere Apps)
7. Einstellungen mit Bereich „Tresor & Ablage“ (K-05), Sicherung
8. Hilfe „Wo liegt was?“ und Übersichtskarte der Apps (K-12)

## 4. Funktionen (prüfbar)
1. Foto/Kamera-Aufnahme eines Briefs wird zugeschnitten und als PDF in der Bibliothek abgelegt (K-01, B-11).
2. Formularfelder eines PDFs werden ohne Netz erkannt und lassen sich am Gerät ausfüllen (K-01, B-12).
3. Ausgabe wahlweise als festes oder ausfüllbares PDF (K-01, B-12).
4. Das Original bleibt nach Ausfüllen und Übersetzen byte-gleich erhalten (B-18).
5. Ein fremdsprachiges Schreiben wird übersetzt; das Ergebnis behält den Aufbau des Originals (K-02, B-13).
6. Android- und Windows-Fassung werden mit derselben dauerhaften Signatur ausgeliefert; Updates installieren über die alte Fassung (K-03).
7. Erste Einrichtung: Ordner wählen, Passwort setzen, Hauptablage verschlüsselt anlegen (K-04, B-15).
8. Ersatzschlüssel in 5 Teilen; 3 beliebige stellen den Zugang wieder her (K-04).
9. Einzug in den gemeinsamen Tresorordner mit Fach je App, Übergabefächern und verschlüsseltem Inhaltsverzeichnis je Fach (K-05, B-27, B-30).
10. Einstellungen „Tresor & Ablage“ zeigen Zustand und Ort von Hauptablage und Tresor (K-05).
11. Sicherung der Bibliothek als verschlüsselte Datei, gestreamt (große Bestände ohne Absturz) (K-06, B-28, B-31).
12. Zurückholen einer Sicherung fügt hinzu und überschreibt nie (B-31).
13. Sicherung, Prüfen und Einordnen laufen als Hintergrundaufgabe und starten nur auf Knopfdruck (K-06, B-28).
14. Unter Windows: Scanner und Kamera nutzbar (K-07, B-29).
15. Andere Apps können den Scanner direkt starten (K-07, B-29).
16. „Überall suchen“ durchsucht Bibliothek und Ablageort; das eigene Netz nur nach Einschalten (K-08, B-32).
17. Übergabe eines Dokuments an Familien-, Mail- oder Buchhaltungs-App über das Übergabefach; Quittung kommt zurück und wird angezeigt (K-09, B-33, B-36).
18. Eingang aus diesen Apps nur mit Einzelauswahl, nichts wird automatisch übernommen (B-36; siehe Punkt 10, kein K-Baustein).
19. Teilen an Mail und andere Apps über das System-Teilen (B-23).
20. Schriftgröße je Feld einstellbar; eigene Feldarten anlegbar (K-10, B-34).
21. Ordnerwahl verhindert Verschachtelung (Ablage in Ablage) (K-11, B-37).
22. Vor dem Anlegen einer neuen Ablage kommt eine Rückfrage (K-11, B-37).
23. Speichern in den Ablageort von außen („Speichern unter“) löst eine Warnung aus; es entstehen keine leeren Dateien (K-11, Anlass).
24. Hilfe „Wo liegt was?“ nennt die echten Pfade; Übersichtskarte zeigt, wie die Apps zusammenhängen (K-12, B-38).

## 5. Datenhaltung und Sicherheit
- Personenbezogene Daten (B-25): alles verschlüsselt im gewählten Ordner, nicht nur im App-Speicher (B-03 als Gegenbeispiel).
- Hauptablage (K-04) und gemeinsamer Tresor (K-05) mit je verschlüsseltem Inhaltsverzeichnis (B-30).
- Passwort nie im Klartext gespeichert (Annahme); Ersatzschlüssel 3 von 5.
- Originale unverändert, Bearbeitungen als eigene Dateien (B-18).
- KI-Aufrufe (Annahme: nur Übersetzung oder Felderkennung als Zusatz) erst nach Bestätigung, mit eigenem Schlüssel (B-17).

## 6. Schnittstellen
- Familien-, Mail-, Buchhaltungs-App des Betriebs (B-35): Übergabe-/Eingangsfächer im Tresor, Quittung (K-09, B-36).
- Direktstart des Scanners aus anderen Apps (K-07).
- System-Teilen (B-23).
- Eigenes Netz für die Suche (K-08) – Protokoll im Auftrag nicht beschrieben.
- Optional KI-Dienst mit eigenem Schlüssel (B-17).

## 7. Bewusste Grenzen
- Keine Konten, kein Server, kein Zwang ins Internet (B-14, B-17).
- Keine automatischen Läufe (Prüfen, Einordnen, Sicherung) ohne Knopfdruck (B-28).
- Kein Überschreiben beim Zurückholen (B-31).
- Keine Weiterentwicklung der Browser-Web-App; kein iOS/Mac (nicht beauftragt).
- Keine Kosten/Preise im Plan (euro: nein; Stundensatz nie im Auftrag).
- O-01 (eigene Geräte der Mitarbeiterinnen) wird nicht vorweg entschieden; keine Mehrbenutzer-Verwaltung gebaut.

## 8. Reihenfolge der Bauschritte
1. K-03 App-Hüllen Android/Windows mit dauerhafter Signatur (Grundlage für alles Weitere).
2. K-04 verschlüsselte Hauptablage + Ersatzschlüssel, zusammen mit K-11 (Tresor-Schutz, Anlass des Auftrags).
3. K-01 Scannen, Felder erkennen, ausfüllen, Ausgabe (Übernahme aus der Web-App, B-19).
4. K-06 gestreamte Sicherung, Hintergrundaufgabe.
5. K-05 gemeinsamer Tresorordner und „Tresor & Ablage“.
6. K-12 Hilfe „Wo liegt was?“ (früh, weil Nutzer laut Anlass Orientierung brauchen).
7. K-02 Übersetzen; K-07 Scanner/Kamera Windows, Direktstart.
8. K-09 Übergabe mit Quittung (+ Eingang B-36).
9. K-08 „Überall suchen“; K-10 Schriftgröße/Feldarten (Kann).

## 9. Offene Fragen an den Kunden
1. O-01: Brauchen die Mitarbeiterinnen eigene Geräte? (Frist 2026-10-25 ist vor dem Auftragsdatum verstrichen.)
2. Welchen Funktionsumfang hat die „bestehende Formular-Web-App“ genau (B-19)? Liste oder Zugang zur Abnahme?
3. Soll die App auch auf Android-Handys laufen (B-11 vs. B-14)?
4. Übersetzen offline oder nur per KI mit eigenem Schlüssel (B-13 vs. B-17)? Welche Sprachen?
5. Was ist das „eigene Netz“ für die Suche (K-08, B-32), und welche Daten dürfen dort sichtbar werden?
6. Wie verhalten sich Hauptablage (K-04) und gemeinsamer Tresorordner (K-05): ein Ort oder zwei, ein Passwort oder zwei?
7. Was steckt hinter B-26 „Vorgaben“ (Bereich 15)?
8. „Verschickt“ (B-16): reicht Teilen an die Mail-App, oder soll die App selbst versenden?
9. Wer bewahrt die 5 Teile des Ersatzschlüssels auf?

## 10. Unklar, widersprüchlich oder doppelt
- Größe und Stunden passen nicht: K-01 „groß“ 5,3–8,8 h, K-11 „klein“ 10–20 h, K-06 „mittel“ 24–44 h (Tabelle „Zu tun“).
- Summe passt nicht exakt zu den Zeilen: Zeilen ergeben 141,7–265,2 h; aus „Abstimmung 15 % (21,5–40,7 h)“
  folgt eine Basis von ~143,3–271,3 h; 141,7+21,5+28,7 = 191,9 statt 193,9 (Abschnitt „Summe“).
- O-01 Frist 2026-10-25 liegt vor `datum: 2026-11-14` (Kopf, „Offene Punkte“).
- Kopf `fassung: 4`, aber `vorher: -` und alle Bedarfe als „NEU“ unter „Änderungen“ – keine Vorfassung erkennbar;
  dieselbe Liste steht doppelt in „Vollständiger Stand“.
- Anlass nennt „falsche Ordner und leere Dateien“ als „Befund beim Bau“, obwohl alle Zeilen NEU BAUEN sind.
- Begriffe für denselben Ort wechseln: „Hauptablage“ (K-04), „Tresorordner“ (K-05), „Ablageort“ (B-27, B-37, K-08).
- B-14 „Android-Tablet“, B-11 „Tablet oder Handy“.
- B-36 „Eingang mit Einzelauswahl“, B-30, B-31, B-18, B-19 (Muss-Anforderungen Bereich 8) sind keinem K-Baustein zugeordnet.
- „Ersatzschlüssel 3 von 5“ nur in K-04, B-15 nennt kein Verfahren.
- K-08 „über Bibliothek, Ablageort und eigenes Netz“ vs. B-32 „in allen Apps gleichzeitig“ – deckt sich nicht ganz.
- B-03/B-22 (Web-App) als Ist-Zustand vs. B-19 (Umfang der Web-App übernehmen): ob die Web-App weiterläuft, bleibt offen.
