import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLoan } from '../context/LoanContext';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import LoanCard from '../components/LoanCard';
import Loader from '../components/Loader';
import LanguageSelector from '../components/LanguageSelector';
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  Home,
  DollarSign,
  BarChart4,
  ClipboardList,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';

interface Loan {
  id: string;
  amount: number;
  interestRate: number;
  duration: number;
  status: 'pending' | 'funded' | 'completed';
  createdAt: string;
}

interface User {
  name: string;
  phone: string;
}

const DashboardScreen = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const { loans } = useLoan();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (loading) return;
  }, [loading]);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const renderSidebar = () => (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h3 className="font-semibold">{user?.name || t('common.user')}</h3>
            <p className="text-sm text-gray-500">{user?.phone || ''}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-2">
            <button onClick={() => { navigate('/dashboard'); setIsSidebarOpen(false); }} className="sidebar-item">
              <Home className="mr-2 h-4 w-4" />
              {t('dashboard.home')}
            </button>
          </li>
          <li className="mb-2">
            <button onClick={() => { navigate('/request-loan'); setIsSidebarOpen(false); }} className="sidebar-item">
              <DollarSign className="mr-2 h-4 w-4" />
              {t('loan.requestLoan')}
            </button>
          </li>
          <li className="mb-2">
            <button onClick={() => { navigate('/loan-history'); setIsSidebarOpen(false); }} className="sidebar-item">
              <ClipboardList className="mr-2 h-4 w-4" />
              {t('loan.loanHistory')}
            </button>
          </li>
          <li className="mb-2">
            <button onClick={() => { navigate('/trust-score'); setIsSidebarOpen(false); }} className="sidebar-item">
              <BarChart4 className="mr-2 h-4 w-4" />
              {t('trust.trustScore')}
            </button>
          </li>
          <li className="mb-2">
            <button onClick={() => { navigate('/profile'); setIsSidebarOpen(false); }} className="sidebar-item">
              <User className="mr-2 h-4 w-4" />
              {t('profile.profile')}
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <ul>
          <li className="mb-2">
            <button className="sidebar-item">
              <Settings className="mr-2 h-4 w-4" />
              {t('common.settings')}
            </button>
          </li>
          <li className="mb-2">
            <button className="sidebar-item">
              <HelpCircle className="mr-2 h-4 w-4" />
              {t('common.help')}
            </button>
          </li>
          <li>
            <button onClick={handleLogout} className="sidebar-item">
              <LogOut className="mr-2 h-4 w-4" />
              {t('auth.logout')}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-loan-background">
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0">
          {renderSidebar()}
        </SheetContent>
      </Sheet>
      
      <Header 
        showMenu={true}
        onMenuClick={handleOpenSidebar}
        onLanguageClick={() => setIsLanguageModalOpen(true)}
      />
      
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4">{t('dashboard.welcome')} {user?.name}!</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{t('dashboard.yourLoans')}</h3>
          {loans && loans.length > 0 ? (
            loans.map((loan: Loan) => (
              <LoanCard key={loan.id} loan={loan} />
            ))
          ) : (
            <p>{t('dashboard.noLoans')}</p>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">{t('dashboard.quickActions')}</h3>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => navigate('/request-loan')} className="btn-primary">{t('loan.requestLoan')}</button>
            <button onClick={() => navigate('/fund-loan')} className="btn-outline">{t('loan.fundLoan')}</button>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
      
      <LanguageSelector isOpen={isLanguageModalOpen} onClose={() => setIsLanguageModalOpen(false)} />
    </div>
  );
};

export default DashboardScreen;
