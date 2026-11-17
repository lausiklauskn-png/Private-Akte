# CLAUDE.md — Private-Akte

Diese Datei liest jede Sitzung zuerst.

## Was das ist

Die Private-Akte fasst die fertigen Apps unter einer neuen Hülle zusammen. Angelegt am 17.11.2026 (Klaus' Wort im Chat der Sitzung
„Kalender-Schleife“ der Familienakte).

## Entschieden (Klaus 17.11.2026)

- **Bauweise: Klone mit Pin, neue Hülle.** Jede übernommene App liegt unverändert unter `klone/<name>/`, Datei für Datei gleich mit
  ihrem Quell-Repo an einem festen Stand. Neu gebaut wird nur die Hülle (Start, Kopf, Farben, Wege zwischen den Apps).
  Grund: an den Apps ist viel korrigiert und trainiert worden – nichts davon darf beim Abschreiben verloren gehen.
- **Familienbüro bleibt eine eigene App** (`Familienbuero-Pro`, AGPL-3.0 wegen ONLYOFFICE) und kommt nicht in diese App.
  Die Private-Akte ruft es höchstens auf.
- **Portemonnaie: neu, schlank, offen.** Einfache Einträge „Geld rein / Geld raus“, offen gespeichert; die reinen Rechenteile kommen
  aus BookLedgerPro (`src/domain/money.js`, `kassenbuch.js`, `tagesabschluss.js`). Keine Kopie der Kasse-Seite – die hängt an der
  doppelten Buchführung. Als Arm an der Familienakte.
- **Verschlüsselung an einem Ort** (Klaus' Richtung, noch nicht gebaut): gearbeitet wird offen, verschlüsselt wird bei der Abgabe in die
  Akte. Vorbehalt: offen nur im eigenen Speicher der App, nicht auf SD-Karte oder in frei gewählten Ordnern.
- **Farben** (Klaus' Richtung): Stil des Familienbüros (Knöpfe mit Verlauf, Kopfleiste, Palette). Portemonnaie startet im Grün des
  Familienbüros, Workflow PDF rötlich; jede App startet in ihrer Farbe, bis der Nutzer umstellt.

## Stand

- `tools/klon-nachziehen.mjs` – Klon anlegen/nachziehen und prüfen (`--pruefen`, läuft in der CI `pruefung`).
- `klone/datei-organizer/` – Datei-Organizer @ `bcd48a4` (9.732 Dateien, Sortier-Kern in `lib/`). Pin `klone/datei-organizer.herkunft.json`.
- Offen: Klon der Familienakte (nach deren Ausgabe 2.28.74), Hülle, Portemonnaie, Bau und Ausgabe. Es gibt noch keine lauffähige App.

## Feste Regeln

- **Klone nie von Hand ändern.** Verbesserungen entstehen im Quell-Repo und kommen nur über
  `node tools/klon-nachziehen.mjs <name> --quelle <pfad> [--stand <ref>]` herein. Beim Hinzufügen `git add -f klone/` nehmen
  (die Klone bringen eigene `.gitignore` mit) und danach `--pruefen`.
- Der Sortier-Kern bleibt **eine** Fassung: die aus dem Datei-Organizer.
- Keine echten Dokumente, keine personenbezogenen Daten, keine Schlüssel oder Passwörter im Repo. Das Repo ist öffentlich.
- Sichtbare Änderungen erst als Vorschau zeigen, Klaus sagt Ja. Veröffentlichen nur mit Klaus' Wort.
- Forschungseinträge gehören nur nach KimHub.
