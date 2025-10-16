export const metadata = {
  title: 'What We Offer | Hustler - Learn and Teach Online',
  description: 'Discover all the ways you can earn, learn, and grow with TeenHustle.',
};

export default function WhatWeOfferPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-200 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-teal-200 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            What Do We{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Offer?
            </span>
          </h1>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/30 to-teal-50/30"></div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full translate-y-12 -translate-x-12 opacity-60"></div>
            
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold text-emerald-700 mb-8">
                Our Mission
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="text-xl mb-6">
                  At TeenHustle, we believe that{' '}
                  <span className="font-bold text-gray-900 bg-yellow-100 px-2 py-1 rounded-lg">
                    ambition doesn't have an age limit
                  </span>
                  . Our mission is to empower teenagers to earn, grow, and take control of their futures through real opportunities in freelancing, entrepreneurship, and creativity. Whether you're 13 or 18, we want you to know you can start now—not later. No more waiting until you're older to build experience, confidence, and income.
                </p>
                
                <p className="text-lg text-gray-600">
                  We're here to help teens discover their passions, unlock their potential, and turn ideas into income. From selling crafts to tutoring and more, TeenHustle is a community and launchpad for young entrepreneurs ready to hustle smart.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Experience Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-emerald-100 to-teal-100 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <p className="text-emerald-700 font-semibold">Team Working</p>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -top-0 -right-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ✨ Real Impact
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-emerald-700 leading-tight">
                Real Experience.{' '}
                <span className="text-teal-600">Real Confidence.</span>
              </h2>
              
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border-l-4 border-emerald-500">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Every gig you take builds your experience and confidence. We're not just about the money — we're about building future leaders, entrepreneurs, and creatives. You'll learn responsibility, communication, and how to grow something real from the ground up.
                </p>
              </div>

              {/* Stats or highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center p-4 bg-white rounded-xl shadow-lg border border-emerald-100">
                  <div className="text-2xl font-bold text-emerald-600">100+</div>
                  <div className="text-sm text-gray-600">Active Teens</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-lg border border-teal-100">
                  <div className="text-2xl font-bold text-teal-600">50+</div>
                  <div className="text-sm text-gray-600">Services</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-lg border border-cyan-100">
                  <div className="text-2xl font-bold text-cyan-600">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Easy Ways to Earn Money Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-700 mb-6">
              Easy Ways to Earn Money
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Left Column - List */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-lg">📚</span>
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-gray-900">Tutor younger students in subjects you love</span>
                  </div>
                </li>
                
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-lg">🎨</span>
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-gray-900">Sell digital or handmade products you create</span>
                  </div>
                </li>
                
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-lg">✏️</span>
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-gray-900">Take on gigs like editing, organizing, or content creation</span>
                  </div>
                </li>
                
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-lg">💼</span>
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-gray-900">Apply for freelance-style roles offered by brands</span>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                <p className="text-gray-600 italic leading-relaxed">
                  <span className="font-medium">You don't need a degree or years of experience.</span> If you've got{' '}
                  <span className="font-bold text-emerald-700">skills, creativity, or motivation</span>, there's a place for you here.
                </p>
              </div>
            </div>

            {/* Right Column - Community Support */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl p-6 flex items-center justify-center mb-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-teal-200 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <p className="text-teal-700 font-semibold">Teen Community</p>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-teal-700 mb-4">
                    Community Support
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    You're never doing this alone. Our platform includes guidance, support groups, feedback forums, and shoutouts for top hustlers every month. We're growing this together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-emerald-700 leading-tight">
                A Marketplace for{' '}
                <span className="text-teal-600">Your Ideas</span>
              </h2>
              
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border-l-4 border-emerald-500">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Got a talent for design? Love making digital art or jewelry? At TeenHustle, you can{' '}
                  <span className="font-bold text-emerald-700">set up your own mini shop</span>{' '}
                  and turn creativity into cash. Whether it's stickers, eBooks, planners, or handmade crafts — if you can make it, you can sell it.
                </p>
              </div>

              {/* Feature highlights */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Easy shop setup</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Secure payments</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Teen-friendly community</span>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <p className="text-purple-700 font-semibold">Marketplace Preview</p>
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-3 -left-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  🎨 Creative
                </div>
                <div className="absolute -bottom-3 -right-3 bg-green-400 text-green-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  💰 Profitable
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Start Your Hustle?
          </h2>
          <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto">
            Join thousands of teens who are already earning, learning, and growing with TeenHustle. Your future starts now.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/services"
              className="group inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <span>Explore Services</span>
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a 
              href="/products"
              className="group inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white hover:bg-white hover:text-emerald-600 transition-all duration-300"
            >
              <span>Browse Marketplace</span>
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
