import { Package, Testimonial, Destination } from './types';

export const PACKAGES: Package[] = [
  {
    id: 'cusco-clasico',
    title: 'Cusco Clásico',
    duration: '3D/2N',
    places: ['City Tour', 'Valle Sagrado', 'Machu Picchu'],
    price: 850,
    difficulty: 'Fácil',
    includes: ['Traslados', 'Hoteles 3*', 'Entradas', 'Guía profesional'],
    excludes: ['Vuelos', 'Propinas', 'Almuerzos no mencionados'],
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhmg8stVHKpJXXf_nb3a4sYZoPcj7M9s9FIYMWsvRTH4CRn18zz_KooQgx-uSo0K8TLwRUhbR3lQRWCmNOkwTfixF2H21PI97MUvYNduuBphHSgKZBFULCEGiMdMm7ezpq0T1EgYMM1pq8/s1600/Cusco_3_b.jpg',
    featured: true
  },
  {
    id: 'machu-picchu-full',
    title: 'Machu Picchu Full Experience',
    duration: '1 Día',
    places: ['Machu Picchu', 'Aguas Calientes'],
    price: 650,
    difficulty: 'Moderado',
    includes: ['Tren Expedition', 'Bus Consettur', 'Entrada Llaqta', 'Guía'],
    excludes: ['Alimentación', 'Gastos extras'],
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'aventura-andina',
    title: 'Aventura Andina',
    duration: '2D/1N',
    places: ['Montaña 7 Colores', 'Laguna Humantay'],
    price: 350,
    difficulty: 'Desafiante',
    includes: ['Transporte', 'Desayunos', 'Almuerzos buffet', 'Bastones'],
    excludes: ['Caballos', 'Seguro de viaje'],
    image: 'https://incajungletrek.net/wp-content/uploads/2021/05/lugares-turisticos-en-cusco.jpg'
  },
  {
    id: 'valle-sagrado-vip',
    title: 'Valle Sagrado VIP',
    duration: '1 Día',
    places: ['Chinchero', 'Maras', 'Moray', 'Ollantaytambo', 'Pisac'],
    price: 450,
    difficulty: 'Fácil',
    includes: ['Transporte privado', 'Almuerzo gourmet', 'Entradas VIP'],
    excludes: ['Propinas'],
    image: 'https://denomades.imgix.net/destinos/cusco/337/valle-sagrado-de-los-incas.jpg'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'Estados Unidos',
    comment: 'Carla organizó todo a la perfección. No tuvimos que preocuparnos por nada, solo de disfrutar la magia de Cusco.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: '2',
    name: 'Juan Pérez',
    location: 'Argentina',
    comment: 'La atención personalizada de Carla marca la diferencia. Sus recomendaciones de restaurantes fueron increíbles.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=juan'
  },
  {
    id: '3',
    name: 'Elena Rodríguez',
    location: 'España',
    comment: 'El tour a la Montaña de 7 Colores fue exigente pero Carla nos preparó muy bien. ¡Una experiencia inolvidable!',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=elena'
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'mp',
    name: 'Machu Picchu',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
    description: 'La ciudad perdida de los Incas, una de las maravillas del mundo.'
  },
  {
    id: 'm7c',
    name: 'Montaña 7 Colores',
    image: 'https://i0.wp.com/blog.expan.pro/wp-content/uploads/2024/11/VINICUNCA1.jpg?resize=1000%2C716&ssl=1',
    description: 'Un arcoíris terrestre a más de 5,000 metros de altura.'
  },
  {
    id: 'lh',
    name: 'Laguna Humantay',
    image: 'https://picchutravel.com/wp-content/uploads/tour-laguna-humantay-1-dia-cusco-870x555.webp',
    description: 'Aguas turquesas bajo el imponente nevado Salkantay.'
  },
  {
    id: 'vs',
    name: 'Valle Sagrado',
    image: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=800&q=80',
    description: 'El corazón agrícola y espiritual del imperio Inca.'
  }
];

export const WHATSAPP_NUMBER = '932350348';
export const MAPS_URL = 'https://maps.app.goo.gl/fYnnE4keHh9rD46S7';
