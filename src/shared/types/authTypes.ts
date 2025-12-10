// shared/types/authTypes.ts

// Tipo para Rol basado en el backend
export const Rol = {
  INTEGRADOR: 'INTEGRADOR',
  GESTOR: 'GESTOR',
  REVISOR: 'REVISOR',
  APROBADOR: 'APROBADOR',
  ADMINISTRADOR: 'ADMIN',
  AUDITOR: 'AUDITOR'
} as const;

export type Rol = typeof Rol[keyof typeof Rol];

// Tipos para las peticiones
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  roles: Rol[];
}

// Tipos para el contexto de autenticación
export interface AuthUser {
  email: string;
  roles: Rol[];
}

// Tipo para token JWT
export interface JwtToken {
  accessToken: string;
  // refreshToken se maneja en cookies
}