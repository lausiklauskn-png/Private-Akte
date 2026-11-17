# Pseudonymisierer – Plan und Stand (14.11.2026)

Auftrag (Klaus 14.11.2026): ein eigenes Werkzeug „in der Art wie der Datei-Organizer, im Stil der Familienakte“, das **ganze Ordner**
pseudonymisiert (z. B. Brief + AGB + Nutzungsvereinbarung), die Fassung für **jede KI** ausgibt und die Antwort der KI **zurückführt**.
Bilder: **frei setzbare Flächen, 100 % schwarz** (Kennzeichen, Gesichter, Szenen), Bedienung wie das Kontur-Werkzeug in Tomys Hub; das
Bild kommt zurück, die abgedeckten Stellen werden aus dem Original ergänzt. Soll Teil der Pro-App-Familie werden (APK, Windows, Updates
wie die anderen Pro-Apps); Verbindung zu anderen Apps möglich, aber nicht von selbst eingeschaltet. Sehr einfach gestaltet.
Klaus 14.11.: „Plan ist einfach und nachvollziehbar … anfangen mit dem Bauen und eine Version herausbringen, die ich als PWA anschauen kann.“

## Stand 0.1.0 (gebaut, PWA)

Adresse: `https://lausiklauskn-png.github.io/Datei-Organizer/pseudonymisierer/` (leitet auf `app/pseudonymisierer.html`).
Liegt als **zweite Seite im Repo Datei-Organizer** (gleicher Bau, gleiche Gestaltung, gleiche Bausteine) – bis es ein eigenes Repo gibt.

| Teil | Wo | Was |
|---|---|---|
| Maske | `lib/maske/` (byte-gleich aus der Familienakte, Pin `lib/maske/HERKUNFT.json`, `node scripts/maske-nachziehen.mjs [--pruefen]`), Modul 25 in `src/public/vendor/maske/` | dieselbe Erkennung wie der Pseudo-Knopf der Familienakte 2.28.68 |
| Auftrag | `lib/pseudo/auftrag.ts` | mehrere Dateien gemeinsam: gleiche Person = gleicher Platzhalter in allen Dateien (zwei Durchgänge); Ordner 1-Originale · 2-Fuer-die-KI · 3-Antworten-der-KI · 4-Zurueckgefuehrt; AUFTRAG.md (Ziel, Stil, Platzhalter-Regeln, Kennung ⟦AUFTRAG …⟧), ALLES-IN-EINER-DATEI.md, LIES-MICH, inhalt.json; Dateien draußen heißen D01 … (echte Namen können Namen tragen) |
| Zusatzschicht | `zusatzFunde` in `auftrag.ts` | **Fund 14.11.:** die Maske übersieht „Telefon 0170 1234567.“ (Satzpunkt danach) – hier ergänzt; gehört in Modul 25 Gen. 3 (Sage) |
| Bilder | `lib/pseudo/flaechen.ts`, `src/pseudo/abdecken.tsx`, `src/pseudo/bild.ts` | Rechteck, Kreis/Ellipse, Vieleck mit Vektorpunkten; 8 Anfasser, verschieben, Doppeltipp Linie/Punkt, Rückgängig 60 (Strg+Z/Y), Entf, „durchscheinend“ nur zum Ausrichten; Vorschläge aus der Texterkennung (verdeckte Werte, Kennzeichen) und Gesichter, wo der Browser das kann (FaceDetector); Ausgabe neues PNG ohne Metadaten; **Bild zurückführen** setzt die Flächen aus dem Original wieder ein |
| Lesen | `src/pseudo/lesen.ts` | Text, PDF (Textebene; Scan → Seiten als Bilder, höchstens 20), Fotos mit Texterkennung, .eml mit Anhängen, Word/OpenDocument, Excel/PowerPoint (Prüfkern) |
| Speicher | `src/pseudo/speicher.ts` | IndexedDB, Zuordnung + echte Dateinamen + Korrekturen verschlüsselt (AES-GCM, nicht auslesbarer Geräteschlüssel), 90 Tage, „Erledigt“, Sicherung mit Passwort (PBKDF2 600 000) |
| Ausgabe | `src/pseudo/ordner.ts`, `lib/pseudo/pakete.ts` | Kopieren (Doppelblatt), eine Datei, Arbeitsordner (Chrome/Edge am PC), ZIP; Rückweg: Kopieren, Word (.docx), Text, Löschen, Ergebnis vorher änderbar |
| Proben | `scripts/run-pseudo-tests.mjs` (im Bau, 47), `tests/pseudo-probe.mjs` (Browser, 40, in der CI) | kein Klartext im Ordner für die KI, im ZIP, im Gespeicherten; kein Netzaufruf; Editor mit Maus; Handy 360 px |

**Nicht gemessen:** echte Unterlagen, echte KI-Antworten, Tablet/Handy mit Finger, große Ordner (mehrere hundert Dateien – es gibt
noch kein Anhalten/Weitermachen wie im Datei-Organizer 0.4.2), Gesichtserkennung (im Test-Chromium nicht vorhanden).

## Nächste Schritte

1. **Klaus' Blick auf die PWA** (Fragen unten).
2. **Pro-Apps (APK, Windows):** eigenes Repo `Pseudonymisierer` (kann die Sitzung nicht anlegen – Klaus legt es an, leer, privat).
   Dann: Hülle aus dem Datei-Organizer übernehmen (Capacitor `android/`, Tauri `windows/`), Paket `de.familyprojekt.pseudonymisierer`,
   eigene Signier-Identität (`signing-identity.yml`), Updates vom eigenen Server `family-projekt.de/updates/pseudonymisierer/` mit
   Update-Fähnchen wie Datei-Organizer/Familienakte, Ordner-Brücke `FamilyFolders` für den Arbeitsordner auf SD/PC, Teilen/„Öffnen mit“.
   Bis dahin läuft die Seite auch in Datei-Organizer Pro mit (gleiches Paket `app/`), dort ohne Ordnerwahl (Speichern über „Speichern unter“).
3. **Verbindung zu anderen Apps (aus, bis Klaus freischaltet):** Familienakte-Pseudo-Fenster „An den Pseudonymisierer“ (Austauschordner),
   Profile aus dem Pro-Tresor (Fach `profile`, Plan Familienakte Stufe C), Private Brain Pro (Mails mit Anhängen).
4. Große Ordner in Blöcken mit Anhalten/Weitermachen (Muster `src/lauf.ts`), Bilder in PDFs mit Textebene schwärzen (Plan Familienakte G).

## Fragen an Klaus

- Q1 Name „Pseudonymisierer“ (Basic/Pro) – so lassen?
- Q2 Eigenes Repo für die Pro-Apps anlegen (Name `Pseudonymisierer`)?
- Q3 Fotos ohne Text: heute gehen sie mit an die KI (abgedeckt). Lieber ab Werk abgewählt?
- Q4 Knopf im Datei-Organizer und im Pseudo-Fenster der Familienakte, der hierher führt – ja?
