# Bauplan · Vorgang V-2026-0001 · Fassung 4 · Kunde ⟦KUNDE-1⟧

## 1. Zweck und Nutzer
Eine private Familienakte, die alle Unterlagen, Personen, Fristen und Notizen einer Familie nach Lebensbereichen an einem Ort führt, ohne Konto und ohne fremden Server (B-13, B-14). Nutzer sind die zwei Eltern ohne Technikwissen; Kinder und pflegebedürftige Großmutter sind betroffen, nicht selbst Nutzer (B-06, B-07, B-27).

## 2. Plattformen und Laufzeit
- Android-App (Hauptgerät), Windows-App, Web-App im Browser (B-15, K-03); dazu Tablet mit SD-Karte (B-41).
- Läuft ohne Internet und ohne Anmeldung (B-20). Kein Konto.
- Netz nur für ausdrücklich gewählte Wege: Updates vom eigenen Server (K-03), Kalenderabgleich (K-09), E-Mail/Cloud (K-13), KI-Briefantwort (K-12).
- Oberfläche und Texte auf Deutsch (B-27). Kein Abo, keine Werbung, kein Zähldienst (B-37).

## 3. Bereiche/Seiten
- Startseite/Übersicht mit fälligen Fristen (B-17, B-19).
- Gesundheit & Arbeit · Familie & Personen (Personen, Organisationen, Objekte) · Wohnen · Fahrzeuge · Käufe & Garantien · Termine & Aufgaben (Übersicht, Fristen, Kalender, Tagebuch) (B-23).
- Bibliothek aller Unterlagen mit Filter und Suche (B-24).
- Eingang (Scannen, Stapel, Vorschläge bestätigen) (K-06, B-42).
- Sicherung & Geräte (Ablageort, Export, Vollsicherung, Meine Geräte, Abgleich) (K-02, K-10, K-15).
- Einstellungen (Schriftgröße, Tooltips, Papierkorb) (K-15); Hilfe mit Bildthemen und Landkarte (K-11, B-28).

## 4. Funktionen (prüfbar)
1. Unterlagen, Personen, Fristen, Notizen anlegen, ändern, je Bereich anzeigen (K-01, B-21).
2. Bibliothek zeigt jede Unterlage als Zeile mit Vorschau, filterbar (B-24).
3. Suche versteht Alltagswörter, Monatsnamen, Datumsangaben, Synonyme (B-25).
4. Bedeutungssuche läuft auf dem Gerät, ohne Netz (K-08, B-40).
5. Aufgabe/Frist mit Fälligkeit; Erinnerung ist Teil der Aufgabe; „Erledigt“ ist rückgängig zu machen (B-26).
6. Ablage im Gerätespeicher oder in einem gewählten Ordner (K-02).
7. Sicherung als Datei schreiben und auf neuem Gerät wieder einlesen (B-16, B-22).
8. Verschlüsselte Vollsicherung mit Notfallblatt; Erinnerung, wenn lange nicht gesichert (B-47).
9. Abgleich derselben Akte zwischen zwei Handys und PC über Festplatte, eigenes Netz oder Paket, ohne fremden Server (B-46).
10. Gemeinsamer verschlüsselter Ablageort mit Buchhaltungs-, PDF- und Mail-App, ein Passwort, SD-Karte oder Gerätespeicher (K-07, B-39, B-44).
11. Eingang: Foto mit Scanner, Texterkennung, Vorschlag für Bereich und Frist, Stapel (K-06, B-38).
12. Nichts wird ohne Bestätigung abgelegt; mehrere Eingänge gesammelt bestätigen (B-42).
13. Fristen in Schreiben werden erkannt und als Termin vorgeschlagen (B-43, K-14).
14. Sortier-Kern schlägt Bereich und Frist aus gelesenem Text vor (K-14, B-52).
15. Eigener Kalender; Erinnerungston und Android-Benachrichtigung auch bei geschlossener App (K-09, B-45).
16. Kalenderabgleich mit Google und Microsoft in beide Richtungen (K-09, B-49).
17. Übernahme der Daten aus der alten Web-App (K-04, B-32).
18. Erfundene Beispielfamilie laden und per Knopf vollständig entfernen (K-05, B-18).
19. Tagebuch mit Stimmung und Person (K-12, B-50).
20. Briefantwort über eigene KI: Angaben vorher verdeckt, in der Antwort auf dem Gerät wieder eingesetzt, nur Entwurf (B-54, B-55).
21. E-Mails mit Anhängen und Cloud-Ordner hereinholen (K-13, B-51).
22. Sicherung an einem zweiten Ort (K-13).
23. Papierkorb mit Zurückholen (K-15).
24. Schriftgröße einstellbar, Tooltips an Knöpfen, Geräte benennen („Meine Geräte“) (K-15, B-53).
25. Kurze Erklärungen hinter „?“ statt Handbuch; Hilfe als Bilder, Landkarte der App (B-28, K-11).
26. Android- und Windows-App holen Updates vom eigenen Server (K-03).

## 5. Datenhaltung und Sicherheit
- Daten nur auf eigenen Geräten bzw. im gewählten Ordner (B-14); personenbezogene und Gesundheitsdaten (B-34, B-35).
- Originale und Vollsicherungen verschlüsselt; Passwort nicht gespeichert im Klartext (Annahme).
- Vor jedem KI-Aufruf Verdeckung der persönlichen Angaben, Zuordnung bleibt lokal (B-54).
- Keine Anmeldung, kein Konto, kein Zähldienst (B-20, B-37).
- Zugriff innerhalb der Familie: offen (O-01).

## 6. Schnittstellen
- Alte Web-App: einmalige Übernahme (K-04).
- Schwester-Apps (Buchhaltung, PDF, Mail): gemeinsamer verschlüsselter Ablageort (K-07).
- Google- und Microsoft-Kalender (K-09); Microsoft-Postfach erst nach Freischaltung der Rechte (O-03).
- E-Mail-Postfächer und Cloud-Ordner (K-13).
- Eigene KI des Nutzers für Briefantwort (K-12) — welcher Anbieter: offen.
- Eigener Update-Server (K-03).

## 7. Bewusste Grenzen
- Kein eigener Server für Nutzerdaten, kein Konto (B-14, B-20).
- Kein automatischer Versand von Antworten oder Mails (B-55).
- Kein stilles Ablegen; Vorschläge bleiben Vorschläge (B-42).
- Keine Rechte-/Rollenverwaltung über die Eltern hinaus, solange O-01 offen ist.
- Keine Ausgabe für iOS/macOS — nicht beauftragt (B-15).
- Keine Euro-Beträge im Plan (`euro: nein`).

## 8. Reihenfolge
1. K-01 Akte und Bereiche, Bibliothek, Suche (Grundlage).
2. K-02 Ablage, Sicherung/Export; K-04 Übernahme alte App.
3. K-03 Android-, Windows-, Web-Hülle mit Updates.
4. K-06 Eingang, dann K-14 Sortier-Kern.
5. K-09 Kalender und Benachrichtigung.
6. K-07 gemeinsamer Ablageort; K-10 Abgleich und Vollsicherung.
7. K-08 Bedeutungssuche.
8. K-13 E-Mail/Cloud/zweiter Ort (Microsoft nach O-03).
9. K-15 Papierkorb, Schriftgröße, Tooltips, Geräte; K-12 Tagebuch/KI.
10. K-05 Beispielfamilie; K-11 Hilfe und Landkarte zuletzt.

## 9. Offene Fragen an den Kunden
- O-01 Wer außer den Eltern darf mitlesen? O-02 Welche Geräte gehören dazu? O-03 Microsoft-Rechte.
- Welche „eigene KI“ (Anbieter, Schlüssel) gilt für K-12?
- Welche Schwester-Apps genau, und müssen sie unverändert bleiben (K-07)?
- Gehört das Tablet (B-41) zu den Zielgeräten, obwohl B-15 nur Handy, PC, Browser nennt?
- Format und Zugang der alten App für die Übernahme (K-04)?
- Welche E-Mail-Anbieter und Cloud-Dienste (K-13)?

## 10. Unklar, widersprüchlich, doppelt
- Kopf: `fassung: 4`, aber `vorher: -`, und im Bedarfsprotokoll ist alles „NEU“ — Änderungen gegenüber Fassung 3 nicht erkennbar.
- O-01 (bis 2026-11-01) und O-02 (bis 2026-11-10) liegen vor dem Auftragsdatum 2026-11-14, sind aber weiter offen.
- B-14/B-20 („ohne fremden Server“, „ohne Internet“) stehen in Spannung zu K-09 (Google/Microsoft), K-12 (KI), K-13 (Cloud/E-Mail) — nur als ausdrücklich gewählte Wege vereinbar (Annahme).
- Doppelt: Einordnungs-/Fristvorschlag in K-06 und K-14; B-43 deckt keine K-Zeile ausdrücklich. Sicherung in K-02, K-10 und K-13 („zweiter Sicherungsort“).
- Nicht in „deckt“: B-42, B-43, B-49, B-54, B-55, B-19 — B-54/B-55 gehören sachlich zu K-12, B-49 zu K-09.
- Größen passen nicht zu Stunden: K-06 „groß“ 7,9–13,2 h, K-05 „klein“ 10–20 h, K-10 „groß“ 16,6–29,1 h.
- Summe: Zeilen ergeben 269,2–512,1 h; die angegebenen Zuschläge (40,7/77,7 h = 15 %) setzen etwa 271–518 h voraus — Abweichung von 2–6 h.
- Lückenhafte Einträge: B-01 „Papier“, B-05 „Termin“, B-29 „Geräte“, B-36 „Vorgaben“ ohne Inhalt.
- `repo: "Workflow-Needs"` nennt das erzeugende Werkzeug, nicht das Ziel-Repo — Ziel-Repo fehlt.
