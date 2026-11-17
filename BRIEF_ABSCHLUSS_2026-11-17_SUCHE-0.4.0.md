# Abschlussbrief – Private Akte, Vorschau 0.4.0 (17.11.2026, abends)

Der ausführliche Stand steht in `CLAUDE.md` (Abschnitt „Stand“), die Liste der Anpassungen gegenüber der Familienakte in
`docs/ANPASSUNGEN-GEGENUEBER-FAMILIENAKTE.md`. Dieser Brief nennt nur, was die Sitzung gemacht hat und wie es weitergeht.

## Was diese Sitzung gebaut hat (alles auf `main`, online als Web-App)

- 0.1.2–0.1.5: „Wo liegt was?“ unter dem Baum, runde Knöpfe mit Tooltips, die Programme heißen „Tools“.
- 0.3.2: neue Fassung kommt sicher an; die Fassungsmarke ist ein Knopf („Neue Fassung · antippen“). Am Tablet bestätigt.
- 0.3.4–0.3.5: Importieren (grüner Pfeil) und Exportieren (roter Pfeil) wie im Rezeptbuch; Backup-Ordner „Privatakte_Backup_…“.
  Am Tablet bestätigt (0.3.4).
- 0.3.6–0.3.9: Suchfeld mit X und Mikrofon, Wortsuche in den echten Unterlagen, Bedeutungssuche hinter „Finden“ mit Ja/Nein und
  Ladebalken, Zurück bleibt in der App. Am Tablet bestätigt: das Sprachmodell lädt und rechnet, das Mikrofon nimmt auf.
- 0.4.0: Suche nach Sage-Protokol umgestellt (Wörter und Bedeutung verschmolzen, zentrierte Nähe). **Am Tablet noch nicht gesehen.**

## Für die nächste Sitzung

- **Nur das Repo Private-Akte ist nötig.** Die Familienakte und der Baustein aus Sage liegen als Klone darin (`klone/`); gelesen
  wird von dort. Die Quell-Repos braucht man nur, wenn ein Klon auf einen neueren Stand gezogen werden soll.
- Klaus geht die App Schritt für Schritt durch; jeder Schritt wird als kleine Fassung gleich zusammengeführt (Claude entscheidet).
- **Zuerst:** Klaus' Rückmeldung zu 0.4.0 – ein Bild der Treffer „dem Sinn nach“ mit den Zahlen. Danach die zwei geschätzten Grenzen
  in `treffer()` (`app.js`: Nähe ab 0,1, mindestens halb so nah wie das Beste) nach echten Werten einstellen.
- **Danach, in dieser Reihenfolge vorgeschlagen (nicht bestätigt):** (1) der Eingang aus dem Klon: Text beim Ablegen lesen, auch aus
  PDFs – erst damit kennt die Suche den Inhalt (heute nur Titel, Bereich, Notiz; `src/pdf-ersatz.ts`); (2) Sortier-Kern für
  Bereich, Absender, Frist; (3) Einstellungen (Tooltips, Bedeutungssuche wieder einschalten, Tresor in einem gewählten Ordner).
- Offen und klein: am Handy liegen Importieren/Exportieren hinter „⋯“; die Meldung „0 neu“ beim Einlesen in dieselbe Akte erklärt
  sich nicht; mehrere Formulierungen einer Frage (Sage `queryLocalMulti`) sind nicht gebaut; Datenschutzerklärung zum Schluss
  (die App lädt auf Wunsch das Sprachmodell von fremden Servern).
- Familienakte: Entwurfs-PR #220 dort trägt nur die Merkregel zur Bedeutungssuche in deren `CLAUDE.md`; nichts hängt daran.

## Startauftrag

```
Lies im Repo Private-Akte zuerst CLAUDE.md, dann BRIEF_ABSCHLUSS_2026-11-17_SUCHE-0.4.0.md und
docs/ANPASSUNGEN-GEGENUEBER-FAMILIENAKTE.md. Andere Repos brauchst du nicht – die Familienakte und der
Baustein aus Sage liegen als Klone unter klone/.
Frage mich nach meiner Rückmeldung zur Suche in 0.4.0 (Zahlen an den Treffern „dem Sinn nach“) und stelle die
zwei geschätzten Grenzen danach ein. Dann gehen wir Schritt für Schritt weiter; schlage als Nächstes den
Eingang vor, der den Text der Unterlagen liest (auch PDFs).
Jeder Schritt: Fassung erhöhen (FASSUNG in app.js, VERSION in sw.js, ?v= dreimal in index.html), npm run bau
falls src/tresor.ts geändert ist, Probe mit python3 -m http.server 8765 und node tests/probe.cjs, dann PR und
gleich zusammenführen. docs/ANPASSUNGEN-GEGENUEBER-FAMILIENAKTE.md still mitführen.
```
