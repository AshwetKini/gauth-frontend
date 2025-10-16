'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { ExpertiseCategory } from '@/types';

interface CreateServiceFormProps {
  onSuccess?: () => void;
}

export default function CreateServiceForm({ onSuccess }: CreateServiceFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    expertiseId: '',
  });
  const [expertiseAreas, setExpertiseAreas] = useState<ExpertiseCategory[]>([]);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      };

      const res = await api.post('/hustler/services', submitData);
      
      if (res.data.success) {
        alert('Service created successfully!');
        if (onSuccess) {
          onSuccess();
        } else {
          router.push('/dashboard/hustler');
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
            Price (Rupees) *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">₹</span>
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
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Creating...' : 'Create Service'}
          </button>
        </div>
      </form>
    </div>
  );
}
