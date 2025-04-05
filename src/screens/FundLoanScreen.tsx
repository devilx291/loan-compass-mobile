
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import Loader from '../components/Loader';
import { useToast } from '@/hooks/use-toast';

interface LoanRequest {
  id: string;
  borrower: string;
  amount: number;
  purpose: string;
  created_at: string;
  trust_score: number;
}

const FundLoanScreen: React.FC = () => {
  const [loanRequests, setLoanRequests] = useState<LoanRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, this would fetch loan requests from the API
    // For now, we'll simulate it with mock data
    setTimeout(() => {
      const mockData: LoanRequest[] = [
        {
          id: '1',
          borrower: 'Rahul Sharma',
          amount: 5000,
          purpose: 'Medical expenses',
          created_at: new Date().toISOString(),
          trust_score: 85
        },
        {
          id: '2',
          borrower: 'Priya Patel',
          amount: 10000,
          purpose: 'Education fees',
          created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          trust_score: 92
        },
        {
          id: '3',
          borrower: 'Anil Kumar',
          amount: 7500,
          purpose: 'Home repair',
          created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          trust_score: 78
        }
      ];
      
      setLoanRequests(mockData);
      setLoading(false);
    }, 1000); // Simulate network delay
  }, []);

  const handleFund = (id: string) => {
    // In a real app, this would call an API to fund the loan
    toast({
      title: 'Loan funded successfully',
      description: 'You have successfully funded this loan',
    });
    
    // Remove the funded loan from the list
    setLoanRequests(loanRequests.filter(loan => loan.id !== id));
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header 
        title={t('loan.fundLoan')} 
        showBack
      />
      
      <main className="flex-1 px-4 py-6 pb-20 md:pb-6 max-w-5xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Fund a Loan</h1>
        
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <p className="text-gray-600">
            Help someone in need by funding their loan request. You'll earn trust points and can be repaid with interest.
          </p>
        </div>
        
        {loanRequests.length > 0 ? (
          <div className="space-y-4">
            {loanRequests.map((loan) => (
              <div key={loan.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{loan.borrower}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(loan.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Trust Score: {loan.trust_score}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">₹{loan.amount}</span>
                  </div>
                  
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Purpose:</span>
                    <span>{loan.purpose}</span>
                  </div>
                  
                  <button
                    onClick={() => handleFund(loan.id)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Fund this Loan
                  </button>
                </div>
              </div>
            ))}
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Loan Requests</h3>
            <p className="text-gray-600">
              There are currently no loan requests to fund. Please check back later.
            </p>
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default FundLoanScreen;
