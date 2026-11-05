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
  category: 'Actions' | 'Forms' | 'Data Display' | 'Layout' | 'Feedback' | 'Overlay';
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
    description: 'Componente interactivo para disparar acciones, formularios o enlaces accesibles.',
    importStatement: "import { Button } from '@chronosoft/ui';",
    variants: {
      variant: ['default', 'secondary', 'accent', 'destructive', 'outline', 'ghost', 'link'],
      size: ['sm', 'default', 'lg', 'icon', 'icon-sm'],
    },
    props: [
      {
        name: 'variant',
        type: "'default' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'ghost' | 'link'",
        defaultValue: "'default'",
        description: 'Estilo visual de acuerdo con la jerarquía de la acción.',
      },
      {
        name: 'size',
        type: "'sm' | 'default' | 'lg' | 'icon' | 'icon-sm'",
        defaultValue: "'default'",
        description: 'Tamaño del botón.',
      },
      {
        name: 'isLoading',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Muestra un spinner accesible y deshabilita el botón.',
      },
      {
        name: 'startIcon',
        type: 'React.ReactNode',
        description: 'Icono a la izquierda del texto.',
      },
      {
        name: 'endIcon',
        type: 'React.ReactNode',
        description: 'Icono a la derecha del texto.',
      },
      {
        name: 'asChild',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Permite componer el botón como un enlace o elemento custom mediante Radix Slot.',
      },
    ],
    bestPractices: {
      dos: [
        'Usa variant="default" (azul Chrono) únicamente para la acción principal por vista.',
        'Acompaña acciones destructivas o irreversibles con variant="destructive".',
        'Usa isLoading durante peticiones asíncronas para prevenir doble envío.',
      ],
      donts: [
        'No uses múltiples botones primarios en el mismo bloque visual.',
        'No reemplaces Button con elementos <button> HTML estándar.',
      ],
    },
    examples: [
      {
        title: 'Botón Primario con Icono y Loading',
        code: `<Button variant="default" isLoading={isSubmitting} startIcon={<Save className="h-4 w-4" />}>
  Guardar Cambios
</Button>`,
      },
      {
        title: 'Botón como enlace Next.js/React Router',
        code: `<Button asChild variant="outline">
  <Link href="/dashboard">Ir al Dashboard</Link>
</Button>`,
      },
    ],
  },
  Badge: {
    name: 'Badge',
    category: 'Data Display',
    description: 'Etiqueta pequeña para comunicar estados, categorías o contadores.',
    importStatement: "import { Badge } from '@chronosoft/ui';",
    variants: {
      variant: ['default', 'secondary', 'accent', 'destructive', 'success', 'warning', 'outline'],
    },
    props: [
      {
        name: 'variant',
        type: "'default' | 'secondary' | 'accent' | 'destructive' | 'success' | 'warning' | 'outline'",
        defaultValue: "'default'",
        description: 'Tono semántico de la etiqueta.',
      },
      {
        name: 'dot',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Muestra un indicador circular de estado pulsante.',
      },
    ],
    bestPractices: {
      dos: [
        'Usa variant="success" para estados activos o exitosos.',
        'Usa dot={true} para indicar estado de conexión o monitoreo en tiempo real.',
      ],
      donts: ['No uses Badge como botón clickeable principal.'],
    },
    examples: [
      {
        title: 'Badge de Estado en Línea',
        code: `<Badge variant="success" dot>
  Sistema Activo
</Badge>`,
      },
    ],
  },
  Input: {
    name: 'Input',
    category: 'Forms',
    description: 'Campo de entrada de texto enriquecido con soporte de iconos, helperText y mensajes de validación.',
    importStatement: "import { Input } from '@chronosoft/ui';",
    props: [
      {
        name: 'error',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Marca el borde en rojo y activa el estado de error.',
      },
      {
        name: 'errorMessage',
        type: 'string',
        description: 'Texto descriptivo del error a corregir.',
      },
      {
        name: 'helperText',
        type: 'string',
        description: 'Texto de ayuda o instrucción inferior.',
      },
      {
        name: 'startIcon',
        type: 'React.ReactNode',
        description: 'Icono colocado dentro del input a la izquierda.',
      },
      {
        name: 'endIcon',
        type: 'React.ReactNode',
        description: 'Icono colocado dentro del input a la derecha.',
      },
    ],
    bestPractices: {
      dos: [
        'Proporciona siempre placeholder y label o helperText claro.',
        'Muestra errorMessage tan pronto falle la validación.',
      ],
      donts: ['No dejes el input sin etiqueta o descripción accesible.'],
    },
    examples: [
      {
        title: 'Input de Búsqueda con Icono',
        code: `<Input
  placeholder="Buscar registros..."
  startIcon={<Search className="h-4 w-4" />}
  helperText="Presiona Enter para filtrar"
/>`,
      },
    ],
  },
  Card: {
    name: 'Card',
    category: 'Layout',
    description: 'Contenedor visual modular con encabezado, contenido y pie para agrupar información relevante.',
    importStatement: "import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@chronosoft/ui';",
    props: [],
    bestPractices: {
      dos: [
        'Organiza vistas dashboard y formularios complejos dentro de Cards estructurados.',
        'Usa CardHeader para agrupar CardTitle y CardDescription de manera uniforme.',
      ],
      donts: ['No anides Cards innecesariamente uno dentro de otro a menos que sea un grid.'],
    },
    examples: [
      {
        title: 'Tarjeta de Cuenta de Usuario',
        code: `<Card>
  <CardHeader>
    <CardTitle>Configuración de Seguridad</CardTitle>
    <CardDescription>Administra tus credenciales de acceso</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm">Autenticación de dos factores: Habilitada</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Cambiar Clave</Button>
  </CardFooter>
</Card>`,
      },
    ],
  },
  Alert: {
    name: 'Alert',
    category: 'Feedback',
    description: 'Mensajes contextuales destacados para advertencias, errores o información importante.',
    importStatement: "import { Alert, AlertTitle, AlertDescription } from '@chronosoft/ui';",
    variants: {
      variant: ['default', 'info', 'success', 'warning', 'destructive'],
    },
    props: [
      {
        name: 'variant',
        type: "'default' | 'info' | 'success' | 'warning' | 'destructive'",
        defaultValue: "'default'",
        description: 'Nivel de severidad del mensaje.',
      },
      {
        name: 'hideIcon',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Oculta el icono semántico por defecto.',
      },
    ],
    bestPractices: {
      dos: [
        'Usa variant="destructive" para errores críticos de sistema o permisos denegados.',
        'Usa variant="warning" para advertir antes de acciones con consecuencias.',
      ],
      donts: ['No uses Alert para notificaciones temporales que deberían ser Toast.'],
    },
    examples: [
      {
        title: 'Alerta de Error de Servidor',
        code: `<Alert variant="destructive">
  <AlertTitle>Fallo en la sincronización</AlertTitle>
  <AlertDescription>No fue posible comunicarse con la API de Chronosoft. Reintente en 5 minutos.</AlertDescription>
</Alert>`,
      },
    ],
  },
  Dialog: {
    name: 'Dialog',
    category: 'Overlay',
    description: 'Ventana modal accesible construida sobre Radix UI con bloqueo de scroll, foco atrapado y accesibilidad completa.',
    importStatement: "import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@chronosoft/ui';",
    props: [],
    bestPractices: {
      dos: [
        'Provee siempre un DialogTitle y DialogDescription para lectores de pantalla.',
        'Coloca botones de acción de confirmación y cancelación en el DialogFooter.',
      ],
      donts: ['No satures los modales con flujos de más de 3 pasos.'],
    },
    examples: [
      {
        title: 'Modal de Confirmación de Eliminación',
        code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Eliminar Proyecto</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>¿Confirmar eliminación?</DialogTitle>
      <DialogDescription>Esta acción no se puede deshacer.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogClose>
      <Button variant="destructive">Sí, Eliminar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    ],
  },
};

