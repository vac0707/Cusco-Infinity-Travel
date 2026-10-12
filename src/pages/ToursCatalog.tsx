import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PACKAGES, TOUR_CATEGORIES } from '@/constants';
import { TourCategorySlug, TourDifficulty } from '@/types';
import TourCard from '@/components/TourCard';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  RotateCcw, 
  SlidersHorizontal, 
  Clock, 
  Activity, 
  DollarSign, 
  Tag, 
  X
} from 'lucide-react';

export default function ToursCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL params
  const initialCategory = (searchParams.get('categoria') as TourCategorySlug) || 'todos';
  const initialDuration = searchParams.get('duracion') || 'todas';
  const initialDifficulty = searchParams.get('dificultad') || 'todas';
  const initialQuery = searchParams.get('q') || '';
  const initialPrice = searchParams.get('precio') ? Number(searchParams.get('precio')) : 300;

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedDuration, setSelectedDuration] = useState<string>(initialDuration);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(initialDifficulty);
  const [maxPrice, setMaxPrice] = useState<number>(initialPrice);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync with searchParams if changed from outside
  useEffect(() => {
    const cat = searchParams.get('categoria') || 'todos';
    const dur = searchParams.get('duracion') || 'todas';
    const dif = searchParams.get('dificultad') || 'todas';
    const q = searchParams.get('q') || '';
    const pr = searchParams.get('precio') ? Number(searchParams.get('precio')) : 300;

    setSelectedCategory(cat);
    setSelectedDuration(dur);
    setSelectedDifficulty(dif);
    setSearchQuery(q);
    setMaxPrice(pr);
  }, [searchParams]);

  const updateUrlParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === 'todos' || value === 'todas') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    setSearchParams(newParams);
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    updateUrlParams({ categoria: catId === 'todos' ? null : catId });
  };

  const handleDurationChange = (dur: string) => {
    setSelectedDuration(dur);
    updateUrlParams({ duracion: dur === 'todas' ? null : dur });
  };

  const handleDifficultyChange = (dif: string) => {
    setSelectedDifficulty(dif);
    updateUrlParams({ dificultad: dif === 'todas' ? null : dif });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateUrlParams({ q: query.trim() ? query.trim() : null });
  };

  const handlePriceChange = (price: number) => {
    setMaxPrice(price);
    updateUrlParams({ precio: price < 300 ? price.toString() : null });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('todos');
    setSelectedDuration('todas');
    setSelectedDifficulty('todas');
    setMaxPrice(300);
    setSearchParams({});
  };

  const isFiltered = 
    searchQuery !== '' || 
    selectedCategory !== 'todos' || 
    selectedDuration !== 'todas' || 
    selectedDifficulty !== 'todas' || 
    maxPrice < 300;

  // Filter the full 18 packages deterministically
  const filteredPackages = useMemo(() => {
    return PACKAGES.filter((tour) => {
      // 1. Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = tour.title.toLowerCase().includes(query);
        const matchesPlaces = tour.places.some(p => p.toLowerCase().includes(query));
        const matchesDescription = tour.shortDescription?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesPlaces && !matchesDescription) return false;
      }

      // 2. Category
      if (selectedCategory !== 'todos') {
        if (!tour.categories?.includes(selectedCategory as TourCategorySlug)) {
          return false;
        }
      }

      // 3. Duration
      if (selectedDuration !== 'todas') {
        if (tour.duration !== selectedDuration) {
          return false;
        }
      }

      // 4. Difficulty
      if (selectedDifficulty !== 'todas') {
        if (tour.difficulty !== selectedDifficulty) {
          return false;
        }
      }

      // 5. Max Price (USD)
      if (tour.price > maxPrice) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedDuration, selectedDifficulty, maxPrice]);

  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <SEOHead 
        title="Catálogo Completo de Tours en Cusco"
        description="Explora nuestros 18 tours oficiales en Cusco: Machu Picchu, Valle Sagrado, Humantay, Vinicunca y más. Precios claros en USD por persona y reservas directas."
        canonicalPath="/tours"
      />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-3">
            Catálogo Oficial de Experiencias
          </span>
          <h1 className="text-4xl sm:text-6xl font-light font-heading text-dark leading-none mb-4">
            Tours en <span className="italic text-primary">Cusco</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
            Descubre todos nuestros {PACKAGES.length} paquetes disponibles. Filtra por categoría, duración, dificultad o presupuesto y accede al detalle completo de cada itinerario.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-6 rounded-sm border border-border shadow-sm mb-10">
          
          {/* Top row: Search input & Mobile filter toggle */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-6 border-b border-border">
            <div className="relative w-full sm:max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por nombre o lugar (ej. Humantay, Pisac, Salineras)..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 text-xs h-11 bg-muted/20 border-border focus-visible:ring-primary"
              />
              {searchQuery && (
                <button 
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-dark"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs text-muted-foreground font-light">
                Mostrando <strong className="text-dark font-semibold">{filteredPackages.length}</strong> de {PACKAGES.length} tours
              </span>

              {isFiltered && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-xs text-primary hover:text-dark hover:bg-muted font-semibold flex items-center gap-1.5 h-9"
                >
                  <RotateCcw size={12} />
                  Limpiar filtros
                </Button>
              )}
            </div>
          </div>

          {/* Category Chips */}
          <div className="pt-6">
            <div className="flex items-center gap-2 mb-3 text-[10px] uppercase tracking-wider font-bold text-dark/70">
              <Tag size={13} className="text-primary" />
              <span>Categorías:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange('todos')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === 'todos'
                    ? 'bg-dark text-white shadow-sm'
                    : 'bg-muted/40 text-dark/70 hover:bg-muted border border-border/60'
                }`}
              >
                Todas ({PACKAGES.length})
              </button>
              {TOUR_CATEGORIES.map((cat) => {
                const count = PACKAGES.filter(p => p.categories?.includes(cat.id)).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-white shadow-sm font-semibold'
                        : 'bg-muted/40 text-dark/70 hover:bg-muted border border-border/60'
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Filters (Duration, Difficulty, Price) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 mt-6 border-t border-border">
            {/* Duration filter */}
            <div>
              <label className="text-[10px] uppercase tracking-wider font-bold text-dark/70 flex items-center gap-1.5 mb-2">
                <Clock size={12} className="text-primary" />
                Duración
              </label>
              <select
                value={selectedDuration}
                onChange={(e) => handleDurationChange(e.target.value)}
                className="w-full text-xs h-10 px-3 bg-muted/20 border border-border rounded-sm text-dark focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="todas">Todas las duraciones</option>
                <option value="Medio Día">Medio Día (Medio Día)</option>
                <option value="1 Día">1 Día Completo (Full Day)</option>
                <option value="Transfer">Traslados (Transfer)</option>
              </select>
            </div>

            {/* Difficulty filter */}
            <div>
              <label className="text-[10px] uppercase tracking-wider font-bold text-dark/70 flex items-center gap-1.5 mb-2">
                <Activity size={12} className="text-primary" />
                Dificultad
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => handleDifficultyChange(e.target.value)}
                className="w-full text-xs h-10 px-3 bg-muted/20 border border-border rounded-sm text-dark focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="todas">Todos los niveles</option>
                <option value="Fácil">Fácil (Caminata suave)</option>
                <option value="Moderado">Moderado</option>
                <option value="Desafiante">Desafiante (Alta montaña)</option>
              </select>
            </div>

            {/* Price slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] uppercase tracking-wider font-bold text-dark/70 flex items-center gap-1.5">
                  <DollarSign size={12} className="text-primary" />
                  Presupuesto Máximo
                </label>
                <span className="text-xs font-bold text-primary">
                  Hasta ${maxPrice} USD
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="300"
                step="5"
                value={maxPrice}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-light">
                <span>$15 USD</span>
                <span>$300 USD</span>
              </div>
            </div>
          </div>

        </div>

        {/* Results Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-20 bg-white border border-border rounded-sm p-8 max-w-xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <Search size={24} />
            </div>
            <h3 className="text-2xl font-light font-heading text-dark mb-2">
              No encontramos coincidencias
            </h3>
            <p className="text-xs text-muted-foreground font-light max-w-sm mx-auto mb-6 leading-relaxed">
              No hay tours que coincidan con los filtros seleccionados. Intenta ampliar tus criterios de búsqueda o restablecer los filtros.
            </p>
            <Button
              onClick={resetFilters}
              className="bg-primary hover:bg-primary/90 text-white text-xs font-semibold uppercase tracking-wider px-6 py-5 rounded-sm"
            >
              Restablecer todos los filtros
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}
