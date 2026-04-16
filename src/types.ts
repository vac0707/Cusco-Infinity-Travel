export interface Package {
  id: string;
  title: string;
  duration: string;
  places: string[];
  price: number;
  difficulty: 'Fácil' | 'Moderado' | 'Desafiante';
  includes: string[];
  excludes: string[];
  image: string;
  featured?: boolean;
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
}
