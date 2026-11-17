# Bauplan · Vorgang V-2026-0001 · Fassung 4 · Kunde ⟦KUNDE-1⟧

## 1. Zweck und Nutzer
Briefe und Formulare per Tablet/Handy/PC scannen, Formularfelder erkennen, am Gerät ausfüllen, übersetzen und verschlüsselt ablegen – ohne Drucker, ohne Konto (B-11, B-12, B-13, B-16).
Nutzer: eine Inhaberin und zwei Mitarbeiterinnen (B-06, B-07; Anzahl nur im JSON) im Büro mit Kundenkontakt.

## 2. Plattformen und Laufzeit
- Native App für Android-Tablet und Windows-PC, dauerhaft signiert (K-03, B-14).
- Offline als Grundzustand (B-17, B-20); Netz nur für Wunsch-KI mit eigenem Schlüssel und für „Überall suchen“ im eigenen Netz (K-08).
- Kein Konto (B-14). Handy: im Auftrag nur als Fotoquelle genannt (B-11), keine eigene Handy-App (Annahme).

## 3. Bereiche der Oberfläche
- Bibliothek (abgelegte PDFs, Originale)
- Scanner/Kamera (K-01, K-07)
- PDF-Werkzeug: Felder erkennen, ausfüllen, Schriftgröße, eigene Feldarten, Ausgabe (K-01, K-10)
- Übersetzen (K-02)
- Überall suchen (K-08)
- Einstellungen „Tresor & Ablage“ (K-04, K-05, K-11)
- Hilfe „Wo liegt was?“ + Übersichtskarte der Apps (K-12)
- Teilen/Übergabe an andere Apps (K-09, B-22)

## 4. Funktionen (je prüfbar)
1. Foto eines Briefs wird zugeschnitten und als PDF in der Bibliothek abgelegt (K-01).
2. Formularfelder eines PDFs werden erkannt und sind am Gerät ausfüllbar (K-01).
3. Ausgabe wahlweise als festes oder als ausfüllbares PDF (K-01).
4. Original bleibt beim Ausfüllen byte-gleich erhalten (B-18).
5. Übersetzung eines Schreibens erscheint im Aufbau des Originals (K-02).
6. Übersetzung läuft ohne Netz; KI-Weg nur nach ausdrücklicher Wahl mit eigenem Schlüssel (B-17; ob offline-Übersetzung reicht: Frage 3).
7. Android-APK und Windows-Installer tragen über Updates dieselbe Signatur; Update überschreibt keine Daten (K-03).
8. Erste Einrichtung: Nutzer wählt einen Ordner; Ablage darin ist verschlüsselt (K-04).
9. Ersatzschlüssel: 5 Anteile werden erzeugt, 3 davon stellen das Passwort wieder her (K-04).
10. Einzug in einen gemeinsamen Tresorordner, den andere Apps des Büros mitnutzen (K-05, B-26).
11. Einstellungen „Tresor & Ablage“ zeigen Zustand und Ort von Ablage und Tresor (K-05).
12. Sicherung wird gestreamt geschrieben; großer Bestand ohne Absturz (K-06).
13. Sicherung/Prüfen/Einordnen laufen als Hintergrundaufgabe mit Abbrechen weiter (K-06).
14. Nichts startet von selbst: Prüfen und Einordnen nur per Knopf (K-06, B-27).
15. Windows: Scanner und Kamera nutzbar (K-07).
16. Andere Apps können den Scanner direkt starten und bekommen das Ergebnis (K-07).
17. „Überall suchen“ findet in Bibliothek und Ablageort; im eigenen Netz nur per Haken (K-08).
18. Übergabe eines Dokuments an Familien-, Mail- und Buchhaltungs-App; Absender sieht eine Quittung erst nach Übernahme (K-09).
19. Schriftgröße je Feld einstellbar; eigene Feldarten anlegbar (K-10).
20. Ordnerwahl verhindert verschachtelte Ablagen (K-11, B-33).
21. Vor Anlage einer neuen Ablage kommt eine Rückfrage (K-11).
22. „Speichern unter“ in den Ablageort warnt vorher; keine leeren Dateien bei Abbruch/Fehler (K-11, Anlass).
23. Hilfe „Wo liegt was?“ nennt Ablage, Tresor, Sicherung mit Pfad (K-12).
24. Übersichtskarte zeigt, wie die Apps zusammenhängen (K-12).
25. Teilen an Mail und andere Apps über das System-Teilen (B-22).

## 5. Datenhaltung und Sicherheit
- Dokumente nur auf dem Gerät im selbst gewählten Ordner, verschlüsselt (K-04); personenbezogene Daten (B-24).
- Passwort nicht im Klartext gespeichert (Annahme: plattformeigener Schlüsselspeicher zum Merken).
- Ersatzschlüssel 3 von 5 (K-04); Verlust aller Anteile = Daten weg (wird dem Nutzer gesagt).
- Gemeinsamer Tresorordner: eigenes Fach je App (Annahme), Schreiben nie ins Fach einer anderen App.
- Sicherung gestreamt, verschlüsselt (Annahme), in einen gewählten Ort.
- Originale unverändert (B-18); Ausgaben als neue Dateien daneben.
- Kein Browser-Speicher als einziger Datenort (B-03).

## 6. Schnittstellen
- Familien-App, Mail-App, Buchhaltungs-App (B-32): Übergabe mit Quittung (K-09), über gemeinsamen Tresor (Annahme).
- Direktstart-Aufruf des Scanners für andere Apps (K-07).
- System-Teilen (B-22).
- Eigenes Netz für Suche (K-08) – Protokoll im Auftrag nicht genannt.
- Optional KI-Dienst mit eigenem Schlüssel (B-17), Anbieter nicht genannt.

## 7. Bewusste Grenzen
- Keine Web-App/PWA: B-03 beschreibt sie als Problem, B-14 verlangt echte App (B-21 siehe Abschnitt 10).
- Kein Konto, kein Server, keine Cloud-Ablage (B-14, B-17).
- Keine eigene iOS-/Handy-App (nicht beauftragt).
- Kein Mailversand aus der App selbst; „verschickt“ (B-16) über System-Teilen.
- Kein Mehrbenutzer-Rechtesystem, solange O-01 offen ist.
- Keine Bauten zu Erklärungen/Vereinbarung/Wartung (alle „aktiviert: nein“).

## 8. Reihenfolge
1. K-03 App-Hüllen + dauerhafte Signatur (Grundlage für alles).
2. K-04 verschlüsselte Ablage + K-11 Tresor-Schutz (Anlass, Muss).
3. K-01 Scannen/Felder/Ausgabe.
4. K-06 Sicherung, Hintergrund, nichts startet von selbst.
5. K-05 gemeinsamer Tresor, Einstellungen.
6. K-09 Übergabe mit Quittung.
7. K-07 Windows-Scanner, Direktstart.
8. K-02 Übersetzen.
9. K-12 Hilfe/Übersicht.
10. K-08 Überall suchen, K-10 Schriftgröße/Feldarten (Kann).

## 9. Offene Fragen an ⟦KUNDE-1⟧
1. O-01: Brauchen die Mitarbeiterinnen eigene Geräte? (Frist 2026-10-25 liegt vor dem Auftragsdatum – Antwort da?)
2. Ein gemeinsames Passwort für alle oder je Person?
3. Übersetzen: welche Sprachen; reicht offline, oder KI mit eigenem Schlüssel – welcher Anbieter?
4. „Eigenes Netz“ für die Suche: WLAN im Büro? Welche Geräte?
5. Welche konkreten Apps sind Familien-, Mail-, Buchhaltungs-App, und haben sie schon einen gemeinsamen Tresor?
6. Welcher Windows-Scanner (Modell/Anschluss)?
7. B-25 „Vorgaben“: welche (Aufbewahrung, DSGVO)?
8. Wo soll die Sicherung liegen (Stick, zweiter Ordner)?
9. Soll K-10–K-12 trotz Grenzlinie nach K-09 gebaut werden (K-11 ist Muss)?

## 10. Unklar, widersprüchlich, doppelt
- B-21 „Web-App im Browser“ (Bereich 11) widerspricht B-14 und B-03; als Ist-Zustand gedeutet (Annahme).
- Summe „193,9–366,1“ passt nicht zur Tabelle: Summe K-01–K-12 = 141,7–265,2 h.
- Grenzlinie „nach K-09“ legt K-11 (Muss, B-33, Anlass des Auftrags) unter die Linie.
- Größenangaben widersprechen Stunden: K-01 „groß“ 5,3–8,8 h; K-11 „klein“ 10–20 h; K-06 „mittel“ 24–44 h.
- Kopf „fassung: 4“ mit „vorher: -“: Vorgängerfassung fehlt, Änderungsliste nennt alles als NEU.
- O-01 „bis 2026-10-25“ liegt vor „datum: 2026-11-14“.
- B-17 „ohne Internet“ vs. K-08 „eigenes Netz“ und KI-Übersetzung – nur als Wahl vereinbar.
- „Ablageort“, „Hauptablage“, „Tresorordner“, „Ablage“ werden nebeneinander benutzt (K-04, K-05, K-08, B-33) – Abgrenzung unklar.
- Doppelt: Bedarfsliste steht dreimal (Änderungen, Vollständiger Stand, JSON); K-Liste zweimal (Tabelle, Stand) plus JSON.
- Vage Einträge: B-19 „Geräte“, B-20 „offline“, B-25 „Vorgaben“, B-04 „Dokumente“.
- B-16 „verschickt“: kein Baustein deckt Versand ab (nur B-22 ohne K).
- B-31 mit der Bausteinbezeichnung K-10 wortgleich; B-32/B-22 überschneiden sich.
- NOCH NICHT GESCHÄTZT: keine Zeile so markiert; euro: nein (Beträge weggelassen).
