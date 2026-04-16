import React from 'react';
import { motion } from "motion/react";
import { TESTIMONIALS } from '@/constants';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <div className="py-24">
      <div className="text-center mb-24">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-6 block">Testimonios</span>
        <h2 className="text-5xl md:text-7xl font-light">Historias de <br /><span className="italic">Viajeros</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        {TESTIMONIALS.map((t, index) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-8 relative">
              <Avatar className="w-24 h-24 border border-border grayscale hover:grayscale-0 transition-all duration-500">
                <AvatarImage src={t.avatar} alt={t.name} />
                <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary flex items-center justify-center text-white">
                <Quote size={14} />
              </div>
            </div>
            
            <div className="flex gap-1 mb-6">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={12} className="fill-primary text-primary" />
              ))}
            </div>

            <p className="text-xl font-light italic leading-relaxed mb-8 text-muted-foreground">
              "{t.comment}"
            </p>

            <div>
              <h4 className="text-sm font-bold tracking-widest uppercase mb-1">{t.name}</h4>
              <p className="text-[10px] uppercase tracking-widest text-primary font-bold">{t.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
