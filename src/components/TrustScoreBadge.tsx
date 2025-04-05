
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface TrustScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

const TrustScoreBadge: React.FC<TrustScoreBadgeProps> = ({ score, size = 'md' }) => {
  const { t } = useLanguage();
  
  // Define size classes based on the size prop
  const sizeClasses = {
    sm: 'w-20 h-20 text-xl',
    md: 'w-32 h-32 text-3xl',
    lg: 'w-40 h-40 text-4xl',
  };
  
  // Determine badge color based on score
  const getBadgeColor = () => {
    if (score >= 800) return 'bg-loan-success';
    if (score >= 600) return 'bg-loan-primary';
    if (score >= 400) return 'bg-loan-secondary';
    if (score >= 200) return 'bg-loan-warning';
    return 'bg-loan-danger';
  };
  
  // Create circular percentage indicator
  const radius = size === 'sm' ? 36 : size === 'md' ? 60 : 75;
  const circumference = 2 * Math.PI * radius;
  const scorePercentage = Math.min(100, Math.max(0, score / 1000 * 100));
  const offset = circumference - (scorePercentage / 100 * circumference);

  return (
    <div className={`trust-badge ${sizeClasses[size]} ${getBadgeColor()} animate-pulse-slow`}>
      <svg className="absolute inset-0" width="100%" height="100%" viewBox="0 0 100 100">
        <circle
          className="text-gray-300 opacity-25"
          cx="50"
          cy="50"
          r={radius / 2}
          strokeWidth="6"
          fill="none"
          stroke="currentColor"
        />
        <circle
          className="text-white"
          cx="50"
          cy="50"
          r={radius / 2}
          strokeWidth="6"
          fill="none"
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="z-10 flex flex-col items-center justify-center">
        <span className="font-bold">{score}</span>
        <span className="text-xs mt-1">{t('dashboard.trustScore')}</span>
      </div>
    </div>
  );
};

export default TrustScoreBadge;
