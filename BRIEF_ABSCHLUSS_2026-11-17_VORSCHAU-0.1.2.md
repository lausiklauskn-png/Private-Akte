# Abschlussbrief – Private Akte, Vorschau 0.1.2 (17.11.2026)

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

## Noch zu entscheiden

- „Wo liegt was?“: stimmt Bild und Wortlaut? Bleibt es unter dem Baum oder ist das zu lang?

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
Lies im Repo Private-Akte zuerst BRIEF_ABSCHLUSS_2026-11-17_VORSCHAU-0.1.2.md und README.md.
Ich fand die Vorschau zu kompliziert und habe den Überblick verloren. Frage mich zuerst, was mir am Handy
zu viel war, und schlage vor, was gestrichen oder zusammengelegt wird (erst als Vorschau zeigen).
Schon entschieden: kein Sammelknopf „Ablegen“, kein Knopf „Landkarte“, Kalender als Knopf und als Stadt,
der Baum bleibt das Bild mit den Schildern (kein 3D-Baum). Eine Landkarte kommt vielleicht später wieder,
dann als Ansicht der Baumstruktur der App. Neu in 0.1.2: „Wo liegt was?“ unter dem Baum (ein Tresor für alles) –
frage mich, ob Bild und Wortlaut stimmen.
Bei jeder Änderung die Fassung erhöhen (FASSUNG in app.js, VERSION in sw.js, ?v= in index.html), mit
tests/probe.cjs in Handy- und PC-Breite prüfen und einen Entwurfs-PR anlegen. Zusammenführen nur auf mein Wort.
```
