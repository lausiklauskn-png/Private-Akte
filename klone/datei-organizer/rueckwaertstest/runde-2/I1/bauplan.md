# Bauplan · Vorgang V-2026-0001 · Fassung 1 · Kunde ⟦KUNDE-1⟧

## 1. In einem Satz
Eine Browser-App (Edge, installierbar als PWA) für eine Anwaltskanzlei mit vier Personen (Inhaberin, weitere Anwältin, Fachangestellte, Auszubildende), die Texte aus Akten vor dem Senden an ein beliebiges KI-Programm automatisch pseudonymisiert, zeigt, was hinausgeht, und die KI-Antwort danach wieder mit den echten Angaben zurückübersetzt – alles nur im Browser, ohne Zwischenserver und ohne Protokoll.

## 2. Plattformen und Technik-Grundentscheidungen
- Windows-PCs, Browser Edge; installiert als Edge-App (PWA, Installieren-Knopf, keine Admin-Rechte nötig).
- Nicht für das Handy gedacht (N-05); die Seite soll auf schmalen Bildschirmen keine Aktenarbeit anbieten (Hinweis statt Funktion).
- Reine Client-Anwendung: statische Dateien (HTML/JS/CSS) von einem statischen Hosting; kein Backend, kein eigener Server, der Texte sieht (N-01).
- Internet nötig für die KI selbst („Ohne Internet: nein“); die App selbst läuft nach der Installation auch offline (Service Worker), nur der KI-Schritt braucht Netz.
- Erkennung regelbasiert auf dem Gerät (Muster + Wortlisten + Mandantenliste), kein Sprachmodell zur Erkennung, nichts geht zur Erkennung hinaus.
- Kein Build-Zwang nötig; Ausdruck über Druckdialog („Als PDF speichern“).

## 3. Bereiche / Seiten
1. **Verdecken** (Startseite): Text einfügen → Vorschau „Das geht hinaus“ → Bestätigen → Kopieren bzw. Senden.
2. **Zurückübersetzen**: KI-Antwort einfügen → Text mit echten Angaben → Kopieren nach Word/Outlook.
3. **Mandantenliste**: Namen hinterlegen, importieren, löschen (verschlüsselt).
4. **KI-Anbieter**: Weg „Zwischenablage“ (Vorgabe) oder direkte Anbindung mit eigenem Schlüssel.
5. **Vorzeigeblatt**: Druckansicht für Kammer und Mandanten.
6. **Hilfe/Einweisung**: kurze Anleitung, Büro-Regel, Grenzen.

## 4. Funktionen
K-01 Pseudonymisieren (B-16, B-18, B-22, B-25, B-27 u. a.)
1. Textfeld zum Einfügen (auch lange Texte, Einfügen aus Word/Outlook als reiner Text).
2. Automatische Erkennung und Ersetzen durch nummerierte Platzhalter, je Art: Namen (Anrede, Vor-/Nachname, Mandantenliste), Adressen (Straße + Nr., PLZ + Ort), IBAN/Kontonummern, Beträge, Telefonnummern, Daten (Geburts-/Datumsangaben), E-Mail-Adressen, Aktenzeichen.
3. Gleiche Angabe → gleicher Platzhalter im ganzen Text (stabil innerhalb eines Vorgangs).
4. Vorschau „Das geht hinaus“: der fertige Text, Platzhalter farbig markiert; Liste der Ersetzungen (nur auf dem Bildschirm).
5. Vorschlag statt Automatik (B-16, B-18 „schlägt vor, der Kunde bestätigt“): jede Ersetzung abwählbar; Wörter von Hand markieren und zusätzlich verdecken (Antwort auf O-01, siehe Fragen).
6. Erst nach Klick „Bestätigen“ sind Kopieren/Senden freigegeben; vorher gesperrt.
7. Kopieren in die Zwischenablage (für jedes KI-Programm im Browser).
8. Kein Protokoll: keine Speicherung von Texten, Nutzern oder Zeitpunkten (N-02, B-42). Die Zuordnung Platzhalter ⟷ Klartext liegt nur im Arbeitsspeicher der geöffneten Sitzung (bzw. bis „Vorgang beenden“).
9. „Vorgang beenden/leeren“-Knopf löscht Text und Zuordnung sofort.

K-02 Mandantenliste (B-19, B-26, B-38)
10. Namen einzeln eintragen oder als Liste importieren (Textdatei/CSV, ein Name je Zeile).
11. Speicherung verschlüsselt im Browser (IndexedDB, Schlüssel aus Passwort/PIN des Arbeitsplatzes); ohne Entsperren keine Liste.
12. Treffer aus der Liste haben Vorrang vor Mustern; auch Teile (nur Nachname, Genitiv „Müllers“).
13. Je Arbeitsplatz getrennt; Export/Import als verschlüsselte Datei, um die Liste auf die anderen PCs zu bringen.

K-03 Rückübersetzung (B-17, B-28, B-24, B-04)
14. KI-Antwort einfügen; Platzhalter werden selbsttätig (B-17 „darf selbst handeln“) durch echte Angaben ersetzt.
15. Warnung bei Platzhaltern, die die KI verändert hat (z. B. Klammern weg, Nummer erfunden) oder die nicht zugeordnet werden können.
16. Ergebnis zum Kopieren (reiner Text, Absätze erhalten) nach Word/Outlook.

K-04 Anbieter frei wählbar (B-20, B-29)
17. Vorgabe: Weg über Zwischenablage – funktioniert mit jedem KI-Programm im Browser.
18. Optional: direkte Anbindung mit eigenem API-Schlüssel an mehrere Anbieter (Adapter je Anbieter), Aufruf direkt aus dem Browser, ohne Zwischenserver; nur nach Bestätigung (Schritt 6).
19. Schlüssel verschlüsselt im Browser, nie im Export der Mandantenliste.

K-05 Vorzeigeblatt (B-21, B-30, B-13, B-44)
20. Druckansicht (A4, „Als PDF speichern“): was verdeckt wird, wie der Ablauf ist, dass nichts gespeichert/protokolliert wird, wo die Grenzen liegen; ausdrücklich kein Versprechen vollständiger Sicherheit (N-04).

K-06 Einrichtung und Einweisung (B-31 – B-34)
21. Installieren-Knopf in der App; Anleitung für die Einrichtung auf vier PCs ohne Admin-Aufwand.
22. Kurze Einweisung (ca. eine Seite + Termin) und die Büro-Regel „KI nur über diesen Weg“ als Ausdruck.

## 5. Datenhaltung, Sicherung, Datenschutz
- Daten nur auf dem Gerät. Gespeichert dauerhaft: Mandantenliste (verschlüsselt), Einstellungen (Anbieter, ggf. Schlüssel verschlüsselt). Nicht gespeichert: eingefügte Texte, KI-Antworten, Zuordnungen nach Sitzungsende.
- Sicherung: nur die Mandantenliste als verschlüsselte Exportdatei (dient zugleich der Verteilung auf die anderen PCs).
- Kein Telemetrie, kein Analyse-Skript, keine externen Bibliotheken zur Laufzeit von fremden Servern (CSP streng).
- Hinweis: Hosting der App liefert nur Dateien aus; Texte erreichen es nie.
- Pseudonymisierung ist keine Anonymisierung; Grenzen (Kontextwissen, nicht erkannte Angaben) im Vorzeigeblatt und in der Hilfe benennen.

## 6. Schnittstellen / Zusammenspiel
- Zwischenablage (Einfügen aus Word/Outlook, Kopieren zur KI und zurück).
- Optional HTTPS-Aufrufe direkt an KI-Anbieter-APIs mit eigenem Schlüssel.
- Dateiimport (Mandantenliste), Druck/PDF.
- Keine Anbindung an Kanzleisoftware, kein Word-/Outlook-Add-in (nicht beauftragt).

## 7. Ausdrücklich nicht gebaut
- N-01 Kein Server dazwischen, der Texte mitliest oder speichert.
- N-02 Keine Protokollierung, wer was eingegeben hat.
- N-03 Keine Bindung an einen einzigen KI-Anbieter.
- N-04 Kein Versprechen hundertprozentiger Sicherheit.
- N-05 Keine Nutzung auf dem Handy für Akten.
- Außerdem (nicht im Auftrag): keine eigene KI, kein Abgleich der Mandantenliste zwischen PCs über Netz, keine Benutzerverwaltung.

## 8. Reihenfolge der Bauschritte
1. Grundgerüst PWA (Seiten, Service Worker, Installieren-Knopf, strenge CSP).
2. Erkennungskern K-01 (Muster je Art, stabile Platzhalter) mit Testtexten (erfunden).
3. Vorschau „Das geht hinaus“, Abwählen/Hinzufügen, Bestätigen-Sperre, Kopieren.
4. K-03 Rückübersetzung inkl. Warnung bei veränderten Platzhaltern.
5. K-02 Mandantenliste (Verschlüsselung, Import/Export, Vorrang).
6. K-04 Anbieter: Zwischenablage-Weg fertig; dann direkte Adapter (je Anbieter einzeln, CORS prüfen).
7. K-05 Vorzeigeblatt.
8. K-06 Einrichtung auf den vier PCs, Einweisung, Büro-Regel.
9. Abnahme mit dem Kunden.

## 9. Abnahmekriterien
- B-25: In einem Prüftext werden Namen, Adressen, Kontonummern/IBAN, Beträge und Telefonnummern durch Platzhalter ersetzt; kein Klartext davon in der Vorschau.
- B-27: Kopieren/Senden ist erst nach Bestätigung möglich; die Vorschau zeigt genau den Text, der hinausgeht.
- B-26: Ein Name aus der Mandantenliste, der keinem Muster entspricht, wird verdeckt.
- B-28: Eine KI-Antwort mit Platzhaltern wird korrekt mit den echten Angaben angezeigt; veränderte Platzhalter werden gemeldet.
- B-29: Der Ablauf funktioniert mit mindestens zwei (Wunsch: drei) verschiedenen KI-Programmen (Zwischenablage) bzw. Anbietern (direkt).
- B-30: Vorzeigeblatt druckbar/als PDF, nennt Grenzen und verspricht keine vollständige Sicherheit.
- N-01/N-02: Netzwerkmitschnitt zeigt keinen Text an andere Ziele als den gewählten KI-Anbieter; kein gespeicherter Verlauf nach „Vorgang beenden“.
- K-06: App auf allen vier PCs installiert, Einweisung erfolgt.

## 10. Offene Fragen und Unklarheiten
Offene Punkte aus dem Auftrag:
- O-01: Umgang mit nicht automatisch erkannten Angaben – reicht Markieren von Hand in der Vorschau, oder zusätzlich eigene Begriffsliste (Kinder, Arbeitgeber, Orte)?
- O-02: Laufende Kosten der KI-Anbieter – wer trägt sie, und passen sie mit in den Budget-Rahmen 40–60 €/Monat (B-43)?

Unklarheiten / Widersprüche:
- Stunden passen nicht zur Größe: K-01 „groß“ 7,5–12 h (wegen 70 % Vorlage), aber K-02/K-03/K-06 „klein“ je 10–20 h, K-05 „klein“ 11–22 h, K-04 „mittel“ 17,5–32,5 h – bitte prüfen, ob die Kleinen überschätzt oder K-01 unterschätzt ist (K-01 trägt die meiste Logik).
- Summe 91,8–178,9 h liegt weit über der Summe der Zeilen (66–126,5 h) – laut Text Zuschläge (Anpassung, Abstimmung, Puffer); keine Euro-Angaben im Auftrag (euro: nein), daher kein Preisabgleich mit dem Budget möglich.
- B-16/B-18 „schlägt vor, Kunde bestätigt“ vs. „automatisch unkenntlich machen“: geplant ist automatischer Vorschlag mit Bestätigung – bitte bestätigen.
- B-17 „darf selbst handeln“: Rückübersetzung läuft ohne Rückfrage – auch wenn Platzhalter verändert sind (dann nur Warnung)?
- „Kein Protokoll“ vs. Rückübersetzung: Die Zuordnung muss bis zur Antwort im Speicher bleiben. Was, wenn das Fenster geschlossen wird – Zuordnung verloren (sicherer) oder kurz verschlüsselt behalten?
- Mandantenliste „je Arbeitsplatz“: Pflege auf vier PCs getrennt oder per Exportdatei verteilen? Wer pflegt sie, wie oft?
- Passwort für die Verschlüsselung der Mandantenliste: eines je PC oder gemeinsames Kanzleipasswort? Was bei vergessenem Passwort?
- Direkte Anbindung: Welche Anbieter konkret (EU-Anbieter bevorzugt?) Manche Anbieter erlauben keine Aufrufe direkt aus dem Browser (CORS) – dann nur Zwischenablage-Weg ohne Zwischenserver.
- Wo wird die App gehostet (statisches Hosting des Auftragnehmers, eigener Webspace der Kanzlei, lokale Datei)? Auch ein statisches Hosting ist ein „Server“ – er sieht aber keine Texte; mit dem Kunden klären.
- N-05 „nicht auf dem Handy für Akten“: nur Hinweis, oder soll die App auf Handys aktiv sperren? Das Problem B-02 (Azubi am eigenen Handy) löst die App technisch nicht – nur die Büro-Regel (B-32).
- Daten: sollen alle Datumsangaben verdeckt werden (verändert Fristen-Inhalte für die KI) oder nur Geburtsdaten?
- Gehälter/Kinder (B-37) sind im Muster-Katalog von B-25 nicht genannt: Beträge decken Gehälter ab; Kindernamen nur über Namenserkennung – genügt das?
- Vorzeigeblatt: Wer verantwortet den Wortlaut gegenüber der Kammer (rechtliche Prüfung durch die Inhaberin)?
