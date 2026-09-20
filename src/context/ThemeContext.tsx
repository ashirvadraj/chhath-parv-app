import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../services/db';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return db.getSettings().theme || 'dark';
  });

  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    const root = document.documentElement;
    let activeDark = false;
    if (theme === 'dark') {
      activeDark = true;
    } else if (theme === 'light') {
      activeDark = false;
    } else {
      activeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    setIsDark(activeDark);
    if (activeDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = isDark ? 'light' : 'dark';
    setThemeState(nextTheme);
    db.saveSettings({ theme: nextTheme });
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    db.saveSettings({ theme: mode });
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
