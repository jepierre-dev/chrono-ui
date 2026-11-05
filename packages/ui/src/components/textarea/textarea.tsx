import * as React from 'react';
import { cn } from '../../lib/utils.js';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, errorMessage, helperText, disabled, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-lg border bg-chrono-bg px-3 py-2 text-sm text-chrono-fg placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chrono-primary/50 focus-visible:border-chrono-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all',
            error
              ? 'border-red-500 focus-visible:ring-red-400/50 focus-visible:border-red-500'
              : 'border-chrono-border',
            className
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {error && errorMessage && (
          <p className="text-xs text-red-600 dark:text-red-400 font-medium">
            {errorMessage}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
