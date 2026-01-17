import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; requiresOtp?: boolean }>;
  verifyOtp: (otp: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is a mock implementation - replace with your actual API calls
const API_BASE_URL = '/api'; // Replace with your actual API URL

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on mount
    const token = localStorage.getItem('admin_token');
    const storedUser = localStorage.getItem('admin_user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string; requiresOtp?: boolean }> => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/auth/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();

      // Mock implementation for demo
      if (email && password.length >= 6) {
        setPendingEmail(email);
        return { success: true, requiresOtp: true };
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const verifyOtp = async (otp: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: pendingEmail, otp }),
      // });
      // const data = await response.json();

      // Mock implementation for demo - accept any 6-digit OTP
      if (otp.length === 6 && pendingEmail) {
        const mockUser: User = {
          id: '1',
          email: pendingEmail,
          name: 'Admin User',
          role: 'admin',
        };
        const mockToken = 'mock_jwt_token_' + Date.now();
        
        localStorage.setItem('admin_token', mockToken);
        localStorage.setItem('admin_user', JSON.stringify(mockUser));
        setUser(mockUser);
        setPendingEmail(null);
        
        return { success: true };
      }
      return { success: false, error: 'Invalid OTP' };
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setUser(null);
    setPendingEmail(null);
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      // const data = await response.json();

      // Mock implementation
      if (email.includes('@')) {
        return { success: true };
      }
      return { success: false, error: 'Invalid email address' };
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        verifyOtp,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
