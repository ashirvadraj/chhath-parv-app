import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../services/db';
import { MantraItem } from '../types';
import { 
  BookOpen, 
  Flame, 
  Heart, 
  ZoomIn, 
  ZoomOut, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';

interface PujaViewProps {
  selectedDayId?: string;
}

export const PujaView: React.FC<PujaViewProps> = ({ selectedDayId }) => {
  const { t, language } = useLanguage();
  const festivalDays = db.getFestivalDays();
  const [activeTab, setActiveTab] = useState<'days' | 'aarti'>('days');
  const [selectedDayKey, setSelectedDayKey] = useState<string>(
    selectedDayId ? festivalDays.find(d => d.id === selectedDayId)?.key || 'nahay_khay' : 'nahay_khay'
  );
  const [mantras, setMantras] = useState<MantraItem[]>(() => db.getMantras());
  const [readModeFontSize, setReadModeFontSize] = useState<number>(16);

  const currentDay = festivalDays.find((d) => d.key === selectedDayKey) || festivalDays[0];

  const toggleFavoriteMantra = (id: string) => {
    const updated = db.toggleFavoriteMantra(id);
    setMantras(updated);
  };

  return (
    <div className="space-y-5 pb-24">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-devanagari text-stone-900 dark:text-white flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-amber-500" />
            पूजा विधि एवं पावन मंत्र
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            चार दिवसीय अनुष्ठान, नियम, आरती व स्तुति
          </p>
        </div>

        {/* Tab switch between 4-day guide & Aarti/Mantra */}
        <div className="flex rounded-2xl bg-amber-100/70 dark:bg-slate-800 p-1 border border-amber-300/30">
          <button
            onClick={() => setActiveTab('days')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'days'
                ? 'bg-amber-500 text-stone-950 shadow'
                : 'text-stone-600 dark:text-stone-300'
            }`}
          >
            चार दिवस
          </button>
          <button
            onClick={() => setActiveTab('aarti')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'aarti'
                ? 'bg-amber-500 text-stone-950 shadow'
                : 'text-stone-600 dark:text-stone-300'
            }`}
          >
            आरती व मंत्र
          </button>
        </div>
      </div>

      {activeTab === 'days' ? (
        <div className="space-y-4">
          
          {/* Day selection tabs */}
          <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-amber-100/50 dark:bg-slate-900 border border-amber-200/50 dark:border-slate-800">
            {festivalDays.map((d) => (
              <button
                key={d.key}
                onClick={() => setSelectedDayKey(d.key)}
                className={`py-2 px-1 rounded-xl text-center transition-all ${
                  selectedDayKey === d.key
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-bold shadow'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                <span className="block text-[10px] uppercase font-bold opacity-80">
                  दिन {d.dayNumber}
                </span>
                <span className="block text-[11px] font-semibold truncate font-devanagari">
                  {language === 'bho' ? d.titleBhojpuri.split(' ')[0] : d.titleHindi.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Selected Day Details Card */}
          <div className="rounded-3xl bg-white dark:bg-[#131927] border border-amber-200/60 dark:border-slate-800 p-5 shadow-sm space-y-4">
            
            {/* Day Header Banner */}
            <div className="border-b border-stone-100 dark:border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 text-xs font-bold">
                  {currentDay.dayOfWeek} • {currentDay.date}
                </span>
                <span className="text-xs text-stone-400 font-medium">
                  {currentDay.ritualName}
                </span>
              </div>

              <h3 className="text-xl font-black font-devanagari text-stone-900 dark:text-white mt-2">
                {language === 'bho' ? currentDay.titleBhojpuri : currentDay.titleHindi}
              </h3>
              <p className="text-xs text-amber-700 dark:text-amber-300 font-medium mt-0.5">
                {currentDay.tagline}
              </p>
            </div>

            {/* Meaning & Significance */}
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-stone-400 mb-1">
                तात्पर्य एवं महत्व (Meaning)
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-devanagari">
                {currentDay.meaning}
              </p>
            </div>

            {/* Description & Overview */}
            <div className="rounded-2xl bg-amber-50/50 dark:bg-slate-900/50 border border-amber-200/40 dark:border-slate-800 p-3.5">
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 mb-1 font-devanagari">
                विधि एवं स्वरूप
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {currentDay.description}
              </p>
            </div>

            {/* Traditional Prasad */}
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-stone-400 mb-2">
                पारंपरिक प्रसाद (Traditional Prasad)
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {currentDay.traditionalPrasad.map((p, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-900 dark:text-orange-300 text-xs font-semibold border border-orange-200 dark:border-orange-800/40"
                  >
                    🪔 {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Step-by-Step Important Activities */}
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-stone-400 mb-2">
                मुख्य अनुष्ठान व गतिविधियां (Key Activities)
              </h4>
              <div className="space-y-2">
                {currentDay.importantActivities.map((act, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs text-stone-700 dark:text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Precautions */}
            <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-3.5 space-y-1.5">
              <h4 className="text-xs font-bold text-red-700 dark:text-red-400 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                विशेष सावधानियां (Important Precautions)
              </h4>
              <ul className="text-xs text-red-900 dark:text-red-200 space-y-1 pl-5 list-disc">
                {currentDay.precautions.map((prec, idx) => (
                  <li key={idx}>{prec}</li>
                ))}
              </ul>
            </div>

            {/* Timing Notice */}
            <div className="p-3 rounded-xl bg-stone-100 dark:bg-slate-900 text-[11px] text-stone-500 dark:text-stone-400 flex items-center justify-between">
              <span>{currentDay.timingNotice}</span>
            </div>

          </div>

        </div>
      ) : (
        <div className="space-y-4">
          
          {/* Read Mode Font Size Controls */}
          <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-white dark:bg-[#131927] border border-amber-200/50 dark:border-slate-800">
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center">
              <Flame className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
              आरती व मंत्र पाठ मोड (Read Mode)
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setReadModeFontSize(Math.max(13, readModeFontSize - 2))}
                className="p-1.5 rounded-lg bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-stone-300 hover:bg-amber-100 transition-colors"
                title="Decrease Font"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 min-w-[28px] text-center">
                {readModeFontSize}px
              </span>
              <button
                onClick={() => setReadModeFontSize(Math.min(26, readModeFontSize + 2))}
                className="p-1.5 rounded-lg bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-stone-300 hover:bg-amber-100 transition-colors"
                title="Increase Font"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mantras List */}
          <div className="space-y-4">
            {mantras.map((mantra) => (
              <div
                key={mantra.id}
                className="rounded-3xl bg-white dark:bg-[#131927] border border-amber-200/60 dark:border-slate-800 p-5 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-slate-800 pb-2.5">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400">
                      {mantra.category}
                    </span>
                    <h3 className="font-bold text-base text-stone-900 dark:text-white font-devanagari mt-1">
                      {mantra.titleHindi}
                    </h3>
                  </div>

                  <button
                    onClick={() => toggleFavoriteMantra(mantra.id)}
                    className="p-2 rounded-full text-stone-400 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${mantra.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                {/* Sanskrit / Hindi Divine Text */}
                <div 
                  className="bg-amber-50/50 dark:bg-[#0B0F19] rounded-2xl p-4 border border-amber-200/50 dark:border-slate-800 text-amber-950 dark:text-amber-200 font-devanagari font-medium whitespace-pre-line leading-relaxed shadow-inner"
                  style={{ fontSize: `${readModeFontSize}px` }}
                >
                  {mantra.sanskrit}
                </div>

                {/* Hindi Translation */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                    भावार्थ (Meaning)
                  </h4>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-devanagari">
                    {mantra.hindiTranslation}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 dark:border-slate-800/80 text-[11px] text-stone-400 italic">
                  * {mantra.meaning}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Regional Tradition Note */}
      <div className="rounded-2xl bg-amber-500/10 border border-amber-400/30 p-3.5 text-xs text-amber-900 dark:text-amber-200 flex items-start space-x-2">
        <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <p>{t('regionalNotice')}</p>
      </div>

    </div>
  );
};
