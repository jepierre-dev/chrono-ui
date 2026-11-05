export interface RecipeDoc {
  name: string;
  title: string;
  description: string;
  componentsUsed: string[];
  code: string;
}

export const CHRONO_RECIPES: Record<string, RecipeDoc> = {
  'full-app-shell': {
    name: 'full-app-shell',
    title: 'Arquitectura Completa de Aplicación (Sidebar + Header con Breadcrumb + Main View)',
    description: 'La estructura de layout estándar para aplicaciones web SaaS de Chronosoft, con barra lateral colapsable, migas de pan y menú de usuario.',
    componentsUsed: ['SidebarProvider', 'Sidebar', 'SidebarHeader', 'SidebarContent', 'SidebarMenu', 'SidebarMenuItem', 'SidebarMenuButton', 'SidebarTrigger', 'AppHeader', 'Breadcrumb', 'Avatar', 'Badge'],
    code: `import React, { useState } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  AppHeader,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Badge,
  Avatar,
  AvatarFallback,
} from '@chronosoft/ui';
import { LayoutDashboard, Users, FileText, Settings, ShieldCheck } from 'lucide-react';

export function AppShell() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        {/* Collapsible Sidebar */}
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-chrono-primary flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="font-bold text-sm tracking-tight">Chronosoft</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeTab === 'dashboard'}
                    onClick={() => setActiveTab('dashboard')}
                    icon={<LayoutDashboard className="h-4 w-4" />}
                    tooltip="Dashboard"
                  >
                    Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeTab === 'users'}
                    onClick={() => setActiveTab('users')}
                    icon={<Users className="h-4 w-4" />}
                    tooltip="Usuarios"
                    badge={<Badge variant="secondary" className="text-[10px]">12</Badge>}
                  >
                    Usuarios
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeTab === 'reports'}
                    onClick={() => setActiveTab('reports')}
                    icon={<FileText className="h-4 w-4" />}
                    tooltip="Reportes"
                  >
                    Reportes
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Configuración</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeTab === 'settings'}
                    onClick={() => setActiveTab('settings')}
                    icon={<Settings className="h-4 w-4" />}
                    tooltip="Ajustes"
                  >
                    Ajustes
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <div className="flex items-center gap-3">
              <Avatar status="online" className="h-8 w-8">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col truncate">
                <span className="text-xs font-semibold">Jeaan Dev</span>
                <span className="text-[10px] text-slate-400">Admin</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header with SidebarTrigger & Breadcrumb */}
          <AppHeader
            brand={
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Plataforma</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="capitalize">{activeTab}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            }
            user={{ name: 'Jeaan Dev', email: 'jeaan@chronosoft.com' }}
            notificationsCount={2}
          />

          <main className="flex-1 p-6 overflow-y-auto">
            <h1 className="text-2xl font-bold capitalize mb-4">{activeTab}</h1>
            <p className="text-slate-500 text-sm">Vista dinámica renderizada con Chronosoft UI.</p>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}`,
  },
  'data-table-with-filters': {
    name: 'data-table-with-filters',
    title: 'Tabla de Datos Empresarial con Barra de Filtros y Rango de Fechas',
    description: 'Patrón integral para gestión de listas y tablas SaaS con FilterBar, DateRangePicker, Badges de estado y acciones.',
    componentsUsed: ['FilterBar', 'DateRangePicker', 'Badge', 'Button', 'Card', 'CardContent', 'Select'],
    code: `import React, { useState } from 'react';
import {
  FilterBar,
  DateRangePicker,
  type DateRange,
  Badge,
  Button,
  Card,
  CardContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@chronosoft/ui';
import { Download, MoreHorizontal } from 'lucide-react';

export function UserManagementTable() {
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [role, setRole] = useState('all');

  const activeFilters = [
    ...(role !== 'all' ? [{ id: 'role', label: 'Rol', value: role.toUpperCase() }] : []),
    ...(dateRange?.from ? [{ id: 'dates', label: 'Fechas', value: 'Rango activo' }] : []),
  ];

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        activeFilters={activeFilters}
        onRemoveFilter={(id) => {
          if (id === 'role') setRole('all');
          if (id === 'dates') setDateRange(undefined);
        }}
        onClearAll={() => {
          setSearch('');
          setRole('all');
          setDateRange(undefined);
        }}
        totalResults={128}
        filterActions={
          <>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-36 h-10">
                <SelectValue placeholder="Filtrar Rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los roles</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="member">Miembro</SelectItem>
              </SelectContent>
            </Select>

            <div className="w-64">
              <DateRangePicker value={dateRange} onChange={setDateRange} />
            </div>

            <Button variant="outline" startIcon={<Download className="h-4 w-4" />}>
              Exportar
            </Button>
          </>
        }
      />

      {/* Table Card Container */}
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-chrono-border bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold text-slate-500">
              <tr>
                <th className="p-4">Usuario</th>
                <th className="p-4">Rol</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-chrono-border">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                <td className="p-4 font-medium text-chrono-fg">Camila Morales</td>
                <td className="p-4 text-slate-500">Admin</td>
                <td className="p-4">
                  <Badge variant="success" dot>Activo</Badge>
                </td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="icon-sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}`,
  },
  'analytics-dashboard': {
    name: 'analytics-dashboard',
    title: 'Dashboard de Analítica con AppHeader y StatCards',
    description: 'Vista completa de panel de control con métricas, gráficos sparkline, banner Hero y atajo de búsqueda.',
    componentsUsed: ['AppHeader', 'StatCard', 'ShimmerButton', 'Alert', 'Tabs'],
    code: `import React from 'react';
import { AppHeader, StatCard, ShimmerButton, Alert, AlertTitle, AlertDescription } from '@chronosoft/ui';
import { Sparkles, DollarSign, Users, Activity } from 'lucide-react';

export function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-chrono-bg">
      <AppHeader
        brand={<div className="font-bold text-lg text-chrono-primary">Chronosoft Cloud</div>}
        user={{ name: 'Laura Gómez', email: 'laura@chronosoft.com' }}
        notificationsCount={4}
        onSearchClick={() => console.log('Abrir Cmd+K')}
        actions={
          <ShimmerButton className="h-9 px-4 text-xs">
            Upgrade Plan ✨
          </ShimmerButton>
        }
      />

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Ingresos Recurrentes"
            value="$128,450"
            change={18.2}
            icon={<DollarSign className="h-5 w-5" />}
            sparklineData={[30, 45, 55, 60, 75, 90, 100]}
            highlight
          />
          <StatCard
            title="Usuarios Nuevos"
            value="3,420"
            change={5.4}
            icon={<Users className="h-5 w-5" />}
            sparklineData={[40, 30, 50, 70, 60, 80, 85]}
          />
          <StatCard
            title="Tasa de Retención"
            value="98.7%"
            change={-0.3}
            icon={<Activity className="h-5 w-5" />}
            sparklineData={[99, 98, 99, 97, 98, 99, 98]}
          />
        </div>
      </main>
    </div>
  );
}`,
  },
};
