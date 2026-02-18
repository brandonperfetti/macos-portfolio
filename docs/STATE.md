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

## Theme Store
`src/store/theme.ts` tracks global theme mode.

- `theme` supports `light | dark | system`
- `setTheme()` updates mode and persists through `localStorage` in `src/components/Theme.tsx`
- System mode listens to `prefers-color-scheme` changes and updates root `.dark` class

Pattern: Keep all theme mode state in the store; UI components should read/write via `useThemeStore` instead of owning independent theme state.

## Types
`WindowKey` and `WindowConfig` live in `src/types/windows.ts`.
Use `#types` for imports outside `src/types/*`; inside `src/types/*`, use local relative imports to avoid circular barrel resolution.
