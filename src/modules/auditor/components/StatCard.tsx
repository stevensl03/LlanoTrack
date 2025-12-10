// components/StatCard.tsx
import React from 'react';
import { Card, Text, Group, Box, Badge, Tooltip } from '@mantine/core';
import { 
  IconAlertCircle, 
  IconCheck, 
  IconClock,
  IconTrendingUp,
  IconTrendingDown,
  IconMinus,
  IconHelp
} from '@tabler/icons-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  color: 'blue' | 'green' | 'red' | 'purple' | 'yellow' | 'orange' | 'cyan' | 'gray';
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
  badge?: string;
  badgeColor?: string;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  color,
  icon,
  trend,
  trendValue,
  badge,
  badgeColor = 'blue',
  loading = false
}) => {
  // Mapeo de colores
  const colorMap: Record<string, string> = {
    red: '#fa5252',
    green: '#40c057',
    yellow: '#fab005',
    blue: '#228be6',
    purple: '#7950f2',
    cyan: '#15aabf',
    orange: '#fd7e14',
    gray: '#868e96'
  };

  // Mapeo de colores de fondo suaves
  const backgroundColorMap: Record<string, string> = {
    red: '#fff5f5',
    green: '#ebfbee',
    yellow: '#fff9db',
    blue: '#e7f5ff',
    purple: '#f3f0ff',
    cyan: '#e3fafc',
    orange: '#fff4e6',
    gray: '#f8f9fa'
  };

  // Mapeo de iconos de tendencia
  const trendIconMap: Record<string, React.ReactNode> = {
    up: <IconTrendingUp size={16} color="#40c057" />,
    down: <IconTrendingDown size={16} color="#fa5252" />,
    neutral: <IconMinus size={16} color="#868e96" />
  };

  // Texto de tendencia
  const trendTextMap: Record<string, string> = {
    up: 'Subiendo',
    down: 'Bajando',
    neutral: 'Estable'
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ 
        position: 'relative',
        minHeight: '140px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {badge && (
        <Badge
          color={badgeColor}
          variant="filled"
          size="sm"
          style={{
            position: 'absolute',
            top: '-10px',
            right: '10px',
            zIndex: 1
          }}
        >
          {badge}
        </Badge>
      )}
      
      <Group justify="space-between" mb="md" wrap="nowrap">
        <div style={{ flex: 1 }}>
          <Group gap={4} mb={4}>
            <Text size="sm" c="dimmed" fw={500}>
              {title}
            </Text>
            {description && (
              <Tooltip
                label={description}
                withArrow
                position="top"
                multiline
                w={200}
              >
                <IconHelp size={14} color="gray" style={{ cursor: 'help' }} />
              </Tooltip>
            )}
          </Group>
          <Text size="xl" fw={700} style={{ fontSize: '1.8rem', lineHeight: 1 }}>
            {value}
          </Text>
        </div>
        <Box
          style={{
            backgroundColor: backgroundColorMap[color],
            borderRadius: '12px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          {icon}
        </Box>
      </Group>

      <div style={{ marginTop: 'auto' }}>
        {trend && (
          <Group gap={6} align="center">
            {trendIconMap[trend]}
            <Text size="xs" c="dimmed" fw={500}>
              {trendTextMap[trend]}
            </Text>
            {trendValue !== undefined && (
              <Text size="xs" c={trend === 'up' ? 'green' : trend === 'down' ? 'red' : 'dimmed'}>
                {trendValue > 0 ? '+' : ''}{trendValue}%
              </Text>
            )}
          </Group>
        )}
      </div>
    </Card>
  );
};

export default StatCard;