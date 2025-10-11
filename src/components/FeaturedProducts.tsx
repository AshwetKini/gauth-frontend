'use client';

import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';
import { ServiceProvider } from '@/types';

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>(['all']); // unified categories

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600">Browse all available services offered by Hustlers</p>
        </header>

        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row gap-4">
          <input
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

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-white rounded-lg shadow-sm animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No services found.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(s => (
              <ServiceCard key={s._id} s={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ServiceCard({ s }: { s: ServiceProvider }) {
  const imageUrl = s.serviceImages?.[0] || s.picture || 'https://via.placeholder.com/300x200?text=Service';
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
      <img
        src={imageUrl}
        alt={s.serviceTitle || 'Service'}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const t = e.target as HTMLImageElement;
          t.src = 'https://via.placeholder.com/300x200?text=Service';
        }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{s.serviceTitle || `${s.category} Service`}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {s.serviceDescription || `Service by ${s.firstName} ${s.lastName}`}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-indigo-600 font-bold">{s.servicePrice ? `$${s.servicePrice}` : 'Contact'}</span>
          <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
            {s.category}{s.subCategory ? ` • ${s.subCategory}` : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
