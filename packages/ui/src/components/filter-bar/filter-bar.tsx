import * as React from 'react';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { Input } from '../input/input.js';
import { Button } from '../button/button.js';
import { Badge } from '../badge/badge.js';

export interface FilterChip {
  id: string;
  label: string;
  value: string;
}

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  activeFilters?: FilterChip[];
  onRemoveFilter?: (id: string) => void;
  onClearAll?: () => void;
  filterActions?: React.ReactNode;
  totalResults?: number;
}

export function FilterBar({
  searchPlaceholder = 'Buscar en los registros...',
  searchValue = '',
  onSearchChange,
  activeFilters = [],
  onRemoveFilter,
  onClearAll,
  filterActions,
  totalResults,
  className,
  ...props
}: FilterBarProps) {
  const hasActiveFilters = activeFilters.length > 0 || searchValue.length > 0;

  return (
    <div className={cn('w-full space-y-3', className)} {...props}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            startIcon={<Search className="h-4 w-4" />}
            endIcon={
              searchValue ? (
                <button
                  type="button"
                  onClick={() => onSearchChange?.('')}
                  className="pointer-events-auto cursor-pointer p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : undefined
            }
          />
        </div>

        {/* Custom filters / actions */}
        <div className="flex items-center gap-2">
          {filterActions}

          {hasActiveFilters && onClearAll && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="text-xs text-slate-500 hover:text-red-500"
              startIcon={<RotateCcw className="h-3.5 w-3.5" />}
            >
              Restablecer
            </Button>
          )}
        </div>
      </div>

      {/* Active Filter Chips & Counter */}
      {(activeFilters.length > 0 || totalResults !== undefined) && (
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-medium flex items-center gap-1 text-slate-400">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filtros:
            </span>
            {activeFilters.map((filter) => (
              <Badge
                key={filter.id}
                variant="secondary"
                className="gap-1 pr-1.5 py-0.5 font-normal"
              >
                <span>{filter.label}:</span>
                <span className="font-semibold text-chrono-fg">{filter.value}</span>
                {onRemoveFilter && (
                  <button
                    type="button"
                    onClick={() => onRemoveFilter(filter.id)}
                    className="cursor-pointer ml-1 rounded-full p-0.5 hover:bg-slate-300 dark:hover:bg-slate-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            ))}
          </div>

          {totalResults !== undefined && (
            <div className="font-medium text-slate-400">
              {totalResults} {totalResults === 1 ? 'resultado' : 'resultados'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
