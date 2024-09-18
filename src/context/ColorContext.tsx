import React, { createContext, useContext, useState, useEffect } from 'react';

// Updated Colors interface
interface Colors {
  primary: string;
  secondary: string;
  primaryText: string;
  primaryTextTint: string;
  secondaryText: string;
  secondaryTextTint: string;
  background: string;
  appBackground: string; // New color added
}

// Definindo o contexto
const ColorContext = createContext<{
  colors: Colors;
  setColors: React.Dispatch<React.SetStateAction<Colors>>;
} | undefined>(undefined);

// Função para obter o valor de um cookie pelo nome
const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

// Função para definir um cookie
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Updated default colors
  const defaultColors: Colors = {
    primary: '#946a56',
    secondary: '#ffe3d5',
    primaryText: '#000000',
    primaryTextTint: '#946a56',
    secondaryText: '#ffffff',
    secondaryTextTint: '#946a56',
    background: '#ffffff',
    appBackground: '#ffffff', // Default app background color
  };

  // Estado inicial que verifica a existência de cores nos cookies ou usa as cores padrão
  const [colors, setColors] = useState<Colors>(() => {
    const savedColors = getCookie('colors');
    return savedColors ? JSON.parse(savedColors) : defaultColors;
  });

  useEffect(() => {
    // Atualiza as cores nos cookies sempre que elas mudarem
    setCookie('colors', JSON.stringify(colors), 5000);  // Expira em 365 dias
  }, [colors]);

  return (
    <ColorContext.Provider value={{ colors, setColors }}>
      {children}
    </ColorContext.Provider>
  );
};

// Hook para usar as cores
export const useColors = () => {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColors must be used within a ColorProvider');
  }
  return context;
};
