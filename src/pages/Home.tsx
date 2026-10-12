import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  PACKAGES, 
  TOUR_CATEGORIES, 
  DESTINATIONS, 
  WHATSAPP_NUMBER, 
  HERO_BG_IMAGE, 
  MAPS_URL,
  WHATSAPP_DISPLAY,
  AGENCY_EMAIL,
  AGENCY_ADDRESS,
  REAL_TESTIMONIALS
} from '@/constants';
import TourCard from '@/components/TourCard';
import ExperienceQuiz from '@/components/ExperienceQuiz';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  Compass, 
  ShieldCheck, 
  Clock, 
  Users, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Star,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

import { useAgencyData } from '@/context/AgencyDataContext';

export default function Home() {
  const { packages: allPackages, testimonials: allTestimonials, settings } = useAgencyData();
  const packages = allPackages.filter(p => p.active !== false);
  const testimonials = allTestimonials;

  // Select active featured packages (up to 6)
  const featuredPackages = packages.filter(p => p.featured && p.active !== false).slice(0, 6);

  // Active testimonials
  const activeTestimonials = testimonials.filter(t => (t as { active?: boolean }).active !== false).slice(0, 3);

  const handleContactAdvisor = () => {
    const text = encodeURIComponent(
      'Hola, deseo conversar con un asesor de Cusco Infinity Travel para planificar mi viaje a Cusco.'
    );
    const num = settings.whatsappNumber || WHATSAPP_NUMBER;
    window.open(`https://wa.me/51${num}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Experiencias Exclusivas en Cusco y Machu Picchu"
        description="Agencia de viajes líder en Cusco. Diseñamos experiencias auténticas en Machu Picchu, Valle Sagrado, Laguna Humantay y Montaña de Colores."
        canonicalPath="/"
      />

      {/* ============================================================== */}
      {/* SECCIÓN 1 — HERO                                               */}
      {/* ============================================================== */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-dark">
        {/* Background Image with Slow Subtle Zoom */}
        <motion.div 
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1.08, opacity: 0.65 }}
          transition={{ 
            duration: 22, 
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${HERO_BG_IMAGE}")` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/30 to-dark/95" />
        </motion.div>

        <div className="container relative z-10 px-4 sm:px-6 text-center text-white pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-block px-6 py-2 mb-8 text-[11px] font-semibold tracking-[0.4em] uppercase border border-white/25 rounded-full backdrop-blur-md bg-white/5">
              Cusco Infinity Travel • Agencia Oficial
            </span>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light mb-8 leading-[0.88] tracking-tight font-heading uppercase">
              DESCUBRE <br />
              <span className="italic text-metallic">CUSCO</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg mb-12 max-w-2xl mx-auto text-white/85 font-light tracking-wide leading-relaxed">
              Asesoría experta inspirada en la mística de los Andes para transformar tu estancia en una experiencia inolvidable, segura y auténtica.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link to="/tours">
                <Button 
                  size="lg" 
                  className="bg-metallic text-dark font-bold hover:scale-105 transition-all duration-300 px-10 py-7 text-[11px] tracking-[0.25em] uppercase rounded-sm border-none shadow-xl"
                >
                  Explorar experiencias
                </Button>
              </Link>
              
              <Button 
                variant="outline"
                size="lg"
                onClick={handleContactAdvisor}
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md font-semibold px-8 py-7 text-[11px] tracking-[0.25em] uppercase rounded-sm transition-all duration-300"
              >
                Contactar asesor
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-60">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/60">Descubre Más</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECCIÓN 2 — ENCUENTRA TU EXPERIENCIA IDEAL                     */}
      {/* ============================================================== */}
      <section id="recomendador" className="py-20 lg:py-28 bg-[#F8F5EE] border-b border-border/60">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-3">
              Planificación Sin Complicaciones
            </span>
            <h2 className="text-3xl sm:text-5xl font-light font-heading text-dark">
              ¿No sabes qué tour elegir?
            </h2>
            <p className="text-sm text-muted-foreground font-light mt-3 leading-relaxed">
              Utiliza nuestro recomendador turístico determinista. Analiza al instante tus gustos, tiempo libre y nivel de caminata para ofrecerte la combinación perfecta.
            </p>
          </div>

          <ExperienceQuiz />
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECCIÓN 3 — CATEGORÍAS TURÍSTICAS                              */}
      {/* ============================================================== */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-14 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-2">
                Explora Por Temática
              </span>
              <h2 className="text-3xl sm:text-5xl font-light font-heading text-dark">
                Categorías <span className="italic text-primary">Turísticas</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground font-light max-w-md">
              Desde la ciudadela sagrada de Machu Picchu hasta rutas en cuatrimoto y glaciares andinos vírgenes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TOUR_CATEGORIES.map((cat) => (
              <Link 
                key={cat.id} 
                to={`/tours?categoria=${cat.id}`}
                className="group relative aspect-[4/3] rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border/60"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent opacity-75 group-hover:opacity-65 transition-opacity" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-white/70 font-semibold block mb-1">
                    Colección
                  </span>
                  <h3 className="text-2xl font-normal font-heading leading-tight group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-white/80 font-light mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {cat.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-primary">
                    <span>Ver Tours</span>
                    <ChevronRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECCIÓN 4 — PAQUETES DESTACADOS                                */}
      {/* ============================================================== */}
      <section className="py-20 lg:py-28 bg-[#FBF9F4] border-y border-border/60">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-3">
                Selección de Excelencia
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-light font-heading text-dark leading-none">
                Paquetes <br /><span className="italic text-primary">Destacados</span>
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <p className="text-xs sm:text-sm text-muted-foreground font-light max-w-sm leading-relaxed">
                Nuestras experiencias más elegidas por viajeros internacionales, con traslados puntuales y guías oficiales bilingües.
              </p>
              <Link 
                to="/tours"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-primary hover:text-dark transition-colors"
              >
                <span>Explorar todos los tours ({PACKAGES.length})</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          <div className="text-center mt-14">
            <Link to="/tours">
              <Button 
                size="lg"
                className="bg-dark text-white hover:bg-primary font-bold px-12 py-7 text-xs uppercase tracking-[0.25em] rounded-sm transition-all duration-300"
              >
                Explorar todos los tours
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECCIÓN 5 — DESTINOS IMPERDIBLES                               */}
      {/* ============================================================== */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-14 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-2">
                Geografía Sagrada
              </span>
              <h2 className="text-3xl sm:text-5xl font-light font-heading text-dark">
                Destinos <span className="italic text-primary">Imperdibles</span>
              </h2>
            </div>
            <Link 
              to="/destinos"
              className="text-xs uppercase tracking-widest font-bold text-primary hover:text-dark transition-colors flex items-center gap-1.5"
            >
              <span>Ver guía de destinos</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            {DESTINATIONS.map((dest, index) => (
              <div
                key={dest.id}
                className={`relative overflow-hidden group rounded-sm border border-border/60 ${
                  index === 0 ? 'md:col-span-8 md:row-span-2 aspect-[16/10] md:aspect-auto min-h-[380px]' : 
                  index === 1 ? 'md:col-span-4 aspect-square' :
                  index === 2 ? 'md:col-span-4 aspect-square' :
                  'md:col-span-12 aspect-[21/9] min-h-[260px]'
                }`}
              >
                <img 
                  src={dest.image} 
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/30 to-transparent opacity-70 group-hover:opacity-60 transition-opacity" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-white/70 font-semibold block mb-1">
                    {dest.altitude || 'Andes Peruanos'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light font-heading text-white mb-2">
                    {dest.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 font-light max-w-md line-clamp-2">
                    {dest.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECCIÓN 6 — ¿POR QUÉ VIAJAR CON NOSOTROS?                      */}
      {/* ============================================================== */}
      <section className="py-20 lg:py-28 bg-dark text-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-3">
              Valores Reales y Verificables
            </span>
            <h2 className="text-3xl sm:text-5xl font-light font-heading">
              ¿Por qué viajar con <span className="italic text-metallic">Cusco Infinity Travel</span>?
            </h2>
            <p className="text-xs sm:text-sm text-white/70 font-light mt-3 leading-relaxed">
              Basamos nuestro servicio en el conocimiento local directo de Cusco, la transparencia en los boletos y la tranquilidad integral de cada pasajero.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 border border-white/10 rounded-sm bg-white/[0.02] hover:bg-white/[0.05] transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6">
                <Compass size={22} />
              </div>
              <h3 className="text-lg font-medium font-heading mb-3">Asesoría Local Directa</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Conocemos las rutas, microclimas y temporadas en los Andes. Diseñamos itinerarios realistas que respetan los tiempos de aclimatación.
              </p>
            </div>

            <div className="p-8 border border-white/10 rounded-sm bg-white/[0.02] hover:bg-white/[0.05] transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-lg font-medium font-heading mb-3">Transparencia Total</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Sin cargos ocultos ni sorpresas de último momento. Te indicamos con exactitud qué entradas y boletos turísticos incluye cada paquete.
              </p>
            </div>

            <div className="p-8 border border-white/10 rounded-sm bg-white/[0.02] hover:bg-white/[0.05] transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6">
                <Users size={22} />
              </div>
              <h3 className="text-lg font-medium font-heading mb-3">Grupos y Privados</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Opciones grupales reducidas o traslados 100% privados para que viajes a tu propio ritmo junto a tu familia o acompañantes.
              </p>
            </div>

            <div className="p-8 border border-white/10 rounded-sm bg-white/[0.02] hover:bg-white/[0.05] transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6">
                <Clock size={22} />
              </div>
              <h3 className="text-lg font-medium font-heading mb-3">Asistencia Continua</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Te acompañamos vía WhatsApp antes de tu llegada y durante cada jornada de tour para cualquier consulta, reprogramación o duda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECCIÓN 7 — CONOCE NUESTRA AGENCIA                             */}
      {/* ============================================================== */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-3">
                Identidad y Pasión Andina
              </span>
              <h2 className="text-3xl sm:text-5xl font-light font-heading text-dark leading-tight mb-6">
                Cusco Infinity Travel: Tu Aliado Local en la Capital Inca
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                <p>
                  Nacimos en el corazón de Cusco con una misión clara: ofrecer a los viajeros una alternativa confiable, honesta y dedicada a la excelencia en cada rincón de nuestra cordillera.
                </p>
                <p>
                  No somos una plataforma masiva e impersonal. Coordinamos cada viaje de manera cercana, facilitando desde los traslados privados desde el aeropuerto hasta las reservas de trenes y boletos para Machu Picchu.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-border flex flex-wrap gap-6 items-center">
                <Link to="/nosotros">
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-xs uppercase tracking-wider rounded-sm"
                  >
                    Conoce más sobre nosotros
                  </Button>
                </Link>
                <Link 
                  to="/contacto"
                  className="text-xs uppercase tracking-wider font-bold text-dark hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span>Hablar con un asesor</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border border-border">
                <img 
                  src="https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=1000&q=80" 
                  alt="Valle Sagrado de los Incas por Cusco Infinity Travel"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-dark/20" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-md rounded-sm border border-border/80">
                  <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-primary block">Oficina Central</span>
                  <p className="text-xs font-semibold text-dark mt-0.5">{AGENCY_ADDRESS}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECCIÓN 8 — TESTIMONIOS Y CONFIANZA VERIFICABLE                */}
      {/* ============================================================== */}
      <section className="py-20 lg:py-28 bg-[#F8F5EE] border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-2">
              Opiniones Verificables
            </span>
            <h2 className="text-3xl sm:text-5xl font-light font-heading text-dark">
              La Confianza de <span className="italic text-primary">Nuestros Viajeros</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-light mt-3 leading-relaxed">
              Valoramos la autenticidad y la honestidad en cada servicio prestado. Te invitamos a conocer las experiencias de quienes han recorrido los Andes con nosotros.
            </p>
          </div>

          {/* Verified Testimonials Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {activeTestimonials.map((t) => (
              <div 
                key={t.id} 
                className="bg-white p-6 sm:p-8 border border-border rounded-sm shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-primary mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs text-dark/85 font-light leading-relaxed italic mb-4">
                    "{t.comment}"
                  </p>
                </div>
                <div className="pt-4 border-t border-border/60">
                  <span className="text-xs font-semibold text-dark block">
                    {t.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                    {t.location}
                  </span>
                  {(t as { tourTitle?: string }).tourTitle && (
                    <span className="text-[10px] text-primary/80 font-medium block mt-1">
                      Tour: {(t as { tourTitle?: string }).tourTitle}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center pt-4">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-primary hover:text-dark transition-colors"
            >
              <span>Ver ubicación y opiniones verificadas en Google Maps</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECCIÓN 9 — CONTACTO RÁPIDO                                    */}
      {/* ============================================================== */}
      <section className="py-20 lg:py-28 bg-white border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-dark text-white rounded-sm p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-3">
                Comienza a Planificar
              </span>
              <h2 className="text-3xl sm:text-5xl font-light font-heading mb-4">
                ¿Listo para vivir la magia de los Andes?
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light max-w-xl mx-auto mb-10 leading-relaxed">
                Escríbenos directamente por WhatsApp o visítanos en nuestra oficina en Cusco. Te asesoramos con cotizaciones personalizadas y fechas disponibles.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg"
                  className="bg-[#25D366] hover:bg-[#1fb355] text-white font-bold px-10 py-7 text-xs uppercase tracking-wider rounded-sm shadow-xl flex items-center gap-2 w-full sm:w-auto"
                  onClick={() => window.open(`https://wa.me/51${WHATSAPP_NUMBER}`, '_blank')}
                >
                  <Phone size={16} />
                  <span>Escribir por WhatsApp ({WHATSAPP_DISPLAY})</span>
                </Button>

                <Link to="/contacto" className="w-full sm:w-auto">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-bold px-8 py-7 text-xs uppercase tracking-wider rounded-sm w-full"
                  >
                    Ver datos de contacto
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
