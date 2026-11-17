---
art: bauauftrag
format: 1
vorgang: V-2026-0001
fassung: 3
vorher: -
fassungsdatum: 2026-10-14
datum: 2026-10-14
kunde: "⟦KUNDE-1⟧"
verdeckt: ja
stunden: ja
euro: nein
repo: "Workflow-Needs"  # Werkzeug, das den Auftrag erzeugt hat — nicht das Ziel
---

# Bauauftrag · Fassung 3

**Anlass:** Antworten aus dem Netz sollen geprüft sein, bevor eine KI sie liest; Installieren soll auf allen Geräten klappen  ·  **von:** Betrieb

**Vorhaben:** Angebote für Werbetechnik schnell und nachvollziehbar kalkulieren

**Gesamtauftrag:** keine frühere Fassung in diesem Auftrag — alles unter „Zu tun“ ist neu zu bauen. Das Datum der Fassung steht im Kopf (`fassungsdatum`), `datum` ist der Tag der Erzeugung.

## Rahmen
- Geräte: im Browser, Tablet, Android-Handy
- Ohne Internet: ja, immer
- Abgleich zwischen Geräten: ja, Abgleich ab und zu reicht
- Daten liegen: nur auf dem Gerät
- Sicherung: verschlüsselt, selbst anstoßen
- Eigene Programme: Dateien hin- und hergeben; Angebote an Mein WorkFloh, Tomys Hub und BookLedgerPro
- KI: über einen Dienst (nach Bestätigung)
- Schlägt vor, der Kunde bestätigt: B-14, B-15, B-22, B-23
- Nicht bauen: N-01 Keine Live-Versandtarife · N-02 Kein Marktpreis zählt, bevor er von Hand bestätigt ist

## Zu tun (für die Sitzung)
| Aktion | Kennung | Was | Größe | Stunden (Schätzung) | deckt Bedarf |
|---|---|---|---|---|---|
| NEU BAUEN | K-01 | Kalkulations-Kern: Zuschlagskalkulation, Mengenregeln, Satz-Ebenen, Rückrechnung, Katalog mit Arbeitsgebieten | groß | 57,5–115 | B-14 |
| NEU BAUEN | K-02 | Angebot und Kundenblatt aus der Freigabeliste, Versand nach Tariftabelle, Fassungen mit Vergleich | mittel | 26,4–48,4 | B-15, B-16, B-17 |
| NEU BAUEN | K-03 | Übergaben an Mein WorkFloh / Tomys WorkFloh und BookLedgerPro | mittel | 14–26 | B-18, B-40, B-41 |
| NEU BAUEN | K-04 | Verschlüsselte Sicherung in eine Datei, Zurückholen fügt hinzu | klein | 3,2–5,6 | B-19 |
| NEU BAUEN | K-05 | Anfrage einlesen (Mail/.eml), alte Angebote nach Ähnlichkeit, KI-Lesung nur verdeckt | mittel | 3,8–6 | B-20 |
| NEU BAUEN | K-06 | Nachkalkulation: Ist gegen Plan, Faktor je Vorlage ins Zeit-Muster | klein | 10–20 | B-21 |
| NEU BAUEN | K-07 | Handelsware: Einkaufsprodukte, Lieferanten-Vorschläge, Fremdfertigung | mittel | 24–44 | B-22 |
| NEU BAUEN | K-08 | Suche als Startseite: Frage → Produkt, Menge, Preis; lernt aus jeder bestätigten Antwort | mittel | 14–23,8 | B-23 |
| NEU BAUEN | K-09 | Staffelpreise für Zwischenmengen | klein | 10–20 | B-48 |
| NEU BAUEN | K-10 | Bedeutungssuche mit Modell vom eigenen Server und Rückfall | mittel | 8–13,6 | B-49 |
| NEU BAUEN | K-11 | SBKIM-Knoten mit Lampen, Siegel und Netz-Einstellung | mittel | 4,8–8 | B-50 |
| NEU BAUEN | K-12 | Prüfliste vor dem KI-Richter, Echtheit, Sperrliste und Bürgen aus dem Kanon | mittel | 2–3,2 | B-54 |
| NEU BAUEN | K-13 | Installieren-Knopf, Manifest-Kennung, Sicherheitsseite | klein | 2,4–4 | B-55, B-56 |

### Je Baustein: Vorlage und Abnahme
- K-01 · Faktoren Offline ×1,15
- K-02 · Faktoren Druck / PDF ×1,1
- K-04 · Vorlage Datei-Post (60 % wiederverwendet)
- K-05 · Vorlage Sende-Prüfer (70 % wiederverwendet) · Faktoren KI ×1,25
- K-08 · Vorlage Company Brain (30 % wiederverwendet)
- K-10 · Vorlage Company Brain (60 % wiederverwendet)
- K-11 · Vorlage Kimboard (60 % wiederverwendet)
- K-12 · Vorlage Auslieferungsprüfer (80 % wiederverwendet)
- K-13 · Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (60 % wiederverwendet)
- ohne Baustein (trotzdem abnehmen):
  - B-25: Das System muss als installierbare Web-App auf Tablet, Handy und PC laufen, offline, ohne Konto und ohne Server
  - B-26: Das System muss nach der Zuschlagskalkulation rechnen (MEK+MGK, FEK+FGK+Maschine, Herstellkosten, Verwaltung/Vertrieb, Gewinn, Skonto/Rabatt im Hundert) und Satz-Ebenen Position → Angebot → Kundenklasse → Vorlage → Arbeitsgebiet kennen
  - B-27: Das System muss Mengen nach Regeln rechnen (Stück, Fläche, Rolle, Platte, Länge) und eine fehlende Angabe als „nicht kalkuliert“ zeigen, nie als 0
  - B-28: Das System muss den günstigsten passenden Versand aus einer eigenen Tariftabelle wählen und sagen, wenn kein Tarif passt
  - B-29: Das System muss das Kundenblatt nur aus einer Freigabeliste bauen; Einkaufspreise, Sätze und Lieferanten verlassen das Haus nie
  - B-30: Das System muss ein gestelltes Angebot einfrieren und Änderungen nur als neue Fassung mit derselben Nummer zulassen
  - B-31: Das System muss Aufträge als Datei an Mein WorkFloh / Tomys WorkFloh und Angebote per Adresse an BookLedgerPro übergeben
  - B-32: Das System muss alles verschlüsselt in eine Datei sichern; Zurückholen fügt hinzu und überschreibt nie
  - B-33: Das System muss eine Anfrage offline lesen und nichts raten: Unerkanntes steht als „nicht erkannt“ da, der Entwurf bleibt ein Entwurf
  - B-34: Das System muss Marktpreise nur mit Quelle übernehmen und als „ungeprüft“ führen, bis der Nutzer bestätigt
  - B-51: Das System muss eine Zwischenmenge mit dem Stückpreis der nächstkleineren Staffel rechnen und den Rechenweg nennen
  - B-52: Das System muss das Sprachmodell erst auf Wunsch laden und sagen, woher es kam
  - B-57: Das System muss eine Antwort mit Anweisung an eine KI ausschließen und nicht an die KI geben

## Bedarfsprotokoll – Änderungen
- NEU B-01 [Bereich 1]: „Excel“
- NEU B-02 [Bereich 1]: „Preise im Kopf und auf Zetteln, jedes Angebot neu gerechnet“
- NEU B-03 [Bereich 1]: „E-Mail“
- NEU B-04 [Bereich 2]: „Auftrag“
- NEU B-05 [Bereich 2]: „Kundenkontakt“
- NEU B-06 [Bereich 3]: „Inhaber“
- NEU B-07 [Bereich 3]: „Mitarbeiter (Druck, Stick, Montage)“
- NEU B-08 [Bereich 3]: „Kunden (sehen nur das Angebot)“
- NEU B-09 [Bereich 4]: „Zeitverlust“
- NEU B-10 [Bereich 4]: „Preise schwanken je nach Tagesform, Material und Versand werden vergessen“
- NEU B-11 [Bereich 4]: „Kunden fragen per Mail, die Angaben müssen abgetippt werden“
- NEU B-12 [Bereich 5]: „Keine feste Kalkulation, jeder rechnet anders“
- NEU B-13 [Bereich 5]: „Angebot, Auftrag und Buchhaltung sind getrennte Welten“
- NEU B-14 [Bereich 6]: „Produkt wählen, Maße, Menge, Material eingeben — der Preis wird nach Zuschlagskalkulation gerechnet (Material, Arbeitszeit, Maschine, Gemeinkosten, Gewinn)“ (Muss, Nutzen: 6 h/Monat, Angebot in Minuten statt Stunden)
- NEU B-15 [Bereich 6]: „Angebot für den Kunden mit Leistung, Staffelpreisen, Versand und Summen; die Kalkulation bleibt intern“ (Muss, Nutzen: nichts Internes beim Kunden)
- NEU B-16 [Bereich 6]: „Verpackung und Versand werden automatisch dazugerechnet“ (Muss, Nutzen: 1 h/Monat)
- NEU B-17 [Bereich 6]: „Ein gestelltes Angebot ist eingefroren; Ändern ergibt eine neue Fassung mit Vergleich“ (Muss)
- NEU B-18 [Bereich 6]: „Angenommene Angebote gehen als Auftrag an den WorkFloh und als vorbefülltes Angebot in die Buchhaltung“ (Soll, Nutzen: 2 h/Monat, kein doppeltes Abtippen)
- NEU B-19 [Bereich 6]: „Alles offline auf dem Gerät, Sicherung als verschlüsselte Datei“ (Muss)
- NEU B-20 [Bereich 6]: „Eine Kundenanfrage (Mail) einlesen, Kunde und Mengen erkennen, Entwurf aus ähnlichen alten Angeboten“ (Soll, Nutzen: 2 h/Monat)
- NEU B-21 [Bereich 6]: „Nachkalkulation: Plan gegen Ist, die Zeiten lernen daraus“ (Soll, Nutzen: 1 h/Monat)
- NEU B-22 [Bereich 6]: „Handelsware (Zukauf) mit Einkaufspreis je Menge und eigenem Aufschlag“ (Soll)
- NEU B-23 [Bereich 6]: „Eine Frage eintippen („100 Tassen mit Logo“) und sofort Produkt, Menge und Preis sehen“ (Kann, Nutzen: 1 h/Monat)
- NEU B-48 [Bereich 6]: „Zwischenmengen aus der nächstkleineren Staffel rechnen statt offen lassen“ (Muss, Nutzen: 1 h/Monat)
- NEU B-49 [Bereich 6]: „Suche nach Bedeutung, Sprachmodell vom eigenen Server, mit Ladebalken“ (Soll)
- NEU B-50 [Bereich 6]: „Die App ist ein Knoten im eigenen Netz (öffentlich oder Firmennetz), ohne dass beim Laden etwas hinausgeht“ (Kann)
- NEU B-54 [Bereich 6]: „Fremde Antworten werden vor dem KI-Richter geprüft, Unterschriften und Sperrliste wirken“ (Muss)
- NEU B-55 [Bereich 6]: „Installieren-Knopf mit verständlicher Anleitung, eigene App-Kennung“ (Soll)
- NEU B-56 [Bereich 6]: „Eine Seite erklärt Mycel, Siegel und Schutz in einfachen Worten“ (Kann)
- NEU B-24 [Bereich 7]: „Jedes Angebot nach derselben Rechnung, in wenigen Minuten, vom Angebot bis zur Rechnung ohne Abtippen“
- NEU B-25 [Bereich 8]: „Das System muss als installierbare Web-App auf Tablet, Handy und PC laufen, offline, ohne Konto und ohne Server“
- NEU B-26 [Bereich 8]: „Das System muss nach der Zuschlagskalkulation rechnen (MEK+MGK, FEK+FGK+Maschine, Herstellkosten, Verwaltung/Vertrieb, Gewinn, Skonto/Rabatt im Hundert) und Satz-Ebenen Position → Angebot → Kundenklasse → Vorlage → Arbeitsgebiet kennen“
- NEU B-27 [Bereich 8]: „Das System muss Mengen nach Regeln rechnen (Stück, Fläche, Rolle, Platte, Länge) und eine fehlende Angabe als „nicht kalkuliert“ zeigen, nie als 0“
- NEU B-28 [Bereich 8]: „Das System muss den günstigsten passenden Versand aus einer eigenen Tariftabelle wählen und sagen, wenn kein Tarif passt“
- NEU B-29 [Bereich 8]: „Das System muss das Kundenblatt nur aus einer Freigabeliste bauen; Einkaufspreise, Sätze und Lieferanten verlassen das Haus nie“
- NEU B-30 [Bereich 8]: „Das System muss ein gestelltes Angebot einfrieren und Änderungen nur als neue Fassung mit derselben Nummer zulassen“
- NEU B-31 [Bereich 8]: „Das System muss Aufträge als Datei an Mein WorkFloh / Tomys WorkFloh und Angebote per Adresse an BookLedgerPro übergeben“
- NEU B-32 [Bereich 8]: „Das System muss alles verschlüsselt in eine Datei sichern; Zurückholen fügt hinzu und überschreibt nie“
- NEU B-33 [Bereich 8]: „Das System muss eine Anfrage offline lesen und nichts raten: Unerkanntes steht als „nicht erkannt“ da, der Entwurf bleibt ein Entwurf“
- NEU B-34 [Bereich 8]: „Das System muss Marktpreise nur mit Quelle übernehmen und als „ungeprüft“ führen, bis der Nutzer bestätigt“
- NEU B-51 [Bereich 8]: „Das System muss eine Zwischenmenge mit dem Stückpreis der nächstkleineren Staffel rechnen und den Rechenweg nennen“
- NEU B-52 [Bereich 8]: „Das System muss das Sprachmodell erst auf Wunsch laden und sagen, woher es kam“
- NEU B-57 [Bereich 8]: „Das System muss eine Antwort mit Anweisung an eine KI ausschließen und nicht an die KI geben“
- NEU B-35 [Bereich 9]: „Schulung: ⟦KUNDE-2⟧-Angebote und ⟦KUNDE-2⟧-Fragen zum Durchspielen statt Handbuch“
- NEU B-36 [Bereich 9]: „Rollen: der Inhaber pflegt Sätze und Katalog, Mitarbeiter tragen Ist-Zeiten nach“
- NEU B-37 [Bereich 10]: „Geräte“
- NEU B-38 [Bereich 10]: „offline“
- NEU B-39 [Bereich 11]: „Excel-Liste mit Preisen, Mein WorkFloh, BookLedgerPro“
- NEU B-40 [Bereich 12]: „Auftragsdatei für Mein WorkFloh und Tomys WorkFloh (Import dort)“
- NEU B-41 [Bereich 12]: „Übergabe an BookLedgerPro (Datenvertrag v1)“
- NEU B-53 [Bereich 12]: „SBKIM-Netz der eigenen Apps (Mycel, Siegel)“
- NEU B-42 [Bereich 13]: „Produktvorlagen, Materialien, Maschinen, Tarife, Kunden mit Klasse, Angebote, Bilder und Entwürfe“
- NEU B-43 [Bereich 14]: „personenbezogene Daten: ja“
- NEU B-44 [Bereich 14]: „Kundendaten gehen nie an eine KI; eine KI-Lesung der Anfrage nur verdeckt und auf ausdrücklichen Wunsch“
- NEU B-58 [Bereich 14]: „Schutz vor versteckten Anweisungen in fremden Antworten“
- NEU B-45 [Bereich 15]: „Vorgaben“
- NEU B-46 [Bereich 15]: „Startwerte sind Platzhalter, bis eigene Zahlen eingetragen sind“
- NEU B-47 [Bereich 15]: „Versandtarife aus eigener Tabelle, keine Live-Abfrage“
- NEU O-01 [Bereich 18]: „Eigene Stundensätze und Handlungskosten eintragen“

## Offene Punkte
- O-01: Eigene Stundensätze und Handlungskosten eintragen (klärt Inhaber bis 2026-10-20)

## Summe
Stunden F3 245,8–463,9 · Kosten-Nutzen: Grenzlinie keine

Die Summe enthält zusätzlich zu den Zeilen: Anpassung an den Betrieb 2–6 h, Abstimmung 15 % (27,3–51,5 h), Puffer 20 % (36,4–68,7 h).

## Erklärungen und Sterne
- Verschwiegenheitserklärung aktiviert: nein · Vereinbarung Zahlung/Rechte aktiviert: nein · Wartungsvertrag aktiviert: nein
- Sterne B-14: beim Bedarf Ø 4 (3) · bei der Abnahme Ø 4,7 (3)
- Sterne B-15: beim Bedarf Ø 4,5 (2) · bei der Abnahme Ø 4,5 (2)
- Sterne B-18: beim Bedarf Ø 4 (2) · bei der Abnahme Ø 4,5 (2)
- Sterne B-20: beim Bedarf Ø 4 (2) · bei der Abnahme Ø 3,5 (2)
- Sterne B-21: beim Bedarf Ø 3 (2) · bei der Abnahme Ø 4 (2)
- Sterne B-23: beim Bedarf Ø 3 (2) · bei der Abnahme Ø 4,5 (2)

## Vollständiger Stand (zum Einlesen)
```json
{"bedarf":[{"id":"B-01","nr":1,"text":"Excel","sichtbar":true},{"id":"B-02","nr":1,"text":"Preise im Kopf und auf Zetteln, jedes Angebot neu gerechnet","sichtbar":true},{"id":"B-03","nr":1,"text":"E-Mail","sichtbar":true},{"id":"B-04","nr":2,"text":"Auftrag","sichtbar":true},{"id":"B-05","nr":2,"text":"Kundenkontakt","sichtbar":true},{"id":"B-06","nr":3,"text":"Inhaber","sichtbar":true,"anzahl":1},{"id":"B-07","nr":3,"text":"Mitarbeiter (Druck, Stick, Montage)","sichtbar":true,"anzahl":3},{"id":"B-08","nr":3,"text":"Kunden (sehen nur das Angebot)","sichtbar":true,"anzahl":1},{"id":"B-09","nr":4,"text":"Zeitverlust","sichtbar":true},{"id":"B-10","nr":4,"text":"Preise schwanken je nach Tagesform, Material und Versand werden vergessen","sichtbar":true},{"id":"B-11","nr":4,"text":"Kunden fragen per Mail, die Angaben müssen abgetippt werden","sichtbar":true},{"id":"B-12","nr":5,"text":"Keine feste Kalkulation, jeder rechnet anders","sichtbar":true},{"id":"B-13","nr":5,"text":"Angebot, Auftrag und Buchhaltung sind getrennte Welten","sichtbar":true},{"id":"B-14","nr":6,"text":"Produkt wählen, Maße, Menge, Material eingeben — der Preis wird nach Zuschlagskalkulation gerechnet (Material, Arbeitszeit, Maschine, Gemeinkosten, Gewinn)","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":6,"text":"Angebot in Minuten statt Stunden"},"handeln":"vorschlagen"},{"id":"B-15","nr":6,"text":"Angebot für den Kunden mit Leistung, Staffelpreisen, Versand und Summen; die Kalkulation bleibt intern","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"nichts Internes beim Kunden"},"handeln":"vorschlagen"},{"id":"B-16","nr":6,"text":"Verpackung und Versand werden automatisch dazugerechnet","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-17","nr":6,"text":"Ein gestelltes Angebot ist eingefroren; Ändern ergibt eine neue Fassung mit Vergleich","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-18","nr":6,"text":"Angenommene Angebote gehen als Auftrag an den WorkFloh und als vorbefülltes Angebot in die Buchhaltung","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":2,"text":"kein doppeltes Abtippen"}},{"id":"B-19","nr":6,"text":"Alles offline auf dem Gerät, Sicherung als verschlüsselte Datei","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-20","nr":6,"text":"Eine Kundenanfrage (Mail) einlesen, Kunde und Mengen erkennen, Entwurf aus ähnlichen alten Angeboten","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":2,"text":""}},{"id":"B-21","nr":6,"text":"Nachkalkulation: Plan gegen Ist, die Zeiten lernen daraus","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-22","nr":6,"text":"Handelsware (Zukauf) mit Einkaufspreis je Menge und eigenem Aufschlag","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""},"handeln":"vorschlagen"},{"id":"B-23","nr":6,"text":"Eine Frage eintippen („100 Tassen mit Logo“) und sofort Produkt, Menge und Preis sehen","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":1,"text":""},"handeln":"vorschlagen"},{"id":"B-48","nr":6,"text":"Zwischenmengen aus der nächstkleineren Staffel rechnen statt offen lassen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-49","nr":6,"text":"Suche nach Bedeutung, Sprachmodell vom eigenen Server, mit Ladebalken","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-50","nr":6,"text":"Die App ist ein Knoten im eigenen Netz (öffentlich oder Firmennetz), ohne dass beim Laden etwas hinausgeht","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-54","nr":6,"text":"Fremde Antworten werden vor dem KI-Richter geprüft, Unterschriften und Sperrliste wirken","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-55","nr":6,"text":"Installieren-Knopf mit verständlicher Anleitung, eigene App-Kennung","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-56","nr":6,"text":"Eine Seite erklärt Mycel, Siegel und Schutz in einfachen Worten","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-24","nr":7,"text":"Jedes Angebot nach derselben Rechnung, in wenigen Minuten, vom Angebot bis zur Rechnung ohne Abtippen","sichtbar":true},{"id":"B-25","nr":8,"text":"Das System muss als installierbare Web-App auf Tablet, Handy und PC laufen, offline, ohne Konto und ohne Server","sichtbar":true},{"id":"B-26","nr":8,"text":"Das System muss nach der Zuschlagskalkulation rechnen (MEK+MGK, FEK+FGK+Maschine, Herstellkosten, Verwaltung/Vertrieb, Gewinn, Skonto/Rabatt im Hundert) und Satz-Ebenen Position → Angebot → Kundenklasse → Vorlage → Arbeitsgebiet kennen","sichtbar":true},{"id":"B-27","nr":8,"text":"Das System muss Mengen nach Regeln rechnen (Stück, Fläche, Rolle, Platte, Länge) und eine fehlende Angabe als „nicht kalkuliert“ zeigen, nie als 0","sichtbar":true},{"id":"B-28","nr":8,"text":"Das System muss den günstigsten passenden Versand aus einer eigenen Tariftabelle wählen und sagen, wenn kein Tarif passt","sichtbar":true},{"id":"B-29","nr":8,"text":"Das System muss das Kundenblatt nur aus einer Freigabeliste bauen; Einkaufspreise, Sätze und Lieferanten verlassen das Haus nie","sichtbar":true},{"id":"B-30","nr":8,"text":"Das System muss ein gestelltes Angebot einfrieren und Änderungen nur als neue Fassung mit derselben Nummer zulassen","sichtbar":true},{"id":"B-31","nr":8,"text":"Das System muss Aufträge als Datei an Mein WorkFloh / Tomys WorkFloh und Angebote per Adresse an BookLedgerPro übergeben","sichtbar":true},{"id":"B-32","nr":8,"text":"Das System muss alles verschlüsselt in eine Datei sichern; Zurückholen fügt hinzu und überschreibt nie","sichtbar":true},{"id":"B-33","nr":8,"text":"Das System muss eine Anfrage offline lesen und nichts raten: Unerkanntes steht als „nicht erkannt“ da, der Entwurf bleibt ein Entwurf","sichtbar":true},{"id":"B-34","nr":8,"text":"Das System muss Marktpreise nur mit Quelle übernehmen und als „ungeprüft“ führen, bis der Nutzer bestätigt","sichtbar":true},{"id":"B-51","nr":8,"text":"Das System muss eine Zwischenmenge mit dem Stückpreis der nächstkleineren Staffel rechnen und den Rechenweg nennen","sichtbar":true},{"id":"B-52","nr":8,"text":"Das System muss das Sprachmodell erst auf Wunsch laden und sagen, woher es kam","sichtbar":true},{"id":"B-57","nr":8,"text":"Das System muss eine Antwort mit Anweisung an eine KI ausschließen und nicht an die KI geben","sichtbar":true},{"id":"B-35","nr":9,"text":"Schulung: ⟦KUNDE-2⟧-Angebote und ⟦KUNDE-2⟧-Fragen zum Durchspielen statt Handbuch","sichtbar":true},{"id":"B-36","nr":9,"text":"Rollen: der Inhaber pflegt Sätze und Katalog, Mitarbeiter tragen Ist-Zeiten nach","sichtbar":true},{"id":"B-37","nr":10,"text":"Geräte","sichtbar":true},{"id":"B-38","nr":10,"text":"offline","sichtbar":true},{"id":"B-39","nr":11,"text":"Excel-Liste mit Preisen, Mein WorkFloh, BookLedgerPro","sichtbar":true},{"id":"B-40","nr":12,"text":"Auftragsdatei für Mein WorkFloh und Tomys WorkFloh (Import dort)","sichtbar":true},{"id":"B-41","nr":12,"text":"Übergabe an BookLedgerPro (Datenvertrag v1)","sichtbar":true},{"id":"B-53","nr":12,"text":"SBKIM-Netz der eigenen Apps (Mycel, Siegel)","sichtbar":true},{"id":"B-42","nr":13,"text":"Produktvorlagen, Materialien, Maschinen, Tarife, Kunden mit Klasse, Angebote, Bilder und Entwürfe","sichtbar":true},{"id":"B-43","nr":14,"text":"personenbezogene Daten: ja","sichtbar":true},{"id":"B-44","nr":14,"text":"Kundendaten gehen nie an eine KI; eine KI-Lesung der Anfrage nur verdeckt und auf ausdrücklichen Wunsch","sichtbar":true},{"id":"B-58","nr":14,"text":"Schutz vor versteckten Anweisungen in fremden Antworten","sichtbar":true},{"id":"B-45","nr":15,"text":"Vorgaben","sichtbar":true},{"id":"B-46","nr":15,"text":"Startwerte sind Platzhalter, bis eigene Zahlen eingetragen sind","sichtbar":true},{"id":"B-47","nr":15,"text":"Versandtarife aus eigener Tabelle, keine Live-Abfrage","sichtbar":true},{"id":"O-01","nr":18,"text":"Eigene Stundensätze und Handlungskosten eintragen","sichtbar":true,"wer":"Inhaber","bis":"2026-10-20"}],"bausteine":[{"id":"K-01","katalog":"neu","name":"Kalkulations-Kern: Zuschlagskalkulation, Mengenregeln, Satz-Ebenen, Rückrechnung, Katalog mit Arbeitsgebieten","menge":1,"groesse":"gross","faktoren":["offline"],"deckt":["B-14"],"ermaessigt":false},{"id":"K-02","katalog":"neu","name":"Angebot und Kundenblatt aus der Freigabeliste, Versand nach Tariftabelle, Fassungen mit Vergleich","menge":1,"groesse":"mittel","faktoren":["druck"],"deckt":["B-15","B-16","B-17"],"ermaessigt":false},{"id":"K-03","katalog":"schnitt","name":"Übergaben an Mein WorkFloh / Tomys WorkFloh und BookLedgerPro","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-18","B-40","B-41"],"ermaessigt":false},{"id":"K-04","katalog":"datei","name":"Verschlüsselte Sicherung in eine Datei, Zurückholen fügt hinzu","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-19"],"ermaessigt":false},{"id":"K-05","katalog":"kipruef","name":"Anfrage einlesen (Mail/.eml), alte Angebote nach Ähnlichkeit, KI-Lesung nur verdeckt","menge":1,"groesse":"mittel","faktoren":["ki"],"deckt":["B-20"],"ermaessigt":false},{"id":"K-06","katalog":"neu","name":"Nachkalkulation: Ist gegen Plan, Faktor je Vorlage ins Zeit-Muster","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-21"],"ermaessigt":false},{"id":"K-07","katalog":"neu","name":"Handelsware: Einkaufsprodukte, Lieferanten-Vorschläge, Fremdfertigung","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-22"],"ermaessigt":false},{"id":"K-08","katalog":"suche","name":"Suche als Startseite: Frage → Produkt, Menge, Preis; lernt aus jeder bestätigten Antwort","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-23"],"ermaessigt":false},{"id":"K-09","katalog":"neu","name":"Staffelpreise für Zwischenmengen","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-48"],"ermaessigt":false},{"id":"K-10","katalog":"suche","name":"Bedeutungssuche mit Modell vom eigenen Server und Rückfall","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-49"],"ermaessigt":false},{"id":"K-11","katalog":"pinnwand","name":"SBKIM-Knoten mit Lampen, Siegel und Netz-Einstellung","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-50"],"ermaessigt":false},{"id":"K-12","katalog":"dateipruef","name":"Prüfliste vor dem KI-Richter, Echtheit, Sperrliste und Bürgen aus dem Kanon","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-54"],"ermaessigt":false},{"id":"K-13","katalog":"seite","name":"Installieren-Knopf, Manifest-Kennung, Sicherheitsseite","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-55","B-56"],"ermaessigt":false}],"rahmen":{"eigeneText":"Angebote an Mein WorkFloh, Tomys Hub und BookLedgerPro","geraete":["browser","tablet","android"],"offline":"immer","abgleich":"abundzu","eigene":["hinher"],"datenort":["geraet"],"sicherung":["verschluesselt","selbst"],"ki":"dienst"},"nicht":[{"id":"N-01","text":"Keine Live-Versandtarife","sichtbar":true},{"id":"N-02","text":"Kein Marktpreis zählt, bevor er von Hand bestätigt ist","sichtbar":true}]}
```
