import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '@/types';
import { 
  auth, 
  isFirebaseConfigured 
} from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as fbSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isFirebaseConfigured: boolean;
  isDemoMode: boolean;
  loginWithEmail: (usernameOrEmail: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const LOCAL_ADMIN_KEY = 'cit_admin_session_v1';

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_ADMIN_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
          const adminUser: AdminUser = {
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName || 'Administrador Cusco Infinity',
            role: 'admin',
            isDemo: false
          };
          setUser(adminUser);
          localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminUser));
        } else {
          // If Firebase is configured and no user, clear session
          setUser(null);
          localStorage.removeItem(LOCAL_ADMIN_KEY);
        }
        setIsLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Demo mode: check local session
      const stored = localStorage.getItem(LOCAL_ADMIN_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed?.isDemo) {
            setUser(parsed);
          } else {
            setUser(null);
          }
        } catch {
          setUser(null);
        }
      }
      setIsLoading(false);
    }
  }, []);

  const loginWithEmail = async (usernameOrEmail: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    const cleanUser = usernameOrEmail.trim();
    const cleanPass = pass.trim();

    // 1. DEMO MODE VALIDATION (Only when Firebase is NOT configured)
    if (!isFirebaseConfigured) {
      if (cleanUser === 'admin' && cleanPass === 'admin123') {
        const demoUser: AdminUser = {
          uid: 'demo_admin_root',
          email: 'admin@cuscoinfinitytravel.com',
          displayName: 'Administrador Demo (admin)',
          role: 'admin',
          isDemo: true
        };
        setUser(demoUser);
        localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(demoUser));
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return {
          success: false,
          error: 'Credenciales demo incorrectas. Usuario correcto: admin | Contraseña correcta: admin123'
        };
      }
    }

    // 2. Real Firebase Auth if configured
    if (isFirebaseConfigured && auth) {
      try {
        const cred = await signInWithEmailAndPassword(auth, cleanUser, pass);
        const adminUser: AdminUser = {
          uid: cred.user.uid,
          email: cred.user.email,
          displayName: cred.user.displayName || 'Administrador',
          role: 'admin',
          isDemo: false
        };
        setUser(adminUser);
        localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminUser));
        setIsLoading(false);
        return { success: true };
      } catch (err) {
        setIsLoading(false);
        const msg = err instanceof Error ? err.message : 'Error al iniciar sesión con Firebase';
        return { success: false, error: msg };
      }
    }

    setIsLoading(false);
    return { 
      success: false, 
      error: 'Credenciales inválidas.' 
    };
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    if (!isFirebaseConfigured || !auth) {
      return { 
        success: false, 
        error: 'Firebase Auth no está configurado en las variables de entorno.' 
      };
    }

    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const adminUser: AdminUser = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName || 'Administrador Google',
        role: 'admin',
        isDemo: false
      };
      setUser(adminUser);
      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminUser));
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setIsLoading(false);
      const msg = err instanceof Error ? err.message : 'Error en autenticación con Google';
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await fbSignOut(auth);
      } catch (err) {
        console.warn('Firebase logout warning:', err);
      }
    }
    setUser(null);
    localStorage.removeItem(LOCAL_ADMIN_KEY);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        isFirebaseConfigured,
        isDemoMode: Boolean(!isFirebaseConfigured && user?.isDemo),
        loginWithEmail,
        loginWithGoogle,
        logout
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
