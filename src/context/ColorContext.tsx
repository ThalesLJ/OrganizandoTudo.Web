import React, { createContext, useContext, useState, useEffect } from 'react';

// Definição do tipo Color
type Colors = {
  primary: string;
  secondary: string;
};

// Definindo o contexto
const ColorContext = createContext<{
  colors: Colors;
  setColors: React.Dispatch<React.SetStateAction<Colors>>;
} | undefined>(undefined);

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colors, setColors] = useState<Colors>({
    primary: '#3498db',
    secondary: '#2ecc71'
  });

  useEffect(() => {
    // Carregar cores do JSON
    fetch('/path/to/colors.json')
      .then(response => response.json())
      .then((data: Colors) => {
        // Verificar se já existem cores no localStorage
        const savedColors = localStorage.getItem('colors');
        if (savedColors) {
          setColors(JSON.parse(savedColors));
        } else {
          setColors(data);
        }
      });
  }, []);

  useEffect(() => {
    // Salvar cores no localStorage quando mudarem
    localStorage.setItem('colors', JSON.stringify(colors));
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
