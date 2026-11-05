import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '../../lib/utils.js';

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  label?: React.ReactNode;
  description?: string;
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, label, description, id, ...props }, ref) => {
  const generatedId = React.useId();
  const switchId = id || generatedId;

  const switchNode = (
    <SwitchPrimitives.Root
      id={switchId}
      className={cn(
        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chrono-primary/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-chrono-primary data-[state=unchecked]:bg-slate-200 dark:data-[state=unchecked]:bg-slate-800',
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitives.Root>
  );

  if (!label && !description) {
    return switchNode;
  }

  return (
    <div className="flex items-center justify-between space-x-3 select-none">
      <div className="space-y-0.5">
        {label && (
          <label
            htmlFor={switchId}
            className="text-sm font-medium cursor-pointer text-chrono-fg"
          >
            {label}
          </label>
        )}
        {description && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
      {switchNode}
    </div>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;
