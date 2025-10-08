'use client';

import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireProfileComplete?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  requireProfileComplete = true 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/');
        return;
      }
      
      if (requireProfileComplete && !user.isProfileComplete) {
        router.push('/setup');
        return;
      }
    }
  }, [user, loading, router, requireProfileComplete]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user || (requireProfileComplete && !user.isProfileComplete)) {
    return null;
  }

  return <>{children}</>;
}
