import React, { useState } from 'react';
import { useAgencyData } from '@/context/AgencyDataContext';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { testFirestoreConnection } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  CloudUpload, 
  RotateCcw, 
  Key, 
  ShieldCheck, 
  Terminal,
  FileCode
} from 'lucide-react';

export default function AdminFirebaseStatusPage() {
  const { 
    packages, 
    destinations, 
    testimonials, 
    isFirebaseConnected, 
    migrateLocalToFirestore, 
    resetToDefaultData 
  } = useAgencyData();
  const { isFirebaseConfigured } = useAdminAuth();

  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationResult, setMigrationResult] = useState<{ success: boolean; count: number; error?: string } | null>(null);

  const [resetConfirm, setResetConfirm] = useState(false);

  // Check which env vars are defined
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
  const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setTestResult(null);
    const result = await testFirestoreConnection();
    setTestResult(result);
    setTestingConnection(false);
  };

  const handleMigrate = async () => {
    setIsMigrating(true);
    setMigrationResult(null);
    const res = await migrateLocalToFirestore();
    setMigrationResult(res);
    setIsMigrating(false);
  };

  const handleResetDefaults = () => {
    resetToDefaultData();
    setResetConfirm(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-sm">
        <h1 className="text-2xl font-light font-heading text-dark flex items-center gap-2">
          <Database size={22} className="text-primary" />
          <span>Estado de Base de Datos y Servicios Cloud</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Diagnóstico en tiempo real de Firebase Authentication, Cloud Firestore y persistencia de datos.
        </p>
      </div>

      {/* Main Status Panel */}
      <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400">
              Estado de Integración
            </span>
            <div className="flex items-center gap-2 mt-1">
              {isFirebaseConfigured ? (
                <>
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-heading font-medium text-dark text-lg">
                    Variables de Firebase Detectadas
                  </span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="font-heading font-medium text-dark text-lg">
                    Modo Local Activo (Credenciales Cloud Pendientes)
                  </span>
                </>
              )}
            </div>
          </div>

          <Button
            onClick={handleTestConnection}
            disabled={testingConnection}
            variant="outline"
            className="text-xs font-semibold gap-1.5 h-9"
          >
            <RefreshCw size={13} className={testingConnection ? 'animate-spin' : ''} />
            <span>Probar Conexión Firestore</span>
          </Button>
        </div>

        {testResult && (
          <div className={`p-4 rounded-sm border text-xs flex items-start gap-2.5 ${
            testResult.success
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            {testResult.success ? <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" /> : <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />}
            <div>
              <div className="font-bold">{testResult.success ? 'Conexión Exitosa' : 'Aviso de Conexión'}</div>
              <div className="mt-0.5 leading-relaxed">{testResult.message}</div>
            </div>
          </div>
        )}

        {/* Environment Variables Inspection */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-dark mb-3 flex items-center gap-1.5">
            <Key size={14} className="text-primary" />
            Variables de Entorno Detectadas (VITE_FIREBASE_*)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-sm flex justify-between items-center">
              <span className="font-mono text-stone-600 text-[11px]">VITE_FIREBASE_API_KEY</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${apiKey ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-500'}`}>
                {apiKey ? `${apiKey.slice(0, 6)}...` : 'No configurado'}
              </span>
            </div>

            <div className="p-3 bg-stone-50 border border-stone-200 rounded-sm flex justify-between items-center">
              <span className="font-mono text-stone-600 text-[11px]">VITE_FIREBASE_PROJECT_ID</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${projectId ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-500'}`}>
                {projectId || 'No configurado'}
              </span>
            </div>

            <div className="p-3 bg-stone-50 border border-stone-200 rounded-sm flex justify-between items-center">
              <span className="font-mono text-stone-600 text-[11px]">VITE_FIREBASE_AUTH_DOMAIN</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${authDomain ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-500'}`}>
                {authDomain || 'No configurado'}
              </span>
            </div>

            <div className="p-3 bg-stone-50 border border-stone-200 rounded-sm flex justify-between items-center">
              <span className="font-mono text-stone-600 text-[11px]">VITE_FIREBASE_STORAGE_BUCKET</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${storageBucket ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-500'}`}>
                {storageBucket || 'No configurado'}
              </span>
            </div>
          </div>
        </div>

        {/* Database Migration / Seeding Tool */}
        <div className="bg-stone-50 border border-stone-200 p-5 rounded-sm space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-dark flex items-center gap-1.5">
                <CloudUpload size={16} className="text-primary" />
                Sincronización y Migración a Cloud Firestore
              </h2>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Este proceso transfiere los {packages.length} paquetes turísticos (respetando sus IDs exactos como <code>machupicchu-fullday</code>, <code>city-tour</code>, etc.), los {destinations.length} destinos y los testimonios directamente a las colecciones de Cloud Firestore sin crear duplicados.
              </p>
            </div>

            <Button
              onClick={handleMigrate}
              disabled={isMigrating || !isFirebaseConfigured}
              className="bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-wider shrink-0"
            >
              {isMigrating ? 'Sincronizando...' : 'Migrar a Firestore'}
            </Button>
          </div>

          {migrationResult && (
            <div className={`p-3 rounded-sm border text-xs mt-2 ${
              migrationResult.success ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              {migrationResult.success ? (
                <span>¡Éxito! Se migraron {migrationResult.count} documentos a Cloud Firestore.</span>
              ) : (
                <span>Error en la migración: {migrationResult.error}</span>
              )}
            </div>
          )}
        </div>

        {/* Security & Rules files */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-dark mb-3 flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-primary" />
            Reglas de Seguridad y Esquemas Implementados
          </h2>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode size={15} className="text-primary" />
                <span className="font-mono text-dark font-semibold">firestore.rules</span>
              </div>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm font-bold border border-emerald-200">
                Lectura pública para viajeros / Escritura solo para administradores
              </span>
            </div>

            <div className="p-3 bg-stone-50 border border-stone-200 rounded-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode size={15} className="text-primary" />
                <span className="font-mono text-dark font-semibold">firebase-blueprint.json</span>
              </div>
              <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-sm font-bold border border-blue-200">
                Esquemas validados de Packages, Destinations, Testimonials, Settings
              </span>
            </div>
          </div>
        </div>

        {/* Factory Reset button */}
        <div className="pt-4 border-t flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-dark block">Restablecer Catálogo de Fábrica</span>
            <span className="text-[11px] text-muted-foreground">
              Restaura los 18 paquetes turísticos y 6 destinos iniciales a su estado predeterminado.
            </span>
          </div>

          {resetConfirm ? (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => setResetConfirm(false)} className="text-xs">
                Cancelar
              </Button>
              <Button size="sm" onClick={handleResetDefaults} className="bg-rose-600 text-white text-xs font-bold">
                Confirmar
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setResetConfirm(true)}
              className="text-xs text-stone-600 hover:text-rose-600"
            >
              <RotateCcw size={13} className="mr-1" />
              Restablecer
            </Button>
          )}
        </div>

      </div>
    </div>
  );
}
