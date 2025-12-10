// /shared/types/flujoCorreoTypes.ts

// Constantes para etapas (usando el patrón as const en lugar de enum)
export const ETAPA = {
  RECEPCION: 'RECEPCION',
  ELABORACION: 'ELABORACION',
  REVISION: 'REVISION',
  APROBACION: 'APROBACION',
  ENVIO: 'ENVIO'
} as const;

export type ETAPA = typeof ETAPA[keyof typeof ETAPA];

// Constantes para estados de etapa
export const ESTADO_ETAPA = {
  COMPLETADO: 'COMPLETADO',
  EN_PROGRESO: 'EN_PROGRESO',
  PENDIENTE: 'PENDIENTE'
} as const;

export type ESTADO_ETAPA = typeof ESTADO_ETAPA[keyof typeof ESTADO_ETAPA];

// Tipo para respuesta de flujo de correo individual
export interface FlujoCorreoResponse {
  id: number;
  correoId: string;
  asuntoCorreo: string;
  usuarioId: number;
  nombreUsuario: string;
  etapa: ETAPA;
  fechaAsignacion: string; // ISO string
  fechaFinalizacion: string | null; // ISO string
  duracionHoras: number | null;
  enProgreso: boolean;
  estadoEtapa: ESTADO_ETAPA;
}

// Tipo para filtro de búsqueda
export interface FlujoCorreoFilterRequest {
  correoId?: string;
  usuarioId?: number;
  etapa?: ETAPA;
  entidadId?: number;
  enProgreso?: boolean;
  completado?: boolean;
  pendienteAsignacion?: boolean;
  fechaAsignacionDesde?: string;
  fechaAsignacionHasta?: string;
  fechaFinalizacionDesde?: string;
  fechaFinalizacionHasta?: string;
  esRecepcion?: boolean;
  esElaboracion?: boolean;
  esRevision?: boolean;
  esAprobacion?: boolean;
  esEnvio?: boolean;
  pagina: number;
  tamanoPagina: number;
  ordenarPor: string;
  direccionOrden: 'ASC' | 'DESC';
}

// Tipo para respuesta paginada
export interface FlujoCorreoPageResponse {
  content: FlujoCorreoResponse[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

// Tipo para estadísticas
export interface FlujoCorreoEstadisticasResponse {
  totalFlujos: number;
  flujosEnProgreso: number;
  flujosCompletados: number;
  flujosPorEtapa: Record<ETAPA, number>;
  flujosPorUsuario: Record<string, number>;
  flujosPorEntidad: Record<string, number>;
}

// Tipo para operaciones de asignación
export interface AsignarUsuarioRequest {
  flujoId: number;
  usuarioId: number;
}

export interface ReasignarFlujoRequest {
  flujoId: number;
  nuevoUsuarioId: number;
}

// Tipo para periodo de estadísticas
export interface PeriodoEstadisticasRequest {
  inicio: string; // ISO string
  fin: string; // ISO string
}