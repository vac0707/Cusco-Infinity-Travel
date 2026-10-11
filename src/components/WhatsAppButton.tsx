import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WHATSAPP_NUMBER, MAPS_URL } from '@/constants';

export default function WhatsAppButton() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      'Hola Cusco Infinity Travel, deseo recibir información sobre disponibilidad y cotización de paquetes turísticos en Cusco.'
    );
    window.open(`https://wa.me/51${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Office location button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="pointer-events-auto group"
      >
        <button
          onClick={() => window.open(MAPS_URL, '_blank')}
          title="Ver ubicación en Cusco"
          aria-label="Ver nuestra oficina en Cusco en Google Maps"
          className="bg-white/95 text-dark border border-border/80 rounded-full h-11 w-11 shadow-lg hover:w-auto hover:px-4 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary backdrop-blur-md"
        >
          <MapPin size={18} className="text-primary shrink-0" />
          <span className="max-w-0 group-hover:max-w-[160px] opacity-0 group-hover:opacity-100 transition-all duration-300 text-[10px] uppercase tracking-wider font-bold">
            Oficina Cusco
          </span>
        </button>
      </motion.div>

      {/* WhatsApp chat button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="pointer-events-auto group"
      >
        <button
          onClick={handleWhatsApp}
          title="Cotizar por WhatsApp"
          aria-label="Contactar a Cusco Infinity Travel por WhatsApp"
          className="bg-[#25D366] hover:bg-[#1fb355] text-white rounded-full h-14 w-14 hover:w-auto hover:px-6 transition-all duration-300 shadow-[0_8px_25px_rgba(37,211,102,0.35)] flex items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-white"
        >
          <MessageCircle size={24} fill="currentColor" className="shrink-0" />
          <span className="max-w-0 group-hover:max-w-[200px] opacity-0 group-hover:opacity-100 transition-all duration-300 text-xs font-bold uppercase tracking-wider">
            Cotizar por WhatsApp
          </span>
        </button>
      </motion.div>
    </div>
  );
}
