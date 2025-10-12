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
            Secure the Bag,<span className="text-indigo-600">One Side Gig at a Time</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Earn cash by Freelancing - because why wait until adulthood to get paid?
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
