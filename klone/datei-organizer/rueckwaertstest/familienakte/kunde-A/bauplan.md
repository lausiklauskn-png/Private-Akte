# Bauplan · Vorgang V-2026-0001 · Fassung 1 · Kunde ⟦KUNDE-1⟧

## 1. Zweck und Nutzer
Eine Familien-App, mit der Post fotografiert, als Vorschlag nach Person und Thema abgelegt, nach Fristen durchsucht und über eine Tagesansicht „heute fällig“ im Blick behalten wird; Antworten entstehen mit KI-Hilfe, ohne dass Namen und Diagnosen nach draußen gehen.
Hauptnutzerin ist die Person, die sich um alles kümmert (B-11); betroffen sind Mutter (79), Ehemann und zwei Kinder (B-12–B-14), mit Schwerpunkt auf Gesundheitsdaten der Mutter (B-67).

## 2. Plattformen und Laufzeit
- Android-Handy (B-50) für Aufnahme mit Kamera (B-55), Windows-PC (B-51); gelegentlich Tablet der Tochter (B-52, Rolle offen → Frage 6).
- Offline-first: Aufnahme, Texterkennung, Fristen, Liste, Suche laufen ohne Netz (Faktor „offline“ an K-01–K-06).
- Online nur für den KI-Antwortentwurf (K-05), nur auf Tipp und nur mit verdecktem Text.
- Kein Konto, keine fremde Cloud (B-26, B-53, B-68), kein Abo (B-71). Oberfläche Deutsch (B-32, B-73).
- (Annahme) Eine App für Android und Windows aus einer gemeinsamen Codebasis; Abgleich Handy↔PC nur über einen lokalen Weg (siehe 5).

## 3. Bereiche / Seiten
1. **Heute** – was heute fällig ist, je Person (K-03, B-31/B-41).
2. **Post aufnehmen** – Kamera, Texterkennung, Vorschlag zum Bestätigen (K-01, K-02).
3. **Unterlagen** – Ablage nach Person × Thema (Mamas Arztsachen, Job, Wohnung, Auto; B-38).
4. **Termine & Fristen** – Liste je Person (K-03, B-42).
5. **Suche** – Alltagswörter, Person, Thema, Monat (K-04).
6. **Antwort schreiben** – Entwurf, Vorschau des Verdeckten, Okay (K-05).
7. **Sicherung & Einstellungen** – Sicherungsziel, Zustand, Erinnerung (K-06).

## 4. Funktionen (prüfbar)
1. K-01: Brief mit Handykamera fotografieren; Foto wird gespeichert (B-37).
2. K-01: Texterkennung läuft auf dem Gerät, ohne Netz; erkannter Text steht am Dokument.
3. K-01: App schlägt Person und Thema vor; Ablage erst nach Tipp auf „Okay“ (B-28, B-40, B-45).
4. K-01: Vorschlag ist vor dem Ablegen änderbar (Person, Thema).
5. K-02: Fristen/Daten aus dem erkannten Text werden erkannt und als Vorschlag gezeigt (B-39).
6. K-02: Eine Frist wird erst nach Bestätigung in die Liste übernommen.
7. K-03: Termin von Hand je Person anlegen, ändern, löschen (B-42).
8. K-03: Tagesansicht zeigt alle heute fälligen Fristen/Termine aller Personen (B-41).
9. K-03: (Annahme) Überfällige Fristen erscheinen ebenfalls in „Heute“, damit keine untergeht (B-24).
10. K-04: Suche „Zahnarzt März“ findet passende Unterlagen offline (B-43).
11. K-04: Filter nach Person, Thema, Monat kombinierbar.
12. K-05: Antwortentwurf zu einem Brief anfordern; vorher werden Namen und Diagnosen lokal durch Platzhalter ersetzt (B-44, B-69).
13. K-05: Vorschau „das geht hinaus“ vor dem Senden an die KI; Senden nur nach Okay.
14. K-05: Antwort kommt zurück, Platzhalter werden lokal wieder eingesetzt.
15. K-05: Entwurf wird nur nach Okay weitergegeben („Versand“, Bedeutung offen → Frage 7).
16. K-06: Alle Daten liegen verschlüsselt auf dem Gerät (B-26).
17. K-06: Sicherung läuft regelmäßig selbsttätig an das gewählte Ziel (B-30).
18. K-06: Schlägt die Sicherung fehl oder ist sie überfällig, erinnert die App sichtbar (B-46).
19. K-06: Sicherung lässt sich auf neuem Gerät einlesen (Annahme: nötig, sonst ist sie wertlos).

## 5. Datenhaltung und Sicherheit
- Fotos, erkannter Text, Zuordnungen, Fristen, Termine: lokal auf dem jeweiligen Gerät, verschlüsselt (K-06). (Annahme) Schlüssel aus einem Passwort der Nutzerin abgeleitet, Standard-Kryptografie (AES-GCM, PBKDF2), kein eigener Algorithmus.
- Sicherung: verschlüsselte Datei an ein lokales Ziel (Festplatte/Stick, offen O-02); kein Cloud-Ziel.
- KI-Weg: nur verdeckter Text verlässt das Gerät; Zuordnung Platzhalter↔Klartext bleibt lokal. KI-Schlüssel (Annahme) von der Nutzerin selbst, verschlüsselt gespeichert.
- Gesundheitsdaten der Mutter: Einverständnis vor Ablage klären (O-04).
- Passwort vergessen = Daten weg, wenn kein Ersatzweg; muss beim Einrichten klar gesagt werden (Annahme).

## 6. Schnittstellen
- Gerätekamera (B-55).
- KI-Dienst für den Antwortentwurf (K-05) – Anbieter nicht genannt (Frage 8).
- Sicherungsziel im Dateisystem (O-02).
- Handy-Kalender (B-03/B-54/B-57) ist als Bestand genannt, aber **kein** Baustein bindet ihn an → nicht gebaut (Frage 5).

## 7. Bewusste Grenzen
- Kein Kalender-Abgleich mit dem Handy-Kalender: steht in keiner Zu-tun-Zeile.
- Kein Mehrbenutzer-Betrieb für Mann/Kinder: offen (O-01).
- Kein Einscannen der alten Ordner als eigene Funktion: offen (O-03); Aufnahme über K-01 ist trotzdem möglich.
- Kein Geräteabgleich Handy↔PC↔Tablet über Netz/Cloud: widerspräche B-26; nur über Sicherung/Einlesen (Annahme).
- Kein eigener Mailversand: im Auftrag nicht als Baustein; „Versand“ nur als Weitergabe nach Okay.
- Keine KI ohne Netz (lokales Sprachmodell): nicht beauftragt.
- Keine Schulungsunterlagen über kurze Hinweise in der App hinaus (B-48).

## 8. Reihenfolge der Bauschritte
1. K-06 Grundgerüst: verschlüsselte lokale Datenhaltung (alles andere legt darauf ab).
2. K-01 Aufnahme, Texterkennung, Ablage-Vorschlag mit Okay.
3. K-03 Termin-/Fristenliste und „Heute“.
4. K-02 Fristen aus Text vorschlagen (braucht 2 und 3).
5. K-04 Offline-Suche.
6. K-06 Sicherung mit Erinnerung (Ziel nach Antwort auf O-02).
7. K-05 KI-Antwortentwurf mit Verdecken.
8. Durchgang auf Deutsch, ohne Technikwissen bedienbar (B-32, B-48); Gerätetest Android/Windows.

## 9. Offene Fragen an den Kunden
1. O-01: Tragen Mann und Kinder selbst ein oder nur die Hauptnutzerin?
2. O-02: Wohin soll gesichert werden (Festplatte, Stick)? Wie oft?
3. O-03: Alte Ordner einscannen oder nur neue Post?
4. O-04: Ist die Mutter mit der Ablage ihrer Arztbriefe einverstanden?
5. Soll der Handy-Kalender angebunden werden (nicht im Auftrag)?
6. Was soll das Tablet der Tochter können (nur lesen, gar nichts)?
7. Was heißt „Versand“ in K-05/B-45: Mail, Ausdruck, Kopieren?
8. Welcher KI-Anbieter, mit eigenem Schlüssel? Kosten dafür neben „kein Abo“ (B-71)?
9. Wie sollen Handy und PC denselben Stand haben, ohne Cloud?
10. O-05: Zeitaufwand heute je Monat (für die Nutzen-Rechnung).
(NOCH NICHT GESCHÄTZT-Zeilen gibt es im Auftrag keine.)

## 10. Unklar, widersprüchlich, doppelt (Fundstellen)
- **Budget vs. Umfang:** B-70 „einmalig bis etwa 80 €“ und B-47/B-72 „höchstens ein Wochenende“ gegen „Summe Stunden F1 112,2–203,7“. Passt nicht zusammen.
- **Gleiche Schätzung:** K-02 und K-06 tragen beide exakt 27,6–50,6 h, beide Katalog „neu“ – wirkt wie Vorgabe, nicht geschätzt.
- **K-01 auffällig klein:** Kamera + Texterkennung + Zuordnung mit 4,1–6,9 h, während Fristenlesen (K-02) 27,6–50,6 h hat.
- **K-05 „offline“-Faktor** (JSON `faktoren: ["ki","offline"]`) – der KI-Weg braucht Netz.
- **Verdeckt, aber Klartext:** Kopf `verdeckt: ja`, `kunde: "⟦KUNDE-1⟧"`, trotzdem steht „Sabine“ in B-11 und O-01–O-05 („klärt Sabine“, JSON `"wer":"Sabine"`) und „Mama/Mamas“ in B-26/B-38. Platzhalter oben übernommen, Klartext nicht weiterverbreitet.
- **Datum:** Kopf `datum: 2026-11-14` liegt nach heute (2026-11-13).
- **repo: "Workflow-Needs"** – Name des Bedarfswerkzeugs, nicht der zu bauenden App (Annahme: eigenes Repo nötig).
- **Doppelt:** Kalender auf dem Handy B-03 = B-54 = B-57; Wochenende B-47 = B-72; Keine Cloud B-26 = B-53 = B-68; Deutsch B-32 ≈ B-73; Ziele B-33–B-36 wiederholen B-24/B-25/B-31/B-27; Bereich 8 (B-37–B-46) wiederholt Bereich 6.
- **Ganzer Abschnitt doppelt:** „Bedarfsprotokoll – Änderungen“ und „Vollständiger Stand“ listen dieselben B-/O-Einträge; O-01–O-05 stehen zusätzlich unter „Offene Punkte“ und im JSON.
- **Nicht abgedeckt:** B-32 (Deutsch, ohne Technikwissen) und B-48 (keine Schulung) hängen an keinem Baustein; Kalender (B-54) und Tablet (B-52) ebenso.
- **„Grenzlinie keine“** in „Summe“: unklar, ob alles fest beauftragt ist oder nur keine gesetzt wurde.
