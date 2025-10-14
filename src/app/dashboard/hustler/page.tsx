'use client';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/components/AuthProvider';
import FloatingCreateButton from '@/components/FloatingCreateButton';
import MyServices from '@/components/MyServices';

export default function HustlerDashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute requiredRole="hustler">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Hustler Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user?.firstName}!</p>
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <MyServices />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Services</span>
                    <span className="font-medium">-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Views</span>
                    <span className="font-medium">-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Featured Services</span>
                    <span className="font-medium">-</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => window.location.href = '/dashboard/hustler/create-service'}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Create New Service
                  </button>
                  <button
                    onClick={() => window.location.href = '/services'}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Browse All Services
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <FloatingCreateButton />
      </div>
    </ProtectedRoute>
  );
}
