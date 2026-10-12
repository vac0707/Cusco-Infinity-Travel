import React, { useState } from 'react';
import { 
  WHATSAPP_NUMBER, 
  WHATSAPP_DISPLAY, 
  AGENCY_EMAIL, 
  AGENCY_ADDRESS, 
  MAPS_URL 
} from '@/constants';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Clock, 
  Send, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    dates: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-format WhatsApp message with form details including phone
    const text = encodeURIComponent(
      `Hola Cusco Infinity Travel,\nMi nombre es: ${formData.name || 'Viajero'}\nTeléfono: ${formData.phone || 'No especificado'}\nCorreo: ${formData.email || 'No especificado'}\nDestino de interés: ${formData.destination || 'Cusco en general'}\nFechas estimadas: ${formData.dates || 'Por definir'}\nMensaje: ${formData.message || 'Deseo cotizar disponibilidad y opciones.'}`
    );
    window.open(`https://wa.me/51${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <SEOHead 
        title="Contacto y Asesoría Turística en Cusco"
        description="Contáctanos directamente en Cusco Infinity Travel. Asistencia por WhatsApp, correo y ubicación en Cusco para cotizar tours, Machu Picchu y traslados."
        canonicalPath="/contacto"
      />

      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-3">
            Canales Oficiales de Atención
          </span>
          <h1 className="text-4xl sm:text-6xl font-light font-heading text-dark leading-none mb-6">
            Contacto y <span className="italic text-primary">Asesoría</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
            Estamos listos para orientarte con transparencia sobre disponibilidad, itinerarios y recomendaciones para tu llegada a Cusco.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          
          {/* Column 1: Verified Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-sm border border-border shadow-sm space-y-6">
              <h2 className="text-xl font-medium font-heading text-dark pb-4 border-b border-border">
                Información de la Agencia
              </h2>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground block">
                    WhatsApp & Llamadas
                  </span>
                  <a 
                    href={`https://wa.me/51${WHATSAPP_NUMBER}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-dark hover:text-primary transition-colors block mt-0.5"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>
                  <p className="text-[11px] text-muted-foreground mt-0.5 font-light">
                    Atención personalizada de 07:00 a 21:00 hrs.
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground block">
                    Correo Electrónico
                  </span>
                  <a 
                    href={`mailto:${AGENCY_EMAIL}`}
                    className="text-sm font-semibold text-dark hover:text-primary transition-colors block mt-0.5"
                  >
                    {AGENCY_EMAIL}
                  </a>
                  <p className="text-[11px] text-muted-foreground mt-0.5 font-light">
                    Cotizaciones corporativas e individuales
                  </p>
                </div>
              </div>

              {/* Office Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground block">
                    Oficina en Cusco
                  </span>
                  <span className="text-sm font-semibold text-dark block mt-0.5">
                    {AGENCY_ADDRESS}
                  </span>
                  <a 
                    href={MAPS_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-medium mt-1"
                  >
                    <span>Abrir en Google Maps</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground block">
                    Horario de Operaciones
                  </span>
                  <span className="text-xs text-dark font-medium block mt-0.5">
                    Lunes a Domingo: 07:00 - 21:00 hrs
                  </span>
                  <p className="text-[11px] text-muted-foreground font-light">
                    Asistencia 24/7 para pasajeros en ruta
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="bg-[#25D366]/10 border border-[#25D366]/30 p-6 rounded-sm flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xs uppercase tracking-wider font-bold text-emerald-900">
                  ¿Prefieres respuesta inmediata?
                </h3>
                <p className="text-[11px] text-emerald-800 font-light mt-0.5">
                  Escríbenos directamente a nuestro WhatsApp oficial.
                </p>
              </div>
              <Button
                className="bg-[#25D366] hover:bg-[#1fb355] text-white text-xs font-bold uppercase tracking-wider px-5 py-4 rounded-sm shrink-0"
                onClick={() => window.open(`https://wa.me/51${WHATSAPP_NUMBER}`, '_blank')}
              >
                Chatear
              </Button>
            </div>
          </div>

          {/* Column 2: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-12 rounded-sm border border-border shadow-sm">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-primary block mb-2">
                Formulario de Consulta
              </span>
              <h2 className="text-2xl sm:text-3xl font-light font-heading text-dark mb-6">
                Envíanos tus planes de viaje
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-dark/70 block mb-1.5">
                      Nombre Completo *
                    </label>
                    <Input
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="text-xs h-11 bg-muted/20 border-border focus-visible:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-dark/70 block mb-1.5">
                      Teléfono / WhatsApp *
                    </label>
                    <Input
                      type="tel"
                      required
                      placeholder="+51 987 654 321"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="text-xs h-11 bg-muted/20 border-border focus-visible:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-dark/70 block mb-1.5">
                      Correo Electrónico *
                    </label>
                    <Input
                      type="email"
                      required
                      placeholder="ejemplo@correo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="text-xs h-11 bg-muted/20 border-border focus-visible:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-dark/70 block mb-1.5">
                      Destino o Tour de Interés
                    </label>
                    <Input
                      type="text"
                      placeholder="Ej. Machu Picchu, Humantay, Valle Sagrado"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="text-xs h-11 bg-muted/20 border-border focus-visible:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-dark/70 block mb-1.5">
                      Fechas Estimadas de Viaje
                    </label>
                    <Input
                      type="text"
                      placeholder="Ej. Noviembre 2026 / 4 días"
                      value={formData.dates}
                      onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                      className="text-xs h-11 bg-muted/20 border-border focus-visible:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider font-bold text-dark/70 block mb-1.5">
                    Mensaje o Preguntas Específicas
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Cuéntanos cuántas personas viajan, si viajan con niños o adultos mayores, o cualquier requerimiento especial..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 text-xs bg-muted/20 border border-border rounded-sm text-dark focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-xs uppercase tracking-wider rounded-sm shadow-md flex items-center justify-center gap-2"
                >
                  <Send size={15} />
                  <span>Enviar Consulta por WhatsApp</span>
                </Button>

                <p className="text-[11px] text-muted-foreground text-center font-light pt-2">
                  Al enviar la consulta, se abrirá WhatsApp con el mensaje preformateado para coordinar directamente con nuestro asesor.
                </p>
              </form>
            </div>
          </div>

        </div>

        {/* Practical FAQs */}
        <div className="bg-[#FAF8F2] p-8 sm:p-12 rounded-sm border border-border max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-primary block mb-2">
              Dudas Frecuentes
            </span>
            <h3 className="text-2xl font-light font-heading text-dark">
              Preguntas Antes de Reservar
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-light text-dark/80 leading-relaxed">
            <div className="space-y-2">
              <h4 className="font-semibold text-dark text-sm">¿Cómo se confirman las reservas?</h4>
              <p className="text-muted-foreground">
                Coordinamos los cupos y la disponibilidad de trenes y boletos oficiales con anticipación. Te brindamos voucher formal de reserva con todos los detalles confirmados.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-dark text-sm">¿En qué moneda están los precios?</h4>
              <p className="text-muted-foreground">
                Todas las tarifas publicadas en nuestro catálogo están expresadas en dólares americanos (USD) por persona, con especificación clara de inclusiones y boletos.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-dark text-sm">¿Con cuánta anticipación debo reservar Machu Picchu?</h4>
              <p className="text-muted-foreground">
                Recomendamos reservar con la mayor anticipación posible (especialmente para temporada alta de mayo a octubre), debido al límite de aforo oficial del santuario.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-dark text-sm">¿Qué hacer con respecto al mal de altura?</h4>
              <p className="text-muted-foreground">
                Sugerimos reservar tours suaves de menor altitud (City Tour o Valle Sagrado) durante los primeros dos días para permitir una adaptación adecuada antes de trekkings intensos.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
