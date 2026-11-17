# Private Akte

Eine App für alle Unterlagen: in der Mitte die Akte, an den Ästen die Programme („Tools“).

Web-App: https://lausiklauskn-png.github.io/Private-Akte/

**Stand: Vorschau 0.3.1 (17.11.2026).** Echt sind zwei Dinge, beide mit dem unveränderten Tresor der Familienakte (`klone/familienakte`):

- **„Deine Unterlagen“** auf der Startseite: Dateien liegen im Speicher des Browsers und bleiben nach dem Neuladen da.
- **Tresor exportieren / importieren** (Schild-Knopf): ein mit Passwort verschlüsselter Ordner mit Datum an einem frei gewählten Ort
  (Gerät, SD-Karte, Stick) und von dort wieder herein. Es ist die Vollsicherung der Familienakte – eine Familienakte kann sie einlesen.

Alles andere ist Beispiel – erfundene Daten, kein echtes Programm wird geöffnet, keine KI, kein Postfach, kein Kalender-Konto.

## Was die Vorschau zeigt

- Werkzeugleiste oben (runde farbige Knöpfe, Namen als Tooltip mit der Maus, abschaltbar hinter „?“): Bon fotografieren (Portemonnaie), PDF scannen (Workflow PDF im Familienbüro),
  Dateien hineingeben (Datei-Organizer), Notiz, Kalender; dazu Drucken, Farbpalette,
  Sicherung, Hilfe – am Handy hinter „⋯“.
- Tools: Familienbüro (Schreiben, Tabellen, Folien, Workflow PDF), Portemonnaie mit „An BookLedgerPro geben“
  (Weg nach außen), Datei-Organizer, Private Brain (E-Mail), Kalender.
- „Bearbeiten mit“ an jeder Unterlage, jedem Foto, jeder Notiz und im Eingang – auch „Pseudonymisieren · An KI“.
- Der Baum erklärt darunter „Wo liegt was?“: ein Tresor als einziger Speicher, die Tools ohne eigenen Speicher,
  Sicherung und der eine Weg nach außen.
- Notizen werden von Hand zugeordnet.
- Farbpalette mit den Wasserfarben des Familienbüros, je Programm eigene Farbe.
- `rechtliches.html`: Impressum, Datenschutz, Haftungsausschluss, Lizenz & Copyright. Kein Anwalt hat die Texte geprüft.

## Dateien

| Datei | Zweck |
| --- | --- |
| `index.html`, `app.css`, `app.js` | die Hülle (von Hand geschrieben, kein Bauschritt) |
| `src/tresor.ts`, `tools/bau.mjs`, `tresor.js` | Brücke zum Tresor der Familienakte; `npm run bau` schreibt `tresor.js` (eingecheckt, nie von Hand ändern) |
| `klone/`, `tools/klon-nachziehen.mjs` | unveränderte Klone mit Pin, siehe `CLAUDE.md` |
| `rechtliches.html`, `LICENSE` | Rechtstexte |
| `manifest.webmanifest`, `sw.js`, `icons/` | Installation und Offline-Vorrat (bei neuer Fassung `VERSION` in `sw.js`, `FASSUNG` in `app.js` und `?v=` in `index.html` erhöhen) |
| `bilder/` | Baumbild und Film „Zur Akte“ (aus der Discovery-Seite des Datei-Organizers), Zeichen Basic und Pro |
| `tests/probe.cjs` | Klick-Probe im Test-Browser, Handy- und PC-Breite (vorher `python3 -m http.server 8765`) |

Vor jeder Funktion, die speichert oder nach draußen geht, zuerst den passenden Abschnitt der
Datenschutzerklärung ergänzen.

© 2026 Family-Projekt, Klaus Nitzsche. Alle Rechte vorbehalten (siehe `LICENSE`).
