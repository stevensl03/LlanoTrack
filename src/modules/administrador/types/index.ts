// Tipos de Roles del Sistema
export type UserRole = 'INTEGRADOR' | 'GESTOR' | 'REVISOR' | 'APROBADOR' | 'AUDITOR' | 'ADMIN';

// Interfaz para Usuario
export interface User {
  id: string;
  nombre: string;
  email: string;
  rol: UserRole;
  area: string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
  // Campos opcionales para expansión futura
  telefono?: string;
  extension?: string;
  departamento?: string;
  fechaIngreso?: string;
  ultimoAcceso?: string;
}

// Interfaz para Entidad (organizaciones externas como MinEnergía, CREG, etc.)
export interface Entity {
  id: string;
  nombre: string;
  dominios: string[]; // Dominios de email permitidos (@gov.co, @creg.gov.co, etc.)
  responsableId: string;
  responsableNombre?: string; // Nombre del responsable (para display)
  activa: boolean;
  createdAt: string;
  updatedAt: string;
  // Campos opcionales
  codigo?: string; // Código interno de la entidad
  direccion?: string;
  telefono?: string;
  contacto?: string;
  observaciones?: string;
}

// Interfaz para Tipo de Solicitud
export type UrgencyLevel = 'BAJA' | 'MEDIA' | 'ALTA';

export interface RequestType {
  id: string;
  tipo: string; // Nombre del tipo: "Derecho de Petición", "Tutela", etc.
  plazoDias: number;
  urgencia: UrgencyLevel;
  descripcion?: string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
  // Campos adicionales para control de flujo
  requiereAprobacion?: boolean;
  requiereRevision?: boolean;
  diasRecordatorio?: number; // Días antes del vencimiento para enviar recordatorio
  plantillaRespuesta?: string; // ID o referencia a plantilla de respuesta
}

// Interfaz para Correo (simplificada para las vistas de admin)
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

// Estados posibles de un correo en el flujo
export type CorreoEstado = 
  | 'RECEPCION' 
  | 'ELABORACION' 
  | 'REVISION' 
  | 'APROBACION' 
  | 'ENVIADO' 
  | 'VENCIDO' 
  | 'ARCHIVADO';

// Interfaz para Historial/Flujo de Correos
export interface FlujoCorreo {
  id: string;
  correoId: string;
  etapa: CorreoEstado;
  usuarioId?: string;
  usuarioNombre?: string;
  fechaInicio: string;
  fechaFin?: string;
  duracion?: number; // En horas
  observaciones?: string;
  acciones?: string[];
  createdAt: string;
}

// Interfaz para Cuenta de Email Externa
export interface CuentaEmail {
  id: string;
  email: string;
  host: string;
  puerto: number;
  protocolo: 'IMAP' | 'POP3';
  ssl: boolean;
  usuario: string;
  contraseñaEncriptada: string;
  activa: boolean;
  ultimaSincronizacion?: string;
  entidadId?: string; // Si está asociada a una entidad específica
  createdAt: string;
  updatedAt: string;
}

// Interfaz para Respuesta API genérica
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
  // Para paginación
  page?: number;
  totalPages?: number;
  totalItems?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

// Interfaz para Datos de Dashboard/Métricas
export interface DashboardMetrics {
  totalCorreos: number;
  correosPorEstado: Record<CorreoEstado, number>;
  correosVencidos: number;
  correosCumplidos: number;
  porcentajeCumplimiento: number;
  tiempoPromedioRespuesta: number; // En días
  tiempoPromedioPorEtapa: Record<CorreoEstado, number>;
  correosPorEntidad: Array<{ entidad: string; cantidad: number }>;
  correosPorGestor: Array<{ gestor: string; cantidad: number }>;
  tendenciaMensual: Array<{ mes: string; total: number; cumplidos: number }>;
}

// Interfaz para Filtros de Búsqueda
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

// DTOs para Formularios (Data Transfer Objects)

// Para creación/actualización de usuario
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

// Para creación/actualización de entidad
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

// Para creación/actualización de tipo de solicitud
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

// Tipos para Props de Componentes
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  className?: string;
}

// Enums para constantes
export const UrgencyColor = {
  ALTA: 'bg-red-100 text-red-800',
  MEDIA: 'bg-yellow-100 text-yellow-800',
  BAJA: 'bg-green-100 text-green-800',
} as const;

export type UrgencyColor = typeof UrgencyColor[keyof typeof UrgencyColor];


export const EstadoColor = {
  RECEPCION: 'bg-gray-100 text-gray-800',
  ELABORACION: 'bg-blue-100 text-blue-800',
  REVISION: 'bg-yellow-100 text-yellow-800',
  APROBACION: 'bg-purple-100 text-purple-800',
  ENVIADO: 'bg-green-100 text-green-800',
  VENCIDO: 'bg-red-100 text-red-800',
  ARCHIVADO: 'bg-gray-100 text-gray-800',
} as const;

export type EstadoColor = typeof EstadoColor[keyof typeof EstadoColor];


// Helper Types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type RecordOf<T> = Record<string, T>;
export type ArrayOf<T> = T[];


// /pages/RequestTypesPage/types/index.ts
export interface RequestType {
  id: string;
  nombre: string;
  plazoDiasPromedio: number | null;
  plazoDiasMinimo: number | null;
  plazoDiasMaximo: number | null;
  urgencia: 'BAJA' | 'MEDIA' | 'ALTA';
  descripcion?: string;
  activo: boolean;
  totalCorreos: number;
  correosPendientes: number;
  correosRespondidos: number;
  correosVencidos: number;
  tiempoPromedioRespuestaReal: number | null;
}

export interface RequestTypeFormData {
  tipo: string;
  plazoDias: number;
  urgencia: 'BAJA' | 'MEDIA' | 'ALTA';
  descripcion?: string;
  activo?: boolean;
}

export interface RequestTypeTableProps {
  requestTypes: RequestType[];
  onEdit: (type: RequestType) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

export interface RequestTypeModalProps {
  requestType: RequestType | null;
  onSave: (typeData: RequestTypeFormData) => void;
  onClose: () => void;
  loading?: boolean;
}

export interface RequestTypeSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  loading: boolean;
  onAddNew: () => void;
}