'use client';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/components/AuthProvider';
import FloatingCreateButton from '@/components/FloatingCreateButton';
import MyServices from '@/components/MyServices';
import VerificationBadge from '@/components/VerificationBadge';

export default function HustlerDashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute requiredRole="hustler">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Hustler Dashboard</h1>
              {user?.isVerifiedHustler && (
                <VerificationBadge 
                  isVerified={true}
                  expertiseAreas={user.verifiedExpertiseAreas}
                  size="lg"
                />
              )}
            </div>
            <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
            
            {/* Verification Status */}
            {user?.isVerifiedHustler && user?.verifiedExpertiseAreas && user.verifiedExpertiseAreas.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-sm font-medium text-blue-900 mb-2">Your Verified Expertise Areas:</h3>
                <div className="flex flex-wrap gap-2">
                  {user.verifiedExpertiseAreas.map((area, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {area} ✓
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <MyServices />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Verification Status Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Verification Status</h3>
                {user?.isVerifiedHustler ? (
                  <div className="space-y-3">
                    <div className="flex items-center text-green-600">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Verified Hustler</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      You can create services in your verified expertise areas.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center text-yellow-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span className="font-medium">Not Verified</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Take verification tests to create services in specific expertise areas.
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Services</span>
                    <span className="font-medium">-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Verified Areas</span>
                    <span className="font-medium">{user?.verifiedExpertiseAreas?.length || 0}</span>
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
                  <button
                    onClick={() => window.location.href = '/test/history'}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    View Test History
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
