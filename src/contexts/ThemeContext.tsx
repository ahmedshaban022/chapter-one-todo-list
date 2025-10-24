/**
 * Theme Context Provider
 * Manages dark/light mode state and provides theme-aware colors
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode, ThemeContextType, ThemeColors } from '../types/Theme';
import { lightColors } from '../theme/lightColors';
import { darkColors } from '../theme/darkColors';

const THEME_STORAGE_KEY = '@theme_mode';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  // Load theme from storage on mount
  useEffect(() => {
    loadThemeFromStorage();
  }, []);

  const loadThemeFromStorage = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setThemeMode(savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme from storage:', error);
    }
  };

  const saveThemeToStorage = async (theme: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.error('Error saving theme to storage:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme: ThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    saveThemeToStorage(newTheme);
  };

  const colors: ThemeColors = themeMode === 'light' ? lightColors : darkColors;

  const value: ThemeContextType = {
    themeMode,
    toggleTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

