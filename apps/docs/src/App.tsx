import { useState } from 'react';
import {
  Button,
  Badge,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
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
} from '@chronosoft/ui';
import {
  Sparkles,
  Search,
  CheckCircle,
  Moon,
  Sun,
  Bot,
  ExternalLink,
  Save,
  Trash2,
} from 'lucide-react';

export function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-chrono-border bg-chrono-bg/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-chrono-primary to-chrono-accent flex items-center justify-center text-white shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-chrono-fg">
              Chronosoft UI
            </h1>
            <p className="text-xs text-slate-500">Design System & MCP Server</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="accent" dot>
            MCP Ready
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            title="Alternar Modo Oscuro"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Hero / Banner */}
      <main className="max-w-6xl mx-auto p-6 md:p-10 space-y-12">
        <section className="text-center space-y-4 py-8">
          <Badge variant="default" className="px-3 py-1 text-sm">
            v0.1.0 Architecture Preview
          </Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Diseñado para Humanos,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-chrono-primary to-chrono-accent">
              Optimizado para Agentes
            </span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg">
            Librería React accesible con tokens sincronizados y un servidor MCP integrado
            para que Cursor, Claude y Antigravity construyan interfaces sin fricción.
          </p>
        </section>

        {/* MCP Callout */}
        <Alert variant="info">
          <Bot className="h-5 w-5" />
          <AlertTitle>Model Context Protocol (@chronosoft/mcp) Activo</AlertTitle>
          <AlertDescription>
            Los agentes de IA pueden ejecutar <code>list_components</code>, <code>get_component_doc</code>, <code>get_recipe</code> y validar código JSX en tiempo real.
          </AlertDescription>
        </Alert>

        {/* Component Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Buttons Showcase */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons & Variantes</CardTitle>
              <CardDescription>
                Acciones jerarquizadas con soporte de estados asíncronos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive" startIcon={<Trash2 className="h-4 w-4" />}>
                  Delete
                </Button>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="default"
                  isLoading={loading}
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 2000);
                  }}
                  startIcon={<Save className="h-4 w-4" />}
                >
                  Probar Loading State
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Badges Showcase */}
          <Card>
            <CardHeader>
              <CardTitle>Badges & Tags</CardTitle>
              <CardDescription>
                Indicadores semánticos para estados y metadatos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="accent">Accent</Badge>
                <Badge variant="success" dot>Activo</Badge>
                <Badge variant="warning">Pendiente</Badge>
                <Badge variant="destructive">Error</Badge>
                <Badge variant="outline">Contorno</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Inputs Showcase */}
          <Card>
            <CardHeader>
              <CardTitle>Inputs & Formularios</CardTitle>
              <CardDescription>Campos accesibles con validación visual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Buscar recursos en Chronosoft..."
                startIcon={<Search className="h-4 w-4" />}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText="Escribe para probar la reactividad"
              />

              <Input
                placeholder="email@invalido"
                defaultValue="error.ejemplo"
                error
                errorMessage="Debe ingresar un correo corporativo válido"
              />
            </CardContent>
          </Card>

          {/* Modal / Dialog Showcase */}
          <Card>
            <CardHeader>
              <CardTitle>Dialog / Modal Accesible</CardTitle>
              <CardDescription>
                Construido sobre Radix UI con bloqueo de scroll y foco inteligente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" startIcon={<ExternalLink className="h-4 w-4" />}>
                    Abrir Modal Interactivo
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmación de Operación</DialogTitle>
                    <DialogDescription>
                      ¿Estás seguro de que deseas desplegar esta versión en el entorno de producción?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-2 text-sm text-slate-500">
                    Se generará un snapshot y se notificará al equipo de ingeniería.
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button variant="default" startIcon={<CheckCircle className="h-4 w-4" />}>
                      Confirmar Despliegue
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

