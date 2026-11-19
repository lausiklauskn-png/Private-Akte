# Signatur – Private Akte Pro (Android)

Eigener, dauerhafter Schlüssel nur für `de.familyprojekt.privateakte` – nie der Schlüssel einer anderen App. Bauweise wie Datei-Organizer Pro
(`tools/signing/` von dort übernommen, nur Namen und Kennung geändert). Der Schlüssel entsteht in GitHub Actions; im Repo liegen nur das
verschlüsselte Paket (`signing/android-release.enc.json`) und der öffentliche Fingerabdruck (`signing/android-certificate.json`). Aufschließen
kann ihn nur die Freigabe `PA_SIGNING_UNLOCK`, die Klaus selbst erzeugt und in GitHub hinterlegt.

## Was Klaus einmal tun muss

1. **Freigabe erzeugen** (Termux): `openssl rand -hex 32 > ~/pa-signing-freigabe.txt` – wie die anderen Freigaben verschlüsselt sichern
   (`age -p`), die offene Datei danach löschen. **Nie in den Chat, nie ins Repo.**
2. GitHub → Private-Akte → Settings → Environments → **New environment** `android-production` → **Add environment secret**
   Name `PA_SIGNING_UNLOCK`, Wert = Inhalt der Datei.
3. Sobald `signing-identity.yml` auf `main` ist: Actions → **„Dauerhafte Private-Akte-Pro-Signieridentität“** → Run workflow auf `main`,
   Operation **initialize**. Der Lauf erzeugt den Schlüssel, prüft die Wiederherstellung und legt einen PR `signing/android-identity` an
   (nur Paket und Fingerabdruck). Diesen PR zusammenführen. Danach jederzeit Operation **check**.
   ⚠ GitHub Actions darf in diesem Repo keine PRs anlegen: der Lauf endet dann rot, obwohl Schlüssel und Zweig fertig sind – den PR
   `signing/android-identity` → `main` von Hand anlegen.

**Erledigt am 19.11.2026** (Lauf 44516877917, PR #63): Zertifikat SHA-256 `836dea0684cc055b5fa2f78d4b02db6085cf9a8dee0c733dad31caa7b4b0bf30`,
SHA-1 `3C:17:EA:F6:A1:42:90:B0:30:FA:A3:D7:81:7A:3F:B9:02:B8:0D:3E` (öffentlich; für den Android-Client bei Google).
Freigabe bei Klaus: mit `age -p` verschlüsselt (Termux und Ordner Download), Gegenprobe „GLEICH“, offene Datei gelöscht.
**Google (19.11.):** im Projekt „Privat Brain Pro“ (`privat-brain-pro`) Android-Client „Private Akte Pro Android“ für
`de.familyprojekt.privateakte` mit diesem SHA-1. Die App braucht keine Client-ID (Google erkennt Paket und Signatur); App im Status
„Test“ – anmelden dürfen nur die Testnutzer, die Gmail-Freigabe läuft dann nach 7 Tagen ab. Wirkt erst mit einer **signierten** APK
(„Android-App signiert“), nicht mit der Prüf-APK (`.debug`, Wegwerf-Schlüssel).
   ⚠ Der Lauf bricht ab, wenn es im Repo schon GitHub-Releases gibt (Schutz vor einem zweiten Schlüssel).
   ⚠ Wer die Freigabe verliert, kann der App keine Updates mehr geben – Nutzer müssten neu installieren und verlören den App-Speicher.

## Danach

- **Signierte APK:** Actions → **„Android-App signiert“** → Run workflow auf `main`. Download `private-akte-pro-android-signiert`
  (APK, `.sha256`, Nachweis `.json`). Nichts wird veröffentlicht. Jede neue signierte APK installiert sich **über** die vorige, der
  App-Speicher bleibt. Die Prüf-APK aus `android.yml` heißt `de.familyprojekt.privateakte.debug` und liegt daneben als eigene App.
- **SHA-1 für Google** (Gmail in Private Brain Pro, OAuth-Client „Android“): steht im Lauf **check** unter
  „Zertifikat SHA-1 (für Google …)“.
- Veröffentlichen (Release, eigener Update-Server) ist **nicht** gebaut – erst auf Klaus' Wort, Android und Windows zugleich.

## Windows

Kein Gegenstück: das Setup ist unsigniert (SmartScreen „Weitere Informationen“ › „Trotzdem ausführen“), wie bei Datei-Organizer Pro und
BookLedgerPro. Eine Windows-Signatur bräuchte ein gekauftes Code-Signing-Zertifikat – nicht entschieden.

## Proben

`node --test tools/signing/test-identity.mjs tools/signing/test-unlock-file.mjs` (echter Wegwerf-Keystore). Bei PRs, die `android/` oder
`tools/signing/` berühren, baut „Android-App signiert“ die Release-APK und signiert sie mit einer Wegwerf-Identität (Probe, kein Download).
