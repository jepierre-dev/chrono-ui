import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';

export const progressVariants = cva(
  'h-full w-full flex-1 transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-chrono-primary',
        accent: 'bg-chrono-accent',
        success: 'bg-emerald-500',
        warning: 'bg-amber-500',
        destructive: 'bg-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  value?: number;
  showValue?: boolean;
}

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, variant = 'default', showValue = false, ...props }, ref) => (
  <div className="w-full space-y-1">
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(progressVariants({ variant }))}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
    {showValue && (
      <div className="flex justify-end text-xs font-medium text-slate-500">
        {Math.round(value || 0)}%
      </div>
    )}
  </div>
));
Progress.displayName = ProgressPrimitive.Root.displayName;
