
import React, { createContext, useState, useContext, useEffect } from 'react';
import { loanAPI } from '../services/api';
import { getItem, setItem } from '../services/storage';
import { useAuth } from './AuthContext';

export interface Loan {
  id: string;
  amount: number;
  purpose: string;
  status: 'Active' | 'Repaid' | 'Rejected' | 'Pending';
  createdAt: string;
  dueDate?: string;
  repaidAt?: string;
  reason?: string;
  transactionHash?: string;
}

interface LoanContextType {
  loans: Loan[];
  loading: boolean;
  error: string | null;
  requestLoan: (amount: number, purpose: string) => Promise<{ success: boolean; message: string }>;
  repayLoan: (loanId: string) => Promise<{ success: boolean; message: string }>;
  refreshLoans: () => Promise<void>;
}

const LoanContext = createContext<LoanContextType>({
  loans: [],
  loading: false,
  error: null,
  requestLoan: async () => ({ success: false, message: '' }),
  repayLoan: async () => ({ success: false, message: '' }),
  refreshLoans: async () => {},
});

export const useLoan = () => useContext(LoanContext);

export const LoanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn } = useAuth();

  // Load loans from storage and API when authenticated
  useEffect(() => {
    if (isLoggedIn) {
      const loadLoans = async () => {
        try {
          // First try to load from cache
          const cachedLoans = await getItem('loans');
          if (cachedLoans) {
            setLoans(cachedLoans);
          }
          
          // Then refresh from API
          await refreshLoans();
        } catch (e) {
          console.error('Failed to load loans', e);
        }
      };
      
      loadLoans();
    }
  }, [isLoggedIn]);

  const refreshLoans = async () => {
    if (!isLoggedIn) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await loanAPI.getLoanHistory();
      
      if (response.success && response.data) {
        setLoans(response.data);
        
        // Cache loans for offline access
        await setItem('loans', response.data);
      }
    } catch (e) {
      setError('Failed to load loans');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const requestLoan = async (amount: number, purpose: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await loanAPI.requestLoan(amount, purpose);
      
      if (response.success) {
        // Refresh loans after successful request
        await refreshLoans();
      }
      
      return response;
    } catch (e) {
      setError('Failed to request loan');
      console.error(e);
      return { success: false, message: 'Failed to request loan' };
    } finally {
      setLoading(false);
    }
  };

  const repayLoan = async (loanId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await loanAPI.repayLoan(loanId);
      
      if (response.success) {
        // Refresh loans after successful repayment
        await refreshLoans();
      }
      
      return response;
    } catch (e) {
      setError('Failed to repay loan');
      console.error(e);
      return { success: false, message: 'Failed to repay loan' };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    loans,
    loading,
    error,
    requestLoan,
    repayLoan,
    refreshLoans,
  };

  return <LoanContext.Provider value={value}>{children}</LoanContext.Provider>;
};

export default LoanContext;
