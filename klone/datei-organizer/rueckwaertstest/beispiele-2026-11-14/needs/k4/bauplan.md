# Bauplan · V-2026-0001 · Fassung 4

Kunde: ⟦KUNDE-1⟧ · Fassungsdatum 2026-11-13 · keine frühere Fassung, alles unter „Zu tun“ ist NEU BAUEN (K-01 bis K-15). Keine Zeilen ANPASSEN, ENTFERNEN, UNVERÄNDERT oder NOCH NICHT GESCHÄTZT. Geschätzt: 341,7–646 h (inkl. Anpassung 2–6 h, Abstimmung 15 %, Puffer 20 %); Euro nicht im Auftrag.

## 1. Zweck und Nutzer
Ein Werkzeug, mit dem ein Software-Betrieb bei einem Auftrag drei Stufen getrennt durchläuft: Bedarf lösungsneutral erfassen (ohne Preis), Umfang aus Bausteinen schätzen (Stunden, Preis, Kosten-Nutzen), Angebot erstellen und in Fassungen fortschreiben. Dazu ein Bauauftrag für die nächste Bausitzung ohne Kundendaten (B-10, B-11–B-15, B-21: „Angebot in einer Stunde, jede Zahl auf einen Bedarf zurückführbar“).
- Hauptnutzer: der Inhaber (führt das Gespräch, schreibt das Angebot), am Tablet und am PC (B-05, B-31).
- Weitere Rollen: 2 Mitarbeiter im Bau (bewerten Bedarfe mit Sternen, B-20), 1 Buchhaltung (B-07, empfängt Angebote).
- Sprachen: Deutsch und Englisch (B-31).
- Abgelöst wird die Textverarbeitung für Angebote (B-34); heute Notizbuch, Preise im Kopf (B-01, B-02).

## 2. Plattformen, Datenort, Sicherung, Netz
- Installierbare Web-App im Browser, ohne Build-Schritt, nach dem ersten Besuch ohne Internet (B-22); Geräte: Browser, Tablet, Windows-PC.
- Ohne Internet: immer. Kein Abgleich zwischen Geräten, ein Gerät reicht.
- Daten nur im Browser des Geräts (B-16, B-29); kein Server, kein Konto, kein Zähldienst (B-39).
- Sicherung: mit Passwort verschlüsselte Datei aller Vorgänge mit Anhängen, Einstellungen und Tabellen; nur selbst angestoßen; Zurückholen ergänzt, überschreibt nie (B-29, B-60).
- Netz: nichts wird selbst verschickt; Mail nur über das Mailprogramm, Übergaben nur als Datei (B-30). Beim Laden wird nichts gesendet (B-46).
- KI: über einen Dienst, nur nach Bestätigung (Rahmen).
- Personenbezogene Daten: ja, Kundenkontakte (B-37).

## 3. Bereiche/Seiten
Der Auftrag nennt keine Seitenstruktur. Abgeleitet aus Bausteinen:
1. Vorgänge (Liste, „Neuer Vorgang“, daneben Muster-Vorgänge, B-43) mit Anhängen (B-17).
2. Bedarf (18 Bereiche, Kennungen, Sterne) – K-01, K-07.
3. Umfang (Bausteine, Chips, Kosten-Nutzen, Grenzlinie) – K-02, K-08.
4. Angebot (Positionen, Unterschriften, Fassungen, Vergleich, Nachtrag, Übergaben) – K-03, K-06, K-12.
5. Rechtsblätter: Erklärung, Vereinbarung, Wartungsvertrag – K-07.
6. Bauauftrag (Erzeugen, Aufdecken) – K-04, K-15.
7. Einstellungen (Sicherung, Installieren, Netz/Knoten) – K-05, K-11, K-13.
Kopfzeile nennt immer Kunde, Fassung, Titel des offenen Vorgangs (B-45).

## 4. Funktionen
1. **K-01** Bedarfsprotokoll in 18 festen Bereichen (von Ausgangssituation bis offene Fragen), Kennungen B-nn/O-nn aus einem Zähler, nie neu vergeben (B-11, B-23, B-55). Ausdrucke getrennt: Bedarfsprotokoll für den Kunden ohne Preis, Bedarfsanalyse intern (B-25). Faktoren Offline ×1,15, Druck/PDF ×1,1. Rahmen-Fragen erfassen: Geräte, Internet, Abgleich, eigene Programme, Datenort, Sicherung, Ort der KI, Budget, Nicht gewollt (B-56).
2. **K-02** Schätzung aus Katalog-Bausteinen (Größe, Faktoren, Wiederverwendung) → Stunden und Preis; Satz-Ebenen; USt; Kosten-Nutzen über Zeitraum (Vorgabe 24 Monate); Grenzlinie: Bausteine darunter erscheinen im Angebot nur als Wahl (B-12, B-24, B-57).
3. **K-03** Angebot mit Positionen und zwei Unterschriften, ohne interne Sätze; jede Änderung als neue Fassung mit Vergleich und Nachtrag zum Unterschreiben (B-13, B-14). Unterschreiben friert Satz und USt der Fassung ein (B-26). Vorlage BookLedgerPro (40 %), Druck/PDF ×1,1.
4. **K-04** Bauauftrag als Markdown mit Zeilen NEU BAUEN/ANPASSEN/ENTFERNEN/UNVERÄNDERT/NOCH NICHT GESCHÄTZT, Kundendaten als Platzhalter (Modul 25), Aufdecken nach Rückkehr (B-15, B-28, B-59). Vorlage Sende-Prüfer (70 %).
5. **K-05** Verschlüsselte Sicherung (s. Abschnitt 2) und Anhänge am Vorgang: PDF, E-Mail, Bildschirmfoto (B-16, B-17, B-60). Vorlage Datei-Post (60 %).
6. **K-06** Übergabe als Auftragsdatei an WorkFloh, feste Kennung je Vorgang und Fassung, samt Anhängen (B-18, B-35, B-61). Vorlage Mein WorkFloh (50 %).
7. **K-07** Verschwiegenheitserklärung, Vereinbarung zu Zahlung und Rechten, Wartungsvertrag, je mit Unterschriftsfeld; Rechtstexte als Entwürfe gekennzeichnet, kein Rechtsrat (B-19, B-39). Sterne der Mitarbeiter je Bedarf zu zwei Zeitpunkten: beim Bedarf und bei der Abnahme (B-20). Druck/PDF ×1,1. Stand im Auftrag: alle drei Blätter „aktiviert: nein“.
8. **K-08** Erklär-Feld an jedem Chip eines Bausteins mit vorher gerechneter Preiswirkung, Zurück-Stände; in unterschriebener Fassung nur erklären, im Banner mit einem Tipp neue offene Fassung anlegen (B-41, B-44).
9. **K-09** Anhänge mit einem Tipp groß ansehen: Bilder, PDFs ganz, E-Mails mit Text und Anhängen; nichts wird ausgeführt (B-42). Vorlage Auslieferungsprüfer (70 %).
10. **K-10** Muster-Vorgänge aus eigenen Aufträgen mit Ist-Stunden, neben „Neuer Vorgang“ (B-43); Vergleich Schätzung gegen Ist (B-40).
11. **K-11** SBKIM-Knoten: Lampen, Siegel, Mycel mit Netz-Einstellung; beim Laden nichts senden; Antworten fremder Knoten vor einer KI auf Anweisungen prüfen, sonst ausschließen (Prüfliste vor dem Richter) (B-46, B-49). Vorlage Kimboard (50 %), Faktor Mehrere Nutzer ×1,3.
12. **K-12** Angebot mit einem Tipp an BookLedgerPro (Datenvertrag v1): nur Positionen mit Netto und Steuersatz, nie Stunden oder Stundensatz (B-47, B-50, B-51). Vorlage BookLedgerPro (40 %).
13. **K-13** Installieren-Knopf in den Einstellungen, verschwindet in der installierten App; Manifest-Kennung (B-48). Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 %).
14. **K-14** Vier fertige Apps als Muster-Vorgänge mit echten Fassungen und Ist-Stunden; Schlüssigkeitsprobe: jeder Muss-Bedarf hat einen Baustein, kein Baustein zeigt auf einen fehlenden Bedarf (B-52, B-54).
15. **K-15** Bauauftrag verdeckt auch Namensteile des Ansprechpartners und nennt die Zuschläge der Summe (B-53). Vorlage Sende-Prüfer (70 %).
16. Querschnitt: jedes Kundenblatt nach fester Liste erlaubter Felder; Stundensatz, Stunden, interne Notizen nie hinein (B-58); Stundensatz nie hinaus außer im Wartungsvertrag (B-27, N-01).

## 5. Schnittstellen zu anderen Programmen
- **WorkFloh** (Auftragsverwaltung): liest die Übergabedatei (K-06, B-35, B-61).
- **BookLedgerPro** (Buchhaltung): übernimmt das Angebot im Datenvertrag v1 (K-12, B-51).
- **Tomys Hub**: im Rahmen als Empfänger von Aufträgen genannt, kein Baustein dafür.
- Mailprogramm des Geräts (nur Übergabe, B-30); KI-Dienst nach Bestätigung; eigenes SBKIM-Netz (K-11).
- „Eigene Programme: Dateien hin- und hergeben“ (Rahmen).

## 6. Ausdrücklich nicht
- N-01: Stundensatz auf keinem Kundenblatt – außer im Wartungsvertrag.
- Kein Server, kein Konto, kein Zähldienst (B-39); kein Abgleich zwischen Geräten.
- Kein selbstständiger Versand von Mails oder Daten (B-30); nichts beim Laden senden (B-46).
- Kein Ausführen von Anhängen (K-09). Kein Überschreiben beim Zurückholen einer Sicherung.
- Keine Kundendaten im Bauauftrag (Platzhalter), auch keine Vornamen (B-53).

## 7. Abnahme
Je Baustein K-01–K-15 die Funktion aus Abschnitt 4 vorführen. Zusätzlich ohne Baustein abnehmen: B-22–B-30, B-44, B-45, B-49, B-50, B-54–B-61. Prüfbare Punkte u. a.:
- Offline nach erstem Besuch; installierbar ohne Build-Schritt.
- Kundenausdruck und Angebot enthalten keinen Stundensatz, keine Stunden, keine internen Notizen; Wartungsvertrag enthält ihn.
- Unterschriebene Fassung: Satz und USt eingefroren, nur Erklären möglich, neue Fassung per Tipp.
- Sicherung: Datei ohne Klartext; Zurückholen ergänzt nur.
- Bauauftrag: Platzhalter statt Kundendaten und Namensteilen; Aufdecken stellt Klartext wieder her; Summe nennt Zuschläge.
- BookLedgerPro-Übergabe ohne Stunden/Satz; WorkFloh-Datei mit fester Kennung je Vorgang+Fassung.
- Schlüssigkeitsprobe über alle Muster-Vorgänge.
- Fremde Knoten-Antwort mit KI-Anweisung wird ausgeschlossen.
Sterne aus dem Auftrag (B-12–B-15, B-20) liegen als Ausgangswerte vor; ihre Rolle für die Abnahme ist nicht festgelegt.

## 8. Offene Fragen und Widersprüche im Auftrag
1. „Ohne Internet: immer“ gegen KI-Dienst, SBKIM-Netz (Mycel, Netz-Einstellung) und „ein Gerät, kein Abgleich“ – wann darf das Netz genutzt werden?
2. K-11 trägt Faktor „Mehrere Nutzer ×1,3“, der Rahmen sagt „ein Gerät reicht“ – wer sind die weiteren Nutzer?
3. Die 18 Bereiche sind nicht alle benannt; der Auftrag nutzt nur 1–16 mit Nummern ohne Titel (außer „Ausgangssituation … offene Fragen“). Bereichsnamen fehlen.
4. „Modul 25“, „Datenvertrag v1“, „SBKIM“, „Siegel“, „Mycel“, „Richter“ werden nicht erklärt; Formate fehlen.
5. Satz-Ebenen (K-02) undefiniert; Stundensatz, USt-Satz und Euro-Beträge fehlen (euro: nein).
6. K-14: welche vier Apps? Woher kommen deren Ist-Stunden?
7. Tomys Hub im Rahmen, aber ohne Baustein und ohne Bedarf.
8. Format der WorkFloh-Auftragsdatei nicht beschrieben.
9. „Summe: Grenzlinie keine“ – alle Bausteine fest im Angebot; Bedeutung für die Kann-Bedarfe (B-20, B-43, B-48) unklar.
10. Inhalt der drei Rechtsblätter und des Wartungsvertrags (Freistunden, Pauschale) fehlt.
11. Wer unterschreibt die „zwei Unterschriften“ und wie (Finger, Papier)?
12. B-31 Deutsch und Englisch: gilt das auch für Ausdrucke und Bauauftrag?
13. Größenangaben für Anhänge und Zeitpunkt der KI-Nutzung fehlen.
