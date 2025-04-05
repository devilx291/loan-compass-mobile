
import React from 'react';
import { Award, Clock, Users, Star, Shield, Zap } from 'lucide-react';

interface BadgeProps {
  name: string;
  description: string;
  icon: string;
}

const Badge: React.FC<BadgeProps> = ({ name, description, icon }) => {
  // Map icon string to Lucide icon component
  const getIcon = () => {
    switch (icon) {
      case 'award':
        return <Award size={32} className="text-loan-primary" />;
      case 'clock':
        return <Clock size={32} className="text-loan-secondary" />;
      case 'users':
        return <Users size={32} className="text-loan-accent" />;
      case 'star':
        return <Star size={32} className="text-yellow-500" />;
      case 'shield':
        return <Shield size={32} className="text-blue-500" />;
      case 'zap':
        return <Zap size={32} className="text-purple-500" />;
      default:
        return <Award size={32} className="text-loan-primary" />;
    }
  };

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-2 bg-gray-50 rounded-full mr-3">
        {getIcon()}
      </div>
      <div>
        <h3 className="font-medium text-sm">{name}</h3>
        <p className="text-gray-500 text-xs">{description}</p>
      </div>
    </div>
  );
};

export default Badge;
