import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  Package, 
  Destination, 
  Testimonial, 
  SiteSettings,
  TourCategory 
} from '@/types';
import { 
  PACKAGES, 
  DESTINATIONS, 
  REAL_TESTIMONIALS, 
  TOUR_CATEGORIES,
  WHATSAPP_NUMBER, 
  WHATSAPP_DISPLAY, 
  AGENCY_EMAIL, 
  AGENCY_ADDRESS, 
  MAPS_URL, 
  HERO_BG_IMAGE 
} from '@/constants';
import { 
  db, 
  isFirebaseConfigured, 
  handleFirestoreError, 
  OperationType 
} from '@/lib/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  onSnapshot 
} from 'firebase/firestore';

const DEFAULT_SETTINGS: SiteSettings = {
  agencyName: 'Cusco Infinity Travel',
  slogan: 'Experiencias de viaje exclusivas en los Andes peruanos',
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappDisplay: WHATSAPP_DISPLAY,
  email: AGENCY_EMAIL,
  address: AGENCY_ADDRESS,
  mapsUrl: MAPS_URL,
  instagramUrl: 'https://instagram.com',
  facebookUrl: 'https://facebook.com',
  tiktokUrl: 'https://tiktok.com',
  heroTitle: 'Descubre la Esencia Mágica de Cusco y Machu Picchu',
  heroSubtitle: 'Diseñamos vivencias culturales, arqueológicas y de montaña con asesoría de expertos locales.',
  heroBgImage: HERO_BG_IMAGE,
  termsAndConditions: 'Términos y condiciones oficiales de servicio de Cusco Infinity Travel. Reservas sujetas a disponibilidad y confirmación previa.',
  bookingPolicies: 'Políticas de reserva, cancelación y reprogramación según regulaciones turísticas de Cusco y SERNANP.'
};

const STORAGE_KEYS = {
  PACKAGES: 'cit_packages_v1',
  DESTINATIONS: 'cit_destinations_v1',
  TESTIMONIALS: 'cit_testimonials_v1',
  CATEGORIES: 'cit_categories_v1',
  SETTINGS: 'cit_settings_v1',
};

interface AgencyDataContextType {
  packages: Package[];
  destinations: Destination[];
  testimonials: Testimonial[];
  categories: TourCategory[];
  settings: SiteSettings;
  isFirebaseConnected: boolean;
  isLoading: boolean;
  addPackage: (pkg: Package) => Promise<void>;
  updatePackage: (id: string, updates: Partial<Package>) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;
  togglePackageActive: (id: string) => Promise<void>;
  togglePackageFeatured: (id: string) => Promise<void>;
  addDestination: (dest: Destination) => Promise<void>;
  updateDestination: (id: string, updates: Partial<Destination>) => Promise<void>;
  deleteDestination: (id: string) => Promise<void>;
  addCategory: (cat: TourCategory) => Promise<void>;
  updateCategory: (id: string, updates: Partial<TourCategory>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addTestimonial: (test: Testimonial) => Promise<void>;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  updateSettings: (updates: Partial<SiteSettings>) => Promise<void>;
  migrateLocalToFirestore: () => Promise<{ success: boolean; count: number; error?: string }>;
  resetToDefaultData: () => void;
}

const AgencyDataContext = createContext<AgencyDataContextType | undefined>(undefined);

export function AgencyDataProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with localStorage fallback or constants
  const [packages, setPackages] = useState<Package[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PACKAGES);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default to constant PACKAGES with active: true
    return PACKAGES.map(p => ({ ...p, active: p.active !== false }));
  });

  const [destinations, setDestinations] = useState<Destination[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DESTINATIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DESTINATIONS;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return REAL_TESTIMONIALS.map(t => ({
      ...t,
      active: (t as { active?: boolean }).active !== false,
      avatar: (t as { avatar?: string }).avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    }));
  });

  const [categories, setCategories] = useState<TourCategory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return TOUR_CATEGORIES;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_SETTINGS;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
    } catch {
      // ignore
    }
  }, [packages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(destinations));
    } catch {
      // ignore
    }
  }, [destinations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    } catch {
      // ignore
    }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch {
      // ignore
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  // If Firebase is configured, listen to Firestore updates
  useEffect(() => {
    if (!isFirebaseConfigured || !db) return;

    setIsLoading(true);

    const unsubPackages = onSnapshot(
      collection(db, 'packages'),
      (snapshot) => {
        setIsFirebaseConnected(true);
        if (!snapshot.empty) {
          const list: Package[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as Package);
          });
          setPackages(list);
        }
        setIsLoading(false);
      },
      (error) => {
        console.warn('Firestore snapshot error for packages:', error.message);
        setIsLoading(false);
      }
    );

    const unsubDestinations = onSnapshot(
      collection(db, 'destinations'),
      (snapshot) => {
        if (!snapshot.empty) {
          const list: Destination[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as Destination);
          });
          setDestinations(list);
        }
      },
      (error) => {
        console.warn('Firestore destinations snapshot error:', error.message);
      }
    );

    const unsubTestimonials = onSnapshot(
      collection(db, 'testimonials'),
      (snapshot) => {
        if (!snapshot.empty) {
          const list: Testimonial[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as Testimonial);
          });
          setTestimonials(list);
        }
      },
      (error) => {
        console.warn('Firestore testimonials snapshot error:', error.message);
      }
    );

    return () => {
      unsubPackages();
      unsubDestinations();
      unsubTestimonials();
    };
  }, []);

  // Operations for Packages
  const addPackage = useCallback(async (newPkg: Package) => {
    if (packages.some(p => p.id === newPkg.id)) {
      throw new Error(`Ya existe un paquete turístico con el ID "${newPkg.id}". Los identificadores deben ser únicos.`);
    }
    setPackages(prev => [newPkg, ...prev]);

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'packages', newPkg.id), newPkg);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `packages/${newPkg.id}`);
      }
    }
  }, [packages]);

  const updatePackage = useCallback(async (id: string, updates: Partial<Package>) => {
    let updatedItem: Package | undefined;
    setPackages(prev => prev.map(p => {
      if (p.id === id) {
        updatedItem = { ...p, ...updates, id, updatedAt: new Date().toISOString() }; // Ensure ID is preserved
        return updatedItem;
      }
      return p;
    }));

    if (isFirebaseConfigured && db && updatedItem) {
      try {
        await setDoc(doc(db, 'packages', id), updatedItem, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `packages/${id}`);
      }
    }
  }, []);

  const deletePackage = useCallback(async (id: string) => {
    setPackages(prev => prev.filter(p => p.id !== id));

    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'packages', id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `packages/${id}`);
      }
    }
  }, []);

  const togglePackageActive = useCallback(async (id: string) => {
    const pkg = packages.find(p => p.id === id);
    if (!pkg) return;
    const nextState = pkg.active === false ? true : false;
    await updatePackage(id, { active: nextState });
  }, [packages, updatePackage]);

  const togglePackageFeatured = useCallback(async (id: string) => {
    const pkg = packages.find(p => p.id === id);
    if (!pkg) return;
    const nextState = !pkg.featured;
    await updatePackage(id, { featured: nextState });
  }, [packages, updatePackage]);

  // Operations for Destinations
  const addDestination = useCallback(async (newDest: Destination) => {
    if (destinations.some(d => d.id === newDest.id)) {
      throw new Error(`Ya existe un destino con el ID "${newDest.id}". Los identificadores deben ser únicos.`);
    }
    setDestinations(prev => [...prev, newDest]);

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'destinations', newDest.id), newDest);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `destinations/${newDest.id}`);
      }
    }
  }, [destinations]);

  const updateDestination = useCallback(async (id: string, updates: Partial<Destination>) => {
    let updatedDest: Destination | undefined;
    setDestinations(prev => prev.map(d => {
      if (d.id === id) {
        updatedDest = { ...d, ...updates, id }; // Ensure ID preserved
        return updatedDest;
      }
      return d;
    }));

    if (isFirebaseConfigured && db && updatedDest) {
      try {
        await setDoc(doc(db, 'destinations', id), updatedDest, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `destinations/${id}`);
      }
    }
  }, []);

  const deleteDestination = useCallback(async (id: string) => {
    setDestinations(prev => prev.filter(d => d.id !== id));

    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'destinations', id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `destinations/${id}`);
      }
    }
  }, []);

  // Operations for Categories
  const addCategory = useCallback(async (newCat: TourCategory) => {
    if (categories.some(c => c.id === newCat.id)) {
      throw new Error(`Ya existe una categoría con el ID "${newCat.id}". Los identificadores deben ser únicos.`);
    }
    setCategories(prev => [...prev, newCat]);

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'categories', newCat.id), newCat);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `categories/${newCat.id}`);
      }
    }
  }, [categories]);

  const updateCategory = useCallback(async (id: string, updates: Partial<TourCategory>) => {
    let updatedCat: TourCategory | undefined;
    setCategories(prev => prev.map(c => {
      if (c.id === id) {
        updatedCat = { ...c, ...updates, id }; // Ensure ID preserved
        return updatedCat;
      }
      return c;
    }));

    if (isFirebaseConfigured && db && updatedCat) {
      try {
        await setDoc(doc(db, 'categories', id), updatedCat, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `categories/${id}`);
      }
    }
  }, []);

  const deleteCategory = useCallback(async (id: string) => {
    const isUsedInPackages = packages.some(p => p.categories?.includes(id) || (p as any).category === id);
    if (isUsedInPackages) {
      throw new Error(`No se puede eliminar la categoría "${id}" porque está siendo utilizada por uno o más paquetes turísticos.`);
    }

    setCategories(prev => prev.filter(c => c.id !== id));

    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'categories', id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `categories/${id}`);
      }
    }
  }, [packages]);

  // Operations for Testimonials
  const addTestimonial = useCallback(async (newTest: Testimonial) => {
    setTestimonials(prev => [newTest, ...prev]);

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'testimonials', newTest.id), newTest);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `testimonials/${newTest.id}`);
      }
    }
  }, []);

  const updateTestimonial = useCallback(async (id: string, updates: Partial<Testimonial>) => {
    let updatedTest: Testimonial | undefined;
    setTestimonials(prev => prev.map(t => {
      if (t.id === id) {
        updatedTest = { ...t, ...updates };
        return updatedTest;
      }
      return t;
    }));

    if (isFirebaseConfigured && db && updatedTest) {
      try {
        await setDoc(doc(db, 'testimonials', id), updatedTest, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `testimonials/${id}`);
      }
    }
  }, []);

  const deleteTestimonial = useCallback(async (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));

    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'testimonials', id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `testimonials/${id}`);
      }
    }
  }, []);

  // Operations for Settings
  const updateSettings = useCallback(async (updates: Partial<SiteSettings>) => {
    const updated = { ...settings, ...updates };
    setSettings(updated);

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'site_settings', 'general'), updated, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, 'site_settings/general');
      }
    }
  }, [settings]);

  // Cloud Migration / Seeding without duplicates
  const migrateLocalToFirestore = useCallback(async () => {
    if (!isFirebaseConfigured || !db) {
      return { 
        success: false, 
        count: 0, 
        error: 'Firebase no está configurado en las variables de entorno (.env).' 
      };
    }

    try {
      let count = 0;
      // 1. Migrate Packages preserving IDs
      for (const p of packages) {
        await setDoc(doc(db, 'packages', p.id), p, { merge: true });
        count++;
      }

      // 2. Migrate Destinations
      for (const d of destinations) {
        await setDoc(doc(db, 'destinations', d.id), d, { merge: true });
        count++;
      }

      // 3. Migrate Testimonials
      for (const t of testimonials) {
        await setDoc(doc(db, 'testimonials', t.id), t, { merge: true });
        count++;
      }

      // 4. Migrate Categories
      for (const c of categories) {
        await setDoc(doc(db, 'categories', c.id), c, { merge: true });
        count++;
      }

      // 5. Migrate Site Settings
      await setDoc(doc(db, 'site_settings', 'general'), settings, { merge: true });

      setIsFirebaseConnected(true);
      return { success: true, count };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return { success: false, count: 0, error: msg };
    }
  }, [packages, destinations, testimonials, categories, settings]);

  // Reset to default data
  const resetToDefaultData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.PACKAGES);
    localStorage.removeItem(STORAGE_KEYS.DESTINATIONS);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);

    setPackages(PACKAGES.map(p => ({ ...p, active: p.active !== false })));
    setDestinations(DESTINATIONS);
    setTestimonials(REAL_TESTIMONIALS.map(t => ({
      ...t,
      active: (t as { active?: boolean }).active !== false,
      avatar: (t as { avatar?: string }).avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    })));
    setCategories(TOUR_CATEGORIES);
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return (
    <AgencyDataContext.Provider
      value={{
        packages,
        destinations,
        testimonials,
        categories,
        settings,
        isFirebaseConnected,
        isLoading,
        addPackage,
        updatePackage,
        deletePackage,
        togglePackageActive,
        togglePackageFeatured,
        addDestination,
        updateDestination,
        deleteDestination,
        addCategory,
        updateCategory,
        deleteCategory,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        updateSettings,
        migrateLocalToFirestore,
        resetToDefaultData
      }}
    >
      {children}
    </AgencyDataContext.Provider>
  );
}

export function useAgencyData() {
  const context = useContext(AgencyDataContext);
  if (!context) {
    throw new Error('useAgencyData must be used within an AgencyDataProvider');
  }
  return context;
}
