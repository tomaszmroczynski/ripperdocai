import React from 'react';

/**
 * Avatar — a human presence. The brand puts the person first, so the
 * avatar is ringed like the logomark; optional "active" ember halo.
 */
export function Avatar({
  src = null,
  name = '',
  size = 40,
  active = false,
  ring = true,
  style = {},
  ...rest
}) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        background: src ? 'transparent' : 'var(--ink-700)',
        color: 'var(--ember-200)',
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: size * 0.38,
        letterSpacing: '0.02em',
        border: ring ? '1px solid var(--border-ember)' : '1px solid var(--border-subtle)',
        boxShadow: active ? 'var(--glow-sm)' : 'var(--edge-top)',
        overflow: 'hidden',
        flex: 'none',
        position: 'relative',
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        initials || '·'
      )}
      {active && (
        <span style={{
          position: 'absolute', right: -1, bottom: -1,
          width: size * 0.26, height: size * 0.26,
          borderRadius: '50%', background: 'var(--ember-400)',
          border: '2px solid var(--bg-base)', boxShadow: 'var(--glow-sm)',
        }} />
      )}
    </span>
  );
}
