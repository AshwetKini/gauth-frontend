'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { ExpertiseCategory, SetupProfileData } from '@/types';

export default function SetupPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [expertiseLoading, setExpertiseLoading] = useState(false);
  const [expertise, setExpertise] = useState<ExpertiseCategory[]>([]);
  const [formData, setFormData] = useState<SetupProfileData>({
    role: 'student'
  });
  const { user, login, setupProfile } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle token from URL if present
  useEffect(() => {
    const token = searchParams.get('token');
    if (token && !user) {
      console.log('Token found in URL, logging in...', token);
      login(token);
      window.history.replaceState({}, document.title, '/setup');
    }
    
    const timer = setTimeout(() => {
      setAuthLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchParams, login, user]);

  // Load expertise areas when needed
  useEffect(() => {
    if (formData.role === 'hustler' && expertise.length === 0) {
      loadExpertise();
    }
  }, [formData.role]);

  // Redirect if user completes profile
  useEffect(() => {
    if (user && user.isProfileComplete) {
      console.log('User profile already complete, redirecting...');
      router.push(`/dashboard/${user.role}`);
    }
  }, [user, router]);

  const loadExpertise = async () => {
    setExpertiseLoading(true);
    try {
      const response = await api.get('/public/expertise');
      setExpertise(response.data.data || []);
    } catch (error) {
      console.error('Failed to load expertise areas:', error);
    } finally {
      setExpertiseLoading(false);
    }
  };

  const handleRoleSelection = (role: SetupProfileData['role']) => {
    const newFormData = { ...formData, role };
    setFormData(newFormData);
    
    if (role === 'student' || role === 'seller') {
      // Skip to submission for students and sellers
      handleSubmit(newFormData);
    } else {
      // Go to category selection for hustlers
      setStep(2);
    }
  };

  const handleCategorySelection = (categoryId: string) => {
    const selectedCategory = expertise.find(cat => cat._id === categoryId);
    if (!selectedCategory) return;

    const newFormData = {
      ...formData,
      category: selectedCategory.name,
      categoryId: selectedCategory._id
    };

    if (selectedCategory.subcategories && selectedCategory.subcategories.length > 0) {
      setFormData(newFormData);
      setStep(3); // Go to subcategory selection
    } else {
      // Submit directly if no subcategories
      handleSubmit(newFormData);
    }
  };

  const handleSubCategorySelection = (subCategoryId: string) => {
    const selectedCategory = expertise.find(cat => cat._id === formData.categoryId);
    const selectedSubCategory = selectedCategory?.subcategories.find(sub => sub._id === subCategoryId);
    
    if (!selectedSubCategory) return;

    const finalData = {
      ...formData,
      subCategory: selectedSubCategory.name,
      subCategoryId: selectedSubCategory._id
    };

    handleSubmit(finalData);
  };

  const handleSubmit = async (data: SetupProfileData) => {
    setLoading(true);
    try {
      console.log('Submitting profile setup:', data);
      const result = await setupProfile(data);
      
      alert('Profile setup completed successfully!');
      router.push(result.redirectTo);
    } catch (error) {
      console.error('Setup failed:', error);
      alert('Setup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSelectedCategory = () => {
    return expertise.find(cat => cat._id === formData.categoryId);
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
                <span className="text-xs text-indigo-200">Offer services and expertise</span>
              </button>
              
              <button
                onClick={() => handleRoleSelection('student')}
                disabled={loading}
                className="w-full flex flex-col justify-center py-4 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="text-lg mb-1">📚 Student (Learner)</span>
                <span className="text-xs text-gray-500">Learn from experts</span>
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
              
              {expertiseLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading expertise areas...</p>
                </div>
              ) : (
                expertise.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => handleCategorySelection(category._id)}
                    disabled={loading}
                    className="w-full flex flex-col justify-start py-4 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-lg font-semibold">{category.name}</span>
                    </div>
                    {category.description && (
                      <p className="text-xs text-gray-500 mt-1 ml-7">{category.description}</p>
                    )}
                    {category.subcategories && category.subcategories.length > 0 && (
                      <p className="text-xs text-indigo-600 mt-2 ml-7">
                        {category.subcategories.length} specializations available
                      </p>
                    )}
                  </button>
                ))
              )}
              
              <button
                onClick={() => setStep(1)}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-4"
              >
                ← Back to role selection
              </button>
            </div>
          )}

          {/* Step 3: Subcategory Selection */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-center mb-6">
                Choose your specialization in {getSelectedCategory()?.name}
              </h3>
              
              {getSelectedCategory()?.subcategories.map((subCategory) => (
                <button
                  key={subCategory._id}
                  onClick={() => handleSubCategorySelection(subCategory._id)}
                  disabled={loading}
                  className="w-full flex flex-col justify-start py-4 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 text-left"
                >
                  <span className="text-lg font-semibold">{subCategory.name}</span>
                  {subCategory.description && (
                    <p className="text-xs text-gray-500 mt-1">{subCategory.description}</p>
                  )}
                  {subCategory.name === 'Language' && (
                    <p className="text-xs text-yellow-600 mt-1">
                      ⚠️ Skill test required for language tutors
                    </p>
                  )}
                </button>
              ))}
              
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
