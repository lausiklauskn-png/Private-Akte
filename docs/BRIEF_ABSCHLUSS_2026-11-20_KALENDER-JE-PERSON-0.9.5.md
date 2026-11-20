# Abschlussbrief 20.11.2026: 0.9.4 und 0.9.5 ausgegeben, Familienakte 2.28.76

## Erledigt
1. **0.9.4** (Klon 2.28.75, Steckbrief der Person, sechs Grundbereiche) – Nachweis `docs/VEROEFFENTLICHUNG-0.9.4.md`.
2. **Familienakte 2.28.76** (Repo `meine-familienakte`, PR #224): flacher Fuß, **Kalender je Person**; ausgegeben als Android, Windows, PWA
   (Nachweis dort `docs/VEROEFFENTLICHUNG-2.28.76.json`, Brief `BRIEF_ABSCHLUSS_2026-11-20_KALENDER-JE-PERSON-2.28.76.md`).
3. **0.9.5** (Klon @ `706711b`): der Kalender in der Akte hat „Kalender von …“, fest/vorläufig, „Für wen noch“, privat. Android signiert
   und auf dem Update-Server, Windows als CI-Download – Nachweis `docs/VEROEFFENTLICHUNG-0.9.5.md`.
4. CI: Maven Central meldete heute mehrfach 404 für vorhandene Dateien – zweiter Spiegel in `android/build.gradle`.

## Eigene Entscheidungen
- Die Familienliste („passt/passt nicht“, Filter je Person) gibt es nur in der Familienakte; die Akte hat keine eigene Fristenliste.
  Vorschlag für später: „Fällig“/Glockenfeld mit Personen-Filter.

## Proben
Probe 518 grün, `test-native` 37 grün, Klon-Prüfung und `bau:pruefen` grün. **Am Tablet ungeprüft.**

## Startauftrag
```
Lies CLAUDE.md der Privaten Akte und docs/BRIEF_ABSCHLUSS_2026-11-20_KALENDER-JE-PERSON-0.9.5.md. Klaus' Rückmeldung vom Tablet zu 0.9.5
(Kalender je Person im Kalender der Akte, Steckbrief, Grundbereiche) einarbeiten. Wenn die Familienakte den Abgleich der Termine zwischen
den Handys gebaut hat (dort Stufe 3), Klon nachziehen. Nächste Fassung 0.9.6 (Code 96). Freibrief: tokensparend, Fragen selbst nach
Logik und Nutzerfreundlichkeit beantworten, zum Schluss Abschlussbrief mit Startauftrag.
```
