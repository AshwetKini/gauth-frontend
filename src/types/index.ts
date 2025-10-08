export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  picture?: string;
  isProfileComplete: boolean;
  role?: 'hustler' | 'student' | 'seller';
  category?: 'Tutor' | 'IT Services' | 'Design';
  subCategory?: 'Language' | 'Academic' | 'IT';
  bio?: string;
  introVideo?: string;
  pricing?: number;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  user: User;
  redirectTo: string;
}

export interface SetupProfileData {
  role: 'hustler' | 'student' | 'seller';
  category?: 'Tutor' | 'IT Services' | 'Design';
  subCategory?: 'Language' | 'Academic' | 'IT';
  bio?: string;
  introVideo?: string;
  pricing?: number;
}

export interface TestQuestion {
  index: number;
  question: string;
  options: string[];
}

export interface Test {
  id: string;
  category: string;
  subCategory: string;
  title: string;
  timeLimit: number;
  totalQuestions: number;
  questions: TestQuestion[];
}

export interface TestAnswer {
  questionIndex: number;
  selectedAnswer: number;
}

export interface TestResult {
  score: number;
  passed: boolean;
  correctAnswers: number;
  totalQuestions: number;
  message: string;
  nextStep: string;
}
