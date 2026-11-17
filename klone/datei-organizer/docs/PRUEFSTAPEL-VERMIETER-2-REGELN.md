# Prüfstapel „Vermieter 2“ (Punkt 6, BookLedgerPro) – Regeln, vorab festgelegt (13.11.2026)

Eingecheckt, bevor es den Stapel gibt. Es gelten `docs/PRUEFREGELN-GRUPPE.md` und `docs/PRUEFSTAPEL-BLP-REGELN.md`. Auftrag Klaus 13.11.
(Brief `docs/BRIEF_SITZUNG_2026-11-13_PUNKTE-3-9.md`, Punkt 6, Freibrief).

## Fragen (je ein Teil, je ein PR in BookLedgerPro)

- **(a) Konto bei Privatvermietung:** Trifft BookLedgerPro das Konto der Belege einer privaten Vermietung gesichert öfter als `d08c071`?
- **(b) Kontoauszug als Text/PDF → Umsätze:** Neuer Leser „Text eines Auszugs → Umsätze“ (Tag, Betrag, Gegenpartei, Zweck,
  Rechnungsnummer) mit Saldo-Gegenrechnung; unsichere Zeilen sichtbar, nichts still buchen. Bisher liest das keine App
  („liest die App nicht“). Gemessen: Anteil vollständig richtig gelesener Umsätze (Tag, Betrag mit Vorzeichen, Gegenpartei), je Auszug
  ob die Saldoprüfung stimmt, und wie viele falsche Umsätze **ohne** Warnung durchgehen.
- **(c) Rechnungsnummer im Belegleser:** bisher nicht gelesen; gemessen Anteil richtig, falsch, leer.
- **(d) Aussteller aus dem Kern:** BookLedgerPro alt gegen BookLedgerPro mit Aussteller aus dem Kern (übersetzte, gepinnte Ausgabe).

## Eingefroren

- **Alt:** BookLedgerPro `d08c071` (0.1.15), Kern `534cc08`.
- **Neu:** Stand nach dem Lernen; Commit-Kennungen werden hier eingetragen, bevor der Stapel gelesen oder gemessen wird.
- Lernen nur an verbrauchten Stapeln: `pruefstapel-blp` bis `-blp-4`, `pruefstapel-vermieterin` (2025, 2026) samt Kontoauszügen.
- Abweichung wie bei `PRUEFSTAPEL-FAMILIE-K3-REGELN.md`: der Stapel entsteht parallel, liegt bis zum Einfrieren ungelesen außerhalb
  des Repos.

## Stapel `pruefstapel-vermieter-2/`

- Ein Agent ohne Zugang zu Apps, Lehrdaten und früheren Stapeln; er kennt Kontenliste (SKR03-Auszug), Fachregel und diesen Auftrag.
- Ein anderer privater Vermieter: Ehepaar, beide berufstätig, vermietet ein Zweifamilienhaus im Nachbarort (zwei Wohnungen) und zwei
  Garagen, keine Umsatzsteuer; eigene Wohnung selbst genutzt. Jahr 2026. Andere Bank (anderer Auszugsaufbau als bisher bekannt
  ist erlaubt und erwünscht), andere Handwerker, Stadtwerke, Versicherer.
- **50 Belege** (Text) mit Soll: Konto, Richtung, Betrag, Datum, Steuersatz, Aussteller, Rechnungsnummer.
- **12 Kontoauszüge** (Text im Aufbau eines Auszugs) mit Soll je Umsatz: Tag, Betrag mit Vorzeichen, Gegenpartei, Art,
  Rechnungsnummern, zugehöriger Beleg; Anfangs- und Endsaldo je Auszug stimmen.
- **Gescannt:** Belege und Auszüge gesetzt und durch die Texterkennung des Workflow-PDF-Klons (wie beim Lauf „Vermieterin“).

## Einordner

Stapel-Autor, zweiter Claude-Agent, Codex (Auftrag 012). Soll = Mehrheit je Feld. Für (b) ist der Auszugstext selbst die Wahrheit
für Tag, Betrag und Gegenpartei (vom Autor gesetzt, Saldo geprüft); dort braucht es keine Mehrheit.

## Gemessen wird, je einmal (Text und gescannt)

Alt gegen neu je Teil, Wilson-Spanne, McNemar (5 %). Für (b) und (c) gibt es kein „alt“ (die App liest es nicht); berichtet wird der
Stand mit Spanne und die Zahl der falschen Werte ohne Warnung.

## Fertig, wenn

(a), (d): gesichert besser, sonst nicht ausgeben. (b): mindestens 90 % der Umsätze im Text vollständig richtig und keine falschen
Umsätze ohne Warnung in Auszügen, deren Saldo stimmt; sonst bleibt der Leser hinter einem Schalter. (c): mehr richtig als falsch und
höchstens 5 % falsch, sonst bleibt das Feld leer. BookLedger Basic wird über `tools/pro-nachziehen.mjs` nachgezogen und mitgemessen.

## Grenzen

Ein erfundener Haushalt, von einem KI-Agenten geschrieben; gesetzte Seiten sind keine echten Scans; nichts am Gerät.

## Eingefroren (13.11.2026, bevor der Stapel gelesen oder gemessen wird)

BookLedgerPro neu = Commit `136c2f5` (Zweig `claude/aussteller-aus-kern`): (a) Kontoregeln für Hausdienste, Rohr- und Notdienst,
Schornsteinfeger, Fenster, Rauchmelder, Grundeigentümerverein, Wärmemessdienst; (b) `src/domain/auszugText.js` mit Saldo-Gegenrechnung,
eingehängt in `parseBankauszug`; (c) Rechnungsnummer in `extractFromText`; (d) Aussteller aus dem Sortier-Kern (`src/vendor/sortierkern/`,
Pin @ Datei-Organizer `4fa3f9d`). Gelernt nur an den verbrauchten Vermieterin-Stapeln. Abstimmwerte (kein Nachweis): Konto Regeln
an Vermieterin 49 → 62 von 90 (Mehrheit), übrige Belegstapel 327 → 329 von 480; Auszug Text 463/463 richtig, gescannt 451/463,
falsch ohne Warnung 0; Rechnungsnummer 58 richtig, 5 falsch von 60; Aussteller 44 % → 84–96 %.

## Ergebnis (13.11.2026, einmal gemessen; vorläufig zwei Einordner – Codex Auftrag 012 steht aus)

BookLedgerPro `d08c071` gegen `136c2f5`, Soll = Mehrheit aus Stapel-Autor und Claude-Agent (Konto: 12 von 50 ohne Mehrheit, Kappa 0,73).
Zahlen: `ergebnisse/vermieter-2-*.json`.

| Teil | Ergebnis | Grenze | Entscheidung |
| --- | --- | --- | --- |
| (a) Konto (Mehrheit) | 21/50 → 23/50 (Text und gescannt), McNemar p = 0,5 | gesichert besser | **nicht ausgegeben** (Zweig `claude/kontoregeln-vermietung`) |
| (b) Auszug Text | Salden 12/12, 207/232 = 89,2 % vollständig richtig; Tag und Betrag überall richtig, 25-mal Gegenpartei = Buchungswort („Geldautomat“, „Entgelt“), ohne Warnung | ≥ 90 %, keine Fehler ohne Warnung | **hinter Vorschau-Schalter** (ab Werk aus) |
| (b) Auszug gescannt | Salden 6/12 stimmig, 202/232 = 87,1 %, 12 falsch ohne Warnung, 124 als unsicher markiert (106 davon richtig) | dto. | dto. |
| (c) Rechnungsnummer | 33 richtig, 2 falsch, 3 leer von 36 (5,6 % falsch); Text = gescannt | ≤ 5 % falsch | **hinter Vorschau-Schalter** |
| (d) Aussteller | alt 45/50 = 90 %, neu 45/50 = 90 % (dieser Aussteller steht in der ersten Zeile) | gesichert besser | **ausgegeben** – Nachweis aus Lauf „Vermieterin“ (44 → 84 %, p < 0,001), hier kein Schaden |

Schwächen: Gegenpartei bei Barabhebung und Entgelt; Texterkennung verliest Beträge („790,00“ statt „700,00“); Kontoregeln bei
Privatvermietung bleiben bei rund 45 % – das SKR03-Konto für Mieterlöse fehlt in der Liste (Autor 8120, Claude-Agent 8400).

## Nachgerechnet mit drei Einordnern (13.11.2026, Codex Auftrag 012)

BookLedgerPro `d08c071` gegen `136c2f5`, Soll = Mehrheit aus drei Einordnern (Konto: Kappa 0,76, 2 von 50 strittig).

| Teil | Ergebnis | Entscheidung |
| --- | --- | --- |
| (a) Konto | 22/48 → 24/48, nicht gesichert | unverändert nicht ausgegeben |
| (b) Auszug | Wahrheit ist der Auszugstext – unverändert 89,2 % | unverändert hinter dem Schalter |
| (c) Rechnungsnummer | **34 richtig, 1 falsch, 8 leer von 50 (2 % falsch)**; gescannt gleich | **Grenze erfüllt → ab Werk an (BookLedgerPro 0.1.17)** |
| (d) Aussteller | 46/50 alt = neu | unverändert ausgegeben |

Die vorläufige Zahl (5,6 % falsch) lag knapp über der Grenze, weil zwei Einordner bei zwei Nummern uneins mit dem Autor waren; Codex
stimmte dort mit dem Claude-Agenten. Das ist die Wirkung, für die die Mehrheit vorab festgelegt wurde – keine nachträgliche Wahl.
