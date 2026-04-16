import React from 'react';
import { motion } from "motion/react";
import { MessageCircle, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER, MAPS_URL } from '@/constants';

export default function WhatsAppButton() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hola, quiero información sobre paquetes de viaje en Cusco");
    window.open(`https://wa.me/51${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-4 items-start">
      {/* Office Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="group relative"
      >
        <Button
          onClick={() => window.open(MAPS_URL, '_blank')}
          variant="outline"
          className="bg-white/95 backdrop-blur-md text-dark border-border rounded-full p-4 h-14 w-14 hover:w-auto hover:px-6 transition-all duration-500 shadow-xl flex items-center gap-3 group border border-border overflow-hidden whitespace-nowrap"
        >
          <MapPin size={24} className="text-primary group-hover:scale-110 transition-transform shrink-0" />
          <span className="max-w-0 group-hover:max-w-[200px] opacity-0 group-hover:opacity-100 transition-all duration-500 text-[10px] font-bold tracking-[0.2em] uppercase">
            Nuestra Oficina en Cusco
          </span>
        </Button>
      </motion.div>

      {/* WhatsApp Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="group relative"
      >
        <Button
          onClick={handleWhatsApp}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 h-14 w-14 hover:w-auto hover:px-8 transition-all duration-500 shadow-[0_10px_30px_rgba(37,211,102,0.3)] flex items-center gap-3 group overflow-hidden whitespace-nowrap"
        >
          <MessageCircle size={24} fill="currentColor" className="group-hover:scale-110 transition-transform shrink-0" />
          <span className="max-w-0 group-hover:max-w-[300px] opacity-0 group-hover:opacity-100 transition-all duration-500 text-xs font-bold tracking-[0.15em] uppercase">
            Cotizar por WhatsApp
          </span>
        </Button>
      </motion.div>
    </div>
  );
}
