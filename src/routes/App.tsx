import React, { useEffect } from "react";
import { LanguageProvider } from '../context/LanguageContext';
import { ColorProvider, useColors } from "../context/ColorContext";
import './App.css';
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
    document.documentElement.style.setProperty('--primary-color', colors.primary);
    document.documentElement.style.setProperty('--secondary-color', colors.secondary);
  }, [colors]);

  return null;
};

export default App;
