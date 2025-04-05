
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';
import { setItem, getItem, removeItem } from '../services/storage';

interface User {
  id: string;
  phone: string;
  name: string;
  trustScore: number;
  availableLoanAmount: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
  login: (phone: string) => Promise<{ success: boolean; message: string }>;
  verifyOtp: (phone: string, otp: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: false,
  error: null,
  isLoggedIn: false,
  login: async () => ({ success: false, message: '' }),
  verifyOtp: async () => ({ success: false, message: '' }),
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const savedToken = await getItem('token');
        const savedUser = await getItem('user');
        
        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(savedUser);
        }
      } catch (e) {
        setError('Failed to restore authentication state');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  const login = async (phone: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authAPI.login(phone);
      return response;
    } catch (e) {
      setError('Login failed. Please try again.');
      console.error(e);
      return { success: false, message: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (phone: string, otp: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authAPI.verifyOtp(phone, otp);
      
      if (response.success && response.data) {
        setToken(response.data.token);
        setUser(response.data.user);
        
        // Save to storage
        await setItem('token', response.data.token);
        await setItem('user', response.data.user);
      }
      
      return response;
    } catch (e) {
      setError('OTP verification failed. Please try again.');
      console.error(e);
      return { success: false, message: 'OTP verification failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      // Call logout API (not waiting for response)
      authAPI.logout().catch(console.error);
      
      // Clear local state
      setUser(null);
      setToken(null);
      
      // Clear storage
      await removeItem('token');
      await removeItem('user');
      
      return;
    } catch (e) {
      setError('Logout failed');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    token,
    loading,
    error,
    isLoggedIn: !!token,
    login,
    verifyOtp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
