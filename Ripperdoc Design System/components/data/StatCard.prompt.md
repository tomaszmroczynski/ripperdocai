**StatCard** — a single capability metric on a Card; mono value + delta badge.

```jsx
<StatCard label="Throughput" value="3,480" unit="tok/s" delta="+312%" icon={<i data-lucide="activity" />} />
```

Composes `Card` + `Badge`. Props: `label`, `value`, `unit`, `delta`, `deltaTone`, `icon`, `spark` (sparkline node). Use for dashboards and KPI rows.
