// components/filters/FilterSection.tsx
import React from 'react';
import { 
  Box, 
  Text, 
  Group, 
  ThemeIcon, 
  Divider,
  Badge
} from '@mantine/core';
import { IconFilter, IconChevronDown, IconChevronUp } from '@tabler/icons-react';

interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
  badgeCount?: number;
  badgeColor?: string;
  description?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  icon,
  children,
  isExpanded = true,
  onToggle,
  badgeCount,
  badgeColor = 'blue',
  description
}) => {
  return (
    <Box
      style={{
        border: '1px solid var(--mantine-color-gray-3)',
        borderRadius: 'var(--mantine-radius-md)',
        overflow: 'hidden',
        backgroundColor: 'white'
      }}
    >
      <Box
        style={{
          padding: 'var(--mantine-spacing-md)',
          backgroundColor: 'var(--mantine-color-gray-0)',
          cursor: onToggle ? 'pointer' : 'default',
          userSelect: 'none'
        }}
        onClick={onToggle}
      >
        <Group justify="space-between">
          <Group gap="md">
            <ThemeIcon variant="light" size="lg" color="blue">
              {icon}
            </ThemeIcon>
            <div>
              <Group gap="xs" align="center">
                <Text fw={600} size="md">
                  {title}
                </Text>
                {badgeCount !== undefined && badgeCount > 0 && (
                  <Badge 
                    color={badgeColor} 
                    variant="filled" 
                    size="sm"
                    circle
                  >
                    {badgeCount}
                  </Badge>
                )}
              </Group>
              {description && (
                <Text size="sm" c="dimmed" mt={2}>
                  {description}
                </Text>
              )}
            </div>
          </Group>
          
          {onToggle && (
            <ThemeIcon variant="subtle" color="gray" size="md">
              {isExpanded ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
            </ThemeIcon>
          )}
        </Group>
      </Box>
      
      {isExpanded && (
        <>
          <Divider />
          <Box p="md">
            {children}
          </Box>
        </>
      )}
    </Box>
  );
};

export default FilterSection;