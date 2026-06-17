**Avatar** — human presence, ringed like the logomark. The brand puts the person first.

```jsx
<Avatar name="Ada Lovelace" active />
<Avatar src="/assets/img/portrait-neural.jpg" name="Operator" size={56} />
```

`active` adds an ember halo + status dot. `ring` toggles the signature ember hairline. Falls back to initials when no `src`.
