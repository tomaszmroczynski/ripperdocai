import React from 'react';

/**
 * Switch — toggle styled as an activating connection. When on, the
 * track lights ember and the knob carries a faint spark glow.
 */
export function Switch({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  label,
  style = {},
  ...rest
}) {
  const dims = {
    sm: { w: 36, h: 20, k: 14 },
    md: { w: 46, h: 26, k: 19 },
  };
  const d = dims[size] || dims.md;
  const pad = (d.h - d.k) / 2;

  const toggle = () => { if (!disabled && onChange) onChange(!checked); };

  const sw = (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={toggle}
      style={{
        position: 'relative',
        width: d.w, height: d.h,
        flex: 'none',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid',
        borderColor: checked ? 'var(--border-ember)' : 'var(--border-subtle)',
        background: checked ? 'var(--action-primary)' : 'var(--ink-700)',
        boxShadow: checked ? 'var(--glow-sm)' : 'var(--edge-ring)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.42 : 1,
        padding: 0,
        transition: 'background-color var(--dur-base) var(--ease-signal), box-shadow var(--dur-base) var(--ease-signal), border-color var(--dur-base) var(--ease-signal)',
      }}
      {...rest}
    >
      <span style={{
        position: 'absolute', top: pad,
        left: checked ? d.w - d.k - pad - 1 : pad,
        width: d.k, height: d.k, borderRadius: '50%',
        background: checked ? 'var(--ink-1000)' : 'var(--mist-200)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.5)',
        transition: 'left var(--dur-base) var(--ease-spring), background-color var(--dur-base) var(--ease-signal)',
      }} />
    </button>
  );

  if (!label) return sw;
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', ...style }}>
      {sw}
      <span style={{ fontSize: 14, color: 'var(--text-body)', fontFamily: 'var(--font-body)' }}>{label}</span>
    </label>
  );
}
