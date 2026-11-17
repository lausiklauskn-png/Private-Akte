# Abschlussbrief – Private Akte, Vorschau 0.1.0 (17.11.2026)

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

## Noch zu entscheiden

- Sammelknopf „Ablegen“: bleibt oder geht in der Leiste auf. In der Vorschau umschaltbar („⋯“ › „Zum Entscheiden“;
  am PC gibt es den Schalter nicht, dort ist der Knopf immer da).
- Kalender: hier als Stadt am neuen Ast **und** als Knopf gezeigt. Eines von beiden oder beides?
- „Landkarte“ öffnet den Baum; „Baum“ steht zusätzlich in der Navigation. Doppelt lassen?
- Erinnerung im Kalender (Glocke oder Gerätekalender), Helfer auf dem Gerät oder über Server, Größe des
  Familienbüros (nachladen), AGPL des Familienbüros, Markenprüfung des Namens, was nur Pro hat – wie im Brief.
- Ob Private Brain Pro schon einen Pseudonymisierer hat, wurde nicht nachgesehen (Repo war nicht in der Sitzung).

## Geprüft und nicht geprüft

- Test-Browser, 390 px und 1280 px: `tests/probe.cjs`, 63 Prüfungen, keine Fehler, kein Querrollen. Offline-Vorrat
  von Hand geprüft (Start, Baumbild, Film, Rechtstexte ohne Netz).
- Nicht am Gerät. Drucken nur bis zum Druckfenster des Browsers. GitHub Pages ist nicht eingeschaltet oder
  nicht nachgeprüft; die Adresse wurde nicht aufgerufen. Kein Anwalt hat die Texte geprüft.
- Farbwahl gilt nur bis zum Neuladen (die Vorschau speichert nichts; so steht es in der Datenschutzerklärung).

## Startauftrag

```
Lies im Repo Private-Akte zuerst BRIEF_ABSCHLUSS_2026-11-17_VORSCHAU-0.1.0.md und README.md.
Frage mich nach meiner Rückmeldung zur Vorschau 0.1.0 und zu den Punkten unter „Noch zu entscheiden“
(Sammelknopf „Ablegen“, Kalender als Stadt oder Knopf, Landkarte/Baum). Setze die Antworten um, erhöhe die
Fassung (FASSUNG in app.js, VERSION in sw.js, ?v= in index.html), prüfe mit tests/probe.cjs in Handy- und
PC-Breite und lege einen Entwurfs-PR an. Zusammenführen nur auf mein Wort.
```
