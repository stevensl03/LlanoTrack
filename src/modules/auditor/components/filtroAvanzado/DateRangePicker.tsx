// components/filters/DateRangePicker.tsx
import React, { useState } from 'react';
import { 
  Box, 
  Group, 
  Text, 
  Popover, 
  Button, 
  Stack,
  Badge,
  Divider
} from '@mantine/core';
import { 
  IconCalendar, 
  IconCalendarEvent, 
  IconX,
  IconCalendarMonth,
  IconCalendarWeek,
  IconCalendarStats
} from '@tabler/icons-react';
import { DatePicker } from '@mantine/dates';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface PresetValue {
  days?: number;
  months?: number;
}

interface DatePreset {
  label: string;
  value: PresetValue;
  icon: React.ReactNode;
}

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (start: Date | null, end: Date | null) => void;
  label?: string;
  description?: string;
  error?: string;
  presets?: DatePreset[];
}

const DEFAULT_PRESETS: DatePreset[] = [
  { label: 'Hoy', value: { days: 0 }, icon: <IconCalendar size={16} /> },
  { label: 'Últimos 7 días', value: { days: 7 }, icon: <IconCalendarWeek size={16} /> },
  { label: 'Últimos 30 días', value: { days: 30 }, icon: <IconCalendarMonth size={16} /> },
  { label: 'Este mes', value: { months: 0 }, icon: <IconCalendarStats size={16} /> },
  { label: 'Mes anterior', value: { months: 1 }, icon: <IconCalendarStats size={16} /> }
];

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
  label = 'Rango de fechas',
  description = 'Selecciona un rango de fechas',
  error,
  presets = DEFAULT_PRESETS
}) => {
  const [opened, setOpened] = useState<boolean>(false);

  const formatDateRange = (start: Date | null, end: Date | null): string => {
    if (!start && !end) return 'Seleccionar rango';
    if (start && !end) return `Desde ${format(start, 'dd/MM/yyyy', { locale: es })}`;
    if (!start && end) return `Hasta ${format(end, 'dd/MM/yyyy', { locale: es })}`;
    return `${format(start!, 'dd/MM/yyyy', { locale: es })} - ${format(end!, 'dd/MM/yyyy', { locale: es })}`;
  };

  const applyPreset = (preset: PresetValue): void => {
    const end: Date = new Date();
    let start: Date = new Date();
    
    if (preset.days !== undefined) {
      start.setDate(start.getDate() - preset.days);
    }
    
    if (preset.months !== undefined) {
      if (preset.months === 0) {
        // Este mes
        start = new Date(end.getFullYear(), end.getMonth(), 1);
      } else if (preset.months === 1) {
        // Mes anterior
        const firstDayOfPreviousMonth: Date = new Date(end.getFullYear(), end.getMonth() - 1, 1);
        const lastDayOfPreviousMonth: Date = new Date(end.getFullYear(), end.getMonth(), 0);
        start = firstDayOfPreviousMonth;
        end.setTime(lastDayOfPreviousMonth.getTime());
      }
    }
    
    onChange(start, end);
    setOpened(false);
  };

  const clearSelection = (): void => {
    onChange(null, null);
  };

  const handleStartDateChange = (date: Date | null): void => {
    onChange(date, endDate);
  };

  const handleEndDateChange = (date: Date | null): void => {
    onChange(startDate, date);
  };

  const hasSelection: boolean = !!(startDate || endDate);

  return (
    <Box>
      <Text size="sm" fw={500} mb={4}>
        {label}
      </Text>
      {description && (
        <Text size="xs" c="dimmed" mb="xs">
          {description}
        </Text>
      )}
      
      <Popover
        opened={opened}
        onChange={setOpened}
        position="bottom-start"
        width={400}
        trapFocus
      >
        <Popover.Target>
          <Button
            variant="light"
            color="blue"
            leftSection={<IconCalendarEvent size={16} />}
            rightSection={hasSelection ? <Badge size="sm">{formatDateRange(startDate, endDate)}</Badge> : null}
            fullWidth
            onClick={() => setOpened(!opened)}
            style={{ justifyContent: 'space-between' }}
          >
            <Text size="sm" truncate="end">
              {formatDateRange(startDate, endDate)}
            </Text>
          </Button>
        </Popover.Target>
        
        <Popover.Dropdown>
          <Stack gap="md">
            {/* Presets rápidos */}
            <Box>
              <Text size="sm" fw={500} mb="xs">
                Presets rápidos
              </Text>
              <Group gap="xs">
                {presets.map((preset: DatePreset, index: number) => (
                  <Button
                    key={index}
                    variant="subtle"
                    size="xs"
                    leftSection={preset.icon}
                    onClick={() => applyPreset(preset.value)}
                  >
                    {preset.label}
                  </Button>
                ))}
              </Group>
            </Box>
            
            <Divider />
            
            {/* Selectores de fecha */}
            <Group grow>
              <Box>
                <Text size="sm" fw={500} mb="xs">
                  Fecha inicio
                </Text>
                <DatePicker
                  value={startDate}
                  onChange={(value) => handleStartDateChange(value as Date | null)}
                  locale="es"
                  maxDate={endDate || undefined}
                />
              </Box>
              
              <Box>
                <Text size="sm" fw={500} mb="xs">
                  Fecha fin
                </Text>
                <DatePicker
                  value={endDate}
                  onChange={(value) => handleEndDateChange(value as Date | null)}
                  locale="es"
                  minDate={startDate || undefined}
                />
              </Box>
            </Group>
            
            <Group justify="space-between">
              <Button
                variant="subtle"
                color="red"
                size="sm"
                leftSection={<IconX size={14} />}
                onClick={clearSelection}
                disabled={!hasSelection}
              >
                Limpiar
              </Button>
              
              <Button
                variant="light"
                size="sm"
                onClick={() => setOpened(false)}
              >
                Aplicar
              </Button>
            </Group>
          </Stack>
        </Popover.Dropdown>
      </Popover>
      
      {error && (
        <Text size="xs" c="red" mt={4}>
          {error}
        </Text>
      )}
    </Box>
  );
};

export default DateRangePicker;