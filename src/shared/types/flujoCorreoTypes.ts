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
export interface FlujoCorreoFilterRequests {
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

// types/flujoCorreoTypes.ts

// Tipos basados en la estructura de la tabla flujo_correos
export type EtapaFlujo = 'RECEPCION' | 'ELABORACION' | 'REVISION' | 'APROBACION' | 'ENVIO';

// Interfaz para Flujo de Correo
export interface FlujoCorreo {
  id: number;
  fecha_asignacion: string;
  fecha_finalizacion: string | null;
  usuario_id: number | null;
  correo_id: string | null;
  etapa: EtapaFlujo | null;
  
  // Relaciones expandidas (opcional)
  usuario?: Usuario;
  correo?: Correo;
}

// Interfaz para Usuario (basado en tabla usuarios)
export interface Usuario {
  id: number;
  nombres: string;
  apellidos: string;
  correo: string;
  numero_celular: string | null;
  activo: boolean;
  fecha_creacion: string;
  password?: string; // Solo para creación/actualización
}

// Interfaz para Correo (basado en tabla correos)
export interface Correo {
  correo_id: string;
  asunto: string;
  cuerpo_texto: string | null;
  fecha_recepcion: string;
  fecha_respuesta: string | null;
  plazo_respuesta_en_dias: number | null;
  radicado_entrada: string | null;
  radicado_salida: string | null;
  estado: 'PENDIENTE' | 'VENCIDO' | 'RESPONDIDO';
  urgencia: 'BAJA' | 'MEDIA' | 'ALTA' | null;
  gestion_id: string | null;
  id_proceso: string | null;
  cuenta_id: number | null;
  tipo_solicitud_id: number | null;
  
  // Relaciones expandidas
  cuenta?: Cuenta;
  tipo_solicitud?: TipoSolicitud;
}

// Tipos auxiliares (si existen)
export interface Cuenta {
  id: number;
  // ... otros campos
}

export interface TipoSolicitud {
  id: number;
  // ... otros campos
}

// Tipos para respuestas del servicio
export interface FlujoCorreoResponse extends FlujoCorreo {
  usuario?: Usuario;
  correo?: Correo;
}

export interface FlujoCorreoPageResponse {
  content: FlujoCorreoResponse[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
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
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface FlujoCorreoFilterRequest {
  pagina?: number;
  tamano?: number;
  ordenarPor?: string;
  direccion?: 'ASC' | 'DESC';
  usuarioId?: number;
  correoId?: string;
  etapa?: EtapaFlujo;
  activo?: boolean; // Filtro por flujos activos (sin fecha_finalizacion)
  fechaInicio?: string;
  fechaFin?: string;
}

export interface FlujoCorreoEstadisticasResponse {
  totalFlujos: number;
  flujosActivos: number;
  flujosCompletados: number;
  distribucionPorEtapa: Record<EtapaFlujo, number>;
  tiempoPromedioPorEtapa: Record<EtapaFlujo, number>;
  usuariosActivos: number;
  correosSinFlujo: number;
}

export interface PeriodoEstadisticasRequest {
  fechaInicio: string;
  fechaFin: string;
  grupoPor?: 'dia' | 'semana' | 'mes';
}

// Tipos para operaciones
export interface AsignarUsuarioRequest {
  flujoId: number;
  usuarioId: number;
}

export interface ReasignarFlujoRequest {
  flujoId: number;
  nuevoUsuarioId: number;
}