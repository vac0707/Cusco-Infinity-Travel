import React from 'react';
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://res.cloudinary.com/dcnynnstm/image/upload/q_auto/f_auto/v1776266712/590375588_1277322274422006_5027036865690629754_n_la8hdb.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-transparent to-dark/80" />
      </motion.div>

      <div className="container relative z-10 px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="inline-block px-6 py-1 mb-8 text-[10px] font-bold tracking-[0.4em] uppercase border border-white/20 rounded-full backdrop-blur-sm">
            Cusco Infinity Travel
          </span>
          <h1 className="text-[12vw] md:text-[10vw] font-light mb-8 leading-[0.85] tracking-tighter font-heading">
            DESCUBRE <br />
            <span className="italic text-primary">CUSCO</span>
          </h1>
          <p className="text-sm md:text-base mb-12 max-w-lg mx-auto opacity-70 font-sans font-light tracking-wide leading-relaxed">
            Asesoría personalizada para transformar tus sueños en experiencias inolvidables en el corazón de los Andes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-10 py-8 text-xs font-bold tracking-[0.2em] uppercase rounded-none transition-all duration-500 hover:px-12"
              onClick={() => document.getElementById('paquetes')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explorar Paquetes
            </Button>
            <div className="hidden sm:block h-[1px] w-12 bg-white/30" />
            <button 
              className="text-[10px] uppercase tracking-[0.3em] font-bold hover:text-primary transition-colors"
              onClick={() => document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Conócenos
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
