# Abschlussbrief 20.11.2026: Klon 2.28.75, Steckbrief der Person, 0.9.4 ausgegeben

## Erledigt

1. PR #74 (sechs Grundbereiche) übernommen; er stand schon auf dem neuesten `main` und ist über PR #75 auf `main`.
2. Klon `klone/familienakte` @ `ef1bb80` (Familienakte 2.28.75), `--pruefen` grün für alle Klone, `npm run bau` neu (`tresor.js`, Kalender).
3. **Steckbrief der Person** unter „Akten“ › Person: Karte über den Unterlagen, ab Werk zu (`pa_klapp.stb`), Zahl daneben; Kontakt,
   Ausweise & Nummern (verdeckt bis Tipp, „gültig bis“ rot/gelb, Foto = Unterlage, die die Person betrifft), weitere Einträge. Ein Stift für alles,
   Speichern nur über den Kern des Klons (`updateLocalPersonContact`, `updateLocalPersonSteckbrief`). Keine Erklärsätze.
4. `docs/ANPASSUNGEN-GEGENUEBER-FAMILIENAKTE.md` und `CLAUDE.md` ergänzt.
5. **0.9.4 ausgegeben:** Android signiert (Release `v0.9.4`, Update-Server), Windows als CI-Download, Nachweis `docs/VEROEFFENTLICHUNG-0.9.4.md`.
6. Dazwischen (Klaus 20.11., Bild vom Tablet): **Fuß der Familienakte flach** – eine Zeile (40 statt rund 420 px), seitlich zu schieben;
   Repo `meine-familienakte` PR #224 (Entwurf, nicht ausgegeben, Fassung nicht erhöht). Proben dort grün.

## Eigene Entscheidungen (Freibrief)

- Ein Stift für den ganzen Steckbrief statt einzelner Bearbeiten-Knöpfe (weniger Knöpfe am Handy).
- Steckbrief nur am Personen-Knoten, nicht in einer Akte der Person.
- Foto des Ausweises: die Unterlage liegt sofort bei der Person, im Steckbrief erst mit „Übernehmen“.
- Kein Diktat in den Feldern des Steckbriefs (die Familienakte hat dort `VoiceInput`).
- Familienakte-Fuß: alle Links bleiben, nur Überschriften und der Satz „Originalunterlagen bleiben verbindlich …“ sind weg.

## Proben

Private Akte: `tests/probe.cjs` 518 grün (10 neu zum Steckbrief, Handy und PC), `test-native` 37 grün. Familienakte: `npm run build`
und sieben UI-Proben grün. **Am Tablet ungeprüft:** Steckbrief, Foto über die Kamera, 0.9.4 über das Fähnchen, flacher Fuß.

## Startauftrag

```
Lies CLAUDE.md der Privaten Akte und docs/BRIEF_ABSCHLUSS_2026-11-20_KLON-STECKBRIEF-0.9.4.md. Klaus' Rückmeldung vom Tablet zu 0.9.4
(Steckbrief unter Akten › Person, sechs Grundbereiche) und zum flachen Fuß der Familienakte (PR #224 dort) einarbeiten. Wenn Klaus
den Fuß bestätigt: #224 zusammenführen und mit der nächsten gesammelten Familienakte-Fassung (2.28.76) ausgeben; danach Klon hier
nachziehen. Nächste Fassung der Privaten Akte 0.9.5 (Code 95). Freibrief: tokensparend, Fragen selbst nach Logik und
Nutzerfreundlichkeit beantworten, zum Schluss Abschlussbrief mit Startauftrag.
```
