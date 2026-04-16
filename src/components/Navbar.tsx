import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from '@/constants';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Paquetes', href: '#paquetes' },
    { name: 'Destinos', href: '#destinos' },
    { name: 'Nosotros', href: '#nosotros' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 flex items-center justify-center">
              <img 
                src="https://res.cloudinary.com/dcnynnstm/image/upload/q_auto/f_auto/v1776351481/CUSCO_INFINITY_TRAVEL_srfnzk.png" 
                alt="Cusco Infinity Travel"
                className="h-full w-auto object-contain drop-shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-base tracking-[0.2em] uppercase leading-none ${isScrolled ? 'text-dark' : 'text-white'}`}>
                Cusco Infinity
              </span>
              <span className={`text-[10px] uppercase tracking-[0.3em] font-medium mt-1 ${isScrolled ? 'text-muted-foreground' : 'text-white/60'}`}>
                Travel Agency
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center h-full">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`h-full flex items-center px-8 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 border-x border-transparent hover:bg-primary hover:text-white ${
                  isScrolled ? 'text-dark border-border/50' : 'text-white border-white/10'
                }`}
              >
                {link.name}
              </a>
            ))}
            <Button 
              className="ml-8 bg-primary hover:bg-primary/90 text-white rounded-none px-8 py-6 text-[10px] font-bold tracking-[0.2em] uppercase"
              onClick={() => window.open(`https://wa.me/51${WHATSAPP_NUMBER}`, '_blank')}
            >
              Reservar
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={24} className={isScrolled ? 'text-dark' : 'text-white'} />
            ) : (
              <Menu size={24} className={isScrolled ? 'text-dark' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button 
                className="bg-primary hover:bg-primary/90 text-white rounded-full w-full py-6"
                onClick={() => {
                  window.open(`https://wa.me/51${WHATSAPP_NUMBER}`, '_blank');
                  setIsMobileMenuOpen(false);
                }}
              >
                <Phone size={18} className="mr-2" />
                Contactar por WhatsApp
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
