---
art: bauauftrag
format: 1
vorgang: V-2026-0001
fassung: 4
vorher: -
fassungsdatum: 2026-10-01
datum: 2026-10-01
kunde: "⟦KUNDE-1⟧"
verdeckt: ja
stunden: ja
euro: nein
repo: "Workflow-Needs"  # Werkzeug, das den Auftrag erzeugt hat — nicht das Ziel
---

# Bauauftrag · Fassung 4

**Anlass:** Fremde Knoten im Netz sollen sich nicht als andere ausgeben können; weitere eigene Apps gehören ins Regal  ·  **von:** Betrieb

**Vorhaben:** Offener Marktplatz für Web-Apps mit nachprüfbaren Messwerten

**Gesamtauftrag:** keine frühere Fassung in diesem Auftrag — alles unter „Zu tun“ ist neu zu bauen. Das Datum der Fassung steht im Kopf (`fassungsdatum`), `datum` ist der Tag der Erzeugung.

## Rahmen
- Geräte: im Browser
- Ohne Internet: reicht unterwegs
- Abgleich zwischen Geräten: nein, ein Gerät reicht
- Daten liegen: eigener Server
- Eigene Programme: gemeinsame Suche
- KI: nur auf dem Gerät
- Nicht bauen: N-01 Keine Preise und keine Provision (Stufe 1) · N-02 Keine geschönten Messwerte

## Zu tun (für die Sitzung)
| Aktion | Kennung | Was | Größe | Stunden (Schätzung) | deckt Bedarf |
|---|---|---|---|---|---|
| NEU BAUEN | K-01 | Marktplatz-Seite mit kompakten Karten, Zeitachse, drei Themen, statisch eingebackener Liste | groß | 41,4–69 | B-13 |
| NEU BAUEN | K-02 | Messwerte nächtlich aus der Messreihe der Schwester-Seite übernehmen, Abgleich beider Märkte | mittel | 14–26 | B-14, B-37 |
| NEU BAUEN | K-03 | Wort- und Bedeutungssuche mit Mikrofon | mittel | 12–20,4 | B-15 |
| NEU BAUEN | K-04 | Einreichen über den gemeinsamen Server, Herkunft vom Browser bezeugt | mittel | 22,4–41,6 | B-16, B-38 |
| NEU BAUEN | K-05 | Pflege-Studio hinter langem Druck: Warteschlange, Bearbeiten, Veröffentlichen ins Repo, Ampel und Melde-Kette | groß | 50–100 | B-17, B-18 |
| NEU BAUEN | K-06 | SBKIM-Knoten mit Siegel, Lampen und eigenem Netz (Module aus dem Kanon kopiert) | mittel | 24–44 | B-19 |
| NEU BAUEN | K-07 | Auslieferungsprüfer: HTML, Archiv, Text, Adresse; Befund in Klartext, zweite Meinung | groß | 6–9,6 | B-46 |
| NEU BAUEN | K-08 | E-Mail-Eingang mit KI-Anweisungs-Prüfung | mittel | 3,8–6 | B-47 |
| NEU BAUEN | K-09 | Zweiter SBKIM-Knoten mit eigener Schublade und eigenem Siegel | klein | 10–20 | B-48 |
| NEU BAUEN | K-10 | Zweisprachigkeit mit Sprachriegel gegen den Auto-Übersetzer | mittel | 28,8–52,8 | B-49 |
| NEU BAUEN | K-11 | Seite KI-Schulung mit Druckfassung | klein | 3,3–5,5 | B-50 |
| NEU BAUEN | K-12 | Wartungs-Schalter im Studio, Sichtbarkeit an einer Stelle gefiltert | klein | 10–20 | B-56 |
| NEU BAUEN | K-13 | Detailseiten /apps/ als Messblatt, Übersicht mit Suchfeld | groß | 12–20 | B-57 |
| NEU BAUEN | K-14 | Sitemap-Bau aus dem Canonical, Arbeitsabläufe bauen alles mit | klein | 3–5 | B-58 |
| NEU BAUEN | K-15 | Befund ohne Fundwerte in die Zwischenablage | klein | 1,2–2,4 | B-59 |
| NEU BAUEN | K-16 | Sicherheitsnetz aus dem Sage-Kanon: signierte Fragen, Rechenaufwand, Sperrliste | mittel | 7,2–13,2 | B-63 |
| NEU BAUEN | K-17 | Bürgen je App und Netz-Verwaltungsseite | mittel | 10,4–18,2 | B-64 |
| NEU BAUEN | K-18 | Neue Einträge mit Detailseite und Sitemap ×5 | klein | 48–72 | B-65 |
| NEU BAUEN | K-19 | Installieren-Knopf ohne Sprung der Kopfleiste | klein | 3–5 | B-66 |

### Je Baustein: Vorlage und Abnahme
- K-01 · Vorlage Alis-Moderaum, Perfect-Skin-Fashion (40 % wiederverwendet) · Faktoren Offline ×1,15
- K-03 · Vorlage Company Brain (40 % wiederverwendet)
- K-04 · Faktoren Server ×1,6
- K-07 · Vorlage Auslieferungsprüfer (70 % wiederverwendet)
- K-08 · Vorlage Sende-Prüfer (70 % wiederverwendet) · Faktoren KI ×1,25
- K-10 · Faktoren Mehrsprachig ×1,2
- K-11 · Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 % wiederverwendet) · Faktoren Druck / PDF ×1,1
- K-13 · Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 % wiederverwendet)
- K-14 · Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 % wiederverwendet)
- K-15 · Vorlage Sende-Prüfer (70 % wiederverwendet)
- K-16 · Vorlage – (70 % wiederverwendet)
- K-17 · Faktoren Mehrere Nutzer ×1,3
- K-18 · Vorlage Alis-Moderaum, Perfect-Skin-Fashion (40 % wiederverwendet)
- K-19 · Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 % wiederverwendet)
- ohne Baustein (trotzdem abnehmen):
  - B-21: Das System muss als Seite ohne Konto und ohne Anmeldung laufen, installierbar und nach dem ersten Besuch offline
  - B-22: Das System muss jede App als kompakte Karte zeigen: Symbol, Name, Beschreibung, Messwerte mit Datum; Anbieter, Bereich und Links erst beim Aufklappen
  - B-23: Das System muss „noch nicht gemessen“ anzeigen, wo keine Messung vorliegt, und nie eine Zahl erfinden
  - B-24: Das System muss die Messwerte nachts aus der Messreihe der Schwester-Seite übernehmen statt selbst ein zweites Mal zu messen
  - B-25: Das System muss die Einträge nach dem Anfangsdatum der App ordnen (Zeitachse, keine Rangliste)
  - B-26: Das System muss die Einträge als fertiges HTML in der Seite tragen, damit nichts springt und Suchmaschinen sie ohne Skript lesen
  - B-27: Das System muss Einsendungen nur über den Server annehmen; der Zugang zum Repo liegt nur dort
  - B-28: Das System muss eine gesperrte App sichtbar mit Grund zeigen, den Link abschalten und sie nicht als Fund der Woche wählen
  - B-29: Das System muss eine Sperre aus dem Studio setzen und nur in der Datei lösen lassen
  - B-30: Das System muss in Stufe 1 ohne Preis, Provision und Bezahlvorgang auskommen
  - B-51: Das System muss jede Prüfung im Browser ausführen und nichts hochladen
  - B-52: Das System muss jeden Befund mit Stelle, Sorte und Rat in Klartext zeigen und nie „virenfrei“ behaupten
  - B-53: Das System muss eine Seite zweifach lesen (Text und Browser-Parser) und Unterschiede selbst als Befund melden
  - B-54: Das System muss eine gespeicherte Seite (.mhtml) auspacken und sagen, welchen Teil es geprüft hat
  - B-60: Das System muss eine gesperrte App auch in der Wartung sichtbar lassen (die Sperre geht vor)
  - B-61: Das System muss in der Detailseite kein Datum erfinden und keine Bewertung vortäuschen (keine Sterne, kein Preis im Strukturdaten-Block)
  - B-62: Das System muss beim Kopieren jede Quellzeile eines Befunds durch einen Platzhalter ersetzen
  - B-67: Das System muss die Netz-Module byte-gleich aus dem Kanon übernehmen und Abweichungen per Prüfwert melden
  - B-68: Das System muss eine Antwort mit Anweisung an eine KI vom KI-Richter ausschließen

## Bedarfsprotokoll – Änderungen
- NEU B-01 [Bereich 1]: „nichts“
- NEU B-02 [Bereich 1]: „eigene Apps liegen verstreut auf einzelnen Adressen, nur im Freundeskreis bekannt“
- NEU B-03 [Bereich 1]: „ein Marktplatz für den inneren Kreis besteht schon (gleiche Technik, persönlicher Ton)“
- NEU B-04 [Bereich 2]: „Kundenkontakt“
- NEU B-05 [Bereich 2]: „Apps vorstellen, prüfen und aufnehmen“
- NEU B-06 [Bereich 3]: „Betreiber“
- NEU B-07 [Bereich 3]: „fremde Anbieter, die eine App eintragen wollen“
- NEU B-08 [Bereich 3]: „Besucher, die eine App suchen (Fremde)“
- NEU B-09 [Bereich 4]: „fehlende Übersicht“
- NEU B-10 [Bereich 4]: „Fremde haben keinen Grund, einer unbekannten App zu vertrauen“
- NEU B-11 [Bereich 4]: „Bewertungen anderswo sind Selbstauskunft oder geschönt“
- NEU B-12 [Bereich 5]: „Vertrauen kommt bisher von den Personen; bei Fremden muss es die Software herstellen“
- NEU B-13 [Bereich 6]: „Eine Seite, auf der Web-Apps mit Symbol, Beschreibung und Anbieter stehen, auch am Handy übersichtlich“ (Muss, Nutzen: gefunden werden)
- NEU B-14 [Bereich 6]: „Gemessene Werte (Leistung, Bedienbarkeit, gute Praxis, Auffindbarkeit) mit Datum an jeder Karte, auch die schlechten“ (Muss, Nutzen: nachprüfbar statt geschönt)
- NEU B-15 [Bereich 6]: „Suchen nach Worten und nach Bedeutung, mit Mikrofon“ (Soll, Nutzen: 2 h/Monat)
- NEU B-16 [Bereich 6]: „Fremde können ihre App einreichen; nichts erscheint ohne Freigabe des Betreibers“ (Muss, Nutzen: 3 h/Monat)
- NEU B-17 [Bereich 6]: „Ein verstecktes Pflege-Studio zum Freigeben, Bearbeiten und Sperren, ohne Schlüssel im Browser“ (Muss, Nutzen: 4 h/Monat)
- NEU B-18 [Bereich 6]: „Ampel je Eintrag mit Grund; Melden-Knopf an jeder Karte“ (Soll, Nutzen: 1 h/Monat)
- NEU B-19 [Bereich 6]: „Selbst ein Knoten im SBKIM-Netz mit Siegel und Lampen“ (Kann)
- NEU B-46 [Bereich 6]: „Ein Prüfer, der eine Seite, ein Archiv, einen Text oder eine Adresse auf dem Gerät durchsieht und in Klartext sagt, was auffällt“ (Muss, Nutzen: 2 h/Monat, kein Schlüssel und keine fremde Adresse rutscht mehr mit hinaus)
- NEU B-47 [Bereich 6]: „Auch E-Mails prüfen: Links, versteckter Text, Anweisungen an eine KI“ (Soll, Nutzen: 1 h/Monat)
- NEU B-48 [Bereich 6]: „Der Prüfer ist ein eigener Knoten mit eigener Identität neben dem Marktplatz“ (Kann)
- NEU B-49 [Bereich 6]: „Deutsch und Englisch mit einem Knopf, Rechtstexte bleiben verbindlich Deutsch“ (Soll)
- NEU B-50 [Bereich 6]: „KI-Schulung nach Art. 4 EU AI Act als eigene, druckbare Seite“ (Kann)
- NEU B-56 [Bereich 6]: „Eine App per Klick auf Wartung schalten und wieder zurück; währenddessen keine Warnung aus Messungen“ (Muss, Nutzen: 1 h/Monat)
- NEU B-57 [Bereich 6]: „Je App eine eigene Seite mit Messverlauf, Mängeln und Weg zur App, dazu eine Übersicht aller Apps“ (Muss, Nutzen: gefunden werden über Suchmaschinen)
- NEU B-58 [Bereich 6]: „Sitemap und Kennzeichnung werden aus den Seiten gebaut, nicht von Hand gepflegt“ (Soll)
- NEU B-59 [Bereich 6]: „Den Befund des Prüfers kopieren können, ohne dass Schlüssel oder Kontonummern mitgehen“ (Muss, Nutzen: an die eigene KI weitergeben)
- NEU B-63 [Bereich 6]: „Fragen und Antworten im Netz sind unterschrieben, Echtheit wird geprüft, gesperrte Knoten stehen in einer signierten Liste“ (Muss)
- NEU B-64 [Bereich 6]: „Bürgen je App mit Ablauf und Widerruf, Netz-Verwaltung als eigene Seite“ (Soll)
- NEU B-65 [Bereich 6]: „Neue eigene Apps aufnehmen (Sende-Prüfer, Workflow Calculate, Bedarfsanalyse, Kim-sync, BookLedger Basic)“ (Soll, Nutzen: 1 h/Monat)
- NEU B-66 [Bereich 6]: „Installieren-Knopf in der Kopfleiste, der verschwindet, sobald die Seite als App läuft“ (Kann)
- NEU B-20 [Bereich 7]: „Jede Karte sagt mit Datum, was gemessen wurde; jede Einsendung geht über einen Tisch“
- NEU B-21 [Bereich 8]: „Das System muss als Seite ohne Konto und ohne Anmeldung laufen, installierbar und nach dem ersten Besuch offline“
- NEU B-22 [Bereich 8]: „Das System muss jede App als kompakte Karte zeigen: Symbol, Name, Beschreibung, Messwerte mit Datum; Anbieter, Bereich und Links erst beim Aufklappen“
- NEU B-23 [Bereich 8]: „Das System muss „noch nicht gemessen“ anzeigen, wo keine Messung vorliegt, und nie eine Zahl erfinden“
- NEU B-24 [Bereich 8]: „Das System muss die Messwerte nachts aus der Messreihe der Schwester-Seite übernehmen statt selbst ein zweites Mal zu messen“
- NEU B-25 [Bereich 8]: „Das System muss die Einträge nach dem Anfangsdatum der App ordnen (Zeitachse, keine Rangliste)“
- NEU B-26 [Bereich 8]: „Das System muss die Einträge als fertiges HTML in der Seite tragen, damit nichts springt und Suchmaschinen sie ohne Skript lesen“
- NEU B-27 [Bereich 8]: „Das System muss Einsendungen nur über den Server annehmen; der Zugang zum Repo liegt nur dort“
- NEU B-28 [Bereich 8]: „Das System muss eine gesperrte App sichtbar mit Grund zeigen, den Link abschalten und sie nicht als Fund der Woche wählen“
- NEU B-29 [Bereich 8]: „Das System muss eine Sperre aus dem Studio setzen und nur in der Datei lösen lassen“
- NEU B-30 [Bereich 8]: „Das System muss in Stufe 1 ohne Preis, Provision und Bezahlvorgang auskommen“
- NEU B-51 [Bereich 8]: „Das System muss jede Prüfung im Browser ausführen und nichts hochladen“
- NEU B-52 [Bereich 8]: „Das System muss jeden Befund mit Stelle, Sorte und Rat in Klartext zeigen und nie „virenfrei“ behaupten“
- NEU B-53 [Bereich 8]: „Das System muss eine Seite zweifach lesen (Text und Browser-Parser) und Unterschiede selbst als Befund melden“
- NEU B-54 [Bereich 8]: „Das System muss eine gespeicherte Seite (.mhtml) auspacken und sagen, welchen Teil es geprüft hat“
- NEU B-60 [Bereich 8]: „Das System muss eine gesperrte App auch in der Wartung sichtbar lassen (die Sperre geht vor)“
- NEU B-61 [Bereich 8]: „Das System muss in der Detailseite kein Datum erfinden und keine Bewertung vortäuschen (keine Sterne, kein Preis im Strukturdaten-Block)“
- NEU B-62 [Bereich 8]: „Das System muss beim Kopieren jede Quellzeile eines Befunds durch einen Platzhalter ersetzen“
- NEU B-67 [Bereich 8]: „Das System muss die Netz-Module byte-gleich aus dem Kanon übernehmen und Abweichungen per Prüfwert melden“
- NEU B-68 [Bereich 8]: „Das System muss eine Antwort mit Anweisung an eine KI vom KI-Richter ausschließen“
- NEU B-31 [Bereich 9]: „sachlicher, knapper Ton für Fremde, kein Mitmach-Appell“
- NEU B-32 [Bereich 9]: „Erklärungen hinter Aufklappern statt Textwänden“
- NEU B-33 [Bereich 10]: „offline“
- NEU B-34 [Bereich 10]: „Geräte“
- NEU B-35 [Bereich 10]: „drei Themen (Nacht, Signal, Tag), Kontrast in jedem geprüft“
- NEU B-36 [Bereich 11]: „Marktplatz der Schwester-Seite mit Messstation und Einreich-Server“
- NEU B-37 [Bereich 12]: „Messreihe der Schwester-Seite (nächtlich gelesen)“
- NEU B-38 [Bereich 12]: „gemeinsamer Einreich- und Freigabe-Server mit Herkunft je Einsendung“
- NEU B-39 [Bereich 13]: „Einträge, Messwerte mit Datum, geprüfte Eigenschaften, Ampel mit Grund, Meldungen“
- NEU B-55 [Bereich 13]: „Prüfberichte (nur auf dem Gerät)“
- NEU B-40 [Bereich 14]: „personenbezogene Daten: ja“
- NEU B-41 [Bereich 14]: „kein Zähldienst, keine Laufzeit-Abhängigkeit von fremden Servern“
- NEU B-42 [Bereich 14]: „Impressum und Datenschutz mit echten Angaben (§ 5 DDG)“
- NEU B-43 [Bereich 15]: „Vorgaben“
- NEU B-44 [Bereich 15]: „Stufe 1: nur zeigen, keine Preise; vor dem ersten Preis die Gewerbeanmeldung“
- NEU B-45 [Bereich 15]: „kein eigener Bezahlvorgang, keine automatische Auszahlung, kein Kopierschutz“
- NEU O-01 [Bereich 18]: „Ab wann wird ein Preis gezeigt?“
- NEU O-02 [Bereich 18]: „Bekommt der Prüfer einen Senden-Knopf?“
- NEU O-03 [Bereich 18]: „Wann kommt Stufe 2 (Preise, Provision)?“

## Offene Punkte
- O-01: Ab wann wird ein Preis gezeigt? (klärt Betreiber bis 2026-09-30)
- O-02: Bekommt der Prüfer einen Senden-Knopf? (klärt Betreiber bis 2026-10-31)
- O-03: Wann kommt Stufe 2 (Preise, Provision)? (klärt Betreiber bis 2027-01-31)

## Summe
Stunden F4 421,8–751,5 · Kosten-Nutzen: Grenzlinie keine

Die Summe enthält zusätzlich zu den Zeilen: Anpassung an den Betrieb 2–6 h, Abstimmung 15 % (46,9–83,5 h), Puffer 20 % (62,5–111,3 h).

## Erklärungen und Sterne
- Verschwiegenheitserklärung aktiviert: nein · Vereinbarung Zahlung/Rechte aktiviert: nein · Wartungsvertrag aktiviert: nein
- Sterne B-14: beim Bedarf Ø 4,3 (3) · bei der Abnahme Ø 4,7 (3)
- Sterne B-16: beim Bedarf Ø 4,3 (3) · bei der Abnahme Ø 4,3 (3)
- Sterne B-17: beim Bedarf Ø 4 (2) · bei der Abnahme Ø 4,5 (2)
- Sterne B-46: beim Bedarf Ø 4,7 (3) · bei der Abnahme Ø 4,7 (3)
- Sterne B-56: beim Bedarf Ø 4 (2) · bei der Abnahme Ø 4,5 (2)
- Sterne B-57: beim Bedarf Ø 3,5 (2) · bei der Abnahme Ø 4,5 (2)

## Vollständiger Stand (zum Einlesen)
```json
{"bedarf":[{"id":"B-01","nr":1,"text":"nichts","sichtbar":true},{"id":"B-02","nr":1,"text":"eigene Apps liegen verstreut auf einzelnen Adressen, nur im Freundeskreis bekannt","sichtbar":true},{"id":"B-03","nr":1,"text":"ein Marktplatz für den inneren Kreis besteht schon (gleiche Technik, persönlicher Ton)","sichtbar":true},{"id":"B-04","nr":2,"text":"Kundenkontakt","sichtbar":true},{"id":"B-05","nr":2,"text":"Apps vorstellen, prüfen und aufnehmen","sichtbar":true},{"id":"B-06","nr":3,"text":"Betreiber","sichtbar":true,"anzahl":1},{"id":"B-07","nr":3,"text":"fremde Anbieter, die eine App eintragen wollen","sichtbar":true,"anzahl":20},{"id":"B-08","nr":3,"text":"Besucher, die eine App suchen (Fremde)","sichtbar":true,"anzahl":500},{"id":"B-09","nr":4,"text":"fehlende Übersicht","sichtbar":true},{"id":"B-10","nr":4,"text":"Fremde haben keinen Grund, einer unbekannten App zu vertrauen","sichtbar":true},{"id":"B-11","nr":4,"text":"Bewertungen anderswo sind Selbstauskunft oder geschönt","sichtbar":true},{"id":"B-12","nr":5,"text":"Vertrauen kommt bisher von den Personen; bei Fremden muss es die Software herstellen","sichtbar":true},{"id":"B-13","nr":6,"text":"Eine Seite, auf der Web-Apps mit Symbol, Beschreibung und Anbieter stehen, auch am Handy übersichtlich","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"gefunden werden"}},{"id":"B-14","nr":6,"text":"Gemessene Werte (Leistung, Bedienbarkeit, gute Praxis, Auffindbarkeit) mit Datum an jeder Karte, auch die schlechten","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"nachprüfbar statt geschönt"}},{"id":"B-15","nr":6,"text":"Suchen nach Worten und nach Bedeutung, mit Mikrofon","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":2,"text":""}},{"id":"B-16","nr":6,"text":"Fremde können ihre App einreichen; nichts erscheint ohne Freigabe des Betreibers","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":3,"text":""}},{"id":"B-17","nr":6,"text":"Ein verstecktes Pflege-Studio zum Freigeben, Bearbeiten und Sperren, ohne Schlüssel im Browser","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":4,"text":""}},{"id":"B-18","nr":6,"text":"Ampel je Eintrag mit Grund; Melden-Knopf an jeder Karte","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-19","nr":6,"text":"Selbst ein Knoten im SBKIM-Netz mit Siegel und Lampen","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-46","nr":6,"text":"Ein Prüfer, der eine Seite, ein Archiv, einen Text oder eine Adresse auf dem Gerät durchsieht und in Klartext sagt, was auffällt","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":2,"text":"kein Schlüssel und keine fremde Adresse rutscht mehr mit hinaus"}},{"id":"B-47","nr":6,"text":"Auch E-Mails prüfen: Links, versteckter Text, Anweisungen an eine KI","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-48","nr":6,"text":"Der Prüfer ist ein eigener Knoten mit eigener Identität neben dem Marktplatz","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-49","nr":6,"text":"Deutsch und Englisch mit einem Knopf, Rechtstexte bleiben verbindlich Deutsch","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-50","nr":6,"text":"KI-Schulung nach Art. 4 EU AI Act als eigene, druckbare Seite","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-56","nr":6,"text":"Eine App per Klick auf Wartung schalten und wieder zurück; währenddessen keine Warnung aus Messungen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-57","nr":6,"text":"Je App eine eigene Seite mit Messverlauf, Mängeln und Weg zur App, dazu eine Übersicht aller Apps","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"gefunden werden über Suchmaschinen"}},{"id":"B-58","nr":6,"text":"Sitemap und Kennzeichnung werden aus den Seiten gebaut, nicht von Hand gepflegt","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-59","nr":6,"text":"Den Befund des Prüfers kopieren können, ohne dass Schlüssel oder Kontonummern mitgehen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"an die eigene KI weitergeben"}},{"id":"B-63","nr":6,"text":"Fragen und Antworten im Netz sind unterschrieben, Echtheit wird geprüft, gesperrte Knoten stehen in einer signierten Liste","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-64","nr":6,"text":"Bürgen je App mit Ablauf und Widerruf, Netz-Verwaltung als eigene Seite","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-65","nr":6,"text":"Neue eigene Apps aufnehmen (Sende-Prüfer, Workflow Calculate, Bedarfsanalyse, Kim-sync, BookLedger Basic)","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-66","nr":6,"text":"Installieren-Knopf in der Kopfleiste, der verschwindet, sobald die Seite als App läuft","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-20","nr":7,"text":"Jede Karte sagt mit Datum, was gemessen wurde; jede Einsendung geht über einen Tisch","sichtbar":true},{"id":"B-21","nr":8,"text":"Das System muss als Seite ohne Konto und ohne Anmeldung laufen, installierbar und nach dem ersten Besuch offline","sichtbar":true},{"id":"B-22","nr":8,"text":"Das System muss jede App als kompakte Karte zeigen: Symbol, Name, Beschreibung, Messwerte mit Datum; Anbieter, Bereich und Links erst beim Aufklappen","sichtbar":true},{"id":"B-23","nr":8,"text":"Das System muss „noch nicht gemessen“ anzeigen, wo keine Messung vorliegt, und nie eine Zahl erfinden","sichtbar":true},{"id":"B-24","nr":8,"text":"Das System muss die Messwerte nachts aus der Messreihe der Schwester-Seite übernehmen statt selbst ein zweites Mal zu messen","sichtbar":true},{"id":"B-25","nr":8,"text":"Das System muss die Einträge nach dem Anfangsdatum der App ordnen (Zeitachse, keine Rangliste)","sichtbar":true},{"id":"B-26","nr":8,"text":"Das System muss die Einträge als fertiges HTML in der Seite tragen, damit nichts springt und Suchmaschinen sie ohne Skript lesen","sichtbar":true},{"id":"B-27","nr":8,"text":"Das System muss Einsendungen nur über den Server annehmen; der Zugang zum Repo liegt nur dort","sichtbar":true},{"id":"B-28","nr":8,"text":"Das System muss eine gesperrte App sichtbar mit Grund zeigen, den Link abschalten und sie nicht als Fund der Woche wählen","sichtbar":true},{"id":"B-29","nr":8,"text":"Das System muss eine Sperre aus dem Studio setzen und nur in der Datei lösen lassen","sichtbar":true},{"id":"B-30","nr":8,"text":"Das System muss in Stufe 1 ohne Preis, Provision und Bezahlvorgang auskommen","sichtbar":true},{"id":"B-51","nr":8,"text":"Das System muss jede Prüfung im Browser ausführen und nichts hochladen","sichtbar":true},{"id":"B-52","nr":8,"text":"Das System muss jeden Befund mit Stelle, Sorte und Rat in Klartext zeigen und nie „virenfrei“ behaupten","sichtbar":true},{"id":"B-53","nr":8,"text":"Das System muss eine Seite zweifach lesen (Text und Browser-Parser) und Unterschiede selbst als Befund melden","sichtbar":true},{"id":"B-54","nr":8,"text":"Das System muss eine gespeicherte Seite (.mhtml) auspacken und sagen, welchen Teil es geprüft hat","sichtbar":true},{"id":"B-60","nr":8,"text":"Das System muss eine gesperrte App auch in der Wartung sichtbar lassen (die Sperre geht vor)","sichtbar":true},{"id":"B-61","nr":8,"text":"Das System muss in der Detailseite kein Datum erfinden und keine Bewertung vortäuschen (keine Sterne, kein Preis im Strukturdaten-Block)","sichtbar":true},{"id":"B-62","nr":8,"text":"Das System muss beim Kopieren jede Quellzeile eines Befunds durch einen Platzhalter ersetzen","sichtbar":true},{"id":"B-67","nr":8,"text":"Das System muss die Netz-Module byte-gleich aus dem Kanon übernehmen und Abweichungen per Prüfwert melden","sichtbar":true},{"id":"B-68","nr":8,"text":"Das System muss eine Antwort mit Anweisung an eine KI vom KI-Richter ausschließen","sichtbar":true},{"id":"B-31","nr":9,"text":"sachlicher, knapper Ton für Fremde, kein Mitmach-Appell","sichtbar":true},{"id":"B-32","nr":9,"text":"Erklärungen hinter Aufklappern statt Textwänden","sichtbar":true},{"id":"B-33","nr":10,"text":"offline","sichtbar":true},{"id":"B-34","nr":10,"text":"Geräte","sichtbar":true},{"id":"B-35","nr":10,"text":"drei Themen (Nacht, Signal, Tag), Kontrast in jedem geprüft","sichtbar":true},{"id":"B-36","nr":11,"text":"Marktplatz der Schwester-Seite mit Messstation und Einreich-Server","sichtbar":true},{"id":"B-37","nr":12,"text":"Messreihe der Schwester-Seite (nächtlich gelesen)","sichtbar":true},{"id":"B-38","nr":12,"text":"gemeinsamer Einreich- und Freigabe-Server mit Herkunft je Einsendung","sichtbar":true},{"id":"B-39","nr":13,"text":"Einträge, Messwerte mit Datum, geprüfte Eigenschaften, Ampel mit Grund, Meldungen","sichtbar":true},{"id":"B-55","nr":13,"text":"Prüfberichte (nur auf dem Gerät)","sichtbar":true},{"id":"B-40","nr":14,"text":"personenbezogene Daten: ja","sichtbar":true},{"id":"B-41","nr":14,"text":"kein Zähldienst, keine Laufzeit-Abhängigkeit von fremden Servern","sichtbar":true},{"id":"B-42","nr":14,"text":"Impressum und Datenschutz mit echten Angaben (§ 5 DDG)","sichtbar":true},{"id":"B-43","nr":15,"text":"Vorgaben","sichtbar":true},{"id":"B-44","nr":15,"text":"Stufe 1: nur zeigen, keine Preise; vor dem ersten Preis die Gewerbeanmeldung","sichtbar":true},{"id":"B-45","nr":15,"text":"kein eigener Bezahlvorgang, keine automatische Auszahlung, kein Kopierschutz","sichtbar":true},{"id":"O-01","nr":18,"text":"Ab wann wird ein Preis gezeigt?","sichtbar":true,"wer":"Betreiber","bis":"2026-09-30"},{"id":"O-02","nr":18,"text":"Bekommt der Prüfer einen Senden-Knopf?","sichtbar":true,"wer":"Betreiber","bis":"2026-10-31"},{"id":"O-03","nr":18,"text":"Wann kommt Stufe 2 (Preise, Provision)?","sichtbar":true,"wer":"Betreiber","bis":"2027-01-31"}],"bausteine":[{"id":"K-01","katalog":"shop","name":"Marktplatz-Seite mit kompakten Karten, Zeitachse, drei Themen, statisch eingebackener Liste","menge":1,"groesse":"gross","faktoren":["offline"],"deckt":["B-13"],"ermaessigt":false},{"id":"K-02","katalog":"schnitt","name":"Messwerte nächtlich aus der Messreihe der Schwester-Seite übernehmen, Abgleich beider Märkte","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-14","B-37"],"ermaessigt":false},{"id":"K-03","katalog":"suche","name":"Wort- und Bedeutungssuche mit Mikrofon","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-15"],"ermaessigt":false},{"id":"K-04","katalog":"schnitt","name":"Einreichen über den gemeinsamen Server, Herkunft vom Browser bezeugt","menge":1,"groesse":"mittel","faktoren":["server"],"deckt":["B-16","B-38"],"ermaessigt":false},{"id":"K-05","katalog":"neu","name":"Pflege-Studio hinter langem Druck: Warteschlange, Bearbeiten, Veröffentlichen ins Repo, Ampel und Melde-Kette","menge":1,"groesse":"gross","faktoren":[],"deckt":["B-17","B-18"],"ermaessigt":false},{"id":"K-06","katalog":"neu","name":"SBKIM-Knoten mit Siegel, Lampen und eigenem Netz (Module aus dem Kanon kopiert)","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-19"],"ermaessigt":false},{"id":"K-07","katalog":"dateipruef","name":"Auslieferungsprüfer: HTML, Archiv, Text, Adresse; Befund in Klartext, zweite Meinung","menge":1,"groesse":"gross","faktoren":[],"deckt":["B-46"],"ermaessigt":false},{"id":"K-08","katalog":"kipruef","name":"E-Mail-Eingang mit KI-Anweisungs-Prüfung","menge":1,"groesse":"mittel","faktoren":["ki"],"deckt":["B-47"],"ermaessigt":false},{"id":"K-09","katalog":"neu","name":"Zweiter SBKIM-Knoten mit eigener Schublade und eigenem Siegel","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-48"],"ermaessigt":false},{"id":"K-10","katalog":"neu","name":"Zweisprachigkeit mit Sprachriegel gegen den Auto-Übersetzer","menge":1,"groesse":"mittel","faktoren":["sprachen"],"deckt":["B-49"],"ermaessigt":false},{"id":"K-11","katalog":"seite","name":"Seite KI-Schulung mit Druckfassung","menge":1,"groesse":"klein","faktoren":["druck"],"deckt":["B-50"],"ermaessigt":false},{"id":"K-12","katalog":"neu","name":"Wartungs-Schalter im Studio, Sichtbarkeit an einer Stelle gefiltert","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-56"],"ermaessigt":false},{"id":"K-13","katalog":"seite","name":"Detailseiten /apps/ als Messblatt, Übersicht mit Suchfeld","menge":1,"groesse":"gross","faktoren":[],"deckt":["B-57"],"ermaessigt":false},{"id":"K-14","katalog":"seite","name":"Sitemap-Bau aus dem Canonical, Arbeitsabläufe bauen alles mit","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-58"],"ermaessigt":false},{"id":"K-15","katalog":"kipruef","name":"Befund ohne Fundwerte in die Zwischenablage","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-59"],"ermaessigt":false},{"id":"K-16","katalog":"neu","name":"Sicherheitsnetz aus dem Sage-Kanon: signierte Fragen, Rechenaufwand, Sperrliste","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-63"],"ermaessigt":false},{"id":"K-17","katalog":"lizenz","name":"Bürgen je App und Netz-Verwaltungsseite","menge":1,"groesse":"mittel","faktoren":["nutzer"],"deckt":["B-64"],"ermaessigt":false},{"id":"K-18","katalog":"shop","name":"Neue Einträge mit Detailseite und Sitemap","menge":5,"groesse":"klein","faktoren":[],"deckt":["B-65"],"ermaessigt":false},{"id":"K-19","katalog":"seite","name":"Installieren-Knopf ohne Sprung der Kopfleiste","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-66"],"ermaessigt":false}],"rahmen":{"eigeneText":"","geraete":["browser"],"offline":"unterwegs","abgleich":"eins","eigene":["suche"],"datenort":["server"],"sicherung":[],"ki":"geraet"},"nicht":[{"id":"N-01","text":"Keine Preise und keine Provision (Stufe 1)","sichtbar":true},{"id":"N-02","text":"Keine geschönten Messwerte","sichtbar":true}]}
```
