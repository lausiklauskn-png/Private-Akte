# Bauplan · V-2026-0001 · Fassung 3

Kunde: ⟦KUNDE-1⟧ · Fassungsdatum 2026-09-08 · Anlass: Besucher aus dem Ausland, mehr Schutz im Netz, sichtbarer Weg zum Installieren.
Laut Auftrag gibt es keine frühere Fassung: alle Zeilen K-01 bis K-11 sind NEU BAUEN. UNVERÄNDERT- oder ENTFERNEN-Zeilen gibt es nicht.

## 1. Zweck und Nutzer
- Firmen-Website für einen Werbetechnik-Betrieb, die als **Vorlage** für weitere Betriebe taugt (B-10, B-12). Sie löst eine alte Seite mit festen Firmendaten, Fotos, Instagram und Google Maps ab (B-02, B-27).
- Zweck: Werbung und Anfrage (B-03, B-04). Ein Besucher findet am Handy in Sekunden Leistungen und Kontakt. Die Vorlage lässt sich in einer Stunde für einen neuen Betrieb anpassen (B-17).
- Nutzer: der Inhaber ohne Technikwissen (B-05, B-24) und 2 Mitarbeiter in Werkstatt und Montage, die Bilder pflegen (B-06). Kunden und Interessenten sind Besucher, keine Nutzer (B-07). Sie kommen auf Handy, Tablet und PC (B-24).
- Probleme der alten Seite: Sie lädt langsam und wirkt am Handy veraltet (B-08). Fremde Einbettungen geben Besucherdaten weiter (B-09).

## 2. Plattformen, Datenort, Sicherung, Netz
- Gerät: Browser (Rahmen, B-25). Sie ist als Web-App installierbar (B-13, B-21).
- Ohne Internet: Unterwegs reicht es. Nach dem ersten Besuch ist alles offline lesbar, über Service Worker und Manifest (B-21, B-26).
- Daten liegen nur auf dem Gerät. Eigene Bilder werden nur im Browser des Geräts gespeichert (B-20). Abgleich zwischen Geräten: keiner.
- Sicherung: Der Auftrag nennt keine (siehe 8).
- Netz: Die Seite ist ein Endknoten im Netz der eigenen Apps (SBKIM, Mycel) über Relais (B-34, B-40). Beim Laden geht nichts ins Netz (B-38). Sie hat eine eigene Ablage (B-38).
- KI: keine.
- Sprache: Die Oberfläche ist deutsch. Netz-Bausteine (Netz-Fenster, Siegel) sind deutsch und englisch (B-41, B-46).
- Vorgaben: Kein Zähldienst, keine Fremd-Karte und kein Fremd-Instagram (B-31). Keine externen Bibliotheken aus fremden Quellen, alles wird mitgeliefert (B-32).

## 3. Bereiche/Seiten
1. Eine selbst-enthaltende Seite mit sechs Bereichen (B-11, B-18):
   - Start
   - Leistungen
   - Anlagen (Info zu Anlagen)
   - Fragen und Antworten
   - Team
   - Kontakt
2. Erklärseite(n) zu Netz, Siegel und Schutz in einfachen Worten (K-10, B-43).
3. Lizenz- und Rechte-Erklärung (K-08, B-36). Ob das eine eigene Seite oder ein Abschnitt ist, sagt der Auftrag nicht.
4. Netz-Fenster und Siegel-Fenster mit Andock-Assistent als eingeblendete Bedienteile (K-06, K-07).

## 4. Funktionen (prüfbar)
1. **K-01** Sechs Bereiche wie in Abschnitt 3. Jede Firmen-, Personen- und Kontaktangabe ist ein erkennbarer Platzhalter (B-12, B-23, B-29, N-01).
2. **K-01** Themen Hell, Dunkel und Kontrast zum Umschalten. Die Wahl wird gemerkt (B-15, B-22).
3. **K-02** Installierbare Web-App: Manifest und Service Worker mit Offline-Vorrat. Nach dem ersten Besuch ist alles ohne Netz lesbar (B-13, B-21). Faktor Offline ×1,15.
4. **K-02** Aufgeräumt werden nur die eigenen Offline-Vorräte, nie die anderer Apps auf derselben Adresse (B-48).
5. **K-03** Auf jede Bildfläche kann man ein eigenes Bild ziehen oder es über ein Kamera-Symbol wählen. Das Bild wird lokal im Browser gespeichert und übersteht ein Neuladen (B-14, B-20).
6. **K-01/K-03** Ausgeliefert wird die Seite ohne Bilder. Fehlende Fotos ersetzt ein neutraler Platzhalter (B-19).
7. **K-04** Glas-Knöpfe und ein animierter Partikel-Hintergrund (B-16, Kann).
8. **K-05** Der animierte Hintergrund startet erst nach dem Laden, damit der erste Aufbau nicht wartet (B-37, B-33).
9. **K-05** Lesbarer Kontrast am Handy. Dazu kommen „Schutzstufen“; was das ist, sagt der Auftrag nicht (siehe 8).
10. **K-06** Netz-Endknoten mit Netz-Fenster, eingebbarem Gerätenamen und eigener Ablage. Beim Laden geht keine Anfrage ins Netz (B-34, B-38, B-40).
11. **K-07** Siegel, das den Betreiber zeigt. Es hat einen Andock-Assistenten. Die eigene Kennung (Spore) wird unterschrieben veröffentlicht und ist im Siegel prüfbar (B-35, B-39).
12. **K-08** Lizenz und Rechte der Vorlage sind klar benannt (B-36).
13. **K-09** Netz-Bausteine nachgezogen: englische Texte, Sperrliste, Bürgen, Rechenaufwand je Zettel, aktuell gehalten (B-41, B-42). Faktor Mehrsprachig ×1,2.
14. **K-09 / B-47** Netz-Bausteine werden unverändert aus der gemeinsamen Quelle übernommen und per Prüfsumme bewacht. Eine Abweichung fällt in einer Prüfung auf.
15. **K-10** Erklärseiten zu Netz, Siegel und Schutz, die den Nutzen für den Besucher erklären (B-43, Kann).
16. **K-11** Ein fester Installieren-Knopf oben. Er verschwindet, wenn die Seite als App läuft (B-44).
17. **K-11** Die Seite sagt selbst, dass sie eine Vorlage ist (B-45).

## 5. Schnittstellen zu anderen Programmen
- Netz der eigenen Apps (SBKIM, Mycel) über Relais (B-40). Die Seite ist dort Endknoten (K-06), veröffentlicht ihre Spore (K-07) und nutzt die Netz-Bausteine aus einer „gemeinsamen Quelle“ (B-47).
- Vorlagen für die Wiederverwendung: Mein-Rezeptbuch-Page und Workfloh-PDF-Page (K-01, K-02, K-05, K-10, K-11, je 50 %). K-06, K-07 und K-09 sind zu 80 % wiederverwendet, ohne genannte Vorlage.
- Keine Fremddienste: keine Karte, kein Instagram, kein Zähldienst (B-31).

## 6. Ausdrücklich nicht
- N-01: keine echten Firmendaten in der Vorlage (auch B-23, B-29).
- Keine KI.
- Kein Abgleich zwischen Geräten.
- Kein Zähldienst, keine Fremd-Karte, kein Fremd-Instagram (B-31).
- Keine Bibliotheken aus fremden Quellen (B-32).
- Beim Laden nichts ins Netz senden (B-38).
- Fremde Offline-Vorräte nicht löschen (B-48).

## 7. Abnahme
- Je Baustein K-01 bis K-11 die Punkte aus Abschnitt 4 mit den gedeckten B-Kennungen.
- Auch ohne eigenen Baustein abzunehmen: B-18, B-19, B-20, B-21, B-22, B-23, B-37, B-38, B-39, B-47, B-48. Jedes ist einer Funktion in Abschnitt 4 zugeordnet.
- Ziel-Prüfung B-17: Ein Besucher findet am Handy schnell Leistungen und Kontakt. Ein neuer Betrieb lässt sich in einer Stunde anpassen; die Summe nennt „Anpassung an den Betrieb 2–6 h“, siehe 8.
- Prüfbar: offline nach dem ersten Besuch, Thema gemerkt, Bild nach dem Neuladen noch da, kein Netzverkehr beim Laden, Knopf weg im App-Modus, Prüfsummen-Wächter schlägt bei Änderung an, Platzhalter überall erkennbar.
- Geschätzt sind 79,1–151,5 h (Fassung 3), einschließlich Abstimmung 15 % und Puffer 20 %. Euro sind nicht genannt („euro: nein“, also weggelassen).

## 8. Offene Fragen und Widersprüche im Auftrag
1. **O-01** (offen, ⟦KUNDE-2⟧, „bis 2026-07-15“): Welche Leistungen und Projekte sollen als Muster dastehen? Diese Frist liegt vor dem Fassungsdatum 2026-09-08. Ist die Frage beantwortet?
2. **Fassung 3 ohne Vorgänger:** Der Kopf sagt `vorher: -`, „keine frühere Fassung“ und „alles neu“. Der Anlass (mehr Schutz, Englisch, Installieren-Knopf) und Wörter wie „nachgezogen“ (K-09) deuten aber auf einen bestehenden Stand. Wird neu gebaut oder ein Bestand ergänzt?
3. **Fachbegriffe ohne Erklärung:** SBKIM, Mycel, Relais, Spore, Siegel, Andock-Assistent, Bürgen, Sperrliste, „Rechenaufwand/Aufwand je Zettel“. Der Auftrag beschreibt Verhalten und Format nicht. Wer K-06, K-07 und K-09 baut, braucht die „gemeinsame Quelle“. Diese Quelle ist **nicht genannt** (K-06, K-07 und K-09: „Vorlage –“, B-47). Damit ist die größte Lücke offen.
4. **Widersprüche im Datenort und Netz:**
   - „Daten liegen nur auf dem Gerät“ und „ohne Internet reicht unterwegs“ stehen gegen die Netz-Knotenrolle über Relais und gegen eine **veröffentlichte** Spore. Wo und wie wird veröffentlicht?
   - Was liegt in der „eigenen Ablage“ (B-38)?
5. **K-05 „Schutzstufen“:** Es ist unklar, ob das Kontraststufen oder ein Netzschutz sind.
6. **Kontakt und Anfrage (B-04):** Gibt es ein Kontaktformular, und wohin geht es, wenn kein Netz und kein Fremddienst gilt? Wie wird der Standort ohne Karte gezeigt?
7. **Bilder:**
   - Wie werden sie gespeichert, und wie groß dürfen sie sein?
   - Sehen nur die Mitarbeiter auf ihrem eigenen Gerät die Bilder, oder auch Besucher? Weil die Daten nur auf dem Gerät liegen, sähen Besucher die Werkstattfotos nicht. Das widerspricht dem Zweck von B-14.
8. **Lizenz (K-08):** Welche Lizenz und welche Rechteinhaber? Ein Platzhalter oder ein echter Name?
9. **Sicherung:** Es gibt keine. Lokal gespeicherte Bilder gehen bei einem Browser-Reset verloren. Gewollt?
10. **Installieren-Knopf:** Ist er im Browser immer sichtbar, auch ohne Install-Angebot des Browsers? Was zeigt ein Tipp dann?
11. **Englisch:** Nur Netz-Fenster und Siegel sind englisch. Der Anlass nennt aber „Besucher aus dem Ausland“. Soll der Seiteninhalt einsprachig deutsch bleiben?
12. **Schätzungen auffällig:** K-03, K-04 und K-08 sind „klein“ mit je 10–20 h, also mehr als K-01 „mittel“ mit 6–10 h. Nachrechnen ließ sich die Summe nicht.
13. **Muster-Inhalte:** Welche konkreten Leistungen, Anlagen, Fragen und Teamrollen gibt es als Platzhalter? Das hängt an O-01.
14. **Sterne bei der Abnahme** (B-11, B-13, B-14, B-33, B-44) sind schon eingetragen, obwohl der Auftrag „alles neu zu bauen“ sagt.
