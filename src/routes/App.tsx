import '../index.css';
import React, { useEffect } from "react";
import { LanguageProvider } from '../context/LanguageContext';
import { ColorProvider, useColors } from "../context/ColorContext";
import AppRoutes from './AppRoutes';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ColorProvider>
        <ApplyColors />
        <AppRoutes />
      </ColorProvider>
    </LanguageProvider>
  );
};

// Componente para aplicar as cores globalmente
const ApplyColors: React.FC = () => {
  const { colors } = useColors();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--secondary', colors.secondary);
  }, [colors]);
  

  return null;
};

export default App;
