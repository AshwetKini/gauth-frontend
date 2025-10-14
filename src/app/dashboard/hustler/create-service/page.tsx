'use client';
import ProtectedRoute from '@/components/ProtectedRoute';
import CreateServiceForm from '@/components/CreateServiceForm';

export default function CreateServicePage() {
  return (
    <ProtectedRoute requiredRole="hustler">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CreateServiceForm />
        </div>
      </div>
    </ProtectedRoute>
  );
}
