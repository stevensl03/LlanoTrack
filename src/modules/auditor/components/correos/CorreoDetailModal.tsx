// components/correos/CorreoDetailModal.tsx
import React from 'react';
import {
  Modal,
  Stack,
  Group,
  Text,
  Badge,
  Divider,
  Paper,
  Timeline,
  Avatar,
  Box,
  Grid,
  ThemeIcon,
  Button,
  ScrollArea,
  Tabs,
  ActionIcon,
  CopyButton,
  Tooltip
} from '@mantine/core';
import {
  IconMail,
  IconUser,
  IconCalendar,
  IconBuilding,
  IconClock,
  IconAlertCircle,
  IconCheck,
  IconFileText,
  IconExternalLink,
  IconCopy,
  IconCheck as IconCheckCopy,
  IconPrinter,
  IconDownload,
  IconShare,
  IconHistory,
  IconPaperclip
} from '@tabler/icons-react';
import type { CorreoFiltradoDTO, FlujoCorreoDTO } from '../../../../shared/types/dashboardTypes';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface CorreoDetailModalProps {
  correo: CorreoFiltradoDTO | null;
  opened: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onAssign?: () => void;
  onForward?: () => void;
}

const CorreoDetailModal: React.FC<CorreoDetailModalProps> = ({
  correo,
  opened,
  onClose,
  onEdit,
  onAssign,
  onForward
}) => {
  if (!correo) return null;

  // Formatear fecha
  const formatFecha = (fecha: string): string => {
    try {
      return format(new Date(fecha), 'dd/MM/yyyy HH:mm', { locale: es });
    } catch {
      return fecha;
    }
  };

  // Calcular días restantes
  const calcularDiasRestantes = (): number | null => {
    if (!correo.plazoRespuestaEnDias || !correo.fechaRecepcion) return null;
    
    const fechaRecepcion = new Date(correo.fechaRecepcion);
    const fechaLimite = new Date(fechaRecepcion.getTime() + correo.plazoRespuestaEnDias * 24 * 60 * 60 * 1000);
    const hoy = new Date();
    const diffTime = fechaLimite.getTime() - hoy.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Obtener gestor activo
  const obtenerGestorActivo = (): FlujoCorreoDTO | null => {
    return correo.flujos.find(f => f.estaActivo) || null;
  };

  // Renderizar timeline del flujo
  const renderFlujoTimeline = (): React.ReactNode => {
    return (
      <Timeline active={correo.flujos.findIndex(f => f.estaActivo)} bulletSize={24}>
        {correo.flujos.map((flujo, index) => (
          <Timeline.Item 
            key={flujo.idFlujo} 
            bullet={
              <Avatar size={24} radius="xl">
                <IconUser size={12} />
              </Avatar>
            }
            title={
              <Group gap="xs">
                <Text fw={600}>{flujo.nombreUsuario}</Text>
                {flujo.estaActivo && (
                  <Badge size="xs" color="green" variant="light">
                    Activo
                  </Badge>
                )}
              </Group>
            }
          >
            <Text size="sm" c="dimmed">{flujo.correoUsuario}</Text>
            <Text size="xs" mt={4}>
              <Badge variant="light" size="xs">
                {flujo.etapa || 'Sin etapa'}
              </Badge>
            </Text>
            <Group gap="xs" mt={4}>
              <Text size="xs" c="dimmed">
                Asignado: {formatFecha(flujo.fechaAsignacion)}
              </Text>
              {flujo.fechaFinalizacion && (
                <Text size="xs" c="dimmed">
                  Finalizado: {formatFecha(flujo.fechaFinalizacion)}
                </Text>
              )}
            </Group>
          </Timeline.Item>
        ))}
      </Timeline>
    );
  };

  const diasRestantes = calcularDiasRestantes();
  const gestorActivo = obtenerGestorActivo();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="xs">
          <IconMail size={20} />
          <Text fw={600}>Detalles del Correo</Text>
        </Group>
      }
      size="xl"
      radius="md"
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Stack gap="md">
        {/* Header con información principal */}
        <Paper p="md" withBorder>
          <Group justify="space-between" align="flex-start">
            <div style={{ flex: 1 }}>
              <Text size="lg" fw={700} mb="xs">{correo.asunto}</Text>
              <Group gap="xs">
                <Badge 
                  color={correo.estado === 'RESPONDIDO' ? 'green' : correo.estado === 'VENCIDO' ? 'red' : 'yellow'}
                  variant="filled"
                  leftSection={
                    correo.estado === 'RESPONDIDO' ? <IconCheck size={12} /> :
                    correo.estado === 'VENCIDO' ? <IconAlertCircle size={12} /> :
                    <IconClock size={12} />
                  }
                >
                  {correo.estado || 'PENDIENTE'}
                </Badge>
                
                {correo.urgencia && (
                  <Badge 
                    color={correo.urgencia === 'ALTA' ? 'red' : correo.urgencia === 'MEDIA' ? 'orange' : 'yellow'}
                    variant="light"
                  >
                    {correo.urgencia}
                  </Badge>
                )}
                
                {diasRestantes !== null && (
                  <Badge 
                    color={diasRestantes < 0 ? 'red' : diasRestantes <= 2 ? 'orange' : 'green'}
                    variant="dot"
                  >
                    {diasRestantes < 0 
                      ? `Atrasado ${Math.abs(diasRestantes)} días`
                      : `${diasRestantes} días restantes`
                    }
                  </Badge>
                )}
              </Group>
            </div>
            
            <Group gap="xs">
              <CopyButton value={correo.id}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? 'Copiado!' : 'Copiar ID'}>
                    <ActionIcon variant="subtle" onClick={copy}>
                      {copied ? <IconCheckCopy size={16} /> : <IconCopy size={16} />}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
          </Group>
        </Paper>

        <Tabs defaultValue="informacion">
          <Tabs.List>
            <Tabs.Tab value="informacion" leftSection={<IconFileText size={14} />}>
              Información
            </Tabs.Tab>
            <Tabs.Tab value="flujo" leftSection={<IconHistory size={14} />}>
              Flujo
            </Tabs.Tab>
            <Tabs.Tab value="adjuntos" leftSection={<IconPaperclip size={14} />}>
              Adjuntos
            </Tabs.Tab>
          </Tabs.List>

          {/* Pestaña Información */}
          <Tabs.Panel value="informacion" pt="md">
            <Grid gutter="md">
              <Grid.Col span={6}>
                <Paper p="md" withBorder>
                  <Group gap="xs" mb="md">
                    <IconUser size={16} />
                    <Text fw={600}>Remitente</Text>
                  </Group>
                  {correo.cuenta ? (
                    <Stack gap="xs">
                      <Text fw={500}>{correo.cuenta.nombre}</Text>
                      <Text size="sm" c="dimmed">{correo.cuenta.correo}</Text>
                      {correo.cuenta.entidadNombre && (
                        <Group gap="xs">
                          <IconBuilding size={14} />
                          <Text size="sm">{correo.cuenta.entidadNombre}</Text>
                        </Group>
                      )}
                    </Stack>
                  ) : (
                    <Text c="dimmed">No disponible</Text>
                  )}
                </Paper>
              </Grid.Col>

              <Grid.Col span={6}>
                <Paper p="md" withBorder>
                  <Group gap="xs" mb="md">
                    <IconCalendar size={16} />
                    <Text fw={600}>Fechas</Text>
                  </Group>
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text size="sm">Recepción:</Text>
                      <Text size="sm" fw={500}>{formatFecha(correo.fechaRecepcion)}</Text>
                    </Group>
                    {correo.fechaRespuesta && (
                      <Group justify="space-between">
                        <Text size="sm">Respuesta:</Text>
                        <Text size="sm" fw={500}>{formatFecha(correo.fechaRespuesta)}</Text>
                      </Group>
                    )}
                    {correo.fechaLimite && (
                      <Group justify="space-between">
                        <Text size="sm">Límite:</Text>
                        <Text size="sm" fw={500} c={diasRestantes && diasRestantes < 0 ? 'red' : 'inherit'}>
                          {formatFecha(correo.fechaLimite)}
                        </Text>
                      </Group>
                    )}
                  </Stack>
                </Paper>
              </Grid.Col>

              <Grid.Col span={6}>
                <Paper p="md" withBorder>
                  <Group gap="xs" mb="md">
                    <IconFileText size={16} />
                    <Text fw={600}>Solicitud</Text>
                  </Group>
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text size="sm">Tipo:</Text>
                      <Badge variant="light">
                        {correo.tipoSolicitud?.nombre || 'No especificado'}
                      </Badge>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm">Plazo:</Text>
                      <Text size="sm" fw={500}>
                        {correo.plazoRespuestaEnDias || 'No definido'} días
                      </Text>
                    </Group>
                    {correo.radicadoEntrada && (
                      <Group justify="space-between">
                        <Text size="sm">Radicado entrada:</Text>
                        <Text size="sm" fw={500}>{correo.radicadoEntrada}</Text>
                      </Group>
                    )}
                    {correo.radicadoSalida && (
                      <Group justify="space-between">
                        <Text size="sm">Radicado salida:</Text>
                        <Text size="sm" fw={500}>{correo.radicadoSalida}</Text>
                      </Group>
                    )}
                  </Stack>
                </Paper>
              </Grid.Col>

              <Grid.Col span={6}>
                <Paper p="md" withBorder>
                  <Group gap="xs" mb="md">
                    <IconUser size={16} />
                    <Text fw={600}>Gestor Actual</Text>
                  </Group>
                  {gestorActivo ? (
                    <Stack gap="xs">
                      <Text fw={500}>{gestorActivo.nombreUsuario}</Text>
                      <Text size="sm" c="dimmed">{gestorActivo.correoUsuario}</Text>
                      <Badge variant="light" color="blue">
                        {gestorActivo.etapa || 'Sin etapa'}
                      </Badge>
                      <Text size="sm" c="dimmed">
                        Asignado desde: {formatFecha(gestorActivo.fechaAsignacion)}
                      </Text>
                    </Stack>
                  ) : (
                    <Stack align="center" gap="sm">
                      <Text c="dimmed">Sin gestor asignado</Text>
                      {onAssign && (
                        <Button size="xs" variant="light" onClick={onAssign}>
                          Asignar gestor
                        </Button>
                      )}
                    </Stack>
                  )}
                </Paper>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          {/* Pestaña Flujo */}
          <Tabs.Panel value="flujo" pt="md">
            <Paper p="md" withBorder>
              <Text fw={600} mb="md">Historial del Flujo</Text>
              {renderFlujoTimeline()}
            </Paper>
          </Tabs.Panel>

          {/* Pestaña Adjuntos */}
          <Tabs.Panel value="adjuntos" pt="md">
            <Paper p="md" withBorder>
              <Text fw={600} mb="md">Documentos Adjuntos</Text>
              <Stack gap="sm">
                {/* Simulación de adjuntos - en producción vendría de los datos */}
                <Paper p="sm" withBorder>
                  <Group justify="space-between">
                    <Group gap="sm">
                      <ThemeIcon variant="light" color="blue">
                        <IconFileText size={16} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={500}>documento_solicitud.pdf</Text>
                        <Text size="xs" c="dimmed">2.4 MB • PDF</Text>
                      </div>
                    </Group>
                    <Button size="xs" variant="light" leftSection={<IconDownload size={12} />}>
                      Descargar
                    </Button>
                  </Group>
                </Paper>
                
                <Paper p="sm" withBorder>
                  <Group justify="space-between">
                    <Group gap="sm">
                      <ThemeIcon variant="light" color="green">
                        <IconFileText size={16} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={500}>respuesta_oficial.docx</Text>
                        <Text size="xs" c="dimmed">1.8 MB • Word</Text>
                      </div>
                    </Group>
                    <Button size="xs" variant="light" leftSection={<IconDownload size={12} />}>
                      Descargar
                    </Button>
                  </Group>
                </Paper>
              </Stack>
            </Paper>
          </Tabs.Panel>
        </Tabs>

        <Divider />

        {/* Acciones */}
        <Group justify="space-between">
          <Group>
            <Button
              variant="light"
              leftSection={<IconPrinter size={16} />}
              onClick={() => window.print()}
            >
              Imprimir
            </Button>
            
            <Button
              variant="light"
              leftSection={<IconDownload size={16} />}
            >
              Exportar
            </Button>
            
            {onForward && (
              <Button
                variant="light"
                leftSection={<IconShare size={16} />}
                onClick={onForward}
              >
                Compartir
              </Button>
            )}
          </Group>
          
          <Group>
            {onEdit && (
              <Button
                variant="light"
                color="orange"
                leftSection={<IconExternalLink size={16} />}
                onClick={onEdit}
              >
                Editar
              </Button>
            )}
            
            <Button
              variant="light"
              color="blue"
              leftSection={<IconExternalLink size={16} />}
              onClick={onClose}
            >
              Cerrar
            </Button>
          </Group>
        </Group>
      </Stack>
    </Modal>
  );
};

export default CorreoDetailModal;