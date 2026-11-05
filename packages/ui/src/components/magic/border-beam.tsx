import * as React from 'react';
import { cn } from '../../lib/utils.js';

export interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
}

/**
 * Haz de luz perimetral elegante y compatible con todos los navegadores.
 * Aplica un borde luminoso continuo que recorre la silueta de la tarjeta.
 */
export function BorderBeam({
  className,
  colorFrom = '#0284c7',
  colorTo = '#06b6d4',
}: BorderBeamProps) {
  return (
    <>
      {/* Top light beam line */}
      <div
        className={cn(
          'pointer-events-none absolute -top-px left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-chrono-primary to-transparent opacity-80',
          className
        )}
      />
      {/* Ambient glow behind top border */}
      <div
        className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 h-10 w-3/4 rounded-full bg-chrono-accent/15 blur-xl"
        style={{
          background: `radial-gradient(ellipse at center, ${colorTo}33, transparent 70%)`,
        }}
      />
    </>
  );
}
