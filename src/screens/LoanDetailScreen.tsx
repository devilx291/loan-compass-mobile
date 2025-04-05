
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useLoan, Loan } from '../context/LoanContext';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import LoanCard from '../components/LoanCard';
import Loader from '../components/Loader';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const LoanDetailScreen: React.FC = () => {
  const [loan, setLoan] = useState<Loan | null>(null);
  const [isRepaying, setIsRepaying] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const { loans, repayLoan, loading } = useLoan();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  useEffect(() => {
    if (id && loans.length > 0) {
      const foundLoan = loans.find(loan => loan.id === id);
      
      if (foundLoan) {
        setLoan(foundLoan);
      } else {
        // Loan not found, redirect to history
        toast({
          title: 'Loan not found',
          description: 'The requested loan could not be found',
          variant: 'destructive',
        });
        navigate('/loan-history');
      }
    }
  }, [id, loans, navigate, toast]);
  
  const handleRepayLoan = async () => {
    if (!loan) return;
    
    setIsRepaying(true);
    
    try {
      const result = await repayLoan(loan.id);
      
      if (result.success) {
        toast({
          title: t('loan.repaySuccess'),
        });
        // Navigate back to history after successful repayment
        navigate('/loan-history');
      } else {
        toast({
          title: 'Repayment Failed',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsRepaying(false);
    }
  };

  if (loading || !loan) {
    return (
      <div className="min-h-screen bg-loan-background flex flex-col">
        <Header 
          title={t('loan.loanDetails')} 
          showBack
        />
        <Loader fullScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-loan-background flex flex-col">
      <Header 
        title={t('loan.loanDetails')} 
        showBack
      />
      
      <main className="flex-1 mobile-container pb-20">
        <LoanCard
          loan={loan}
          showDetails
          onRepay={handleRepayLoan}
        />
        
        <button
          onClick={() => navigate('/loan-history')}
          className="flex items-center justify-center mt-6 text-loan-primary"
        >
          <ArrowLeft size={16} className="mr-1" />
          {t('loan.history')}
        </button>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default LoanDetailScreen;
