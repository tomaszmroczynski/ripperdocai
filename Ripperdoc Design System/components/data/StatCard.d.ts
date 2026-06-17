import * as React from 'react';

export interface StatCardProps {
  /** Uppercase mono label. */
  label: string;
  /** The metric value (string or number). */
  value: React.ReactNode;
  /** Optional unit suffix (e.g. "ms", "/s"). */
  unit?: string;
  /** Delta badge text (e.g. "+312%"). */
  delta?: string;
  /** @default "up" */
  deltaTone?: 'up' | 'down' | 'warn' | 'ember' | 'neutral' | 'info';
  /** Icon node, top-right. */
  icon?: React.ReactNode;
  /** Optional sparkline node, bottom-right. */
  spark?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * A single capability metric on a Card. Mono value, delta badge, icon.
 *
 * @startingPoint section="Data" subtitle="StatCard — a capability metric" viewport="700x180"
 */
export function StatCard(props: StatCardProps): JSX.Element;
