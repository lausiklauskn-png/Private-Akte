# Bauplan · Vorgang V-2026-0001 · Fassung 1 · Kunde ⟦KUNDE-1⟧

## 1. In einem Satz
Eine schlanke Web-Anwendung auf einem Server in Deutschland, mit der die Steuerkanzlei ⟦KUNDE-1⟧ (1 Inhaberin, 4 Mitarbeiter) die offenen Kontobewegungen ihrer rund 120 Mandanten aus dem CSV-Export des Kanzleiprogramms einliest, jedem Mandanten über einen persönlichen Link ohne Anmeldung zum Beantworten je Posten (Beleg-Foto, „war privat“, „kommt später“) gibt, selbst erinnert und die Belege passend zu den Buchungen zurückgibt und danach löscht.

## 2. Plattformen, Geräte, Technik-Grundentscheidungen
- Geräte: Kanzlei am Windows-PC im Browser (B-34); Mandanten im Handy-Browser (Android, iPhone), ohne App (N-05).
- Online-Anwendung (Ohne Internet: nein) – kein Offline-Betrieb nötig.
- Ein Server in Deutschland (B-35, B-40), eine Anwendung mit zwei Oberflächen: Kanzlei-Bereich und Mandanten-Seite.
- Mandanten-Seite: leichtes, responsives HTML, Kamera über `<input type="file" accept="image/*" capture>`, große Knöpfe, keine Erklärung nötig (B-33).
- Kanzlei-Bereich: Anmeldung nur für Kanzlei-Mitarbeiter (N-05 betrifft nur Mandanten); Rollen „lädt hoch / übernimmt“ (B-32).
- Belege verschlüsselt abgelegt (Schlüssel auf dem Server getrennt von den Daten), Transport nur HTTPS.
- Mailversand über einen Versanddienst/SMTP mit Sitz in Deutschland/EU.
- Wiederverwendung laut Auftrag: Datei-Post (K-02, 60 %), Familienakte Kalender/Glocke (K-04, 50 %), Küchenzettel (K-05, 60 %), Pro-Tresor/Vollsicherung (K-07, 50 %).
- Betriebskosten im Rahmen 60–130 €/Monat (B-41) halten: ein kleiner Server, kein großes Portal (B-42, N-04).

## 3. Bereiche/Seiten
1. Kanzlei: Anmeldung.
2. Kanzlei: Einlesen (CSV hochladen, Vorschau, Zuordnung zu Mandanten).
3. Kanzlei: Übersicht aller Mandanten mit Zustand (K-05).
4. Kanzlei: Mandant im Detail (Posten, Antworten, Belege ansehen, Link erneuern/sperren).
5. Kanzlei: Rückgabe/Übernahme (Vorschlag prüfen, bestätigen, herunterladen).
6. Kanzlei: Einstellungen (Erinnerungsabstand, Löschfrist, Mailtexte, Link-Laufzeit).
7. Kanzlei: Löschprotokoll.
8. Mandant: eine Seite „Ihre offenen Posten“ (nur über den Link).

## 4. Funktionen
1. **K-01 Einlesen (NEU BAUEN):** CSV-Export des Kanzleiprogramms je Mandant einlesen; Felder Datum, Betrag, Empfänger, Buchungsnummer; Trennzeichen/Zeichensatz erkennen; Vorschau mit Fehlerzeilen; doppelte Buchungsnummern nicht doppelt anlegen. Deckt B-25, B-37, B-38.
2. **K-02 Mandanten-Seite (NEU BAUEN):** je Mandant und Durchgang ein langer, zufälliger Link (≥ 128 Bit) mit Ablaufdatum; zeigt nur dessen eigene offene Posten; ohne Anmeldung, ohne App; Kanzlei kann Link sperren und neu erzeugen; abgelaufene/gesperrte Links zeigen nur einen neutralen Hinweis; keine Suchmaschinen-Indizierung. Deckt B-17, B-19, B-26.
3. **K-03 Antwort je Posten (NEU BAUEN):** je Posten „Foto aufnehmen / Datei hochladen“ (Bild, PDF), „war privat“, „kommt später“; mehrere Dateien je Posten; Antwort sofort gespeichert, Zustand sichtbar; Belege verschlüsselt auf dem Server in Deutschland; Größen-/Typprüfung. Keine Steuertipps auf der Seite (N-03). Deckt B-18, B-27.
4. **K-04 Erinnerung (NEU BAUEN, darf selbst handeln):** automatisch per Mail an Mandanten mit offenen Posten; Abstand einstellbar; höchstens drei Erinnerungen; stoppt, sobald alles beantwortet ist; Mail enthält den Link, aber keine Beträge/Empfänger. Deckt B-20, B-28.
5. **K-05 Kanzlei-Übersicht (NEU BAUEN):** je Mandant offen / teilweise / beantwortet, Zahl offener Posten, Datum der letzten Antwort, Zahl versandter Erinnerungen; sortier- und filterbar; mehrere Mitarbeiter gleichzeitig. Deckt B-22, B-29.
6. **K-06 Rückgabe (NEU BAUEN, schlägt vor, Kanzlei bestätigt):** Belegdateien mit Buchungsbezug im Dateinamen (z. B. Buchungsnummer_Datum_Betrag) plus CSV-Liste der Antworten (Buchungsnummer, Antwort, Dateiname) zum Import ins Kanzleiprogramm; erst nach Bestätigung durch die Kanzlei als ZIP herunterladbar und als „übernommen“ markiert. Deckt B-21, B-30, B-37.
7. **K-07 Löschfrist (NEU BAUEN, darf selbst handeln):** Posten, Belege und Links werden nach Übernahme bzw. nach fester Frist automatisch gelöscht; Löschprotokoll ohne Inhalte (nur Mandanten-Kürzel, Anzahl, Zeitpunkt, Grund). Deckt B-23, B-31, B-40.

## 5. Datenhaltung, Sicherung, Datenschutz
- Daten: Mandantenkennung, Mailadresse, Posten (Datum, Betrag, Empfänger, Buchungsnummer), Antworten, Belegdateien, Link-Token (nur als Hash gespeichert), Protokolle.
- Personenbezogene Daten und steuerliche Schweigepflicht (B-39, B-40): Server nur in Deutschland, Auftragsverarbeitungsvertrag mit Hoster und Mailversender, verschlüsselte Ablage der Belege, Zugriffsprotokoll im Kanzlei-Bereich.
- Sicherung verschlüsselt (Rahmen); Sicherungen laufen mit kurzer Aufbewahrung aus, damit die Löschfrist nicht durch alte Sicherungen unterlaufen wird.
- Mandanten-Link verrät nichts ohne Token; Begrenzung von Abrufversuchen.

## 6. Schnittstellen/Zusammenspiel
- Hinein: CSV-Export des Kanzleiprogramms (K-01).
- Hinaus: Belegdateien + CSV-Liste zum Import ins Kanzleiprogramm (K-06). Das Kanzleiprogramm bleibt Hauptprogramm (B-36, N-04).
- Mail: Versand der Links und Erinnerungen (K-04).
- Eigene Programme: nur Dateien hin- und hergeben, keine direkte Programmschnittstelle.

## 7. Ausdrücklich nicht gebaut
- N-01 nicht buchen · N-02 nicht kontieren · N-03 keine Steuertipps an Mandanten · N-04 kein weiteres großes Portal, das Kanzleiprogramm bleibt · N-05 keine Anmeldung oder App für Mandanten.
- Keine SMS (nicht beauftragt, siehe offene Frage O-03), keine Texterkennung/Belegprüfung, keine Messenger-Anbindung.

## 8. Reihenfolge der Bauschritte
1. Server in Deutschland, Grundgerüst, Kanzlei-Anmeldung, verschlüsselte Ablage, Sicherung.
2. K-01 Einlesen mit Beispiel-CSV (erfundene Daten).
3. K-02 Link-Erzeugung und Mandanten-Seite.
4. K-03 Antworten und Beleg-Upload, Test auf Android- und iPhone-Browsern.
5. K-05 Kanzlei-Übersicht.
6. K-06 Rückgabe mit Bestätigung, Import-Probe ins Kanzleiprogramm.
7. K-04 Erinnerungen.
8. K-07 Löschfrist und Löschprotokoll.
9. Einweisung der Mitarbeiter (B-33), Pilot mit wenigen Mandanten, dann alle.

## 9. Abnahmekriterien
- B-25: CSV-Export eines Mandanten wird vollständig und ohne Doppelungen eingelesen.
- B-26/B-19: Link öffnet nur die Posten dieses Mandanten; fremde/geratene/abgelaufene/gesperrte Links zeigen nichts.
- B-27: Je Posten sind „Foto/Beleg hochladen“, „war privat“, „kommt später“ auf Android und iPhone im Browser bedienbar.
- B-28: Ohne Antwort kommt nach eingestelltem Abstand eine Mail, höchstens drei, danach keine mehr; nach vollständiger Antwort keine.
- B-29: Übersicht zeigt je Mandant den richtigen Zustand und die letzte Antwort.
- B-30: Belegdateien tragen den Buchungsbezug, CSV-Liste lässt sich ins Kanzleiprogramm importieren; Rückgabe erst nach Bestätigung.
- B-31: Nach Übernahme bzw. Frist sind Posten, Belege, Links gelöscht; Protokoll enthält keine Inhalte.
- Allgemein: Daten nur auf dem Server in Deutschland; Mandanten kommen ohne Erklärung zurecht (Probe mit älteren Mandanten).
- Schätzung F1: 152,1–278,5 h (inkl. Anpassung, Abstimmung, Puffer).

## 10. Offene Fragen an den Kunden, Unklarheiten, Widersprüche
- **O-01:** Wie genau kommen die offenen Posten aus dem Kanzleiprogramm heraus und die Belege wieder hinein? (Welches Programm, welches CSV-Format, welches Importformat für Belege? Davon hängen K-01 und K-06 ab.)
- **O-02:** Nach wie vielen Tagen werden die Daten gelöscht? (K-07 braucht eine Zahl; auch: Löschung sofort nach Übernahme oder erst nach Frist?)
- **O-03:** Wie oft und auf welchem Weg wird erinnert (Mail, SMS)? K-04 sieht nur Mail vor; SMS wäre nicht geschätzt.
- **Mailadressen fehlen:** K-01 liest Datum, Betrag, Empfänger, Buchungsnummer – woher kommen Mandanten-Zuordnung und Mailadressen (eigene Liste, Spalte im Export, Eingabe von Hand)?
- **Link-Versand:** Wie erhält der Mandant den Link zuerst (Mail der Anwendung, Mail der Kanzlei)? Nicht als Baustein beschrieben.
- **Widerspruch B-26/B-19 und Link ohne Anmeldung:** Ein weitergeleiteter Link öffnet die Posten für jeden. Reicht das, oder ist ein zweiter Faktor ohne Anmeldung gewünscht (z. B. PLZ/Geburtsjahr abfragen)?
- **Link-Laufzeit:** wie lange gilt ein Link, je Durchgang ein neuer?
- **B-21 „vorschlagen“ vs. K-06:** Bestätigung in der Anwendung angenommen – soll die Kanzlei einzelne Zuordnungen ändern können?
- **Löschen vs. verschlüsselte Sicherung:** Wie lange dürfen Sicherungen Belege enthalten, ohne die Löschfrist zu verletzen?
- **„kommt später“:** löst das eine eigene Erinnerung aus oder zählt der Posten als beantwortet?
- **Teilweise Beantwortung / neue Posten:** Werden bei einem neuen Monat Posten an einen bestehenden Link angehängt oder neuer Durchgang?
- **Vorlagen K-04/K-07:** Familienakte-Kalender/Glocke und Pro-Tresor sind Geräte-Apps; ob 50 % davon auf einen Server-Mailversand bzw. Server-Löschlauf übertragbar sind, ist fraglich – Schätzung prüfen.
- **Budget B-41 (60–130 €/Monat):** gilt das für Betrieb (Server, Mail) oder auch für Wartung? Euro-Beträge stehen nicht im Auftrag.
- **Rechtliches:** Verschwiegenheitserklärung, Vereinbarung und Wartungsvertrag sind nicht aktiviert; AV-Vertrag mit Hoster/Mailversand muss die Kanzlei abschließen.
- **Wer übernimmt (B-32):** Rollen in der Kanzlei festlegen; Bedarf an Rechten je Mitarbeiter.
- Kein Baustein als NOCH NICHT GESCHÄTZT markiert; keine UNVERÄNDERT-Zeilen (Fassung 1).
