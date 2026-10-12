export type TourDifficulty = 'Fácil' | 'Moderado' | 'Desafiante';

export type TourCategorySlug = 
  | 'machu-picchu' 
  | 'cultura-historia' 
  | 'naturaleza-montanas' 
  | 'aventura' 
  | 'experiencias-especiales' 
  | 'traslados-servicios';

export interface TourCategory {
  id: TourCategorySlug;
  name: string;
  description: string;
  image: string;
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
  categories?: TourCategorySlug[];
  recommendations?: string[];
  altitude?: string;
  shortDescription?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  comment: string;
  rating: number;
  avatar: string;
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
