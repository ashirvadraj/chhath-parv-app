import React from 'react';
import { Home, Music, BookOpen, CheckSquare, MoreHorizontal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type NavTab = 'home' | 'geet' | 'puja' | 'checklist' | 'more';

interface NavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const { t } = useLanguage();

  const tabs: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: t('navHome'), icon: Home },
    { id: 'geet', label: t('navGeet'), icon: Music },
    { id: 'puja', label: t('navPuja'), icon: BookOpen },
    { id: 'checklist', label: t('navChecklist'), icon: CheckSquare },
    { id: 'more', label: t('navMore'), icon: MoreHorizontal },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0E1424]/95 backdrop-blur-lg border-t border-amber-200/50 dark:border-slate-800/80 px-2 py-1.5 shadow-2xl safe-area-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-amber-600 dark:text-amber-400 font-bold scale-105'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <div className={`p-1 rounded-xl transition-colors ${
                isActive ? 'bg-amber-500/15 dark:bg-amber-400/20' : ''
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
