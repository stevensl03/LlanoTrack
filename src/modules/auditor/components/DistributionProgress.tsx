// components/DistributionProgress.tsx
import React from 'react';
import { Box, Text, Group, Progress, Tooltip } from '@mantine/core';
import type { DistribucionItem } from '../../../shared/types/dashboardTypes';

interface DistributionProgressProps {
  item: DistribucionItem;
  showPercentage?: boolean;
  showValue?: boolean;
  compact?: boolean;
}

type ColorMapType = Record<string, string>;
type NombreMapType = Record<string, string>;
type IconMapType = Record<string, string>;

const DistributionProgress: React.FC<DistributionProgressProps> = ({
  item,
  showPercentage = true,
  showValue = true,
  compact = false
}) => {
  // Función para obtener el color basado en el nombre del estado/etapa
  const getColor = (nombre: string): string => {
    const colorMap: ColorMapType = {
      // Estados
      'RESPONDIDO': 'green',
      'PENDIENTE': 'yellow',
      'VENCIDO': 'red',
      
      // Etapas
      'RECEPCION': 'blue',
      'ELABORACION': 'cyan',
      'REVISION': 'orange',
      'APROBACION': 'violet',
      'ENVIO': 'grape'
    };

    return colorMap[nombre] || 'gray';
  };

  // Función para formatear el nombre para mostrar
  const formatNombre = (nombre: string): string => {
    const map: NombreMapType = {
      // Estados
      'RESPONDIDO': 'Respondido',
      'PENDIENTE': 'Pendiente',
      'VENCIDO': 'Vencido',
      
      // Etapas
      'RECEPCION': 'Recepción',
      'ELABORACION': 'Elaboración',
      'REVISION': 'Revisión',
      'APROBACION': 'Aprobación',
      'ENVIO': 'Envío'
    };

    return map[nombre] || nombre;
  };

  // Función para obtener icono basado en el estado/etapa
  const getIcon = (nombre: string): string => {
    const iconMap: IconMapType = {
      'RESPONDIDO': '✓',
      'PENDIENTE': '⏳',
      'VENCIDO': '⚠️',
      'RECEPCION': '📥',
      'ELABORACION': '✏️',
      'REVISION': '👁️',
      'APROBACION': '✅',
      'ENVIO': '📤'
    };

    return iconMap[nombre] || '•';
  };

  const color: string = getColor(item.nombre);
  const formattedNombre: string = formatNombre(item.nombre);
  const icon: string = getIcon(item.nombre);

  return (
    <Box 
      mb={compact ? 'xs' : 'sm'} 
      style={{ 
        opacity: item.valor === 0 ? 0.6 : 1 
      }}
    >
      <Group justify="space-between" mb={2}>
        <Group gap={6}>
          <Text size={compact ? 'xs' : 'sm'}>{icon}</Text>
          <Tooltip label={item.nombre} withArrow>
            <Text 
              size={compact ? 'xs' : 'sm'} 
              fw={500}
              style={{ cursor: 'help' }}
            >
              {formattedNombre}
            </Text>
          </Tooltip>
        </Group>
        <Group gap={4}>
          {showValue && (
            <Text 
              size={compact ? 'xs' : 'sm'} 
              fw={600}
            >
              {item.valor}
            </Text>
          )}
          {showPercentage && (
            <Text 
              size={compact ? 'xs' : 'sm'} 
              c="dimmed"
            >
              ({item.porcentaje}%)
            </Text>
          )}
        </Group>
      </Group>
      <Progress
        value={item.porcentaje}
        color={color}
        size={compact ? 'xs' : 'sm'}
        radius="sm"
        styles={{
          root: {
            height: compact ? '6px' : '8px',
            backgroundColor: 'var(--mantine-color-gray-1)'
          },
          section: {
            transition: 'width 0.3s ease'
          }
        }}
      />
    </Box>
  );
};

export default DistributionProgress;