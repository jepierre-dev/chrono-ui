import * as React from 'react';
import { Toaster as Sonner, toast } from 'sonner';

export type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-chrono-card group-[.toaster]:text-chrono-fg group-[.toaster]:border-chrono-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl font-sans',
          description: 'group-[.toast]:text-slate-500 dark:group-[.toast]:text-slate-400 text-xs',
          actionButton:
            'group-[.toast]:bg-chrono-primary group-[.toast]:text-white group-[.toast]:rounded-lg text-xs font-medium',
          cancelButton:
            'group-[.toast]:bg-slate-100 dark:group-[.toast]:bg-slate-800 group-[.toast]:text-chrono-fg group-[.toast]:rounded-lg text-xs',
          success: 'group-[.toaster]:border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
          error: 'group-[.toaster]:border-red-500/30 text-red-600 dark:text-red-400',
          warning: 'group-[.toaster]:border-amber-500/30 text-amber-600 dark:text-amber-400',
          info: 'group-[.toaster]:border-sky-500/30 text-sky-600 dark:text-sky-400',
        },
      }}
      {...props}
    />
  );
}

export { toast };
