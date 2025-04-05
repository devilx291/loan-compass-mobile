
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Menu, Globe } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
  onMenuClick?: () => void;
  onLanguageClick?: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showMenu = false,
  onMenuClick,
  onLanguageClick,
  className = '',
}) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className={`bg-loan-primary text-white p-4 flex items-center justify-between shadow-md ${className} sticky top-0 z-10`}>
      <div className="flex items-center">
        {showBack && (
          <button
            onClick={handleBack}
            className="mr-3 p-2 rounded-full hover:bg-loan-primary/80 active:bg-loan-primary/60 touch-manipulation"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <h1 className="text-lg font-semibold truncate max-w-[220px]">
          {title || t('common.appName')}
        </h1>
      </div>
      
      <div className="flex items-center">
        <button
          onClick={onLanguageClick}
          className="p-2 rounded-full hover:bg-loan-primary/80 active:bg-loan-primary/60 mr-2 touch-manipulation"
          aria-label="Change language"
        >
          <Globe size={20} />
        </button>
        
        {showMenu && (
          <button
            onClick={onMenuClick}
            className="p-2 rounded-full hover:bg-loan-primary/80 active:bg-loan-primary/60 touch-manipulation"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
