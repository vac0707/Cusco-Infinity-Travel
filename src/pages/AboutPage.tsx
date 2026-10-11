import React from 'react';
import { Link } from 'react-router-dom';
import { AGENCY_ADDRESS, WHATSAPP_NUMBER, MAPS_URL, WHATSAPP_DISPLAY } from '@/constants';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { 
  ShieldCheck, 
  Compass, 
  HeartHandshake, 
  MapPin, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Phone
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <SEOHead 
        title="Nosotros | Cusco Infinity Travel"
        description="Conoce la filosofía, origen y equipo de Cusco Infinity Travel. Agencia de viajes con sede en Cusco, dedicada al turismo responsable y vivencias auténticas."
        canonicalPath="/nosotros"
      />

      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Hero Section */}
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-3">
            Nuestra Historia y Filosofía
          </span>
          <h1 className="text-4xl sm:text-6xl font-light font-heading text-dark leading-none mb-6">
            Nuestra <span className="italic text-primary">Agencia</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
            En Cusco Infinity Travel concebimos cada travesía andina no como un simple paquete turístico, sino como un puente genuino entre el viajero y la milenaria cultura de nuestros antepasados incas.
          </p>
        </div>

        {/* Story & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          <div className="lg:col-span-6 space-y-6 text-xs sm:text-sm text-dark/80 font-light leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-light font-heading text-dark">
              Raíces Locales con Vocación de Excelencia
            </h2>
            <p>
              Operamos con base propia en la ciudad imperial del Cusco. Conocemos de primera mano los senderos de montaña, los tiempos exactos de traslado y los matices que transforman un itinerario común en un recuerdo extraordinario.
            </p>
            <p>
              Nuestra prioridad constante es tu bienestar: sabemos que la altura andina (que en ciertos recorridos supera los 4,500 msnm) exige planificación técnica, hidratación oportuna y asesoría transparente para que disfrutes cada cumbre con total seguridad.
            </p>
            <div className="pt-4 border-t border-border flex items-center gap-3">
              <MapPin size={18} className="text-primary shrink-0" />
              <span className="font-medium text-dark text-xs">
                Ubicados en {AGENCY_ADDRESS}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border border-border">
              <img 
                src="https://images.unsplash.com/photo-1596728082987-0b1655077f52?auto=format&fit=crop&w=1000&q=80" 
                alt="Sacsayhuaman Cusco Infinity Travel"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-dark/20" />
            </div>
          </div>
        </div>

        {/* Pillars / Values */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-2">
              Pilares Fundamentales
            </span>
            <h3 className="text-2xl sm:text-4xl font-light font-heading text-dark">
              Principios que Guían Nuestro Trabajo
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-sm border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <ShieldCheck size={22} />
              </div>
              <h4 className="text-lg font-medium font-heading text-dark mb-3">Seguridad y Respaldo</h4>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Vehículos turísticos con autorización del MTC, guías oficiales de turismo acreditados (Dircetur) y comunicación permanente antes y durante tus excursiones.
              </p>
            </div>

            <div className="bg-white p-8 rounded-sm border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <HeartHandshake size={22} />
              </div>
              <h4 className="text-lg font-medium font-heading text-dark mb-3">Turismo Sostenible</h4>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Fomentamos el respeto estricto a las comunidades locales que preservan tradiciones ancestrales en Chinchero, Ausangate, Maras y el cañón del Apurímac.
              </p>
            </div>

            <div className="bg-white p-8 rounded-sm border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Compass size={22} />
              </div>
              <h4 className="text-lg font-medium font-heading text-dark mb-3">Asesoría Personalizada</h4>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Cada viajero tiene expectativas y tiempos distintos. Adaptamos las opciones para viajar en grupos reducidos o en salidas privadas exclusivas.
              </p>
            </div>
          </div>
        </div>

        {/* Agency Action Card */}
        <div className="bg-dark text-white rounded-sm p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-3">
            Atención Inmediata
          </span>
          <h3 className="text-2xl sm:text-4xl font-light font-heading mb-4">
            ¿Planeando tu viaje a Cusco o Machu Picchu?
          </h3>
          <p className="text-xs sm:text-sm text-white/70 font-light max-w-lg mx-auto mb-8 leading-relaxed">
            Conversa con nuestros asesores locales y recibe propuestas claras con precios transparentes y recomendaciones reales para tu viaje.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-[#25D366] hover:bg-[#1fb355] text-white font-bold px-8 py-6 text-xs uppercase tracking-wider rounded-sm flex items-center gap-2"
              onClick={() => window.open(`https://wa.me/51${WHATSAPP_NUMBER}`, '_blank')}
            >
              <Phone size={16} />
              <span>Contactar por WhatsApp ({WHATSAPP_DISPLAY})</span>
            </Button>
            <Link to="/tours">
              <Button 
                variant="outline"
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-bold px-8 py-6 text-xs uppercase tracking-wider rounded-sm"
              >
                Explorar catálogo de tours
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
