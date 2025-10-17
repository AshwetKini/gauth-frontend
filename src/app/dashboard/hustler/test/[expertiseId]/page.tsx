'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import TestExam from '@/components/TestExam';
import TestResult from '@/components/TestResult';
import api from '@/lib/api';
import { TestResult as TestResultType } from '@/types';

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expertiseArea, setExpertiseArea] = useState('');
  const [testResult, setTestResult] = useState<TestResultType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);

  const expertiseId = params.expertiseId as string;
  const subCategoryId = searchParams.get('subCategoryId'); // GET SUBCATEGORY FROM URL

  useEffect(() => {
    loadExpertiseInfo();
  }, [expertiseId]);

  useEffect(() => {
    if (expertiseArea) {
      checkVerificationStatus();
    }
  }, [expertiseArea]);

  const loadExpertiseInfo = async () => {
    try {
      const res = await api.get('/public/expertise');
      const expertise = res.data.data.find((exp: any) => exp._id === expertiseId);
      if (expertise) {
        setExpertiseArea(expertise.name);
      } else {
        router.push('/dashboard/hustler');
      }
    } catch (error) {
      console.error('Failed to load expertise info:', error);
      router.push('/dashboard/hustler');
    } finally {
      setLoading(false);
    }
  };

  const checkVerificationStatus = async () => {
    if (!expertiseArea) return;
    
    try {
      console.log('Checking verification for:', expertiseArea);
      const res = await api.get(`/test/verification/${encodeURIComponent(expertiseArea)}`);
      if (res.data.success && res.data.data.isVerified) {
        setIsAlreadyVerified(true);
      }
    } catch (error) {
      console.error('Failed to check verification status:', error);
    }
  };

  const handleTestComplete = (result: TestResultType) => {
    setTestResult(result);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (isAlreadyVerified) {
    return (
      <ProtectedRoute requiredRole="hustler">
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Already Verified!</h2>
              <p className="text-gray-600 mb-6">
                You are already verified in {expertiseArea}. You can create services in this area.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => router.push('/dashboard/hustler/create-service')}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Create Service
                </button>
                <button
                  onClick={() => router.push('/dashboard/hustler')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="hustler">
      <div className="min-h-screen bg-gray-50 py-8">
        {testResult ? (
          <TestResult result={testResult} expertiseArea={expertiseArea} />
        ) : (
          <TestExam 
            expertiseId={expertiseId} 
            expertiseArea={expertiseArea}
            subCategoryId={subCategoryId || undefined} // PASS SUBCATEGORY ID
            onTestComplete={handleTestComplete}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
