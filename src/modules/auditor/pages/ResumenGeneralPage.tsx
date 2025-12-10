// pages/ResumenGeneralPage.tsx
import React from 'react';
import {
  Grid,
  Stack,
  Title,
  Text,
  Paper,
  SimpleGrid,
  Group,
  Divider,
  Card,
  Center,
  RingProgress,
  Loader,
  Alert,
  ThemeIcon,
  Badge,
  Button
} from '@mantine/core';
import {
  IconCheck,
  IconMail,
  IconClock,
  IconAlertCircle,
  IconUser,
  IconBuilding,
  IconRefresh,
  IconTrendingUp,
  IconInfoCircle
} from '@tabler/icons-react';
import { useDashboard } from '../../../shared/hooks/useDashboard';
import MetricCard from '../components/MetricCard';
import StatCard from '../components/StatCard';
import DistributionProgress from '../components/DistributionProgress';
import type { DashboardData } from '../../../shared/types/dashboardTypes';

interface EstadoGeneral {
  texto: string;
  color: string;
  icono: React.ReactNode;
}

const ResumenGeneralPage: React.FC = () => {
  const {
    dashboardData,
    kpis,
    estadisticas,
    distribucionEstado,
    distribucionEtapa,
    loading,
    error,
    actualizarDashboard,
    cargarDashboard
  } = useDashboard();

  // Función para formatear fecha en español
  const getFormattedDate = (): string => {
    const now: Date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return now.toLocaleDateString('es-ES', options);
  };

  // Función para calcular el estado general basado en métricas
  const getEstadoGeneral = (data: DashboardData | null): EstadoGeneral => {
    if (!data) {
      return {
        texto: 'Sin datos',
        color: 'gray',
        icono: <IconInfoCircle size={20} />
      };
    }
    
    if (data.cumplimiento >= 90) {
      return { 
        texto: 'Excelente', 
        color: 'green', 
        icono: <IconTrendingUp size={20} color="#40c057" /> 
      };
    } else if (data.cumplimiento >= 75) {
      return { 
        texto: 'Bueno', 
        color: 'blue', 
        icono: <IconCheck size={20} color="#228be6" /> 
      };
    } else if (data.cumplimiento >= 60) {
      return { 
        texto: 'Aceptable', 
        color: 'yellow', 
        icono: <IconAlertCircle size={20} color="#fab005" /> 
      };
    } else {
      return { 
        texto: 'Requiere atención', 
        color: 'red', 
        icono: <IconAlertCircle size={20} color="#fa5252" /> 
      };
    }
  };

  // Función para obtener recomendación basada en métricas
  const getRecomendacion = (data: DashboardData | null): string => {
    if (!data) return 'Cargando recomendaciones...';
    
    if (data.cumplimiento >= 90) {
      return 'Mantener el excelente trabajo y procesos actuales.';
    } else if (data.cumplimiento >= 75) {
      return 'Continuar monitoreando y optimizando procesos.';
    } else if (data.cumplimiento >= 60) {
      return 'Revisar procesos de respuesta y asignación de tareas.';
    } else {
      return 'Urgente: Revisar y optimizar todos los procesos de gestión.';
    }
  };

  // Estado de carga
  if (loading) {
    return (
      <Stack align="center" justify="center" style={{ minHeight: '400px' }}>
        <Loader size="xl" variant="dots" />
        <Text c="dimmed" mt="md">Cargando estadísticas del dashboard...</Text>
        <Text size="sm" c="dimmed">Esto puede tomar unos segundos</Text>
      </Stack>
    );
  }

  // Estado de error
  if (error) {
    return (
      <Alert
        color="red"
        title="Error al cargar datos"
        icon={<IconAlertCircle size={20} />}
        style={{ marginTop: '20px' }}
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

  // Sin datos
  if (!dashboardData || !estadisticas) {
    return (
      <Alert
        color="yellow"
        title="Datos no disponibles"
        icon={<IconInfoCircle size={20} />}
        style={{ marginTop: '20px' }}
      >
        <Stack gap="xs">
          <Text>No hay datos disponibles para mostrar en el resumen.</Text>
          <Group>
            <Button
              variant="light"
              color="blue"
              size="sm"
              leftSection={<IconRefresh size={14} />}
              onClick={cargarDashboard}
            >
              Actualizar
            </Button>
          </Group>
        </Stack>
      </Alert>
    );
  }

  const estadoGeneral: EstadoGeneral = getEstadoGeneral(dashboardData);
  const recomendacion: string = getRecomendacion(dashboardData);

  return (
    <Stack gap="xl">
      {/* Header con información y controles */}
      <Paper p="md" radius="md" withBorder>
        <Group justify="space-between" align="flex-start">
          <div>
            <Group gap="xs" mb={4}>
              <Title order={2}>Resumen General</Title>
              <Badge 
                color={estadoGeneral.color}
                variant="filled"
                size="lg"
                leftSection={estadoGeneral.icono}
              >
                {estadoGeneral.texto}
              </Badge>
            </Group>
            <Text c="dimmed" size="sm">
              Vista completa de métricas y estadísticas del sistema
            </Text>
          </div>
          
          <Group gap="xs">
            <Text size="sm" c="dimmed">
              {getFormattedDate()}
            </Text>
            <ThemeIcon
              color="blue"
              variant="light"
              style={{ cursor: 'pointer' }}
              onClick={actualizarDashboard}
            >
              <IconRefresh size={18} />
            </ThemeIcon>
          </Group>
        </Group>
      </Paper>

      {/* KPIs Principales */}
      <div>
        <Group justify="space-between" mb="md">
          <div>
            <Title order={3}>Indicadores Clave (KPIs)</Title>
            <Text c="dimmed" size="sm">
              Métricas principales de rendimiento del sistema
            </Text>
          </div>
          <Text size="sm" c="blue" fw={500}>
            {kpis.length} indicadores
          </Text>
        </Group>

        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing="md"
        >
          {kpis.map((metrica, index) => (
            <MetricCard key={`kpi-${index}`} metrica={metrica} />
          ))}
        </SimpleGrid>
      </div>

      {/* Métricas Globales */}
      <Paper p="md" withBorder radius="md">

        <Title order={3} mb="md">Métricas Globales</Title>
        
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card withBorder radius="md" h="100%">
              <Center mb="md">
                <RingProgress
                  size={140}
                  thickness={14}
                  roundCaps
                  sections={[
                    {
                      value: dashboardData.cumplimiento,
                      color: dashboardData.cumplimiento >= 80 ? 'green' : 
                             dashboardData.cumplimiento >= 60 ? 'yellow' : 'red'
                    }
                  ]}
                  label={
                    <Center>
                      <IconCheck size={36} color={
                        dashboardData.cumplimiento >= 80 ? 'green' : 
                        dashboardData.cumplimiento >= 60 ? 'yellow' : 'red'
                      } />
                    </Center>
                  }
                />
              </Center>
              <Text ta="center" fw={600} size="lg" mb={4}>
                Cumplimiento
              </Text>
              <Text ta="center" size="xl" fw={700}>
                {dashboardData.cumplimiento}%
              </Text>
              <Text ta="center" size="sm" c="dimmed" mt="xs">
                Tasa de cumplimiento de plazos
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card withBorder radius="md" h="100%">
              <Center mb="md">
                <RingProgress
                  size={140}
                  thickness={14}
                  roundCaps
                  sections={[
                    { value: 100, color: 'blue' }
                  ]}
                  label={
                    <Center>
                      <IconMail size={36} color="blue" />
                    </Center>
                  }
                />
              </Center>
              <Text ta="center" fw={600} size="lg" mb={4}>
                Total Correos
              </Text>
              <Text ta="center" size="xl" fw={700}>
                {dashboardData.totalCorreos}
              </Text>
              <Text ta="center" size="sm" c="dimmed" mt="xs">
                Correos procesados en el sistema
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card withBorder radius="md" h="100%">
              <Center mb="md">
                <RingProgress
                  size={140}
                  thickness={14}
                  roundCaps
                  sections={[
                    {
                      value: Math.min(dashboardData.tiempoPromedio * 10, 100),
                      color: dashboardData.tiempoPromedio <= 5 ? 'green' : 
                             dashboardData.tiempoPromedio <= 10 ? 'yellow' : 'red'
                    }
                  ]}
                  label={
                    <Center>
                      <IconClock size={36} color={
                        dashboardData.tiempoPromedio <= 5 ? 'green' : 
                        dashboardData.tiempoPromedio <= 10 ? 'yellow' : 'red'
                      } />
                    </Center>
                  }
                />
              </Center>
              <Text ta="center" fw={600} size="lg" mb={4}>
                Tiempo Promedio
              </Text>
              <Text ta="center" size="xl" fw={700}>
                {dashboardData.tiempoPromedio} días
              </Text>
              <Text ta="center" size="sm" c="dimmed" mt="xs">
                Tiempo promedio de respuesta
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
      </Paper>

      {/* Estadísticas Rápidas */}
      <div>
        <Title order={3} mb="md">Estadísticas del Sistema</Title>
        
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing="md"
        >
          <StatCard
            title="Correos Vencidos"
            value={estadisticas.correos_vencidos || 0}
            description="Correos fuera del plazo de respuesta"
            color="red"
            icon={<IconAlertCircle size={20} color="red" />}
            badge={estadisticas.correos_vencidos ? 'Alerta' : 'OK'}
            badgeColor={estadisticas.correos_vencidos ? 'red' : 'green'}
            trend={estadisticas.correos_vencidos > 0 ? 'down' : 'up'}
          />

          <StatCard
            title="Entidades"
            value={estadisticas.total_entidades || 0}
            description="Entidades registradas en el sistema"
            color="blue"
            icon={<IconBuilding size={20} color="blue" />}
          />

          <StatCard
            title="Cuentas"
            value={estadisticas.total_cuentas || 0}
            description="Cuentas de correo configuradas"
            color="green"
            icon={<IconUser size={20} color="green" />}
          />

          <StatCard
            title="Usuarios"
            value={estadisticas.total_usuarios || 0}
            description="Usuarios activos del sistema"
            color="purple"
            icon={<IconUser size={20} color="purple" />}
          />

          <StatCard
            title="Gestores Activos"
            value={estadisticas.total_usuarios || 0}
            description="Usuarios con rol de gestor"
            color="orange"
            icon={<IconUser size={20} color="orange" />}
          />

          <StatCard
            title="Tendencias"
            value={dashboardData.cumplimiento > 80 ? 'Positiva' : 'Neutral'}
            description="Dirección general del rendimiento"
            color={dashboardData.cumplimiento > 80 ? 'green' : 'yellow'}
            icon={
              dashboardData.cumplimiento > 80 ? (
                <IconTrendingUp size={20} color="green" />
              ) : (
                <IconAlertCircle size={20} color="yellow" />
              )
            }
            trend={dashboardData.cumplimiento > 80 ? 'up' : 'neutral'}
          />
        </SimpleGrid>
      </div>

      {/* Distribuciones */}
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper p="md" withBorder radius="md" h="100%">
            <Title order={4} mb="md">Distribución por Estado</Title>
            <Stack gap="md">
              {distribucionEstado.map((item, index) => (
                <DistributionProgress key={`estado-${index}`} item={item} />
              ))}
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper p="md" withBorder radius="md" h="100%">
            <Title order={4} mb="md">Distribución por Etapa</Title>
            <Stack gap="md">
              {distribucionEtapa.map((item, index) => (
                <DistributionProgress key={`etapa-${index}`} item={item} />
              ))}
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Resumen Ejecutivo */}
      <Paper
        p="xl"
        withBorder
        radius="md"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Group justify="space-between" align="flex-start" mb="md">
          <div>
            <Title order={3} c="white">
              Resumen Ejecutivo
            </Title>
            <Text size="sm" c="rgba(255,255,255,0.8)">
              Análisis del estado actual del sistema
            </Text>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <Text size="sm" c="rgba(255,255,255,0.8)">
              Última actualización
            </Text>
            <Text size="sm" fw={600} c="white">
              {new Date().toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
          </div>
        </Group>
        
        <Divider my="md" c="rgba(255,255,255,0.2)" />
        
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <div>
              <Text size="md" fw={600} mb="sm" c="white">
                📈 Fortalezas
              </Text>
              <Stack gap="xs">
                <Group gap="xs">
                  <IconCheck size={16} color="white" />
                  <Text size="sm" c="white">
                    {dashboardData.cumplimiento > 80 
                      ? 'Excelente cumplimiento de plazos (>80%)'
                      : 'Cumplimiento dentro de lo esperado'
                    }
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconCheck size={16} color="white" />
                  <Text size="sm" c="white">
                    {dashboardData.totalCorreos > 50 
                      ? 'Alto volumen procesado eficientemente'
                      : 'Volumen manejable con buen rendimiento'
                    }
                  </Text>
                </Group>
              </Stack>
            </div>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 6 }}>
            <div>
              <Text size="md" fw={600} mb="sm" c="white">
                ⚠️ Áreas de Mejora
              </Text>
              <Stack gap="xs">
                <Group gap="xs">
                  <IconAlertCircle size={16} color="white" />
                  <Text size="sm" c="white">
                    {dashboardData.tiempoPromedio > 5 
                      ? 'Reducir tiempo promedio de respuesta'
                      : 'Mantener tiempos de respuesta eficientes'
                    }
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconAlertCircle size={16} color="white" />
                  <Text size="sm" c="white">
                    {estadisticas.correos_vencidos > 0
                      ? `Atender ${estadisticas.correos_vencidos} correo(s) vencido(s)`
                      : 'Sin correos vencidos - Excelente trabajo'
                    }
                  </Text>
                </Group>
              </Stack>
            </div>
          </Grid.Col>
        </Grid>
        
        <Divider my="md" c="rgba(255,255,255,0.2)" />
        
        <Group justify="space-between">
          <div>
            <Text size="sm" c="rgba(255,255,255,0.8)">
              Estado General
            </Text>
            <Text size="lg" fw={700} c="white">
              {estadoGeneral.texto}
            </Text>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <Text size="sm" c="rgba(255,255,255,0.8)">
              Recomendación
            </Text>
            <Text size="sm" fw={600} c="white">
              {recomendacion}
            </Text>
          </div>
        </Group>
      </Paper>
    </Stack>
  );
};

export default ResumenGeneralPage;