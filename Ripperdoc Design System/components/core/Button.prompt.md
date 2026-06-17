**Button** — the primary action surface; ember-filled for primary intent, receding graphite/ghost for secondary actions.

```jsx
<Button variant="primary" size="md">Augment workflow</Button>
<Button variant="outline" iconLeft={<i data-lucide="zap" />}>Run signal</Button>
<Button variant="ghost" size="sm">Dismiss</Button>
```

Variants: `primary` (ember, glows on hover), `secondary` (graphite well), `outline` (ember hairline), `ghost` (text-only). Sizes `sm | md | lg`. Props: `iconLeft`, `iconRight`, `full`, `disabled`. Press state nudges down 1px — never scale.
