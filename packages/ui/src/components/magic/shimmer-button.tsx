import * as React from 'react';
import { cn } from '../../lib/utils.js';

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.05em',
      shimmerDuration = '3s',
      borderRadius = '0.75rem',
      background = 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            '--spread': '90deg',
            '--shimmer-color': shimmerColor,
            '--radius': borderRadius,
            '--speed': shimmerDuration,
            '--cut': shimmerSize,
            '--bg': background,
          } as React.CSSProperties
        }
        className={cn(
          'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 shadow-md hover:shadow-lg',
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {/* Spark perimeter animation */}
        <div
          className={cn(
            '-z-30 blur-[2px]',
            'absolute inset-0 overflow-visible [container-type:size]'
          )}
        >
          <div className="absolute inset-0 h-[100cqh] animate-spin [aspect-ratio:1] [border-radius:0] [mask:none]">
            <div className="animate-spin [animation-duration:var(--speed)] absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>

        {/* Content backdrop */}
        <div className="absolute [inset:var(--cut)] -z-20 [border-radius:var(--radius)] [background:var(--bg)]" />

        <span className="relative z-10 flex items-center gap-2 text-sm font-semibold tracking-wide">
          {children}
        </span>
      </button>
    );
  }
);
ShimmerButton.displayName = 'ShimmerButton';
