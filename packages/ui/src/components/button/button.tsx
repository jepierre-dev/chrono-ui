import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { useIsLoading } from '../../context/loading-context.js';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chrono-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-chrono-bg disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-chrono-primary text-white hover:bg-chrono-primary-700 active:scale-[0.98] shadow-sm',
        secondary:
          'bg-chrono-secondary text-chrono-secondary-fg hover:bg-slate-200 dark:hover:bg-slate-800 border border-chrono-border',
        accent:
          'bg-chrono-accent text-white hover:bg-chrono-accent-600 shadow-sm active:scale-[0.98]',
        destructive:
          'bg-chrono-destructive text-white hover:bg-red-600 shadow-sm active:scale-[0.98]',
        outline:
          'border border-chrono-border bg-transparent hover:bg-slate-100 dark:hover:bg-slate-900 text-chrono-fg',
        ghost:
          'hover:bg-slate-100 dark:hover:bg-slate-800 text-chrono-fg',
        link:
          'text-chrono-primary underline-offset-4 hover:underline p-0 h-auto font-medium',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs rounded-md',
        lg: 'h-11 px-6 text-base rounded-lg',
        icon: 'h-10 w-10 p-0',
        'icon-sm': 'h-8 w-8 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingId?: string | string[];
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      loadingId,
      startIcon,
      endIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const contextLoading = useIsLoading(loadingId);
    const effectiveLoading = isLoading || contextLoading;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || effectiveLoading}
        aria-busy={effectiveLoading || undefined}
        {...props}
      >
        {effectiveLoading && <Loader2 className="h-4 w-4 animate-spin text-current" />}
        {!effectiveLoading && startIcon}
        {children}
        {!effectiveLoading && endIcon}
      </Comp>
    );
  }
);

Button.displayName = 'Button';


