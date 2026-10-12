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
  const [legalModal, setLegalModal] = React.useState<'terminos' | 'politicas' | null>(null);

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
            <button 
              type="button" 
              onClick={() => setLegalModal('terminos')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Términos y Condiciones
            </button>
            <span>•</span>
            <button 
              type="button" 
              onClick={() => setLegalModal('politicas')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Políticas de Reserva
            </button>
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

      {/* Modal de Documentos Legales */}
      {legalModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLegalModal(null)}
        >
          <div 
            className="bg-white text-dark rounded-sm max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-border relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4 border-b border-border pb-3">
              <h3 className="text-lg font-light font-heading text-dark">
                {legalModal === 'terminos' ? 'Términos y Condiciones' : 'Políticas de Reserva y Cancelación'}
              </h3>
              <button 
                onClick={() => setLegalModal(null)} 
                className="text-muted-foreground hover:text-dark p-1 text-sm font-bold"
                aria-label="Cerrar modal"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-dark/80 font-light leading-relaxed space-y-3">
              {legalModal === 'terminos' ? (
                <>
                  <p><strong>1. Identidad y Operación:</strong> Cusco Infinity Travel es una agencia de viajes local formal con base en Cusco, Perú, autorizada para la intermediación y operación de servicios turísticos.</p>
                  <p><strong>2. Precios y Tarifas:</strong> Todas las tarifas están expresadas en dólares estadounidenses (USD) por persona. Los boletos, ingresos y servicios incluidos se detallan explícitamente en la ficha de cada paquete.</p>
                  <p><strong>3. Documentación Obligatoria:</strong> El pasajero debe portar su documento de identidad original (DNI para peruanos o Pasaporte original para extranjeros) durante todos los tours arqueológicos.</p>
                  <p><strong>4. Aclimatación y Salud:</strong> Varios destinos sobrepasan los 4,200 msnm. Es responsabilidad del viajero seguir las recomendaciones de aclimatación y contar con aptitud médica para caminatas de alta montaña.</p>
                </>
              ) : (
                <>
                  <p><strong>1. Confirmación de Cupos:</strong> Las reservas se confirman mediante comunicación directa y emisión de voucher. Para Machu Picchu, los boletos nominativos están sujetos a la disponibilidad oficial del Ministerio de Cultura.</p>
                  <p><strong>2. Reprogramaciones:</strong> Notificaciones de cambio de fecha con más de 72 horas de anticipación son procesadas según disponibilidad de transporte y guías.</p>
                  <p><strong>3. Boletos no Reembolsables:</strong> Los boletos oficiales de trenes (PeruRail / Inca Rail) y los ingresos a Machu Picchu son de carácter personal, intransferible y no reembolsables según las normativas vigentes del estado peruano.</p>
                  <p><strong>4. Casos Fortuitos:</strong> Ante bloqueos de carreteras o condiciones climáticas extremas, la agencia brindará alternativas de ruta o reprogramación resguardando siempre la seguridad física del viajero.</p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="bg-dark hover:bg-primary text-white text-xs font-semibold px-5 py-2.5 rounded-sm transition-colors uppercase tracking-wider"
              >
                Entendido y Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
