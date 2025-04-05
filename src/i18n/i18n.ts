
import { translations, Language } from './translations';
import { getItem, setItem } from '../services/storage';

// Default language
let currentLanguage: Language = 'en';

// Initialize language from storage if available
export const initLanguage = async (): Promise<Language> => {
  try {
    const storedLanguage = await getItem('language') as Language;
    if (storedLanguage && ['en', 'hi', 'ta'].includes(storedLanguage)) {
      currentLanguage = storedLanguage;
    }
  } catch (error) {
    console.error('Error initializing language:', error);
  }
  return currentLanguage;
};

// Set current language
export const setLanguage = async (language: Language): Promise<void> => {
  if (['en', 'hi', 'ta'].includes(language)) {
    currentLanguage = language;
    await setItem('language', language);
  }
};

// Get current language
export const getLanguage = (): Language => {
  return currentLanguage;
};

// Get translation for a key
export const t = (key: string): string => {
  const keys = key.split('.');
  let result = translations[currentLanguage];
  
  for (const k of keys) {
    if (result && result[k]) {
      result = result[k];
    } else {
      // If the key doesn't exist in the current language, try English
      if (currentLanguage !== 'en') {
        let fallback = translations['en'];
        for (const fk of keys) {
          if (fallback && fallback[fk]) {
            fallback = fallback[fk];
          } else {
            return key; // Return the key if not found in fallback
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
      return key; // Return the key if not found
    }
  }
  
  return typeof result === 'string' ? result : key;
};

export default {
  initLanguage,
  setLanguage,
  getLanguage,
  t,
};
