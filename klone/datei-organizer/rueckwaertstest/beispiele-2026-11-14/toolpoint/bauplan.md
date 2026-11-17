# Bauplan · V-2026-0001 · Fassung 4

Kunde: ⟦KUNDE-1⟧ · Fassungsdatum 2026-10-01 · alles unter „Zu tun“ ist NEU BAUEN (keine frühere Fassung, keine Zeilen ANPASSEN/ENTFERNEN/UNVERÄNDERT/NOCH NICHT GESCHÄTZT).

## 1. Zweck und Nutzer
Offener Marktplatz für Web-Apps mit nachprüfbaren Messwerten. Vertrauen soll die Software herstellen, nicht die Person (B-10, B-12): jede Karte nennt mit Datum, was gemessen wurde, jede Einsendung geht über einen Tisch (B-20). Dazu ein Prüfwerkzeug (Auslieferungsprüfer), das Seiten, Archive, Texte, Adressen und E-Mails auf dem Gerät durchsieht.

Nutzer (B-06–B-08):
- Betreiber (1) – pflegt im versteckten Studio.
- Fremde Anbieter (~20) – reichen Apps ein.
- Besucher (~500) – suchen eine App.

Ton: sachlich, knapp, kein Mitmach-Appell (B-31); Erklärungen hinter Aufklappern (B-32).

## 2. Plattformen, Datenort, Sicherung, Netz
- Im Browser, ohne Konto/Anmeldung, installierbar, nach dem ersten Besuch offline („reicht unterwegs“) (B-21, B-33). Ein Gerät reicht, kein Abgleich.
- Drei Themen Nacht, Signal, Tag mit geprüftem Kontrast je Thema (B-35).
- Daten: Einträge liegen als Datei im Repo und werden als fertiges HTML eingebacken (B-26); Einsendungen und der Repo-Zugang liegen nur auf dem eigenen bzw. gemeinsamen Server (B-27, B-38). Prüfberichte nur auf dem Gerät (B-55).
- Sicherung: im Auftrag nicht festgelegt (Feld leer) → offene Frage 8.
- Netz: kein Zähldienst, keine Laufzeit-Abhängigkeit von fremden Servern (B-41). Nächtliches Lesen der Messreihe der Schwester-Seite (B-37). SBKIM-Netz optional (B-19).
- KI: nur auf dem Gerät.
- Personenbezogene Daten: ja (B-40); Impressum und Datenschutz mit echten Angaben nach § 5 DDG (B-42).

## 3. Bereiche/Seiten
1. Marktplatz-Startseite (Liste der Karten, Suche, Themen, Sprache, Installieren-Knopf).
2. Detailseiten `/apps/<kennung>/` je App plus Übersicht aller Apps mit Suchfeld.
3. Einreichen-Formular.
4. Pflege-Studio (versteckt, Zugang über langen Druck).
5. Auslieferungsprüfer (eigene Seite, eigener Knoten) mit Eingängen HTML, Archiv, Text, Adresse, E-Mail.
6. Netz-Verwaltungsseite (Bürgen).
7. Seite KI-Schulung (druckbar).
8. Impressum, Datenschutz (verbindlich Deutsch).
9. Generiert: sitemap.xml.

## 4. Funktionen
1. **K-01 (B-13, B-22, B-25, B-26, B-35)** Kompakte Karte: Symbol, Name, Beschreibung, Messwerte mit Datum; Anbieter, Bereich, Links erst beim Aufklappen. Sortierung nach Anfangsdatum der App (Zeitachse, keine Rangliste). Liste statisch im HTML, ohne Skript lesbar, kein Layout-Sprung. Drei Themen. Handy übersichtlich.
2. **K-02 (B-14, B-23, B-24, B-37)** Nachts Messwerte (Leistung, Bedienbarkeit, gute Praxis, Auffindbarkeit) aus der Messreihe der Schwester-Seite übernehmen, nicht selbst messen. Schlechte Werte sichtbar; ohne Messung „noch nicht gemessen“, keine erfundene Zahl. Abgleich beider Märkte: gleiche App, unterschiedliche Werte werden gemeldet.
3. **K-03 (B-15)** Wortsuche und Bedeutungssuche (Modell auf dem Gerät) mit Mikrofon.
4. **K-04 (B-16, B-27, B-38)** Einreichen nur über den gemeinsamen Server; Herkunft der Einsendung vom Browser bezeugt (nicht aus dem Formular). Nichts erscheint ohne Freigabe.
5. **K-05 (B-17, B-18, B-28, B-29)** Pflege-Studio hinter langem Druck: Warteschlange, Bearbeiten, Veröffentlichen ins Repo über den Server – kein Schlüssel im Browser. Ampel je Eintrag mit Grund, Melden-Knopf an jeder Karte (Melde-Kette ins Studio). Gesperrte App: sichtbar mit Grund, Link aus, nie „Fund der Woche“. Sperre im Studio setzen, lösen nur in der Datei.
6. **K-06 (B-19, B-67)** Marktplatz als SBKIM-Knoten mit Siegel, Lampen, eigenem Netz; Module byte-gleich aus dem Kanon, Abweichung per Prüfwert gemeldet.
7. **K-07 (B-46, B-51–B-54)** Auslieferungsprüfer: HTML, Archiv, Text, Adresse, alles im Browser, nichts hochgeladen. Befund je Fund mit Stelle, Sorte, Rat in Klartext; nie „virenfrei“. Zweite Meinung: Seite als Text und mit Browser-Parser lesen, Unterschiede als Befund. `.mhtml` auspacken und den geprüften Teil nennen.
8. **K-08 (B-47)** E-Mail-Eingang im Prüfer: Links, versteckter Text, Anweisungen an eine KI.
9. **K-09 (B-48)** Prüfer als zweiter SBKIM-Knoten mit eigener Schublade, eigener Identität, eigenem Siegel.
10. **K-10 (B-49)** Deutsch/Englisch per Knopf; Sprachriegel gegen den Auto-Übersetzer des Browsers; Rechtstexte bleiben Deutsch.
11. **K-11 (B-50)** Seite KI-Schulung nach Art. 4 EU AI Act mit Druckfassung.
12. **K-12 (B-56, B-60)** Wartungs-Schalter im Studio, hin und zurück per Klick; Sichtbarkeit an einer Stelle gefiltert; währenddessen keine Warnung aus Messungen. Eine gesperrte App bleibt auch in Wartung sichtbar.
13. **K-13 (B-57, B-61)** Detailseite je App als Messblatt: Messverlauf, Mängel, Weg zur App; Übersicht mit Suchfeld. Kein erfundenes Datum, keine Sterne, kein Preis im Strukturdaten-Block.
14. **K-14 (B-58)** Sitemap aus dem Canonical der Seiten gebaut, nicht gepflegt; Arbeitsabläufe bauen Liste, Detailseiten und Sitemap mit.
15. **K-15 (B-59, B-62)** Befund in die Zwischenablage, ohne Fundwerte: jede Quellzeile durch Platzhalter ersetzt (keine Schlüssel, Kontonummern).
16. **K-16 (B-63, B-68)** Sicherheitsnetz aus dem Sage-Kanon: signierte Fragen/Antworten mit Echtheitsprüfung, Rechenaufwand, signierte Sperrliste; Antworten mit KI-Anweisung vom KI-Richter ausgeschlossen.
17. **K-17 (B-64)** Bürgen je App mit Ablauf und Widerruf; Netz-Verwaltung als eigene Seite.
18. **K-18 (B-65)** Fünf neue Einträge mit Detailseite und Sitemap: Sende-Prüfer, Workflow Calculate, Bedarfsanalyse, Kim-sync, BookLedger Basic.
19. **K-19 (B-66)** Installieren-Knopf in der Kopfleiste, ohne Sprung der Leiste, verschwindet, sobald die Seite als App läuft.

## 5. Schnittstellen zu anderen Programmen
- Schwester-Seite (Marktplatz mit Messstation, B-36): Messreihe nächtlich lesen, Abgleich der Werte.
- Gemeinsamer Einreich- und Freigabe-Server (B-38): Einsendungen, Warteschlange, Veröffentlichen ins Repo.
- Repo der Seite: Ziel der Veröffentlichung; Arbeitsabläufe bauen statische Teile.
- SBKIM-Netz / Sage-Kanon: Module byte-gleich, Siegel, Lampen, Sperrliste.
- „Eigene Programme: gemeinsame Suche“ (Rahmen) – welche Programme, siehe 8.

## 6. Ausdrücklich nicht
- N-01 / B-30 / B-44: keine Preise, keine Provision, kein Bezahlvorgang (Stufe 1).
- N-02: keine geschönten Messwerte.
- B-45: kein eigener Bezahlvorgang, keine automatische Auszahlung, kein Kopierschutz.
- Kein Konto, keine Anmeldung für Besucher; kein Zähldienst; keine Uploads aus dem Prüfer; nie „virenfrei“; keine Sterne/Preise im Strukturdaten-Block; kein Repo-Schlüssel im Browser.

## 7. Abnahme
Jede Zeile aus 4 einzeln vorführen; dazu die Bedarfe ohne Baustein (B-21–B-30, B-51–B-54, B-60–B-62, B-67, B-68):
- Seite ohne JavaScript zeigt alle Karten; installiert und offline startbar.
- Eintrag ohne Messung zeigt „noch nicht gemessen“.
- Reihenfolge = Anfangsdatum.
- Gesperrter Eintrag: Grund sichtbar, Link aus, nicht Fund der Woche, auch in Wartung sichtbar; Lösen nur in der Datei.
- Einsendung erscheint erst nach Freigabe; im Browser liegt kein Repo-Schlüssel.
- Prüfer sendet nichts ins Netz (bei Adresse nur den Abruf); `.mhtml` nennt den geprüften Teil; Text- und Parser-Lesung weichen ab → Befund.
- Kopierter Befund enthält keinen Fundwert.
- Modul-Prüfwert schlägt bei veränderter Kopie an.
- Antwort mit KI-Anweisung wird ausgeschlossen.
- Kein Preis, keine Provision irgendwo.
Sterne-Stand zur Abnahme liegt vor (B-14, B-16, B-17, B-46, B-56, B-57). Gesamt geschätzt 421,8–751,5 h (inkl. Anpassung, 15 % Abstimmung, 20 % Puffer).

## 8. Offene Fragen und Widersprüche im Auftrag
1. **O-01** Ab wann wird ein Preis gezeigt? Frist 2026-09-30 liegt **vor** dem Fassungsdatum 2026-10-01 – beantwortet oder überfällig?
2. **O-02** Bekommt der Prüfer einen Senden-Knopf? (bis 2026-10-31) – berührt B-51 „nichts hochladen“.
3. **O-03** Wann kommt Stufe 2? (bis 2027-01-31)
4. „KI: nur auf dem Gerät“ vs. K-08 mit Faktor KI ×1,25 und „KI-Richter“ (K-16): Läuft ein KI-Richter auf dem Gerät, und welches Modell?
5. „Daten liegen: eigener Server“ vs. statisch eingebackene Liste im Repo und „gemeinsamer Server“: Wem gehört der Server, wo liegt die Wahrheit der Einträge?
6. Schwester-Seite, Messreihe (Format, Adresse), Server-Schnittstelle und Repo-Ziel sind nicht beschrieben.
7. „Herkunft vom Browser bezeugt“: welcher Mechanismus (Origin-Kopf?) ist gemeint?
8. Sicherung: leer im Rahmen – keine Sicherung der Einträge/Ampel nötig?
9. „Eigene Programme: gemeinsame Suche“ – welche Programme, welche Suche?
10. „Fund der Woche“ (B-28) wird vorausgesetzt, aber kein Baustein beschreibt ihn.
11. Ampel: welche Stufen, wer setzt sie (nur Hand, oder automatisch aus Messungen?) – B-56 deutet automatische Warnungen an.
12. „Bürgen“ (K-17): wer bürgt, was bewirkt ein Bürge? Faktor „mehrere Nutzer“ ohne Nutzerverwaltung.
13. Rechenaufwand und Sperrliste (K-16): wer signiert die Sperrliste?
14. K-07 „groß“ mit nur 6–9,6 h (70 % Vorlage) – passt die Schätzung?
15. K-18 „klein“ ×5 mit 48–72 h – hoch für fünf Einträge.
16. B-01 „nichts“, B-04 „Kundenkontakt“, B-34 „Geräte“, B-43 „Vorgaben“: Platzhalter ohne Inhalt.
17. Stufe-1/Gewerbe (B-44) betrifft den Betrieb, nicht den Bau – nur Hinweis.
18. Sprachen: wird die KI-Schulung zweisprachig? Detailseiten zweisprachig?
