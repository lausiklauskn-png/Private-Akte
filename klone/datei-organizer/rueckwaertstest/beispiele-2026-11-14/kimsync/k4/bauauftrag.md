---
art: bauauftrag
format: 1
vorgang: V-2026-0001
fassung: 3
vorher: -
fassungsdatum: 2026-10-25
datum: 2026-10-25
kunde: "⟦KUNDE-1⟧"
verdeckt: ja
stunden: ja
euro: nein
repo: "Workflow-Needs"  # Werkzeug, das den Auftrag erzeugt hat — nicht das Ziel
---

# Bauauftrag · Fassung 3

**Anlass:** Mehrere Räume, Gruppen mit Leitung, beliebige Dateien und ein Umzug aufs neue Handy wie bei großen Messengern  ·  **von:** Kunde

**Vorhaben:** Bilder und kurze Nachrichten im kleinen Kreis, ohne fremden Messenger

**Gesamtauftrag:** keine frühere Fassung in diesem Auftrag — alles unter „Zu tun“ ist neu zu bauen. Das Datum der Fassung steht im Kopf (`fassungsdatum`), `datum` ist der Tag der Erzeugung.

## Rahmen
- Geräte: Android-Handy, iPhone, Tablet, Windows-PC, im Browser
- Ohne Internet: reicht unterwegs
- Abgleich zwischen Geräten: ja, sofort (z. B. Tablet → Küche)
- Daten liegen: nur auf dem Gerät
- Sicherung: verschlüsselt, selbst anstoßen, an einen zweiten Ort
- Eigene Programme: Dateien hin- und hergeben; Große Dateien über Datei-Post; Nachrichten reisen verschlüsselt über Relais, gespeichert wird nur auf den Geräten
- KI: nur auf dem Gerät
- Nicht bauen: N-01 Kein Konto und keine Telefonnummer · N-02 Kein Klartext auf dem Relais

## Zu tun (für die Sitzung)
| Aktion | Kennung | Was | Größe | Stunden (Schätzung) | deckt Bedarf |
|---|---|---|---|---|---|
| NEU BAUEN | K-01 | Raum-Code, Bilder, Videos und Nachrichten über Relais, signiert und verschlüsselt | groß | 18,4–32,2 | B-11, B-12 |
| NEU BAUEN | K-02 | Abholbestätigung, Löschen vom Relais, Nachsenden | mittel | 24–44 | B-13 |
| NEU BAUEN | K-03 | Große Videos über den Datei-Dienst, Vergleich per SHA-256 | mittel | 6,4–11,2 | B-14, B-28 |
| NEU BAUEN | K-04 | Galerie mit Auswahl, Ziehen und Löschen; Ansicht mit Videoabspieler | mittel | 24–44 | B-15 |
| NEU BAUEN | K-05 | Sprachen DE/EN/RU, Installieren, Neu laden, drei Themen | klein | 12–24 | B-16 |
| NEU BAUEN | K-06 | Empfangene Bilder neu zeichnen, Bestand einmal nachzeichnen | mittel | 3–4,8 | B-33 |
| NEU BAUEN | K-07 | SBKIM-Knoten mit Siegel, Mycel und Lampen | mittel | 14–26 | B-34, B-38 |
| NEU BAUEN | K-08 | Installieren in den Einstellungen, eigene Manifest-Kennung | klein | 3–5 | B-35 |
| NEU BAUEN | K-09 | Räume im Tresor, Raumschlüssel, Einlass und Umzug durch die Leitung | groß | 7,8–12,5 | B-39, B-40 |
| NEU BAUEN | K-10 | Dateien jeder Art, Datei-Dienst-Zugang aus der Gruppe, Abschluss mit Schreibnachweis | mittel | 6,4–11,2 | B-41 |
| NEU BAUEN | K-11 | Lesebestätigung, private Nachricht, Vertrauens-Haken | mittel | 8–14 | B-42 |
| NEU BAUEN | K-12 | Sicherung in eine verschlüsselte Datei, Einspielen auf neuem Gerät | mittel | 24–44 | B-43 |
| NEU BAUEN | K-13 | Relais je Gerät und Raum, Zulassungsdienst auf dem Server | mittel | 22,4–41,6 | B-44, B-50 |
| NEU BAUEN | K-14 | Diktat, Wort- und Bedeutungssuche, Übersetzen auf dem Gerät | mittel | 12–20,4 | B-45 |

### Je Baustein: Vorlage und Abnahme
- K-01 · Vorlage Kim-sync (50 % wiederverwendet) · Faktoren Offline ×1,15
- K-03 · Vorlage Datei-Post (60 % wiederverwendet)
- K-05 · Faktoren Mehrsprachig ×1,2
- K-06 · Vorlage Auslieferungsprüfer (70 % wiederverwendet)
- K-08 · Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 % wiederverwendet)
- K-09 · Vorlage Sende-Prüfer (70 % wiederverwendet) · Faktoren Mehrere Nutzer ×1,3
- K-10 · Vorlage Datei-Post (60 % wiederverwendet)
- K-11 · Vorlage Kim-sync (50 % wiederverwendet)
- K-13 · Faktoren Server ×1,6
- K-14 · Vorlage Company Brain (40 % wiederverwendet)
- ohne Baustein (trotzdem abnehmen):
  - B-18: Das System muss als installierbare Web-App ohne Konto auf Handy, Tablet und PC laufen
  - B-19: Das System muss jeden Raum über einen Code (XXXX-XXXX-XXXX-XXXX) öffnen und den Schlüssel daraus auf dem Gerät ableiten (PBKDF2, AES-GCM)
  - B-20: Das System muss Bilder verkleinern, Videos unverändert in Teilen senden und beim Empfänger wieder zusammensetzen
  - B-21: Das System muss jeden Zettel signieren und beim Empfang prüfen
  - B-22: Das System muss Unversandtes merken und nachsenden, sobald die Verbindung zurück ist
  - B-23: Das System muss nach der Abholquittung die eigenen Teile vom Relais löschen lassen
  - B-36: Das System muss ein Bild, das sich nicht zeichnen lässt, nicht zeigen und einen Hinweis setzen — nie das Original
  - B-37: Das System muss eine eigene Netz-Schublade führen, getrennt vom Raum
  - B-46: Das System muss je Raum einen eigenen Raumschlüssel führen; der Code öffnet nur die Tür
  - B-47: Das System muss vom Relais erst löschen, wenn alle abgeholt haben
  - B-48: Das System muss den Zugang zum Datei-Dienst von der Leitung an die Gruppe geben, ohne den Code zu zeigen
  - B-49: Das System muss eine fremde App nicht in die Familienakte einbinden, nur Pakete transportieren
  - B-52: Das System muss als installierbare Web-App aus einer einzigen Seite laufen, ohne Bau-Schritt
  - B-53: Das System muss einladen können: Link oder Raum-Code zum Kopieren oder Teilen
  - B-54: Das System muss alle Räume in einem Tresor mit Passwort (mindestens 8 Zeichen) verschlüsselt halten; das Passwort wird beim Öffnen einmal abgefragt
  - B-55: Das System muss Nachrichten als signierte Zettel über mehrere Relais gleichzeitig verschicken (Nostr)
  - B-56: Das System muss Bilder vor dem Senden verkleinern und Videos unverändert in Teilen schicken, mit Fortschrittsanzeige beim Empfänger
  - B-57: Das System muss eine verschlüsselte Sicherungsdatei schreiben, die Räume, Nachrichten, Bilder und den Geräteschlüssel enthält; Einspielen ergänzt nur und erlaubt den Umzug auf ein neues Gerät

## Bedarfsprotokoll – Änderungen
- NEU B-01 [Bereich 1]: „Fotos von der Baustelle gehen über einen großen Messenger“
- NEU B-02 [Bereich 1]: „große Videos per Mail scheitern an der Größe“
- NEU B-03 [Bereich 2]: „Bilder“
- NEU B-04 [Bereich 2]: „Videos“
- NEU B-05 [Bereich 2]: „kurze Nachrichten“
- NEU B-06 [Bereich 3]: „⟦KUNDE-2⟧ und Mitarbeiter auf der Baustelle“
- NEU B-07 [Bereich 3]: „Büro“
- NEU B-08 [Bereich 4]: „Fotos landen bei einem Konzern, der mitliest und auswertet“
- NEU B-09 [Bereich 4]: „man weiß nicht, ob das Bild beim anderen angekommen ist“
- NEU B-10 [Bereich 5]: „Ohne Konto und Telefonnummer soll es gehen, verschlüsselt, auf jedem Gerät“
- NEU B-11 [Bereich 6]: „Zwei oder mehr Geräte teilen einen Raum-Code und schicken sich Bilder, Videos und kurze Nachrichten“ (Muss, Nutzen: 3 h/Monat, Fotos von der Baustelle ohne Umweg)
- NEU B-12 [Bereich 6]: „Alles wird auf dem Gerät verschlüsselt, die Relais sehen nur verschlüsselte Teile“ (Muss, Nutzen: niemand liest mit)
- NEU B-13 [Bereich 6]: „Ich sehe, ob das Gegenüber abgeholt hat; danach wird es vom Relais gelöscht“ (Muss, Nutzen: 1 h/Monat)
- NEU B-14 [Bereich 6]: „Große Videos gehen über einen eigenen Datei-Dienst statt per Mail“ (Soll, Nutzen: 1 h/Monat)
- NEU B-15 [Bereich 6]: „Galerie aller Bilder und Videos des Raums, mehrere auswählen und löschen“ (Soll)
- NEU B-16 [Bereich 6]: „Oberfläche auf Deutsch, Englisch und Russisch“ (Kann)
- NEU B-33 [Bereich 6]: „Empfangene Bilder werden neu gezeichnet, bevor sie gezeigt oder gespeichert werden“ (Muss, Nutzen: kein Standort, keine versteckte Datei)
- NEU B-34 [Bereich 6]: „Die App ist ein Knoten im Netz der eigenen Apps, mit Siegel und Lampen, ohne beim Laden etwas zu senden“ (Soll)
- NEU B-35 [Bereich 6]: „Installieren auch in den Einstellungen, jede App mit eigener Kennung“ (Soll)
- NEU B-39 [Bereich 6]: „Mehrere Räume mit Namen, verschlüsselt gemerkt, ein Tipp wechselt“ (Muss, Nutzen: 1 h/Monat)
- NEU B-40 [Bereich 6]: „Gruppe mit Leitung: Eintritt nur mit Bestätigung, Herausnehmen nur durch die Leitung, Profilbild“ (Muss)
- NEU B-41 [Bereich 6]: „Beliebige Dateien (PDF, App-Datei, ZIP) schicken, mit Warnung bei Programmen“ (Soll)
- NEU B-42 [Bereich 6]: „Gelesen-Haken und private Nachricht an eine Person“ (Soll)
- NEU B-43 [Bereich 6]: „Sicherung als Datei, auf einem neuen Gerät einspielen“ (Muss, Nutzen: Handywechsel ohne Verlust)
- NEU B-44 [Bereich 6]: „Eigene Relais statt fremder; die Leitung gibt sie an die Gruppe weiter, nur zugelassene Geräte schreiben“ (Soll)
- NEU B-45 [Bereich 6]: „Mikrofon in jedem Textfeld, Suche nach Wort und Bedeutung, Übersetzen auf dem Gerät“ (Kann)
- NEU B-17 [Bereich 7]: „Ein Foto ist in Sekunden beim Büro, und man sieht, dass es angekommen ist“
- NEU B-18 [Bereich 8]: „Das System muss als installierbare Web-App ohne Konto auf Handy, Tablet und PC laufen“
- NEU B-19 [Bereich 8]: „Das System muss jeden Raum über einen Code (XXXX-XXXX-XXXX-XXXX) öffnen und den Schlüssel daraus auf dem Gerät ableiten (PBKDF2, AES-GCM)“
- NEU B-20 [Bereich 8]: „Das System muss Bilder verkleinern, Videos unverändert in Teilen senden und beim Empfänger wieder zusammensetzen“
- NEU B-21 [Bereich 8]: „Das System muss jeden Zettel signieren und beim Empfang prüfen“
- NEU B-22 [Bereich 8]: „Das System muss Unversandtes merken und nachsenden, sobald die Verbindung zurück ist“
- NEU B-23 [Bereich 8]: „Das System muss nach der Abholquittung die eigenen Teile vom Relais löschen lassen“
- NEU B-36 [Bereich 8]: „Das System muss ein Bild, das sich nicht zeichnen lässt, nicht zeigen und einen Hinweis setzen — nie das Original“
- NEU B-37 [Bereich 8]: „Das System muss eine eigene Netz-Schublade führen, getrennt vom Raum“
- NEU B-46 [Bereich 8]: „Das System muss je Raum einen eigenen Raumschlüssel führen; der Code öffnet nur die Tür“
- NEU B-47 [Bereich 8]: „Das System muss vom Relais erst löschen, wenn alle abgeholt haben“
- NEU B-48 [Bereich 8]: „Das System muss den Zugang zum Datei-Dienst von der Leitung an die Gruppe geben, ohne den Code zu zeigen“
- NEU B-49 [Bereich 8]: „Das System muss eine fremde App nicht in die Familienakte einbinden, nur Pakete transportieren“
- NEU B-52 [Bereich 8]: „Das System muss als installierbare Web-App aus einer einzigen Seite laufen, ohne Bau-Schritt“
- NEU B-53 [Bereich 8]: „Das System muss einladen können: Link oder Raum-Code zum Kopieren oder Teilen“
- NEU B-54 [Bereich 8]: „Das System muss alle Räume in einem Tresor mit Passwort (mindestens 8 Zeichen) verschlüsselt halten; das Passwort wird beim Öffnen einmal abgefragt“
- NEU B-55 [Bereich 8]: „Das System muss Nachrichten als signierte Zettel über mehrere Relais gleichzeitig verschicken (Nostr)“
- NEU B-56 [Bereich 8]: „Das System muss Bilder vor dem Senden verkleinern und Videos unverändert in Teilen schicken, mit Fortschrittsanzeige beim Empfänger“
- NEU B-57 [Bereich 8]: „Das System muss eine verschlüsselte Sicherungsdatei schreiben, die Räume, Nachrichten, Bilder und den Geräteschlüssel enthält; Einspielen ergänzt nur und erlaubt den Umzug auf ein neues Gerät“
- NEU B-24 [Bereich 9]: „für Leute ohne Technikwissen, ein Knopf je Handgriff“
- NEU B-25 [Bereich 10]: „Handy“
- NEU B-26 [Bereich 10]: „Tablet“
- NEU B-27 [Bereich 10]: „PC“
- NEU B-28 [Bereich 12]: „Datei-Dienst des Hauses für Videos über 20 MB“
- NEU B-38 [Bereich 12]: „Netz der Schwester-Apps (SBKIM, Modulsatz aus Sage-Protokol)“
- NEU B-50 [Bereich 12]: „Zulassungsdienst am eigenen Relais (Server des Betriebs)“
- NEU B-29 [Bereich 13]: „Baustellenfotos, Videos, kurze Abstimmungen“
- NEU B-30 [Bereich 14]: „personenbezogene Daten: ja (Fotos)“
- NEU B-31 [Bereich 15]: „kein Abo, keine Werbung, keine Telefonnummer“
- NEU B-32 [Bereich 15]: „Relais sind fremde Rechner: nur verschlüsselte Teile dürfen dort liegen“
- NEU B-51 [Bereich 15]: „Wer den Code hat, kann mitlesen, bis die Leitung den Raum umzieht“
- NEU O-02 [Bereich 18]: „Server für das private Relais einrichten“

## Offene Punkte
- O-02: Server für das private Relais einrichten (klärt Betrieb bis 2026-10-27)

## Summe
Stunden F3 253–460,2 · Kosten-Nutzen: Grenzlinie keine

Die Summe enthält zusätzlich zu den Zeilen: Anpassung an den Betrieb 2–6 h, Abstimmung 15 % (28,1–51,1 h), Puffer 20 % (37,5–68,2 h).

## Erklärungen und Sterne
- Verschwiegenheitserklärung aktiviert: nein · Vereinbarung Zahlung/Rechte aktiviert: nein · Wartungsvertrag aktiviert: nein
- Sterne B-11: beim Bedarf Ø 4,7 (3) · bei der Abnahme Ø 5 (3)
- Sterne B-13: beim Bedarf Ø 3,5 (2) · bei der Abnahme Ø 4,7 (3)
- Sterne B-14: beim Bedarf Ø 3,5 (2) · bei der Abnahme Ø 3,5 (2)
- Sterne B-33: beim Bedarf Ø 3,5 (2) · bei der Abnahme Ø 4,5 (2)
- Sterne B-39: beim Bedarf Ø 4 (2) · bei der Abnahme Ø 4,3 (3)
- Sterne B-43: beim Bedarf Ø 4 (2) · bei der Abnahme Ø 4,5 (2)

## Vollständiger Stand (zum Einlesen)
```json
{"bedarf":[{"id":"B-01","nr":1,"text":"Fotos von der Baustelle gehen über einen großen Messenger","sichtbar":true},{"id":"B-02","nr":1,"text":"große Videos per Mail scheitern an der Größe","sichtbar":true},{"id":"B-03","nr":2,"text":"Bilder","sichtbar":true},{"id":"B-04","nr":2,"text":"Videos","sichtbar":true},{"id":"B-05","nr":2,"text":"kurze Nachrichten","sichtbar":true},{"id":"B-06","nr":3,"text":"⟦KUNDE-2⟧ und Mitarbeiter auf der Baustelle","sichtbar":true,"anzahl":4},{"id":"B-07","nr":3,"text":"Büro","sichtbar":true,"anzahl":1},{"id":"B-08","nr":4,"text":"Fotos landen bei einem Konzern, der mitliest und auswertet","sichtbar":true},{"id":"B-09","nr":4,"text":"man weiß nicht, ob das Bild beim anderen angekommen ist","sichtbar":true},{"id":"B-10","nr":5,"text":"Ohne Konto und Telefonnummer soll es gehen, verschlüsselt, auf jedem Gerät","sichtbar":true},{"id":"B-11","nr":6,"text":"Zwei oder mehr Geräte teilen einen Raum-Code und schicken sich Bilder, Videos und kurze Nachrichten","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":3,"text":"Fotos von der Baustelle ohne Umweg"}},{"id":"B-12","nr":6,"text":"Alles wird auf dem Gerät verschlüsselt, die Relais sehen nur verschlüsselte Teile","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"niemand liest mit"}},{"id":"B-13","nr":6,"text":"Ich sehe, ob das Gegenüber abgeholt hat; danach wird es vom Relais gelöscht","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-14","nr":6,"text":"Große Videos gehen über einen eigenen Datei-Dienst statt per Mail","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-15","nr":6,"text":"Galerie aller Bilder und Videos des Raums, mehrere auswählen und löschen","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-16","nr":6,"text":"Oberfläche auf Deutsch, Englisch und Russisch","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-33","nr":6,"text":"Empfangene Bilder werden neu gezeichnet, bevor sie gezeigt oder gespeichert werden","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"kein Standort, keine versteckte Datei"}},{"id":"B-34","nr":6,"text":"Die App ist ein Knoten im Netz der eigenen Apps, mit Siegel und Lampen, ohne beim Laden etwas zu senden","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-35","nr":6,"text":"Installieren auch in den Einstellungen, jede App mit eigener Kennung","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-39","nr":6,"text":"Mehrere Räume mit Namen, verschlüsselt gemerkt, ein Tipp wechselt","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-40","nr":6,"text":"Gruppe mit Leitung: Eintritt nur mit Bestätigung, Herausnehmen nur durch die Leitung, Profilbild","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-41","nr":6,"text":"Beliebige Dateien (PDF, App-Datei, ZIP) schicken, mit Warnung bei Programmen","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-42","nr":6,"text":"Gelesen-Haken und private Nachricht an eine Person","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-43","nr":6,"text":"Sicherung als Datei, auf einem neuen Gerät einspielen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"Handywechsel ohne Verlust"}},{"id":"B-44","nr":6,"text":"Eigene Relais statt fremder; die Leitung gibt sie an die Gruppe weiter, nur zugelassene Geräte schreiben","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-45","nr":6,"text":"Mikrofon in jedem Textfeld, Suche nach Wort und Bedeutung, Übersetzen auf dem Gerät","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-17","nr":7,"text":"Ein Foto ist in Sekunden beim Büro, und man sieht, dass es angekommen ist","sichtbar":true},{"id":"B-18","nr":8,"text":"Das System muss als installierbare Web-App ohne Konto auf Handy, Tablet und PC laufen","sichtbar":true},{"id":"B-19","nr":8,"text":"Das System muss jeden Raum über einen Code (XXXX-XXXX-XXXX-XXXX) öffnen und den Schlüssel daraus auf dem Gerät ableiten (PBKDF2, AES-GCM)","sichtbar":true},{"id":"B-20","nr":8,"text":"Das System muss Bilder verkleinern, Videos unverändert in Teilen senden und beim Empfänger wieder zusammensetzen","sichtbar":true},{"id":"B-21","nr":8,"text":"Das System muss jeden Zettel signieren und beim Empfang prüfen","sichtbar":true},{"id":"B-22","nr":8,"text":"Das System muss Unversandtes merken und nachsenden, sobald die Verbindung zurück ist","sichtbar":true},{"id":"B-23","nr":8,"text":"Das System muss nach der Abholquittung die eigenen Teile vom Relais löschen lassen","sichtbar":true},{"id":"B-36","nr":8,"text":"Das System muss ein Bild, das sich nicht zeichnen lässt, nicht zeigen und einen Hinweis setzen — nie das Original","sichtbar":true},{"id":"B-37","nr":8,"text":"Das System muss eine eigene Netz-Schublade führen, getrennt vom Raum","sichtbar":true},{"id":"B-46","nr":8,"text":"Das System muss je Raum einen eigenen Raumschlüssel führen; der Code öffnet nur die Tür","sichtbar":true},{"id":"B-47","nr":8,"text":"Das System muss vom Relais erst löschen, wenn alle abgeholt haben","sichtbar":true},{"id":"B-48","nr":8,"text":"Das System muss den Zugang zum Datei-Dienst von der Leitung an die Gruppe geben, ohne den Code zu zeigen","sichtbar":true},{"id":"B-49","nr":8,"text":"Das System muss eine fremde App nicht in die Familienakte einbinden, nur Pakete transportieren","sichtbar":true},{"id":"B-52","nr":8,"text":"Das System muss als installierbare Web-App aus einer einzigen Seite laufen, ohne Bau-Schritt","sichtbar":true},{"id":"B-53","nr":8,"text":"Das System muss einladen können: Link oder Raum-Code zum Kopieren oder Teilen","sichtbar":true},{"id":"B-54","nr":8,"text":"Das System muss alle Räume in einem Tresor mit Passwort (mindestens 8 Zeichen) verschlüsselt halten; das Passwort wird beim Öffnen einmal abgefragt","sichtbar":true},{"id":"B-55","nr":8,"text":"Das System muss Nachrichten als signierte Zettel über mehrere Relais gleichzeitig verschicken (Nostr)","sichtbar":true},{"id":"B-56","nr":8,"text":"Das System muss Bilder vor dem Senden verkleinern und Videos unverändert in Teilen schicken, mit Fortschrittsanzeige beim Empfänger","sichtbar":true},{"id":"B-57","nr":8,"text":"Das System muss eine verschlüsselte Sicherungsdatei schreiben, die Räume, Nachrichten, Bilder und den Geräteschlüssel enthält; Einspielen ergänzt nur und erlaubt den Umzug auf ein neues Gerät","sichtbar":true},{"id":"B-24","nr":9,"text":"für Leute ohne Technikwissen, ein Knopf je Handgriff","sichtbar":true},{"id":"B-25","nr":10,"text":"Handy","sichtbar":true},{"id":"B-26","nr":10,"text":"Tablet","sichtbar":true},{"id":"B-27","nr":10,"text":"PC","sichtbar":true},{"id":"B-28","nr":12,"text":"Datei-Dienst des Hauses für Videos über 20 MB","sichtbar":true},{"id":"B-38","nr":12,"text":"Netz der Schwester-Apps (SBKIM, Modulsatz aus Sage-Protokol)","sichtbar":true},{"id":"B-50","nr":12,"text":"Zulassungsdienst am eigenen Relais (Server des Betriebs)","sichtbar":true},{"id":"B-29","nr":13,"text":"Baustellenfotos, Videos, kurze Abstimmungen","sichtbar":true},{"id":"B-30","nr":14,"text":"personenbezogene Daten: ja (Fotos)","sichtbar":true},{"id":"B-31","nr":15,"text":"kein Abo, keine Werbung, keine Telefonnummer","sichtbar":true},{"id":"B-32","nr":15,"text":"Relais sind fremde Rechner: nur verschlüsselte Teile dürfen dort liegen","sichtbar":true},{"id":"B-51","nr":15,"text":"Wer den Code hat, kann mitlesen, bis die Leitung den Raum umzieht","sichtbar":true},{"id":"O-02","nr":18,"text":"Server für das private Relais einrichten","sichtbar":true,"wer":"Betrieb","bis":"2026-10-27"}],"bausteine":[{"id":"K-01","katalog":"chat","name":"Raum-Code, Bilder, Videos und Nachrichten über Relais, signiert und verschlüsselt","menge":1,"groesse":"gross","faktoren":["offline"],"deckt":["B-11","B-12"],"ermaessigt":false},{"id":"K-02","katalog":"neu","name":"Abholbestätigung, Löschen vom Relais, Nachsenden","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-13"],"ermaessigt":false},{"id":"K-03","katalog":"datei","name":"Große Videos über den Datei-Dienst, Vergleich per SHA-256","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-14","B-28"],"ermaessigt":false},{"id":"K-04","katalog":"neu","name":"Galerie mit Auswahl, Ziehen und Löschen; Ansicht mit Videoabspieler","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-15"],"ermaessigt":false},{"id":"K-05","katalog":"neu","name":"Sprachen DE/EN/RU, Installieren, Neu laden, drei Themen","menge":1,"groesse":"klein","faktoren":["sprachen"],"deckt":["B-16"],"ermaessigt":false},{"id":"K-06","katalog":"dateipruef","name":"Empfangene Bilder neu zeichnen, Bestand einmal nachzeichnen","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-33"],"ermaessigt":false},{"id":"K-07","katalog":"schnitt","name":"SBKIM-Knoten mit Siegel, Mycel und Lampen","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-34","B-38"],"ermaessigt":false},{"id":"K-08","katalog":"seite","name":"Installieren in den Einstellungen, eigene Manifest-Kennung","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-35"],"ermaessigt":false},{"id":"K-09","katalog":"kipruef","name":"Räume im Tresor, Raumschlüssel, Einlass und Umzug durch die Leitung","menge":1,"groesse":"gross","faktoren":["nutzer"],"deckt":["B-39","B-40"],"ermaessigt":false},{"id":"K-10","katalog":"datei","name":"Dateien jeder Art, Datei-Dienst-Zugang aus der Gruppe, Abschluss mit Schreibnachweis","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-41"],"ermaessigt":false},{"id":"K-11","katalog":"chat","name":"Lesebestätigung, private Nachricht, Vertrauens-Haken","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-42"],"ermaessigt":false},{"id":"K-12","katalog":"neu","name":"Sicherung in eine verschlüsselte Datei, Einspielen auf neuem Gerät","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-43"],"ermaessigt":false},{"id":"K-13","katalog":"schnitt","name":"Relais je Gerät und Raum, Zulassungsdienst auf dem Server","menge":1,"groesse":"mittel","faktoren":["server"],"deckt":["B-44","B-50"],"ermaessigt":false},{"id":"K-14","katalog":"suche","name":"Diktat, Wort- und Bedeutungssuche, Übersetzen auf dem Gerät","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-45"],"ermaessigt":false}],"rahmen":{"eigeneText":"Große Dateien über Datei-Post; Nachrichten reisen verschlüsselt über Relais, gespeichert wird nur auf den Geräten","geraete":["android","iphone","tablet","windows","browser"],"offline":"unterwegs","abgleich":"sofort","eigene":["hinher"],"datenort":["geraet"],"sicherung":["verschluesselt","selbst","zweiterort"],"ki":"geraet"},"nicht":[{"id":"N-01","text":"Kein Konto und keine Telefonnummer","sichtbar":true},{"id":"N-02","text":"Kein Klartext auf dem Relais","sichtbar":true}]}
```
