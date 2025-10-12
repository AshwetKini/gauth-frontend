export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  picture?: string;
  isProfileComplete: boolean;
  role?: 'hustler' | 'student' | 'seller';
  // Dynamic category system (admin-configurable)
  category?: string;         // e.g., "Tutor", "IT Services", "Design" (from Expertise category name)
  subCategory?: string;      // e.g., "Language", "Academic", "IT" (from Expertise subcategory name)
  categoryId?: string;       // Mongo _id of selected Expertise category
  subCategoryId?: string;    // Mongo _id of selected Expertise subcategory
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

// Setup Profile uses dynamic expertise (admin-managed)
export interface SetupProfileData {
  role: 'hustler' | 'student' | 'seller';
  category?: string;       // selected category name (for display and backward compatibility)
  subCategory?: string;    // selected subcategory name (for display and backward compatibility)
  categoryId?: string;     // selected Expertise category _id
  subCategoryId?: string;  // selected Expertise subcategory _id
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


export interface ServiceProvider {
  _id: string;
  firstName: string;
  lastName: string;
  serviceTitle?: string;
  serviceDescription?: string;
  servicePrice?: number;
  serviceImages?: string[];
  serviceRating?: number;
  category?: string;        // dynamic category name
  subCategory?: string;     // dynamic subcategory name
  categoryId?: string;      // dynamic category _id
  subCategoryId?: string;   // dynamic subcategory _id
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


export interface ExpertiseSubcategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string; // _id of the parent ExpertiseCategory
}

export interface ExpertiseCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  subcategories: ExpertiseSubcategory[];
}
