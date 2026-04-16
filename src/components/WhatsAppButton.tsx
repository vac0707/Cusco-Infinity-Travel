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
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button
          onClick={() => window.open(MAPS_URL, '_blank')}
          variant="outline"
          className="bg-white/95 backdrop-blur-md text-dark border-border rounded-full px-6 py-3 text-[10px] font-bold tracking-[0.2em] shadow-xl hover:bg-metallic hover:text-dark transition-all duration-500 uppercase flex items-center gap-2 group border border-border"
        >
          <MapPin size={14} className="text-primary group-hover:text-dark" />
          Nuestra Oficina en Cusco
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Button
          onClick={handleWhatsApp}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full px-8 py-7 text-xs font-bold tracking-[0.15em] shadow-[0_10px_30px_rgba(37,211,102,0.3)] transition-all duration-300 hover:scale-105 flex items-center gap-3 uppercase"
        >
          <MessageCircle size={20} fill="currentColor" />
          <span>Cotizar mi viaje por WhatsApp</span>
        </Button>
      </motion.div>
    </div>
  );
}
