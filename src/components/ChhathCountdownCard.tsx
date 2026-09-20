import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../services/db';
import { NativeMediaService } from '../services/nativeMedia';
import { 
  Sun, 
  Clock, 
  Bell, 
  BellRing, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Waves
} from 'lucide-react';
import { NavTab } from './Navigation';

interface ChhathCountdownCardProps {
  onNavigateTab: (tab: NavTab) => void;
}

interface FestivalSchedule {
  year: number;
  nahayKhay: Date;
  parana: Date;
  dateStr: string;
  shortDateStr: string;
  thithiStr: string;
}

const CHHATH_SCHEDULE: FestivalSchedule[] = [
  {
    year: 2024,
    nahayKhay: new Date('2024-11-05T06:00:00+05:30'),
    parana: new Date('2024-11-08T09:00:00+05:30'),
    dateStr: 'मंगलवार, 5 नवंबर 2024',
    shortDateStr: '5 नवंबर 2024',
    thithiStr: 'कार्तिक शुक्ल चतुर्थी'
  },
  {
    year: 2025,
    nahayKhay: new Date('2025-10-25T06:00:00+05:30'),
    parana: new Date('2025-10-28T09:00:00+05:30'),
    dateStr: 'शनिवार, 25 अक्टूबर 2025',
    shortDateStr: '25 अक्टूबर 2025',
    thithiStr: 'कार्तिक शुक्ल चतुर्थी'
  },
  {
    year: 2026,
    nahayKhay: new Date('2026-11-13T06:00:00+05:30'),
    parana: new Date('2026-11-16T09:00:00+05:30'),
    dateStr: 'शुक्रवार, 13 नवंबर 2026',
    shortDateStr: '13-16 नवंबर 2026',
    thithiStr: 'कार्तिक शुक्ल चतुर्थी'
  },
  {
    year: 2027,
    nahayKhay: new Date('2027-11-04T06:00:00+05:30'),
    parana: new Date('2027-11-07T09:00:00+05:30'),
    dateStr: 'गुरुवार, 4 नवंबर 2027',
    shortDateStr: '4 नवंबर 2027',
    thithiStr: 'कार्तिक शुक्ल चतुर्थी'
  }
];

const getNextChhath = (): FestivalSchedule => {
  const now = new Date().getTime();
  for (const f of CHHATH_SCHEDULE) {
    if (now <= f.parana.getTime()) {
      return f;
    }
  }
  return CHHATH_SCHEDULE[2]; // Default to 2026
};

const calculateCountdown = (targetTime: number) => {
  const now = new Date().getTime();
  const diff = Math.max(0, targetTime - now);

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  return { days: d, hours: h, minutes: m, seconds: s };
};

export const ChhathCountdownCard: React.FC<ChhathCountdownCardProps> = ({ onNavigateTab }) => {
  const { t } = useLanguage();
  const [notificationSent, setNotificationSent] = useState(false);

  // Determine current or upcoming festival dynamically
  const nextFestival = useMemo(() => getNextChhath(), []);

  // Compute countdown immediately so initial render is NEVER 0 days
  const [timeLeft, setTimeLeft] = useState(() => calculateCountdown(nextFestival.nahayKhay.getTime()));

  useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(calculateCountdown(nextFestival.nahayKhay.getTime()));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextFestival]);

  // Send native Android notification on demand
  const handleSendReminder = async () => {
    const fresh = calculateCountdown(nextFestival.nahayKhay.getTime());
    const effectiveDays = fresh.days > 0 ? fresh.days : 0;
    
    await NativeMediaService.sendChhathReminderNotification(
      effectiveDays,
      `नहाय-खाय (${nextFestival.shortDateStr})`,
      nextFestival.year
    );
    setNotificationSent(true);
    setTimeout(() => setNotificationSent(false), 4000);
  };

  // Automatically trigger native notification on first load if enabled
  useEffect(() => {
    const settings = db.getSettings();
    if (settings.notificationsEnabled && timeLeft.days > 0) {
      const lastNotified = localStorage.getItem('chhath_last_notified_date');
      const todayStr = new Date().toISOString().split('T')[0];
      if (lastNotified !== todayStr) {
        NativeMediaService.sendChhathReminderNotification(
          timeLeft.days, 
          `नहाय-खाय (${nextFestival.shortDateStr})`,
          nextFestival.year
        );
        localStorage.setItem('chhath_last_notified_date', todayStr);
      }
    }
  }, [timeLeft.days, nextFestival]);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-amber-600 via-orange-600 to-rose-700 text-white p-5 sm:p-6 shadow-xl relative overflow-hidden border border-amber-300/30">
      {/* Divine Decorative Background Glows */}
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 rounded-full bg-yellow-400/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-40 h-40 rounded-full bg-red-950/40 blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Header Badges */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md text-amber-200 text-xs font-semibold border border-amber-300/30">
            <Sun className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
            <span>छठ महापर्व {nextFestival.year}</span>
          </div>

          <button
            onClick={handleSendReminder}
            className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm ${
              notificationSent 
                ? 'bg-emerald-500 text-white' 
                : 'bg-white/20 hover:bg-white/30 text-amber-100 border border-white/30'
            }`}
            title="फ़ोन पर छठ पूजा रिमाइंडर नोटिफिकेशन भेजें"
          >
            {notificationSent ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>रिमाइंडर भेजा गया!</span>
              </>
            ) : (
              <>
                <Bell className="w-3.5 h-3.5 text-amber-200 animate-bounce" />
                <span>रिमाइंडर प्राप्त करें</span>
              </>
            )}
          </button>
        </div>

        {/* Title & Tagline */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-devanagari tracking-tight text-white drop-shadow">
            जय छठी मईया • पावन उल्टी गिनती
          </h2>
          <p className="text-xs sm:text-sm text-amber-100/90 mt-1">
            {timeLeft.days > 0 ? (
              <>लोक आस्था के महापर्व छठ में केवल <strong className="text-amber-200 font-black">{timeLeft.days} दिन</strong> शेष हैं!</>
            ) : (
              <>आज छठ महापर्व का पावन दिन है! छठी मईया की कृपा आप पर बनी रहे।</>
            )}
          </p>
        </div>

        {/* 4-Box Countdown Timer */}
        <div className="grid grid-cols-4 gap-2 text-center pt-2">
          {[
            { val: timeLeft.days, label: 'दिन (Days)' },
            { val: timeLeft.hours, label: 'घंटे (Hours)' },
            { val: timeLeft.minutes, label: 'मिनट (Mins)' },
            { val: timeLeft.seconds, label: 'सेकंड (Secs)' },
          ].map((item, idx) => (
            <div key={idx} className="bg-black/30 backdrop-blur-md rounded-2xl py-2.5 px-1 border border-white/15 shadow-inner">
              <span className="block text-2xl sm:text-3xl font-black font-mono tracking-tight text-amber-200 drop-shadow">
                {item.val < 10 ? `0${item.val}` : item.val}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-amber-100/90 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Puja Calendar & Ghat Schedule Quick Info */}
        <div className="p-3.5 rounded-2xl bg-black/25 backdrop-blur-sm border border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-amber-200/90 font-semibold uppercase tracking-wider">
                प्रथम दिवस: नहाय-खाय
              </p>
              <p className="text-xs font-bold text-white">
                {nextFestival.dateStr} ({nextFestival.thithiStr})
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('puja')}
            className="text-xs text-amber-200 font-bold hover:underline flex items-center space-x-1"
          >
            <span>चारों दिन देखें</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
