import * as React from 'react';
import { cn } from '../../lib/utils.js';
import { LoadingOverlay } from '../loading/loading-overlay.js';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  loadingId?: string | string[];
  loadingMessage?: string;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, loadingId, loadingMessage, children, ...props }, ref) => (
    <div className="relative w-full overflow-auto rounded-xl border border-chrono-border">
      {loadingId && <LoadingOverlay loadingId={loadingId} message={loadingMessage} />}
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-sm text-left', className)}
        {...props}
      >
        {children}
      </table>
    </div>
  )
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      'border-b border-chrono-border bg-slate-50/75 dark:bg-slate-900/60 text-xs font-semibold text-slate-500 select-none [&_tr]:border-b-0',
      className
    )}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('divide-y divide-chrono-border bg-chrono-card [&_tr:last-child]:border-0', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t border-chrono-border bg-slate-50/50 dark:bg-slate-900/50 font-medium text-slate-500 [&>tr]:last:border-b-0',
      className
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/40 data-[state=selected]:bg-chrono-primary/10',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-11 px-4 text-left align-middle font-semibold text-slate-500 dark:text-slate-400 [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-4 align-middle text-chrono-fg [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-xs text-slate-500 dark:text-slate-400', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';
