# Brief für die Nachfolgesitzung: „Marktplatz Spezial“ mit Passkey für die Pro-Apps

Geschrieben am 26.11.2026 in der Sitzung der Privaten Akte (0.9.11). Klaus' Auftrag im Wortlaut (gekürzt):

> „Alle Pro-Apps, die jetzt Android und Windows sind, sollen mit einem Passwort geöffnet werden können. Eine separate
> Seite, wo die ganzen Pro-Apps drin sind, ähnlich aufgebaut wie der Marktplatz, die aber erst aufgeht, wenn ich
> **Marktplatz Spezial** klicke. Genauso bei Family Projekt und genauso bei PWA Toolpoint, nur dass da mit einem Passwort
> oder Passkey, den ich persönlich vergebe, in meinem Studio, das in der entsprechenden Seite vorhanden ist, für PWA Toolpoint
> und für Family Projekt jeweils ein anderer. Da gehen die APKs und die Windows-Versionen hinein. Das soll später zum Kauf
> angeboten werden: man kauft sich einen Schlüssel, genauso wie die Freischaltung bei Private Brain, für die einzelnen Apps.
> Man bekommt einen Passkey, gibt ihn weiter, und derjenige kann mit dem Passkey die APKs freischalten.“

## Startauftrag (zuerst lesen, dann mit Klaus abstimmen)

1. Repos dazuholen: `family-project` (family-projekt.de, Hetzner/Caddy, **nicht** Pages) und `PWA-Toolpoint`
   (privates Repo). Beide `CLAUDE.md` lesen: dort stehen das **Studio** (langer Druck ~1,5 s auf die Fußzeile, Passwort prüft
   der Server `server/freigabe.php`; kein Token im Browser), der Marktplatz (`markt.html`, `assets/config/listings.js`,
   `tools/statische-listen.mjs`, `tools/detailseiten.mjs`, `tools/sitemap-bauen.mjs`), Cache-Bump und die vielen Proben.
2. Vorbild für die Schlüssel: **Private Brain Pro** – `docs/WERKZEUGE-UND-FREISCHALTUNG.md` im Repo `Privat-Brain-Pro`
   (Herausgeber-Studio, signierte Codes `PBK1.<Daten>.<Unterschrift>` mit BIP-340/Schnorr, öffentlicher Schlüssel in
   `native/license-keys.json`, Käufer-Pseudonym, Passwort-Probe, Ersatzschlüssel 3 von 5). Dieselbe Bauweise wiederverwenden,
   nicht neu erfinden.
3. Erst einen **Vorschlag** mit den offenen Fragen unten an Klaus, dann bauen. Sichtbares erst als Vorschau.

## Was gebaut werden soll

- **Knopf „Marktplatz Spezial“** auf family-projekt.de und auf PWA Toolpoint, gleich gestaltet wie der Marktplatz.
- **Eigene Seite** (z. B. `markt-spezial.html`), aufgebaut wie der Marktplatz (Karten, Detailseiten), aber **gesperrt**:
  sie zeigt ihren Inhalt erst nach Eingabe eines gültigen Passkeys.
- Darin **alle Pro-Apps mit Android- und Windows-Fassung**, je Karte die Downloads (APK, Windows-Installer) aus den
  GitHub-Releases. Stand 26.11.2026:
  - Private Akte Pro – `Private-Akte`, Release `v0.9.11` (APK + Windows)
  - Familienakte – `Meine-Familienakte`, Releases `android-v…` / `windows-v…` (zuletzt 2.28.77)
  - Private Brain Pro – `Privat-Brain-Pro` (Android; Windows prüfen)
  - Datei-Organizer Pro – `Datei-Organizer` (APK/Windows prüfen)
  - Workflow PDF Pro – `Workflow-PDF-Pro`
  - BookLedger Pro – `BookLedgerPro` (native App laut BookLedger-Basic-Eintrag in family-project)
  - Familienbüro Pro – `Familienbuero-Pro` (prüfen, ob es APK/Windows gibt)
  Die Liste vor dem Bau gegen die echten Releases abgleichen (welche App hat welche Datei, neueste Fassung).
- **Passkey vergeben im Studio** der jeweiligen Seite: Klaus erstellt dort einen Schlüssel je Käufer (Pseudonym, welche
  Apps), **für family-projekt.de und PWA Toolpoint je ein eigener Herausgeber-Schlüssel**. Liste der vergebenen Schlüssel im Studio.
- **Später Verkauf:** man kauft einen Schlüssel (Passkey) für einzelne Apps, gibt ihn weiter; wer ihn hat, kann die
  APKs/Windows-Fassungen dieser Apps freischalten bzw. herunterladen.

## Wichtigster Punkt: was der Schlüssel wirklich schützt

Die APKs und Windows-Installer liegen heute **öffentlich** in GitHub-Releases (öffentliche Repos). Eine Seite, die nur
den Link versteckt, schützt nichts – wer die Release-Adresse kennt, lädt ohne Schlüssel. Zwei ehrliche Wege:

- **A – Sperre in der Seite (schnell):** die Spezial-Seite prüft einen signierten Passkey (wie Private Brain, ohne Netz) und
  zeigt dann die Links. Schützt nur vor Zufallsbesuchern, nicht vor Weitergabe der Download-Adresse. Passt, solange die
  Releases ohnehin öffentlich sind.
- **B – echte Sperre (Server):** die Downloads liegen **nicht** mehr öffentlich, sondern auf Klaus' Server (Hetzner,
  z. B. unter family-projekt.de); ein PHP-Endpunkt (wie `freigabe.php`) prüft den Passkey und gibt die Datei dann aus
  (kurzlebiger Link). Dafür müssten die Release-Dateien künftig zusätzlich (oder statt) dorthin. Klaus' Update-Server
  `family-projekt.de/updates/…` gibt es schon (Private Akte, Datei-Organizer) – prüfen, ob er dafür taugt.
- **Zusätzlich möglich:** der Passkey schaltet **in der App** Funktionen frei (wie die Werkzeuge in Private Brain Pro).
  Das schützt am besten, ist aber Arbeit in jeder einzelnen App.

Diese Wahl muss Klaus treffen, bevor gebaut wird.

## Offene Fragen an Klaus (vor dem Bau)

1. Weg A, B oder B + Freischaltung in der App?
2. Ein Passkey für **alle** Pro-Apps oder je App einzeln (Klaus sagte „für die einzelnen Apps“ → vermutlich je App wählbar)?
3. Gilt ein Passkey von family-projekt.de auch auf PWA Toolpoint? (Klaus: „jeweils ein anderer“ → vermutlich nein.)
4. Bleiben die Releases öffentlich auf GitHub (Repos sind öffentlich), oder sollen die Pro-Dateien dort verschwinden?
5. Soll der Knopf „Marktplatz Spezial“ für alle sichtbar sein (mit Passkey-Feld) oder versteckt wie das Studio?
6. Text für Käufer (Kauf, Pseudonym, was man bekommt) – Klaus' Vorgaben.

## Hinweise aus dieser Sitzung

- Private Akte und Familienakte wurden am 26.11.2026 als **PWA** (Web-App) in beide Märkte eingetragen (Kennungen
  `eigen-private-akte`, `eigen-familienakte`); die Pro-Fassungen (APK/Windows) gehören in den Marktplatz Spezial.
- Veröffentlichte Fassungen der Privaten Akte stehen in `docs/VEROEFFENTLICHUNG-*.md`; nichts erneut ausgeben.
- Keine Schlüssel, Passwörter oder echten Käuferdaten ins Repo; Repos sind öffentlich (PWA Toolpoint privat).
- Regeln der Seiten-Repos beachten: Kennung = Identität der Messreihe, Cache-Bump, alle Proben einzeln laufen lassen.
