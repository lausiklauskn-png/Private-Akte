# Bauplan · V-2026-0001 · Fassung 4

Kunde: ⟦KUNDE-1⟧ · Ansprechpartner/Entscheider: ⟦KUNDE-2⟧ · Fassungsdatum 2026-09-10. Keine frühere Fassung — alle 18 Bausteine K-01…K-18 sind NEU BAUEN; es gibt nichts UNVERÄNDERT, ANPASSEN oder ENTFERNEN.

## 1. Zweck und Nutzer
Ein Getränke-Rezeptbuch für Bar und Zuhause (Mocktails, Smoothies, Cocktails, Limonaden, Tees, Sirupe) als App ohne Server (B-13, B-20). Probleme heute: Rezepte verstreut auf Karten und Handyfotos, ohne feste Mengen und Bild, jede Schicht mischt anders, neue alkoholfreie Getränke kosten Probierzeit, vorhandene Rezept-Apps sind fürs Essen (B-08…B-12).
- Nutzer: ⟦KUNDE-2⟧ (1), Mitarbeiter an der Theke (2), ohne Technikwissen; Bedienungsanleitung in der App (B-05, B-06, B-28).
- Gäste nutzen die App nicht selbst, sehen nur die Karte/Menüansicht (B-07).
- Ziel: jedes Getränk in Sekunden mit Bild und Mengen gefunden; neue Ideen aus dem Labor (B-20).

## 2. Plattformen, Datenort, Sicherung, Netz
- Installierbare Web-App (PWA) für Android-Handy, iPhone, Tablet und Browser; keine eigene iPhone- oder Windows-App (Rahmen, B-21, B-38).
- Ohne Internet: immer; nach dem ersten Öffnen vollständig offline (B-14, B-21, B-30).
- Daten nur im Browser des Geräts; kein Konto, keine Anmeldung, kein Server-Abgleich, kein Bezahlvorgang (B-23, N-01, B-38).
- Sicherung: vom Nutzer selbst angestoßen als Export/Import einer Datei (B-19, B-23).
- Abgleich zwischen Geräten „ab und zu“ – nur über Datei (siehe 8).
- Netz nur in benannten Fällen und nur auf Handlung: Entdecken (offene Getränke-Datenbank, nur lesend, B-32), KI-Dienste nach Bestätigung (Rahmen KI), Verbindung zum Relais nur auf Wunsch; beim Laden geht nichts ins Netz (B-42).
- KI-Schlüssel nur im Gerät, verschlüsselt, nie im Quelltext (B-35, B-45). Keine personenbezogenen Daten (B-34).
- Kein Abo, keine Werbung (B-37).

## 3. Bereiche/Seiten
1. Rezeptbuch: Kategorien-Leiste, Karussell/Liste der Getränke, Suche (K-01).
2. Getränk anzeigen/bearbeiten (Felder nach B-22, Bild mit Ausschnitt, Sterne, Herkunft K-16).
3. Labor (K-03).
4. Wochenplan / Menü / Einkaufsliste (K-04).
5. Entdecken (K-06).
6. Scan/Texterkennung, auch Stapel (K-10).
7. Einstellungen: Sprache (K-05), Thema (K-02), alkoholfreier Modus (B-25), Schlüssel-Tresor und Anbieter (K-11), Installieren (K-18), Export/Import (K-07), Kategorien verwalten (K-14), Netz/Siegel (K-09).
8. Anleitung (B-28).

## 4. Funktionen
1. **K-01 (B-13, B-22)** Getränk mit Kategorie, Zutaten (Menge, Einheit), Schritten, Glastyp, Alkoholangabe, Portionen, Zeit, Sternebewertung, Bild mit wählbarem Ausschnitt; Suche; Karussell-Ansicht.
2. **B-25** Alkoholfreier Modus blendet Getränke mit Alkohol überall aus (Jugendschutz, B-37).
3. **K-02 (B-14, B-21)** Installierbar, Offline-Vorrat aller App-Dateien, mehrere Farbthemen (B-27), Startanimation.
4. **K-18 (B-54, B-57)** Installieren-Knopf oben und in den Einstellungen; eigene App-Kennung, damit die App neben Schwester-Apps installierbar bleibt.
5. **K-13 (B-47)** Schneller Start: Bilder als Datei (nicht eingebettet), Netz-Module erst nach dem Laden.
6. **K-03 (B-15, B-24)** Labor: aus Kategorie, Geschmack und vorhandenen Zutaten einen KI-Vorschlag holen; Status „experimentell“; Bewertung in vier Punkten; danach Übernahme ins Buch oder Verwerfen.
7. **K-04 (B-16, B-26)** Wochenplan, Menüansicht zum Zeigen, Einkaufsliste aus den Rezepten; druckbar/als PDF (Faktor Druck/PDF).
8. **K-05 (B-17, B-27)** Oberfläche in acht Sprachen; ein Prüfskript meldet fehlende Übersetzungen.
9. **K-06 (B-18, B-32)** Bekannte Drinks aus einer offenen Getränke-Datenbank suchen und übernehmen (nur lesend, nur beim Entdecken).
10. **K-07 (B-19, B-23)** Export aller Rezepte als Datei, Import zurück.
11. **K-16 (B-52)** Beim Import (auch aus der Schwester-App) bekommt jedes Getränk eine feste Kennung und behält seine Herkunft; dasselbe Getränk erzeugt kein Doppel.
12. **K-14 (B-50, B-55)** Kategorien: umbenennen, Symbol wählen, löschen, zusammenlegen, per Ziehen ordnen, Zuordnen aus der Rezeptzeile. Zuordnung nur über die Kennung, Umbenennen ändert nur die Beschriftung; fremde (importierte) Kategorien gehen nicht verloren – Anlass dieser Fassung („Rezepte aus der Schwester-App kamen ohne Platz an“).
13. **K-08 (B-39)** Bedeutungssuche („etwas Fruchtiges ohne Zucker“) mit Modell auf dem Gerät.
14. **K-12 (B-46)** Spracheingabe im Suchfeld.
15. **K-10 (B-44, B-48)** Foto von Rezeptkarte/Handschrift → Text erkannt → als Getränk vorgeschlagen; auch als Stapel; Anbieter wählbar (Anthropic oder Mistral EU), gesendet wird nur auf Tipp.
16. **K-11 (B-45, B-49)** Schlüssel-Tresor (verschlüsselt), Anbieterwahl auch EU; KI-Richter bekommt fremde Antworten aus dem Netz nur nach Prüfung mit einer Prüfliste.
17. **K-15 (B-51)** Bild zum Getränk per KI erzeugen; Kamerafotos werden verkleinert statt abgewiesen.
18. **K-17 (B-53, B-56)** Vor jedem Senden an eine KI: versteckten Text und Bild-Metadaten entfernen; PDFs als gereinigte Seitenbilder senden; wird etwas entfernt, vorher einmal anhalten. Zusätzlich „Datei prüfen“ auf Knopfdruck.
19. **K-09 (B-40, B-41, B-42, B-43)** Netz-Knoten: eigene signierte Kennung (Spore), Beschreibung im Siegel sichtbar, Statuslampen, Rendezvous über ein eigenes Relais; findet Apps des Hauses (Rezeptbuch, Marktplatz) und antwortet ihnen; Verbindung nur auf Wunsch.
20. **B-28** Bedienungsanleitung in der App.

## 5. Schnittstellen zu anderen Programmen
- Mein Rezeptbuch (Schwester-App): Rezepte als Datei hin und her (Rahmen „Eigene Programme“, K-07, K-16).
- Offene Getränke-Datenbank im Netz, nur lesend (K-06).
- KI-Dienste: Anthropic, Mistral EU für Scan/Texterkennung (B-48); Labor-KI offen (O-01); Bild-Dienst offen (O-02).
- Eigenes Relais für das Netz der Schwester-Apps (B-43); Gegenstellen Rezeptbuch, Marktplatz (B-40).
- Vorlagen (Wiederverwendung, kein Laufzeit-Anschluss): Küchenzettel (K-01), Mein-Rezeptbuch-Page/Workfloh-PDF-Page (K-02, K-18), Sende-Prüfer (K-03, K-11, K-15), Company Brain (K-08), Workflow PDF (K-10), Auslieferungsprüfer (K-17), Rezeptbuch-App fürs Essen (B-31).

## 6. Ausdrücklich nicht
- N-01: kein Konto, keine Anmeldung beim Hersteller.
- Kein Server-Abgleich, kein Bezahlvorgang, kein Abo, keine Werbung (B-37, B-38).
- Keine eigene iPhone- oder Windows-App (B-38).
- Keine personenbezogenen Daten (B-34); KI-Schlüssel nie im Quelltext (B-35).
- Nichts geht beim Laden ins Netz (B-42); keine automatische Sendung an eine KI ohne Tipp/Bestätigung (B-48).
- Euro-Beträge stehen nicht im Auftrag (`euro: nein`) – keine Preise ins Produkt.

## 7. Abnahme
Je Baustein K-01…K-18 die Funktion aus 4 zeigen, plus die bausteinlosen Muss-Sätze:
- B-21 offline nach erstem Öffnen (Netz aus, App neu laden, alles bedienbar).
- B-22 alle Felder anlegen, speichern, wieder anzeigen.
- B-23 Daten nur lokal; Export → anderes Gerät → Import vollständig.
- B-24 Labor-Vorschlag erst „experimentell“, nach Bewertung übernommen oder verworfen.
- B-25 alkoholfreier Modus blendet in allen Ansichten aus.
- B-26 Wochenplan, Menü, Einkaufsliste aus Rezepten.
- B-27 acht Sprachen, mehrere Themen; Prüfskript ohne Fehlmeldung.
- B-41 Spore signiert, Beschreibung im Siegel.
- B-42 Netzmitschnitt beim Laden leer; Relais nur nach Knopf.
- B-48 Anbieterwahl Anthropic/Mistral EU, Senden nur auf Tipp.
- B-49 fremde Antwort ohne bestandene Prüfung erreicht den KI-Richter nicht.
- B-55 Umbenennen ändert keine Zuordnung; importierte unbekannte Kategorie bleibt sichtbar.
- B-56 PDF mit verstecktem Text: Halt, dann gereinigte Seitenbilder gesendet.
- B-57 neben Schwester-Apps parallel installierbar.
Sterne (Bedarf → Abnahme) zur Orientierung: B-13 4,3→5, B-14 4,5→5, B-15 3,3→3,7, B-16 3,5→4, B-44 4→4,5, B-50 3,5→4,5. Gesamtschätzung F4 240–450,6 h (inkl. Anpassung, 15 % Abstimmung, 20 % Puffer).

## 8. Offene Fragen und Widersprüche im Auftrag
- NOCH NICHT GESCHÄTZT: keine Zeile so markiert; alle Bausteine haben eine Spanne.
- **O-01** Welche KI darf das Labor benutzen? (⟦KUNDE-2⟧, Frist 2026-04-25 – liegt vor dem Fassungsdatum 2026-09-10, also überfällig oder schon beantwortet, aber nicht eingetragen).
- **O-02** Darf das Labor Bilder bei einem Bild-Dienst bestellen? (⟦KUNDE-2⟧, bis 2026-09-20). K-15 „KI-Bilder fürs Getränk“ ist trotzdem als NEU BAUEN beauftragt – bauen vor der Antwort?
- **Abgleich zwischen Geräten** „ab und zu“ vs. „nur auf dem Gerät“ und „kein Server-Abgleich“ (B-38): Annahme Abgleich nur per Exportdatei – bitte bestätigen. Gilt Rangfolge bei Konflikt (Kennung K-16)?
- Welche acht Sprachen? Welche Farbthemen, wie viele? Wie sieht die Startanimation aus (nirgends im Bedarf begründet)?
- Die „vier Punkte“ der Labor-Bewertung sind nicht benannt.
- Welche offene Getränke-Datenbank (Name, Lizenz)? Welches Modell für die Bedeutungssuche, wie groß, wird es mitgeliefert oder einmal geladen (Widerspruch zu „immer offline“)?
- Netz-Begriffe Spore, Siegel, Lampen, Rendezvous, KI-Richter, Prüfliste sind ohne Definition; Relais-Adresse fehlt; welche Daten antwortet die App anderen Apps (Datenschutz)?
- K-11 deckt laut Tabelle nur B-45, enthält aber den KI-Richter (B-49); B-49 hat keinen eigenen Baustein.
- B-16 nennt kein Drucken, K-04 hat aber Faktor Druck/PDF – ist Drucken gewünscht?
- Kleinheit vs. Stunden passt teils nicht: K-05 „klein“ 12–24 h, K-12 „klein“ 10–20 h, K-04 „mittel“ 26,4–48,4 h, K-14 „mittel“ 24–44 h, dagegen K-15 „mittel“ 3,8–6 h.
- Bilder: Größenbegrenzung, Format, Ausschnitt-Regeln für Kamerafotos (K-15) nicht angegeben.
- Spracheingabe (K-12) braucht im Browser meist einen Netzdienst – mit „immer offline“ vereinbar?
- Gäste „sehen die Karte“: auf welchem Gerät (Bildschirm, Ausdruck)?
- Austauschformat mit Mein Rezeptbuch (Dateiformat, Kategorienabbildung Essen ↔ Getränke) nicht festgelegt.
- K-13 nennt Vorlage „–“ mit 60 % Wiederverwendung – woraus?
