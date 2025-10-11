// src/app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/');
    } else {
      const dest = `/dashboard/${user.role || 'student'}`;
      router.replace(dest);
    }
  }, [user, loading, router]);

  return null;
}
