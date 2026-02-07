# State

## Window Store
`src/store/window.ts` centralizes window state using Zustand + Immer.

- `windows` is a record keyed by app id
- `nextZIndex` manages focus stacking
- Actions: `openWindow()`, `closeWindow()`, `focusWindow()` mutate state via Immer drafts

Pattern: Use Immer draft mutations (e.g. `state.windows[key].isOpen = true`) instead of returning new objects.
