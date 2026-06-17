import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Leading icon node (e.g. a Lucide <i> or svg). */
  iconLeft?: React.ReactNode;
  /** Trailing icon node. */
  iconRight?: React.ReactNode;
  /** Stretch to fill container width. @default false */
  full?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * Primary action surface for Ripperdoc. Ember primary glows on hover;
 * secondary/outline/ghost recede into the dark.
 *
 * @startingPoint section="Core" subtitle="Buttons — primary, secondary, outline, ghost" viewport="700x180"
 */
export function Button(props: ButtonProps): JSX.Element;
