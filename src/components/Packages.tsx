import React from 'react';
import { motion } from "motion/react";
import { PACKAGES, WHATSAPP_NUMBER } from '@/constants';
import { ChevronRight } from 'lucide-react';

export default function Packages() {
  const handleWhatsApp = (title: string) => {
    const message = encodeURIComponent(`Hola, quiero información sobre el paquete: ${title}`);
    window.open(`https://wa.me/51${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {PACKAGES.map((pkg, index) => (
        <motion.div
          key={pkg.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.8 }}
          className="luxury-card group"
        >
          <div className="relative aspect-[16/10] overflow-hidden mb-8">
            <img 
              src={pkg.image} 
              alt={pkg.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-dark/20 group-hover:bg-dark/0 transition-colors duration-500" />
            <div className="absolute bottom-6 left-6">
              <span className="bg-primary text-white px-4 py-2 text-xs font-bold tracking-widest">
                S/ {pkg.price}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-start mb-4">
            <h3 className="text-3xl font-light leading-tight max-w-[200px]">
              {pkg.title}
            </h3>
            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground pt-2">
              {pkg.duration}
            </span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-8 font-light">
            {pkg.places.join(' • ')}. Una experiencia diseñada para los viajeros más exigentes que buscan autenticidad y confort.
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-border">
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary">
              Nivel: {pkg.difficulty}
            </span>
            <button 
              className="text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-2 group/btn"
              onClick={() => handleWhatsApp(pkg.title)}
            >
              Consultar
              <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
