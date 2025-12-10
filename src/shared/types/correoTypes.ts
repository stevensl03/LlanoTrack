// Tipos para el endpoint POST /api/v1/correos/search

// Request: Filtros para búsqueda de correos
export interface CorreoFilterRequest {
    asunto?: string;
    estado?: string;
    cuentaId?: number;
    entidadId?: number;
    tipoSolicitudId?: number;
    fechaRecepcionInicio?: string; // ISO string
    fechaRecepcionFin?: string; // ISO string
    fechaRespuestaInicio?: string; // ISO string
    fechaRespuestaFin?: string; // ISO string
    radicadoEntrada?: string;
    radicadoSalida?: string;
    idProceso?: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
}

// Response: Página de correos
export interface CorreoResponse {
    id: string; // correo_id en la base de datos
    asunto: string;
    estado: string;
    fechaRecepcion: string;
    fechaRespuesta?: string;
    plazoRespuestaEnDias: number;
    radicadoEntrada: string;
    radicadoSalida?: string;
    cuerpoTexto: string;
    idProceso: string;
    cuentaId: number;
    tipoSolicitudId: number;
    nombreCuenta?: string;
    correoCuenta?: string;
    nombreEntidad?: string;
    nombreTipoSolicitud?: string;
}

// Response paginado
export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number; // página actual
    first: boolean;
    last: boolean;
    empty: boolean;
}

// Estados de correos (usando objeto as const en lugar de enum)
export const CorreoEstado = {
    PENDIENTE: 'PENDIENTE',
    VENCIDO: 'VENCIDO', 
    RESPONDIDO: 'RESPONDIDO'
} as const;

export type CorreoEstado = typeof CorreoEstado[keyof typeof CorreoEstado];

// Dirección de ordenamiento
export const SortDirection = {
    ASC: 'asc',
    DESC: 'desc'
} as const;

export type SortDirection = typeof SortDirection[keyof typeof SortDirection];