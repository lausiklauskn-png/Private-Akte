# Bauplan · Vorgang V-2026-0001 · Fassung 1 · Kunde ⟦KUNDE-1⟧

## 1. Zweck und Nutzer
Behördenbriefe auf Papier werden mit dem Handy fotografiert, als sauberes PDF gespeichert, Satz für Satz auf Russisch angezeigt, in Ordnern abgelegt und ausgedruckt; Formulare werden auf Russisch ausgefüllt und landen auf Deutsch im PDF.
Nutzer sind Oleg (liest Deutsch schlecht, B-09) und seine Ehefrau (liest kein Deutsch, B-10); Empfänger der Ausdrucke ist die Behörde (B-11).

## 2. Plattformen und Laufzeit
- Älteres Android-Handy (B-38); genaue Android-Fassung offen (O-04).
- Form: Web-App/PWA im Browser des Handys, installierbar (Annahme – Auftrag nennt keine Form; „Übersetzer im Browser" B-40 und Budget ≤ 20 € B-48 sprechen dafür).
- Online/offline: offen (O-05). Plan: alles außer der Übersetzung offline; Übersetzung je nach O-05 auf dem Gerät oder über einen Dienst (Annahme).
- Konto: nein (Annahme – nichts im Auftrag verlangt eines; „keine Schulung" B-36).
- Oberfläche auf Russisch, Brieftext Deutsch (Annahme aus B-16, B-37).

## 3. Bereiche / Seiten
1. Start: großer Knopf „Brief fotografieren", Liste der letzten Briefe.
2. Scan: Kamera/Foto, Ecken zuschneiden, entzerren, als PDF speichern (K-01).
3. Brief lesen: Original links/oben, Russisch daneben/unten; Antippen eines Satzes hebt die Stelle im Original hervor (K-02).
4. Formular ausfüllen: erkannte Felder, Eingabe auf Russisch, Vorschau Deutsch im PDF (K-03).
5. Ordner und Suche (K-04).
6. Drucken/Teilen über den Druckdialog des Handys (K-05).

## 4. Funktionen (prüfbar)
1. Foto aufnehmen oder aus Galerie wählen (K-01, B-19).
2. Briefkanten erkennen, von Hand nachziehen, perspektivisch entzerren (K-01).
3. Ergebnis als PDF auf dem Gerät speichern (K-01, B-29).
4. Text des Briefs erkennen (OCR, Deutsch) (Annahme: Voraussetzung für K-02/K-03).
5. Brief in Sätze zerlegen und jeden Satz ins Russische übersetzen (K-02, B-20, B-30).
6. Jeder russische Satz ist der Fundstelle im Original zugeordnet; Antippen hebt sie hervor, in beide Richtungen (K-02, B-21, B-31).
7. Formularfelder im PDF bzw. Scan erkennen (K-03).
8. Feldbeschriftungen auf Russisch anzeigen, Eingabe auf Russisch (K-03, B-22).
9. Eingaben ins Deutsche übertragen und an der Feldstelle ins PDF schreiben (K-03, B-32).
10. Brief einem Ordner zuweisen, Ordner anlegen/umbenennen (K-04, B-23, B-33).
11. Briefe über Ordner und Volltextsuche wiederfinden (K-04, B-34).
12. PDF oder ausgefülltes Formular an den Druckdialog des Handys übergeben (K-05, B-24, B-35).

## 5. Datenhaltung und Sicherheit
- Personenbezogene Daten der Familie (B-47): Fotos, PDFs, Formulare, Übersetzungen (B-43–B-46) bleiben nur auf dem Gerät (Annahme).
- Speicher: lokale Datenbank des Browsers bzw. App-Speicher (Annahme).
- Verschlüsselung und Sicherung: im Auftrag nicht verlangt, keine Zeile in „Zu tun" – nicht gebaut, als offene Frage (s. 9).
- Was beim Übersetzen das Gerät verlässt, entscheidet O-05; ohne Antwort geht nichts hinaus (Annahme, vorsichtige Seite).

## 6. Schnittstellen
- Handykamera (B-41).
- Druckdialog des Handys / Android-Druckdienst (K-05, B-42); welcher Drucker: O-01.
- Übersetzung: Modell auf dem Gerät oder externer Dienst – offen (O-05, B-40).
- Keine weiteren Systeme genannt.

## 7. Bewusste Grenzen
- Keine Funktion ohne Zeile in „Zu tun" (Regel der Anleitung): kein Konto, kein Sync zwischen zwei Handys (O-02 offen), keine Cloud-Sicherung, keine Verschlüsselung.
- Kein Versand an die Behörde – nur Ausdruck (B-24).
- Keine Rechts- oder Inhaltsberatung; die Übersetzung ist Hilfe zum Verstehen, nicht verbindlich (Annahme).
- Keine anderen Sprachpaare als Deutsch↔Russisch.
- Keine Kosten über dem Budget (B-48): kein bezahlter Dienst, solange O-03/O-05 offen.

## 8. Reihenfolge der Bauschritte
1. Grundgerüst, Speicher, Startseite (Annahme).
2. K-01 Scan → PDF.
3. K-05 Drucken (klein, liefert früh Nutzen für B-24).
4. K-04 Ordner und Suche.
5. K-02 Übersetzung mit Satz-Zuordnung (größter Brocken; erst nach O-05).
6. K-03 Formulare (Soll, B-22; baut auf OCR und Übersetzung aus K-02 auf).
7. Test auf einem älteren Android-Gerät (B-38, B-39).

## 9. Offene Fragen an den Kunden
- O-01 Welcher Drucker, wie kommt das PDF dorthin?
- O-02 Eigenes Handy für die Frau oder dasselbe? (bei eigenem: Abgleich nötig?)
- O-03 20 € einmalig oder monatlich?
- O-04 Welches Android, wie alt ist das Handy?
- O-05 Darf für die Übersetzung etwas ins Internet gehen?
- Zusätzlich: Sollen die Daten verschlüsselt und gesichert werden (B-47, keine Zeile in „Zu tun")?
- Zusätzlich: Wie gut muss die Übersetzung sein – reicht maschinell?
- NOCH NICHT GESCHÄTZT: keine Zeile so markiert.

## 10. Unklar, widersprüchlich, doppelt
- Summe passt nicht zu den Zeilen: „Stunden F1 132,9–257,6" (Abschnitt Summe), Zeilen ergeben 96,5–184,8 h (K-01 bis K-05).
- K-05 „klein" mit 11–22 h ist mehr als K-01 „mittel" mit 4–6,6 h (Tabelle „Zu tun").
- K-03 „groß" mit 9,5–15,8 h gegenüber K-02 „groß" mit 60–120 h; Größe und Stunden passen nicht zusammen.
- `repo: "Workflow-Needs"` im Kopf passt nicht zum Vorhaben (Scan/Übersetzen); Ziel-Repo unklar.
- `euro: nein` – Beträge weggelassen, Budget B-48 dennoch genannt; Kosten nicht prüfbar.
- `datum: 2026-11-14` liegt einen Tag nach dem heutigen Datum.
- B-22 ist „Soll", steht aber als NEU BAUEN (K-03) neben den Muss-Zeilen; „Grenzlinie keine".
- Nicht durch ein K gedeckt: B-26/B-37 (Frau liest/bedient – wie? eigenes Handy?), B-36 (keine Schulung), B-38/B-39 (altes Handy, schnell) – nur als Anforderungen an alle K behandelt (Annahme).
- OCR ist für K-02/K-03 nötig, steht aber in keiner Zeile.
- Doppelt: B-19/B-29, B-20/B-30, B-21/B-31, B-22/B-32, B-23/B-33, B-24/B-35, B-07/B-28, B-08/B-24; O-01–O-05 in Bedarf und „Offene Punkte"; alle B/O/K zusätzlich in „Vollständiger Stand" und im JSON.
- K-03 trägt Faktor „druck", K-02 nicht, obwohl beide gleichartig Texte verarbeiten (JSON).
