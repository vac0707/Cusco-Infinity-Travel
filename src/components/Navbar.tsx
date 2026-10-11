import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { WHATSAPP_NUMBER, AGENCY_LOGO } from '@/constants';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Tours', path: '/tours' },
    { name: 'Destinos', path: '/destinos' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const handleBookNow = () => {
    const text = encodeURIComponent(
      'Hola, deseo cotizar una reserva y consultar disponibilidad de experiencias en Cusco con Cusco Infinity Travel.'
    );
    window.open(`https://wa.me/51${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  // Determine navbar appearance based on scroll and current page
  const showDarkText = isScrolled || !isHomePage;

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        showDarkText 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border/80' 
          : 'bg-gradient-to-b from-dark/80 via-dark/40 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="h-14 w-14 sm:h-16 sm:w-16 flex items-center justify-center shrink-0">
              <img 
                src={AGENCY_LOGO} 
                alt="Cusco Infinity Travel Logo"
                className="h-full w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-sm sm:text-base tracking-[0.2em] uppercase leading-none font-heading transition-colors ${
                showDarkText ? 'text-dark' : 'text-white'
              }`}>
                Cusco Infinity
              </span>
              <span className={`text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-medium mt-1 transition-colors ${
                showDarkText ? 'text-muted-foreground' : 'text-white/70'
              }`}>
                Travel Agency
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center h-full gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  h-full flex items-center px-5 lg:px-6 text-[10px] lg:text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-200 relative
                  ${isActive 
                    ? 'text-primary font-bold' 
                    : showDarkText 
                      ? 'text-dark hover:text-primary' 
                      : 'text-white/90 hover:text-white'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-metallic" />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* RESERVAR button */}
            <Button 
              onClick={handleBookNow}
              className="ml-6 bg-metallic text-dark hover:brightness-105 font-bold px-7 py-5 text-[10px] uppercase tracking-[0.25em] rounded-sm border-none shadow-md transition-all duration-300 hover:scale-105"
            >
              Reservar
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <Button
              size="sm"
              onClick={handleBookNow}
              className="bg-metallic text-dark font-bold text-[9px] uppercase tracking-wider px-3 py-1 rounded-sm"
            >
              Reservar
            </Button>
            <button 
              className="p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X size={26} className={showDarkText ? 'text-dark' : 'text-white'} />
              ) : (
                <Menu size={26} className={showDarkText ? 'text-dark' : 'text-white'} />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-b border-border shadow-2xl overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `
                    py-3 text-sm uppercase tracking-[0.2em] font-semibold border-b border-border/40 transition-colors flex items-center justify-between
                    ${isActive ? 'text-primary font-bold' : 'text-dark hover:text-primary'}
                  `}
                >
                  <span>{link.name}</span>
                  {link.path === location.pathname && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </NavLink>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <Button 
                  className="bg-metallic text-dark hover:brightness-105 w-full py-6 text-xs font-bold uppercase tracking-[0.2em] rounded-sm"
                  onClick={handleBookNow}
                >
                  <MessageSquare size={16} className="mr-2" />
                  Reservar por WhatsApp
                </Button>
                <div className="text-center text-[10px] uppercase tracking-widest text-muted-foreground pt-1">
                  Atención directa y personalizada en Cusco
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
