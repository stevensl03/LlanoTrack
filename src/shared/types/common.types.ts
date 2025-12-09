// Constantes para selectores
export const USER_ROLES = [
  { value: 'INTEGRADOR', label: 'Integrador', description: 'Recibe y distribuye correos' },
  { value: 'GESTOR', label: 'Gestor', description: 'Elabora respuestas' },
  { value: 'REVISOR', label: 'Revisor', description: 'Revisa las respuestas' },
  { value: 'APROBADOR', label: 'Aprobador', description: 'Aprueba respuestas finales' },
  { value: 'auditor', label: 'Auditor', description: 'Monitorea y genera reportes' },
  { value: 'admin', label: 'Administrador', description: 'Gestiona sistema y usuarios' },
] as const;

export const ESTADOS_CORREO = [
  { value: 'RECEPCION', label: 'Recepción' },
  { value: 'ELABORACION', label: 'Elaboración' },
  { value: 'REVISION', label: 'Revisión' },
  { value: 'APROBACION', label: 'Aprobación' },
  { value: 'ENVIADO', label: 'Enviado' },
  { value: 'VENCIDO', label: 'Vencido' },
  { value: 'ARCHIVADO', label: 'Archivado' },
] as const;

export const NIVELES_URGENCIA = [
  { value: 'BAJA', label: 'Baja' },
  { value: 'MEDIA', label: 'Media' },
  { value: 'ALTA', label: 'Alta' },
] as const;

// Interfaces para selectores
export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

// Props para componentes comunes
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface TableColumn<T> {
  key: string;
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

export interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  className?: string;
}

export interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}