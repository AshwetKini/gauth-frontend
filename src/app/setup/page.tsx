'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter, useSearchParams } from 'next/navigation';

type Role = 'hustler' | 'student' | 'seller';

export default function SetupPage() {
  const { user, login, setupProfile } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authLoading, setAuthLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      login(token);
      window.history.replaceState({}, document.title, '/setup');
    }
    const t = setTimeout(() => setAuthLoading(false), 600);
    return () => clearTimeout(t);
  }, [searchParams, login]);

  useEffect(() => {
    if (user?.isProfileComplete && user.role) {
      router.replace(`/dashboard/${user.role}`);
    }
  }, [user, router]);

  const selectRole = async (role: Role) => {
    setSubmitting(true);
    try {
      const { redirectTo } = await setupProfile({ role });
      router.replace(redirectTo);
    } catch (e) {
      alert('Failed to complete setup, please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 rounded-full border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">Please sign in with Google first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Choose Account Type</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Select a role to finish setup.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-4">
          <button
            onClick={() => selectRole('hustler')}
            disabled={submitting}
            className="w-full py-4 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60"
          >
            🚀 Hustler (Service Provider)
          </button>

          <button
            onClick={() => selectRole('student')}
            disabled={submitting}
            className="w-full py-4 px-4 rounded-md text-gray-800 bg-gray-100 hover:bg-gray-200 disabled:opacity-60"
          >
            📚 Student
          </button>

          <button
            onClick={() => selectRole('seller')}
            disabled={submitting}
            className="w-full py-4 px-4 rounded-md text-gray-800 bg-gray-100 hover:bg-gray-200 disabled:opacity-60"
          >
            🛍️ Seller
          </button>

          {submitting && (
            <div className="text-center text-sm text-gray-500">Finishing setup…</div>
          )}
        </div>
      </div>
    </div>
  );
}
