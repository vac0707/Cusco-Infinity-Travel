import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, User, ShieldAlert, ArrowLeft, KeyRound, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AdminLoginPage() {
  const { loginWithEmail, loginWithGoogle, loginAsDemoAdmin, isFirebaseConfigured, isLoading } = useAdminAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/administracion';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await loginWithEmail(username, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Credenciales inválidas. Usa admin / admin123');
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setIsSubmitting(true);
    const result = await loginWithGoogle();
    setIsSubmitting(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Error al autenticar con Google');
    }
  };

  const handleDemoLogin = () => {
    loginAsDemoAdmin();
    navigate('/administracion', { replace: true });
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col justify-center items-center p-4 selection:bg-primary/30">
      <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-sm shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-[10px] uppercase font-bold tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Modo Demostración Activo</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-light font-heading text-white tracking-wide">
            CUSCO INFINITY TRAVEL
          </h1>
          <p className="text-xs text-stone-400 mt-1 font-light">
            Panel de Administración y Gestión de Experiencias
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="mb-6 bg-stone-950 border border-primary/30 rounded-sm p-4 text-xs text-stone-300">
          <div className="flex items-center gap-2 text-primary font-bold text-[11px] uppercase tracking-wider mb-2">
            <KeyRound size={14} />
            <span>Credenciales de Acceso Demo</span>
          </div>
          <div className="grid grid-cols-2 gap-2 bg-stone-900/80 p-2.5 rounded-sm border border-stone-800 font-mono text-[11px]">
            <div>
              <span className="text-stone-500 block text-[9px] uppercase font-sans">Usuario:</span>
              <span className="text-emerald-400 font-bold">admin</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[9px] uppercase font-sans">Contraseña:</span>
              <span className="text-emerald-400 font-bold">admin123</span>
            </div>
          </div>
          <p className="text-[10px] text-stone-400 mt-2 leading-relaxed">
            Acceso temporal para pruebas de diseño y navegación. No requiere conexión a base de datos.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-rose-950/40 border border-rose-800 text-rose-300 text-xs rounded-sm flex items-start gap-2.5">
            <ShieldAlert size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-wider font-bold text-stone-300 block mb-1.5">
              Usuario
            </label>
            <div className="relative">
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
              <Input
                type="text"
                required
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-stone-950 border-stone-700 text-white pl-9 text-xs h-11 focus-visible:ring-primary font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider font-bold text-stone-300 block mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
              <Input
                type="password"
                required
                placeholder="admin123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-stone-950 border-stone-700 text-white pl-9 text-xs h-11 focus-visible:ring-primary font-mono"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider h-11 rounded-sm mt-2 transition-all"
          >
            {isSubmitting ? 'Verificando...' : 'Iniciar Sesión'}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleDemoLogin}
            className="w-full bg-stone-950 border-primary/40 hover:bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider h-11 rounded-sm flex items-center justify-center gap-2"
          >
            <Sparkles size={14} />
            <span>Entrar Directo en Modo Demo</span>
          </Button>
        </form>

        {isFirebaseConfigured && (
          <div className="mt-4 pt-4 border-t border-stone-800">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="w-full bg-stone-950 border-stone-700 hover:bg-stone-800 text-white text-xs h-11 rounded-sm flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continuar con Google (Firebase)</span>
            </Button>
          </div>
        )}

      </div>

      <div className="mt-6">
        <Link
          to="/"
          className="text-stone-400 hover:text-white transition-colors text-xs inline-flex items-center gap-1.5"
        >
          <ArrowLeft size={13} />
          <span>Volver al sitio web de Cusco Infinity Travel</span>
        </Link>
      </div>
    </div>
  );
}
