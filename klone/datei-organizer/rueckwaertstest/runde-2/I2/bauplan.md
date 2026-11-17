# Bauplan · Vorgang V-2026-0001 · Fassung 1 · Kunde ⟦KUNDE-1⟧

## 1. In einem Satz
Eine offline-fähige Arbeits-App für eine allein arbeitende KI-Beraterin (⟦KUNDE-1⟧), die ihre rund 30 Kunden (Arztpraxen, Steuerbüros, Handwerker, Verein) mit Schulungen, Teilnahmenachweisen, Sechs-Monats-Erinnerungen, Listen erlaubter Programme und Branchen-Vorlagen an einem Ort verwaltet – Daten bleiben getrennt je Kunde nur auf ihren Geräten.

## 2. Plattformen und Technik-Grundentscheidungen
- Geräte (K-08, B-37): Windows-Laptop, Android-Tablet (Hauptgerät in der Schulung), Android-Handy.
- Eine gemeinsame Web-Oberfläche (PWA, ohne Bau-Schritt oder mit kleinem Bau), verpackt als
  - Android-Hülle (Tablet + Handy) und Windows-Hülle (Vorlage laut Auftrag: Hüllen aus Familienakte/BookLedgerPro/Workflow PDF Pro, ~50 % wiederverwendet).
- Ganz ohne Internet nutzbar (Rahmen „reicht unterwegs“, B-38 kein WLAN in Praxen, Faktor Offline ×1,15 bei K-01/02/05).
- Speicher lokal: IndexedDB in der App plus Ablage in einem selbst gewählten Ordner / auf der Speicherkarte (Rahmen „nur auf dem Gerät, eigener Ordner / Speicherkarte“).
- Kein Server, kein Konto, kein Cloud-Dienst, keine KI-Anbieter (N-03).
- Bedienung auf Tempo ausgelegt (B-36): wenige Tipps je Vorgang, große Ziele am Tablet.

## 3. Bereiche / Seiten
1. **Übersicht** – alle Kunden mit Ampel erledigt / fällig / fehlt, Fälligkeiten oben.
2. **Kunde** – Stammdaten, Schulungen, Teilnehmer, erlaubte Programme, zugeordnete Vorlagen, Export.
3. **Schulung** – Datum, Thema, Inhalte, Teilnehmerliste; Modus „Abhaken“ fürs Tablet.
4. **Erlaubte Programme** (je Kunde) – Liste mit Stand-Datum.
5. **Vorlagen** – Branchen-Vorlagen (z. B. Arztpraxis), Zuordnung zu Kunden.
6. **Einstellungen** – eigener Name, Logo, Ablageordner, Sicherung, Erinnerungs-Frist.

## 4. Funktionen
1. (K-01) Kundenstamm anlegen/ändern/archivieren; Felder: Name, Branche, Ansprechpartner, Notiz.
2. (K-01) Übersicht mit Ampel je Kunde: erledigt (letzte Schulung < 6 Monate, Programmliste aktuell), fällig (Frist erreicht/bald), fehlt (keine Schulung oder keine Programmliste). Regel siehe offene Frage 3.
3. (K-01, B-12/B-26) „Was haben wir schon gemacht?“: Kundenseite zeigt in einer Zeitleiste alle Schulungen mit Thema, Inhalten, Teilnehmerzahl – Antwort in Minuten.
4. (K-01, B-29) Schulung je Kunde erfassen: Datum, Thema, Inhalte (Stichpunkte), Teilnehmer (Namen).
5. (K-02, B-20/B-30) Teilnahme-Abhaken am Tablet: Liste der Teilnehmer, je Name nur „teilgenommen ja/nein“, neue Namen schnell dazu; ohne Internet; keinerlei Bewertung (N-01).
6. (K-03, B-21/B-31) Teilnahmeblatt je Schulung als PDF und Druck: Datum, Kunde, Thema, Inhalte („was gelernt“), Teilnehmerliste, Name und Logo der Beraterin; keine Einzelbewertung. Darf selbst erzeugt werden (Rahmen: B-21 „darf selbst handeln“).
7. (K-04, B-22/B-32) Fälligkeit: 6 Monate nach der letzten Schulung je Kunde; erscheint in der Übersicht. Rahmen „schlägt vor, Kunde bestätigt“: die App **schlägt** den Termin/die Wiederholung vor, die Beraterin bestätigt oder verschiebt; nichts wird selbst geplant oder versandt.
8. (K-04, O-01) Erinnerung als Meldung auf dem Gerät – ob auch aufs Handy: offen (Frage 1).
9. (K-05, B-23/B-33) Liste erlaubter Programme je Kunde: Programm, Zweck/Hinweis, Stand-Datum der Liste; Hinweis „älter als 3 Monate – bitte prüfen“ (B-13). Nur Dokumentation, kein Urteil „rechtlich zulässig“ (N-02); Hinweistext sagt das ausdrücklich. Rahmen „schlägt vor“: Aktualisierung wird vorgeschlagen, die Beraterin bestätigt das neue Stand-Datum.
10. (K-05, B-03) Schnelles Nachschlagen „Darf Kunde X Programm Y?“ = Suche in der Liste des Kunden (keine Mail-Anbindung).
11. (K-06, B-24/B-34) Branchen-Vorlagen einmal pflegen (z. B. Inhalte einer Arztpraxis-Schulung, Standard-Programmliste) und mehreren Kunden **zuordnen** (Verweis, keine Kopie); Änderung an der Vorlage wirkt bei allen. Abweichungen je Kunde als eigene Ergänzung.
12. (K-07, B-25/B-35) Daten je Kunde getrennt gehalten; vollständiger Export je Kunde (eine Datei bzw. Ordner: JSON + PDFs der Teilnahmeblätter, lesbar ohne die App, z. B. zusätzlich CSV). Darf selbst ausgeführt werden (B-25 „darf selbst handeln“).
13. (K-07) Sicherung auf Knopfdruck aller Kunden in den eigenen Ordner / die Speicherkarte; Wiedereinlesen ohne Überschreiben (zusammenführen).
14. (K-08) Gleiche Oberfläche auf Windows, Tablet, Handy; Layout von Handy- bis Laptop-Breite.
15. Suche über Kunden, Schulungen, Teilnehmer, Programme.

## 5. Datenhaltung, Sicherung, Datenschutz
- Datenmodell: Kunde → Schulungen → Teilnahmen; Kunde → Programmliste (mit Stand-Datum); Vorlage ↔ Kunden (Zuordnung); Einstellungen (Name, Logo).
- Trennung je Kunde (B-41): jeder Kunde als eigener Datensatz-Bereich mit eigener Export-Einheit; nie Teilnehmernamen eines Kunden in der Ansicht eines anderen.
- Personenbezogene Daten (B-42): nur Namen der Teilnehmer; keine Bewertungen, keine Noten (N-01).
- Alles bleibt auf den Geräten der Beraterin (B-43, N-03): kein Netzverkehr außer optional App-Updates.
- Sicherung nur selbst angestoßen (Rahmen); optional verschlüsselt (Frage 5). Löschen eines Kunden mit Rückfrage; danach Export-Möglichkeit vorher anbieten.
- Hinweis an die Beraterin: sie ist Auftragsverarbeiterin für Teilnehmernamen – Rechtliches nicht Teil der App (N-02).

## 6. Schnittstellen / Zusammenspiel
- Export: PDF (Teilnahmeblatt), CSV/JSON (je Kunde, Sicherung).
- Import: Sicherungsdatei; optional einmaliger Import der bisherigen Excel-Teilnahmeliste als CSV (B-02, B-39) – Umfang offen (Frage 6).
- Zwischen den Geräten: nur über Sicherungsdatei / gemeinsamen Ordner, kein Abgleich übers Netz (Frage 2).
- Kein Anschluss an E-Mail, Word oder Excel als laufende Schnittstelle.

## 7. Ausdrücklich nicht gebaut
- N-01: keine Noten oder Bewertungen einzelner Mitarbeiter, nichts an Vorgesetzte der Kunden.
- N-02: keine Rechtsgutachten, keine Aussage „rechtlich erlaubt/verboten“; App tut nicht so, als prüfe sie Recht.
- N-03: keine Kundendaten bei fremden Anbietern (keine Cloud, keine fremde KI, kein Mail-Versand durch die App).
- Kein Abrechnungs-/Rechnungsteil, keine Terminbuchung durch Kunden, kein Kundenzugang.

## 8. Reihenfolge der Bauschritte
1. Grundgerüst PWA, lokaler Speicher, Datenmodell, Trennung je Kunde (K-01, K-07 Basis).
2. Kundenstamm + Schulungen + Kundenseite mit Verlauf (K-01).
3. Abhaken-Modus am Tablet, offline erprobt (K-02).
4. Teilnahmeblatt PDF/Druck mit Name und Logo (K-03).
5. Programmliste mit Stand-Datum und 3-Monats-Hinweis (K-05).
6. Fälligkeiten 6 Monate + Übersicht mit Ampel + Erinnerung (K-04, K-01 Übersicht).
7. Branchen-Vorlagen mit Zuordnung (K-06).
8. Export je Kunde, Sicherung, Wiedereinlesen (K-07).
9. Android- und Windows-Hülle, Gerätetest (K-08).
10. Abnahme mit der Kundin an Testdaten (erfunden), dann eigene Daten.

## 9. Abnahmekriterien
- B-28: Übersicht zeigt alle Kunden mit erledigt / fällig / fehlend; Ampel stimmt an vorbereiteten Testfällen.
- B-29: Je Kunde Schulungen mit Datum, Thema, Teilnehmern erfasst und wieder angezeigt.
- B-30: Am Tablet im Flugmodus Teilnahme abhaken, App schließen, wieder öffnen – Haken sind da.
- B-31: Teilnahmeblatt mit Datum, Inhalten, Name und Logo als PDF erzeugt und gedruckt; enthält keine Bewertung.
- B-32: Kunde mit letzter Schulung vor > 6 Monaten erscheint als fällig und löst die Erinnerung aus.
- B-33: Programmliste je Kunde mit Stand-Datum; > 3 Monate alt → Hinweis sichtbar.
- B-34: Eine Vorlage zwei Kunden zugeordnet; Änderung an der Vorlage erscheint bei beiden, ohne Kopie.
- B-35: Export eines Kunden enthält vollständig dessen Daten und keine Daten anderer Kunden.
- B-26: Frage „Was haben wir schon gemacht?“ in unter 2 Minuten beantwortbar (gemessen an Testdaten).
- Kein Netzverkehr mit Kundendaten (Netzmitschnitt leer); läuft auf Windows, Tablet, Handy.

## 10. Offene Fragen und Unklarheiten
**Offene Punkte aus dem Auftrag**
1. O-01: Soll die Erinnerung auch aufs Handy kommen (Android-Meldung), oder reicht die Übersicht?
2. O-02: Wie soll „was gelernt“ auf dem Blatt aussehen – Inhalte der Schulung für alle gleich, oder je Teilnehmer? (Je Teilnehmer grenzt an N-01.)

**Noch nicht geschätzt:** keine Zeile im Auftrag ist als NOCH NICHT GESCHÄTZT markiert.

**Unklarheiten / Widersprüche**
3. Ampel „fehlt“: was genau fehlt (keine Schulung? keine Programmliste? fehlendes Teilnahmeblatt?) – Regel muss die Kundin festlegen.
4. Drei Geräte, aber Daten „nur auf dem Gerät“ und kein Abgleich beschrieben: Wie kommen die Haken vom Tablet auf den Laptop? Vorschlag: Sicherungsdatei/gemeinsamer Ordner (z. B. Speicherkarte, USB) – bestätigen. Ohne Lösung entstehen getrennte Bestände.
5. Sicherung verschlüsselt mit Passwort oder offen lesbar? (Teilnehmernamen, B-42.)
6. B-39 (Word, Excel, E-Mail) ist K-08 „Plattformen“ zugeordnet, aber es gibt keinen Baustein für Import/Übernahme der Altbestände (Word-Ordner, Excel-Liste) – soll ein einmaliger Import gebaut werden?
7. B-03 (Fragen per E-Mail) ist K-05 zugeordnet; eine Mail-Anbindung ist nicht vorgesehen – reicht Nachschlagen in der Liste?
8. B-11 trägt „Anzahl 1“ für alle Mitarbeiter der Kunden – vermutlich Platzhalter; erwartete Teilnehmerzahl je Schulung/insgesamt?
9. Rahmen „schlägt vor, Kunde bestätigt“ für B-22/B-23: Was genau wird vorgeschlagen (Termin, Wiederholungsschulung, Prüfung der Liste) und wie wird bestätigt?
10. K-08 „klein“ (4–7 h) für zwei native Hüllen plus Gerätetest wirkt knapp – Schätzung prüfen.
11. K-06 (10–20 h) hat keine Vorlage und keinen Faktor; Umfang „Vorlage“ unklar (nur Schulungsinhalte? auch Programmliste? auch Blatt-Layout?).
12. B-27 (eine Stunde je Kunde im Quartal sparen) und B-44 (Budget 50–130 € im Monat) sind keinem Baustein zugeordnet; B-44 deutet auf laufende Kosten/Miete, der Auftrag ist ein Einmalbau (euro: nein) – Bezahlmodell klären.
13. Logo: in welcher Form geliefert (PNG/SVG), und Name/Logo einmalig in Einstellungen – bestätigen.
14. Verschwiegenheitserklärung und Vereinbarung sind nicht aktiviert – vor Arbeit mit echten Teilnehmernamen klären.
