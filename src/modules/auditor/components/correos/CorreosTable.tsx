// components/correos/CorreosTable.tsx
import React, { useMemo } from 'react';
import {
  Table,
  ScrollArea,
  Text,
  Group,
  Badge,
  ActionIcon,
  Box,
  Avatar,
  Stack,
  Tooltip,
  Progress,
  UnstyledButton,
  Center,
  ThemeIcon
} from '@mantine/core';
import {
  IconEye,
  IconEdit,
  IconTrash,
  IconMail,
  IconClock,
  IconAlertCircle,
  IconCheck,
  IconUser,
  IconBuilding,
  IconCalendar,
  IconSortAscending,
  IconSortDescending,
  IconChevronRight,
  IconExternalLink
} from '@tabler/icons-react';
import type { CorreoFiltradoDTO, FlujoCorreoDTO } from '../../../../shared/types/dashboardTypes';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface CorreosTableProps {
  correos: CorreoFiltradoDTO[];
  loading?: boolean;
  onViewDetails?: (correo: CorreoFiltradoDTO) => void;
  onEdit?: (correo: CorreoFiltradoDTO) => void;
  onDelete?: (correo: CorreoFiltradoDTO) => void;
  selectedCorreos?: string[];
  onSelectCorreo?: (id: string) => void;
  onSelectAll?: () => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string) => void;
  showActions?: boolean;
  showSelection?: boolean;
  compact?: boolean;
}

interface ColumnConfig {
  key: keyof CorreoFiltradoDTO | 'actions' | 'gestor' | 'tiempo';
  label: string;
  width?: string | number;
  sortable?: boolean;
  render?: (correo: CorreoFiltradoDTO) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

const CorreosTable: React.FC<CorreosTableProps> = ({
  correos,
  loading = false,
  onViewDetails,
  onEdit,
  onDelete,
  selectedCorreos = [],
  onSelectCorreo,
  onSelectAll,
  sortColumn = 'fechaRecepcion',
  sortDirection = 'desc',
  onSort,
  showActions = true,
  showSelection = false,
  compact = false
}) => {
  // Formatear fecha
  const formatFecha = (fecha: string): string => {
    try {
      return format(new Date(fecha), 'dd/MM/yyyy HH:mm', { locale: es });
    } catch {
      return fecha;
    }
  };

  // Calcular días restantes
  const calcularDiasRestantes = (correo: CorreoFiltradoDTO): number | null => {
    if (!correo.plazoRespuestaEnDias || !correo.fechaRecepcion) return null;
    
    const fechaRecepcion = new Date(correo.fechaRecepcion);
    const fechaLimite = new Date(fechaRecepcion.getTime() + correo.plazoRespuestaEnDias * 24 * 60 * 60 * 1000);
    const hoy = new Date();
    const diffTime = fechaLimite.getTime() - hoy.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Obtener gestor activo
  const obtenerGestorActivo = (flujos: FlujoCorreoDTO[]): FlujoCorreoDTO | null => {
    return flujos.find(f => f.estaActivo) || null;
  };

  // Renderizar estado
  const renderEstado = (estado: string | null): React.ReactNode => {
    const config = {
      PENDIENTE: { color: 'yellow', icon: <IconClock size={14} />, label: 'Pendiente' },
      RESPONDIDO: { color: 'green', icon: <IconCheck size={14} />, label: 'Respondido' },
      VENCIDO: { color: 'red', icon: <IconAlertCircle size={14} />, label: 'Vencido' }
    };

    const { color, icon, label } = config[estado as keyof typeof config] || { 
      color: 'gray', 
      icon: <IconClock size={14} />, 
      label: estado || 'Desconocido' 
    };

    return (
      <Badge 
        color={color} 
        variant="filled" 
        size={compact ? "sm" : "md"}
        leftSection={icon}
      >
        {label}
      </Badge>
    );
  };

  // Renderizar urgencia
  const renderUrgencia = (urgencia: string | null): React.ReactNode => {
    if (!urgencia) return null;

    const config = {
      ALTA: { color: 'red', label: 'Alta' },
      MEDIA: { color: 'orange', label: 'Media' },
      BAJA: { color: 'yellow', label: 'Baja' }
    };

    const { color, label } = config[urgencia as keyof typeof config] || { 
      color: 'gray', 
      label: urgencia 
    };

    return (
      <Badge 
        color={color} 
        variant="light" 
        size={compact ? "xs" : "sm"}
        radius="sm"
      >
        {label}
      </Badge>
    );
  };

  // Renderizar remitente
  const renderRemitente = (correo: CorreoFiltradoDTO): React.ReactNode => {
    if (!correo.cuenta) return null;

    return (
      <Group gap="xs" wrap="nowrap">
        <Avatar
          size={compact ? "sm" : "md"}
          color="blue"
          radius="xl"
        >
          <IconUser size={14} />
        </Avatar>
        <Stack gap={2}>
          <Text size={compact ? "xs" : "sm"} fw={500} lineClamp={1}>
            {correo.cuenta.nombre}
          </Text>
          <Text size={compact ? "xs" : "xs"} c="dimmed" lineClamp={1}>
            {correo.cuenta.correo}
          </Text>
        </Stack>
      </Group>
    );
  };

  // Renderizar tiempo restante
  const renderTiempoRestante = (correo: CorreoFiltradoDTO): React.ReactNode => {
    const diasRestantes = calcularDiasRestantes(correo);
    
    if (diasRestantes === null) return null;

    const esAtrasado = diasRestantes < 0;
    const color = esAtrasado ? 'red' : diasRestantes <= 2 ? 'orange' : 'green';

    return (
      <Group gap="xs" wrap="nowrap">
        <IconClock size={14} color={color} />
        <Text size={compact ? "xs" : "sm"} c={color} fw={esAtrasado ? 700 : 500}>
          {esAtrasado ? `Atrasado ${Math.abs(diasRestantes)}d` : `${diasRestantes}d restantes`}
        </Text>
      </Group>
    );
  };

  // Renderizar gestor
  const renderGestor = (correo: CorreoFiltradoDTO): React.ReactNode => {
    const gestorActivo = obtenerGestorActivo(correo.flujos);
    
    if (!gestorActivo) {
      return (
        <Badge color="gray" variant="light" size="sm">
          Sin asignar
        </Badge>
      );
    }

    return (
      <Group gap="xs" wrap="nowrap">
        <Avatar
          size="sm"
          color="blue"
          radius="xl"
        >
          <IconUser size={12} />
        </Avatar>
        <Stack gap={2}>
          <Text size="xs" fw={500} lineClamp={1}>
            {gestorActivo.nombreUsuario}
          </Text>
          <Text size="xs" c="dimmed" lineClamp={1}>
            {gestorActivo.etapa || 'Sin etapa'}
          </Text>
        </Stack>
      </Group>
    );
  };

  // Configuración de columnas
  const columnas: ColumnConfig[] = useMemo(() => [
    {
      key: 'asunto',
      label: 'Asunto / ID',
      width: compact ? 200 : 300,
      sortable: true,
      render: (correo: CorreoFiltradoDTO) => (
        <Stack gap={2}>
          <Group gap="xs">
            <IconMail size={14} color="gray" />
            <Text size={compact ? "xs" : "sm"} fw={500} lineClamp={1}>
              {correo.asunto}
            </Text>
          </Group>
          <Text size="xs" c="dimmed" lineClamp={1}>
            ID: {correo.id.substring(0, 20)}...
          </Text>
        </Stack>
      )
    },
    {
      key: 'estado',
      label: 'Estado',
      width: compact ? 100 : 120,
      sortable: true,
      render: (correo: CorreoFiltradoDTO) => renderEstado(correo.estado)
    },
    {
      key: 'urgencia',
      label: 'Urgencia',
      width: compact ? 80 : 100,
      render: (correo: CorreoFiltradoDTO) => renderUrgencia(correo.urgencia)
    },
    {
      key: 'cuenta',
      label: 'Remitente',
      width: compact ? 150 : 200,
      render: (correo: CorreoFiltradoDTO) => renderRemitente(correo)
    },
    {
      key: 'fechaRecepcion',
      label: 'Fecha Recepción',
      width: compact ? 120 : 150,
      sortable: true,
      render: (correo: CorreoFiltradoDTO) => (
        <Stack gap={2}>
          <Text size={compact ? "xs" : "sm"} fw={500}>
            {formatFecha(correo.fechaRecepcion)}
          </Text>
          {correo.fechaLimite && (
            <Text size="xs" c="dimmed">
              Límite: {formatFecha(correo.fechaLimite)}
            </Text>
          )}
        </Stack>
      )
    },
    {
      key: 'tiempo',
      label: 'Tiempo',
      width: compact ? 100 : 120,
      render: (correo: CorreoFiltradoDTO) => renderTiempoRestante(correo)
    },
    {
      key: 'gestor',
      label: 'Gestor Actual',
      width: compact ? 150 : 200,
      render: (correo: CorreoFiltradoDTO) => renderGestor(correo)
    },
    {
      key: 'actions',
      label: 'Acciones',
      width: compact ? 80 : 100,
      align: 'center',
      render: (correo: CorreoFiltradoDTO) => (
        <Group gap={4} justify="center">
          {onViewDetails && (
            <Tooltip label="Ver detalles">
              <ActionIcon
                size={compact ? "sm" : "md"}
                variant="subtle"
                color="blue"
                onClick={() => onViewDetails(correo)}
              >
                <IconEye size={14} />
              </ActionIcon>
            </Tooltip>
          )}
          
          {onEdit && (
            <Tooltip label="Editar">
              <ActionIcon
                size={compact ? "sm" : "md"}
                variant="subtle"
                color="orange"
                onClick={() => onEdit(correo)}
              >
                <IconEdit size={14} />
              </ActionIcon>
            </Tooltip>
          )}
          
          {onDelete && (
            <Tooltip label="Eliminar">
              <ActionIcon
                size={compact ? "sm" : "md"}
                variant="subtle"
                color="red"
                onClick={() => onDelete(correo)}
              >
                <IconTrash size={14} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      )
    }
  ].filter(col => !compact || !['gestor', 'tiempo'].includes(col.key)), [compact, onViewDetails, onEdit, onDelete]);

  // Renderizar header de columna
  const renderHeader = (columna: ColumnConfig): React.ReactNode => {
    const isSorted = sortColumn === columna.key;
    const SortIcon = isSorted 
      ? sortDirection === 'asc' 
        ? IconSortAscending 
        : IconSortDescending 
      : null;

    return (
      <UnstyledButton
        onClick={() => columna.sortable && onSort?.(columna.key)}
        style={{ 
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: columna.align || 'left',
          gap: '4px',
          padding: '8px',
          cursor: columna.sortable ? 'pointer' : 'default'
        }}
      >
        <Text fw={600} size="sm">
          {columna.label}
        </Text>
        {SortIcon && (
          <SortIcon size={12} />
        )}
      </UnstyledButton>
    );
  };

  // Renderizar fila de correo
  const renderRow = (correo: CorreoFiltradoDTO): React.ReactNode => {
    const isSelected = selectedCorreos.includes(correo.id);
    const gestorActivo = obtenerGestorActivo(correo.flujos);

    return (
      <Table.Tr
        key={correo.id}
        style={{ 
          backgroundColor: isSelected ? 'var(--mantine-color-blue-light)' : 'transparent',
          cursor: 'pointer'
        }}
        onClick={() => onSelectCorreo?.(correo.id)}
      >
        {columnas.map(columna => (
          <Table.Td key={columna.key} style={{ 
            width: columna.width, 
            textAlign: columna.align || 'left',
            verticalAlign: 'middle'
          }}>
            {columna.render ? columna.render(correo) : (
              <Text size={compact ? "xs" : "sm"}>
                {correo[columna.key as keyof CorreoFiltradoDTO]?.toString() || '-'}
              </Text>
            )}
          </Table.Td>
        ))}
      </Table.Tr>
    );
  };

  if (loading) {
    return (
      <Center py="xl">
        <Stack align="center" gap="md">
          <Text c="dimmed">Cargando correos...</Text>
        </Stack>
      </Center>
    );
  }

  if (correos.length === 0) {
    return (
      <Center py="xl">
        <Stack align="center" gap="md">
          <ThemeIcon size={48} radius="md" variant="light" color="gray">
            <IconMail size={24} />
          </ThemeIcon>
          <Text c="dimmed">No se encontraron correos</Text>
          <Text size="sm" c="dimmed">Intenta ajustar los filtros de búsqueda</Text>
        </Stack>
      </Center>
    );
  }

  return (
    <ScrollArea>
      <Table 
        verticalSpacing={compact ? "xs" : "sm"} 
        horizontalSpacing={compact ? "xs" : "md"}
        highlightOnHover
        striped
      >
        <Table.Thead>
          <Table.Tr>
            {columnas.map(columna => (
              <Table.Th key={columna.key} style={{ width: columna.width }}>
                {renderHeader(columna)}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {correos.map(correo => renderRow(correo))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default CorreosTable;