import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../lib/utils.js';

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  label?: string;
  showValue?: boolean;
}

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, label, showValue = false, value, defaultValue, ...props }, ref) => {
  const displayVal = value ? value[0] : defaultValue ? defaultValue[0] : 0;

  return (
    <div className="w-full space-y-2">
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs font-medium">
          {label && <span className="text-chrono-fg">{label}</span>}
          {showValue && <span className="text-slate-500 font-mono">{displayVal}</span>}
        </div>
      )}
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          'relative flex w-full touch-none select-none items-center cursor-pointer',
          className
        )}
        value={value}
        defaultValue={defaultValue}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <SliderPrimitive.Range className="absolute h-full bg-chrono-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-chrono-primary/50 bg-white shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chrono-primary/50 disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
    </div>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

