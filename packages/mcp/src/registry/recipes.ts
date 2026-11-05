export interface RecipeDoc {
  name: string;
  title: string;
  description: string;
  componentsUsed: string[];
  code: string;
}

export const CHRONO_RECIPES: Record<string, RecipeDoc> = {
  'auth-login': {
    name: 'auth-login',
    title: 'Tarjeta de Inicio de Sesión Corporativo',
    description: 'Formulario estándar de autenticación de Chronosoft con Card, Input, Button y manejo de estados.',
    componentsUsed: ['Card', 'CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter', 'Input', 'Button', 'Alert'],
    code: `import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Button,
  Alert,
  AlertDescription,
} from '@chronosoft/ui';
import { Mail, Lock, LogIn } from 'lucide-react';

export function ChronoLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Llamada de autenticación
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch {
      setError('Credenciales inválidas. Por favor verifique sus datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-chrono-primary">Chronosoft</CardTitle>
          <CardDescription>Inicia sesión en tu espacio de trabajo</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Input
              type="email"
              placeholder="nombre@chronosoft.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              startIcon={<Mail className="h-4 w-4" />}
              required
            />
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              startIcon={<Lock className="h-4 w-4" />}
              required
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" variant="default" className="w-full" isLoading={loading} startIcon={<LogIn className="h-4 w-4" />}>
              Iniciar Sesión
            </Button>
            <Button variant="link" className="text-xs">
              ¿Olvidaste tu contraseña?
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}`,
  },
  'dashboard-metric-card': {
    name: 'dashboard-metric-card',
    title: 'Tarjeta de Métrica KPI para Dashboard',
    description: 'Tarjeta de métrica con Badge de tendencia positiva/negativa y tipografía visual.',
    componentsUsed: ['Card', 'CardHeader', 'CardTitle', 'CardContent', 'Badge'],
    code: `import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@chronosoft/ui';
import { TrendingUp, Users } from 'lucide-react';

export function MetricCard() {
  return (
    <Card className="w-80">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">Usuarios Activos</CardTitle>
        <div className="rounded-md bg-chrono-primary/10 p-2 text-chrono-primary">
          <Users className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight">14,289</div>
        <div className="mt-2 flex items-center gap-2">
          <Badge variant="success" dot>
            +18.4%
          </Badge>
          <span className="text-xs text-slate-500">vs el mes anterior</span>
        </div>
      </CardContent>
    </Card>
  );
}`,
  },
};

