import type { Correo, DashboardMetrics, FilterParams, FlujoCorreo, TrazabilidadData } from './core.types';

// Interfaces para props de componentes Auditor
export interface DashboardProps {
  metrics: DashboardMetrics;
  loading: boolean;
  onFilterChange: (filters: Partial<FilterParams>) => void;
  onExportExcel: () => Promise<void>;
  onExportPDF: () => Promise<void>;
}

export interface CorreosTableProps {
  correos: Correo[];
  loading: boolean;
  filters: Partial<FilterParams>;
  totalItems: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onFilterChange: (filters: Partial<FilterParams>) => void;
  onViewDetails: (correoId: string) => void;
  onSort: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
}

export interface TrazabilidadViewProps {
  correoId: string;
  data?: TrazabilidadData;
  loading: boolean;
  onClose: () => void;
  onExportPDF: () => Promise<void>;
}

export interface FiltrosAvanzadosProps {
  filters: Partial<FilterParams>;
  availableFilters: {
    gestores: Array<{ id: string; nombre: string }>;
    entidades: Array<{ id: string; nombre: string }>;
    estados: string[];
    tiposSolicitud: Array<{ id: string; tipo: string }>;
    urgencias: string[];
  };
  onApplyFilters: (filters: Partial<FilterParams>) => void;
  onClearFilters: () => void;
}

// Tipos para gráficos
export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor?: string;
    borderWidth?: number;
  }>;
}

export interface ChartOptions {
  responsive: boolean;
  maintainAspectRatio: boolean;
  plugins: {
    legend: {
      position: 'top' | 'bottom' | 'left' | 'right';
    };
    tooltip: {
      callbacks: {
        label: (context: any) => string;
      };
    };
  };
}

// Tipos para exportación
export interface ExportOptions {
  format: 'excel' | 'pdf';
  filters?: FilterParams;
  includeCharts?: boolean;
  includeDetails?: boolean;
}

export interface ExportResult {
  success: boolean;
  url?: string;
  fileName: string;
  message: string;
}