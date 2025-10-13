'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import api from '@/lib/api';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  // ADD: role-only setup helper that refreshes profile
  setupProfile: (data: { role: 'hustler' | 'student' | 'seller' }) => Promise<{ redirectTo: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/auth/profile');
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  const login = (token: string) => {
    Cookies.set('accessToken', token, { expires: 1 });
    fetchProfile().finally(() => setLoading(false));
  };

  const logout = () => {
    Cookies.remove('accessToken');
    setUser(null);
    window.location.href = '/';
  };

  // NEW: role-only setup that refreshes profile before returning redirect
  const setupProfile = async (data: { role: 'hustler' | 'student' | 'seller' }) => {
    const res = await api.post('/auth/setup', data);
    // Important: refresh frontend state so guards stop redirecting to /setup
    await fetchProfile();
    return { redirectTo: res.data.redirectTo as string };
  };

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      fetchProfile().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, fetchProfile, setupProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
