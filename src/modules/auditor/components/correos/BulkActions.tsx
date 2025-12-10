// components/correos/BulkActions.tsx
import React from 'react';
import {
  Paper,
  Group,
  Text,
  Button,
  Menu,
  ActionIcon,
  Badge,
  Stack,
  Divider,
  ThemeIcon,
  Tooltip
} from '@mantine/core';
import {
  IconTrash,
  IconEdit,
  IconMail,
  IconCheck,
  IconClock,
  IconAlertCircle,
  IconArchive,
  IconShare,
  IconDownload,
  IconChevronDown,
  IconUsers,
  IconCalendarEvent,
  IconFilter
} from '@tabler/icons-react';

interface BulkActionsProps {
  selectedCount: number;
  onDeleteSelected?: () => void;
  onAssignSelected?: () => void;
  onChangeStatus?: (status: string) => void;
  onExportSelected?: () => void;
  onArchiveSelected?: () => void;
  onForwardSelected?: () => void;
  disabled?: boolean;
}

const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  onDeleteSelected,
  onAssignSelected,
  onChangeStatus,
  onExportSelected,
  onArchiveSelected,
  onForwardSelected,
  disabled = false
}) => {
  if (selectedCount === 0) {
    return (
      <Paper p="md" withBorder>
        <Group justify="center">
          <ThemeIcon variant="light" color="gray" size="lg">
            <IconFilter size={20} />
          </ThemeIcon>
          <div>
            <Text fw={500}>Selecciona correos para realizar acciones</Text>
            <Text size="sm" c="dimmed">
              Haz clic en los correos o usa las casillas de verificación
            </Text>
          </div>
        </Group>
      </Paper>
    );
  }

  return (
    <Paper p="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Group gap="xs">
            <Badge size="lg" variant="filled" color="blue">
              {selectedCount} seleccionado(s)
            </Badge>
            <Text size="sm" c="dimmed">
              Acciones en lote disponibles
            </Text>
          </Group>
          
          <Group>
            <Button
              variant="light"
              color="red"
              leftSection={<IconTrash size={16} />}
              onClick={onDeleteSelected}
              disabled={disabled}
            >
              Eliminar
            </Button>
            
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button
                  variant="light"
                  leftSection={<IconChevronDown size={16} />}
                  rightSection={<IconChevronDown size={16} />}
                  disabled={disabled}
                >
                  Más acciones
                </Button>
              </Menu.Target>
              
              <Menu.Dropdown>
                <Menu.Label>Acciones en lote</Menu.Label>
                
                {onAssignSelected && (
                  <Menu.Item
                    leftSection={<IconUsers size={14} />}
                    onClick={onAssignSelected}
                  >
                    Asignar gestor
                  </Menu.Item>
                )}
                
                <Menu.Divider />
                
                <Menu.Label>Cambiar estado</Menu.Label>
                <Menu.Item
                  leftSection={<IconCheck size={14} color="green" />}
                  onClick={() => onChangeStatus?.('RESPONDIDO')}
                >
                  Marcar como respondido
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconClock size={14} color="yellow" />}
                  onClick={() => onChangeStatus?.('PENDIENTE')}
                >
                  Marcar como pendiente
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconAlertCircle size={14} color="red" />}
                  onClick={() => onChangeStatus?.('VENCIDO')}
                >
                  Marcar como vencido
                </Menu.Item>
                
                <Menu.Divider />
                
                {onExportSelected && (
                  <Menu.Item
                    leftSection={<IconDownload size={14} />}
                    onClick={onExportSelected}
                  >
                    Exportar seleccionados
                  </Menu.Item>
                )}
                
                {onArchiveSelected && (
                  <Menu.Item
                    leftSection={<IconArchive size={14} />}
                    onClick={onArchiveSelected}
                  >
                    Archivar
                  </Menu.Item>
                )}
                
                {onForwardSelected && (
                  <Menu.Item
                    leftSection={<IconShare size={14} />}
                    onClick={onForwardSelected}
                  >
                    Reenviar
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
        
        <Divider />
        
        <Group gap="xs">
          <Tooltip label="Responder seleccionados">
            <ActionIcon variant="light" color="blue" size="lg">
              <IconMail size={18} />
            </ActionIcon>
          </Tooltip>
          
          <Tooltip label="Programar seguimiento">
            <ActionIcon variant="light" color="orange" size="lg">
              <IconCalendarEvent size={18} />
            </ActionIcon>
          </Tooltip>
          
          <Tooltip label="Editar seleccionados">
            <ActionIcon 
              variant="light" 
              color="green" 
              size="lg"
              onClick={() => {}}
            >
              <IconEdit size={18} />
            </ActionIcon>
          </Tooltip>
          
          <Tooltip label="Eliminar seleccionados">
            <ActionIcon 
              variant="light" 
              color="red" 
              size="lg"
              onClick={onDeleteSelected}
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Stack>
    </Paper>
  );
};

export default BulkActions;