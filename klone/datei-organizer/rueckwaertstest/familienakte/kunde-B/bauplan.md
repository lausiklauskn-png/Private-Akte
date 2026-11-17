# Bauplan · Vorgang V-2026-0001 · Fassung 1 · Kunde ⟦KUNDE-1⟧

## 1. Zweck und Nutzer
Eine Android-App, mit der ein alleinerziehender Vater im Schichtdienst (B-09) Familienpapiere per Handyfoto ablegt, offline (auch per Sprache) wiederfindet und an Fristen erinnert wird (B-17, B-18, B-21–B-23).
Sie ersetzt Schuhkarton und WhatsApp-an-sich-selbst (B-01, B-02, B-13, B-14) und muss ohne Schulung, in höchstens einer Stunde erlernbar sein (B-19, B-28, B-39).

## 2. Plattformen und Laufzeit
- Nur Android-Handy (B-29); native App bzw. App mit nativen Teilen, weil Benachrichtigungen bei geschlossener App nötig sind (K-03, B-26).
- Offline: alle vier Bausteine tragen den Faktor „offline“ – Ablage, Suche und Erinnerung laufen ohne Internet.
- Konto: keins (Annahme – nichts im Auftrag verlangt eins; Budget „am liebsten kostenlos“, B-38).

## 3. Bereiche der Oberfläche
- Start/Überblick: nächste Fristen und zuletzt abgelegte Papiere (B-23).
- Aufnehmen: Kamera → Foto → ablegen (K-01).
- Suche: Suchfeld mit Mikrofon, Trefferliste (K-02).
- Fristen & Aufgaben: Liste, Anlegen mit Datum und Erinnerung (K-03).
- Rechnungen & Garantien: Kaufdatum, Garantieende (K-04).
- Dokumentansicht (Annahme: zum Ansehen eines Treffers nötig).

## 4. Funktionen (prüfbar)
1. Ein Papier lässt sich mit der Handykamera fotografieren und wird als Dokument gespeichert (K-01, B-24).
2. „Foto machen, fertig“: Ablegen geht ohne Pflichtfelder (B-21; Annahme: Titel/Art optional).
3. Abgelegte Dokumente erscheinen in einer Liste und lassen sich öffnen.
4. Suche findet Dokumente ohne Internet (K-02, B-25).
5. Das Suchfeld nimmt Spracheingabe an; erkannter Text wird gesucht (K-02, B-17).
6. Woran gesucht wird (Titel/Notiz vs. Text im Foto) – siehe Frage F4; ohne Klärung nur Titel/Notiz (Annahme).
7. Fristen und Aufgaben lassen sich mit Datum anlegen, ändern, erledigen (K-03).
8. Zum Fälligkeitszeitpunkt erscheint eine Android-Benachrichtigung, auch wenn die App geschlossen ist (K-03, B-22, B-26).
9. Erinnerungen überstehen einen Neustart des Handys (Annahme, folgt aus B-26).
10. Rechnungen/Garantien erfassen Kaufdatum und Garantieende (K-04, B-27).
11. Überblick zeigt kommende Fristen und Garantieenden (B-23; Annahme: Garantieende auch als Frist).
12. Bedienung ohne Schulung: höchstens wenige Hauptknöpfe, Erklärung in der App (B-19, B-28).

## 5. Datenhaltung und Sicherheit
- Alle Daten nur auf dem Handy (Fotos im App-Speicher, Einträge in lokaler Datenbank) – folgt aus offline und „nur ein Handy“.
- Personenbezogene Daten der Familie und der Tochter (B-37): App-Speicher privat, keine Übertragung nach außen.
- Verschlüsselung: nicht beauftragt; Vorschlag Geräteschutz/Bildschirmsperre genügt (Annahme) – Frage F6.
- Sicherung: nicht beauftragt. Bei Handyverlust sind die Daten weg – als Risiko benennen, Frage F5.

## 6. Schnittstellen
- Android-Kamera (K-01), Android-Spracherkennung (K-02), Android-Benachrichtigungen und Wecker/Alarm (K-03).
- Handykalender (B-30): NICHT angebunden, bis O-01 geklärt ist.
- WhatsApp (B-31): keine Anbindung beauftragt.

## 7. Bewusste Grenzen
- Keine Kalender-Kopplung (O-01 offen).
- Kein Import alter Fotos/Schuhkarton-Massenaufnahme (O-02 offen); einzeln per K-01 geht.
- Kein eigener TÜV-Baustein (B-08, B-35) – wird als Frist (K-03) bzw. Dokument (K-01) abgedeckt (Annahme).
- Keine Elternbrief-Sonderfunktion (B-06, B-32) – normale Ablage.
- Keine Texterkennung im Foto, keine Cloud, keine Sicherung, kein iPhone/PC – nicht im „Zu tun“.
- Kein Konto, keine Bezahlfunktion.

## 8. Reihenfolge der Bauschritte
1. App-Gerüst Android, lokale Speicherung, Navigation.
2. K-01 Aufnehmen und Ablegen (Grundlage für alles andere).
3. K-04 Rechnungen/Garantien (klein, baut auf Dokument auf).
4. K-03 Fristen mit Benachrichtigung bei geschlossener App, Neustart-Test.
5. K-02 Offline-Suche mit Spracheingabe (größter Block).
6. Überblick-Startseite, Einfachheitsprüfung gegen „eine Stunde Einarbeitung“.
7. Test auf einem echten Android-Handy.

## 9. Offene Fragen an ⟦KUNDE-2⟧
- O-01: Soll der Handykalender mitspielen oder bleibt er getrennt?
- O-02: Was passiert mit dem alten Schuhkarton – nachträglich abfotografieren?
- O-03: Wie viel darf es höchstens kosten, wenn nicht kostenlos?
- F4: Soll die Suche auch Text auf dem fotografierten Papier finden (Texterkennung)? Sonst findet man nur, was man selbst als Titel eintippt – widerspricht „Foto machen, fertig“.
- F5: Ist eine Sicherung (z. B. auf SD-Karte) gewünscht, falls das Handy verloren geht?
- F6: Reicht die Bildschirmsperre des Handys, oder soll die App selbst gesperrt/verschlüsselt sein (Daten der Tochter)?
- F7: Sollen Garantieenden automatisch erinnern (K-04 nennt nur „erfassen“)?
- F8: Welche Android-Version hat das Handy?

## 10. Unklar, widersprüchlich, doppelt
- Kein Eintrag „NOCH NICHT GESCHÄTZT“ – alle vier Zeilen geschätzt; trotzdem ist die Summe „33,7–61,5“ kleiner als die Summe der vier Zeilen? Nachgerechnet: 4,1+13,8+3,7+1,4 = 23,0; 6,9+23,5+6,4+2,8 = 39,6. **Summe (Abschnitt „Summe“) passt nicht zu den Zeilen** (Unterschied ~10,7–21,9 h; evtl. Gerüst/Gewährleistung eingerechnet, nicht erklärt).
- Doppelt gefasste Bedarfe: B-04/B-11/B-17/B-21/B-25 (wiederfinden), B-05/B-12/B-16/B-18/B-22/B-26/B-36 (Fristen), B-07/B-20/B-27/B-33/B-34 (Rechnungen/Garantien), B-28 = B-39 (eine Stunde Einarbeitung), B-14 ≈ B-01.
- Abschnitt „Bedarfsprotokoll – Änderungen“ und „Vollständiger Stand“ und JSON enthalten dieselben Punkte dreifach (Fassung 1, daher erwartbar).
- B-23 „Überblick über alle Papiere und Termine“ ist von keinem Baustein gedeckt (deckt-Spalte nennt ihn nicht).
- B-19 „Einfach, ohne Schulung“ (Soll) von keinem Baustein gedeckt.
- B-06/B-08 (Elternbriefe, TÜV) und B-30/B-31 (Kalender, WhatsApp) ohne Baustein.
- B-21 „Foto machen, fertig“ vs. K-02 Suche: ohne Texterkennung findet die Suche nichts, was nicht beschriftet wurde – innerer Widerspruch (Frage F4).
- B-20 ist nur „Kann“, K-04 wird trotzdem gebaut – Grenzlinie „keine“, also gewollt, aber zu bestätigen.
- Kopf: datum 2026-11-14 liegt in der Zukunft (heute 2026-11-13); repo „Workflow-Needs“ ist das Werkzeug, nicht das Zielprojekt – Ziel-Repo fehlt.
- Bereiche 12, 16, 17 kommen nicht vor (unklar ob bewusst leer).
