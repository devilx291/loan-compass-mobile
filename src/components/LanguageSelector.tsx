
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';
import { Dialog } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, t } = useLanguage();
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
  ];
  
  const handleLanguageSelect = async (lang: Language) => {
    await setLanguage(lang);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg w-[90%] max-w-md mx-auto p-5 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{t('common.language')}</h2>
            <button onClick={onClose} className="p-1">
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`w-full py-3 px-4 text-left rounded-lg border ${
                  language === lang.code
                    ? 'bg-loan-primary text-white border-loan-primary'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleLanguageSelect(lang.code as Language)}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default LanguageSelector;
