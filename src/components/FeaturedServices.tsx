'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ServiceProvider } from '@/types';
import api from '@/lib/api';

export default function FeaturedServices() {
  const [services, setServices] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedServices();
  }, []);

  const fetchFeaturedServices = async () => {
    try {
      const response = await api.get('/public/featured-services');
      setServices(response.data.data);
    } catch (error) {
      console.error('Error fetching featured services:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Services</h2>
          <p className="text-xl text-gray-600">Discover top-rated services from expert providers</p>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No featured services available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {services.slice(0, 4).map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/services"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
              >
                View All Services
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: ServiceProvider }) {
  const imageUrl = service.serviceImages?.[0] || service.picture || 'https://via.placeholder.com/300x200?text=Service';
  const providerName = `${service.firstName} ${service.lastName}`.trim();
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={imageUrl}
          alt={service.serviceTitle || `${service.firstName}'s Service`}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x200?text=Service';
          }}
        />
      </div>
      
      <div className="p-4">
        {/* Provider Name - Made More Prominent */}
        <div className="flex items-center mb-3">
          {service.picture && (
            <img
              src={service.picture}
              alt={providerName}
              className="w-8 h-8 rounded-full mr-2"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {providerName}
            </p>
            <p className="text-xs text-gray-500">Service Provider</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {service.serviceTitle || `${service.category} Service`}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {service.serviceDescription || `Professional ${service.category} services by ${providerName}`}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-gray-600">{service.serviceRating || 4.5}</span>
          </div>
          
          <div className="text-right">
            <p className="text-lg font-bold text-indigo-600">
              ${service.servicePrice || 'Contact'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
            {service.category}
            {service.subCategory && ` • ${service.subCategory}`}
          </span>
          
          <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
