# Bauplan · Vorgang V-2026-0001 · Fassung 1 · Kunde ⟦KUNDE-1⟧

## 1. Zweck und Nutzer
Eine App, in der die Inhaberin eines Geschenkeladens Belege (Foto, E-Mail), Tageskasse und Umsatzsteuer an einer Stelle führt, getrennt für Laden und Haushalt, und dem Steuerberater eine fertige Datei gibt.
Nutzer: Inhaberin (B-13), Aushilfen im Laden (B-14, Rolle offen O-03), Steuerberater nur als Empfänger der Datei (B-15), Familie über das Haushaltsbuch (B-16; ob sie selbst bedient: Annahme nein).

## 2. Plattformen und Laufzeit
- Android-Handy im Laden (B-52) und Windows-PC im Büro (B-53), eine App für beide (K-04).
- Vollständig offline nutzbar (B-54); kein Konto, keine Cloud (B-56, B-71); Passwort beim Öffnen (B-55).
- Ob und wie Handy und PC abgleichen, ist offen (O-06); bis dahin: jedes Gerät führt seinen eigenen Bestand (Annahme).

## 3. Bereiche der Oberfläche
1. Entsperren (Passwort)
2. Übersicht: Umsatzsteuer fällig, Rücklage, Kassenstand heute (K-05)
3. Belege: Liste, Foto aufnehmen, geteilte Mail/PDF empfangen, Vorschlag bestätigen (K-01, K-02)
4. Kasse: Tagesabschluss erfassen, Verlauf, Storno (K-03)
5. Kontoauszug: PDF einlesen, Umsätze abhaken (K-08)
6. Export für den Steuerberater (K-06)
7. Umschalter Buch: Laden / Haushalt (K-07)
8. Einstellungen: Passwort, Kategorien, Steuersätze, Sicherung (Annahme: nötig für 4./5.)

## 4. Funktionen (prüfbar)
1. Foto eines Belegs mit der Handykamera aufnehmen und als Beleg ablegen (K-01).
2. Text des Fotos auf dem Gerät auslesen, ohne Netz (K-01, Faktor offline).
3. Datum, Betrag, Steuersatz und Aussteller als Vorschlag in Felder füllen (K-01).
4. Kategorie vorschlagen; der Beleg gilt erst nach Bestätigung (K-01, B-39).
5. Mail bzw. PDF-Anhang über „Teilen“ an die App geben, als Beleg ablegen und auslesen (K-02).
6. Abends gezählten Kassenstand erfassen und als Tagesabschluss festschreiben (K-03).
7. Festgeschriebene Einträge lassen sich nicht ändern, nur stornieren; Storno ist ein neuer Eintrag (K-03).
8. Hash-Kette über die Kasseneinträge; eine Prüfung zeigt, ob die Kette unverändert ist (K-03, B-42, B-72).
9. Übersicht rechnet fällige Umsatzsteuer laufend aus den Belegen/Umsätzen (K-05).
10. Übersicht zeigt empfohlene Rücklage (K-05; Rechenregel offen, s. 9.).
11. Übersicht zeigt Kassenstand heute (K-05).
12. Zwei getrennte Bücher (Laden, Haushalt); jeder Beleg gehört genau einem Buch (K-07).
13. Export: eine Datei mit Buchungen und Belegen erzeugen (K-06; Format nach O-01).
14. Kontoauszug-PDF einlesen, Umsätze erkennen, je Umsatz einen Beleg zuordnen und abhaken (K-08).
15. Alle gespeicherten Daten nur mit dem Passwort lesbar (K-04).

## 5. Datenhaltung und Sicherheit
- Alle Daten lokal auf dem jeweiligen Gerät, verschlüsselt mit einem aus dem Passwort abgeleiteten Schlüssel (K-04).
- Belegbilder/PDFs ebenfalls verschlüsselt abgelegt (Annahme: gehören zu „Daten“ in K-04).
- Personenbezogene Daten vorhanden (B-69): nichts verlässt das Gerät außer dem bewusst erzeugten Export.
- Kassenbuch nur anhängend, Hash-Kette, Storno statt Ändern (K-03).
- Sicherung: im Auftrag nicht als Baustein genannt. Ohne Cloud droht bei Geräteverlust Totalverlust; verschlüsselte Sicherungsdatei auf Wunsch (Annahme, als Frage gestellt).
- Passwort vergessen: kein Rückweg vorgesehen (Annahme, als Frage gestellt).

## 6. Schnittstellen
- Android-/Windows-„Teilen“ bzw. Datei öffnen für Mails und PDF-Anhänge (K-02).
- Kontoauszug-PDF aus dem Onlinebanking als Datei (K-08); keine Bankanbindung.
- Exportdatei an den Steuerberater (K-06); Versand macht die Nutzerin selbst (Annahme).
- Kamera des Handys (K-01).

## 7. Bewusste Grenzen
- Keine Cloud, kein Server, kein Konto (B-56, B-71).
- Kein Abruf aus dem E-Mail-Postfach; nur Teilen in die App (K-02 nennt nur Teilen).
- Kein Excel-Import, obwohl Excel heute genutzt wird (B-04/B-57): nicht beauftragt.
- Kein Geräteabgleich Handy ↔ PC, bis O-06 geklärt ist.
- Keine TSE/Registrierkasse; nur offenes Kassenbuch mit Tagesabschluss (K-03). Ob das reicht, klärt O-02.
- Exportformat wird nicht geraten (O-01); bis dahin nur interne Struktur vorbereiten.
- Keine Rollen/Rechte für Aushilfen, bis O-03 geklärt ist.

## 8. Reihenfolge der Bauschritte
1. K-04 Grundgerüst: App Android + Windows, Passwort, verschlüsselte lokale Ablage.
2. K-07 Zwei Bücher als Grundstruktur aller Daten.
3. K-03 Kassenbuch mit Festschreiben, Storno, Hash-Kette (Muss).
4. K-01 Beleg per Foto mit Auslesen und Kategorievorschlag (Muss).
5. K-02 Mail/PDF teilen → Beleg.
6. K-05 Übersicht (USt, Rücklage, Kassenstand).
7. K-06 Export (erst nach O-01).
8. K-08 Kontoauszug abhaken (Kann, zuletzt).

## 9. Offene Fragen an den Kunden
- O-01 Dateiformat für den Steuerberater (klärt Steuerberater).
- O-02 Vorgaben des Finanzamts für die Bargeldkasse (klärt Steuerberater).
- O-03 Erfassen Aushilfen die Kasse selbst? Eigenes Passwort/Kennung? (klärt ⟦KUNDE-2⟧)
- O-04 Belege pro Monat (klärt ⟦KUNDE-2⟧).
- O-05 Zeitaufwand heute (klärt ⟦KUNDE-2⟧).
- O-06 Abgleich Handy ↔ PC und wie ohne Cloud (klärt ⟦KUNDE-2⟧).
- Nach welcher Regel soll die Rücklage berechnet werden (nur USt, oder auch Einkommensteuer)?
- Umsatzsteuer: Regelbesteuerung oder Kleinunternehmer? Voranmeldung monatlich oder vierteljährlich?
- Wie kommen die Ladenumsätze in die USt-Rechnung: nur aus dem Kassenabschluss?
- Sicherung der Daten gewünscht, und wohin (Stick, PC-Ordner)?
- Was gilt bei vergessenem Passwort?
- Welche Kategorien gibt es im Laden und im Haushalt?
- Sollen Excel-Altdaten übernommen werden?

## 10. Unklar, widersprüchlich, doppelt (mit Fundstelle)
- Budget „einmalig bis etwa 200 Euro“ (B-73) gegen Summe 130,8–237,8 h (Abschnitt „Summe“): passt in keinem üblichen Stundensatz zusammen; „Grenzlinie keine“ heißt, nichts ist abgeschnitten.
- Größe gegen Stunden: K-01 „mittel“ mit 5,2–8,6 h, aber K-02 „klein“ mit 6,9–13,8 h und K-07/K-05 „klein“ mit 8,3–13,8 h (Tabelle „Zu tun“).
- K-01 mittel mit nur 5,2–8,6 h für Kamera, Texterkennung offline und Kategorisierung wirkt sehr knapp.
- K-06 soll gebaut werden, Format ist aber offen (K-06 verweist selbst auf O-01).
- K-03 „Finanzamt nichts auszusetzen“ (B-36) gegen offene Vorgaben (O-02); Hash-Kette ist gesetzt, ob sie genügt, ist offen.
- K-04 „App für Android und Windows“ gegen O-06: zwei Geräte ohne Abgleich ergeben zwei Bestände; Übersicht „Kassenstand heute“ am PC wäre dann leer.
- Aushilfen sind Nutzer (B-14, Anzahl 2), Abläufe „noch klären“ (B-51, O-03): kein Baustein für Rollen.
- Excel (B-04, B-57) steht im Bestand, aber kein Baustein für Import oder Ablösung.
- Laufende USt (K-05) braucht Umsätze; welcher Baustein die Ladenumsätze erfasst, steht nirgends (nur Kassenstand in K-03, B-66).
- Kopf: `repo: "Workflow-Needs"` passt nicht zu einer Buchhaltungs-App (Annahme: Platzhalter/Vorgabe des Werkzeugs).
- Kopf: `datum: 2026-11-14` liegt nach heute (13.11.2026).
- Doppelt: B-04/B-57, B-05/B-58, B-06/B-59/B-62, B-02/B-60/B-63, B-35/B-50/B-75, B-49/B-74, B-55/B-70, B-56/B-71, B-28/B-41/B-42/B-72, B-27/B-38/B-39.
- Doppelt: Abschnitt „Bedarfsprotokoll – Änderungen“ und „Vollständiger Stand“ und der JSON-Block wiederholen dieselben Einträge; O-01…O-06 stehen viermal.
- NOCH NICHT GESCHÄTZT: keine Zeile so markiert. UNVERÄNDERT/ANPASSEN/ENTFERNEN: keine.
