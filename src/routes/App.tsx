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
    root.style.setProperty('--primaryText', colors.primaryText);
    root.style.setProperty('--titleText', colors.primaryTextTint);
    root.style.setProperty('--secondaryText', colors.secondaryText);
    root.style.setProperty('--titleSecondaryText', colors.secondaryTextTint);
    root.style.setProperty('--appBackground', colors.appBackground);
    root.style.setProperty('--background', colors.background);
  }, [colors]);
  

  return null;
};

export default App;
