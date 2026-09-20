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

// Web Audio Multi-voice Tanpura & Bansuri synthesizer fallback (audible & meditative)
class DevotionalSoundSynth {
  private ctx: AudioContext | null = null;
  private nodes: OscillatorNode[] = [];
  private gain: GainNode | null = null;
  private isRunning: boolean = false;

  public init() {
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

      this.stop(); // Clear any existing nodes

      const now = this.ctx.currentTime;
      this.gain = this.ctx.createGain();
      // Audible volume: 0.35 (clearly heard on phone speakers)
      this.gain.gain.setValueAtTime(0.01, now);
      this.gain.gain.exponentialRampToValueAtTime(0.35, now + 1.2);
      this.gain.connect(this.ctx.destination);

      // Tanpura 4-string harmony (Pa=196Hz, Sa=261.63Hz, Sa=261.63Hz, Sa=130.81Hz)
      const freqs = [196.0, 261.63, 261.63, 130.81];
      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.gain) return;
        const osc = this.ctx.createOscillator();
        const strGain = this.ctx.createGain();
        osc.type = idx === 0 ? 'sine' : idx === 3 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        strGain.gain.setValueAtTime(0.2, now);
        osc.connect(strGain);
        strGain.connect(this.gain);
        osc.start(now);
        this.nodes.push(osc);
      });

      this.isRunning = true;
    } catch (e) {
      console.warn('Devotional synth start error:', e);
    }
  }

  stop() {
    try {
      if (this.gain && this.ctx) {
        this.gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
      }
      setTimeout(() => {
        this.nodes.forEach((n) => {
          try {
            n.stop();
            n.disconnect();
          } catch {}
        });
        this.nodes = [];
        this.isRunning = false;
      }, 350);
    } catch {}
  }
}

const devotionalSynth = new DevotionalSoundSynth();

// Helper to resolve clean audio path for Web and Android Capacitor webview
const resolveAudioUrl = (url?: string): string => {
  if (!url || url.trim() === '') {
    return 'audio/chhath_folk_tradition.wav';
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

  // Pre-unlock AudioContext on first user interaction (touch or click)
  useEffect(() => {
    const unlock = () => {
      devotionalSynth.init();
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const temp = new AudioCtx();
        if (temp.state === 'suspended') {
          temp.resume().catch(() => {});
        }
      }
    };
    window.addEventListener('touchstart', unlock, { once: true });
    window.addEventListener('click', unlock, { once: true });
    return () => {
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('click', unlock);
    };
  }, []);

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
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration) && audio.duration > 0) {
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

    const onError = (e: any) => {
      console.warn('Audio tag playback error, falling back to devotional synth:', e);
      if (isPlaying) {
        devotionalSynth.play();
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
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

  // Fallback ticker when using devotional synthesizer
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
    if (newQueue && newQueue.length > 0) {
      setQueue(newQueue);
    }

    const audio = audioElementRef.current;
    if (audio) {
      const srcUrl = resolveAudioUrl(song.audioUrl);
      devotionalSynth.stop();
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
          })
          .catch((err) => {
            console.warn('Audio tag play failed, falling back to devotional synth:', err);
            devotionalSynth.play();
            setIsPlaying(true);
          });
      }
    } else {
      devotionalSynth.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      if (currentSong) {
        const audio = audioElementRef.current;
        if (audio) {
          if (!audio.src || audio.src === '' || audio.src === window.location.href) {
            audio.src = resolveAudioUrl(currentSong.audioUrl);
          }
          audio.volume = volume;
          audio.play()
            .then(() => setIsPlaying(true))
            .catch(() => {
              devotionalSynth.play();
              setIsPlaying(true);
            });
        } else {
          devotionalSynth.play();
          setIsPlaying(true);
        }
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
