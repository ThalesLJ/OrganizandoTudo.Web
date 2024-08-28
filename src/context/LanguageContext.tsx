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

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en'); // Defina o idioma padrão

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    setCookie('language', lang, 5000); // Salve o idioma nos cookies com validade de 365 dias
  };

  useEffect(() => {
    const savedLanguage = getCookie('language') as Language;
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
