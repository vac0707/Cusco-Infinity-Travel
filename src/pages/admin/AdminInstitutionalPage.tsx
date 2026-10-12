import React, { useState } from 'react';
import { useAgencyData } from '@/context/AgencyDataContext';
import { SiteSettings, FaqItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Shield, 
  Users, 
  HelpCircle, 
  Check, 
  Plus, 
  Trash2, 
  Sparkles,
  BookOpen
} from 'lucide-react';

const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '¿Con cuánta anticipación debo reservar el boleto a Machu Picchu o Camino Inca?',
    answer: 'Recomendamos reservar con un mínimo de 2 a 3 meses de anticipación debido a los límites de aforo diario establecidos por el Ministerio de Cultura del Perú.'
  },
  {
    id: 'faq-2',
    question: '¿Qué hago si sufro de mal de altura (soroche) al llegar a Cusco?',
    answer: 'Aconsejamos descansar las primeras horas, hidratarse con abundante agua y mate de coca, y realizar tours de aclimatación suave el primer día (como City Tour o Valle Sagrado).'
  },
  {
    id: 'faq-3',
    question: '¿Qué incluye el servicio y cuáles son los métodos de pago aceptados?',
    answer: 'Aceptamos transferencias bancarias, tarjetas de crédito/débito internacionales y pagos por pasarela segura. Todos los detalles quedan estipulados en tu confirmación formal.'
  }
];

export default function AdminInstitutionalPage() {
  const { settings, updateSettings } = useAgencyData();
  const [formData, setFormData] = useState<SiteSettings>(settings);
  const [activeTab, setActiveTab] = useState<'terms' | 'policies' | 'about' | 'faqs'>('terms');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // FAQ state
  const [faqs, setFaqs] = useState<FaqItem[]>(formData.faqs && formData.faqs.length > 0 ? formData.faqs : DEFAULT_FAQS);
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings({
      ...formData,
      faqs
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddFaq = () => {
    if (!newFaqQ.trim() || !newFaqA.trim()) return;
    const item: FaqItem = {
      id: `faq-${Date.now()}`,
      question: newFaqQ.trim(),
      answer: newFaqA.trim()
    };
    setFaqs(prev => [...prev, item]);
    setNewFaqQ('');
    setNewFaqA('');
  };

  const handleRemoveFaq = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-primary">
              Módulo Institucional
            </span>
            <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
              MODO DEMO
            </span>
          </div>
          <h1 className="text-2xl font-light font-heading text-dark">
            Políticas y Páginas Institucionales
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Administra los términos legales, normativas de reserva, historia institucional y preguntas frecuentes.
          </p>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-sm text-xs flex items-center gap-1.5 font-semibold animate-fadeIn">
            <Check size={14} />
            <span>¡Políticas guardadas en sesión!</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 bg-white px-4 rounded-sm shadow-xs text-xs font-semibold overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('terms')}
          className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'terms' ? 'border-primary text-primary font-bold' : 'border-transparent text-stone-600 hover:text-dark'
          }`}
        >
          <FileText size={15} />
          <span>Términos y Condiciones</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('policies')}
          className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'policies' ? 'border-primary text-primary font-bold' : 'border-transparent text-stone-600 hover:text-dark'
          }`}
        >
          <Shield size={15} />
          <span>Políticas de Reserva</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('about')}
          className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'about' ? 'border-primary text-primary font-bold' : 'border-transparent text-stone-600 hover:text-dark'
          }`}
        >
          <Users size={15} />
          <span>Quiénes Somos / Misión</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('faqs')}
          className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'faqs' ? 'border-primary text-primary font-bold' : 'border-transparent text-stone-600 hover:text-dark'
          }`}
        >
          <HelpCircle size={15} />
          <span>Preguntas Frecuentes ({faqs.length})</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* TAB 1: Terms */}
        {activeTab === 'terms' && (
          <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-dark font-heading font-medium text-base border-b pb-2">
              <FileText size={18} className="text-primary" />
              <span>Términos y Condiciones del Servicio</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Este texto se muestra en el modal legal del pie de página y en los enlaces de confirmación de reserva.
            </p>

            <div>
              <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                Contenido Legal de Términos y Condiciones
              </label>
              <textarea
                rows={12}
                value={formData.termsAndConditions}
                onChange={(e) => setFormData(prev => ({ ...prev, termsAndConditions: e.target.value }))}
                className="w-full p-3 text-xs border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed font-sans"
              />
            </div>
          </div>
        )}

        {/* TAB 2: Booking Policies */}
        {activeTab === 'policies' && (
          <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-dark font-heading font-medium text-base border-b pb-2">
              <Shield size={18} className="text-primary" />
              <span>Políticas de Reserva, Pagos y Cancelación</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Normativas de confirmación, pagos por adelantado, reprogramación y regulaciones del SERNANP.
            </p>

            <div>
              <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                Texto de Políticas de Reserva
              </label>
              <textarea
                rows={12}
                value={formData.bookingPolicies}
                onChange={(e) => setFormData(prev => ({ ...prev, bookingPolicies: e.target.value }))}
                className="w-full p-3 text-xs border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed font-sans"
              />
            </div>
          </div>
        )}

        {/* TAB 3: About Agency */}
        {activeTab === 'about' && (
          <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-dark font-heading font-medium text-base border-b pb-2">
              <Users size={18} className="text-primary" />
              <span>Acerca de Cusco Infinity Travel</span>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                Historia y Presentación de la Agencia
              </label>
              <textarea
                rows={4}
                value={formData.aboutUsText || 'Cusco Infinity Travel es una agencia de viajes y turismo cusqueña especializada en crear vivencias personalizadas en los Andes peruanos, con un equipo de guías oficiales apasionados por la historia y el legado incaico.'}
                onChange={(e) => setFormData(prev => ({ ...prev, aboutUsText: e.target.value }))}
                className="w-full p-3 text-xs border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                  Misión
                </label>
                <textarea
                  rows={4}
                  value={formData.missionText || 'Brindar servicios turísticos de excelencia, garantizando la seguridad, calidez y satisfacción de cada viajero mediante un turismo responsable y respetuoso del patrimonio andino.'}
                  onChange={(e) => setFormData(prev => ({ ...prev, missionText: e.target.value }))}
                  className="w-full p-3 text-xs border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                  Visión
                </label>
                <textarea
                  rows={4}
                  value={formData.visionText || 'Ser la agencia líder y referente en Cusco por la exclusividad de nuestras experiencias, compromiso social con las comunidades locales y calidad de atención de nivel internacional.'}
                  onChange={(e) => setFormData(prev => ({ ...prev, visionText: e.target.value }))}
                  className="w-full p-3 text-xs border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAQs */}
        {activeTab === 'faqs' && (
          <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-dark font-heading font-medium text-base border-b pb-2">
              <HelpCircle size={18} className="text-primary" />
              <span>Preguntas Frecuentes (FAQ)</span>
            </div>

            {/* Add FAQ form */}
            <div className="bg-stone-50 p-4 rounded-sm border border-stone-200 space-y-3">
              <span className="text-xs font-bold text-dark block">Añadir Nueva Pregunta</span>
              <div>
                <Input
                  type="text"
                  placeholder="Pregunta (ej. ¿Cuál es la mejor época del año para visitar Cusco?)"
                  value={newFaqQ}
                  onChange={(e) => setNewFaqQ(e.target.value)}
                  className="text-xs h-9 bg-white"
                />
              </div>
              <div>
                <textarea
                  rows={2}
                  placeholder="Respuesta explicativa para el viajero..."
                  value={newFaqA}
                  onChange={(e) => setNewFaqA(e.target.value)}
                  className="w-full p-2.5 text-xs border border-stone-200 rounded-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <Button
                type="button"
                onClick={handleAddFaq}
                className="bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase h-8"
              >
                <Plus size={13} className="mr-1" /> Añadir Pregunta
              </Button>
            </div>

            {/* FAQ List */}
            <div className="space-y-3 pt-2">
              {faqs.map((faq) => (
                <div key={faq.id} className="p-4 bg-stone-50 border border-stone-200 rounded-sm flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs text-dark">{faq.question}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{faq.answer}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(faq.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 rounded shrink-0"
                    title="Eliminar pregunta"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider px-6 h-11"
          >
            Guardar Contenido Institucional
          </Button>
        </div>

      </form>
    </div>
  );
}
