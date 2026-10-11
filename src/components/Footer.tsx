import React from 'react';
import { Link } from 'react-router-dom';
import { 
  WHATSAPP_NUMBER, 
  WHATSAPP_DISPLAY, 
  AGENCY_EMAIL, 
  AGENCY_ADDRESS, 
  MAPS_URL, 
  AGENCY_LOGO 
} from '@/constants';
import { MapPin, Phone, Mail, Instagram, Facebook, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-20 pb-12 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          
          {/* Column 1: Agency Brand & Mission */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-4 mb-6 group inline-block">
              <div className="w-16 h-16 flex items-center justify-center shrink-0">
                <img 
                  src={AGENCY_LOGO} 
                  alt="Cusco Infinity Travel"
                  className="h-full w-auto object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-[0.2em] uppercase leading-none font-heading">
                  Cusco Infinity
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium mt-1 text-white/60">
                  Travel Agency
                </span>
              </div>
            </Link>
            
            <p className="text-xs text-white/60 max-w-sm leading-relaxed font-light mb-6">
              Agencia de viajes local especializada en experiencias exclusivas, culturales y de aventura en Cusco, Valle Sagrado y Machu Picchu. Atención personalizada con los más altos estándares de calidad y seguridad.
            </p>

            <div className="flex items-center gap-2 text-xs text-primary/90 font-medium">
              <ShieldCheck size={16} className="text-primary shrink-0" />
              <span>Operación local directa con base en Cusco, Perú</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-primary">
              Navegación
            </h4>
            <ul className="space-y-3 text-xs tracking-wider uppercase font-semibold">
              <li>
                <Link to="/" className="text-white/80 hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/tours" className="text-white/80 hover:text-primary transition-colors">
                  Catálogo de Tours
                </Link>
              </li>
              <li>
                <Link to="/destinos" className="text-white/80 hover:text-primary transition-colors">
                  Destinos Imperdibles
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-white/80 hover:text-primary transition-colors">
                  Nuestra Agencia
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-white/80 hover:text-primary transition-colors">
                  Contacto y Asesoría
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Experiences */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-primary">
              Destacados
            </h4>
            <ul className="space-y-3 text-xs text-white/70 font-light">
              <li>
                <Link to="/tours/machupicchu-fullday" className="hover:text-primary transition-colors">
                  Machu Picchu Full Day
                </Link>
              </li>
              <li>
                <Link to="/tours/super-valle-sagrado" className="hover:text-primary transition-colors">
                  Super Valle Sagrado
                </Link>
              </li>
              <li>
                <Link to="/tours/montana-colores" className="hover:text-primary transition-colors">
                  Montaña de Colores
                </Link>
              </li>
              <li>
                <Link to="/tours/laguna-humantay" className="hover:text-primary transition-colors">
                  Laguna Humantay
                </Link>
              </li>
              <li>
                <Link to="/tours/ruta-del-sol" className="hover:text-primary transition-colors">
                  Ruta del Sol
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Contact info */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-primary">
              Atención y Reservas
            </h4>
            <ul className="space-y-4 text-xs font-light text-white/80">
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-white/50">WhatsApp Oficial</span>
                  <a 
                    href={`https://wa.me/51${WHATSAPP_NUMBER}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors font-medium"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-white/50">Correo Electrónico</span>
                  <a 
                    href={`mailto:${AGENCY_EMAIL}`} 
                    className="hover:text-primary transition-colors font-medium"
                  >
                    {AGENCY_EMAIL}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-white/50">Ubicación</span>
                  <a 
                    href={MAPS_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <span>{AGENCY_ADDRESS}</span>
                    <ExternalLink size={12} className="opacity-70" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p className="text-[11px] tracking-wider text-center sm:text-left">
            © {currentYear} Cusco Infinity Travel. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-[11px] tracking-wider">
            <Link to="/contacto" className="hover:text-white transition-colors">Términos y Condiciones</Link>
            <span>•</span>
            <Link to="/contacto" className="hover:text-white transition-colors">Políticas de Reserva</Link>
            <span>•</span>
            <a 
              href={MAPS_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Ver en Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
