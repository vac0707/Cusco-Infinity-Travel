import React from 'react';
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 0.65 }}
        transition={{ 
          duration: 20, 
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://res.cloudinary.com/dcnynnstm/image/upload/q_auto/f_auto/v1776266712/590375588_1277322274422006_5027036865690629754_n_la8hdb.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/20 to-dark/90" />
      </motion.div>

      <div className="container relative z-10 px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <span className="inline-block px-8 py-2 mb-10 text-[11px] font-semibold tracking-[0.5em] uppercase border border-white/30 rounded-full backdrop-blur-md bg-white/5">
            Cusco Infinity Travel
          </span>
          <h1 className="text-[14vw] md:text-[11vw] font-medium mb-10 leading-[0.8] tracking-tighter font-heading uppercase">
            DESCUBRE <br />
            <span className="italic text-metallic">CUSCO</span>
          </h1>
          <p className="text-sm md:text-lg mb-14 max-w-2xl mx-auto opacity-80 font-sans font-light tracking-[0.05em] leading-relaxed">
            Asesoría experta inspirada en la mística de los Andes para transformar tus viajes en legados inolvidables.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-metallic text-dark hover:scale-105 transition-all duration-500 px-12 py-8 text-[11px] font-bold tracking-[0.3em] uppercase rounded-sm border-none shadow-xl shadow-primary/20"
              onClick={() => document.getElementById('paquetes')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explorar Paquetes
            </Button>
            <div className="hidden sm:block h-[1px] w-16 bg-white/20" />
            <button 
              className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/80 hover:text-primary transition-all duration-300 relative group"
              onClick={() => document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Conócenos
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="vertical-text text-white/40 h-12">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
