import * as React from 'react';
import { cn } from '../../lib/utils.js';

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  borderRadius?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Botón con animación de resplandor fluido (Shimmer sweep).
 * Ideal para Call-To-Action principales y conversiones.
 */
export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      borderRadius = '0.75rem',
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        style={{ borderRadius }}
        className={cn(
          'group relative inline-flex items-center justify-center overflow-hidden px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
          'bg-gradient-to-r from-chrono-primary via-sky-600 to-chrono-accent hover:shadow-lg hover:shadow-sky-500/25',
          className
        )}
        {...props}
      >
        {/* Shimmer light sweep */}
        <span
          className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
        />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

ShimmerButton.displayName = 'ShimmerButton';
