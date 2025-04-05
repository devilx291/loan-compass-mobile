
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LoanProvider } from "./context/LoanContext";
import { LanguageProvider } from "./context/LanguageContext";

// Screens
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import RequestLoanScreen from "./screens/RequestLoanScreen";
import LoanHistoryScreen from "./screens/LoanHistoryScreen";
import LoanDetailScreen from "./screens/LoanDetailScreen";
import TrustScoreScreen from "./screens/TrustScoreScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LoanProvider>
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<LoginScreen />} />
                  
                  {/* Protected routes */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <DashboardScreen />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/request-loan" 
                    element={
                      <ProtectedRoute>
                        <RequestLoanScreen />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/loan-history" 
                    element={
                      <ProtectedRoute>
                        <LoanHistoryScreen />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/loan-details/:id" 
                    element={
                      <ProtectedRoute>
                        <LoanDetailScreen />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/trust-score" 
                    element={
                      <ProtectedRoute>
                        <TrustScoreScreen />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <ProfileScreen />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Redirect root to login or dashboard */}
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  
                  {/* 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </LanguageProvider>
        </LoanProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
