import * as React from 'react';

export interface CapabilityMeterProps {
  /** Current value. */
  value?: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** Optional label, left of the track. */
  label?: string;
  /** Show the % readout. @default true */
  showValue?: boolean;
  /** Track height in px. @default 8 */
  height?: number;
  /** @default "ember" */
  tone?: 'ember' | 'up' | 'info';
  style?: React.CSSProperties;
}

/** Branded progress/gauge — a signal travelling a connection. */
export function CapabilityMeter(props: CapabilityMeterProps): JSX.Element;
