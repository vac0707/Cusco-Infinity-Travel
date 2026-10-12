import React, { useState, useMemo } from 'react';
import { useAgencyData } from '@/context/AgencyDataContext';
import { Package, TourDifficulty, TourCategorySlug, TourModality } from '@/types';
import { TOUR_CATEGORIES, WHATSAPP_NUMBER } from '@/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TourGallery from '@/components/TourGallery';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Star, 
  Check, 
  X, 
  ExternalLink, 
  ArrowUp, 
  ArrowDown, 
  Image as ImageIcon, 
  Sparkles,
  AlertCircle,
  Eye,
  DollarSign,
  Clock,
  Layers,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  XCircle,
  MapPin,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DEFAULT_MODALITIES: TourModality[] = [
  { name: 'Servicio Compartido / Grupal', price: 45, description: 'Grupo reducido de máximo 14 viajeros con guía oficial' },
  { name: 'Servicio Privado / Exclusivo', price: 130, description: 'Vehículo privado, guía exclusivo y horarios flexibles' }
];

const EMPTY_PACKAGE: Package = {
  id: '',
  title: '',
  price: 50,
  duration: '1 Día',
  difficulty: 'Moderado',
  image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=800&q=80'
  ],
  modalities: [
    { name: 'Servicio Compartido / Grupal', price: 50, description: 'Grupo estándar con traslados y guía bilingüe' },
    { name: 'Servicio Privado / Exclusivo', price: 140, description: 'Transporte y atención personalizada' }
  ],
  places: ['Cusco'],
  itinerary: [
    '06:00 AM - Recojo en el hotel y salida en transporte turístico',
    '09:30 AM - Visita guiada con explicaciones históricas y tiempo libre para fotos',
    '13:00 PM - Almuerzo buffet campestre con ingredientes locales',
    '17:30 PM - Retorno a la ciudad del Cusco'
  ],
  includes: [
    'Transporte turístico ida y vuelta con seguro SOAT',
    'Guía oficial de turismo bilingüe (español / inglés)',
    'Botiquín de primeros auxilios y balón de oxígeno',
    'Asistencia personalizada de Cusco Infinity Travel'
  ],
  excludes: [
    'Boleto Turístico del Cusco (BTC) o entradas no especificadas',
    'Propinas para el guía y conductor',
    'Alimentos o bebidas no mencionados en el itinerario'
  ],
  recommendations: [
    'Llevar documento de identidad original o pasaporte',
    'Ropa cómoda y abrigadora en capas (clima andino variable)',
    'Zapatillas con buena tracción para caminata',
    'Bloqueador solar, lentes de sol y gorra'
  ],
  categories: ['cultura-historia'],
  featured: false,
  active: true,
  shortDescription: 'Experiencia inolvidable en los Andes peruanos con atención personalizada.',
  altitude: '3,400 msnm'
};

export default function AdminToursPage() {
  const { 
    packages, 
    addPackage, 
    updatePackage, 
    deletePackage, 
    togglePackageActive, 
    togglePackageFeatured 
  } = useAgencyData();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTour, setCurrentTour] = useState<Package>(EMPTY_PACKAGE);
  const [activeTab, setActiveTab] = useState<'general' | 'modalities' | 'gallery' | 'itinerary' | 'includes'>('general');

  // Live Preview Modal
  const [previewTour, setPreviewTour] = useState<Package | null>(null);

  // Helper inputs for arrays
  const [newPlaceInput, setNewPlaceInput] = useState('');
  const [newItineraryInput, setNewItineraryInput] = useState('');
  const [newIncludeInput, setNewIncludeInput] = useState('');
  const [newExcludeInput, setNewExcludeInput] = useState('');
  const [newRecommendationInput, setNewRecommendationInput] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  // Modality inputs
  const [newModalityName, setNewModalityName] = useState('');
  const [newModalityPrice, setNewModalityPrice] = useState<number>(80);
  const [newModalityDesc, setNewModalityDesc] = useState('');

  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Deletion Confirmation
  const [tourToDelete, setTourToDelete] = useState<Package | null>(null);

  const filteredTours = useMemo(() => {
    return packages.filter((pkg) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = pkg.title.toLowerCase().includes(q);
        const matchId = pkg.id.toLowerCase().includes(q);
        if (!matchTitle && !matchId) return false;
      }

      if (selectedCategory !== 'todos') {
        if (!pkg.categories?.includes(selectedCategory as TourCategorySlug)) {
          return false;
        }
      }

      if (selectedStatus === 'activos' && pkg.active === false) return false;
      if (selectedStatus === 'inactivos' && pkg.active !== false) return false;
      if (selectedStatus === 'destacados' && !pkg.featured) return false;

      return true;
    });
  }, [packages, search, selectedCategory, selectedStatus]);

  const handleOpenCreate = () => {
    setIsEditing(false);
    setActiveTab('general');
    setCurrentTour({
      ...EMPTY_PACKAGE,
      id: `tour-${Date.now().toString().slice(-4)}`
    });
    setIsModalOpen(true);
    setSaveSuccessMsg(null);
  };

  const handleOpenEdit = (tour: Package) => {
    setIsEditing(true);
    setActiveTab('general');
    setCurrentTour({
      ...tour,
      gallery: tour.gallery && tour.gallery.length > 0 ? tour.gallery : [tour.image],
      modalities: tour.modalities && tour.modalities.length > 0 ? tour.modalities : [
        { name: 'Servicio Compartido', price: tour.price, description: 'Tarifa estándar en grupo' },
        { name: 'Servicio Privado', price: Math.round(tour.price * 2.4), description: 'Atención exclusiva y personalizada' }
      ],
      categories: tour.categories || []
    });
    setIsModalOpen(true);
    setSaveSuccessMsg(null);
  };

  const handleSaveTour = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTour.title.trim()) return;

    if (!currentTour.id.trim()) {
      currentTour.id = currentTour.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    if (isEditing) {
      await updatePackage(currentTour.id, currentTour);
      setSaveSuccessMsg('¡Tour actualizado con éxito!');
    } else {
      await addPackage(currentTour);
      setSaveSuccessMsg('¡Nuevo tour creado con éxito!');
    }

    setTimeout(() => {
      setIsModalOpen(false);
      setSaveSuccessMsg(null);
    }, 1000);
  };

  const confirmDelete = async () => {
    if (!tourToDelete) return;
    await deletePackage(tourToDelete.id);
    setTourToDelete(null);
  };

  // Place tag helper
  const addPlace = () => {
    if (!newPlaceInput.trim()) return;
    setCurrentTour(prev => ({ ...prev, places: [...prev.places, newPlaceInput.trim()] }));
    setNewPlaceInput('');
  };

  const removePlace = (idx: number) => {
    setCurrentTour(prev => ({ ...prev, places: prev.places.filter((_, i) => i !== idx) }));
  };

  // Itinerary helper
  const addItineraryStep = () => {
    if (!newItineraryInput.trim()) return;
    setCurrentTour(prev => ({ ...prev, itinerary: [...prev.itinerary, newItineraryInput.trim()] }));
    setNewItineraryInput('');
  };

  const removeItineraryStep = (idx: number) => {
    setCurrentTour(prev => ({ ...prev, itinerary: prev.itinerary.filter((_, i) => i !== idx) }));
  };

  const moveItineraryStep = (idx: number, dir: 'up' | 'down') => {
    const list = [...currentTour.itinerary];
    const target = dir === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= list.length) return;
    const temp = list[idx];
    list[idx] = list[target];
    list[target] = temp;
    setCurrentTour(prev => ({ ...prev, itinerary: list }));
  };

  // Inclusions / Exclusions
  const addInclude = () => {
    if (!newIncludeInput.trim()) return;
    setCurrentTour(prev => ({ ...prev, includes: [...prev.includes, newIncludeInput.trim()] }));
    setNewIncludeInput('');
  };

  const removeInclude = (idx: number) => {
    setCurrentTour(prev => ({ ...prev, includes: prev.includes.filter((_, i) => i !== idx) }));
  };

  const addExclude = () => {
    if (!newExcludeInput.trim()) return;
    setCurrentTour(prev => ({ ...prev, excludes: [...prev.excludes, newExcludeInput.trim()] }));
    setNewExcludeInput('');
  };

  const removeExclude = (idx: number) => {
    setCurrentTour(prev => ({ ...prev, excludes: prev.excludes.filter((_, i) => i !== idx) }));
  };

  // Recommendations
  const addRecommendation = () => {
    if (!newRecommendationInput.trim()) return;
    setCurrentTour(prev => ({ 
      ...prev, 
      recommendations: [...(prev.recommendations || []), newRecommendationInput.trim()] 
    }));
    setNewRecommendationInput('');
  };

  const removeRecommendation = (idx: number) => {
    setCurrentTour(prev => ({ 
      ...prev, 
      recommendations: (prev.recommendations || []).filter((_, i) => i !== idx) 
    }));
  };

  // Photo Management
  const addPhotoToGallery = () => {
    if (!newPhotoUrl.trim()) return;
    const currentGallery = currentTour.gallery || [];
    setCurrentTour(prev => ({
      ...prev,
      gallery: [...currentGallery, newPhotoUrl.trim()]
    }));
    setNewPhotoUrl('');
  };

  const removePhotoFromGallery = (idx: number) => {
    const currentGallery = currentTour.gallery || [];
    const updated = currentGallery.filter((_, i) => i !== idx);
    setCurrentTour(prev => ({
      ...prev,
      gallery: updated,
      image: prev.image === currentGallery[idx] && updated.length > 0 ? updated[0] : prev.image
    }));
  };

  const setAsMainImage = (url: string) => {
    setCurrentTour(prev => ({ ...prev, image: url }));
  };

  const movePhoto = (idx: number, direction: 'up' | 'down') => {
    const list = [...(currentTour.gallery || [])];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const temp = list[idx];
    list[idx] = list[targetIdx];
    list[targetIdx] = temp;
    setCurrentTour(prev => ({ ...prev, gallery: list }));
  };

  // Modalities Management
  const addModality = () => {
    if (!newModalityName.trim()) return;
    const newMod: TourModality = {
      name: newModalityName.trim(),
      price: Number(newModalityPrice) || currentTour.price,
      description: newModalityDesc.trim() || undefined
    };
    setCurrentTour(prev => ({
      ...prev,
      modalities: [...(prev.modalities || []), newMod]
    }));
    setNewModalityName('');
    setNewModalityPrice(currentTour.price);
    setNewModalityDesc('');
  };

  const removeModality = (idx: number) => {
    setCurrentTour(prev => ({
      ...prev,
      modalities: (prev.modalities || []).filter((_, i) => i !== idx)
    }));
  };

  // Category toggle
  const toggleCategory = (catSlug: TourCategorySlug) => {
    const current = currentTour.categories || [];
    if (current.includes(catSlug)) {
      setCurrentTour(prev => ({ ...prev, categories: current.filter(c => c !== catSlug) }));
    } else {
      setCurrentTour(prev => ({ ...prev, categories: [...current, catSlug] }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & New Tour Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-sm border border-stone-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-primary">
              Módulo de Paquetes
            </span>
            <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
              {packages.length} Tours Registrados
            </span>
          </div>
          <h1 className="text-2xl font-light font-heading text-dark">
            Gestión Completa de Tours y Modalidades
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Crea, edita, ordena fotos, ajusta precios compartidos y privados, y previsualiza los cambios.
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider gap-1.5 h-10 rounded-sm shadow-sm"
        >
          <Plus size={15} />
          <span>Crear Paquete</span>
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-sm border border-stone-200 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <Input
            type="text"
            placeholder="Buscar tour por título o identificador (ej. machu-picchu)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs h-10 border-stone-200"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full h-10 px-3 text-xs bg-white border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="todos">Todas las categorías</option>
            {TOUR_CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full h-10 px-3 text-xs bg-white border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="todos">Todos los estados</option>
            <option value="activos">Solo activos</option>
            <option value="inactivos">Solo inactivos</option>
            <option value="destacados">Solo destacados en Home</option>
          </select>
        </div>
      </div>

      {/* Tours Table */}
      <div className="bg-white rounded-sm border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-[10px] uppercase tracking-wider font-bold text-stone-500">
                <th className="py-3 px-4">Foto / Tour</th>
                <th className="py-3 px-4">Tarifa Base</th>
                <th className="py-3 px-4">Modalidades</th>
                <th className="py-3 px-4">Duración</th>
                <th className="py-3 px-4">Dificultad</th>
                <th className="py-3 px-4 text-center">Home</th>
                <th className="py-3 px-4 text-center">Estado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs">
              {filteredTours.map((tour) => (
                <tr key={tour.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={tour.image}
                        alt=""
                        className="w-14 h-11 object-cover rounded-sm border border-stone-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <div className="font-semibold text-dark truncate max-w-xs sm:max-w-md">
                          {tour.title}
                        </div>
                        <div className="text-[10px] text-stone-400 font-mono">
                          ID: {tour.id}
                        </div>
                        {tour.gallery && tour.gallery.length > 1 && (
                          <span className="text-[9px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded-sm mt-0.5 inline-block">
                            {tour.gallery.length} fotos
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-primary">
                    ${tour.price} USD
                  </td>

                  <td className="py-3.5 px-4 text-stone-600">
                    {tour.modalities && tour.modalities.length > 0 ? (
                      <span className="text-[10px] bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded border border-stone-200">
                        {tour.modalities.length} modalidades
                      </span>
                    ) : (
                      <span className="text-[10px] text-stone-400">Estándar</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-stone-600">
                    {tour.duration}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-sm border ${
                      tour.difficulty === 'Fácil' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      tour.difficulty === 'Moderado' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {tour.difficulty}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => togglePackageFeatured(tour.id)}
                      title={tour.featured ? 'Destacado en Home' : 'Hacer destacado'}
                      className={`p-1.5 rounded-sm transition-colors ${
                        tour.featured ? 'text-amber-500 hover:text-amber-600 bg-amber-50' : 'text-stone-300 hover:text-stone-600'
                      }`}
                    >
                      <Star size={16} className={tour.featured ? 'fill-amber-500' : ''} />
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => togglePackageActive(tour.id)}
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm border transition-colors ${
                        tour.active !== false
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                      }`}
                    >
                      {tour.active !== false ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Live Demo Preview Button */}
                      <button
                        type="button"
                        onClick={() => setPreviewTour(tour)}
                        className="p-1.5 text-stone-600 hover:text-primary hover:bg-stone-100 rounded-sm transition-colors"
                        title="Vista Previa de la Ficha Técnica"
                      >
                        <Eye size={15} />
                      </button>

                      <Link
                        to={`/tours/${tour.id}`}
                        target="_blank"
                        className="p-1.5 text-stone-400 hover:text-primary transition-colors"
                        title="Ver en la web pública"
                      >
                        <ExternalLink size={15} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleOpenEdit(tour)}
                        className="p-1.5 text-stone-500 hover:text-dark hover:bg-stone-100 rounded-sm transition-colors"
                        title="Editar tour"
                      >
                        <Edit size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setTourToDelete(tour)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-sm transition-colors"
                        title="Eliminar tour"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredTours.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-stone-400">
                    No se encontraron paquetes con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-sm border border-stone-200 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col my-auto animate-fadeIn">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-primary">
                  {isEditing ? 'Modificando Paquete Turístico' : 'Creando Nuevo Paquete Turístico'}
                </span>
                <h2 className="text-xl font-heading font-normal text-dark truncate max-w-xl">
                  {currentTour.title || 'Tour sin título'}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewTour(currentTour)}
                  className="text-xs gap-1 border-stone-300"
                >
                  <Eye size={13} />
                  <span>Previsualizar</span>
                </Button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-dark rounded-sm"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Tabs Navigation */}
            <div className="flex border-b border-stone-200 bg-stone-100/70 px-4 text-xs font-semibold overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('general')}
                className={`py-2.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'general' ? 'border-primary text-primary bg-white' : 'border-transparent text-stone-600 hover:text-dark'
                }`}
              >
                1. Datos Principales
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('modalities')}
                className={`py-2.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'modalities' ? 'border-primary text-primary bg-white' : 'border-transparent text-stone-600 hover:text-dark'
                }`}
              >
                2. Precios y Modalidades ({currentTour.modalities?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('gallery')}
                className={`py-2.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'gallery' ? 'border-primary text-primary bg-white' : 'border-transparent text-stone-600 hover:text-dark'
                }`}
              >
                3. Fotografías y Galería ({currentTour.gallery?.length || 1})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('itinerary')}
                className={`py-2.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'itinerary' ? 'border-primary text-primary bg-white' : 'border-transparent text-stone-600 hover:text-dark'
                }`}
              >
                4. Itinerario Detallado ({currentTour.itinerary?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('includes')}
                className={`py-2.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'includes' ? 'border-primary text-primary bg-white' : 'border-transparent text-stone-600 hover:text-dark'
                }`}
              >
                5. Inclusiones y Exclusiones
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveTour} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              
              {saveSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
                  <Check size={16} />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              {/* TAB 1: General */}
              {activeTab === 'general' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                        Título del Tour *
                      </label>
                      <Input
                        type="text"
                        required
                        value={currentTour.title}
                        onChange={(e) => setCurrentTour(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Ej. Machu Picchu Full Day Mágico"
                        className="text-xs h-9"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                        Identificador / Slug (ID) *
                      </label>
                      <Input
                        type="text"
                        required
                        disabled={isEditing}
                        value={currentTour.id}
                        onChange={(e) => setCurrentTour(prev => ({ ...prev, id: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '') }))}
                        placeholder="machupicchu-fullday"
                        className="text-xs h-9 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                        Precio Base (USD) *
                      </label>
                      <Input
                        type="number"
                        required
                        min="1"
                        value={currentTour.price}
                        onChange={(e) => setCurrentTour(prev => ({ ...prev, price: Number(e.target.value) }))}
                        className="text-xs h-9 font-bold text-primary"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                        Duración *
                      </label>
                      <select
                        value={currentTour.duration}
                        onChange={(e) => setCurrentTour(prev => ({ ...prev, duration: e.target.value }))}
                        className="w-full h-9 px-2 text-xs border border-stone-200 rounded-sm bg-white"
                      >
                        <option value="Medio Día">Medio Día</option>
                        <option value="1 Día">1 Día</option>
                        <option value="2 Días / 1 Noche">2 Días / 1 Noche</option>
                        <option value="3 Días / 2 Noches">3 Días / 2 Noches</option>
                        <option value="4 Días / 3 Noches">4 Días / 3 Noches</option>
                        <option value="5 Días / 4 Noches">5 Días / 4 Noches</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                        Dificultad Física *
                      </label>
                      <select
                        value={currentTour.difficulty}
                        onChange={(e) => setCurrentTour(prev => ({ ...prev, difficulty: e.target.value as TourDifficulty }))}
                        className="w-full h-9 px-2 text-xs border border-stone-200 rounded-sm bg-white"
                      >
                        <option value="Fácil">Fácil</option>
                        <option value="Moderado">Moderado</option>
                        <option value="Desafiante">Desafiante</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                        Altitud Máxima
                      </label>
                      <Input
                        type="text"
                        value={currentTour.altitude || ''}
                        onChange={(e) => setCurrentTour(prev => ({ ...prev, altitude: e.target.value }))}
                        placeholder="Ej. 3,800 msnm"
                        className="text-xs h-9"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                      Descripción Resumida para Catálogo
                    </label>
                    <textarea
                      rows={2}
                      value={currentTour.shortDescription || ''}
                      onChange={(e) => setCurrentTour(prev => ({ ...prev, shortDescription: e.target.value }))}
                      className="w-full p-2.5 text-xs border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Breve reseña atractiva para los viajeros..."
                    />
                  </div>

                  {/* Categories checkboxes */}
                  <div>
                    <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1.5">
                      Categorías Asociadas
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {TOUR_CATEGORIES.map(cat => {
                        const isSelected = currentTour.categories?.includes(cat.id);
                        return (
                          <button
                            type="button"
                            key={cat.id}
                            onClick={() => toggleCategory(cat.id)}
                            className={`text-left p-2 rounded-sm border text-xs flex items-center justify-between transition-colors ${
                              isSelected
                                ? 'bg-primary/10 border-primary text-dark font-semibold'
                                : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                            }`}
                          >
                            <span className="truncate">{cat.name}</span>
                            {isSelected && <Check size={13} className="text-primary shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Places tags */}
                  <div>
                    <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                      Lugares y Atractivos Visitados
                    </label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        type="text"
                        placeholder="Ej. Mirador de Taray, Templo del Sol..."
                        value={newPlaceInput}
                        onChange={(e) => setNewPlaceInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addPlace(); } }}
                        className="text-xs h-9"
                      />
                      <Button
                        type="button"
                        onClick={addPlace}
                        className="bg-stone-800 hover:bg-stone-900 text-white text-xs px-3 h-9 shrink-0"
                      >
                        Añadir
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentTour.places.map((place, idx) => (
                        <span
                          key={idx}
                          className="bg-stone-100 border border-stone-300 text-stone-800 text-[11px] px-2 py-0.5 rounded-sm flex items-center gap-1.5"
                        >
                          <span>{place}</span>
                          <button type="button" onClick={() => removePlace(idx)} className="hover:text-rose-600">
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="flex items-center gap-6 pt-3 border-t">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-dark">
                      <input
                        type="checkbox"
                        checked={currentTour.featured || false}
                        onChange={(e) => setCurrentTour(prev => ({ ...prev, featured: e.target.checked }))}
                        className="w-4 h-4 accent-primary"
                      />
                      <span>Destacar en Portada (Home)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-dark">
                      <input
                        type="checkbox"
                        checked={currentTour.active !== false}
                        onChange={(e) => setCurrentTour(prev => ({ ...prev, active: e.target.checked }))}
                        className="w-4 h-4 accent-primary"
                      />
                      <span>Paquete Activo y Publicado</span>
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 2: Modalities & Pricing */}
              {activeTab === 'modalities' && (
                <div className="space-y-4">
                  <div className="bg-stone-50 border border-stone-200 p-4 rounded-sm">
                    <h4 className="text-xs font-bold uppercase text-dark mb-1 flex items-center gap-1.5">
                      <DollarSign size={14} className="text-primary" />
                      <span>Modificar Precios y Modalidades del Paquete</span>
                    </h4>
                    <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">
                      Define distintas opciones de contratación (por ejemplo Servicio Compartido vs Servicio Privado) con precios diferenciados.
                    </p>

                    {/* Add new modality */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-white p-3 rounded border border-stone-200 mb-4">
                      <div className="sm:col-span-5">
                        <label className="text-[9px] uppercase font-bold text-stone-500 block mb-0.5">Nombre de la Modalidad</label>
                        <Input
                          type="text"
                          placeholder="Ej. Servicio Privado Exclusivo"
                          value={newModalityName}
                          onChange={(e) => setNewModalityName(e.target.value)}
                          className="text-xs h-8"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="text-[9px] uppercase font-bold text-stone-500 block mb-0.5">Precio (USD / persona)</label>
                        <Input
                          type="number"
                          placeholder="120"
                          value={newModalityPrice}
                          onChange={(e) => setNewModalityPrice(Number(e.target.value))}
                          className="text-xs h-8"
                        />
                      </div>
                      <div className="sm:col-span-4 flex items-end">
                        <Button
                          type="button"
                          onClick={addModality}
                          className="w-full bg-primary hover:bg-primary/90 text-white text-xs h-8 rounded-sm font-bold uppercase"
                        >
                          <Plus size={13} className="mr-1" /> Añadir Modalidad
                        </Button>
                      </div>
                      <div className="sm:col-span-12">
                        <label className="text-[9px] uppercase font-bold text-stone-500 block mb-0.5">Detalle / Qué incluye la modalidad</label>
                        <Input
                          type="text"
                          placeholder="Ej. Guía bilingüe privado, horarios flexibles y vehículo exclusivo"
                          value={newModalityDesc}
                          onChange={(e) => setNewModalityDesc(e.target.value)}
                          className="text-xs h-8"
                        />
                      </div>
                    </div>

                    {/* List of modalities */}
                    <div className="space-y-2">
                      {(currentTour.modalities || []).map((mod, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-3 rounded-sm border border-stone-200 flex items-center justify-between gap-3 shadow-xs"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-dark">{mod.name}</span>
                              <span className="text-xs font-bold text-primary font-mono">${mod.price} USD</span>
                            </div>
                            {mod.description && (
                              <p className="text-[11px] text-stone-500 mt-0.5">{mod.description}</p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeModality(idx)}
                            className="p-1.5 text-stone-400 hover:text-rose-600 rounded"
                            title="Eliminar modalidad"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}

                      {(!currentTour.modalities || currentTour.modalities.length === 0) && (
                        <div className="text-center py-4 text-xs text-stone-400">
                          No se han configurado modalidades adicionales. Se aplicará la tarifa base de ${currentTour.price} USD.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Photography & Gallery */}
              {activeTab === 'gallery' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                      Imagen Principal del Tour (URL) *
                    </label>
                    <Input
                      type="url"
                      required
                      value={currentTour.image}
                      onChange={(e) => setCurrentTour(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://images.unsplash.com/..."
                      className="text-xs h-9"
                    />
                  </div>

                  <div className="bg-stone-50 p-4 rounded-sm border border-stone-200 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-stone-700">
                        Galería de Múltiples Fotografías
                      </span>
                      <span className="text-[10px] text-stone-500">
                        {currentTour.gallery?.length || 1} fotos registradas
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Input
                        type="url"
                        placeholder="Pega la URL de una nueva fotografía (https://...)"
                        value={newPhotoUrl}
                        onChange={(e) => setNewPhotoUrl(e.target.value)}
                        className="text-xs h-9 bg-white"
                      />
                      <Button
                        type="button"
                        onClick={addPhotoToGallery}
                        className="bg-stone-800 hover:bg-stone-900 text-white text-xs px-3 h-9 shrink-0 font-bold"
                      >
                        <Plus size={13} className="mr-1" /> Añadir Foto
                      </Button>
                    </div>

                    {/* Photo thumbnails grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {(currentTour.gallery && currentTour.gallery.length > 0 ? currentTour.gallery : [currentTour.image]).map((img, idx) => (
                        <div 
                          key={idx}
                          className={`relative rounded-sm border overflow-hidden group bg-stone-200 ${
                            currentTour.image === img ? 'ring-2 ring-primary border-primary' : 'border-stone-300'
                          }`}
                        >
                          <img 
                            src={img} 
                            alt="" 
                            className="w-full h-24 object-cover"
                            referrerPolicy="no-referrer"
                          />
                          {currentTour.image === img && (
                            <span className="absolute top-1 left-1 bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                              Principal
                            </span>
                          )}
                          <div className="absolute inset-0 bg-dark/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5 text-white">
                            <div className="flex justify-end gap-1">
                              <button
                                type="button"
                                onClick={() => removePhotoFromGallery(idx)}
                                className="p-1 bg-rose-600 rounded-sm hover:bg-rose-700 text-white"
                                title="Eliminar de la galería"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex gap-1">
                                <button
                                  type="button"
                                  onClick={() => movePhoto(idx, 'up')}
                                  disabled={idx === 0}
                                  className="p-1 bg-stone-800 rounded-sm hover:bg-stone-700 disabled:opacity-30"
                                >
                                  <ArrowUp size={11} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => movePhoto(idx, 'down')}
                                  disabled={idx === (currentTour.gallery?.length || 1) - 1}
                                  className="p-1 bg-stone-800 rounded-sm hover:bg-stone-700 disabled:opacity-30"
                                >
                                  <ArrowDown size={11} />
                                </button>
                              </div>
                              {currentTour.image !== img && (
                                <button
                                  type="button"
                                  onClick={() => setAsMainImage(img)}
                                  className="text-[9px] bg-primary text-dark font-bold px-1.5 py-0.5 rounded-sm hover:bg-white"
                                >
                                  Hacer Principal
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Itinerary */}
              {activeTab === 'itinerary' && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Ej. 08:30 AM - Visita guiada a Ollantaytambo con tiempo libre para fotografías..."
                      value={newItineraryInput}
                      onChange={(e) => setNewItineraryInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addItineraryStep(); } }}
                      className="text-xs h-9"
                    />
                    <Button
                      type="button"
                      onClick={addItineraryStep}
                      className="bg-stone-800 hover:bg-stone-900 text-white text-xs px-3 h-9 shrink-0 font-bold"
                    >
                      <Plus size={13} className="mr-1" /> Añadir Paso
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {currentTour.itinerary.map((step, idx) => (
                      <div
                        key={idx}
                        className="bg-stone-50 border border-stone-200 p-2.5 rounded-sm flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <span className="w-5 h-5 rounded-full bg-primary/20 text-primary font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-stone-800 leading-relaxed">{step}</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => moveItineraryStep(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 hover:bg-stone-200 rounded disabled:opacity-30"
                          >
                            <ArrowUp size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveItineraryStep(idx, 'down')}
                            disabled={idx === currentTour.itinerary.length - 1}
                            className="p-1 hover:bg-stone-200 rounded disabled:opacity-30"
                          >
                            <ArrowDown size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItineraryStep(idx)}
                            className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: Includes / Excludes / Recommendations */}
              {activeTab === 'includes' && (
                <div className="space-y-6">
                  {/* Includes */}
                  <div>
                    <label className="text-[10px] uppercase font-bold text-emerald-800 block mb-1">
                      Servicios Incluidos ({currentTour.includes.length})
                    </label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        type="text"
                        placeholder="Ej. Transporte turístico con aire acondicionado..."
                        value={newIncludeInput}
                        onChange={(e) => setNewIncludeInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addInclude(); } }}
                        className="text-xs h-9"
                      />
                      <Button
                        type="button"
                        onClick={addInclude}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs px-3 h-9 shrink-0"
                      >
                        Añadir
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {currentTour.includes.map((inc, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-2 p-1.5 bg-emerald-50/60 border border-emerald-100 rounded text-xs">
                          <span className="flex items-center gap-1.5 text-emerald-950">
                            <Check size={13} className="text-emerald-600 shrink-0" />
                            <span>{inc}</span>
                          </span>
                          <button type="button" onClick={() => removeInclude(idx)} className="text-emerald-700 hover:text-rose-700">
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Excludes */}
                  <div>
                    <label className="text-[10px] uppercase font-bold text-rose-800 block mb-1">
                      Servicios No Incluidos ({currentTour.excludes.length})
                    </label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        type="text"
                        placeholder="Ej. Almuerzo o bebidas no mencionadas..."
                        value={newExcludeInput}
                        onChange={(e) => setNewExcludeInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addExclude(); } }}
                        className="text-xs h-9"
                      />
                      <Button
                        type="button"
                        onClick={addExclude}
                        className="bg-rose-700 hover:bg-rose-800 text-white text-xs px-3 h-9 shrink-0"
                      >
                        Añadir
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {currentTour.excludes.map((exc, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-2 p-1.5 bg-rose-50/60 border border-rose-100 rounded text-xs">
                          <span className="flex items-center gap-1.5 text-rose-950">
                            <X size={13} className="text-rose-600 shrink-0" />
                            <span>{exc}</span>
                          </span>
                          <button type="button" onClick={() => removeExclude(idx)} className="text-rose-700 hover:text-rose-900">
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <label className="text-[10px] uppercase font-bold text-amber-800 block mb-1">
                      Recomendaciones para el Viajero ({currentTour.recommendations?.length || 0})
                    </label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        type="text"
                        placeholder="Ej. Llevar pasaporte original vigente y poncho de lluvia..."
                        value={newRecommendationInput}
                        onChange={(e) => setNewRecommendationInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addRecommendation(); } }}
                        className="text-xs h-9"
                      />
                      <Button
                        type="button"
                        onClick={addRecommendation}
                        className="bg-amber-700 hover:bg-amber-800 text-white text-xs px-3 h-9 shrink-0"
                      >
                        Añadir
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {(currentTour.recommendations || []).map((rec, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-2 p-1.5 bg-amber-50/60 border border-amber-100 rounded text-xs">
                          <span className="flex items-center gap-1.5 text-amber-950">
                            <Sparkles size={13} className="text-amber-600 shrink-0" />
                            <span>{rec}</span>
                          </span>
                          <button type="button" onClick={() => removeRecommendation(idx)} className="text-amber-700 hover:text-rose-700">
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Submit */}
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
                  {isEditing ? 'Guardar Cambios' : 'Crear Tour'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LIVE DEMO PREVIEW MODAL */}
      {previewTour && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-sm border border-stone-200 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col my-auto animate-fadeIn overflow-hidden">
            
            {/* Preview Banner Bar */}
            <div className="bg-amber-500 text-stone-950 px-4 py-2 flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} />
                <span>VISTA PREVIA SIMULADA DE LA FICHA PÚBLICA (MODO DEMO)</span>
              </span>
              <button
                type="button"
                onClick={() => setPreviewTour(null)}
                className="p-1 hover:bg-amber-600/30 rounded text-stone-950 font-bold"
              >
                <X size={18} />
              </button>
            </div>

            {/* Simulated Tour Detail Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 bg-stone-50/50">
              
              {/* Header Badges & Title */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    previewTour.difficulty === 'Fácil' ? 'bg-emerald-100 text-emerald-800' :
                    previewTour.difficulty === 'Moderado' ? 'bg-amber-100 text-amber-800' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    {previewTour.difficulty}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-200 text-stone-800 uppercase tracking-wider">
                    {previewTour.duration}
                  </span>
                  {previewTour.altitude && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-200 text-stone-800">
                      {previewTour.altitude}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-heading font-normal text-dark">
                  {previewTour.title}
                </h2>
                {previewTour.shortDescription && (
                  <p className="text-sm text-stone-600 mt-2 font-light leading-relaxed">
                    {previewTour.shortDescription}
                  </p>
                )}
              </div>

              {/* Real Gallery Integration with Lightbox */}
              <div>
                <TourGallery
                  images={previewTour.gallery && previewTour.gallery.length > 0 ? previewTour.gallery : [previewTour.image]}
                  tourTitle={previewTour.title}
                />
              </div>

              {/* Modalities & Pricing Comparison */}
              <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-sm space-y-3">
                <h3 className="font-heading font-medium text-base text-dark flex items-center gap-1.5">
                  <DollarSign size={16} className="text-primary" />
                  <span>Modalidades y Precios Disponibles</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(previewTour.modalities && previewTour.modalities.length > 0 
                    ? previewTour.modalities 
                    : [{ name: 'Tarifa Estándar', price: previewTour.price, description: 'Servicio turístico programado' }]
                  ).map((m, idx) => (
                    <div key={idx} className="p-4 rounded-sm border border-stone-200 bg-stone-50/60 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-bold text-xs text-dark">{m.name}</span>
                          <span className="text-base font-bold text-primary font-heading">${m.price} USD</span>
                        </div>
                        {m.description && (
                          <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">{m.description}</p>
                        )}
                      </div>
                      <div className="mt-3 pt-2 border-t border-stone-200 text-[10px] text-stone-400">
                        Por pasajero • Sujeto a confirmación previa
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary Timeline */}
              <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-sm space-y-4">
                <h3 className="font-heading font-medium text-base text-dark flex items-center gap-1.5">
                  <Clock size={16} className="text-primary" />
                  <span>Itinerario Detallado</span>
                </h3>

                <div className="space-y-3 pl-2 border-l-2 border-primary/30">
                  {previewTour.itinerary.map((step, idx) => (
                    <div key={idx} className="relative pl-4">
                      <span className="absolute -left-[1.3rem] top-1 w-3 h-3 rounded-full bg-primary border-2 border-white" />
                      <p className="text-xs text-stone-700 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Includes and Excludes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-sm space-y-2">
                  <h4 className="font-heading font-medium text-sm text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle size={15} className="text-emerald-600" />
                    <span>Incluye</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {previewTour.includes.map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-sm space-y-2">
                  <h4 className="font-heading font-medium text-sm text-rose-900 flex items-center gap-1.5">
                    <XCircle size={15} className="text-rose-600" />
                    <span>No Incluye</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {previewTour.excludes.map((exc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <X size={13} className="text-rose-600 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Modal Bottom Footer */}
            <div className="p-3 bg-stone-100 border-t flex justify-end">
              <Button
                type="button"
                onClick={() => setPreviewTour(null)}
                className="bg-stone-900 text-white text-xs font-semibold px-4"
              >
                Cerrar Vista Previa
              </Button>
            </div>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {tourToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-stone-200 p-6 max-w-md w-full shadow-2xl animate-fadeIn">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-rose-100 text-rose-800 rounded-sm shrink-0">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="font-heading font-medium text-lg text-dark">
                  ¿Eliminar paquete turístico?
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Estás a punto de eliminar <strong className="text-dark">"{tourToDelete.title}"</strong> (ID: {tourToDelete.id}). Podrás restaurarlo en cualquier momento usando el botón de restablecer datos originales.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setTourToDelete(null)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:text-dark font-medium rounded-sm border border-stone-200"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-1.5 text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-sm uppercase tracking-wider"
              >
                Sí, eliminar tour
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
