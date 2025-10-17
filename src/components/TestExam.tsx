'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { TestQuestion, TestAnswer, TestResult } from '@/types';

interface TestExamProps {
  expertiseId: string;
  expertiseArea: string;
  subCategoryId?: string; // ADD THIS PROP
  onTestComplete: (result: TestResult) => void;
}

export default function TestExam({ expertiseId, expertiseArea, subCategoryId, onTestComplete }: TestExamProps) {
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [startTime, setStartTime] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    loadTestQuestions();
    setStartTime(Date.now());
  }, [expertiseId, subCategoryId]); // ADD subCategoryId TO DEPENDENCY

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitTest();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const loadTestQuestions = async () => {
    try {
      console.log('Loading test questions for expertise:', expertiseId);
      console.log('Subcategory ID:', subCategoryId); // DEBUG LOG
      
      // UPDATED: Include subcategory in API call
      const url = subCategoryId 
        ? `/test/questions/${expertiseId}?subCategoryId=${subCategoryId}`
        : `/test/questions/${expertiseId}`;
      
      console.log('Fetching questions from:', url); // DEBUG LOG
      
      const res = await api.get(url);
      
      if (res.data.success) {
        setQuestions(res.data.data);
        console.log(`Loaded ${res.data.data.length} questions`); // DEBUG LOG
        
        // Initialize answers array
        setAnswers(res.data.data.map((q: TestQuestion) => ({
          questionId: q._id,
          selectedAnswer: -1
        })));
      }
    } catch (error: any) {
      console.error('Failed to load test questions:', error);
      console.error('Error response:', error.response?.data); // DEBUG LOG
      alert(error.response?.data?.message || 'Failed to load test questions');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setAnswers(prev => prev.map((answer, idx) => 
      idx === questionIndex 
        ? { ...answer, selectedAnswer: answerIndex }
        : answer
    ));
  };

  const handleSubmitTest = async () => {
    if (submitting) return;

    const unansweredCount = answers.filter(a => a.selectedAnswer === -1).length;
    if (unansweredCount > 0) {
      if (!confirm(`You have ${unansweredCount} unanswered questions. Submit anyway?`)) {
        return;
      }
    }

    setSubmitting(true);

    try {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const res = await api.post('/test/submit', {
        expertiseId,
        answers: answers.filter(a => a.selectedAnswer !== -1),
        timeSpent
      });

      if (res.data.success) {
        onTestComplete(res.data.data);
      }
    } catch (error) {
      console.error('Failed to submit test:', error);
      alert('Failed to submit test');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Test Available</h2>
          <p className="text-gray-600 mb-6">
            There are no test questions available for {expertiseArea} at the moment.
          </p>
          <button
            onClick={() => router.push('/dashboard/hustler')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{expertiseArea} Verification Test</h1>
          <div className={`text-lg font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-gray-600'}`}>
            Time: {formatTime(timeLeft)}
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-600">
            Passing Score: 50%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded text-sm font-medium ${
              currentQ.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              currentQ.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {currentQ.difficulty.charAt(0).toUpperCase() + currentQ.difficulty.slice(1)}
            </span>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQ.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQuestion, index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                answers[currentQuestion]?.selectedAnswer === index
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 text-sm font-medium ${
                  answers[currentQuestion]?.selectedAnswer === index
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-gray-300'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded text-sm font-medium ${
                  index === currentQuestion
                    ? 'bg-indigo-600 text-white'
                    : answers[index]?.selectedAnswer !== -1
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmitTest}
              disabled={submitting}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Test'}
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
