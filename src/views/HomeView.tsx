import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAudio } from '../context/AudioContext';
import { db } from '../services/db';
import { FestivalDay, Song } from '../types';
import { 
  Sun, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  Waves, 
  ArrowRight, 
  Play, 
  Pause,
  BookOpen,
  CheckSquare,
  Music,
  AlertCircle
} from 'lucide-react';
import { NavTab } from '../components/Navigation';
import { ChhathCountdownCard } from '../components/ChhathCountdownCard';

interface HomeViewProps {
  onNavigateTab: (tab: NavTab) => void;
  onSelectDay: (day: FestivalDay) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigateTab, onSelectDay }) => {
  const { t, language } = useLanguage();
  const { currentSong, isPlaying, playSong, togglePlay } = useAudio();

  const festivalDays = db.getFestivalDays();
  const checklist = db.getChecklist();
  const songs = db.getSongs();

  // Preparation progress calculation
  const totalItems = checklist.length;
  const completedItems = checklist.filter((i) => i.isCompleted).length;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  // Countdown to Chhath (Nahay Khay - Nov 15, 2026)
  const targetDate = new Date('2026-11-15T06:00:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, targetDate - now);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const popularSongs = songs.slice(0, 5);

  return (
    <div className="space-y-6 pb-24">

      {/* Chhath Puja Countdown & Notification Card */}
      <ChhathCountdownCard onNavigateTab={onNavigateTab} />

      {/* Continue Preparation Card with Progress */}
      <div 
        onClick={() => onNavigateTab('checklist')}
        className="rounded-3xl bg-white dark:bg-[#131927] border border-amber-300/40 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base group-hover:text-amber-600 transition-colors">
                {t('continuePrep')}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {completedItems} / {totalItems} सामग्री एवं घाट कार्य पूर्ण ({progressPercent}%)
              </p>
            </div>
          </div>
          <div className="p-2 rounded-full bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-stone-300 group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3.5 h-2 w-full bg-stone-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Four Sacred Days Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-devanagari flex items-center">
            <Sparkles className="w-4 h-4 mr-1.5 text-amber-500" />
            {t('fourDaysTitle')}
          </h3>
          <button
            onClick={() => onNavigateTab('puja')}
            className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center"
          >
            विस्तृत विधि
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {festivalDays.map((day) => {
            const dayIcons = {
              nahay_khay: Waves,
              kharna: Flame,
              sandhya_arghya: Sun,
              usha_arghya: Sparkles,
            };
            const Icon = dayIcons[day.key] || Sun;

            return (
              <div
                key={day.id}
                onClick={() => onSelectDay(day)}
                className="rounded-3xl bg-white dark:bg-[#131927] border border-amber-200/60 dark:border-slate-800/90 p-4 shadow-sm hover:border-amber-400/80 hover:shadow-md transition-all cursor-pointer relative overflow-hidden group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
                      {day.dayNumber}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400">
                        {day.dayOfWeek.split(' ')[0]} • {day.date}
                      </span>
                      <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm group-hover:text-amber-600 transition-colors font-devanagari">
                        {language === 'bho' ? day.titleBhojpuri : day.titleHindi}
                      </h4>
                    </div>
                  </div>

                  <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 mt-2 leading-relaxed">
                  {day.tagline}
                </p>

                <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-stone-500 dark:text-stone-400 truncate max-w-[190px]">
                    प्रसाद: {day.traditionalPrasad[0]}
                  </span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center">
                    नियम देखें
                    <ArrowRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          {t('quickActions')}
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 text-center">
          {[
            { label: 'पूजा विधि', sub: 'Vidhi', icon: BookOpen, action: () => onNavigateTab('puja') },
            { label: 'घाट चेकलिस्ट', sub: 'Ghat', icon: CheckSquare, action: () => onNavigateTab('checklist') },
            { label: 'प्रसाद सूची', sub: 'Prasad', icon: Sparkles, action: () => onNavigateTab('checklist') },
            { label: 'छठ गीत', sub: 'Geet', icon: Music, action: () => onNavigateTab('geet') },
            { label: 'आरती व मंत्र', sub: 'Aarti', icon: Flame, action: () => onNavigateTab('puja') },
            { label: 'कैलेंडर / व्रत', sub: 'Calendar', icon: Calendar, action: () => onNavigateTab('more') },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-[#131927] border border-amber-200/50 dark:border-slate-800/80 hover:border-amber-400 active:scale-95 transition-all shadow-sm"
              >
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-1.5">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate w-full font-devanagari">
                  {item.label}
                </span>
                <span className="text-[10px] text-stone-400">
                  {item.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Popular Chhath Geet Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-devanagari flex items-center">
            <Music className="w-4 h-4 mr-1.5 text-amber-500" />
            {t('popularGeet')}
          </h3>
          <button
            onClick={() => onNavigateTab('geet')}
            className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center"
          >
            सभी गीत देखें
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        <div className="space-y-2">
          {popularSongs.map((song) => {
            const isThisPlaying = currentSong?.id === song.id && isPlaying;

            return (
              <div
                key={song.id}
                onClick={() => playSong(song, songs)}
                className={`flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer border ${
                  currentSong?.id === song.id
                    ? 'bg-amber-500/10 border-amber-500/40 dark:bg-amber-950/30'
                    : 'bg-white dark:bg-[#131927] border-amber-200/40 dark:border-slate-800/80 hover:border-amber-400/50'
                }`}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-amber-950 border border-amber-400/30 relative">
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
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                      {song.artist} • {song.language}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentSong?.id === song.id) {
                      togglePlay();
                    } else {
                      playSong(song, songs);
                    }
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90 flex-shrink-0 ${
                    isThisPlaying
                      ? 'bg-amber-500 text-stone-950'
                      : 'bg-amber-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-stone-950'
                  }`}
                >
                  {isThisPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Regional Tradition & Healthcare Disclaimers */}
      <div className="space-y-2 pt-2">
        <div className="rounded-2xl bg-amber-500/10 border border-amber-400/30 p-3.5 flex items-start space-x-2.5 text-xs text-amber-900 dark:text-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {t('regionalNotice')}
          </p>
        </div>

        <div className="rounded-2xl bg-stone-100 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800 p-3 text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
          {t('disclaimerHealthcare')}
        </div>
      </div>

    </div>
  );
};
