# Wiederherstellen ohne GitHub

Diese Sicherung enthält alles, was nötig ist, um die Private Akte und die angeschlossenen Apps ohne GitHub
wieder aufzubauen: den Quellcode jeder App mit vollem Verlauf, die fertigen Apps und die Web-Apps.
Welche Datei was ist und wie groß: `INHALT.md`. Prüfen, ob alles heil angekommen ist: `sha256sum -c SHA256SUMS`.

## Für Menschen: die Apps sofort benutzen

- **Android:** die Datei `<Repo>--…apk` aufs Gerät kopieren und öffnen. Eine schon installierte Fassung derselben App
  wird nur ersetzt, wenn die neue mit demselben Schlüssel signiert ist (das ist bei den Dateien hier so).
- **Windows:** `<Repo>--…setup.exe` starten. Nicht signierte Installer: „Weitere Informationen“ › „Trotzdem ausführen“.
- **Web-App (PWA):** `WebApp-<Repo>.zip` entpacken und den Ordner mit einem Webserver ausliefern, z. B.
  `python3 -m http.server 8000` im entpackten Ordner, dann im Browser `http://localhost:8000/<Repo>/` öffnen.
  Die Web-Apps erwarten, unter `/<Repo>/` zu liegen (wie bei GitHub Pages); die Private Akte holt Familienbüro und
  Private Brain Pro über `../Familienbuero-Pro/` und `../Privat-Brain-Pro/` – darum alle Web-Apps nebeneinander
  in denselben Ordner entpacken. Der Abzug enthält die Seite, wie sie veröffentlicht war; fehlt einmal eine Datei,
  wird die Web-App aus dem Quellcode neu gebaut (unten).

## Quellcode mit Verlauf

Jede `Quellcode-<Repo>-mit-Verlauf.zip` enthält einen vollständigen Git-Klon: Arbeitsstand von `main` und den
Ordner `.git` mit **allen Commits, allen Zweigen und allen Tags**. Entpacken genügt:

```bash
unzip Quellcode-Private-Akte-mit-Verlauf.zip
cd Private-Akte
git log --oneline | head          # Verlauf ist da, ohne Netz
git branch -a                      # alle Zweige
```

Auf einen neuen Server bringen (Gitea, Forgejo, GitLab oder ein neues GitHub-Konto):

```bash
git remote set-url origin <neue Adresse>
git push --all origin && git push --tags origin
```

Was **nicht** im Git-Verlauf steckt und deshalb hier fehlt: Pull-Request-Beschreibungen und -Kommentare,
Issues, Einstellungen der Repos (Pages, Umgebungen, Geheimnisse) und Release-Seiten außer den hier
mitgesicherten Apps. Die Inhalte der Pull Requests stehen aber als Commits im Verlauf.

## Geheimnisse – nicht in dieser Sicherung, getrennt aufbewahren

Ohne sie lassen sich die Apps bauen und benutzen, aber **keine Updates über bereits installierte Apps**
ausliefern (Android verlangt denselben Signierschlüssel):

- Signierschlüssel liegen verschlüsselt in den Repos (`signing/`, `tools/signing/`); die Freigaben dazu
  (`PA_SIGNING_UNLOCK`, `PB_SIGNING_UNLOCK`, `WF_PDF_SIGNING_UNLOCK` und die der übrigen Apps) liegen nur bei Klaus
  in den mit `age` verschlüsselten Tresoren (Termux). Nie neu erzeugen, sonst passen Updates nicht mehr.
- Schlüssel für den Update-Server (`UPDATE_SIGNING_KEY`, `UPDATE_UPLOAD_KEY`) und Google-/Microsoft-Anmeldungen
  (OAuth-Clients, Projekt `privat-brain-pro`) liegen ebenfalls nicht hier.
- Nicht enthalten: das private Repo **Kimhub** (Forschungseinträge, `forschung/messungen/`) – es braucht eine eigene
  Sicherung mit Zugang.

## Für eine KI: so wird aus dieser Sicherung wieder die App

Du (eine KI wie Claude) bekommst diese Sicherung und sollst eine App wiederherstellen, weiterbauen oder neu
ausliefern. Das Gedächtnis der bisherigen Zusammenarbeit steckt **im Quellcode selbst** – lies es, bevor du baust:

1. **`CLAUDE.md` im Wurzelordner jedes Repos zuerst.** Sie ist der Sitzungs-Anker: was die App ist, was entschieden
   wurde (mit Datum und Klaus' Wortlaut), feste Regeln, was leicht kaputtgeht, welche Fassung veröffentlicht ist und
   welche als nächste kommt. Die Einträge sind neueste zuerst. Sie gilt vor deinen eigenen Gewohnheiten.
2. **`BRIEF_*.md`** (im Wurzelordner und unter `docs/`): Abschluss- und Startbriefe je Sitzung – was gebaut wurde,
   was offen ist, der Startauftrag der nächsten Sitzung. Der jüngste Brief sagt, wo die Arbeit stand.
3. **`docs/`**: Bedienung, Grenzen, Pläne, Nachweise jeder Veröffentlichung (`VEROEFFENTLICHUNG-*.md` mit Größe und
   SHA-256 der ausgelieferten Dateien), Lehren aus Fehlern. In Sage-Protokol stehen die netzweiten Regeln
   (`docs/NETZWEIT.md`, `INTERFACES.md`, `LEHREN.md`) und die Lehre zur Bedeutungssuche
   (`docs/LEHRE-EMBEDDING-MATCH-KALIBRIERUNG.md`).
4. **Der Git-Verlauf:** `git log` erzählt in deutschen Commit-Nachrichten jeden Schritt; Merge-Commits nennen die
   Pull-Request-Nummer, auf die sich CLAUDE.md und Briefe beziehen (`git log --grep '#150'`).
5. **Die Bauwege stehen in `.github/workflows/*.yml`** jedes Repos (Prüfung, Android, Windows, Pages, Release).
   Das sind normale Shell-Schritte; sie laufen auch auf einer anderen CI oder lokal (Node 22/24, Java 21 und das
   Android-SDK für Android, Rust/Tauri und ein Windows-Rechner für Windows). `package.json` nennt die Proben
   (`npm test` bzw. die dort genannten Skripte).
6. **Klone nie von Hand ändern.** Die Private Akte enthält unter `klone/` unveränderte Kopien anderer Repos mit Pin
   (`klone/<name>.herkunft.json`); sie werden nur über `tools/klon-nachziehen.mjs` aus dem Quell-Repo erneuert.
   Ebenso sind gemeinsame Bausteine byte-gleich gepinnt (Drift-Guards); ändern immer in der Quelle, dann neu kopieren.

### Zusammenhang der Apps

- **Private Akte** ist die Hülle. Darin laufen als Klone: **Familienakte** (Tresor, Register, Kalender, Notizen,
  Suche), **Datei-Organizer** (Einlesen, Sortier-Kern), **Workflow PDF** (Scannen, PDF), **Private Brain Pro**
  (Mail, Bedeutungssuche), Rechenteile aus **BookLedger Pro** (Portemonnaie, Bank) und `04_match.js` aus
  **Sage-Protokol**. **Familienbüro Pro** ist eine eigene App, die Private Akte ruft sie nur auf.
- **Workflow PDF Pro** ist Workflow PDF als Android-/Windows-App. **BookLedger Basic**, **Workflow Calculate**
  (Angebote kalkulieren) und **Workflow Needs** (Bedarfsanalyse, Angebot) gehören zum BookLedger-Verbund.
- **Private Brain V3** gehört bewusst nicht dazu (eigene App, eigenes Repo).

### Arbeitsweise, die Klaus erwartet

Deutsch, einfache Sätze, ein Schritt nach dem anderen; nichts erfinden; Ehrlichkeit über den Stand („am Gerät
ungeprüft“); sichtbare Änderungen erst als Vorschau zeigen; **veröffentlichen nur auf Klaus' Wort**; keine echten
Dokumente, Passwörter oder Schlüssel ins Repo; keine Emojis in den Oberflächen; das Gelernte eines Sortier- oder
Suchkerns wird nie gelöscht.
