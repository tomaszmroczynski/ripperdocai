import React from 'react';

/**
 * CapabilityMeter — a branded progress/gauge. Reads as a signal
 * travelling a connection: an ember-filled track with a glowing
 * leading node at the current value.
 */
export function CapabilityMeter({
  value = 0,
  max = 100,
  label,
  showValue = true,
  height = 8,
  tone = 'ember',
  style = {},
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const tones = {
    ember: { fill: 'linear-gradient(90deg, var(--ember-600), var(--ember-400))', node: 'var(--spark)', glow: 'var(--glow-sm)' },
    up: { fill: 'linear-gradient(90deg, #2f5c4a, var(--signal-up))', node: 'var(--signal-up)', glow: '0 0 10px rgba(95,169,140,0.5)' },
    info: { fill: 'linear-gradient(90deg, #2c4258, var(--signal-info))', node: 'var(--signal-info)', glow: '0 0 10px rgba(110,143,184,0.5)' },
  };
  const t = tones[tone] || tones.ember;

  return (
    <div style={{ ...style }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 9 }}>
          {label && <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-body)' }}>{label}</span>}
          {showValue && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-accent)' }}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div style={{
        position: 'relative',
        height,
        background: 'var(--ink-700)',
        borderRadius: 'var(--radius-pill)',
        boxShadow: 'var(--edge-ring)',
        overflow: 'visible',
      }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${pct}%`,
          background: t.fill,
          borderRadius: 'var(--radius-pill)',
          transition: 'width var(--dur-slow) var(--ease-out)',
        }} />
        {pct > 1 && pct < 100 && (
          <div style={{
            position: 'absolute', top: '50%', left: `${pct}%`,
            width: height + 4, height: height + 4,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%', background: t.node,
            boxShadow: t.glow,
            transition: 'left var(--dur-slow) var(--ease-out)',
          }} />
        )}
      </div>
    </div>
  );
}
