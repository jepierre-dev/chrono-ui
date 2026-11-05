export interface ComponentPropDoc {
  name: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  description: string;
}

export interface ComponentDoc {
  name: string;
  description: string;
  category: 'Actions' | 'Forms' | 'Data Display' | 'Layout' | 'Feedback' | 'Overlay' | 'Magic';
  importStatement: string;
  props: ComponentPropDoc[];
  variants?: {
    [key: string]: string[];
  };
  bestPractices: {
    dos: string[];
    donts: string[];
  };
  examples: {
    title: string;
    code: string;
  }[];
}

export const CHRONO_COMPONENTS: Record<string, ComponentDoc> = {
  Button: {
    name: 'Button',
    category: 'Actions',
    description: 'Componente interactivo para disparar acciones, formularios o enlaces accesibles con soporte nativo de loadingId.',
    importStatement: "import { Button } from '@chronosoft/ui';",
    variants: {
      variant: ['default', 'secondary', 'accent', 'destructive', 'outline', 'ghost', 'link'],
      size: ['sm', 'default', 'lg', 'icon', 'icon-sm'],
    },
    props: [
      { name: 'variant', type: "'default' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'ghost' | 'link'", defaultValue: "'default'", description: 'Jerarquía visual.' },
      { name: 'size', type: "'sm' | 'default' | 'lg' | 'icon' | 'icon-sm'", defaultValue: "'default'", description: 'Dimensiones.' },
      { name: 'isLoading', type: 'boolean', defaultValue: 'false', description: 'Spinner accesible y deshabilitación manual.' },
      { name: 'loadingId', type: 'string | string[]', description: 'ID o lista de IDs del LoadingProvider para activar loading reactivamente.' },
      { name: 'startIcon', type: 'React.ReactNode', description: 'Icono a la izquierda.' },
      { name: 'endIcon', type: 'React.ReactNode', description: 'Icono a la derecha.' },
      { name: 'asChild', type: 'boolean', defaultValue: 'false', description: 'Composición mediante Radix Slot (ej. Next.js Link).' },
    ],
    bestPractices: {
      dos: [
        'Usa loadingId="id-operacion" para sincronizar el estado de carga automáticamente con el LoadingContext sin useState manual.',
        'Usa variant="default" (Chrono Blue) para la acción principal.',
      ],
      donts: ['No uses elementos <button> HTML estándar.', 'No uses múltiples botones primarios por sección.'],
    },
    examples: [
      {
        title: 'Botón con loadingId reactivo',
        code: `<Button variant="default" loadingId="save-profile" startIcon={<Save className="h-4 w-4" />}>
  Guardar Perfil
</Button>`,
      },
    ],
  },
  LoadingProvider: {
    name: 'LoadingProvider',
    category: 'Feedback',
    description: 'Contexto global de gestión de estados de carga por ID (Chronosoft Loading Engine). Permite a los componentes responder automáticamente a loadingId.',
    importStatement: "import { LoadingProvider, useLoading, useIsLoading } from '@chronosoft/ui';",
    props: [
      { name: 'initialState', type: 'Record<string, boolean>', description: 'Estado inicial de IDs de carga.' },
    ],
    bestPractices: {
      dos: [
        'Envuelve tu aplicación o layout principal en <LoadingProvider>.',
        'Usa withLoading(id, asyncFn) para que el estado se active y desactive solo sin bloque try/finally manual.',
      ],
      donts: ['No uses cientos de useState(false) cuando puedes usar withLoading("operacion", ...)'],
    },
    examples: [
      {
        title: 'Uso de withLoading en formulario',
        code: `const { withLoading } = useLoading();

const handleSave = () => {
  withLoading('save-user', async () => {
    await api.saveUser(data);
    toast.success('Guardado');
  });
};

return (
  <Card loadingId="save-user">
    <Button loadingId="save-user" onClick={handleSave}>Guardar</Button>
  </Card>
);`,
      },
    ],
  },
  LoadingOverlay: {
    name: 'LoadingOverlay',
    category: 'Feedback',
    description: 'Capa translúcida con desenfoque suave (blur) y Spinner para cubrir contenedores, tablas o formularios mientras su loadingId esté activo.',
    importStatement: "import { LoadingOverlay } from '@chronosoft/ui';",
    props: [
      { name: 'loadingId', type: 'string | string[]', description: 'ID a escuchar del LoadingProvider.' },
      { name: 'message', type: 'string', description: 'Texto opcional animado (ej. "Procesando pago...").' },
      { name: 'blur', type: "'sm' | 'md' | 'lg' | 'none'", defaultValue: "'sm'", description: 'Nivel de desenfoque de fondo.' },
    ],
    bestPractices: {
      dos: ['Colócalo dentro de un contenedor con position: relative o usa Card con prop loadingId.'],
      donts: ['No cubras toda la pantalla si solo una tarjeta o tabla se está actualizando.'],
    },
    examples: [
      {
        title: 'Overlay sobre tabla de datos',
        code: `<div className="relative">
  <LoadingOverlay loadingId="table-refresh" message="Cargando registros..." />
  <DataTable data={data} />
</div>`,
      },
    ],
  },
  ShimmerButton: {
    name: 'ShimmerButton',
    category: 'Magic',
    description: 'Botón de alto impacto visual con animación perimetral de resplandor (efecto Magic UI). Ideal para CTAs y Hero sections.',
    importStatement: "import { ShimmerButton } from '@chronosoft/ui';",
    props: [
      { name: 'shimmerColor', type: 'string', defaultValue: "'#ffffff'", description: 'Color del rayo perimetral.' },
      { name: 'shimmerDuration', type: 'string', defaultValue: "'3s'", description: 'Velocidad de rotación del brillo.' },
      { name: 'borderRadius', type: 'string', defaultValue: "'0.75rem'", description: 'Radio de bordes.' },
    ],
    bestPractices: {
      dos: ['Úsalo para el Call-To-Action más importante de tu landing o vista de conversión.'],
      donts: ['No llenes una misma página con múltiples ShimmerButtons.'],
    },
    examples: [
      {
        title: 'CTA Principal',
        code: `<ShimmerButton onClick={handleUpgrade}>\n  Comenzar Prueba Gratis ✨\n</ShimmerButton>`,
      },
    ],
  },
  Select: {
    name: 'Select',
    category: 'Forms',
    description: 'Menú desplegable accesible con Radix UI para selección única con filtrado y scroll automático.',
    importStatement: "import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from '@chronosoft/ui';",
    props: [
      { name: 'value', type: 'string', description: 'Valor seleccionado actual.' },
      { name: 'onValueChange', type: '(val: string) => void', description: 'Callback al cambiar de opción.' },
      { name: 'disabled', type: 'boolean', description: 'Deshabilita la interacción.' },
    ],
    bestPractices: {
      dos: ['Usa SelectItem dentro de SelectContent.', 'Usa SelectValue con placeholder descriptivo.'],
      donts: ['No uses <select> nativo en aplicaciones Chronosoft.'],
    },
    examples: [
      {
        title: 'Selector de Rol',
        code: `<Select value={role} onValueChange={setRole}>
  <SelectTrigger className="w-56">
    <SelectValue placeholder="Seleccionar rol" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="admin">Administrador</SelectItem>
    <SelectItem value="editor">Editor</SelectItem>
    <SelectItem value="viewer">Lector</SelectItem>
  </SelectContent>
</Select>`,
      },
    ],
  },
  DatePicker: {
    name: 'DatePicker',
    category: 'Forms',
    description: 'Selector de fecha individual con calendario emergente, localización en español y atajo "Hoy".',
    importStatement: "import { DatePicker } from '@chronosoft/ui';",
    props: [
      { name: 'value', type: 'Date | undefined', description: 'Fecha seleccionada.' },
      { name: 'onChange', type: '(date: Date | undefined) => void', description: 'Manejador de cambio de fecha.' },
      { name: 'placeholder', type: 'string', defaultValue: "'Seleccionar fecha...'", description: 'Texto placeholder.' },
    ],
    bestPractices: {
      dos: ['Usa DatePicker para fechas de nacimiento, vencimientos o eventos puntuales.'],
      donts: ['No uses inputs tipo date nativos que varían entre navegadores.'],
    },
    examples: [
      {
        title: 'Fecha de entrega',
        code: `<DatePicker value={dueDate} onChange={setDueDate} placeholder="Fecha límite de entrega" />`,
      },
    ],
  },
  DateRangePicker: {
    name: 'DateRangePicker',
    category: 'Forms',
    description: 'Selector de rango de fechas (from/to) con presets rápidos ("7 días", "30 días", "Este mes") para analítica y filtros.',
    importStatement: "import { DateRangePicker, type DateRange } from '@chronosoft/ui';",
    props: [
      { name: 'value', type: 'DateRange | undefined', description: 'Objeto { from?: Date, to?: Date }.' },
      { name: 'onChange', type: '(range: DateRange | undefined) => void', description: 'Callback de selección.' },
    ],
    bestPractices: {
      dos: ['Ideal para dashboards analíticos y reportes con intervalos de tiempo.'],
      donts: ['No uses dos DatePickers separados si el objetivo es un rango continuo.'],
    },
    examples: [
      {
        title: 'Filtro de reportes',
        code: `<DateRangePicker value={range} onChange={setRange} />`,
      },
    ],
  },
  FilterBar: {
    name: 'FilterBar',
    category: 'Layout',
    description: 'Barra completa de filtros para tablas y catálogos: búsqueda en vivo, chips activos eliminables, botón de reset y contador.',
    importStatement: "import { FilterBar, type FilterChip } from '@chronosoft/ui';",
    props: [
      { name: 'searchValue', type: 'string', description: 'Valor del input de búsqueda.' },
      { name: 'onSearchChange', type: '(val: string) => void', description: 'Manejador de cambio de búsqueda.' },
      { name: 'activeFilters', type: 'FilterChip[]', description: 'Array de { id, label, value }.' },
      { name: 'onRemoveFilter', type: '(id: string) => void', description: 'Eliminación individual de chip.' },
      { name: 'onClearAll', type: '() => void', description: 'Restablecer todos los filtros.' },
      { name: 'totalResults', type: 'number', description: 'Contador de elementos coincidentes.' },
    ],
    bestPractices: {
      dos: ['Colócalo siempre en la parte superior de tablas de datos y listas paginadas.'],
      donts: ['No reinventes chips de filtros individuales con divs manuales.'],
    },
    examples: [
      {
        title: 'Barra de filtros de usuarios',
        code: `<FilterBar
  searchValue={query}
  onSearchChange={setQuery}
  activeFilters={[{ id: 'role', label: 'Rol', value: 'Admin' }]}
  onRemoveFilter={handleRemove}
  onClearAll={handleClear}
  totalResults={42}
/>`,
      },
    ],
  },
  AppHeader: {
    name: 'AppHeader',
    category: 'Layout',
    description: 'Encabezado corporativo responsivo con soporte de marca, atajo de búsqueda global ⌘K, notificaciones y menú de usuario.',
    importStatement: "import { AppHeader } from '@chronosoft/ui';",
    props: [
      { name: 'brand', type: 'React.ReactNode', description: 'Logo o componente de identidad.' },
      { name: 'user', type: 'UserProfile', description: '{ name, email, avatarUrl }.' },
      { name: 'notificationsCount', type: 'number', description: 'Contador del badge de notificaciones.' },
      { name: 'onSearchClick', type: '() => void', description: 'Apertura de modal de búsqueda rápida Cmd+K.' },
      { name: 'onLogout', type: '() => void', description: 'Acción de cierre de sesión.' },
    ],
    bestPractices: {
      dos: ['Usa sticky top-0 para navegación fija en aplicaciones SaaS.'],
      donts: ['No sobrecargues el header con demasiados links; delega al Sidebar.'],
    },
    examples: [
      {
        title: 'Header de plataforma',
        code: `<AppHeader
  brand={<span className="font-bold text-lg text-chrono-primary">Chronosoft</span>}
  user={{ name: 'Alex Pérez', email: 'alex@chronosoft.com' }}
  notificationsCount={3}
  onSearchClick={() => setOpenCmdK(true)}
  onLogout={handleLogout}
/>`,
      },
    ],
  },
  Sidebar: {
    name: 'Sidebar',
    category: 'Layout',
    description: 'Sistema integral de barra lateral colapsable (con atajo Ctrl+B / Cmd+B), iconos compactos, tooltips automáticos y soporte de badges.',
    importStatement: "import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, useSidebar } from '@chronosoft/ui';",
    props: [
      { name: 'collapsible', type: "'icon' | 'offcanvas'", defaultValue: "'icon'", description: 'Modo de colapso: mostrar solo iconos o esconder completamente.' },
      { name: 'defaultOpen', type: 'boolean', defaultValue: 'true', description: 'Estado inicial expandido/colapsado en SidebarProvider.' },
    ],
    bestPractices: {
      dos: [
        'Envuelve el layout principal en <SidebarProvider>.',
        'Usa SidebarTrigger en el Header para que el usuario pueda alternar la visibilidad.',
        'Provee el prop tooltip="Nombre" en <SidebarMenuButton> para que al colapsar se muestre el tooltip.',
      ],
      donts: ['No anides sidebars dentro de sidebars.'],
    },
    examples: [
      {
        title: 'Sidebar estándar de aplicación',
        code: `<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <div className="font-bold text-chrono-primary">Chronosoft</div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navegación</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive icon={<LayoutDashboard className="h-4 w-4" />} tooltip="Dashboard">
              Dashboard
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <main className="flex-1 p-6">Contenido</main>
</SidebarProvider>`,
      },
    ],
  },
  Breadcrumb: {
    name: 'Breadcrumb',
    category: 'Layout',
    description: 'Navegación jerárquica tipo migas de pan para indicar la ubicación del usuario en la estructura de la aplicación.',
    importStatement: "import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@chronosoft/ui';",
    props: [],
    bestPractices: {
      dos: ['Colócalo en la parte superior izquierda del Header o antes del título de la página.'],
      donts: ['El último elemento debe ser siempre <BreadcrumbPage> (no clickeable).'],
    },
    examples: [
      {
        title: 'Miga de pan de proyecto',
        code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbLink href="/proyectos">Proyectos</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Chronosoft UI</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
      },
    ],
  },
  StatCard: {
    name: 'StatCard',
    category: 'Data Display',
    description: 'Tarjeta de métrica KPI con valor numérico, indicador porcentual de tendencia (+/-), sparkline mini-gráfico y soporte de highlight.',
    importStatement: "import { StatCard } from '@chronosoft/ui';",
    props: [
      { name: 'title', type: 'string', required: true, description: 'Etiqueta del KPI.' },
      { name: 'value', type: 'string | number', required: true, description: 'Valor actual.' },
      { name: 'change', type: 'number', description: 'Porcentaje de cambio (+/-).' },
      { name: 'sparklineData', type: 'number[]', description: 'Array de números para graficar barras mini.' },
      { name: 'highlight', type: 'boolean', description: 'Borde sutil con tono de acento Chrono.' },
    ],
    bestPractices: {
      dos: ['Agrupa varias StatCards en un grid responsivo (grid-cols-1 md:grid-cols-3).'],
      donts: ['No pongas textos extensos en el título.'],
    },
    examples: [
      {
        title: 'Métrica de Ingresos',
        code: `<StatCard
  title="Ingresos Recurrentes (MRR)"
  value="$48,250"
  change={12.5}
  sparklineData={[30, 45, 60, 50, 70, 90, 100]}
  highlight
/>`,
      },
    ],
  },
  Tabs: {
    name: 'Tabs',
    category: 'Layout',
    description: 'Navegación por pestañas accesible basada en Radix Tabs con animación sutil de activación.',
    importStatement: "import { Tabs, TabsList, TabsTrigger, TabsContent } from '@chronosoft/ui';",
    props: [
      { name: 'defaultValue', type: 'string', description: 'Tab activo por defecto.' },
      { name: 'value', type: 'string', description: 'Valor controlado.' },
      { name: 'onValueChange', type: '(tab: string) => void', description: 'Callback de cambio.' },
    ],
    bestPractices: {
      dos: ['Usa Tabs para alternar vistas secundarias sin recargar la página.'],
      donts: ['No uses más de 5 pestañas en pantallas móviles.'],
    },
    examples: [
      {
        title: 'Pestañas de Cuenta',
        code: `<Tabs defaultValue="general">
  <TabsList>
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="billing">Facturación</TabsTrigger>
  </TabsList>
  <TabsContent value="general"><p>Ajustes generales</p></TabsContent>
  <TabsContent value="billing"><p>Planes y facturas</p></TabsContent>
</Tabs>`,
      },
    ],
  },
  Checkbox: {
    name: 'Checkbox',
    category: 'Forms',
    description: 'Caja de selección accesible con label y descripción integrados.',
    importStatement: "import { Checkbox } from '@chronosoft/ui';",
    props: [
      { name: 'checked', type: 'boolean', description: 'Estado marcado.' },
      { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Callback de cambio.' },
      { name: 'label', type: 'React.ReactNode', description: 'Texto del label.' },
      { name: 'description', type: 'string', description: 'Texto explicativo inferior.' },
    ],
    bestPractices: {
      dos: ['Usa siempre label descriptivo.'],
      donts: ['No uses checkbox para alternar estados inmediatos que corresponden a un Switch.'],
    },
    examples: [
      {
        title: 'Aceptar términos',
        code: `<Checkbox label="Acepto los términos de servicio" description="Requerido para continuar" />`,
      },
    ],
  },
  Switch: {
    name: 'Switch',
    category: 'Forms',
    description: 'Interruptor toggle para ajustes y preferencias con activación inmediata.',
    importStatement: "import { Switch } from '@chronosoft/ui';",
    props: [
      { name: 'checked', type: 'boolean', description: 'Estado activado.' },
      { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Callback.' },
      { name: 'label', type: 'React.ReactNode', description: 'Etiqueta.' },
      { name: 'description', type: 'string', description: 'Texto de ayuda.' },
    ],
    bestPractices: {
      dos: ['Ideal para toggles de configuración (modo oscuro, notificaciones push).'],
      donts: ['No lo uses en formularios largos que requieran un botón final de "Guardar".'],
    },
    examples: [
      {
        title: 'Toggle de notificaciones',
        code: `<Switch label="Notificaciones por email" description="Recibe alertas en tiempo real" />`,
      },
    ],
  },
  EmptyState: {
    name: 'EmptyState',
    category: 'Feedback',
    description: 'Contenedor visual para listas vacías, búsquedas sin resultados o estados iniciales.',
    importStatement: "import { EmptyState } from '@chronosoft/ui';",
    props: [
      { name: 'icon', type: 'React.ReactNode', description: 'Icono representativo.' },
      { name: 'title', type: 'string', required: true, description: 'Título principal.' },
      { name: 'description', type: 'string', description: 'Mensaje descriptivo.' },
      { name: 'actionLabel', type: 'string', description: 'Texto del botón de acción.' },
      { name: 'onAction', type: '() => void', description: 'Callback del botón.' },
    ],
    bestPractices: {
      dos: ['Orienta siempre al usuario sobre cuál es el siguiente paso para añadir contenido.'],
      donts: ['No dejes una tabla vacía sin feedback visual.'],
    },
    examples: [
      {
        title: 'Sin proyectos creados',
        code: `<EmptyState
  icon={<FolderPlus className="h-6 w-6" />}
  title="Aún no tienes proyectos"
  description="Crea tu primer proyecto para comenzar a colaborar."
  actionLabel="Crear Proyecto"
  onAction={handleCreate}
/>`,
      },
    ],
  },
  Badge: {
    name: 'Badge',
    category: 'Data Display',
    description: 'Etiqueta para comunicar estados, categorías o contadores.',
    importStatement: "import { Badge } from '@chronosoft/ui';",
    variants: {
      variant: ['default', 'secondary', 'accent', 'destructive', 'success', 'warning', 'outline'],
    },
    props: [
      { name: 'variant', type: 'string', defaultValue: "'default'", description: 'Tono semántico.' },
      { name: 'dot', type: 'boolean', defaultValue: 'false', description: 'Indicador circular pulsante.' },
    ],
    bestPractices: {
      dos: ['Usa variant="success" con dot={true} para estado conectado/activo.'],
      donts: ['No uses Badge como botón de acción principal.'],
    },
    examples: [
      {
        title: 'Badge con punto de estado',
        code: `<Badge variant="success" dot>En línea</Badge>`,
      },
    ],
  },
  Input: {
    name: 'Input',
    category: 'Forms',
    description: 'Campo de texto con soporte de iconos, helperText y estados de error.',
    importStatement: "import { Input } from '@chronosoft/ui';",
    props: [
      { name: 'error', type: 'boolean', defaultValue: 'false', description: 'Borde rojo de error.' },
      { name: 'errorMessage', type: 'string', description: 'Mensaje de validación.' },
      { name: 'startIcon', type: 'React.ReactNode', description: 'Icono izquierdo.' },
      { name: 'endIcon', type: 'React.ReactNode', description: 'Icono derecho.' },
    ],
    bestPractices: {
      dos: ['Proporciona siempre placeholder y label o helperText.'],
      donts: ['No uses <input> estándar sin estilo.'],
    },
    examples: [
      {
        title: 'Input con Icono',
        code: `<Input placeholder="Buscar..." startIcon={<Search className="h-4 w-4" />} />`,
      },
    ],
  },
  Table: {
    name: 'Table',
    category: 'Data Display',
    description: 'Conjunto de componentes de tabla estilizados y accesibles (Table, TableHeader, TableBody, TableRow, TableHead, TableCell) con soporte integrado de loadingId.',
    importStatement: "import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from '@chronosoft/ui';",
    props: [
      { name: 'loadingId', type: 'string | string[]', description: 'ID de carga para mostrar LoadingOverlay automáticamente.' },
    ],
    bestPractices: {
      dos: ['Usa TableRow con hover automático para listas de datos densas.', 'Añade TableHead con encabezados descriptivos.'],
      donts: ['No uses tablas para maquetar layouts generales; usa Grid o Flexbox.'],
    },
    examples: [
      {
        title: 'Tabla básica de usuarios',
        code: `<Table loadingId="users-load">
  <TableHeader>
    <TableRow>
      <TableHead>Nombre</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Rol</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">Carlos Ruiz</TableCell>
      <TableCell>carlos@chronosoft.com</TableCell>
      <TableCell><Badge variant="success">Admin</Badge></TableCell>
    </TableRow>
  </TableBody>
</Table>`,
      },
    ],
  },
  Accordion: {
    name: 'Accordion',
    category: 'Layout',
    description: 'Lista de secciones colapsables accesibles basada en Radix Accordion con animación fluida.',
    importStatement: "import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@chronosoft/ui';",
    props: [
      { name: 'type', type: "'single' | 'multiple'", defaultValue: "'single'", description: 'Permite abrir una o varias secciones a la vez.' },
      { name: 'collapsible', type: 'boolean', defaultValue: 'true', description: 'Permite cerrar el elemento activo haciendo clic nuevamente.' },
    ],
    bestPractices: {
      dos: ['Ideal para preguntas frecuentes (FAQ) o acordeones de configuración detallada.'],
      donts: ['No uses acordeones para contenidos principales que el usuario deba ver inmediatamente.'],
    },
    examples: [
      {
        title: 'Acordeón de Preguntas Frecuentes',
        code: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>¿Cómo se integra el servidor MCP?</AccordionTrigger>
    <AccordionContent>Se agrega a la configuración de Cursor o Claude Desktop ejecutando el build de @chronosoft/mcp.</AccordionContent>
  </AccordionItem>
</Accordion>`,
      },
    ],
  },
  RadioGroup: {
    name: 'RadioGroup',
    category: 'Forms',
    description: 'Conjunto de botones de opción excluyentes accesibles con labels y descripciones.',
    importStatement: "import { RadioGroup, RadioGroupItem } from '@chronosoft/ui';",
    props: [
      { name: 'value', type: 'string', description: 'Opción seleccionada.' },
      { name: 'onValueChange', type: '(val: string) => void', description: 'Callback de cambio.' },
    ],
    bestPractices: {
      dos: ['Usa RadioGroup cuando hay entre 2 y 5 opciones visibles para comparar directamente.'],
      donts: ['Si hay más de 5 opciones, prefiere un Select.'],
    },
    examples: [
      {
        title: 'Selección de plan',
        code: `<RadioGroup defaultValue="pro">
  <RadioGroupItem value="free" label="Plan Gratuito" description="Hasta 3 proyectos" />
  <RadioGroupItem value="pro" label="Plan Profesional" description="Proyectos ilimitados y soporte 24/7" />
</RadioGroup>`,
      },
    ],
  },
  Slider: {
    name: 'Slider',
    category: 'Forms',
    description: 'Control deslizante numérico accesible con pista, relleno de color y thumb táctil.',
    importStatement: "import { Slider } from '@chronosoft/ui';",
    props: [
      { name: 'value', type: 'number[]', description: 'Valor controlado.' },
      { name: 'min', type: 'number', defaultValue: '0', description: 'Mínimo.' },
      { name: 'max', type: 'number', defaultValue: '100', description: 'Máximo.' },
      { name: 'step', type: 'number', defaultValue: '1', description: 'Incremento por paso.' },
      { name: 'showValue', type: 'boolean', defaultValue: 'false', description: 'Muestra el número actual.' },
    ],
    bestPractices: {
      dos: ['Usa Slider para volumen, presupuestos o selección de rangos continuos.'],
      donts: ['No lo uses si se requiere precisión exacta de números (usa Input type="number").'],
    },
    examples: [
      {
        title: 'Slider de presupuesto',
        code: `<Slider label="Presupuesto Mensual" showValue defaultValue={[50]} min={0} max={100} />`,
      },
    ],
  },
  Alert: {
    name: 'Alert',
    category: 'Feedback',
    description: 'Mensajes contextuales destacados con iconos semánticos automáticos.',
    importStatement: "import { Alert, AlertTitle, AlertDescription } from '@chronosoft/ui';",
    variants: {
      variant: ['default', 'info', 'success', 'warning', 'destructive'],
    },
    props: [
      { name: 'variant', type: 'string', defaultValue: "'default'", description: 'Nivel de severidad.' },
    ],
    bestPractices: {
      dos: ['Usa variant="destructive" para errores críticos de sistema.'],
      donts: ['No uses Alert para notificaciones efímeras tipo Toast.'],
    },
    examples: [
      {
        title: 'Alerta informativa',
        code: `<Alert variant="info"><AlertTitle>Mantenimiento</AlertTitle><AlertDescription>El sistema se actualizará a las 02:00 AM.</AlertDescription></Alert>`,
      },
    ],
  },
  Toast: {
    name: 'Toast',
    category: 'Feedback',
    description: 'Sistema integral de notificaciones toast (Sonner) con soporte de promesas, variantes de estado y acciones interactivas.',
    importStatement: "import { toast, Toaster } from '@chronosoft/ui';",
    props: [
      { name: 'message', type: 'string', required: true, description: 'Título o mensaje del toast.' },
      { name: 'description', type: 'string', description: 'Texto secundario explicativo.' },
      { name: 'action', type: '{ label: string, onClick: () => void }', description: 'Botón de acción rápida (ej. Deshacer).' },
    ],
    bestPractices: {
      dos: [
        'Monta <Toaster position="top-right" /> una sola vez en el componente raíz (App o layout).',
        'Usa toast.promise() para operaciones asíncronas con estados loading/success/error automáticos.',
        'Usa toast.success() tras mutaciones exitosas.',
      ],
      donts: [
        'No uses toasts para errores que requieran confirmación destructiva; para eso usa Dialog.',
      ],
    },
    examples: [
      {
        title: 'Toast con Éxito y Error',
        code: `// En el handler del botón:
toast.success('Perfil actualizado correctamente');
toast.error('No se pudo conectar al servidor');`,
      },
      {
        title: 'Toast asíncrono con Promise',
        code: `toast.promise(saveUserData(), {
  loading: 'Sincronizando con Chronosoft...',
  success: (data) => 'Datos guardados exitosamente',
  error: 'Fallo al guardar los cambios',
});`,
      },
    ],
  },
  Tooltip: {
    name: 'Tooltip',
    category: 'Feedback',
    description: 'Etiqueta emergente accesible con Radix UI para proporcionar contexto inmediato al posar el cursor o enfocar con teclado.',
    importStatement: "import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@chronosoft/ui';",
    props: [
      { name: 'content', type: 'React.ReactNode', required: true, description: 'Texto o elemento dentro del TooltipContent.' },
      { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", defaultValue: "'top'", description: 'Posición relativa.' },
    ],
    bestPractices: {
      dos: ['Añade Tooltip en botones de iconos que no tienen texto visible para garantizar accesibilidad.'],
      donts: ['No coloques información crítica en un tooltip que sea inaccesible en móviles.'],
    },
    examples: [
      {
        title: 'Tooltip en botón de icono',
        code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
    </TooltipTrigger>
    <TooltipContent>Eliminar elemento</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      },
    ],
  },
  Progress: {
    name: 'Progress',
    category: 'Feedback',
    description: 'Barra de progreso animada con variantes semánticas y porcentaje numérico opcional.',
    importStatement: "import { Progress } from '@chronosoft/ui';",
    variants: {
      variant: ['default', 'accent', 'success', 'warning', 'destructive'],
    },
    props: [
      { name: 'value', type: 'number', defaultValue: '0', description: 'Porcentaje actual de 0 a 100.' },
      { name: 'showValue', type: 'boolean', defaultValue: 'false', description: 'Muestra el número de porcentaje a la derecha.' },
      { name: 'variant', type: 'string', defaultValue: "'default'", description: 'Tono de la barra.' },
    ],
    bestPractices: {
      dos: ['Usa Progress para subida de archivos o completitud de perfil.'],
      donts: ['No uses Progress para tareas de duración indefinida; para eso usa Spinner.'],
    },
    examples: [
      {
        title: 'Barra de carga de almacenamiento',
        code: `<Progress value={68} showValue variant="accent" />`,
      },
    ],
  },
  Spinner: {
    name: 'Spinner',
    category: 'Feedback',
    description: 'Indicador giratorio de carga con tamaños (sm, default, lg, xl) y variantes de color.',
    importStatement: "import { Spinner } from '@chronosoft/ui';",
    props: [
      { name: 'size', type: "'sm' | 'default' | 'lg' | 'xl'", defaultValue: "'default'", description: 'Tamaño del spinner.' },
      { name: 'variant', type: "'default' | 'primary' | 'accent' | 'white'", defaultValue: "'primary'", description: 'Color.' },
    ],
    bestPractices: {
      dos: ['Úsalo dentro de tarjetas, modales o secciones mientras se resuelve una promesa.'],
      donts: ['No lo uses en botones que ya tienen el prop isLoading.'],
    },
    examples: [
      {
        title: 'Spinner de carga de sección',
        code: `<div className="flex justify-center p-8"><Spinner size="lg" variant="primary" /></div>`,
      },
    ],
  },
  Popover: {
    name: 'Popover',
    category: 'Overlay',
    description: 'Panel flotante accesible para desplegar configuraciones rápidas, formularios inline o confirmaciones.',
    importStatement: "import { Popover, PopoverTrigger, PopoverContent } from '@chronosoft/ui';",
    props: [],
    bestPractices: {
      dos: ['Usa Popover para controles compactos que no justifican un Dialog completo.'],
      donts: ['No anides Popovers dentro de Popovers.'],
    },
    examples: [
      {
        title: 'Popover de ajustes rápidos',
        code: `<Popover>
  <PopoverTrigger asChild><Button variant="outline">Ajustes</Button></PopoverTrigger>
  <PopoverContent className="w-64 p-3"><p className="text-xs font-semibold">Opciones Rápidas</p></PopoverContent>
</Popover>`,
      },
    ],
  },
  Dialog: {
    name: 'Dialog',
    category: 'Overlay',
    description: 'Ventana modal accesible basada en Radix UI con foco atrapado y bloqueo de scroll.',
    importStatement: "import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@chronosoft/ui';",
    props: [],
    bestPractices: {
      dos: ['Incluye siempre DialogTitle y DialogDescription para a11y.'],
      donts: ['No uses modales para flujos de más de 3 pasos.'],
    },
    examples: [
      {
        title: 'Modal de Confirmación',
        code: `<Dialog><DialogTrigger asChild><Button>Abrir</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Confirmar</DialogTitle></DialogHeader></DialogContent></Dialog>`,
      },
    ],
  },
};
