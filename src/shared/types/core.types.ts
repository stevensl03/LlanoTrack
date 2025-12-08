// ==================== ROLES Y USUARIOS ====================
export type UserRole = 'INTEGRADOR' | 'GESTOR' | 'REVISOR' | 'APROBADOR' | 'AUDITOR' | 'ADMIN';

export interface User {
  id: string;
  nombre: string;
  email: string;
  rol: UserRole;
  area: string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
  telefono?: string;
  extension?: string;
  departamento?: string;
  fechaIngreso?: string;
  ultimoAcceso?: string;
}

export interface UserFormData {
  nombre: string;
  email: string;
  rol: UserRole;
  area: string;
  telefono?: string;
  extension?: string;
  departamento?: string;
  fechaIngreso?: string;
  activo?: boolean;
}


// Agrega estos tipos si no los tienes en core.types.ts

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// También asegúrate de que ApiResponse esté definido:
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
  page?: number;
  totalPages?: number;
  totalItems?: number;
}


// ==================== ENTIDADES ====================
export interface Entity {
  id: string;
  nombre: string;
  dominios: string[];
  responsableId: string;
  responsableNombre?: string;
  activa: boolean;
  createdAt: string;
  updatedAt: string;
  codigo?: string;
  direccion?: string;
  telefono?: string;
  contacto?: string;
  observaciones?: string;
}

export interface EntityFormData {
  nombre: string;
  dominios: string[];
  responsableId: string;
  codigo?: string;
  direccion?: string;
  telefono?: string;
  contacto?: string;
  observaciones?: string;
  activa?: boolean;
}

// ==================== TIPOS DE SOLICITUD ====================
export type UrgencyLevel = 'BAJA' | 'MEDIA' | 'ALTA';

export interface RequestType {
  id: string;
  tipo: string;
  plazoDias: number;
  urgencia: UrgencyLevel;
  descripcion?: string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
  requiereAprobacion?: boolean;
  requiereRevision?: boolean;
  diasRecordatorio?: number;
  plantillaRespuesta?: string;
}

export interface RequestTypeFormData {
  tipo: string;
  plazoDias: number;
  urgencia: UrgencyLevel;
  descripcion?: string;
  requiereAprobacion?: boolean;
  requiereRevision?: boolean;
  diasRecordatorio?: number;
  plantillaRespuesta?: string;
  activo?: boolean;
}

// ==================== CORREOS Y FLUJOS ====================
export type CorreoEstado = 
  | 'RECEPCION' 
  | 'ELABORACION' 
  | 'REVISION' 
  | 'APROBACION' 
  | 'ENVIADO' 
  | 'VENCIDO' 
  | 'ARCHIVADO';

export interface Correo {
  id: string;
  radicadoEntrada: string;
  radicadoSalida?: string;
  entidadId: string;
  entidadNombre?: string;
  tipoSolicitudId: string;
  tipoSolicitudNombre?: string;
  asunto: string;
  remitente: string;
  destinatario: string;
  fechaRecepcion: string;
  fechaVencimiento: string;
  estado: CorreoEstado;
  gestorId?: string;
  gestorNombre?: string;
  diasTranscurridos: number;
  diasRestantes: number;
  createdAt: string;
  updatedAt: string;
}

export interface FlujoCorreo {
  id: string;
  correoId: string;
  etapa: CorreoEstado;
  usuarioId?: string;
  usuarioNombre?: string;
  fechaInicio: string;
  fechaFin?: string;
  duracion?: number;
  observaciones?: string;
  acciones?: string[];
  createdAt: string;
}

// ==================== DASHBOARD Y MÉTRICAS ====================
export interface DashboardMetrics {
  totalCorreos: number;
  correosPorEstado: Record<CorreoEstado, number>;
  correosVencidos: number;
  correosCumplidos: number;
  porcentajeCumplimiento: number;
  tiempoPromedioRespuesta: number;
  tiempoPromedioPorEtapa: Record<CorreoEstado, number>;
  correosPorEntidad: Array<{ entidad: string; cantidad: number }>;
  correosPorGestor: Array<{ gestor: string; cantidad: number }>;
  tendenciaMensual: Array<{ mes: string; total: number; cumplidos: number }>;
}

// ==================== FILTROS ====================
export interface FilterParams {
  fechaInicio?: string;
  fechaFin?: string;
  gestorId?: string;
  entidadId?: string;
  estado?: CorreoEstado;
  tipoSolicitudId?: string;
  urgencia?: UrgencyLevel;
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  searchTerm?: string;
}

// ==================== RESPUESTAS API ====================
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
  page?: number;
  totalPages?: number;
  totalItems?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

// ==================== TRAZABILIDAD ====================
export interface TrazabilidadItem {
  etapa: CorreoEstado;
  fechaInicio: string;
  fechaFin?: string;
  usuario?: string;
  duracion?: string;
  acciones?: string[];
}

export interface TrazabilidadData {
  correo: Correo;
  historial: TrazabilidadItem[];
  resumen: {
    plazoTotal: number;
    diasUsados: number;
    estadoCumplimiento: 'CUMPLIDO' | 'PENDIENTE' | 'VENCIDO';
    porcentajeUsado: number;
  };
}

// ==================== CONSTANTES ====================
export const UrgencyColor = {
  ALTA: 'bg-red-100 text-red-800',
  MEDIA: 'bg-yellow-100 text-yellow-800',
  BAJA: 'bg-green-100 text-green-800',
} as const;

export const EstadoColor = {
  RECEPCION: 'bg-gray-100 text-gray-800',
  ELABORACION: 'bg-blue-100 text-blue-800',
  REVISION: 'bg-yellow-100 text-yellow-800',
  APROBACION: 'bg-purple-100 text-purple-800',
  ENVIADO: 'bg-green-100 text-green-800',
  VENCIDO: 'bg-red-100 text-red-800',
  ARCHIVADO: 'bg-gray-100 text-gray-800',
} as const;



// En core.types.ts, agrega:
export interface Notification {
  id: string;
  tipo: NotificationType;
  titulo: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
  urgente: boolean;
  usuarioId: string;
  correoId?: string;
  entidadId?: string;
  userId?: string; // Usuario relacionado (ej: quien asignó)
  accion?: string; // Ruta a la que navegar
  metadata?: Record<string, any>;
}

export type NotificationType = 
  | 'ASIGNACION' 
  | 'VENCIMIENTO' 
  | 'REVISION' 
  | 'APROBACION' 
  | 'CORRECCION' 
  | 'ENVIO' 
  | 'ACUSE'
  | 'SISTEMA'
  | 'RECEPCION';