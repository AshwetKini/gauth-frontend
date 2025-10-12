'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from './AuthProvider';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [browseOpen, setBrowseOpen] = useState(false);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              TeenHustle
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Browse Gigs Dropdown */}
            <div className="relative">
              <button
                onClick={() => setBrowseOpen(open => !open)}
                className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 font-medium transition-colors focus:outline-none"
              >
                <span>Browse Gigs</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {browseOpen && (
                <div className="absolute mt-2 w-40 bg-white border rounded shadow-lg">
                  <Link
                    href="/services"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50"
                    onClick={() => setBrowseOpen(false)}
                  >
                    Services
                  </Link>
                  <Link
                    href="/products"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50"
                    onClick={() => setBrowseOpen(false)}
                  >
                    Products
                  </Link>
                </div>
              )}
            </div>

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
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600"
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
            <button
              onClick={() => {
                setBrowseOpen(false);
                setIsMenuOpen(false);
                window.location.href = '/services';
              }}
              className="w-full text-left text-gray-700 hover:text-indigo-600"
            >
              Services
            </button>
            <button
              onClick={() => {
                setBrowseOpen(false);
                setIsMenuOpen(false);
                window.location.href = '/products';
              }}
              className="w-full text-left text-gray-700 hover:text-indigo-600"
            >
              Products
            </button>
            {user ? (
              <>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.location.href = '/profile';
                  }}
                  className="w-full text-left text-gray-700 hover:text-indigo-600"
                >
                  Profile
                </button>
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
                className="w-full text-left bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Sign in with Google
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
