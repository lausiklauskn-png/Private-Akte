# Bauplan · V-2026-0001 · Fassung 4

Kunde: ⟦KUNDE-1⟧ · Ansprechpartner/Entscheider: ⟦KUNDE-2⟧ · Fassungsdatum 2026-09-10 · Grundlage: nur `bauauftrag.md`.
Alle 18 Zeilen unter „Zu tun“ stehen auf NEU BAUEN; es gibt keine Zeilen UNVERÄNDERT, ANPASSEN oder ENTFERNEN.

## 1. Zweck und Nutzer

- Getränke-Rezeptbuch für Bar und Zuhause als App ohne Server (Vorhaben). Alle Getränkerezepte an einem Ort, damit jede Schicht gleich mischt (B-13, B-09, B-11); neue alkoholfreie Getränke über ein KI-Labor (B-10, B-15).
- Zielbild: jedes Getränk in Sekunden mit Bild und Mengen gefunden, neue Ideen aus dem Labor (B-20).
- Nutzer: ⟦KUNDE-2⟧ (1), Mitarbeiter an der Theke (2), Thekenpersonal ohne Technikwissen, daher Bedienungsanleitung in der App (B-05, B-06, B-28). Gäste sehen nur die Karte, nutzen die App nicht (B-07).
- Ausgangslage: Rezeptkarten hinter der Theke, Fotos im Handy, eine Rezeptbuch-App fürs Essen, die als Vorlage dient (B-02, B-12, B-31).

## 2. Plattformen, Datenort, Sicherung, Netz

- Installierbare Web-App in **einer einzigen Datei ohne Bau-Schritt**, ohne Server; nach dem ersten Öffnen ganz ohne Internet (B-21, B-58, K-02). Geräte: Android-Handy, iPhone, Tablet, Browser – nur als Web-App, keine eigene iPhone- oder Windows-App (Rahmen, B-38).
- Daten nur im Browser des Geräts (B-23, Rahmen); kein Abgleich zwischen Geräten; keine personenbezogenen Daten (B-34). Inhalte: Rezepte, Zutaten, Fotos, Bewertungen (B-33).
- Sicherung: selbst anstoßen (Export als Datei, K-07, B-62) und von allein (Sicherungsstände im Tresor auf dem Gerät, zurückholen/exportieren/löschen, B-61).
- KI nur über einen Dienst, nur nach Bestätigung bzw. auf Tipp, nur mit eigenem Schlüssel des Nutzers; ohne Schlüssel läuft alles andere (Rahmen, B-48, B-63). Schlüssel verschlüsselt nur im Gerät, nie im Quelltext (B-35, B-45).
- Netz sonst nur: offene Getränke-Datenbank beim Entdecken, nur lesend (B-32); Relais für das Netz der Schwester-Apps nur auf Wunsch; beim Laden geht nichts ins Netz (B-42, B-43, K-13).

## 3. Bereiche/Seiten

1. Rezeptbuch (Liste/Karussell, Kategorie-Reiter, Suche) – K-01
2. Rezept-Detail und Bearbeiten (Zutaten, Schritte, Bild mit Ausschnitt, Sterne) – K-01, K-15, K-14
3. KI-Labor – K-03
4. Wochenplan · Menü · Einkaufsliste – K-04
5. Entdecken (bekannte Drinks) – K-06
6. Scan / Texterkennung (einzeln und Stapel) – K-10
7. Ordner/Kategorien verwalten – K-14
8. Einstellungen: Sprache, Thema, alkoholfreier Modus, KI-Schlüssel/Anbieter, Installieren, Sicherung/Tresor, Export/Import, Netz – K-02, K-05, K-07, K-11, K-18
9. Netz-Bereich: Siegel, Lampen, Rendezvous – K-09
10. Bedienungsanleitung in der App – B-28

## 4. Funktionen

1. **K-01 / B-13, B-22, B-60** Getränk mit Kategorie, Zutaten (Menge, Einheit), Schritten, Glastyp, Alkoholangabe, Portionen, Zeit, Sternebewertung anlegen, ändern, löschen. Prüfbar: alle Felder speichern und nach Neuladen wieder da.
2. **K-01** Bilder mit Ausschnitt, Suche, Karussell-Ansicht. Prüfbar: Ausschnitt bleibt gespeichert; Suche findet nach Name/Zutat.
3. **B-60** Feste Kategorien: Smoothies und Shakes, Mocktails, alkoholfreie Cocktails, Limonaden, Tees und Kaffees, Cocktails, Bowlen – umbenennbar.
4. **B-25 / B-37** Alkoholfreier Modus blendet Getränke mit Alkohol aus. Prüfbar: an → kein Getränk mit Alkoholangabe sichtbar.
5. **K-02 / B-14, B-21, B-58** Installierbar, Offline-Vorrat, Farbthemen (B-27, „mehrere“), Startanimation. Prüfbar: nach erstem Öffnen im Flugmodus voll bedienbar (außer KI/Entdecken/Netz).
6. **K-03 / B-15, B-24** Labor: aus Kategorie, Geschmack, Zutaten KI-Vorschlag holen; gilt zuerst als „experimentell“; Bewertung in vier Punkten; danach übernehmen ins Buch oder verwerfen.
7. **K-04 / B-16, B-26** Wochenplan, Menüansicht (zum Zeigen), Einkaufsliste aus den Rezepten; Faktor Druck/PDF → Ausgabe druckbar.
8. **K-05 / B-17, B-59** Oberfläche in DE, EN, RU, ZH, ES, FR, IT, PT; Prüfskript meldet fehlende Übersetzungen.
9. **K-06 / B-18, B-32** Bekannte Drinks aus offener Getränke-Datenbank suchen und übernehmen, nur lesend, nur beim Entdecken online.
10. **K-07 / B-19, B-23, B-62** Export der ganzen Sammlung als Datei; Import ersetzend oder ergänzend, mitsamt Ordnern.
11. **K-08 / B-39** Bedeutungssuche („etwas Fruchtiges ohne Zucker“) mit Modell auf dem Gerät.
12. **K-09 / B-40, B-41, B-42, B-43** Netz-Knoten: eigene signierte Kennung (Spore), Beschreibung im Siegel, Lampen, Rendezvous über eigenes Relais; findet Schwester-Apps (Rezeptbuch, Marktplatz) und antwortet ihnen; nur auf Wunsch.
13. **K-10 / B-44, B-48** Foto von Rezeptkarte/Handschrift → Text → Getränk-Vorschlag, auch im Stapel; Anbieter Anthropic oder Mistral EU wählbar; Senden nur auf Tipp.
14. **K-11 / B-45, B-49, B-63** Schlüssel-Tresor (verschlüsselt), Anbieterwahl; KI-Richter mit Prüfliste: fremde Antworten aus dem Netz nur geprüft an den Richter.
15. **K-12 / B-46** Spracheingabe im Suchfeld.
16. **K-13 / B-47** Schneller Start: Bilder als Datei statt eingebettet, Netz-Module erst nach dem Laden.
17. **K-14 / B-50, B-55** Kategorien umbenennen, Symbol setzen, löschen, zusammenlegen, verschieben (ziehen), Zuordnen aus der Rezeptzeile; Zuordnung nur über Kennung, Umbenennen ändert nur Beschriftung; fremde Kategorien aus Importen gehen nicht verloren.
18. **K-15 / B-51** KI-Bild zum Getränk erzeugen; Kamerafotos werden verkleinert statt abgewiesen (O-02 beachten, siehe 8).
19. **K-16 / B-52** Beim Import feste Kennung und Herkunft am Getränk; keine Doppel beim Austausch mit der Schwester-App.
20. **K-17 / B-53, B-56** Vor dem Senden an eine KI versteckten Text und Bild-Metadaten entfernen; PDFs als gereinigte Seitenbilder; einmal anhalten, wenn etwas entfernt wird; „Datei prüfen“ auf Knopfdruck.
21. **K-18 / B-54, B-57** Installieren-Knopf oben und in den Einstellungen; eigene App-Kennung, damit neben Schwester-Apps installierbar.
22. **B-61** Automatische Sicherungsstände im Tresor auf dem Gerät; frühere Stände zurückholen, exportieren, löschen (ohne eigenen Baustein).
23. **B-28** Bedienungsanleitung in der App (ohne eigenen Baustein).

## 5. Schnittstellen zu anderen Programmen

- **Mein Rezeptbuch:** Rezepte austauschen (Rahmen) über Datei-Export/-Import (K-07), mit Herkunft und fester Kennung, ohne Doppel (K-16), fremde Kategorien bleiben (K-14).
- Dateien hin- und hergeben (Rahmen) – über Export/Import.
- Schwester-Apps (Rezeptbuch, Marktplatz) über eigenes Relais (K-09).
- Offene Getränke-Datenbank im Netz, nur lesend (K-06).
- KI-Dienste: Anthropic/Claude, Mistral (EU), OpenAI (B-48, B-63); Bild-Dienst nur nach Klärung O-02.

## 6. Ausdrücklich nicht

- N-01: kein Konto, keine Anmeldung beim Hersteller.
- Kein Server-Abgleich, kein Bezahlvorgang, kein Abo, keine Werbung (B-37, B-38).
- Keine eigene iPhone- oder Windows-App (B-38).
- Kein Abgleich zwischen Geräten (Rahmen).
- Kein KI-Aufruf ohne Bestätigung/Tipp und ohne eigenen Schlüssel; kein Netzverkehr beim Laden.

## 7. Abnahme

- Je Baustein K-01…K-18 gegen die gedeckten B-Kennungen (Tabelle „Zu tun“); dazu ohne Baustein: B-21, B-22, B-23, B-24, B-25, B-26, B-27, B-41, B-42, B-48, B-49, B-55, B-56, B-57, B-58, B-59, B-60, B-61, B-62, B-63.
- Kernprüfungen: Flugmodus-Test nach erstem Öffnen; Netzmitschnitt beim Laden leer; Export → Import ersetzend und ergänzend liefert dieselbe Sammlung samt Ordnern und Kategorien; Import aus der Schwester-App zweimal → keine Doppel; Umbenennen einer Kategorie verschiebt kein Getränk; vor KI-Senden wird ein PDF mit verstecktem Text angehalten; App neben Schwester-App installierbar; alle acht Sprachen ohne fehlende Texte (Prüfskript).
- Sterne-Erwartung aus dem Auftrag (beim Bedarf → bei der Abnahme): B-13 4,3→5; B-14 4,5→5; B-15 3,3→3,7; B-16 3,5→4; B-44 4→4,5; B-50 3,5→4,5.
- Rahmen Stunden F4: 240–450,6 h (inkl. Anpassung, Abstimmung 15 %, Puffer 20 %); Euro nicht angegeben.

## 8. Offene Fragen und Widersprüche im Auftrag

- **O-02 (offen, ⟦KUNDE-2⟧ bis 2026-09-20):** Darf das Labor Bilder bei einem Bild-Dienst bestellen? K-15 (KI-Bilder) hängt davon ab – Baustein steht trotzdem auf NEU BAUEN. Zeilen „NOCH NICHT GESCHÄTZT“ gibt es nicht.
- **Fassung 4, aber „keine frühere Fassung“, `vorher: -`**; Anlass spricht von Rezepten aus der Schwester-App, die „ohne Platz“ ankamen – was „ohne Platz“ heißt (ohne Kategorie? ohne Ordner?), ist nicht beschrieben.
- **Eine Datei ohne Bau-Schritt (B-58) vs. „Bilder als Datei“ (K-13)** und Bedeutungsmodell auf dem Gerät (K-08): wie viele Dateien sind erlaubt? Größe/Herkunft des Modells, offline vorhanden oder nachgeladen?
- **KI-Anbieter widersprüchlich:** B-48 nennt Anthropic oder Mistral EU (Scan), B-63 Claude, Mistral oder OpenAI. Gilt OpenAI auch für Scan? Welcher Dienst erzeugt Bilder (K-15)?
- **Offline „immer“ (Rahmen, B-14) vs. Funktionen mit Netz** (KI, Entdecken, Relais, evtl. Spracheingabe K-12): Verhalten ohne Netz nicht beschrieben; ob Spracheingabe offline laufen muss, offen.
- **Kein Abgleich/ein Gerät vs. K-09 mit Faktor „Mehrere Nutzer“ und Netz-Knoten:** was wird über das Relais tatsächlich ausgetauscht (nur Antworten auf Suchen? Rezepte?) – nicht festgelegt. Adresse/Betreiber des „eigenen Relais“ fehlt.
- **Kategorien:** B-13 nennt Sirupe, B-60 hat keine Kategorie Sirupe. Alkoholfreier Modus vs. Kategorie Cocktails/Bowlen: blendet er nach Alkoholangabe je Getränk oder nach Kategorie aus?
- **Bewertung „in vier Punkten“ (K-03):** welche vier Punkte, welche Schwelle für Übernahme? Sternebewertung im Buch: Skala?
- **„Ordner“ (B-62)** kommen sonst nirgends vor – Verhältnis Ordner ↔ Kategorie unklar.
- **Tresor (B-61, K-11):** verschlüsselt mit welchem Passwort? Takt der automatischen Sicherung, Anzahl gehaltener Stände?
- **Exportformat** und Format der Schwester-App (Mein Rezeptbuch) sind nicht angegeben; Herkunftsfeld-Inhalt (K-16) offen.
- **Wochenplan/Menü/Einkaufsliste (K-04):** Mengenzusammenfassung, Portionsumrechnung, Druck/PDF-Umfang nicht beschrieben.
- **Farbthemen:** Anzahl („mehrere“) und Startanimation-Inhalt offen. **Spore/Siegel/Lampen/KI-Richter-Prüfliste:** Fachbegriffe ohne Spezifikation im Auftrag.
- Vorlagen (Küchenzettel, Sende-Prüfer, Company Brain, Workflow PDF, Auslieferungsprüfer, Mein-Rezeptbuch-Page, Workfloh-PDF-Page) werden genannt, aber hier nicht beschrieben; K-13 hat „Vorlage –“ mit 60 % Wiederverwendung (widersprüchlich).
- B-29 „Geräte“, B-30 „offline“, B-36 „Vorgaben“ sind Stichworte ohne weiteren Inhalt.
