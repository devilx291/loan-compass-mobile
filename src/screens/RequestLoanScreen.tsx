
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useLoan } from '../context/LoanContext';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import Loader from '../components/Loader';
import { useToast } from '@/hooks/use-toast';
import { Currency } from 'lucide-react';

const RequestLoanScreen: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { user } = useAuth();
  const { requestLoan } = useLoan();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters and parse as number
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
  };
  
  const handlePurposeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Limit purpose to 100 characters
    const value = e.target.value.slice(0, 100);
    setPurpose(value);
  };
  
  const isFormValid = () => {
    const numAmount = Number(amount);
    return (
      numAmount > 0 &&
      numAmount <= (user?.availableLoanAmount || 5000) &&
      purpose.trim().length >= 5
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) return;
    
    setIsSubmitting(true);
    
    try {
      const result = await requestLoan(Number(amount), purpose);
      
      if (result.success) {
        toast({
          title: t('loan.requestSuccess'),
        });
        navigate('/loan-history');
      } else {
        toast({
          title: 'Request Failed',
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
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-loan-background flex flex-col">
      <Header 
        title={t('loan.requestTitle')} 
        showBack
      />
      
      <main className="flex-1 mobile-container pb-20">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {t('loan.amount')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Currency size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-loan-primary focus:border-transparent"
                placeholder="0"
                disabled={isSubmitting}
              />
            </div>
            <p className="text-xs text-gray-500 flex justify-between">
              <span>
                {t('dashboard.availableLoan')}: ₹{user?.availableLoanAmount || 5000}
              </span>
              {Number(amount) > (user?.availableLoanAmount || 5000) && (
                <span className="text-red-500">
                  Exceeds available amount
                </span>
              )}
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {t('loan.purpose')}
            </label>
            <textarea
              value={purpose}
              onChange={handlePurposeChange}
              className="block w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-loan-primary focus:border-transparent"
              placeholder={t('loan.purposePlaceholder')}
              rows={4}
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-500 flex justify-between">
              <span>
                {purpose.length}/100 characters
              </span>
              {purpose.length < 5 && purpose.length > 0 && (
                <span className="text-red-500">
                  Purpose is too short
                </span>
              )}
            </p>
          </div>
          
          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium ${
              !isFormValid() || isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-loan-primary text-white hover:bg-loan-primary/90'
            }`}
          >
            {isSubmitting ? (
              <Loader text={t('common.loading')} />
            ) : (
              t('loan.submit')
            )}
          </button>
        </form>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default RequestLoanScreen;
