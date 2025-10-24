/**
 * Theme Types and Context
 * Manages dark/light mode state and provides theme-aware colors
 */

export type ThemeMode = 'light' | 'dark';

export interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  colors: ThemeColors;
}

export interface ThemeColors {
  // Primary colors
  primary: string;
  primaryDark: string;
  primaryLight: string;
  
  // Secondary colors
  secondary: string;
  secondaryDark: string;
  secondaryLight: string;
  
  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Priority colors
  priorityLow: string;
  priorityMedium: string;
  priorityHigh: string;
  
  // Background colors
  background: string;
  surface: string;
  surfaceSecondary: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textLight: string;
  textInverse: string;
  
  // Border colors
  border: string;
  borderLight: string;
  
  // Shadow colors
  shadow: string;
  
  // Overlay colors
  overlay: string;
}

