import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { CHRONO_COMPONENTS } from './registry/components.js';
import { CHRONO_TOKENS_DOC } from './registry/tokens.js';
import { CHRONO_RECIPES } from './registry/recipes.js';
import { CHRONO_AGENT_GUIDELINES } from './registry/guidelines.js';

const server = new Server(
  {
    name: 'chronosoft-ui-mcp',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// --- TOOLS DEFINITIONS ---
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'list_components',
        description:
          'Lista todos los componentes disponibles en la librería @chronosoft/ui, con opción de filtrar por categoría o término de búsqueda.',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'Filtrar por categoría (Actions, Forms, Data Display, Layout, Feedback, Overlay)',
            },
            search: {
              type: 'string',
              description: 'Término de búsqueda para filtrar por nombre o descripción',
            },
          },
        },
      },
      {
        name: 'get_component_doc',
        description:
          'Obtiene la documentación exhaustiva de un componente de @chronosoft/ui: props, tipos TypeScript, variantes, ejemplos de código y guías de uso.',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Nombre del componente (e.g., Button, Badge, Input, Card, Dialog, Alert)',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'get_design_tokens',
        description:
          'Obtiene la definición de tokens de diseño de Chronosoft: paleta de colores, variables CSS, clases Tailwind y guías de espaciado.',
        inputSchema: {
          type: 'object',
          properties: {
            scope: {
              type: 'string',
              enum: ['all', 'brandIdentity', 'cssVariables', 'tailwindUtilityClasses'],
              description: 'Sección de tokens a consultar. Por defecto "all".',
            },
          },
        },
      },
      {
        name: 'get_recipe',
        description:
          'Obtiene recetas y plantillas completas de interfaz creadas con componentes de Chronosoft UI (e.g. login, metric-card).',
        inputSchema: {
          type: 'object',
          properties: {
            recipe_name: {
              type: 'string',
              description: 'Nombre de la receta: "auth-login" o "dashboard-metric-card" (o "list" para ver disponibles)',
            },
          },
          required: ['recipe_name'],
        },
      },
      {
        name: 'validate_ui_code',
        description:
          'Analiza un fragmento de código TSX/JSX escrito por un agente y valida si cumple con las normas de Chronosoft UI, alertando sobre uso indebido de etiquetas HTML nativas.',
        inputSchema: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              description: 'El código JSX / TSX a inspeccionar',
            },
          },
          required: ['code'],
        },
      },
    ],
  };
});

// --- TOOL HANDLERS ---
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'list_components': {
      const categoryFilter = args?.category as string | undefined;
      const searchFilter = (args?.search as string | undefined)?.toLowerCase();

      let list = Object.values(CHRONO_COMPONENTS);

      if (categoryFilter) {
        list = list.filter(
          (c) => c.category.toLowerCase() === categoryFilter.toLowerCase()
        );
      }

      if (searchFilter) {
        list = list.filter(
          (c) =>
            c.name.toLowerCase().includes(searchFilter) ||
            c.description.toLowerCase().includes(searchFilter)
        );
      }

      const summary = list.map((c) => ({
        name: c.name,
        category: c.category,
        description: c.description,
        import: c.importStatement,
        variants: c.variants ? Object.keys(c.variants) : [],
      }));

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(summary, null, 2),
          },
        ],
      };
    }

    case 'get_component_doc': {
      const compName = args?.name as string;
      const doc = CHRONO_COMPONENTS[compName];

      if (!doc) {
        const available = Object.keys(CHRONO_COMPONENTS).join(', ');
        return {
          content: [
            {
              type: 'text',
              text: `Error: Componente "${compName}" no encontrado. Componentes disponibles: ${available}`,
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(doc, null, 2),
          },
        ],
      };
    }

    case 'get_design_tokens': {
      const scope = (args?.scope as string) || 'all';
      if (scope === 'all') {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(CHRONO_TOKENS_DOC, null, 2),
            },
          ],
        };
      }

      const section = (CHRONO_TOKENS_DOC as Record<string, unknown>)[scope];
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(section || CHRONO_TOKENS_DOC, null, 2),
          },
        ],
      };
    }

    case 'get_recipe': {
      const recipeName = args?.recipe_name as string;
      if (recipeName === 'list') {
        const list = Object.values(CHRONO_RECIPES).map((r) => ({
          name: r.name,
          title: r.title,
          description: r.description,
          components: r.componentsUsed,
        }));
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(list, null, 2),
            },
          ],
        };
      }

      const recipe = CHRONO_RECIPES[recipeName];
      if (!recipe) {
        return {
          content: [
            {
              type: 'text',
              text: `Receta "${recipeName}" no encontrada. Recetas disponibles: ${Object.keys(CHRONO_RECIPES).join(', ')}`,
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: `### ${recipe.title}\n\n${recipe.description}\n\n**Componentes usados:** ${recipe.componentsUsed.join(', ')}\n\n\`\`\`tsx\n${recipe.code}\n\`\`\``,
          },
        ],
      };
    }

    case 'validate_ui_code': {
      const code = (args?.code as string) || '';
      const issues: string[] = [];
      const suggestions: string[] = [];

      // Detección de <button> nativo
      if (/<button\b[^>]*>/i.test(code)) {
        issues.push('Uso detectado de etiqueta HTML nativa <button>.');
        suggestions.push('Reemplazar con <Button variant="default|secondary|outline|destructive"> de @chronosoft/ui.');
      }

      // Detección de <input> nativo
      if (/<input\b[^>]*>/i.test(code)) {
        issues.push('Uso detectado de etiqueta HTML nativa <input>.');
        suggestions.push('Reemplazar con <Input placeholder="..." error={...} errorMessage={...}> de @chronosoft/ui.');
      }

      // Falta de import de @chronosoft/ui
      if (!code.includes('@chronosoft/ui')) {
        issues.push('No se detectó el import desde "@chronosoft/ui".');
        suggestions.push('Añadir: import { Button, Input, ... } from "@chronosoft/ui";');
      }

      // Verificación de dark mode hardcodeado
      if (code.includes('bg-white') && !code.includes('dark:')) {
        issues.push('Uso de color fijo "bg-white" sin variante dark.');
        suggestions.push('Usar "bg-chrono-bg" o "bg-chrono-card" para soporte automático de modo oscuro.');
      }

      const valid = issues.length === 0;

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                isValidChronosoftCode: valid,
                score: valid ? '100/100' : `${Math.max(0, 100 - issues.length * 25)}/100`,
                issues,
                suggestions,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    default:
      throw new Error(`Herramienta desconocida: ${name}`);
  }
});

// --- RESOURCES DEFINITIONS ---
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'chrono://components',
        name: 'Catálogo de Componentes Chronosoft UI',
        mimeType: 'application/json',
        description: 'Lista completa y especificaciones de componentes de @chronosoft/ui',
      },
      {
        uri: 'chrono://tokens',
        name: 'Design Tokens de Chronosoft',
        mimeType: 'application/json',
        description: 'Colores, tipografía y variables de diseño del sistema',
      },
      {
        uri: 'chrono://guidelines',
        name: 'Guías de Diseño para Agentes de IA',
        mimeType: 'text/markdown',
        description: 'Reglas de oro que todo agente debe seguir al usar Chronosoft UI',
      },
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  if (uri === 'chrono://components') {
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(CHRONO_COMPONENTS, null, 2),
        },
      ],
    };
  }

  if (uri === 'chrono://tokens') {
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(CHRONO_TOKENS_DOC, null, 2),
        },
      ],
    };
  }

  if (uri === 'chrono://guidelines') {
    return {
      contents: [
        {
          uri,
          mimeType: 'text/markdown',
          text: CHRONO_AGENT_GUIDELINES,
        },
      ],
    };
  }

  throw new Error(`Recurso no encontrado: ${uri}`);
});

// --- SERVER INITIALIZATION ---
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Chronosoft UI MCP Server corriendo en stdio');
}

main().catch((err) => {
  console.error('Fallo al iniciar el servidor MCP:', err);
  process.exit(1);
});

