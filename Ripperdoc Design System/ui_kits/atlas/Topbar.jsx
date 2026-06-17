// Atlas — Topbar with search + actions.
(() => {
const { Button, IconButton, Badge } = window.RipperdocDesignSystem_cbf3c1;

function Topbar({ title, subtitle }) {
  const Ic = ({ n, s = 16 }) => <i data-lucide={n} style={{ width: s, height: s }}></i>;
  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 18,
      height: 64, padding: '0 26px', flex: 'none',
      borderBottom: '1px solid var(--border-hairline)',
      background: 'rgba(7,9,12,0.6)', backdropFilter: 'var(--glass)',
    }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--text-strong)', letterSpacing: '-0.01em' }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12.5, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>{subtitle}</div>}
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, height: 38, padding: '0 14px', width: 240, background: 'var(--surface-input)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--edge-ring)' }}>
          <span style={{ color: 'var(--text-faint)', display: 'inline-flex' }}><Ic n="search" /></span>
          <input placeholder="Search signals, agents…" style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-body)', fontFamily: 'var(--font-body)', fontSize: 13.5 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)', border: '1px solid var(--border-subtle)', borderRadius: 4, padding: '1px 5px' }}>⌘K</span>
        </div>
        <Badge tone="up" dot>All systems live</Badge>
        <IconButton label="Notifications" variant="ghost"><Ic n="bell" /></IconButton>
        <Button variant="primary" iconLeft={<Ic n="zap" />}>New augmentation</Button>
      </div>
    </header>
  );
}
window.Topbar = Topbar;
})();
