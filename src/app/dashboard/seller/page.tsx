// src/app/dashboard/seller/page.tsx
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/components/AuthProvider';
import FloatingCreateButton from '@/components/FloatingCreateButton';

export default function SellerDashboard() {
  const { user } = useAuth();
  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1>Seller Dashboard</h1>
        <p>Welcome {user?.firstName}!</p>
      </div>
       <div className="min-h-screen bg-gray-50 p-8">
      {/* your Seller dashboard UI here */}
      <FloatingCreateButton mode="product" />
    </div>
    </ProtectedRoute>
  );
}
