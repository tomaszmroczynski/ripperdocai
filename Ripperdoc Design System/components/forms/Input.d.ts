import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Uppercase mono label above the field. */
  label?: string;
  /** Helper / error text below the field. */
  hint?: string;
  /** Leading icon node. */
  iconLeft?: React.ReactNode;
  /** Render error state (red border + hint). @default false */
  invalid?: boolean;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
}

/** Text input on a sunken ink well with an ember focus glow. */
export function Input(props: InputProps): JSX.Element;
