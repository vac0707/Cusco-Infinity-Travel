import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from '@/types';
import { Clock, Mountain, ChevronRight, MapPin } from 'lucide-react';

interface TourCardProps {
  tour: Package;
  showCategoryBadge?: boolean;
}

export default function TourCard({ tour }: TourCardProps) {
  const difficultyColors = {
    'Fácil': 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
    'Moderado': 'bg-amber-50 text-amber-800 border-amber-200/60',
    'Desafiante': 'bg-rose-50 text-rose-800 border-rose-200/60'
  };

  return (
    <article className="luxury-card group flex flex-col h-full bg-white border border-border/80 rounded-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
      {/* Image container */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-muted">
        <img 
          src={tour.image} 
          alt={`Tour ${tour.title} en Cusco`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Price Tag */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-metallic text-dark px-3.5 py-1 text-[11px] font-bold tracking-wider rounded-full shadow-md flex items-baseline gap-1">
            <span>$ {tour.price}</span>
            <span className="text-[9px] font-medium opacity-80 uppercase">USD / per</span>
          </div>
        </div>

        {/* Difficulty badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-2.5 py-0.5 text-[9px] uppercase tracking-widest font-bold rounded-sm border backdrop-blur-sm ${difficultyColors[tour.difficulty]}`}>
            {tour.difficulty}
          </span>
        </div>

        {/* Bottom image overlay info */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-white/80 block mb-1">
            {tour.duration}
          </span>
          <h3 className="text-xl sm:text-2xl font-normal text-white font-heading leading-tight group-hover:text-primary transition-colors">
            {tour.title}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-4">
        <div>
          {tour.shortDescription && (
            <p className="text-xs text-muted-foreground line-clamp-2 font-light leading-relaxed mb-3">
              {tour.shortDescription}
            </p>
          )}

          {/* Places visited */}
          <div className="flex items-start gap-2 text-xs text-dark/70 font-light">
            <MapPin size={13} className="text-primary shrink-0 mt-0.5" />
            <p className="line-clamp-1 text-[11px] text-muted-foreground">
              {tour.places.join(' • ')}
            </p>
          </div>
        </div>

        {/* Footer info & CTA */}
        <div className="pt-4 border-t border-border flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock size={12} className="text-primary" />
              {tour.duration}
            </span>
            {tour.altitude && (
              <span className="hidden sm:flex items-center gap-1">
                <Mountain size={12} className="text-primary" />
                {tour.altitude}
              </span>
            )}
          </div>

          <Link
            to={`/tours/${tour.id}`}
            className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary hover:text-dark transition-colors flex items-center gap-1 group/btn"
          >
            <span>Ver Experiencia</span>
            <ChevronRight size={13} className="transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
