import React from 'react';
import { WHATSAPP_NUMBER, MAPS_URL } from '@/constants';
import { MapPin, Phone, Mail, Instagram, Facebook, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 flex items-center justify-center">
                <img 
                  src="https://res.cloudinary.com/dcnynnstm/image/upload/q_auto/f_auto/v1776351481/CUSCO_INFINITY_TRAVEL_srfnzk.png" 
                  alt="Cusco Infinity Travel"
                  className="h-full w-auto object-contain drop-shadow-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-[0.2em] uppercase leading-none">
                  Cusco Infinity
                </span>
                <span className="text-xs uppercase tracking-[0.3em] font-medium mt-1 text-white/60">
                  Travel Agency
                </span>
              </div>
            </div>
            <p className="text-sm text-white/40 max-w-sm leading-relaxed font-light">
              Diseñamos experiencias únicas en el corazón de los Andes. Nuestro compromiso es la excelencia, la seguridad y la autenticidad en cada viaje.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-primary">Navegación</h4>
            <ul className="space-y-4 text-xs font-bold tracking-widest uppercase">
              <li><a href="#" className="hover:text-primary transition-colors">Inicio</a></li>
              <li><a href="#paquetes" className="hover:text-primary transition-colors">Paquetes</a></li>
              <li><a href="#destinos" className="hover:text-primary transition-colors">Destinos</a></li>
              <li><a href="#nosotros" className="hover:text-primary transition-colors">Nosotros</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-primary">Contacto</h4>
            <ul className="space-y-4 text-xs font-light tracking-wide text-white/60">
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-primary" />
                <span>+51 {WHATSAPP_NUMBER}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-primary" />
                <span>hola@cuscotravel.expert</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={14} className="text-primary" />
                <span>Cusco, Perú</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold">
            © 2024 Cusco Infinity Travel. Todos los derechos reservados.
          </p>
          <div className="flex gap-8 text-white/40">
            <Instagram size={18} className="hover:text-primary transition-colors cursor-pointer" />
            <Facebook size={18} className="hover:text-primary transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
