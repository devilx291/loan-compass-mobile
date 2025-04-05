
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, DollarSign, BarChart4, ClipboardList, User } from 'lucide-react';

interface BottomNavigationProps {
  className?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    {
      name: 'Home',
      path: '/dashboard',
      icon: Home,
    },
    {
      name: 'Request',
      path: '/request-loan',
      icon: DollarSign,
    },
    {
      name: 'History',
      path: '/loan-history',
      icon: ClipboardList,
    },
    {
      name: 'Trust',
      path: '/trust-score',
      icon: BarChart4,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: User,
    },
  ];

  return (
    <nav className={`bottom-nav ${className}`}>
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center justify-center w-full py-1 ${
            isActive(item.path) ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <item.icon size={18} className={isActive(item.path) ? 'text-blue-600' : 'text-gray-500'} />
          <span className="text-xs mt-0.5">{item.name}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNavigation;
