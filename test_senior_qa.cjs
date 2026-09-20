const fs = require('fs');
const path = require('path');

console.log('================================================================');
console.log('  SENIOR QA (20 YRS EXP) AUDIT SUITE - CHHATH PARV APP v1.4.0');
console.log('================================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testName} - ${details}`);
    process.exitCode = 1;
  }
}

// 1. AUDIT LOCAL AUDIO BUNDLE INTEGRITY
console.log('--- TEST GROUP 1: LOCAL AUDIO BUNDLE INTEGRITY ---');
const expectedLocalAudio = [
  'sonu_jai_chhathi_maiya.mp3',
  'palak_sitali_bayariya.mp3',
  'pawan_ugi_suruj_dev.mp3',
  'khesari_chhapra_chhat.mp3',
  'manoj_tiwari_daura_lihali_sajay.mp3',
  'anuradha_uga_hai_suraj_dev.mp3',
  'kaanche_hi_bansh.mp3',
  'marbo_re_sugwa.mp3',
  'ho_deenanath.mp3'
];

expectedLocalAudio.forEach(file => {
  const filePath = path.join('public', 'audio', file);
  const exists = fs.existsSync(filePath);
  const size = exists ? fs.statSync(filePath).size : 0;
  assert(exists && size > 1000000, `Audio asset exists & valid: ${file}`, `Exists: ${exists}, Size: ${(size/1024/1024).toFixed(2)} MB`);
});

// 2. AUDIT DB.TS AND FULL_SONG_LYRICS.TS CATALOG
console.log('\n--- TEST GROUP 2: CATALOG & LYRICS AUDIT ---');
const lyricsContent = fs.readFileSync('src/services/fullSongLyrics.ts', 'utf8');
const dbContent = fs.readFileSync('src/services/db.ts', 'utf8');

// Check cache version key
assert(dbContent.includes("const SONGS_VERSION_KEY = 'chhath_parv_songs_ver_1_4_0';"), 'Cache key bumped to v1.4.0 in db.ts');
assert(dbContent.includes("1.4.0_verified_lyrics_and_singers"), 'Cache refresh token updated in db.ts');

// Check Sonu Nigam song
assert(dbContent.includes('"id": "song-52"'), 'Song-52 exists in db.ts');
assert(dbContent.includes('"title": "जय छठी मईया (चला भाऊजी हाली हाली)"'), 'Sonu Nigam song title is exact');
assert(dbContent.includes('"audioUrl": "audio/sonu_jai_chhathi_maiya.mp3"'), 'Sonu Nigam song maps to local verified audio');
assert(lyricsContent.includes('सबे वरत कर त ऐ धनी तुहूं कर'), 'Sonu Nigam lyrics contain verified opening verse');
assert(lyricsContent.includes('की चला भाऊजी हाली हाली सुरुज देखहिहें लाली'), 'Sonu Nigam lyrics contain verified chorus');

// Check Palak Muchhal song
assert(dbContent.includes('"id": "song-53"'), 'Song-53 exists in db.ts');
assert(dbContent.includes('"title": "शीतली बयरिया (जोड़े जोड़े फलवा सुरुज देव)"'), 'Palak Muchhal song title is exact');
assert(dbContent.includes('"audioUrl": "audio/palak_sitali_bayariya.mp3"'), 'Palak Muchhal song maps to local verified audio');
assert(lyricsContent.includes('शीतली बयरिया सीतल दूजे पनिया'), 'Palak Muchhal lyrics contain verified verse');
assert(lyricsContent.includes('गावेली पलक बेटी धई के धेयनवा'), 'Palak Muchhal lyrics contain signature name verse');

// Check Pawan Singh solo song
assert(dbContent.includes('"audioUrl": "audio/pawan_ugi_suruj_dev.mp3"'), 'Pawan Singh maps to local verified audio');
assert(lyricsContent.includes('उगी सुरुज देव भईल अरघ के बेर'), 'Pawan Singh lyrics verified');

// Check Khesari Lal Yadav song
assert(dbContent.includes('"audioUrl": "audio/khesari_chhapra_chhat.mp3"'), 'Khesari Lal maps to local verified audio');
assert(lyricsContent.includes('छपरा में छठ करेंगे'), 'Khesari Lal lyrics verified');

// Check Manoj Tiwari song
assert(dbContent.includes('"audioUrl": "audio/manoj_tiwari_daura_lihali_sajay.mp3"'), 'Manoj Tiwari maps to local verified audio');
assert(lyricsContent.includes('दउरा लिहले सजाय'), 'Manoj Tiwari lyrics verified');

// Check Anuradha Paudwal song
assert(dbContent.includes('"audioUrl": "audio/anuradha_uga_hai_suraj_dev.mp3"'), 'Anuradha Paudwal maps to local verified audio');
assert(lyricsContent.includes('उगs हे सुरुज देव भेल भिनसरवा'), 'Anuradha Paudwal lyrics verified');

// Check all 54 songs have lyrics
for (let i = 1; i <= 54; i++) {
  const hasEntry = lyricsContent.includes(`"song-${i}":`);
  assert(hasEntry, `Full lyrics exist for song-${i}`);
}

// 3. AUDIT SINGER FILTERING LOGIC (GEETVIEW.TSX)
console.log('\n--- TEST GROUP 3: SINGER FILTERING INTEGRITY ---');
const geetViewContent = fs.readFileSync('src/views/GeetView.tsx', 'utf8');
assert(geetViewContent.includes('SINGER_SECTIONS'), 'GeetView uses SINGER_SECTIONS');
assert(geetViewContent.includes('सोनू निगम|sonu nigam'), 'Sonu Nigam matcher exists in GeetView');
assert(geetViewContent.includes('पलक मुच्छल|palak muchhal'), 'Palak Muchhal matcher exists in GeetView');

// 4. AUDIT CHHATH PUJA DATES (13, 14, 15, 16 NOV 2026)
console.log('\n--- TEST GROUP 4: 2026 FESTIVAL DATES ALIGNMENT ---');
assert(dbContent.includes("date: '2026-11-13'"), 'Nahay-Khay is 2026-11-13 in db.ts');
assert(dbContent.includes("date: '2026-11-14'"), 'Kharna is 2026-11-14 in db.ts');
assert(dbContent.includes("date: '2026-11-15'"), 'Sandhya Arghya is 2026-11-15 in db.ts');
assert(dbContent.includes("date: '2026-11-16'"), 'Usha Arghya is 2026-11-16 in db.ts');

const countdownContent = fs.readFileSync('src/components/ChhathCountdownCard.tsx', 'utf8');
assert(countdownContent.includes("2026-11-13T06:00:00"), 'CountdownCard nahayKhay is 2026-11-13');
assert(countdownContent.includes("2026-11-16T09:00:00"), 'CountdownCard parana is 2026-11-16');

// 5. AUDIT PROHIBITED NAMES
console.log('\n--- TEST GROUP 5: STRICT RESTRAINT AUDIT ---');
const srcFiles = [];
function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist') walk(p);
    } else {
      srcFiles.push(p);
    }
  });
}
walk('src');

let prohibitedFound = false;
srcFiles.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  if (/apple\s*music/i.test(c)) {
    prohibitedFound = true;
    console.error(`Prohibited phrase found in ${f}`);
  }
});
assert(!prohibitedFound, 'No mention of prohibited streaming service in src');
// 6. AUDIT GALLERY ASSETS & REMINDER DATES IN MOREVIEW.TSX
console.log('\n--- TEST GROUP 6: GALLERY ASSETS & MOREVIEW AUDIT ---');
const galleryFiles = [
  'sandhya_arghya.jpg',
  'usha_arghya.jpg',
  'chhath_daura.jpg',
  'pavitra_soop.jpg',
  'thekua_prasad.jpg',
  'kosi_bharai.jpg',
  'kharna_prasad.jpg',
  'nahay_khay.jpg'
];

galleryFiles.forEach(file => {
  const filePath = path.join('public', 'gallery', file);
  const exists = fs.existsSync(filePath);
  const size = exists ? fs.statSync(filePath).size : 0;
  assert(exists && size > 50000, `Gallery photo exists & valid (>50KB): ${file}`, `Exists: ${exists}, Size: ${(size/1024).toFixed(1)} KB`);
});

const moreViewContent = fs.readFileSync('src/views/MoreView.tsx', 'utf8');
galleryFiles.forEach(file => {
  assert(moreViewContent.includes(file), `MoreView.tsx references ${file}`);
});
assert(!moreViewContent.includes('/gallery/sandhya_arghya.svg'), 'MoreView.tsx no longer references svg for sandhya_arghya');

// Reminder dates check in MoreView
assert(moreViewContent.includes('13 नवंबर (शुक्रवार) • सायं 06:00'), 'Nahay-Khay reminder date is 13 Nov in MoreView');
assert(moreViewContent.includes('14 नवंबर (शनिवार) • सायं 04:30'), 'Kharna reminder date is 14 Nov in MoreView');
assert(moreViewContent.includes('15 नवंबर (रविवार) • प्रातः 11:00'), 'Prasad prep reminder date is 15 Nov in MoreView');
assert(moreViewContent.includes('15 नवंबर (रविवार) • अपराह्न 03:00'), 'Sandhya Arghya reminder date is 15 Nov in MoreView');
assert(moreViewContent.includes('16 नवंबर (सोमवार) • भोर 03:30'), 'Usha Arghya reminder date is 16 Nov in MoreView');
assert(!moreViewContent.includes('17 नवंबर • अपराह्न 03:00'), 'Outdated 17 Nov date removed from MoreView');
assert(!moreViewContent.includes('18 नवंबर • भोर 03:30'), 'Outdated 18 Nov date removed from MoreView');

// 7. AUDIT APP VERSION NUMBERS
console.log('\n--- TEST GROUP 7: RELEASE VERSIONING AUDIT ---');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
assert(pkg.version === '1.4.1', `package.json version is 1.4.1 (found ${pkg.version})`);

const gradleContent = fs.readFileSync('android/app/build.gradle', 'utf8');
assert(gradleContent.includes('versionCode 6'), 'build.gradle versionCode is 6');
assert(gradleContent.includes('versionName "1.4.1"'), 'build.gradle versionName is 1.4.1');

console.log('\n================================================================');
console.log(`  QA AUDIT COMPLETE: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('================================================================');

