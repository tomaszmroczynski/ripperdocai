import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "neutral" */
  tone?: 'neutral' | 'ember' | 'up' | 'warn' | 'down' | 'info';
  /** @default "soft" */
  variant?: 'soft' | 'outline' | 'solid';
  /** Show a leading status dot. @default false */
  dot?: boolean;
  children?: React.ReactNode;
}

/** Compact status / category marker. Mono type, pill shape. */
export function Badge(props: BadgeProps): JSX.Element;
