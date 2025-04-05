
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
    <header className={`bg-loan-primary text-white p-3 flex items-center justify-between shadow-md ${className}`}>
      <div className="flex items-center">
        {showBack && (
          <button
            onClick={handleBack}
            className="mr-2 p-1 rounded-full hover:bg-loan-primary/80"
          >
            <ArrowLeft size={18} />
          </button>
        )}
        <h1 className="text-lg font-semibold truncate max-w-[220px]">
          {title || t('common.appName')}
        </h1>
      </div>
      
      <div className="flex items-center">
        <button
          onClick={onLanguageClick}
          className="p-1.5 rounded-full hover:bg-loan-primary/80 mr-1"
        >
          <Globe size={18} />
        </button>
        
        {showMenu && (
          <button
            onClick={onMenuClick}
            className="p-1.5 rounded-full hover:bg-loan-primary/80"
          >
            <Menu size={18} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
