// src/types/usuarioTypes.ts

// Enum para roles (debe coincidir con backend)
export const Rol = {
  INTEGRADOR: 'INTEGRADOR',
  GESTOR: 'GESTOR',
  REVISOR: 'REVISOR',
  APROBADOR: 'APROBADOR'
} as const;
export type Rol = typeof Rol[keyof typeof Rol];


// Request DTOs
export interface UsuarioCrearRequest {
  nombres: string;
  apellidos: string;
  numeroCelular: string;
  correo: string;
  password: string;
  roles: Rol[];
  activo: boolean;
  
}

export interface UsuarioActualizarRequest {
  nombres: string;
  apellidos: string;
  numeroCelular: string;
  correo: string;
  roles: Rol[];
}

// Response DTO
export interface UsuarioResponse {
  id: number;
  nombres: string;
  apellidos: string;
  numeroCelular: string;
  correo: string;
  roles: string[]; // Roles como strings
}

// Filtros para búsqueda
export interface UsuarioFiltros {
  nombre?: string;
  rol?: string;
  pagina?: number;
  tamano?: number;
  ordenarPor?: string;
  direccion?: 'ASC' | 'DESC';
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

// Tipo para formularios de usuario
export interface UsuarioFormData {
  nombres: string;
  apellidos: string;
  numeroCelular: string;
  correo: string;
  password?: string;
  confirmPassword?: string;
  roles: Rol[];
}

// Estado para tabla de usuarios
export interface UsuarioTableState {
  usuarios: UsuarioResponse[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    size: number;
    total: number;
  };
}