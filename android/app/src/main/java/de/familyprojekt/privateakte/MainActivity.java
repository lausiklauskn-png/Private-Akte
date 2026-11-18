package de.familyprojekt.privateakte;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import androidx.activity.OnBackPressedCallback;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;
import java.util.Arrays;

/** Hülle „Private Akte Pro“ (Klaus 18.11.2026) um dieselbe Seite wie die PWA. Gerätezugriffe kommen unverändert aus den Klonen
 *  (Familienakte: Ordner auf Gerät/SD-Karte/USB für Backup und Organizer, Gerätekalender; Datei-Organizer: Eingang, Speichern unter). Eigene Seiten nur von https://localhost;
 *  jede andere Adresse geht an den Browser bzw. die zuständige App. Zurück geht an die Seite (sie kennt ihre Schritte). */
public class MainActivity extends BridgeActivity {
    @Override public void onCreate(Bundle state) {
        registerPlugin(de.familyprojekt.familienakte.FamilienakteOrdnerPlugin.class);
        registerPlugin(de.familyprojekt.dateiorganizer.DoEingangPlugin.class);
        registerPlugin(de.familyprojekt.dateiorganizer.DoDateienPlugin.class);
        registerPlugin(de.familyprojekt.familienakte.FamilienakteKalenderPlugin.class);
        super.onCreate(state);
        if (bridge == null) return;
        bridge.getWebView().getSettings().setTextZoom(100);
        bridge.setWebViewClient(new BridgeWebViewClient(bridge) {
            @Override public boolean onRenderProcessGone(WebView view, android.webkit.RenderProcessGoneDetail detail) {
                try { android.view.ViewParent p = view.getParent(); if (p instanceof android.view.ViewGroup) ((android.view.ViewGroup) p).removeView(view); }
                catch (Exception egal) { /* weiter mit Neuaufbau */ }
                runOnUiThread(MainActivity.this::recreate);
                return true;
            }
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if ("https".equals(uri.getScheme()) && "localhost".equals(uri.getHost()) && uri.getPort() == -1)
                    return super.shouldOverrideUrlLoading(view, request);
                if (!request.isForMainFrame()) return super.shouldOverrideUrlLoading(view, request);
                if (Arrays.asList("http", "https", "mailto", "tel").contains(uri.getScheme())) {
                    try { startActivity(new Intent(Intent.ACTION_VIEW, uri).addCategory(Intent.CATEGORY_BROWSABLE)); }
                    catch (Exception none) { android.widget.Toast.makeText(MainActivity.this, "Keine App für diese Adresse", android.widget.Toast.LENGTH_SHORT).show(); }
                }
                return true;
            }
        });
        // Zurück: die Seite geht einen Schritt zurück (Fenster, Rahmen, Ansicht; app.js über history). Am Anfang in den Hintergrund.
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override public void handleOnBackPressed() {
                if (bridge == null) { moveTaskToBack(true); return; }
                WebView web = bridge.getWebView();
                if (web.canGoBack()) web.goBack(); else moveTaskToBack(true);
            }
        });
    }
}
