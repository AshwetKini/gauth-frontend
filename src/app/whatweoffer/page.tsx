export const metadata = {
  title: 'What We Offer | Hustler - Learn and Teach Online',
  description: 'Discover all the ways you can earn, learn, and grow with our platform.',
};

export default function WhatWeOfferPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What We{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Offer
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Get the  on all the ways you can earn, learn, and grow with our comprehensive platform designed for ambitious teens.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Provision */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Marketplace</h3>
              <p className="text-gray-600 mb-4">
                Offer tutoring, writing, design, coding, and other skills to earn money while building your portfolio.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Academic tutoring</li>
                <li>• Creative services</li>
                <li>• Technical skills</li>
                <li>• Language practice</li>
              </ul>
            </div>

            {/* Product Sales */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Marketplace</h3>
              <p className="text-gray-600 mb-4">
                Sell your handmade creations, digital products, and unique items to a community that values teen creativity.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Handmade crafts</li>
                <li>• Digital designs</li>
                <li>• Art & photography</li>
                <li>• Custom creations</li>
              </ul>
            </div>

            {/* Learning & Growth */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Learning Opportunities</h3>
              <p className="text-gray-600 mb-4">
                Access learning resources, connect with mentors, and develop skills that set you up for success.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Skill development</li>
                <li>• Peer learning</li>
                <li>• Mentor connections</li>
                <li>• Career guidance</li>
              </ul>
            </div>

            {/* Safe Environment */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Safe & Secure Platform</h3>
              <p className="text-gray-600 mb-4">
                We prioritize safety with verified profiles, secure payments, and community guidelines designed for teens.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Profile verification</li>
                <li>• Secure payments</li>
                <li>• Community moderation</li>
                <li>• Teen-focused policies</li>
              </ul>
            </div>

            {/* Community */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Vibrant Community</h3>
              <p className="text-gray-600 mb-4">
                Connect with like-minded teens, share experiences, and build lasting relationships in a supportive environment.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Peer networking</li>
                <li>• Success stories</li>
                <li>• Collaborative projects</li>
                <li>• Community events</li>
              </ul>
            </div>

            {/* Growth Tools */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance Analytics</h3>
              <p className="text-gray-600 mb-4">
                Track your progress, understand your earnings, and get insights to optimize your success on the platform.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Earnings dashboard</li>
                <li>• Performance metrics</li>
                <li>• Growth recommendations</li>
                <li>• Success tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of teens who are already earning, learning, and growing with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/services"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Explore Services
            </a>
            <a 
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Browse Products
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
