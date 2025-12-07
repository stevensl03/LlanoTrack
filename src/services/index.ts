// Exportar servicios disponibles
export { mockService } from './mockService';
export { apiService } from './apiService.ts';

// Determinar qué servicio usar basado en entorno
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const service = USE_MOCK ? 
  (await import('./mockService')).mockService : 
  (await import('./apiService.ts')).apiService;