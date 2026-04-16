import React from 'react';
import { motion } from "motion/react";
import { MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER, MAPS_URL } from '@/constants';

export default function WhatsAppButton() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hola, quiero información sobre paquetes de viaje en Cusco");
    window.open(`https://wa.me/51${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 items-end">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button
          onClick={() => window.open(MAPS_URL, '_blank')}
          variant="outline"
          className="bg-white text-dark border-border rounded-full px-6 py-2 text-xs font-bold shadow-lg hover:bg-accent transition-colors"
        >
          📍 Nuestra Oficina en Cusco
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Button
          onClick={handleWhatsApp}
          className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-sm font-bold shadow-[0_10px_20px_rgba(197,160,33,0.3)]"
        >
          COTIZAR MI VIAJE POR WHATSAPP
        </Button>
      </motion.div>
    </div>
  );
}
