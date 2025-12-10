// pages/FlujoCorreoPage.tsx
import React, { useState, useCallback, useEffect } from 'react';
import {
  Grid,
  Stack,
  Title,
  Text,
  Paper,
  Group,
  Button,
  Select,
  TextInput,
  Pagination,
  Loader,
  Alert,
  Badge,
  ThemeIcon,
  ActionIcon,
  Box,
  Divider,
  Menu,
  Modal,
  Center,
  ScrollArea,
  Tabs,
  Switch,
  Tooltip,
  Anchor,
  CopyButton,
  Table,
  UnstyledButton,
  Avatar
} from '@mantine/core';
import {
  IconFilter,
  IconSearch,
  IconSortAscending,
  IconSortDescending,
  IconRefresh,
  IconDownload,
  IconPrinter,
  IconUser,
  IconMail,
  IconClock,
  IconCheck,
  IconX,
  IconEdit,
  IconTrash,
  IconEye,
  IconColumns,
  IconChartBar,
  IconCalendar,
  IconChevronDown,
  IconAdjustmentsHorizontal,
  IconExternalLink,
  IconCopy,
  IconCheck as IconCheckCopy,
  IconHistory,
  IconPlayerPlay,
  IconPlayerStop,
  IconUserPlus,
  IconExchange,
  IconList,
  IconLayoutGrid,
  IconSortAZ,
  IconSortZA
} from '@tabler/icons-react';
import { useFlujoCorreo } from '../../../shared/hooks/useFlujoCorreo';
import type { FlujoCorreoResponse, EtapaFlujo } from '../../../shared/types/flujoCorreoTypes';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Tipo para configuración de columna
interface ColumnConfig {
  key: keyof FlujoCorreoResponse | 'acciones' | 'estado' | 'tiempo_duracion';
  label: string;
  width?: string | number;
  sortable?: boolean;
  render?: (flujo: FlujoCorreoResponse) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

// Opciones para los selects
const sortOptions = [
  { value: 'id', label: 'ID' },
  { value: 'fecha_asignacion', label: 'Fecha Asignación' },
  { value: 'fecha_finalizacion', label: 'Fecha Finalización' },
  { value: 'etapa', label: 'Etapa' }
];

const etapasOptions = [
  { value: 'RECEPCION', label: 'Recepción' },
  { value: 'ELABORACION', label: 'Elaboración' },
  { value: 'REVISION', label: 'Revisión' },
  { value: 'APROBACION', label: 'Aprobación' },
  { value: 'ENVIO', label: 'Envío' }
];

const estadoOptions = [
  { value: 'true', label: 'Activos' },
  { value: 'false', label: 'Completados' }
];

const pageSizeOptions = [
  { value: '10', label: '10 por página' },
  { value: '20', label: '20 por página' },
  { value: '50', label: '50 por página' },
  { value: '100', label: '100 por página' }
];

const FlujoCorreoPage: React.FC = () => {
  // Hook del flujo de correo
  const {
    flujosCorreoPaginated,
    flujosCorreo,
    loading,
    error,
    buscarFlujosCorreo,
    obtenerFlujosEnProgreso,
    obtenerFlujosCompletados,
    obtenerFlujosSinAsignar,
    clearError,
    reset
  } = useFlujoCorreo();

  // Estados locales
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string>('fecha_asignacion');
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');
  const [selectedFlujos, setSelectedFlujos] = useState<number[]>([]);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'todos' | 'activos' | 'completados' | 'sinAsignar'>('todos');
  
  // Estados para filtros
  const [filtroEtapa, setFiltroEtapa] = useState<string | null>(null);
  const [filtroUsuario, setFiltroUsuario] = useState<string | null>(null);
  const [showFiltros, setShowFiltros] = useState(false);
  
  // Estados para modales
  const [modalDetalleOpen, setModalDetalleOpen] = useState(false);
  const [flujoSeleccionado, setFlujoSeleccionado] = useState<FlujoCorreoResponse | null>(null);
  const [modalAsignarOpen, setModalAsignarOpen] = useState(false);
  const [modalFinalizarOpen, setModalFinalizarOpen] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  const cargarDatosIniciales = useCallback(async () => {
    try {
      await buscarFlujosCorreo({
        pagina: 0,
        tamano: pageSize,
        ordenarPor: sortField,
        direccion: sortDirection
      });
    } catch (err) {
      console.error('Error al cargar datos iniciales:', err);
    }
  }, [pageSize, sortField, sortDirection]);

  // Manejar cambio de pestaña
  const handleTabChange = useCallback(async (tab: string) => {
    setActiveTab(tab as any);
    setCurrentPage(1);
    setSelectedFlujos([]);
    
    try {
      switch (tab) {
        case 'activos':
          await obtenerFlujosEnProgreso();
          break;
        case 'completados':
          await obtenerFlujosCompletados();
          break;
        case 'sinAsignar':
          await obtenerFlujosSinAsignar();
          break;
        case 'todos':
        default:
          await buscarFlujosCorreo({
            pagina: 0,
            tamano: pageSize,
            ordenarPor: sortField,
            direccion: sortDirection
          });
          break;
      }
    } catch (err) {
      console.error(`Error al cargar flujos de ${tab}:`, err);
    }
  }, [pageSize, sortField, sortDirection]);

  // Formatear fecha
  const formatFecha = (fecha: string | null): string => {
    if (!fecha) return 'No definida';
    try {
      return format(new Date(fecha), 'dd/MM/yyyy HH:mm', { locale: es });
    } catch {
      return fecha;
    }
  };

  // Calcular si el flujo está activo
  const esFlujoActivo = (flujo: FlujoCorreoResponse): boolean => {
    return flujo.fecha_finalizacion === null;
  };

  // Obtener color según etapa
  const getEtapaColor = (etapa: EtapaFlujo | null): string => {
    const colorMap: Record<string, string> = {
      'RECEPCION': 'blue',
      'ELABORACION': 'cyan',
      'REVISION': 'orange',
      'APROBACION': 'violet',
      'ENVIO': 'green'
    };
    return colorMap[etapa || ''] || 'gray';
  };

  // Obtener icono según etapa
  const getEtapaIcon = (etapa: EtapaFlujo | null): React.ReactNode => {
    const iconMap: Record<string, React.ReactNode> = {
      'RECEPCION': <IconMail size={14} />,
      'ELABORACION': <IconEdit size={14} />,
      'REVISION': <IconEye size={14} />,
      'APROBACION': <IconCheck size={14} />,
      'ENVIO': <IconExternalLink size={14} />
    };
    return iconMap[etapa || ''] || <IconClock size={14} />;
  };

  // Renderizar etapa
  const renderEtapa = (flujo: FlujoCorreoResponse): React.ReactNode => {
    if (!flujo.etapa) return null;
    
    return (
      <Badge
        color={getEtapaColor(flujo.etapa)}
        variant="light"
        leftSection={getEtapaIcon(flujo.etapa)}
        size="md"
      >
        {flujo.etapa}
      </Badge>
    );
  };

  // Renderizar estado
  const renderEstado = (flujo: FlujoCorreoResponse): React.ReactNode => {
    const esActivo = esFlujoActivo(flujo);
    
    return (
      <Badge
        color={esActivo ? 'green' : 'gray'}
        variant="filled"
        leftSection={esActivo ? <IconPlayerPlay size={12} /> : <IconPlayerStop size={12} />}
        size="md"
      >
        {esActivo ? 'Activo' : 'Finalizado'}
      </Badge>
    );
  };

  // Renderizar usuario
  const renderUsuario = (flujo: FlujoCorreoResponse): React.ReactNode => {
    if (!flujo.usuario) {
      return (
        <Badge color="yellow" variant="light" size="sm">
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
          <Text size="sm" fw={500} lineClamp={1}>
            {flujo.usuario.nombres} {flujo.usuario.apellidos}
          </Text>
          <Text size="xs" c="dimmed" lineClamp={1}>
            {flujo.usuario.correo}
          </Text>
        </Stack>
      </Group>
    );
  };

  // Renderizar correo
  const renderCorreo = (flujo: FlujoCorreoResponse): React.ReactNode => {
    if (!flujo.correo) return null;

    return (
      <Stack gap={2}>
        <Text size="sm" fw={500} lineClamp={1}>
          {flujo.correo.asunto}
        </Text>
        <Text size="xs" c="dimmed" lineClamp={1}>
          ID: {flujo.correo.correo_id?.substring(0, 20)}...
        </Text>
      </Stack>
    );
  };

  // Renderizar tiempo de duración
  const renderTiempoDuracion = (flujo: FlujoCorreoResponse): React.ReactNode => {
    if (!flujo.fecha_asignacion) return null;

    const inicio = new Date(flujo.fecha_asignacion);
    const fin = flujo.fecha_finalizacion ? new Date(flujo.fecha_finalizacion) : new Date();
    
    const diffMs = fin.getTime() - inicio.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return (
      <Group gap="xs" wrap="nowrap">
        <IconClock size={14} />
        <Text size="sm">
          {diffDays > 0 ? `${diffDays}d ` : ''}
          {diffHours > 0 ? `${diffHours}h ` : ''}
          {diffMinutes > 0 ? `${diffMinutes}m` : '0m'}
        </Text>
      </Group>
    );
  };

  // Configuración de columnas
  const columnas: ColumnConfig[] = [
    {
      key: 'id',
      label: 'ID',
      width: 80,
      sortable: true,
      render: (flujo: FlujoCorreoResponse) => (
        <Text fw={500} size="sm">
          #{flujo.id}
        </Text>
      )
    },
    {
      key: 'fecha_asignacion',
      label: 'Fecha Asignación',
      width: 160,
      sortable: true,
      render: (flujo: FlujoCorreoResponse) => (
        <Stack gap={2}>
          <Text size="sm" fw={500}>
            {formatFecha(flujo.fecha_asignacion)}
          </Text>
          <Text size="xs" c="dimmed">
            Asignado
          </Text>
        </Stack>
      )
    },
    {
      key: 'fecha_finalizacion',
      label: 'Fecha Finalización',
      width: 160,
      sortable: true,
      render: (flujo: FlujoCorreoResponse) => (
        <Stack gap={2}>
          <Text size="sm" fw={500}>
            {formatFecha(flujo.fecha_finalizacion)}
          </Text>
          <Text size="xs" c="dimmed">
            {flujo.fecha_finalizacion ? 'Finalizado' : 'En progreso'}
          </Text>
        </Stack>
      )
    },
    {
      key: 'usuario',
      label: 'Usuario Asignado',
      width: 200,
      render: (flujo: FlujoCorreoResponse) => renderUsuario(flujo)
    },
    {
      key: 'correo',
      label: 'Correo',
      width: 250,
      render: (flujo: FlujoCorreoResponse) => renderCorreo(flujo)
    },
    {
      key: 'etapa',
      label: 'Etapa',
      width: 130,
      sortable: true,
      render: (flujo: FlujoCorreoResponse) => renderEtapa(flujo)
    },
    {
      key: 'estado',
      label: 'Estado',
      width: 120,
      render: (flujo: FlujoCorreoResponse) => renderEstado(flujo)
    },
    {
      key: 'tiempo_duracion',
      label: 'Duración',
      width: 120,
      render: (flujo: FlujoCorreoResponse) => renderTiempoDuracion(flujo)
    },
    {
      key: 'acciones',
      label: 'Acciones',
      width: 140,
      align: 'center',
      render: (flujo: FlujoCorreoResponse) => (
        <Group gap={4} justify="center">
          <Tooltip label="Ver detalles">
            <ActionIcon
              size="md"
              variant="subtle"
              color="blue"
              onClick={() => {
                setFlujoSeleccionado(flujo);
                setModalDetalleOpen(true);
              }}
            >
              <IconEye size={16} />
            </ActionIcon>
          </Tooltip>

          {esFlujoActivo(flujo) && (
            <>
              <Tooltip label="Finalizar etapa">
                <ActionIcon
                  size="md"
                  variant="subtle"
                  color="orange"
                  onClick={() => {
                    setFlujoSeleccionado(flujo);
                    setModalFinalizarOpen(true);
                  }}
                >
                  <IconCheck size={16} />
                </ActionIcon>
              </Tooltip>

              <Tooltip label="Reasignar">
                <ActionIcon
                  size="md"
                  variant="subtle"
                  color="violet"
                  onClick={() => {
                    setFlujoSeleccionado(flujo);
                    setModalAsignarOpen(true);
                  }}
                >
                  <IconExchange size={16} />
                </ActionIcon>
              </Tooltip>
            </>
          )}
        </Group>
      )
    }
  ];

  // Manejar selección de flujo
  const handleSelectFlujo = useCallback((id: number) => {
    setSelectedFlujos(prev => 
      prev.includes(id) 
        ? prev.filter(flujoId => flujoId !== id)
        : [...prev, id]
    );
  }, []);

  // Manejar selección de todos
  const handleSelectAll = useCallback(() => {
    const currentFlujos = flujosCorreoPaginated?.content || flujosCorreo;
    if (selectedFlujos.length === currentFlujos.length) {
      setSelectedFlujos([]);
    } else {
      setSelectedFlujos(currentFlujos.map(flujo => flujo.id));
    }
  }, [flujosCorreoPaginated, flujosCorreo, selectedFlujos.length]);

  // Manejar ordenamiento
  const handleSort = useCallback((field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortField(field);
      setSortDirection('DESC');
    }
  }, [sortField, sortDirection]);

  // Aplicar filtros
  const handleAplicarFiltros = useCallback(async () => {
    try {
      await buscarFlujosCorreo({
        pagina: 0,
        tamano: pageSize,
        ordenarPor: sortField,
        direccion: sortDirection,
        etapa: filtroEtapa as any,
        activo: filtroEtapa ? undefined : (activeTab === 'activos' ? true : undefined)
      });
      setCurrentPage(1);
    } catch (err) {
      console.error('Error al aplicar filtros:', err);
    }
  }, [pageSize, sortField, sortDirection, filtroEtapa, activeTab]);

  // Limpiar filtros
  const handleLimpiarFiltros = useCallback(() => {
    setFiltroEtapa(null);
    setFiltroUsuario(null);
    setSearchQuery('');
    buscarFlujosCorreo({
      pagina: 0,
      tamano: pageSize,
      ordenarPor: sortField,
      direccion: sortDirection
    });
    setCurrentPage(1);
  }, [pageSize, sortField, sortDirection]);

  // Renderizar header de columna
  const renderHeader = (columna: ColumnConfig): React.ReactNode => {
    const isSorted = sortField === columna.key;
    const SortIcon = isSorted 
      ? sortDirection === 'ASC' 
        ? IconSortAscending 
        : IconSortDescending 
      : null;

    return (
      <UnstyledButton
        onClick={() => columna.sortable && handleSort(columna.key)}
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

  // Renderizar fila de la tabla
  const renderRow = (flujo: FlujoCorreoResponse): React.ReactNode => {
    const isSelected = selectedFlujos.includes(flujo.id);

    return (
      <Table.Tr
        key={flujo.id}
        style={{ 
          backgroundColor: isSelected ? 'var(--mantine-color-blue-light)' : 'transparent',
          cursor: 'pointer'
        }}
        onClick={() => handleSelectFlujo(flujo.id)}
      >
        {columnas.map(columna => (
          <Table.Td key={columna.key} style={{ 
            width: columna.width, 
            textAlign: columna.align || 'left',
            verticalAlign: 'middle'
          }}>
            {columna.render ? columna.render(flujo) : (
              <Text size="sm">
                {flujo[columna.key as keyof FlujoCorreoResponse]?.toString() || '-'}
              </Text>
            )}
          </Table.Td>
        ))}
      </Table.Tr>
    );
  };

  // Obtener flujos actuales para mostrar
  const flujosActuales = flujosCorreoPaginated?.content || flujosCorreo;

  if (loading && flujosActuales.length === 0) {
    return (
      <Center style={{ minHeight: '400px' }}>
        <Stack align="center" gap="md">
          <Loader size="xl" variant="dots" />
          <Text c="dimmed">Cargando flujos de correo...</Text>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return (
      <Alert
        color="red"
        title="Error al cargar flujos"
        icon={<IconX size={20} />}
      >
        <Stack gap="xs">
          <Text>{error}</Text>
          <Group>
            <Button
              variant="light"
              color="blue"
              size="sm"
              leftSection={<IconRefresh size={14} />}
              onClick={cargarDatosIniciales}
            >
              Reintentar
            </Button>
            <Button
              variant="subtle"
              color="gray"
              size="sm"
              onClick={clearError}
            >
              Limpiar error
            </Button>
          </Group>
        </Stack>
      </Alert>
    );
  }

  return (
    <Stack gap="xl">
      {/* Header */}
      <Paper p="md" radius="md" withBorder>
        <Group justify="space-between" align="flex-start">
          <div>
            <Title order={2}>Gestión de Flujos de Correo</Title>
            <Text c="dimmed" size="sm">
              Seguimiento y gestión del flujo de trabajo de correos
            </Text>
          </div>
          
          <Group>
            <Badge 
              size="lg" 
              variant="filled" 
              color="blue"
              leftSection={<IconMail size={14} />}
            >
              {flujosCorreoPaginated?.totalElements || flujosCorreo.length} flujos
            </Badge>
            
            <Button
              variant="light"
              color="blue"
              leftSection={<IconRefresh size={16} />}
              onClick={cargarDatosIniciales}
              loading={loading}
            >
              Actualizar
            </Button>
          </Group>
        </Group>
      </Paper>

      {/* Controles */}
      <Paper p="md" withBorder radius="md">
        <Stack gap="md">
          <Group justify="space-between">
            <Group>
              <TextInput
                placeholder="Buscar en flujos..."
                leftSection={<IconSearch size={16} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                style={{ width: '300px' }}
              />
              
              <Button
                variant="light"
                leftSection={<IconFilter size={16} />}
                rightSection={showFiltros ? <IconChevronDown size={16} /> : <IconChevronDown size={16} style={{ transform: 'rotate(-90deg)' }} />}
                onClick={() => setShowFiltros(!showFiltros)}
              >
                Filtros
              </Button>
            </Group>
            
            <Group>
              <Select
                value={sortField}
                onChange={(value) => value && setSortField(value)}
                data={sortOptions}
                leftSection={sortDirection === 'ASC' ? <IconSortAscending size={16} /> : <IconSortDescending size={16} />}
                style={{ width: '200px' }}
              />
              
              <ActionIcon
                variant="light"
                color="blue"
                size="lg"
                onClick={() => setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC')}
              >
                {sortDirection === 'ASC' ? (
                  <IconSortZA size={18} />
                ) : (
                  <IconSortAZ size={18} />
                )}
              </ActionIcon>
              
              <Button.Group>
                <Button
                  variant={viewMode === 'list' ? 'filled' : 'light'}
                  onClick={() => setViewMode('list')}
                >
                  <IconList size={16} />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'filled' : 'light'}
                  onClick={() => setViewMode('grid')}
                >
                  <IconLayoutGrid size={16} />
                </Button>
              </Button.Group>
            </Group>
          </Group>
          
          {/* Filtros avanzados */}
          {showFiltros && (
            <>
              <Divider />
              <Group>
                <Select
                  label="Filtrar por etapa"
                  placeholder="Todas las etapas"
                  data={etapasOptions}
                  value={filtroEtapa}
                  onChange={setFiltroEtapa}
                  clearable
                  style={{ width: '200px' }}
                />
                
                <Select
                  label="Filtrar por estado"
                  placeholder="Todos los estados"
                  data={estadoOptions}
                  value={activeTab === 'activos' ? 'true' : activeTab === 'completados' ? 'false' : null}
                  onChange={(value) => {
                    if (value === 'true') setActiveTab('activos');
                    else if (value === 'false') setActiveTab('completados');
                    else setActiveTab('todos');
                  }}
                  clearable
                  style={{ width: '200px' }}
                />
                
                <Button
                  variant="light"
                  color="blue"
                  onClick={handleAplicarFiltros}
                  loading={loading}
                >
                  Aplicar filtros
                </Button>
                
                <Button
                  variant="subtle"
                  color="gray"
                  onClick={handleLimpiarFiltros}
                >
                  Limpiar filtros
                </Button>
              </Group>
            </>
          )}
          
          <Divider />
          
          {/* Tabs */}
          <Tabs value={activeTab} onChange={(value) => handleTabChange(value || 'todos')}>
            <Tabs.List>
              <Tabs.Tab 
                value="todos" 
                leftSection={<IconList size={14} />}
                rightSection={
                  <Badge size="sm" variant="light">
                    {flujosCorreoPaginated?.totalElements || flujosCorreo.length}
                  </Badge>
                }
              >
                Todos
              </Tabs.Tab>
              <Tabs.Tab 
                value="activos" 
                leftSection={<IconPlayerPlay size={14} />}
                rightSection={
                  <Badge size="sm" variant="light" color="green">
                    {flujosCorreo.filter(f => esFlujoActivo(f)).length}
                  </Badge>
                }
              >
                Activos
              </Tabs.Tab>
              <Tabs.Tab 
                value="completados" 
                leftSection={<IconCheck size={14} />}
                rightSection={
                  <Badge size="sm" variant="light" color="gray">
                    {flujosCorreo.filter(f => !esFlujoActivo(f)).length}
                  </Badge>
                }
              >
                Completados
              </Tabs.Tab>
              <Tabs.Tab 
                value="sinAsignar" 
                leftSection={<IconUserPlus size={14} />}
                rightSection={
                  <Badge size="sm" variant="light" color="yellow">
                    {flujosCorreo.filter(f => !f.usuario_id).length}
                  </Badge>
                }
              >
                Sin asignar
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Stack>
      </Paper>

      {/* Acciones en lote */}
      {selectedFlujos.length > 0 && (
        <Paper p="md" withBorder radius="md">
          <Group justify="space-between">
            <Group gap="xs">
              <Badge size="lg" variant="filled" color="blue">
                {selectedFlujos.length} seleccionado(s)
              </Badge>
              <Text size="sm" c="dimmed">
                Acciones disponibles para los flujos seleccionados
              </Text>
            </Group>
            
            <Group>
              <Button
                variant="light"
                color="orange"
                leftSection={<IconCheck size={16} />}
                disabled={selectedFlujos.length === 0}
              >
                Finalizar etapa
              </Button>
              
              <Button
                variant="light"
                color="violet"
                leftSection={<IconExchange size={16} />}
                disabled={selectedFlujos.length === 0}
              >
                Reasignar
              </Button>
              
              <Button
                variant="light"
                color="red"
                leftSection={<IconTrash size={16} />}
                disabled={selectedFlujos.length === 0}
              >
                Eliminar
              </Button>
            </Group>
          </Group>
        </Paper>
      )}

      {/* Tabla de flujos */}
      <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
        <ScrollArea>
          <Table 
            verticalSpacing="sm" 
            horizontalSpacing="md"
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
              {flujosActuales.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={columnas.length}>
                    <Center py="xl">
                      <Stack align="center" gap="md">
                        <ThemeIcon size={48} radius="md" variant="light" color="gray">
                          <IconMail size={24} />
                        </ThemeIcon>
                        <Text c="dimmed">No se encontraron flujos de correo</Text>
                        <Text size="sm" c="dimmed">Intenta ajustar los filtros de búsqueda</Text>
                      </Stack>
                    </Center>
                  </Table.Td>
                </Table.Tr>
              ) : (
                flujosActuales.map(flujo => renderRow(flujo))
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Paper>

      {/* Paginación */}
      {flujosCorreoPaginated && flujosCorreoPaginated.totalPages > 1 && (
        <Paper p="md" withBorder radius="md">
          <Group justify="space-between">
            <Group>
              <Text size="sm" c="dimmed">
                Página {flujosCorreoPaginated.number + 1} de {flujosCorreoPaginated.totalPages}
              </Text>
              <Text size="sm" c="dimmed">
                • {flujosCorreoPaginated.totalElements} flujos en total
              </Text>
            </Group>
            
            <Group>
              <Select
                value={pageSize.toString()}
                onChange={(value) => {
                  setPageSize(parseInt(value || '20'));
                  setCurrentPage(1);
                }}
                data={pageSizeOptions}
                style={{ width: '150px' }}
              />
              
              <Pagination
                value={flujosCorreoPaginated.number + 1}
                onChange={(page) => {
                  setCurrentPage(page);
                  buscarFlujosCorreo({
                    pagina: page - 1,
                    tamano: pageSize,
                    ordenarPor: sortField,
                    direccion: sortDirection
                  });
                }}
                total={flujosCorreoPaginated.totalPages}
                siblings={1}
                boundaries={1}
              />
            </Group>
          </Group>
        </Paper>
      )}

      {/* Estadísticas */}
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Paper p="md" withBorder radius="md">
            <Group justify="space-between">
              <div>
                <Text size="sm" c="dimmed">Flujos activos</Text>
                <Text size="xl" fw={700} c="green">
                  {flujosCorreo.filter(f => esFlujoActivo(f)).length}
                </Text>
                <Text size="sm" c="dimmed">en progreso</Text>
              </div>
              <ThemeIcon size="lg" radius="md" variant="light" color="green">
                <IconPlayerPlay size={20} />
              </ThemeIcon>
            </Group>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Paper p="md" withBorder radius="md">
            <Group justify="space-between">
              <div>
                <Text size="sm" c="dimmed">Flujos finalizados</Text>
                <Text size="xl" fw={700} c="gray">
                  {flujosCorreo.filter(f => !esFlujoActivo(f)).length}
                </Text>
                <Text size="sm" c="dimmed">completados</Text>
              </div>
              <ThemeIcon size="lg" radius="md" variant="light" color="gray">
                <IconPlayerStop size={20} />
              </ThemeIcon>
            </Group>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Paper p="md" withBorder radius="md">
            <Group justify="space-between">
              <div>
                <Text size="sm" c="dimmed">Sin asignar</Text>
                <Text size="xl" fw={700} c="yellow">
                  {flujosCorreo.filter(f => !f.usuario_id).length}
                </Text>
                <Text size="sm" c="dimmed">pendientes de asignación</Text>
              </div>
              <ThemeIcon size="lg" radius="md" variant="light" color="yellow">
                <IconUserPlus size={20} />
              </ThemeIcon>
            </Group>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Paper p="md" withBorder radius="md">
            <Group justify="space-between">
              <div>
                <Text size="sm" c="dimmed">Total etapas</Text>
                <Text size="xl" fw={700}>
                  {new Set(flujosCorreo.map(f => f.etapa)).size}
                </Text>
                <Text size="sm" c="dimmed">etapas diferentes</Text>
              </div>
              <ThemeIcon size="lg" radius="md" variant="light" color="blue">
                <IconChartBar size={20} />
              </ThemeIcon>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Modal de detalles */}
      <Modal
        opened={modalDetalleOpen}
        onClose={() => setModalDetalleOpen(false)}
        title={
          <Group gap="xs">
            <IconMail size={20} />
            <Text fw={600}>Detalles del Flujo</Text>
          </Group>
        }
        size="lg"
        radius="md"
      >
        {flujoSeleccionado && (
          <Stack gap="md">
            <Paper p="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text fw={600} size="lg">Flujo #{flujoSeleccionado.id}</Text>
                  <Group gap="xs" mt={4}>
                    {renderEstado(flujoSeleccionado)}
                    {renderEtapa(flujoSeleccionado)}
                  </Group>
                </div>
                <CopyButton value={flujoSeleccionado.id.toString()}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? 'Copiado!' : 'Copiar ID'}>
                      <ActionIcon variant="subtle" onClick={copy}>
                        {copied ? <IconCheckCopy size={16} /> : <IconCopy size={16} />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </Group>
            </Paper>

            <Grid gutter="md">
              <Grid.Col span={6}>
                <Paper p="md" withBorder>
                  <Text fw={600} mb="xs">Información del Flujo</Text>
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text size="sm" c="dimmed">Fecha asignación:</Text>
                      <Text size="sm" fw={500}>{formatFecha(flujoSeleccionado.fecha_asignacion)}</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm" c="dimmed">Fecha finalización:</Text>
                      <Text size="sm" fw={500}>{formatFecha(flujoSeleccionado.fecha_finalizacion)}</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm" c="dimmed">Duración:</Text>
                      <Text size="sm" fw={500}>{renderTiempoDuracion(flujoSeleccionado)}</Text>
                    </Group>
                  </Stack>
                </Paper>
              </Grid.Col>

              <Grid.Col span={6}>
                <Paper p="md" withBorder>
                  <Text fw={600} mb="xs">Usuario Asignado</Text>
                  {flujoSeleccionado.usuario ? (
                    <Stack gap="xs">
                      <Text fw={500}>
                        {flujoSeleccionado.usuario.nombres} {flujoSeleccionado.usuario.apellidos}
                      </Text>
                      <Text size="sm" c="dimmed">{flujoSeleccionado.usuario.correo}</Text>
                      <Badge
                        color={flujoSeleccionado.usuario.activo ? 'green' : 'red'}
                        variant="light"
                        size="sm"
                      >
                        {flujoSeleccionado.usuario.activo ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </Stack>
                  ) : (
                    <Text c="dimmed">No asignado</Text>
                  )}
                </Paper>
              </Grid.Col>

              {flujoSeleccionado.correo && (
                <Grid.Col span={12}>
                  <Paper p="md" withBorder>
                    <Text fw={600} mb="xs">Información del Correo</Text>
                    <Stack gap="xs">
                      <Text fw={500}>{flujoSeleccionado.correo.asunto}</Text>
                      <Text size="sm" c="dimmed">ID: {flujoSeleccionado.correo.correo_id}</Text>
                      <Group justify="space-between">
                        <Badge
                          color={flujoSeleccionado.correo.estado === 'RESPONDIDO' ? 'green' : 
                                 flujoSeleccionado.correo.estado === 'VENCIDO' ? 'red' : 'yellow'}
                          variant="light"
                        >
                          {flujoSeleccionado.correo.estado}
                        </Badge>
                        {flujoSeleccionado.correo.urgencia && (
                          <Badge
                            color={flujoSeleccionado.correo.urgencia === 'ALTA' ? 'red' : 
                                   flujoSeleccionado.correo.urgencia === 'MEDIA' ? 'orange' : 'yellow'}
                            variant="light"
                          >
                            {flujoSeleccionado.correo.urgencia}
                          </Badge>
                        )}
                      </Group>
                    </Stack>
                  </Paper>
                </Grid.Col>
              )}
            </Grid>

            <Group justify="flex-end">
              <Button
                variant="light"
                onClick={() => setModalDetalleOpen(false)}
              >
                Cerrar
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>

      {/* Modal para asignar/reasignar */}
      <Modal
        opened={modalAsignarOpen}
        onClose={() => setModalAsignarOpen(false)}
        title="Asignar Usuario"
        size="md"
      >
        <Stack gap="md">
          <Text>Asignar usuario al flujo #{flujoSeleccionado?.id}</Text>
          <Select
            label="Seleccionar usuario"
            placeholder="Buscar usuario..."
            data={[]}
            searchable
          />
          <Group justify="flex-end">
            <Button variant="subtle" onClick={() => setModalAsignarOpen(false)}>
              Cancelar
            </Button>
            <Button color="blue">
              Asignar
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Modal para finalizar etapa */}
      <Modal
        opened={modalFinalizarOpen}
        onClose={() => setModalFinalizarOpen(false)}
        title="Finalizar Etapa"
        size="md"
      >
        <Stack gap="md">
          <Text>¿Está seguro de finalizar la etapa actual del flujo #{flujoSeleccionado?.id}?</Text>
          <Group justify="flex-end">
            <Button variant="subtle" onClick={() => setModalFinalizarOpen(false)}>
              Cancelar
            </Button>
            <Button color="orange">
              Finalizar Etapa
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default FlujoCorreoPage;