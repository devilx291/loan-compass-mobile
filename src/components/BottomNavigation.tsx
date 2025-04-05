
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, DollarSign, BarChart4, ClipboardList, User } from 'lucide-react';

interface BottomNavigationProps {
  className?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Handle scroll to hide/show navigation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  
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
    <nav className={`bottom-nav ${className} ${isVisible ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-300`}>
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center justify-center w-full py-2 touch-manipulation ${
            isActive(item.path) ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <item.icon size={22} className={isActive(item.path) ? 'text-blue-600' : 'text-gray-500'} />
          <span className="text-xs mt-1">{item.name}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNavigation;
