
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface LoaderProps {
  text?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ text, fullScreen = false }) => {
  const { t } = useLanguage();
  
  const loaderContent = (
    <div className="flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-t-loan-primary border-r-loan-primary border-b-transparent border-l-transparent animate-spin"></div>
      <p className="mt-4 text-loan-primary font-medium">
        {text || t('common.loading')}
      </p>
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/90 z-50 flex items-center justify-center">
        {loaderContent}
      </div>
    );
  }
  
  return (
    <div className="py-10 flex items-center justify-center w-full">
      {loaderContent}
    </div>
  );
};

export default Loader;
