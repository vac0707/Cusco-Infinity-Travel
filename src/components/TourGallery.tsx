import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  ImageOff, 
  Sparkles 
} from 'lucide-react';

interface TourGalleryProps {
  images: string[];
  tourTitle: string;
}

export default function TourGallery({ images, tourTitle }: TourGalleryProps) {
  // Ensure we have at least one valid image
  const validImages = images.length > 0 ? images : ['/images/placeholder-tour.jpg'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = validImages.length;
  const hasMultiple = total > 1;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (diff > minSwipeDistance && hasMultiple) {
      goToNext();
    } else if (diff < -minSwipeDistance && hasMultiple) {
      goToPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight' && hasMultiple) {
        goToNext();
      } else if (e.key === 'ArrowLeft' && hasMultiple) {
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when lightbox is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isLightboxOpen, hasMultiple, goToNext, goToPrev]);

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const activeSrc = validImages[currentIndex];
  const isCurrentError = imageErrors[currentIndex];

  return (
    <div className="w-full">
      {/* Main Image Display */}
      <div 
        className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-stone-900 rounded-sm overflow-hidden select-none group shadow-lg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isCurrentError ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 bg-stone-900 p-6 text-center">
            <ImageOff size={40} className="mb-2 text-primary opacity-60" />
            <p className="text-sm font-medium">Fotografía no disponible</p>
            <p className="text-xs text-stone-500 mt-1">{tourTitle}</p>
          </div>
        ) : (
          <img
            src={activeSrc}
            alt={`${tourTitle} - Vista ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300 cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
            onError={() => handleImageError(currentIndex)}
            referrerPolicy="no-referrer"
          />
        )}

        {/* Hover / Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-70 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
          {hasMultiple ? (
            <span className="bg-dark/70 backdrop-blur-md text-white/90 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
              {currentIndex + 1} / {total}
            </span>
          ) : (
            <span className="bg-dark/70 backdrop-blur-md text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 border border-white/10">
              <Sparkles size={11} />
              Fotografía Oficial
            </span>
          )}

          {/* Lightbox Trigger Button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            aria-label="Ampliar fotografía a pantalla completa"
            className="pointer-events-auto bg-dark/70 hover:bg-primary hover:text-dark text-white p-2 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-md transition-all duration-200 border border-white/10 flex items-center gap-1.5 text-xs font-semibold shadow-md"
          >
            <Maximize2 size={13} />
            <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Ampliar</span>
          </button>
        </div>

        {/* Navigation Arrows for Main View (only if multiple images) */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              aria-label="Fotografía anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark/60 hover:bg-primary text-white hover:text-dark backdrop-blur-md flex items-center justify-center transition-all duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 z-10 shadow-md"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Siguiente fotografía"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark/60 hover:bg-primary text-white hover:text-dark backdrop-blur-md flex items-center justify-center transition-all duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 z-10 shadow-md"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row (Only displayed if multiple images exist) */}
      {hasMultiple && (
        <div className="mt-3 flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-thin">
          {validImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ver foto ${idx + 1} de ${total}`}
              aria-current={currentIndex === idx ? 'true' : 'false'}
              className={`relative w-20 sm:w-24 h-14 sm:h-16 shrink-0 rounded-sm overflow-hidden border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                currentIndex === idx
                  ? 'border-primary ring-2 ring-primary/40 scale-105 shadow-md'
                  : 'border-border/70 opacity-70 hover:opacity-100 hover:border-primary/50'
              }`}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {currentIndex === idx && (
                <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galería ampliada de ${tourTitle}`}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col justify-between p-4 sm:p-6 animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Header Controls */}
          <div 
            className="flex items-center justify-between z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-white text-xs sm:text-sm font-light">
              <span className="font-bold text-primary font-heading tracking-wider mr-2">CUSCO INFINITY TRAVEL</span>
              <span className="text-white/70 hidden sm:inline">• {tourTitle}</span>
            </div>

            <div className="flex items-center gap-4">
              {hasMultiple && (
                <span className="text-white/80 text-xs font-mono font-semibold bg-white/10 px-3 py-1 rounded-full">
                  {currentIndex + 1} / {total}
                </span>
              )}

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Cerrar vista ampliada"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Centered Image with touch swipe */}
          <div 
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {isCurrentError ? (
              <div className="text-center text-stone-400">
                <ImageOff size={48} className="mx-auto mb-2 text-primary opacity-60" />
                <p>No se pudo cargar la imagen ampliada</p>
              </div>
            ) : (
              <img
                src={activeSrc}
                alt={`${tourTitle} - Foto ${currentIndex + 1}`}
                className="max-h-[82vh] max-w-[92vw] object-contain rounded-sm shadow-2xl transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            )}

            {/* Lightbox Navigation Buttons */}
            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={goToPrev}
                  aria-label="Anterior"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-primary text-white hover:text-dark flex items-center justify-center transition-all duration-200 border border-white/10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Siguiente"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-primary text-white hover:text-dark flex items-center justify-center transition-all duration-200 border border-white/10"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails inside Lightbox */}
          {hasMultiple && (
            <div 
              className="flex justify-center items-center gap-2 overflow-x-auto py-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {validImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Ir a foto ${idx + 1}`}
                  className={`w-14 h-10 rounded-sm overflow-hidden border transition-all ${
                    currentIndex === idx 
                      ? 'border-primary ring-2 ring-primary/50 scale-110' 
                      : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
