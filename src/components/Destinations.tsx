import React from 'react';
import { motion } from "motion/react";
import { DESTINATIONS } from '@/constants';

export default function Destinations() {
  return (
    <div className="py-24">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
        <h2 className="text-5xl md:text-7xl font-light">Destinos <br /><span className="italic text-primary">Inolvidables</span></h2>
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">Explora la magia</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {DESTINATIONS.map((dest, index) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className={`relative overflow-hidden group ${
              index === 0 ? 'md:col-span-8 md:row-span-2 aspect-[16/9] md:aspect-auto' : 
              index === 1 ? 'md:col-span-4 aspect-square' :
              index === 2 ? 'md:col-span-4 aspect-square' :
              'md:col-span-12 aspect-[21/9]'
            }`}
          >
            <img 
              src={dest.image} 
              alt={dest.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-2xl md:text-4xl font-light text-white mb-2">{dest.name}</h3>
              <p className="text-xs md:text-sm text-white/70 font-light max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {dest.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
