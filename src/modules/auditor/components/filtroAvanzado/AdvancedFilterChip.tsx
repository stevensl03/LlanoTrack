// components/filters/AdvancedFilterChip.tsx
import React from 'react';
import { 
  Badge, 
  Group, 
  Text, 
  ActionIcon,
  Box,
  Tooltip
} from '@mantine/core';
import { 
  IconX, 
  IconEdit, 
  IconFilter,
  IconCalendar,
  IconUser,
  IconBuilding,
  IconAlertCircle,
  IconSearch,
  IconMail
} from '@tabler/icons-react';

export type FilterType = 
  | 'gestor' 
  | 'entidad' 
  | 'estado' 
  | 'urgencia' 
  | 'tipoSolicitud' 
  | 'fecha' 
  | 'busqueda'
  | 'custom';

interface AdvancedFilterChipProps {
  type: FilterType;
  label: string;
  value: string;
  onRemove?: () => void;
  onEdit?: () => void;
  removable?: boolean;
  editable?: boolean;
  color?: string;
}

const AdvancedFilterChip: React.FC<AdvancedFilterChipProps> = ({
  type,
  label,
  value,
  onRemove,
  onEdit,
  removable = true,
  editable = false,
  color = 'blue'
}) => {
  const getIcon = (filterType: FilterType): React.ReactNode => {
    const iconMap: Record<FilterType, React.ReactNode> = {
      gestor: <IconUser size={12} />,
      entidad: <IconBuilding size={12} />,
      estado: <IconAlertCircle size={12} />,
      urgencia: <IconAlertCircle size={12} />,
      tipoSolicitud: <IconFilter size={12} />,
      fecha: <IconCalendar size={12} />,
      busqueda: <IconSearch size={12} />,
      custom: <IconFilter size={12} />
    };
    return iconMap[filterType];
  };

  const getTypeLabel = (filterType: FilterType): string => {
    const labelMap: Record<FilterType, string> = {
      gestor: 'Gestor',
      entidad: 'Entidad',
      estado: 'Estado',
      urgencia: 'Urgencia',
      tipoSolicitud: 'Tipo',
      fecha: 'Fecha',
      busqueda: 'Búsqueda',
      custom: 'Filtro'
    };
    return labelMap[filterType];
  };

  return (
    <Badge
      variant="light"
      color={color}
      size="lg"
      radius="sm"
      style={{
        padding: '6px 12px',
        height: 'auto',
        minHeight: '32px'
      }}
    >
      <Group gap="xs" wrap="nowrap">
        {getIcon(type)}
        
        <Box style={{ maxWidth: '200px' }}>
          <Group gap={4} wrap="nowrap">
            <Text size="xs" fw={600} truncate>
              {getTypeLabel(type)}:
            </Text>
            <Text size="xs" truncate title={value}>
              {value}
            </Text>
          </Group>
          {label !== value && (
            <Text size="xs" c="dimmed" truncate title={label}>
              {label}
            </Text>
          )}
        </Box>
        
        {editable && onEdit && (
          <Tooltip label="Editar filtro">
            <ActionIcon
              size="xs"
              variant="transparent"
              color="gray"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <IconEdit size={12} />
            </ActionIcon>
          </Tooltip>
        )}
        
        {removable && onRemove && (
          <Tooltip label="Eliminar filtro">
            <ActionIcon
              size="xs"
              variant="transparent"
              color="gray"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
            >
              <IconX size={12} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    </Badge>
  );
};

export default AdvancedFilterChip;