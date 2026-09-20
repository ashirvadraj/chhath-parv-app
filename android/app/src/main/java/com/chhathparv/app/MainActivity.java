package com.chhathparv.app;

import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.view.WindowManager;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(MediaNotificationPlugin.class);
        super.onCreate(savedInstanceState);
        
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        // Request notification permission on launch for Puja reminders (Android 13+)
        android.content.SharedPreferences permsPrefs = getSharedPreferences("chhath_permissions_pref", Context.MODE_PRIVATE);
        boolean alreadyRequested = permsPrefs.getBoolean("has_requested_notifications", false);
        if (!alreadyRequested) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                if (checkSelfPermission(android.Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                    requestPermissions(new String[]{android.Manifest.permission.POST_NOTIFICATIONS}, 101);
                }
            }
            permsPrefs.edit().putBoolean("has_requested_notifications", true).apply();
        }

        if (getBridge() != null && getBridge().getWebView() != null) {
            WebView webView = getBridge().getWebView();
            WebSettings settings = webView.getSettings();
            settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
            settings.setMediaPlaybackRequiresUserGesture(false);
            settings.setJavaScriptEnabled(true);
            settings.setDomStorageEnabled(true);
            settings.setDatabaseEnabled(true);
            settings.setAllowFileAccess(true);
            settings.setAllowContentAccess(true);
            webView.clearCache(true);
        }

        handleRecommendationIntent(getIntent());
    }

    @Override
    public void onNewIntent(android.content.Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleRecommendationIntent(intent);
    }

    private void handleRecommendationIntent(android.content.Intent intent) {
        if (intent != null && intent.hasExtra("recommendationSongId")) {
            String songId = intent.getStringExtra("recommendationSongId");
            if (songId != null && !songId.isEmpty()) {
                if (getBridge() != null && getBridge().getWebView() != null) {
                    getBridge().getWebView().postDelayed(() -> {
                        if ("open_wrapped".equals(songId)) {
                            getBridge().getWebView().evaluateJavascript(
                                "window.dispatchEvent(new CustomEvent('openWrappedModal'));",
                                null
                            );
                        } else {
                            getBridge().getWebView().evaluateJavascript(
                                "window.dispatchEvent(new CustomEvent('playRecommendedSong', { detail: { songId: '" + songId + "' } }));",
                                null
                            );
                        }
                    }, 500);
                }
            }
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        handleRecommendationIntent(getIntent());
        if (getBridge() != null && getBridge().getWebView() != null) {
            WebView webView = getBridge().getWebView();
            WebSettings settings = webView.getSettings();
            settings.setMediaPlaybackRequiresUserGesture(false);
            webView.resumeTimers();
        }
    }

    @Override
    public void onPause() {
        super.onPause();
        if (getBridge() != null && getBridge().getWebView() != null) {
            getBridge().getWebView().resumeTimers();
        }
    }

    @Override
    public void onStop() {
        super.onStop();
        if (getBridge() != null && getBridge().getWebView() != null) {
            getBridge().getWebView().resumeTimers();
        }
    }

    @Override
    public void onDestroy() {
        try {
            NotificationManager nm = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            if (nm != null) {
                nm.cancel(1001);
            }
        } catch (Exception ignored) {}
        super.onDestroy();
    }
}