import * as React from 'react';
import { cn } from '../../lib/utils.js';
import { Button } from '../button/button.js';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryAction?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryAction,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-chrono-border p-8 md:p-12 text-center bg-slate-50/50 dark:bg-slate-900/30',
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-chrono-primary/10 text-chrono-primary shadow-sm">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-chrono-fg">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      )}
      {(actionLabel || secondaryAction) && (
        <div className="mt-6 flex items-center gap-3">
          {actionLabel && (
            <Button variant="default" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}

