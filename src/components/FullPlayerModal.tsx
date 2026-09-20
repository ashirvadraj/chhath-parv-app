import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useAudio } from '../context/AudioContext';
import { 
  ChevronDown, 
  Heart, 
  Share2, 
  RotateCcw, 
  RotateCw, 
  SkipBack, 
  SkipForward, 
  Play, 
  Pause, 
  Shuffle, 
  Repeat, 
  Clock, 
  Volume2,
  Mic2,
  FileText,
  Copy,
  Check,
  Sparkles,
  Music
} from 'lucide-react';
import { 
  parseLyricsToTimeline, 
  getActiveLineIndex, 
  getWordPlaybackState, 
  SyncedLine 
} from '../utils/lyricsEngine';

export const FullPlayerModal: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isShuffle,
    repeatMode,
    isFullPlayerOpen,
    sleepTimer,
    togglePlay,
    playNext,
    playPrevious,
    seek,
    skipForward,
    skipBackward,
    setVolume,
    toggleShuffle,
    cycleRepeatMode,
    setIsFullPlayerOpen,
    setSleepTimerDuration,
    toggleFavorite
  } = useAudio();

  const [activeTab, setActiveTab] = useState<'art' | 'live_lyrics' | 'full_lyrics'>('live_lyrics');
  const [showSleepMenu, setShowSleepMenu] = useState(false);
  const [lyricsFontSize, setLyricsFontSize] = useState<number>(16);
  const [copied, setCopied] = useState(false);
  const [userIsInteracting, setUserIsInteracting] = useState(false);

  const scrollTimeoutRef = useRef<any>(null);
  const lyricsContainerRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Compute synchronized line & word timeline for the current song
  const timeline = useMemo(() => {
    if (!currentSong) return { lines: [] as SyncedLine[], totalDuration: 0, songId: '' };
    return parseLyricsToTimeline(
      currentSong.id,
      currentSong.lyrics || '',
      duration || currentSong.duration || 280
    );
  }, [currentSong?.id, currentSong?.lyrics, duration]);

  const activeLineIndex = useMemo(() => {
    return getActiveLineIndex(timeline.lines, currentTime);
  }, [timeline.lines, currentTime]);

  // Smoothly center the active singing line unless user is manually inspecting
  useEffect(() => {
    if (activeTab !== 'live_lyrics' || userIsInteracting) return;
    if (activeLineIndex >= 0 && lineRefs.current[activeLineIndex] && lyricsContainerRef.current) {
      lineRefs.current[activeLineIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [activeLineIndex, activeTab, userIsInteracting]);

  // Handle manual touch or mouse scroll
  const handleUserScroll = () => {
    setUserIsInteracting(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setUserIsInteracting(false);
    }, 3800);
  };

  const scrollToActiveLine = () => {
    setUserIsInteracting(false);
    if (activeLineIndex >= 0 && lineRefs.current[activeLineIndex]) {
      lineRefs.current[activeLineIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  if (!isFullPlayerOpen || !currentSong) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentSong.title,
          text: `छठ महापर्व पर सुनें: "${currentSong.title}" - ${currentSong.artist}`,
          url: window.location.href
        });
      } catch {}
    } else {
      alert(`"${currentSong.title}" - ${currentSong.artist} (छठ पर्व ऐप)`);
    }
  };

  const handleCopyLyrics = async () => {
    if (!currentSong?.lyrics) return;
    try {
      await navigator.clipboard.writeText(
        `"${currentSong.title}" - ${currentSong.artist}\n\n${currentSong.lyrics}\n\n(छठ महापर्व ऐप)`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('बोल कॉपी हो गए!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0F19] text-white flex flex-col justify-between overflow-hidden animate-fade-in safe-area-bottom">
      
      {/* Ambient sacred spiritual background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/40 rounded-full blur-[110px]" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-orange-600/30 rounded-full blur-[95px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-600/20 rounded-full blur-[95px]" />
      </div>

      {/* Top Navigation Bar */}
      <div className="relative z-10 flex items-center justify-between p-3.5 border-b border-white/5 bg-stone-950/40 backdrop-blur-md">
        <button
          onClick={() => setIsFullPlayerOpen(false)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all"
          title="प्लेयर छोटा करें"
        >
          <ChevronDown className="w-5 h-5" />
        </button>

        <div className="text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
            {currentSong.category}
          </span>
          <h3 className="text-xs text-stone-300 font-medium truncate max-w-[200px]">
            {currentSong.album || 'छठ महापर्व भक्ति संगीत'}
          </h3>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setShowSleepMenu(!showSleepMenu)}
            className={`p-2 rounded-full transition-colors ${
              sleepTimer !== null ? 'text-amber-400 bg-amber-500/20' : 'text-stone-300 hover:bg-white/10'
            }`}
            title="स्लीप टाइमर"
          >
            <Clock className="w-5 h-5" />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full text-stone-300 hover:bg-white/10 transition-colors"
            title="शेयर करें"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sleep Timer Popup */}
      {showSleepMenu && (
        <div className="absolute top-16 right-4 z-50 bg-stone-900/95 border border-amber-500/40 rounded-2xl p-3 shadow-2xl backdrop-blur-xl w-48 text-xs animate-fade-in">
          <p className="font-bold text-amber-400 mb-2">स्लीप टाइमर (Sleep Timer)</p>
          {[15, 30, 45, 60].map((mins) => (
            <button
              key={mins}
              onClick={() => {
                setSleepTimerDuration(mins);
                setShowSleepMenu(false);
              }}
              className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
                sleepTimer === mins ? 'bg-amber-500/30 text-amber-300 font-bold' : 'hover:bg-white/10 text-stone-300'
              }`}
            >
              {mins} मिनट
            </button>
          ))}
          {sleepTimer !== null && (
            <button
              onClick={() => {
                setSleepTimerDuration(null);
                setShowSleepMenu(false);
              }}
              className="w-full text-left py-1.5 px-2 text-red-400 hover:bg-red-500/20 rounded-lg mt-1"
            >
              टाइमर बंद करें (Turn off)
            </button>
          )}
        </div>
      )}

      {/* Center Dynamic Stage: Artwork / Live Karaoke Lyrics / Full Lyrics */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-2 min-h-0 overflow-hidden">
        
        {/* Toggle View Mode Chips */}
        <div className="flex items-center space-x-1.5 p-1 rounded-2xl bg-white/10 backdrop-blur-md mb-3 border border-white/10 flex-shrink-0">
          <button
            onClick={() => setActiveTab('art')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'art' ? 'bg-amber-500 text-stone-950 shadow-md font-bold' : 'text-stone-300 hover:text-white'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>दर्शन</span>
          </button>
          <button
            onClick={() => setActiveTab('live_lyrics')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'live_lyrics' ? 'bg-amber-500 text-stone-950 shadow-md font-bold' : 'text-stone-300 hover:text-white'
            }`}
          >
            <Mic2 className="w-3.5 h-3.5" />
            <span>लाइव बोल</span>
          </button>
          <button
            onClick={() => setActiveTab('full_lyrics')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'full_lyrics' ? 'bg-amber-500 text-stone-950 shadow-md font-bold' : 'text-stone-300 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>संपूर्ण बोल</span>
          </button>
        </div>

        {/* 1. ARTWORK VIEW */}
        {activeTab === 'art' && (
          <div className="w-full max-w-[260px] aspect-square rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/40 relative group p-1 bg-gradient-to-tr from-amber-600 via-orange-600 to-red-600 flex-shrink-0">
            <img 
              src={currentSong.artwork || '/logo.svg'} 
              alt={currentSong.title}
              className="w-full h-full object-cover rounded-[22px] bg-stone-950" 
            />
            {currentSong.sourceNote && (
              <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md text-[10px] text-amber-200 px-2 py-1 rounded-xl text-center border border-white/10">
                {currentSong.sourceNote}
              </div>
            )}
          </div>
        )}

        {/* 2. LIVE KARAOKE LYRICS (Fluid Line Focus + Word-by-Word Bold Highlight) */}
        {activeTab === 'live_lyrics' && (
          <div className="w-full max-w-lg h-full max-h-[360px] sm:max-h-[420px] flex flex-col relative rounded-3xl overflow-hidden bg-stone-950/80 border border-amber-500/30 backdrop-blur-xl shadow-2xl">
            
            {/* Header Status Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black/40 text-xs flex-shrink-0">
              <div className="flex items-center space-x-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-[11px] font-bold text-amber-300 tracking-wide">लाइव सिंक बोल</span>
                <span className="text-[10px] text-stone-400 font-normal">शब्द-दर-शब्द गायन</span>
              </div>

              <div className="text-[10px] text-stone-400 italic">
                पंक्ति पर टैप करें
              </div>
            </div>

            {/* Scrollable Synchronized Lyrics Area */}
            <div
              ref={lyricsContainerRef}
              onWheel={handleUserScroll}
              onTouchMove={handleUserScroll}
              className="flex-1 overflow-y-auto px-5 py-6 space-y-4 scrollbar-none font-devanagari select-none"
              style={{ scrollBehavior: 'smooth' }}
            >
              {/* Instrumental Prelude notice if song just started */}
              {currentTime < (timeline.lines[0]?.startTime || 5) && (
                <div className="text-center py-3 text-amber-400/90 text-xs font-medium animate-pulse flex items-center justify-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>संगीत प्रस्तावना (Instrumental Prelude)...</span>
                </div>
              )}

              {timeline.lines.map((line, idx) => {
                const isActive = idx === activeLineIndex;
                const isPast = idx < activeLineIndex;

                return (
                  <div
                    key={line.id}
                    ref={el => (lineRefs.current[idx] = el)}
                    onClick={() => {
                      seek(line.startTime);
                      setUserIsInteracting(false);
                    }}
                    className={`transition-all duration-300 cursor-pointer rounded-2xl p-2.5 -mx-2.5 ${
                      isActive
                        ? 'bg-amber-500/20 border-l-4 border-amber-400 pl-3 scale-100 sm:scale-[1.02] shadow-lg'
                        : isPast
                        ? 'opacity-35 hover:opacity-75'
                        : 'opacity-45 hover:opacity-85'
                    }`}
                  >
                    {line.isVerseBreak && (
                      <div className="w-8 h-0.5 bg-amber-500/30 mb-3 rounded-full mx-auto" />
                    )}

                    <p
                      className={`leading-relaxed text-base sm:text-xl font-devanagari transition-all ${
                        isActive
                          ? 'font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]'
                          : 'font-normal text-stone-300'
                      }`}
                    >
                      {line.words.map((word, wIdx) => {
                        if (!isActive) {
                          return <span key={wIdx}>{word.text} </span>;
                        }

                        const wordState = getWordPlaybackState(word, currentTime);

                        if (wordState === 'singing') {
                          // The exact singing word is emboldened, highlighted & glowing
                          return (
                            <span
                              key={wIdx}
                              className="inline-block font-black text-amber-300 scale-105 px-1 py-0.5 mx-0.5 rounded bg-amber-500/25 drop-shadow-[0_0_12px_rgba(251,191,36,0.95)] transition-all duration-100 ease-out"
                            >
                              {word.text}{' '}
                            </span>
                          );
                        }

                        if (wordState === 'sung') {
                          // Words already sung in this line stay bright bold
                          return (
                            <span
                              key={wIdx}
                              className="font-bold text-amber-100 transition-colors duration-200"
                            >
                              {word.text}{' '}
                            </span>
                          );
                        }

                        // Words yet to be sung in the current line
                        return (
                          <span
                            key={wIdx}
                            className="font-normal text-white/50 transition-colors duration-200"
                          >
                            {word.text}{' '}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                );
              })}

              <div className="h-16" />
            </div>

            {/* Floating Re-center Pill Button if user scrolled manually */}
            {userIsInteracting && (
              <button
                onClick={scrollToActiveLine}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-full bg-amber-500 text-stone-950 font-bold text-xs shadow-2xl flex items-center space-x-1.5 active:scale-95 transition-transform"
              >
                <span>📍 वर्तमान बोल पर जाएं</span>
              </button>
            )}
          </div>
        )}

        {/* 3. FULL READABLE LYRICS VIEW */}
        {activeTab === 'full_lyrics' && (
          <div className="w-full max-w-lg h-full max-h-[360px] sm:max-h-[420px] flex flex-col bg-stone-950/80 backdrop-blur-xl rounded-3xl p-4 border border-amber-500/30 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs text-stone-400 flex-shrink-0">
              <span className="font-semibold text-amber-400">संपूर्ण पावन बोल (Full Text)</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyLyrics}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 text-xs transition-colors"
                  title="बोल कॉपी करें"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'कॉपी हुआ!' : 'कॉपी'}</span>
                </button>
                <div className="flex items-center space-x-1 bg-white/10 rounded-lg p-0.5">
                  <button 
                    onClick={() => setLyricsFontSize(Math.max(12, lyricsFontSize - 2))}
                    className="px-2 py-0.5 rounded hover:bg-white/20 text-xs font-bold"
                    title="छोटा आकार"
                  >
                    A-
                  </button>
                  <button 
                    onClick={() => setLyricsFontSize(Math.min(24, lyricsFontSize + 2))}
                    className="px-2 py-0.5 rounded hover:bg-white/20 text-xs font-bold"
                    title="बड़ा आकार"
                  >
                    A+
                  </button>
                </div>
              </div>
            </div>

            <div 
              className="overflow-y-auto mt-3 pr-2 text-stone-200 font-devanagari leading-relaxed space-y-4 select-text flex-1"
              style={{ fontSize: `${lyricsFontSize}px` }}
            >
              <div className="pb-2 border-b border-white/5">
                <h4 className="font-bold text-amber-300 text-lg">{currentSong.title}</h4>
                <p className="text-xs text-amber-400/80 mt-0.5">{currentSong.artist} • {currentSong.category}</p>
              </div>
              <div className="whitespace-pre-line text-stone-100 leading-loose">
                {currentSong.lyrics}
              </div>
              <div className="text-[11px] text-stone-400 pt-4 border-t border-white/10 italic">
                * {currentSong.sourceNote || 'पारंपरिक लोक आस्था के बोल। क्षेत्रीय उच्चारण अनुसार शब्दों में सौम्य अंतर हो सकता है।'}
              </div>
            </div>
          </div>
        )}

        {/* Title, Artist & Favorite Bar */}
        <div className="w-full max-w-md mt-3 flex items-center justify-between flex-shrink-0">
          <div className="overflow-hidden mr-4">
            <h2 className="text-base sm:text-lg font-bold font-devanagari text-white truncate">
              {currentSong.title}
            </h2>
            <p className="text-xs text-amber-400 font-medium truncate mt-0.5">
              {currentSong.artist}
            </p>
          </div>

          <button
            onClick={() => toggleFavorite(currentSong.id)}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 transition-all flex-shrink-0"
            title="पसंदीदा में जोड़ें"
          >
            <Heart 
              className={`w-5 h-5 ${currentSong.isFavorite ? 'fill-red-500 text-red-500' : 'text-stone-300'}`} 
            />
          </button>
        </div>

      </div>

      {/* Bottom Controls Area */}
      <div className="relative z-10 px-6 pb-6 pt-1 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex-shrink-0">
        
        {/* Progress Bar & Seek Slider */}
        <div className="max-w-md mx-auto">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400"
          />
          <div className="flex justify-between text-[11px] text-stone-400 mt-1 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Playback Buttons */}
        <div className="max-w-md mx-auto flex items-center justify-between mt-3">
          {/* Shuffle */}
          <button
            onClick={toggleShuffle}
            className={`p-2 rounded-full transition-colors ${
              isShuffle ? 'text-amber-400 bg-amber-500/20' : 'text-stone-400 hover:text-white'
            }`}
            title="क्रमरहित (Shuffle)"
          >
            <Shuffle className="w-5 h-5" />
          </button>

          {/* 10s Rewind */}
          <button
            onClick={skipBackward}
            className="p-2 rounded-full text-stone-300 hover:text-white active:scale-95 transition-transform"
            title="10 सेकेंड पीछे"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Previous Track */}
          <button
            onClick={playPrevious}
            className="p-2.5 rounded-full text-stone-200 hover:text-white active:scale-95 transition-transform"
            title="पिछला गीत"
          >
            <SkipBack className="w-6 h-6" />
          </button>

          {/* Main Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 text-stone-950 flex items-center justify-center shadow-divine-lg active:scale-95 transition-transform"
            title={isPlaying ? 'रोकें' : 'बजाएं'}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-stone-950" />
            ) : (
              <Play className="w-7 h-7 fill-stone-950 translate-x-0.5" />
            )}
          </button>

          {/* Next Track */}
          <button
            onClick={playNext}
            className="p-2.5 rounded-full text-stone-200 hover:text-white active:scale-95 transition-transform"
            title="अगला गीत"
          >
            <SkipForward className="w-6 h-6" />
          </button>

          {/* 10s Forward */}
          <button
            onClick={skipForward}
            className="p-2 rounded-full text-stone-300 hover:text-white active:scale-95 transition-transform"
            title="10 सेकेंड आगे"
          >
            <RotateCw className="w-5 h-5" />
          </button>

          {/* Repeat */}
          <button
            onClick={cycleRepeatMode}
            className={`p-2 rounded-full transition-colors relative ${
              repeatMode !== 'off' ? 'text-amber-400 bg-amber-500/20' : 'text-stone-400 hover:text-white'
            }`}
            title={`दोहराव: ${repeatMode}`}
          >
            <Repeat className="w-5 h-5" />
            {repeatMode === 'one' && (
              <span className="absolute top-1 right-1 text-[9px] font-bold">1</span>
            )}
          </button>
        </div>

        {/* Volume Slider */}
        <div className="max-w-xs mx-auto flex items-center space-x-2 mt-3 text-stone-400">
          <Volume2 className="w-4 h-4 text-stone-400 flex-shrink-0" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>

      </div>

    </div>
  );
};
