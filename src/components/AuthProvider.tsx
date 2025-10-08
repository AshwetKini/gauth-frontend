'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, SetupProfileData } from '@/types';
import api from '@/lib/api';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  setupProfile: (data: SetupProfileData) => Promise<{ redirectTo: string }>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  fetchProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/auth/profile');
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setUser(null);
    }
  };

  const login = (token: string) => {
    Cookies.set('accessToken', token, { expires: 1 }); // 1 day
    fetchProfile();
  };

  const logout = () => {
    Cookies.remove('accessToken');
    setUser(null);
    window.location.href = '/';
  };

  const setupProfile = async (data: SetupProfileData) => {
    try {
      const response = await api.post('/auth/setup', data);
      await fetchProfile(); // Refresh user data
      return { redirectTo: response.data.redirectTo };
    } catch (error) {
      console.error('Profile setup failed:', error);
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      await api.patch('/auth/profile', data);
      await fetchProfile(); // Refresh user data
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      fetchProfile().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    loading,
    login,
    logout,
    setupProfile,
    updateProfile,
    fetchProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
