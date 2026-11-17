# Bauplan · V-2026-0001 · Fassung 4

Kunde: ⟦KUNDE-1⟧ · Grundlage: `bauauftrag.md` (Fassungsdatum 2026-11-04). Alle Zeilen unter „Zu tun“ sind NEU BAUEN; es gibt keine Zeilen UNVERÄNDERT, ANPASSEN, ENTFERNEN oder NOCH NICHT GESCHÄTZT.

## 1. Zweck und Nutzer
- Zweck: Papierformulare und Briefe ohne Drucker bearbeiten – abfotografieren/scannen, als ordentliches PDF ablegen, Formularfelder erkennen und am Gerät ausfüllen, fremdsprachige Schreiben übersetzen (B-11, B-12, B-13, Ziel B-16: „in Minuten ausgefüllt und verschickt“).
- Ausgangslage: Papier, Drucken–Ausfüllen–Einscannen, bisherige Browser-Web-App verliert Daten beim Löschen des Browsers (B-01–B-03); Formulare kommen schief zurück (B-09); kein kontoloses Werkzeug mit Felderkennung (B-10).
- Nutzer: 1 Inhaberin, 2 Mitarbeiterinnen (B-06, B-07). Inhalt: Briefe, Formulare, Fotos, ausgefüllte PDFs, personenbezogene Daten (B-27, B-28).
- Anlass dieser Fassung: beim Einrichten am Gerät entstanden falsche Ordner und leere Dateien; Nutzer sollen verstehen, wo was liegt (→ K-11, K-12).

## 2. Plattformen, Datenort, Sicherung, Netz
- Plattformen: Android-App (dauerhaft signiert), Windows-App (Installer zunächst unsigniert, Warnung wird erklärt, B-22), Web-App im Browser weitergeführt für iPhone/iPad auf demselben Stand (K-03, B-14, B-20, B-25). Kein Konto.
- Datenort: nur auf dem Gerät. Start ohne Ordnerwahl mit interner Arbeitsablage; eigener Ordner (Gerätespeicher, SD-Karte, anderer Datenträger) freiwillig (B-21, B-49). Kein Abgleich zwischen Geräten.
- Verschlüsselung: Tresor und Sicherungen mit Passwort, PBKDF2-SHA256 600 000 Runden, AES-256-GCM, Passwort nur im Arbeitsspeicher (B-50). Ersatzschlüssel 3 von 5 (K-04).
- Sicherung: verschlüsselte Sicherungsdatei der Bibliothek, vom Nutzer angestoßen, gestreamt (kein Absturz bei großem Bestand); Zurückholen fügt hinzu, überschreibt nie (K-06, B-31, B-34).
- Netz: arbeitet immer ohne Internet (B-17). KI nur auf Wunsch, mit eigenem Schlüssel, Nutzer wählt in der App. Kein Hochladen an fremde Dienste ohne Bestätigung (N-02). Optional Suche im eigenen Netz (K-08).
- Originale werden unverändert aufbewahrt (B-18).

## 3. Bereiche/Seiten
1. Bibliothek mit Ordnern (B-42): ablegen, verschieben, als Vorlage duplizieren, löschen.
2. Einlesen (B-44): PDF/Bilder, ganze Ordner, Ziehen auf die Seite, angehängte Seiten.
3. Scanner/Kamera (B-45, K-07): Blatt finden, Ecken mit Lupe, entzerren, A4/US Letter.
4. Formular-Editor (B-43, B-46, K-10): Felder setzen/verschieben/vergrößern/ausfüllen, Schriftgröße je Feld, eigene Feldarten.
5. Ausgabe/Ansicht/Druck (B-47).
6. Übersetzen (K-02, B-48).
7. Suche „Überall suchen“ (K-08).
8. Übergabe/Eingang (K-09, B-39).
9. Einstellungen „Tresor & Ablage“ (K-04, K-05, K-11).
10. Hilfe „Wo liegt was?“ und Übersichtskarte der Apps (K-12).

## 4. Funktionen
1. **K-01 (B-11, B-12):** Foto/Scan → PDF; vorhandene Formularfelder samt Wert übernehmen; neue Felder ohne Netz aus Linien, Rahmen, Kästchen erkennen; ausfüllen; Ausgabe als festes PDF, ausfüllbares PDF, leere Vorlage (B-45–B-47). Vorlage Workflow PDF, 80 % wiederverwendet, Faktor Druck/PDF.
2. **K-02 (B-13):** Übersetzen DE↔RU↔EN, Seite für Seite in der Lage des Originals (B-48). Vorlage „–“, 80 % wiederverwendet, Faktor Mehrsprachig. Weg (lokal oder KI) siehe Frage 8.
3. **K-03 (B-14):** Android-App mit dauerhafter Signatur, Windows-App mit unsigniertem Installer und erklärter Warnung; voller Funktionsumfang der bestehenden Formular-Web-App plus Geräteanbindung und verschlüsselte Ablage (B-19); Web-App bleibt auf gleichem Stand (B-20).
4. **K-04 (B-15):** Verschlüsselte Hauptablage, intern oder im gewählten Ordner; Ersatzschlüssel 3 von 5 bei vergessenem Passwort. Vorlage Datei-Post, 60 %.
5. **K-05 (B-30):** Einzug in den gemeinsamen Tresorordner der Pro-Apps; Fächer je App und Übergabefächer mit verschlüsseltem Inhaltsverzeichnis je Fach (B-33); Einstellungsbereich „Tresor & Ablage“. Vorlage Datei-Post, 60 %.
6. **K-06 (B-31):** Gestreamte Sicherung als Hintergrundaufgabe; Prüfen und Einordnen nur auf Knopfdruck, nichts startet von selbst (N-01). B-31 ist „vorschlagen, Kunde bestätigt“.
7. **K-07 (B-32):** Scanner und Kamera unter Windows; andere Apps (genannt: BookLedgerPro) können den Scanner direkt starten. Vorlage Workflow PDF, 70 %.
8. **K-08 (B-35):** „Überall suchen“ über Bibliothek, gemeinsamen Ablageort und auf Wunsch eigenes Netz. Vorlage Company Brain, 40 %.
9. **K-09 (B-36, B-39):** Übergabe an Familien-, Mail- und Buchhaltungs-App mit Quittung; Eingang mit Einzelauswahl; Zusammenarbeit nur freiwillig. Teilen an Mail und andere Apps (B-26).
10. **K-10 (B-37):** Schriftgröße je Feld, eigene Feldarten. Vorlage Workflow PDF, 80 %.
11. **K-11 (B-40):** Ordnerwahl ohne Verschachtelung, Rückfrage vor Anlegen einer neuen Ablage, Warnung beim Speichern in den Ablageort (gegen falsche Ordner und leere Dateien aus dem Anlass).
12. **K-12 (B-41):** Hilfe „Wo liegt was?“ und Übersichtskarte, wie die Apps zusammenhängen. Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page, 50 %.

Ohne eigenen Baustein, aber abzunehmen: B-17, B-18, B-19, B-20, B-21, B-33, B-34, B-39, B-42–B-50.

## 5. Schnittstellen zu anderen Programmen
- Gemeinsamer Tresorordner der Pro-Apps (Fächer, Übergabefächer, verschlüsseltes Inhaltsverzeichnis).
- Dateien hin- und hergeben mit Quittung; Eingang mit Einzelauswahl (Familien-, Mail-, Buchhaltungs-App, B-38).
- Gemeinsame Suche über die Apps.
- Scanner-Direktstart aus BookLedgerPro.
- Teilen an Mail und andere Apps über das System.
- KI-Dienste nur mit eigenem Schlüssel und Bestätigung.

## 6. Ausdrücklich nicht
- N-01: Prüfen und Einordnen starten nie von selbst.
- N-02: Kein Hochladen von Dokumenten an fremde Dienste ohne Bestätigung.
- Kein Konto, kein Abgleich zwischen Geräten, keine Daten außerhalb des Geräts (außer bestätigter KI).
- Keine Änderung der Originale.

## 7. Abnahme
- Je Baustein K-01–K-12: die in Abschnitt 4 genannte Funktion am Android-Gerät, unter Windows und (wo zutreffend) im Browser vorführen.
- B-17: vollständiger Durchlauf (Scannen → Felder → Ausfüllen → Ausgabe) ohne Netz.
- B-18: Original nach Bearbeitung bytegleich vorhanden.
- B-21: Erststart ohne Ordnerwahl funktioniert.
- B-34: Zurückholen einer Sicherung fügt hinzu, überschreibt keinen Bestand.
- B-50: Verschlüsselungsparameter nachweisen; Passwort nicht gespeichert.
- K-04: Wiederherstellung mit 3 von 5 Ersatzschlüsselteilen, mit 2 nicht.
- K-06/N-01: nach Einlesen läuft keine Prüfung/Einordnung ohne Knopfdruck; Sicherung eines großen Bestands bricht nicht ab.
- K-11: Auswahl eines verschachtelten Ordners abgewiesen; Rückfrage vor neuer Ablage; Warnung beim Speichern in den Ablageort; keine leeren Dateien.
- K-09: Übergabe erzeugt Quittung; Eingang verlangt Einzelauswahl.
- Sterne-Bewertung der Mitarbeiterinnen bei der Abnahme (vorhanden für B-11, B-12, B-13).

## 8. Offene Fragen und Widersprüche im Auftrag
1. **Geräte:** Rahmen nennt „Android-Handy“, B-11/B-14 nennen Android-**Tablet** (und Handy). Ziel: beide?
2. **„Bestehende Formular-Web-App“ (B-19):** ihr Funktionsumfang ist im Auftrag nicht beschrieben; „voller Umfang übernehmen“ ist so nicht prüfbar.
3. **Sicherung „selbst anstoßen“ vs. K-06 „Hintergrundaufgabe“:** läuft nur die Ausführung im Hintergrund, nachdem der Nutzer sie startet? Gibt es keine automatische Sicherung?
4. **„Ohne Internet: immer“ vs. K-08 „eigenes Netz“ und KI:** Ist lokales Netz erlaubt? Wie wird das eigene Netz verbunden (Protokoll, Kennung)?
5. **Ersatzschlüssel 3 von 5:** Form der Teile (Papier, Datei, Code), wer sie erhält – nicht beschrieben.
6. **Gemeinsamer Tresorordner:** Format, Fachnamen, Passwort gemeinsam oder je App, Verhältnis zur eigenen Hauptablage (K-04 vs. K-05) – nicht festgelegt.
7. **Quittung (K-09):** Inhalt und Weg der Quittung, Verhalten bei fehlender Quittung offen. Wie erreichen Übergaben die Familien-/Mail-/Buchhaltungs-App technisch?
8. **Übersetzen (K-02):** lokal ohne Netz oder nur per KI? Vorlage „–“ bei 80 % Wiederverwendung ist widersprüchlich. Was geschieht mit Scans ohne Textebene?
9. **Scanner-Direktstart:** Mechanismus (Intent, Adresse) und Rückweg des Ergebnisses zur aufrufenden App fehlen; nur BookLedgerPro genannt, K-07 spricht von „anderen Apps“.
10. **Windows-Scanner:** welche Gerätearten/Schnittstellen unterstützt werden müssen.
11. **Signatur Android:** wer die Schlüssel hält; unsigniertes Windows „zunächst“ – wann signiert?
12. **„Eigene Feldarten“ (K-10):** welche Arten (Datum, Kästchen, Unterschrift …) – nicht genannt.
13. **Übersichtskarte (K-12):** welche Apps darauf erscheinen und ob sie Live-Zustand zeigt.
14. **Gesamtauftrag „keine frühere Fassung“ bei Fassung 4:** Fassungen 1–3 fehlen; ob Vorhandenes (z. B. aus den Vorlagen) schon gebaut ist, bleibt unklar.
15. **Offene Punkte „keine“**, obwohl der Anlass (falsche Ordner, leere Dateien) eine Ursache hat, die nicht beschrieben ist.
16. **Abnahmekriterien je Baustein** fehlen; der Abschnitt „Je Baustein“ nennt nur Vorlagen, für K-03, K-06, K-09, K-11 nicht einmal diese.
17. B-31 „vorschlagen, Kunde bestätigt“: was genau schlägt das System vor (Einordnung? Sicherung?).
18. Sterne „bei der Abnahme“ liegen schon vor, obwohl alles neu zu bauen ist – Bedeutung unklar.
