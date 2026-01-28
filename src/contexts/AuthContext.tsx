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

// API Base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Demo mode credentials (for testing when backend is not available)
const DEMO_MODE = !import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL === '/api';
const DEMO_CREDENTIALS = {
  email: 'admin@mcc.edu.in',
  password: 'Admin@123',
  otp: '123456',
};
const DEMO_USER: User = {
  id: 'demo-admin-001',
  email: 'admin@mcc.edu.in',
  name: 'Admin User',
  role: 'admin',
};

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
    // Demo mode: simulate API response
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
      if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
        setPendingEmail(email);
        return { success: true, requiresOtp: true };
      }
      return { success: false, error: 'Invalid credentials. Demo: admin@mcc.edu.in / Admin@123' };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok && data.requiresOtp) {
        setPendingEmail(email);
        return { success: true, requiresOtp: true };
      } else if (response.ok) {
        // Direct login without OTP
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.message || 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const verifyOtp = async (otp: string): Promise<{ success: boolean; error?: string }> => {
    // Demo mode: simulate OTP verification
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network delay
      if (otp === DEMO_CREDENTIALS.otp) {
        const demoToken = 'demo-jwt-token-' + Date.now();
        localStorage.setItem('admin_token', demoToken);
        localStorage.setItem('admin_user', JSON.stringify(DEMO_USER));
        setUser(DEMO_USER);
        setPendingEmail(null);
        return { success: true };
      }
      return { success: false, error: 'Invalid OTP. Demo OTP: 123456' };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pendingEmail, otp }),
      });
      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        setUser(data.user);
        setPendingEmail(null);
        return { success: true };
      }
      return { success: false, error: data.message || 'Invalid OTP' };
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
    // Demo mode: simulate forgot password
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 600));
      if (email === DEMO_CREDENTIALS.email) {
        return { success: true };
      }
      return { success: false, error: 'Email not found. Demo email: admin@mcc.edu.in' };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        return { success: true };
      }
      return { success: false, error: data.message || 'Failed to send reset link' };
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
