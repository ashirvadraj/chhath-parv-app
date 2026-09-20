import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Song } from '../types';
import { db } from '../services/db';

interface AudioContextType {
  currentSong: Song | null;
  isPlaying: boolean;
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

// Web Audio synthesizer for legal devotional flute & tanpura tone if song has no external audio URL
class DevotionalSoundSynth {
  private ctx: AudioContext | null = null;
  private osc: OscillatorNode | null = null;
  private gain: GainNode | null = null;
  private isRunning: boolean = false;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  play() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      if (this.isRunning) return;

      this.osc = this.ctx.createOscillator();
      this.gain = this.ctx.createGain();

      // Sa-Pa meditative tanpura devotional chord frequency (~220Hz / 330Hz)
      this.osc.type = 'triangle';
      this.osc.frequency.setValueAtTime(220, this.ctx.currentTime);

      this.gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.gain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 1.5);

      this.osc.connect(this.gain);
      this.gain.connect(this.ctx.destination);
      this.osc.start();
      this.isRunning = true;
    } catch {}
  }

  stop() {
    try {
      if (this.gain && this.ctx) {
        this.gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      }
      setTimeout(() => {
        if (this.osc) {
          try { this.osc.stop(); } catch {}
          this.osc.disconnect();
          this.osc = null;
        }
        this.isRunning = false;
      }, 500);
    } catch {}
  }
}

const devotionalSynth = new DevotionalSoundSynth();

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const songs = db.getSongs();
  const [currentSong, setCurrentSong] = useState<Song | null>(songs[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(songs[0]?.duration || 320);
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
    audio.preload = 'metadata';
    audioElementRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        playNext();
      }
    };

    const onError = () => {
      // If network stream fails or is placeholder, fall back to soft synth so playback never crashes
      if (isPlaying) {
        devotionalSynth.play();
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
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

  // Synthetic timer ticker for preview/placeholder audio tracks
  useEffect(() => {
    let timer: any = null;
    if (isPlaying && (!audioElementRef.current?.src || audioElementRef.current.src === window.location.href)) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            playNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, duration, currentSong]);

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
      }, 60000); // every minute
    }

    return () => {
      if (sleepTimerIntervalRef.current) clearInterval(sleepTimerIntervalRef.current);
    };
  }, [sleepTimer]);

  const playSong = (song: Song, newQueue?: Song[]) => {
    setCurrentSong(song);
    setCurrentTime(0);
    setDuration(song.duration || 300);
    if (newQueue && newQueue.length > 0) {
      setQueue(newQueue);
    }

    const audio = audioElementRef.current;
    if (audio) {
      if (song.audioUrl && song.audioUrl.trim() !== '') {
        devotionalSynth.stop();
        audio.src = song.audioUrl;
        audio.play().then(() => setIsPlaying(true)).catch(() => {
          devotionalSynth.play();
          setIsPlaying(true);
        });
      } else {
        audio.pause();
        audio.src = '';
        devotionalSynth.play();
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      if (currentSong) {
        if (currentSong.audioUrl && audioElementRef.current && currentSong.audioUrl.trim() !== '') {
          audioElementRef.current.play().catch(() => {
            devotionalSynth.play();
          });
        } else {
          devotionalSynth.play();
        }
        setIsPlaying(true);
      } else if (queue.length > 0) {
        playSong(queue[0]);
      }
    }
  };

  const pause = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
    }
    devotionalSynth.stop();
    setIsPlaying(false);
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
    setVolumeState(vol);
    if (audioElementRef.current) {
      audioElementRef.current.volume = vol;
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
      setCurrentSong((prev) => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
    setQueue((prevQueue) => 
      prevQueue.map(s => s.id === songId ? { ...s, isFavorite: !s.isFavorite } : s)
    );
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying,
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
