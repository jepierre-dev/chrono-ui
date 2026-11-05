import * as React from 'react';

export interface LoadingContextValue {
  loadingMap: Record<string, boolean>;
  startLoading: (id: string) => void;
  stopLoading: (id: string) => void;
  toggleLoading: (id: string) => void;
  isLoading: (id?: string | string[]) => boolean;
  withLoading: <T>(id: string, action: () => Promise<T>) => Promise<T>;
  resetLoading: () => void;
}

const LoadingContext = React.createContext<LoadingContextValue | null>(null);

export interface LoadingProviderProps {
  children: React.ReactNode;
  initialState?: Record<string, boolean>;
}

/**
 * Proveedor global de estados de carga para el ecosistema Chronosoft.
 * Permite que cualquier componente escuche un loadingId específico sin prop-drilling.
 */
export function LoadingProvider({
  children,
  initialState = {},
}: LoadingProviderProps) {
  const [loadingMap, setLoadingMap] = React.useState<Record<string, boolean>>(initialState);

  const startLoading = React.useCallback((id: string) => {
    setLoadingMap((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  }, []);

  const stopLoading = React.useCallback((id: string) => {
    setLoadingMap((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const toggleLoading = React.useCallback((id: string) => {
    setLoadingMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const resetLoading = React.useCallback(() => {
    setLoadingMap({});
  }, []);

  const isLoading = React.useCallback(
    (id?: string | string[]): boolean => {
      if (!id) return false;
      if (Array.isArray(id)) {
        return id.some((item) => Boolean(loadingMap[item]));
      }
      return Boolean(loadingMap[id]);
    },
    [loadingMap]
  );

  /**
   * Helper que envuelve una función asíncrona, activando el id de carga
   * al iniciar y desactivándolo automáticamente al terminar o fallar.
   */
  const withLoading = React.useCallback(
    async <T,>(id: string, action: () => Promise<T>): Promise<T> => {
      startLoading(id);
      try {
        return await action();
      } finally {
        stopLoading(id);
      }
    },
    [startLoading, stopLoading]
  );

  const value = React.useMemo(
    () => ({
      loadingMap,
      startLoading,
      stopLoading,
      toggleLoading,
      isLoading,
      withLoading,
      resetLoading,
    }),
    [loadingMap, startLoading, stopLoading, toggleLoading, isLoading, withLoading, resetLoading]
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

/**
 * Hook para consultar si uno o varios IDs de carga están activos.
 * Retorna false de forma segura si la aplicación no implementa LoadingProvider.
 */
export function useIsLoading(id?: string | string[]): boolean {
  const context = React.useContext(LoadingContext);
  if (!context || !id) return false;
  return context.isLoading(id);
}

/**
 * Hook para disparar acciones de carga (startLoading, stopLoading, withLoading).
 */
export function useLoading() {
  const context = React.useContext(LoadingContext);
  if (!context) {
    return {
      loadingMap: {},
      startLoading: () => {},
      stopLoading: () => {},
      toggleLoading: () => {},
      isLoading: () => false,
      withLoading: async <T,>(_: string, action: () => Promise<T>) => action(),
      resetLoading: () => {},
    };
  }
  return context;
}
