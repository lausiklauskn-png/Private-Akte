# Abschlussbrief 20.11.2026: Knopf „Aktualisieren“ (⟳) in der Web-App – Sitzungsende

Diese Sitzung (20.11.) hat ausgegeben: 0.9.4 (Steckbrief der Person, Klon 2.28.75; Brief `docs/BRIEF_ABSCHLUSS_2026-11-20_KLON-STECKBRIEF-0.9.4.md`),
0.9.5 (Klon 2.28.76, Kalender je Person; Brief `docs/BRIEF_ABSCHLUSS_2026-11-20_KALENDER-JE-PERSON-0.9.5.md`) und zuletzt den Knopf ⟳.

## Erledigt zuletzt (Klaus 20.11.: „Aktualisierungsbutton, da ich nicht immer Hard Reload machen kann“ – „in den PWAs, die wir hier bearbeitet haben“)

1. **⟳ neben der Fassungsmarke** (`#pwa-neu` in `index.html`, `data-a="neu-laden"` – derselbe Weg wie der Tipp auf die Fassung; Stil
   `.fassung.pwa-neu` in `app.css`). In der App (`PA_PRO`, Android/Windows) ausgeblendet – dort meldet das Fähnchen neue Fassungen.
2. **PR #79** auf `main`, über Pages online. Fassung nicht erhöht.
3. Familienakte: ⟳ im Kopf der PWA (PR #226 dort), ebenfalls online. Damit haben beide hier bearbeiteten PWAs den Knopf.

## Proben
Probe 520 grün (1 neu: ⟳ sichtbar), `test-native` 37 grün, CI (klone, engine, android, windows) grün. **Am Tablet ungeprüft.**
Wirkt erst, nachdem Klaus die Web-App einmal auf die alte Art neu lädt.

## Offen
- 0.9.5 am Tablet (Kalender je Person im Kalender der Akte, Steckbrief, Grundbereiche): Rückmeldung von Klaus steht aus.
- Abgleich der Termine zwischen den Handys: wird in der Familienakte gebaut (Stufe 3), dann Klon nachziehen.

## Stundennachweis
Sitzung 20.11.2026 gesamt rund 6 Stunden (geschätzt), geteilt mit der Familienakte: Steckbrief/0.9.4, Klon 0.9.5, Kalender je Person
in der Familienakte, ⟳ in beiden PWAs, CI-Fixes, Ausgaben.

## Startauftrag
```
Lies CLAUDE.md der Privaten Akte und docs/BRIEF_ABSCHLUSS_2026-11-20_PWA-AKTUALISIEREN.md. Klaus' Rückmeldung vom Tablet zu 0.9.5
(Kalender je Person im Kalender der Akte, Steckbrief, Grundbereiche, Knopf ⟳ in der Web-App) einarbeiten. Wenn die Familienakte den
Abgleich der Termine zwischen den Handys gebaut hat (dort Stufe 3), Klon nachziehen. Nächste Fassung 0.9.6 (Code 96). Freibrief:
tokensparend, Fragen selbst nach Logik und Nutzerfreundlichkeit beantworten, zum Schluss Abschlussbrief mit Startauftrag.
```
