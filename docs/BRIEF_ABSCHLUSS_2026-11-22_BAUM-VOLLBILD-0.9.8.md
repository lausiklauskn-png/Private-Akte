# Abschlussbrief 22.11.2026 – Baum dichter, Vollbild, Ausgaben 0.9.8 / 0.4.25

## Erledigt (21./22.11.)

- **HTML-Dateien** (Klaus 21.11.): Datei-Organizer 0.4.24, Familienakte 2.28.77, Private Akte 0.9.7 – je Android, Windows, PWA ausgegeben.
- **Baum dichter** (Klaus 21.11., „in allen Apps“): Private Akte (leeres Pfeil-Feld bekam 22 px Innenabstand, `app.css`, PR #85),
  Datei-Organizer 0.4.25 (Äste 34 statt 40 px, PR #81 dort), Familienakte (Ordnerbäume der Hilfe, PR #230 dort, über Pages).
- **Vollbild in der Vorschau** (Klaus 22.11.): Knopf ⤢ im Steckbrief, Foto/PDF über den ganzen Schirm (PR #86). Dazu weitere
  Maven-Spiegel (Google) in `android/build.gradle` und `windows/engine/build.mjs` – Maven Central war gedrosselt.
- **Ausgegeben 22.11. (Klaus' Wort):** Private Akte 0.9.8 Android + Windows (Nachweis `docs/VEROEFFENTLICHUNG-0.9.8.md`, PR #87),
  Datei-Organizer 0.4.25 Android + Windows (Nachweis dort `docs/VEROEFFENTLICHUNG-0.4.25.json`, PR #82). Downloads nachgeprüft,
  Dateien an Klaus geschickt. Geschenkbox verweist auf 0.9.8.
- **Private Brain Pro 1.0.57 am Tablet:** Update über das Fähnchen fror im Pop-up-Fenster ein (keine Prozentzahl); APK von Hand
  geschickt, Klaus hat 1.0.57 installiert. Ursache nicht belegt (Vermutung im Brief unten).

## Offen / nächste Sitzung

- **Private Brain Pro und V3** (Klaus 22.11.): „Alle Konten“ wie ein Postfach (Ordner, Anordnung, Spam …), fehlende Themen aus V3 nach Pro,
  V3 auf den Stand von Pro (PWA, APK, Windows). Auftrag mit Startauftrag im Repo Privat-Brain-Pro:
  `BRIEF_SITZUNG_2026-11-23_ALLE-KONTEN-V3-THEMEN.md`.
- Private Akte: Klon `privat-brain-pro` danach nachziehen (Pin @ `33775c1`, 1.0.57), wenn Pro 1.0.58 auf `main` ist.
- Am Tablet ungeprüft: Vollbild, dichter Baum (Akte 0.9.8, Organizer 0.4.25).

## Startauftrag (nächste Sitzung)

```
Lies im Repo Privat-Brain-Pro CLAUDE.md und BRIEF_SITZUNG_2026-11-23_ALLE-KONTEN-V3-THEMEN.md und arbeite den Startauftrag dort ab
(Repo Privat-Brain-Pro-V3 dazuholen). Danach in der Privaten Akte den Klon privat-brain-pro nachziehen (tools/klon-nachziehen.mjs),
Probe und test-native laufen lassen. Veröffentlichen nur mit Klaus' Wort.
```
