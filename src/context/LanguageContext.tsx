import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import enStrings from '../global/en.json'; // Ajuste o caminho conforme necessário
import ptStrings from '../global/pt.json'; // Ajuste o caminho conforme necessário

type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  strings: { [key: string]: string };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en'); // Defina o idioma padrão

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    sessionStorage.setItem('language', lang); // Salve o idioma na sessão
  };

  useEffect(() => {
    const savedLanguage = sessionStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Carregue as strings com base no idioma
  const strings = language === 'en' ? enStrings : ptStrings;

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, strings }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
