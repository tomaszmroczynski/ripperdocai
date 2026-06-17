import React from 'react';

/**
 * Ripperdoc Button — the primary action surface.
 * Variants: primary (ember), secondary (graphite), ghost, outline.
 * Sizes: sm, md, lg. Optional leading/trailing icon nodes.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  disabled = false,
  full = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const sizes = {
    sm: { fontSize: 13, padding: '0 14px', height: 34, gap: 7, radius: 'var(--radius-sm)' },
    md: { fontSize: 14, padding: '0 20px', height: 42, gap: 8, radius: 'var(--radius-md)' },
    lg: { fontSize: 16, padding: '0 28px', height: 52, gap: 10, radius: 'var(--radius-md)' },
  };
  const s = sizes[size] || sizes.md;

  const palettes = {
    primary: {
      background: hover ? 'var(--action-primary-hover)' : 'var(--action-primary)',
      color: 'var(--text-on-ember)',
      border: '1px solid transparent',
      boxShadow: hover ? 'var(--glow-md)' : 'var(--glow-sm)',
      fontWeight: 600,
    },
    secondary: {
      background: hover ? 'var(--surface-hover)' : 'var(--surface-input)',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--edge-top)',
      fontWeight: 500,
    },
    outline: {
      background: hover ? 'rgba(234,154,62,0.08)' : 'transparent',
      color: 'var(--text-accent)',
      border: '1px solid var(--border-ember)',
      boxShadow: 'none',
      fontWeight: 500,
    },
    ghost: {
      background: hover ? 'var(--surface-hover)' : 'transparent',
      color: 'var(--text-body)',
      border: '1px solid transparent',
      boxShadow: 'none',
      fontWeight: 500,
    },
  };
  const p = palettes[variant] || palettes.primary;

  return (
    <button
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: full ? 'flex' : 'inline-flex',
        width: full ? '100%' : 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        fontSize: s.fontSize,
        fontFamily: 'var(--font-display)',
        fontWeight: p.fontWeight,
        letterSpacing: '-0.005em',
        lineHeight: 1,
        borderRadius: s.radius,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.42 : 1,
        transform: active && !disabled ? 'translateY(1px)' : 'translateY(0)',
        transition: 'background-color var(--dur-fast) var(--ease-signal), box-shadow var(--dur-base) var(--ease-signal), transform var(--dur-fast) var(--ease-signal), color var(--dur-fast) var(--ease-signal)',
        background: p.background,
        color: p.color,
        border: p.border,
        boxShadow: p.boxShadow,
        ...style,
      }}
      {...rest}
    >
      {iconLeft && <span style={{ display: 'inline-flex', width: '1.05em', height: '1.05em' }}>{iconLeft}</span>}
      {children}
      {iconRight && <span style={{ display: 'inline-flex', width: '1.05em', height: '1.05em' }}>{iconRight}</span>}
    </button>
  );
}
