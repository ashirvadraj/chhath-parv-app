import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Song } from '../types';
import { db } from '../services/db';

interface AudioContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isShuffle: boolean;
  repeatMode: 'off' | 'all' | 'one';
  queue: Song[];
  isFullPlayerOpen: boolean;
  sleepTimer: number | null; // minutes remaining
  playSong: (song: Song, newQueue?: Song[]) => void;
  togglePlay: () => void;
  pause: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seek: (seconds: number) => void;
  skipForward: () => void; // 10s forward
  skipBackward: () => void; // 10s rewind
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  cycleRepeatMode: () => void;
  setIsFullPlayerOpen: (open: boolean) => void;
  setSleepTimerDuration: (minutes: number | null) => void;
  toggleFavorite: (songId: string) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Helper to resolve audio paths for web and Android Capacitor webviews
const resolveAudioUrl = (url?: string): string => {
  if (!url || url.trim() === '') {
    return 'audio/kaanche_hi_bansh.mp3';
  }
  if (url.startsWith('blob:') || url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  return url.startsWith('/') ? url.slice(1) : url;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const songs = db.getSongs();
  const [currentSong, setCurrentSong] = useState<Song | null>(songs[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(songs[0]?.duration || 300);
  const [volume, setVolumeState] = useState(1);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('all');
  const [queue, setQueue] = useState<Song[]>(songs);
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false);
  const [sleepTimer, setSleepTimer] = useState<number | null>(null);

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const sleepTimerIntervalRef = useRef<any>(null);

  // Initialize Audio Element
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'auto';
    audioElementRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onLoadedMetadata = () => {
      setIsLoading(false);
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };

    const onCanPlay = () => {
      setIsLoading(false);
    };

    const onWaiting = () => {
      setIsLoading(true);
    };

    const onPlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };

    const onPause = () => {
      setIsPlaying(false);
    };

    const onEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        playNext();
      }
    };

    const onError = (e: any) => {
      console.warn('Audio tag playback error:', audio.src, e);
      setIsLoading(false);
      // If an online stream failed, fall back to bundled authentic offline track
      if (audio.src && (audio.src.startsWith('http://') || audio.src.startsWith('https://') || audio.src.includes('archive.org'))) {
        console.log('Online stream unavailable, falling back to bundled offline track: audio/kaanche_hi_bansh.mp3');
        audio.src = 'audio/kaanche_hi_bansh.mp3';
        audio.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.pause();
    };
  }, [repeatMode]);

  // MediaSession API setup for Android lockscreen, notification controls, and bluetooth
  useEffect(() => {
    if ('mediaSession' in navigator && currentSong) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist,
        album: currentSong.album || 'छठ महापर्व • Chhath Parv',
        artwork: [
          { src: currentSong.artwork || '/logo.svg', sizes: '512x512', type: 'image/svg+xml' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => togglePlay());
      navigator.mediaSession.setActionHandler('pause', () => pause());
      navigator.mediaSession.setActionHandler('previoustrack', () => playPrevious());
      navigator.mediaSession.setActionHandler('nexttrack', () => playNext());
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined) seek(details.seekTime);
      });
      navigator.mediaSession.setActionHandler('seekforward', () => skipForward());
      navigator.mediaSession.setActionHandler('seekbackward', () => skipBackward());
    }
  }, [currentSong, isPlaying]);

  // Sleep Timer countdown
  useEffect(() => {
    if (sleepTimerIntervalRef.current) {
      clearInterval(sleepTimerIntervalRef.current);
    }

    if (sleepTimer !== null && sleepTimer > 0) {
      sleepTimerIntervalRef.current = setInterval(() => {
        setSleepTimer((prev) => {
          if (prev === null || prev <= 1) {
            pause();
            return null;
          }
          return prev - 1;
        });
      }, 60000); // Every minute
    }

    return () => {
      if (sleepTimerIntervalRef.current) clearInterval(sleepTimerIntervalRef.current);
    };
  }, [sleepTimer]);

  const playSong = (song: Song, newQueue?: Song[]) => {
    setCurrentSong(song);
    setCurrentTime(0);
    setDuration(song.duration || 300);
    setIsLoading(true);

    if (newQueue && newQueue.length > 0) {
      setQueue(newQueue);
    }

    const audio = audioElementRef.current;
    if (audio) {
      const srcUrl = resolveAudioUrl(song.audioUrl);
      audio.pause();
      audio.src = srcUrl;
      audio.volume = volume;
      audio.loop = (repeatMode === 'one');
      audio.currentTime = 0;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch((err) => {
            console.warn('Audio tag play failed, trying fallback offline track:', err);
            if (srcUrl !== 'audio/kaanche_hi_bansh.mp3') {
              audio.src = 'audio/kaanche_hi_bansh.mp3';
              audio.play()
                .then(() => {
                  setIsPlaying(true);
                  setIsLoading(false);
                })
                .catch(() => {
                  setIsPlaying(false);
                  setIsLoading(false);
                });
            } else {
              setIsPlaying(false);
              setIsLoading(false);
            }
          });
      }
    }
  };

  const togglePlay = () => {
    const audio = audioElementRef.current;
    if (!audio) return;

    if (isPlaying) {
      pause();
    } else {
      if (currentSong) {
        if (!audio.src || audio.src === '' || audio.src === window.location.href) {
          audio.src = resolveAudioUrl(currentSong.audioUrl);
        }
        audio.volume = volume;
        audio.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Play toggle failed, trying fallback offline track:', err);
            audio.src = 'audio/kaanche_hi_bansh.mp3';
            audio.play()
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false));
          });
      } else if (queue.length > 0) {
        playSong(queue[0]);
      }
    }
  };

  const pause = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
    }
    setIsPlaying(false);
    setIsLoading(false);
  };

  const playNext = () => {
    if (!currentSong || queue.length === 0) return;
    const currentIndex = queue.findIndex((s) => s.id === currentSong.id);
    let nextIndex = 0;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = (currentIndex + 1) % queue.length;
    }
    playSong(queue[nextIndex]);
  };

  const playPrevious = () => {
    if (!currentSong || queue.length === 0) return;
    if (currentTime > 4) {
      seek(0);
      return;
    }
    const currentIndex = queue.findIndex((s) => s.id === currentSong.id);
    let prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    playSong(queue[prevIndex]);
  };

  const seek = (seconds: number) => {
    const clamped = Math.max(0, Math.min(seconds, duration));
    setCurrentTime(clamped);
    if (audioElementRef.current && audioElementRef.current.src && !isNaN(audioElementRef.current.duration)) {
      audioElementRef.current.currentTime = clamped;
    }
  };

  const skipForward = () => {
    seek(currentTime + 10);
  };

  const skipBackward = () => {
    seek(currentTime - 10);
  };

  const setVolume = (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (audioElementRef.current) {
      audioElementRef.current.volume = clamped;
    }
  };

  const toggleShuffle = () => {
    setIsShuffle((prev) => !prev);
  };

  const cycleRepeatMode = () => {
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  };

  const setSleepTimerDuration = (minutes: number | null) => {
    setSleepTimer(minutes);
  };

  const toggleFavorite = (songId: string) => {
    const updatedSongs = db.toggleFavoriteSong(songId);
    if (currentSong && currentSong.id === songId) {
      setCurrentSong((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
    setQueue((prevQueue) =>
      prevQueue.map((s) => (s.id === songId ? { ...s, isFavorite: !s.isFavorite } : s))
    );
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying,
        isLoading,
        currentTime,
        duration,
        volume,
        isShuffle,
        repeatMode,
        queue,
        isFullPlayerOpen,
        sleepTimer,
        playSong,
        togglePlay,
        pause,
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
        toggleFavorite,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
