import React from 'react';

/**
 * Tabs — segmented navigation. The active tab carries an ember
 * underline that reads like an activated connection.
 */
export function Tabs({
  items = [],
  value,
  onChange,
  style = {},
}) {
  const active = value ?? (items[0] && items[0].id);
  return (
    <div style={{
      display: 'inline-flex',
      gap: 4,
      padding: 4,
      background: 'var(--ink-850)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--edge-ring)',
      ...style,
    }}>
      {items.map((it) => {
        const on = it.id === active;
        return (
          <button
            key={it.id}
            onClick={() => onChange && onChange(it.id)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              height: 34, padding: '0 16px',
              fontFamily: 'var(--font-display)', fontSize: 13.5, fontWeight: 500,
              color: on ? 'var(--text-strong)' : 'var(--text-muted)',
              background: on ? 'var(--surface-input)' : 'transparent',
              border: '1px solid',
              borderColor: on ? 'var(--border-subtle)' : 'transparent',
              borderRadius: 'var(--radius-sm)',
              boxShadow: on ? 'var(--edge-top), inset 0 -2px 0 var(--ember-500)' : 'none',
              cursor: 'pointer',
              transition: 'var(--t-color), box-shadow var(--dur-base) var(--ease-signal)',
            }}
          >
            {it.icon && <span style={{ display: 'inline-flex', width: 15, height: 15, color: on ? 'var(--ember-300)' : 'inherit' }}>{it.icon}</span>}
            {it.label}
            {it.count != null && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: on ? 'var(--ember-300)' : 'var(--text-faint)' }}>{it.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
