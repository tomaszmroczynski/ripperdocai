import React from 'react';

/**
 * Card — the base surface. Lit-from-within ink panel with a hairline
 * edge. Optional ember glow on hover for interactive cards, and an
 * optional top sheen.
 */
export function Card({
  children,
  interactive = false,
  glow = false,
  padding = 24,
  sheen = true,
  as: Tag = 'div',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);

  return (
    <Tag
      onMouseEnter={interactive ? () => setHover(true) : undefined}
      onMouseLeave={interactive ? () => setHover(false) : undefined}
      style={{
        position: 'relative',
        background: 'var(--surface-card)',
        backgroundImage: sheen ? 'var(--grad-card)' : 'none',
        border: '1px solid',
        borderColor: hover && interactive ? 'var(--border-ember)' : 'var(--border-hairline)',
        borderRadius: 'var(--radius-lg)',
        padding,
        boxShadow: glow || (hover && interactive)
          ? 'var(--edge-top), var(--shadow-md), var(--glow-md)'
          : 'var(--edge-top), var(--shadow-md)',
        transition: 'border-color var(--dur-base) var(--ease-signal), box-shadow var(--dur-base) var(--ease-signal), transform var(--dur-base) var(--ease-signal)',
        transform: hover && interactive ? 'translateY(-2px)' : 'translateY(0)',
        cursor: interactive ? 'pointer' : 'default',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
