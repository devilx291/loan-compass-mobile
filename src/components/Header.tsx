
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
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showMenu = false,
  onMenuClick,
  onLanguageClick,
}) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className="bg-loan-primary text-white p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center">
        {showBack && (
          <button
            onClick={handleBack}
            className="mr-3 p-1 rounded-full hover:bg-loan-primary/80"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <h1 className="text-xl font-bold">
          {title || t('common.appName')}
        </h1>
      </div>
      
      <div className="flex items-center">
        <button
          onClick={onLanguageClick}
          className="p-2 rounded-full hover:bg-loan-primary/80 mr-2"
        >
          <Globe size={20} />
        </button>
        
        {showMenu && (
          <button
            onClick={onMenuClick}
            className="p-2 rounded-full hover:bg-loan-primary/80"
          >
            <Menu size={20} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
