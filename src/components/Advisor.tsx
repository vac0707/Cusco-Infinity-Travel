import React from 'react';
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from '@/constants';
import { MessageCircle, Award, ShieldCheck, Heart } from 'lucide-react';

export default function Advisor() {
  return (
    <div className="py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
              alt="Carla Quispe"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-primary/10 -z-10" />
          <div className="absolute top-12 -left-12 vertical-text text-primary/40">Senior Travel Advisor</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-6 block">Nuestro Equipo Experto</span>
          <h2 className="text-6xl md:text-8xl font-light mb-8 leading-none">Carla <br /><span className="italic">Quispe</span></h2>
          
          <div className="space-y-6 text-muted-foreground font-light leading-relaxed text-lg">
            <p>
              "Mi pasión es que conozcas la magia de mi tierra con total seguridad, comodidad y ese toque auténtico que solo un experto local te puede dar."
            </p>
            <p>
              Como parte fundamental de <strong>Cusco Infinity Travel</strong>, cuento con más de 10 años diseñando experiencias en el corazón de los Andes. Entiendo que cada viajero es único y mi misión es transformar tu visita en una historia que valga la pena contar.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 mt-12 pt-12 border-t border-border">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-4">Certificaciones</h4>
              <div className="flex items-center gap-2 text-sm">
                <Award size={16} className="text-primary" />
                <span>Guía Oficial de Turismo</span>
              </div>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-4">Compromiso</h4>
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheck size={16} className="text-primary" />
                <span>Seguridad 24/7</span>
              </div>
            </div>
          </div>

          <Button 
            className="mt-12 bg-dark text-white hover:bg-primary transition-colors px-12 py-8 text-xs font-bold tracking-[0.2em] uppercase"
            onClick={() => window.open(`https://wa.me/51${WHATSAPP_NUMBER}`, '_blank')}
          >
            Hablar con Carla
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
