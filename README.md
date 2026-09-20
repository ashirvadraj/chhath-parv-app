# छठ पर्व • Chhath Parv Android App

<p align="center">
  <img src="public/logo.svg" width="140" alt="Chhath Parv Logo" />
  <br>
  <strong>Chhath Puja • Geet • Vidhi • Vrat</strong>
  <br>
  <em>(छठ पूजा • गीत • विधि • व्रत)</em>
</p>

<p align="center">
  <a href="https://github.com/ashirvadraj/chhath-parv-app/releases/download/v1.0.0/ChhathParv.apk">
    <img src="https://img.shields.io/badge/Download-ChhathParv.apk-orange?style=for-the-badge&logo=android" alt="Download APK" />
  </a>
  <a href="https://github.com/ashirvadraj/chhath-parv-app/releases/tag/v1.0.0">
    <img src="https://img.shields.io/badge/Release-v1.0.0-green?style=for-the-badge&logo=github" alt="Release v1.0.0" />
  </a>
</p>

---

## 🌟 Overview
**Chhath Parv (छठ पर्व)** is a spiritual and modern Android companion application dedicated to the 4-day **Chhath Mahaparv**. It is designed especially for devotees and families from Bihar, Jharkhand, Eastern Uttar Pradesh, Mithila, and across the globe.

---

## 📲 Direct APK Download
You can download and install the compiled Android APK directly:
👉 [**Download ChhathParv.apk (v1.0.0)**](https://github.com/ashirvadraj/chhath-parv-app/releases/download/v1.0.0/ChhathParv.apk)

---

## ✨ Features

### 1. ☀️ Home Dashboard
- **जय छठी मईया** sacred greeting with year badge (**2026**).
- **Live Dynamic Countdown**: Real-time countdown ticker to Nahay Khay.
- **Interactive 4 Sacred Days Cards**:
  - **Day 1: Nahay Khay (नहाय-खाय)** — Self-purification, Kaddu-Bhat, precautions.
  - **Day 2: Kharna / Lohanda (खरना)** — 36-hour nirjala fast initiation, Rasiyaw-Roti prasad.
  - **Day 3: Sandhya Arghya (पहिला अरग)** — Sunset Arghya to Lord Bhaskar, Thekua preparation, Daura procession.
  - **Day 4: Usha Arghya & Parana (दूसरा अरग व पारन)** — Sunrise Arghya, completion of 36-hour fast.
- **Continue Preparation**: Live progress bar calculating completion of checklist items.
- **Quick Action Grid**: One-tap access to Puja Vidhi, Ghat Checklist, Prasad, Geet, Aarti, and Calendar.
- **Popular Chhath Geet**: Preview list with quick playback.

### 2. 🎵 Chhath Geet & Audio Player Architecture
- **Categories**: Traditional Folk, Sandhya Arghya, Usha Arghya, Chhathi Maiya, Kharna, Instrumental, Local.
- **Import Local Music**: Devotees can import their own legally owned `.mp3`, `.wav`, `.m4a`, `.aac`, `.flac` audio files directly into Chhath playlists.
- **Player Controls**: Play, pause, 10s rewind, 10s forward, repeat modes, shuffle, sleep timer (15–60 mins), and favorites.
- **Persistent Mini-Player**: Bottom mini-player pinned above navigation bar.
- **Lyrics Support**: Traditional devotional verses with text zoom controls (`A-` / `A+`).
- **Android Foreground Media Service**: Configured `MediaPlaybackService` with `MediaSessionCompat` for notification bar, lock screen, and Bluetooth playback.

### 3. 📖 Puja Vidhi & Devotional Aarti-Mantra
- Complete step-by-step guides for all 4 festival days with regional variation notices.
- Authentic texts: *Chhathi Maiya Aarti*, *Surya Arghya Mantra*, *Surya Gayatri Mantra*, *Chhath Vrat Sankalp*, and *Dvadasha Surya Namaskar*.
- **Read Mode** with font zoom controls.

### 4. ✅ Interactive Checklists & Family Tasks
- **Puja Samagri Checklist**: 20+ authentic items (Soop, Daura, Sugarcane, Coconut, Thekua ingredients, etc.).
- **Ghat Checklist**: 11 essential ghat preparation items.
- **Family Tasks**: Task delegation board for family members (*Me*, *Family*, *Brother/Father*, *Mother/Sister*).
- Support for custom items, delete, toggle, and reset.

### 5. 🗓️ Calendar, Vrat Tracker, Notes, Gallery & Backup
- **Panchang & Calendar**: Data-driven calendar for Chhath 2026.
- **Vrat Tracker**: Fasting start/stop timer, Parana completion tracker, and medical advisory notice.
- **Personal Notes**: Create, edit, pin, and delete personal preparation notes.
- **Chhath Gallery**: Sacred photo cards with support for importing local camera/gallery photos.
- **Offline JSON Backup & Restore**: One-click export and import of all user checklists, notes, family tasks, and settings without cloud dependencies.

---

## 🛠️ Technology Stack
- **Framework**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (Chhath festive color palette: Surya Gold, Saffron, Dawn Mist, Dark Mode)
- **Icons**: Lucide React
- **Mobile Engine**: Capacitor 6 (Android native wrapper)
- **Native Android**: Gradle 8.2.1, Android SDK 34, MediaSessionCompat, Foreground Media Playback Service
- **Storage**: Offline persistent database layer with JSON Backup & Restore

---

## 🚀 Building from Source

### Prerequisites
- Node.js (v18+)
- Java JDK 17
- Android SDK (compileSdk 34)

### Web Build
```bash
npm install
npm run build
```

### Android APK Build
Run the included batch script:
```cmd
BUILD_APK.bat
```
or manually:
```bash
cd android
./gradlew assembleDebug --no-daemon
```
The APK will be generated at `android/app/build/outputs/apk/debug/app-debug.apk` and copied to the root as `ChhathParv.apk`.

---

## 📄 License
This application is created for devotional, cultural, and community use dedicated to Chhath Puja devotees.
