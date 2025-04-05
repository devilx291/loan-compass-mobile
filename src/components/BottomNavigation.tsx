
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Home, ClipboardList, Award, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bottom-nav">
      <button
        onClick={() => navigate('/dashboard')}
        className={`flex flex-col items-center py-1 ${
          isActive('/dashboard') ? 'text-loan-primary' : 'text-gray-500'
        }`}
      >
        <Home size={24} />
        <span className="text-xs mt-1">{t('common.home')}</span>
      </button>
      
      <button
        onClick={() => navigate('/loan-history')}
        className={`flex flex-col items-center py-1 ${
          isActive('/loan-history') ? 'text-loan-primary' : 'text-gray-500'
        }`}
      >
        <ClipboardList size={24} />
        <span className="text-xs mt-1">{t('common.history')}</span>
      </button>
      
      <button
        onClick={() => navigate('/trust-score')}
        className={`flex flex-col items-center py-1 ${
          isActive('/trust-score') ? 'text-loan-primary' : 'text-gray-500'
        }`}
      >
        <Award size={24} />
        <span className="text-xs mt-1">{t('trust.title')}</span>
      </button>
      
      <button
        onClick={() => navigate('/profile')}
        className={`flex flex-col items-center py-1 ${
          isActive('/profile') ? 'text-loan-primary' : 'text-gray-500'
        }`}
      >
        <User size={24} />
        <span className="text-xs mt-1">{t('common.profile')}</span>
      </button>
    </nav>
  );
};

export default BottomNavigation;
