import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PACKAGES, WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '@/constants';
import SEOHead from '@/components/SEOHead';
import TourCard from '@/components/TourCard';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  MapPin, 
  Activity, 
  Mountain, 
  Check, 
  Minus, 
  AlertCircle, 
  Phone, 
  ArrowLeft, 
  Share2, 
  Calendar,
  ShieldCheck,
  Compass
} from 'lucide-react';

export default function TourDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find tour by ID
  const tour = PACKAGES.find((p) => p.id === id);

  if (!tour) {
    return (
      <div className="min-h-screen bg-background pt-36 pb-24">
        <div className="container mx-auto px-4 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={28} />
          </div>
          <h1 className="text-3xl font-light font-heading text-dark mb-3">
            Tour no encontrado
          </h1>
          <p className="text-xs text-muted-foreground font-light mb-8 leading-relaxed">
            El paquete turístico que buscas no existe o ha sido modificado en nuestro catálogo.
          </p>
          <Link to="/tours">
            <Button className="bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider px-8 py-6 rounded-sm">
              Ver catálogo completo de tours
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Related tours (same category or difficulty, excluding current tour)
  const relatedTours = PACKAGES.filter((p) => {
    if (p.id === tour.id) return false;
    const shareCategory = tour.categories && p.categories?.some(c => tour.categories?.includes(c));
    const sameDifficulty = p.difficulty === tour.difficulty;
    return shareCategory || sameDifficulty;
  }).slice(0, 3);

  // Personalized WhatsApp booking URL
  const whatsAppMessage = encodeURIComponent(
    `Hola, estoy interesado en el paquete ${tour.title} de Cusco Infinity Travel. Me gustaría recibir información y disponibilidad.`
  );
  const whatsAppUrl = `https://wa.me/51${WHATSAPP_NUMBER}?text=${whatsAppMessage}`;

  const difficultyColors = {
    'Fácil': 'bg-emerald-50 text-emerald-800 border-emerald-200',
    'Moderado': 'bg-amber-50 text-amber-800 border-amber-200',
    'Desafiante': 'bg-rose-50 text-rose-800 border-rose-200'
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <SEOHead 
        title={`${tour.title} - Tour en Cusco`}
        description={`Conoce el tour ${tour.title} con Cusco Infinity Travel. Itinerario detallado, inclusiones, precios desde $${tour.price} USD por persona y reservas directas.`}
        canonicalPath={`/tours/${tour.id}`}
      />

      {/* Back button & Breadcrumb */}
      <div className="container mx-auto px-4 sm:px-6 mb-8 pt-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <button 
            onClick={() => navigate('/tours')}
            className="inline-flex items-center gap-1.5 text-dark hover:text-primary transition-colors font-semibold uppercase tracking-wider text-[11px]"
          >
            <ArrowLeft size={14} />
            <span>Volver al Catálogo</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-wider">
            <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
            <span>/</span>
            <Link to="/tours" className="hover:text-primary transition-colors">Tours</Link>
            <span>/</span>
            <span className="text-dark font-semibold truncate max-w-[200px]">{tour.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Hero Banner */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] min-h-[380px] max-h-[560px] rounded-sm overflow-hidden shadow-2xl mb-12 bg-dark">
          <img 
            src={tour.image} 
            alt={`Experiencia ${tour.title} en Cusco`}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-dark/20" />
          
          <div className="absolute bottom-8 left-6 sm:left-10 right-6 sm:right-10 text-white">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-sm border ${difficultyColors[tour.difficulty]}`}>
                Dificultad {tour.difficulty}
              </span>
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest font-semibold rounded-sm">
                Duración: {tour.duration}
              </span>
              {tour.altitude && (
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest font-semibold rounded-sm hidden sm:inline-block">
                  Altitud: {tour.altitude}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light font-heading leading-tight mb-4">
              {tour.title}
            </h1>

            {tour.shortDescription && (
              <p className="text-xs sm:text-sm text-white/80 font-light max-w-2xl leading-relaxed">
                {tour.shortDescription}
              </p>
            )}
          </div>
        </div>

        {/* Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Visited places */}
            <div className="bg-white p-6 sm:p-8 rounded-sm border border-border shadow-sm">
              <h2 className="text-xs uppercase tracking-[0.25em] font-bold text-primary mb-4 flex items-center gap-2">
                <MapPin size={16} />
                Lugares y Atractivos Visitados
              </h2>
              <div className="flex flex-wrap gap-2">
                {tour.places.map((place, i) => (
                  <span 
                    key={i} 
                    className="px-3.5 py-1.5 bg-muted/40 border border-border/80 text-dark text-xs font-medium rounded-full"
                  >
                    {place}
                  </span>
                ))}
              </div>
            </div>

            {/* Detailed Itinerary */}
            <div className="bg-white p-6 sm:p-10 rounded-sm border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
                <Clock size={20} className="text-primary" />
                <div>
                  <h2 className="text-2xl font-light font-heading text-dark">
                    Itinerario Detallado
                  </h2>
                  <p className="text-xs text-muted-foreground font-light">
                    Cronograma estimado sujeto a condiciones de clima y tráfico
                  </p>
                </div>
              </div>

              <div className="space-y-6 relative pl-6">
                <div className="absolute left-[7px] top-2 bottom-2 w-[1.5px] bg-primary/20" />
                {tour.itinerary.map((step, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-white border-2 border-primary group-hover:scale-125 transition-transform" />
                    <p className="text-xs sm:text-sm text-dark font-light leading-relaxed pl-2">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Includes & Excludes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Includes */}
              <div className="bg-white p-6 sm:p-8 rounded-sm border border-border shadow-sm">
                <h3 className="text-xs uppercase tracking-[0.25em] font-bold text-emerald-800 mb-6 flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  Servicios Incluidos
                </h3>
                <ul className="space-y-3.5">
                  {tour.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-dark/90 font-light leading-relaxed">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excludes */}
              <div className="bg-white p-6 sm:p-8 rounded-sm border border-border shadow-sm">
                <h3 className="text-xs uppercase tracking-[0.25em] font-bold text-muted-foreground mb-6 flex items-center gap-2">
                  <Minus size={16} className="text-muted-foreground" />
                  No Incluye
                </h3>
                <ul className="space-y-3.5">
                  {tour.excludes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                      <span className="w-4 h-4 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0 mt-0.5">
                        <Minus size={11} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Traveler Recommendations */}
            {tour.recommendations && tour.recommendations.length > 0 && (
              <div className="bg-[#FAF8F2] p-6 sm:p-8 rounded-sm border border-primary/20 shadow-sm">
                <h3 className="text-xs uppercase tracking-[0.25em] font-bold text-primary mb-4 flex items-center gap-2">
                  <Compass size={16} />
                  Recomendaciones para el Viajero
                </h3>
                <ul className="space-y-2.5">
                  {tour.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-dark/80 font-light">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white p-6 sm:p-8 rounded-sm border border-border shadow-xl space-y-6">
              
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-muted-foreground block mb-1">
                  Tarifa Oficial
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-light font-heading text-dark">
                    ${tour.price}
                  </span>
                  <span className="text-xs uppercase tracking-wider font-semibold text-primary">
                    USD / por persona
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground font-light mt-1">
                  Precio final sin comisiones ocultas. Sujeto a disponibilidad de cupos.
                </p>
              </div>

              <div className="pt-4 border-t border-border space-y-3 text-xs text-dark/80 font-light">
                <div className="flex justify-between py-1.5 border-b border-border/40">
                  <span className="text-muted-foreground">Duración:</span>
                  <span className="font-semibold text-dark">{tour.duration}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border/40">
                  <span className="text-muted-foreground">Dificultad:</span>
                  <span className="font-semibold text-dark">{tour.difficulty}</span>
                </div>
                {tour.altitude && (
                  <div className="flex justify-between py-1.5 border-b border-border/40">
                    <span className="text-muted-foreground">Altitud estimada:</span>
                    <span className="font-semibold text-dark">{tour.altitude}</span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 border-b border-border/40">
                  <span className="text-muted-foreground">Idioma de guiado:</span>
                  <span className="font-semibold text-dark">Español / Inglés</span>
                </div>
              </div>

              {/* Booking CTAs */}
              <div className="pt-4 space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#1fb355] text-white font-bold py-7 text-xs uppercase tracking-wider rounded-sm shadow-md flex items-center justify-center gap-2"
                  onClick={() => window.open(whatsAppUrl, '_blank')}
                >
                  <Phone size={16} />
                  <span>Consultar por WhatsApp</span>
                </Button>

                <div className="text-center">
                  <p className="text-[11px] text-muted-foreground font-light">
                    Respuesta rápida por nuestro equipo en Cusco: <strong className="text-dark">{WHATSAPP_DISPLAY}</strong>
                  </p>
                </div>
              </div>

              {/* Trust badge */}
              <div className="pt-4 border-t border-border flex items-center gap-3 text-xs text-muted-foreground">
                <ShieldCheck size={18} className="text-primary shrink-0" />
                <span className="text-[11px] leading-tight">
                  Operador local con base en Cusco. Asistencia antes y durante el recorrido.
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Related Tours Section */}
        {relatedTours.length > 0 && (
          <div className="mt-24 pt-16 border-t border-border">
            <div className="flex justify-between items-baseline mb-10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-2">
                  Continúa Explorando
                </span>
                <h3 className="text-2xl sm:text-4xl font-light font-heading text-dark">
                  Experiencias Relacionadas
                </h3>
              </div>
              <Link
                to="/tours"
                className="text-xs uppercase tracking-wider font-bold text-primary hover:text-dark transition-colors"
              >
                Ver todo el catálogo
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedTours.map((relTour) => (
                <TourCard key={relTour.id} tour={relTour} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
