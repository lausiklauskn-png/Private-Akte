# Fehlerbericht: Mikrofon springt in der Android-App nicht an

Für andere Sitzungen und Apps (z. B. Mein Rezeptbuch, Mixarium): prüfen, ob derselbe Fehler dort steckt.
Quelle: Private Akte, behoben in 0.9.10 (PR #95, 24.11.2026), geprüft und unverändert in 0.9.11 (26.11.2026).

## Was Klaus gesehen hat

- Galaxy Z Fold 7, Android 17, Private Akte Pro 0.9.9 als **Android-App (APK)**.
- Tipp auf das Mikrofon am Suchfeld: nichts passiert bzw. „Mikrofon nicht erkannt“.
- In den App-Berechtigungen steht Kamera, aber **kein Mikrofon** – das sah nach der Ursache aus, war es aber **nicht**.
- Im Browser (Chrome, PWA) ging das Mikrofon die ganze Zeit.

## Ursache

Die Web-Seite fragte nach der Spracherkennung des Browsers (`window.SpeechRecognition` / `window.webkitSpeechRecognition`,
„Web Speech API“). **Die Android-WebView, in der eine Capacitor-App läuft, hat diese Spracherkennung nicht** (oder sie ist da, läuft
aber nicht). Chrome hat sie, die WebView nicht. Die Seite fand also nichts zum Zuhören – das Mikrofon blieb stumm oder wurde
als „nicht verfügbar“ gemeldet.

Das Mikrofon-Recht fehlt mit Absicht: Die App nimmt selbst nichts auf, sie lässt **Androids Sprachfenster** zuhören (das von Google,
„Sprechen Sie jetzt“). Dafür braucht die App kein `RECORD_AUDIO`. Ein Mikrofon-Recht nachzutragen hätte den Fehler **nicht** behoben.

## Lösung (wie in Familienakte und Private Brain Pro)

1. **Natives Plugin** `ProSpeech` (aus Private Brain Pro, `ProSpeechPlugin.java`): startet Androids Sprachfenster
   (`RecognizerIntent.ACTION_RECOGNIZE_SPEECH`, Sprache `de-DE`, ein Ergebnis) und gibt den gehörten Text zurück.
   Kein Mikrofon-Recht nötig.
2. **Klebstoff in der Web-Seite** (`familienakte-android.js` aus der Familienakte, unverändert): Gibt es `Capacitor.Plugins.ProSpeech`,
   setzt er eine kleine Klasse an die Stelle von `window.SpeechRecognition` und `window.webkitSpeechRecognition`. Sie ruft
   `ProSpeech.listen(...)` und liefert das Ergebnis wie die Web Speech API (`onresult`, `onerror`, `onend`). Dazu setzt er die Marke
   `window.FamilienakteDiktat`. Der vorhandene Diktat-Code der Seite bleibt unverändert und merkt nicht, dass ein anderer zuhört.
3. **Nur in der App einsetzen:** Das Skript kommt beim Bau des App-Pakets als erstes Skript in `index.html`
   (`tools/native/web-paket.mjs`, `DIKTAT`). Im Browser und unter Windows fehlt ProSpeech – dort tut das Skript nichts.
4. **Seiten im Rahmen (iframe) nicht vergessen:** Eine Seite in einem iframe hat ihr eigenes `window`. Sie muss die Erkennung vom
   Hauptfenster übernehmen (`rahmen/wfpdf-bruecke.js`: wenn `parent.FamilienakteDiktat` da ist,
   `window.SpeechRecognition = parent.SpeechRecognition`). Der Kalender im Rahmen bekommt das Skript selbst.
   Hintergrund: Capacitor 8 nimmt Plugin-Aufrufe **nur aus dem Hauptfenster** an. Aus einem iframe gehen sie verloren, deshalb gibt es
   `rahmen/capacitor-rahmen.js` (iframe nimmt `window.top.Capacitor`).

## So prüft ihr eure App (Rezeptbuch, Mixarium …)

1. Läuft die App **auch als Android-App (Capacitor/WebView)**? Nur dann betrifft es euch. Reine PWA in Chrome: kein Problem.
2. Wo wird diktiert? Im Code nach `SpeechRecognition`, `webkitSpeechRecognition`, `Diktat`, `Mikrofon` suchen.
3. Gibt es in der App einen Ersatz für die WebView? Gesucht ist ein natives Plugin (`ProSpeech`, `RecognizerIntent` oder ein
   Speech-Plugin von Capacitor) **und** ein Skript, das `window.SpeechRecognition` damit belegt, bevor der Diktat-Code läuft.
4. Gibt es Seiten in einem iframe (Rahmen) mit eigenem Mikrofon? Jede davon braucht dieselbe Übernahme vom Hauptfenster.
5. Probe: In einem Test die WebView nachstellen (kein `webkitSpeechRecognition`, gestelltes `Capacitor.Plugins.ProSpeech.listen`, das
   Text zurückgibt) und prüfen, dass ein Tipp aufs Mikrofon den Text ins Feld schreibt. Gegenprobe ohne den Klebstoff muss rot sein.
   Vorbild: `tools/native/test-native.mjs` der Privaten Akte (Abschnitt „Diktat (Fold 7, 24.11.)“).
6. Am Gerät braucht es die **Google-App mit Mikrofon-Recht** (sie stellt das Sprachfenster). Fehlt sie, meldet die App
   „Kein Mikrofon verfügbar“ – das ist dann kein Fehler der App.

## Kurz

Nicht das Mikrofon-Recht fehlte, sondern die Spracherkennung in der WebView. Lösung: Androids Sprachfenster über ein natives Plugin,
per Skript an die Stelle von `webkitSpeechRecognition` gesetzt, nur in der App, auch in jedem iframe.
