import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center pt-28 pb-20 px-4">
      <SEOHead 
        title="Página no encontrada"
        description="La página solicitada no está disponible en Cusco Infinity Travel."
        canonicalPath="/404"
      />

      <div className="text-center max-w-md mx-auto bg-white p-10 rounded-sm border border-border shadow-md">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
          <Compass size={32} />
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-2">
          Error 404
        </span>
        <h1 className="text-3xl font-light font-heading text-dark mb-4">
          Ruta no encontrada
        </h1>
        <p className="text-xs text-muted-foreground font-light mb-8 leading-relaxed">
          La página que buscas no existe o ha sido reubicada dentro de nuestra nueva plataforma.
        </p>

        <div className="flex flex-col gap-3">
          <Link to="/">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider py-5 rounded-sm">
              Volver al Inicio
            </Button>
          </Link>
          <Link to="/tours">
            <Button variant="outline" className="w-full text-xs font-semibold uppercase tracking-wider py-5 rounded-sm">
              Ver Catálogo de Tours
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
