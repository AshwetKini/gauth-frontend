'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/api';

interface SetupForm {
  role: 'hustler' | 'student' | 'seller';
  category?: 'Tutor' | 'IT Services' | 'Design';
  subCategory?: 'Language' | 'Academic' | 'IT';
}

export default function SetupPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [formData, setFormData] = useState<SetupForm>({
    role: 'student'
  });
  const { user, login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle token from URL if present
  useEffect(() => {
    const token = searchParams.get('token');
    if (token && !user) {
      console.log('Token found in URL, logging in...', token);
      login(token);
      // Clean up URL
      window.history.replaceState({}, document.title, '/setup');
    }
    
    // Set loading to false after a short delay to allow auth to process
    const timer = setTimeout(() => {
      setAuthLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchParams, login, user]);

  // Redirect if user completes profile
  useEffect(() => {
    if (user && user.isProfileComplete) {
      console.log('User profile already complete, redirecting...');
      router.push(`/dashboard/${user.role}`);
    }
  }, [user, router]);

  const handleRoleSelection = (role: SetupForm['role']) => {
    setFormData({ ...formData, role });
    if (role === 'student' || role === 'seller') {
      // Skip to submission for students and sellers
      handleSubmit({ ...formData, role });
    } else {
      setStep(2); // Go to category selection for hustlers
    }
  };

  const handleCategorySelection = (category: SetupForm['category']) => {
    const newFormData = { ...formData, category };
    if (category === 'Tutor') {
      setFormData(newFormData);
      setStep(3); // Go to subcategory selection
    } else {
      // Submit directly for other categories
      handleSubmit(newFormData);
    }
  };

  const handleSubCategorySelection = (subCategory: SetupForm['subCategory']) => {
    const finalData = { ...formData, subCategory };
    handleSubmit(finalData);
  };

  const handleSubmit = async (data: SetupForm) => {
    setLoading(true);
    try {
      console.log('Submitting profile setup:', data);
      const response = await api.post('/auth/setup', data);
      console.log('Setup response:', response.data);
      
      // Show success message
      alert('Profile setup completed successfully!');
      
      // Redirect based on backend response
      router.push(response.data.redirectTo);
    } catch (error) {
      console.error('Setup failed:', error);
      alert('Setup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while processing authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Setting up your account...</h2>
          <p className="text-gray-600">Please wait while we authenticate you.</p>
        </div>
      </div>
    );
  }

  // Show access denied if no user after loading
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">Please log in to access this page.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Complete Your Profile Setup
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Welcome {user.firstName}! Let's set up your account.
        </p>
        
        {/* Debug info - remove in production */}
        <div className="mt-4 p-3 bg-blue-50 rounded-md text-xs">
          <p><strong>Debug:</strong> User loaded: {user.email}</p>
          <p>Profile Complete: {user.isProfileComplete ? 'Yes' : 'No'}</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-center mb-6">
                What type of account are you setting up?
              </h3>
              
              <button
                onClick={() => handleRoleSelection('hustler')}
                disabled={loading}
                className="w-full flex flex-col justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                <span className="text-lg mb-1">🚀 Hustler (Service Provider)</span>
                <span className="text-xs text-indigo-200">Offer tutoring, IT services, design, etc.</span>
              </button>
              
              <button
                onClick={() => handleRoleSelection('student')}
                disabled={loading}
                className="w-full flex flex-col justify-center py-4 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="text-lg mb-1">📚 Student (Learner)</span>
                <span className="text-xs text-gray-500">Learn from tutors and experts</span>
              </button>
              
              <button
                onClick={() => handleRoleSelection('seller')}
                disabled={loading}
                className="w-full flex flex-col justify-center py-4 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="text-lg mb-1">🛍️ Seller (Product Vendor)</span>
                <span className="text-xs text-gray-500">Sell products and services</span>
              </button>
            </div>
          )}

          {/* Step 2: Category Selection (for Hustlers only) */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-center mb-6">
                What's your area of expertise?
              </h3>
              
              <button
                onClick={() => handleCategorySelection('Tutor')}
                disabled={loading}
                className="w-full flex flex-col justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                <span className="text-lg mb-1">👨‍🏫 Tutor</span>
                <span className="text-xs text-indigo-200">Teach languages, academics, or IT skills</span>
              </button>
              
              <button
                onClick={() => handleCategorySelection('IT Services')}
                disabled={loading}
                className="w-full flex flex-col justify-center py-4 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="text-lg mb-1">💻 IT Services</span>
                <span className="text-xs text-gray-500">Web development, software, consulting</span>
              </button>
              
              <button
                onClick={() => handleCategorySelection('Design')}
                disabled={loading}
                className="w-full flex flex-col justify-center py-4 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="text-lg mb-1">🎨 Design</span>
                <span className="text-xs text-gray-500">Graphic design, UI/UX, branding</span>
              </button>
              
              <button
                onClick={() => setStep(1)}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-4"
              >
                ← Back to role selection
              </button>
            </div>
          )}

          {/* Step 3: Subcategory Selection (for Tutors only) */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-center mb-6">
                What do you want to teach?
              </h3>
              
              <button
                onClick={() => handleSubCategorySelection('Language')}
                disabled={loading}
                className="w-full flex flex-col justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                <span className="text-lg mb-1">🌍 Language Tutor</span>
                <span className="text-xs text-indigo-200">English, Spanish, French, etc. (Skill test required)</span>
              </button>
              
              <button
                onClick={() => handleSubCategorySelection('Academic')}
                disabled={loading}
                className="w-full flex flex-col justify-center py-4 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="text-lg mb-1">📖 Academic Subjects</span>
                <span className="text-xs text-gray-500">Math, Science, History, etc.</span>
              </button>
              
              <button
                onClick={() => handleSubCategorySelection('IT')}
                disabled={loading}
                className="w-full flex flex-col justify-center py-4 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="text-lg mb-1">💻 IT/Programming</span>
                <span className="text-xs text-gray-500">Coding, web development, databases</span>
              </button>
              
              <button
                onClick={() => setStep(2)}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-4"
              >
                ← Back to category selection
              </button>
            </div>
          )}

          {loading && (
            <div className="text-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Setting up your profile...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
