'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from './AuthProvider';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (leftRef.current && !leftRef.current.contains(e.target as Node)) {
        setLeftOpen(false);
      }
    }
    if (leftOpen) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [leftOpen]);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left Hamburger + Logo */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative" ref={leftRef}>
              <button
                aria-label="Open menu"
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => setLeftOpen((o) => !o)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              {leftOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg">
                  <Link
                    href="/services"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50"
                    onClick={() => setLeftOpen(false)}
                  >
                    Services
                  </Link>
                  <Link
                    href="/products"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50"
                    onClick={() => setLeftOpen(false)}
                  >
                    Products
                  </Link>
                </div>
              )}
            </div>
            <Link href="/" className="text-2xl font-serif text-gray-800">
              Teen Hustle
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Browse Gigs - simple button, no dropdown */}
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Browse Gigs
            </button>

            {/* Auth / User Links */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  {user.picture && (
                    <Image
                      src={user.picture}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-gray-700 font-medium">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <Link
                  href="/profile"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Profile
                </Link>
                <Link
                  href={`/dashboard/${user.role || 'student'}`}
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleLogin}
                aria-label="Sign in with Google"
                className="
                  group relative inline-flex items-center justify-center
                  rounded-xl px-4 py-2 sm:px-5 sm:py-2.5
                  font-semibold text-sm sm:text-base
                  text-gray-800 shadow-[0_8px_20px_-8px_rgba(67,56,202,0.35)]
                  transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500
                  active:scale-[0.98]
                  bg-white/80 backdrop-blur
                  border border-indigo-100
                  hover:border-indigo-200 hover:bg-white
                "
              >
                <span
                  className="
                    pointer-events-none absolute inset-0 -z-10 rounded-xl
                    bg-gradient-to-r from-[#4285F4]/30 via-[#34A853]/30 to-[#EA4335]/30
                    opacity-0 blur-xl transition-opacity duration-300
                    group-hover:opacity-100
                  "
                />
                <span className="mr-3 grid h-7 w-7 place-items-center rounded-md bg-white border border-gray-200 shadow-sm">
                  <svg viewBox="0 0 533.5 544.3" className="h-4 w-4" aria-hidden="true">
                    {/* Google G SVG Paths */}
                    <path
                      fill="#EA4335"
                      d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.2H272v95.1h147.1c-6.3 34.2-25.3 63.2-53.9 82.7v68.6h87.1c..."
                    />
                    <path
                      fill="#34A853"
                      d="M272 544.3c69.8 0 128.6-23 171.5-62.6l-87.1-68.6..."
                    />
                    <path
                      fill="#4A90E2"
                      d="M132.4 336.2c-4.6-13.9-7.2-28.7-7.2-44.2..."
                    />
                    <path
                      fill="#FBBC05"
                      d="M272 193.1c35.8 0 68 12.3 93.4 36.3..."
                    />
                  </svg>
                </span>
                <span className="relative">
                  Continue with Google
                  <svg
                    viewBox="0 0 24 24"
                    className="ml-2 inline h-4 w-4 translate-x-[-4px] opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 px-4 space-y-4">
            <Link
              href="/services"
              className="block text-gray-700 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/products"
              className="block text-gray-700 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="block text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  handleGoogleLogin();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center px-4 py-2 bg-white border border-indigo-100 rounded-lg hover:border-indigo-200"
              >
                Continue with Google
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
