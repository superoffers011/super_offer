import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('diwali_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('diwali_token') || null);
  const [loading, setLoading] = useState(true);

  // Load current user profile if token or cookie exists
  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await authAPI.getMe();
        if (res.data && res.data.user) {
          setUser(res.data.user);
          localStorage.setItem('diwali_user', JSON.stringify(res.data.user));
        }
      } catch (error) {
        // If 401 or session expired
        if (token) {
          console.warn('Session expired or invalid, clearing local auth:', error.message);
          setToken(null);
          setUser(null);
          localStorage.removeItem('diwali_token');
          localStorage.removeItem('diwali_user');
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authAPI.login({ email, password });

      // If user needs email verification
      if (res.data?.requiresOtp) {
        return {
          success: false,
          requiresOtp: true,
          email: res.data.email,
          demoOtp: res.data.demoOtp,
          message: res.data.message,
        };
      }

      const { token: receivedToken, user: receivedUser } = res.data;

      setToken(receivedToken);
      setUser(receivedUser);
      localStorage.setItem('diwali_token', receivedToken);
      localStorage.setItem('diwali_user', JSON.stringify(receivedUser));

      return { success: true, user: receivedUser };
    } catch (error) {
      if (error.response?.data?.requiresOtp) {
        return {
          success: false,
          requiresOtp: true,
          email: error.response.data.email,
          demoOtp: error.response.data.demoOtp,
          message: error.response.data.message,
        };
      }
      const message =
        error.response?.data?.message || 'Login failed. Please check credentials.';
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      const res = await authAPI.register(userData);

      // Registration requires 6-digit OTP verification
      if (res.data?.requiresOtp) {
        return {
          success: true,
          requiresOtp: true,
          email: res.data.email,
          demoOtp: res.data.demoOtp,
          message: res.data.message,
        };
      }

      const { token: receivedToken, user: receivedUser } = res.data;

      setToken(receivedToken);
      setUser(receivedUser);
      localStorage.setItem('diwali_token', receivedToken);
      localStorage.setItem('diwali_user', JSON.stringify(receivedUser));

      return { success: true, user: receivedUser };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Registration failed. Please try again.';
      return { success: false, message };
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      const res = await authAPI.verifyOtp({ email, otp });
      const { token: receivedToken, user: receivedUser } = res.data;

      setToken(receivedToken);
      setUser(receivedUser);
      localStorage.setItem('diwali_token', receivedToken);
      localStorage.setItem('diwali_user', JSON.stringify(receivedUser));

      return { success: true, user: receivedUser, message: res.data.message };
    } catch (error) {
      const message =
        error.response?.data?.message || 'OTP verification failed. Please check code.';
      return { success: false, message };
    }
  };

  const resendOtp = async (email) => {
    try {
      const res = await authAPI.resendOtp({ email });
      return {
        success: true,
        message: res.data?.message || 'New OTP sent to email!',
        demoOtp: res.data?.demoOtp,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to resend OTP. Please wait before retrying.';
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (e) {
      // Ignore network errors on logout
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem('diwali_token');
    localStorage.removeItem('diwali_user');
  };

  const refreshUser = async () => {
    try {
      const res = await authAPI.getMe();
      if (res.data?.user) {
        setUser(res.data.user);
        localStorage.setItem('diwali_user', JSON.stringify(res.data.user));
      }
    } catch (e) {}
  };

  const isAuthenticated = !!user;
  const isEmailVerified = !!user?.isEmailVerified;
  const isAdmin = !!user && user.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        isEmailVerified,
        isAdmin,
        login,
        register,
        verifyOtp,
        resendOtp,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
