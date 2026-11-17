# Lauf „Vermieterin“ – Regeln, vorab festgelegt (13.11.2026)

Klaus 13.11.: ein Lauf mit einer Rentnerin (Witwenrente), die in ihrem Haus wohnt und dort drei Wohnungen an drei Familien vermietet –
Garten, Nebenkostenabrechnung, Versicherungen, Vorbereitung der Steuer; alles erfunden. Für die Sortierung im Datei-Organizer, für
BookLedgerPro und die Familienakte. Texterkennung über den Kern von Workflow PDF (wie in der Familienakte eingebaut). Dazu
Kontoauszüge: Umsätze lesen, Überweisungen erkennen und Rechnungen samt Rechnungsnummer zuordnen. Danach weitere Stapel mit anderen
Lebensläufen derselben Frau (drei Kinder, Ehemann verstorben usw.).

Eingecheckt, bevor es den Stapel gibt. Es gelten `docs/PRUEFREGELN-GRUPPE.md` und `docs/FACHREGEL.md`. Der Lauf ist zugleich Runde E
(andere Form) der Prüfreihe.

## Eingefroren

Datei-Organizer `534cc08` (Fassung 0.2.0) · BookLedgerPro `d08c071` (0.1.15) · Familienakte `f00c91a`. Bis zur Messung wird an
Erkennung, Zuordnung und Modellen nichts geändert. Es ist eine Standmessung unter neuen Bedingungen, kein Alt-gegen-Neu-Vergleich.

## Stapel `pruefstapel-vermieterin/`

Ein Agent ohne Zugang zu Apps, Lehrdaten und früheren Stapeln schreibt ein erfundenes Jahr (2025) dieses Haushalts; er kennt nur
Fachregel, Fächerliste, Arten, Kontenliste und den Auftrag. Ungelesen eingecheckt.

- **Schriftstücke** (rund 90, Text): Rente, Kassen, Versicherungen, Finanzamt, Grundsteuer, Müll/Wasser, Handwerker, Garten, Mieter
  (Mietverträge, Mieterhöhung, Nebenkostenabrechnungen, Mahnung, Kündigung), Steuerunterlagen. Soll je Stück wie bei den Briefen:
  Bereich, Zweitfach, Schriftstück, Absender, Person, Frist.
- **Belege** (rund 45, Text) der Vermietung und des Haushalts: Soll Konto (Liste aus `pruefstapel-blp-2-kontenliste.json`), Richtung,
  Betrag, Datum, Steuersatz, Aussteller, Rechnungsnummer, dazu „umlagefähig ja/nein“ und Wohnung (wird berichtet, nicht gewertet –
  das kann noch keine App).
- **Kontoauszüge** (12 Monate, Text im Aufbau eines Auszugs): Soll je Umsatz Datum, Betrag, Soll/Haben, Gegenpartei, Art
  (Überweisung, Lastschrift, Dauerauftrag, Gutschrift, Entgelt), Rechnungsnummer falls genannt, und das zugehörige Stück des Stapels.

## Einordner

Stapel-Autor, ein zweiter Claude-Agent, Codex über den Briefkasten (sobald Klaus das Zeichen gibt). Soll = Mehrheit je Feld; ohne
Mehrheit strittig und nicht gewertet. Für die Kontoauszüge prüfen die Einordner die Zuordnung Umsatz → Stück. Solange Codex fehlt,
heißt das Ergebnis „vorläufig, zwei Einordner“.

## Zwei Formen je Stück

1. **Text** wie geschrieben.
2. **Gescannt:** dieselben Stücke als PDF-Seiten gesetzt (wechselnde Schriften, leichte Schräglage, Rauschen, einige als Handyfoto),
   gelesen mit der Texterkennung aus dem Workflow-PDF-Klon der Familienakte (`public/apps/workflow-pdf/vendor/tesseract`, deutsche
   Sprachdaten). Das ist derselbe Erkennungskern, aber im Prüflauf, nicht in der App am Gerät – so steht es im Bericht. Braucht ein
   Stück eine andere Texterkennung, wird sie benannt und getrennt ausgewiesen.

## Gemessen wird, je einmal

- **Datei-Organizer:** fünf Felder an den Schriftstücken, Text und gescannt; dazu Zeichen- und Wortfehler der Texterkennung.
- **Familienakte:** dieselben Schriftstücke über `scripts/vergleich-familienakte.mjs` (Bereich, Absender), Text und gescannt.
- **BookLedgerPro:** Konto, Richtung, Betrag, Datum, Steuersatz an den Belegen, Text und gescannt; Rechnungsnummer, soweit die App
  eine liest (sonst „liest die App nicht“).
- **Kontoauszüge:** (a) Wie viele Umsätze stehen nach der Texterkennung vollständig da (Datum, Betrag, Gegenpartei, Rechnungsnummer)?
  (b) BookLedgerPro liest heute nur MT940/CAMT: dieselben Umsätze werden als MT940 gesetzt (Werkzeug im Repo), gemessen wird der
  Zahlungsabgleich Umsatz → Rechnung. (c) Auszug als PDF: Was keine App liest, heißt „liest die App nicht“, nicht 0 %.
- Jede Zahl mit 95-%-Spanne (Wilson); Text gegen gescannt mit McNemar. „Falsch und als sicher ausgegeben“ wird je Feld genannt.

## Danach

Der Stapel ist verbraucht; an ihm darf gelernt werden. Weitere Lebensläufe derselben Frau (verheiratet mit drei Kindern, Tod des
Mannes mit Nachlass und Witwenrente-Antrag, Kinder ausgezogen, Verkauf einer Wohnung, Pflegegrad) kommen als eigene Stapel nach
denselben Regeln und messen, ob das Gelernte trägt.

## Grenzen

Ein Haushalt, erfunden, von einem KI-Agenten geschrieben; gesetzte PDF-Seiten sind keine echten Scans; nichts am Gerät.

## Nachtrag 13.11.2026 (Klaus, noch bevor der Stapel vorliegt): Folgejahre desselben Haushalts

Klaus: denselben Haushalt noch einmal mit einem anderen Jahr und geänderten Werten durchlaufen lassen und prüfen, ob die Werte beim
zweiten Mal besser werden – 2024, 2025, 2026 und notfalls Jahre, die noch nicht gekommen sind.

- **Folgestapel** `pruefstapel-vermieterin-2026/` (danach weitere Jahre): dieselbe Vermieterin, dieselben Absender und Vertragspartner,
  aber neue Schriftstücke, Belege und Kontoauszüge mit geänderten Werten: Grundsteuer und Abgaben erhöht, Kosten allgemein rund 3 %
  höher, Tankquittungen und Zahnarzt teurer, Rentenanpassung; bei den Mieterfamilien ein weiteres Kind, höheres Kindergeld,
  Arbeitslosengeld bzw. wieder Arbeit gefunden, Gehaltserhöhung, daraus Mietrückstand ausgeglichen oder Mieterhöhung.
  Geschrieben von einem neuen Agenten, der nur die Stammdaten des Haushalts (Namen, Wohnungen, Vertragspartner) kennt, nicht die
  Lösungen und nicht die Apps.
- **Ablauf:** Jahr 2025 messen (verbraucht) → daran lernen (Regeln, Wortmodell, gemerkte Zuordnungen wie ein Nutzer, der die
  Vorschläge des ersten Jahres berichtigt hat) → einfrieren → Jahr 2026 schreiben lassen → einmal messen, **mit und ohne** das
  Gelernte. Der Unterschied am Jahr 2026 ist die Antwort auf „wird es beim zweiten Mal besser?“ (McNemar).
- Getrennt ausgewiesen wird, was allgemein gelernt ist (gilt für jeden Haushalt) und was nur dieser Haushalt gelernt hat
  (wiederkehrende Absender, Daueraufträge, Rechnungsnummern-Muster). Das Zweite ist kein Nachweis für fremde Haushalte.
- Das „Merken wie ein Nutzer“ gibt es in den Apps noch nicht als Bedienung; im Lauf wird es als Werkzeug im Repo nachgestellt und
  so benannt.

## Nachtrag 13.11.2026 (Klaus, vor der Messung): Fristen bis zur Glocke, alle Werkzeuge der Gruppe

Klaus: Termine und Fristen (Finanzamt usw.) müssen eingehalten werden – auch das wird getestet, mit Erinnerung und Glocke der
Familienakte; alle Werkzeuge, die über das Mycel/SBKIM verknüpft sind, sollen im Lauf vorkommen.

Der Lauf misst deshalb zusätzlich die **Kette**, nicht nur die einzelnen Erkenner. Je Glied eine eigene Zahl, damit sichtbar bleibt,
wo ein Stück verloren geht:

1. **Texterkennung** (Workflow-PDF-Kern): Stück lesbar? (Wort-/Zeichenfehler; Datum und Betrag der Frist unversehrt?)
2. **Sortierung** (Datei-Organizer): Bereich, Art, Absender, Person, Frist.
3. **Familienakte, Eingang:** Wie viele Stücke mit Soll-Frist stehen nach dem Ablegen als Frist/Aufgabe mit dem richtigen Datum in der
   Akte (`lib/central-intake.ts`)? Wie viele ohne Soll-Frist bekommen fälschlich eine?
4. **Kalender und Glocke** (`lib/kalender.ts`, `lib/glocke.ts`): Wird für jede richtige Frist eine Erinnerung vor dem Fälligkeitstag
   geplant? Gemessen an den Planungsdaten; ob das Gerät wirklich klingelt, misst nur ein Gerät („nicht gemessen“).
5. **BookLedgerPro:** Belege und Kontoauszüge wie oben; zusätzlich fällige Rechnungen (Zahlungsziel) gegen die Umsätze: bezahlt,
   offen, überfällig.
6. **Suche über die Knoten** (Gruppenregeln 11–14): Fragen in Alltagssprache zum Stapel („Wann ist die Grundsteuer fällig?“, „Was hat
   der Dachdecker gekostet?“), geschrieben von einem Agenten, der die Suche nicht kennt; gemessen intern je Knoten. Extern über das
   Netz und die Bedeutungssuche nur mit echtem Modell und echtem Relais – sonst „nicht gemessen“.

**Ende-zu-Ende-Zahl:** Anteil der Soll-Fristen, die vom gescannten Stück bis zur geplanten Erinnerung mit richtigem Datum durchkommen.
Daneben jede verpasste Frist einzeln mit dem Glied, an dem sie verloren ging. Was ein Werkzeug heute nicht kann, heißt „kann die App
nicht“; Private Brain Pro und Workflow PDF Pro (als App) sind in dieser Sitzung nicht geklont und werden so benannt, nicht geschätzt.

## Nachtrag 13.11.2026 (Klaus, vor der Messung): Private Brain Pro dabei, Zeit je Dokument

- **Private Brain Pro** (`182e746`) und **Workflow PDF Pro** (`d37701a`) sind dazugeholt (nur lesend). Die deutschen Sprachdaten der
  Texterkennung in Workflow PDF Pro sind byte-gleich mit denen im Klon der Familienakte. Private Brain Pro wird mit seinem
  Kategorie-/Zielordner-Vorschlag an denselben Schriftstücken gemessen (Text und gescannt), soweit sich der Vorschlag ohne Gerät
  aufrufen lässt; sonst „nicht gemessen“.
- **Zeit:** Je Glied der Kette wird die Zeit je Dokument gemessen und auf 1000 Dokumente hochgerechnet – als Orientierung, nicht als
  zugesicherter Wert. Gemessen wird auf dem Rechner der Sitzung (4 Kerne); ein Tablet oder Handy ist langsamer, der Faktor ist nicht
  gemessen. Erste Orientierung an 30 verbrauchten Briefen (eine Seite je Brief): Texterkennung rund 1,5 s je Seite, Sortieren im
  Datei-Organizer rund 5 ms je Brief.

## Ergebnis Jahr 2025 – vorläufig, zwei Einordner (13.11.2026, je einmal gemessen)

Soll = wo Stapel-Autor und zweiter Claude-Agent übereinstimmen; Codex (Auftrag 009) steht aus. Stapel: 93 Schriftstücke, 45 Belege,
12 Kontoauszüge mit 223 Umsätzen. Gescannt: 150 Stücke auf 162 Seiten, 39 als Handyfoto. Zahlen: `ergebnisse/vermieterin-*.json`,
erkannter Text: `pruefstapel-vermieterin-ocr/`.

**Abweichung vom Auftrag:** Die Kontoauszüge hat der Stapel-Autor per Skript aus einer von Hand geschriebenen Umsatzliste gesetzt
(einheitliches Druckbild). **Werkzeugfehler:** `messen-bank.mjs` brach beim ersten Aufruf an einem Umsatz ohne Gegenpartei ab
(Fehler im Prüfwerkzeug, vor jeder Ausgabe); berichtigt und einmal gemessen.

| Was | Text | gescannt |
| --- | --- | --- |
| Texterkennung, Wortfehler | – | Schriftstücke 4,6 % · Belege 7,8 % · Kontoauszüge 4,5 % (Zeichenfehler gesamt 2,6 %) |
| Datei-Organizer Bereich | 74/90 = 82 % (73–89) | 74/90 = 82 % |
| Datei-Organizer Schriftstück | 74/90 = 82 % | 76/90 = 84 % |
| Datei-Organizer Absender | 74/80 = 93 % | 71/80 = 89 % |
| Datei-Organizer Frist | 75/90 = 83 % (falsch und sicher 8) | 75/90 = 83 % (8) |
| Familienakte heute: Bereich · Absender | 13/90 = 14 % · 34/90 = 38 % | 13/90 = 14 % · 32/90 = 36 % |
| BookLedgerPro Betrag | 38/45 = 84 % | 37/45 = 82 % |
| BookLedgerPro Datum | 43/45 = 96 % | 41/45 = 91 % |
| BookLedgerPro Steuersatz | 38/41 = 93 % | 38/41 = 93 % |
| BookLedgerPro Richtung | 41/45 = 91 % | 41/45 = 91 % |
| BookLedgerPro Konto (Regeln + Wortmodell, mit Namen) | 27/45 = 60 %; wo beide Einordner einig 24/37 = 65 % | 27/45 · 24/37 |
| Kontoauszug: Umsatz vollständig lesbar (Tag, Betrag, Gegenpartei, Zweck) | 223/223 (Kontrolle des Prüfwerkzeugs) | 187/223 = 84 % (78–88); Tag und Betrag 215/223, Zweck 195/223, Rechnungsnummer 43/43 |

Kein Unterschied Text gegen gescannt ist gesichert (alle Felder innerhalb der Spannen).

**Person:** 47/47, aber ohne Aussagekraft – der Haushalt hat eine Person; die Einordner sind sich hier uneins, wann ein Mieter als
Person gilt (Kappa 0,35). **Einigkeit der zwei Einordner:** Bereich, Schriftstück, Frist je 90/93, Absender 80/93, Konto 37/45.

**Kontoauszüge in BookLedgerPro:** Einen Auszug als PDF oder Bild liest die App nicht (nur MT940/CAMT). Dieselben Umsätze als MT940
gesetzt: 223/223 gelesen, Saldo in 12/12 Auszügen stimmig. Zahlungsabgleich gegen die 45 Belege als offene Posten (22 Umsätze
strittig zwischen den Einordnern, nicht gewertet): Umsatz mit genau einem Beleg 49/49 richtig; eine Zahlung für zwei Rechnungen 1/1;
von 151 Umsätzen ohne Beleg bekamen 20 fälschlich einen (wiederkehrende Zahlungen gleichen Betrags – Abschlag, Hausmeister, Telefon,
Kontoentgelt – treffen den einen Beleg eines anderen Monats). Im Prüflauf bleiben alle Posten offen; in der App wäre ein ausgeglichener
Posten weg, die Zahl ist darum eine Obergrenze. Rechnungsnummer vom Beleg: liest BookLedgerPro nicht.

**Zeit (Rechner der Sitzung, 4 Kerne):** Texterkennung 313 s für 162 Seiten = rund 1,9 s je Seite → 1000 Seiten rund 32 Minuten.
Sortieren, Belegleser und Zahlungsabgleich zusammen unter 10 ms je Stück.

**Noch nicht gemessen:** Fristen bis Kalender und Glocke in der Familienakte, Private Brain Pro, Suche über die Knoten, dritter
Einordner, Ende-zu-Ende-Zahl.

### Nachtrag zum Ergebnis 2025: Fristenkette und Private Brain Pro (13.11.2026, je einmal gemessen, zwei Einordner)

**Fristen bis zur Glocke.** 39 Schriftstücke mit Soll-Frist, 51 ohne, 3 strittig. Text und gescannt ergeben dieselben Zahlen.
Zahlen: `ergebnisse/vermieterin-fristkette*.json` (dort jede verlorene Frist einzeln).

| Glied | Familienakte heute (`erkenneFristen`) | Kern des Datei-Organizers |
| --- | --- | --- |
| Frist mit richtigem Datum | 25/39 = 64 % (48–77) | 32/39 = 82 % (67–91) |
| falsches Datum | 1 | 3 |
| keine Frist erkannt | 13 | 4 |
| fälschlich eine Frist (von 51 ohne) | 5 | 8 |
| Erinnerung vor dem Fälligkeitstag geplant (`glockenZeiten`, Vorgabe 7 Tage und 1 Tag) | 25/39 = 64 % | nicht angeschlossen |

**Ende-zu-Ende heute:** 25 von 39 Fristen (64 %) kommen vom gescannten Stück bis zur geplanten Erinnerung durch; jede richtig
erkannte Frist bekommt ihre Erinnerung, verloren gehen sie alle beim Erkennen. Dabei gilt: Die Familienakte legt eine erkannte Frist
erst nach Bestätigung an – im Lauf gilt „bestätigt, wie vorgeschlagen“. Ob das Gerät läutet: nicht gemessen.

**Private Brain Pro** (`suggestCategory`, unverändert aus `index.html` gelesen) kennt Dokumentarten, keine Ablagefächer. Verglichen
nur mit der Art des Solls, für die drei gemeinsamen Arten: Rechnung, Vertrag, Angebot richtig 13/21; von 69 Stücken anderer Art
fälschlich als eine der drei 17. 56 von 93 Stücken fallen auf „Dokument“ (nur Dateityp). Text und gescannt gleich.
Bedeutungssuche und Einordnen dort: nicht gemessen (Modell in dieser Umgebung nicht ladbar).

## Ergebnis Jahr 2025 – mit drei Einordnern (13.11.2026)

Codex (GPT-6) hat Auftrag 009 geliefert (Form geprüft: 93 Schriftstücke, 45 Belege, 12 Auszüge mit 223 Umsätzen, alle Listenwerte
gültig; unverändert übernommen). Soll = Mehrheit aus Stapel-Autor, Claude-Agent und Codex. Die Apps wurden nicht neu gemessen, nur
gegen das neue Soll ausgewertet. Diese Tabelle ersetzt die vorläufigen Zahlen oben.

Einigkeit (Fleiss' Kappa): Bereich 0,92 · Schriftstück 0,96 · Absender 0,89 · Frist 0,92 · Person 0,22 (nicht tragfähig: ein
Ein-Personen-Haushalt, uneins, wann ein Mieter als Person gilt). Belege einstimmig: Betrag 45/45, Datum 45/45, Richtung 43/45,
Steuersatz 40/45, Konto 34/45. Kein Schriftstück, kein Beleg und kein Umsatz ohne Mehrheit (Person: 4).

| Was | Text | gescannt |
| --- | --- | --- |
| Datei-Organizer Bereich | 74/93 = 80 % (70–87), falsch und sicher 13 | 74/93 = 80 %, 13 |
| Datei-Organizer Schriftstück | 75/93 = 81 % (71–87), 7 | 77/93 = 83 %, 7 |
| Datei-Organizer Absender | 81/93 = 87 % (79–92), 8 | 78/93 = 84 %, 11 |
| Datei-Organizer Frist (alle Stücke) | 76/93 = 82 % (73–88), 9 | 76/93 = 82 %, 9 |
| Familienakte heute: Bereich · Absender | 13/93 = 14 % · 33/93 = 35 % | 13/93 = 14 % · 31/93 = 33 % |
| BookLedgerPro Betrag | 38/45 = 84 % | 37/45 = 82 % |
| BookLedgerPro Datum | 43/45 = 96 % | 41/45 = 91 % |
| BookLedgerPro Steuersatz | 40/40 = 100 % | 40/40 |
| BookLedgerPro Richtung | 41/45 = 91 % | 41/45 |
| BookLedgerPro Konto: Regeln · Regeln + Wortmodell (mit Namen) | 26/45 = 58 % · 28/45 = 62 % | 26/45 · 28/45 |
| Fristen: Familienakte richtig und Erinnerung geplant | 25/40 = 63 % (47–76); keine erkannt 14, falsches Datum 1, fälschlich 5/53 | gleich |
| Fristen: Kern des Datei-Organizers | 33/40 = 83 % (68–91); keine 4, falsches Datum 3, fälschlich 10/53 | gleich |
| Private Brain Pro: Rechnung/Vertrag/Angebot richtig · andere fälschlich so | 13/22 · 17/71 | gleich |
| Kontoauszug gescannt: Umsatz vollständig lesbar | – | 187/223 = 84 % (unverändert, hängt nicht am Soll) |
| BookLedgerPro Zahlungsabgleich (MT940): ein Beleg · zwei Belege · ohne Beleg fälschlich zugeordnet | 51/51 · 1/1 · 22/171 | – |

**Ende-zu-Ende heute:** 25 von 40 Fristen (63 %) vom gescannten Stück bis zur geplanten Erinnerung in der Familienakte.
Der Stapel ist damit verbraucht.

## Eingefroren für das Jahr 2026 (13.11.2026, bevor der Folgestapel existiert)

- Apps unverändert wie beim Jahr 2025 (Datei-Organizer-Kern, BookLedgerPro `d08c071`, Familienakte, Private Brain Pro). Allgemeines
  Lernen an den Erkennern findet vor 2026 **nicht** statt; gemessen wird allein, was das Merken dieses Haushalts bringt.
- **Gemerkt** aus dem Jahr 2025 (`scripts/merken.mjs lernen`, Datei `merken/vermieterin-2025.json`): 48 Absender → Bereich,
  26 Aussteller → Konto, 29 Gegenparteien, deren Zahlungen nie zu einem Beleg gehörten. Gemerkt wird nur, was im Jahr 2025 zu
  mindestens zwei Dritteln eindeutig war. Angewendet wird es über den erkannten Absender (gleich oder sehr ähnlich geschrieben);
  das Gemerkte geht dem Vorschlag der App vor.
- **Messung 2026** (`scripts/merken.mjs messen`, je einmal, Text und gescannt): Bereich der Schriftstücke, Konto der Belege,
  fälschliche Zuordnung von Umsätzen ohne Beleg – jeweils ohne und mit dem Gemerkten, Unterschied mit McNemar. Dazu alle Zahlen
  wie 2025 (Fristenkette, Betrag, Datum, Lesbarkeit der Auszüge) ohne Änderung, als Wiederholung.
- Kontrolle des Werkzeugs am Jahr 2025 selbst (kein Nachweis, das Gemerkte stammt von dort): Bereich 74 → 85 von 93,
  Konto 28 → 41 von 45, Umsätze ohne Beleg fälschlich zugeordnet 22 → 20 von 171.
- Der Stapel-Autor 2026 bekommt nur Stammdaten (Haushalt, Mieter, Namen der Absender und Vertragspartner, Konto, übliche Beträge
  2025), die Listen und die Fachregel – keine Lösungen, keine Apps, nicht das Gemerkte.

## Ergebnis Jahr 2026 – vorläufig, zwei Einordner (13.11.2026, je einmal gemessen)

Stapel: 94 Schriftstücke, 45 Belege, 12 Kontoauszüge mit 240 Umsätzen; 11 von 54 Absendern und 7 von 31 Ausstellern neu.
Abweichung vom Auftrag: 44 % der Schriftstücke mit Frist statt der Hälfte. Gescannt: 151 Stücke, Wortfehler 4,7 %; Texterkennung
259 s. Soll = wo Stapel-Autor und Claude-Agent übereinstimmen; Codex (Auftrag 010) steht aus. Zahlen: `ergebnisse/vermieterin-2026-*.json`.
Alle Aufrufe in `scripts/lauf-vermieterin.sh`.

| Was | Text | gescannt |
| --- | --- | --- |
| Datei-Organizer Bereich | 70/91 = 77 % | 69/91 = 76 % |
| Datei-Organizer Schriftstück | 63/92 = 68 % (falsch und sicher 21) | 63/92 = 68 % |
| Datei-Organizer Absender | 82/84 = 98 % | 66/84 = 79 % (falsch und sicher 12) |
| Datei-Organizer Frist | 78/93 = 84 % | 77/93 = 83 % |
| Fristen: Familienakte richtig und Erinnerung geplant | 26/41 = 63 % | 26/41 = 63 % |
| Fristen: Kern des Datei-Organizers | 33/41 = 80 % | 32/41 = 78 % |
| Private Brain Pro: Rechnung/Vertrag/Angebot · andere fälschlich so | 15/19 · 15/73 | gleich |
| Kontoauszug gescannt: Umsatz vollständig lesbar · Rechnungsnummer | – | 203/240 = 85 % · 49/52 |
| Zahlungsabgleich (73 Umsätze strittig): ein Beleg · ohne Beleg fälschlich | 23/33 · 18/133 | – |

**Mit dem aus 2025 Gemerkten (die Frage „wird es beim zweiten Mal besser?“):**

| Was | ohne | mit Gemerktem | besser / schlechter | gesichert? |
| --- | --- | --- | --- | --- |
| Bereich (Text) | 70/91 | 76/91 | 11 / 5 | nein (p = 0,21) |
| Bereich (gescannt) | 69/91 | 76/91 | 11 / 4 | nein (p = 0,12) |
| Konto der Belege | 25/36 | 26/36 | 3 / 2 | nein (p = 1,0) |
| Umsätze ohne Beleg fälschlich zugeordnet | 18/133 | 18/133 | – | kein Unterschied |

Vorläufiger Befund: Das einfache Merken „Absender → Bereich“ hilft in der Tendenz, ist aber nicht gesichert und verschlechtert
einzelne Stücke – derselbe Absender schreibt zu verschiedenen Sachen (Fachregel: die Sache entscheidet, nicht der Absender).
Beim Konto und bei den Kontoauszügen bringt es nichts Messbares. Endgültig erst mit dem dritten Einordner.

## Ergebnis Jahr 2026 – mit drei Einordnern (13.11.2026)

Codex (GPT-6) hat Auftrag 010 geliefert (Puls 11; Form geprüft: 94 Schriftstücke, 45 Belege, 12 Auszüge mit 240 Umsätzen, Salden
nachgerechnet; unverändert übernommen als `DRITTER.json`, `belege/DRITTER.json`, `bank/DRITTER-BANK.json`, Text und gescannt).
Soll = Mehrheit aus Stapel-Autor, Claude-Agent und Codex. Die Apps wurden nicht verändert, nur gegen das neue Soll ausgewertet
(`bash scripts/lauf-vermieterin.sh …`, Belege mit `scripts/mehrheit-blp.mjs` und `scripts/messen-blp.mjs`). Ersetzt die vorläufigen Zahlen oben.

Einigkeit (Fleiss' Kappa): Bereich 0,94 · Schriftstück 0,96 · Absender 0,91 · Frist 0,98 · Person 0,03 (nicht tragfähig: der
Stapel-Autor nennt keine Person, Claude-Agent nennt den Mieter, Codex die Vermieterin; 14 ohne Mehrheit). Ohne Mehrheit sonst nur ein Absender.

| Was | Text | gescannt |
| --- | --- | --- |
| Datei-Organizer Bereich | 73/94 = 78 % (68–85), falsch und sicher 11 | 72/94 = 77 %, 11 |
| Datei-Organizer Schriftstück | 64/94 = 68 % (58–77), 22 | 64/94 = 68 %, 22 |
| Datei-Organizer Absender | 91/93 = 98 % (92–99), 0 | 72/93 = 77 %, 15 |
| Datei-Organizer Frist (alle Stücke) | 78/94 = 83 % (74–89), 9 | 77/94 = 82 %, 9 |
| Fristen: Familienakte bis zur Erinnerung (Stand vor dem Einbau) | 27/42 = 64 % (49–77); keine 15, fälschlich 5/52 | gleich |
| Fristen: Kern des Datei-Organizers | 33/42 = 79 % (64–88); falsches Datum 5, keine 4, fälschlich 7/52 | 32/42 = 76 % |
| BookLedgerPro Konto (Mehrheit): Regeln · Regeln + Wortmodell mit Namen | 25/45 = 56 % · 26/45 = 58 % | gleich |
| BookLedgerPro Richtung (Mehrheit) | 42/45 = 93 % | 41/45 = 91 % |
| BookLedgerPro Betrag · Datum · Steuersatz (Soll Stapel-Autor) | 41/45 · 43/45 · 43/43 | gleich |
| Aussteller: BookLedgerPro · Kern (Soll Stapel-Autor) | 20/45 = 44 % · 43/45 = 96 % (p < 0,001) | 20/45 · 39/45 = 87 % |
| Private Brain Pro: Rechnung/Vertrag/Angebot richtig · andere fälschlich so | 15/19 · 16/75 | gleich |
| Kontoauszug gescannt: Umsatz vollständig lesbar · Rechnungsnummer | – | 203/240 = 85 % · 49/52 |
| Zahlungsabgleich (MT940, 19 strittig): ein Beleg · ohne Beleg fälschlich zugeordnet | 47/59 = 80 % · 18/161 | – |

**Mit dem aus 2025 Gemerkten:** Bereich 73 → 79 von 94 (Text; besser 11, schlechter 5, p = 0,21), gescannt 72 → 79 (11/4, p = 0,12);
Konto 26 → 29 von 45 (5/2, p = 0,45); Umsätze ohne Beleg fälschlich 18 → 18 von 161. **Antwort auf „wird es beim zweiten Mal
besser?“ mit drei Einordnern: in der Tendenz ja, gesichert nein.** Das Merken nach Absender verschlechtert einzelne Stücke
(Fachregel: die Sache entscheidet) – Anlass für Punkt 7 (Merken nach Sache). Der Stapel ist damit verbraucht.

## Einbau in die Familienakte (Klaus 13.11.2026: „wenn es sinnvoll ist, mach es“)

Frage: Soll der Kern jetzt schon in die Familienakte und die anderen Apps? Geprüft an sechs Stapeln, an denen der Kern eingefroren
gemessen wurde (Vermieterin 2025 und 2026, Blindtest 2, Runden A, B, H; zusammen 784 Schriftstücke mit Mehrheit, 288 mit Frist).
Die Familienakte war dabei unverändert; die Stücke wurden ihr als PDF-Namen mit gelesenem Text und Briefkopf gegeben, wie in der App.

**Berichtigung:** Die „14 %“ für die Familienakte weiter oben stammen aus einem Vergleich mit Textdateien (`.txt`); dort liest der
Eingang nur einen kurzen Hinweis. Als PDF liegt die Familienakte bei 55–57 % (Vermieterin) – die 14 % waren zu hart.

| Bereich richtig | Vermieterin 2025 | 2026 | Blindtest 2 | A | B | H |
| --- | --- | --- | --- | --- | --- | --- |
| Familienakte bisher | 51/93 | 52/91 | 73/150 | 60/150 | 57/150 | 69/150 |
| Kern nur, wenn der Dateiname nichts sagt | 71 | 59 | 102 | 95 | 92 | 96 |
| Kern immer, wenn Text da ist (eingebaut) | 74 | 70 | 130 | 121 | 114 | 115 |

Der Dateiname allein „sagt etwas“ bei 344 Stücken und liegt dabei 175-mal richtig (51 %). Darum ersetzt der Einbau für Stücke mit
gelesenem Text die Regel „Dateiname zuerst“ (31.10./01.11.); Klaus ist darauf ausdrücklich hingewiesen.

**Frist** (288 mit, 498 ohne): Familienakte bisher 147 richtig (51 %), fälschlich 30; Kern 247 (86 %), fälschlich 35; McNemar
p < 0,001 (nur Kern richtig 108, nur Familienakte 8). Beide hintereinander: 251 richtig, aber fälschlich 59 – darum der Kern allein.

**Eingebaut** (Familienakte PR #174, `7c97bb0`, nicht veröffentlicht): `lib/sortierkern/` byte-gleich @ `534cc08` mit Pin,
`lib/sortier-vorschlag.ts`; ab 200 Zeichen Text Bereich und Frist aus dem Kern. Kontrolle nach dem Einbau an denselben Stapeln: die
Familienakte liefert dieselben Zahlen wie der Kern (Bereich 75/70/130/121/114/115; Frist 247/288, fälschlich 35). Fristenkette
Vermieterin gescannt: 25/40 → 33/40 (2025), 26/41 → 32/41 (2026) bis zur geplanten Erinnerung.

**Nicht eingebaut:** Absender/Titel (Kern 87 % gegen 35 %, hängt am Titelvorschlag), Zweitfach, eigene Muster. BookLedgerPro: eigene
Belegleser gleich gut; nur der Aussteller wäre aus dem Kern besser (84 % gegen 44 %) – offen. Private Brain Pro: kennt keine Fächer –
erst Vorschau. Grenze: alles an erfundenen Stücken; ein frischer Stapel nach dem Einbau steht aus (nächster Lebenslauf).

**Nachtrag zum Einbau (13.11.2026, nach den Bedienproben der Familienakte):** Zwei Ergänzungen im Anschluss (nicht im Kern):
„Korrespondenz“ aus dem Kern überstimmt keinen Bereich, den Dateiname oder Stichwörter schon nennen; die Schutzklasse wird durch den
Kern nie herabgesetzt. An den sechs verbrauchten Stapeln ändert die erste Ergänzung die Summe um +1 von 784 (81/72/127/120/111/114
statt 74/70/130/121/114/115) – kein Nachweis, nur kein Schaden. Die Bedienprobe „Dateieingang“ der Familienakte erwartet jetzt nach
der Fachregel: Gerät mit Garantie → Technik, Nebenkostenabrechnung → Haus & Wohnung (vorher „Einkäufe“). Entscheidung zu den anderen
Apps: BookLedgerPro und Private Brain Pro bekommen den Kern jetzt nicht (Belegleser dort gleich gut; Aussteller wäre besser, verlangt
aber eine übersetzte Fassung des Kerns in einer App ohne Bauschritt; Private Brain kennt keine Fächer). Familienakte Basic ist
derselbe Bau wie Pro.

## Nachtrag 13.11.2026 (Punkt 7): Merken nach Sache

Gemerkt wird „Absender + Vorschlag des Kerns → Bereich“; „Absender → Bereich“ allein nur, wenn der Nutzer bei diesem Absender immer
dasselbe gewählt hat (`lib/lernen.ts`, Werkzeug `scripts/merken.mjs`, Feld `bereichNachSache`). Gemessen am Jahr 2026 mit dem aus 2025
Gemerkten und einem Kern, der 2026 **nicht** gelernt hat (Wortmodell ohne `pruefstapel-vermieterin-2026`), Soll = drei Einordner:

| | ohne | nach Absender | nach Sache |
| --- | --- | --- | --- |
| Bereich (Text) | 75/94 | 81/94 (11 besser, 5 schlechter, p = 0,21) | 83/94 (9 besser, 1 schlechter, p = 0,02) |
| Bereich (gescannt) | 75/94 | 82/94 (11/4, p = 0,12) | 83/94 (9/1, p = 0,02) |

Grenze: ein Haushalt, ein Folgejahr, das schon verbraucht war; die Regel ist nach der Fachregel („die Sache entscheidet“) gebaut, nicht an
diesem Stapel abgestimmt. Ein frischer Folgejahr-Stapel steht aus. Eingebaut im Datei-Organizer 0.3.0 (Seite „Verlauf“ zeigt die Regel).
