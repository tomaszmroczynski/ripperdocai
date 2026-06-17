import * as React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default "ghost" */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label (also the tooltip). Required. */
  label: string;
  /** Single icon node. */
  children?: React.ReactNode;
  disabled?: boolean;
}

/** Square, icon-only action. Same palette as Button. */
export function IconButton(props: IconButtonProps): JSX.Element;
