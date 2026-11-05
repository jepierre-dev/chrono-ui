import * as React from 'react';
import { cn } from '../../lib/utils.js';
import { useIsLoading } from '../../context/loading-context.js';
import { Spinner } from '../spinner/spinner.js';

export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  loadingId?: string | string[];
  isLoading?: boolean;
  message?: string;
  blur?: 'sm' | 'md' | 'lg' | 'none';
}

export function LoadingOverlay({
  loadingId,
  isLoading: manualLoading,
  message,
  blur = 'sm',
  className,
  ...props
}: LoadingOverlayProps) {
  const contextLoading = useIsLoading(loadingId);
  const active = manualLoading !== undefined ? manualLoading : contextLoading;

  if (!active) return null;

  return (
    <div
      aria-live="polite"
      aria-busy="true"
      className={cn(
        'absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 rounded-[inherit] bg-chrono-bg/70 dark:bg-chrono-bg/80 animate-in fade-in-0 duration-200',
        blur === 'sm' && 'backdrop-blur-xs',
        blur === 'md' && 'backdrop-blur-sm',
        blur === 'lg' && 'backdrop-blur-md',
        className
      )}
      {...props}
    >
      <Spinner size="lg" variant="primary" />
      {message && (
        <p className="text-xs font-semibold text-chrono-fg tracking-wide animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}

