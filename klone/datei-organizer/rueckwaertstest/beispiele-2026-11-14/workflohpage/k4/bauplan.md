# Bauplan · V-2026-0001 · Fassung 3

Kunde: ⟦KUNDE-1⟧ · Fassungsdatum 2026-09-08 · alles unter „Zu tun“ ist NEU BAUEN (K-01 bis K-11), keine UNVERÄNDERT-, ANPASSEN-, ENTFERNEN- oder NOCH-NICHT-GESCHÄTZT-Zeilen.

## 1. Zweck und Nutzer
- Firmen-Website für einen Werbetechnik-Betrieb, zugleich wiederverwendbare **Vorlage** für weitere Betriebe (B-10, B-12). Ersetzt eine alte Seite mit festen Firmendaten und Fremd-Einbettungen (B-02, B-27).
- Ziele: Besucher finden am Handy in Sekunden Leistungen und Kontakt; die Vorlage lässt sich für einen neuen Betrieb in etwa einer Stunde anpassen (B-17).
- Nutzer: Inhaber ohne Technikwissen (B-05, B-24), Mitarbeiter in Werkstatt/Montage, die Bilder pflegen (B-06); Besucher = Kunden und Interessenten auf Handy, Tablet, PC (B-07, B-24).
- Zweck der Seite: Werbung und Anfrage (B-03, B-04).

## 2. Plattformen, Datenort, Sicherung, Netz
- Läuft im Browser (B-25), als eine einzige selbst-enthaltende Seite ohne Bau-Schritt (B-18, B-49).
- Installierbar als Web-App (Manifest, Service Worker), nach dem ersten Besuch offline lesbar (B-13, B-21, B-26).
- Eigene Bilder liegen nur im Browser des jeweiligen Geräts (B-14, B-20). Kein Abgleich zwischen Geräten (Rahmen: ein Gerät reicht).
- Keine externen Bibliotheken aus fremden Quellen, alles mitgeliefert (B-32); kein Zähldienst, keine Fremd-Karte, kein eingebettetes Instagram (B-31, B-09).
- Netz: Endknoten im Netz der eigenen Apps (SBKIM, Mycel) über Relais (B-34, B-40); beim Laden geht nichts ins Netz (B-38).
- Sicherung: im Auftrag nicht vorgesehen (Rahmen `sicherung: []`). KI: keine.
- Datenort laut Rahmen „eigener Server“ – Widerspruch zu B-49, siehe 8.

## 3. Bereiche/Seiten
Eine Seite mit sechs Bereichen (B-11, B-18):
1. **Start** – mit festem Band oben „Muster-Seite, kein Betrieb dahinter“ (B-55, B-45) und Installieren-Knopf (B-44).
2. **Leistungen** – acht Karten, Kategorie-Filter und Suchfeld (B-50, B-51).
3. **Anlagen** (Info zu Anlagen/Maschinen).
4. **Fragen und Antworten.**
5. **Team.**
6. **Kontakt** – Anschrift, Telefon, E-Mail, Social Media, Öffnungszeiten je Wochentag, Platz für Anfahrt, Anfrageformular (B-52–B-54).
Zusätzlich: Erklärseite(n) zu Netz, Siegel und Schutz (K-10, B-43); Lizenz-/Rechte-Erklärung (K-08, B-36); Netz-Fenster und Siegel als Bedienelemente (K-06, K-07).

## 4. Funktionen
1. **K-01** Grundseite mit den sechs Bereichen, alle Firmen-/Personenangaben als erkennbare Platzhalter (B-11, B-12, B-23, B-29, N-01). Keine Fotos ausgeliefert; jede Bildfläche zeigt einen neutralen Platzhalter (B-19). Prüfbar: keine echte Adresse, Telefonnummer, Person im Quelltext.
2. **K-01** Themen Hell, Dunkel, Kontrast umschaltbar, Wahl wird gemerkt und beim nächsten Besuch angewandt (B-15, B-22).
3. **K-01 / B-50, B-51** Acht Leistungskarten (genannt: Fahrzeugfolierung, Fahrzeugbeschriftung, Digitaldruck, 3D-Schilder, Lichtwerbung, Leuchtbuchstaben, zwei weitere offen); Filter Alle / Fahrzeug / Druck und Folie / Schilder und Gravur / Lichtwerbung; Suchfeld filtert die Karten.
4. **K-01 / B-52** Kontaktbereich mit Platzhaltern für Anschrift, Telefon, E-Mail, Social Media, Öffnungszeiten Mo–So, Anfahrt (ohne eingebettete Fremd-Karte, B-31).
5. **K-01 / B-53, B-54** Anfrageformular: Name oder Firma, E-Mail oder Telefon, Betreff, Nachricht; Pflichtfelder geprüft; Absenden öffnet das eigene Mailprogramm (mailto) mit vorausgefülltem Betreff und Text, kein Server.
6. **K-02** Installierbare Web-App: Manifest, Service Worker mit Offline-Vorrat; nach erstem Besuch ohne Netz lesbar (B-13, B-21). Räumt nur eigene Vorräte auf, nie die anderer Apps auf derselben Adresse (B-48).
7. **K-03** Bilder per Ziehen oder Kamera-Symbol auf jede Bildfläche, ohne Programmierkenntnis; Speicherung nur lokal im Browser (z. B. IndexedDB); bleibt nach Neuladen erhalten (B-14, B-20).
8. **K-04** Glas-Knöpfe und animierter Partikel-Hintergrund (B-16, Kann).
9. **K-05** Ladezeit und Kontrast: Hintergrund-Animation startet erst nach dem Laden (B-37); Kontrast am Handy lesbar, „Schutzstufen“ (B-33). Prüfbar: erster Aufbau wartet nicht auf die Animation.
10. **K-06** Netz-Endknoten mit eigener Ablage (eigener Speicherbereich), Netz-Fenster und Gerätename; beim Laden kein Netzverkehr (B-34, B-38, B-40).
11. **K-07** Siegel mit Andock-Assistent; eigene Kennung (Spore) unterschrieben veröffentlicht und im Siegel prüfbar (B-35, B-39).
12. **K-08** Lizenz und Rechte der Vorlage klar benannt (B-36).
13. **K-09** Netz-Bausteine auf aktuellen Stand: Englisch für Netz-Fenster und Siegel (B-41, B-46), Sperrliste, Bürgen, Rechenaufwand je Zettel (B-42). Netz-Bausteine unverändert aus der gemeinsamen Quelle übernommen und per Prüfsumme bewacht (B-47).
14. **K-10** Erklärseite in einfachen Worten: was Netz, Siegel und Schutz dem Besucher nützen (B-43, Kann).
15. **K-11** Fester Installieren-Knopf oben, verschwindet, wenn die Seite als App läuft (B-44); Vorlagen-Hinweis auf der Seite (B-45, zusammen mit B-55).

## 5. Schnittstellen zu anderen Programmen
- Eigenes E-Mail-Programm des Besuchers (mailto) für Anfragen (B-54).
- Netz der eigenen Apps (SBKIM, Mycel) über Relais (B-40); Spore öffentlich abrufbar (B-39).
- Gemeinsame Quelle der Netz-Bausteine (B-47) – Ort der Quelle nicht genannt.
- Social Media nur als Angabe/Link (B-52), keine Einbettung (B-31).

## 6. Ausdrücklich nicht
- Keine echten Firmen- oder Personendaten (N-01, B-12, B-23, B-29).
- Keine Fremd-Einbettungen: kein Zähldienst, keine Fremd-Karte, kein Instagram-Einbau (B-31).
- Keine Bibliotheken aus fremden Quellen (B-32).
- Kein eigener Server für den Betrieb der Seite, kein Bau-Schritt (B-49); Anfrage ohne Server (B-54).
- Keine KI; kein Abgleich zwischen Geräten.
- Keine ausgelieferten Bilder (B-19).

## 7. Abnahme
Je Baustein K-01 … K-11 die Funktionen aus Abschnitt 4. Zusätzlich ohne eigenen Baustein abzunehmen: B-18, B-19, B-20, B-21, B-22, B-23, B-37, B-38, B-39, B-47, B-48, B-49, B-50, B-51, B-52, B-53, B-54, B-55. Prüfschritte:
- Seite aus einer Datei/Ordner ohne Bau-Schritt öffnen; sechs Bereiche vorhanden.
- Quelltext durchsuchen: nur Platzhalter, keine fremden Adressen für Skripte/Stile.
- Netzmitschnitt beim Laden: keine Anfrage an fremde Rechner, keine Netzanfrage des Knotens.
- Installieren, Netz aus, neu öffnen: Seite lesbar; Installieren-Knopf ist im App-Modus weg.
- Vorrat einer zweiten App auf derselben Adresse bleibt nach Aktualisierung erhalten.
- Thema wählen, neu laden: Wahl bleibt. Bild ziehen, neu laden: Bild bleibt, nur auf diesem Gerät.
- Filter und Suche zeigen die richtigen Karten; Formular weist leere Pflichtfelder ab, mailto mit Betreff/Text.
- Spore im Siegel prüfbar; Netz-Bausteine stimmen mit der Prüfsumme überein; Netz-Fenster/Siegel auf Englisch umschaltbar.
- Animation startet erst nach dem Laden. Lizenzangabe sichtbar.
Kundenbewertung zur Orientierung (Sterne bei Abnahme): B-11 4,5 · B-13 4,5 · B-14 4,5 · B-33 5 · B-44 3,5.

## 8. Offene Fragen und Widersprüche im Auftrag
1. **Datenort:** Rahmen sagt „Daten liegen: eigener Server“, B-49 „ohne eigenen Server“ und B-20 „nur im Browser des Geräts“. Annahme: statische Seite, Daten lokal; Server nur zum Ausliefern? Klären.
2. **Offline:** Rahmen „reicht unterwegs“ gegen B-13/B-21 volle Offline-Lesbarkeit – Umfang des Vorrats (auch Erklärseiten, Netz-Bausteine?) offen.
3. **Lizenz (K-08):** welche Lizenz, wer Rechteinhaber, was darf ein Betrieb ändern? Nicht angegeben.
4. **Leistungen (B-50):** nur sechs von acht Leistungen genannt; Zuordnung zu den Kategorien und Kartentexte fehlen.
5. **Bereiche „Anlagen“, „Team“, „Fragen und Antworten“:** Inhalte/Anzahl Einträge nicht beschrieben; B-28 nennt zusätzlich „Projekte“ – eigener Bereich oder nicht?
6. **Netz (K-06, K-07, K-09):** SBKIM, Mycel, Spore, Sperrliste, Bürgen, „Rechenaufwand je Zettel“, Relais-Adressen und die „gemeinsame Quelle“ der Bausteine werden nicht erklärt; ohne diese Unterlagen nicht baubar. Wer erzeugt/unterschreibt die Spore, wo wird sie veröffentlicht?
7. **„Schutzstufen“ in K-05:** Bedeutung unklar (Kontraststufen? Sicherheitsstufen?).
8. **Englisch (B-46):** nur Netz-Bausteine zweisprachig; der Anlass nennt „Besucher aus dem Ausland“ – soll die übrige Oberfläche Deutsch bleiben?
9. **Bilder (B-14/B-20):** lokal gespeicherte Bilder sieht nur dieses Gerät, nicht die Besucher. Wie kommen Werkstattfotos auf die öffentliche Seite? Vermutlich nur über Austausch der Vorlage – klären.
10. **Anfahrt (B-52):** „Platz für die Anfahrt“ ohne Fremd-Karte – Text, eigenes Bild oder Link?
11. **Anpassung in einer Stunde (B-17):** wie ändert der Inhaber Platzhalter ohne Technikwissen (Datei bearbeiten oder Eingabe in der Seite)? Kein Baustein dafür.
12. **Schätzungen:** K-03, K-04, K-08 sind „klein“, aber mit 10–20 h geschätzt – größer als der „mittlere“ K-01 (6–10 h); Größe oder Stunden prüfen.
13. Vorlagen der Bausteine (Mein-Rezeptbuch-Page, Workfloh-PDF-Page, 50/80 % Wiederverwendung) liegen dieser Sitzung nicht vor.
