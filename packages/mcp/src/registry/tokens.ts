export const CHRONO_TOKENS_DOC = {
  brandIdentity: {
    name: 'Chronosoft Design System',
    primaryColor: '#0284c7 (Sky/Blue 600 - Confianza, precisión, tecnología)',
    accentColor: '#06b6d4 (Cyan 500 - Energía, modernidad e interactividad)',
    darkSurface: '#090d16 / #0f172a (Navy profundo)',
    lightSurface: '#ffffff / #f8fafc',
    borderRadius: '0.5rem (8px / rounded-xl para tarjetas y modales)',
    fontFamily: 'Inter / Sans-serif moderno',
  },
  cssVariables: {
    light: {
      '--chrono-primary': '#0284c7',
      '--chrono-accent': '#06b6d4',
      '--chrono-bg': '#ffffff',
      '--chrono-fg': '#0f172a',
      '--chrono-border': '#e2e8f0',
      '--chrono-card': '#ffffff',
      '--chrono-card-fg': '#0f172a',
    },
    dark: {
      '--chrono-primary': '#38bdf8',
      '--chrono-accent': '#22d3ee',
      '--chrono-bg': '#090d16',
      '--chrono-fg': '#f8fafc',
      '--chrono-border': '#334155',
      '--chrono-card': '#0f172a',
      '--chrono-card-fg': '#f8fafc',
    },
  },
  tailwindUtilityClasses: {
    primaryButton: 'bg-chrono-primary text-white hover:bg-chrono-primary-700',
    cardContainer: 'border border-chrono-border bg-chrono-card text-chrono-card-fg rounded-xl shadow-sm',
    accentText: 'text-chrono-accent font-semibold',
  },
};

