import React, { createContext, useContext, useState, useEffect } from 'react';
import colorsJSON from '../global/colors.json';

interface Colors {
  primary: string;
  secondary: string;
  primaryText: string;
  primaryTextTint: string;
  secondaryText: string;
  secondaryTextTint: string;
  background: string;
  appBackground: string;
}

const ColorContext = createContext<{
  colors: Colors;
  setColors: React.Dispatch<React.SetStateAction<Colors>>;
} | undefined>(undefined);

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const defaultColors: Colors = colorsJSON.defaultLightColors;

  const [colors, setColors] = useState<Colors>(() => {
    const savedColors = getCookie('colors');
    return savedColors ? JSON.parse(savedColors) : defaultColors;
  });

  useEffect(() => {
    setCookie('colors', JSON.stringify(colors), 5000);
  }, [colors]);

  return (
    <ColorContext.Provider value={{ colors, setColors }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColors = () => {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColors must be used within a ColorProvider');
  }
  return context;
};
