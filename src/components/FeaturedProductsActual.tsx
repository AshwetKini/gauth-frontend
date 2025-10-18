// this file actually shows the products page
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  sellerName: string;
  sellerEmail?: string;
  images: string[];
  category: string;
  rating: number;
  reviewCount?: number;
}

export default function FeaturedProductsActual() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      console.log('Loading featured products...');
      const res = await api.get('/public/featured-products');
      console.log('Featured products API response:', res.data);
      
      if (res.data.success) {
        setProducts(res.data.data || []);
        console.log(`Loaded ${res.data.data?.length || 0} featured products`);
      } else {
        setError('Failed to load featured products');
      }
    } catch (error: any) {
      console.error('Failed to load featured products:', error);
      setError(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-600 mt-4">Loading featured products...</p>
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{error}</p>
              <button 
                onClick={loadFeaturedProducts}
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

  if (products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-600 mt-4">No featured products available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <p className="text-gray-600 mt-4">Discover amazing products from our talented sellers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 6).map((product) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              onClick={() => router.push(`/products/${product._id}`)}
            />
          ))}
        </div>

        {products.length > 6 && (
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
  product: Product;
  onClick: () => void;
}

function ProductCard({ product, onClick }: ProductCardProps) {
  const imageUrl = product.images?.[0] || 'https://via.placeholder.com/300x200?text=Product';
  
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
    >
      <img
        src={imageUrl}
        alt={product.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const t = e.target as HTMLImageElement;
          t.src = 'https://via.placeholder.com/300x200?text=Product';
        }}
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-indigo-600">
              ₹{product.price}
            </span>
            <div className="flex items-center text-yellow-400">
              <span>★</span>
              <span className="text-gray-600 ml-1">{product.rating || 0}</span>
              {product.reviewCount && product.reviewCount > 0 && (
                <span className="text-gray-500 text-sm ml-1">({product.reviewCount})</span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span className="bg-gray-100 px-2 py-1 rounded">{product.category}</span>
          <span>by {product.sellerName}</span>
        </div>
      </div>
    </div>
  );
}
