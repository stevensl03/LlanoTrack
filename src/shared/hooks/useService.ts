import { useMemo } from 'react';
import { useMockService } from './useMockService';
import { useApiService } from './useApiService';

// Determinar qué hook usar basado en entorno
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const useService = () => {
  // Puedes cambiar esto dinámicamente basado en alguna condición
  const useServiceHook = USE_MOCK ? useMockService : useApiService;
  
  return useServiceHook();
};

// Hook con cambio dinámico
export const useDynamicService = (useMock: boolean = USE_MOCK) => {
  const mockService = useMockService();
  const apiService = useApiService();
  
  return useMemo(() => {
    return useMock ? mockService : apiService;
  }, [useMock, mockService, apiService]);
};