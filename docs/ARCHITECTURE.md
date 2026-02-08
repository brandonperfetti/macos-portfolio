# Architecture

## State Management (Zustand + Immer)
Window state is centralized in `src/store/window.ts` using Zustand with Immer middleware.

- `windows`: Record of all window instances keyed by app id (`finder`, `safari`, `photos`, `contact`, `terminal`, `txtfile`, `imgfile`)
- `nextZIndex`: Auto-incrementing value for focus management
- Actions: `openWindow()`, `closeWindow()`, `focusWindow()` modify state immutably via Immer

Pattern: Always use Immer draft mutations (e.g. `state.windows[key].isOpen = true`) instead of returning new objects.

## Constants-Driven Configuration
All app metadata lives in `src/constants/index.ts`:

- `dockApps`: Dock icon configuration with `canOpen` flags
- `WINDOW_CONFIG`: Initial window state structure
- `locations`: Hierarchical folder/file data for Finder-like navigation
- Uses `satisfies` to enforce type shape without losing literal inference

Pattern: New windows require entries in both `WINDOW_CONFIG` and `dockApps`.

## Types
Shared type definitions live in `src/types/` and are re-exported via `#types`.

- `src/types/windows.ts`: window keys and window state shapes
- `src/types/finder.ts`: Finder discriminated unions (`kind` + `fileType`)
- `src/types/constants.ts`: shared config shapes for constants

## Lib Modules
Shared runtime utilities live in `src/lib/` and are re-exported via `#lib`.

- `src/lib/gsap.ts`: core GSAP export
- `src/lib/gsap-draggable.ts`: Draggable plugin registration + exports

## Component Architecture
- `src/App.tsx`: Root layout with `<Navbar />`, `<Welcome />`, `<Dock />`
- `src/components/Dock.tsx`: GSAP-powered dock with magnification physics
- Barrel exports via `src/components/index.ts`

## Path Aliases (Critical)
Vite is configured with hash-prefixed aliases in `vite.config.ts`:

- `#components` → `src/components`
- `#constants` → `src/constants`
- `#hooks` → `src/hooks`
- `#store` → `src/store`
- `#hoc` → `src/hoc`
- `#lib` → `src/lib`
- `#windows` → `src/windows`
- `#types` → `src/types`

Aliased folders use `index.ts` barrels to expose public exports (including `#types`).

Never use relative imports (`../components`). Use `#components`, `#constants`, `#hooks`, `#store`, `#hoc`, `#windows`.
