import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';
import { Header } from './components/Header';
import { Navigation, NavTab } from './components/Navigation';
import { MiniPlayer } from './components/MiniPlayer';
import { FullPlayerModal } from './components/FullPlayerModal';
import { HomeView } from './views/HomeView';
import { GeetView } from './views/GeetView';
import { PujaView } from './views/PujaView';
import { ChecklistView } from './views/ChecklistView';
import { MoreView } from './views/MoreView';
import { FestivalDay } from './types';

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedDayId, setSelectedDayId] = useState<string | undefined>(undefined);

  const handleSelectDay = (day: FestivalDay) => {
    setSelectedDayId(day.id);
    setActiveTab('puja');
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#0B0F19] text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 pt-4 pb-28">
        {activeTab === 'home' && (
          <HomeView 
            onNavigateTab={(tab) => {
              setSelectedDayId(undefined);
              setActiveTab(tab);
            }} 
            onSelectDay={handleSelectDay} 
          />
        )}

        {activeTab === 'geet' && <GeetView />}

        {activeTab === 'puja' && <PujaView selectedDayId={selectedDayId} />}

        {activeTab === 'checklist' && <ChecklistView />}

        {activeTab === 'more' && <MoreView />}
      </main>

      {/* Persistent Mini Player */}
      <MiniPlayer />

      {/* Bottom Navigation */}
      <Navigation activeTab={activeTab} onTabChange={(tab) => {
        if (tab !== 'puja') setSelectedDayId(undefined);
        setActiveTab(tab);
      }} />

      {/* Full Screen Player Modal */}
      <FullPlayerModal />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AudioProvider>
          <AppContent />
        </AudioProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
