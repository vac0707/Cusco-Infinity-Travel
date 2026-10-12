import React, { useState } from 'react';
import { useAgencyData } from '@/context/AgencyDataContext';
import { Destination, TourCategorySlug, TourCategory } from '@/types';
import { TOUR_CATEGORIES } from '@/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Map, 
  Check, 
  X, 
  Sparkles, 
  Mountain, 
  AlertCircle,
  Layers,
  Compass,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

const EMPTY_DESTINATION: Destination = {
  id: '',
  name: '',
  description: '',
  image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
  altitude: '3,400 msnm',
  tourIds: []
};

export default function AdminDestinationsPage() {
  const { 
    destinations, 
    packages, 
    addDestination, 
    updateDestination, 
    deleteDestination,
    categories,
    addCategory,
    updateCategory,
    deleteCategory
  } = useAgencyData();
  const [activeTab, setActiveTab] = useState<'destinations' | 'categories'>('destinations');

  // Destination Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDest, setCurrentDest] = useState<Destination>(EMPTY_DESTINATION);
  const [destToDelete, setDestToDelete] = useState<Destination | null>(null);

  // Category State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isCategoryEditing, setIsCategoryEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<TourCategory>({
    id: '',
    name: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80'
  });
  const [categoryToDelete, setCategoryToDelete] = useState<TourCategory | null>(null);
  const [catSuccessMsg, setCatSuccessMsg] = useState(false);

  const handleOpenCreateDest = () => {
    setIsEditing(false);
    setCurrentDest({
      ...EMPTY_DESTINATION,
      id: `destino-${Date.now().toString().slice(-4)}`
    });
    setIsModalOpen(true);
  };

  const handleOpenEditDest = (dest: Destination) => {
    setIsEditing(true);
    setCurrentDest({
      ...dest,
      tourIds: dest.tourIds || []
    });
    setIsModalOpen(true);
  };

  const handleSaveDest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDest.name.trim()) return;

    if (!currentDest.id.trim()) {
      currentDest.id = currentDest.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    if (isEditing) {
      await updateDestination(currentDest.id, currentDest);
    } else {
      await addDestination(currentDest);
    }
    setIsModalOpen(false);
  };

  const toggleTourAssociation = (tourId: string) => {
    const list = currentDest.tourIds || [];
    if (list.includes(tourId)) {
      setCurrentDest(prev => ({ ...prev, tourIds: list.filter(id => id !== tourId) }));
    } else {
      setCurrentDest(prev => ({ ...prev, tourIds: [...list, tourId] }));
    }
  };

  const confirmDeleteDest = async () => {
    if (!destToDelete) return;
    await deleteDestination(destToDelete.id);
    setDestToDelete(null);
  };

  const handleOpenCreateCategory = () => {
    setIsCategoryEditing(false);
    setCurrentCategory({
      id: `cat-${Date.now().toString().slice(-4)}`,
      name: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80'
    });
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat: TourCategory) => {
    setIsCategoryEditing(true);
    setCurrentCategory(cat);
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCategory.name.trim()) return;

    if (!currentCategory.id.trim()) {
      currentCategory.id = currentCategory.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    if (isCategoryEditing) {
      await updateCategory(currentCategory.id, currentCategory);
    } else {
      await addCategory(currentCategory);
    }
    setIsCategoryModalOpen(false);
    setCatSuccessMsg(true);
    setTimeout(() => setCatSuccessMsg(false), 2500);
  };

  const confirmDeleteCategory = async () => {
    if (!categoryToDelete) return;
    await deleteCategory(categoryToDelete.id);
    setCategoryToDelete(null);
    setCatSuccessMsg(true);
    setTimeout(() => setCatSuccessMsg(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-sm border border-stone-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-primary">
              Módulo Geográfico y Clasificación
            </span>
            <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
              MODO DEMO
            </span>
          </div>
          <h1 className="text-2xl font-light font-heading text-dark">
            Gestión de Categorías y Destinos Turísticos
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Organiza las zonas arqueológicas, circuitos y categorías temáticas vinculando tours.
          </p>
        </div>

        {activeTab === 'destinations' ? (
          <Button
            onClick={handleOpenCreateDest}
            className="bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider gap-1.5 h-10 rounded-sm"
          >
            <Plus size={15} />
            <span>Añadir Destino</span>
          </Button>
        ) : (
          <Button
            onClick={handleOpenCreateCategory}
            className="bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider gap-1.5 h-10 rounded-sm"
          >
            <Plus size={15} />
            <span>Añadir Categoría</span>
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 bg-white px-4 rounded-sm shadow-xs text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('destinations')}
          className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'destinations' ? 'border-primary text-primary font-bold' : 'border-transparent text-stone-600 hover:text-dark'
          }`}
        >
          <Map size={15} />
          <span>Destinos Turísticos ({destinations.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('categories')}
          className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'categories' ? 'border-primary text-primary font-bold' : 'border-transparent text-stone-600 hover:text-dark'
          }`}
        >
          <Layers size={15} />
          <span>Categorías Temáticas ({categories.length})</span>
        </button>
      </div>

      {/* TAB 1: DESTINATIONS */}
      {activeTab === 'destinations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => {
            const assignedToursCount = dest.tourIds?.length || 0;
            return (
              <div
                key={dest.id}
                className="bg-white rounded-sm border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="relative h-44 w-full bg-stone-200">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-sm flex items-center gap-1">
                      <Mountain size={11} className="text-primary" />
                      <span>{dest.altitude || '3,400 msnm'}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-heading font-medium text-lg text-dark">
                        {dest.name}
                      </h3>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {dest.id}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 mt-1">
                      {dest.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <span className="font-semibold text-primary">
                        {assignedToursCount} tours vinculados
                      </span>
                      <span className="text-[10px] text-stone-400">
                        Circuito Oficial
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleOpenEditDest(dest)}
                    className="text-xs font-semibold text-stone-700 hover:text-primary flex items-center gap-1"
                  >
                    <Edit size={13} />
                    <span>Editar y vincular tours</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDestToDelete(dest)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 rounded transition-colors"
                    title="Eliminar destino"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          {catSuccessMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
              <Check size={16} />
              <span>Categoría guardada o actualizada correctamente.</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const count = packages.filter(p => p.categories?.includes(cat.id)).length;
              return (
                <div key={cat.id} className="bg-white rounded-sm border border-stone-200 shadow-sm p-5 flex flex-col justify-between">
                  <div>
                    <div className="relative h-32 w-full rounded-sm overflow-hidden mb-3 bg-stone-100">
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute top-2 left-2 bg-stone-900/80 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        Slug: {cat.id}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-heading font-medium text-base text-dark">{cat.name}</h3>
                      <span className="text-xs font-bold text-primary font-mono">{count} tours</span>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed mt-1">{cat.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleOpenEditCategory(cat)}
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                      <Edit size={12} />
                      <span>Editar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCategoryToDelete(cat)}
                      className="text-xs font-semibold text-stone-400 hover:text-rose-600 flex items-center gap-1"
                    >
                      <Trash2 size={12} />
                      <span>Eliminar</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DESTINATION EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-sm border border-stone-200 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col my-auto animate-fadeIn">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <h2 className="text-lg font-heading font-normal text-dark">
                {isEditing ? `Editar Destino: ${currentDest.name}` : 'Añadir Nuevo Destino'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-dark rounded-sm"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveDest} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                    Nombre del Destino *
                  </label>
                  <Input
                    type="text"
                    required
                    value={currentDest.name}
                    onChange={(e) => setCurrentDest(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej. Laguna Humantay"
                    className="text-xs h-9"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                    Identificador (Slug) *
                  </label>
                  <Input
                    type="text"
                    required
                    disabled={isEditing}
                    value={currentDest.id}
                    onChange={(e) => setCurrentDest(prev => ({ ...prev, id: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '') }))}
                    placeholder="laguna-humantay"
                    className="text-xs h-9 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                    Imagen Representativa (URL) *
                  </label>
                  <Input
                    type="url"
                    required
                    value={currentDest.image}
                    onChange={(e) => setCurrentDest(prev => ({ ...prev, image: e.target.value }))}
                    className="text-xs h-9"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                    Altitud Geográfica
                  </label>
                  <Input
                    type="text"
                    value={currentDest.altitude || ''}
                    onChange={(e) => setCurrentDest(prev => ({ ...prev, altitude: e.target.value }))}
                    placeholder="4,200 msnm"
                    className="text-xs h-9"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                  Descripción
                </label>
                <textarea
                  rows={3}
                  value={currentDest.description}
                  onChange={(e) => setCurrentDest(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2.5 text-xs border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Descripción arqueológica, natural y paisajística del destino..."
                />
              </div>

              {/* Associate Tours */}
              <div className="pt-2">
                <label className="text-[10px] uppercase font-bold text-stone-600 block mb-2">
                  Vincular Paquetes Turísticos de este Destino ({currentDest.tourIds?.length || 0} seleccionados)
                </label>
                <div className="max-h-48 overflow-y-auto border border-stone-200 rounded-sm divide-y divide-stone-100 bg-stone-50/50 p-1">
                  {packages.map((pkg) => {
                    const isSelected = currentDest.tourIds?.includes(pkg.id);
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => toggleTourAssociation(pkg.id)}
                        className="p-2 flex items-center justify-between text-xs hover:bg-stone-100 cursor-pointer rounded-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <input
                            type="checkbox"
                            checked={isSelected || false}
                            onChange={() => {}}
                            className="w-3.5 h-3.5 accent-primary shrink-0"
                          />
                          <span className="font-medium text-dark truncate">{pkg.title}</span>
                          <span className="text-[10px] text-stone-400 font-mono">({pkg.id})</span>
                        </div>
                        <span className="font-bold text-primary font-mono text-[11px] shrink-0 ml-2">
                          ${pkg.price} USD
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
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
                  className="bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider"
                >
                  Guardar Destino
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CATEGORY CREATE/EDIT MODAL */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-stone-200 shadow-2xl w-full max-w-lg p-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h3 className="font-heading font-medium text-lg text-dark">
                {isCategoryEditing ? `Editar Categoría: ${currentCategory.name}` : 'Crear Nueva Categoría'}
              </h3>
              <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="text-stone-400 hover:text-dark">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">Nombre *</label>
                  <Input
                    type="text"
                    required
                    value={currentCategory.name}
                    onChange={(e) => setCurrentCategory(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej. Caminatas Andinas"
                    className="text-xs h-9"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">Identificador (Slug) *</label>
                  <Input
                    type="text"
                    required
                    disabled={isCategoryEditing}
                    value={currentCategory.id}
                    onChange={(e) => setCurrentCategory(prev => ({ ...prev, id: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '') }))}
                    placeholder="caminatas-andinas"
                    className="text-xs h-9 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">Imagen (URL) *</label>
                <Input
                  type="url"
                  required
                  value={currentCategory.image}
                  onChange={(e) => setCurrentCategory(prev => ({ ...prev, image: e.target.value }))}
                  className="text-xs h-9"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">Descripción</label>
                <textarea
                  rows={3}
                  value={currentCategory.description}
                  onChange={(e) => setCurrentCategory(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2 text-xs border border-stone-200 rounded-sm"
                  placeholder="Descripción de la categoría temática..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button type="button" variant="outline" onClick={() => setIsCategoryModalOpen(false)} className="text-xs">
                  Cancelar
                </Button>
                <Button type="submit" className="bg-primary text-white text-xs font-bold uppercase">
                  Guardar Categoría
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE DESTINATION CONFIRMATION */}
      {destToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-stone-200 p-6 max-w-md w-full shadow-2xl animate-fadeIn">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-rose-100 text-rose-800 rounded-sm shrink-0">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="font-heading font-medium text-lg text-dark">
                  ¿Eliminar destino turístico?
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Estás a punto de eliminar <strong className="text-dark">"{destToDelete.name}"</strong>. Los paquetes asociados no se borrarán, pero se desvinculará este destino.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDestToDelete(null)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:text-dark font-medium rounded-sm border border-stone-200"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDeleteDest}
                className="px-4 py-1.5 text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-sm uppercase tracking-wider"
              >
                Sí, eliminar destino
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CATEGORY CONFIRMATION */}
      {categoryToDelete && (() => {
        const usageCount = packages.filter(p => p.categories?.includes(categoryToDelete.id as any)).length;
        return (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-sm border border-stone-200 p-6 max-w-md w-full shadow-2xl animate-fadeIn">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-rose-100 text-rose-800 rounded-sm shrink-0">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-medium text-lg text-dark">
                    ¿Eliminar categoría "{categoryToDelete.name}"?
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Esta acción eliminará la categoría del sistema de demostración.
                  </p>
                  {usageCount > 0 && (
                    <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs flex items-center gap-2">
                      <AlertCircle size={16} className="text-amber-700 shrink-0" />
                      <span><strong>¡Advertencia!</strong> Hay {usageCount} paquetes turísticos asociados a esta categoría.</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCategoryToDelete(null)}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:text-dark font-medium rounded-sm border border-stone-200"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteCategory}
                  className="px-4 py-1.5 text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-sm uppercase tracking-wider"
                >
                  Sí, eliminar categoría
                </button>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
