**Tabs** — segmented navigation; the active tab carries an ember underline (an activated connection).

```jsx
const [tab, setTab] = React.useState('overview');
<Tabs value={tab} onChange={setTab} items={[
  { id: 'overview', label: 'Overview', icon: <i data-lucide="layout-dashboard" /> },
  { id: 'signals', label: 'Signals', count: 12 },
]} />
```

Each item: `{ id, label, icon?, count? }`. Controlled via `value` + `onChange`.
