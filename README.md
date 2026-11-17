# Private Akte

Eine App für alle Unterlagen: in der Mitte die Akte, an den Ästen die Programme („Städte“).

Web-App: https://lausiklauskn-png.github.io/Private-Akte/

**Stand: Vorschau 0.1.3 (17.11.2026).** Alles ist Beispiel – erfundene Daten, nichts wird gespeichert,
kein echtes Programm wird geöffnet, keine KI, kein Postfach, kein Kalender-Konto ist angeschlossen.

## Was die Vorschau zeigt

- Werkzeugleiste oben (runde farbige Knöpfe, Namen als Tooltip mit der Maus, abschaltbar hinter „?“): Bon fotografieren (Portemonnaie), PDF scannen (Workflow PDF im Familienbüro),
  Dateien hineingeben (Datei-Organizer), Notiz, Kalender; dazu Drucken, Farbpalette,
  Sicherung, Hilfe – am Handy hinter „⋯“.
- Städte: Familienbüro (Schreiben, Tabellen, Folien, Workflow PDF), Portemonnaie mit „An BookLedgerPro geben“
  (Weg nach außen), Datei-Organizer, Private Brain (E-Mail), Kalender.
- „Bearbeiten mit“ an jeder Unterlage, jedem Foto, jeder Notiz und im Eingang – auch „Pseudonymisieren · An KI“.
- Der Baum erklärt darunter „Wo liegt was?“: ein Tresor als einziger Speicher, die Städte ohne eigenen Speicher,
  Sicherung und der eine Weg nach außen.
- Notizen werden von Hand zugeordnet.
- Farbpalette mit den Wasserfarben des Familienbüros, je Programm eigene Farbe.
- `rechtliches.html`: Impressum, Datenschutz, Haftungsausschluss, Lizenz & Copyright. Kein Anwalt hat die Texte geprüft.

## Dateien

| Datei | Zweck |
| --- | --- |
| `index.html`, `app.css`, `app.js` | die App |
| `rechtliches.html`, `LICENSE` | Rechtstexte |
| `manifest.webmanifest`, `sw.js`, `icons/` | Installation und Offline-Vorrat (bei neuer Fassung `VERSION` in `sw.js` und `FASSUNG` in `app.js` erhöhen) |
| `bilder/` | Baumbild und Film „Zur Akte“ (aus der Discovery-Seite des Datei-Organizers), Zeichen Basic und Pro |
| `tests/probe.cjs` | Klick-Probe im Test-Browser, Handy- und PC-Breite |

Vor jeder Funktion, die speichert oder nach draußen geht, zuerst den passenden Abschnitt der
Datenschutzerklärung ergänzen.

© 2026 Family-Projekt, Klaus Nitzsche. Alle Rechte vorbehalten (siehe `LICENSE`).
