import React, { useState } from 'react';
import { useAgencyData } from '@/context/AgencyDataContext';
import { Testimonial } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  Check, 
  X, 
  MessageSquare, 
  AlertCircle,
  Sparkles,
  Quote
} from 'lucide-react';

const EMPTY_TESTIMONIAL: Testimonial = {
  id: '',
  name: '',
  location: 'Lima, Perú',
  comment: '',
  rating: 5,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  active: true,
  date: 'Reciente',
  tourTitle: 'Machu Picchu Full Day'
};

export default function AdminTestimonialsPage() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial, packages } = useAgencyData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTest, setCurrentTest] = useState<Testimonial>(EMPTY_TESTIMONIAL);
  const [testToDelete, setTestToDelete] = useState<Testimonial | null>(null);

  const handleOpenCreate = () => {
    setIsEditing(false);
    setCurrentTest({
      ...EMPTY_TESTIMONIAL,
      id: `test-${Date.now().toString().slice(-4)}`
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setIsEditing(true);
    setCurrentTest(t);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTest.name.trim() || !currentTest.comment.trim()) return;

    if (!currentTest.id.trim()) {
      currentTest.id = `test-${Date.now().toString().slice(-4)}`;
    }

    if (isEditing) {
      await updateTestimonial(currentTest.id, currentTest);
    } else {
      await addTestimonial(currentTest);
    }
    setIsModalOpen(false);
  };

  const toggleActive = async (t: Testimonial) => {
    await updateTestimonial(t.id, { active: t.active === false ? true : false });
  };

  const confirmDelete = async () => {
    if (!testToDelete) return;
    await deleteTestimonial(testToDelete.id);
    setTestToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-sm border border-stone-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-primary">
              Módulo de Reputación
            </span>
            <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
              MODO DEMO
            </span>
          </div>
          <h1 className="text-2xl font-light font-heading text-dark">
            Gestión de Reseñas y Testimonios ({testimonials.length})
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Publica, modera y gestiona opiniones verificadas de viajeros para la página de inicio.
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider gap-1.5 h-10 rounded-sm"
        >
          <Plus size={15} />
          <span>Añadir Testimonio</span>
        </Button>
      </div>

      {/* Grid of testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-sm border border-stone-200 p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < test.rating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'}
                    />
                  ))}
                  <span className="text-xs font-bold font-mono ml-1 text-stone-700">
                    {test.rating}.0
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleActive(test)}
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border transition-colors ${
                    test.active !== false
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  {test.active !== false ? 'Publicado' : 'Oculto'}
                </button>
              </div>

              <div className="relative mb-3">
                <Quote size={20} className="text-stone-200 absolute -top-1 -left-1 -z-0" />
                <p className="text-xs text-stone-600 leading-relaxed italic relative z-10 pl-3">
                  "{test.comment}"
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-3">
              <div className="flex items-center gap-2.5">
                <img
                  src={test.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt={test.name}
                  className="w-9 h-9 rounded-full object-cover border border-stone-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-semibold text-xs text-dark">{test.name}</div>
                  <div className="text-[10px] text-stone-400">{test.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(test)}
                  className="p-1.5 text-stone-400 hover:text-dark hover:bg-stone-100 rounded"
                  title="Editar testimonio"
                >
                  <Edit size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setTestToDelete(test)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                  title="Eliminar testimonio"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-stone-200 shadow-2xl w-full max-w-lg p-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h2 className="text-lg font-heading font-medium text-dark">
                {isEditing ? 'Editar Reseña de Viajero' : 'Añadir Nuevo Testimonio'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-stone-400 hover:text-dark rounded"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                    Nombre del Viajero *
                  </label>
                  <Input
                    type="text"
                    required
                    value={currentTest.name}
                    onChange={(e) => setCurrentTest(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej. Martín y Sofía"
                    className="text-xs h-9"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                    Ciudad / País de Origen
                  </label>
                  <Input
                    type="text"
                    value={currentTest.location}
                    onChange={(e) => setCurrentTest(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Buenos Aires, Argentina"
                    className="text-xs h-9"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                    Calificación en Estrellas (1 - 5)
                  </label>
                  <select
                    value={currentTest.rating}
                    onChange={(e) => setCurrentTest(prev => ({ ...prev, rating: Number(e.target.value) }))}
                    className="w-full h-9 px-2 text-xs border border-stone-200 rounded-sm bg-white"
                  >
                    <option value="5">★★★★★ (5 Estrellas - Excelente)</option>
                    <option value="4">★★★★☆ (4 Estrellas - Muy Bueno)</option>
                    <option value="3">★★★☆☆ (3 Estrellas - Bueno)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                    Tour Realizado (Opcional)
                  </label>
                  <Input
                    type="text"
                    value={currentTest.tourTitle || ''}
                    onChange={(e) => setCurrentTest(prev => ({ ...prev, tourTitle: e.target.value }))}
                    placeholder="Machu Picchu Full Day"
                    className="text-xs h-9"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                  Fotografía de Perfil / Avatar (URL)
                </label>
                <Input
                  type="url"
                  value={currentTest.avatar || ''}
                  onChange={(e) => setCurrentTest(prev => ({ ...prev, avatar: e.target.value }))}
                  placeholder="https://..."
                  className="text-xs h-9"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                  Comentario / Opinión *
                </label>
                <textarea
                  rows={4}
                  required
                  value={currentTest.comment}
                  onChange={(e) => setCurrentTest(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Escribe la experiencia del cliente..."
                  className="w-full p-2.5 text-xs border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase"
                >
                  Guardar Testimonio
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {testToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-stone-200 p-6 max-w-md w-full shadow-2xl animate-fadeIn">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-rose-100 text-rose-800 rounded-sm shrink-0">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="font-heading font-medium text-lg text-dark">
                  ¿Eliminar testimonio?
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Estás a punto de eliminar la reseña de <strong className="text-dark">"{testToDelete.name}"</strong>.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setTestToDelete(null)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:text-dark font-medium rounded-sm border border-stone-200"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-1.5 text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-sm uppercase tracking-wider"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
