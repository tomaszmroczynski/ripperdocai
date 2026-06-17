import React from 'react';

/**
 * Badge — compact status / category marker.
 * tone: neutral | ember | up | warn | down | info
 * variant: soft (tinted fill) | outline | solid
 */
export function Badge({
  children,
  tone = 'neutral',
  variant = 'soft',
  dot = false,
  style = {},
  ...rest
}) {
  const tones = {
    neutral: { c: 'var(--mist-200)', bg: 'rgba(170,180,192,0.10)', bd: 'var(--border-subtle)', solid: 'var(--graphite-400)' },
    ember:   { c: 'var(--ember-300)', bg: 'rgba(234,154,62,0.12)', bd: 'var(--border-ember)', solid: 'var(--ember-500)' },
    up:      { c: 'var(--signal-up)', bg: 'var(--signal-up-bg)', bd: 'rgba(95,169,140,0.4)', solid: 'var(--signal-up)' },
    warn:    { c: 'var(--ember-300)', bg: 'var(--signal-warn-bg)', bd: 'rgba(234,154,62,0.4)', solid: 'var(--signal-warn)' },
    down:    { c: 'var(--signal-down)', bg: 'var(--signal-down-bg)', bd: 'rgba(200,85,61,0.4)', solid: 'var(--signal-down)' },
    info:    { c: 'var(--signal-info)', bg: 'var(--signal-info-bg)', bd: 'rgba(110,143,184,0.4)', solid: 'var(--signal-info)' },
  };
  const t = tones[tone] || tones.neutral;

  const variants = {
    soft:    { background: t.bg, color: t.c, border: `1px solid ${t.bd}` },
    outline: { background: 'transparent', color: t.c, border: `1px solid ${t.bd}` },
    solid:   { background: t.solid, color: 'var(--ink-1000)', border: '1px solid transparent' },
  };
  const v = variants[variant] || variants.soft;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 24,
        padding: '0 10px',
        fontSize: 12,
        fontFamily: 'var(--font-mono)',
        fontWeight: 500,
        letterSpacing: '0.04em',
        borderRadius: 'var(--radius-pill)',
        whiteSpace: 'nowrap',
        ...v,
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: variant === 'solid' ? 'var(--ink-1000)' : t.solid,
          boxShadow: tone === 'ember' && variant !== 'solid' ? 'var(--glow-sm)' : 'none',
        }} />
      )}
      {children}
    </span>
  );
}
