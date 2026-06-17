import React from 'react';
import { Card } from '../surfaces/Card.jsx';
import { Badge } from '../core/Badge.jsx';

/**
 * StatCard — a single capability metric. Mono value, optional delta
 * badge, optional icon, and an optional sparkline of recent signal.
 */
export function StatCard({
  label,
  value,
  unit,
  delta,
  deltaTone = 'up',
  icon = null,
  spark = null,
  style = {},
}) {
  return (
    <Card padding={22} style={{ minWidth: 200, ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--text-muted)',
        }}>{label}</span>
        {icon && (
          <span style={{ display: 'inline-flex', width: 18, height: 18, color: 'var(--ember-300)' }}>{icon}</span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 600,
          letterSpacing: '-0.02em', color: 'var(--text-strong)', lineHeight: 1,
        }}>{value}</span>
        {unit && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-muted)' }}>{unit}</span>}
      </div>
      {(delta || spark) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, gap: 12 }}>
          {delta && <Badge tone={deltaTone} variant="soft">{delta}</Badge>}
          {spark && <div style={{ flex: 1, height: 28, minWidth: 0 }}>{spark}</div>}
        </div>
      )}
    </Card>
  );
}
