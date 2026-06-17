// Atlas — Sidebar. Reads brand components from the DS bundle namespace.
(() => {
const { Avatar } = window.RipperdocDesignSystem_cbf3c1;

function Sidebar({ active, onNav }) {
  const Ic = ({ n }) => <i data-lucide={n} style={{ width: 18, height: 18 }}></i>;
  const groups = [
    {
      title: 'Augment',
      items: [
        { id: 'overview', label: 'Overview', icon: 'layout-dashboard' },
        { id: 'agents', label: 'Agents', icon: 'waypoints', badge: '6' },
        { id: 'knowledge', label: 'Knowledge', icon: 'database' },
        { id: 'automations', label: 'Automations', icon: 'git-branch' },
      ],
    },
    {
      title: 'Operate',
      items: [
        { id: 'signals', label: 'Signals', icon: 'activity' },
        { id: 'people', label: 'People', icon: 'user-round' },
        { id: 'settings', label: 'Settings', icon: 'settings-2' },
      ],
    },
  ];

  return (
    <aside style={{
      width: 248, flex: 'none', height: '100%',
      background: 'var(--ink-850)',
      borderRight: '1px solid var(--border-hairline)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, height: 64, padding: '0 20px', borderBottom: '1px solid var(--border-hairline)' }}>
        <img src="../../assets/logo/ripperdoc-mark.svg" alt="" style={{ width: 26, height: 26, color: 'var(--mist-100)' }} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: 'var(--text-strong)', letterSpacing: '-0.01em' }}>
          Atlas
        </span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-faint)', letterSpacing: '0.1em' }}>v2.4</span>
      </div>

      <nav style={{ flex: 1, padding: '18px 12px', overflowY: 'auto' }}>
        {groups.map((g) => (
          <div key={g.title} style={{ marginBottom: 22 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-faint)', padding: '0 12px', marginBottom: 8 }}>{g.title}</div>
            {g.items.map((it) => {
              const on = it.id === active;
              return (
                <button key={it.id} onClick={() => onNav(it.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 11, width: '100%',
                    height: 38, padding: '0 12px', marginBottom: 2,
                    background: on ? 'var(--surface-input)' : 'transparent',
                    border: '1px solid', borderColor: on ? 'var(--border-subtle)' : 'transparent',
                    borderRadius: 'var(--radius-sm)',
                    color: on ? 'var(--text-strong)' : 'var(--text-muted)',
                    boxShadow: on ? 'inset 2px 0 0 var(--ember-500)' : 'none',
                    fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: on ? 500 : 400,
                    cursor: 'pointer', transition: 'var(--t-color)',
                  }}>
                  <span style={{ color: on ? 'var(--ember-300)' : 'var(--text-faint)', display: 'inline-flex' }}><Ic n={it.icon} /></span>
                  {it.label}
                  {it.badge && <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ember-300)', background: 'rgba(234,154,62,0.12)', borderRadius: 'var(--radius-pill)', padding: '1px 8px' }}>{it.badge}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div style={{ padding: 14, borderTop: '1px solid var(--border-hairline)', display: 'flex', alignItems: 'center', gap: 11 }}>
        <Avatar name="Marcus Chen" active size={36} />
        <div style={{ lineHeight: 1.3, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, color: 'var(--text-strong)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Marcus Chen</div>
          <div style={{ fontSize: 11.5, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>Lead operator</div>
        </div>
      </div>
    </aside>
  );
}
window.Sidebar = Sidebar;
})();
