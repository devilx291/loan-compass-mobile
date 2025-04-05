
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import LanguageSelector from '../components/LanguageSelector';
import { User, LogOut, Globe, Book, Phone, Award, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProfileScreen: React.FC = () => {
  const [isLangSelectorOpen, setIsLangSelectorOpen] = useState<boolean>(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Logged out successfully',
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Error logging out',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  };
  
  const handleLanguageClick = () => {
    setIsLangSelectorOpen(true);
  };
  
  const getLanguageName = () => {
    switch (language) {
      case 'en': return 'English';
      case 'hi': return 'हिन्दी (Hindi)';
      case 'ta': return 'தமிழ் (Tamil)';
      default: return 'English';
    }
  };

  return (
    <div className="min-h-screen bg-loan-background flex flex-col">
      <Header 
        title={t('common.profile')} 
        showBack
      />
      
      <main className="flex-1 mobile-container pb-20">
        <section className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-loan-primary flex items-center justify-center text-white">
              <User size={32} />
            </div>
            
            <div className="ml-4">
              <h2 className="font-bold text-lg">{user?.name || 'User'}</h2>
              <p className="text-gray-500 flex items-center">
                <Phone size={14} className="mr-1" />
                {user?.phone || '+91 XXXXXXXXXX'}
              </p>
            </div>
          </div>
        </section>
        
        <section className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="divide-y divide-gray-100">
            <button
              onClick={() => navigate('/trust-score')}
              className="w-full px-4 py-3 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-loan-primary mr-3">
                  <Award size={18} />
                </div>
                <span>{t('trust.title')}</span>
              </div>
              <div className="text-gray-400">
                <Shield size={18} />
              </div>
            </button>
            
            <button
              onClick={handleLanguageClick}
              className="w-full px-4 py-3 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                  <Globe size={18} />
                </div>
                <span>{t('common.language')}</span>
              </div>
              <div className="text-gray-500 text-sm">
                {getLanguageName()}
              </div>
            </button>
            
            <button
              className="w-full px-4 py-3 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                  <Book size={18} />
                </div>
                <span>Terms & Privacy</span>
              </div>
              <div className="text-gray-400">
                <Shield size={18} />
              </div>
            </button>
          </div>
        </section>
        
        <section>
          <button
            onClick={handleLogout}
            className="w-full bg-white flex items-center justify-center py-3 px-4 rounded-lg text-red-500 font-medium border border-red-100"
          >
            <LogOut size={18} className="mr-2" />
            {t('common.logout')}
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-6">
            App Version 1.0.0
          </p>
        </section>
      </main>
      
      <BottomNavigation />
      
      <LanguageSelector 
        isOpen={isLangSelectorOpen} 
        onClose={() => setIsLangSelectorOpen(false)} 
      />
    </div>
  );
};

export default ProfileScreen;
