
import axios from 'axios';
import { getItem } from './storage';

// Base URL would typically come from environment variables
const API_URL = 'https://api.loan-compass.example';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  async (config) => {
    const token = await getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Mock API responses for development
const mockResponses = {
  login: {
    success: true,
    message: 'OTP sent successfully',
  },
  verifyOtp: {
    success: true,
    message: 'Login successful',
    data: {
      token: 'mock-jwt-token',
      user: {
        id: '123456',
        phone: '+919876543210',
        name: 'Demo User',
        trustScore: 750,
        availableLoanAmount: 5000,
      }
    }
  },
  getProfile: {
    success: true,
    data: {
      id: '123456',
      phone: '+919876543210',
      name: 'Demo User',
      trustScore: 750,
      availableLoanAmount: 5000,
      trustBreakdown: [
        { factor: 'On-time Repayments', points: 300 },
        { factor: 'Lending Activity', points: 200 },
        { factor: 'Referrals', points: 150 },
        { factor: 'Community Participation', points: 100 },
      ],
      badges: [
        { id: 1, name: 'Trusted Lender', description: 'Completed 5 loans', icon: 'award' },
        { id: 2, name: 'Prompt Payer', description: 'Repaid 3 loans on time', icon: 'clock' },
        { id: 3, name: 'Community Builder', description: 'Referred 2 friends', icon: 'users' },
      ]
    }
  },
  getLoanHistory: {
    success: true,
    data: [
      { 
        id: '1001',
        amount: 2000,
        purpose: 'Medical Emergency',
        status: 'Repaid',
        createdAt: '2023-01-15T10:30:00Z',
        dueDate: '2023-02-15T10:30:00Z',
        repaidAt: '2023-02-10T14:20:00Z',
        transactionHash: '0xabcd1234efgh5678ijkl9012mnop3456qrst7890',
      },
      { 
        id: '1002',
        amount: 3000,
        purpose: 'Education Fees',
        status: 'Active',
        createdAt: '2023-03-10T08:15:00Z',
        dueDate: '2023-04-10T08:15:00Z',
        transactionHash: '0x1234abcd5678efgh9012ijkl3456mnop7890qrst',
      },
      { 
        id: '1003',
        amount: 1500,
        purpose: 'Business Supply',
        status: 'Rejected',
        createdAt: '2023-02-20T16:45:00Z',
        reason: 'Insufficient trust score',
      }
    ]
  },
  requestLoan: {
    success: true,
    message: 'Loan request submitted successfully',
    data: {
      loanId: '1004',
      status: 'Pending',
      transactionHash: '0x9876zyxw5432vuts1098ponm7654lkji3210'
    }
  },
  repayLoan: {
    success: true,
    message: 'Loan repaid successfully',
    data: {
      loanId: '1002',
      status: 'Repaid',
      transactionHash: '0xzyxw9876vuts5432ponm1098lkji7654hgfe3210'
    }
  }
};

// Auth API
export const authAPI = {
  login: async (phone: string) => {
    try {
      // In a real app, this would call the actual API
      // const response = await api.post('/auth/login', { phone });
      // return response.data;
      
      // Mock response
      return mockResponses.login;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  verifyOtp: async (phone: string, otp: string) => {
    try {
      // In a real app, this would call the actual API
      // const response = await api.post('/auth/verify-otp', { phone, otp });
      // return response.data;
      
      // Mock response
      return mockResponses.verifyOtp;
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  },
  
  logout: async () => {
    try {
      // In a real app, this would call the actual API
      // const response = await api.post('/auth/logout');
      // return response.data;
      
      // Mock response
      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
};

// User API
export const userAPI = {
  getProfile: async () => {
    try {
      // In a real app, this would call the actual API
      // const response = await api.get('/user/profile');
      // return response.data;
      
      // Mock response
      return mockResponses.getProfile;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },
};

// Loan API
export const loanAPI = {
  getLoanHistory: async () => {
    try {
      // In a real app, this would call the actual API
      // const response = await api.get('/loans/history');
      // return response.data;
      
      // Mock response
      return mockResponses.getLoanHistory;
    } catch (error) {
      console.error('Get loan history error:', error);
      throw error;
    }
  },
  
  requestLoan: async (amount: number, purpose: string) => {
    try {
      // In a real app, this would call the actual API
      // const response = await api.post('/loans/request', { amount, purpose });
      // return response.data;
      
      // Mock response
      return mockResponses.requestLoan;
    } catch (error) {
      console.error('Request loan error:', error);
      throw error;
    }
  },
  
  repayLoan: async (loanId: string) => {
    try {
      // In a real app, this would call the actual API
      // const response = await api.post(`/loans/${loanId}/repay`);
      // return response.data;
      
      // Mock response
      return mockResponses.repayLoan;
    } catch (error) {
      console.error('Repay loan error:', error);
      throw error;
    }
  },
};

export default api;
