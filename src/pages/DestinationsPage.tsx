import React from 'react';
import { Link } from 'react-router-dom';
import { DESTINATIONS, PACKAGES } from '@/constants';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { MapPin, Mountain, ArrowRight, Compass } from 'lucide-react';

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <SEOHead 
        title="Destinos Turísticos Imperdibles en Cusco"
        description="Guía completa de los principales destinos de Cusco: Machu Picchu, Valle Sagrado, Laguna Humantay y Montaña de Colores. Rutas, altitudes y tours recomendados."
        canonicalPath="/destinos"
      />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-3">
            Guía Geográfica Andina
          </span>
          <h1 className="text-4xl sm:text-6xl font-light font-heading text-dark leading-none mb-4">
            Destinos <span className="italic text-primary">Emblemáticos</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
            Los valles, cordilleras y santuarios arqueológicos que hacen de Cusco el epicentro histórico y espiritual de Sudamérica. Conoce cada lugar y los tours diseñados para visitarlo.
          </p>
        </div>

        {/* Destination Cards */}
        <div className="space-y-16">
          {DESTINATIONS.map((dest, index) => {
            // Find tours associated with this destination
            const matchingTours = PACKAGES.filter(p => 
              p.places.some(pl => pl.toLowerCase().includes(dest.name.toLowerCase().split(' ')[0])) ||
              p.title.toLowerCase().includes(dest.name.toLowerCase().split(' ')[0])
            ).slice(0, 3);

            return (
              <article 
                key={dest.id}
                className="bg-white border border-border rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  
                  {/* Image side */}
                  <div className={`lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[320px] ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}>
                    <img 
                      src={dest.image} 
                      alt={`Destino turístico ${dest.name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent opacity-60" />
                    {dest.altitude && (
                      <div className="absolute top-4 left-4 bg-dark/80 backdrop-blur-md text-white px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-sm flex items-center gap-1.5">
                        <Mountain size={13} className="text-primary" />
                        <span>{dest.altitude}</span>
                      </div>
                    )}
                  </div>

                  {/* Content side */}
                  <div className={`lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-primary block mb-2">
                        Atractivo Mayor
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-light font-heading text-dark mb-4">
                        {dest.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed mb-6">
                        {dest.description}
                      </p>

                      {/* Highlights */}
                      {dest.highlights && (
                        <div className="mb-8">
                          <h3 className="text-[10px] uppercase tracking-wider font-bold text-dark/70 mb-3 flex items-center gap-1.5">
                            <Compass size={13} className="text-primary" />
                            Puntos Destacados:
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {dest.highlights.map((h, i) => (
                              <span 
                                key={i}
                                className="px-3 py-1 bg-muted/40 border border-border text-[11px] font-medium text-dark rounded-sm"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Matching tours links */}
                    <div className="pt-6 border-t border-border">
                      <h4 className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-3">
                        Tours recomendados para este destino:
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {matchingTours.length > 0 ? (
                          matchingTours.map((t) => (
                            <Link 
                              key={t.id} 
                              to={`/tours/${t.id}`}
                              className="text-xs bg-[#FAF7F0] hover:bg-primary hover:text-white border border-primary/20 text-dark px-3 py-1.5 rounded-sm transition-colors font-medium flex items-center gap-1.5"
                            >
                              <span>{t.title}</span>
                              <span className="text-[10px] opacity-75 font-bold">(${t.price} USD)</span>
                            </Link>
                          ))
                        ) : (
                          <Link 
                            to="/tours"
                            className="text-xs text-primary font-semibold hover:underline"
                          >
                            Ver todos los tours
                          </Link>
                        )}
                      </div>

                      <Link 
                        to="/tours" 
                        className="text-xs uppercase tracking-widest font-bold text-dark hover:text-primary transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Explorar todos los paquetes</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>

                  </div>

                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
