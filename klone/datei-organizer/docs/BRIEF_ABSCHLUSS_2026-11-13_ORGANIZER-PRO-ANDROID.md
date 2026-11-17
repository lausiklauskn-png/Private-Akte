# Abschluss 13.11.2026 (Nacht): Organizer 0.3.4, Abgleich, Landkarte, Update-Fähnchen, Datei-Organizer Pro (Android)

Folgt auf `BRIEF_ABSCHLUSS_2026-11-13_NEEDS-RAHMEN-RUNDE-2.md`. Danach in derselben Sitzung:

## Ergebnis

**Datei-Organizer 0.3.4 – gemergt und über Pages veröffentlicht (Klaus: „Ja, kannst du den Organizer mergen“, #13)**
- Neu im Lesen:
  - Texterkennung (Fotos, Scans ohne Text)
  - Prüfkern des Auslieferungsprüfers (Merkmale aus dem Datei-Innern, Excel/PowerPoint-Text)
  - ähnliche Dateien über den gleichen Inhalt hinaus
  - **PDF-Kennung** zur Herkunft (`lib/pdfkennung.ts`)
- **Abgleich in beide Richtungen** mit `docs/ABGLEICH.md` und `node scripts/abgleich.mjs`. Es gibt einen Kern: Er wird im Organizer trainiert, die Familienakte nutzt ihn byte-gleich. Prüfkern und Tesseract kommen byte-gleich aus der Familienakte.
- **Landkarte und Dashboard** in der App:
  - Kartensymbol im Kopf
  - jeder Kasten im Dashboard ist ein Link in den Baum bzw. zum Prüfen
  - **Auge, Stift, Papierkorb** als Strichsymbol an jeder Datei; der Stift ändert auch schon Eingeordnetes
  - Artefakt: https://claude.ai/artifact/HPFVGCBfWQva3trYA4iKDJ, Quelle `docs/landkarte/`
- Behoben:
  - „Finden“ zeigte nach einer Änderung den alten Stand.
  - Der Service Worker legte Nebenseiten als index.html ab.

**Familienakte #178 (Entwurf):** Sortier-Kern nachgezogen; Pin auf main b391aaa, nur `typen.ts` geändert. Android und Windows sind grün, die große Prüfung lief zuletzt noch.

**Update-Fähnchen direkt laden** (Klaus: „Versionsnummer … soll nur Update installieren, nicht die Einstellungen“)
- **Workflow PDF Pro #74:** CI grün. `WorkflowUpdates.install` lädt die APK der Veröffentlichung und prüft Größe, SHA-256, Paket, Zertifikat und versionCode.
- **Private Brain Pro #138:** `ProUpdates.install`, gleiche Prüfungen. Die Emulator-Prüfung war wegen eines Emulator-Absturzes rot und ist einmal neu gestartet.
- Beide PRs sind Entwurf und nicht veröffentlicht. Unter Windows öffnet der Tipp noch die Download-Seite.

**Datei-Organizer Pro 0.4.0 – Android (#14, Entwurf)**
- Hülle wie BookLedgerPro, Paket `de.familyprojekt.dateiorganizer`.
- Ordner-Plugin mit denselben Aufrufen wie in der Familienakte.
- Updates von family-projekt.de mit Ed25519; der öffentliche Schlüssel fehlt noch, bis dahin meldet die App „noch nicht eingerichtet“.
- Fähnchen und Fassung laden direkt.
- Signier- und Veröffentlichungsläufe nur von Hand.
- **Namen:** Die Web-App heißt jetzt **„Datei-Organizer Basic“**, die App **„Datei-Organizer Pro“** (Klaus: „genauso machen wir das“).
- Proben: Kern 150, UI 78, nativ 35, JVM 17 – alle grün. Gradle und Lint prüft erst die CI.

## Freibrief (Klaus 13.11., Nacht)

Klaus: „Du hast einen Freibrief für Mergen und gib das bitte auch an die neue Sitzung weiter.“ Eigene geprüfte PRs (CI und Proben
grün) selbst nach `main` mergen – in allen Repos dieser Arbeit (Datei-Organizer, Familienakte, Workflow PDF Pro, Private Brain Pro,
BookLedgerPro, Workflow Needs). **Veröffentlichen** (APK/Windows-Ausgaben, Releases) weiter nur mit seinem Wort. In dieser Sitzung danach
gemergt: Datei-Organizer #14, Workflow PDF Pro #74, Private Brain Pro #138 (Familienakte #178 nach grüner Prüfung).

## Was Klaus einmalig tun muss (Einzelheiten `docs/ANDROID.md`)

1. **APK-Signatur:**
   - Freigabedatei erzeugen.
   - Unter GitHub → Datei-Organizer → Settings → Environments `android-production` das Geheimnis `DO_SIGNING_UNLOCK` anlegen.
   - Actions → „Signieridentität“ → `initialize` starten.
2. **Update-Server:** den Termux-Block aus `docs/ANDROID.md` ausführen (Ordner `datei-organizer`, Geheimnisse `UPDATE_SIGNING_KEY`, `UPDATE_UPLOAD_KEY`). Die Zeile mit dem öffentlichen Schlüssel an Claude geben, sie kommt in `UpdateFeed.SCHLUESSEL`.

## Offen

- Windows-App „Datei-Organizer Pro“ nach dem Muster von BookLedgerPro `windows/` (Tauri, Java-Engine, Updates vom eigenen Server, Installer, `windows-release.yml`).
- Android-Lücken:
  - „Speichern unter“ für den Index ohne Ordner
  - Teilen an die App, „Öffnen mit“
  - Ordnerfreigabe dauerhaft merken
  - große Mengen in Blöcken mit Weitermachen nach Abbruch (Klaus: die nächsten 2–3 Wochen)
- Merge von #14 (auf Klaus' Wort; dann heißt die PWA live „Basic“).
- PRs #74, #138 und Familienakte #178 nach grüner CI zusammenführen; veröffentlichen nur auf Klaus' Wort.
- Übernahme aus dem Organizer in die Familienakte (Vorschau zuerst), Outlook-MSG/PST, Gerätetest der Ausgaben vom 13.11.
- Forschungseintrag nach KimHub: nicht gemacht (KimHub nicht in der Sitzung).

## Stundennachweis

Fortsetzung desselben Tages. Erste Spur nach dem letzten Brief gegen 19:15 UTC (Needs #37 / Seite Sieben Tool-Ideen), letzter Commit 23:19 UTC. Blöcke: 19:15–20:30 Runde 3 und Reduktion, 20:30–22:00 Organizer 0.3.4, 22:00–23:30 Abgleich, Landkarte, Update-Fähnchen, Android-App (ein Helfer, rund 16 Minuten). Obergrenze rund 4¼ h. Klaus' eigene Angabe geht vor.

## Startauftrag zum Einfügen

```
Repos: Datei-Organizer (CLAUDE.md, docs/BRIEF_ABSCHLUSS_2026-11-13_ORGANIZER-PRO-ANDROID.md, docs/ANDROID.md zuerst lesen),
BookLedgerPro (Vorbild: docs/WINDOWS.md, docs/UPDATES-EIGENER-SERVER.md, windows/, .github/workflows/windows*.yml).
Zweig: der vorgegebene. FREIBRIEF (Klaus 13.11.): eigene geprüfte PRs (CI + Proben grün) selbst mergen; veröffentlichen nur mit Klaus' Wort.
Auftrag: 1. Windows-App „Datei-Organizer Pro“ nach dem Muster von BookLedgerPro bauen (Tauri + Java-Engine, Ordnerzugriff,
Updates vom eigenen Server family-projekt.de/updates/datei-organizer/ mit Ed25519, Installer, windows.yml/windows-release.yml nur von Hand).
2. Falls Klaus den öffentlichen Update-Schlüssel gegeben hat: in Android (UpdateFeed.SCHLUESSEL) und Windows eintragen.
3. Android-Lücken: Speichern unter, Teilen/Öffnen mit, dauerhafte Ordnerfreigabe. Danach große Mengen in Blöcken mit Weitermachen.
Nicht: nichts veröffentlichen, keine Signieridentität initialisieren, keine Schlüssel in Dateien oder Chat, byte-gleiche Bausteine nicht
von Hand ändern. Name: Web-App „Datei-Organizer Basic“, App „Datei-Organizer Pro“. Abschlussbrief mit Stundennachweis.
```
