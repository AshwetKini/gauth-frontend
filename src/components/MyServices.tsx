'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface Service {
  _id: string;
  title: string;
  description: string;
  price: number;
  expertiseArea: string;
  images: string[];
  status: string;
  isFeatured: boolean;
  createdAt: string;
}

export default function MyServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadMyServices();
  }, []);

  const loadMyServices = async () => {
    try {
      const res = await api.get('/hustler/services');
      setServices(res.data.data || []);
    } catch (error) {
      console.error('Failed to load services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (serviceId: string) => {
    if (!confirm('Are you sure you want to delete this service?')) {
      return;
    }

    try {
      await api.delete(`/hustler/services/${serviceId}`);
      setServices(prev => prev.filter(s => s._id !== serviceId));
      alert('Service deleted successfully');
    } catch (error) {
      console.error('Failed to delete service:', error);
      alert('Failed to delete service');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">My Services</h2>
          <button
            onClick={() => router.push('/dashboard/hustler/create-service')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add New Service
          </button>
        </div>
      </div>

      <div className="p-6">
        {services.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
            <p className="text-gray-500 mb-4">Start by creating your first service to showcase your expertise.</p>
            <button
              onClick={() => router.push('/dashboard/hustler/create-service')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Create Your First Service
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                      {service.isFeatured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Featured
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        service.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {service.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{service.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="font-medium">${service.price}</span>
                      <span>{service.expertiseArea}</span>
                      <span>{new Date(service.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => router.push(`/dashboard/hustler/services/${service._id}/edit`)}
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
