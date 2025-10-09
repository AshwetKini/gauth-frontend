'use client';

import FeaturedServices from '@/components/FeaturedServices';
import FeaturedProducts from '@/components/FeaturedProducts';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Learn from Experts, <span className="text-indigo-600">Sell Your Skills</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore services from verified Hustlers or browse curated products to accelerate learning.
          </p>
        </div>
      </section>

      {/* Featured Services */}
      <FeaturedServices />

      {/* Featured Products */}
      <FeaturedProducts />
    </div>
  );
}
