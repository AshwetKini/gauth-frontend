// src/app/dashboard/student/page.tsx
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/components/AuthProvider';

export default function StudentDashboard() {
  const { user } = useAuth();
  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1>Student Dashboard</h1>
        <p>Welcome {user?.firstName}!</p>
      </div>
    </ProtectedRoute>
  );
}
