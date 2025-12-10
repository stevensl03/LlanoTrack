// /shared/types/tipoSolicitudTypes.ts
// Tipos simplificados para CRUD básico

export interface TipoSolicitud {
  id: number;
  nombre: string;
}

export interface TipoSolicitudRequest {
  nombre: string;
}