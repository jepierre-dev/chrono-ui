import * as React from 'react';
import { useIsLoading } from '../../context/loading-context.js';

export interface LoadingBoundaryProps {
  loadingId?: string | string[];
  isLoading?: boolean;
  fallback: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Renderiza el fallback (e.g. Skeletons, Spinners) mientras el ID de carga esté activo,
 * y muestra el contenido real en cuanto finalice.
 */
export function LoadingBoundary({
  loadingId,
  isLoading: manualLoading,
  fallback,
  children,
}: LoadingBoundaryProps) {
  const contextLoading = useIsLoading(loadingId);
  const active = manualLoading !== undefined ? manualLoading : contextLoading;

  if (active) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
