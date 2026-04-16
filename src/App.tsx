import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Packages from './components/Packages';
import Advisor from './components/Advisor';
import Testimonials from './components/Testimonials';
import Destinations from './components/Destinations';
import Footer from './components/Footer';
import VirtualAssistant from './components/VirtualAssistant';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/30">
      <Navbar />
      
      <main>
        <Hero />
        
        <div className="container mx-auto px-4">
          <section id="paquetes" className="py-24">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-4 block">Experiencias Curadas</span>
                <h2 className="text-5xl md:text-7xl font-light leading-none">Paquetes <br /><span className="italic">Exclusivos</span></h2>
              </div>
              <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
                Seleccionamos las mejores rutas y experiencias para que vivas la magia de los Andes con total seguridad y confort.
              </p>
            </div>
            <Packages />
          </section>

          <div className="section-divider" />

          <section id="destinos">
            <Destinations />
          </section>

          <div className="section-divider" />

          <section id="nosotros">
            <Advisor />
          </section>

          <div className="section-divider" />

          <section id="testimonios">
            <Testimonials />
          </section>
        </div>
      </main>

      <Footer />

      {/* Floating Elements */}
      <VirtualAssistant />
      <WhatsAppButton />
    </div>
  );
}
