# Abschluss 14.11.2026: Pseudonymisierer 0.1.0 (PWA)

Auftrag (Klaus 14.11.): ein Werkzeug, das ganze Ordner pseudonymisiert (Brief + AGB + Nutzungsvereinbarung …), die Fassung für jede KI
ausgibt und die Antwort zurückführt; Bilder mit frei setzbaren 100 % schwarzen Flächen wie im Kontur-Werkzeug von Tomys Hub, das Bild
kommt zurück und die Stellen werden aus dem Original ergänzt; Pro-App-Familie (APK, Windows, Updates); Verbindung zu anderen Apps möglich,
nicht automatisch; sehr einfach. Klaus: „anfangen mit dem Bauen und eine Version herausbringen, die ich als PWA anschauen kann.“

## Was gebaut ist

Alles in `docs/PSEUDONYMISIERER.md` (Tabelle „Stand 0.1.0“). Kurz:
- Seite `app/pseudonymisierer.html` im Repo Datei-Organizer, Kurzadresse `/pseudonymisierer/`. Drei Bereiche: **Pseudonymisieren**
  (1 Dateien hinein · 2 Prüfen · 3 Auftrag an die KI · 4 Ausgeben), **Zurückführen**, **Aufträge**.
- Maske **byte-gleich** aus der Familienakte (Pin), nichts nachgebaut. Gemeinsame Platzhalter über alle Dateien eines Auftrags.
- Abdeck-Editor: Rechteck, Kreis, Vieleck, Anfasser, Doppeltipp, Rückgängig, Vorschläge aus der Texterkennung (Werte, Kennzeichen).
- Tomys Hub (`promptgenerator/kontur.js`) wurde angehängt und gelesen; übernommen ist die **Bedienung**, nicht die Datei (sie hängt am
  Vorlagen-Werkzeug, `App.zustand` usw.).
- Gespeichert wird nur verschlüsselt, was Klartext enthält (die Probe fand zuerst echte Dateinamen im Speicher – behoben).

## Funde

- **Maske:** „Telefon 0170 1234567.“ wird übersehen (Satzpunkt nach der Nummer, `FAMILIEN_MUSTER` TELEFON `(?![\d.])`). Hier mit
  `zusatzFunde` ergänzt; in der Familienakte (Pseudo-Knopf 2.28.68) **besteht die Lücke weiter** → gehört in Modul 25 Gen. 3 (Sage).
- Chrome nennt heruntergeladene Dateien mit Gedankenstrich/Umlaut im Namen „download“ (Probe) → Namen ASCII-sicher (`dateiname`).
- Hinweiszeile im Editor jetzt fest, sonst sprang das Bild beim Werkzeugwechsel; Zeichenfläche genau im Seitenverhältnis des Bildes
  (sonst trafen Klicks daneben, wenn das Bild schmaler als der Rahmen war).

## Proben

`npm run build` grün (Kern 150, Pseudonymisierer 47, Pins), `tests/pseudo-probe.mjs` 40 grün, `tests/ui-probe.mjs` (Datei-Organizer)
115 grün. Nicht gemessen: echte Unterlagen, echte KI, Finger am Tablet, große Ordner, Gesichtserkennung.

## Offen

Fragen Q1–Q4 in `docs/PSEUDONYMISIERER.md`; APK/Windows brauchen ein eigenes Repo (Klaus legt es an); Verbindung zu den anderen Apps
nur vorbereitet; große Ordner ohne Anhalten/Weitermachen.

## Stundennachweis

Zeiten nach den Dateizeiten im Sitzungsbehälter (UTC), ohne Gewähr auf die Minute.

| Zeit (UTC) | Block |
|---|---|
| bis 11:55 | Lesen: Plan Pseudonymisieren, Maske und Pseudo-Knopf der Familienakte, Bausteine des Datei-Organizers; Tomys Hub angehängt (Kontur-Werkzeug) |
| 11:55–12:03 | Maske byte-gleich mit Pin, Kern `lib/pseudo/` (Auftrag, Flächen, ZIP/Word), Node-Probe; Fund Telefon |
| 12:03–12:10 | Oberfläche: Speicher, Lesen, Bilder, Abdeck-Editor, App, Beispiel |
| 12:10–12:14 | Bau, Browser-Probe, Fehler behoben (Speicher, Dateinamen, Editor), Bilder angesehen, Plan und Brief |

## Startauftrag nächste Sitzung

```
Repo Datei-Organizer (und, falls angelegt, Repo Pseudonymisierer). Lies CLAUDE.md, docs/PSEUDONYMISIERER.md und
docs/BRIEF_ABSCHLUSS_2026-11-14_PSEUDONYMISIERER.md. Nimm Klaus' Rückmeldung zur PWA 0.1.0 (Fragen Q1–Q4) auf.
Wenn das Repo Pseudonymisierer da ist: Pro-Hülle Android/Windows nach dem Muster Datei-Organizer (android/, windows/,
signing-identity.yml, Updates von family-projekt.de/updates/pseudonymisierer/), Maske weiter nur über
scripts/maske-nachziehen.mjs mit Pin. Proben: npm run build, node tests/pseudo-probe.mjs. Veröffentlichen nur mit Klaus' Wort.
Abschlussbrief mit Stundennachweis.
```
