// Tipos para las métricas del dashboard
export interface DashboardEstadisticasResponse {
    total_correos: number;
    cumplimiento: number;
    correos_vencidos: number;
    tiempo_promedio: number;
    distribucion_estado: Record<string, number>;
    distribucion_etapa: Record<string, number>;
    total_entidades: number;
    total_cuentas: number;
    total_usuarios: number;
}

export interface MetricaResponse {
    titulo: string;
    valor: string;
    descripcion: string;
    color: 'blue' | 'green' | 'red' | 'purple' | 'yellow';
    porcentajeCambio: number | null;
    esPositivo: boolean | null;
}

export interface DistribucionItem {
    nombre: string;
    valor: number;
    porcentaje: number;
}

export interface DashboardData {
    metricas: MetricaResponse[];
    distribucionEstado: DistribucionItem[];
    distribucionEtapa: DistribucionItem[];
    totalCorreos: number;
    cumplimiento: number;
    tiempoPromedio: number;
}

// Colores para las métricas (usando objeto as const en lugar de enum)
export const MetricColor = {
    BLUE: 'blue',
    GREEN: 'green', 
    RED: 'red',
    PURPLE: 'purple',
    YELLOW: 'yellow'
} as const;

export type MetricColor = typeof MetricColor[keyof typeof MetricColor];

// Estados de correos (usando objeto as const en lugar de enum)
export const CorreoEstado = {
    PENDIENTE: 'PENDIENTE',
    VENCIDO: 'VENCIDO',
    RESPONDIDO: 'RESPONDIDO'
} as const;

export type CorreoEstado = typeof CorreoEstado[keyof typeof CorreoEstado];

// Etapas del flujo (usando objeto as const en lugar de enum)
export const FlujoEtapa = {
    RECEPCION: 'RECEPCION',
    ELABORACION: 'ELABORACION',
    REVISION: 'REVISION',
    APROBACION: 'APROBACION',
    ENVIO: 'ENVIO'
} as const;

export type FlujoEtapa = typeof FlujoEtapa[keyof typeof FlujoEtapa];
// Tipos para filtros
// En dashboardTypes.ts (además de los tipos existentes)

// Tipos para opciones de filtro
export interface OpcionFiltro {
  id: number | string | null;
  nombre: string;
}

export interface Gestor extends OpcionFiltro {
  id: number | null;
  nombre: string;
}

export interface TipoSolicitud extends OpcionFiltro {
  id: number | null;
  nombre: string;
}

export interface Entidad extends OpcionFiltro {
  id: number | null;
  nombre: string;
}

export interface Estado extends OpcionFiltro {
  id: string;
  nombre: string;
}

export interface Urgencia extends OpcionFiltro {
  id: string;
  nombre: string;
}

export interface OpcionesFiltroResponse {
  gestores: Gestor[];
  entidades: Entidad[];
  estados: Estado[];
  tiposSolicitud: TipoSolicitud[];
  urgencias: Urgencia[];
  camposBusqueda: string[];
}

// Tipos para filtros
export interface FiltroCorreoRequestDTO {
  gestorId?: number | null;
  entidadId?: number | null;
  estado?: string;
  tipoSolicitudId?: number | null;
  urgencia?: string;
  campoBusqueda?: string;
  valorBusqueda?: string;
  fechaInicio?: string | null;
  fechaFin?: string | null;
}

// Tipos para correos filtrados
export interface FlujoCorreoDTO {
  fechaAsignacion: string;
  correoUsuario: string;
  etapa: string | null;
  idUsuario: number;
  idFlujo: number;
  nombreUsuario: string;
  estaActivo: boolean;
  fechaFinalizacion: string | null;
}

export interface CuentaDTO {
  correo: string;
  id: number;
  entidadId?: number;
  entidadNombre?: string;
  nombre: string;
}

export interface TipoSolicitudDTO {
  id: number;
  nombre: string;
}

export interface CorreoFiltradoDTO {
  id: string;
  asunto: string;
  estado: string | null;
  urgencia: string | null;
  fechaRecepcion: string;
  fechaRespuesta: string | null;
  radicadoEntrada: string | null;
  radicadoSalida: string | null;
  plazoRespuestaEnDias: number | null;
  cuenta: CuentaDTO | null;
  tipoSolicitud: TipoSolicitudDTO | null;
  flujos: FlujoCorreoDTO[];
  fechaLimite?: string;
  estaAtrasado?: boolean;
}

export interface RespuestaFiltroCorreos {
  correos: CorreoFiltradoDTO[];
  paginaActual: number;
  totalPaginas: number;
  totalElementos: number;
  tamanoPagina: number;
  esPrimeraPagina: boolean;
  esUltimaPagina: boolean;
  totalElementosPagina: number;
}

// Tipo para estadísticas completas
export interface DashboardEstadisticasCompletasDTO {
  // Basado en el nombre del controlador, es probable que sea similar a DashboardEstadisticasResponse
  // Lo dejo como any para que se ajuste a la respuesta real
  [key: string]: any;
}

// dashboardTypes.ts (agregar o actualizar)

// Tipos para correos filtrados basados en la respuesta real
export interface FlujoCorreoDTO {
  fechaAsignacion: string;
  correoUsuario: string;
  etapa: string | null;
  idUsuario: number;
  idFlujo: number;
  nombreUsuario: string;
  estaActivo: boolean;
  fechaFinalizacion: string | null;
}

export interface CuentaDTO {
  correo: string;
  id: number;
  entidadId?: number;
  entidadNombre?: string;
  nombre: string;
}

export interface TipoSolicitudDTO {
  id: number;
  nombre: string;
}

export interface CorreoFiltradoDTO {
  id: string;
  asunto: string;
  estado: string | null;
  urgencia: string | null;
  fechaRecepcion: string;
  fechaRespuesta: string | null;
  radicadoEntrada: string | null;
  radicadoSalida: string | null;
  plazoRespuestaEnDias: number | null;
  cuenta: CuentaDTO | null;
  tipoSolicitud: TipoSolicitudDTO | null;
  flujos: FlujoCorreoDTO[];
  fechaLimite?: string;
  estaAtrasado?: boolean;
}

export interface RespuestaFiltroCorreos {
  correos: CorreoFiltradoDTO[];
  paginaActual: number;
  totalPaginas: number;
  totalElementos: number;
  tamanoPagina: number;
  esPrimeraPagina: boolean;
  esUltimaPagina: boolean;
  totalElementosPagina: number;
}