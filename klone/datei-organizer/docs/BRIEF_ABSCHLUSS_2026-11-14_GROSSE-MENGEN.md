# Abschluss 14.11.2026 (Nacht): Datei-Organizer 0.4.2 → 0.4.3 – große Mengen, Schlüssel, große Ordner, veröffentlicht

Folgt auf `BRIEF_ABSCHLUSS_2026-11-14_ORGANIZER-PRO-WINDOWS.md` (PR #15). Diese Arbeit baut auf PR #15 auf.

## Auftrag und was daraus wurde

| Punkt | Ergebnis |
|---|---|
| 1. Öffentlichen Update-Schlüssel eintragen | **Nicht gemacht.** Klaus hat ihn in dieser Sitzung nicht gegeben. `UpdateFeed.SCHLUESSEL` und `DesktopUpdates.SCHLUESSEL` bleiben leer, Updates melden „nicht eingerichtet“. |
| 2. Große Mengen in Blöcken, Weitermachen nach Abbruch | **Gebaut**, siehe unten. |
| 3. `windows.yml`/`android.yml` rot → zuerst reparieren | PR #15 wird noch von der vorigen Sitzung bearbeitet: dort kam um 00:21 UTC eine Windows-Reparatur dazu (`Win32_Security`). Deshalb habe ich dort **nicht** eingegriffen. Diese Arbeit liegt auf dem Stand von PR #15. |

## Große Mengen in Blöcken (0.4.2)

- **Blöcke:** nach jedem Block mit 50 Dateien (`BLOCK` in `src/lauf.ts`) wird der Stand in IndexedDB gemerkt (`laufSpeichern` in `src/zustand.ts`, Schlüssel `lauf`). Der Stand umfasst die schon gelesenen Quelldateien (Pfad + Änderungsdatum) und was daraus wurde, Mail-Anhänge eingeschlossen. Bricht das Einlesen ab (App geschlossen, Absturz, Akku), ist höchstens ein Block verloren.
- **Anhalten:** ein Knopf unter dem Ladebalken in der Ordner-Karte. Er hält nach der aktuellen Datei an und merkt den Stand.
- **Einlesen angefangen:** ein Kasten in der Ordner-Karte, auch nach einem Neustart. Er zeigt „N von M Dateien aus …“ und bietet **Weitermachen** und **Verwerfen**.
- **Weitermachen** öffnet die Quelle ohne Auswahl-Fenster, wo das geht:
  - Testordner
  - gemerkter PC-Ordner: das Handle wird jetzt beim Einlesen gemerkt
  - gemerkter Ordner der App: `merkId` oder Name unter „Zuletzt“

  Sonst kommt die Bitte, dieselbe Quelle noch einmal zu wählen. In beiden Fällen wird schon Gelesenes übersprungen. Das gilt auch, wenn jemand den Ordner einfach neu wählt: ein passender angefangener Lauf (gleicher Name und gleiche Art, mindestens 90 % der gelesenen Dateien noch da) wird von selbst fortgesetzt. Die Meldung nennt „fortgesetzt: N schon gelesen, M neu gelesen“.
- **Ergebnis wie in einem Zug:** Doppelte, Index-Übernahme und Siebe laufen erst am Ende über alles, wie vorher.
- Der Kern (`lib/`) ist unverändert, in der Familienakte muss nichts nachgezogen werden.
- **Fassung 0.4.2:** App, `version.json`, Android `versionName 0.4.2`/`versionCode 42`, Windows (tauri.conf, Cargo.toml/.lock, package.json), Vorrat `datei-organizer-v12`.

**Abweichung, benannt:** der Plan (`docs/PLAN.md`, Altbestände) nennt `lib/eingang-bloecke.ts` der Familienakte. Diesen Baustein habe ich gelesen (öffentliches Repo), aber nicht übernommen:
- Er ist eine Warteschlange für den Eingangsordner. Sein Schlüssel ist Name|Größe|Zeit, und die Quellen hier liefern keine Größe.
- Er steht nicht auf der Liste der byte-gleich zu übernehmenden Bausteine.

Ein nützlicher Gedanke daraus ist offen: vor einem Block den freien Speicher prüfen (`speicherReicht`).

## Proben (lokal)

| Probe | Ergebnis |
|---|---|
| `npm run build` (Kern, Typen, Bau, Pins) | grün |
| UI (`tests/ui-probe.mjs`) | **97 grün · 0 ROT** (8 neu) |
| nativ (`tools/native/test-native.mjs`) | 63 grün (Fassungen stimmen überein) |

Was die 8 neuen UI-Proben prüfen:
- Absturz mitten im 2. Block: danach stehen 50 von 101 gemerkt.
- Weitermachen holt die ersten 50 nicht noch einmal (gezählt an den Netzabrufen).
- Anhalten
- zweites Weitermachen holt nur den Rest
- Ergebnis gleich (Anzahl, 3 auffällig, 3 doppelt)
- nach dem Ende kein Lauf mehr
- Verwerfen
- keine Fehler

**Gegenproben** in Wegwerf-Kopien, jede mit eigener roter Zeile:

| Sabotage | rote Zeilen |
|---|---|
| Überspringen ausgebaut | 4 rot: „liest nur den Rest – 76 geholt“, Ergebnis 233 statt 101 … |
| Merken nach jedem Block ausgebaut | „Nach Absturz … 50 von 101“ rot |
| Anhalten ausgebaut | „Anhalten hält an“ rot |

## Grenzen

- **Nicht gemessen:** echte Mengen über ~800 Dateien. Offen sind Dauer, Speicherbedarf in IndexedDB (der Stand trägt den gelesenen Text) und Android-WebView. Die Probe arbeitet mit 101 erfundenen Dateien.
- **Kein Gerät, kein Windows-PC.** Ob „Weitermachen“ mit dem gemerkten Ordner am Gerät ohne Auswahl-Fenster geht, zeigt die Probe nur an einer gestellten Brücke (für „Zuletzt“, schon in 0.4.1).
- Der Stand wird nach jedem Block **ganz** neu geschrieben. Bei sehr großen Mengen kostet das Zeit; Teilschreiben wäre der nächste Schritt, falls Klaus' Messung das zeigt.
- Ändert sich eine Datei zwischen Abbruch und Weitermachen, ändert sich ihr Änderungsdatum: sie wird neu gelesen. Eine gelöschte Datei fällt heraus.
- Nichts veröffentlicht, keine Signieridentität, kein Schlüssel.

## Stundennachweis

| Zeit (UTC) | Block |
|---|---|
| 00:13–00:16 | Lesen (CLAUDE.md, Briefe), Stand der PRs. Der Brief lag nur auf dem Zweig von PR #15. |
| 00:16–00:21 | Bau: `src/lauf.ts`, Ablauf in `src/app.tsx`, Oberfläche, Fassung 0.4.2 |
| 00:21–00:23 | UI-Probe (8 neu), Gegenproben 3/3, Abgleich mit dem Baustein der Familienakte |
| danach | Doku, Push, PR, CI |

Erste Spur gegen 00:13 UTC (14.11.), letzte Spur beim Push. Obergrenze: rund 30 min ohne CI-Warten. Klaus' eigene Angabe geht vor.

## Startauftrag zum Einfügen

```
Repos: Datei-Organizer (CLAUDE.md, docs/BRIEF_ABSCHLUSS_2026-11-14_GROSSE-MENGEN.md, docs/BRIEF_ABSCHLUSS_2026-11-14_ORGANIZER-PRO-WINDOWS.md,
docs/WINDOWS.md, docs/ANDROID.md zuerst lesen). Zweig: der vorgegebene. FREIBRIEF (Klaus 13.11.): eigene geprüfte PRs (CI + Proben grün) selbst
mergen; veröffentlichen nur mit Klaus' Wort.
Auftrag: 1. Stand von PR #15 (Windows 0.4.1) und dem PR „0.4.2 große Mengen“ prüfen; sind CI und Proben grün: #15 zuerst mergen, dann 0.4.2.
Ist windows.yml/android.yml rot: zuerst reparieren. 2. Falls Klaus den öffentlichen Update-Schlüssel gegeben hat: in UpdateFeed.SCHLUESSEL (Android)
UND DesktopUpdates.SCHLUESSEL (Windows) eintragen, Proben laufen lassen. 3. Große Mengen messen (Klaus' Gerät/PC, >800 Dateien): Dauer, Speicher,
ob Weitermachen trägt; bei Bedarf Speicherprüfung vor jedem Block (Gedanke aus speicherReicht in der Familienakte).
Nicht: nichts veröffentlichen, keine Signieridentität initialisieren, keine Schlüssel in Dateien oder Chat, byte-gleiche Bausteine nicht
von Hand ändern. Name: Web-App „Datei-Organizer Basic“, App „Datei-Organizer Pro“. Abschlussbrief mit Stundennachweis.
```

## Nachtrag 14.11. (00:25–02:55 UTC): Schlüssel, große Ordner, Veröffentlichung

Klaus 14.11.: erst die App fertig; keine Tests mit großen Dateimengen; die Schlüssel Schritt für Schritt; danach A–D für große Ordner;
veröffentlichen erst danach – Basic, Pro, Windows – und die Geschenkbox ergänzen.

| Schritt | Ergebnis |
|---|---|
| Update-Schlüssel (Klaus in Termux) | öffentlicher Teil in `UpdateFeed.SCHLUESSEL` = `DesktopUpdates.SCHLUESSEL` (#16); `signatur.pem.age` im Tresor |
| Signier-Identität APK | Freigabe `DO_SIGNING_UNLOCK` (Klaus, `.age` im Tresor), Lauf „initialize“, PR #17 von Hand (Actions dürfen hier keine PRs anlegen), Merge auf Klaus' Ja; Zertifikat `594e44df…365d` |
| Große Ordner A–D (0.4.3, #19) | `docs/PLAN_GROSSE-ORDNER.md`: Leistung des Geräts, Prüfsumme am Ort, Arbeitsordner `Datei-Organizer-Arbeit` (nie im Pro-Tresor; Abweichung „unter Familienakte“ benannt), schlanke Liste, Speicherprüfung; UI 114, Engine 64, Gegenproben 5/5 |
| Veröffentlicht | Windows (Lauf 43541397352), Android (Lauf 43547054990, erster Versuch brach in der Emulator-Probe ab → #20), Basic über Pages; Nachweis `docs/VEROEFFENTLICHUNG-0.4.3.json` |
| Geschenkbox | Familienakte PR #179, Artefakt Version 22 |
| Pläne | `docs/PLAN_MEIN-TRESOR-APK.md` (Browser-Tresor → APK, später) |

**Funde unterwegs (alle behoben):**
- Die Windows-Abnahme und die Engine-Probe erwarteten bei der Update-Prüfung immer einen Fehler. Mit Schlüssel bzw. nach der ersten Veröffentlichung antwortet der Server richtig mit „aktuell“. Die Proben sichern jetzt zu: nie ein Angebot.
- Die Emulator-Probe der APK las im Kopf nur den Tooltip ohne Anzahl. Das Feld hat jetzt `aria-label` gleich dem sichtbaren Text (#20); das hilft auch Vorlesern.
- Zweimal fiel Maven Central kurz aus (Engine- bzw. Android-Bau). Jeweils einmal neu gestartet, danach grün.
- Das Repo ist **privat**: GitHub-Release-Links gehen ohne Anmeldung nicht. Die Geschenkbox zeigt deshalb die Links des eigenen Servers.

**Grenzen:**
- Kein Gerät, kein Windows-PC.
- Anonymer Download nur durch die Läufe selbst geprüft; aus der Sitzung sperrt der Proxy family-projekt.de und github.io.
- Windows 0.4.3 ist vor #20 gebaut; der einzige Unterschied ist das `aria-label`.
- Die nächste Ausgabe heißt 0.4.4.

### Stundennachweis (ganze Sitzung)

| Zeit (UTC) | Block |
|---|---|
| 00:13–00:25 | Lesen, Blöcke mit Weitermachen (0.4.2), Proben, Gegenproben, PR #16 |
| 00:25–00:50 | Update-Schlüssel und Signier-Identität mit Klaus Schritt für Schritt, Windows-Abnahme angepasst, #15/#16/#17 |
| 00:50–01:35 | Tresor-Frage, Pläne (#18), große Ordner A–D bauen und prüfen (#19) |
| 01:35–02:55 | Veröffentlichen (Windows, Android mit #20, Maven-Ausfälle), Geschenkbox, Nachweis |

Erste Spur 00:13, letzte gegen 02:55 UTC. Obergrenze rund 2 h 45 min, darin viel Warten auf GitHub-Läufe. Klaus' eigene Angabe geht vor.

### Startauftrag zum Einfügen (neu)

```
Repos: Datei-Organizer (CLAUDE.md, docs/BRIEF_ABSCHLUSS_2026-11-14_GROSSE-MENGEN.md, docs/VEROEFFENTLICHUNG-0.4.3.json,
docs/PLAN_GROSSE-ORDNER.md zuerst lesen). Zweig: der vorgegebene. FREIBRIEF (Klaus 13.11.): eigene geprüfte PRs (CI + Proben grün) selbst
mergen; veröffentlichen nur mit Klaus' Wort. 0.4.3 ist veröffentlicht (Android, Windows, Basic) – nicht erneut ausgeben, nächste Fassung 0.4.4.
Auftrag: 1. Klaus' Rückmeldung vom Gerät aufnehmen (Arbeitsordner auf SD-Karte, große Dateien, Update-Fähnchen) und Funde beheben.
2. Familienakte PR #179 (Geschenkbox) prüfen und mergen, falls noch offen.
Nicht: keine Massenprüfung mit vielen Dateien/Agenten (eigene Sitzungen, Klaus 14.11.), keine Schlüssel in Dateien oder Chat,
byte-gleiche Bausteine nicht von Hand ändern. Abschlussbrief mit Stundennachweis.
```
