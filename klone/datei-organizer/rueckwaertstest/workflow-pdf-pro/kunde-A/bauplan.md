# Bauplan zu Bauauftrag V-2026-0001 · Fassung 1 (Kunde ⟦KUNDE-1⟧)

## 1. Zweck und Nutzer
Eine App, mit der eine allein arbeitende Inhaberin PDF-Formulare für Nachbarn und Vereine direkt am Gerät ausfüllt und Briefe per Handyfoto zu sauberen A4-Scan-PDFs macht (B-06, B-07, B-19, B-21).
Alles bleibt verschlüsselt auf ihrem eigenen Gerät, geordnet je Kunde, ohne Konto und ohne Cloud (B-22, B-28, B-43, B-60).

## 2. Plattformen und Laufzeit
- Native App für Android-Handy und Windows-10-PC (K-05, B-25, B-44, B-45).
- Vollständig offline, keine Cloud (B-46, B-60); Faktor „offline“ an allen Bausteinen.
- Kein Konto, keine Anmeldung (B-43, B-62); einziger Schutz ist das Ablage-Passwort (B-22, B-61).
- Speicherort frei wählbar (B-47).

## 3. Bereiche der Oberfläche (Annahme zur Gliederung)
1. Start / Entsperren (Passwort, Ablage-Ordner wählen)
2. Kunden-Ordner (Liste, anlegen, darin Unterlagen)
3. Formular-Werkstatt (PDF öffnen, ausfüllen, Felder bearbeiten, ausgeben)
4. Scanner (Fotos/Ordner aufnehmen, Ecken prüfen, PDF erzeugen)
5. Vorlagen (leere Formulare, kopieren)
6. Sicherung (Sicherungsdatei erstellen / wiederherstellen)

## 4. Funktionen (prüfbar)
1. PDF-Formular öffnen; Ausfüllstellen werden ohne Einrichtung automatisch erkannt (K-01, B-19, B-29).
2. Schon eingetragene Angaben bleiben beim Öffnen und Speichern erhalten (B-30).
3. Fehlende Ausfüllstellen hinzufügen, falsch sitzende verschieben (B-31).
4. Ausgabe „fest“: PDF, das niemand mehr ändern kann (B-32).
5. Ausgabe „ausfüllbar“: PDF, das andere weiter ausfüllen können (B-33).
6. Ausgabe „leere Vorlage“ zum Wiederverwenden (B-34).
7. Drucken aus der App (B-35).
8. Handyfoto: Ecken erkennen, gerade rücken, Tischkante weg, A4-Scan-Aussehen (K-02, B-36, B-13).
9. Aus einem oder mehreren Bildern ein PDF erzeugen (B-37).
10. Viele Bilder und ganze Ordner auf einmal aufnehmen (B-38).
11. Ablage in selbst gewähltem Ordner, mit Passwort verschlüsselt (K-03, B-22, B-47).
12. Ordner je Kunde anlegen (B-39).
13. Vorlagen kopieren (B-40).
14. Sicherungsdatei erstellen (K-04, B-41).
15. Wiederherstellen zusammenführend: Fehlendes kommt zurück, Neueres wird nie überschrieben (B-24, B-41).
16. Teilen eines Ergebnis-PDFs an andere Apps des Geräts (K-05 „Teilen“) – darüber Weg zum E-Mail-Programm (Annahme, s. 9/10).

## 5. Datenhaltung und Sicherheit
- Alle Unterlagen (Formulare, Scans, Vorlagen) nur im gewählten Ordner auf dem Gerät (B-22, B-47, B-56, B-57).
- Verschlüsselt mit einem Passwort (B-61); Passwort wird nicht im Klartext gespeichert (Annahme).
- Personenbezogene Daten fremder Leute (B-59): nichts verlässt das Gerät ohne ausdrückliche Handlung (Teilen/Drucken).
- Sicherungsdatei ebenfalls verschlüsselt (Annahme; B-61 nennt „mit Passwort verschlüsselt“ allgemein).
- Vergessenes Passwort = Daten nicht lesbar; das muss vorab gesagt werden (Annahme, kein Konto zum Zurücksetzen).

## 6. Schnittstellen
- Dateisystem des Geräts (Ordnerwahl, Ordner-Import für Bilder) – K-05 „Dateizugriff“.
- Kamera / Fotos des Handys (B-04, B-55).
- Drucker des Systems (B-51, B-53).
- Teilen-Funktion des Systems → E-Mail-Programm (B-50, B-52) – nur Übergabe, kein eigener Mailversand (Annahme).
- Keine Server, keine Cloud, keine Fremd-KI (B-46, B-60).

## 7. Bewusste Grenzen
- Kein eigener E-Mail-Versand: kein Baustein deckt B-03/B-52; nur Teilen.
- Keine Abstimmung zwischen Handy und PC: O-03 offen, kein Baustein dafür.
- Kein Konto, keine Cloud, kein Abo (B-43, B-60, B-63).
- Keine Anbindung des alten Flachbettscanners (B-49) – er soll entfallen (B-21).
- Kein Ersatz/Import der Browser-Formularseite (B-05, B-48) – nur abgelöst.
- Keine Texterkennung/Durchsuchbarkeit – nicht beauftragt.

## 8. Reihenfolge der Bauschritte
1. K-05 App-Hülle Android + Windows mit Dateizugriff (Grundlage für alles).
2. K-03 verschlüsselte Ablage, Ordnerwahl, Kunden-Ordner, Vorlagen kopieren.
3. K-01 Formular-Werkstatt (Muss-Kern: Erkennen, Erhalten, Ausgaben, Drucken).
4. K-02 Scanner aus Fotos, Stapel- und Ordner-Import.
5. K-04 Sicherung und zusammenführende Wiederherstellung.
6. Teilen-Weg, Einarbeitungstest „ein Nachmittag ohne Schulung“ (B-42, B-64).

## 9. Offene Fragen an den Kunden (⟦KUNDE-2⟧)
- O-01: Wie viele Formulare und Briefe pro Woche genau?
- O-02: Wie oft soll die Sicherungsdatei entstehen und wo liegt sie?
- O-03: Sollen Handy und PC dieselben Unterlagen sehen, und wie kommen sie hinüber?
- O-04: Zeitersparnis in Stunden pro Monat nicht beziffert.
- Reicht „Teilen an das E-Mail-Programm“, oder soll die App selbst verschicken (B-26 „verschicken“)?
- Budget bis 50 € einmalig (B-63) gegen 115–219 h Aufwand (Summe der Zeilen): wie passt das?
- Was passiert bei vergessenem Passwort – ist Datenverlust akzeptiert?
- Gilt das Passwort für die ganze Ablage oder je Kunde?

## 10. Unklar, widersprüchlich, doppelt
- Summe passt nicht: „Stunden F1 157,7–303,7“ (Abschnitt Summe), die Zeilen K-01..K-05 ergeben 114,8–219,0 h.
- Größe und Stunden widersprechen sich: K-01/K-02 „groß“ 9,1–15,2 h, K-03 „mittel“ 27,6–50,6 h, K-04 „klein“ 11,5–23 h; K-05 „groß“ 57,5–115 h.
- Budget B-63 „bis 50 € einmalig“ gegen 115–300 h Schätzung; Kopf `euro: nein`, daher kein Betrag zum Abgleich.
- Verschicken (B-03, B-26, B-52) ist Bedarf, aber von keinem K-Baustein gedeckt; ebenso B-28 nur indirekt.
- Faktor „druck“ an K-02 (Scanner, JSON `faktoren`), obwohl Drucken in K-01/B-35 steht.
- K-01 und K-02 tragen beide `katalog: "scan"`, obwohl K-01 Formularausfüllen ist.
- Doppelt: „Drucker“ B-51 (Bereich 11) und B-53 (Bereich 12); B-14 = B-17 (nur Browser); B-42 = B-64 (Einarbeitung); B-43 = B-62 (kein Konto); B-44/B-45 = B-65 (Geräte); B-22 enthält B-61 und B-47.
- B-20 (Bereich 6) bündelt B-32..B-35 erneut; B-21 bündelt B-36..B-38 – gleicher Bedarf zweifach gezählt.
- Kopf `repo: "Workflow-Needs"` passt nicht zum Vorhaben (Formular-/Scan-App); `datum: 2026-11-14` liegt nach heute (2026-11-13).
- O-01..O-04 stehen doppelt (Änderungen, Offene Punkte, Vollständiger Stand); O-04 ist keine Frage, sondern ein Befund.
- „Grenzlinie keine“ und alle Erklärungen/Vereinbarungen „aktiviert: nein“ – vor Baustart ohne Vereinbarung (Hinweis, kein Bauinhalt).
