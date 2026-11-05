import * as React from 'react';
import { PanelLeft } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { Button } from '../button/button.js';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip/tooltip.js';

interface SidebarContextValue {
  open: boolean;
  setOpen: (open: boolean | ((value: boolean) => boolean)) => void;
  toggleSidebar: () => void;
  isMobile: boolean;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar debe usarse dentro de un <SidebarProvider />');
  }
  return context;
}

export interface SidebarProviderProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function SidebarProvider({
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  children,
  className,
}: SidebarProviderProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const [isMobile, setIsMobile] = React.useState(false);

  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (value: boolean | ((val: boolean) => boolean)) => {
      const nextOpen = typeof value === 'function' ? value(open) : value;
      if (onOpenChange) {
        onOpenChange(nextOpen);
      } else {
        setUncontrolledOpen(nextOpen);
      }
    },
    [open, onOpenChange]
  );

  const toggleSidebar = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  // Manejo de atajo de teclado Cmd+B / Ctrl+B
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  return (
    <SidebarContext.Provider
      value={{
        open,
        setOpen,
        toggleSidebar,
        isMobile,
      }}
    >
      <div
        className={cn(
          'flex min-h-screen w-full bg-chrono-bg text-chrono-fg',
          className
        )}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: 'icon' | 'offcanvas';
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, collapsible = 'icon', children, ...props }, ref) => {
    const { open } = useSidebar();

    return (
      <aside
        ref={ref}
        data-state={open ? 'expanded' : 'collapsed'}
        className={cn(
          'relative z-30 flex flex-col border-r border-chrono-border bg-chrono-card transition-all duration-300 ease-in-out shrink-0 select-none',
          open ? 'w-64' : collapsible === 'icon' ? 'w-16' : 'w-0 overflow-hidden',
          className
        )}
        {...props}
      >
        {children}
      </aside>
    );
  }
);
Sidebar.displayName = 'Sidebar';

export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon-sm"
      className={cn('text-slate-500 hover:text-chrono-fg', className)}
      onClick={toggleSidebar}
      aria-label="Alternar barra lateral (Ctrl+B)"
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
    </Button>
  );
});
SidebarTrigger.displayName = 'SidebarTrigger';

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex h-16 items-center px-4 border-b border-chrono-border shrink-0',
      className
    )}
    {...props}
  />
));
SidebarHeader.displayName = 'SidebarHeader';

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex-1 overflow-y-auto px-2 py-3 space-y-4', className)}
    {...props}
  />
));
SidebarContent.displayName = 'SidebarContent';

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center p-3 border-t border-chrono-border shrink-0',
      className
    )}
    {...props}
  />
));
SidebarFooter.displayName = 'SidebarFooter';

export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-1', className)} {...props} />
));
SidebarGroup.displayName = 'SidebarGroup';

export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { open } = useSidebar();

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'px-2 py-1 text-[11px] font-semibold tracking-wider text-slate-400 uppercase',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn('space-y-1', className)} {...props} />
));
SidebarMenu.displayName = 'SidebarMenu';

export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('relative', className)} {...props} />
));
SidebarMenuItem.displayName = 'SidebarMenuItem';

export const sidebarMenuButtonVariants = cva(
  'flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors outline-none cursor-pointer select-none',
  {
    variants: {
      isActive: {
        true: 'bg-chrono-primary/10 text-chrono-primary font-semibold',
        false: 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-chrono-fg',
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean;
  tooltip?: string;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
}

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    {
      className,
      isActive,
      asChild = false,
      tooltip,
      badge,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const { open } = useSidebar();
    const Comp = asChild ? Slot : 'button';

    const buttonNode = (
      <Comp
        ref={ref}
        className={cn(sidebarMenuButtonVariants({ isActive, className }), !open && 'justify-center px-0')}
        {...props}
      >
        {icon && <span className="h-4 w-4 shrink-0 flex items-center justify-center">{icon}</span>}
        {open && <span className="truncate flex-1 text-left">{children}</span>}
        {open && badge && <span className="ml-auto shrink-0">{badge}</span>}
      </Comp>
    );

    if (!open && tooltip) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{buttonNode}</TooltipTrigger>
          <TooltipContent side="right">{tooltip}</TooltipContent>
        </Tooltip>
      );
    }

    return buttonNode;
  }
);
SidebarMenuButton.displayName = 'SidebarMenuButton';

