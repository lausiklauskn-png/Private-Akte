# Plan: vom Browser-Tresor zur Tresor-APK (Klaus 14.11.2026: „machen wir noch, aber nicht jetzt“)

Festgehalten im Datei-Organizer, weil die Frage hier aufkam (Signier-Identität #17). Gebaut wird in Klaus' Tresor-Repo
(„Mein-Tresor“, in der Sitzung vom 14.11. nicht verbunden – zuerst ansehen, nichts davon ist dort geprüft).
**Nichts davon ist gebaut.** Vor dem Bau: Vorschau an Klaus, Ja je Punkt.

## Klaus' Frage und die Antwort (14.11.)

- **Heute:** Der Tresor läuft im Browser, die Daten liegen im Speicher des Browsers für diese Adresse. Browser-Daten löschen → weg.
  Eine APK sieht diesen Speicher nicht.
- **APK, App-interner Speicher:** Ein Update behält die Daten, wenn es mit **demselben Signierschlüssel** signiert ist. Deinstallieren löscht sie.
- **APK, eigener Ordner (von Klaus gewählt, z. B. SD-Karte):** Er bleibt bei Update **und** Deinstallieren. Nach dem Neuinstallieren den Ordner
  wieder wählen und mit dem Passwort öffnen.
- Das Passwort bzw. der Ersatzschlüssel darf nie nur in der App liegen (ein Merker im Android-Schlüsselspeicher ist nach dem Deinstallieren weg).

## Weg in Schritten

1. **Bestand ansehen** (Tresor-Repo): wo die Daten liegen (IndexedDB? Schublade?), Verschlüsselung (Schloss, Schlüsselableitung), heutiger Export.
   Nichts umbauen, nur aufschreiben.
2. **Export/Import in der Browser-Fassung**, falls es keinen gibt: eine verschlüsselte Sicherungsdatei, die die APK einlesen kann.
   Das ist die Brücke von Browser zu App; ohne sie bleiben die Browser-Daten im Browser.
3. **Tresorordner statt nur App-Speicher:** die verschlüsselten Dateien in einem von Klaus gewählten Ordner (Androids Ordnerwahl, dauerhafte
   Freigabe wie `DoOrdnerPlugin` hier). Prüfen, ob der **gemeinsame Tresorordner der Pro-Apps** passt (Paket `de.familyprojekt.tresor`,
   gepflegt in Workflow PDF Pro, byte-gleich mit Pin: Hauptschlüssel in Passwort- und Ersatzplätzen, Fächer, nie Löschen in einem Fach).
   Wenn ja: **übernehmen, nicht nachbauen**.
4. **Android-Hülle** nach dem Muster von BookLedgerPro bzw. Datei-Organizer Pro (Capacitor, eigener Paketname).
5. **Eigene Signier-Identität** für die Tresor-APK – wie heute beim Datei-Organizer: Freigabe in Termux erzeugen, `age`-Sicherung in den Tresor,
   Lauf „initialize“, PR mit dem verschlüsselten Paket, Merge nur mit Klaus' Ja. Nie den Schlüssel einer anderen App.
6. **Updates vom eigenen Server** (optional, wie hier): eigener Update-Schlüssel, öffentlicher Teil in die App.
7. **Proben, die den Verlust ausschließen:** überinstallieren (Daten bleiben), deinstallieren und neu installieren (Ordner wieder wählen,
   mit Passwort öffnen, alles da), falsches Passwort (nichts offen), Ordner weg (klare Meldung, nichts gelöscht).

## Was nicht passieren darf

- Nichts veröffentlichen ohne Klaus' Wort; keine Signieridentität ohne ihn.
- Keine Schlüssel, Passwörter oder Freigaben im Repo oder im Chat.
- Kein Weg, auf dem die Daten **nur** im App-Speicher liegen.
