import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2.5', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: React.ReactNode;
  description?: string;
}

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, label, description, id, ...props }, ref) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  const itemNode = (
    <RadioGroupPrimitive.Item
      ref={ref}
      id={inputId}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-chrono-border text-chrono-primary shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-chrono-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-chrono-primary cursor-pointer',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2 w-2 fill-chrono-primary text-chrono-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );

  if (!label && !description) {
    return itemNode;
  }

  return (
    <div className="flex items-start space-x-2.5 select-none">
      {itemNode}
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
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
