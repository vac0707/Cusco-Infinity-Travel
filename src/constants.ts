import { Package, Destination, TourCategory } from './types';

export const WHATSAPP_NUMBER = '932350348';
export const WHATSAPP_DISPLAY = '+51 932 350 348';
export const AGENCY_EMAIL = 'hola@cuscotravel.expert';
export const AGENCY_ADDRESS = 'Centro Histórico, Cusco, Perú';
export const MAPS_URL = 'https://maps.app.goo.gl/fYnnE4keHh9rD46S7';
export const AGENCY_LOGO = 'https://res.cloudinary.com/dcnynnstm/image/upload/q_auto/f_auto/v1776351481/CUSCO_INFINITY_TRAVEL_srfnzk.png';
export const HERO_BG_IMAGE = 'https://res.cloudinary.com/dcnynnstm/image/upload/q_auto/f_auto/v1776266712/590375588_1277322274422006_5027036865690629754_n_la8hdb.jpg';

export const TOUR_CATEGORIES: TourCategory[] = [
  {
    id: 'machu-picchu',
    name: 'Machu Picchu',
    description: 'La maravilla del mundo en el corazón de los Andes con trenes y guiado experto.',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cultura-historia',
    name: 'Cultura e Historia',
    description: 'Templos incas, fortalezas milenarias, valles sagrados y arquitectura virreinal.',
    image: 'https://images.unsplash.com/photo-1596728082987-0b1655077f52?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'naturaleza-montanas',
    name: 'Naturaleza y Montañas',
    description: 'Lagunas turquesas, cordilleras nevadas y paisajes multicolores a gran altitud.',
    image: 'https://picchutravel.com/wp-content/uploads/tour-laguna-humantay-1-dia-cusco-870x555.webp'
  },
  {
    id: 'aventura',
    name: 'Aventura',
    description: 'Rutas en cuatrimoto, ascensos panorámicos y desafíos al aire libre con total seguridad.',
    image: 'https://cuscoadventuretour.com/wp-content/uploads/2021/05/atv-maras-moray-1.jpg'
  },
  {
    id: 'experiencias-especiales',
    name: 'Experiencias Especiales',
    description: 'Rutas místicas, puentes colgantes ancestrales y la legendaria Ruta del Sol.',
    image: 'https://blog.guiaenmachupicchu.com/wp-content/uploads/2023/12/queswachaka-last-bridge-inca.jpg'
  },
  {
    id: 'traslados-servicios',
    name: 'Traslados y Servicios',
    description: 'Puntualidad, asistencia personalizada y transporte privado seguro en Cusco.',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVqNqfT-N9h_Yv-N4YV-N4YV-N4YV-N4YV-N4YV-N4YV-N4YV-N4YV-N4YV-N4YV/s1600/traslado-cusco.jpg'
  }
];

export const PACKAGES: Package[] = [
  {
    id: 'city-tour',
    title: 'City Tour Cusco',
    duration: 'Medio Día',
    places: ['Qoricancha', 'Sacsayhuaman', 'Qenqo', 'Puca Pucara', 'Tambomachay'],
    price: 40,
    difficulty: 'Fácil',
    categories: ['cultura-historia'],
    shortDescription: 'Recorrido clásico por los tesoros arqueológicos e históricos más emblemáticos de la capital imperial.',
    altitude: '3,400 msnm',
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
    recommendations: [
      'Llevar documento de identidad (DNI o pasaporte físico)',
      'Ropa cómoda, sombrero y protector solar',
      'Calzado adecuado para caminar sobre empedrado',
      'Llevar soles en efectivo para ingresos complementarios y recuerdos'
    ],
    image: 'https://images.unsplash.com/photo-1596728082987-0b1655077f52?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596728082987-0b1655077f52?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true
  },
  {
    id: 'super-valle-sagrado',
    title: 'Super Valle Sagrado',
    duration: '1 Día',
    places: ['Chinchero', 'Maras', 'Moray', 'Salineras', 'Ollantaytambo', 'Pisac'],
    price: 65,
    difficulty: 'Fácil',
    categories: ['cultura-historia', 'naturaleza-montanas'],
    shortDescription: 'El circuito más completo por el Valle Sagrado, uniendo pueblos tradicionales, salineras y ciudadelas incas.',
    altitude: '2,870 msnm - 3,760 msnm',
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
    recommendations: [
      'Ropa en capas: fresco por la mañana y templado al mediodía en el valle',
      'Cámara fotográfica o móvil con batería cargada',
      'Zapatos confortables para escalinatas incas',
      'Protector solar y repelente suave'
    ],
    image: 'https://images.unsplash.com/photo-1590050752117-23a9d7f28243?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590050752117-23a9d7f28243?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80',
      'https://www.machupicchu-tours-peru.com/wp-content/uploads/2023/12/maras-moray.jpg'
    ],
    featured: true
  },
  {
    id: 'machupicchu-fullday',
    title: 'Machu Picchu Full Day',
    duration: '1 Día',
    places: ['Machu Picchu Llaqta', 'Aguas Calientes'],
    price: 295,
    difficulty: 'Moderado',
    categories: ['machu-picchu', 'cultura-historia'],
    shortDescription: 'Experiencia integral hacia la ciudadela sagrada de los incas con tren turístico bimodal y guiado oficial.',
    altitude: '2,430 msnm',
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
    recommendations: [
      'Pasaporte original o documento oficial con el que se compró el boleto (obligatorio en el control)',
      'Mochila pequeña de mano (máximo 20L según normativa del santuario)',
      'Repelente contra insectos y protector solar',
      'Poncho impermeable o casaca cortaviento'
    ],
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true
  },
  {
    id: 'montana-colores',
    title: 'Montaña de Colores',
    duration: '1 Día',
    places: ['Vinicunca', 'Cusipata'],
    price: 35,
    difficulty: 'Desafiante',
    categories: ['naturaleza-montanas', 'aventura'],
    shortDescription: 'Impresionante caminata hacia la cumbre de Vinicunca, contemplando franjas geológicas y el nevado Ausangate.',
    altitude: '5,036 msnm',
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
    recommendations: [
      'Aclimatación previa en Cusco de al menos 1 o 2 días',
      'Ropa térmica, guantes, gorro de lana y casaca de pluma o abrigadora',
      'Botas o zapatillas de trekking con buen agarre',
      'Pastillas para el soroche o caramelos de coca y agua personal'
    ],
    image: 'https://i0.wp.com/blog.expan.pro/wp-content/uploads/2024/11/VINICUNCA1.jpg?resize=1000%2C716&ssl=1',
    gallery: [
      'https://i0.wp.com/blog.expan.pro/wp-content/uploads/2024/11/VINICUNCA1.jpg?resize=1000%2C716&ssl=1',
      'https://itinerariocusco.com/wp-content/uploads/2024/07/Palccoyo-Rainbow-Mountain.webp',
      'https://picchutravel.com/wp-content/uploads/cuatrimotos-montana-de-colores-1.jpg'
    ],
    featured: true
  },
  {
    id: 'laguna-humantay',
    title: 'Laguna Humantay',
    duration: '1 Día',
    places: ['Laguna Humantay', 'Mollepata'],
    price: 35,
    difficulty: 'Desafiante',
    categories: ['naturaleza-montanas', 'aventura'],
    shortDescription: 'Espejo de agua color turquesa rodeado por las nieves perpetuas del monte Humantay y el nevado Salkantay.',
    altitude: '4,200 msnm',
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
    recommendations: [
      'Caminar a ritmo constante y regular la respiración',
      'Ropa en capas: se siente frío al inicio y calor durante el ascenso',
      'Zapatos de trekking con planta antideslizante',
      'Cámara resistente al polvo o funda impermeable'
    ],
    image: 'https://picchutravel.com/wp-content/uploads/tour-laguna-humantay-1-dia-cusco-870x555.webp',
    gallery: [
      'https://picchutravel.com/wp-content/uploads/tour-laguna-humantay-1-dia-cusco-870x555.webp',
      'https://denomades.imgix.net/destinos/cusco/2056/7-lagunas-ausangate.jpg',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true
  },
  {
    id: 'valle-sur',
    title: 'Valle Sur',
    duration: 'Medio Día',
    places: ['Tipón', 'Pikillacta', 'Capilla Sixtina de América'],
    price: 35,
    difficulty: 'Fácil',
    categories: ['cultura-historia'],
    shortDescription: 'Ingeniería hidráulica incaica en Tipón, urbanismo preinca Wari en Pikillacta y arte barroco en Andahuaylillas.',
    altitude: '3,100 msnm - 3,560 msnm',
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
    recommendations: [
      'Llevar Boleto Turístico del Cusco (o adquirirlo en el primer punto)',
      'Gorra, lentes de sol y bloqueador solar',
      'Monedas sueltas en soles para la iglesia de Andahuaylillas'
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
    categories: ['experiencias-especiales', 'cultura-historia'],
    shortDescription: 'Visita el último puente colgante de ichu tejido a mano por comunidades andinas siguiendo una tradición milenaria.',
    altitude: '3,700 msnm',
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
    recommendations: [
      'Ropa abrigadora para la mañana y cómoda para el mediodía',
      'Zapatos confortables para cruzar el cañón del río Apurímac',
      'Cámara con gran angular para vistas del cañón'
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
    categories: ['experiencias-especiales', 'cultura-historia'],
    shortDescription: 'Esculturas gigantes talladas en roca viva, figuras de fantasía andina y la tranquilidad del humedal ecológico.',
    altitude: '3,400 msnm',
    includes: ['Transporte turístico', 'Servicio de guiado', 'Ingresos'],
    excludes: ['Almuerzo en Saylla'],
    itinerary: [
      '09:30 am - Recojo de su hotel',
      '10:00 am - Visita a la Morada de los Dioses (Apukunaq Tianan)',
      '12:30 pm - Visita al Valle de los Duendes',
      '13:30 pm - Almuerzo en Saylla (opcional)',
      '14:30 pm - Visita al Humedal de Huasao',
      '16:30 pm - Parque temático de los ENTS',
      '18:00 pm - Retorno a Cusco'
    ],
    recommendations: [
      'Ideal para toda la familia y niños',
      'Calzado liviano y ropa cómoda',
      'Dinero en efectivo para degustar chicharrón en Saylla si se desea'
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
    categories: ['naturaleza-montanas', 'aventura', 'experiencias-especiales'],
    shortDescription: 'Circuito de lagunas de aguas cristalinas al pie del Apu Ausangate, finalizando con un baño en aguas termales de Pacchanta.',
    altitude: '4,300 msnm - 4,600 msnm',
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
    recommendations: [
      'Traje de baño y toalla para las aguas termales medicinales',
      'Excelente aclimatación previa requerida',
      'Casaca abrigadora impermeable y cortavientos',
      'Snacks energéticos como frutos secos o barras de chocolate'
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
    categories: ['naturaleza-montanas', 'aventura'],
    shortDescription: 'Expedición al casquete de hielo tropical más extenso del planeta, un santuario glaciar puro en la cordillera.',
    altitude: '5,100 msnm',
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
    recommendations: [
      'Tour para aventureros experimentados con buena resistencia física',
      'Ropa de montaña técnica (primera capa térmica, polar, casaca cortavientos)',
      'Lentes de sol con protección UV alta (el reflejo de la nieve es intenso)',
      'Guantes térmicos y pasamontañas'
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
    categories: ['naturaleza-montanas', 'aventura', 'cultura-historia'],
    shortDescription: 'Santuario y fortaleza en forma de cuerno erigida sobre el majestuoso cañón del río Apurímac.',
    altitude: '4,140 msnm',
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
    recommendations: [
      'Condición física moderada a buena (caminata prolongada de unas 5 a 6 horas totales)',
      'Calzado de trekking con buen soporte de tobillo',
      'Mochila ligera con agua suficiente (mínimo 2 litros por persona)',
      'Protector solar y sombrero de ala ancha'
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
    categories: ['cultura-historia', 'naturaleza-montanas'],
    shortDescription: 'Los asombrosos andenes circulares concéntricos de Moray y más de tres mil pozas artesanales de sal en Maras.',
    altitude: '3,385 msnm - 3,500 msnm',
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
    recommendations: [
      'Boleto turístico parcial o integral para Moray',
      'Entrada a Salineras de Maras (se abona en puerta en soles)',
      'Comprar sal rosada gourmet en las salineras directamente a los productores locales'
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
    categories: ['cultura-historia'],
    shortDescription: 'Ruta clásica recorriendo el mercado artesanal de Pisac, almuerzo buffet en Urubamba y la fortaleza de Ollantaytambo.',
    altitude: '2,870 msnm - 3,760 msnm',
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
    recommendations: [
      'Excelente tour para los primeros días en Cusco por su menor altitud en el valle',
      'Ropa ligera para el mediodía y abrigo para la tarde',
      'Boleto Turístico del Cusco incluido en la tarifa'
    ],
    image: 'https://denomades.imgix.net/destinos/cusco/337/valle-sagrado-de-los-incas.jpg',
    featured: true
  },
  {
    id: 'colores-cuatrimoto',
    title: 'Montaña en Cuatrimoto (Ind)',
    duration: '1 Día',
    places: ['Vinicunca', 'Cusipata', 'Cuatrimotos'],
    price: 65,
    difficulty: 'Moderado',
    categories: ['aventura', 'naturaleza-montanas'],
    shortDescription: 'Asciende hacia la Montaña de 7 Colores al mando de tu propia cuatrimoto, reduciendo el esfuerzo a pie y maximizando la emoción.',
    altitude: '5,036 msnm',
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
    recommendations: [
      'Ropa abrigadora que pueda recibir polvo del camino',
      'Lentes de sol o antiparras para el viento',
      'Seguir en todo momento las instrucciones del guía motorizado'
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
    categories: ['aventura', 'cultura-historia'],
    shortDescription: 'Velocidad y paisajes andinos por caminos de herradura hacia la apacible Laguna de Huaypo y el poblado de Maras.',
    altitude: '3,385 msnm - 3,500 msnm',
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
    recommendations: [
      'Casaca o cortavientos resistente',
      'Seguir la ruta asignada y mantener distancia de seguridad',
      'Portar DNI o pasaporte físico'
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
    categories: ['naturaleza-montanas'],
    shortDescription: 'La alternativa suave y relajada a Vinicunca: tres cordilleras de colores visibles con una caminata de pendiente suave.',
    altitude: '4,800 msnm',
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
    recommendations: [
      'Ideal para personas que buscan evitar caminatas extenuantes a gran altitud',
      'Llevar abrigo térmico y gorro',
      'Bastones de trekking opcionales pero recomendables'
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
    categories: ['traslados-servicios'],
    shortDescription: 'Servicio privado, puntual y confortable de bienvenida o despedida entre el Aeropuerto Velasco Astete y tu hotel en Cusco.',
    altitude: '3,400 msnm',
    includes: ['Transporte privado', 'Recojo con cartel', 'Asistencia'],
    excludes: ['Propinas'],
    itinerary: [
      'Recojo del Aeropuerto de Cusco o Terminal de Buses',
      'Traslado directo a su hotel en el centro',
      'Breve orientación sobre la ciudad en el camino',
      'Ayuda con el equipaje'
    ],
    recommendations: [
      'Proporcionar número de vuelo y aerolínea al confirmar la reserva',
      'Identificar al conductor que portará un letrero con tu nombre en la salida'
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
    categories: ['cultura-historia', 'experiencias-especiales'],
    shortDescription: 'El viaje panorámico que une Cusco y Puno a través de templos incas, iglesias virreinales y el paso cordillerano de La Raya.',
    altitude: '3,400 msnm - 4,335 msnm',
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
    recommendations: [
      'Excelente opción de transporte y turismo combinado entre Cusco y el Lago Titicaca',
      'Llevar equipaje principal en bodega del bus y mochila pequeña en cabina',
      'Llevar documento de identidad para el ingreso a los sitios'
    ],
    image: 'https://www.incaspath.com/wp-content/uploads/2021/03/ruta-del-sol.webp'
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'machu-picchu',
    name: 'Machu Picchu',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
    description: 'La legendaria llaqta inca, Patrimonio de la Humanidad y Maravilla del Mundo enclavada en la ceja de selva andina.',
    altitude: '2,430 msnm',
    highlights: ['Templo del Sol', 'Intihuatana', 'Huayna Picchu', 'Aguas Calientes'],
    tourIds: ['machupicchu-fullday']
  },
  {
    id: 'montana-colores',
    name: 'Montaña de Colores (Vinicunca)',
    image: 'https://i0.wp.com/blog.expan.pro/wp-content/uploads/2024/11/VINICUNCA1.jpg?resize=1000%2C716&ssl=1',
    description: 'La cumbre multicolor más famosa del continente, donde minerales sedimentarios forman un arcoíris en la roca.',
    altitude: '5,036 msnm',
    highlights: ['Valle Rojo', 'Mirador Principal', 'Vistas del Ausangate', 'Ruta en cuatrimotos'],
    tourIds: ['montana-colores', 'colores-cuatrimoto', 'montana-palccoyo']
  },
  {
    id: 'laguna-humantay',
    name: 'Laguna Humantay',
    image: 'https://picchutravel.com/wp-content/uploads/tour-laguna-humantay-1-dia-cusco-870x555.webp',
    description: 'Laguna de origen glaciar con aguas de intenso color esmeralda y turquesa custodiada por el nevado Salkantay.',
    altitude: '4,200 msnm',
    highlights: ['Soraypampa', 'Aguas Turquesas', 'Nevado Salkantay', 'Pachatata ritual'],
    tourIds: ['laguna-humantay', '7-lagunas']
  },
  {
    id: 'valle-sagrado',
    name: 'Valle Sagrado de los Incas',
    image: 'https://images.unsplash.com/photo-1590050752117-23a9d7f28243?auto=format&fit=crop&w=800&q=80',
    description: 'El corazón fértil del Tahuantinsuyo, regado por el río Vilcanota y flanqueado por fortalezas como Ollantaytambo y Pisac.',
    altitude: '2,870 msnm',
    highlights: ['Ollantaytambo', 'Pisac', 'Chinchero', 'Salineras de Maras'],
    tourIds: ['super-valle-sagrado', 'valle-sagrado-tradicional', 'maras-moray-salineras', 'cuatrimotos-valle']
  }
];

export const REAL_TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Claudia y Roberto M.',
    location: 'Santiago, Chile',
    rating: 5,
    comment: 'Viajamos en pareja a Machu Picchu y Humantay. Excelente puntualidad en los recojos de hotel y guías muy preparados. La comunicación por WhatsApp resolvió todas nuestras dudas antes del viaje.',
    tourTitle: 'Machu Picchu Full Day & Laguna Humantay'
  },
  {
    id: 'test-2',
    name: 'Mateo Fernández',
    location: 'Buenos Aires, Argentina',
    rating: 5,
    comment: 'Hicimos el Super Valle Sagrado y la Montaña en Cuatrimoto. Todo fue tal como lo describieron, sin costos ocultos y con almuerzo buffet riquísimo en Urubamba.',
    tourTitle: 'Super Valle Sagrado & Cuatrimotos'
  },
  {
    id: 'test-3',
    name: 'Sophie & Marc D.',
    location: 'París, Francia',
    rating: 5,
    comment: 'Servicio impecable desde el traslado en el aeropuerto hasta la excursión a Vinicunca. Nos brindaron bastones y asistencia con el tema de la altitud. Totalmente recomendados.',
    tourTitle: 'Montaña de Colores & Traslados Cusco'
  }
];

