package de.familyprojekt.privateakte;

import android.os.Bundle;

/** Hülle „Private Akte Pro“ (Klaus 18.11.2026) um dieselbe Seite wie die PWA. Gerätezugriffe kommen unverändert aus den Klonen
 *  (Familienakte: Ordner auf Gerät/SD-Karte/USB für Backup und Organizer, Gerätekalender; Datei-Organizer: Eingang, Speichern unter,
 *  Updates vom eigenen Server – das Ziel steht in den Meta-Daten des Manifests).
 *
 *  Mail nativ (Klaus 19.11.2026, Brief 0.9.0 Punkt 2): die Hülle erbt von der unveränderten MainActivity aus dem Klon Private Brain Pro
 *  (über tools/native/klon-quellen.mjs, byte-gleich). Die meldet dessen Plugins an (ProMail, ProVault, ProFolders …), hält die
 *  Gmail-Anmeldung, auf die ProMailPlugin über genau diese Klasse zugreift, beantwortet Modell-Adressen aus dem App-Speicher und regelt
 *  Links (fremde Adressen an den Browser), Zurück (die Seite der Akte geht über ihre Geschichte zurück, am Anfang in den Hintergrund)
 *  und den Neuaufbau nach einem Absturz der WebView. Hier kommen nur die Plugins der Akte dazu – vor dem Aufbau der Brücke. */
public class MainActivity extends de.familyprojekt.privatebrain.pro.MainActivity {
    @Override public void onCreate(Bundle state) {
        registerPlugin(de.familyprojekt.familienakte.FamilienakteOrdnerPlugin.class);
        registerPlugin(de.familyprojekt.dateiorganizer.DoEingangPlugin.class);
        registerPlugin(de.familyprojekt.dateiorganizer.DoDateienPlugin.class);
        registerPlugin(de.familyprojekt.dateiorganizer.DoUpdatesPlugin.class);
        registerPlugin(de.familyprojekt.familienakte.FamilienakteKalenderPlugin.class);
        super.onCreate(state);
    }
}
