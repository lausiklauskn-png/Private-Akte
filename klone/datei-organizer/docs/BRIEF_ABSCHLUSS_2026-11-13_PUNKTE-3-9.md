# Abschlussbrief 13.11.2026 – Punkte 3 bis 9, Kern in die Gruppe, Ausgaben

Auftrag Klaus 13.11.: Punkte 3–9 des Briefs `docs/BRIEF_SITZUNG_2026-11-13_PUNKTE-3-9.md` schrittweise abarbeiten, mit **Freibrief**
(selbst entscheiden, selbst veröffentlichen); am Ende sollen die Apps der Gruppe fertig und veröffentlicht sein.

## Ergebnis zuerst

| Punkt | Ergebnis (fremde Stapel, je einmal gemessen) | Entscheidung |
| --- | --- | --- |
| 2 | Vermieterin 2026 mit drei Einordnern ausgewertet (Codex 010 quittiert) | erledigt |
| 3 Fristen | Kern 130 → 132 von 150, falsch und sicher 6 → 3 – nicht gesichert | Kern bleibt (kein Schaden), **nicht nachgewiesen** |
| 4 Absender/Titel Familienakte | 45 % → 97 % (p < 0,001); Bereich 77 → 83 % (p = 0,06, nur Richtung) | **Familienakte 2.28.67** |
| 5 Art | 128 → 124 von 149 – eher schlechter | **nicht nachgewiesen**; die Familienakte nutzt die Art nicht |
| 6 BookLedgerPro | Aussteller (Nachweis Vermieterin 44 → 84 %); Auszug-Text 89 % (Grenze 90); Rechnungsnummer mit drei Einordnern 2 % falsch (Grenze 5; vorläufig 5,6 %); Konto n. s. | **0.1.16**: Aussteller an; **0.1.17**: Rechnungsnummer an; Auszug hinter Schalter, Kontoregeln nicht |
| 7 Merken nach Sache | Folgejahr Vermieterin: 75 → 83 von 94, nur 1 schlechter (p = 0,02; nach Absender 75 → 81, 5 schlechter) | eingebaut (Datei-Organizer 0.3.0) |
| 8 Calculate/Needs | Calculate erster Blindtest (60 Anfragen): Kundennr. 100 %, Maße/Farben 92 %, Produkt 89 %, Menge 44 %, Absendername 23 %; Needs liest nichts | Regeln + Messung stehen |
| 9 Stichprobe | Werkzeug im Datei-Organizer (Seite „Verlauf“): nur Zahlen je Feld mit Spanne | gebaut; Klaus ordnet 30–50 eigene Stücke ein |

Alle Zahlen mit drei Einordnern (Codex hat 011 und 012 am 13.11. abgegeben, quittiert). Dadurch: Bereich der Familienakte nicht mehr gesichert (Richtung bleibt), Rechnungsnummer jetzt unter der Grenze.

## Ausgaben

Alle Downloads anonym geladen, SHA-256 gleich der Prüfsumme am Release. Nichts davon am Gerät geprüft.

| App | Fassung | Android | Windows | Web |
| --- | --- | --- | --- | --- |
| Datei-Organizer | 0.3.1 → 0.3.3 (Ladebalken, Aktualisieren, Update-Fähnchen, Leeren, Entfernen, Drag and Drop, grüne Liste) | – | – | Pages auf `8fbc424` |
| Familienakte | 2.28.67 (Absender aus dem Kern) | `3db7e2db…f26d0` | `5b4070f1…81b9d` | Pages; Nachweis `docs/VEROEFFENTLICHUNG-2.28.67.json` dort |
| BookLedgerPro | 0.1.16 (Aussteller), 0.1.17 (Rechnungsnummer an), 0.1.18 (Update-Fähnchen) | 0.1.18 `77641dd9…3d013c` | eigener Server | Basic 0.1.18 (#52) |
| Private Brain Pro | 1.0.49 (Update-Fähnchen) | `f4a11906…400dbb` | `29d4ba7a…b4ee1` | Pages |
| Workflow PDF | 1.1.10 (Update-Fähnchen) | – | – | Pages (#144) |
| Workflow PDF Pro | 1.0.17 (Update-Fähnchen) | `f2755593…ed0118b` | `ef535738…b48833` | – |

Nachweise: BookLedgerPro `docs/PULS.md` (#473), Private Brain Pro `docs/VEROEFFENTLICHUNG-1.0.49.md` (#137), Familienakte #177, Workflow PDF Pro `docs/VEROEFFENTLICHUNG-1.0.17.json` (#73). Zwei Release-Proben brauchten einen zweiten Anlauf (BookLedgerPro: Emulator am Deckblatt; Workflow PDF Pro: Gerät pixel_c in der Zeitgrenze), Code jeweils unverändert.

## Stundennachweis

Erste Spur 13:52 UTC (Klon Datei-Organizer), letzte Spur 18:16 UTC (Nachweis Workflow PDF Pro 1.0.17) – Obergrenze **4 h 24 min** über alle Repos (Zeitraum gemessen,
Anwesenheit Klaus' Auskunft, Pausen nicht abgezogen). Forschungseintrag KimHub #460.

## Startauftrag zum Einfügen

```
Repo Datei-Organizer: docs/BRIEF_SITZUNG_2026-11-14_NEEDS-RUECKWAERTSTEST.md zuerst lesen und dem Startauftrag dort folgen
(Rückwärtstest der Bedarfsanalyse an Familienakte, BookLedgerPro, Workflow PDF Pro, Private Brain Pro; nichts an den Apps ändern).
Danach offen: Familienakte-Übernahme aus dem Datei-Organizer (Vorschau zuerst), Umbeschriften/Verschieben im Organizer,
Gerätetest aller Ausgaben vom 13.11. Nächste freie Fassungen: Familienakte 2.28.68, BookLedgerPro 0.1.19, Private Brain Pro 1.0.50,
Workflow PDF Pro 1.0.18, Workflow PDF 1.1.11, Datei-Organizer 0.3.4.
```

## Offen

- Art (Punkt 5) und Fristen (Punkt 3) neu angehen: das Wortmodell aus verbrauchten Stapeln verallgemeinert nicht; nächster Versuch mit
  Lehrdaten eines anderen Schreibers (Runde D).
- BookLedgerPro: Gegenpartei bei Barabhebung/Entgelt im Auszug-Leser, Kassenbon-Belegnummern; Konto für Mieterlöse fehlt in der Liste.
- Calculate: Absender aus Signatur/Grußzeile (Kern), Zahlwörter – neuer Stapel.
- Private Brain Pro: Kern-Art nicht gesichert besser (31 → 36 von 40, andere fälschlich 19 → 20) – nicht eingebaut.
- Gerätetest aller Ausgaben.
