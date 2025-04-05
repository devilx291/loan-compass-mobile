
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useLoan, Loan } from '../context/LoanContext';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import LoanCard from '../components/LoanCard';
import Loader from '../components/Loader';
import { useToast } from '@/hooks/use-toast';
import { Filter, RefreshCw } from 'lucide-react';

const LoanHistoryScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredLoans, setFilteredLoans] = useState<Loan[]>([]);
  const { loans, loading, refreshLoans } = useLoan();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  useEffect(() => {
    // Initial load
    refreshLoans().catch((err) => {
      console.error('Error refreshing loans:', err);
    });
  }, [refreshLoans]);
  
  useEffect(() => {
    // Apply filter whenever loans or active filter changes
    if (activeFilter === 'all') {
      setFilteredLoans(loans);
    } else {
      setFilteredLoans(loans.filter(loan => loan.status.toLowerCase() === activeFilter.toLowerCase()));
    }
  }, [loans, activeFilter]);
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };
  
  const handleRefresh = async () => {
    try {
      await refreshLoans();
      toast({
        title: 'Refreshed',
        description: 'Loan history updated',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to refresh loans',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-loan-background flex flex-col">
      <Header 
        title={t('loan.history')} 
        showBack
      />
      
      <main className="flex-1 mobile-container pb-20">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {['all', 'active', 'repaid', 'rejected', 'pending'].map((filter) => (
              <button
                key={filter}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-loan-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
                onClick={() => handleFilterChange(filter)}
              >
                {filter === 'all' ? 'All' : t(`loan.${filter.toLowerCase()}`)}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleRefresh}
            className="p-2 rounded-full bg-white border border-gray-200"
          >
            <RefreshCw size={18} />
          </button>
        </div>
        
        {loading ? (
          <Loader />
        ) : filteredLoans.length > 0 ? (
          <div className="space-y-3">
            {filteredLoans.map((loan) => (
              <LoanCard
                key={loan.id}
                loan={loan}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <Filter size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500">
              {activeFilter === 'all'
                ? 'No loans found'
                : `No ${activeFilter} loans found`}
            </p>
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default LoanHistoryScreen;
