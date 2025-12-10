// components/MetricCard.tsx
import React from 'react';
import { Card, Text, Group, Box, Tooltip } from '@mantine/core';
import { IconTrendingUp, IconTrendingDown, IconHelp } from '@tabler/icons-react';
import type { MetricaResponse } from '../../../shared/types/dashboardTypes';

interface MetricCardProps {
  metrica: MetricaResponse;
  loading?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ metrica, loading = false }) => {
  // Mapeo de colores a valores hexadecimales
  const colorMap: Record<string, string> = {
    blue: '#228be6',
    green: '#40c057',
    red: '#fa5252',
    purple: '#7950f2',
    yellow: '#fab005'
  };

  // Mapeo de colores a iconos
  const iconMap: Record<string, React.ReactNode> = {
    blue: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#228be6" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    green: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#40c057" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    red: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fa5252" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    purple: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7950f2" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    yellow: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fab005" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  };

  // Color de fondo suave basado en el color principal
  const backgroundColorMap: Record<string, string> = {
    blue: '#e7f5ff',
    green: '#ebfbee',
    red: '#fff5f5',
    purple: '#f3f0ff',
    yellow: '#fff9db'
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        borderLeft: `4px solid ${colorMap[metrica.color]}`,
        minHeight: '160px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <Group justify="space-between" mb="md" wrap="nowrap">
        <div style={{ flex: 1 }}>
          <Group gap="xs" mb={4}>
            <Text size="md" fw={600} lineClamp={1}>
              {metrica.titulo}
            </Text>
            {metrica.descripcion && (
              <Tooltip
                label={metrica.descripcion}
                withArrow
                position="top"
                multiline
                w={220}
              >
                <IconHelp size={16} color="gray" style={{ cursor: 'help' }} />
              </Tooltip>
            )}
          </Group>
          <Text size="xs" c="dimmed" lineClamp={2}>
            {metrica.descripcion}
          </Text>
        </div>
        <Box
          style={{
            backgroundColor: backgroundColorMap[metrica.color],
            borderRadius: '50%',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          {iconMap[metrica.color]}
        </Box>
      </Group>

      <div style={{ flex: 1, marginTop: 'auto' }}>
        <Text 
          size="xl" 
          fw={700} 
          style={{ 
            color: colorMap[metrica.color],
            fontSize: '2rem',
            lineHeight: 1
          }}
        >
          {metrica.valor}
        </Text>
        
        {metrica.porcentajeCambio !== null && metrica.esPositivo !== null && (
          <Group gap={6} mt="sm" align="center">
            {metrica.esPositivo ? (
              <IconTrendingUp size={18} color="#40c057" />
            ) : (
              <IconTrendingDown size={18} color="#fa5252" />
            )}
            <Text
              size="sm"
              c={metrica.esPositivo ? 'green' : 'red'}
              fw={600}
              style={{ letterSpacing: '0.5px' }}
            >
              {metrica.porcentajeCambio > 0 ? '+' : ''}
              {metrica.porcentajeCambio}%
            </Text>
            <Text size="xs" c="dimmed">
              vs. período anterior
            </Text>
          </Group>
        )}
      </div>
    </Card>
  );
};

export default MetricCard;