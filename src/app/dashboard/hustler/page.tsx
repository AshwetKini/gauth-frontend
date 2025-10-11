// src/app/dashboard/hustler/page.tsx
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/components/AuthProvider';

export default function HustlerDashboard() {
  const { user } = useAuth();
  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1>Hustler Dashboard</h1>
        <p>Welcome {user?.firstName}!</p>
      </div>
    </ProtectedRoute>
  );
}
