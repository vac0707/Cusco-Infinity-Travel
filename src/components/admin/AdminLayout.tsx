import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useAgencyData } from '@/context/AgencyDataContext';
import { 
  Compass, 
  Map, 
  MessageSquare, 
  LayoutDashboard, 
  FileText, 
  Database, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  CheckCircle2, 
  AlertTriangle,
  User,
  Settings,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';

export default function AdminLayout() {
  const { user, logout, isFirebaseConfigured, isDemoMode } = useAdminAuth();
  const { isFirebaseConnected, resetToDefaultData } = useAgencyData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/administracion/login');
  };

  const handleResetDemoData = () => {
    resetToDefaultData();
    setResetConfirmOpen(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
  };

  const navItems = [
    { to: '/administracion', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/administracion/tours', label: 'Paquetes Turísticos', icon: Compass },
    { to: '/administracion/destinos', label: 'Categorías y Destinos', icon: Map },
    { to: '/administracion/testimonios', label: 'Testimonios', icon: MessageSquare },
    { to: '/administracion/secciones', label: 'Portada y Contacto', icon: Layers },
    { to: '/administracion/institucional', label: 'Políticas e Institucional', icon: FileText },
    { to: '/administracion/configuracion', label: 'Configuración General', icon: Settings },
    { to: '/administracion/firebase-status', label: 'Arquitectura Firebase', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans text-dark">
      {/* Top Demo Notice Banner */}
      <div className="bg-amber-500 text-stone-950 px-4 py-2 border-b border-amber-600/40 text-xs font-medium flex flex-wrap items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-stone-950 text-amber-300 font-bold text-[10px] uppercase tracking-wider rounded-sm">
            <Sparkles size={11} className="text-amber-400" />
            Modo Demo Activo
          </span>
          <span className="hidden md:inline text-[11px] font-semibold text-stone-900">
            Revisión de diseño y experiencia de uso sin conexión a Firebase. Los cambios se guardan temporalmente en tu navegador.
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          {resetSuccess ? (
            <span className="bg-stone-900 text-emerald-300 px-2.5 py-0.5 rounded-sm font-bold flex items-center gap-1">
              <CheckCircle2 size={12} /> ¡Datos restablecidos!
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setResetConfirmOpen(true)}
              className="bg-stone-900/10 hover:bg-stone-900/20 text-stone-950 font-bold px-2 py-0.5 rounded-sm flex items-center gap-1 transition-colors underline decoration-stone-900/40"
              title="Restablece los 18 paquetes a su estado original de fábrica"
            >
              <RotateCcw size={11} />
              <span>Restablecer 18 paquetes originales</span>
            </button>
          )}

          <Link
            to="/"
            target="_blank"
            className="bg-stone-950 hover:bg-stone-900 text-amber-300 px-2.5 py-0.5 rounded-sm font-bold flex items-center gap-1 transition-colors shrink-0"
          >
            <span>Ver Web Pública</span>
            <ExternalLink size={11} />
          </Link>
        </div>
      </div>

      {/* Confirmation Modal for Resetting Data */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-stone-200 p-6 max-w-md w-full shadow-2xl animate-fadeIn">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 text-amber-800 rounded-sm shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="font-heading font-medium text-lg text-dark">
                  ¿Restablecer datos de prueba?
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Esto borrará cualquier cambio de prueba guardado temporalmente en este navegador y restaurará los 18 paquetes turísticos oficiales y configuraciones originales.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setResetConfirmOpen(false)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:text-dark font-medium rounded-sm border border-stone-200"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleResetDemoData}
                className="px-4 py-1.5 text-xs bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-sm uppercase tracking-wider"
              >
                Sí, restablecer originales
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-stone-950 text-white border-b border-stone-800 sticky top-0 z-40">
        <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-sm text-stone-300 hover:text-white hover:bg-stone-800 focus:outline-none"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link to="/administracion" className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-bold font-heading tracking-widest text-primary uppercase">
                Cusco Infinity
              </span>
              <span className="text-[10px] uppercase tracking-wider bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-sm font-bold border border-amber-500/30">
                Panel Demo
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Database architecture state indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border bg-stone-900 border-stone-800">
              {isFirebaseConfigured && isFirebaseConnected ? (
                <>
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  <span className="text-emerald-300">Firebase Conectado</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-amber-300">Modo Demo Local</span>
                </>
              )}
            </div>

            {/* User profile & Logout */}
            <div className="flex items-center gap-2 border-l border-stone-800 pl-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-stone-200 leading-tight">
                  {user?.displayName || 'admin'}
                </span>
                <span className="text-[10px] text-amber-400 font-mono">Modo Demo</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary border border-primary/40 flex items-center justify-center font-bold text-xs">
                <User size={15} />
              </div>
              <button
                type="button"
                onClick={handleLogout}
                title="Cerrar sesión"
                className="p-1.5 text-stone-400 hover:text-rose-400 hover:bg-stone-900 rounded-sm transition-colors ml-1"
                aria-label="Cerrar sesión"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Area */}
      <div className="flex flex-1">
        {/* Sidebar for Desktop */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-stone-200 p-4 shrink-0">
          <div className="text-[10px] uppercase font-bold tracking-wider text-stone-400 px-3 mb-2 flex items-center justify-between">
            <span>Navegación</span>
            <span className="text-[9px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded font-mono font-normal">
              v1.0 Demo
            </span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-semibold tracking-wide transition-all ${
                      isActive
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-stone-600 hover:text-dark hover:bg-stone-100'
                    }`
                  }
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-stone-200">
            <div className="bg-amber-50/70 border border-amber-200 rounded-sm p-3">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold text-[11px] mb-1">
                <ShieldCheck size={14} className="text-amber-700" />
                <span>Panel Demostración</span>
              </div>
              <p className="text-[10px] text-amber-800 leading-relaxed font-light">
                Todos los formularios y botones están habilitados para evaluar la experiencia de uso.
              </p>
              <Link
                to="/"
                target="_blank"
                className="mt-2 text-[10px] uppercase tracking-wider text-primary font-bold inline-flex items-center gap-1 hover:underline"
              >
                Ver Sitio Público <ExternalLink size={10} />
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div 
              className="w-72 bg-white h-full p-4 flex flex-col shadow-2xl animate-fadeIn"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-primary tracking-wider">Cusco Infinity</span>
                  <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">DEMO</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-sm text-stone-500 hover:text-dark"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-semibold tracking-wide transition-all ${
                          isActive
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-stone-600 hover:text-dark hover:bg-stone-100'
                        }`
                      }
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>

              <div className="mt-auto pt-4 border-t border-stone-200 space-y-2">
                <Link
                  to="/"
                  target="_blank"
                  className="w-full py-2 px-3 text-xs bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-sm flex items-center justify-center gap-1.5 font-medium"
                >
                  <ExternalLink size={13} />
                  Ver Sitio Web
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-2 px-3 text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-sm flex items-center justify-center gap-1.5 font-medium"
                >
                  <LogOut size={13} />
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
