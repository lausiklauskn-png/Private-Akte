# Bauplan · Selbst-Check vor der Qualitätsprüfung (Vorgang V-2026-0001, Fassung 1, Kunde ⟦KUNDE-1⟧)

## 1. In einem Satz
Eine offline-fähige App für einen ambulanten Pflegedienst (Qualitätsbeauftragte führt durch, Pflegedienstleitung schaut drauf), mit der er sich alle drei Monate selbst so prüft wie die Prüfer – Stichprobe nur mit Klientennummern, Bewertung je Qualitätsbereich, daraus Maßnahmen, Vergleich über die Quartale je Team und eine Bereitlege-Liste für die zwei Tage vor der angekündigten Prüfung.

## 2. Plattformen und Technik-Grundentscheidungen
- Geräte: Tablet und Windows-PC im Büro (B-37). Vorschlag: eine installierbare Web-App (PWA), auf dem PC zusätzlich als Windows-Hülle möglich; Tablet-Betriebssystem ist nicht genannt (siehe Fragen).
- Offline zuerst: alle Arbeitsschritte (Durchlauf, Maßnahmen, Liste) laufen ohne Netz (B-38, Rahmen „reicht unterwegs“, Faktor Offline bei K-01/03/04/06).
- Daten verschlüsselt auf dem Gerät; ein eigener Server nur für Fragenkatalog-Aktualisierungen (K-02, Faktor Server), Freischaltung (K-07) und ggf. Abgleich (K-06).
- Kein Anschluss an das Pflegeprogramm (B-39, B-41), kein Import von Klientendaten.
- Druck/PDF für Durchlauf-Ergebnis und Bereitlege-Liste (Faktor Druck bei K-01, K-05).
- Wiederverwendung laut Auftrag: Maßnahmenliste nach Vorlage Mein WorkFloh (50 %), Bereitlege-Liste nach Vorlage Küchenzettel (60 %), Ablage/Sicherung nach Pro-Tresor (Workflow PDF Pro) und Vollsicherung der Familienakte (50 %).

## 3. Bereiche / Seiten
1. Start: Stand auf einen Blick (letzter Durchlauf, offene/überfällige Maßnahmen, nächster fälliger Durchlauf).
2. Probeprüfung (Durchläufe: neu, fortsetzen, abgeschlossen).
3. Ergebnis eines Durchlaufs (Bewertung je Qualitätsbereich, Druck/PDF).
4. Maßnahmen.
5. Verlauf / Quartalsvergleich (je Bereich, je Team).
6. Bereitlege-Liste.
7. Fragenkatalog (Stand, Aktualisierung einspielen).
8. Einstellungen: Teams (nur Namen der Teams/Rollen), Geräte-Abgleich, Sicherung, Abo/Freischaltung.

## 4. Funktionen
1. K-01 Durchlauf anlegen: Datum, Fragenstand wird festgehalten, Teams wählen.
2. K-01 Klienten-Stichprobe: Klientennummern eingeben oder aus einer eingegebenen Nummernliste zufällig ziehen lassen; Freitextfelder prüfen auf Namen/Diagnosen nicht vorgesehen – nur Nummer und Team (B-42, N-02).
3. K-01 Prüffragen je Qualitätsbereich und je Klientennummer durchgehen; Antwort nach dem Bewertungsschema der Prüfer; Zwischenstand jederzeit gespeichert, Fortsetzen auf anderem Gerät nach Abgleich.
4. K-01 Bewertung je Prüfbereich am Ende anzeigen (B-28), mit Hinweis „Selbsteinschätzung, kein Prüfergebnis“ (N-03); als PDF/Druck.
5. K-02 Fragenkatalog als versionierte Datei (Kennung, Stand der Prüfregeln, Datum); Aktualisierung vom eigenen Server holen oder als Datei einspielen; alte Durchläufe behalten ihren Fragenstand (B-33).
6. K-02 Anzeige, welcher Fragenstand gilt und ob ein neuerer bereitsteht.
7. K-03 Aus jeder schwachen Bewertung eine Maßnahme vorschlagen; der Kunde bestätigt (Rahmen: B-19 vorschlagen/bestätigen). Felder: Maßnahme, zuständig (Rolle oder Team, keine Person), Termin, Stand (offen/in Arbeit/erledigt).
8. K-03 Überfällige Maßnahmen hervorgehoben; Filter nach Stand, Team, Bereich.
9. K-04 Durchläufe speichern und je Bereich mit früheren vergleichen (B-30); Verlauf über die Quartale (B-21, B-26).
10. K-04 Zusammenfassung je Team, nie je Person; keine Rangliste einzelner Mitarbeitender (B-32, B-45, N-04). Mindestgröße einer Teamauswertung prüfen (siehe Fragen).
11. K-04 Erinnerung, wenn der Drei-Monats-Rhythmus fällig ist (B-35) – als Vorschlag (B-21).
12. K-05 Bereitlege-Liste: feste Punkte plus aus offenen Maßnahmen; abhakbar, druckbar; Start mit einem Tipp „Prüfung angekündigt“ (B-31, B-47).
13. K-06 Verschlüsselte Ablage aller Durchläufe, Maßnahmen, Termine (B-43) auf dem Gerät.
14. K-06 Automatische verschlüsselte Sicherung ohne Zutun (Rahmen).
15. K-06 Abgleich Tablet ↔ Büro-PC; Konflikte (gleicher Durchlauf auf beiden Geräten geändert) werden angezeigt, nie still überschrieben.
16. K-07 Monatliches Abo mit Freischaltung, inklusive Fragen-Aktualisierungen; bei abgelaufener Freischaltung bleiben Daten lesbar und exportierbar.

## 5. Datenhaltung, Sicherung, Datenschutz
- Gespeichert: Klientennummern, Teams/Rollen, Antworten, Bewertungen, Maßnahmen, Termine, Fragenkatalog-Stände.
- Nie gespeichert: Klientennamen, Diagnosen, Bewertungen einzelner Mitarbeitender (B-44, B-45, N-02, N-04).
- Verschlüsselt auf dem Gerät mit Passwort; Sicherung verschlüsselt und automatisch (Ziel: Ordner/Laufwerk oder eigener Server – offen).
- Der Server sieht, falls er für Abgleich/Sicherung genutzt wird, nur verschlüsselte Pakete.
- Zuordnung Nummer → Klient bleibt im Pflegeprogramm, nicht in der App.

## 6. Schnittstellen / Zusammenspiel
- Eigener Server: Fragenkatalog-Aktualisierung (K-02), Freischaltung Abo (K-07), ggf. Geräte-Abgleich und Sicherung (K-06).
- Datei-Wege: Katalog als Datei einspielen; Ergebnis und Bereitlege-Liste als PDF/Druck.
- Keine Schnittstelle zum Pflegeprogramm, keine zu Excel-Checklisten (Übernahme alter Listen nicht beauftragt).

## 7. Ausdrücklich nicht gebaut
- N-01 keine zweite Pflegedokumentation · N-02 keine Klientennamen/Diagnosen · N-03 kein Versprechen, die Prüfung zu bestehen · N-04 keine Bewertung/Rangliste Einzelner · N-05 kein Ersatz für das Pflegeprogramm.
- Kein Import aus Pflegeprogramm oder Excel; kein Schreiben der Prüffragen-Inhalte durch uns ohne Klärung (O-01).

## 8. Reihenfolge der Bauschritte
1. Datenmodell und verschlüsselte lokale Ablage (K-06 Kern), Teams/Rollen.
2. Fragenkatalog-Format mit Version und Stand (K-02), ein Beispielkatalog mit erfundenen Fragen.
3. Probeprüfung mit Stichprobe und Bewertung je Bereich (K-01), Druck/PDF.
4. Maßnahmenliste aus den Bewertungen (K-03).
5. Bereitlege-Liste (K-05).
6. Verlauf und Quartalsvergleich je Bereich/Team (K-04).
7. Automatische Sicherung und Abgleich Tablet ↔ PC (K-06 Rest).
8. Server: Katalog-Aktualisierung (K-02 Rest), Abo/Freischaltung (K-07).
9. Kurze Einweisung (B-36), Abnahme mit dem Kunden.
Stundenrahmen laut Auftrag: F1 215,4–409,4 h (inkl. Anpassung, Abstimmung, Puffer).

## 9. Abnahmekriterien
- B-27: Probeprüfung mit Auswahl von Klienten (nur Nummern) anhand der aktuellen Prüffragen durchführbar; ein Name im Nummernfeld wird nicht angenommen.
- B-28: Am Ende Bewertung je Prüfbereich sichtbar und druckbar.
- B-29: Aus der Bewertung entstehen Maßnahmen mit Zuständigkeit (Rolle/Team) und Termin; Stand sichtbar, Überfälliges hervorgehoben.
- B-30: Durchläufe gespeichert und mit früheren je Bereich verglichen.
- B-31: Kurze Bereitlege-Liste für die zwei Tage vor der Prüfung, abhakbar und druckbar.
- B-32: Ergebnisse nur je Team zusammengefasst, nirgends je Person.
- B-33: Neue Katalogfassung lässt sich einspielen; ein alter Durchlauf zeigt danach weiter seinen alten Fragenstand.
- K-06 (ohne Abnahmesatz im Auftrag, vorgeschlagen): alles läuft ohne WLAN im Besprechungsraum; Daten verschlüsselt; Sicherung entsteht ohne Zutun; Abgleich Tablet ↔ PC ohne Datenverlust.
- K-07 (ohne Abnahmesatz, vorgeschlagen): Freischaltung wirkt; Ablauf sperrt keine vorhandenen Daten.

## 10. Offene Fragen und Unklarheiten
- O-01: Wer zieht die Fragen nach, wenn sich die Regeln ändern, und wie oft? (Bestimmt Aufwand und Betrieb von K-02.)
- O-02: Monatlicher Preis statt Einmalpreis? (K-07 ist trotzdem beauftragt; Budget 60–100 €/Monat, B-46.)
- Woher kommen Fragen und Bewertungsschema der Prüfer inhaltlich? Darf der Katalog sie wörtlich enthalten (Rechte, Quelle)? Ohne Inhalt ist K-01 nur ein leerer Rahmen.
- Widerspruch „Daten liegen: nur auf dem Gerät“ und „eigener Server“: Was genau darf auf den Server – nur Katalog/Freischaltung, oder auch verschlüsselte Sicherung und Abgleich?
- Wie soll der Abgleich Tablet ↔ PC laufen (Server, lokales Netz, Datei)? Bei schlechtem WLAN nur nachträglich.
- Freischaltung (K-07) braucht gelegentlich Netz – wie lange darf die App offline laufen, bevor sie nachfragt?
- Welches Tablet-Betriebssystem (Android, iPad, Windows)?
- Wie viele Klienten je Stichprobe, wer zieht sie (App zufällig oder Mensch)?
- Teams: wie viele, wie klein darf ein Team sein, damit eine Teamauswertung niemanden einzeln erkennbar macht (25 Mitarbeitende, B-09)?
- Inhalt der Bereitlege-Liste: feste Vorlage vom Kunden oder von uns vorgeschlagen?
- Maßnahmen-Vorschlag: nach welcher Regel wird aus einer Bewertung ein Vorschlag (ab welcher Note)?
- Nutzerrechte: Darf die Pflegedienstleitung nur lesen (B-34)? Eigene Anmeldung je Rolle gewünscht?
- B-20 und B-22/B-23 haben „handeln: egal“ – bestätigt oder automatisch?
- Euro-Beträge sind im Auftrag weggelassen (euro: nein); Preisfragen gehen an den Auftraggeber.
- NOCH NICHT GESCHÄTZT: keine Zeile im Auftrag so markiert.
