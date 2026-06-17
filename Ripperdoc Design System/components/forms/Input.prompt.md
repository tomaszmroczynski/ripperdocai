**Input** — text field on a sunken ink well; ember focus ring + glow.

```jsx
<Input label="Workspace" placeholder="acme-corp" iconLeft={<i data-lucide="search" />} />
<Input label="API key" invalid hint="That key was rejected." />
```

Props: `label`, `hint`, `iconLeft`, `invalid`, `size` (`sm|md|lg`). Pass through any native input attrs (`value`, `onChange`, `type`, …).
