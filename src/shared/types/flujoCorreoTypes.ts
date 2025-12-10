// Tipos para el estado del flujo
export const FlujoCorreoEstado = {
  PENDIENTE: 'PENDIENTE',
  EN_PROGRESO: 'EN_PROGRESO',
  COMPLETADO: 'COMPLETADO',
  BLOQUEADO: 'BLOQUEADO'
} as const;

export type FlujoCorreoEstado = typeof FlujoCorreoEstado[keyof typeof FlujoCorreoEstado];

// Tipos para las etapas del flujo
export const FlujoCorreoEtapa = {
  RECEPCION: 'RECEPCION',
  REVISION: 'REVISION',
  APROBACION: 'APROBACION',
  IMPLEMENTACION: 'IMPLEMENTACION',
  FINALIZACION: 'FINALIZACION'
} as const;

export type FlujoCorreoEtapa = typeof FlujoCorreoEtapa[keyof typeof FlujoCorreoEtapa];

// Interfaces principales
export interface FlujoCorreoResponse {
  id: number;
  correoId: string;
  asunto: string;
  remitente: string;
  estado: FlujoCorreoEstado;
  etapaActual: FlujoCorreoEtapa;
  usuarioAsignadoId?: number;
  usuarioAsignadoNombre?: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  fechaLimite?: string;
  prioridad: number;
  metadata?: Record<string, any>;
}

export interface FlujoCorreoFilterRequest {
  correoId?: string;
  estado?: FlujoCorreoEstado;
  etapa?: FlujoCorreoEtapa;
  usuarioAsignadoId?: number;
  fechaInicio?: string;
  fechaFin?: string;
  prioridadMin?: number;
  prioridadMax?: number;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface FlujoCorreoEstadisticasResponse {
  totalFlujos: number;
  flujosPendientes: number;
  flujosEnProgreso: number;
  flujosCompletados: number;
  flujosSinAsignar: number;
  tiempoPromedioCompletacion?: number;
  flujosPorEtapa: Record<FlujoCorreoEtapa, number>;
  flujosPorEstado: Record<FlujoCorreoEstado, number>;
  topUsuariosConMasFlujos: Array<{
    usuarioId: number;
    usuarioNombre: string;
    cantidadFlujos: number;
  }>;
}

// Interfaces para parámetros específicos
export interface AsignarUsuarioRequest {
  id: number;
  usuarioId: number;
}

export interface ReasignarFlujoRequest {
  id: number;
  nuevoUsuarioId: number;
}

export interface PeriodoRequest {
  inicio: string;
  fin: string;
}