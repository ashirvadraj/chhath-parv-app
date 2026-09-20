import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Globe } from 'lucide-react';
import { SupportedLanguage } from '../types';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages: { code: SupportedLanguage; label: string; sub: string }[] = [
    { code: 'hi', label: 'हिन्दी', sub: 'Hindi' },
    { code: 'bho', label: 'भोजपुरी', sub: 'Bhojpuri' },
    { code: 'en', label: 'English', sub: 'English' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-md border-b border-amber-200/50 dark:border-slate-800/80 px-4 py-3 shadow-sm transition-colors duration-200">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        
        {/* Divine Brand */}
        <div className="flex items-center space-x-3">
          <div className="relative flex-shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-600 to-red-600 p-[2px] shadow-divine">
              <img 
                src="/logo.svg" 
                alt="Chhath Parv" 
                className="w-full h-full object-cover rounded-[14px] bg-amber-950" 
              />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 items-center justify-center text-[9px] text-white">🪔</span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold tracking-tight text-amber-900 dark:text-amber-400 font-devanagari flex items-center">
                {t('jaiChhathiMaiya')}
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300/40">
                2026
              </span>
            </div>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 font-medium">
              {t('appSubtitle')}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-amber-100/70 dark:bg-slate-800 text-amber-950 dark:text-amber-300 text-xs font-semibold hover:bg-amber-200/70 transition-colors border border-amber-300/30 dark:border-slate-700"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="uppercase text-[11px]">
                {language === 'hi' ? 'हिन्दी' : language === 'bho' ? 'भोजपुरी' : 'EN'}
              </span>
            </button>

            {showLangMenu && (
              <div 
                className="absolute right-0 mt-2 w-40 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-amber-200 dark:border-slate-800 py-1.5 z-50 animate-fade-in"
                onClick={() => setShowLangMenu(false)}
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between ${
                      language === l.code
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-[10px] text-stone-400">{l.sub}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-amber-100/70 dark:bg-slate-800 text-amber-900 dark:text-amber-300 hover:bg-amber-200/70 transition-colors border border-amber-300/30 dark:border-slate-700"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-amber-700" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
