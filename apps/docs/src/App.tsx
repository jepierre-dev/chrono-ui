import { useState } from 'react';
import {
  Button,
  ShimmerButton,
  BorderBeam,
  Badge,
  Input,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Checkbox,
  Switch,
  DatePicker,
  DateRangePicker,
  type DateRange,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Alert,
  AlertTitle,
  AlertDescription,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  AppHeader,
  FilterBar,
  type FilterChip,
  StatCard,
  Skeleton,
  EmptyState,
  Toaster,
  toast,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Progress,
  Spinner,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@chronosoft/ui';
import {
  Sparkles,
  CheckCircle,
  Moon,
  Sun,
  Bot,
  ExternalLink,
  Save,
  Trash2,
  DollarSign,
  Users,
  TrendingUp,
  Inbox,
  SlidersHorizontal,
  Bell,
  Check,
  AlertTriangle,
  Info,
  HelpCircle,
  Settings,
} from 'lucide-react';

export function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progressVal, setProgressVal] = useState(65);

  // Form states
  const [selectedRole, setSelectedRole] = useState('developer');
  const [singleDate, setSingleDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  const [marketingEmail, setMarketingEmail] = useState(true);
  const [security2FA, setSecurity2FA] = useState(false);

  // FilterBar states
  const [searchFilter, setSearchFilter] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterChip[]>([
    { id: '1', label: 'Rol', value: 'Ingeniero' },
    { id: '2', label: 'Estado', value: 'Activo' },
  ]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const removeFilter = (id: string) => {
    setActiveFilters((prev) => prev.filter((f) => f.id !== id));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchFilter('');
  };

  const triggerPromiseToast = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(() => resolve({ name: 'Proyecto Alpha' }), 2000)),
      {
        loading: 'Sincronizando con los servidores de Chronosoft...',
        success: (data: any) => `¡${data.name} sincronizado correctamente!`,
        error: 'Error al conectar con la API',
      }
    );
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-chrono-bg transition-colors duration-200">
        {/* Global Toast Notification Center */}
        <Toaster position="top-right" closeButton />

        {/* Enterprise App Header */}
        <AppHeader
          brand={
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-chrono-primary to-chrono-accent flex items-center justify-center text-white shadow-md">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-chrono-fg">
                Chronosoft UI
              </span>
            </div>
          }
          user={{
            name: 'Jeaan Dev',
            email: 'jeaan@chronosoft.com',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
          }}
          notificationsCount={3}
          onSearchClick={() => toast.info('Atajo Cmd+K activado')}
          onNotificationClick={() => toast('Tienes 3 notificaciones no leídas')}
          actions={
            <div className="flex items-center gap-2">
              <ShimmerButton
                className="h-9 px-3.5 text-xs"
                onClick={() => toast.success('Servidor MCP sincronizado con éxito')}
              >
                MCP Sync ✨
              </ShimmerButton>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleDarkMode}
                    aria-label="Alternar Modo Oscuro"
                  >
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Alternar Modo Claro / Oscuro</TooltipContent>
              </Tooltip>
            </div>
          }
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
          {/* Hero Section */}
          <div className="relative rounded-2xl border border-chrono-border bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-950 p-6 md:p-10 shadow-sm overflow-hidden">
            <BorderBeam size={250} duration={12} delay={0} />
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="accent" dot>
                  Magic UI + shadcn/ui Inspired
                </Badge>
                <Badge variant="outline">30+ Componentes & Feedback</Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-chrono-fg">
                Design System Corporativo & Notificaciones en Tiempo Real
              </h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                Componentes de formularios, fechas, filtros, modales, toasts, tooltips y microinteracciones
                optimizadas para aplicaciones web modernas y agentes de IA.
              </p>
            </div>
          </div>

          {/* KPI / Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Ingresos Recurrentes (MRR)"
              value="$42,850"
              change={14.8}
              changePeriod="vs el mes anterior"
              icon={<DollarSign className="h-5 w-5" />}
              sparklineData={[30, 45, 60, 50, 75, 90, 100]}
              highlight
            />
            <StatCard
              title="Usuarios Activos Diarios"
              value="18,340"
              change={8.2}
              changePeriod="vs semana pasada"
              icon={<Users className="h-5 w-5" />}
              sparklineData={[50, 60, 55, 70, 80, 85, 95]}
            />
            <StatCard
              title="Peticiones MCP Procesadas"
              value="1.2M"
              change={24.5}
              changePeriod="en tiempo real"
              icon={<TrendingUp className="h-5 w-5" />}
              sparklineData={[20, 35, 50, 65, 80, 95, 110]}
            />
          </div>

          {/* Tabbed Interactive Showcase */}
          <Tabs defaultValue="feedback" className="space-y-6">
            <div className="flex items-center justify-between border-b border-chrono-border pb-3">
              <TabsList>
                <TabsTrigger value="feedback">Feedback & Toasts 🔔</TabsTrigger>
                <TabsTrigger value="forms">Formularios & Fechas</TabsTrigger>
                <TabsTrigger value="filters">Filtros & Tablas</TabsTrigger>
                <TabsTrigger value="magic">Efectos Magic</TabsTrigger>
              </TabsList>
              <span className="hidden sm:inline-block text-xs text-slate-400">
                Totalmente compatible con React 19
              </span>
            </div>

            {/* TAB: FEEDBACK, TOASTS & NOTIFICATIONS */}
            <TabsContent value="feedback" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Toasts Interactive Playground */}
                <Card>
                  <CardHeader>
                    <CardTitle>Sistema de Notificaciones (Toasts)</CardTitle>
                    <CardDescription>
                      Retroalimentación contextual no intrusiva con soporte de promesas asíncronas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-slate-500">Haz clic para probar cada variante en vivo:</p>
                    <div className="flex flex-wrap gap-2.5">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => toast.success('Proyecto creado con éxito', { description: 'Los cambios se han guardado en la nube.' })}
                        startIcon={<Check className="h-4 w-4" />}
                      >
                        Toast Éxito
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => toast.error('Fallo en la autenticación', { description: 'Verifica tu token de acceso en Chronosoft.' })}
                        startIcon={<AlertTriangle className="h-4 w-4" />}
                      >
                        Toast Error
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => toast.info('Actualización en curso', { description: 'El despliegue terminará en unos instantes.' })}
                        startIcon={<Info className="h-4 w-4" />}
                      >
                        Toast Info
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={triggerPromiseToast}
                        startIcon={<Sparkles className="h-4 w-4 text-chrono-primary" />}
                      >
                        Toast con Promesa
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Tooltips & Popovers */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tooltips & Popovers Contextuales</CardTitle>
                    <CardDescription>
                      Detalles emergentes al posar el cursor o abrir mini-paneles
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon">
                            <HelpCircle className="h-4 w-4 text-slate-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Información de ayuda accesible para lectores de pantalla</p>
                        </TooltipContent>
                      </Tooltip>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="secondary" startIcon={<Settings className="h-4 w-4" />}>
                            Opciones Rápidas (Popover)
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 space-y-2">
                          <h4 className="text-sm font-semibold">Configuración de Vista</h4>
                          <p className="text-xs text-slate-500">Ajusta la densidad de información en tus tablas.</p>
                          <div className="pt-2 flex justify-end">
                            <Button size="sm" onClick={() => toast.success('Preferencia guardada')}>Aplicar</Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </CardContent>
                </Card>

                {/* Progress & Spinners */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Barras de Progreso & Indicadores de Carga</CardTitle>
                    <CardDescription>
                      Animaciones visuales fluidas para procesos de larga duración
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-medium">
                          <span>Almacenamiento de Archivos</span>
                          <span className="text-slate-500">{progressVal}% usado</span>
                        </div>
                        <Progress value={progressVal} variant="accent" showValue />
                        <div className="flex gap-2 pt-1">
                          <Button size="sm" variant="outline" onClick={() => setProgressVal(Math.max(10, progressVal - 15))}>
                            -15%
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setProgressVal(Math.min(100, progressVal + 15))}>
                            +15%
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-around p-4 rounded-xl border border-chrono-border bg-slate-50/50 dark:bg-slate-900/30">
                        <div className="text-center space-y-1">
                          <Spinner size="sm" variant="default" />
                          <p className="text-[10px] text-slate-400">sm</p>
                        </div>
                        <div className="text-center space-y-1">
                          <Spinner size="default" variant="primary" />
                          <p className="text-[10px] text-slate-400">default</p>
                        </div>
                        <div className="text-center space-y-1">
                          <Spinner size="lg" variant="accent" />
                          <p className="text-[10px] text-slate-400">lg</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* TAB: FORMULARIOS & FECHAS */}
            <TabsContent value="forms" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pickers de Fecha y Rango</CardTitle>
                    <CardDescription>
                      Componentes de calendario con localización en español y presets de analítica
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-slate-500 mb-1.5 block">
                        Fecha Individual (DatePicker)
                      </label>
                      <DatePicker value={singleDate} onChange={setSingleDate} />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-500 mb-1.5 block">
                        Intervalo de Fechas (DateRangePicker)
                      </label>
                      <DateRangePicker value={dateRange} onChange={setDateRange} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Controles de Formulario</CardTitle>
                    <CardDescription>
                      Selects estilizados, interruptores accesibles y cajas de verificación
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-slate-500 mb-1.5 block">
                        Rol de Usuario (Select)
                      </label>
                      <Select value={selectedRole} onValueChange={setSelectedRole}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrador del Sistema</SelectItem>
                          <SelectItem value="developer">Desarrollador Fullstack</SelectItem>
                          <SelectItem value="designer">Diseñador UI/UX</SelectItem>
                          <SelectItem value="ai-agent">Agente Autónomo IA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-2 space-y-3">
                      <Switch
                        checked={marketingEmail}
                        onCheckedChange={setMarketingEmail}
                        label="Alertas en tiempo real"
                        description="Recibe notificaciones inmediatas por correo y webhooks"
                      />

                      <Checkbox
                        checked={security2FA}
                        onCheckedChange={(c) => setSecurity2FA(!!c)}
                        label="Forzar autenticación MFA para este perfil"
                        description="Aumenta los requisitos de seguridad en cada inicio"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Entradas de Texto y Textarea</CardTitle>
                    <CardDescription>
                      Validaciones con helper texts y estados semánticos
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Escribe tu nombre completo..."
                      helperText="Visible para todos los miembros del equipo"
                    />
                    <Input
                      type="password"
                      defaultValue="clave-invalida"
                      error
                      errorMessage="La contraseña debe tener al menos 8 caracteres y un número"
                    />
                    <div className="md:col-span-2">
                      <Textarea
                        placeholder="Describe los requerimientos del proyecto..."
                        helperText="Máximo 500 caracteres"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* TAB: FILTROS & TABLAS */}
            <TabsContent value="filters" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Barra de Filtros Dinámicos (FilterBar)</CardTitle>
                  <CardDescription>
                    Diseñada para vistas de datos complejas, CRM y tablas de usuarios
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FilterBar
                    searchValue={searchFilter}
                    onSearchChange={setSearchFilter}
                    activeFilters={activeFilters}
                    onRemoveFilter={removeFilter}
                    onClearAll={clearAllFilters}
                    totalResults={142}
                    filterActions={
                      <Button
                        variant="outline"
                        size="sm"
                        startIcon={<SlidersHorizontal className="h-4 w-4" />}
                        onClick={() =>
                          setActiveFilters((prev) => [
                            ...prev,
                            { id: `${Date.now()}`, label: 'Filtro', value: 'Personalizado' },
                          ])
                        }
                      >
                        Añadir Filtro
                      </Button>
                    }
                  />

                  {/* Simulated Table */}
                  <div className="rounded-xl border border-chrono-border overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b border-chrono-border bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold text-slate-500">
                        <tr>
                          <th className="p-3.5">Colaborador</th>
                          <th className="p-3.5">Rol</th>
                          <th className="p-3.5">Estado</th>
                          <th className="p-3.5 text-right">Detalles</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-chrono-border">
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                          <td className="p-3.5 font-medium">Sofía Castro</td>
                          <td className="p-3.5 text-slate-500">Product Designer</td>
                          <td className="p-3.5">
                            <Badge variant="success" dot>Activo</Badge>
                          </td>
                          <td className="p-3.5 text-right">
                            <Button variant="ghost" size="sm" onClick={() => toast('Detalles de Sofía Castro')}>
                              Ver
                            </Button>
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                          <td className="p-3.5 font-medium">Mateo Rivas</td>
                          <td className="p-3.5 text-slate-500">Backend Lead</td>
                          <td className="p-3.5">
                            <Badge variant="accent">En revisión</Badge>
                          </td>
                          <td className="p-3.5 text-right">
                            <Button variant="ghost" size="sm" onClick={() => toast('Detalles de Mateo Rivas')}>
                              Ver
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Empty State Showcase */}
              <EmptyState
                icon={<Inbox className="h-6 w-6" />}
                title="No hay registros pendientes"
                description="Todos los tickets de soporte han sido resueltos satisfactoriamente."
                actionLabel="Crear nuevo ticket"
                onAction={() => toast.success('Ticket creado')}
              />
            </TabsContent>

            {/* TAB: MAGIC UI */}
            <TabsContent value="magic" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="relative overflow-hidden">
                  <BorderBeam size={180} duration={8} />
                  <CardHeader>
                    <CardTitle>ShimmerButton & BorderBeam</CardTitle>
                    <CardDescription>
                      Efectos Magic UI para destacar elementos clave
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-4 items-center">
                      <ShimmerButton onClick={() => toast.success('¡Acción Mágica ejecutada!')}>
                        Lanzar Acción Mágica ✨
                      </ShimmerButton>

                      <Button
                        variant="default"
                        isLoading={loading}
                        onClick={() => {
                          setLoading(true);
                          setTimeout(() => {
                            setLoading(false);
                            toast.success('Proceso finalizado');
                          }, 2000);
                        }}
                      >
                        Loading State
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Skeleton Loaders</CardTitle>
                    <CardDescription>
                      Estructuras de carga para prevenir saltos de layout (CLS)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1.5 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                    <Skeleton className="h-20 w-full rounded-xl" />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </TooltipProvider>
  );
}
