# Abschluss 14.11.2026 (Nacht): Datei-Organizer Pro 0.4.1 – Windows-App, Android-Lücken

Folgt auf `BRIEF_ABSCHLUSS_2026-11-13_ORGANIZER-PRO-ANDROID.md`.

## Ergebnis

**Windows-App „Datei-Organizer Pro“ (`windows/`, `docs/WINDOWS.md`)** nach dem Muster von BookLedgerPro:
- Tauri 2 / WebView2 mit derselben Oberfläche wie Android (natives Web-Paket aus `app/`).
- Java-Engine als privater Kindprozess mit eigener Laufzeit (jlink). Teile:
  - `DesktopOrdner`: Ordner am PC, Vertrag `FamilyFolders`, die letzten 5 Ordner gemerkt.
  - `DesktopEingang`: „Öffnen mit“ und zweiter Programmstart, die Dateien kommen als Kopie in einen Stapel.
  - Speichern unter …
  - `DesktopUpdates`: `family-projekt.de/updates/datei-organizer/aktuell-windows.json` mit Ed25519.
- NSIS-Installer für den eigenen Benutzer. „Öffnen mit“ gilt für PDF, Bilder, EML, TXT und Office.
- Abläufe: `windows.yml` baut einen Prüfbau, installiert ihn und startet ihn zweimal; danach folgt der Auslieferungsbau. `windows-release.yml` läuft nur von Hand mit „ja“ und braucht den Schlüssel.

**Android-Lücken geschlossen** (gleiche Verträge wie Windows):
- dauerhafte Ordnerfreigabe mit „Zuletzt: …“ und ✕ zum Vergessen
- Teilen an die App und „Öffnen mit“ (`DoEingangPlugin` + `EingangStapel`)
- „Speichern unter …“ (`DoDateienPlugin`) statt Download, wenn kein Ordner gewählt ist

**Ein Update-Schlüssel** für Android und Windows; die Proben und der Veröffentlichungs-Lauf prüfen, dass beide gleich sind. Er ist noch leer: Klaus richtet ihn Schritt für Schritt ein, die Anleitung steht im Chat, der Block in `docs/ANDROID.md` (b).

**Proben (lokal):**

| Probe | Ergebnis |
|---|---|
| Kern | 149 grün (eine Probe übersprungen: die Familienakte liegt nicht daneben) |
| UI | 89 grün (11 neu: Windows-App gestellt, Zuletzt, „Öffnen mit“, Speichern unter) |
| nativ | 63 grün |
| Windows-Engine | 55 grün |
| Kindprozess | grün |
| Brücke | 25 grün |
| JVM Android | `EingangStapelTest` 6 + `NativeUtilTest` grün |

Gegenproben, je mit eigener roter Zeile:
- „Zuletzt“ öffnet wieder den Dialog
- Speichern unter ausgebaut
- Eingang wird nie abgeholt

## Nicht gemacht / Grenzen

- Kein Windows-PC, kein Android-Gerät, kein Rust- oder Gradle-Bau in der Sitzung. Erst die CI (`windows.yml`, `android.yml`) zeigt, ob alles baut und installiert läuft.
- Der öffentliche Update-Schlüssel fehlt (Klaus).
- Nichts veröffentlicht, keine Signieridentität angelegt.
- Große Mengen in Blöcken mit Weitermachen nach einem Abbruch sind nicht gebaut (Klaus: die nächsten 2–3 Wochen).
- Familienakte: `FamilyFolders` dort kennt `gemerkt`, `wiederOeffnen` und `vergessen` nicht. Die Oberfläche fragt deshalb vorher nach, ob es sie gibt.

## Stundennachweis

Erste Spur gegen 23:40 UTC (13.11., Lesen der Briefe), erste Datei 23:53, Proben grün gegen 00:10 UTC (14.11.), danach Push, PR und CI.

| Zeit (UTC) | Block |
|---|---|
| 23:40–23:55 | Lesen |
| 23:55–00:05 | Windows-Engine, Hülle, Abläufe |
| 00:05–00:15 | Android, Oberfläche, Proben |

Obergrenze: rund 1 h ohne CI-Warten. Klaus' eigene Angabe geht vor.

## Startauftrag zum Einfügen

```
Repos: Datei-Organizer (CLAUDE.md, docs/BRIEF_ABSCHLUSS_2026-11-14_ORGANIZER-PRO-WINDOWS.md, docs/WINDOWS.md, docs/ANDROID.md zuerst lesen).
Zweig: der vorgegebene. FREIBRIEF (Klaus 13.11.): eigene geprüfte PRs (CI + Proben grün) selbst mergen; veröffentlichen nur mit Klaus' Wort.
Auftrag: 1. Falls Klaus den öffentlichen Update-Schlüssel gegeben hat: in UpdateFeed.SCHLUESSEL (Android) UND DesktopUpdates.SCHLUESSEL
(Windows) eintragen, Proben laufen lassen. 2. Große Mengen in Blöcken mit Weitermachen nach Abbruch (Einlesen in Blöcken, Stand merken).
3. Falls windows.yml/android.yml rot: zuerst reparieren.
Nicht: nichts veröffentlichen, keine Signieridentität initialisieren, keine Schlüssel in Dateien oder Chat, byte-gleiche Bausteine nicht
von Hand ändern. Name: Web-App „Datei-Organizer Basic“, App „Datei-Organizer Pro“. Abschlussbrief mit Stundennachweis.
```
