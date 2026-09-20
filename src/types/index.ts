export type SupportedLanguage = 'hi' | 'bho' | 'en';

export interface UserSettings {
  language: SupportedLanguage;
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  selectedYear: number;
  locationCity: string;
  largeFont: boolean;
  autoScrollLyrics: boolean;
}

export interface Festival {
  id: string;
  year: number;
  name: string;
  nameHindi: string;
  startDate: string; // ISO format: YYYY-MM-DD
  endDate: string;
  description: string;
}

export interface FestivalDay {
  id: string;
  festivalId: string;
  dayNumber: 1 | 2 | 3 | 4;
  key: 'nahay_khay' | 'kharna' | 'sandhya_arghya' | 'usha_arghya';
  title: string;
  titleHindi: string;
  titleBhojpuri: string;
  date: string;
  dayOfWeek: string;
  ritualName: string;
  tagline: string;
  meaning: string;
  description: string;
  importantActivities: string[];
  precautions: string[];
  traditionalPrasad: string[];
  suggestedSongKeywords: string[];
  checklistCategory: string;
  timingNotice: string;
}

export interface PujaGuide {
  id: string;
  dayKey: string;
  section: string;
  title: string;
  description: string;
  steps: string[];
  regionalVariationsNotice: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  language: 'Bhojpuri' | 'Maithili' | 'Hindi' | 'Traditional';
  category: 'Traditional Chhath Geet' | 'Bhojpuri Chhath Geet' | 'Maithili Chhath Geet' | 'Hindi Devotional' | 'Chhathi Maiya' | 'Sandhya Arghya' | 'Usha Arghya' | 'Kharna' | 'Instrumental' | 'Local';
  album?: string;
  artwork: string;
  duration: number; // in seconds
  audioUrl: string;
  lyricsId?: string;
  lyrics?: string;
  isFavorite?: boolean;
  isLocal?: boolean;
  isOffline?: boolean;
  sourceNote?: string;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  artwork: string;
  songCount: number;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  songIds: string[];
}

export interface FavoriteItem {
  id: string;
  entityType: 'song' | 'aarti' | 'mantra' | 'guide' | 'checklist';
  entityId: string;
  title: string;
  createdAt: number;
}

export interface LyricsLine {
  time?: number;
  text: string;
}

export interface Lyrics {
  id: string;
  songId: string;
  textDevanagari: string;
  textRoman?: string;
  textEnglish?: string;
  timedLines?: LyricsLine[];
}

export interface MantraItem {
  id: string;
  title: string;
  titleHindi: string;
  category: 'Aarti' | 'Surya Mantra' | 'Arghya Mantra' | 'Chhathi Maiya Prarthana' | 'Vrat Sankalp';
  sanskrit: string;
  hindiTranslation: string;
  meaning: string;
  audioUrl?: string;
  isFavorite?: boolean;
}

export interface ChecklistItem {
  id: string;
  checklistId: string;
  text: string;
  category: 'samagri' | 'ghat' | 'prasad' | 'family';
  isCompleted: boolean;
  isCustom?: boolean;
  notes?: string;
}

export interface FamilyTask {
  id: string;
  title: string;
  assignedTo: string; // 'Me' | 'Family Member' | Custom name
  isCompleted: boolean;
  dueDate?: string;
  notes?: string;
  createdAt: number;
}

export interface ReminderItem {
  id: string;
  title: string;
  type: 'sandhya_arghya' | 'usha_arghya' | 'kharna' | 'prasad' | 'ghat' | 'custom';
  notificationTime: string; // HH:mm or ISO
  isEnabled: boolean;
  notes?: string;
}

export interface PersonalNote {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  isFavorite: boolean;
  updatedAt: number;
}

export interface FastingTrackerState {
  isFastingActive: boolean;
  startedAt: string | null;
  dayKey: string;
  waterIntakeTracked: boolean;
  paranaDone: boolean;
  personalNotes: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Ghat' | 'Prasad' | 'Thekua' | 'Soop' | 'Daura' | 'Surya Arghya' | 'Family';
  imageUrl: string;
  dateAdded: string;
  isUserPhoto?: boolean;
}
