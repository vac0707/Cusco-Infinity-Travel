import React, { useState } from 'react';
import { useAgencyData } from '@/context/AgencyDataContext';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Settings, 
  DollarSign, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  AlertTriangle, 
  Database, 
  Sparkles,
  ShieldCheck,
  Save,
  FileJson,
  X,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminSettingsPage() {
  const { 
    settings, 
    updateSettings, 
    packages, 
    destinations, 
    testimonials, 
    categories,
    resetToDefaultData 
  } = useAgencyData();
  const { isDemoMode } = useAdminAuth();

  const [agencyName, setAgencyName] = useState(settings.agencyName || 'Cusco Infinity Travel');
  const [slogan, setSlogan] = useState(settings.slogan || 'Experiencias de viaje exclusivas en los Andes peruanos');
  const [currency, setCurrency] = useState(settings.currency || 'USD');
  const [exchangeRate, setExchangeRate] = useState<number>(settings.exchangeRatePEN || 3.75);

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  // Import Preview Modal State
  const [importPreviewModal, setImportPreviewModal] = useState(false);
  const [pendingImportData, setPendingImportData] = useState<any | null>(null);
  const [importError, setImportError] = useState<string | null>(null);

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings({
      agencyName,
      slogan,
      currency,
      exchangeRatePEN: exchangeRate
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    const backupData = {
      meta: {
        exportedAt: new Date().toISOString(),
        agency: 'Cusco Infinity Travel',
        version: '1.1'
      },
      packages,
      destinations,
      categories,
      testimonials,
      settings: {
        ...settings,
        agencyName,
        slogan,
        currency,
        exchangeRatePEN: exchangeRate
      }
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cusco-infinity-travel-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON Backup - Step 1: Read and Validate file, open preview modal
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        
        // Strict structure validation
        if (!parsed || typeof parsed !== 'object') {
          throw new Error('El archivo JSON no tiene un formato válido.');
        }

        if (!parsed.packages || !Array.isArray(parsed.packages)) {
          throw new Error('El archivo JSON no contiene la colección de paquetes turísticos (packages).');
        }

        if (!parsed.destinations || !Array.isArray(parsed.destinations)) {
          throw new Error('El archivo JSON no contiene la colección de destinos (destinations).');
        }

        if (!parsed.categories || !Array.isArray(parsed.categories)) {
          throw new Error('El archivo JSON no contiene la colección de categorías (categories).');
        }

        if (!parsed.testimonials || !Array.isArray(parsed.testimonials)) {
          throw new Error('El archivo JSON no contiene la colección de testimonios (testimonials).');
        }

        // Set pending data and open preview modal
        setPendingImportData(parsed);
        setImportPreviewModal(true);
      } catch (err) {
        setImportError(err instanceof Error ? err.message : String(err));
        alert('Error al validar el archivo JSON de respaldo:\n' + (err instanceof Error ? err.message : String(err)));
      } finally {
        // Reset file input value so same file can be reselected if needed
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  // Step 2: Confirm import (create safety auto-backup first, then overwrite and reload)
  const handleConfirmImport = () => {
    if (!pendingImportData) return;

    try {
      // 1. Create automatic safety backup of current state prior to restore
      const safetyBackup = {
        meta: {
          exportedAt: new Date().toISOString(),
          agency: 'Cusco Infinity Travel (Safety Auto-Backup)',
          version: '1.1'
        },
        packages,
        destinations,
        categories,
        testimonials,
        settings
      };
      localStorage.setItem(`cit_safety_backup_${Date.now()}`, JSON.stringify(safetyBackup));

      // 2. Write imported data to localStorage keys
      localStorage.setItem('cit_packages_v1', JSON.stringify(pendingImportData.packages));
      localStorage.setItem('cit_destinations_v1', JSON.stringify(pendingImportData.destinations));
      localStorage.setItem('cit_categories_v1', JSON.stringify(pendingImportData.categories));
      localStorage.setItem('cit_testimonials_v1', JSON.stringify(pendingImportData.testimonials));
      if (pendingImportData.settings) {
        localStorage.setItem('cit_settings_v1', JSON.stringify(pendingImportData.settings));
      }

      setImportPreviewModal(false);
      setPendingImportData(null);
      setImportSuccess('¡Copia de respaldo restaurada exitosamente! Se ha creado un respaldo de seguridad previo. Actualizando...');
      
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      alert('Error al aplicar la restauración: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleConfirmReset = () => {
    resetToDefaultData();
    setResetModalOpen(false);
    setSaveSuccess(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-primary">
              Sistema y Datos
            </span>
            <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
              MODO DEMO
            </span>
          </div>
          <h1 className="text-2xl font-light font-heading text-dark">
            Configuración General y Gestión de Datos
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Ajustes de moneda, tarifas referenciales, copias de seguridad y opciones del entorno.
          </p>
        </div>

        {saveSuccess && (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-sm text-xs flex items-center gap-1.5 font-semibold animate-fadeIn">
            <Check size={14} />
            <span>¡Configuraciones guardadas!</span>
          </div>
        )}
      </div>

      {importSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-3 rounded text-xs flex items-center gap-2">
          <Check size={16} className="text-emerald-600" />
          <span>{importSuccess}</span>
        </div>
      )}

      {importError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-900 p-3 rounded text-xs flex items-center gap-2">
          <AlertTriangle size={16} className="text-rose-600" />
          <span>{importError}</span>
        </div>
      )}

      {/* Form 1: General Settings */}
      <form onSubmit={handleSaveGeneral} className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-dark font-heading font-medium text-base border-b pb-2">
          <Settings size={18} className="text-primary" />
          <span>1. Parámetros de la Agencia y Moneda</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
              Nombre Comercial de la Agencia
            </label>
            <Input
              type="text"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              className="text-xs h-9"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
              Eslogan Institucional
            </label>
            <Input
              type="text"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              className="text-xs h-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
              Moneda Principal de Cotización
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full h-9 px-2 text-xs border border-stone-200 rounded-sm bg-white"
            >
              <option value="USD">USD - Dólares Americanos ($)</option>
              <option value="PEN">PEN - Soles Peruanos (S/)</option>
              <option value="EUR">EUR - Euros (€)</option>
            </select>
            <span className="text-[10px] text-stone-400 mt-1 block">
              Por estándar turístico en Cusco, todos los paquetes se tarifan en USD.
            </span>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
              Tipo de Cambio Referencial (PEN por USD)
            </label>
            <Input
              type="number"
              step="0.01"
              value={exchangeRate}
              onChange={(e) => setExchangeRate(Number(e.target.value))}
              className="text-xs h-9"
            />
            <span className="text-[10px] text-stone-400 mt-1 block">
              Tipo de cambio utilizado para pagos en moneda local.
            </span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider">
            Guardar Parámetros
          </Button>
        </div>
      </form>

      {/* Box 2: Demo Mode State */}
      <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-dark font-heading font-medium text-base border-b pb-2">
          <Sparkles size={18} className="text-amber-600" />
          <span>2. Estado del Modo Demostración</span>
        </div>

        <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-sm text-xs text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span>El panel administrativo está operando en Modo Demostración Local</span>
          </div>
          <p className="leading-relaxed font-light">
            En este modo, puedes evaluar todas las pantallas, formularios, validaciones y diseño. Todos los cambios realizados se mantienen en el almacenamiento local del navegador (<code className="font-mono bg-amber-200/50 px-1 py-0.5 rounded">localStorage</code>) para que puedas navegar y probar libremente sin impactar los datos de la web pública.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <Link to="/administracion/firebase-status">
              <Button variant="outline" size="sm" className="border-amber-300 text-amber-950 bg-white hover:bg-amber-100 text-xs">
                <Database size={13} className="mr-1.5" />
                Ver Diagnóstico Técnico de Firebase
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Box 3: Backup & Data Reset */}
      <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-dark font-heading font-medium text-base border-b pb-2">
          <FileJson size={18} className="text-primary" />
          <span>3. Copias de Seguridad (Backup) y Restauración</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Export Backup */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center mb-2">
                <Download size={16} />
              </div>
              <h4 className="font-bold text-xs text-dark">Descargar Respaldo JSON</h4>
              <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                Guarda una copia completa de los {packages.length} tours, {categories.length} categorías, destinos, testimonios y configuraciones.
              </p>
            </div>
            <Button
              type="button"
              onClick={handleExportBackup}
              className="mt-4 w-full bg-stone-800 hover:bg-stone-900 text-white text-xs h-9 uppercase font-bold"
            >
              Exportar JSON
            </Button>
          </div>

          {/* Import Backup */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                <Upload size={16} />
              </div>
              <h4 className="font-bold text-xs text-dark">Importar Respaldo JSON</h4>
              <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                Carga un archivo de respaldo con validación de estructura y vista previa antes de restaurar.
              </p>
            </div>
            <label className="mt-4 w-full bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs h-9 uppercase font-bold flex items-center justify-center rounded-sm cursor-pointer transition-colors">
              <span>Seleccionar Archivo</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
            </label>
          </div>

          {/* Reset Defaults */}
          <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-sm flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded bg-rose-100 text-rose-700 flex items-center justify-center mb-2">
                <RotateCcw size={16} />
              </div>
              <h4 className="font-bold text-xs text-rose-950">Restablecer Originales</h4>
              <p className="text-[11px] text-rose-800/80 mt-1 leading-relaxed">
                Elimina los cambios de prueba locales y vuelve a los 18 paquetes turísticos oficiales.
              </p>
            </div>
            <Button
              type="button"
              onClick={() => setResetModalOpen(true)}
              className="mt-4 w-full bg-rose-700 hover:bg-rose-800 text-white text-xs h-9 uppercase font-bold"
            >
              Restablecer de Fábrica
            </Button>
          </div>

        </div>
      </div>

      {/* Import Preview & Confirmation Modal */}
      {importPreviewModal && pendingImportData && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-stone-200 p-6 max-w-lg w-full shadow-2xl animate-fadeIn space-y-4">
            <div className="flex items-start justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-sm">
                  <FileJson size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-medium text-lg text-dark">
                    Resumen de Respaldo a Importar
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Verifica los datos contenidos en el archivo antes de reemplazar la información actual.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setImportPreviewModal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X size={18} />
              </button>
            </div>

            {pendingImportData.meta && (
              <div className="bg-stone-50 p-3 rounded border border-stone-200 text-xs space-y-1">
                <div className="font-semibold text-stone-700">Metadatos del Respaldo:</div>
                <div className="text-stone-600">Agencia: <span className="font-medium">{pendingImportData.meta.agency || 'N/A'}</span></div>
                <div className="text-stone-600">Fecha de Exportación: <span className="font-medium">{pendingImportData.meta.exportedAt ? new Date(pendingImportData.meta.exportedAt).toLocaleString() : 'N/A'}</span></div>
                <div className="text-stone-600">Versión: <span className="font-medium">{pendingImportData.meta.version || '1.0'}</span></div>
              </div>
            )}

            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-700 uppercase tracking-wider">Contenido Detectado:</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-stone-50 p-2.5 rounded border border-stone-200 flex justify-between items-center">
                  <span className="text-stone-600">Paquetes Turísticos:</span>
                  <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{pendingImportData.packages?.length || 0}</span>
                </div>
                <div className="bg-stone-50 p-2.5 rounded border border-stone-200 flex justify-between items-center">
                  <span className="text-stone-600">Categorías:</span>
                  <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{pendingImportData.categories?.length || 0}</span>
                </div>
                <div className="bg-stone-50 p-2.5 rounded border border-stone-200 flex justify-between items-center">
                  <span className="text-stone-600">Destinos:</span>
                  <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{pendingImportData.destinations?.length || 0}</span>
                </div>
                <div className="bg-stone-50 p-2.5 rounded border border-stone-200 flex justify-between items-center">
                  <span className="text-stone-600">Testimonios:</span>
                  <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{pendingImportData.testimonials?.length || 0}</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-3 rounded text-[11px] text-amber-900 flex items-start gap-2">
              <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Aviso importante:</span> Al confirmar la importación, se sobrescribirán los datos actuales en el navegador. Se creará automáticamente un respaldo de seguridad previo antes de aplicar los cambios.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setImportPreviewModal(false)}
                className="px-3 py-2 text-xs text-stone-600 hover:text-dark font-medium rounded-sm border border-stone-200"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmImport}
                className="px-4 py-2 text-xs bg-primary hover:bg-primary/90 text-white font-bold rounded-sm uppercase tracking-wider flex items-center gap-1.5"
              >
                <Check size={14} />
                <span>Confirmar y Restaurar Datos</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-stone-200 p-6 max-w-md w-full shadow-2xl animate-fadeIn">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-rose-100 text-rose-800 rounded-sm shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="font-heading font-medium text-lg text-dark">
                  ¿Restablecer datos originales?
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Esto borrará cualquier cambio de prueba guardado temporalmente en este navegador y restaurará los 18 paquetes turísticos oficiales y configuraciones originales de Cusco Infinity Travel.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setResetModalOpen(false)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:text-dark font-medium rounded-sm border border-stone-200"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-1.5 text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-sm uppercase tracking-wider"
              >
                Sí, restablecer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
