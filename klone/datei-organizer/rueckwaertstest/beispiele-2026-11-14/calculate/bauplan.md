# Bauplan · V-2026-0001 · Fassung 3

Kunde: ⟦KUNDE-1⟧ · Fassungsdatum 2026-10-14 · Grundlage allein `bauauftrag.md`. Alle 13 Bausteine stehen auf NEU BAUEN; UNVERÄNDERT und ENTFERNEN gibt es nicht. Keine Zeile ist als NOCH NICHT GESCHÄTZT markiert.

## 1. Zweck und Nutzer
Angebote für Werbetechnik schnell und nachvollziehbar kalkulieren (B-14, B-24): jedes Angebot nach derselben Rechnung, in Minuten statt Stunden, vom Angebot bis zur Rechnung ohne Abtippen. Ablösung von Excel, Zetteln und Mail-Abtippen (B-01–B-13).
- **Inhaber** (1): pflegt Sätze und Katalog (B-36), trägt Stundensätze und Handlungskosten ein (O-01).
- **Mitarbeiter** (3; Druck, Stick, Montage): tragen Ist-Zeiten nach (B-36, für Nachkalkulation).
- **Kunden** (1): sehen nur das Angebot (B-08, B-29).
- Schulung: ⟦KUNDE-2⟧-Angebote und ⟦KUNDE-2⟧-Fragen zum Durchspielen statt Handbuch (B-35).

Anlass dieser Fassung: Antworten aus dem Netz sollen geprüft sein, bevor eine KI sie liest; Installieren soll auf allen Geräten klappen.

## 2. Plattformen, Datenort, Sicherung, Netz
- Installierbare Web-App für Browser, Tablet, Android-Handy (Rahmen; B-25 nennt zusätzlich PC); ohne Konto, ohne Server (B-25).
- Ohne Internet: immer (Rahmen, B-38). Faktor Offline ×1,15 bei K-01.
- Daten liegen nur auf dem Gerät (Rahmen, B-19). Gespeichert werden: Produktvorlagen, Materialien, Maschinen, Tarife, Kunden mit Klasse, Angebote, Bilder, Entwürfe (B-42). Personenbezogene Daten: ja (B-43).
- Sicherung: verschlüsselt in eine Datei, vom Nutzer angestoßen; Zurückholen fügt hinzu und überschreibt nie (K-04, B-32).
- Abgleich zwischen Geräten: „ab und zu reicht“ (Rahmen) – Weg nicht beschrieben (siehe 8).
- KI: nur über einen Dienst, nach Bestätigung (Rahmen); Kundendaten gehen nie an eine KI, Anfrage-Lesung nur verdeckt und auf ausdrücklichen Wunsch (B-44).
- Netz: optionaler Knoten im eigenen Netz (öffentlich oder Firmennetz); beim Laden geht nichts hinaus (K-11, B-50).
- Startwerte sind Platzhalter, bis eigene Zahlen eingetragen sind (B-46).

## 3. Bereiche/Seiten
1. **Suche (Startseite)** – Frage eintippen → Produkt, Menge, Preis (K-08).
2. **Angebote** – Liste, Kalkulation, Fassungen, Vergleich, Kundenblatt (K-01, K-02).
3. **Anfrage einlesen** – Mail/.eml → Entwurf (K-05).
4. **Katalog** – Arbeitsgebiete, Produktvorlagen, Materialien, Maschinen, Sätze, Tarife (K-01, K-02).
5. **Handelsware** – Einkaufsprodukte, Lieferanten, Fremdfertigung (K-07).
6. **Nachkalkulation** – Ist gegen Plan (K-06).
7. **Kunden** – mit Kundenklasse (B-42, B-26).
8. **Sicherung/Übergaben** – Datei sichern/zurückholen, Auftragsdatei, Übergabe Buchhaltung (K-03, K-04).
9. **Netz-Leiste** – Lampen, Siegel, Netz-Einstellung (K-11).
10. **Sicherheitsseite** – Mycel, Siegel, Schutz in einfachen Worten; Installieren-Knopf (K-13).

## 4. Funktionen
1. **K-01 (B-14, B-26)** Zuschlagskalkulation: MEK+MGK, FEK+FGK+Maschine, Herstellkosten, Verwaltung/Vertrieb, Gewinn, Skonto/Rabatt im Hundert. Prüfbar: Rechenweg je Position sichtbar.
2. **K-01 (B-26)** Satz-Ebenen Position → Angebot → Kundenklasse → Vorlage → Arbeitsgebiet; die engere Ebene gewinnt.
3. **K-01 (B-27)** Mengenregeln Stück, Fläche, Rolle, Platte, Länge; fehlende Angabe → „nicht kalkuliert“, nie 0.
4. **K-01** Rückrechnung (Inhalt im Auftrag nicht beschrieben, siehe 8); Katalog mit Arbeitsgebieten. B-14 ist „Schlägt vor, der Kunde bestätigt“: der Preis ist ein Vorschlag, der Nutzer bestätigt.
5. **K-02 (B-15, B-29)** Kundenblatt nur aus einer Freigabeliste: Leistung, Staffelpreise, Versand, Summen; Einkaufspreise, Sätze, Lieferanten nie darauf. Druck/PDF (Faktor ×1,1). B-15 vorschlagen/bestätigen.
6. **K-02 (B-16, B-28, B-47)** Verpackung und Versand automatisch: günstigster passender Tarif aus eigener Tabelle; passt keiner, wird das gesagt.
7. **K-02 (B-17, B-30)** Gestelltes Angebot eingefroren; Ändern nur als neue Fassung mit derselben Nummer, mit Vergleich zur Vorfassung.
8. **K-03 (B-18, B-31, B-40)** Angenommenes Angebot → Auftragsdatei für Mein WorkFloh und Tomys WorkFloh (Import dort).
9. **K-03 (B-18, B-31, B-41)** Angebot per Adresse an BookLedgerPro als vorbefülltes Angebot, Datenvertrag v1.
10. **K-04 (B-19, B-32)** Verschlüsselte Sicherung in eine Datei; Zurückholen fügt nur hinzu. Vorlage Datei-Post (60 %).
11. **K-05 (B-20, B-33)** Mail/.eml offline lesen, Kunde und Mengen erkennen; Unerkanntes als „nicht erkannt“; Ergebnis bleibt Entwurf.
12. **K-05 (B-20)** Alte Angebote nach Ähnlichkeit als Grundlage des Entwurfs vorschlagen.
13. **K-05 (B-44)** Optionale KI-Lesung nur verdeckt (Kundendaten durch Platzhalter) und nach ausdrücklicher Bestätigung. Vorlage Sende-Prüfer (70 %), Faktor KI ×1,25.
14. **K-06 (B-21, B-36)** Ist-Zeiten erfassen, Plan gegen Ist, Faktor je Vorlage ins Zeit-Muster übernehmen.
15. **K-07 (B-22)** Einkaufsprodukte mit Einkaufspreis je Menge und eigenem Aufschlag; Lieferanten-Vorschläge; Fremdfertigung. B-22 vorschlagen/bestätigen.
16. **K-07 (B-34, N-02)** Marktpreise nur mit Quelle übernehmen, als „ungeprüft“ führen, zählen erst nach Bestätigung von Hand.
17. **K-08 (B-23)** Suche als Startseite: „100 Tassen mit Logo“ → Produkt, Menge, Preis; lernt aus jeder bestätigten Antwort. Vorlage Company Brain (30 %). B-23 vorschlagen/bestätigen.
18. **K-09 (B-48, B-51)** Zwischenmenge = Stückpreis der nächstkleineren Staffel × Menge, Rechenweg wird genannt.
19. **K-10 (B-49, B-52)** Bedeutungssuche; Sprachmodell erst auf Wunsch, vom eigenen Server mit Rückfall, Ladebalken, Anzeige woher es kam. Vorlage Company Brain (60 %).
20. **K-11 (B-50, B-53)** SBKIM-Knoten mit Lampen, Siegel, Netz-Einstellung (öffentlich/Firmennetz); beim Laden kein Netzverkehr. Vorlage Kimboard (60 %).
21. **K-12 (B-54, B-57, B-58)** Prüfliste vor dem KI-Richter; Echtheit (Unterschriften), Sperrliste, Bürgen „aus dem Kanon“; Antwort mit Anweisung an eine KI wird ausgeschlossen und nicht an die KI gegeben. Vorlage Auslieferungsprüfer (80 %).
22. **K-13 (B-55, B-25)** Installieren-Knopf mit verständlicher Anleitung, eigene Manifest-Kennung. Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (60 %).
23. **K-13 (B-56)** Seite, die Mycel, Siegel und Schutz einfach erklärt.

## 5. Schnittstellen zu anderen Programmen
- **Mein WorkFloh / Tomys WorkFloh:** Auftragsdatei, dort importiert (B-31, B-40). Rahmen nennt „Tomys Hub“ statt „Tomys WorkFloh“.
- **BookLedgerPro:** Übergabe per Adresse, Datenvertrag v1 (B-41).
- **Eigene Programme allgemein:** Dateien hin- und hergeben (Rahmen).
- **SBKIM-Netz der eigenen Apps** (Mycel, Siegel) (B-53).
- **KI-Dienst** (nach Bestätigung), **eigener Modell-Server** (K-10).
- Bestand: Excel-Liste mit Preisen (B-39) – Import nicht beauftragt.

## 6. Ausdrücklich nicht
- N-01 keine Live-Versandtarife (auch B-47).
- N-02 kein Marktpreis zählt vor Bestätigung von Hand.
- Keine Kalkulationsdetails beim Kunden (B-15, B-29); keine Kundendaten an eine KI (B-44).
- Kein Konto, kein Server für die App selbst (B-25).

## 7. Abnahme
- Je Baustein K-01–K-13 die Funktionen aus 4 vorführen, mit den genannten Vorlagen.
- Ohne Baustein trotzdem abnehmen: B-25, B-26, B-27, B-28, B-29, B-30, B-31, B-32, B-33, B-34, B-51, B-52, B-57 (je als Prüfsatz aus dem Auftrag).
- Prüffälle: fehlende Angabe zeigt „nicht kalkuliert“; Kundenblatt ohne EK/Sätze/Lieferanten; Versand ohne passenden Tarif meldet das; gestelltes Angebot nicht änderbar, neue Fassung mit gleicher Nummer; Zurückholen überschreibt nichts; Zwischenmenge mit Rechenweg; beim Laden kein Netzverkehr; Antwort mit KI-Anweisung ausgeschlossen; Offline-Betrieb auf Tablet und Android.
- Sternebewertung beim Bedarf liegt für B-14, B-15, B-18, B-20, B-21, B-23 vor (Abnahme-Sterne ebenfalls schon eingetragen, siehe 8).

## 8. Offene Fragen und Widersprüche im Auftrag
1. **Offline „immer“** vs. KI-Dienst, Modell vom eigenen Server, Netz-Knoten – gemeint ist wohl „funktioniert ohne Netz, Zusätze brauchen Netz“; bitte bestätigen.
2. **„Ohne Server“ (B-25)** vs. „Modell vom eigenen Server“ (B-49) und KI über Dienst.
3. **Abgleich zwischen Geräten** „ab und zu“ bei „Daten nur auf dem Gerät“: über die Sicherungsdatei? Kein Baustein deckt den Abgleich.
4. **Tomys Hub vs. Tomys WorkFloh** (Rahmen vs. B-31/K-03): ein oder zwei Ziele?
5. **Datenvertrag v1** (BookLedgerPro) und **Format der Auftragsdatei** nicht beschrieben.
6. **Rückrechnung** (K-01): Was wird zurückgerechnet (Zielpreis → Gewinn, Satz, Zeit)?
7. **Freigabeliste**: welche Felder genau stehen auf dem Kundenblatt?
8. **Lieferanten-Vorschläge** und **Marktpreise mit Quelle**: woher kommen sie (Hand, KI-Dienst, Web)?
9. **„Lernt aus jeder bestätigten Antwort“** (K-08): was wird gelernt, wo gespeichert, rücknehmbar?
10. **SBKIM, KI-Richter, Kanon, Bürgen, Mycel, Siegel, Lampen** sind im Auftrag nicht definiert; ohne die Vorlagen (Kimboard, Auslieferungsprüfer) nicht baubar.
11. **Wo liegt die KI im Netz-Weg?** B-54/B-57 setzen einen KI-Richter voraus, der im Rahmen nicht steht.
12. **Kundenklasse**: welche Klassen, wer legt sie fest?
13. **Rollen** (B-36): Rechte technisch trennen (PIN/Profile) oder nur Absprache – auf einem Gerät ohne Konto?
14. **Verschlüsselung**: Passwort-Herkunft, Verlust-Fall, Algorithmus offen.
15. **Größe vs. Stunden** K-05 „mittel“ mit 3,8–6 h, K-12 „mittel“ mit 2–3,2 h, K-09 „klein“ mit 10–20 h – Größenangaben passen nicht zu den Stunden.
16. **O-01** Stundensätze und Handlungskosten: Inhaber bis 2026-10-20; bis dahin Platzhalter (B-46).
17. **Abnahme-Sterne** stehen schon im Auftrag, obwohl alles neu zu bauen ist – Herkunft unklar.
18. **euro: nein** – keine Kosten im Auftrag; Excel-Import (B-39) nicht beauftragt – gewollt?
19. Bedarfspunkte B-03–B-05, B-09, B-37, B-38, B-45 sind Stichworte ohne Anforderung.
