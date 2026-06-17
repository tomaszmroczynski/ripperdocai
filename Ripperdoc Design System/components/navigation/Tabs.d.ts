import * as React from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

export interface TabsProps {
  /** Tab definitions. */
  items: TabItem[];
  /** Active tab id (controlled). Defaults to first item. */
  value?: string;
  /** Called with the next tab id. */
  onChange?: (id: string) => void;
  style?: React.CSSProperties;
}

/** Segmented navigation; active tab gets an ember underline. */
export function Tabs(props: TabsProps): JSX.Element;
