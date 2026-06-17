// Atlas — screens. Composes DS components into product views.
(() => {
const { Card, StatCard, CapabilityMeter, Badge, Button, Avatar, Tabs, Switch } = window.RipperdocDesignSystem_cbf3c1;

const Ico = ({ n, s = 18, c }) => <i data-lucide={n} style={{ width: s, height: s, color: c }}></i>;

// A live neural-activity panel built on the brand motif.
function NeuralPanel({ height = 220 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.RipperdocNeuralField) window.RipperdocNeuralField(ref.current);
  }, []);
  return (
    <Card padding={0} style={{ overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', zIndex: 2, top: 18, left: 20, right: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ember-300)' }}>Live signal field</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--text-strong)', marginTop: 4 }}>Intelligence in motion</div>
        </div>
        <Badge tone="ember" dot>streaming</Badge>
      </div>
      <canvas ref={ref} data-neural-field data-sparks="4" data-density="0.00016" style={{ width: '100%', height, display: 'block' }}></canvas>
    </Card>
  );
}

function OverviewScreen() {
  const Spark = ({ up = true }) => (
    <svg viewBox="0 0 120 28" preserveAspectRatio="none" style={{ width: '100%', height: 28 }}>
      <polyline points="0,22 18,18 34,20 52,12 70,15 88,7 106,10 120,4" fill="none"
        stroke={up ? 'var(--ember-400)' : 'var(--signal-down)'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <StatCard label="Throughput" value="3,480" unit="tok/s" delta="+312%" deltaTone="up" icon={<Ico n="activity" s={17} c="var(--ember-300)" />} spark={<Spark />} />
        <StatCard label="Hours returned" value="1,240" unit="/wk" delta="+18%" deltaTone="up" icon={<Ico n="clock" s={17} c="var(--ember-300)" />} spark={<Spark />} />
        <StatCard label="Active agents" value="6" delta="2 new" deltaTone="ember" icon={<Ico n="waypoints" s={17} c="var(--ember-300)" />} />
        <StatCard label="Confidence" value="91" unit="%" delta="stable" deltaTone="neutral" icon={<Ico n="scan-eye" s={17} c="var(--ember-300)" />} spark={<Spark />} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }}>
        <NeuralPanel height={236} />
        <Card padding={24}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 4 }}>Capability coverage</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 22 }}>How much of the workflow is augmented.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <CapabilityMeter label="Knowledge recall" value={72} />
            <CapabilityMeter label="Decision support" value={58} tone="info" />
            <CapabilityMeter label="Automation depth" value={44} tone="info" />
            <CapabilityMeter label="Signal confidence" value={91} tone="up" />
          </div>
        </Card>
      </div>

      <Card padding={0}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--border-hairline)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: 'var(--text-strong)' }}>Recent augmentations</div>
          <Button variant="ghost" size="sm" iconRight={<Ico n="arrow-right" s={14} />}>View all</Button>
        </div>
        {[
          { who: 'Ada Lovelace', act: 'deployed', what: 'Research synthesis agent', when: '2m ago', tone: 'up', icon: 'brain' },
          { who: 'Knowledge base', act: 'indexed', what: '4,210 documents', when: '14m ago', tone: 'ember', icon: 'database' },
          { who: 'Flow engine', act: 'automated', what: 'Invoice triage → ledger', when: '1h ago', tone: 'info', icon: 'git-branch' },
          { who: 'Marcus Chen', act: 'reviewed', what: 'Contract risk signals', when: '3h ago', tone: 'neutral', icon: 'scan-eye' },
        ].map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 24px', borderBottom: i < 3 ? '1px solid var(--border-hairline)' : 'none' }}>
            <span style={{ width: 36, height: 36, flex: 'none', borderRadius: 'var(--radius-sm)', background: 'var(--ink-700)', border: '1px solid var(--border-hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ember-300)' }}><Ico n={r.icon} s={17} /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14.5, color: 'var(--text-body)' }}><span style={{ color: 'var(--text-strong)', fontWeight: 500 }}>{r.who}</span> {r.act} <span style={{ color: 'var(--text-strong)' }}>{r.what}</span></div>
            </div>
            <Badge tone={r.tone} variant="soft">{r.act}</Badge>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)', width: 64, textAlign: 'right' }}>{r.when}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

function AgentsScreen() {
  const agents = [
    { name: 'Synthesis', role: 'Research & summarisation', status: 'active', load: 78, runs: '1.2k', icon: 'brain' },
    { name: 'Ledger', role: 'Finance automation', status: 'active', load: 54, runs: '880', icon: 'git-branch' },
    { name: 'Sentinel', role: 'Risk & compliance', status: 'active', load: 33, runs: '420', icon: 'scan-eye' },
    { name: 'Archivist', role: 'Knowledge indexing', status: 'idle', load: 12, runs: '6.4k', icon: 'database' },
    { name: 'Composer', role: 'Content generation', status: 'active', load: 66, runs: '2.1k', icon: 'code-xml' },
    { name: 'Router', role: 'Task orchestration', status: 'paused', load: 0, runs: '340', icon: 'waypoints' },
  ];
  const toneFor = (s) => (s === 'active' ? 'up' : s === 'idle' ? 'neutral' : 'warn');
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {agents.map((a) => (
        <Card key={a.name} interactive padding={22}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
            <span style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--ink-700)', border: '1px solid var(--border-hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ember-300)', boxShadow: 'var(--edge-top)' }}><Ico n={a.icon} s={20} /></span>
            <Badge tone={toneFor(a.status)} dot>{a.status}</Badge>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--text-strong)' }}>{a.name}</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 18 }}>{a.role}</div>
          <CapabilityMeter label="Load" value={a.load} height={6} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border-hairline)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)' }}>{a.runs} runs</span>
            <Button variant="outline" size="sm" iconLeft={<Ico n="settings-2" s={13} />}>Tune</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

window.OverviewScreen = OverviewScreen;
window.AgentsScreen = AgentsScreen;
})();
