# Bauplan · Vorgang V-2026-0001 · Fassung 1 · Kunde ⟦KUNDE-1⟧

Grundlage: `bauauftrag.md` (Abschnitt „Zu tun“, K-01 bis K-05). Gebaut wird nur NEU BAUEN; UNVERÄNDERT/ANPASSEN/ENTFERNEN-Zeilen gibt es nicht.

## 1. Zweck und Nutzer
Eine Android-App, in der Mails, Handy-Fotos und abfotografierter Papierkram an einer Stelle liegen und nach Inhalt gefunden werden, ohne den Dateinamen zu kennen (B-18, B-25, B-26). Nutzer ist eine einzelne Person ohne Lust auf Einrichtung oder Schulung (B-09, B-30, B-31, B-45).

## 2. Plattformen und Laufzeit
- Android-Handy als einzige Zielplattform (K-05, B-28, B-32). Laptop der Frau nicht im Bau (offen, O-02).
- Suche und Bedeutungsmodell laufen auf dem Gerät, auch offline (K-01: „auf dem Gerät“, Faktor `offline`).
- Online nur für den Mailabruf (K-02) und das Newsletter-Abmelden (K-04).
- Kein eigenes App-Konto; nur Verbindung der vorhandenen Mailkonten (Annahme, aus B-24/B-31 und „installieren, Konten verbinden, fertig“).

## 3. Bereiche der Oberfläche
1. Suche (Startseite): ein Suchfeld, Treffer aus Mails, Fotos, Dokumenten gemischt.
2. Konten: Gmail verbinden, weitere Konten per IMAP (K-02).
3. Einlesen: Galerie übernehmen, Papier abfotografieren (K-03).
4. Newsletter: erkannte Absender, gesammelt aussortieren/abmelden (K-04).
5. Erststart-Ablauf: installieren → Konten verbinden → fertig (K-05). (Annahme: keine weitere Einstellungsseite nötig.)

## 4. Funktionen (prüfbar)
1. App lässt sich auf Android installieren und startet ohne Einrichtungsschritte außer Kontoverbindung (K-05).
2. Gmail-Konto per OAuth verbinden, Mails werden in den Suchbestand übernommen (K-02).
3. Weiteres Konto per IMAP verbinden, mehrere Konten gleichzeitig (K-02, B-27).
4. Vorhandene Fotos der Handy-Galerie werden in den Suchbestand übernommen (K-03).
5. Ein Papier lässt sich abfotografieren und landet im Suchbestand (K-03).
6. Text in Fotos/abfotografierten Papieren wird lesbar gemacht, damit die Inhaltssuche greift (Annahme: Texterkennung auf dem Gerät; folgt aus „nach Inhalt“ + Fotos).
7. Suche nach Bedeutung findet einen Eintrag, dessen Dateiname kein Suchwort enthält (K-01, B-26).
8. Treffer aus Mails, Fotos und Dokumenten erscheinen in einer gemeinsamen Liste (K-01, B-25).
9. Suche funktioniert im Flugmodus über den vorhandenen Bestand (K-01, Faktor `offline`).
10. Kein Suchinhalt verlässt das Gerät zur Auswertung (K-01 deckt B-20).
11. Newsletter werden erkannt und als Gruppe angezeigt (K-04).
12. Gesammelt aussortieren; abmelden nur nach Bestätigung des Nutzers (K-04; Bestätigung = Annahme).

## 5. Datenhaltung und Sicherheit
- Suchbestand (Texte, Bedeutungswerte, Verweise) nur auf dem Handy; Originalfotos bleiben in der Galerie, Mails beim Anbieter (Annahme: Verweise statt Kopien).
- Personenbezogene und Kinderdaten (B-41, B-42): Bestand verschlüsselt im App-Speicher, Kontozugänge im Android-Schlüsselspeicher (Annahme).
- Keine externe KI für die Suche; Faktor `ki` heißt Modell auf dem Gerät (Annahme, sonst Widerspruch zu B-20/B-43).
- Sicherung/Umzug aufs neue Handy: im Auftrag nicht verlangt → nicht gebaut, als Frage gestellt.

## 6. Schnittstellen
- Gmail per OAuth (K-02).
- IMAP für weitere Konten (K-02).
- Android-Galerie und Kamera (K-03).
- Newsletter-Abmeldung über die Abmeldeangabe der Mail (Annahme, K-04 nennt den Weg nicht).

## 7. Bewusste Grenzen
- Kein Laptop/Windows/Web (O-02 offen, kein Baustein).
- Kein Ablegen/Sortieren in Ordner (B-08, B-16): kein Baustein dafür; die Suche ersetzt das Ordnen.
- Kein Mailversand, kein Antworten (nur Lesen/Finden, B-07).
- Keine Cloud-Synchronisation, keine Cloud-KI (B-20, B-43).
- Kein automatisches Abmelden ohne Bestätigung (Schutz vor falschen Treffern).
- Keine Preisgestaltung/Abo-Logik (euro: nein, O-03 offen).

## 8. Reihenfolge
1. K-05 App-Hülle mit Erststart-Ablauf (Grundlage für alles).
2. K-01 Suchbestand und Bedeutungssuche auf dem Gerät, erst mit Testtexten.
3. K-03 Galerie und Abfotografieren (inkl. Texterkennung).
4. K-02 Gmail (OAuth), dann IMAP, Mails in den Bestand.
5. K-04 Newsletter erkennen, aussortieren, abmelden.
6. Gesamtprobe am echten Android-Handy mit erfundenen Daten.

## 9. Offene Fragen an den Kunden
- O-01 Wie viele Mailkonten genau, welche Anbieter?
- O-02 Soll der Laptop der Frau mit dazu?
- O-03 30 € einmalig oder im Monat?
- O-04 Wie viele Fotos/Dokumente etwa? (bestimmt Speicher und Einlesedauer)
- O-05 Papier: abfotografieren oder liegen lassen?
- Neu: Wie lange zurück sollen Mails übernommen werden?
- Neu: Wird eine Sicherung/ein Umzug aufs neue Handy gebraucht?
- Neu: Ist eine Google-Anmeldung (OAuth) mit „kein Konzern liest mit“ vereinbar? Die Mails liegen ohnehin bei Gmail.
- Neu: Sollen alle Galeriefotos rein oder nur ausgewählte?
- Keine Zeile NOCH NICHT GESCHÄTZT im Auftrag – dazu nichts offen.

## 10. Unklar, widersprüchlich, doppelt
- **Summe stimmt nicht:** K-01–K-05 ergeben 92,5–168,4 h, „Summe“ nennt 127,6–235,4 h (Abschnitt „Summe“). Unterschied nicht erklärt (Aufschlag? Faktoren?).
- **Budget vs. Umfang:** B-44 „unter 30 €“ gegen 92–235 h Arbeit; euro: nein, also kein Betrag zum Abgleich.
- **verdeckt: ja, aber Klartextname:** „Tobias“ steht in B-09 und bei „klärt Tobias“ (O-01–O-05, JSON `wer`), obwohl der Kunde ⟦KUNDE-1⟧ heißt.
- **Doppelt:** B-01–B-45/O-01–O-05 stehen dreimal (Änderungen, Vollständiger Stand, JSON); O-Punkte zusätzlich unter „Offene Punkte“. B-25 ≈ B-12/B-22, B-26 ≈ B-18/B-11/B-17, B-27 ≈ B-19/B-36/B-37, B-28 = B-32, B-29 ≈ B-21/B-13, B-31 ≈ B-24/B-45, B-43 = B-20.
- **Ungedeckter Bedarf:** B-04/B-33 (Laptop), B-08 (Papierkram ablegen), B-07 (Mails *lesen*) haben keinen Baustein; B-24/B-30/B-31 werden von K-05 sinngemäß, aber nicht laut „deckt“ abgedeckt.
- **Zuordnung schief:** K-03 deckt nur B-25, betrifft aber auch B-02/B-03/B-35/B-39/B-40; K-01 trägt B-20, die Gmail-Anbindung (K-02) berührt B-20/B-43 ebenfalls.
- **„keine Einrichtung“ vs. Konten verbinden:** OAuth/IMAP-Zugang ist eine Einrichtung (B-24/B-31 vs. K-05/K-02).
- **Faktor `ki`** bei K-01 (nur im JSON) ist unbestimmt: gerätelokal oder Dienst?
- **Kopf:** `repo: "Workflow-Needs"` – das ist kein Repo für eine Kunden-Android-App; `datum` 2026-11-14 liegt nach dem heutigen Tag (2026-11-13).
- Nutzen-Stunden (`stundenMonat`) überall leer, Grenzlinie „keine“ – keine Priorisierung nach Kosten-Nutzen möglich.
