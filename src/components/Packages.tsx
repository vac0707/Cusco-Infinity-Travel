import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { PACKAGES, WHATSAPP_NUMBER } from '@/constants';
import { ChevronRight, X, Clock, MapPin, Check, Minus, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Package } from '@/types';

export default function Packages() {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const handleWhatsApp = (title: string) => {
    const message = encodeURIComponent(`Hola, quiero información sobre el paquete: ${title}`);
    window.open(`https://wa.me/51${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PACKAGES.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className=" luxury-card group flex flex-col h-full cursor-pointer overflow-hidden border-none shadow-none bg-transparent hover:bg-white/50"
            onClick={() => setSelectedPackage(pkg)}
          >
            <div className="relative aspect-[4/5] overflow-hidden mb-6 rounded-sm">
              <img 
                src={pkg.image} 
                alt={pkg.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="absolute top-4 right-4">
                <span className="bg-metallic text-dark px-4 py-1.5 text-[10px] font-bold tracking-widest rounded-full shadow-lg">
                  S/ {pkg.price}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/70 mb-2 block">
                  {pkg.duration}
                </span>
                <h3 className="text-2xl font-medium text-white leading-tight font-heading group-hover:text-primary transition-colors">
                  {pkg.title}
                </h3>
              </div>
            </div>

            <div className="px-2 pb-2 mt-auto">
              <p className="text-xs text-muted-foreground leading-relaxed mb-6 font-light line-clamp-2">
                {pkg.places.join(' • ')}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-muted-foreground">
                  <Clock size={12} className="text-primary" />
                  {pkg.duration}
                </div>
                <button 
                  className="text-[9px] uppercase tracking-[0.2em] font-bold flex items-center gap-1 group/btn text-primary"
                >
                  Ver Detalles
                  <ChevronRight size={12} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-dark/90 backdrop-blur-xl"
              onClick={() => setSelectedPackage(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-background shadow-2xl overflow-hidden rounded-sm flex flex-col md:flex-row"
            >
              {/* Image side */}
              <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                <img 
                  src={selectedPackage.image} 
                  alt={selectedPackage.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-dark/30" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h2 className="text-4xl md:text-5xl font-heading text-white mb-4 italic leading-tight">
                    {selectedPackage.title}
                  </h2>
                  <div className="flex gap-4">
                    <span className="bg-metallic text-dark px-4 py-2 text-xs font-bold tracking-widest">
                      S/ {selectedPackage.price}
                    </span>
                    <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-2 text-xs font-bold tracking-widest">
                      {selectedPackage.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content side */}
              <div className="flex-1 overflow-y-auto bg-[#FDFBF7] p-8 md:p-12 lg:p-16 custom-scrollbar">
                <button 
                  onClick={() => setSelectedPackage(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-border transition-colors text-dark/40 hover:text-dark z-10"
                >
                  <X size={24} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  {/* Left Column: Itinerary */}
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <div className="h-[1px] w-8 bg-primary" />
                      <h4 className="text-[11px] uppercase tracking-[0.4em] font-bold text-primary">Itinerario Detallado</h4>
                    </div>
                    
                    <div className="space-y-8 relative">
                      <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-border" />
                      {selectedPackage.itinerary.map((step, i) => (
                        <div key={i} className="flex gap-6 relative group">
                          <div className="w-4 h-4 rounded-full bg-white border-2 border-primary mt-1 z-10 shrink-0 group-hover:scale-125 transition-transform" />
                          <p className="text-sm text-dark font-light leading-relaxed">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Includes / Excludes */}
                  <div className="space-y-12">
                    {/* Includes */}
                    <div>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-[1px] w-8 bg-primary" />
                        <h4 className="text-[11px] uppercase tracking-[0.4em] font-bold text-primary">¿Qué Incluye?</h4>
                      </div>
                      <ul className="space-y-4">
                        {selectedPackage.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 text-sm font-light text-dark">
                            <Check size={16} className="text-primary mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Excludes */}
                    <div>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-[1px] w-8 bg-primary" />
                        <h4 className="text-[11px] uppercase tracking-[0.4em] font-bold text-primary">No Incluye</h4>
                      </div>
                      <ul className="space-y-4">
                        {selectedPackage.excludes.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 text-sm font-light text-muted-foreground italic">
                            <Minus size={16} className="text-border mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-8 border-t border-border">
                      <div className="flex items-center gap-3 mb-8 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                        <Info size={14} className="text-primary" />
                        Nivel de Dificultad: {selectedPackage.difficulty}
                      </div>
                      <Button 
                        size="lg"
                        className="w-full bg-metallic text-dark hover:scale-105 transition-all duration-500 py-8 text-[11px] font-bold tracking-[0.3em] uppercase rounded-sm border-none shadow-xl"
                        onClick={() => handleWhatsApp(selectedPackage.title)}
                      >
                        Cotizar por WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
