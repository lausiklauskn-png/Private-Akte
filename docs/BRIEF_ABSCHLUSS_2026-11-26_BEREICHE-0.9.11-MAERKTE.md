# Abschlussbrief 26.11.2026 – Bereiche, 0.9.11, Mikrofon-Bericht, PWA in den Märkten

## Erledigt
- **Bereiche der Startseite (PR #94):** unter 700 px so viele gleich breite Spalten, wie in die Breite passen, flache Kacheln,
  nach unten zu rollen; nach dem Alphabet. Ab 700 px wie bisher. Am Tablet ungeprüft.
- **0.9.11 (Code 101) veröffentlicht:** Android (Release `v0.9.11`, Update-Server) und Windows, Nachweis
  `docs/VEROEFFENTLICHUNG-0.9.11.md`. Diktat aus 0.9.10 vorher geprüft (`test-native` 41 grün). Nächste Fassung 0.9.12 (Code 102).
- **Fehlerbericht Mikrofon** für Rezeptbuch/Mixarium: `docs/FEHLERBERICHT_2026-11-26_MIKROFON-ANDROID-APP.md`.
- **Private Akte und Familienakte als PWA im Marktplatz:** PWA Toolpoint PR #188, family-project PR #380 (gemergt `3ae19eb`,
  Cache v172). Kennungen `eigen-private-akte`, `eigen-familienakte`. family-projekt.de holt `main` per Cron alle 2 Minuten
  (`deploy/AUTO_DEPLOY.md` dort). Karten am Tablet ungeprüft, Messung kommt mit dem nächtlichen Lauf.

## Marktplatz Spezial
- Brief `docs/BRIEF_SITZUNG_2026-11-27_MARKTPLATZ-SPEZIAL.md` ist **überholt**: die Sitzung „Marktplatz-Spezial“ hat danach
  gebaut (family-project #381 Dienst, Passkeys `FPK1.`/`TPK1.`, Seite und Studio; #383 Spiegel). Laut Klaus laufen Server und
  Hochladen der Pro-Apps; offen ist nur noch die Freigabe über den Passkey. Weiter dort, nicht hier.
- Abgesprochen per Nachricht an jene Sitzung: Cache-Stand v172, Release `v0.9.11` der Privaten Akte soll gespiegelt werden,
  PWA Toolpoint (`spezial.pwa-toolpoint.de`) dort nachsehen.

## Offen
- Am Tablet: Bereiche (0.9.11), Diktat am Fold 7, die neuen Marktplatz-Karten.
