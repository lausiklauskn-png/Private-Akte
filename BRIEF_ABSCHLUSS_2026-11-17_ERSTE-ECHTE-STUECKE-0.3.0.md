# Abschlussbrief – Private Akte, erste echte Stücke bis 0.3.0 (17.11.2026)

Vorgänger: `BRIEF_ABSCHLUSS_2026-11-17_VORSCHAU-0.1.5.md`. Stand und Regeln: `CLAUDE.md`.

## Gemacht

- PR #3 (Vorschau 0.1.5, enthält PR #2) auf `main` zusammengeführt; GitHub Pages läuft, Klaus hat die Adresse am Tablet geöffnet.
- **Klaus:** die Vorschau sieht einfach aus, erfüllt aber den Zweck nicht. Vereinbart: einfache Hülle, darunter die unveränderte
  Mechanik der Familienakte – nichts neu schreiben.
- **0.2.0 (PR #4, auf `main`):** Gerüst aus PR #1 hereingeholt (Klone, Klon-Werkzeug, Regeln). „Deine Unterlagen“: echte Ablage im
  Tresor der Familienakte über `src/tresor.ts` → `tresor.js` (`npm run bau`).
- **0.3.0:** Tresor exportieren / importieren (verschlüsselter Ordner an gewähltem Ort, Notfallschlüssel), Oberfläche flacher,
  Textfelder wachsen mit, Startseite ohne Erklärsatz und Beispiele (Überschrift nur breit), eigene Bereiche beim Ablegen
  (auswählen oder eintippen, wie in der Familienakte).

## Geprüft und nicht geprüft

- `tests/probe.cjs`, 390 px und 1280 px: 142 Prüfungen, 0 Fehler. Darin: hineinlegen, Dublette, Neuladen, Export, Speicher des
  Browsers leeren, falsches Passwort, Import, Datei kommt unverändert zurück. Die Ordnerwahl ist in der Probe gestellt (Ordner im
  Browser-Speicher), nicht der echte Dialog.
- **Nicht am Gerät.** Ob Chrome am Handy/Tablet die Ordnerwahl (auch SD-Karte) anbietet, ist offen; ohne sie zeigt das Fenster einen Hinweis.
  Ersatzweg IndexedDB nicht durchgespielt. Einlesen der Sicherung in einer echten Familienakte nicht ausprobiert (gleiche Funktionen, gleicher Stand).
- GitHub Pages liefert `klone/` (rund 313 MB) mit aus, bis Pages auf „GitHub Actions“ umgestellt ist (Klick von Klaus).

## Offen bei Klaus

- Familienbüro in der App oder nur aufrufen; Portemonnaie offen oder gleich im Tresor (Widerspruch zwischen PR #1 und Vorschau).
- Im Klon der Familienakte liegt `signing/` (zwei Dateien, eine verschlüsselt) in diesem öffentlichen Repo – so gewollt?
- Ordnername und Notfallblatt heißen „Familienakte …“ (kommt aus dem Klon). So lassen, damit beide Apps dieselbe Sicherung lesen?

## Startauftrag

```
Lies im Repo Private-Akte auf main zuerst CLAUDE.md und BRIEF_ABSCHLUSS_2026-11-17_ERSTE-ECHTE-STUECKE-0.3.0.md.
Frag mich nach dem Gerätetest von 0.3.0 (Datei hineinlegen, Tresor exportieren auf SD-Karte, importieren).
Nächstes Stück: Bedeutungssuche mit Ladebalken aus dem Klon der Familienakte (app/private-meaning-*.ts,
app/browser-modelle.ts) an das Suchfeld hängen, danach der Eingang aus dem Klon. Nichts neu schreiben, nur über
src/tresor.ts weiterreichen. Kleine geprüfte Stücke gleich auf main (Probe tests/probe.cjs grün, npm run bau,
Fassung erhöhen: FASSUNG in app.js, VERSION in sw.js, ?v= dreimal in index.html).
```
