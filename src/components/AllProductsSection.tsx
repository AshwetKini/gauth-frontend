//this file lists all products on landing page
'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Product } from '@/types';

export default function AllProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('all');
  const router = useRouter();

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = async () => {
    try {
      const res = await api.get('/public/all-products');
      setProducts(res.data.data || []);
    } catch (e) {
      console.error('Failed to load products:', e);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => p.category && set.add(p.category));
    return ['all', ...Array.from(set)];
  }, [products]);

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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Browse Products</h2>
          <p className="text-gray-600 mt-4">Shop unique products from our creative sellers</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, descriptions..."
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
              <p className="text-gray-500 text-lg">No products found.</p>
            </div>
          ) : (
            <>
              {filtered.slice(0, 6).map(p => (
                <ProductCard 
                  key={p._id} 
                  p={p} 
                  onClick={() => router.push(`/products/${p._id}`)}
                />
              ))}
            </>
          )}
        </div>

        {!loading && filtered.length > 6 && (
          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              View All Products
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

interface ProductCardProps {
  p: Product;
  onClick: () => void;
}

function ProductCard({ p, onClick }: ProductCardProps) {
  const imageUrl = p.images?.[0] || 'https://via.placeholder.com/300x200?text=Product';
  
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
    >
      <img
        src={imageUrl}
        alt={p.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const t = e.target as HTMLImageElement;
          t.src = 'https://via.placeholder.com/300x200?text=Product';
        }}
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{p.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{p.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600">₹{p.price}</span>
          <span className="text-sm text-gray-500">{p.category}</span>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          by {p.sellerName}
        </div>
      </div>
    </div>
  );
}
