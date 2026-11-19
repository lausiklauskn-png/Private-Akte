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
   ⚠ Der Lauf bricht ab, wenn es im Repo schon GitHub-Releases gibt (Schutz vor einem zweiten Schlüssel).
   ⚠ Wer die Freigabe verliert, kann der App keine Updates mehr geben – Nutzer müssten neu installieren und verlören den App-Speicher.

## Danach

- **Signierte APK** (der Ablauf kommt mit der App aus PR #60/#61 auf `main`): Actions → **„Android-App signiert“** → Run workflow auf `main`. Download `private-akte-pro-android-signiert`
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
