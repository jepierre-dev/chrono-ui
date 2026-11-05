import { chronoColors } from './colors.js';
import { chronoRadii, chronoShadows } from './radii.js';

export const chronoTailwindPreset = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        chrono: {
          bg: 'var(--chrono-bg)',
          fg: 'var(--chrono-fg)',
          card: {
            DEFAULT: 'var(--chrono-card)',
            fg: 'var(--chrono-card-fg)',
          },
          popover: {
            DEFAULT: 'var(--chrono-popover)',
            fg: 'var(--chrono-popover-fg)',
          },
          primary: {
            DEFAULT: 'var(--chrono-primary)',
            fg: 'var(--chrono-primary-fg)',
            ...chronoColors.brand,
          },
          secondary: {
            DEFAULT: 'var(--chrono-secondary)',
            fg: 'var(--chrono-secondary-fg)',
          },
          accent: {
            DEFAULT: 'var(--chrono-accent)',
            fg: 'var(--chrono-accent-fg)',
            ...chronoColors.accent,
          },
          muted: {
            DEFAULT: 'var(--chrono-muted)',
            fg: 'var(--chrono-muted-fg)',
          },
          destructive: {
            DEFAULT: 'var(--chrono-destructive)',
            fg: 'var(--chrono-destructive-fg)',
          },
          border: 'var(--chrono-border)',
          input: 'var(--chrono-input)',
          ring: 'var(--chrono-ring)',
        },
      },
      borderRadius: {
        chrono: 'var(--chrono-radius, 0.5rem)',
        ...chronoRadii,
      },
      boxShadow: {
        ...chronoShadows,
      },
    },
  },
};

export default chronoTailwindPreset;

