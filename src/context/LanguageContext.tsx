
import React, { createContext, useState, useContext, useEffect } from 'react';
import { initLanguage, setLanguage, getLanguage, t } from '../i18n/i18n';
import { Language } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: async () => {},
  t,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLang] = useState<Language>('en');

  useEffect(() => {
    const loadLanguage = async () => {
      const lang = await initLanguage();
      setLang(lang);
    };
    
    loadLanguage();
  }, []);

  const changeLanguage = async (lang: Language) => {
    await setLanguage(lang);
    setLang(lang);
  };

  const value = {
    language,
    setLanguage: changeLanguage,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export default LanguageContext;
