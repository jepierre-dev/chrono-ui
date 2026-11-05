import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';

export const spinnerVariants = cva('animate-spin', {
  variants: {
    variant: {
      default: 'text-chrono-fg',
      primary: 'text-chrono-primary',
      accent: 'text-chrono-accent',
      white: 'text-white',
    },
    size: {
      sm: 'h-4 w-4',
      default: 'h-5 w-5',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
});

export interface SpinnerProps
  extends React.HTMLAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

export function Spinner({
  className,
  variant,
  size,
  label = 'Cargando...',
  ...props
}: SpinnerProps) {
  return (
    <div role="status" className="inline-flex items-center gap-2">
      <Loader2
        className={cn(spinnerVariants({ variant, size }), className)}
        {...props}
      />
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
}
