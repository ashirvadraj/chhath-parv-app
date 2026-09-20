import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAudio } from '../context/AudioContext';
import { db } from '../services/db';
import { Song } from '../types';
import { 
  Search, 
  Heart, 
  Upload, 
  Music, 
  Play, 
  Pause 
} from 'lucide-react';

export const GeetView: React.FC = () => {
  const { t } = useLanguage();
  const { currentSong, isPlaying, playSong, togglePlay, toggleFavorite } = useAudio();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [songsList, setSongsList] = useState<Song[]>(() => db.getSongs());

  const categories = [
    'All',
    'Traditional Chhath Geet',
    'Bhojpuri Chhath Geet',
    'Maithili Chhath Geet',
    'Hindi Devotional',
    'Sandhya Arghya',
    'Usha Arghya',
    'Chhathi Maiya',
    'Kharna',
    'Instrumental',
    'Local'
  ];

  const languages = ['All', 'Bhojpuri', 'Maithili', 'Hindi', 'Traditional'];

  // Local Music Import Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImportedSongs: Song[] = [];
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
      const newSong: Song = {
        id: 'local-' + Date.now() + Math.random().toString(36).substr(2, 4),
        title: nameWithoutExt,
        artist: 'स्थानीय संगीत (Local Audio)',
        language: 'Traditional',
        category: 'Local',
        album: 'My Chhath Audio',
        artwork: '/logo.svg',
        duration: 240,
        audioUrl: url,
        isLocal: true,
        sourceNote: 'User Imported Audio'
      };
      newImportedSongs.push(newSong);
      db.addImportedSong(newSong);
    });

    setSongsList(db.getSongs());
    alert(`${newImportedSongs.length} स्थानीय गीत सफलता से जोड़े गए!`);
  };

  const filteredSongs = useMemo(() => {
    return songsList.filter((song) => {
      const matchesSearch = 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || song.category === selectedCategory;
      const matchesLanguage = selectedLanguage === 'All' || song.language === selectedLanguage;
      const matchesFavorite = !onlyFavorites || song.isFavorite;

      return matchesSearch && matchesCategory && matchesLanguage && matchesFavorite;
    });
  }, [songsList, searchQuery, selectedCategory, selectedLanguage, onlyFavorites]);

  return (
    <div className="space-y-5 pb-24">
      
      {/* Header & Local Music Import */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-devanagari text-stone-900 dark:text-white flex items-center">
            <Music className="w-5 h-5 mr-2 text-amber-500" />
            छठ रस व पारंपरिक भजन
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            आस्था के पावन गीत एवं वाद्य संगीत संग्रह
          </p>
        </div>

        {/* Local Music File Picker */}
        <label className="flex items-center space-x-1.5 px-3 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold shadow-md cursor-pointer transition-transform active:scale-95">
          <Upload className="w-4 h-4" />
          <span>गीत जोड़ें</span>
          <input 
            type="file" 
            accept="audio/*" 
            multiple 
            onChange={handleFileUpload}
            className="hidden" 
          />
        </label>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="गीत या गायक का नाम खोजें (Search songs)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#131927] border border-amber-200/60 dark:border-slate-800 text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 shadow-sm"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200"
          >
            ✕
          </button>
        )}
      </div>

      {/* Categories & Filter Chips */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold flex-shrink-0 transition-all ${
              onlyFavorites
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-white dark:bg-[#131927] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-slate-800'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-white' : ''}`} />
            <span>पसंदीदा ({songsList.filter(s => s.isFavorite).length})</span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex-shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                  : 'bg-white dark:bg-[#131927] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-slate-800'
              }`}
            >
              {cat === 'All' ? 'सभी श्रेणियां' : cat}
            </button>
          ))}
        </div>

        {/* Language Filter */}
        <div className="flex items-center space-x-1.5 text-xs text-stone-500 dark:text-stone-400 pt-1">
          <span className="text-[11px] font-semibold">भाषा:</span>
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-2 py-0.5 rounded-lg text-[11px] transition-colors ${
                selectedLanguage === lang
                  ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 font-bold'
                  : 'hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              {lang === 'All' ? 'सभी' : lang}
            </button>
          ))}
        </div>
      </div>

      {/* Song Count */}
      <div className="text-[11px] text-stone-400 font-medium">
        कुल उपलब्ध गीत: {filteredSongs.length}
      </div>

      {/* Songs List */}
      <div className="space-y-2">
        {filteredSongs.length === 0 ? (
          <div className="text-center py-12 rounded-3xl bg-white dark:bg-[#131927] border border-stone-200 dark:border-slate-800 p-6">
            <Music className="w-10 h-10 text-stone-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-stone-600 dark:text-stone-300 font-devanagari">
              कोई गीत नहीं मिला
            </p>
            <p className="text-xs text-stone-400 mt-1">
              कृपया अन्य शब्द खोजें या ऊपर से स्थानीय ऑडियो फ़ाइल जोड़ें।
            </p>
          </div>
        ) : (
          filteredSongs.map((song) => {
            const isThisPlaying = currentSong?.id === song.id && isPlaying;

            return (
              <div
                key={song.id}
                onClick={() => playSong(song, filteredSongs)}
                className={`flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer border ${
                  currentSong?.id === song.id
                    ? 'bg-amber-500/10 border-amber-500/50 dark:bg-amber-950/30 shadow-sm'
                    : 'bg-white dark:bg-[#131927] border-amber-200/40 dark:border-slate-800 hover:border-amber-400/60'
                }`}
              >
                <div className="flex items-center space-x-3 overflow-hidden flex-1 mr-2">
                  <div className="w-11 h-11 rounded-2xl overflow-hidden flex-shrink-0 bg-amber-950 border border-amber-400/30 relative">
                    <img 
                      src={song.artwork || '/logo.svg'} 
                      alt={song.title}
                      className="w-full h-full object-cover" 
                    />
                    {isThisPlaying && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="flex h-3 w-3 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="overflow-hidden">
                    <h4 className={`text-xs sm:text-sm font-bold truncate font-devanagari ${
                      currentSong?.id === song.id ? 'text-amber-600 dark:text-amber-400' : 'text-stone-900 dark:text-stone-100'
                    }`}>
                      {song.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
                      {song.artist} • <span className="text-amber-600 dark:text-amber-400">{song.language}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => {
                      toggleFavorite(song.id);
                      setSongsList(db.getSongs());
                    }}
                    className="p-2 rounded-full text-stone-400 hover:text-red-500 transition-colors"
                    title="Favorite"
                  >
                    <Heart className={`w-4 h-4 ${song.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  <button
                    onClick={() => {
                      if (currentSong?.id === song.id) {
                        togglePlay();
                      } else {
                        playSong(song, filteredSongs);
                      }
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-90 ${
                      isThisPlaying
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-amber-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-stone-950'
                    }`}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current translate-x-0.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
