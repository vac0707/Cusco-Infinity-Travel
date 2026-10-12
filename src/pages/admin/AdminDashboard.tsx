import React from 'react';
import { Link } from 'react-router-dom';
import { useAgencyData } from '@/context/AgencyDataContext';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { 
  Compass, 
  Map, 
  MessageSquare, 
  DollarSign, 
  Star, 
  Plus, 
  ExternalLink, 
  Database, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Eye,
  Check,
  X,
  Sparkles,
  Users,
  TrendingUp,
  FileText,
  Settings,
  Calendar
} from 'lucide-react';

export default function AdminDashboard() {
  const { 
    packages, 
    destinations, 
    testimonials, 
    isFirebaseConnected, 
    togglePackageActive, 
    togglePackageFeatured 
  } = useAgencyData();
  const { isFirebaseConfigured, isDemoMode } = useAdminAuth();

  const totalPackages = packages.length;
  const activePackages = packages.filter(p => p.active !== false).length;
  const featuredPackages = packages.filter(p => p.featured).length;
  const minPrice = packages.length > 0 ? Math.min(...packages.map(p => p.price)) : 0;
  const maxPrice = packages.length > 0 ? Math.max(...packages.map(p => p.price)) : 0;

  // Dificultad counts
  const facilCount = packages.filter(p => p.difficulty === 'Fácil').length;
  const moderadoCount = packages.filter(p => p.difficulty === 'Moderado').length;
  const desafianteCount = packages.filter(p => p.difficulty === 'Desafiante').length;

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-sm border border-stone-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-primary">
              Panel de Control
            </span>
            <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
              MODO DEMOSTRACIÓN
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-light font-heading text-dark">
            Resumen General de Cusco Infinity Travel
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Gestión integral de los {totalPackages} paquetes turísticos, destinos, testimonios y contenidos.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto flex-wrap">
          <Link to="/administracion/tours?action=new" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-wider gap-1.5 h-10 rounded-sm">
              <Plus size={15} />
              <span>Nuevo Tour</span>
            </Button>
          </Link>
          <Link to="/" target="_blank" className="hidden sm:inline-block">
            <Button variant="outline" className="text-xs font-semibold uppercase tracking-wider gap-1.5 h-10 rounded-sm">
              <Eye size={14} />
              <span>Ver Web</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Demo Information Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-sm p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 text-amber-900 rounded-sm shrink-0 mt-0.5">
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-amber-950 flex items-center gap-2">
              <span>Panel Operativo en Modo Demostración</span>
              <span className="text-[10px] bg-amber-200/70 text-amber-900 px-1.5 py-0.2 rounded font-mono font-semibold">
                Sin Firebase Conectado
              </span>
            </h2>
            <p className="text-xs text-amber-900/90 mt-0.5 leading-relaxed font-light">
              Puedes navegar todas las secciones, abrir los formularios de creación y edición, ajustar precios y modalidades, modificar fotografías y probar la experiencia de administración. Los cambios se guardan localmente para pruebas sin alterar la web pública.
            </p>
          </div>
        </div>
        <Link to="/administracion/firebase-status" className="shrink-0 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto border-amber-300 text-amber-950 hover:bg-amber-100 text-xs font-semibold uppercase tracking-wider">
            <Database size={13} className="mr-1.5" />
            Ver Arquitectura Cloud
          </Button>
        </Link>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Tours */}
        <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="text-[10px] uppercase tracking-wider font-bold">Total Tours</span>
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Compass size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-normal font-heading text-dark">{totalPackages}</div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">
              {activePackages} activos • {totalPackages - activePackages} inactivos
            </div>
          </div>
        </div>

        {/* Featured Tours */}
        <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="text-[10px] uppercase tracking-wider font-bold">Destacados en Portada</span>
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <Star size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-normal font-heading text-dark">{featuredPackages}</div>
            <div className="text-[11px] text-muted-foreground mt-1">
              Visibles en la página de inicio
            </div>
          </div>
        </div>

        {/* Cotizaciones Simuladas (Ejemplo Demo) */}
        <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="text-[10px] uppercase tracking-wider font-bold">Consultas WhatsApp</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-normal font-heading text-dark">48</div>
            <div className="text-[11px] text-muted-foreground mt-1">
              +18% este mes (métrica de ejemplo)
            </div>
          </div>
        </div>

        {/* Price Range */}
        <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="text-[10px] uppercase tracking-wider font-bold">Rango Tarifario</span>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-normal font-heading text-dark">
              ${minPrice} - ${maxPrice} <span className="text-xs font-normal text-muted-foreground">USD</span>
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">
              {destinations.length} circuitos y destinos
            </div>
          </div>
        </div>

      </div>

      {/* Difficulty Breakdown & Simulated Traffic Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Difficulty Distribution */}
        <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-medium text-sm text-dark">
              Distribución por Dificultad Física
            </h3>
            <span className="text-[10px] text-muted-foreground">{totalPackages} tours</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-emerald-700">Fácil</span>
                <span className="font-mono text-stone-500">{facilCount} tours ({Math.round((facilCount / totalPackages) * 100)}%)</span>
              </div>
              <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500" 
                  style={{ width: `${(facilCount / totalPackages) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-amber-700">Moderado</span>
                <span className="font-mono text-stone-500">{moderadoCount} tours ({Math.round((moderadoCount / totalPackages) * 100)}%)</span>
              </div>
              <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500" 
                  style={{ width: `${(moderadoCount / totalPackages) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-rose-700">Desafiante</span>
                <span className="font-mono text-stone-500">{desafianteCount} tours ({Math.round((desafianteCount / totalPackages) * 100)}%)</span>
              </div>
              <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-rose-500" 
                  style={{ width: `${(desafianteCount / totalPackages) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Example Traffic & Leads (Simulated Stats for Demo) */}
        <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-medium text-sm text-dark flex items-center gap-1.5">
              <Calendar size={14} className="text-primary" />
              <span>Estadísticas de Ejemplo (Demo)</span>
            </h3>
            <span className="text-[9px] uppercase tracking-wider font-bold bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">
              30 días
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-stone-50 p-3 rounded-sm border border-stone-100">
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">Visitas Web Est.</span>
              <span className="text-xl font-bold font-heading text-dark">1,420</span>
              <span className="text-[10px] text-emerald-600 block mt-0.5">↑ 24% viajeros</span>
            </div>
            <div className="bg-stone-50 p-3 rounded-sm border border-stone-100">
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">Testimonios</span>
              <span className="text-xl font-bold font-heading text-dark">{testimonials.length}</span>
              <span className="text-[10px] text-amber-600 block mt-0.5">★ 4.9 Promedio</span>
            </div>
            <div className="bg-stone-50 p-3 rounded-sm border border-stone-100">
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">Destinos Activos</span>
              <span className="text-xl font-bold font-heading text-dark">{destinations.length}</span>
              <span className="text-[10px] text-stone-500 block mt-0.5">Cusco y Valle</span>
            </div>
            <div className="bg-stone-50 p-3 rounded-sm border border-stone-100">
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">Conversión Quiz</span>
              <span className="text-xl font-bold font-heading text-dark">38%</span>
              <span className="text-[10px] text-emerald-600 block mt-0.5">Recomendador</span>
            </div>
          </div>
        </div>

        {/* Quick Admin Navigation */}
        <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-medium text-sm text-dark mb-2">
              Accesos Directos Rápidos
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Navega de inmediato a las áreas de gestión del sistema:
            </p>

            <div className="space-y-1.5">
              <Link
                to="/administracion/tours"
                className="flex items-center justify-between p-2 rounded-sm hover:bg-stone-50 text-xs text-stone-700 hover:text-primary transition-colors border border-transparent hover:border-stone-200"
              >
                <span className="flex items-center gap-2">
                  <Compass size={14} className="text-primary" />
                  <span>Gestionar los 18 paquetes turísticos</span>
                </span>
                <ArrowRight size={12} />
              </Link>

              <Link
                to="/administracion/destinos"
                className="flex items-center justify-between p-2 rounded-sm hover:bg-stone-50 text-xs text-stone-700 hover:text-primary transition-colors border border-transparent hover:border-stone-200"
              >
                <span className="flex items-center gap-2">
                  <Map size={14} className="text-primary" />
                  <span>Categorías y Destinos</span>
                </span>
                <ArrowRight size={12} />
              </Link>

              <Link
                to="/administracion/institucional"
                className="flex items-center justify-between p-2 rounded-sm hover:bg-stone-50 text-xs text-stone-700 hover:text-primary transition-colors border border-transparent hover:border-stone-200"
              >
                <span className="flex items-center gap-2">
                  <FileText size={14} className="text-primary" />
                  <span>Políticas y Quienes Somos</span>
                </span>
                <ArrowRight size={12} />
              </Link>

              <Link
                to="/administracion/configuracion"
                className="flex items-center justify-between p-2 rounded-sm hover:bg-stone-50 text-xs text-stone-700 hover:text-primary transition-colors border border-transparent hover:border-stone-200"
              >
                <span className="flex items-center gap-2">
                  <Settings size={14} className="text-primary" />
                  <span>Configuración General & Backup</span>
                </span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Featured Tours Quick Management */}
      <div className="bg-white rounded-sm border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-heading font-medium text-dark">
              Tours Destacados en Portada (Acceso Rápido)
            </h2>
            <p className="text-xs text-muted-foreground font-light">
              Haz clic en la estrella o en el estado para probar la reactividad del panel en tiempo real.
            </p>
          </div>
          <Link
            to="/administracion/tours"
            className="text-xs uppercase tracking-wider font-bold text-primary hover:text-dark transition-colors inline-flex items-center gap-1"
          >
            Ver todos ({totalPackages}) <ArrowRight size={13} />
          </Link>
        </div>

        <div className="divide-y divide-stone-100">
          {packages.slice(0, 8).map((pkg) => (
            <div key={pkg.id} className="p-4 sm:px-6 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={pkg.image}
                  alt=""
                  className="w-12 h-10 object-cover rounded-sm border border-stone-200 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-dark truncate">
                      {pkg.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      ({pkg.id})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                    <span className="font-bold text-primary">${pkg.price} USD</span>
                    <span>•</span>
                    <span>{pkg.duration}</span>
                    <span>•</span>
                    <span>{pkg.difficulty}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {/* Featured toggle */}
                <button
                  type="button"
                  onClick={() => togglePackageFeatured(pkg.id)}
                  title={pkg.featured ? 'Quitar de destacados' : 'Destacar en portada'}
                  className={`p-2 rounded-sm text-xs font-semibold flex items-center gap-1 transition-colors ${
                    pkg.featured 
                      ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200' 
                      : 'text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200'
                  }`}
                >
                  <Star size={14} className={pkg.featured ? 'fill-amber-500 text-amber-500' : ''} />
                  <span className="hidden sm:inline text-[10px] uppercase tracking-wider">
                    {pkg.featured ? 'Destacado' : 'No destacado'}
                  </span>
                </button>

                {/* Active toggle */}
                <button
                  type="button"
                  onClick={() => togglePackageActive(pkg.id)}
                  title={pkg.active !== false ? 'Desactivar tour' : 'Activar tour'}
                  className={`p-2 rounded-sm text-xs font-semibold flex items-center gap-1 transition-colors ${
                    pkg.active !== false
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                  }`}
                >
                  {pkg.active !== false ? <Check size={14} /> : <X size={14} />}
                  <span className="hidden sm:inline text-[10px] uppercase tracking-wider">
                    {pkg.active !== false ? 'Activo' : 'Inactivo'}
                  </span>
                </button>

                {/* View on web */}
                <Link
                  to={`/tours/${pkg.id}`}
                  target="_blank"
                  className="p-2 text-stone-400 hover:text-primary transition-colors"
                  title="Ver en la web pública"
                >
                  <ExternalLink size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
