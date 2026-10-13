export type TourDifficulty = 'Fácil' | 'Moderado' | 'Desafiante';

export type TourCategorySlug = 
  | 'machu-picchu' 
  | 'cultura-historia' 
  | 'naturaleza-montanas' 
  | 'aventura' 
  | 'experiencias-especiales' 
  | 'traslados-servicios'
  | (string & {});

export interface TourCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  active?: boolean;
}

export interface TourModality {
  name: string;
  price: number;
  description?: string;
}

export interface Package {
  id: string;
  title: string;
  duration: string;
  places: string[];
  price: number;
  difficulty: TourDifficulty;
  includes: string[];
  excludes: string[];
  itinerary: string[];
  image: string;
  gallery?: string[];
  featured?: boolean;
  active?: boolean;
  modalities?: TourModality[];
  categories?: (TourCategorySlug | string)[];
  recommendations?: string[];
  altitude?: string;
  shortDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  comment: string;
  rating: number;
  avatar?: string;
  tourTitle?: string;
  date?: string;
  active?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  altitude?: string;
  highlights?: string[];
  tourIds?: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SiteSettings {
  agencyName: string;
  slogan: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  address: string;
  mapsUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  youtubeUrl?: string;
  tripAdvisorUrl?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBgImage: string;
  termsAndConditions: string;
  bookingPolicies: string;
  aboutUsText?: string;
  missionText?: string;
  visionText?: string;
  faqs?: FaqItem[];
  currency?: string;
  exchangeRatePEN?: number;
  homeSections?: {
    quizVisible?: boolean;
    destinationsVisible?: boolean;
    testimonialsVisible?: boolean;
    whyUsVisible?: boolean;
  };
}

export interface AdminUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'admin' | 'editor';
  isDemo?: boolean;
}
