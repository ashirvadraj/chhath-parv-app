import { registerPlugin } from '@capacitor/core';
import { Song } from '../types';

export interface MediaNotificationPluginInterface {
  updateNotification(options: {
    title: string;
    artist: string;
    isPlaying: boolean;
    coverUrl?: string;
  }): Promise<void>;
  hideNotification(): Promise<void>;
  sendChhathReminder(options: {
    title: string;
    message: string;
  }): Promise<{ success: boolean }>;
}

export const NativeMediaPlugin = registerPlugin<MediaNotificationPluginInterface>('MediaNotificationPlugin');

export class NativeMediaService {
  private static isInitialized = false;

  public static async updateMediaNotification(song: Song | null, isPlaying: boolean): Promise<void> {
    if (!song) {
      await this.hideMediaNotification();
      return;
    }

    try {
      await NativeMediaPlugin.updateNotification({
        title: song.title,
        artist: song.artist,
        isPlaying: isPlaying,
        coverUrl: song.artwork || '/icon-512.png',
      });
    } catch (e) {
      console.log('NativeMediaPlugin updateNotification skipped (browser/mock):', e);
    }
  }

  public static async hideMediaNotification(): Promise<void> {
    try {
      await NativeMediaPlugin.hideNotification();
    } catch (e) {
      console.log('NativeMediaPlugin hideNotification skipped:', e);
    }
  }

  public static async sendChhathReminderNotification(daysRemaining: number, nextRitual: string, year: number = 2026): Promise<boolean> {
    try {
      const daysText = daysRemaining <= 0 ? 'आज' : `केवल ${daysRemaining} दिन शेष`;
      const title = `🌅 छठ महापर्व ${year}: ${daysText}`;
      const message = `पावन अनुष्ठान: ${nextRitual}। घाट तैयारी, पूजन सामग्री व पावन छठ गीत अभी ऐप में देखें।`;
      const res = await NativeMediaPlugin.sendChhathReminder({
        title,
        message,
      });
      return res?.success || false;
    } catch (e) {
      console.log('Native reminder notification skipped:', e);
      return false;
    }
  }

  public static setupMediaActionListeners(actions: {
    onPlay: () => void;
    onPause: () => void;
    onNext: () => void;
    onPrev: () => void;
  }): () => void {
    const handleNativeAction = (event: any) => {
      const action = event.detail?.action;
      if (!action) return;

      if (action.endsWith('.ACTION_PLAY')) {
        actions.onPlay();
      } else if (action.endsWith('.ACTION_PAUSE')) {
        actions.onPause();
      } else if (action.endsWith('.ACTION_NEXT')) {
        actions.onNext();
      } else if (action.endsWith('.ACTION_PREV')) {
        actions.onPrev();
      }
    };

    window.addEventListener('nativeMediaAction', handleNativeAction);
    return () => {
      window.removeEventListener('nativeMediaAction', handleNativeAction);
    };
  }
}
