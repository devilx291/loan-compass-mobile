
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { userAPI } from '../services/api';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import TrustScoreBadge from '../components/TrustScoreBadge';
import Badge from '../components/Badge';
import Loader from '../components/Loader';
import { useToast } from '@/hooks/use-toast';

interface TrustFactor {
  factor: string;
  points: number;
}

interface UserBadge {
  id: number;
  name: string;
  description: string;
  icon: string;
}

interface TrustProfile {
  trustScore: number;
  trustBreakdown: TrustFactor[];
  badges: UserBadge[];
}

const TrustScoreScreen: React.FC = () => {
  const [profile, setProfile] = useState<TrustProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useLanguage();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await userAPI.getProfile();
        
        if (response.success && response.data) {
          setProfile({
            trustScore: response.data.trustScore,
            trustBreakdown: response.data.trustBreakdown,
            badges: response.data.badges,
          });
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

  const getPointsColor = (points: number) => {
    if (points >= 300) return 'text-loan-success';
    if (points >= 200) return 'text-loan-primary';
    if (points >= 100) return 'text-loan-secondary';
    return 'text-loan-warning';
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-loan-background flex flex-col">
      <Header 
        title={t('trust.title')} 
        showBack
      />
      
      <main className="flex-1 mobile-container pb-20">
        <section className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <div className="flex flex-col items-center justify-center py-4">
            <TrustScoreBadge score={profile?.trustScore || 0} size="lg" />
            
            <p className="mt-4 text-gray-500 text-sm text-center">
              {t('trust.totalScore')}
            </p>
          </div>
        </section>
        
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {t('trust.breakdown')}
          </h2>
          
          {profile?.trustBreakdown && profile.trustBreakdown.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-4">
              {profile.trustBreakdown.map((factor, index) => (
                <div 
                  key={index} 
                  className={`py-3 ${
                    index !== profile.trustBreakdown.length - 1 
                      ? 'border-b border-gray-100' 
                      : ''
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">{factor.factor}</span>
                    <span className={`font-bold ${getPointsColor(factor.points)}`}>
                      +{factor.points}
                    </span>
                  </div>
                  
                  <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
                    <div 
                      className={`h-2 rounded-full ${
                        factor.points >= 300 
                          ? 'bg-loan-success' 
                          : factor.points >= 200 
                            ? 'bg-loan-primary' 
                            : factor.points >= 100 
                              ? 'bg-loan-secondary' 
                              : 'bg-loan-warning'
                      }`}
                      style={{ width: `${Math.min(100, (factor.points / 500) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-500 text-center">
                No trust factors available
              </p>
            </div>
          )}
        </section>
        
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {t('trust.badges')}
          </h2>
          
          {profile?.badges && profile.badges.length > 0 ? (
            <div className="space-y-3">
              {profile.badges.map((badge) => (
                <Badge
                  key={badge.id}
                  name={badge.name}
                  description={badge.description}
                  icon={badge.icon}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-500 text-center">
                {t('trust.noBadges')}
              </p>
            </div>
          )}
        </section>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default TrustScoreScreen;
