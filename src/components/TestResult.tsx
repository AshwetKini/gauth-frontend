'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { TestResult } from '@/types';

interface TestResultProps {
  result: TestResult;
  expertiseArea: string;
}

export default function TestResultComponent({ result, expertiseArea }: TestResultProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceCreated = searchParams.get('serviceCreated') === 'true';

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        {result.passed ? (
          <>
            {/* Success */}
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Congratulations! 🎉</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                You're now a Verified Hustler!
              </h3>
              <p className="text-green-700 mb-4">{result.message}</p>
              
              {serviceCreated && (
                <div className="bg-white border border-green-300 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center text-green-800 mb-2">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Service Published!</span>
                  </div>
                  <p className="text-green-700 text-sm">
                    Your service has been automatically published and is now visible to customers.
                  </p>
                </div>
              )}
              
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{result.score}%</div>
                  <div className="text-gray-600">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{result.correctAnswers}</div>
                  <div className="text-gray-600">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">{result.totalQuestions}</div>
                  <div className="text-gray-600">Total</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-800 font-medium">Verified in {expertiseArea}</span>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              {serviceCreated ? (
                <>
                  <button
                    onClick={() => router.push('/services')}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    View Your Service
                  </button>
                  <button
                    onClick={() => router.push('/dashboard/hustler')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Back to Dashboard
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => router.push('/dashboard/hustler/create-service')}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Create Your Service
                  </button>
                  <button
                    onClick={() => router.push('/dashboard/hustler')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Back to Dashboard
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Failed */}
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Test Not Passed</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <p className="text-red-700 mb-4">{result.message}</p>
              
              {serviceCreated && (
                <div className="bg-white border border-red-300 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center text-red-800 mb-2">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="font-medium">Service Pending</span>
                  </div>
                  <p className="text-red-700 text-sm">
                    Your service details have been saved but are not published yet. Pass the test to publish your service.
                  </p>
                </div>
              )}
              
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{result.score}%</div>
                  <div className="text-gray-600">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{result.correctAnswers}</div>
                  <div className="text-gray-600">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">{result.totalQuestions}</div>
                  <div className="text-gray-600">Total</div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800">
                <strong>Don't worry!</strong> You can retake the test. Study the {expertiseArea} materials and try again.
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Retake Test
              </button>
              <button
                onClick={() => router.push('/dashboard/hustler')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
