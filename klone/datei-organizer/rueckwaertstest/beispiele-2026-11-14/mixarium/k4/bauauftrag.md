---
art: bauauftrag
format: 1
vorgang: V-2026-0001
fassung: 4
vorher: -
fassungsdatum: 2026-09-10
datum: 2026-09-10
kunde: "⟦KUNDE-1⟧"
verdeckt: ja
stunden: ja
euro: nein
repo: "Workflow-Needs"  # Werkzeug, das den Auftrag erzeugt hat — nicht das Ziel
---

# Bauauftrag · Fassung 4

**Anlass:** Rezepte aus der Schwester-App kamen ohne Platz an; Getränke sollen Bilder per KI bekommen, Fotos und PDFs vor der KI gereinigt werden  ·  **von:** Kunde

**Vorhaben:** Getränke-Rezepte für Bar und Zuhause als App ohne Server

**Gesamtauftrag:** keine frühere Fassung in diesem Auftrag — alles unter „Zu tun“ ist neu zu bauen. Das Datum der Fassung steht im Kopf (`fassungsdatum`), `datum` ist der Tag der Erzeugung.

## Rahmen
- Geräte: Android-Handy, iPhone, Tablet, im Browser
- Ohne Internet: ja, immer
- Abgleich zwischen Geräten: nein, ein Gerät reicht
- Daten liegen: nur auf dem Gerät
- Sicherung: selbst anstoßen, von allein
- Eigene Programme: Dateien hin- und hergeben; Rezepte mit Mein Rezeptbuch austauschen
- KI: über einen Dienst (nach Bestätigung)
- Nicht bauen: N-01 Kein Konto und keine Anmeldung beim Hersteller

## Zu tun (für die Sitzung)
| Aktion | Kennung | Was | Größe | Stunden (Schätzung) | deckt Bedarf |
|---|---|---|---|---|---|
| NEU BAUEN | K-01 | Getränke-Rezeptbuch: Kategorien, Zutaten, Schritte, Bilder mit Ausschnitt, Sterne, Suche, Karussell | groß | 7,4–12,9 | B-13 |
| NEU BAUEN | K-02 | Installierbare Web-App mit Offline-Vorrat, Themen und Startanimation | mittel | 6–10 | B-14 |
| NEU BAUEN | K-03 | KI-Labor: Vorschlag, Bewertung in vier Punkten, Übernahme ins Buch | mittel | 3,8–6 | B-15 |
| NEU BAUEN | K-04 | Wochenplan, Menü, Einkaufsliste | mittel | 26,4–48,4 | B-16 |
| NEU BAUEN | K-05 | Acht Sprachen mit Prüfskript | klein | 12–24 | B-17 |
| NEU BAUEN | K-06 | Bekannte Drinks entdecken (offene Getränke-Datenbank) | klein | 6–12 | B-18, B-32 |
| NEU BAUEN | K-07 | Export und Import als Datei | klein | 4–8 | B-19 |
| NEU BAUEN | K-08 | Bedeutungssuche über die Getränke, Modell auf dem Gerät | mittel | 12–20,4 | B-39 |
| NEU BAUEN | K-09 | Netz-Knoten: Spore, Siegel, Lampen, Rendezvous über eigenes Relais | groß | 39–78 | B-40, B-43 |
| NEU BAUEN | K-10 | KI-Scan und Texterkennung von Fotos und Handschrift, Stapel | mittel | 4,5–7,5 | B-44 |
| NEU BAUEN | K-11 | Schlüssel-Tresor, Anbieterwahl, KI-Richter mit Prüfliste | mittel | 3–4,8 | B-45 |
| NEU BAUEN | K-12 | Spracheingabe in der Suche | klein | 10–20 | B-46 |
| NEU BAUEN | K-13 | Ladezeit: Bilder als Datei, Netz-Module erst nach dem Laden | klein | 4–8 | B-47 |
| NEU BAUEN | K-14 | Kategorien verwalten: umbenennen, Symbol, löschen, zusammenlegen, ziehen, Zuordnen aus der Zeile | mittel | 24–44 | B-50 |
| NEU BAUEN | K-15 | KI-Bilder fürs Getränk, Kamerafoto verkleinern | mittel | 3,8–6 | B-51 |
| NEU BAUEN | K-16 | Herkunft und feste Kennung am Getränk beim Import | klein | 4–8 | B-52 |
| NEU BAUEN | K-17 | Reinigung vor der KI und Datei prüfen auf Knopfdruck | mittel | 3–4,8 | B-53 |
| NEU BAUEN | K-18 | Installieren oben und in den Einstellungen, eigene App-Kennung | klein | 3–5 | B-54 |

### Je Baustein: Vorlage und Abnahme
- K-01 · Vorlage Küchenzettel (60 % wiederverwendet) · Faktoren Offline ×1,15
- K-02 · Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 % wiederverwendet)
- K-03 · Vorlage Sende-Prüfer (70 % wiederverwendet) · Faktoren KI ×1,25
- K-04 · Faktoren Druck / PDF ×1,1
- K-05 · Faktoren Mehrsprachig ×1,2
- K-08 · Vorlage Company Brain (40 % wiederverwendet)
- K-09 · Faktoren Mehrere Nutzer ×1,3
- K-10 · Vorlage Workflow PDF (70 % wiederverwendet) · Faktoren KI ×1,25
- K-11 · Vorlage Sende-Prüfer (70 % wiederverwendet)
- K-13 · Vorlage – (60 % wiederverwendet)
- K-15 · Vorlage Sende-Prüfer (70 % wiederverwendet) · Faktoren KI ×1,25
- K-17 · Vorlage Auslieferungsprüfer (70 % wiederverwendet)
- K-18 · Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 % wiederverwendet)
- ohne Baustein (trotzdem abnehmen):
  - B-21: Das System muss als installierbare Web-App ohne Server laufen und nach dem ersten Öffnen vollständig offline arbeiten
  - B-22: Das System muss Getränke mit Kategorie, Zutaten (Menge, Einheit), Schritten, Glastyp, Alkoholangabe, Portionen, Zeit und Sternebewertung führen
  - B-23: Das System muss die Daten nur im Browser des Geräts speichern und als Datei exportieren und wieder einlesen
  - B-24: Das System muss im Labor aus Kategorie, Geschmack und Zutaten einen Vorschlag einer KI holen, der zuerst als experimentell gilt und nach Bewertung ins Buch übernommen oder verworfen wird
  - B-25: Das System muss einen alkoholfreien Modus haben, der Getränke mit Alkohol ausblendet
  - B-26: Das System muss Wochenplan, Menüansicht und Einkaufsliste aus den Rezepten erzeugen
  - B-27: Das System muss acht Sprachen und mehrere Farbthemen anbieten
  - B-41: Das System muss eine eigene, signierte Kennung (Spore) führen und ihre Beschreibung im Siegel zeigen
  - B-42: Das System muss sich nur auf Wunsch über ein Relais verbinden; beim Laden geht nichts ins Netz
  - B-48: Das System muss für Scan und Texterkennung den Anbieter wählen lassen (Anthropic oder Mistral EU) und nur auf Tipp senden
  - B-49: Das System muss fremde Antworten aus dem Netz nur mit Prüfung an einen KI-Richter geben
  - B-55: Das System muss eine Kategorie nur über ihre Kennung zuordnen; Umbenennen ändert nur die Beschriftung
  - B-56: Das System muss PDFs als gereinigte Seitenbilder an eine KI geben und vorher einmal anhalten, wenn etwas entfernt wird
  - B-57: Das System muss eine eigene App-Kennung tragen, damit es neben den Schwester-Apps installierbar bleibt
  - B-58: Das System muss als installierbare Web-App in einer einzigen Datei ohne Bau-Schritt laufen und nach dem ersten Öffnen ganz ohne Internet
  - B-59: Das System muss die Oberfläche in acht Sprachen zeigen: Deutsch, Englisch, Russisch, Chinesisch, Spanisch, Französisch, Italienisch, Portugiesisch
  - B-60: Das System muss die Getränke in feste Kategorien einteilen (Smoothies und Shakes, Mocktails, alkoholfreie Cocktails, Limonaden, Tees und Kaffees, Cocktails, Bowlen), umbenennbar
  - B-61: Das System muss von selbst Sicherungsstände in einem Tresor auf dem Gerät anlegen, aus dem man frühere Stände zurückholen, exportieren oder löschen kann
  - B-62: Das System muss die Sammlung als Datei exportieren und wieder einlesen, wahlweise ersetzend oder ergänzend, mitsamt Ordnern
  - B-63: Das System muss KI nur mit dem eigenen Schlüssel des Nutzers nutzen (Claude, Mistral oder OpenAI); ohne Schlüssel läuft alles andere weiter

## Bedarfsprotokoll – Änderungen
- NEU B-01 [Bereich 1]: „Papier“
- NEU B-02 [Bereich 1]: „Rezeptkarten hinter der Theke, Fotos im Handy, eine Rezeptbuch-App fürs Essen“
- NEU B-03 [Bereich 2]: „Dokumente“
- NEU B-04 [Bereich 2]: „Einkauf der Zutaten und Wochenkarte“
- NEU B-05 [Bereich 3]: „⟦KUNDE-2⟧“
- NEU B-06 [Bereich 3]: „Mitarbeiter an der Theke“
- NEU B-07 [Bereich 3]: „Gäste (sehen die Karte, nutzen die App nicht selbst)“
- NEU B-08 [Bereich 4]: „fehlende Übersicht“
- NEU B-09 [Bereich 4]: „Rezepte werden je nach Schicht anders gemischt“
- NEU B-10 [Bereich 4]: „neue alkoholfreie Getränke zu erfinden kostet viel Probierzeit“
- NEU B-11 [Bereich 5]: „Rezepte liegen verstreut, ohne feste Mengen und ohne Bild“
- NEU B-12 [Bereich 5]: „vorhandene Rezept-Apps sind fürs Essen gebaut, nicht für Getränke“
- NEU B-13 [Bereich 6]: „Alle Getränkerezepte an einem Ort: Mocktails, Smoothies, Cocktails, Limonaden, Tees, Sirupe, mit Zutaten, Mengen, Schritten, Glas und Bild“ (Muss, Nutzen: 6 h/Monat, jede Schicht mischt gleich)
- NEU B-14 [Bereich 6]: „Läuft auf Handy und Tablet hinter der Theke, auch ohne Internet, ohne Konto“ (Muss, Nutzen: kein WLAN an der Theke nötig)
- NEU B-15 [Bereich 6]: „Ein Labor schlägt neue Getränke nach Geschmack und vorhandenen Zutaten vor; wir bewerten und übernehmen die guten“ (Soll, Nutzen: 3 h/Monat, weniger Probierzeit)
- NEU B-16 [Bereich 6]: „Wochenplan, Menü zum Zeigen und Einkaufsliste aus den Rezepten“ (Soll, Nutzen: 2 h/Monat)
- NEU B-17 [Bereich 6]: „Oberfläche in mehreren Sprachen, weil das Team gemischt ist“ (Soll)
- NEU B-18 [Bereich 6]: „Bekannte Drinks aus einer offenen Sammlung übernehmen“ (Kann)
- NEU B-19 [Bereich 6]: „Export und Import der Rezepte als Datei“ (Muss, Nutzen: nichts geht beim Gerätewechsel verloren)
- NEU B-39 [Bereich 6]: „Suche nach Bedeutung („etwas Fruchtiges ohne Zucker“), auf dem Gerät“ (Soll, Nutzen: 1 h/Monat)
- NEU B-40 [Bereich 6]: „Die App findet andere Apps des Hauses (Rezeptbuch, Marktplatz) und antwortet ihnen, mit eigener Kennung und Siegel“ (Soll)
- NEU B-44 [Bereich 6]: „Rezeptkarte oder Handschrift fotografieren, Text wird gelesen und als Getränk vorgeschlagen“ (Muss, Nutzen: 3 h/Monat, kein Abtippen)
- NEU B-45 [Bereich 6]: „KI-Schlüssel verschlüsselt merken, Anbieter wählbar (auch EU)“ (Soll)
- NEU B-46 [Bereich 6]: „Suchen per Spracheingabe, wenn die Hände nass sind“ (Kann)
- NEU B-47 [Bereich 6]: „Schneller Start am Handy“ (Soll)
- NEU B-50 [Bereich 6]: „Eigene Kategorien: umbenennen, mit Symbol, löschen, zusammenlegen, verschieben; fremde Kategorien gehen nicht verloren“ (Muss, Nutzen: 1 h/Monat)
- NEU B-51 [Bereich 6]: „Bild zu einem Getränk per KI erzeugen; Kamerafotos werden verkleinert statt abgewiesen“ (Soll, Nutzen: 1 h/Monat)
- NEU B-52 [Bereich 6]: „Beim Austausch mit der Schwester-App bleibt die Herkunft am Getränk, keine Doppel“ (Soll)
- NEU B-53 [Bereich 6]: „Versteckter Text und Bild-Metadaten werden vor dem Senden an eine KI entfernt, Dateien lassen sich auf Knopfdruck prüfen“ (Muss)
- NEU B-54 [Bereich 6]: „Installieren-Knopf oben und in den Einstellungen“ (Kann)
- NEU B-20 [Bereich 7]: „Jedes Getränk ist in Sekunden mit Bild und Mengen gefunden, neue Ideen kommen aus dem Labor“
- NEU B-21 [Bereich 8]: „Das System muss als installierbare Web-App ohne Server laufen und nach dem ersten Öffnen vollständig offline arbeiten“
- NEU B-22 [Bereich 8]: „Das System muss Getränke mit Kategorie, Zutaten (Menge, Einheit), Schritten, Glastyp, Alkoholangabe, Portionen, Zeit und Sternebewertung führen“
- NEU B-23 [Bereich 8]: „Das System muss die Daten nur im Browser des Geräts speichern und als Datei exportieren und wieder einlesen“
- NEU B-24 [Bereich 8]: „Das System muss im Labor aus Kategorie, Geschmack und Zutaten einen Vorschlag einer KI holen, der zuerst als experimentell gilt und nach Bewertung ins Buch übernommen oder verworfen wird“
- NEU B-25 [Bereich 8]: „Das System muss einen alkoholfreien Modus haben, der Getränke mit Alkohol ausblendet“
- NEU B-26 [Bereich 8]: „Das System muss Wochenplan, Menüansicht und Einkaufsliste aus den Rezepten erzeugen“
- NEU B-27 [Bereich 8]: „Das System muss acht Sprachen und mehrere Farbthemen anbieten“
- NEU B-41 [Bereich 8]: „Das System muss eine eigene, signierte Kennung (Spore) führen und ihre Beschreibung im Siegel zeigen“
- NEU B-42 [Bereich 8]: „Das System muss sich nur auf Wunsch über ein Relais verbinden; beim Laden geht nichts ins Netz“
- NEU B-48 [Bereich 8]: „Das System muss für Scan und Texterkennung den Anbieter wählen lassen (Anthropic oder Mistral EU) und nur auf Tipp senden“
- NEU B-49 [Bereich 8]: „Das System muss fremde Antworten aus dem Netz nur mit Prüfung an einen KI-Richter geben“
- NEU B-55 [Bereich 8]: „Das System muss eine Kategorie nur über ihre Kennung zuordnen; Umbenennen ändert nur die Beschriftung“
- NEU B-56 [Bereich 8]: „Das System muss PDFs als gereinigte Seitenbilder an eine KI geben und vorher einmal anhalten, wenn etwas entfernt wird“
- NEU B-57 [Bereich 8]: „Das System muss eine eigene App-Kennung tragen, damit es neben den Schwester-Apps installierbar bleibt“
- NEU B-58 [Bereich 8]: „Das System muss als installierbare Web-App in einer einzigen Datei ohne Bau-Schritt laufen und nach dem ersten Öffnen ganz ohne Internet“
- NEU B-59 [Bereich 8]: „Das System muss die Oberfläche in acht Sprachen zeigen: Deutsch, Englisch, Russisch, Chinesisch, Spanisch, Französisch, Italienisch, Portugiesisch“
- NEU B-60 [Bereich 8]: „Das System muss die Getränke in feste Kategorien einteilen (Smoothies und Shakes, Mocktails, alkoholfreie Cocktails, Limonaden, Tees und Kaffees, Cocktails, Bowlen), umbenennbar“
- NEU B-61 [Bereich 8]: „Das System muss von selbst Sicherungsstände in einem Tresor auf dem Gerät anlegen, aus dem man frühere Stände zurückholen, exportieren oder löschen kann“
- NEU B-62 [Bereich 8]: „Das System muss die Sammlung als Datei exportieren und wieder einlesen, wahlweise ersetzend oder ergänzend, mitsamt Ordnern“
- NEU B-63 [Bereich 8]: „Das System muss KI nur mit dem eigenen Schlüssel des Nutzers nutzen (Claude, Mistral oder OpenAI); ohne Schlüssel läuft alles andere weiter“
- NEU B-28 [Bereich 9]: „für Thekenpersonal ohne Technikwissen; Bedienungsanleitung in der App“
- NEU B-29 [Bereich 10]: „Geräte“
- NEU B-30 [Bereich 10]: „offline“
- NEU B-31 [Bereich 11]: „Rezeptbuch-App für Essen (dient als Vorlage)“
- NEU B-32 [Bereich 12]: „offene Getränke-Datenbank im Netz (nur beim Entdecken, nur lesend)“
- NEU B-43 [Bereich 12]: „Netz der Schwester-Apps über ein eigenes Relais“
- NEU B-33 [Bereich 13]: „Rezepte, Zutaten, Fotos, Bewertungen“
- NEU B-34 [Bereich 14]: „personenbezogene Daten: nein“
- NEU B-35 [Bereich 14]: „KI-Schlüssel nur im Gerät, nie im Quelltext“
- NEU B-36 [Bereich 15]: „Vorgaben“
- NEU B-37 [Bereich 15]: „kein Abo, keine Werbung; Jugendschutz: alkoholfreier Modus“
- NEU B-38 [Bereich 15]: „bewusst nicht: Konto, Server-Abgleich, Bezahlvorgang; nur Web-App, keine eigene iPhone- oder Windows-App“
- NEU O-02 [Bereich 18]: „Darf das Labor Bilder bei einem Bild-Dienst bestellen?“

## Offene Punkte
- O-02: Darf das Labor Bilder bei einem Bild-Dienst bestellen? (klärt ⟦KUNDE-2⟧ bis 2026-09-20)

## Summe
Stunden F4 240–450,6 · Kosten-Nutzen: Grenzlinie keine

Die Summe enthält zusätzlich zu den Zeilen: Anpassung an den Betrieb 2–6 h, Abstimmung 15 % (26,7–50,1 h), Puffer 20 % (35,6–66,8 h).

## Erklärungen und Sterne
- Verschwiegenheitserklärung aktiviert: nein · Vereinbarung Zahlung/Rechte aktiviert: nein · Wartungsvertrag aktiviert: nein
- Sterne B-13: beim Bedarf Ø 4,3 (3) · bei der Abnahme Ø 5 (3)
- Sterne B-14: beim Bedarf Ø 4,5 (2) · bei der Abnahme Ø 5 (2)
- Sterne B-15: beim Bedarf Ø 3,3 (3) · bei der Abnahme Ø 3,7 (3)
- Sterne B-16: beim Bedarf Ø 3,5 (2) · bei der Abnahme Ø 4 (2)
- Sterne B-44: beim Bedarf Ø 4 (2) · bei der Abnahme Ø 4,5 (2)
- Sterne B-50: beim Bedarf Ø 3,5 (2) · bei der Abnahme Ø 4,5 (2)

## Vollständiger Stand (zum Einlesen)
```json
{"bedarf":[{"id":"B-01","nr":1,"text":"Papier","sichtbar":true},{"id":"B-02","nr":1,"text":"Rezeptkarten hinter der Theke, Fotos im Handy, eine Rezeptbuch-App fürs Essen","sichtbar":true},{"id":"B-03","nr":2,"text":"Dokumente","sichtbar":true},{"id":"B-04","nr":2,"text":"Einkauf der Zutaten und Wochenkarte","sichtbar":true},{"id":"B-05","nr":3,"text":"⟦KUNDE-2⟧","sichtbar":true,"anzahl":1},{"id":"B-06","nr":3,"text":"Mitarbeiter an der Theke","sichtbar":true,"anzahl":2},{"id":"B-07","nr":3,"text":"Gäste (sehen die Karte, nutzen die App nicht selbst)","sichtbar":true,"anzahl":1},{"id":"B-08","nr":4,"text":"fehlende Übersicht","sichtbar":true},{"id":"B-09","nr":4,"text":"Rezepte werden je nach Schicht anders gemischt","sichtbar":true},{"id":"B-10","nr":4,"text":"neue alkoholfreie Getränke zu erfinden kostet viel Probierzeit","sichtbar":true},{"id":"B-11","nr":5,"text":"Rezepte liegen verstreut, ohne feste Mengen und ohne Bild","sichtbar":true},{"id":"B-12","nr":5,"text":"vorhandene Rezept-Apps sind fürs Essen gebaut, nicht für Getränke","sichtbar":true},{"id":"B-13","nr":6,"text":"Alle Getränkerezepte an einem Ort: Mocktails, Smoothies, Cocktails, Limonaden, Tees, Sirupe, mit Zutaten, Mengen, Schritten, Glas und Bild","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":6,"text":"jede Schicht mischt gleich"}},{"id":"B-14","nr":6,"text":"Läuft auf Handy und Tablet hinter der Theke, auch ohne Internet, ohne Konto","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"kein WLAN an der Theke nötig"}},{"id":"B-15","nr":6,"text":"Ein Labor schlägt neue Getränke nach Geschmack und vorhandenen Zutaten vor; wir bewerten und übernehmen die guten","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":3,"text":"weniger Probierzeit"}},{"id":"B-16","nr":6,"text":"Wochenplan, Menü zum Zeigen und Einkaufsliste aus den Rezepten","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":2,"text":""}},{"id":"B-17","nr":6,"text":"Oberfläche in mehreren Sprachen, weil das Team gemischt ist","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-18","nr":6,"text":"Bekannte Drinks aus einer offenen Sammlung übernehmen","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-19","nr":6,"text":"Export und Import der Rezepte als Datei","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"nichts geht beim Gerätewechsel verloren"}},{"id":"B-39","nr":6,"text":"Suche nach Bedeutung („etwas Fruchtiges ohne Zucker“), auf dem Gerät","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-40","nr":6,"text":"Die App findet andere Apps des Hauses (Rezeptbuch, Marktplatz) und antwortet ihnen, mit eigener Kennung und Siegel","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-44","nr":6,"text":"Rezeptkarte oder Handschrift fotografieren, Text wird gelesen und als Getränk vorgeschlagen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":3,"text":"kein Abtippen"}},{"id":"B-45","nr":6,"text":"KI-Schlüssel verschlüsselt merken, Anbieter wählbar (auch EU)","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-46","nr":6,"text":"Suchen per Spracheingabe, wenn die Hände nass sind","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-47","nr":6,"text":"Schneller Start am Handy","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-50","nr":6,"text":"Eigene Kategorien: umbenennen, mit Symbol, löschen, zusammenlegen, verschieben; fremde Kategorien gehen nicht verloren","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-51","nr":6,"text":"Bild zu einem Getränk per KI erzeugen; Kamerafotos werden verkleinert statt abgewiesen","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-52","nr":6,"text":"Beim Austausch mit der Schwester-App bleibt die Herkunft am Getränk, keine Doppel","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-53","nr":6,"text":"Versteckter Text und Bild-Metadaten werden vor dem Senden an eine KI entfernt, Dateien lassen sich auf Knopfdruck prüfen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-54","nr":6,"text":"Installieren-Knopf oben und in den Einstellungen","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-20","nr":7,"text":"Jedes Getränk ist in Sekunden mit Bild und Mengen gefunden, neue Ideen kommen aus dem Labor","sichtbar":true},{"id":"B-21","nr":8,"text":"Das System muss als installierbare Web-App ohne Server laufen und nach dem ersten Öffnen vollständig offline arbeiten","sichtbar":true},{"id":"B-22","nr":8,"text":"Das System muss Getränke mit Kategorie, Zutaten (Menge, Einheit), Schritten, Glastyp, Alkoholangabe, Portionen, Zeit und Sternebewertung führen","sichtbar":true},{"id":"B-23","nr":8,"text":"Das System muss die Daten nur im Browser des Geräts speichern und als Datei exportieren und wieder einlesen","sichtbar":true},{"id":"B-24","nr":8,"text":"Das System muss im Labor aus Kategorie, Geschmack und Zutaten einen Vorschlag einer KI holen, der zuerst als experimentell gilt und nach Bewertung ins Buch übernommen oder verworfen wird","sichtbar":true},{"id":"B-25","nr":8,"text":"Das System muss einen alkoholfreien Modus haben, der Getränke mit Alkohol ausblendet","sichtbar":true},{"id":"B-26","nr":8,"text":"Das System muss Wochenplan, Menüansicht und Einkaufsliste aus den Rezepten erzeugen","sichtbar":true},{"id":"B-27","nr":8,"text":"Das System muss acht Sprachen und mehrere Farbthemen anbieten","sichtbar":true},{"id":"B-41","nr":8,"text":"Das System muss eine eigene, signierte Kennung (Spore) führen und ihre Beschreibung im Siegel zeigen","sichtbar":true},{"id":"B-42","nr":8,"text":"Das System muss sich nur auf Wunsch über ein Relais verbinden; beim Laden geht nichts ins Netz","sichtbar":true},{"id":"B-48","nr":8,"text":"Das System muss für Scan und Texterkennung den Anbieter wählen lassen (Anthropic oder Mistral EU) und nur auf Tipp senden","sichtbar":true},{"id":"B-49","nr":8,"text":"Das System muss fremde Antworten aus dem Netz nur mit Prüfung an einen KI-Richter geben","sichtbar":true},{"id":"B-55","nr":8,"text":"Das System muss eine Kategorie nur über ihre Kennung zuordnen; Umbenennen ändert nur die Beschriftung","sichtbar":true},{"id":"B-56","nr":8,"text":"Das System muss PDFs als gereinigte Seitenbilder an eine KI geben und vorher einmal anhalten, wenn etwas entfernt wird","sichtbar":true},{"id":"B-57","nr":8,"text":"Das System muss eine eigene App-Kennung tragen, damit es neben den Schwester-Apps installierbar bleibt","sichtbar":true},{"id":"B-58","nr":8,"text":"Das System muss als installierbare Web-App in einer einzigen Datei ohne Bau-Schritt laufen und nach dem ersten Öffnen ganz ohne Internet","sichtbar":true},{"id":"B-59","nr":8,"text":"Das System muss die Oberfläche in acht Sprachen zeigen: Deutsch, Englisch, Russisch, Chinesisch, Spanisch, Französisch, Italienisch, Portugiesisch","sichtbar":true},{"id":"B-60","nr":8,"text":"Das System muss die Getränke in feste Kategorien einteilen (Smoothies und Shakes, Mocktails, alkoholfreie Cocktails, Limonaden, Tees und Kaffees, Cocktails, Bowlen), umbenennbar","sichtbar":true},{"id":"B-61","nr":8,"text":"Das System muss von selbst Sicherungsstände in einem Tresor auf dem Gerät anlegen, aus dem man frühere Stände zurückholen, exportieren oder löschen kann","sichtbar":true},{"id":"B-62","nr":8,"text":"Das System muss die Sammlung als Datei exportieren und wieder einlesen, wahlweise ersetzend oder ergänzend, mitsamt Ordnern","sichtbar":true},{"id":"B-63","nr":8,"text":"Das System muss KI nur mit dem eigenen Schlüssel des Nutzers nutzen (Claude, Mistral oder OpenAI); ohne Schlüssel läuft alles andere weiter","sichtbar":true},{"id":"B-28","nr":9,"text":"für Thekenpersonal ohne Technikwissen; Bedienungsanleitung in der App","sichtbar":true},{"id":"B-29","nr":10,"text":"Geräte","sichtbar":true},{"id":"B-30","nr":10,"text":"offline","sichtbar":true},{"id":"B-31","nr":11,"text":"Rezeptbuch-App für Essen (dient als Vorlage)","sichtbar":true},{"id":"B-32","nr":12,"text":"offene Getränke-Datenbank im Netz (nur beim Entdecken, nur lesend)","sichtbar":true},{"id":"B-43","nr":12,"text":"Netz der Schwester-Apps über ein eigenes Relais","sichtbar":true},{"id":"B-33","nr":13,"text":"Rezepte, Zutaten, Fotos, Bewertungen","sichtbar":true},{"id":"B-34","nr":14,"text":"personenbezogene Daten: nein","sichtbar":true},{"id":"B-35","nr":14,"text":"KI-Schlüssel nur im Gerät, nie im Quelltext","sichtbar":true},{"id":"B-36","nr":15,"text":"Vorgaben","sichtbar":true},{"id":"B-37","nr":15,"text":"kein Abo, keine Werbung; Jugendschutz: alkoholfreier Modus","sichtbar":true},{"id":"B-38","nr":15,"text":"bewusst nicht: Konto, Server-Abgleich, Bezahlvorgang; nur Web-App, keine eigene iPhone- oder Windows-App","sichtbar":true},{"id":"O-02","nr":18,"text":"Darf das Labor Bilder bei einem Bild-Dienst bestellen?","sichtbar":true,"wer":"⟦KUNDE-2⟧","bis":"2026-09-20"}],"bausteine":[{"id":"K-01","katalog":"liste","name":"Getränke-Rezeptbuch: Kategorien, Zutaten, Schritte, Bilder mit Ausschnitt, Sterne, Suche, Karussell","menge":1,"groesse":"gross","faktoren":["offline"],"deckt":["B-13"],"ermaessigt":false},{"id":"K-02","katalog":"seite","name":"Installierbare Web-App mit Offline-Vorrat, Themen und Startanimation","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-14"],"ermaessigt":false},{"id":"K-03","katalog":"kipruef","name":"KI-Labor: Vorschlag, Bewertung in vier Punkten, Übernahme ins Buch","menge":1,"groesse":"mittel","faktoren":["ki"],"deckt":["B-15"],"ermaessigt":false},{"id":"K-04","katalog":"neu","name":"Wochenplan, Menü, Einkaufsliste","menge":1,"groesse":"mittel","faktoren":["druck"],"deckt":["B-16"],"ermaessigt":false},{"id":"K-05","katalog":"neu","name":"Acht Sprachen mit Prüfskript","menge":1,"groesse":"klein","faktoren":["sprachen"],"deckt":["B-17"],"ermaessigt":false},{"id":"K-06","katalog":"schnitt","name":"Bekannte Drinks entdecken (offene Getränke-Datenbank)","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-18","B-32"],"ermaessigt":false},{"id":"K-07","katalog":"altdaten","name":"Export und Import als Datei","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-19"],"ermaessigt":false},{"id":"K-08","katalog":"suche","name":"Bedeutungssuche über die Getränke, Modell auf dem Gerät","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-39"],"ermaessigt":false},{"id":"K-09","katalog":"schnitt","name":"Netz-Knoten: Spore, Siegel, Lampen, Rendezvous über eigenes Relais","menge":1,"groesse":"gross","faktoren":["nutzer"],"deckt":["B-40","B-43"],"ermaessigt":false},{"id":"K-10","katalog":"scan","name":"KI-Scan und Texterkennung von Fotos und Handschrift, Stapel","menge":1,"groesse":"mittel","faktoren":["ki"],"deckt":["B-44"],"ermaessigt":false},{"id":"K-11","katalog":"kipruef","name":"Schlüssel-Tresor, Anbieterwahl, KI-Richter mit Prüfliste","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-45"],"ermaessigt":false},{"id":"K-12","katalog":"neu","name":"Spracheingabe in der Suche","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-46"],"ermaessigt":false},{"id":"K-13","katalog":"neu","name":"Ladezeit: Bilder als Datei, Netz-Module erst nach dem Laden","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-47"],"ermaessigt":false},{"id":"K-14","katalog":"neu","name":"Kategorien verwalten: umbenennen, Symbol, löschen, zusammenlegen, ziehen, Zuordnen aus der Zeile","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-50"],"ermaessigt":false},{"id":"K-15","katalog":"kipruef","name":"KI-Bilder fürs Getränk, Kamerafoto verkleinern","menge":1,"groesse":"mittel","faktoren":["ki"],"deckt":["B-51"],"ermaessigt":false},{"id":"K-16","katalog":"altdaten","name":"Herkunft und feste Kennung am Getränk beim Import","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-52"],"ermaessigt":false},{"id":"K-17","katalog":"dateipruef","name":"Reinigung vor der KI und Datei prüfen auf Knopfdruck","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-53"],"ermaessigt":false},{"id":"K-18","katalog":"seite","name":"Installieren oben und in den Einstellungen, eigene App-Kennung","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-54"],"ermaessigt":false}],"rahmen":{"eigeneText":"Rezepte mit Mein Rezeptbuch austauschen","geraete":["android","iphone","tablet","browser"],"offline":"immer","abgleich":"eins","eigene":["hinher"],"datenort":["geraet"],"sicherung":["selbst","allein"],"ki":"dienst"},"nicht":[{"id":"N-01","text":"Kein Konto und keine Anmeldung beim Hersteller","sichtbar":true}]}
```
