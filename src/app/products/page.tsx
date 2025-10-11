'use client';

import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';
import { Product } from '@/types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>(['all']);

  useEffect(() => {
    Promise.all([loadAllProducts(), loadProductCategories()]).finally(() => setLoading(false));
  }, []);

  async function loadAllProducts() {
    try {
      const res = await api.get('/public/all-products');
      const data: Product[] = res.data.data || [];
      setProducts(data);

      // union with derived categories as fallback
      const derived = new Set<string>();
      data.forEach(p => p.category && derived.add(p.category));
      setCategories(prev => {
        const union = new Set(prev);
        derived.forEach(c => union.add(c));
        const rest = Array.from(union).filter(x => x !== 'all').sort();
        return ['all', ...rest];
      });
    } catch (e) {
      console.error('Failed to load products:', e);
    }
  }

  async function loadProductCategories() {
    try {
      const res = await api.get('/public/categories?type=product');
      const fromAdmin: string[] = (res.data.data || []).map((c: any) => c.name).filter(Boolean);
      setCategories(prev => {
        const union = new Set(prev);
        fromAdmin.forEach(c => union.add(c));
        const rest = Array.from(union).filter(x => x !== 'all').sort();
        return ['all', ...rest];
      });
    } catch (e) {
      console.error('Failed to load product categories:', e);
    }
  }

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchQ =
        !q ||
        p.title?.toLowerCase().includes(q.toLowerCase()) ||
        p.description?.toLowerCase().includes(q.toLowerCase()) ||
        p.sellerName?.toLowerCase().includes(q.toLowerCase());
      const matchCat = category === 'all' || p.category === category;
      return matchQ && matchCat;
    });
  }, [products, q, category]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Browse all available products</p>
        </header>

        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row gap-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
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
          <div className="text-center py-12 text-gray-500">No products found.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <ProductCard key={p._id} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ p }: { p: Product }) {
  const imageUrl = p.images?.[0] || 'https://via.placeholder.com/300x200?text=Product';
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
      <img
        src={imageUrl}
        alt={p.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const t = e.target as HTMLImageElement;
          t.src = 'https://via.placeholder.com/300x200?text=Product';
        }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{p.title}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{p.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-indigo-600 font-bold">${p.price}</span>
          <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">{p.category}</span>
        </div>
        <div className="mt-2 text-xs text-gray-500">by {p.sellerName}</div>
      </div>
    </div>
  );
}
