
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLoan } from '../context/LoanContext';
import { useLanguage } from '../context/LanguageContext';
import { userAPI } from '../services/api';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import TrustScoreBadge from '../components/TrustScoreBadge';
import Loader from '../components/Loader';
import LanguageSelector from '../components/LanguageSelector';
import { ArrowRight, ChevronRight } from 'lucide-react';
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
  const { loans } = useLoan();
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
  
  const handleFundLoan = () => {
    navigate('/fund-loan');
  };
  
  const handleCreditAssessment = () => {
    navigate('/trust-score');
  };
  
  const handleViewHistory = () => {
    navigate('/loan-history');
  };
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  const handleLanguageClick = () => {
    setIsLangSelectorOpen(true);
  };

  const pendingLoans = loans.filter(loan => loan.status === 'Pending').length;
  const activeLoans = loans.filter(loan => loan.status === 'Active').length;
  const fundedLoans = loans.filter(loan => loan.status === 'Repaid').length;

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 flex items-center gap-3">
          <div className="bg-blue-500 text-white p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800">TrustFund</h1>
        </div>
        
        <div className="p-4 border-b">
          <h2 className="font-medium">{user?.name}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <div className="mt-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full inline-flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            High Trust ({profile?.trustScore || 0}/100)
          </div>
        </div>
        
        <div className="p-2">
          <h3 className="px-2 py-1 text-xs text-gray-500 uppercase">Menu</h3>
          <ul className="space-y-1">
            <li>
              <a href="/dashboard" className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <a href="/request-loan" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Request Loan
              </a>
            </li>
            <li>
              <a href="/loan-history" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Loan History
              </a>
            </li>
            <li>
              <a href="/trust-score" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Credit Assessment
              </a>
            </li>
            <li>
              <a href="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </a>
            </li>
            <li>
              <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Mobile View */}
      <div className="flex-1 md:pl-6 md:pr-6 md:pt-6 flex flex-col">
        <Header 
          showMenu 
          onMenuClick={handleLogout}
          onLanguageClick={handleLanguageClick}
          className="md:hidden"
        />
        
        <main className="flex-1 px-4 py-4 md:p-0 pb-20 md:pb-4">
          <div className="md:flex md:justify-between md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name || profile?.name || 'User'}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trust Score */}
            <div className="bg-blue-600 text-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Trust Score</h2>
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold mb-2">
                  {profile?.trustScore || 0}
                </div>
                <div className="text-sm">out of 100</div>
                
                <div className="w-full bg-blue-700 h-2 rounded-full mt-4">
                  <div 
                    className="bg-white h-2 rounded-full" 
                    style={{ width: `${profile?.trustScore || 0}%` }}
                  ></div>
                </div>
                
                <p className="text-sm mt-4 text-blue-100">
                  Your trust score increases as you repay loans on time.
                </p>
                
                <div className="mt-4 bg-white/20 rounded-md px-3 py-1 text-sm inline-flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
                  High Trust ({profile?.trustScore || 0}/100)
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              
              <div className="space-y-3">
                <button
                  onClick={handleRequestLoan}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-between"
                >
                  <span>Request a Loan</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <button
                  onClick={handleFundLoan}
                  className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-lg flex items-center justify-between"
                >
                  <span>Fund a Loan</span>
                  <ArrowRight size={20} />
                </button>
                
                <button
                  onClick={handleCreditAssessment}
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-4 rounded-lg flex items-center justify-between"
                >
                  <span>Take Credit Assessment</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Loan Summary */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Loan Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pending Requests</span>
                  <span className="text-blue-600 font-semibold text-lg">{pendingLoans}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Loans</span>
                  <span className="text-blue-600 font-semibold text-lg">{activeLoans}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Loans You've Funded</span>
                  <span className="text-blue-600 font-semibold text-lg">{fundedLoans}</span>
                </div>
                
                <div className="pt-2">
                  <button
                    onClick={handleViewHistory}
                    className="flex items-center text-blue-600 text-sm mt-2"
                  >
                    <span>View Loan History</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Active Loans */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Your Active Loans</h2>
            
            {activeLoans > 0 ? (
              <div>
                {/* We would render the active loans here */}
                <p>Active loans would be displayed here</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Loans</h3>
                <p className="text-gray-600">
                  You don't have any active loans at the moment. Need some
                  financial support?
                </p>
              </div>
            )}
          </div>
        </main>
        
        <BottomNavigation className="md:hidden" />
      </div>
      
      <LanguageSelector 
        isOpen={isLangSelectorOpen} 
        onClose={() => setIsLangSelectorOpen(false)} 
      />
    </div>
  );
};

export default DashboardScreen;
