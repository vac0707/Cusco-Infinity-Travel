import { Package, Testimonial, Destination } from './types';

export const PACKAGES: Package[] = [
  {
    id: 'city-tour',
    title: 'City Tour Cusco',
    duration: 'Medio Día',
    places: ['Qoricancha', 'Sacsayhuaman', 'Qenqo', 'Puca Pucara', 'Tambomachay'],
    price: 40,
    difficulty: 'Fácil',
    includes: ['Transporte turístico', 'Servicio de guiado', 'Boleto Turístico'],
    excludes: ['Entrada Qoricancha', 'Gastos personales'],
    itinerary: [
      'Inicio: 08:30 am o 12:45 pm',
      'Visita del Templo del Qoricancha',
      'Visita a la fortaleza de Sacsayhuaman',
      'Visita al complejo arqueológico de Qenqo',
      'Visita al templo de Tambomachay',
      'Visita a la fortaleza de Puca Pucara',
      'Retorno a la ciudad del Cusco después de 5 horas.'
    ],
    image: 'https://images.unsplash.com/photo-1596728082987-0b1655077f52?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'super-valle-sagrado',
    title: 'Super Valle Sagrado',
    duration: '1 Día',
    places: ['Chinchero', 'Maras', 'Moray', 'Salineras', 'Ollantaytambo', 'Pisac'],
    price: 65,
    difficulty: 'Fácil',
    includes: ['Transporte turístico', 'Servicio de guiado', 'Almuerzo buffet', 'Boleto turístico'],
    excludes: ['Bebidas extras', 'Propinas'],
    itinerary: [
      '06:30 - Recojo del hotel',
      '08:30 - Centro Arqueológico de Chinchero y textiles',
      '09:30 - Maras, Moray y Salineras',
      '12:30 - Almuerzo Buffet en Urubamba',
      '14:30 - Centro Arqueológico de Ollantaytambo',
      '16:00 - Centro Arqueológico de Pisac y mercado',
      '18:00 - Retorno a Cusco'
    ],
    image: 'https://images.unsplash.com/photo-1590050752117-23a9d7f28243?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'machupicchu-fullday',
    title: 'Machu Picchu Full Day',
    duration: '1 Día',
    places: ['Machu Picchu Llaqta', 'Aguas Calientes'],
    price: 295,
    difficulty: 'Moderado',
    includes: [
      'Traslado hotel - estación',
      'Tren Turístico Bimodal (Cusco - Aguas Calientes)',
      'Bus Consettur ida y vuelta',
      'Ingreso a Machu Picchu Circuito 2',
      'Guía profesional de 2.5 horas',
      'Recojos y traslados incluidos'
    ],
    excludes: ['Almuerzo', 'Propinas'],
    itinerary: [
      '05:10 am - Traslado a estación de trenes',
      'Viaje en Tren Bimodal a Machupicchu Pueblo',
      'Bus de 30 minutos a la Ciudadela',
      'Tour guiado de 2.5 horas en Machu Picchu',
      'Tiempo para fotos y exploración',
      'Descenso en bus a Aguas Calientes',
      'Retorno en tren y bus a Cusco'
    ],
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'montana-colores',
    title: 'Montaña de Colores',
    duration: '1 Día',
    places: ['Vinicunca', 'Cusipata'],
    price: 35,
    difficulty: 'Desafiante',
    includes: ['Transporte Cusco - Cusipata', 'Desayuno y Almuerzo buffet', 'Guía profesional', 'Ticket de ingreso', 'Bastones de madera'],
    excludes: ['Caballos (opcional)', 'Seguro de viaje'],
    itinerary: [
      '04:00 am - Recojo del hotel',
      'Viaje a Cusipata para desayuno',
      '08:00 am - Inicio de caminata a la montaña (5100 msnm)',
      'Tiempo en la cima para fotos y explicación',
      'Retorno al campamento para almuerzo buffet',
      '15:00 pm - Retorno a la ciudad del Cusco',
      '17:30 pm - Llegada a Cusco'
    ],
    image: 'https://i0.wp.com/blog.expan.pro/wp-content/uploads/2024/11/VINICUNCA1.jpg?resize=1000%2C716&ssl=1'
  },
  {
    id: 'laguna-humantay',
    title: 'Laguna Humantay',
    duration: '1 Día',
    places: ['Laguna Humantay', 'Mollepata'],
    price: 35,
    difficulty: 'Desafiante',
    includes: ['Transporte turístico', 'Desayuno y Almuerzo buffet', 'Guía profesional', 'Ticket de ingreso', 'Bastones'],
    excludes: ['Caballos', 'Snacks'],
    itinerary: [
      '04:00 am - Recojo del hotel',
      'Viaje a Mollepata para desayuno',
      '08:00 am - Caminata desde Soraypampa a la Laguna',
      'Tiempo de exploración y fotos (4280 msnm)',
      'Retorno a Mollepata para almuerzo',
      'Regreso a la ciudad del Cusco',
      '17:30 pm - Llegada aproximada'
    ],
    image: 'https://picchutravel.com/wp-content/uploads/tour-laguna-humantay-1-dia-cusco-870x555.webp'
  },
  {
    id: 'valle-sur',
    title: 'Valle Sur',
    duration: 'Medio Día',
    places: ['Tipón', 'Pikillacta', 'Capilla Sixtina de América'],
    price: 35,
    difficulty: 'Fácil',
    includes: ['Transporte turístico', 'Servicio de guiado'],
    excludes: ['Boleto turístico', 'Entrada Andahuaylillas'],
    itinerary: [
      '07:30 am - Recojo del hotel',
      '09:30 am - Visita guiada a Tipón',
      '11:00 am - Visita a Pikillacta (pre-inca Wari)',
      '12:30 pm - Recorrido por la iglesia de Andahuaylillas',
      '13:30 pm - Retorno a Cusco',
      '14:30 pm - Llegada al centro'
    ],
    image: 'https://www.iperutravel.com/wp-content/uploads/2021/10/tipon.jpg'
  },
  {
    id: 'queswachaka',
    title: 'Puente Queswachaka',
    duration: '1 Día',
    places: ['4 Lagunas', 'Puente Q\'eswachaka'],
    price: 45,
    difficulty: 'Moderado',
    includes: ['Desayuno y Almuerzo', 'Servicio de guiado', 'Transporte turístico', 'Ingreso'],
    excludes: ['Entradas extras'],
    itinerary: [
      '04:30 am - Recojo en Cusco',
      'Viaje con paradas en el Circuito de 4 Lagunas',
      '09:00 am - Visita guiada al último puente Inca Queswachaka',
      'Cruce del puente y tiempo para fotos',
      '11:30 am - Almuerzo local o picnic',
      'Retorno a Cusco con paradas breves',
      '17:00 pm - Traslado al hotel o aeropuerto'
    ],
    image: 'https://blog.guiaenmachupicchu.com/wp-content/uploads/2023/12/queswachaka-last-bridge-inca.jpg'
  },
  {
    id: 'cusco-mistico',
    title: 'Tour Místico',
    duration: 'Medio Día',
    places: ['Morada de los Dioses', 'Valle de los Duendes', 'Humedal de Huasao'],
    price: 35,
    difficulty: 'Fácil',
    includes: ['Transporte turístico', 'Servicio de guiado', 'Ingresos'],
    excludes: ['Almuerzo en Saylla'],
    itinerary: [
      '09:30 am - Recojo de su hotel',
      '10:00 am - Visita a la Morada de los Dioses',
      '12:30 pm - Visita al Valle de los Duendes',
      '13:30 pm - Almuerzo en Saylla (no incluido)',
      '14:30 pm - Visita al Humedal de Huasao',
      '16:30 pm - Parque temático de los ENTS',
      '18:00 pm - Retorno a Cusco'
    ],
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfS0sX6m9n9z_nb-W2v1v7V-P-W_V_V_V_V_V_V_V_V_V_V_V_V_V_V_V_V_V_V_V_V/s1600/morada-dioses.jpg'
  },
  {
    id: '7-lagunas',
    title: '7 Lagunas Ausangate',
    duration: '1 Día',
    places: ['Ausangate', 'Pacchanta', 'Aguas Termales'],
    price: 45,
    difficulty: 'Desafiante',
    includes: ['Desayuno y Almuerzo buffet', 'Transporte turístico', 'Servicio de guiado', 'Ticket de ingreso'],
    excludes: ['Entrada a termales (S/ 5)', 'Caballos'],
    itinerary: [
      '04:30 am - Recojo del hotel',
      'Viaje hacia Pacchanta',
      '08:00 am - Desayuno andino',
      '08:30 am - Caminata a las 7 lagunas (Azulcocha, Otorongo, etc.)',
      '13:30 pm - Retorno y almuerzo en Pacchanta',
      'Tiempo de relax en Aguas Termales',
      '19:30 pm - Llegada a Cusco'
    ],
    image: 'https://denomades.imgix.net/destinos/cusco/2056/7-lagunas-ausangate.jpg'
  },
  {
    id: 'quelccaya',
    title: 'Glaciar Quelccaya',
    duration: '1 Día',
    places: ['Phinaya', 'Glaciar Quelccaya'],
    price: 60,
    difficulty: 'Desafiante',
    includes: ['Transporte turístico', 'Desayuno y Almuerzo local', 'Guía profesional bilingüe', 'Botiquín', 'Ingreso'],
    excludes: ['Seguro de accidentes'],
    itinerary: [
      '03:00 am - Recojo del hotel',
      '08:00 am - Desayuno en Phinaya',
      '09:00 am - Traslado al Glaciar Quelccaya',
      '10:00 am - Caminata y visita guiada al glaciar',
      '12:30 pm - Almuerzo típico en Phinaya',
      'Regreso con parada en Laguna Sibinacocha',
      '19:30 pm - Llegada a Cusco'
    ],
    image: 'https://www.planet-cusco.com/wp-content/uploads/2021/08/quelccaya-glacier.jpg'
  },
  {
    id: 'waqrapucara',
    title: 'Waqrapucara',
    duration: '1 Día',
    places: ['Acomayo', 'Fortaleza de Waqrapucara'],
    price: 45,
    difficulty: 'Desafiante',
    includes: ['Transporte ida y vuelta', 'Desayuno ligero', 'Box Lunch', 'Entradas oficiales', 'Guía acreditado', 'Bastones y oxígeno'],
    excludes: ['Cena'],
    itinerary: [
      '05:00 am - Recojo del hotel',
      '07:00 am - Desayuno en ruta',
      '08:30 am - Caminata de 3 horas hacia la fortaleza',
      '11:30 am - Visita guiada y tiempo libre',
      '13:00 pm - Almuerzo box lunch',
      '14:30 pm - Retorno caminando',
      '20:00 pm - Llegada a Cusco'
    ],
    image: 'https://machupicchu.center/wp-content/uploads/2022/11/fortaleza-waqrapucara.jpg'
  },
  {
    id: 'maras-moray-salineras',
    title: 'Maras, Moray y Salineras',
    duration: 'Medio Día',
    places: ['Moray', 'Salineras de Maras', 'Centro Textil'],
    price: 15,
    difficulty: 'Fácil',
    includes: ['Recojo de hotel', 'Transporte turístico', 'Servicio de guiado'],
    excludes: ['Entradas', 'Almuerzo'],
    itinerary: [
      '08:00 - 08:30 Recojo de su hotel',
      '08:30 - 10:00 Viaje desde Cusco a Moray',
      '10:00 - 11:00 Visita a las terrazas circulares de Moray',
      '11:00 - 12:00 Visita a los salares naturales de Maras',
      '12:30 - 13:30 Visita al centro de interpretación textil',
      '13:30 - 14:30 Viaje de retorno a Cusco'
    ],
    image: 'https://www.machupicchu-tours-peru.com/wp-content/uploads/2023/12/maras-moray.jpg'
  },
  {
    id: 'valle-sagrado-tradicional',
    title: 'Valle Sagrado Tradicional',
    duration: '1 Día',
    places: ['Pisac', 'Urubamba', 'Ollantaytambo', 'Chinchero'],
    price: 60,
    difficulty: 'Fácil',
    includes: ['Transporte turístico', 'Servicio de guiado', 'Almuerzo buffet', 'Boleto Turistico'],
    excludes: ['Bebidas'],
    itinerary: [
      '07:00 - 07:30 Recojo del Hotel',
      '08:30 am - Visita guiada a Pisac y mercado artesanal',
      '11:00 am - Salida hacia Urubamba',
      '12:30 pm - Almuerzo buffet en Urubamba',
      '14:00 pm - Visita al sitio arqueológico de Ollantaytambo',
      '16:00 pm - Visita a Chinchero y centro textil',
      '18:30 pm - Retorno a Cusco'
    ],
    image: 'https://denomades.imgix.net/destinos/cusco/337/valle-sagrado-de-los-incas.jpg'
  },
  {
    id: 'colores-cuatrimoto',
    title: 'Montaña en Cuatrimoto (Ind)',
    duration: '1 Día',
    places: ['Vinicunca', 'Cusipata', 'Cuatrimotos'],
    price: 65,
    difficulty: 'Moderado',
    includes: ['Recojo de hotel', 'Transporte Cusco - Cusipata', 'Desayuno y Almuerzo', 'Cuatrimoto individual', 'Ticket de ingreso'],
    excludes: ['Seguro de viaje'],
    itinerary: [
      '03:30 - 04:00 AM Recojo del hotel',
      'Viaje hacia Cusipata (Desayuno incluido)',
      'Traslado al punto de partida de las cuatrimotos',
      '07:30 - 08:00 AM Recorrido en cuatrimoto (25 min)',
      '08:10 - 11:30 AM Montaña de Colores (5080 msnm) y fotos',
      'Retorno en cuatrimoto y traslado a Cusipata',
      '01:30 - 03:00 PM Viaje de retorno a Cusco'
    ],
    image: 'https://picchutravel.com/wp-content/uploads/cuatrimotos-montana-de-colores-1.jpg'
  },
  {
    id: 'cuatrimotos-valle',
    title: 'Cuatrimotos Maras y Moray (Ind)',
    duration: 'Medio Día',
    places: ['Laguna Huaypo', 'Maras', 'Moray'],
    price: 40,
    difficulty: 'Moderado',
    includes: ['Transporte turístico', 'Servicio de guía motorizado', 'Casco y equipo de seguridad', 'Cuatrimoto'],
    excludes: ['Entradas a sitios arqueológicos'],
    itinerary: [
      '07:30 - 08:00 Recojo desde tu hotel',
      '09:00 - 09:30 Charla de seguridad en Cruzpata',
      '09:30 - 10:30 Recorrido hacia Laguna de Huaypo',
      '10:30 - 11:00 Parada en Laguna de Huaypo y fotos',
      '11:00 - 12:00 Continuación hacia el pueblo de Maras',
      '12:00 - 12:30 Breve recorrido por Maras colonial',
      '13:00 - 13:30 Traslado de regreso a Cusco'
    ],
    image: 'https://cuscoadventuretour.com/wp-content/uploads/2021/05/atv-maras-moray-1.jpg'
  },
  {
    id: 'montana-palccoyo',
    title: 'Montaña Palccoyo',
    duration: '1 Día',
    places: ['Palccoyo', 'Bosque de Piedras', 'Combapata'],
    price: 45,
    difficulty: 'Fácil',
    includes: ['Transporte turístico', 'Guía profesional', 'Desayuno y Almuerzo', 'Ticket de ingreso'],
    excludes: ['Propinas'],
    itinerary: [
      '07:00 am - Recojo del hotel',
      'Viaje hacia el sur de Cusco (Combapata)',
      'Desayuno andino en ruta',
      'Llegada al punto de inicio (4,800 msnm)',
      'Caminata corta y suave de 40 min',
      'Visita a las 3 montañas de colores y bosque de piedras',
      'Retorno para almuerzo y regreso a Cusco'
    ],
    image: 'https://itinerariocusco.com/wp-content/uploads/2024/07/Palccoyo-Rainbow-Mountain.webp'
  },
  {
    id: 'traslado-cusco',
    title: 'Traslados Cusco (In/Out)',
    duration: 'Transfer',
    places: ['Aeropuerto', 'Hotel'],
    price: 20,
    difficulty: 'Fácil',
    includes: ['Transporte privado', 'Recojo con cartel', 'Asistencia'],
    excludes: ['Propinas'],
    itinerary: [
      'Recojo del Aeropuerto de Cusco o Terminal de Buses',
      'Traslado directo a su hotel en el centro',
      'Breve orientación sobre la ciudad en el camino',
      'Ayuda con el equipaje'
    ],
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVqNqfT-N9h_Yv-N4YV-N4YV-N4YV-N4YV-N4YV-N4YV-N4YV-N4YV-N4YV-N4YV/s1600/traslado-cusco.jpg'
  },
  {
    id: 'ruta-del-sol',
    title: 'Ruta del Sol',
    duration: '1 Día',
    places: ['Andahuaylillas', 'Raqchi', 'Sicuani', 'La Raya', 'Pukara'],
    price: 90,
    difficulty: 'Fácil',
    includes: ['Bus turístico de lujo', 'Entradas a todos los sitios', 'Almuerzo buffet en Sicuani', 'Guía a bordo', 'Servicio de bebidas'],
    excludes: ['Cena'],
    itinerary: [
      '07:00 am - Salida de Cusco',
      'Visita a la Capilla Sixtina de América (Andahuaylillas)',
      'Exploración del Templo de Wiracocha (Raqchi)',
      'Almuerzo buffet en Sicuani',
      'Parada en el Abra La Raya (4,335 msnm)',
      'Visita al museo de Pukara',
      '17:00 pm - Llegada a la ciudad de Puno'
    ],
    image: 'https://www.incaspath.com/wp-content/uploads/2021/03/ruta-del-sol.webp'
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
