import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackTitle?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6 bg-background">
          <div className="max-w-md w-full bg-white border border-border p-8 rounded-sm shadow-lg text-center">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <AlertTriangle size={28} />
            </div>

            <h2 className="text-xl font-heading font-light text-dark mb-2">
              {this.props.fallbackTitle || 'Hubo un inconveniente al cargar esta sección'}
            </h2>

            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
              No te preocupes, los datos están seguros. Puedes intentar recargar la sección o regresar al inicio.
            </p>

            {this.state.error && (
              <div className="bg-stone-50 border border-stone-200 p-2.5 rounded text-[11px] font-mono text-stone-600 text-left mb-6 overflow-x-auto max-h-24">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button
                onClick={this.handleReload}
                className="bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-sm flex items-center justify-center gap-2"
              >
                <RefreshCw size={13} />
                <span>Reintentar</span>
              </Button>

              <a
                href="/"
                className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-sm flex items-center justify-center gap-2 transition-colors border border-stone-200"
              >
                <Home size={13} />
                <span>Ir al Inicio</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
