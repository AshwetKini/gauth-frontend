// this page aactually lists services, not products

'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { ServiceProvider } from '@/types';

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('all');
  const [categories, setCategories] = useState(['all']); // unified categories
  const router = useRouter();

  useEffect(() => {
    // load services and categories in parallel
    Promise.all([loadAllServices(), loadServiceCategories()]).finally(() => setLoading(false));
  }, []);

  async function loadAllServices() {
    try {
      const res = await api.get('/public/all-services');
      const data: ServiceProvider[] = res.data.data || [];
      setServices(data);
      // derive categories from data as a fallback/union
      const derived = new Set<string>();
      data.forEach(s => s.category && derived.add(s.category));
      setCategories(prev => {
        const union = new Set(prev);
        derived.forEach(c => union.add(c));
        // always normalize: ensure 'all' first, rest sorted
        const rest = Array.from(union).filter(x => x !== 'all').sort();
        return ['all', ...rest];
      });
    } catch (e) {
      console.error('Failed to load services:', e);
    }
  }

  async function loadServiceCategories() {
    try {
      const res = await api.get('/public/categories?type=service');
      const fromAdmin: string[] = (res.data.data || []).map((c: any) => c.name).filter(Boolean);
      setCategories(prev => {
        const union = new Set(prev);
        fromAdmin.forEach(c => union.add(c));
        const rest = Array.from(union).filter(x => x !== 'all').sort();
        return ['all', ...rest];
      });
    } catch (e) {
      console.error('Failed to load admin categories:', e);
    }
  }

  const filtered = useMemo(() => {
    return services.filter(s => {
      const matchQ =
        !q ||
        s.firstName?.toLowerCase().includes(q.toLowerCase()) ||
        s.lastName?.toLowerCase().includes(q.toLowerCase()) ||
        s.serviceTitle?.toLowerCase().includes(q.toLowerCase()) ||
        s.serviceDescription?.toLowerCase().includes(q.toLowerCase());
      const matchCat = category === 'all' || s.category === category;
      return matchQ && matchCat;
    });
  }, [services, q, category]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search services, tutors, descriptions..."
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </>
          ) : filtered.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No services found.</p>
            </div>
          ) : (
            <>
              {filtered.map(s => (
                <ServiceCard 
                  key={s._id} 
                  s={s} 
                  onClick={() => router.push(`/services/${s._id}`)}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  s: ServiceProvider;
  onClick: () => void;
}

function ServiceCard({ s, onClick }: ServiceCardProps) {
  const imageUrl = s.serviceImages?.[0] || s.picture || 'https://via.placeholder.com/300x200?text=Service';
  
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
    >
      <img
        src={imageUrl}
        alt={s.serviceTitle || 'Service'}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const t = e.target as HTMLImageElement;
          t.src = 'https://via.placeholder.com/300x200?text=Service';
        }}
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {s.serviceTitle || `${s.category} Service`}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {s.serviceDescription || `Service by ${s.firstName} ${s.lastName}`}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600">
            {s.servicePrice ? `₹${s.servicePrice}` : 'Contact'}
          </span>
          <span className="text-sm text-gray-500">
            {s.category}{s.subCategory ? ` • ${s.subCategory}` : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
