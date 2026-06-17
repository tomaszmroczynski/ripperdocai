**Switch** — toggle styled as an activating connection; ember track + spark knob when on.

```jsx
const [on, setOn] = React.useState(true);
<Switch checked={on} onChange={setOn} label="Auto-augment" />
```

Controlled: pass `checked` + `onChange(next)`. Sizes `sm | md`. Omit `label` for a bare switch.
