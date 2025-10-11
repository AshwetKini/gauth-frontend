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

// Add these to your existing types file

export interface ServiceProvider {
  _id: string;
  firstName: string;
  lastName: string;
  serviceTitle?: string;
  serviceDescription?: string;
  servicePrice?: number;
  serviceImages?: string[];
  serviceRating?: number;
  category?: string;
  subCategory?: string;
  picture?: string;
  email: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  sellerName: string;
  sellerEmail?: string;
  images: string[];
  category: string;
  rating: number;
  reviewCount?: number;
}

export interface FeaturedContent {
  services: ServiceProvider[];
  products: Product[];
}

export interface CategoryItem {
  _id: string;
  type: 'service' | 'product';
  name: string;
  slug: string;
  isActive: boolean;
  order: number;
}


