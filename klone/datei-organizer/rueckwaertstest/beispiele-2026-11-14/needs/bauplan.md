# Bauplan · V-2026-0001 · Fassung 4

Kunde: ⟦KUNDE-1⟧ · Fassungsdatum 2026-11-13 · keine frühere Fassung, alles unter „Zu tun“ ist NEU BAUEN (K-01 … K-15). Keine Euro-Beträge im Auftrag (`euro: nein`), Stunden nur als Schätzung.

## 1. Zweck und Nutzer
- Werkzeug, um bei Software-Aufträgen den Bedarf lösungsneutral zu erfassen, daraus den Umfang zu schätzen und ein Angebot zu erstellen (Vorhaben).
- Problem heute: Papier, Notizbuch, Preise im Kopf, Angebote als Textdatei (B-01, B-02); Angebote dauern zu lange, Änderungswünsche sind nicht festgehalten, Bedarf und Lösung vermischt (B-08 … B-10). Wird abgelöst: Textverarbeitung für Angebote (B-34).
- Ziel: Angebot in einer Stunde, jede Zahl auf einen Bedarf rückführbar (B-21).
- Nutzer: Inhaber (Gespräch, Angebot) am Tablet und PC, Deutsch und Englisch (B-05, B-31); Mitarbeiter im Bau (2) vergeben Sterne (B-06, B-20); Buchhaltung (1) bekommt Angebote (B-07, B-47).
- Daten: Gesprächsnotizen, Angebote, Verträge, E-Mails, PDFs des Kunden (B-36); personenbezogen (B-37).

## 2. Plattformen, Datenort, Sicherung, Netz
- Installierbare Web-App im Browser, Tablet und Windows-PC; kein Build-Schritt; nach dem ersten Besuch ohne Internet (Rahmen, B-22, B-32, B-33).
- Daten nur im Browser des Geräts (B-29, B-16); kein Server, kein Konto, kein Zähldienst (B-39).
- Sicherung verschlüsselt, vom Nutzer angestoßen; Zurückholen ergänzt nur, überschreibt nie (B-29, K-05).
- Abgleich zwischen Geräten „ab und zu“ (Rahmen) – Weg nicht beschrieben (siehe 8).
- Netz: Knoten im eigenen Netz (K-11, B-46), beim Laden wird nichts gesendet.
- Nichts wird selbst verschickt: Mail nur über das Mailprogramm, Übergaben nur als Datei (B-30).
- KI: keine KI (Rahmen).

## 3. Bereiche/Seiten
Aus dem Auftrag ableitbar (Namen der Seiten gibt er nicht vor):
1. Vorgangsliste mit „Neuer Vorgang“ und daneben Muster-Vorgänge (B-43, K-10, K-14).
2. Kopfzeile mit Kunde, Fassung, Titel des offenen Vorgangs (B-45).
3. Bedarf: 18 Bereiche mit Einträgen B-nn / offenen Punkten O-nn, Sterne (K-01, K-07).
4. Umfang/Schätzung: Bausteine mit Chips, Faktoren, Grenzlinie (K-02, K-08).
5. Angebot mit Fassungen, Vergleich, Nachtrag, Unterschriften (K-03).
6. Rechtsblätter: Verschwiegenheitserklärung, Vereinbarung Zahlung/Rechte, Wartungsvertrag (K-07).
7. Anhänge am Vorgang mit Großansicht (K-05, K-09).
8. Bauauftrag erzeugen/einlesen/aufdecken (K-04, K-15).
9. Einstellungen mit Installieren-Knopf, Sicherung, Netz-Einstellung (K-13, K-05, K-11).
10. Drei Ausdrucke: Bedarfsprotokoll (Kunde), Bedarfsanalyse (intern), Angebot (B-25).

## 4. Funktionen
1. **K-01 (B-11, B-23):** Bedarf in 18 festen Bereichen erfassen, lösungsneutral, ohne Preis. Kennungen B-nn/O-nn werden nie neu vergeben. Ausdruck Kunde (ohne Preis) und intern. Faktoren Offline ×1,15, Druck/PDF ×1,1. Prüfbar: gelöschte Kennung taucht nie wieder auf; Kundenausdruck enthält keinen Betrag.
2. **K-02 (B-12, B-24):** Schätzung aus Katalog-Bausteinen (Größe, Faktoren, Wiederverwendung) → Stunden und Preis; Satz-Ebenen; USt; Kosten-Nutzen; Grenzlinie. Prüfbar: Summe = Zeilen + Anpassung + Abstimmung 15 % + Puffer 20 % (beide auf die Basis, nachgerechnet an dieser Fassung: 341,7–646 h).
3. **K-03 (B-13, B-14, B-26):** Angebot mit Positionen und zwei Unterschriften, ohne interne Sätze; jede Änderung als neue Fassung mit Vergleich und Nachtrag; Unterschreiben friert Satz und USt ein. Vorlage BookLedgerPro (40 %), Faktor Druck/PDF ×1,1.
4. **K-04 (B-15, B-28):** Bauauftrag als Text, Kundendaten durch Platzhalter ersetzt (Modul 25), nach Rückkehr wieder aufdecken. Vorlage Sende-Prüfer (70 %).
5. **K-15 (B-53):** Bauauftrag verdeckt auch Namensteile des Ansprechpartners; Summe nennt ihre Zuschläge. Prüfbar: kein Vorname im Klartext. Vorlage Sende-Prüfer (70 %).
6. **K-05 (B-16, B-17, B-29):** verschlüsselte Sicherung (nur ergänzend zurückholen); Anhänge (PDF, E-Mail, Bildschirmfoto) am Vorgang. Vorlage Datei-Post (60 %).
7. **K-09 (B-42):** Anhänge mit einem Tipp groß: Bilder, PDFs ganz, E-Mails mit Text und Anhängen; nichts wird ausgeführt. Vorlage Auslieferungsprüfer (70 %).
8. **K-06 (B-18, B-35):** Übergabe als Auftragsdatei an WorkFloh. Vorlage Mein WorkFloh (50 %).
9. **K-12 (B-47, B-50, B-51):** Angebot mit einem Tipp an BookLedgerPro im Datenvertrag v1; nur Positionen mit Netto und Steuersatz, nie Stunden oder Stundensatz. Vorlage BookLedgerPro (40 %).
10. **K-07 (B-19, B-20, B-27):** Erklärung, Vereinbarung, Wartungsvertrag mit Unterschriftsfeld (Faktor Druck/PDF ×1,1); Stundensatz nur im Wartungsvertrag. Sterne der Mitarbeiter je Bedarf zu zwei Zeitpunkten (Bedarf, Abnahme), Ausgabe als Ø und Anzahl.
11. **K-08 (B-41, B-44):** Erklär-Feld an jedem Chip eines Bausteins, Preiswirkung vorher gerechnet, Zurück-Stände; in unterschriebener Fassung nur erklären, im Banner mit einem Tipp neue offene Fassung.
12. **K-10 (B-43, B-40):** Muster-Vorgänge aus eigenen Aufträgen mit Ist-Stunden, neben „Neuer Vorgang“; Schätzung gegen Ist vergleichen.
13. **K-14 (B-52, B-54):** vier fertige Apps als Muster-Vorgänge mit echten Fassungen und Ist-Stunden; Schlüssigkeitsprobe: jeder Muss-Bedarf hat einen Baustein, kein Baustein zeigt auf fehlenden Bedarf.
14. **K-11 (B-46, B-49):** SBKIM-Knoten: Lampen, Siegel, Mycel mit Netz-Einstellung; Prüfliste vor dem Richter – Antworten fremder Knoten auf Anweisungen an eine KI prüfen und sonst ausschließen; beim Laden nichts senden. Vorlage Kimboard (50 %), Faktor Mehrere Nutzer ×1,3.
15. **K-13 (B-48, B-22):** Installieren-Knopf in den Einstellungen, verschwindet als installierte App; Manifest-Kennung. Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 %).
16. **ohne Baustein (B-45):** Kopfzeile nennt Kunde, Fassung, Titel.

## 5. Schnittstellen zu anderen Programmen
- Mein WorkFloh: Auftragsdatei (K-06). Format nicht angegeben.
- Tomys Hub: im Rahmen genannt („Aufträge an … Tomys Hub“), kein Baustein.
- BookLedgerPro: Angebot im Datenvertrag v1 (K-12, B-51). Inhalt des Vertrags nicht angegeben.
- Mailprogramm des Geräts (B-30).
- Eigenes Netz / andere Knoten (K-11).
- Allgemein: Dateien hin- und hergeben (Rahmen).

## 6. Ausdrücklich nicht
- N-01: Stundensatz nie auf einem Kundenblatt; nie an Buchhaltung, Übergabe oder Bauauftrag (B-27, B-50).
- Keine KI; kein Server, kein Konto, kein Zähldienst (B-39).
- Nichts selbst verschicken (B-30); beim Laden nichts ins Netz (B-46).
- Kein Build-Schritt (B-22).
- Anhänge werden nie ausgeführt (K-09).
- Rechtstexte sind Entwürfe, kein Rechtsrat (B-39).
- Platzhalter ⟦…⟧ werden unverändert übernommen, kein Klartext erfunden.

## 7. Abnahme
- Je Baustein die prüfbaren Sätze aus Abschnitt 4; dazu ohne Baustein: B-22 bis B-30, B-44, B-45, B-49, B-50, B-54.
- Kernproben: (a) Stundensatz auf Kundenblatt, Angebot, Übergabedatei, BookLedgerPro-Nutzlast und Bauauftrag absent, im Wartungsvertrag vorhanden; (b) Unterschrift friert Satz/USt ein, Änderung nur als neue Fassung; (c) Sicherung zurückholen überschreibt nichts; (d) Bauauftrag enthält weder Kundenfelder noch Namensteile im Klartext und deckt beim Einlesen auf; (e) Offline nach erstem Besuch; (f) Schlüssigkeitsprobe über alle Muster-Vorgänge; (g) kein Netzverkehr beim Laden.
- Sterne-Stand dieser Fassung als Ausgangsdaten: B-12 Ø 4,3 (3)/4,5 (2), B-13 3,5 (2)/4 (2), B-14 4,5 (2)/4,7 (3), B-15 4,5 (2)/5 (2), B-20 2,5 (2)/3 (2).

## 8. Offene Fragen und Widersprüche im Auftrag
1. **O-01** (offen): Welche Faktoren gelten für Offline und KI? Frist 2026-10-08 liegt vor dem Fassungsdatum 2026-11-13 – unklar, ob geklärt. „KI“-Faktor passt nicht zu „keine KI“.
2. **Keine KI vs. B-49/K-11:** „Prüfliste vor dem Richter“ und Prüfung vor einer KI setzen eine KI voraus.
3. **N-01 vs. B-27:** Wartungsvertrag ist ein Kundenblatt, trägt aber laut B-27 den Stundensatz.
4. **Abgleich ab und zu vs. nur auf dem Gerät/kein Server:** Weg des Abgleichs (Sicherungsdatei? Netz-Knoten?) nicht beschrieben; ebenso, was über den Knoten (K-11) überhaupt geteilt wird.
5. **Sprache DE/EN (B-31):** kein Baustein, keine Schätzung.
6. **Tomys Hub:** im Rahmen genannt, aber ohne Baustein und Format.
7. **Formate fehlen:** Auftragsdatei für WorkFloh, Datenvertrag v1, Inhalt von „Modul 25“, Sicherungsformat/Verschlüsselung.
8. **18 Bereiche:** Namen nicht genannt; Bereiche 17 kommt nicht vor; Inhalte nur aus den Einträgen erschließbar.
9. **Schätzlogik:** Bausteinkatalog (Spannen je Größe), Satz-Ebenen, Stundensatz, USt-Satz, Wiederverwendungsrechnung und Grenzlinien-Regel fehlen; Grenzlinie hier „keine“.
10. **K-10/K-14:** welche eigenen Aufträge und welche „vier fertigen Apps“ – nicht benannt, Ist-Stunden fehlen.
11. **„Je Baustein: Vorlage und Abnahme“** nennt Vorlagen und Faktoren, aber keine Abnahmekriterien je Baustein; die Vorlagen (BookLedgerPro, Sende-Prüfer, …) durfte dieser Plan nicht lesen.
12. **Erklärungen „aktiviert: nein“:** ob K-07 trotzdem voll zu bauen ist – angenommen ja, da NEU BAUEN.
13. **Sterne:** Wer die Mitarbeiter sind und ob Namen gespeichert werden, offen.
14. **Mehrere Nutzer (×1,3 bei K-11)** widerspricht „ein Inhaber, Daten nur auf dem Gerät“ ohne Erklärung.
