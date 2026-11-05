import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '../../lib/utils.js';

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  status?: 'online' | 'offline' | 'busy' | 'away';
}

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, status, children, ...props }, ref) => (
  <div className="relative inline-block">
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-chrono-border shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Root>
    {status && (
      <span
        className={cn(
          'absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-chrono-bg',
          status === 'online' && 'bg-emerald-500',
          status === 'offline' && 'bg-slate-400',
          status === 'busy' && 'bg-red-500',
          status === 'away' && 'bg-amber-500'
        )}
      />
    )}
  </div>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-chrono-fg',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
