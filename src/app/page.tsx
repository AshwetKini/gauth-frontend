'use client';
import FeaturedServices from '@/components/FeaturedServices';
import FeaturedProducts from '@/components/FeaturedProducts';// this shows services, not products
import HighlightsSection from '@/components/HighlightsSection';
import FeaturedProductsActual from '@/components/FeaturedProductsActual'; // NEW - shows actual products
import AllProductsSection from '@/components/AllProductsSection'; // NEW - shows all products

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Secure the Bag,<br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              One Side Gig at a Time
            </span>
          </h1>
          <p className="text-lg text-green-600 max-w-2xl mx-auto">
            Earn cash by Freelancing - because why wait until adulthood to get paid?
          </p>
        </div>
      </section>

      {/* Highlights Section */}
      <HighlightsSection />

      {/* Featured Services */}
      <FeaturedServices />

       {/* Featured Products - ACTUAL PRODUCTS */}
      <FeaturedProductsActual />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* All Products Section */}
      <AllProductsSection />
    </div>
  );
}
