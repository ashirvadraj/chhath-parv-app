package com.chhathparv.app;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
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

        // Automatically dispatch Chhath Puja reminder notification after 2 seconds
        getWindow().getDecorView().postDelayed(this::triggerAutomaticChhathReminder, 2000);
    }

    private void triggerAutomaticChhathReminder() {
        try {
            java.util.Calendar cal = java.util.Calendar.getInstance();
            long now = cal.getTimeInMillis();

            android.content.SharedPreferences prefs = getSharedPreferences("chhath_reminder_pref", Context.MODE_PRIVATE);
            long lastNotified = prefs.getLong("last_reminder_timestamp", 0);
            // Allow automatic reminder once every 12 hours
            if (now - lastNotified < 12 * 60 * 60 * 1000L) {
                return;
            }

            int currentYear = cal.get(java.util.Calendar.YEAR);
            int year = currentYear;
            java.util.Calendar target = java.util.Calendar.getInstance();
            String ritualName = "नहाय-खाय";

            if (year <= 2024) {
                target.set(2024, java.util.Calendar.NOVEMBER, 5, 6, 0, 0);
                if (now > target.getTimeInMillis() + (3L * 24 * 3600 * 1000)) {
                    target.set(2025, java.util.Calendar.OCTOBER, 25, 6, 0, 0);
                    year = 2025;
                }
            } else if (year == 2025) {
                target.set(2025, java.util.Calendar.OCTOBER, 25, 6, 0, 0);
                if (now > target.getTimeInMillis() + (3L * 24 * 3600 * 1000)) {
                    target.set(2026, java.util.Calendar.NOVEMBER, 13, 6, 0, 0);
                    year = 2026;
                }
            } else if (year == 2026) {
                target.set(2026, java.util.Calendar.NOVEMBER, 13, 6, 0, 0);
                if (now > target.getTimeInMillis() + (3L * 24 * 3600 * 1000)) {
                    target.set(2027, java.util.Calendar.NOVEMBER, 4, 6, 0, 0);
                    year = 2027;
                }
            } else {
                target.set(year, java.util.Calendar.NOVEMBER, 10, 6, 0, 0);
            }

            long diff = target.getTimeInMillis() - now;
            int days = (int) Math.ceil((double) diff / (24 * 60 * 60 * 1000L));
            if (days < 0) days = 0;

            String daysText = days == 0 ? "आज" : "केवल " + days + " दिन शेष";
            String title = "🌅 छठ महापर्व " + year + ": " + daysText;
            String message = "पावन अनुष्ठान: " + ritualName + "। घाट तैयारी, पूजन सामग्री व पावन छठ गीत अभी ऐप में देखें।";

            NotificationManager nm = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            if (nm != null) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    NotificationChannel ch = new NotificationChannel(
                        "chhath_parv_recommendations",
                        "छठ महापर्व स्मरण व अनुष्ठान (Chhath Puja Reminders)",
                        NotificationManager.IMPORTANCE_HIGH
                    );
                    ch.setDescription("छठ पूजा की पावन तिथियां, दिन शेष और घाट तैयारी के स्मरण");
                    ch.enableVibration(true);
                    nm.createNotificationChannel(ch);
                }

                Intent intent = new Intent(this, MainActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
                int flags = PendingIntent.FLAG_UPDATE_CURRENT;
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) flags |= PendingIntent.FLAG_IMMUTABLE;
                PendingIntent pi = PendingIntent.getActivity(this, 7001, intent, flags);

                androidx.core.app.NotificationCompat.Builder builder = new androidx.core.app.NotificationCompat.Builder(this, "chhath_parv_recommendations")
                    .setSmallIcon(R.mipmap.ic_launcher)
                    .setContentTitle(title)
                    .setContentText(message)
                    .setContentIntent(pi)
                    .setAutoCancel(true)
                    .setPriority(androidx.core.app.NotificationCompat.PRIORITY_HIGH)
                    .setDefaults(android.app.Notification.DEFAULT_ALL)
                    .setStyle(new androidx.core.app.NotificationCompat.BigTextStyle().bigText(message));

                try {
                    android.graphics.Bitmap bmp = android.graphics.BitmapFactory.decodeResource(getResources(), R.mipmap.ic_launcher);
                    if (bmp != null) builder.setLargeIcon(bmp);
                } catch (Exception ignored) {}

                nm.notify(3003, builder.build());
                prefs.edit().putLong("last_reminder_timestamp", now).apply();
            }
        } catch (Exception ignored) {}
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