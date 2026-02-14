# State

## Window Store
`src/store/window.ts` centralizes window state using Zustand + Immer.

- `windows` is a record keyed by app id
- `nextZIndex` manages focus stacking
- Actions: `openWindow()`, `closeWindow()`, `focusWindow()` mutate state via Immer drafts

Pattern: Use Immer draft mutations (e.g. `state.windows[key].isOpen = true`) instead of returning new objects.

## Location Store
`src/store/location.ts` tracks the active Finder folder selection.

- `activeLocation` stores the currently selected folder (or null)
- `setActiveLocation()` updates the current folder
- `resetActiveLocation()` restores the default root folder

Pattern: `activeLocation` uses `FinderLocationFolder` to support both root locations and nested folders.

## Types
`WindowKey` and `WindowConfig` live in `src/types/windows.ts`.
Use `#types` for imports outside `src/types/*`; inside `src/types/*`, use local relative imports to avoid circular barrel resolution.
