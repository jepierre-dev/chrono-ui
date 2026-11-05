# Chronosoft UI & MCP Server

> Design System corporativo en React + TypeScript y servidor Model Context Protocol (MCP) para que cualquier agente de IA (Antigravity, Cursor, Claude Desktop, Windsurf) construya y valide interfaces con la librería oficial de Chronosoft sin fricción.

---

## 🏗️ Arquitectura Monorepo (pnpm)

```text
chrono-ui/
├── packages/
│   ├── tokens/         # 🎨 @chronosoft/tokens: Colores, tipografía, radios, preset Tailwind y CSS variables
│   ├── ui/             # 📦 @chronosoft/ui: Componentes React (Button, Input, Card, Badge, Dialog, Alert)
│   └── mcp/            # 🧠 @chronosoft/mcp: Servidor Model Context Protocol con herramientas y catálogo
├── apps/
│   └── docs/           # 📖 Showcase visual interactivo con React 19 + Vite + Tailwind
├── pnpm-workspace.yaml
└── package.json
```

---

## ⚡ Comandos Rápidos

> **Política Estricta**: Este repositorio utiliza exclusivamente `pnpm`. No ejecutes `npm`, `npx` ni `yarn`.

```bash
# Instalar dependencias en todo el monorepo
pnpm install

# Compilar todos los paquetes (@chronosoft/tokens, @chronosoft/ui, @chronosoft/mcp, apps/docs)
pnpm build

# Iniciar la app de demostración y showcase
pnpm --filter docs dev

# Iniciar el servidor MCP en modo standalone
pnpm --filter @chronosoft/mcp start
```

---

## 🤖 Cómo Conectar el Servidor MCP en tu Editor / Cliente IA

### 1. En Antigravity / Cursor (`mcp_config.json` o `.cursor/mcp.json`)

Añade lo siguiente a tu configuración MCP:

```json
{
  "mcpServers": {
    "chronosoft-ui": {
      "command": "node",
      "args": ["C:/DEV/chrono-ui/packages/mcp/dist/index.js"]
    }
  }
}
```

### 2. En Claude Desktop (`claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "chronosoft-ui": {
      "command": "node",
      "args": ["C:\\DEV\\chrono-ui\\packages\\mcp\\dist\\index.js"]
    }
  }
}
```

---

## 🛠️ Herramientas MCP Disponibles para Agentes

| Herramienta | Parámetros | Descripción |
| :--- | :--- | :--- |
| `list_components` | `category?`, `search?` | Catálogo de componentes disponibles, variantes y rutas de importación. |
| `get_component_doc` | `name` (e.g. `"Button"`, `"Dialog"`) | Especificación técnica completa: props, tipos TypeScript, buenas prácticas (Do's & Don'ts) y snippets funcionales. |
| `get_design_tokens` | `scope?` (`"all"`, `"brandIdentity"`, `"cssVariables"`, `"tailwindUtilityClasses"`) | Paleta de colores Chronosoft, escala tipográfica y clases Tailwind. |
| `get_recipe` | `recipe_name` (`"auth-login"`, `"dashboard-metric-card"`, `"list"`) | Plantillas y patrones completos listos para producción. |
| `validate_ui_code` | `code` (JSX/TSX string) | Valida si el agente usó HTML plano (`<button>`, `<input>`) en vez de los componentes oficiales de Chronosoft y otorga un puntaje con sugerencias de refactorización. |

---

## 📦 Componentes Iniciales Incluidos

- **Button**: Acciones primarias (Chrono Blue), secundarias, accent (Chrono Cyan), destructivas, outline y ghost. Soporte de `isLoading`, `startIcon`, `endIcon` y `asChild` para links.
- **Badge**: Indicadores semánticos (success, warning, destructive, accent) con soporte de `dot` activo.
- **Input**: Entradas con iconos a la izquierda/derecha, estados de error y textos de ayuda.
- **Card**: Contenedores modulares (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`).
- **Dialog**: Modales accesibles basados en Radix UI (`DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogClose`).
- **Alert**: Mensajes contextuales con iconos semánticos automáticos y variantes informativas/destructivas.
