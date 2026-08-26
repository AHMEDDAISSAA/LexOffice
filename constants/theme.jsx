import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext(null);

export const LIGHT_COLORS = {
  primary: '#0F1B3D',
  primaryLight: '#1E2E5C',
  accentGreen: '#2E7D5B',
  accentOrange: '#D9A441',
  accentRed: '#C0392B',
  background: '#F5F6FA',
  card: '#FFFFFF',
  textPrimary: '#1A1A2E',
  textSecondary: '#8A8FA3',
  border: '#E5E7EF',
  white: '#FFFFFF',
  gold: '#C9A24B',
};

export const DARK_COLORS = {
  primary: '#C9A24B', // Gold/primary accent in dark mode
  primaryLight: '#1E2E5C',
  accentGreen: '#2E7D5B',
  accentOrange: '#D9A441',
  accentRed: '#E74C3C',
  background: '#0C1B3F', // The requested dark mode base background
  card: '#16254E',       // Card background for contrast
  textPrimary: '#FFFFFF',
  textSecondary: '#A5ABC0',
  border: '#253564',
  white: '#FFFFFF',
  gold: '#C9A24B',
};

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState('system'); // system, light, dark
  const [isDark, setIsDark] = useState(systemScheme === 'dark');

  useEffect(() => {
    if (themeMode === 'system') {
      setIsDark(systemScheme === 'dark');
    } else {
      setIsDark(themeMode === 'dark');
    }
  }, [themeMode, systemScheme]);

  const setThemeMode = (mode) => {
    setThemeModeState(mode);
  };

  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

  return (
    <ThemeContext.Provider value={{ colors, isDark, themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function useThemeStyles(stylesFactory) {
  const { colors, isDark } = useTheme();
  return stylesFactory(colors, isDark);
}
