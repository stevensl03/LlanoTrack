// pages/ListaCorreosPage.tsx
import React, { useState, useCallback, useMemo } from 'react';
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
  Tabs,
  Modal,
  Center
} from '@mantine/core';
import {
  IconSearch,
  IconFilter,
  IconSortAscending,
  IconSortDescending,
  IconRefresh,
  IconDownload,
  IconPrinter,
  IconMail,
  IconList,
  IconLayoutGrid,
  IconEye,
  IconEdit,
  IconTrash,
  IconColumns,
  IconSettings,
  IconChevronDown,
  IconCheck,
  IconX,
  IconAdjustmentsHorizontal
} from '@tabler/icons-react';
import { useDashboard } from '../../../shared/hooks/useDashboard';
import CorreosTable from '../components/correos/CorreosTable';
import BulkActions from '../components/correos/BulkActions';
import CorreoDetailModal from '../components/correos/CorreoDetailModal';
import type { CorreoFiltradoDTO } from '../../../shared/types/dashboardTypes';

// Tipos para configuración de vista
type ViewMode = 'list' | 'grid';
type SortField = 'fechaRecepcion' | 'asunto' | 'estado' | 'urgencia' | 'cuenta.nombre';
type SortDirection = 'asc' | 'desc';

interface ColumnVisibility {
  asunto: boolean;
  estado: boolean;
  urgencia: boolean;
  remitente: boolean;
  fecha: boolean;
  tiempo: boolean;
  gestor: boolean;
  acciones: boolean;
}

const ListaCorreosPage: React.FC = () => {
  const {
    correosFiltrados,
    filtrosAplicados,
    paginacion,
    loading,
    error,
    aplicarFiltros,
    limpiarFiltros,
    cargarDashboard
  } = useDashboard();

  // Estados locales
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('fechaRecepcion');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedCorreos, setSelectedCorreos] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState(20);
  const [detalleCorreo, setDetalleCorreo] = useState<CorreoFiltradoDTO | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    asunto: true,
    estado: true,
    urgencia: true,
    remitente: true,
    fecha: true,
    tiempo: true,
    gestor: true,
    acciones: true
  });

  // Filtrar correos por búsqueda
  const filteredCorreos = useMemo(() => {
    if (!searchQuery.trim()) return correosFiltrados;

    const query = searchQuery.toLowerCase();
    return correosFiltrados.filter(correo => {
      return (
        correo.asunto.toLowerCase().includes(query) ||
        correo.cuenta?.nombre.toLowerCase().includes(query) ||
        correo.cuenta?.correo.toLowerCase().includes(query) ||
        correo.id.toLowerCase().includes(query) ||
        correo.tipoSolicitud?.nombre.toLowerCase().includes(query) ||
        correo.flujos.some(flujo => 
          flujo.nombreUsuario.toLowerCase().includes(query)
        )
      );
    });
  }, [correosFiltrados, searchQuery]);

  // Ordenar correos
  const sortedCorreos = useMemo(() => {
    return [...filteredCorreos].sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortField) {
        case 'cuenta.nombre':
          aValue = a.cuenta?.nombre || '';
          bValue = b.cuenta?.nombre || '';
          break;
        default:
          aValue = a[sortField];
          bValue = b[sortField];
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredCorreos, sortField, sortDirection]);

  // Paginar correos
  const paginatedCorreos = useMemo(() => {
    if (!paginacion) return sortedCorreos;
    const startIndex = paginacion.paginaActual * pageSize;
    return sortedCorreos.slice(startIndex, startIndex + pageSize);
  }, [sortedCorreos, paginacion, pageSize]);

  // Manejar cambio de ordenamiento
  const handleSort = useCallback((field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field as SortField);
      setSortDirection('desc');
    }
  }, [sortField, sortDirection]);

  // Manejar selección de correos
  const handleSelectCorreo = useCallback((id: string) => {
    setSelectedCorreos(prev => 
      prev.includes(id) 
        ? prev.filter(correoId => correoId !== id)
        : [...prev, id]
    );
  }, []);

  // Manejar selección de todos los correos
  const handleSelectAll = useCallback(() => {
    if (selectedCorreos.length === paginatedCorreos.length) {
      setSelectedCorreos([]);
    } else {
      setSelectedCorreos(paginatedCorreos.map(correo => correo.id));
    }
  }, [paginatedCorreos, selectedCorreos.length]);

  // Manejar ver detalles
  const handleViewDetails = useCallback((correo: CorreoFiltradoDTO) => {
    setDetalleCorreo(correo);
    setIsDetailModalOpen(true);
  }, []);

  // Manejar eliminar correo
  const handleDeleteCorreo = useCallback((correo: CorreoFiltradoDTO) => {
    // TODO: Implementar lógica de eliminación
    console.log('Eliminar correo:', correo.id);
  }, []);

  // Manejar eliminar seleccionados
  const handleDeleteSelected = useCallback(() => {
    // TODO: Implementar lógica de eliminación en lote
    console.log('Eliminar seleccionados:', selectedCorreos);
    setSelectedCorreos([]);
  }, [selectedCorreos]);

  // Manejar exportar seleccionados
  const handleExportSelected = useCallback(() => {
    // TODO: Implementar lógica de exportación
    console.log('Exportar seleccionados:', selectedCorreos);
  }, [selectedCorreos]);

  // Manejar cambio de estado
  const handleChangeStatus = useCallback((status: string) => {
    // TODO: Implementar lógica de cambio de estado en lote
    console.log('Cambiar estado a:', status, 'para:', selectedCorreos);
  }, [selectedCorreos]);

  // Manejar cambio de página
  const handlePageChange = useCallback((page: number) => {
    if (paginacion) {
      aplicarFiltros(filtrosAplicados || {}, page - 1, pageSize);
    }
  }, [paginacion, aplicarFiltros, filtrosAplicados, pageSize]);

  // Manejar cambio de tamaño de página
  const handlePageSizeChange = useCallback((size: string) => {
    const newSize = parseInt(size);
    setPageSize(newSize);
    setSelectedCorreos([]); // Limpiar selección al cambiar página
  }, []);

  // Opciones de tamaño de página
  const pageSizeOptions = [
    { value: '10', label: '10 por página' },
    { value: '20', label: '20 por página' },
    { value: '50', label: '50 por página' },
    { value: '100', label: '100 por página' }
  ];

  // Opciones de ordenamiento
  const sortOptions = [
    { value: 'fechaRecepcion', label: 'Fecha recepción' },
    { value: 'asunto', label: 'Asunto' },
    { value: 'estado', label: 'Estado' },
    { value: 'urgencia', label: 'Urgencia' },
    { value: 'cuenta.nombre', label: 'Remitente' }
  ];

  if (loading && correosFiltrados.length === 0) {
    return (
      <Center style={{ minHeight: '400px' }}>
        <Stack align="center" gap="md">
          <Loader size="xl" variant="dots" />
          <Text c="dimmed">Cargando correos...</Text>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return (
      <Alert
        color="red"
        title="Error al cargar correos"
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
              onClick={cargarDashboard}
            >
              Reintentar
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
            <Title order={2}>Lista de Correos</Title>
            <Text c="dimmed" size="sm">
              Gestión y visualización de correos del sistema
            </Text>
          </div>
          
          <Group>
            <Badge 
              size="lg" 
              variant="filled" 
              color="blue"
              leftSection={<IconMail size={14} />}
            >
              {paginacion?.totalElementos || 0} correos
            </Badge>
            
            <Button
              variant="light"
              color="blue"
              leftSection={<IconRefresh size={16} />}
              onClick={cargarDashboard}
              loading={loading}
            >
              Actualizar
            </Button>
          </Group>
        </Group>
      </Paper>

      {/* Controles de búsqueda y filtros */}
      <Paper p="md" withBorder radius="md">
        <Stack gap="md">
          <Group justify="space-between">
            <TextInput
              placeholder="Buscar en correos..."
              leftSection={<IconSearch size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              style={{ flex: 1, maxWidth: '400px' }}
            />
            
            <Group>
              <Select
                value={sortField}
                onChange={(value) => value && setSortField(value as SortField)}
                data={sortOptions}
                leftSection={<IconSortAscending size={16} />}
                style={{ width: '200px' }}
              />
              
              <ActionIcon
                variant="light"
                color="blue"
                size="lg"
                onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              >
                {sortDirection === 'asc' ? (
                  <IconSortAscending size={18} />
                ) : (
                  <IconSortDescending size={18} />
                )}
              </ActionIcon>
              
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button
                    variant="light"
                    leftSection={<IconColumns size={16} />}
                    rightSection={<IconChevronDown size={16} />}
                  >
                    Columnas
                  </Button>
                </Menu.Target>
                
                <Menu.Dropdown>
                  <Menu.Label>Visibilidad de columnas</Menu.Label>
                  {Object.entries(columnVisibility).map(([key, visible]) => (
                    <Menu.Item
                      key={key}
                      leftSection={
                        <IconCheck 
                          size={14} 
                          color={visible ? 'green' : 'gray'} 
                          style={{ opacity: visible ? 1 : 0.3 }}
                        />
                      }
                      onClick={() => setColumnVisibility(prev => ({
                        ...prev,
                        [key]: !visible
                      }))}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
              
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
          
          <Group justify="space-between">
            <Group>
              <Badge variant="light" color="blue">
                Mostrando {paginatedCorreos.length} de {filteredCorreos.length} correos
              </Badge>
              
              {searchQuery && (
                <Badge 
                  variant="light" 
                  color="orange"
                  rightSection={
                    <ActionIcon
                      size="xs"
                      variant="transparent"
                      onClick={() => setSearchQuery('')}
                    >
                      <IconX size={12} />
                    </ActionIcon>
                  }
                >
                  Buscando: "{searchQuery}"
                </Badge>
              )}
            </Group>
            
            <Group>
              <Button
                variant="light"
                leftSection={<IconDownload size={16} />}
                onClick={handleExportSelected}
                disabled={selectedCorreos.length === 0}
              >
                Exportar
              </Button>
              
              <Button
                variant="light"
                leftSection={<IconPrinter size={16} />}
                onClick={() => window.print()}
              >
                Imprimir
              </Button>
            </Group>
          </Group>
        </Stack>
      </Paper>

      {/* Acciones en lote */}
      <BulkActions
        selectedCount={selectedCorreos.length}
        onDeleteSelected={handleDeleteSelected}
        onChangeStatus={handleChangeStatus}
        onExportSelected={handleExportSelected}
      />

      {/* Tabla de correos */}
      <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
        <CorreosTable
          correos={paginatedCorreos}
          loading={loading}
          onViewDetails={handleViewDetails}
          onDelete={handleDeleteCorreo}
          selectedCorreos={selectedCorreos}
          onSelectCorreo={handleSelectCorreo}
          onSelectAll={handleSelectAll}
          sortColumn={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          showSelection={true}
        />
      </Paper>

      {/* Paginación */}
      {paginacion && paginacion.totalPaginas > 1 && (
        <Paper p="md" withBorder radius="md">
          <Group justify="space-between">
            <Group>
              <Text size="sm" c="dimmed">
                Página {paginacion.paginaActual + 1} de {paginacion.totalPaginas}
              </Text>
              <Text size="sm" c="dimmed">
                • {paginacion.totalElementos} correos en total
              </Text>
            </Group>
            
            <Group>
              <Select
                value={pageSize.toString()}
                onChange={(value) => value && handlePageSizeChange(value)}
                data={pageSizeOptions}
                style={{ width: '150px' }}
              />
              
              <Pagination
                value={paginacion.paginaActual + 1}
                onChange={handlePageChange}
                total={paginacion.totalPaginas}
                siblings={1}
                boundaries={1}
              />
            </Group>
          </Group>
        </Paper>
      )}

      {/* Modal de detalles */}
      <CorreoDetailModal
        correo={detalleCorreo}
        opened={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onEdit={() => {
          // TODO: Implementar edición
          console.log('Editar correo:', detalleCorreo?.id);
        }}
        onAssign={() => {
          // TODO: Implementar asignación
          console.log('Asignar gestor a correo:', detalleCorreo?.id);
        }}
      />

      {/* Estadísticas al final */}
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper p="md" withBorder radius="md">
            <Group justify="space-between">
              <div>
                <Text size="sm" c="dimmed">Estado actual</Text>
                <Text size="xl" fw={700}>
                  {correosFiltrados.filter(c => c.estado === 'PENDIENTE').length}
                </Text>
                <Text size="sm" c="dimmed">correos pendientes</Text>
              </div>
              <ThemeIcon size="lg" radius="md" variant="light" color="yellow">
                <IconAdjustmentsHorizontal size={20} />
              </ThemeIcon>
            </Group>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper p="md" withBorder radius="md">
            <Group justify="space-between">
              <div>
                <Text size="sm" c="dimmed">Atrasados</Text>
                <Text size="xl" fw={700} c="red">
                  {correosFiltrados.filter(c => c.estaAtrasado).length}
                </Text>
                <Text size="sm" c="dimmed">requieren atención</Text>
              </div>
              <ThemeIcon size="lg" radius="md" variant="light" color="red">
                <IconX size={20} />
              </ThemeIcon>
            </Group>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper p="md" withBorder radius="md">
            <Group justify="space-between">
              <div>
                <Text size="sm" c="dimmed">Respondidos</Text>
                <Text size="xl" fw={700} c="green">
                  {correosFiltrados.filter(c => c.estado === 'RESPONDIDO').length}
                </Text>
                <Text size="sm" c="dimmed">procesados</Text>
              </div>
              <ThemeIcon size="lg" radius="md" variant="light" color="green">
                <IconCheck size={20} />
              </ThemeIcon>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default ListaCorreosPage;