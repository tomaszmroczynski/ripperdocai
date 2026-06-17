import React from 'react';

/**
 * IconButton — square action holding a single icon node.
 * Variants mirror Button: primary, secondary, ghost, outline.
 */
export function IconButton({
  children,
  variant = 'ghost',
  size = 'md',
  label,
  disabled = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const sizes = { sm: 32, md: 40, lg: 48 };
  const dim = sizes[size] || sizes.md;

  const palettes = {
    primary: {
      background: hover ? 'var(--action-primary-hover)' : 'var(--action-primary)',
      color: 'var(--text-on-ember)',
      border: '1px solid transparent',
      boxShadow: hover ? 'var(--glow-md)' : 'var(--glow-sm)',
    },
    secondary: {
      background: hover ? 'var(--surface-hover)' : 'var(--surface-input)',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--edge-top)',
    },
    outline: {
      background: hover ? 'rgba(234,154,62,0.08)' : 'transparent',
      color: 'var(--text-accent)',
      border: '1px solid var(--border-ember)',
      boxShadow: 'none',
    },
    ghost: {
      background: hover ? 'var(--surface-hover)' : 'transparent',
      color: hover ? 'var(--text-strong)' : 'var(--text-muted)',
      border: '1px solid transparent',
      boxShadow: 'none',
    },
  };
  const p = palettes[variant] || palettes.ghost;

  return (
    <button
      aria-label={label}
      title={label}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dim,
        height: dim,
        borderRadius: 'var(--radius-md)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.42 : 1,
        transition: 'var(--t-color), var(--t-glow)',
        ...p,
        ...style,
      }}
      {...rest}
    >
      <span style={{ display: 'inline-flex', width: dim * 0.46, height: dim * 0.46 }}>{children}</span>
    </button>
  );
}
