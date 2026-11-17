# Bauplan · Nebenkostenabrechnungen vor dem Versand prüfen (Vorgang V-2026-0001, Fassung 1, Kunde ⟦KUNDE-1⟧)

## 1. In einem Satz
Eine Windows-App für ⟦KUNDE-1⟧ (Hausverwaltung: Verwalter, Buchhalterin, ein Mitarbeiter), die alle fertigen Nebenkostenabrechnungen eines Jahres (PDF, ~600 Einheiten) vom Büro-Laufwerk nur lesend prüft und je Abrechnung eine Befundliste Rot/Gelb/„bitte prüfen“ mit Fundstelle zeigt – offline, ohne Cloud, ohne KI, ohne Rechtsrat.

## 2. Plattformen und Technik-Grundentscheidungen
- Nur Windows-PCs im Büro (B-37, K-06). Kein Android, kein Browser-Zugang von außen.
- Immer offline (Rahmen: „Ohne Internet: ja, immer“); kein Netzaufruf, auch nicht für Updates oder Lizenzprüfung.
- Desktop-Hülle nach Vorlage der vorhandenen Windows-Hüllen (K-06: Familienakte/BookLedgerPro/Workflow PDF Pro, 50 % Wiederverwendung) – Tauri-artige Hülle mit lokaler Web-Oberfläche.
- PDF-Lesen über die Textebene (K-01); Grundlage Vorlage „Auslieferungsprüfer“ (70 %). Kein OCR geplant (siehe offene Frage 5).
- Regelmaschine deterministisch, regelbasiert; keine KI, kein Sprachmodell (N-05, B-47).
- Ampellogik: es gibt kein „grün“ als Freigabe bei Unsicherheit; nicht sicher entscheidbar → „bitte prüfen“ (B-19).

## 3. Bereiche / Seiten
1. **Prüflauf** – Jahresordner auf dem Laufwerk wählen, Lauf starten, Fortschritt.
2. **Gesamtübersicht** – alle Abrechnungen des Jahres mit Zählern Rot/Gelb/„bitte prüfen“, Filter, Abhakstand.
3. **Abrechnung im Detail** – Befundliste mit Seite/Zeile, PDF-Ansicht (nur lesen) mit markierter Fundstelle, Abhaken.
4. **Vorjahresvergleich** – je Einheit und Position, Ausreißer markiert.
5. **Regeln** – Standard-Prüfregeln (Ansicht, Schwellen) und Sonderregeln je Mietvertrag/Objekt.
6. **Einstellungen** – Laufwerkspfade, Nutzer (Buchhalterin/Verwalter/Mitarbeiter), Lizenz, Sicherung.

## 4. Funktionen
1. (K-01) Ordner eines Jahres auf dem Büro-Laufwerk wählen und alle PDFs einlesen; Textebene je Seite/Zeile erfassen.
2. (K-01) Original-PDFs nie verändern, nur lesend öffnen; Prüfsumme je Datei merken, um Änderungen zwischen Läufen zu erkennen (B-34, N-01).
3. (K-01) Abrechnung strukturiert zerlegen: Einheit/Mieter, Abrechnungszeitraum, Erstellungsdatum, Positionen, Gesamtkosten, Verteilerschlüssel, Anteil, Vorauszahlung, Saldo. Nicht zerlegbare Teile → „bitte prüfen“.
4. (K-02) Regel „nicht umlagefähige Positionen“ (z. B. Verwaltung, Instandhaltung, Reparaturen, Bankgebühren) – Liste konfigurierbar (O-01) → Rot.
5. (K-02) Regel „Verteilerschlüssel geht auf“: Summe der Anteile = Gesamt bzw. Anteil × Kosten nachgerechnet, Rundungstoleranz → Rot/Gelb.
6. (K-02) Regel „Abrechnungszeitraum“: höchstens 12 Monate, passt zum Jahr, keine Lücke/Überschneidung zum Vorjahr → Rot/Gelb.
7. (K-02) Regel „Abrechnungsfrist“: Zugang beim Mieter bis 12 Monate nach Zeitraumende; Warnung (Gelb) mit Restzeit, nach Ablauf Rot; Zustelldatum unbekannt → „bitte prüfen“.
8. (K-02) Jeder Befund trägt Hinweistext (kein Rechtsrat, N-03, B-50), Regelkennung und Fundstelle.
9. (K-03) Sonderregeln je Mietvertrag/Objekt anlegen (z. B. abweichender Schlüssel, zusätzlich umlagefähige Position laut Vertrag); sie überschreiben die Standardregel und werden im Befund genannt („Sonderregel greift“).
10. (K-04) Vorjahresvergleich je Einheit und Position aus den Vorjahres-PDFs desselben Ordners; Ausreißer (Schwelle in % und €) → Gelb; neue/weggefallene Positionen markiert.
11. (K-05) Befundliste je Abrechnung und Gesamtübersicht mit Seite + Zeile; Klick springt zur Stelle im PDF.
12. (K-05) Abhaken durch die Buchhalterin (mit Name/Zeit, Bemerkung); Freigabe-Entscheidung durch den Verwalter als eigener Haken (B-35).
13. (K-05) Druck/PDF-Export der Befundliste und der Übersicht (eigene Datei, nie in das Original).
14. (K-05) Mehrere Nutzer: Arbeitsstand auf dem Laufwerk geteilt; gleichzeitiges Bearbeiten derselben Abrechnung wird erkannt (Sperrhinweis).
15. (K-07) Freischaltung offline per Lizenzdatei/-schlüssel: Bestandslizenz Verwaltung, Kleinlizenz bis zwei Wohnungen (Begrenzung auf zwei Einheiten).

## 5. Datenhaltung, Sicherung, Datenschutz
- PDFs bleiben, wo sie sind (Laufwerk); keine Kopie aller PDFs in der App.
- Arbeitsstand (Prüfergebnisse, Haken, Sonderregeln, Vorjahreswerte) als Dateien in einem eigenen Ordner auf dem Laufwerk (gemeinsam) bzw. lokal; JSON/SQLite – Entscheidung im Bau.
- Keine Cloud, keine KI, kein Versand (N-02, N-04, N-05); kein Telemetrie-Aufruf.
- Personenbezogene Daten (B-46): nur auf Gerät/Laufwerk; Zugriffsschutz über Windows-Rechte des Laufwerks.
- Sicherung: im Auftrag nicht festgelegt (`sicherung: []`) → offene Frage 7; mindestens Export/Import des Arbeitsstands vorsehen.

## 6. Schnittstellen / Zusammenspiel
- Eingabe: PDFs des Hausverwaltungsprogramms vom gemeinsamen Laufwerk (B-39, B-41, B-42); keine direkte Anbindung ans Programm.
- Excel (B-40): kein Zwang; optional CSV-Export der Übersicht (nicht beauftragt, siehe offene Frage 6).
- Keine Mail-, Cloud- oder KI-Schnittstellen.

## 7. Ausdrücklich nicht gebaut
- Abrechnung umschreiben/korrigieren (N-01) · selbst verschicken (N-02) · Rechtsberatung (N-03) · fremde Cloud (N-04) · KI (N-05).
- Bearbeitung von Widersprüchen/Belegeinsicht nach dem Versand (B-05, B-03) – Bedarf beschrieben, aber kein Baustein.
- Einweisung (B-36) – kein Baustein, nur außerhalb des Baus zu planen.
- Android/Mobil, Online-Updates.

## 8. Reihenfolge der Bauschritte
1. K-06 Windows-Hülle, Offline-Grundgerüst, Pfadwahl Laufwerk.
2. K-01 Einlesen eines Jahresordners, Textebene, Prüfsumme, Zerlegung in Felder (mit erfundenen Muster-PDFs).
3. K-02 Prüfregeln mit Ampel und Fundstelle; Proben je Regel inkl. „nie grün bei Unsicherheit“.
4. K-05 Befundliste, Gesamtübersicht, Abhaken, Druck/PDF, Mehrnutzer.
5. K-03 Sonderregeln je Vertrag/Objekt mit Vorrang.
6. K-04 Vorjahresvergleich.
7. K-07 Lizenz/Freischaltung.
8. Gesamtprobe mit ~600 erfundenen Abrechnungen (Laufzeit, Speicher), Abnahme beim Kunden.

## 9. Abnahmekriterien
- B-27: Ein Jahresordner mit PDFs wird vom Laufwerk vollständig eingelesen; nicht lesbare Dateien werden namentlich gemeldet.
- B-34: Prüfsumme jedes Original-PDFs vor und nach dem Lauf gleich; die App hat keine Versand-Funktion.
- B-28: Eingebaute nicht umlagefähige Position in einer Test-Abrechnung → Rot mit Fundstelle.
- B-29: Schlüssel, der nicht aufgeht → Rot/Gelb; aufgehender Schlüssel → kein Befund.
- B-30: Zeitraum > 12 Monate oder Frist überschritten → Rot; Frist nahe → Gelb; Datum fehlt → „bitte prüfen“.
- B-31: Je Abrechnung Liste Rot/Gelb/„bitte prüfen“ mit Seite und Zeile.
- B-19: Kein Fall mit unsicherer Erkennung erscheint als grün/ohne Befund.
- B-32: Sonderregel hinterlegt → Standardbefund entfällt, „Sonderregel“ wird angezeigt.
- B-33: Abweichung zum Vorjahr über Schwelle → Gelb mit beiden Werten.
- B-35: Buchhalterin hakt ab, Verwalter entscheidet; beides sichtbar.
- B-37/B-47: läuft auf Büro-Windows-PC ohne Internet; kein Netzaufruf messbar.
- B-23: Kleinlizenz lässt höchstens zwei Wohnungen zu.

## 10. Offene Fragen und Unklarheiten
1. **O-01 (offen):** Welche Prüfregeln genau gelten (Liste nicht umlagefähiger Positionen, Toleranzen) – wer stimmt sie ab (Verwalter, Anwalt, Verband)?
2. **O-02 (offen):** Woher kommen Vorjahreswerte, wenn das Programm nichts ausgibt? K-04 setzt Vorjahres-PDFs „im selben Ordner“ voraus – liegen sie dort, im gleichen Format?
3. Fristprüfung braucht das Zugangs-/Versanddatum, das nicht in der PDF steht – wo kommt es her (Eingabe, angenommenes Datum)?
4. Wie sehen die PDFs aus (ein Layout? mehrere Programme/Versionen)? Muster-PDFs (anonymisiert) werden für die Zerlegung gebraucht; Zerlegung ist das größte Risiko.
5. Sind alle PDFs mit Textebene, oder gibt es Scans (dann OCR nötig – nicht beauftragt)?
6. Excel (B-40/B-16): Soll ein Export nach Excel/CSV entstehen? Nicht als Baustein enthalten.
7. Sicherung: Rahmen nennt keine Sicherung – reicht die Laufwerkssicherung des Büros?
8. Widerspruch/Spannung: „Daten nur auf dem Gerät“ vs. gemeinsames Büro-Laufwerk für mehrere Nutzer (Faktor „Mehrere Nutzer“ bei K-05) – Arbeitsstand auf dem Laufwerk erlaubt?
9. Budget (B-48/B-49: wenige hundert Euro/Jahr, privat 30–40 €/Jahr) steht im Gegensatz zum Aufwand 177–340 h; Lizenzmodell (K-07) muss das tragen – nicht Teil des Baus, aber zu klären.
10. B-17 „lesen wie ein Mieterverein“ ist nur über die festgelegten Regeln abbildbar; weitergehende Erwartung klären.
11. B-05/B-03 (Widersprüche nach Versand) und B-36 (Einweisung) haben keinen Baustein – gewollt?
12. „Schlägt vor, der Kunde bestätigt“ (B-17…B-22): Die App macht nur Befunde/Vorschläge, Entscheidung beim Menschen – so verstanden, bitte bestätigen.
13. Lizenzprüfung offline: Wie wird die Kleinlizenz vergeben/übertragen, und darf sie zeitlich begrenzt sein?
