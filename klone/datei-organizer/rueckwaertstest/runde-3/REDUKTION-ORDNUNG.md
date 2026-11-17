# Reduktion lernen von „Ordnung auf Japanisch“ (Runde 3)

Quelle: Repo `ordnung-auf-japanisch` (Stand 13.11.2026, nur gelesen, nichts geändert): `CLAUDE.md`, `docs/PLAN.md`,
`docs/INHALT.md`, `index.html`, `assets/app.js`, `assets/db.js`, `assets/absicht.js`. Die öffentliche Seite war aus
dieser Sitzung nicht erreichbar (Netz gesperrt), also nur am Code belegt, nicht angesehen.

Ehrlich vorweg: Das **Produkt** ist nicht klein (6 Themen, 6 Sprachen, 148 Bilder, Glas-Knöpfe, Sonnenlicht).
Reduziert ist der **Weg des Nutzers**. Genau das ist die Lehre: Reduktion gehört in den Ablauf, nicht unbedingt in den Bau.

## 1 · Was die App tut – aus Sicht des Nutzers

1. Erster Start: „Willkommen. Drei kurze Fragen, dann geht es los“ – ein Knopf „▶ Einrichten“ (`app.js` `start()`).
2. Frage 1 „Wie viele Räume hast du?“ – nur ＋/−, Vorgaben stehen schon (`RAUM_FRAGEN`, `vor: 1`). Putzschrank und Böden
   kommen „von selbst dazu“ – darüber wird gar nicht gefragt.
3. Frage 2 „Wo möchtest du starten?“ – antippen in Wunschreihenfolge; nichts antippen geht auch („Übliche Reihenfolge →“).
4. Frage 3 „Wie lange am Stück?“ – 4 feste Zeiten Arbeit (10/15/20/25), 3 feste Pausen (5/10/15). Kein freies Feld.
5. Zusammenfassung, ein Knopf „▶ Los geht’s: <erster Raum>“ – und man **ist sofort im ersten Schritt**, nicht auf einer Übersicht.
6. Danach jeder Start: ganz oben **eine** Karte „Weiter mit <Raum · Schritt>“ und „▶ Beginnen“ (`naechster()`).
7. In der Sitzung: ein Schritt pro Bildschirm, wird vorgelesen; „✓ Fertig“ = gespeichert, nächster Schritt. Uhr für
   Einwirkzeit per Tipp, Arbeit/Pause läuft von selbst.
8. Ende eines Raums: Stempel 済, „geschafft“, ein Knopf „Weiter: <nächster Raum>“.

**Zählung:** Ersteinrichtung ≈ 5 Tipps (wenn man die Vorgaben nimmt: Einrichten · Weiter · Übliche Reihenfolge · Weiter · Los).
Danach je Tag **2 Tipps bis zur ersten Arbeit** (App öffnen, „Beginnen“) und **1 Tipp je erledigtem Schritt**.
Echte Entscheidungen: drei, einmal im Leben der App.

## 2 · Was sie bewusst weglässt – und wo sie zwingt

- **Kein Konto, keine Anmeldung, kein Server, kein Abgleich** (`db.js`: ein Fach `log`, ein Fach `einst`, nur im Gerät).
- **Keine Daten über Dinge.** Gespeichert wird nur „Schritt X erledigt um Zeit T“ (`{id, art, ref, zeit}`).
  Keine Inventarliste, keine Fotos, keine Kategorien, keine Notizen. Alles andere (Anzahl, Serie, „zuletzt vor 3 Tagen“,
  Kalender) wird **jedes Mal aus diesem einen Protokoll neu gerechnet** (`rechnen()`).
- **Keine eigenen Aufgaben anlegen.** Der Inhalt ist fest (`INHALT.md`); der Nutzer pflegt nichts.
- **Keine freien Eingaben beim Einrichten** – Zahlen per ＋/−, Zeiten aus 3–4 Knöpfen, Räume mit Obergrenze (`max: 1…6`).
- **Keine Planung durch den Nutzer.** Was als Nächstes kommt, entscheidet die App: erst nie Gemachtes in seiner Reihenfolge,
  sonst das am längsten Liegengebliebene (`naechster()`).
- **Keine Fälligkeitsliste, keine Mahnungen, keine Push-Meldungen** (Erinnerungen im Plan nur „freiwillig“, nicht gebaut).
- **Zwang statt Option:** die Warnkarte „Nie mischen“ kommt vor Putzschrank, Küche, Bad, Wäsche – man muss „Verstanden“
  tippen, einmal je Station und Tag (`MISCH_STATIONEN`, `warnGelesen`). Sicherheit ist nicht abwählbar.
- **Zwang beim Behalten:** die „Kiste des Zweifels“ (`INHALT.md` 6.7): was nicht zu entscheiden ist, bekommt ein Datum in
  einem Jahr; ist sie zu geblieben, „geht sie, ohne hineinzusehen“. Nicht „vielleicht später“, sondern ein festes Ende.

## 3 · Die Prinzipien

| # | Prinzip | Fundstelle | Wirkung beim Nutzer |
|---|---|---|---|
| P1 | **Eine Sache pro Bildschirm.** | `sitzungHtml()`: ein Schritt, ein Haupt-Knopf „✓ Fertig“ | Kein Suchen, kein Abwägen; der Kopf bleibt frei für die Hand. |
| P2 | **Die App entscheidet das Nächste, nicht der Nutzer.** | `naechster()`, Karte „Weiter mit …“ | Öffnen heißt anfangen. Keine Liste, die man erst sortieren muss. |
| P3 | **Wenige Fragen, einmal, mit fertiger Antwort.** | Einrichten: 3 Fragen, Vorgaben `STANDARD`, „Übliche Reihenfolge →“ | Man kann mit lauter „Weiter“ durchkommen und hat trotzdem etwas Richtiges. |
| P4 | **Auswahl statt Freitext, mit Obergrenze.** | `TAKT_ARBEIT`, `TAKT_PAUSE`, `RAUM_FRAGEN.max` | Keine Grübelei über „23 oder 25 Minuten“; Fehleingaben gibt es nicht. |
| P5 | **Nur das Ereignis speichern, alles andere rechnen.** | `db.js` (ein Protokoll), `rechnen()`, `stationStand()` | Nichts zu pflegen, nichts wird „veraltet“; Statistik entsteht nebenbei. |
| P6 | **Erledigt ist erledigt – mit kurzem Rückweg, nicht mit Archiv.** | `erledigen()`: Meldung mit „Rückgängig“ 6 s, dann weg | Ein Tipp reicht, Fehler kosten nichts, es gibt keinen Stapel „zu bestätigen“. |
| P7 | **Ein Ende statt Endlosliste.** | Abschluss „済 … geschafft“, Takt mit Pause, „Ein Schrank pro Tag, nicht zwei“ (`INHALT` „Warum in kleinen Schritten“) | Man hört zufrieden auf, statt vor einem Restberg zu kapitulieren. |
| P8 | **Loslassen mit Datum.** | Kiste des Zweifels (6.7), „Was zwei Jahre unberührt blieb“ (8.1), „ein Jahr unbenutzt, weg“ (3.9) | Unentschiedenes blockiert nicht und wird ohne neue Entscheidung erledigt. |
| P9 | **Fortschritt sichtbar, aber nicht als Pflicht.** | Enso-Kreis je Raum, Kette der letzten 21 Tage, 習 ab 21× (`GEWOHNHEIT_AB`) | Belohnt Wiederholung; es gibt kein rotes „überfällig“. |
| P10 | **Sicherheit ist der einzige Zwang.** | Warnkarte vor 4 Stationen, nicht abschaltbar | Reduktion endet dort, wo Schaden droht – genau einmal, kurz, dann Ruhe. |

Dazu im Kleinen: Startseite zeigt von den Gewohnheiten **höchstens zwei** offene (`slice(0, 2)`), Treffer der Frage
„Was möchtest du heute tun?“ **höchstens sechs** (`slice(0, 6)`), die Warnkarte **vier** Zeilen (`slice(0, 4)`).
Die Freitext-Frage läuft ohne KI über Stichwörter (`absicht.js`) und führt direkt zu „▶ Jetzt starten“.

## 4 · Übertragung

### (a) Familienakte / Ablage für Papierkram
Heute: neun Hauptbereiche, Fristen, Suche, Kalender, Sicherung, Geräte, Tresor. Das Gegenmodell steht im eigenen Tipp-Katalog
der App: „Briefkorb einmal pro Woche leeren … ablegen oder weg; der Korb ist danach leer“ (`INHALT.md` 1.7, Gewohnheit g).
1. **Eine Frage pro Brief** (P1): „Muss ich etwas tun?“ – Ja → Frist und Handlung; Nein → ablegen. Bereich, Person,
   Absender trägt die App selbst ein (Sortier-Kern), der Nutzer sieht sie nur, ändert sie nur bei Bedarf.
2. **Startseite = eine Karte „Als Nächstes“** (P2): die nächste Frist mit einem Knopf „Erledigt“. Alles andere
   (Bereiche, Landkarte, Geräte) wandert hinter „Mehr“.
3. **Ablage ohne Pflege** (P5): gespeichert werden Original + erkannter Text + „erledigt am“. Ordnerbaum, Zuordnung, Titel
   werden gerechnet, nicht gepflegt; „Zuordnung prüfen“ nur, wenn der Kern unsicher ist.
4. **Automatisch vergessen** (P8): Aufbewahrungsfristen aus dem Katalog (Steuer 10 J., Garantie = Gerätelebensdauer, Urkunden
   immer – steht schon in `INHALT.md` 6.6) als Ablaufdatum am Stück; nach Ablauf eine Sammel-Frage im Jahr „Diese 37 dürfen gehen?“.
5. **Wochenend-Ende** (P7): „Briefkorb leer“ als Zustand mit Stempel, statt einer ewigen Eingangsliste.

### (b) „Pflege-Post“ für Kinder pflegebedürftiger Eltern
1. **Ein Weg rein** (Foto oder weiterleiten), **zwei Felder raus**: „bis wann“ und „was tun“ (P1, P5). Kein Bereich, keine Ablage-Entscheidung.
2. **Fester Vorschlag statt Optionen** (P3/P4): „Widerspruch einlegen“, „bezahlen“, „unterschreiben“, „nur lesen“ – eine Wahl aus vier.
3. **Startseite = die eine nächste Frist** für alle Eltern zusammen (P2); Geschwister sehen dieselbe Karte, wer tippt „Erledigt“, nimmt sie allen weg.
4. **„Nur lesen“-Post verschwindet von selbst** nach 30 Tagen aus der Sicht (Original bleibt verschlüsselt liegen) (P8).
5. **Pflicht-Warnkarte** nur bei echten Fristen mit Rechtsfolge (Widerspruch Pflegegrad, Mahnung) (P10) – sonst kein Rot.

### (c) Bedarfsanalyse mit Kunden (heute 18 Bereiche plus Rahmen)
1. **Drei Fragen zuerst, Rest nur bei Bedarf** (P3): „Was nervt heute am meisten?“, „Wer arbeitet damit, auf welchem Gerät?“,
   „Was darf es höchstens kosten?“. Die 18 Bereiche bleiben als Prüfliste für Klaus, nicht als Gesprächsablauf.
2. **Vorgaben statt leerer Felder** (P4): je Branche ein fertiger Bedarf mit den üblichen Antworten; im Gespräch wird nur gestrichen
   oder ergänzt („Nicht gewünscht“ ist schon da – das ist Reduktion als Funktion).
3. **Eine Frage pro Bildschirm** im Kundenmodus (P1), mit „Weiß nicht“ als gültiger Antwort → kommt in eine „Kiste des Zweifels“ mit
   Termin zur nächsten Fassung statt das Gespräch aufzuhalten (P8).
4. **Ende des Gesprächs sichtbar** (P7): „5 von 8 Fragen“ statt 18 Bereiche; danach ein Blatt, kein Formular.
5. **Rechnen statt fragen** (P5): Stunden, Preis, Grenzlinie entstehen aus den Antworten; der Kunde sieht nie Stellschrauben.

## 5 · Wo Reduktion kippt

- **Fristen mit Rechtsfolge** (Widerspruch, Steuer, Kündigung): hier darf „automatisch vergessen“ nie greifen; Ablaufen nur
  nach ausdrücklichem „Erledigt“ oder nach der gesetzlichen Frist. Die App braucht dann auch **eine** Erinnerung – das
  Putz-Vorbild hat bewusst keine, weil ein verpasster Backofen niemandem schadet.
- **Nachweise und Originale**: Loslassen gilt für die *Sicht*, nicht für das Original. Löschen nur mit Rückgängig und
  Papierkorb (die Familienakte hat das schon), bei Belegen mit Aufbewahrungspflicht gar nicht vor Fristende.
- **Haftung im Angebot**: Für den Kunden darf der Bedarf kurz sein, für den Auftragnehmer nicht. Was weggelassen wurde, muss
  als „nicht gewünscht“ **festgehalten** werden, sonst ist es später strittig (Abnahme, Nutzungsrechte, Zahlung).
- **Mehrere Menschen** (Geschwister, Freund mit Akte): „die App entscheidet das Nächste“ braucht dann eine klare Zuständigkeit,
  sonst erledigt es keiner oder zwei.
- **Sicherung**: „nur im Gerät“ ist im Putz-Fall harmlos, bei Urkunden nicht. Eine Sicherung muss sein – aber still und
  selbsttätig, ohne dass der Nutzer sie pflegen muss (die Familienakte hat „zweiter Ort“, das passt).
- **Fehlerkennung**: Je weniger der Nutzer sieht, desto teurer ist ein falscher automatischer Vorschlag. Reduktion braucht einen
  Kern, der gut genug ist, und einen sichtbaren Hinweis, wenn er unsicher ist – nicht eine Prüfliste für alles.
