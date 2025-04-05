
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow, format } from 'date-fns';
import { useLanguage } from '../context/LanguageContext';
import { Loan } from '../context/LoanContext';
import { Clock, CheckCircle, AlertTriangle, HelpCircle, ArrowRight } from 'lucide-react';

interface LoanCardProps {
  loan: Loan;
  showDetails?: boolean;
  onRepay?: (loanId: string) => void;
}

const LoanCard: React.FC<LoanCardProps> = ({ loan, showDetails = false, onRepay }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-loan-warning bg-yellow-100';
      case 'Repaid':
        return 'text-loan-success bg-green-100';
      case 'Rejected':
        return 'text-loan-danger bg-red-100';
      case 'Pending':
        return 'text-loan-info bg-blue-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <Clock size={16} className="mr-1" />;
      case 'Repaid':
        return <CheckCircle size={16} className="mr-1" />;
      case 'Rejected':
        return <AlertTriangle size={16} className="mr-1" />;
      case 'Pending':
        return <HelpCircle size={16} className="mr-1" />;
      default:
        return null;
    }
  };
  
  const handleClick = () => {
    if (!showDetails) {
      navigate(`/loan-details/${loan.id}`);
    }
  };
  
  const formattedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMM yyyy');
    } catch (e) {
      return dateString;
    }
  };
  
  const timeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div 
      className={`loan-card ${!showDetails ? 'cursor-pointer' : ''}`} 
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-loan-dark">{loan.purpose}</h3>
          <p className="text-gray-500 text-sm">
            {timeAgo(loan.createdAt)}
          </p>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="font-bold text-loan-dark">₹{loan.amount}</span>
          <div className={`flex items-center text-xs px-2 py-1 rounded-full mt-1 ${getStatusColor(loan.status)}`}>
            {getStatusIcon(loan.status)}
            {t(`loan.${loan.status.toLowerCase()}`)}
          </div>
        </div>
      </div>
      
      {showDetails && (
        <div className="mt-4">
          {loan.dueDate && (
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">{t('loan.dueDate')}:</span>
              <span className="font-medium">{formattedDate(loan.dueDate)}</span>
            </div>
          )}
          
          {loan.transactionHash && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">{t('loan.transactionHash')}:</p>
              <div className="bg-gray-100 p-2 rounded text-xs font-mono overflow-x-auto">
                {loan.transactionHash}
              </div>
            </div>
          )}
          
          {loan.status === 'Active' && onRepay && (
            <button
              onClick={() => onRepay(loan.id)}
              className="w-full mt-4 bg-loan-primary text-white py-2 rounded-lg flex items-center justify-center"
            >
              {t('loan.repayLoan')}
            </button>
          )}
        </div>
      )}
      
      {!showDetails && (
        <div className="flex justify-end mt-2">
          <ArrowRight size={16} className="text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default LoanCard;
