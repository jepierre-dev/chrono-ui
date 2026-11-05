import * as React from 'react';
import { Bell, Command, Search } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { Button } from '../button/button.js';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar/avatar.js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../dropdown-menu/dropdown-menu.js';

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
}

export interface AppHeaderProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  user?: UserProfile;
  notificationsCount?: number;
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
  onLogout?: () => void;
  actions?: React.ReactNode;
}

export function AppHeader({
  brand,
  user,
  notificationsCount = 0,
  onSearchClick,
  onNotificationClick,
  onLogout,
  actions,
  className,
  ...props
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-chrono-border bg-chrono-bg/90 px-4 md:px-6 backdrop-blur-md',
        className
      )}
      {...props}
    >
      {/* Brand / Left */}
      <div className="flex items-center gap-4">{brand}</div>

      {/* Center Search Shortcut */}
      {onSearchClick && (
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <button
            type="button"
            onClick={onSearchClick}
            className="flex h-9 w-full items-center justify-between rounded-lg border border-chrono-border bg-slate-50 dark:bg-slate-900 px-3 text-xs text-slate-400 hover:border-chrono-primary/50 transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Buscar en la aplicación...</span>
            </div>
            <kbd className="flex items-center gap-0.5 rounded border border-chrono-border bg-chrono-bg px-1.5 py-0.5 font-mono text-[10px] text-slate-500 shadow-xs">
              <Command className="h-3 w-3" /> K
            </kbd>
          </button>
        </div>
      )}

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {actions}

        {/* Notification Bell */}
        {onNotificationClick && (
          <div className="relative">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onNotificationClick}
              className="text-slate-500 hover:text-chrono-fg"
            >
              <Bell className="h-4 w-4" />
            </Button>
            {notificationsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-chrono-destructive px-1 text-[10px] font-bold text-white ring-2 ring-chrono-bg">
                {notificationsCount > 99 ? '99+' : notificationsCount}
              </span>
            )}
          </div>
        )}

        {/* User Profile Dropdown */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2.5 rounded-full p-0.5 outline-none focus:ring-2 focus:ring-chrono-ring cursor-pointer"
              >
                <Avatar status="online" className="h-8 w-8">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold leading-none text-chrono-fg">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-slate-400">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Mi Perfil</DropdownMenuItem>
              <DropdownMenuItem>Ajustes de Cuenta</DropdownMenuItem>
              <DropdownMenuItem>Preferencias</DropdownMenuItem>
              <DropdownMenuSeparator />
              {onLogout && (
                <DropdownMenuItem destructive onClick={onLogout}>
                  Cerrar Sesión
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

