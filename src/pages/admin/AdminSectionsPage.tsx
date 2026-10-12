import React, { useState } from 'react';
import { useAgencyData } from '@/context/AgencyDataContext';
import { SiteSettings } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Check, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Shield, 
  Image, 
  Instagram, 
  Facebook, 
  Youtube, 
  MessageCircle,
  Eye,
  Sliders
} from 'lucide-react';

export default function AdminSectionsPage() {
  const { settings, updateSettings } = useAgencyData();
  const [formData, setFormData] = useState<SiteSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-primary">
              Módulo de Contenido
            </span>
            <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
              MODO DEMO
            </span>
          </div>
          <h1 className="text-2xl font-light font-heading text-dark">
            Portada, Contacto y Redes Sociales
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Gestiona los textos principales de la Home, números de atención y enlaces digitales.
          </p>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-sm text-xs flex items-center gap-1.5 font-semibold animate-fadeIn">
            <Check size={14} />
            <span>¡Cambios guardados en sesión demo!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. PORTADA / HERO BANNER */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-dark font-heading font-medium text-base border-b pb-2">
            <Image size={18} className="text-primary" />
            <span>1. Textos e Imagen de Portada Principal (Hero)</span>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
              Título Principal de la Portada
            </label>
            <Input
              type="text"
              value={formData.heroTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, heroTitle: e.target.value }))}
              className="text-xs h-9 font-medium"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
              Subtítulo Descriptivo
            </label>
            <textarea
              rows={2}
              value={formData.heroSubtitle}
              onChange={(e) => setFormData(prev => ({ ...prev, heroSubtitle: e.target.value }))}
              className="w-full p-2.5 text-xs border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
              Imagen de Fondo de Portada (URL)
            </label>
            <Input
              type="url"
              value={formData.heroBgImage}
              onChange={(e) => setFormData(prev => ({ ...prev, heroBgImage: e.target.value }))}
              className="text-xs h-9"
            />
          </div>

          {formData.heroBgImage && (
            <div className="relative h-28 w-full rounded-sm overflow-hidden border border-stone-200 bg-stone-100">
              <img src={formData.heroBgImage} alt="Vista previa portada" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 text-center">
                <span className="text-white text-xs font-heading font-light max-w-md drop-shadow">
                  "{formData.heroTitle}"
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 2. CANALES DE CONTACTO OFICIALES */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-dark font-heading font-medium text-base border-b pb-2">
            <Phone size={18} className="text-primary" />
            <span>2. Canales de Atención y Contacto</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                Número de WhatsApp (Sin signos, ej. 984123456)
              </label>
              <Input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                className="text-xs h-9 font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                WhatsApp Texto Visible
              </label>
              <Input
                type="text"
                value={formData.whatsappDisplay}
                onChange={(e) => setFormData(prev => ({ ...prev, whatsappDisplay: e.target.value }))}
                className="text-xs h-9"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                Correo Electrónico de Reservas
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="text-xs h-9"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                Dirección Física de la Oficina
              </label>
              <Input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="text-xs h-9"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
              Enlace de Ubicación en Google Maps
            </label>
            <Input
              type="url"
              value={formData.mapsUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, mapsUrl: e.target.value }))}
              className="text-xs h-9"
            />
          </div>
        </div>

        {/* 3. REDES SOCIALES */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-dark font-heading font-medium text-base border-b pb-2">
            <Globe size={18} className="text-primary" />
            <span>3. Redes Sociales y Presencia Digital</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1 flex items-center gap-1">
                <Instagram size={12} className="text-rose-500" />
                <span>Instagram URL</span>
              </label>
              <Input
                type="url"
                value={formData.instagramUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, instagramUrl: e.target.value }))}
                className="text-xs h-9"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1 flex items-center gap-1">
                <Facebook size={12} className="text-blue-600" />
                <span>Facebook URL</span>
              </label>
              <Input
                type="url"
                value={formData.facebookUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, facebookUrl: e.target.value }))}
                className="text-xs h-9"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                TikTok URL
              </label>
              <Input
                type="url"
                value={formData.tiktokUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, tiktokUrl: e.target.value }))}
                className="text-xs h-9"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1 flex items-center gap-1">
                <Youtube size={12} className="text-red-600" />
                <span>YouTube / Canal Oficial (Opcional)</span>
              </label>
              <Input
                type="url"
                value={formData.youtubeUrl || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, youtubeUrl: e.target.value }))}
                placeholder="https://youtube.com/..."
                className="text-xs h-9"
              />
            </div>
          </div>
        </div>

        {/* 4. VISIBILIDAD DE SECCIONES DE LA HOME */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-dark font-heading font-medium text-base border-b pb-2">
            <Sliders size={18} className="text-primary" />
            <span>4. Bloques Visibles en la Página de Inicio</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <label className="p-3 rounded-sm border border-stone-200 flex items-center justify-between cursor-pointer hover:bg-stone-50">
              <span className="font-semibold text-stone-800">Recomendador Interactivo (Quiz)</span>
              <input
                type="checkbox"
                checked={formData.homeSections?.quizVisible !== false}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  homeSections: { ...(prev.homeSections || {}), quizVisible: e.target.checked }
                }))}
                className="w-4 h-4 accent-primary"
              />
            </label>

            <label className="p-3 rounded-sm border border-stone-200 flex items-center justify-between cursor-pointer hover:bg-stone-50">
              <span className="font-semibold text-stone-800">Destinos Imperdibles</span>
              <input
                type="checkbox"
                checked={formData.homeSections?.destinationsVisible !== false}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  homeSections: { ...(prev.homeSections || {}), destinationsVisible: e.target.checked }
                }))}
                className="w-4 h-4 accent-primary"
              />
            </label>

            <label className="p-3 rounded-sm border border-stone-200 flex items-center justify-between cursor-pointer hover:bg-stone-50">
              <span className="font-semibold text-stone-800">Sección de Testimonios Reales</span>
              <input
                type="checkbox"
                checked={formData.homeSections?.testimonialsVisible !== false}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  homeSections: { ...(prev.homeSections || {}), testimonialsVisible: e.target.checked }
                }))}
                className="w-4 h-4 accent-primary"
              />
            </label>

            <label className="p-3 rounded-sm border border-stone-200 flex items-center justify-between cursor-pointer hover:bg-stone-50">
              <span className="font-semibold text-stone-800">Por Qué Elegir Cusco Infinity</span>
              <input
                type="checkbox"
                checked={formData.homeSections?.whyUsVisible !== false}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  homeSections: { ...(prev.homeSections || {}), whyUsVisible: e.target.checked }
                }))}
                className="w-4 h-4 accent-primary"
              />
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider px-6 h-11"
          >
            Guardar Cambios de Contenido
          </Button>
        </div>

      </form>
    </div>
  );
}
