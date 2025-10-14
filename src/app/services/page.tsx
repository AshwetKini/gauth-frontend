'use client';
import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';
import FloatingCreateButton from '@/components/FloatingCreateButton';

interface Service {
  _id: string;
  // New format
  title?: string;
  description?: string;
  price?: number;
  expertiseArea?: string;
  hustlerName?: string;
  hustlerEmail?: string;
  hustlerPicture?: string;
  images?: string[];
  rating?: number;
  reviewCount?: number;
  isFeatured?: boolean;
  
  // Old format (backward compatibility)
  serviceTitle?: string;
  serviceDescription?: string;
  servicePrice?: number;
  category?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  picture?: string;
  serviceImages?: string[];
  serviceRating?: number;
  isFeaturedService?: boolean;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    loadAllServices();
  }, []);

  const loadAllServices = async () => {
    try {
      setError('');
      console.log('Loading services from /public/all-services...');
      
      const res = await api.get('/public/all-services');
      console.log('API Response:', res.data);
      
      if (res.data.success) {
        setServices(res.data.data || []);
        console.log(`Loaded ${res.data.data?.length || 0} services`);
      } else {
        console.error('API returned success: false');
        setError('Failed to load services');
      }
    } catch (e: any) {
      console.error('Failed to load services:', e);
      console.error('Error response:', e.response?.data);
      setError(`Error: ${e.response?.data?.message || e.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    services.forEach(s => {
      const cat = s.expertiseArea || s.category;
      if (cat) set.add(cat);
    });
    return ['all', ...Array.from(set)];
  }, [services]);

  const filtered = useMemo(() => {
    return services.filter(s => {
      const title = s.title || s.serviceTitle || '';
      const description = s.description || s.serviceDescription || '';
      const name = s.hustlerName || `${s.firstName || ''} ${s.lastName || ''}`.trim();
      const cat = s.expertiseArea || s.category || '';
      
      const matchQ =
        !q ||
        title.toLowerCase().includes(q.toLowerCase()) ||
        description.toLowerCase().includes(q.toLowerCase()) ||
        name.toLowerCase().includes(q.toLowerCase()) ||
        cat.toLowerCase().includes(q.toLowerCase());
      
      const matchCat = category === 'all' || cat === category;
      return matchQ && matchCat;
    });
  }, [services, q, category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Services</h1>
            <p className="text-gray-600 mt-2">Loading services...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-lg shadow animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Services</h1>
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{error}</p>
              <button 
                onClick={loadAllServices}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-2">Find expert services from talented hustlers ({services.length} services)</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search services, descriptions, providers..."
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-56 border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {categories.map(c => (
              <option key={c} value={c}>
                {c === 'all' ? 'All Categories' : c}
              </option>
            ))}
          </select>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-500 mb-4">
              {services.length === 0 
                ? "No services are available yet. Be the first to create one!" 
                : "Try adjusting your search or filters."}
            </p>
            {services.length === 0 && (
              <button
                onClick={() => window.location.href = '/dashboard/hustler/create-service'}
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Create First Service
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(s => (
              <ServiceCard key={s._id} service={s} />
            ))}
          </div>
        )}
      </div>

      <FloatingCreateButton />
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const title = service.title || service.serviceTitle || 'Untitled Service';
  const description = service.description || service.serviceDescription || 'No description available';
  const price = service.price || service.servicePrice || 0;
  const images = service.images || service.serviceImages || [];
  const rating = service.rating || service.serviceRating || 0;
  const reviewCount = service.reviewCount || 0;
  const category = service.expertiseArea || service.category || 'Uncategorized';
  const hustlerName = service.hustlerName || `${service.firstName || ''} ${service.lastName || ''}`.trim() || 'Unknown';
  
  const imageUrl = images[0] || service.hustlerPicture || service.picture || 'https://via.placeholder.com/300x200?text=Service';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const t = e.target as HTMLImageElement;
          t.src = 'https://via.placeholder.com/300x200?text=Service';
        }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-indigo-600">
            {price > 0 ? `$${price}` : 'Contact'}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <span className="text-yellow-400 mr-1">★</span>
            <span>{rating} ({reviewCount})</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{category}</span>
          <span className="text-gray-500">by {hustlerName}</span>
        </div>
      </div>
    </div>
  );
}
