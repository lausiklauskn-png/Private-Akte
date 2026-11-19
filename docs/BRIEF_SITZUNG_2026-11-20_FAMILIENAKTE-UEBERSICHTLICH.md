# Brief für die nächste Sitzung: Familienakte übersichtlich machen (Klaus 19.11.2026 abends)

**Repo:** die richtige Familienakte (`meine-familienakte`, Fassung 2.28.74 – nicht die Private Akte). Zuerst die `CLAUDE.md`
dort lesen. **Klaus schaut es sich am 20.11. morgens an** – bis dahin soll die Neugestaltung gebaut und ansehbar sein.

## Auftrag in Klaus' Worten (zusammengefasst)

Die Private Akte ist auf dem Kern der Familienakte gebaut, aber viel einfacher in Darstellung und Aufbau, ohne Doppelungen.
Die Familienakte soll jetzt **genauso übersichtlich** werden. „Die Grafik, der Aufbau, alles so im Groben von der Idee kann
bleiben, aber es muss übersichtlicher gestaltet sein.“ Der Kern (Tresor, Register, Sortier-Kern, Suche, Sicherung) bleibt.

**Das Problem:** man scrollt und wird von der Fülle an Informationen erschlagen („Overload“). „Ich kann maximal 7 Bilder auf
einmal verarbeiten, und wenn ich dann zumache, kann ich mir maximal 2 oder 3 merken.“ Beispiele, die Klaus genannt hat:
„Direkt zur passenden Akte wechseln“ (allein die Größe der Akten-Kacheln), „Lebensbereiche“, „Datentresor, Suche und
Sicherung“, zu viele Knöpfe in der Kopfleiste, „Familie & Personen“ (man klickt zweimal auf Personen und hat trotzdem keinen
Überblick), die Startseite mit vielen Eingabefeldern.

## Zuerst die Logik verstehen – nicht zu sehr vereinfachen (Klaus 19.11. nachts, ausdrücklich)

> „Die Bereiche in der Familienakte sind schon wichtig … Das hat schon alles einen Sinn, wie das so eingegeben wurde. Deswegen darf
> das gerne im Aufbau etwas anders sein als meine private für eine Person. Die Familienakte ist wirklich im Aufbau für eine ganze
> Familie gedacht. Deswegen bitte die Logik und die Vorgehensweise noch einmal überdenken. Nicht zu sehr vereinfachen, sondern
> einfach nur die Logik dahinter verstehen und den Aufbau so machen, dass man alles leicht nachvollziehen kann.“

- Die Private Akte ist für **eine** Person; die Familienakte für die **ganze Familie**. Sie wird **nicht** auf die Private Akte
  zurückgeschnitten – übernommen wird nur die Art der Darstellung (einklappen, Suche, weniger auf einmal, Erklärung hinter „?“).
- Die **Bereiche bleiben** mit ihren Unterteilungen, z. B. **Gesundheit & Arbeit**: Diagnose, Krankenkasse, Leistungen, Arbeitgeber;
  ebenso Wohnen, Fahrzeuge, Käufe & Garantien, Dokumente, Termine & Aufgaben.
- Alles darin bekommt **eigene Akten**, und jede Akte gehört **einer Person** (oder der Familie gemeinsam).
- **Weg über die Person:** Personen öffnen → Person wählen → **alle ihre Akten** aus allen Bereichen auf einen Blick.
- **Gemeinsame Vorgänge und Familienunterlagen** haben ihren eigenen Platz; dort findet man die dazugehörigen Daten.
- **Vorgehen:** vor dem Umbau die bestehende Logik aufschreiben (Bereich → Akte → Person / gemeinsam → Unterlagen, Fristen,
  Tagebuch) und Klaus als kurze Übersicht zeigen; danach so umbauen, dass genau diese Logik sichtbar und nachvollziehbar wird.
  Die Navigation darf bleiben, wo sie diese Ordnung trägt – sie soll nur nicht alles auf einmal ausbreiten.

## Was gebaut werden soll

1. **Container einklappbar, ab Werk zu.** Jede Karte der Startseite ist ein Knopf mit Überschrift (und ggf. Zahl), ein Tipp klappt
   sie auf: z. B. „Aktueller Stand“, „Gemeinsamer Dokumenteneingang“, „Was ist heute passiert?“, „Gespeicherte Korrespondenz“,
   „Gemeinsamer Familienkern“. Ist etwas passiert, steht es **unter** dem Knopf, nicht als offener Block mit Eingabefeldern.
   Vorbild: `klappTeil` / `pa_klapp` in `app.js` der Privaten Akte („Deine Unterlagen“, „Fällig“).
2. **Lebensbereiche** nur noch als kleine Schnellauswahl, „als optischer Hingucker“: wenige flache Knöpfe in Reihen (Vorbild
   `kachelRaster` in der Akte: höchstens drei Reihen, dann seitlich schieben), keine großen Kacheln.
3. **Akten-Kacheln** („Direkt zur passenden Akte wechseln“) deutlich kleiner bzw. in einen einklappbaren Container.
4. **Suche als Hauptweg.** „Wozu soll die Suche existieren, wenn ich nicht schnell über die Suche genau dahin komme, wo ich hin
   will?“ Beispiel: „Fahrzeuggarantie“ eingeben → alles zur Garantie des Fahrzeugs; „Klaus“ eingeben → alles zu der Person.
   Die Suche nach einer **Person** muss ihre Unterlagen, Akten, Tagebucheinträge finden (in der Akte fand „Klaus“ nichts – dort
   ist das nur eine Information, hier soll es gehen). Kein zweiter Suchweg daneben.
5. **„Familie & Personen“ übersichtlich:** einmal Personen öffnen → Liste der Personen → Tipp auf eine Person → alles zu ihr
   (Unterlagen, Akten, Tagebuch, Termine) auf einen Blick, ohne zweites „Personen“. Vorbild: „Akten“ in der Privaten Akte
   (`vAkten`: links Baum „Alle Personen › Person › Akten“, rechts die Unterlagen mit Pfad). Neue Person anlegen bleibt.
6. **Kopfleiste entschlacken:** zu viele Knöpfe. Was selten gebraucht wird, in ein Menü oder die Seitenleiste (Vorbild: die
   verschiebbare Seitenleiste/„Flying Widget“ der Akte; Importieren/Exportieren als zwei Strich-Knöpfe, Sicherung über
   „Exportieren › Backup erstellen“ und im Baum). „Brief und Dokumente mit KI schreiben“ – in der Akte über das Tool Private
   Brain im Baum gelöst; in der Familienakte prüfen, ob der Knopf oben bleiben muss.
7. **Weg damit (Klaus ausdrücklich):**
   - die **gelben Hinweise oben** wie „6 Eingangsfälle wurden erkannt …“ – „die ich einfach immer nur wieder wegklicke“;
   - die **Systemprüfung unten** („Auf diesem Gerät noch nicht geprüft“) – das übernimmt die KI-Sitzung (Claude Code liest den
     Code und merkt sich, was offen ist).
8. **Erklärungen nur hinter einem Fragezeichen** an dem Knopf, der eine braucht. Selbsterklärende Knöpfe („Neue Unterlagen“)
   bekommen keins. Keine Erklärsätze unter Überschriften oder Bildern (feste Regel der Akte, `CLAUDE.md` dort „Einfach halten“).

9. **Steckbrief einer Person (Klaus 19.11. abends, mit Bild „Person ändern“ aus der Familienakte; sein Ja: „Das ist ja alles
   verschlüsselt, kommt so keiner ran.“)** – zuerst **im Kern der Familienakte**, dann über den Klon in der Privaten Akte unter
   „Akten“ › Person:
   - Name, Rolle, **Notiz (optional)**, Anschrift und Kontakt (Straße, PLZ, Ort, E-Mail, **Telefon**) – gibt es schon
     (`lib/person-kontakt.ts`, `updateLocalPersonContact`), weiterverwenden.
   - **Ausweise und Nummern:** Personalausweis, Führerschein, Sozialversicherungsausweis, Steuer-ID, Reisepass, Krankenkasse –
     je Nummer, gültig bis; **„alles, was man auch in einer Akte erkennen könnte“**.
   - **Fotos der Ausweise** (Vorder-/Rückseite) als Kopie, z. B. zum Vorzeigen im Internet: als Unterlage im Tresor mit Verknüpfung
     zur Person (Bereich „Familie & persönliche Dokumente“), im Steckbrief als Vorschaubild.
   - **Erweiterbar:** „+ Eintrag“ mit eigenem Namen und Wert (z. B. „Handy 2“, „Mitgliedsnummer ADAC“).
   - **Spracheingabe an jedem Feld** (Mikrofon wie im Bild – für alle, denen Schreiben mit den Händen schwerfällt; Diktat des Kerns
     `lib/browser-dictation.ts`, in den Apps die Spracheingabe des Geräts).
   - Nur im verschlüsselten Tresor und im Backup, nirgends sonst; keine Nummern in Protokollzeilen oder Meldungen.
   - Übersichtlich nach Punkt 1: Abschnitte „Kontakt“, „Ausweise“, „Weitere Einträge“ einklappbar, ab Werk zu, Zahl daneben.

## Grenzen

- **Nichts am Kern ändern**, was gelernt oder gespeichert ist (Sortier-Kern, gelernte Regeln, Register, Tresor, Sicherungsformat
  – die Private Akte liest dieselbe Sicherung und dasselbe Register). Nur Darstellung und Wege.
- **Funktionen bleiben erreichbar** – nichts löschen, nur verstecken, zusammenklappen, in die Suche oder ein Menü legen.
- Die Private Akte nutzt die Familienakte als **Klon** (`klone/familienakte` @ `ec258cc`). Was dort in `app/` (Kalender, Notiz,
  Seitenleiste, Tresor) liegt, wird in der Akte gebündelt – nach dem Umbau dort nur nachziehen, wenn die gebündelten Teile
  unverändert laufen (Probe der Akte `tests/probe.cjs`).
- **Veröffentlichen erst nach Klaus' Ansicht am Morgen** und seinem Wort (Android, Windows, Web). Gebaut, geprüft und als
  Vorschau ansehbar soll es sein.

## Vorlagen in der Privaten Akte (öffentliches Repo `Private-Akte`)

- `docs/ANPASSUNGEN-GEGENUEBER-FAMILIENAKTE.md` – **zuerst lesen**: laufende Liste, was die Akte anders macht als die
  Familienakte und was dort zu prüfen wäre (Wörter, Wege, Suche, Sicherung).
- `app.js` / `app.css` / `index.html`: `klappTeil`, `echtAbschnitt`, `echtBaum`, `kachelRaster`, `kartenHoehe`, `vAkten`,
  `seitenleisteZeigen`, `glockeKnopf`, Importieren/Exportieren-Fenster.
- `CLAUDE.md` der Akte: Abschnitte 0.5.1, 0.6.2, 0.6.5, 0.7.0–0.7.7 (Klaus' Entscheidungen zu Klappen, Baum, Leiste, Akten).

## Startauftrag (zum Einfügen)

> Lies `CLAUDE.md` der Familienakte und `docs/BRIEF_SITZUNG_2026-11-20_FAMILIENAKTE-UEBERSICHTLICH.md` im Repo Private-Akte,
> dazu `docs/ANPASSUNGEN-GEGENUEBER-FAMILIENAKTE.md` dort. Gestalte die Familienakte nach Punkt 1–9 um: Container einklappbar,
> Lebensbereiche klein, Suche als Hauptweg (auch nach Personen), Personen übersichtlich, Kopfleiste entschlacken, gelbe Hinweise
> und Systemprüfung weg, Erklärungen hinter Fragezeichen, Steckbrief der Person (Punkt 9) im Kern. Zuerst die Logik (Bereiche → Akten → Person/Familie) verstehen und kurz darstellen, nicht zu sehr vereinfachen. Kern und gespeicherte Daten nicht anfassen. Bauen, prüfen, Bilder
> (Handy- und Tablet-Breite) zum Ansehen bereitlegen; veröffentlichen erst auf mein Wort.

Hinweis: Klaus wollte ein Bild der Familienakte (Akten-Kacheln) mitschicken; es ist in dieser Sitzung nicht angekommen – am
Morgen danach fragen, falls die Stelle unklar ist.
