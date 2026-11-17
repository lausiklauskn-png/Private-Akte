# Prüfstapel „Vermieterin 2026“ (Folgejahr zu 2025)

Erfundener Stapel für den Blindtest: Haushalt Hannelore Wiebusch, Lindenhofweg 14, Sellenbrück – Rentnerin (Alters- und
Witwenrente), private Vermieterin mit drei Mietparteien (Brandtner, Petrović, Aydemir) und Stellplatzmieter. Alles erfunden;
IBANs beginnen mit DE00, Steuernummern mit 000/, Orte und Firmen gibt es nicht. Gelesen wurden nur die sechs Auftragsdateien,
nicht der Stapel 2025.

## Inhalt und Zahlen

| Teil | Anzahl | Soll |
| --- | --- | --- |
| Schriftstücke (`*.txt` im Ordner) | 94 | `ERWARTUNG.json` |
| davon mit Handlungsfrist | 41 | Feld `frist` |
| davon mit Zweitfach | 30 | Feld `zweitfach` |
| Belege (`belege/*.txt`) | 45 (41 Ausgaben, 4 Einnahmen; 4 von der Vermieterin selbst ausgestellt) | `belege/ERWARTUNG.json` |
| Kontoauszüge (`bank/2026-01.txt` … `2026-12.txt`) | 12 mit je 20 Umsätzen = 240 | `bank/UMSAETZE.json` |
| Umsätze mit Stück | 174 von 240 | Feld `stuecke` |
| Kontostand | 14.891,71 (Ende 2025) → 24.796,52 (30.12.2026) | |

`HAUSHALTE.json` ist unverändert bis auf das neue Kind Elif Aydemir (geb. 14.03.2026).

Die Texte der Schriftstücke und Belege sind von Hand geschrieben. Ein Skript hat nur aus der von Hand geschriebenen
Umsatzliste das Druckbild der Auszüge gesetzt und die Salden gerechnet, die Soll-Dateien aus den von Hand geführten Listen
in JSON umgesetzt und am Ende alles geprüft (jede Datei genau einmal im Soll, Listenwerte wörtlich, Stücke vorhanden,
Salden, Beträge und Fristdaten stehen im Text).

## Was 2026 anders ist als 2025

- **Teuerung:** Hausmeister 95,20 → 98,18 (Dauerauftrag ab März), Treppenhausreinigung 102,34 → 105,43 (ab April), Erdgas-Abschlag
  286 → 295, Allgemeinstrom 34 → 35, Telefon 42,95 → 44,95 (Abbuchung ab Mai), Tageblatt 140,70 → 146,40 je Quartal, Abfall
  486,40 → 537,60, Wasser-Abschlag 318 → 329, Versicherungen (Kfz 428,16 → 446,52, Haftpflicht 242,76 → 250,04, Wohngebäude
  1.186,40 → 1.221,99, Rechtsschutz 312,60 → 322,00), Vereinsbeiträge.
- **Kommunale Abgaben:** neuer Bescheid, Hebesatz Grundsteuer B 540 → 610 v. H., Jahresbetrag 896,92 in vier Raten zu 224,23.
- **Rente:** Krankenkassen-Zusatzbeitrag 2,5 → 3,1 % (wirkt ab der Märzrente: 1.142,37 → 1.138,46 und 698,40 → 696,02),
  Rentenanpassung 3,4 % zum 1. Juli (1.177,18 und 719,69). Ab Juni Pflegegrad 2 mit Pflegegeld 347,00.
- **Zahnarzt:** Praxisnachfolge, Heil- und Kostenplan, Genehmigung der Kasse, Rechnung 1.672,45, Erstattung der Zusatzversicherung
  1.170,72. **Tanken:** drei Quittungen, 1,889 → 1,969 → 2,049 EUR/l.
- **Brandtner:** Mieterhöhung 640 → 690 zum 1. Juni (Mieterverein schaltet sich ein, Zustimmung), Vorauszahlung 160 → 175; im Juni
  noch 800,00, dann 65,00 Differenz, ab Juli 865,00. Nebenkosten 2025: Nachzahlung 84,37.
- **Petrović:** arbeitslos ab Januar, Teilzahlungen Februar bis April (500/400/500), Mahnung, Jobcenter-Anfrage, Ratenvereinbarung,
  200,00 bar, Mai und Juni 960,00, neue Arbeit ab 15. Juni, im Juli 1.640,00 (Rückstand ausgeglichen), Nebenkosten-Nachzahlung
  212,48 im August, ab August 875,00.
- **Aydemir:** Tochter Elif geboren, Wohngeldantrag (Mietbescheinigung), Nebenkosten-Guthaben 46,20 mit der Junimiete verrechnet
  (658,80), ab Juni 705,00; ab September zahlt die Kreiskasse 212,00 Wohngeld direkt, die Mieter 493,00.
- **Sonst:** Stromanbieterwechsel der eigenen Wohnung zum 1. April (Schlussrechnung übersehen → Mahnung → Inkasso), größere
  Reparatur (Fenster Dachgeschoss und Haustür, 5.426,40 in Abschlag und Schlussrechnung), Steuerbescheid 2025 mit Nachzahlung
  321,74 und höheren Vorauszahlungen (376,50), Anschlussfinanzierung des Darlehens (Rate ab Dezember 438,00), Freistellungsauftrag,
  Augenoperation, Stellplatz gekündigt zum Jahresende.

### Neue Absender (Schriftstücke), nicht in den Listen 2025

Agentur für Arbeit Wendelsburg · Alltagshilfe Pohlmann · Dieter Woelk (2025 nur als Gegenpartei der Bank) · Familienkasse
Mittelland · Fensterbau Wöhlke GmbH · Jobcenter Wendelsburger Land · Landkreis Wendelsburg – Wohngeldstelle · Mieterverein
Wendelsburg und Umgebung e.V. · Nordlicht Energie GmbH · Optik Sehwerk Wendelsburg · Zahnärzte am Mühlenteich.
Das sind 11 von 54 verschiedenen Absendern. Die Spendenbescheinigung kommt von der Kirchengemeinde St. Marien ohne den Zusatz
„Friedhofsverwaltung“ – derselbe Absender wie 2025, nur anders geschrieben.

### Neue Aussteller (Belege)

Autohof Kreuz Wendelsburg · Containerdienst Rehbein GmbH & Co. KG · Dachrinnen-Reinigung Flink · Fensterbau Wöhlke GmbH ·
Kanal- und Rohrdienst Meentzen · Nordlicht Energie GmbH · Rauchmelder-Service Kuhlmann – 7 von 31. FIDELIA stand 2025 nur bei
den Schriftstücken, nicht bei den Belegen.

Neue Gegenparteien nur auf den Auszügen: Kreiskasse Wendelsburg (Wohngeld), ZahnMed Abrechnungsservice Mittelland (zieht für
die Zahnarztpraxis ein), Bargeld.

## Besonderheiten der Auszüge

- Zwei Rechnungen in einer Überweisung: 20.03., Dröge RE-2026-0188 und RE-2026-0203 (227,53).
- Nur Kundennummer: 09.03. Elektro Sievers. Verstümmelt: 21.09. Kallweit „RE20260298 LIEG 07 0117“; 20.11. Tiedemann
  „Rg. 2026/0241“ (Rechnung heißt RE 2026 0241). Kassenzeichen statt Rechnungsnummer bei Stadt, Wasserverband, Abfall.
- Die Dauerauftrags-Zahlung an Brinkmeier trägt keine Rechnungsnummer („lt. Monatsrechnung Vormonat“).
- Ohne Stück im Stapel u. a.: Mieten zum alten Betrag, Darlehensraten Januar bis November, Alltagshilfe 4. Quartal 2025 und
  2. Quartal 2026, Hausrat, Bargeld, Frischmarkt, Umbuchung aufs Tagesgeld, Weihnachtsgeld.
- Belege, die bar bezahlt wurden, haben keinen Umsatz (Notdienst, Container, Rauchmelder, Schlüsseldienst, Post, Bons).
- Bei wiederkehrenden Zahlungen nennt `stuecke` jeden Monat das Schreiben, das den Betrag festlegt (z. B. Abschlagsplan,
  Rentenanpassung, Nebenkostenabrechnung mit neuer Vorauszahlung).

## Wo ich gezweifelt habe

**Schriftstücke**
1. **`person`:** gesetzt, wenn es um einen Menschen geht (Gesundheit, Rente, Steuererklärung, Reise; einzelner Mieter). Bei Haus,
   Auto, Konto und bei Schreiben an Eheleute steht `null`. Wer in einem Ein-Personen-Haushalt immer die Vermieterin erwartet,
   zählt anders.
2. **Wohngebäudeversicherung** (`Fidelia Wohngebaeude Anpassung.txt`): Haus & Wohnung mit Zweitfach Versicherungen, sinngemäß
   wie Punkt 1 der Fachregel. Die Fachregel nennt aber Hausrat ausdrücklich unter Versicherungen; man kann es umgekehrt sehen.
3. **Zahnzusatzversicherung** (Beitrag, Leistungsabrechnung): Gesundheit & Pflege, Zweitfach Versicherungen.
4. **Pflegekasse:** wie Krankenkasse behandelt (Punkt 2), also Zweitfach Rente, Arbeit & Sozialversicherung.
5. **Kopien fremder Bescheide:** Arbeitslosengeld-Bescheid des Mieters → Rente, Arbeit & Sozialversicherung (Zweitfach Haus &
   Wohnung); Kindergeldbescheid der Mieterin → Familie & persönliche Dokumente (Zweitfach Steuern & Behörden, Punkt 3). In der
   Akte einer Vermieterin läge beides wohl beim Mietverhältnis.
6. **Telvia-Preisanpassung:** Verträge & Abonnements; als Zweitfach habe ich Energie & Versorgung genommen, weil ein eigenes
   Fach für Telefon fehlt. Tageblatt: kein Zweitfach.
7. **LandFrauen-Einladung:** Reisen & Freizeit mit Zweitfach Verträge & Abonnements (Einladung, nicht Beitrag).
8. **Friedhofsgebühr:** Familie & persönliche Dokumente, ohne Zweitfach. **Spendenbescheinigung, Wahlbenachrichtigung:**
   Steuern & Behörden.
9. **Abfallgebühren:** Haus & Wohnung ohne Zweitfach (Gebühr, keine Steuer); Wärmemaß-Ablesung: Haus & Wohnung, Zweitfach Energie.
10. **Heil- und Kostenplan** als „Angebot/Werbung“ (Kostenvoranschlag), mit dem vorgemerkten Behandlungstermin als Frist.
    Auftragsbestätigung Wöhlke als „Vertrag“ mit der Abschlagsfälligkeit als Frist. Reisebestätigung als „Rechnung“.
11. **Fristen, die ich nicht gesetzt habe (Fallen):** Lastschriften (Kfz, Haftpflicht, Gas-Nachzahlung, Steuernachzahlung,
    Zahnzusatz), Sonderkündigungsrechte (Krankenkasse, Telvia, Tageblatt, Fidelia, Kfz 2027), Widerspruchs- und Einspruchsfristen,
    Angebotsbindung (Dröge, Wöhlke), Gültigkeit der Zahnersatz-Bewilligung, Verfall des Entlastungsbetrags, Fristen, die die
    Vermieterin ihren Mietern setzt. Gesetzt, obwohl man streiten kann: Mieterverein (Stellungnahme erbeten), Landeshypo
    (ohne Antwort variabler Zins), Brinkmeier (Dauerauftrag ändern), Wahltag, LandFrauen-Versammlung.
12. Bei Stücken mit zwei Daten gilt das früheste, an dem sie selbst handeln muss (Wasser: 15.02.; Abgaben: erste Rate).

**Belege**
1. **Konto:** gewählt nach dem Inhalt des Belegs, auch wenn die Sache privat ist (Tanken → 4530, Telefon → 4920, eigener Strom
   → 4240, Privatgarten → 4980); dass es privat ist, steht in `wohnung`. Wer Privates auf 1800 erwartet, zählt anders.
2. **`kontoZweifel`:** Mieteinnahmen, Stellplatz, Schlüsselersatz auf 8120 (kein Konto für steuerfreie Mieten); Gartenpflege
   auf 4980; gemischter Baumarkt-Bon auf 4260. Schornsteinfeger, Hausmeister, Rauchmelder, Container, Heizkostenabrechnung
   stehen ohne Zweifel-Marke auf 4980, Dachrinnenreinigung auf 4250.
3. **`ust`:** 0 nur, wo der Beleg es sagt (Post, Bank, Versicherung, Wertstoffhof, eigene Rechnungen nach § 19 UStG, Quittung
   „keine Umsatzsteuer“); `null` beim Vereinsbeitrag und beim Eigenbeleg.
4. **`betrag` beim Abschlagsplan:** der einzelne Monatsabschlag (295,00 bzw. 58,00), nicht die Jahressumme. Bei der
   Schlussrechnung Wöhlke der Restbetrag 3.255,84.
5. **`umlagefaehig`:** `null` bei Einnahmen. Feuerstättenschau und Rauchmelder-Wartung habe ich als umlagefähig gesetzt,
   Dachrinnenreinigung auch (regelmäßig), Bankentgelt und Verwaltungskosten nicht.
6. **`wohnung`** bei Porto, Fahrkarte und Mietspiegel-Quittung: „1. OG links“, weil sie zur Mieterhöhung Brandtner gehören.

**Bank**
1. Rückerstattung der Pflegekasse im Mai verweist auf die Rechnung der Alltagshilfe (legt den Betrag fest), die im Oktober
   auf nichts (Rechnung fehlt im Stapel).
2. Februar-Abschläge Gas und Strom verweisen auf Jahresabrechnung bzw. Kündigungsbestätigung, weil dort der alte Betrag steht.
3. Nach den Regeln der Aufgabe ist die Bareinzahlung vom 30.04. `bar`, die Umbuchung aufs Tagesgeld `ueberweisung`.
4. Der Kontostand wächst übers Jahr um knapp 10.000 EUR trotz 10.000 EUR Umbuchung – die Lebenshaltung ist auf dem Konto
   dünn (wenig Bargeld und Kartenzahlungen), weil je Monat höchstens 20 Umsätze erlaubt waren.
