# Bauplan · Vorgang V-2026-0001 · Fassung 1 · Kunde ⟦KUNDE-1⟧

## 1. Zweck und Nutzer
Ein Ein-Personen-Betrieb (Inhaber allein, B-09) soll Angebote, Rechnungen und Belege direkt auf dem Android-Handy
erledigen, damit kein doppeltes Tippen und keine Sonntags-Buchhaltung mehr nötig ist (B-12–B-14, B-20, B-21).
Nutzer ist nur der Inhaber; Kunden bekommen Angebot/Rechnung als PDF, der Steuerberater bekommt Daten (Weg offen, O-01).

## 2. Plattformen und Laufzeit
- Android-Handy auf der Baustelle (B-40); andere Plattformen sind nicht verlangt.
- Läuft offline (Faktor „offline“ an K-02, K-03, K-05); Beleg-Erkennung ebenfalls auf dem Gerät (K-03: Faktoren ki + offline).
- Kein Konto, keine Cloud (K-05, B-24, B-48).
- Technik (Annahme): eine einzige App ohne Server; ob native App oder installierbare Web-App, entscheidet die Kamera-/Speicherfrage in Schritt 1.

## 3. Bereiche der Oberfläche (Annahme: Aufteilung aus K-01–K-05 abgeleitet)
1. Übersicht (Einnahmen/Ausgaben des Jahres, B-27, B-34)
2. Kunden (Kundenstamm, B-37)
3. Angebote → Rechnungen (B-30, B-31)
4. Belege (Kamera, Liste, Vorschlag bestätigen; B-32, B-33)
5. Jahresabschluss: EÜR- und Umsatzsteuer-Vorbereitung (B-35, B-36)
6. Einstellungen/Sicherung (Annahme, siehe 5.)

## 4. Funktionen (prüfbar)
1. Kunde anlegen, ändern, auswählen; Daten bleiben nach Neustart erhalten (K-01, B-37).
2. Angebot mit Positionen für einen Kunden erstellen und speichern (K-01, B-30).
3. Ein Knopf wandelt ein Angebot in eine Rechnung um, ohne erneutes Tippen der Positionen (K-01, B-20, B-25, B-31).
4. Angebot und Rechnung als PDF ausgeben (K-01).
5. Beleg mit der Handykamera aufnehmen (K-02, B-32, B-39).
6. Aufgenommenen Beleg zuschneiden und als PDF ablegen (K-02).
7. Aus dem Belegfoto Betrag, Datum und Aussteller auslesen, offline (K-03, B-21).
8. Zum Beleg Konto/Art vorschlagen; Nutzer bestätigt oder ändert (K-03, B-33; Bestätigen = Annahme, „vorschlagen“ heißt nicht „buchen“).
9. Übersicht Einnahmen/Ausgaben übers Jahr jederzeit anzeigen (K-04, B-27, B-34).
10. EÜR für das Jahr vorbereitet anzeigen/ausgeben (K-04, B-22, B-35).
11. Umsatzsteuermeldung vorbereitet anzeigen (K-04, B-23, B-36) – nur vorbereiten, nicht übermitteln.
12. Alle Daten lokal und verschlüsselt gespeichert; kein Netzverkehr mit Kundendaten (K-05, B-24, B-48).
13. Bedienung ohne Schulung verständlich (B-29, B-38) – Prüfung: Nutzer schafft Angebot→Rechnung und einen Beleg ohne Hilfe (Annahme als Maßstab).

## 5. Datenhaltung und Sicherheit
- Daten: Kunden, Angebote, Rechnungen, Belege (Fotos/PDF), Buchungen (B-43–B-46); personenbezogen (B-47).
- Ort: nur auf dem Gerät (K-05). Verschlüsselt (K-05); Schlüssel/Entsperren (Annahme: Gerätesperre oder eigenes Passwort – offen, siehe 9.).
- Sicherung: im Auftrag nicht genannt. Ohne Sicherung gehen bei Handyverlust alle Belege verloren → (Annahme) verschlüsselte Sicherungsdatei, die der Nutzer selbst ablegt. Muss bestätigt werden (Frage 9.6).
- Kein Server, keine Telemetrie (folgt aus B-24, B-48).

## 6. Schnittstellen
- Kamera des Android-Handys (K-02).
- PDF-Ausgabe/Teilen an Kunden (K-01) – Teilen über das System (Annahme).
- Steuerberater: Weg offen (O-01); nichts gebaut, bis geklärt.
- Altes Online-Programm: Übernahme offen (O-02); nichts gebaut.
- Finanzamt/ELSTER: nicht verlangt („vorbereiten“), kein Anschluss.

## 7. Bewusste Grenzen
- Kein Cloud-Konto, keine Synchronisation mehrerer Geräte (K-05, B-24).
- Keine Übermittlung an Finanzamt, keine Abgabe der EÜR – nur Vorbereitung (B-22, B-23, B-28).
- Keine Steuerberater-Schnittstelle und kein Import aus dem alten Programm, solange O-01/O-02 offen sind.
- Keine Mehrbenutzer-/Rechteverwaltung (Inhaber allein, B-09).
- Keine Bezahl-/Lizenzlogik (Abo vs. Einmalkauf ist offen, B-50/O-04).
- Keine Online-KI für die Beleg-Erkennung (offline verlangt, K-03; außerdem B-48).
- Word bleibt außen vor; es wird nichts aus Word importiert (nicht verlangt).

## 8. Reihenfolge der Bauschritte
1. K-05 Datenhaltung lokal + verschlüsselt (Grundlage für alles; Speicherfrage zuerst).
2. K-01 Kundenstamm, Angebote, Umwandlung in Rechnung, PDF.
3. K-02 Beleg per Kamera, Zuschnitt, PDF-Ablage.
4. K-04 Jahresübersicht, EÜR- und USt-Vorbereitung (zunächst mit von Hand erfassten Belegen).
5. K-03 Beleg-Erkennung offline mit Vorschlag (größter, unsicherster Baustein: 71,9–143,8 h; zuletzt, damit 1–4 vorher nutzbar sind).
Je Schritt: Probe des prüfbaren Punkts aus Abschnitt 4.

## 9. Offene Fragen an den Kunden (⟦KUNDE-2⟧)
1. O-01: Wie bekommt der Steuerberater die Daten (Datei, Format, Häufigkeit)?
2. O-02: Was passiert mit den Daten aus dem alten Online-Programm – übernehmen oder neu anfangen?
3. O-03: Wie viele Angebote, Rechnungen, Belege im Monat? (bestimmt Speicher und Erkennungsaufwand)
4. O-04: Budget Abo vs. Einmalkauf.
5. O-05: Wie viele Stunden kostet der Sonntag heute im Monat? (Nutzen hat überall `stundenMonat: null`)
6. Soll es eine Sicherung geben, und wohin (SD-Karte, eigener PC, …)? Nicht im Auftrag.
7. Kleinunternehmer (ohne USt) oder umsatzsteuerpflichtig? Davon hängt K-04 (USt-Vorbereitung, Rechnungsangaben) ab.
8. Welche Konten/Arten soll der Vorschlag kennen (eigener Kontenplan oder Vorgabe)?
9. Entsperren der verschlüsselten Daten: eigenes Passwort oder Handysperre?
10. Rechnungsnummern-Kreis, Pflichtangaben, Logo auf dem PDF?

## 10. Unklar, widersprüchlich oder doppelt (mit Fundstelle)
- **Summe passt nicht:** „Zu tun“ K-01–K-05 ergeben 152,4–287,1 h, „Summe“ nennt 208,5–395,6 h. Woher die Differenz kommt, steht nirgends.
- **Kopf `repo: "Workflow-Needs"`**: das zu bauende Produkt ist eine Buchhaltungs-App; ob wirklich in diesem Repo gebaut werden soll, ist unklar.
- **Datum 2026-11-14** im Kopf liegt nach dem heutigen Tag (13.11.).
- **Zwei Kundenplatzhalter:** `kunde: ⟦KUNDE-1⟧`, offene Punkte klärt `⟦KUNDE-2⟧` – gleiche Person oder Firma vs. Ansprechpartner? Unverändert übernommen.
- **K-04 Faktor „druck“** (JSON) bei Buchhaltung; Druck/PDF wird im Text für K-04 nicht verlangt.
- **K-03 „Konto/Art vorschlagen“**, aber kein Kontenrahmen genannt.
- **Doppelt:** Bedarfsprotokoll und „Vollständiger Stand“ sowie JSON enthalten dieselben B-01–O-05; offene Punkte O-01–O-05 stehen dreimal.
- **Inhaltlich doppelt:** B-20/B-25/B-31 (Angebot→Rechnung), B-21/B-33 (Vorschlag), B-32/B-39/B-26 (Kamera), B-22/B-35 und B-23/B-36, B-27/B-34, B-24/B-48, B-29/B-38/B-49.
- **Nicht abgedeckt durch einen Baustein:** B-29/B-38 (selbsterklärend), B-47/B-48 nur indirekt über K-05; O-01/O-02 ohne Baustein.
- **Fehlende Bereiche:** Bedarf springt über Bereich 12, 16 und 17 (keine Einträge) – bewusst leer oder vergessen?
- **„NOCH NICHT GESCHÄTZT“** kommt nicht vor; alle Bausteine sind NEU BAUEN, nichts UNVERÄNDERT/ANPASSEN/ENTFERNEN.
- **Sicherung** fehlt, obwohl Daten nur auf dem Handy liegen sollen (K-05) – Widerspruch zu B-13 (Belege gehen verloren).
- `euro: nein` – keine Beträge; Stundensatz fehlt wie vorgesehen.
