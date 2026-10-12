import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import { AgencyDataProvider } from './context/AgencyDataContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminRoute from './components/admin/AdminRoute';

// Lazy loaded public pages
const Home = lazy(() => import('./pages/Home'));
const ToursCatalog = lazy(() => import('./pages/ToursCatalog'));
const TourDetail = lazy(() => import('./pages/TourDetail'));
const DestinationsPage = lazy(() => import('./pages/DestinationsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lazy loaded admin pages
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminToursPage = lazy(() => import('./pages/admin/AdminToursPage'));
const AdminDestinationsPage = lazy(() => import('./pages/admin/AdminDestinationsPage'));
const AdminTestimonialsPage = lazy(() => import('./pages/admin/AdminTestimonialsPage'));
const AdminSectionsPage = lazy(() => import('./pages/admin/AdminSectionsPage'));
const AdminInstitutionalPage = lazy(() => import('./pages/admin/AdminInstitutionalPage'));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage'));
const AdminFirebaseStatusPage = lazy(() => import('./pages/admin/AdminFirebaseStatusPage'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
          Cusco Infinity Travel
        </span>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = 
    location.pathname.startsWith('/admin') || 
    location.pathname.startsWith('/administracion');

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary/30">
      {!isAdminRoute && <Navbar />}

      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<ToursCatalog />} />
            <Route path="/tours/:id" element={<TourDetail />} />
            <Route path="/destinos" element={<DestinationsPage />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="/contacto" element={<ContactPage />} />

            {/* Admin Authentication (Both /administracion/login and /admin/login) */}
            <Route path="/administracion/login" element={<AdminLoginPage />} />
            <Route path="/admin/login" element={<Navigate to="/administracion/login" replace />} />

            {/* Admin Protected Routes: Primary Path /administracion */}
            <Route
              path="/administracion"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="tours" element={<AdminToursPage />} />
              <Route path="destinos" element={<AdminDestinationsPage />} />
              <Route path="testimonios" element={<AdminTestimonialsPage />} />
              <Route path="secciones" element={<AdminSectionsPage />} />
              <Route path="portada" element={<AdminSectionsPage />} />
              <Route path="institucional" element={<AdminInstitutionalPage />} />
              <Route path="configuracion" element={<AdminSettingsPage />} />
              <Route path="firebase-status" element={<AdminFirebaseStatusPage />} />
            </Route>

            {/* Legacy /admin Alias: Redirects to /administracion */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="tours" element={<AdminToursPage />} />
              <Route path="destinos" element={<AdminDestinationsPage />} />
              <Route path="testimonios" element={<AdminTestimonialsPage />} />
              <Route path="secciones" element={<AdminSectionsPage />} />
              <Route path="portada" element={<AdminSectionsPage />} />
              <Route path="institucional" element={<AdminInstitutionalPage />} />
              <Route path="configuracion" element={<AdminSettingsPage />} />
              <Route path="firebase-status" element={<AdminFirebaseStatusPage />} />
            </Route>

            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppButton />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AgencyDataProvider>
        <AdminAuthProvider>
          <ScrollToTop />
          <AppContent />
        </AdminAuthProvider>
      </AgencyDataProvider>
    </BrowserRouter>
  );
}
