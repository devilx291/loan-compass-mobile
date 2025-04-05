
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { userAPI } from '../services/api';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import TrustScoreBadge from '../components/TrustScoreBadge';
import Badge from '../components/Badge';
import Loader from '../components/Loader';
import LanguageSelector from '../components/LanguageSelector';
import { ChevronRight, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  name: string;
  trustScore: number;
  availableLoanAmount: number;
  badges: {
    id: number;
    name: string;
    description: string;
    icon: string;
  }[];
}

const DashboardScreen: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLangSelectorOpen, setIsLangSelectorOpen] = useState<boolean>(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await userAPI.getProfile();
        
        if (response.success && response.data) {
          setProfile(response.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: 'Error fetching profile',
          description: 'Please try again later',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [toast]);

  const handleRequestLoan = () => {
    navigate('/request-loan');
  };
  
  const handleViewHistory = () => {
    navigate('/loan-history');
  };
  
  const handleViewTrustScore = () => {
    navigate('/trust-score');
  };
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  const handleLanguageClick = () => {
    setIsLangSelectorOpen(true);
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-loan-background flex flex-col">
      <Header 
        showMenu 
        onMenuClick={handleLogout}
        onLanguageClick={handleLanguageClick}
      />
      
      <main className="flex-1 mobile-container pb-20">
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            {t('dashboard.welcome')}, {user?.name || profile?.name || 'User'}
          </h2>
          <p className="text-gray-500 text-sm">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </section>
        
        <section className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <div className="flex flex-col items-center justify-center py-4">
            <TrustScoreBadge score={profile?.trustScore || 0} size="lg" />
            
            <div className="mt-6 w-full">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">{t('dashboard.availableLoan')}</span>
                <span className="text-xl font-bold text-loan-primary">
                  ₹{profile?.availableLoanAmount.toLocaleString('en-IN') || 0}
                </span>
              </div>
              
              <button
                onClick={handleRequestLoan}
                className="w-full bg-loan-primary text-white py-3 rounded-lg mt-3 font-medium"
              >
                {t('dashboard.requestLoan')}
              </button>
            </div>
          </div>
        </section>
        
        <section className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">
              {t('dashboard.myBadges')}
            </h2>
            <button
              onClick={handleViewTrustScore}
              className="text-loan-primary text-sm flex items-center"
            >
              {t('common.viewMore')} <ChevronRight size={16} />
            </button>
          </div>
          
          {profile?.badges && profile.badges.length > 0 ? (
            <div className="space-y-3">
              {profile.badges.slice(0, 2).map((badge) => (
                <Badge
                  key={badge.id}
                  name={badge.name}
                  description={badge.description}
                  icon={badge.icon}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-4 flex items-center">
              <AlertTriangle size={20} className="text-loan-warning mr-2" />
              <p className="text-sm text-gray-600">
                {t('trust.noBadges')}
              </p>
            </div>
          )}
        </section>
        
        <section>
          <button
            onClick={handleViewHistory}
            className="w-full bg-white text-loan-primary border border-loan-primary py-3 rounded-lg font-medium"
          >
            {t('dashboard.viewHistory')}
          </button>
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

export default DashboardScreen;
