# Auftrag für die nächste Sitzung (ab 18.11.2026) – Drucker, externer Scanner, Foto / Scan in die Apps

Davor lesen: `CLAUDE.md` (oben: „Stand (17.11.2026): Foto / Scan in der Web-App“). Die offenen Punkte der Landkarte
(`docs/BRIEF_SITZUNG_2026-11-16_OFFENE-PUNKTE-LANDKARTE.md`) gelten weiter, sind aber nicht Teil dieses Auftrags.

## Stand am 17.11.2026

- **Foto / Scan ist in der Web-App (Basic)** – auf `main` (#60), über Pages ausgeliefert. Klaus am Tablet: „Foto hat funktioniert.“
  Ordner-Seite, Weg „Foto / Scan“ (`src/scan.ts`, `src/seiten.tsx`, nur ohne App: `nurWeb`). Eine Seite bleibt ein JPG, mehrere werden
  ein PDF; „Kopie speichern“ legt die Datei in Downloads.
- **Kopf neu (#61):** keine Pille „Kein Ordner“ mehr, „Basic“/„Pro“ in der zweiten Zeile, daneben flach der Knopf „V 0.4.14“
  (Web-App: Aktualisieren; App: Update suchen). Am Handy stecken die runden Knöpfe hinter einem Pfeil (`[data-mehr-knopf]`), die
  Ordner-Pille entfällt dort. Zu Beginn nachsehen, ob #61 zusammengeführt ist; wenn nicht: Prüfläufe ansehen und zusammenführen.
- **Drucker-Knopf** (`[data-drucken]`, rund, im Kopf, nur Web-App) öffnet bisher nur das Druckfenster des Geräts für die ganze Seite.
  Das ist ein Platzhalter für diesen Auftrag.
- **APK und Windows sind unverändert** (ausgegeben ist 0.4.13, die Quellen stehen auf 0.4.14). Der neue Kopf ist derselbe Code und käme
  mit der nächsten Ausgabe mit; Foto / Scan und der Drucker-Knopf sind dort ausgeblendet.
- Anleitung „Windows-App installieren“ mit nachgezeichneten Fenstern: `docs/anleitung/windows-installation.html`.

## Was Klaus will (seine Worte, 17.11.)

1. **Druckersymbol oben**, rund. „Drucker verbinden … per Bluetooth oder per Kabel (USB), eigentlich per Bluetooth wäre am besten.“
   Ziel: direkt vom Handy aus drucken, ohne Kabel.
2. **Externer Dokumentenscanner** am Handy: „Scan-Funktion über Bluetooth … Scanner-Modell angeben oder Bluetooth beim Scanner
   anschalten.“ Als Beispiel nannte er das Hersteller-Werkzeug von HP. Ausdrücklich „nice to have, nicht so vorrangig“.
3. **Oder über „Teilen“:** „Dann muss die App aber auch auftauchen bei Teilen. Ich glaube, … ist sogar schon drin.“
4. **Foto / Scan in APK und Windows:** erst nach seiner Prüfung der Web-App und mit seinem Wort.
5. **Entschieden (17.11.): Scans kommen in den Unterordner „Scans“** des gewählten Ordners. Sie müssen von dort wieder
   herausgenommen und einsortiert werden können – später in ein Modul: die Familienakte soll voraussichtlich in Module umgestaltet
   werden, in die die einzelnen Scans kommen und aus denen sie für die Suchen gezogen werden. **Das ist noch nicht entschieden** und
   nicht Teil dieses Auftrags. „Jetzt ist erst einmal wichtig, dass der Scanner funktioniert.“
6. **Drucken – die eigentliche Idee:** aus dem heraus drucken, was man gerade vor sich hat, zum Beispiel aus einer Notiz: Druckersymbol
   antippen, „teilen mit Drucker“. Am liebsten so, dass der einmal gewählte Drucker vorgewählt bleibt und die Verbindung besteht – dann
   nur noch „Drucken“ drücken. Klaus: über die APK müsste es gehen, unter Windows geht es ohnehin (Kabel oder Bluetooth).
7. Allgemein: **ohne Erläuterungstexte** – Kamera, Scanner und Drucker erklären sich selbst.

## Einschätzung (vor dem Bauen mit Klaus klären, nichts davon ist gebaut)

- **Bluetooth direkt aus der Web-App geht nicht** für Drucker und Scanner: Browser erreichen über Bluetooth nur stromsparende
  Kleingeräte, nicht die Druck- und Scan-Dienste. Handys drucken über WLAN (Druckdienst von Android, AirPrint), nicht über Bluetooth.
  Das muss in der Sitzung am Stand der Technik nachgeprüft werden (kurze Recherche), bevor es Klaus als endgültig gesagt wird.
- **Drucken – der gangbare Weg:** der Drucker-Knopf öffnet das Druckfenster des Geräts mit dem **gerade angesehenen Dokument**
  (Bild oder PDF aus dem Steckbrief bzw. der gewählten Datei), nicht mit der ganzen Seite. Die Verbindung zum Drucker macht dann das
  Handy oder Windows; ein eigenes „Drucker verbinden“ in der App entfällt. In der Android-App braucht das einen eigenen Aufruf
  (der eingebaute Browser der App kennt `window.print()` nicht), in Windows ebenfalls prüfen.
- **Vorgewählter Drucker, ein Tipp (Klaus' Frage „kann man das automatisieren?“) – Antwort im Chat vom 17.11., in der Sitzung
  nachprüfen:** Android-App: gedruckt wird über den Druckdienst von Android; dessen Fenster erscheint jedes Mal, merkt sich aber den
  zuletzt benutzten Drucker – also Druckersymbol, dann „Drucken“. Ganz ohne dieses Fenster ginge es nur, wenn die App den Auftrag selbst
  an einen gemerkten Drucker im WLAN schickt (mehr Aufwand, hängt vom Drucker ab). Windows-App: Drucken ohne Fenster auf den
  Standarddrucker ist möglich. Web-App: immer das Druckfenster des Geräts. Bluetooth können nur wenige (meist mobile) Drucker; üblich
  ist WLAN.
- **Externer Scanner – der gangbare Weg:** Hersteller-App scannt, dann „Teilen“ an den Organizer.
  - Android-App: „Teilen an“ und „Öffnen mit“ sind seit 0.4.1 drin (`DoEingangPlugin`). Am Gerät mit einer Scanner-App prüfen.
  - Web-App: fehlt. Nachrüstbar als Teilen-Ziel der installierten Web-App (Eintrag im Manifest `src/public/manifest.webmanifest`
    und Annahme im Worker `src/public/sw.js`); geht nur in der installierten Web-App unter Android/Chrome, nicht auf dem iPhone.
- **Foto / Scan in der Android-App** braucht: einen Pfad für das Kamerabild im FileProvider (`android/app/src/main/res/xml/file_paths.xml`),
  die Abfrage `IMAGE_CAPTURE` im Manifest und eine angepasste Prüfung in `tools/native/test-native.mjs` (prüft heute „nur update/“).
  **Entschieden:** Scans werden in den Unterordner „Scans“ des gewählten Ordners geschrieben. Heute schreibt die App dort nur den
  Index (`NativeUtil.schreibPfadGueltig`); das ist eine bewusste Ausnahme von „Der Organizer liest nur“ und gilt für Android und
  Windows gleich (Verträge in `windows/bridge/contracts.json`). Die Dateien bleiben gewöhnliche Dateien (JPG/PDF mit dem Namen
  `Scan_…`), damit sie sich später herausnehmen und in ein Modul einsortieren lassen. In der Web-App mit „Ordner am PC“ geht das
  Schreiben ebenfalls (der Ordner ist dort schreibbar); ohne Ordner bleibt es bei „Kopie speichern“.
- **Windows:** Kamera am PC ist selten sinnvoll; dort eher „Vom Scanner holen“ über den Scan-Dialog von Windows. Nur als Frage an Klaus.

## Reihenfolge (Vorschlag)

1. Klaus nach dem Gerätetest fragen: Foto / Scan am Handy (mehrere Seiten, Kopie in Downloads, wird der Text gelesen?), neuer Kopf am
   Handy (Pfeil, zwei Zeilen) und am Tablet. Befunde zuerst abarbeiten.
2. **Scanner zuerst (Klaus: das Wichtigste):** Scans in den Unterordner „Scans“ schreiben – zuerst in der Web-App mit „Ordner am PC“,
   dann mit Klaus' Wort Foto / Scan in APK und Windows.
3. **Drucken:** kurze Recherche, dann Vorschau (Bild) für Klaus: Drucker-Knopf druckt, was gerade offen ist (angesehenes Dokument; eine
   Notiz gibt es im Organizer bisher nicht – mit Klaus klären, welche Notiz er meint); wo nichts offen ist, ist der Knopf ausgegraut.
   Nach seinem Ja bauen, zuerst Web-App, dann der Weg mit vorgewähltem Drucker in der Android-App.
4. **„Teilen an“ in der Web-App** (Scanner-App → Organizer), nach seinem Ja.
5. Ausgabe 0.4.14 (Android, dann Windows, nie gleichzeitig) nur mit Klaus' Wort.

## Regeln, die hier besonders gelten

- Sichtbare Änderungen erst als Vorschau, Klaus sagt Ja je Punkt. Keine Erläuterungstexte ohne seinen Wunsch.
- Erst Web-App, dann seine Prüfung, dann APK/Windows.
- Kern (`lib/`) bleibt unberührt; keine echten Dokumente im Repo.
- Proben: `npm run build`, `node tests/ui-probe.mjs` (Stand 142), bei Änderungen am Paket der App `node tools/native/test-native.mjs`.

## Startauftrag zum Einfügen

```
Repo lausiklauskn-png/Datei-Organizer (eigener Zweig, Entwurfs-PR; eigene geprüfte PRs selbst zusammenführen, Ausgaben nur mit Klaus' Wort).
Zuerst lesen: CLAUDE.md, docs/BRIEF_SITZUNG_2026-11-18_DRUCKER-SCANNER.md.
Stand: Foto / Scan ist in der Web-App (Basic) und von Klaus am Tablet bestätigt; Kopf neu (V-Knopf, Pfeil am Handy, Drucker-Knopf als
Platzhalter). APK und Windows unverändert (0.4.13 ausgegeben, Quellen 0.4.14).
Erster Schritt: Klaus nach dem Gerätetest von Foto / Scan und dem neuen Kopf fragen, Befunde abarbeiten. Dann der Reihe nach:
Scans in den Unterordner „Scans“ des gewählten Ordners schreiben (entschieden) und Foto / Scan in APK und Windows (nur mit Klaus' Wort),
Drucken dessen, was gerade offen ist, mit vorgewähltem Drucker (erst Vorschau), „Teilen an“ in der Web-App für Scanner-Apps.
```
