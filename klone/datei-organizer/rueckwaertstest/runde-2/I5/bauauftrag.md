---
art: bauauftrag
format: 1
vorgang: V-2026-0001
fassung: 1
vorher: -
fassungsdatum: 2026-11-14
datum: 2026-11-14
kunde: "⟦KUNDE-1⟧"
verdeckt: ja
stunden: ja
euro: nein
repo: "Workflow-Needs"  # Werkzeug, das den Auftrag erzeugt hat — nicht das Ziel
---

# Bauauftrag · Fassung 1

**Vorhaben:** Fehlende Belege von Mandanten einsammeln

**Gesamtauftrag:** keine frühere Fassung in diesem Auftrag — alles unter „Zu tun“ ist neu zu bauen. Das Datum der Fassung steht im Kopf (`fassungsdatum`), `datum` ist der Tag der Erzeugung.

## Rahmen
- Geräte: Windows-PC, Android-Handy, iPhone, im Browser
- Ohne Internet: nein
- Daten liegen: eigener Server
- Sicherung: verschlüsselt
- Eigene Programme: Dateien hin- und hergeben; Kanzleiprogramm: offene Posten hinein, Belege zurück
- Schlägt vor, der Kunde bestätigt: B-21
- Darf selbst handeln: B-20, B-23
- Nicht bauen: N-01 nicht buchen · N-02 nicht kontieren · N-03 den Mandanten keine Steuertipps geben · N-04 kein weiteres großes Portal, das Kanzleiprogramm bleibt · N-05 keine Anmeldung oder App für Mandanten

## Zu tun (für die Sitzung)
| Aktion | Kennung | Was | Größe | Stunden (Schätzung) | deckt Bedarf |
|---|---|---|---|---|---|
| NEU BAUEN | K-01 | Einlesen der offenen Kontobewegungen je Mandant aus dem CSV-Export des Kanzleiprogramms (Datum, Betrag, Empfänger, Buchungsnummer) | mittel | 22,4–41,6 | B-25, B-37, B-38 |
| NEU BAUEN | K-02 | Mandanten-Seite im Handy-Browser über persönlichen, schwer zu erratenden Link mit Ablaufdatum (ohne Anmeldung, ohne App), zeigt nur die eigenen offenen Posten | groß | 20,5–35,8 | B-17, B-19, B-26 |
| NEU BAUEN | K-03 | Antwort je Posten: Foto aufnehmen oder Datei hochladen, „war privat“, „kommt später“; Belege verschlüsselt auf Server in Deutschland | mittel | 38,4–70,4 | B-18, B-27 |
| NEU BAUEN | K-04 | Automatische Erinnerung per Mail an Mandanten mit offenen Posten (Abstand einstellbar, höchstens drei Mal) | klein | 4,8–8 | B-20, B-28 |
| NEU BAUEN | K-05 | Kanzlei-Übersicht am Windows-PC im Browser: je Mandant offen/beantwortet/teilweise, letzte Antwort | mittel | 4,2–7,3 | B-22, B-29 |
| NEU BAUEN | K-06 | Rückgabe: Belege als Dateien mit Buchungsbezug im Dateinamen plus CSV-Liste der Antworten zum Import ins Kanzleiprogramm | mittel | 14–26 | B-21, B-30, B-37 |
| NEU BAUEN | K-07 | Löschfrist: Posten, Belege und Links werden nach Übernahme bzw. fester Frist automatisch gelöscht, Löschprotokoll ohne Inhalte | klein | 6,4–11,2 | B-23, B-31, B-40 |

### Je Baustein: Vorlage und Abnahme
- K-01 · Faktoren Server ×1,6
  - Abnahme B-25: Das System muss die offenen Kontobewegungen je Mandant aus einer Liste der Kanzlei übernehmen.
- K-02 · Vorlage Datei-Post (60 % wiederverwendet) · Faktoren Server ×1,6
  - Abnahme B-26: Das System muss jedem Mandanten einen eigenen Zugang ohne Anmeldung geben, den nur er öffnen kann.
- K-03 · Faktoren Server ×1,6
  - Abnahme B-27: Das System muss je offenem Posten die Antworten „Foto/Beleg hochladen“, „war privat“ und „kommt später“ anbieten.
- K-04 · Vorlage Familienakte (Kalender, Glocke) (50 % wiederverwendet) · Faktoren Server ×1,6
  - Abnahme B-28: Das System muss Mandanten, die nicht geantwortet haben, selbstständig erinnern.
- K-05 · Vorlage Küchenzettel (60 % wiederverwendet) · Faktoren Mehrere Nutzer ×1,3
  - Abnahme B-29: Das System muss der Kanzlei zeigen, welcher Mandant geantwortet hat und welcher nicht.
- K-06
  - Abnahme B-30: Das System muss die Belege den Buchungen zugeordnet an die Kanzlei zurückgeben.
- K-07 · Vorlage Pro-Tresor (Workflow PDF Pro), Vollsicherung der Familienakte (50 % wiederverwendet) · Faktoren Server ×1,6
  - Abnahme B-31: Das System muss die Daten nach Abschluss wieder löschen.

## Bedarfsprotokoll – Änderungen
- NEU B-01 [Bereich 1]: „Wir schicken den Mandanten Excel-Listen mit den offenen Kontobewegungen per Mail und telefonieren hinterher.“
- NEU B-02 [Bereich 1]: „Antworten kommen in Stücken: per Mail, per Post, als Foto per Messenger.“
- NEU B-03 [Bereich 1]: „Das Online-Portal unseres Kanzleiprogramms nutzt etwa die Hälfte der Mandanten nicht (Anmeldung, App, Vertrag sind zu viel).“
- NEU B-04 [Bereich 2]: „Belege zu Kontobewegungen ohne Beleg bei den Mandanten anfordern und einsammeln (Buchhaltung)“
- NEU B-05 [Bereich 2]: „Kundenkontakt mit den Mandanten: nachfragen, erinnern“
- NEU B-06 [Bereich 3]: „Inhaberin (Steuerberaterin)“
- NEU B-07 [Bereich 3]: „Mitarbeiter der Kanzlei“
- NEU B-08 [Bereich 3]: „Mandanten: kleine Handwerker, Läden, Freiberufler, ältere Vermieter“
- NEU B-09 [Bereich 4]: „Zeitverlust: wir laufen fehlenden Belegen hinterher, das Buchen selbst geht schnell.“
- NEU B-10 [Bereich 4]: „Viele Mandanten haben jeden Monat 15, 20, manchmal 40 Kontobewegungen ohne Beleg.“
- NEU B-11 [Bereich 4]: „Antworten kommen verstreut über Mail, Post und Messenger und müssen von Hand den Buchungen zugeordnet werden.“
- NEU B-12 [Bereich 4]: „Fehlende Übersicht, welcher Mandant geantwortet hat und welcher nicht.“
- NEU B-13 [Bereich 4]: „Meine Leute müssen jeden Mandanten mehrmals anschreiben oder anrufen.“
- NEU B-14 [Bereich 5]: „Das Portal ist für viele Mandanten zu kompliziert, besonders für ältere.“
- NEU B-15 [Bereich 5]: „Excel-Listen per Mail sind für die Mandanten unübersichtlich, sie antworten nicht je Posten.“
- NEU B-16 [Bereich 5]: „Es gibt keine automatische Erinnerung.“
- NEU B-17 [Bereich 6]: „Jeder Mandant sieht genau seine eigenen offenen Posten auf dem Handy, ohne Anmeldung und ohne App.“ (Muss, Nutzen: 6 h/Monat, Weniger Telefonieren und Erklären)
- NEU B-18 [Bereich 6]: „Der Mandant kann je Posten schnell antworten: Foto vom Beleg, „war privat“, „kommt später“.“ (Muss, Nutzen: 8 h/Monat, Antworten kommen geordnet statt in Stücken)
- NEU B-19 [Bereich 6]: „Kein Fremder darf die Posten oder Belege eines Mandanten sehen.“ (Muss, Nutzen: Schweigepflicht)
- NEU B-20 [Bereich 6]: „Die Mandanten werden selbst erinnert, wenn sie nicht antworten.“ (Muss, Nutzen: 5 h/Monat, Meine Leute müssen nicht jeden dreimal anschreiben)
- NEU B-21 [Bereich 6]: „Die Belege kommen passend zu den Buchungen zurück, damit wir sie nur noch übernehmen.“ (Muss, Nutzen: 4 h/Monat, Kein Zuordnen von Hand)
- NEU B-22 [Bereich 6]: „Auf einen Blick sehen, welcher Mandant geantwortet hat und welcher nicht.“ (Soll, Nutzen: 2 h/Monat, Übersicht für die Kanzlei)
- NEU B-23 [Bereich 6]: „Die Daten verschwinden danach wieder.“ (Muss, Nutzen: Schweigepflicht, nichts bleibt liegen)
- NEU B-24 [Bereich 7]: „Jeder Mandant beantwortet seine offenen Posten selbst auf dem Handy, die Kanzlei übernimmt die Belege fertig zugeordnet und spart jede Woche ein paar Stunden Telefonieren.“
- NEU B-25 [Bereich 8]: „Das System muss die offenen Kontobewegungen je Mandant aus einer Liste der Kanzlei übernehmen.“
- NEU B-26 [Bereich 8]: „Das System muss jedem Mandanten einen eigenen Zugang ohne Anmeldung geben, den nur er öffnen kann.“
- NEU B-27 [Bereich 8]: „Das System muss je offenem Posten die Antworten „Foto/Beleg hochladen“, „war privat“ und „kommt später“ anbieten.“
- NEU B-28 [Bereich 8]: „Das System muss Mandanten, die nicht geantwortet haben, selbstständig erinnern.“
- NEU B-29 [Bereich 8]: „Das System muss der Kanzlei zeigen, welcher Mandant geantwortet hat und welcher nicht.“
- NEU B-30 [Bereich 8]: „Das System muss die Belege den Buchungen zugeordnet an die Kanzlei zurückgeben.“
- NEU B-31 [Bereich 8]: „Das System muss die Daten nach Abschluss wieder löschen.“
- NEU B-32 [Bereich 9]: „Festlegen, wer in der Kanzlei die Listen hochlädt und die Antworten übernimmt.“
- NEU B-33 [Bereich 9]: „Kurze Einweisung für die Mitarbeiter; die Mandanten sollen ohne Erklärung zurechtkommen.“
- NEU B-34 [Bereich 10]: „Kanzlei an Windows-PCs, Mandanten fast alle mit Handy.“
- NEU B-35 [Bereich 10]: „Server in Deutschland.“
- NEU B-36 [Bereich 11]: „Unser Kanzleiprogramm mit Online-Portal für Mandanten; es bleibt das Hauptprogramm.“
- NEU B-37 [Bereich 12]: „Offene Posten aus dem Kanzleiprogramm hinein, Belege passend zu den Buchungen wieder hinaus ins Kanzleiprogramm.“
- NEU B-38 [Bereich 13]: „Kontobewegungen (Datum, Betrag, Empfänger) und Belegfotos bzw. PDFs der Mandanten.“
- NEU B-39 [Bereich 14]: „personenbezogene Daten: ja“
- NEU B-40 [Bereich 14]: „Steuerliche Schweigepflicht, Daten nur auf Servern in Deutschland, danach löschen.“
- NEU B-41 [Bereich 15]: „Budget-Rahmen: 60 bis 130 Euro im Monat“
- NEU B-42 [Bereich 15]: „Kein weiteres großes Portal.“
- NEU O-01 [Bereich 18]: „Wie genau kommen die offenen Posten aus dem Kanzleiprogramm heraus und die Belege wieder hinein?“
- NEU O-02 [Bereich 18]: „Nach wie vielen Tagen werden die Daten gelöscht?“
- NEU O-03 [Bereich 18]: „Wie oft und auf welchem Weg wird erinnert (Mail, SMS)?“

## Offene Punkte
- O-01: Wie genau kommen die offenen Posten aus dem Kanzleiprogramm heraus und die Belege wieder hinein?
- O-02: Nach wie vielen Tagen werden die Daten gelöscht?
- O-03: Wie oft und auf welchem Weg wird erinnert (Mail, SMS)?

## Summe
Stunden F1 152,1–278,5 · Kosten-Nutzen: Grenzlinie keine

Die Summe enthält zusätzlich zu den Zeilen: Anpassung an den Betrieb 2–6 h, Abstimmung 15 % (16,9–30,9 h), Puffer 20 % (22,5–41,3 h).

## Erklärungen und Sterne
- Verschwiegenheitserklärung aktiviert: nein · Vereinbarung Zahlung/Rechte aktiviert: nein · Wartungsvertrag aktiviert: nein
- Sterne der Mitarbeiter: noch keine

## Vollständiger Stand (zum Einlesen)
```json
{"bedarf":[{"id":"B-01","nr":1,"text":"Wir schicken den Mandanten Excel-Listen mit den offenen Kontobewegungen per Mail und telefonieren hinterher.","sichtbar":true},{"id":"B-02","nr":1,"text":"Antworten kommen in Stücken: per Mail, per Post, als Foto per Messenger.","sichtbar":true},{"id":"B-03","nr":1,"text":"Das Online-Portal unseres Kanzleiprogramms nutzt etwa die Hälfte der Mandanten nicht (Anmeldung, App, Vertrag sind zu viel).","sichtbar":true},{"id":"B-04","nr":2,"text":"Belege zu Kontobewegungen ohne Beleg bei den Mandanten anfordern und einsammeln (Buchhaltung)","sichtbar":true},{"id":"B-05","nr":2,"text":"Kundenkontakt mit den Mandanten: nachfragen, erinnern","sichtbar":true},{"id":"B-06","nr":3,"text":"Inhaberin (Steuerberaterin)","sichtbar":true,"anzahl":1},{"id":"B-07","nr":3,"text":"Mitarbeiter der Kanzlei","sichtbar":true,"anzahl":4},{"id":"B-08","nr":3,"text":"Mandanten: kleine Handwerker, Läden, Freiberufler, ältere Vermieter","sichtbar":true,"anzahl":120},{"id":"B-09","nr":4,"text":"Zeitverlust: wir laufen fehlenden Belegen hinterher, das Buchen selbst geht schnell.","sichtbar":true},{"id":"B-10","nr":4,"text":"Viele Mandanten haben jeden Monat 15, 20, manchmal 40 Kontobewegungen ohne Beleg.","sichtbar":true},{"id":"B-11","nr":4,"text":"Antworten kommen verstreut über Mail, Post und Messenger und müssen von Hand den Buchungen zugeordnet werden.","sichtbar":true},{"id":"B-12","nr":4,"text":"Fehlende Übersicht, welcher Mandant geantwortet hat und welcher nicht.","sichtbar":true},{"id":"B-13","nr":4,"text":"Meine Leute müssen jeden Mandanten mehrmals anschreiben oder anrufen.","sichtbar":true},{"id":"B-14","nr":5,"text":"Das Portal ist für viele Mandanten zu kompliziert, besonders für ältere.","sichtbar":true},{"id":"B-15","nr":5,"text":"Excel-Listen per Mail sind für die Mandanten unübersichtlich, sie antworten nicht je Posten.","sichtbar":true},{"id":"B-16","nr":5,"text":"Es gibt keine automatische Erinnerung.","sichtbar":true},{"id":"B-17","nr":6,"text":"Jeder Mandant sieht genau seine eigenen offenen Posten auf dem Handy, ohne Anmeldung und ohne App.","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":6,"text":"Weniger Telefonieren und Erklären"},"handeln":"egal"},{"id":"B-18","nr":6,"text":"Der Mandant kann je Posten schnell antworten: Foto vom Beleg, „war privat“, „kommt später“.","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":8,"text":"Antworten kommen geordnet statt in Stücken"},"handeln":"egal"},{"id":"B-19","nr":6,"text":"Kein Fremder darf die Posten oder Belege eines Mandanten sehen.","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"Schweigepflicht"},"handeln":"egal"},{"id":"B-20","nr":6,"text":"Die Mandanten werden selbst erinnert, wenn sie nicht antworten.","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":5,"text":"Meine Leute müssen nicht jeden dreimal anschreiben"},"handeln":"selbst"},{"id":"B-21","nr":6,"text":"Die Belege kommen passend zu den Buchungen zurück, damit wir sie nur noch übernehmen.","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":4,"text":"Kein Zuordnen von Hand"},"handeln":"vorschlagen"},{"id":"B-22","nr":6,"text":"Auf einen Blick sehen, welcher Mandant geantwortet hat und welcher nicht.","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":2,"text":"Übersicht für die Kanzlei"},"handeln":"egal"},{"id":"B-23","nr":6,"text":"Die Daten verschwinden danach wieder.","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"Schweigepflicht, nichts bleibt liegen"},"handeln":"selbst"},{"id":"B-24","nr":7,"text":"Jeder Mandant beantwortet seine offenen Posten selbst auf dem Handy, die Kanzlei übernimmt die Belege fertig zugeordnet und spart jede Woche ein paar Stunden Telefonieren.","sichtbar":true},{"id":"B-25","nr":8,"text":"Das System muss die offenen Kontobewegungen je Mandant aus einer Liste der Kanzlei übernehmen.","sichtbar":true},{"id":"B-26","nr":8,"text":"Das System muss jedem Mandanten einen eigenen Zugang ohne Anmeldung geben, den nur er öffnen kann.","sichtbar":true},{"id":"B-27","nr":8,"text":"Das System muss je offenem Posten die Antworten „Foto/Beleg hochladen“, „war privat“ und „kommt später“ anbieten.","sichtbar":true},{"id":"B-28","nr":8,"text":"Das System muss Mandanten, die nicht geantwortet haben, selbstständig erinnern.","sichtbar":true},{"id":"B-29","nr":8,"text":"Das System muss der Kanzlei zeigen, welcher Mandant geantwortet hat und welcher nicht.","sichtbar":true},{"id":"B-30","nr":8,"text":"Das System muss die Belege den Buchungen zugeordnet an die Kanzlei zurückgeben.","sichtbar":true},{"id":"B-31","nr":8,"text":"Das System muss die Daten nach Abschluss wieder löschen.","sichtbar":true},{"id":"B-32","nr":9,"text":"Festlegen, wer in der Kanzlei die Listen hochlädt und die Antworten übernimmt.","sichtbar":true},{"id":"B-33","nr":9,"text":"Kurze Einweisung für die Mitarbeiter; die Mandanten sollen ohne Erklärung zurechtkommen.","sichtbar":true},{"id":"B-34","nr":10,"text":"Kanzlei an Windows-PCs, Mandanten fast alle mit Handy.","sichtbar":true},{"id":"B-35","nr":10,"text":"Server in Deutschland.","sichtbar":true},{"id":"B-36","nr":11,"text":"Unser Kanzleiprogramm mit Online-Portal für Mandanten; es bleibt das Hauptprogramm.","sichtbar":true},{"id":"B-37","nr":12,"text":"Offene Posten aus dem Kanzleiprogramm hinein, Belege passend zu den Buchungen wieder hinaus ins Kanzleiprogramm.","sichtbar":true},{"id":"B-38","nr":13,"text":"Kontobewegungen (Datum, Betrag, Empfänger) und Belegfotos bzw. PDFs der Mandanten.","sichtbar":true},{"id":"B-39","nr":14,"text":"personenbezogene Daten: ja","sichtbar":true},{"id":"B-40","nr":14,"text":"Steuerliche Schweigepflicht, Daten nur auf Servern in Deutschland, danach löschen.","sichtbar":true},{"id":"B-41","nr":15,"text":"Budget-Rahmen: 60 bis 130 Euro im Monat","sichtbar":true},{"id":"B-42","nr":15,"text":"Kein weiteres großes Portal.","sichtbar":true},{"id":"O-01","nr":18,"text":"Wie genau kommen die offenen Posten aus dem Kanzleiprogramm heraus und die Belege wieder hinein?","sichtbar":true,"wer":"","bis":""},{"id":"O-02","nr":18,"text":"Nach wie vielen Tagen werden die Daten gelöscht?","sichtbar":true,"wer":"","bis":""},{"id":"O-03","nr":18,"text":"Wie oft und auf welchem Weg wird erinnert (Mail, SMS)?","sichtbar":true,"wer":"","bis":""}],"bausteine":[{"id":"K-01","katalog":"schnitt","name":"Einlesen der offenen Kontobewegungen je Mandant aus dem CSV-Export des Kanzleiprogramms (Datum, Betrag, Empfänger, Buchungsnummer)","menge":1,"groesse":"mittel","faktoren":["server"],"deckt":["B-25","B-37","B-38"],"ermaessigt":false},{"id":"K-02","katalog":"datei","name":"Mandanten-Seite im Handy-Browser über persönlichen, schwer zu erratenden Link mit Ablaufdatum (ohne Anmeldung, ohne App), zeigt nur die eigenen offenen Posten","menge":1,"groesse":"gross","faktoren":["server"],"deckt":["B-17","B-19","B-26"],"ermaessigt":false},{"id":"K-03","katalog":"neu","name":"Antwort je Posten: Foto aufnehmen oder Datei hochladen, „war privat“, „kommt später“; Belege verschlüsselt auf Server in Deutschland","menge":1,"groesse":"mittel","faktoren":["server"],"deckt":["B-18","B-27"],"ermaessigt":false},{"id":"K-04","katalog":"kalender","name":"Automatische Erinnerung per Mail an Mandanten mit offenen Posten (Abstand einstellbar, höchstens drei Mal)","menge":1,"groesse":"klein","faktoren":["server"],"deckt":["B-20","B-28"],"ermaessigt":false},{"id":"K-05","katalog":"liste","name":"Kanzlei-Übersicht am Windows-PC im Browser: je Mandant offen/beantwortet/teilweise, letzte Antwort","menge":1,"groesse":"mittel","faktoren":["nutzer"],"deckt":["B-22","B-29"],"ermaessigt":false},{"id":"K-06","katalog":"schnitt","name":"Rückgabe: Belege als Dateien mit Buchungsbezug im Dateinamen plus CSV-Liste der Antworten zum Import ins Kanzleiprogramm","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-21","B-30","B-37"],"ermaessigt":false},{"id":"K-07","katalog":"tresor","name":"Löschfrist: Posten, Belege und Links werden nach Übernahme bzw. fester Frist automatisch gelöscht, Löschprotokoll ohne Inhalte","menge":1,"groesse":"klein","faktoren":["server"],"deckt":["B-23","B-31","B-40"],"ermaessigt":false}],"rahmen":{"geraete":["windows","android","iphone","browser"],"offline":"nein","eigene":["hinher"],"eigeneText":"Kanzleiprogramm: offene Posten hinein, Belege zurück","datenort":["server"],"sicherung":["verschluesselt"]},"nicht":[{"id":"N-01","text":"nicht buchen","sichtbar":true},{"id":"N-02","text":"nicht kontieren","sichtbar":true},{"id":"N-03","text":"den Mandanten keine Steuertipps geben","sichtbar":true},{"id":"N-04","text":"kein weiteres großes Portal, das Kanzleiprogramm bleibt","sichtbar":true},{"id":"N-05","text":"keine Anmeldung oder App für Mandanten","sichtbar":true}]}
```
