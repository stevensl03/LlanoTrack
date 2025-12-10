// src/shared/types/cuentaEntidadTypes.ts

// ==================== TIPOS PARA CUENTAS ====================

// Request DTOs
export interface CuentaCrearRequest {
    nombreCuenta: string;
    correoCuenta: string;
    entidadId: number;
}

export interface CuentaActualizarRequest {
    nombreCuenta: string;
    correoCuenta: string;
    entidadId: number;
}

// Response DTO
export interface CuentaResponse {
    id: number;
    nombreCuenta: string;
    correoCuenta: string;
    entidadId: number;
    nombreEntidad?: string; // Opcional, podría venir del backend
    totalCuentas?: number;
}

// ==================== TIPOS PARA ENTIDADES ====================

// Request DTOs
export interface EntidadCrearRequest {
  nombreEntidad: string;
  dominioCorreo: string;
}

export interface EntidadActualizarRequest {
  nombreEntidad: string;
  dominioCorreo: string;
}

// Response DTO
export interface EntidadResponse {
  id: number;
  nombreEntidad: string;
  dominioCorreo: string;
  // Opcional: contar cuentas asociadas
  totalCuentas?: number;
}

// ==================== TIPOS COMUNES ====================

// Tipos literales para etapas (en lugar de enum)
export type Etapa = 'RECEPCION' | 'ELABORACION' | 'REVISION' | 'APROBACION' | 'ENVIO'

// Tipos literales para estados (en lugar de enum)
export type Estado = 'PENDIENTE' | 'VENCIDO' | 'RESPONDIDO'

// Filtros para búsqueda
export interface CuentaFiltros {
  query?: string;
  entidadId?: number;
  pagina?: number;
  tamano?: number;
}

export interface EntidadFiltros {
  nombre?: string;
  pagina?: number;
  tamano?: number;
}

// Paginación
export interface PaginatedResponse<T> {
  content: T[];
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

// Error response
export interface ErrorResponse {
  message: string;
  path: string;
  timestamp: string;
}

// Tipo para formularios
export interface CuentaFormData {
  nombreCuenta: string;
  correoCuenta: string;
  entidadId: number;
  nombreEntidad?: string;
}

export interface EntidadFormData {
  nombreEntidad: string;
  dominioCorreo: string;
}

// Validación de constantes
export const ETAPAS: Etapa[] = ['RECEPCION', 'ELABORACION', 'REVISION', 'APROBACION', 'ENVIO']
export const ESTADOS: Estado[] = ['PENDIENTE', 'VENCIDO', 'RESPONDIDO']

// Verificación de tipos
export const esEtapaValida = (valor: string): valor is Etapa => {
  return ETAPAS.includes(valor as Etapa)
}

export const esEstadoValido = (valor: string): valor is Estado => {
  return ESTADOS.includes(valor as Estado)
}