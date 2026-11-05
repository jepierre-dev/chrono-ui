import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  getDay,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { Button } from '../button/button.js';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Seleccionar fecha...',
  disabled = false,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState(value || new Date());

  const { daysInMonth, startOffset } = React.useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return {
      daysInMonth: eachDayOfInterval({ start, end }),
      startOffset: getDay(start), // 0 para domingo, 1 para lunes, etc.
    };
  }, [currentMonth]);

  const handleSelect = (date: Date) => {
    onChange?.(date);
    setOpen(false);
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-normal h-10',
            !value && 'text-slate-400',
            className
          )}
          startIcon={<CalendarIcon className="h-4 w-4 text-slate-400" />}
          aria-label={value ? `Fecha seleccionada: ${format(value, 'PPP', { locale: es })}` : placeholder}
        >
          {value ? format(value, 'PPP', { locale: es }) : placeholder}
        </Button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          className="z-50 w-72 rounded-xl border border-chrono-border bg-chrono-card p-4 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between pb-3">
            <h4 className="text-sm font-semibold capitalize text-chrono-fg">
              {format(currentMonth, 'MMMM yyyy', { locale: es })}
            </h4>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Mes anterior"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Mes siguiente"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-400 pb-2">
            <span>Do</span>
            <span>Lu</span>
            <span>Ma</span>
            <span>Mi</span>
            <span>Ju</span>
            <span>Vi</span>
            <span>Sá</span>
          </div>

          {/* Days Grid with precise column start offset */}
          <div className="grid grid-cols-7 gap-1" role="grid">
            {daysInMonth.map((day, idx) => {
              const selected = value && isSameDay(day, value);
              const today = isToday(day);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  style={idx === 0 ? { gridColumnStart: startOffset + 1 } : undefined}
                  onClick={() => handleSelect(day)}
                  aria-label={format(day, 'PPPP', { locale: es })}
                  aria-selected={selected || undefined}
                  className={cn(
                    'h-8 w-8 rounded-lg text-xs font-medium transition-colors hover:bg-chrono-primary/10 hover:text-chrono-primary flex items-center justify-center cursor-pointer',
                    selected &&
                      'bg-chrono-primary text-white hover:bg-chrono-primary hover:text-white shadow-xs',
                    today && !selected && 'border border-chrono-primary/50 text-chrono-primary font-semibold'
                  )}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
          </div>

          {/* Actions shortcut */}
          <div className="pt-3 border-t border-chrono-border mt-3 flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => {
                const now = new Date();
                setCurrentMonth(now);
                handleSelect(now);
              }}
            >
              Hoy
            </Button>
            {value && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-red-500 hover:text-red-600"
                onClick={() => {
                  onChange?.(undefined);
                  setOpen(false);
                }}
              >
                Limpiar
              </Button>
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
