import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Lift + ember border + glow on hover. @default false */
  interactive?: boolean;
  /** Force the ember glow on (e.g. active/selected card). @default false */
  glow?: boolean;
  /** Inner padding in px. @default 24 */
  padding?: number;
  /** Top sheen gradient. @default true */
  sheen?: boolean;
  /** Render as a different element/component. @default "div" */
  as?: React.ElementType;
  children?: React.ReactNode;
}

/**
 * Base surface — a lit-from-within ink panel.
 *
 * @startingPoint section="Surfaces" subtitle="Card — the base panel surface" viewport="700x220"
 */
export function Card(props: CardProps): JSX.Element;
