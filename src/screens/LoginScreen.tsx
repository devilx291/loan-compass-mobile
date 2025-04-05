
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import OTPInput from '../components/OTPInput';
import Loader from '../components/Loader';
import { Phone, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LoginScreen: React.FC = () => {
  const [phone, setPhone] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { login, verifyOtp, isLoggedIn, loading, error } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const validatePhone = (num: string) => {
    // Basic validation for Indian phone number
    return /^[6-9]\d{9}$/.test(num);
  };

  const handleSendOTP = async () => {
    // For demo purposes, add +91 prefix if not present
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
    
    if (!validatePhone(phone)) {
      toast({
        title: 'Invalid phone number',
        description: 'Please enter a valid 10-digit Indian phone number',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await login(formattedPhone);
      
      if (result.success) {
        setOtpSent(true);
        toast({
          title: t('auth.otpSent'),
          description: 'Please check your phone',
        });
      } else {
        toast({
          title: 'Failed to send OTP',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
    
    setIsSubmitting(true);
    
    try {
      const result = await verifyOtp(formattedPhone, otp);
      
      if (result.success) {
        toast({
          title: t('auth.loginSuccess'),
        });
        // Navigate will happen automatically due to the isLoggedIn effect
      } else {
        toast({
          title: t('auth.invalidOTP'),
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && !isSubmitting) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-loan-background">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-loan-primary mb-2">
              {t('common.appName')}
            </h1>
            <p className="text-gray-600">
              {otpSent ? t('auth.enterOTP') : t('auth.login')}
            </p>
          </div>
          
          {!otpSent ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t('auth.phoneNumber')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-loan-primary focus:border-transparent"
                    placeholder={t('auth.enterPhone')}
                    maxLength={10}
                    disabled={isSubmitting}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Example: 9876543210
                </p>
              </div>
              
              <button
                onClick={handleSendOTP}
                disabled={!phone || phone.length < 10 || isSubmitting}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium ${
                  !phone || phone.length < 10 || isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-loan-primary text-white hover:bg-loan-primary/90'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('common.loading')}
                  </span>
                ) : (
                  <>
                    {t('common.continue')} <ChevronRight size={18} className="ml-1" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-center text-gray-600 mb-4">
                {t('auth.otpSent')}
              </p>
              
              <div className="py-4">
                <OTPInput
                  length={4}
                  onComplete={handleVerifyOTP}
                  disabled={isSubmitting}
                />
              </div>
              
              {error && (
                <p className="text-center text-red-500 text-sm">
                  {error}
                </p>
              )}
              
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setOtpSent(false)}
                  className="text-loan-primary hover:underline text-sm"
                >
                  {t('auth.resendOTP')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="py-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Loan Compass. All rights reserved.
      </div>
    </div>
  );
};

export default LoginScreen;
