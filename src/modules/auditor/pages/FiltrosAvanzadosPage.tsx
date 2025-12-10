// pages/FiltrosAvanzadosPage.tsx
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
  Divider,
  Card,
  ActionIcon,
  ScrollArea,
  Alert,
  Loader,
  Tabs,
  Badge,
  ThemeIcon,
  Modal,
  Box
} from '@mantine/core';
import {
  IconFilter,
  IconSearch,
  IconCalendar,
  IconUser,
  IconBuilding,
  IconList,
  IconAlertCircle,
  IconTrash,
  IconSettings,
  IconPlus,
  IconCheck,
  IconRefresh,
  IconChartBar
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useDashboard } from '../../../shared/hooks/useDashboard';
import FilterSection from '../components/filtroAvanzado/FilterSection';
import AdvancedFilterChip from '../components/filtroAvanzado/AdvancedFilterChip';
import type { FilterType } from '../components/filtroAvanzado/AdvancedFilterChip';
import type {
  OpcionesFiltroResponse,
  FiltroCorreoRequestDTO,
  Gestor,
  Entidad,
  Estado,
  Urgencia,
  TipoSolicitud,
  OpcionFiltro
} from '../../../shared/types/dashboardTypes';

// Tipos para el formulario de filtros
interface FormularioFiltros {
  gestorId: string | null;
  entidadId: string | null;
  estado: string | null;
  tipoSolicitudId: string | null;
  urgencia: string | null;
  campoBusqueda: string | null;
  valorBusqueda: string;
}

// Tipo para filtro guardado
interface FiltroGuardado {
  id: string;
  nombre: string;
  descripcion?: string;
  valores: Partial<FormularioFiltros>;
  fechaCreacion: Date;
  aplicaciones: number;
  esPredeterminado?: boolean;
}

// Tipo para estadísticas de filtros
interface EstadisticasFiltros {
  totalFiltrosAplicados: number;
  filtrosActivos: Array<{
    tipo: FilterType;
    label: string;
    value: string;
    color: string;
  }>;
  correosFiltrados: number;
  porcentajeDelTotal: number;
  tiempoEstimadoRespuesta: number;
}

const FiltrosAvanzadosPage: React.FC = () => {
  const {
    opcionesFiltro,
    filtrosAplicados,
    aplicarFiltros,
    limpiarFiltros,
    correosFiltrados,
    paginacion,
    loading,
    error
  } = useDashboard();

  const [filtrosGuardados, setFiltrosGuardados] = useState<FiltroGuardado[]>([
    {
      id: 'default-1',
      nombre: 'Correos vencidos urgentes',
      descripcion: 'Filtra correos vencidos con urgencia alta',
      valores: {
        estado: 'VENCIDO',
        urgencia: 'ALTA'
      },
      fechaCreacion: new Date(Date.now() - 86400000),
      aplicaciones: 15,
      esPredeterminado: true
    },
    {
      id: 'default-2',
      nombre: 'Correos pendientes',
      descripcion: 'Correos pendientes sin asignar',
      valores: {
        estado: 'PENDIENTE'
      },
      fechaCreacion: new Date(Date.now() - 172800000),
      aplicaciones: 8,
      esPredeterminado: true
    }
  ]);

  const [seccionesExpandidas, setSeccionesExpandidas] = useState({
    basicos: true,
    guardados: true
  });

  const [modalGuardarAbierto, setModalGuardarAbierto] = useState(false);
  const [nombreFiltro, setNombreFiltro] = useState('');
  const [descripcionFiltro, setDescripcionFiltro] = useState('');
  const [tabActivo, setTabActivo] = useState<'activos' | 'guardados' | 'estadisticas'>('activos');

  // Inicializar formulario
  const form = useForm<FormularioFiltros>({
    initialValues: {
      gestorId: filtrosAplicados?.gestorId?.toString() || null,
      entidadId: filtrosAplicados?.entidadId?.toString() || null,
      estado: filtrosAplicados?.estado || null,
      tipoSolicitudId: filtrosAplicados?.tipoSolicitudId?.toString() || null,
      urgencia: filtrosAplicados?.urgencia || null,
      campoBusqueda: filtrosAplicados?.campoBusqueda || null,
      valorBusqueda: filtrosAplicados?.valorBusqueda || ''
    }
  });

  // Calcular estadísticas de filtros
  const estadisticasFiltros = useMemo((): EstadisticasFiltros => {
    const filtrosActivos: Array<{
      tipo: FilterType;
      label: string;
      value: string;
      color: string;
    }> = [];

    if (form.values.gestorId) {
      const gestor = opcionesFiltro?.gestores.find(g => g.id?.toString() === form.values.gestorId);
      if (gestor) {
        filtrosActivos.push({
          tipo: 'gestor',
          label: 'Gestor',
          value: gestor.nombre,
          color: 'blue'
        });
      }
    }

    if (form.values.entidadId) {
      const entidad = opcionesFiltro?.entidades.find(e => e.id?.toString() === form.values.entidadId);
      if (entidad) {
        filtrosActivos.push({
          tipo: 'entidad',
          label: 'Entidad',
          value: entidad.nombre,
          color: 'green'
        });
      }
    }

    if (form.values.estado) {
      const estado = opcionesFiltro?.estados.find(e => e.id === form.values.estado);
      filtrosActivos.push({
        tipo: 'estado',
        label: 'Estado',
        value: estado?.nombre || form.values.estado,
        color: form.values.estado === 'VENCIDO' ? 'red' : 'yellow'
      });
    }

    if (form.values.urgencia) {
      const urgencia = opcionesFiltro?.urgencias.find(u => u.id === form.values.urgencia);
      filtrosActivos.push({
        tipo: 'urgencia',
        label: 'Urgencia',
        value: urgencia?.nombre || form.values.urgencia,
        color: form.values.urgencia === 'ALTA' ? 'red' : 'orange'
      });
    }

    if (form.values.valorBusqueda) {
      filtrosActivos.push({
        tipo: 'busqueda',
        label: form.values.campoBusqueda || 'Búsqueda',
        value: form.values.valorBusqueda,
        color: 'cyan'
      });
    }

    const totalFiltrosAplicados = filtrosActivos.length;
    const correosFiltradosCount = correosFiltrados.length;
    const porcentajeDelTotal = paginacion?.totalElementos ? (correosFiltradosCount / paginacion.totalElementos) * 100 : 0;

    return {
      totalFiltrosAplicados,
      filtrosActivos,
      correosFiltrados: correosFiltradosCount,
      porcentajeDelTotal,
      tiempoEstimadoRespuesta: Math.max(1, Math.ceil(correosFiltradosCount / 50))
    };
  }, [form.values, opcionesFiltro, correosFiltrados, paginacion]);

  // Manejar envío del formulario
  const handleSubmit = useCallback((values: FormularioFiltros) => {
    const filtros: FiltroCorreoRequestDTO = {
      gestorId: values.gestorId ? parseInt(values.gestorId) : undefined,
      entidadId: values.entidadId ? parseInt(values.entidadId) : undefined,
      estado: values.estado || undefined,
      tipoSolicitudId: values.tipoSolicitudId ? parseInt(values.tipoSolicitudId) : undefined,
      urgencia: values.urgencia || undefined,
      campoBusqueda: values.campoBusqueda || undefined,
      valorBusqueda: values.valorBusqueda || undefined
    };

    aplicarFiltros(filtros);
  }, [aplicarFiltros]);

  // Limpiar filtros
  const handleLimpiarFiltros = useCallback(() => {
    form.reset();
    limpiarFiltros();
    // Enviar filtros vacíos para actualizar la vista
    aplicarFiltros({});
  }, [form, limpiarFiltros, aplicarFiltros]);

  // Guardar filtro actual
  const handleGuardarFiltro = useCallback(() => {
    if (!nombreFiltro.trim()) {
      return;
    }

    const nuevoFiltro: FiltroGuardado = {
      id: Date.now().toString(),
      nombre: nombreFiltro,
      descripcion: descripcionFiltro,
      valores: form.values,
      fechaCreacion: new Date(),
      aplicaciones: 0
    };

    setFiltrosGuardados(prev => [...prev, nuevoFiltro]);
    setNombreFiltro('');
    setDescripcionFiltro('');
    setModalGuardarAbierto(false);
  }, [nombreFiltro, descripcionFiltro, form.values]);

  // Aplicar filtro guardado
  const handleAplicarFiltroGuardado = useCallback((filtro: FiltroGuardado) => {
    form.setValues(filtro.valores as FormularioFiltros);
    
    setFiltrosGuardados(prev => 
      prev.map(f => 
        f.id === filtro.id 
          ? { ...f, aplicaciones: f.aplicaciones + 1 }
          : f
      )
    );

    const valoresParaEnviar: FiltroCorreoRequestDTO = {
      gestorId: filtro.valores.gestorId ? parseInt(filtro.valores.gestorId!) : undefined,
      entidadId: filtro.valores.entidadId ? parseInt(filtro.valores.entidadId!) : undefined,
      estado: filtro.valores.estado || undefined,
      tipoSolicitudId: filtro.valores.tipoSolicitudId ? parseInt(filtro.valores.tipoSolicitudId!) : undefined,
      urgencia: filtro.valores.urgencia || undefined,
      campoBusqueda: filtro.valores.campoBusqueda || undefined,
      valorBusqueda: filtro.valores.valorBusqueda || undefined
    };

    aplicarFiltros(valoresParaEnviar);
  }, [form, aplicarFiltros]);

  // Eliminar filtro guardado
  const handleEliminarFiltroGuardado = useCallback((id: string) => {
    setFiltrosGuardados(prev => prev.filter(f => f.id !== id));
  }, []);

  // Alternar sección expandida
  const toggleSeccion = useCallback((seccion: keyof typeof seccionesExpandidas) => {
    setSeccionesExpandidas(prev => ({
      ...prev,
      [seccion]: !prev[seccion]
    }));
  }, []);

  // Opciones para selectores
  const getOpcionesSelect = useCallback((opciones: OpcionFiltro[] | undefined) => {
    if (!opciones) return [];
    return opciones.map(opcion => ({
      value: opcion.id?.toString() || '',
      label: opcion.nombre,
      disabled: opcion.id === null
    }));
  }, []);

  if (loading && !opcionesFiltro) {
    return (
      <Stack align="center" justify="center" style={{ minHeight: '400px' }}>
        <Loader size="xl" variant="dots" />
        <Text c="dimmed" mt="md">Cargando opciones de filtro...</Text>
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert
        color="red"
        title="Error al cargar filtros"
        icon={<IconAlertCircle size={20} />}
        style={{ marginTop: '20px' }}
      >
        <Stack gap="xs">
          <Text>{error}</Text>
          <Button
            variant="light"
            color="blue"
            size="sm"
            leftSection={<IconRefresh size={14} />}
            onClick={() => window.location.reload()}
          >
            Recargar página
          </Button>
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
            <Title order={2}>Filtros Avanzados</Title>
            <Text c="dimmed" size="sm">
              Configura filtros detallados para encontrar correos específicos
            </Text>
          </div>
          
          <Group>
            <Badge 
              size="lg" 
              variant="filled" 
              color={estadisticasFiltros.totalFiltrosAplicados > 0 ? "blue" : "gray"}
            >
              {estadisticasFiltros.totalFiltrosAplicados} filtro(s) activo(s)
            </Badge>
            
            <Button
              variant="light"
              color="red"
              leftSection={<IconTrash size={16} />}
              onClick={handleLimpiarFiltros}
              disabled={estadisticasFiltros.totalFiltrosAplicados === 0}
            >
              Limpiar todo
            </Button>
          </Group>
        </Group>
      </Paper>

      {/* Tabs principales */}
      <Tabs value={tabActivo} onChange={(value) => setTabActivo(value as any)}>
        <Tabs.List>
          <Tabs.Tab 
            value="activos" 
            leftSection={<IconFilter size={16} />}
            rightSection={
              estadisticasFiltros.totalFiltrosAplicados > 0 && (
                <Badge size="sm" circle variant="filled">
                  {estadisticasFiltros.totalFiltrosAplicados}
                </Badge>
              )
            }
          >
            Filtros Activos
          </Tabs.Tab>
          <Tabs.Tab 
            value="guardados" 
            leftSection={<IconSettings size={16} />}
            rightSection={
              filtrosGuardados.length > 0 && (
                <Badge size="sm" circle variant="filled">
                  {filtrosGuardados.length}
                </Badge>
              )
            }
          >
            Filtros Guardados
          </Tabs.Tab>
          <Tabs.Tab 
            value="estadisticas" 
            leftSection={<IconChartBar size={16} />}
          >
            Estadísticas
          </Tabs.Tab>
        </Tabs.List>

        {/* Tab: Filtros Activos */}
        <Tabs.Panel value="activos" pt="md">
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, lg: 8 }}>
              <Stack gap="md">
                {/* Sección de Filtros Básicos */}
                <FilterSection
                  title="Filtros Básicos"
                  icon={<IconFilter size={20} />}
                  isExpanded={seccionesExpandidas.basicos}
                  onToggle={() => toggleSeccion('basicos')}
                  badgeCount={estadisticasFiltros.totalFiltrosAplicados}
                  description="Filtros principales para búsqueda de correos"
                >
                  <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack gap="md">
                      <Grid gutter="md">
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Select
                            label="Gestor"
                            placeholder="Seleccionar gestor"
                            data={getOpcionesSelect(opcionesFiltro?.gestores)}
                            leftSection={<IconUser size={16} />}
                            clearable
                            searchable
                            {...form.getInputProps('gestorId')}
                          />
                        </Grid.Col>
                        
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Select
                            label="Entidad"
                            placeholder="Seleccionar entidad"
                            data={getOpcionesSelect(opcionesFiltro?.entidades)}
                            leftSection={<IconBuilding size={16} />}
                            clearable
                            searchable
                            {...form.getInputProps('entidadId')}
                          />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Select
                            label="Estado"
                            placeholder="Seleccionar estado"
                            data={getOpcionesSelect(opcionesFiltro?.estados)}
                            leftSection={<IconAlertCircle size={16} />}
                            clearable
                            {...form.getInputProps('estado')}
                          />
                        </Grid.Col>
                        
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Select
                            label="Urgencia"
                            placeholder="Seleccionar urgencia"
                            data={getOpcionesSelect(opcionesFiltro?.urgencias)}
                            leftSection={<IconAlertCircle size={16} />}
                            clearable
                            {...form.getInputProps('urgencia')}
                          />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Select
                            label="Tipo de Solicitud"
                            placeholder="Seleccionar tipo"
                            data={getOpcionesSelect(opcionesFiltro?.tiposSolicitud)}
                            leftSection={<IconList size={16} />}
                            clearable
                            {...form.getInputProps('tipoSolicitudId')}
                          />
                        </Grid.Col>
                        
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Select
                            label="Campo de Búsqueda"
                            placeholder="Seleccionar campo"
                            data={opcionesFiltro?.camposBusqueda.map(campo => ({
                              value: campo,
                              label: campo
                            }))}
                            leftSection={<IconSearch size={16} />}
                            clearable
                            {...form.getInputProps('campoBusqueda')}
                          />
                        </Grid.Col>

                        <Grid.Col span={12}>
                          <TextInput
                            label="Valor de Búsqueda"
                            placeholder="Ingrese texto para buscar..."
                            leftSection={<IconSearch size={16} />}
                            {...form.getInputProps('valorBusqueda')}
                          />
                        </Grid.Col>
                      </Grid>

                      <Divider />
                      
                      <Group justify="flex-end">
                        <Button
                          type="submit"
                          leftSection={<IconFilter size={16} />}
                          color="blue"
                          loading={loading}
                        >
                          Aplicar Filtros
                        </Button>
                        
                        <Button
                          variant="light"
                          leftSection={<IconPlus size={16} />}
                          onClick={() => setModalGuardarAbierto(true)}
                        >
                          Guardar Filtro
                        </Button>
                      </Group>
                    </Stack>
                  </form>
                </FilterSection>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 4 }}>
              {/* Panel de Filtros Activos */}
              <Card withBorder radius="md" h="100%">
                <Group justify="space-between" mb="md">
                  <Text fw={600} size="lg">Filtros Aplicados</Text>
                  <Badge color="blue" variant="light">
                    {estadisticasFiltros.totalFiltrosAplicados}
                  </Badge>
                </Group>
                
                <ScrollArea h={300}>
                  <Stack gap="xs">
                    {estadisticasFiltros.filtrosActivos.length === 0 ? (
                      <Text c="dimmed" ta="center" py="xl">
                        No hay filtros aplicados
                      </Text>
                    ) : (
                      estadisticasFiltros.filtrosActivos.map((filtro, index) => (
                        <AdvancedFilterChip
                          key={index}
                          type={filtro.tipo}
                          label={filtro.label}
                          value={filtro.value}
                          color={filtro.color}
                          onRemove={() => {
                            switch (filtro.tipo) {
                              case 'gestor':
                                form.setFieldValue('gestorId', null);
                                break;
                              case 'entidad':
                                form.setFieldValue('entidadId', null);
                                break;
                              case 'estado':
                                form.setFieldValue('estado', null);
                                break;
                              case 'urgencia':
                                form.setFieldValue('urgencia', null);
                                break;
                              case 'busqueda':
                                form.setFieldValue('valorBusqueda', '');
                                break;
                            }
                          }}
                        />
                      ))
                    )}
                  </Stack>
                </ScrollArea>
                
                <Divider my="md" />
                
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Correos encontrados:</Text>
                    <Text fw={600}>{estadisticasFiltros.correosFiltrados}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Porcentaje del total:</Text>
                    <Text fw={600}>{estadisticasFiltros.porcentajeDelTotal.toFixed(1)}%</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Tiempo estimado:</Text>
                    <Text fw={600}>{estadisticasFiltros.tiempoEstimadoRespuesta} min</Text>
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        {/* Tab: Filtros Guardados */}
        <Tabs.Panel value="guardados" pt="md">
          <Card withBorder radius="md">
            <Group justify="space-between" mb="md">
              <div>
                <Title order={4}>Filtros Guardados</Title>
                <Text size="sm" c="dimmed">
                  Filtros predefinidos para uso rápido
                </Text>
              </div>
              
              <Button
                variant="light"
                leftSection={<IconPlus size={16} />}
                onClick={() => setModalGuardarAbierto(true)}
              >
                Guardar Filtro Actual
              </Button>
            </Group>
            
            <Grid gutter="md">
              {filtrosGuardados.map((filtro) => (
                <Grid.Col key={filtro.id} span={{ base: 12, md: 6 }}>
                  <Paper p="md" withBorder radius="sm">
                    <Group justify="space-between" mb="xs">
                      <Group gap="xs">
                        <Text fw={600}>{filtro.nombre}</Text>
                        {filtro.esPredeterminado && (
                          <Badge size="sm" color="green" variant="light">
                            Predeterminado
                          </Badge>
                        )}
                      </Group>
                      <Badge variant="light" color="blue">
                        {filtro.aplicaciones} usos
                      </Badge>
                    </Group>
                    
                    {filtro.descripcion && (
                      <Text size="sm" c="dimmed" mb="md">
                        {filtro.descripcion}
                      </Text>
                    )}
                    
                    <Group gap="xs" mb="md">
                      {Object.entries(filtro.valores).map(([key, value]) => {
                        if (!value) return null;
                        
                        let label = key;
                        
                        switch (key) {
                          case 'gestorId':
                            label = 'Gestor';
                            break;
                          case 'entidadId':
                            label = 'Entidad';
                            break;
                          case 'estado':
                            label = 'Estado';
                            break;
                          case 'urgencia':
                            label = 'Urgencia';
                            break;
                        }
                        
                        return (
                          <Badge key={key} size="xs" variant="dot" color="gray">
                            {label}: {value.toString()}
                          </Badge>
                        );
                      })}
                    </Group>
                    
                    <Group justify="space-between">
                      <Text size="xs" c="dimmed">
                        Creado: {filtro.fechaCreacion.toLocaleDateString()}
                      </Text>
                      
                      <Group gap="xs">
                        <Button
                          size="xs"
                          variant="light"
                          leftSection={<IconFilter size={12} />}
                          onClick={() => handleAplicarFiltroGuardado(filtro)}
                        >
                          Aplicar
                        </Button>
                        
                        {!filtro.esPredeterminado && (
                          <ActionIcon
                            color="red"
                            variant="subtle"
                            size="sm"
                            onClick={() => handleEliminarFiltroGuardado(filtro.id)}
                          >
                            <IconTrash size={14} />
                          </ActionIcon>
                        )}
                      </Group>
                    </Group>
                  </Paper>
                </Grid.Col>
              ))}
            </Grid>
          </Card>
        </Tabs.Panel>

        {/* Tab: Estadísticas */}
        <Tabs.Panel value="estadisticas" pt="md">
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card withBorder radius="md">
                <Group justify="center" mb="md">
                  <ThemeIcon size={60} radius="md" variant="light" color="blue">
                    <IconFilter size={30} />
                  </ThemeIcon>
                </Group>
                <Text ta="center" fw={600} size="xl">
                  {estadisticasFiltros.totalFiltrosAplicados}
                </Text>
                <Text ta="center" c="dimmed">
                  Filtros activos
                </Text>
              </Card>
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card withBorder radius="md">
                <Group justify="center" mb="md">
                  <ThemeIcon size={60} radius="md" variant="light" color="green">
                    <IconSearch size={30} />
                  </ThemeIcon>
                </Group>
                <Text ta="center" fw={600} size="xl">
                  {estadisticasFiltros.correosFiltrados}
                </Text>
                <Text ta="center" c="dimmed">
                  Correos encontrados
                </Text>
              </Card>
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card withBorder radius="md">
                <Group justify="center" mb="md">
                  <ThemeIcon size={60} radius="md" variant="light" color="violet">
                    <IconChartBar size={30} />
                  </ThemeIcon>
                </Group>
                <Text ta="center" fw={600} size="xl">
                  {estadisticasFiltros.porcentajeDelTotal.toFixed(1)}%
                </Text>
                <Text ta="center" c="dimmed">
                  Del total
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      </Tabs>

      {/* Modal para guardar filtro */}
      <Modal
        opened={modalGuardarAbierto}
        onClose={() => setModalGuardarAbierto(false)}
        title="Guardar Filtro"
        size="md"
        radius="md"
      >
        <Stack gap="md">
          <TextInput
            label="Nombre del filtro"
            placeholder="Ej: Correos urgentes vencidos"
            value={nombreFiltro}
            onChange={(e) => setNombreFiltro(e.currentTarget.value)}
            required
            withAsterisk
          />
          
          <TextInput
            label="Descripción (opcional)"
            placeholder="Describe el propósito de este filtro"
            value={descripcionFiltro}
            onChange={(e) => setDescripcionFiltro(e.currentTarget.value)}
          />
          
          <Box
            p="md"
            style={{
              border: '1px solid var(--mantine-color-gray-3)',
              borderRadius: 'var(--mantine-radius-sm)',
              backgroundColor: 'var(--mantine-color-gray-0)'
            }}
          >
            <Text size="sm" fw={500} mb="xs">
              Filtros que se guardarán:
            </Text>
            <Stack gap="xs">
              {estadisticasFiltros.filtrosActivos.map((filtro, index) => (
                <Group key={index} gap="xs">
                  <Badge size="xs" color="gray" variant="light">
                    {filtro.label}
                  </Badge>
                  <Text size="xs" c="dimmed">
                    {filtro.value}
                  </Text>
                </Group>
              ))}
            </Stack>
          </Box>
          
          <Group justify="flex-end" mt="md">
            <Button
              variant="subtle"
              onClick={() => setModalGuardarAbierto(false)}
            >
              Cancelar
            </Button>
            <Button
              color="blue"
              onClick={handleGuardarFiltro}
              disabled={!nombreFiltro.trim()}
              leftSection={<IconCheck size={16} />}
            >
              Guardar Filtro
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default FiltrosAvanzadosPage;