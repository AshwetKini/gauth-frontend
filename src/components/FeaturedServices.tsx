'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

interface ServiceProvider {
  _id: string;
  firstName: string;
  lastName: string;
  serviceTitle: string;
  serviceDescription: string;
  servicePrice: number;
  serviceImages: string[];
  serviceRating: number;
  category: string;
  picture: string;
  email: string;
  isFeaturedService: boolean;
}

export default function FeaturedServices() {
  const [services, setServices] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadFeaturedServices();
  }, []);

  const loadFeaturedServices = async () => {
    try {
      console.log('Loading featured services from /public/featured-services...');
      const res = await api.get('/public/featured-services');
      console.log('Featured services API response:', res.data);
      
      if (res.data.success) {
        setServices(res.data.data || []);
        console.log(`Loaded ${res.data.data?.length || 0} featured services`);
      } else {
        setError('Failed to load featured services');
      }
    } catch (error: any) {
      console.error('Failed to load featured services:', error);
      setError(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Services</h2>
            <p className="text-gray-600 mt-4">Loading featured services...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-md animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Featured Services</h2>
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{error}</p>
              <button 
                onClick={loadFeaturedServices}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Featured Services</h2>
            <p className="text-gray-600 mt-4">No featured services available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Featured Services</h2>
          <p className="text-gray-600 mt-4">Discover top-rated services from our expert hustlers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 6).map((service) => (
            <ServiceCard 
              key={service._id} 
              service={service} 
              onClick={() => router.push(`/services/${service._id}`)}
            />
          ))}
        </div>

        {services.length > 6 && (
          <div className="text-center mt-12">
            <a
              href="/services"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              View All Services
              <svg className="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: ServiceProvider;
  onClick: () => void;
}

function ServiceCard({ service, onClick }: ServiceCardProps) {
  const imageUrl = service.serviceImages?.[0] || service.picture || 'https://via.placeholder.com/300x200?text=Service';
  
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
    >
      <img
        src={imageUrl}
        alt={service.serviceTitle || 'Service'}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const t = e.target as HTMLImageElement;
          t.src = 'https://via.placeholder.com/300x200?text=Service';
        }}
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.serviceTitle}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {service.serviceDescription}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-indigo-600">
              {service.servicePrice ? `₹${service.servicePrice}` : 'Contact'}
            </span>
            <div className="flex items-center text-yellow-400">
              <span>★</span>
              <span className="text-gray-600 ml-1">{service.serviceRating || 0}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span className="bg-gray-100 px-2 py-1 rounded">{service.category}</span>
          <span>by {service.firstName} {service.lastName}</span>
        </div>
      </div>
    </div>
  );
}
