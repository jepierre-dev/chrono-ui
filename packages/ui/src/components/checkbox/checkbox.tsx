import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: React.ReactNode;
  description?: string;
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, description, id, ...props }, ref) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  const checkboxNode = (
    <CheckboxPrimitive.Root
      ref={ref}
      id={inputId}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded border border-chrono-border shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chrono-primary/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-chrono-primary data-[state=checked]:border-chrono-primary data-[state=checked]:text-white cursor-pointer',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center text-current')}
      >
        <Check className="h-3.5 w-3.5 stroke-[3]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (!label && !description) {
    return checkboxNode;
  }

  return (
    <div className="flex items-start space-x-2.5 select-none">
      {checkboxNode}
      <div className="grid gap-1 leading-none">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none cursor-pointer text-chrono-fg peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
    </div>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

