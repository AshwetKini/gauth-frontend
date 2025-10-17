'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { ExpertiseCategory } from '@/types';

interface CreateServiceFormProps {
  onSuccess?: () => void;
}

interface ExpertiseWithSubcategories {
  _id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  subcategories: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    parentId: string;
  }[];
}

export default function CreateServiceForm({ onSuccess }: CreateServiceFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    expertiseId: '',
    subCategoryId: '', // ADD SUBCATEGORY
  });
  const [expertiseAreas, setExpertiseAreas] = useState<ExpertiseWithSubcategories[]>([]);
  const [availableSubcategories, setAvailableSubcategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadExpertiseAreas();
  }, []);

  const loadExpertiseAreas = async () => {
    try {
      setLoading(true);
      const res = await api.get('/public/expertise');
      setExpertiseAreas(res.data.data || []);
    } catch (error) {
      console.error('Failed to load expertise areas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExpertiseChange = (expertiseId: string) => {
    setFormData(prev => ({
      ...prev,
      expertiseId,
      subCategoryId: '' // Reset subcategory when expertise changes
    }));

    // Find subcategories for selected expertise
    const selectedExpertise = expertiseAreas.find(exp => exp._id === expertiseId);
    setAvailableSubcategories(selectedExpertise?.subcategories || []);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'expertiseId') {
      handleExpertiseChange(value);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!formData.title || !formData.description || !formData.price || !formData.expertiseId) {
    alert('Please fill in all required fields');
    return;
  }

  try {
    setSubmitting(true);
    
    const submitData = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      expertiseId: formData.expertiseId,
      subCategoryId: formData.subCategoryId || undefined,
    };

    const res = await api.post('/hustler/services', submitData);
    
    if (res.data.success) {
      const result = res.data.data;
      
      if (result.needsVerification) {
        alert(`Service details saved! Now you need to pass the ${result.expertiseArea} verification test to publish your service.`);
        
        // UPDATED: Pass subcategory ID in URL
        const testUrl = formData.subCategoryId 
          ? `/dashboard/hustler/test/${result.expertiseId}?serviceCreated=true&subCategoryId=${formData.subCategoryId}`
          : `/dashboard/hustler/test/${result.expertiseId}?serviceCreated=true`;
        
        router.push(testUrl);
      } else {
        alert('Service created and published successfully!');
        if (onSuccess) {
          onSuccess();
        } else {
          router.push('/dashboard/hustler');
        }
      }
    }
  } catch (error: any) {
    console.error('Failed to create service:', error);
    alert(error.response?.data?.message || 'Failed to create service');
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Service</h2>
      
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className="flex items-center text-indigo-600">
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span className="ml-2 text-sm font-medium">Service Details</span>
          </div>
          <div className="flex-1 mx-4 h-1 bg-gray-200 rounded">
            <div className="h-1 bg-indigo-600 rounded w-0"></div>
          </div>
          <div className="flex items-center text-gray-400">
            <div className="w-8 h-8 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="ml-2 text-sm font-medium">Verification</span>
          </div>
          <div className="flex-1 mx-4 h-1 bg-gray-200 rounded"></div>
          <div className="flex items-center text-gray-400">
            <div className="w-8 h-8 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            <span className="ml-2 text-sm font-medium">Published</span>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Service Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Math Tutoring for High School Students"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            maxLength={100}
            required
          />
        </div>

        {/* Area of Expertise */}
        <div>
          <label htmlFor="expertiseId" className="block text-sm font-medium text-gray-700 mb-2">
            Area of Expertise *
          </label>
          {loading ? (
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
              Loading expertise areas...
            </div>
          ) : (
            <select
              id="expertiseId"
              name="expertiseId"
              value={formData.expertiseId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select your area of expertise</option>
              {expertiseAreas.map((expertise) => (
                <option key={expertise._id} value={expertise._id}>
                  {expertise.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Subcategory (shown only when main expertise is selected) */}
        {formData.expertiseId && availableSubcategories.length > 0 && (
          <div>
            <label htmlFor="subCategoryId" className="block text-sm font-medium text-gray-700 mb-2">
              Subcategory (Optional)
            </label>
            <select
              id="subCategoryId"
              name="subCategoryId"
              value={formData.subCategoryId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a subcategory (optional)</option>
              {availableSubcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Choosing a subcategory helps customers find your service more easily.
            </p>
          </div>
        )}

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Service Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your service in detail. What do you offer? What makes you unique?"
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            maxLength={1000}
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.description.length}/1000 characters
          </p>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Price (USD) *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Set your hourly rate or fixed price for this service
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-blue-800 mb-1">Next Steps</h4>
              <p className="text-sm text-blue-700">
                After clicking "Next", you'll take a quick verification test to prove your expertise. 
                Once you pass (50% or higher), your service will be published automatically!
              </p>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.push('/dashboard/hustler')}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {submitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Next →'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
