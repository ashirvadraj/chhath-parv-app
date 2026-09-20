import React from 'react';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, SkipForward, Heart } from 'lucide-react';

export const MiniPlayer: React.FC = () => {
  const { 
    currentSong, 
    isPlaying, 
    togglePlay, 
    playNext, 
    setIsFullPlayerOpen,
    currentTime,
    duration,
    toggleFavorite
  } = useAudio();

  if (!currentSong) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className="fixed bottom-[58px] left-2 right-2 sm:left-4 sm:right-4 max-w-lg mx-auto z-30 rounded-2xl bg-gradient-to-r from-amber-900/95 via-stone-900/95 to-amber-950/95 backdrop-blur-xl border border-amber-500/30 text-white shadow-2xl p-2 cursor-pointer transition-all duration-300 hover:border-amber-400/50"
      onClick={() => setIsFullPlayerOpen(true)}
    >
      {/* Progress line indicator on top of mini player */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-white/10 rounded-t-2xl overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex items-center justify-between mt-0.5">
        {/* Left: Artwork + Title & Artist */}
        <div className="flex items-center space-x-3 overflow-hidden flex-1 mr-2">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-amber-950 border border-amber-400/40 shadow-inner">
            <img 
              src={currentSong.artwork || '/logo.svg'} 
              alt={currentSong.title}
              className={`w-full h-full object-cover ${isPlaying ? 'animate-spin-slow' : ''}`}
            />
          </div>

          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-amber-100 truncate font-devanagari">
              {currentSong.title}
            </h4>
            <p className="text-[10px] text-amber-300/80 truncate">
              {currentSong.artist}
            </p>
          </div>
        </div>

        {/* Right: Controls */}
        <div 
          className="flex items-center space-x-1.5 flex-shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Favorite */}
          <button
            onClick={() => toggleFavorite(currentSong.id)}
            className="p-1.5 rounded-full text-stone-300 hover:text-red-400 active:scale-95 transition-colors"
            title="Favorite"
          >
            <Heart 
              className={`w-4 h-4 ${currentSong.isFavorite ? 'fill-red-500 text-red-500' : ''}`} 
            />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-stone-950 flex items-center justify-center shadow-lg active:scale-90 transition-transform"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-stone-950" />
            ) : (
              <Play className="w-4 h-4 fill-stone-950 translate-x-0.5" />
            )}
          </button>

          {/* Next Button */}
          <button
            onClick={playNext}
            className="p-1.5 rounded-full text-stone-300 hover:text-white active:scale-95 transition-colors"
            title="Next Song"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
