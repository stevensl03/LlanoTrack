import type { Correo, DashboardMetrics, FilterParams, TrazabilidadData } from './core.types';

// Props para componentes de Auditor
export interface DashboardProps {
  metrics: DashboardMetrics;
  correos: Correo[];
  loading: boolean;
  error?: string | null;
  filters: Partial<FilterParams>;
  onFilterChange: (filters: Partial<FilterParams>) => void;
  onExportExcel: () => Promise<void>;
  onExportPDF: () => Promise<void>;
}

export interface CorreosTableProps {
  correos: Correo[];
  loading: boolean;
  error?: string | null;
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
  error?: string | null;
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
  loading?: boolean;
}