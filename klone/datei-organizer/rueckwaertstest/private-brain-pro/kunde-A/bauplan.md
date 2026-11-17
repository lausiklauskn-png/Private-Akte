# Bauplan · V-2026-0001 · Fassung 1 · Kunde ⟦KUNDE-1⟧

Grundlage: nur `bauauftrag.md` (Zu tun K-01…K-06) und `anleitung.txt`. Gebaut werden nur die sechs NEU-BAUEN-Zeilen.
Platzhalter ⟦…⟧ bleiben unverändert. Kein Stundensatz, keine Euro-Beträge für den Bau (`euro: nein`).

## 1. Zweck und Nutzer
Eine Anwendung, in der ⟦KUNDE-2⟧ (einzige Nutzerin, B-10) Mails, Briefe, Fotos und PDFs über **ein** Suchfeld nach Bedeutung
wiederfindet, auch abfotografierte Briefe, ohne Cloud und ohne dass Originale verändert werden (B-19…B-23, B-28).
Mails von drei Konten liest und schreibt sie im selben Programm; Unterlagen liegen verschlüsselt und lassen sich auf einem neuen Gerät
wiederherstellen (B-23, B-24, B-25).

## 2. Plattformen und Laufzeit
- Geräte laut Bedarf: Android-Tablet (Hauptgerät, Annahme bis O-03 geklärt), Android-Handy, Windows-PC (B-42…B-44).
- Läuft **offline** (B-21, B-33, B-45); das Suchmodell ist eingebaut, nicht nachgeladen (K-01).
- Netz nur für Mail-Abruf/-Versand (K-03), ausdrücklich von der Nutzerin ausgelöst (Annahme).
- Kein Benutzerkonto bei einem Dienst; Zugang über ein Passwort für die verschlüsselte Ablage (K-04). Mail-Zugangsdaten je Konto.

## 3. Bereiche/Seiten
1. **Suche** (Startseite): ein Feld, Trefferliste mit Art (Mail/Brief/Foto/PDF), Fundstelle, „Original öffnen“ (B-28, B-29).
2. **Einlesen**: Ordner wählen, Fortschritt, Ergebnis je Datei inkl. OCR-Stand (K-06, K-02).
3. **Mail**: drei Konten, Posteingang, Lesen, Schreiben/Antworten (K-03).
4. **Hinweise**: auffällige Rechnungen/Anhänge mit Begründung (K-05).
5. **Einstellungen**: Speicherort (Tablet/Speicherkarte), Passwort, Sicherung/Wiederherstellung, Mailkonten (K-04, K-03).

## 4. Funktionen (je prüfbar)
1. Suchanfrage in Alltagssprache findet einen Brief, der andere Wörter verwendet (Beispiel „Schreiben wegen der Dachrinne“) (K-01/B-19).
2. Ein Suchfeld durchsucht Mails, Briefe, Fotos, PDFs gemeinsam; Trefferart ist sichtbar (K-01/B-28).
3. Suche liefert Treffer bei abgeschaltetem Netz (K-01/B-33).
4. Treffer öffnet das Original an seinem Ort; Prüfsumme des Originals vor/nach Einlesen gleich (K-01/B-22, B-34).
5. Original wird nie kopiert-und-gelöscht oder verschoben; Katalog hält nur Verweis + Text + Vektor (K-01).
6. Foto/Scan eines Briefs wird per OCR in Text umgewandelt und ist danach über Wort und Bedeutung auffindbar (K-02/B-20, B-32).
7. OCR läuft auf dem Gerät ohne Netz (K-02, Faktor „offline“).
8. Drei IMAP/SMTP-Konten einrichtbar; Abruf zeigt Posteingang je Konto (K-03/B-35).
9. Mail schreiben, antworten, mit Anhang senden aus derselben Anwendung (K-03/B-23).
10. Abgerufene Mails und Anhänge landen im Suchkatalog (Annahme, folgt aus B-28 „ein Suchfeld für alles“).
11. Ablage ist mit Passwort verschlüsselt; ohne Passwort ist nichts lesbar (K-04/B-38).
12. Speicherort wählbar: Tablet-Speicher oder Speicherkarte (K-04/B-24, B-46).
13. Sicherung lässt sich auf einem neuen Gerät mit Passwort wiederherstellen; Katalog und Konten sind danach da (K-04/B-39).
14. Rechnungen und Anhänge werden auf Auffälligkeiten geprüft und mit Hinweis + Grund markiert (K-05/B-37).
15. Prüfung löscht, verschiebt oder ändert nichts (K-05/B-26, B-64).
16. Ganzer Ordner (PDF-Ordner, Fotos, Scans) wird in einem Schritt eingelesen, mit Fortschritt (K-06/B-27, B-36).
17. Erneutes Einlesen desselben Ordners erzeugt keine Doppel (Annahme).

## 5. Datenhaltung und Sicherheit
- Originale bleiben, wo sie sind (PC-Ordner, Fotos, Speicherkarte); nur gelesen (B-22).
- Katalog (Verweis, erkannter Text, Bedeutungsvektor), Mails, Kontodaten: lokal, verschlüsselt mit einem aus dem Passwort
  abgeleiteten Schlüssel (K-04). Verfahren (Annahme): etablierte Bibliotheks-Verschlüsselung, kein Eigenbau.
- Mail-Passwörter nur verschlüsselt gespeichert, nie im Klartext.
- Sicherung: verschlüsselte Sicherungsdatei, die auf ein neues Gerät übertragen wird (K-04). Ziel z. B. USB-Stick (Annahme, hängt an O-04).
- Keine Cloud, keine Übertragung von Unterlagen an Dritte (B-62).
- Verlust des Passworts = keine Wiederherstellung (Annahme; muss der Kundin gesagt werden).

## 6. Schnittstellen
- IMAP/SMTP der drei Mailanbieter (K-03; Anbieter offen, O-01).
- Dateisystem: Ordner auf dem PC, Speicherkarte am Tablet, Foto-Ablage des Handys (B-49, B-46, B-51) – nur lesend.
- „Original öffnen“ über die zuständige App des Geräts (Annahme).
- Keine Online-KI, keine Cloud-Dienste.

## 7. Bewusste Grenzen
- Kein Ersatz der vorhandenen Mail-Programme/-Apps (B-47, B-48) – nur zusätzlicher Weg; ob sie bleiben, nicht im Auftrag.
- Kein automatisches Löschen, Aufräumen oder Umsortieren (B-22, B-64).
- K-05 ist ein Hinweis, keine Virenprüfung und keine Gewähr gegen Betrug.
- Kein Abgleich der Kataloge zwischen den drei Geräten – steht in keinem K-Baustein (hängt an O-03).
- Keine eigene Funktion für „Nachlass verwalten“ (B-08) oder USB-Sicherung (B-06/B-50) – nicht in „Zu tun“.
- Keine Schulungsunterlage/Einweisung (B-41) – nicht als Baustein beauftragt.
- Nichts über Bau-Kosten (euro: nein).

## 8. Reihenfolge
1. K-04 Grundgerüst: verschlüsselte Ablage, Passwort, Speicherort (alles andere schreibt hinein).
2. K-06 Ordner einlesen → Katalog mit Verweisen (Textebene von PDFs).
3. K-02 OCR für Fotos/Scans in denselben Katalog.
4. K-01 Bedeutungssuche mit eingebautem Modell + „Original öffnen“.
5. K-03 Mail lesen/schreiben, Mails in den Katalog.
6. K-05 Prüfung von Rechnungen/Anhängen.
7. K-04 Rest: Sicherung und Wiederherstellung auf neuem Gerät, getestet mit zweitem Gerät.
Je Schritt: Prüfung gegen die Funktionen in § 4.

## 9. Offene Fragen an die Kundin
- O-01 Welche Mailanbieter stecken hinter den drei Konten?
- O-02 Wie viele Unterlagen ungefähr? (bestimmt Gerätespeicher, Einlesedauer, Modellgröße)
- O-03 Auf allen drei Geräten suchen oder hauptsächlich Tablet? Wenn alle: soll der Bestand zwischen Geräten gleich sein?
- O-04 Bleibt der USB-Stick als Sicherung – soll die Sicherung aus K-04 dorthin?
- Wie sollen Fotos vom Handy auf das Tablet/den PC kommen (B-04, B-51)?
- Was zählt als „komische“ Rechnung (Absender unbekannt, Kontonummer geändert, Anhang ausführbar …)?
- Darf beim Mail-Abruf das Netz benutzt werden, obwohl „ohne Internet“ verlangt ist?
- Ist der Kundin bewusst, dass ein vergessenes Passwort die Daten unzugänglich macht?

## 10. Unklar, widersprüchlich, doppelt
- **Budget vs. Umfang:** B-65 „einmalig bis 80 €“ und B-40/B-66 „Einrichtung an einem Nachmittag“ gegen „Summe Stunden F1 123,5–229,1“
  (Abschnitt Summe) – passt nicht zusammen; Klärung vor Baubeginn nötig.
- **Offline vs. Mail:** B-21/B-33/B-45 „ohne Internet“ gegen K-03/B-35 IMAP/SMTP, das Netz braucht. Lesart (Annahme): Suche offline, Mail online.
- **Doppelt:** B-40 = B-66 (wortgleich „Einrichtung an einem Nachmittag“); B-09 ≈ B-23 ≈ B-35 (Mails lesen/schreiben);
  B-01 ≈ B-52 (drei Konten); B-21 ≈ B-33 ≈ B-45 (offline); B-24 ≈ B-38 ≈ B-63 (Verschlüsselung); B-26 ≈ B-37 ≈ B-64 (nicht löschen);
  B-19 ≈ B-31; B-20 ≈ B-32 ≈ B-13; B-22 ≈ B-34; B-27 ≈ B-36; B-03 ≈ B-56/B-57; B-05 ≈ B-54 ≈ B-49; B-06 = B-50; B-04 ≈ B-53 ≈ B-51.
  Die Bedarfsliste steht außerdem zweimal vollständig im Auftrag (Abschnitte „Änderungen“ und „Vollständiger Stand“) plus JSON.
- **Nicht abgedeckt durch K-Bausteine:** B-28 (ein Suchfeld) steht in K-01 im Text, aber nicht in „deckt“; ebenso B-29, B-30, B-08, B-06/B-50,
  B-41, B-40/B-66, B-02/B-47/B-48, B-04/B-51 (Weg der Handyfotos).
- **Geräte offen:** B-42…B-44 nennen drei Geräte, O-03 stellt genau das in Frage; K-04 spricht nur von Tablet/Speicherkarte.
- **Kopf:** `repo: "Workflow-Needs"` nennt das Werkzeug, aus dem der Auftrag stammt, nicht das Ziel-Repo – Ziel-Repo fehlt.
- `datum: 2026-11-14` liegt nach dem Erstellungstag dieses Plans (13.11.); unklar, ob Absicht.
- „Erklärungen“: Verschwiegenheitserklärung nicht aktiviert, obwohl B-61 personenbezogene Daten und Nachlassunterlagen nennt.
- Keine Zeile ist als NOCH NICHT GESCHÄTZT, ANPASSEN, ENTFERNEN oder UNVERÄNDERT markiert – nur NEU BAUEN.
