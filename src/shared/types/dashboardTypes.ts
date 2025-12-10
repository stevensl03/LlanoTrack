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