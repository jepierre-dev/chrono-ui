import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  isAfter,
  isBefore,
  addMonths,
  subMonths,
  subDays,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { Button } from '../button/button.js';

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = 'Seleccionar rango de fechas...',
  disabled = false,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState(value?.from || new Date());

  const daysInMonth = React.useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const handleDayClick = (day: Date) => {
    if (!value?.from || (value.from && value.to)) {
      onChange?.({ from: day, to: undefined });
    } else if (value.from && !value.to) {
      if (isBefore(day, value.from)) {
        onChange?.({ from: day, to: value.from });
      } else {
        onChange?.({ from: value.from, to: day });
      }
      setOpen(false);
    }
  };

  const displayText = React.useMemo(() => {
    if (value?.from && value?.to) {
      return `${format(value.from, 'dd MMM', { locale: es })} - ${format(
        value.to,
        'dd MMM yyyy',
        { locale: es }
      )}`;
    }
    if (value?.from) {
      return `${format(value.from, 'PPP', { locale: es })} (Selecciona fin)`;
    }
    return placeholder;
  }, [value, placeholder]);

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-normal h-10',
            !value?.from && 'text-slate-400',
            className
          )}
          startIcon={<CalendarIcon className="h-4 w-4 text-slate-400" />}
        >
          {displayText}
        </Button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          className="z-50 w-80 rounded-xl border border-chrono-border bg-chrono-card p-4 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 pb-3 border-b border-chrono-border mb-3 overflow-x-auto">
            <Button
              variant="secondary"
              size="sm"
              className="text-xs px-2.5 h-7"
              onClick={() => {
                const now = new Date();
                onChange?.({ from: subDays(now, 7), to: now });
                setOpen(false);
              }}
            >
              7 Días
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="text-xs px-2.5 h-7"
              onClick={() => {
                const now = new Date();
                onChange?.({ from: subDays(now, 30), to: now });
                setOpen(false);
              }}
            >
              30 Días
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="text-xs px-2.5 h-7"
              onClick={() => {
                const now = new Date();
                onChange?.({ from: startOfMonth(now), to: endOfMonth(now) });
                setOpen(false);
              }}
            >
              Este Mes
            </Button>
          </div>

          {/* Month Header */}
          <div className="flex items-center justify-between pb-3">
            <h4 className="text-sm font-semibold capitalize text-chrono-fg">
              {format(currentMonth, 'MMMM yyyy', { locale: es })}
            </h4>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
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

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {daysInMonth.map((day) => {
              const isStart = value?.from && isSameDay(day, value.from);
              const isEnd = value?.to && isSameDay(day, value.to);
              const isInRange =
                value?.from &&
                value?.to &&
                isWithinInterval(day, { start: value.from, end: value.to });

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => handleDayClick(day)}
                  className={cn(
                    'h-8 w-8 rounded-lg text-xs font-medium transition-colors hover:bg-chrono-primary/10 hover:text-chrono-primary flex items-center justify-center cursor-pointer',
                    isInRange && 'bg-chrono-primary/15 text-chrono-primary rounded-none',
                    isStart &&
                      'bg-chrono-primary text-white hover:bg-chrono-primary hover:text-white rounded-l-lg',
                    isEnd &&
                      'bg-chrono-primary text-white hover:bg-chrono-primary hover:text-white rounded-r-lg'
                  )}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

