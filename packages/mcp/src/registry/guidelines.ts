export const CHRONO_AGENT_GUIDELINES = `
# Guías Maestras de Diseño e Implementación para Agentes de IA en Chronosoft

Al generar código de interfaz de usuario para productos del ecosistema Chronosoft, debes seguir estas directrices sin excepción:

1. **Uso Obligatorio de Componentes Oficiales (@chronosoft/ui)**:
   - NUNCA generes elementos HTML sin estilo como \`<button>\`, \`<input>\`, o modales hechos con \`<div>\`.
   - SIEMPRE importa los componentes desde \`@chronosoft/ui\`.
   - Si necesitas un botón, usa \`<Button variant="..." size="...">\`.
   - Si necesitas un campo de formulario, usa \`<Input error={...} errorMessage={...}>\`.
   - Si necesitas agrupar contenido, usa \`<Card>\`, \`<CardHeader>\`, \`<CardContent>\`, etc.

2. **Jerarquía Visual y Variantes**:
   - \`variant="default"\` (Azul Chronosoft) debe usarse para la acción principal de la pantalla (máximo 1 o 2 por vista).
   - \`variant="secondary"\` o \`outline\` para acciones complementarias.
   - \`variant="destructive"\` para borrados o cancelaciones de alto impacto.
   - \`variant="accent"\` (Cyan Chronosoft) para llamadas a la acción especiales, badges tecnológicos o highlights.

3. **Accesibilidad (a11y)**:
   - Todo \`<Dialog>\` debe incluir \`<DialogTitle>\` y \`<DialogDescription>\`.
   - Todo \`<Input>\` debe tener un label contextual o placeholder claro.
   - Las cargas asíncronas deben reflejarse mediante el prop \`isLoading\` en \`<Button>\`.

4. **Soporte Dark Mode**:
   - Todos los componentes de Chronosoft UI soportan automáticamente modo claro y oscuro a través de las variables CSS de tokens.
   - Evita hardcodear colores como \`bg-white\` o \`text-black\`; usa las clases de Tailwind de Chronosoft: \`bg-chrono-bg\`, \`text-chrono-fg\`, \`border-chrono-border\`.
`;

