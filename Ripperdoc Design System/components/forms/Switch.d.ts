import * as React from 'react';

export interface SwitchProps {
  /** Controlled on/off state. */
  checked?: boolean;
  /** Called with the next boolean when toggled. */
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  /** @default "md" */
  size?: 'sm' | 'md';
  /** Optional trailing label (wraps in a clickable <label>). */
  label?: string;
  style?: React.CSSProperties;
}

/** Toggle styled as an activating connection — ember track when on. */
export function Switch(props: SwitchProps): JSX.Element;
