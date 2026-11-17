# Abschlussbrief – Private Akte, Vorschau 0.1.4 (17.11.2026)

Grundlage: `BRIEF_SITZUNG_2026-11-17_PRIVATE-AKTE.md` im Repo FP-Idee-Center (Version 3 „Private Act“).

## Gebaut

- Version 3 als App in dieses Repo übernommen und umgebaut: `index.html`, `app.css`, `app.js`; Baumbild und Film
  liegen jetzt als Dateien unter `bilder/` statt in der Seite.
- Auftrag 1–9 des Briefs: Familienbüro als Stadt mit vier Kacheln (PDF-Kachel „Workflow PDF“, eigener Knopf in der
  Leiste des Programms), Portemonnaie mit „wofür“ und „An BookLedgerPro geben“ (speichert den Monat als CSV-Datei),
  Weg nach außen im Baum, Werkzeugleiste, Logos (Basic für Kopf, Icon, Favicon, Hintergrund; Pro in der Hilfe gezeigt),
  Kalender, Notizen von Hand, „Bearbeiten mit“, Wasserfarben und Knöpfe nach dem Familienbüro, Farbpalette je Programm.
- Rechtstexte: `rechtliches.html` (unverändert aus dem Ideen-Center), `LICENSE`, verlinkt im Fuß und in der Hilfe,
  im Offline-Vorrat.
- Manifest, Icons, Service Worker (Film kommt offline in Ausschnitten aus dem Vorrat).

## Klaus' Entscheidungen (17.11.)

- E-Mail (Private Brain) bleibt als Stadt.
- Pseudonymisieren kommt hinein: Eintrag in „Bearbeiten mit“, dazu „An KI“ an jeder Mail.
- Leiste am Handy: die fünf Wege zum Hereinbringen zum Wischen, der Rest hinter „⋯“.
- Lizenz: Alle Rechte vorbehalten.

## Nachtrag 0.1.1 (Klaus 17.11., nach dem Ansehen von 0.1.0)

- **Klaus: die App ist ihm zu kompliziert, er hat den Überblick verloren.** Das ist der Maßstab für alles Weitere:
  weniger Knöpfe, kürzere Wege, nichts doppelt. Vor neuen Funktionen erst vereinfachen.
- **Sammelknopf „Ablegen“ ist entfernt** (Klaus überließ die Wahl; die Leiste oben bringt alles herein). Damit gibt es
  auch keinen Schalter „Zum Entscheiden“ mehr. „Foto: Unterlage“ und „Eine Datei“ gab es nur dort; dafür jetzt
  „PDF scannen“ und „Dateien hineingeben“.
- **Kalender bleibt Knopf in der Leiste und Stadt am Baum** (Klaus: häufig Genutztes darf einen kurzen Weg haben).
- **Knopf „Landkarte“ ist entfernt.** Der Baum bleibt in der Navigation – als **Bild mit Schildern**, so wie jetzt.
  **Klaus will keinen 3D-Baum.**
- **Landkarte später vielleicht wieder** (Klaus): dann als eigene Ansicht, die die Baumstruktur der App zeigt
  (welche Stadt, welche Teile, welche Wege) – nicht als zweiter Weg zum selben Bild. Erst als Vorschau zeigen.
- Fassung 0.1.1; Probe `tests/probe.cjs` 66 Prüfungen, keine Fehler (390 px und 1280 px).

## Nachtrag 0.1.2 (Klaus 17.11.)

- Klaus hat die drei Punkte noch einmal ausdrücklich beantwortet (Ablegen geht in der Leiste auf, Kalender beides,
  nur „Baum“) – deckt sich mit 0.1.1, dort nichts geändert.
- **Klaus: der Baum soll zusätzlich erklären, wo die Speicher sind, wie die App aufgebaut ist und wie die Teile
  zusammenwirken – wie „Wo liegt was?“; man soll sehen, dass es nur einen Tresor gibt, in den alles hineinkommt.**
- Gebaut im Baum unter den Erklärkarten (`woLiegtWas()` in `app.js`, Stil am Ende von `app.css`): 1 Herein →
  2 Der Tresor (der einzige Speicher: Unterlagen, Eingang, Termine, Portemonnaie, E-Mails, Register; mit den Zahlen
  der Beispiele, jede Zeile springt hin) ⇄ 3 Die Städte (kein eigener Speicher, Kopie holen, neue Fassung zurück);
  darunter Sicherung (zweiter Ort) und Nach außen (nur BookLedgerPro). Sprung „Wo liegt was? ↓“ unter der
  Überschrift, ein Satz in der Hilfe. Kein neuer Knopf, keine eigene Ansicht.
- Das ist die im Nachtrag 0.1.1 genannte spätere „Landkarte“ in kleiner Form; ohne Vorschau vorab gebaut, weil die
  ganze App Vorschau ist. Wortlaut und Aufbau hat Klaus noch nicht gesehen. Der Baum ist dadurch länger geworden –
  gegen „zu kompliziert“ abwägen.
- Fassung 0.1.2; Probe `tests/probe.cjs` 76 Prüfungen, keine Fehler (390 px und 1280 px), Bilder des Abschnitts in
  beiden Breiten angesehen. Offline-Vorrat mit 0.1.2 nicht erneut von Hand geprüft. Der Tresor ist nur gezeigt,
  gespeichert wird weiter nichts (Datenschutzerklärung unverändert).

## Nachtrag 0.1.3 (Klaus 17.11., nach dem Ansehen von 0.1.2)

- **„Wo liegt was?“ ist in Ordnung so** (Klaus).
- **Erklärkarten unter dem Baumbild entfernt** (Halle, Städte, Helfer, gestrichelter Weg, neuer Ast) – Klaus: überflüssig,
  das Bild erklärt alles. Auch der Text „Die Helfer tragen die Dateien in die Akte.“ über dem Film ist weg; der Film
  bleibt („als Fantasie da lassen“, ob Agenten oder Menschen ist nicht wichtig).
- **Leiste oben: nur runde farbige Knöpfe ohne Beschriftung**, dazu **echte Tooltips** (eigene Blase `#tipp`, nach 0,4 s
  mit Maus oder Stift ohne Klick, auch bei Tastatur-Fokus; Name und eine Zeile wozu). Dieselben Tooltips an Drucken,
  Farbpalette, Sicherung, Hilfe. Am Handy passen die fünf Knöpfe ohne Wischen in eine Zeile.
- **Tooltips abschaltbar:** Haken „Tooltips an den Knöpfen anzeigen“ im Fenster hinter „?“ (gilt bis zum Neuladen,
  die Vorschau speichert nichts). Klaus denkt an Einstellungen unter „Baum“ – dann zieht der Haken dorthin.
- Grenze: mit dem Finger gibt es keinen Tooltip (kein Darüberfahren); am Handy sagen nur Bild und Farbe, was der
  Knopf tut. Nicht am Gerät geprüft.
- Tresor: wird in der Vorschau nirgends eingerichtet, nur gezeigt (Schild-Knopf „Sicherung“: „eingerichtet (Beispiel)“).
  Wo er später eingerichtet wird (Einstellungen), ist offen.
- Fassung 0.1.3; Probe `tests/probe.cjs` 90 Prüfungen, keine Fehler (390 px und 1280 px).

## Nachtrag 0.1.4 (Klaus 17.11.)

- „Wo liegt was?“: „Herein“ heißt jetzt **„Hinzufügen“**, „Die Städte“ heißt dort **„Werkzeugstätte“**. Tresor, Sicherung
  und „Nach außen“ bleiben (Klaus: in Ordnung). Sonst heißen die Programme in der App weiter „Städte“ – ob überall
  umbenannt wird, ist offen.
- Klaus: die Vorschau ist damit geklärt; als Nächstes nur noch **Gedanken über den Bau** (was echt wird, in welcher
  Reihenfolge).
- Fassung 0.1.4; Probe `tests/probe.cjs` 92 Prüfungen, keine Fehler.

## Vorgabe für den Bau (Klaus 17.11.)

- **Dieselbe Mechanik wie die Familienakte**, damit später ein Abgleich möglich ist: Jens kann seine Familienakte
  weiter ausbauen, die Private Akte am Handy nutzen und beides später abgleichen. Für den Bau heißt das: Tresor,
  Register und Sicherungs-/Paketformat der Familienakte übernehmen, kein eigenes Format erfinden.
- Vorschlag Reihenfolge (von Klaus noch nicht bestätigt): 1 Tresor · 2 Hinzufügen, Eingang, Unterlagen · 3 Werkzeuge
  einzeln als unveränderte Kopien (Workflow PDF, Datei-Organizer, Kalender, Portemonnaie, E-Mail zuletzt) ·
  4 Sicherung und Nach außen. Vor Schritt 1 die Datenschutzerklärung ergänzen. PR #1 (Gerüst, Klon-Werkzeug)
  damit abgleichen – in dieser Sitzung nicht gelesen.
- Offen: zuerst Web-App oder gleich Android; welchen Stand Jens' Familienakte hat (nicht nachgesehen).

## Letzte Entscheidungen dieser Sitzung (Klaus 17.11., abends)

- **Die Programme heißen „Tools“** (nicht Städte, nicht Module; „Tools kennt jeder“). „Werkzeugstätte“ ist nur die
  Erklärung in Verbindung mit dem Baumbild. **Noch nicht umbenannt:** in der App steht überall noch „Stadt/Städte“
  (Unterzeile des Baums, Fenstertitel „Stadt in der Privaten Akte“, Eingang „Aus den Städten“, Hilfe, README);
  im Kasten 3 von „Wo liegt was?“ steht „Werkzeugstätte“. Das ist die erste Aufgabe der nächsten Sitzung.
- **Datenschutzerklärung zum Schluss** (Klaus) – nicht vor Schritt 1 wie oben vorgeschlagen, aber vor der ersten
  Ausgabe, die wirklich speichert.
- Abgleich mit der Vorgängersitzung (Zweig `ccr-1fe14ee1-n9882z`, PR #2): dort liegt nichts, was hier fehlt; ihr
  Stand 0.1.1 ist in diesem Zweig (`ccr-500c05b9-21sx0s`, PR #3) vollständig enthalten. Klaus: was er dort besprochen
  hat, ist dasselbe wie hier. **Weiterarbeiten auf dem Stand von PR #3**, nicht auf PR #2.
- Klaus macht in der anderen Sitzung weiter.

## Noch zu entscheiden

- Einstellungen: wo (unter „Baum“?), und was hinein kommt (Tooltips, Tresor einrichten).
- Handy: reichen die Knöpfe ohne Wort, oder soll ein Tipp kurz den Namen zeigen?


- Was genau war zu kompliziert? Klaus danach fragen (am Handy zeigen lassen) und daraus streichen.
- Erinnerung im Kalender (Glocke oder Gerätekalender), Helfer auf dem Gerät oder über Server, Größe des
  Familienbüros (nachladen), AGPL des Familienbüros, Markenprüfung des Namens, was nur Pro hat – wie im Brief.
- Ob Private Brain Pro schon einen Pseudonymisierer hat, wurde nicht nachgesehen (Repo war nicht in der Sitzung).

## Geprüft und nicht geprüft

- Test-Browser, 390 px und 1280 px: `tests/probe.cjs`, 66 Prüfungen, keine Fehler, kein Querrollen. Offline-Vorrat
  von Hand geprüft (Start, Baumbild, Film, Rechtstexte ohne Netz).
- Nicht am Gerät. Drucken nur bis zum Druckfenster des Browsers. GitHub Pages ist nicht eingeschaltet oder
  nicht nachgeprüft; die Adresse wurde nicht aufgerufen. Kein Anwalt hat die Texte geprüft.
- Farbwahl gilt nur bis zum Neuladen (die Vorschau speichert nichts; so steht es in der Datenschutzerklärung).

## Startauftrag

```
Lies im Repo Private-Akte zuerst BRIEF_ABSCHLUSS_2026-11-17_VORSCHAU-0.1.4.md und README.md auf dem Zweig
ccr-500c05b9-21sx0s (PR #3, Vorschau 0.1.4 – enthält PR #2 vollständig; hole diesen Stand in deinen Zweig).
Erste Aufgabe: die Programme heißen „Tools“ – überall in der App, in der Hilfe und im README „Stadt/Städte“
ersetzen; „Werkzeugstätte“ bleibt nur als Erklärung beim Baumbild. Fassung erhöhen (FASSUNG in app.js,
VERSION in sw.js, ?v= zweimal in index.html), mit tests/probe.cjs in Handy- und PC-Breite prüfen.
Danach mit mir den Bau besprechen: Reihenfolge aus dem Abschnitt „Vorgabe für den Bau“ (dieselbe Mechanik
wie die Familienakte, damit ein Abgleich möglich bleibt), Web-App oder gleich Android, Einstellungen
(Tooltips, Tresor einrichten). Datenschutzerklärung zum Schluss. Zusammenführen nur auf mein Wort.
```
