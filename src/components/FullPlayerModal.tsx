import React, { useState } from 'react';
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
  Volume2
} from 'lucide-react';

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

  const [activeTab, setActiveTab] = useState<'art' | 'lyrics'>('art');
  const [showSleepMenu, setShowSleepMenu] = useState(false);
  const [lyricsFontSize, setLyricsFontSize] = useState<number>(15);

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

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0F19] text-white flex flex-col justify-between overflow-y-auto animate-fade-in safe-area-bottom">
      
      {/* Background ambient sacred glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/40 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-orange-600/30 rounded-full blur-[90px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-600/20 rounded-full blur-[90px]" />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between p-4 border-b border-white/5">
        <button
          onClick={() => setIsFullPlayerOpen(false)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all"
          title="Minimize Player"
        >
          <ChevronDown className="w-5 h-5" />
        </button>

        <div className="text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
            {currentSong.category}
          </span>
          <h3 className="text-xs text-stone-300 font-medium truncate max-w-[200px]">
            {currentSong.album || 'छठ महापर्व भक्ति'}
          </h3>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setShowSleepMenu(!showSleepMenu)}
            className={`p-2 rounded-full transition-colors ${
              sleepTimer !== null ? 'text-amber-400 bg-amber-500/20' : 'text-stone-300 hover:bg-white/10'
            }`}
            title="Sleep Timer"
          >
            <Clock className="w-5 h-5" />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full text-stone-300 hover:bg-white/10 transition-colors"
            title="Share"
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

      {/* Main Content: Artwork OR Lyrics */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-4">
        
        {/* Toggle View Tabs */}
        <div className="flex items-center space-x-2 p-1 rounded-2xl bg-white/10 backdrop-blur-md mb-6 border border-white/10">
          <button
            onClick={() => setActiveTab('art')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'art' ? 'bg-amber-500 text-stone-950 shadow-md' : 'text-stone-300 hover:text-white'
            }`}
          >
            दर्शन (Art)
          </button>
          <button
            onClick={() => setActiveTab('lyrics')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'lyrics' ? 'bg-amber-500 text-stone-950 shadow-md' : 'text-stone-300 hover:text-white'
            }`}
          >
            बोल (Lyrics)
          </button>
        </div>

        {activeTab === 'art' ? (
          <div className="w-full max-w-[280px] aspect-square rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/40 relative group p-1 bg-gradient-to-tr from-amber-600 via-orange-600 to-red-600">
            <img 
              src={currentSong.artwork || '/logo.svg'} 
              alt={currentSong.title}
              className="w-full h-full object-cover rounded-[22px] bg-stone-950" 
            />
            {currentSong.sourceNote && (
              <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md text-[10px] text-amber-200 px-2 py-1 rounded-xl text-center border border-white/10">
                {currentSong.sourceNote}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full max-w-md h-[300px] flex flex-col bg-stone-950/70 backdrop-blur-lg rounded-3xl p-4 border border-amber-500/30 overflow-hidden">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-stone-400">
              <span>पारंपरिक पावन बोल (Lyrics)</span>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setLyricsFontSize(Math.max(12, lyricsFontSize - 2))}
                  className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-xs font-bold"
                >
                  A-
                </button>
                <button 
                  onClick={() => setLyricsFontSize(Math.min(22, lyricsFontSize + 2))}
                  className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-xs font-bold"
                >
                  A+
                </button>
              </div>
            </div>

            <div 
              className="overflow-y-auto mt-3 pr-2 text-stone-200 font-devanagari leading-relaxed space-y-3"
              style={{ fontSize: `${lyricsFontSize}px` }}
            >
              <p className="font-semibold text-amber-300">
                {currentSong.title}
              </p>
              <p className="text-xs text-amber-400/80 italic">
                {currentSong.artist} • {currentSong.category}
              </p>
              <div className="whitespace-pre-line text-stone-200 leading-relaxed">
                {currentSong.lyrics ? currentSong.lyrics : (
                  <>
                    काँच ही बाँस के बहँगिया, बहँगी लचकत जाए।{"\n"}
                    बात जे पूछेला बटोहिया, बहँगी केकरा के जाए?{"\n"}
                    तू त आन्हर हउवे रे बटोहिया, बहँगी सुरुज देव के जाए।{"\n"}
                    बहँगी छठी मईया के जाए...{"\n\n"}
                    केरवा जे फरेला घवद से, ओह पर सुगा मँडराय।{"\n"}
                    उग हे सुरुज देव भिनसरवा, अरघ के रे बेर...
                  </>
                )}
              </div>
              <div className="text-[11px] text-stone-400 pt-3 border-t border-white/10 italic">
                * {currentSong.sourceNote || 'पारंपरिक लोक आस्था के बोल। क्षेत्रीय उच्चारण अनुसार शब्दों में सौम्य अंतर हो सकता है।'}
              </div>
            </div>
          </div>
        )}

        {/* Title & Artist & Favorite */}
        <div className="w-full max-w-md mt-6 flex items-center justify-between">
          <div className="overflow-hidden mr-4">
            <h2 className="text-lg sm:text-xl font-bold font-devanagari text-white truncate">
              {currentSong.title}
            </h2>
            <p className="text-xs text-amber-400 font-medium truncate mt-0.5">
              {currentSong.artist}
            </p>
          </div>

          <button
            onClick={() => toggleFavorite(currentSong.id)}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 transition-all flex-shrink-0"
            title="Add to Favorites"
          >
            <Heart 
              className={`w-6 h-6 ${currentSong.isFavorite ? 'fill-red-500 text-red-500' : 'text-stone-300'}`} 
            />
          </button>
        </div>

      </div>

      {/* Bottom Controls Area */}
      <div className="relative z-10 px-6 pb-6 pt-2 bg-gradient-to-t from-black/90 to-transparent">
        
        {/* Progress Bar & Seek */}
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

        {/* Main Playback Buttons */}
        <div className="max-w-md mx-auto flex items-center justify-between mt-4">
          {/* Shuffle */}
          <button
            onClick={toggleShuffle}
            className={`p-2 rounded-full transition-colors ${
              isShuffle ? 'text-amber-400 bg-amber-500/20' : 'text-stone-400 hover:text-white'
            }`}
            title="Shuffle"
          >
            <Shuffle className="w-5 h-5" />
          </button>

          {/* 10s Rewind */}
          <button
            onClick={skipBackward}
            className="p-2 rounded-full text-stone-300 hover:text-white active:scale-95 transition-transform"
            title="10s Rewind"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Previous */}
          <button
            onClick={playPrevious}
            className="p-2.5 rounded-full text-stone-200 hover:text-white active:scale-95 transition-transform"
            title="Previous Track"
          >
            <SkipBack className="w-6 h-6" />
          </button>

          {/* Play/Pause Main Button */}
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 text-stone-950 flex items-center justify-center shadow-divine-lg active:scale-95 transition-transform"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-stone-950" />
            ) : (
              <Play className="w-7 h-7 fill-stone-950 translate-x-0.5" />
            )}
          </button>

          {/* Next */}
          <button
            onClick={playNext}
            className="p-2.5 rounded-full text-stone-200 hover:text-white active:scale-95 transition-transform"
            title="Next Track"
          >
            <SkipForward className="w-6 h-6" />
          </button>

          {/* 10s Forward */}
          <button
            onClick={skipForward}
            className="p-2 rounded-full text-stone-300 hover:text-white active:scale-95 transition-transform"
            title="10s Forward"
          >
            <RotateCw className="w-5 h-5" />
          </button>

          {/* Repeat */}
          <button
            onClick={cycleRepeatMode}
            className={`p-2 rounded-full transition-colors relative ${
              repeatMode !== 'off' ? 'text-amber-400 bg-amber-500/20' : 'text-stone-400 hover:text-white'
            }`}
            title={`Repeat: ${repeatMode}`}
          >
            <Repeat className="w-5 h-5" />
            {repeatMode === 'one' && (
              <span className="absolute top-1 right-1 text-[9px] font-bold">1</span>
            )}
          </button>
        </div>

        {/* Volume Slider */}
        <div className="max-w-xs mx-auto flex items-center space-x-2 mt-5 text-stone-400">
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
