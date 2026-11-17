# Marktanalyse 08 – Gastronomie mit Event-Catering

Blickwinkel: Restaurant mit Event-Catering in Deutschland, 15 feste Mitarbeitende, viele Aushilfen. Recherche am 13.11.2026
über allgemeine Websuche; Preise stammen meist aus Vergleichsportalen, nicht von den Anbietern selbst, und sind darum Richtwerte.

## Was es heute gibt (kurz)

| Bereich | Werkzeuge | Preis (Richtwert) |
|---|---|---|
| Dienstplan, Zeiterfassung | gastromatic, Ordio, e2n | gastromatic laut Preis-Tracker seit 2026 ab 69,50 €/Monat (Starter), 99,50 € (Professional); früher 6,95 €/Mitarbeiter ([pricingsaas](https://pricingsaas.com/companies/gastromatic/diffs/2026W34), [ki-syndikat](https://www.ki-syndikat.de/tools/gastromatic/)) |
| Rezepte, Allergene, Wareneinsatz | Apicbase, FoodNotify, meez, Rezeptrechner PRO | Apicbase ab ca. 399 $/Monat ([TrustRadius](https://trustradius.com/products/apicbase/reviews)), FoodNotify Starter ab 174,90 €/Monat ([ki-syndikat](https://www.ki-syndikat.de/tools/foodnotify/)), Rezeptrechner PRO ab 150 €/Jahr ([softguide](https://www.softguide.de/programm/rezeptrechner-pro/vorschau)) |
| HACCP | DIE HACCP APP, CheckTouch, Alcomo, Sencono | 17–70 €/Monat, Sensoren extra ([ki-syndikat](https://www.ki-syndikat.de/tools/diehaccpapp/), [Alcomo](https://www.ki-syndikat.de/tools/alcomo/), [CheckTouch](https://www.ki-syndikat.de/tools/checktouch/)) |
| Catering-Angebote | ROP11, Gastrosync, Caterklick, KITCAT365, Caterease (USA) | ROP11 ab 2.000 € Lizenz ([softguide](https://www.softguide.de/programm/rop-irma)), sonst meist „auf Anfrage“ |
| Kasse mit TSE | orderbird, Lightspeed, gastronovi | Kasse ist gesetzt, man wechselt sie selten |

**Worüber Wirte klagen:** Insellösungen – Kasse, Dienstplan, Warenwirtschaft und Reservierung laufen getrennt, Daten werden doppelt
abgetippt ([Hagel-IT](https://www.hagel-it.de/it-insights/digitalisierung-in-der-gastronomie-kosten-sparen-durch-den-einsatz-von-it-technologien),
[tageskarte](https://www.tageskarte.io/technologie/detail/herausforderung-software-in-der-gastronomie-mit-inselloesung-oder-plattform-gegen-den-personalmangel.html)).
Rezept-/Wareneinsatz-Software ist für kleine Betriebe zu teuer und zu aufwendig in der Pflege (alle Rezepte grammgenau). Catering-Software
ist alt, teuer oder nur auf Anfrage. HACCP-Apps sind billig und zahlreich – da ist kein Platz mehr.

**Markt:** rund 158.000 umsatzsteuerpflichtige Unternehmen im Gastgewerbe Ende 2022 (DEHOGA, nach
[Statista](https://de.statista.com/statistik/daten/studie/275585/umfrage/unternehmen-in-der-gastronomie-in-deutschland)); die
Umsatzsteuerstatistik 2024 zeigt weiter sinkende Betriebszahlen bei rund 118 Mrd. € Umsatz
([tageskarte](https://www.tageskarte.io/tourismus/detail/umsatzsteuerstatistik-gastgewerbe-2024-deutliche-umsatzsteigerung-bei-anhaltendem-rueckgang-der-betr.html)).
Wie viele davon Catering anbieten, habe ich nicht belastbar gefunden – meine Schätzung (nicht belegt): 15–25 %.

---

## Idee 1 – „Event-Mappe“ (Catering vom Angebot bis zur Nachkalkulation)

- **Wer kauft:** Restaurants mit Catering-Nebengeschäft, kleine Caterer (2–30 Leute), Eventlocations.
- **Problem:** Ein Catering-Auftrag geht heute durch Word-Angebot → Excel-Mengenrechnung → handschriftliche Packliste → Allergen-Aushang
  am Buffet von Hand → nach dem Event weiß keiner, ob es sich gerechnet hat. Fehler beim Allergen-Aushang am Buffet sind Ordnungswidrigkeiten
  ([Mainz](https://www.mainz.de/vv/medien/internet/Merkblatt-Allergenkennzeichnung.pdf)); für Buffets braucht es eine Liste aller Produkte
  ([Gießen](https://giessen-entdecken.de/wp-content/uploads/Allergen-u.-Zusatzstoffkennzeichnung-be-Speisekarte-03.2016.pdf)).
- **Heute gelöst:** Word/Excel, ROP11 (Lizenz ab 2.000 €), Gastrosync, bei Großen Apicbase.
- **Alleinstellung:** *Ein* Datensatz je Event erzeugt Angebot, Produktionsliste je Personenzahl, Einkaufsliste, Packliste (Geschirr,
  Chafing Dishes), **Buffet-Schilder mit konkreten Allergenen** („Weizen“, nicht „Gluten“) und nach dem Event eine Nachkalkulation
  Plan gegen Ist (Reste, Mehrstunden). Rezepte nur so grob wie nötig („Portion Rinderbraten ≈ 180 g, enthält Sellerie, Senf“) statt
  grammgenaue Rezeptur wie bei Apicbase/FoodNotify. Günstiger als ROP11, deutscher und schlanker als Caterease, keine Kassenbindung wie gastronovi.
- **Preis:** 39 €/Monat (bis 10 Events/Monat), 79 € unbegrenzt; Jahreszahlung mit Rabatt. Kein Preis je Mitarbeiter.
- **Grobe Marktgröße:** bei 158.000 Betrieben und meiner (unbelegten) Annahme von 15 % mit Catering ≈ 24.000 mögliche Kunden;
  1 % Marktanteil × 50 € ≈ 144.000 €/Jahr.
- **Soll NICHT:** Kasse, Lohn, Dienstplan, Buchhaltung, Online-Shop für Endkunden, grammgenaue Nährwertberechnung.
- **Geräte/Daten:** Angebot am PC/Browser, Packliste und Buffet-Schilder am Handy/Tablet, offline in der Küche. Daten beim Betrieb
  (lokal oder EU-Server); Kundendaten (Name, Adresse, Telefon) nach DSGVO, Löschfristen nach Abschluss.
- **Risiko:** Jeder Caterer rechnet anders (Pauschale je Kopf, je Gericht, Personal extra); wird es zu flexibel, wird es Excel.
  Allergenangaben hängen an der Pflege – Haftungsfrage muss klar sein („Werkzeug, keine Prüfung“). Vertrieb an Wirte ist mühsam.

## Idee 2 – „Aushilfen-Startklar“ (Einstellen, Belehren, Nachweisen)

- **Wer kauft:** Betriebe mit vielen Aushilfen und Minijobbern: Gastro, Catering, Veranstalter, Bäcker.
- **Problem:** Jede Aushilfe braucht vor der ersten Schicht die Bescheinigung nach § 43 IfSG (bei Arbeitsbeginn nicht älter als 3 Monate),
  der Arbeitgeber muss Nachweise aufbewahren und vorzeigen
  ([verwaltung.bund.de](https://verwaltung.bund.de/leistungsverzeichnis/DE/leistung/99003002022000/herausgeber/BY-1963/region/09),
  [Heidelberg](https://www.heidelberg.de/-/Verfahrensbeschreibung/vbid789/mid1)); dazu Personalbogen, Steuer-ID, Sofortmeldung,
  betriebliche Hygiene- und Allergenunterweisung. Bei 30–60 Aushilfen im Jahr fehlt immer ein Zettel, wenn die Kontrolle kommt.
- **Heute gelöst:** Papierordner, WhatsApp-Fotos, teils in gastromatic/Ordio (dort Dienstplan zuerst, Unterlagen nebenbei),
  Personio (für 15 Leute zu groß und teuer).
- **Alleinstellung:** Ein Link an die Aushilfe → sie fotografiert IfSG-Bescheinigung und Ausweis, füllt den Personalbogen aus, macht die
  betriebliche Kurzunterweisung (10 min, Quiz, unterschreibt am Handy). Ampel je Person: „darf arbeiten / fehlt X“; Erinnerung an
  Folgeunterweisungen; **Kontrollmappe als ein PDF auf Knopfdruck**. Ersetzt nicht die amtliche Erstbelehrung (die macht das Gesundheitsamt,
  [hogapage](https://www.hogapage.de/nachrichten/arbeitswelt/ratgeber/infektionsschutzbelehrung-f%C3%BCr-gastronomie-und-hotellerie/)),
  sondern verweist auf den Online-Weg des Amts. Gibt Daten als Export an Dienstplan-Tools (gastromatic, Ordio) und Lohnbüro weiter statt sie nachzubauen.
- **Preis:** 19 €/Monat bis 30 Personen, 39 € bis 100; keine Einrichtungsgebühr.
- **Grobe Marktgröße:** alle ≈ 158.000 Gastgewerbe-Unternehmen plus Lebensmittelhandwerk; realistisch die mit hoher Aushilfsquote.
  Rechnung: 2.000 Kunden × 25 € ≈ 600.000 €/Jahr (Ziel, nicht Marktbeleg).
- **Soll NICHT:** Dienstplan, Zeiterfassung, Lohnabrechnung, amtliche Belehrung ersetzen, Bewerberauswahl.
- **Geräte/Daten:** Aushilfe am eigenen Handy im Browser (keine App-Installation), Chef am PC/Tablet. Ausweis- und Steuerdaten sind
  besonders sensibel: verschlüsselt, EU-Server oder nur beim Betrieb, automatische Löschung nach Aufbewahrungsfrist, keine KI-Auswertung der Ausweise.
- **Risiko:** Dienstplan-Anbieter bauen das als Funktion nach (gastromatic/Ordio haben die Kunden schon). Personaldaten-Haftung
  für einen Ein-Personen-Anbieter. Zahlungsbereitschaft für „Papierkram“ niedrig, solange nichts passiert ist.

## Idee 3 – „Wareneinsatz-Wächter“ (Lieferscheine gegen Kassenumsatz)

- **Wer kauft:** Inhabergeführte Restaurants mit 300.000–2 Mio. € Umsatz, die ihren Wareneinsatz nur einmal im Jahr vom Steuerberater erfahren.
- **Problem:** Preise der Lieferanten steigen schleichend, Portionen werden größer, Schwund fällt nicht auf. Die BWA kommt Wochen zu spät.
- **Heute gelöst:** Apicbase/FoodNotify (teuer, alle Rezepte grammgenau pflegen, Inventur-Disziplin), sonst Bauchgefühl und Excel.
- **Alleinstellung:** Kein Rezept-Pflegezwang. Lieferscheine/Rechnungen per Foto oder Mail-Weiterleitung einlesen (Texterkennung),
  Umsatz aus dem **DSFinV-K-Export der TSE-Kasse** – damit kassenunabhängig (orderbird, Lightspeed, gastronovi …). Ergebnis jede Woche:
  Wareneinsatzquote Küche/Getränke, **Preissprung-Warnung je Artikel und Lieferant** („Rinderhüfte +14 % seit August“), Top-10-Kostentreiber.
  Rezepte nur optional für die wichtigsten 10 Gerichte.
- **Preis:** 49 €/Monat je Standort; 30 Tage kostenlos mit Auswertung der letzten 3 Monate als „Aha-Effekt“.
- **Grobe Marktgröße:** Speisegastronomie-Anteil der ≈ 158.000 Unternehmen; 1.000 Kunden × 49 € ≈ 590.000 €/Jahr (Ziel).
- **Soll NICHT:** Kasse, Buchhaltung, Bestellsystem beim Lieferanten, Inventur-App, Steuerberatung.
- **Geräte/Daten:** Handy zum Fotografieren, Auswertung im Browser/PC. Umsatz- und Lieferantendaten sind Geschäftsgeheimnisse:
  nur EU-Server oder lokal; Texterkennung möglichst auf dem Gerät, kein Weiterverkauf von Preisdaten.
- **Risiko:** Lieferscheine sind unordentlich (Handschrift, Teil-Lieferungen, Gutschriften) – Erkennungsfehler machen die Quote falsch.
  Ohne Inventur bleibt es eine Näherung. DSFinV-K-Exporte unterscheiden sich je Kasse. Kassenanbieter und Warenwirtschaften können nachziehen.

---

## Ehrliche Bewertung (1 = schwach, 5 = stark)

| Idee | Zahlungsbereitschaft | Abgrenzung | Umsetzbar allein mit KI | Kurzurteil |
|---|---|---|---|---|
| 1 Event-Mappe | 4 – Catering bringt Marge, Fehler kosten | 3 – ROP11/Gastrosync gibt es, aber alt/teuer | 4 – Angebot, Listen, Schilder sind überschaubar | Beste Wahl, wenn man an Caterer verkaufen kann |
| 2 Aushilfen-Startklar | 3 – nützlich, aber „Papierkram“ | 2 – Dienstplan-Tools können es nachbauen | 4 – Formulare, Upload, PDF; Datenschutz ist der Aufwand | Gut als Zusatz, allein eher schwach |
| 3 Wareneinsatz-Wächter | 5 – direkt sichtbares Geld | 4 – günstiger und ohne Rezeptpflege | 2 – Texterkennung unordentlicher Belege und Kassenexporte sind schwer | Größter Nutzen, größtes technisches Risiko |

**Fazit als Wirt:** Zahlen würde ich zuerst für Idee 3 (wenn sie wirklich stimmt) und Idee 1 (spart pro Event Stunden und verhindert
Allergen-Fehler am Buffet). Für HACCP würde ich kein neues Werkzeug kaufen – der Markt ist voll und billig.
