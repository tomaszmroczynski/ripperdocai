import React from 'react';

/**
 * Input — text field on a sunken ink well. Ember focus ring/glow.
 * Optional leading icon and label/hint.
 */
export function Input({
  label,
  hint,
  iconLeft = null,
  invalid = false,
  size = 'md',
  style = {},
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useId();
  const heights = { sm: 36, md: 44, lg: 52 };
  const h = heights[size] || heights.md;

  const borderColor = invalid
    ? 'var(--signal-down)'
    : focus
    ? 'var(--border-ember)'
    : 'var(--border-subtle)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, ...style }}>
      {label && (
        <label htmlFor={inputId} style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--text-muted)',
        }}>{label}</label>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        height: h, padding: '0 14px',
        background: 'var(--surface-input)',
        border: `1px solid ${borderColor}`,
        borderRadius: 'var(--radius-md)',
        boxShadow: focus ? 'var(--glow-sm), var(--edge-ring)' : 'var(--edge-ring)',
        transition: 'border-color var(--dur-fast) var(--ease-signal), box-shadow var(--dur-base) var(--ease-signal)',
      }}>
        {iconLeft && (
          <span style={{ display: 'inline-flex', width: 17, height: 17, color: focus ? 'var(--ember-300)' : 'var(--text-faint)', flex: 'none' }}>{iconLeft}</span>
        )}
        <input
          id={inputId}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1, minWidth: 0, height: '100%',
            background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--text-strong)', fontFamily: 'var(--font-body)',
            fontSize: size === 'sm' ? 13 : 15,
          }}
          {...rest}
        />
      </div>
      {hint && (
        <span style={{ fontSize: 12, color: invalid ? 'var(--signal-down)' : 'var(--text-faint)' }}>{hint}</span>
      )}
    </div>
  );
}
