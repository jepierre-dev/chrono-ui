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
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
};

export default chronoTailwindPreset;
