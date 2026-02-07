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
- Uses `as const` assertions for type narrowing

Pattern: New windows require entries in both `WINDOW_CONFIG` and `dockApps`.

## Component Architecture
- `src/App.tsx`: Root layout with `<Navbar />`, `<Welcome />`, `<Dock />`
- `src/components/Dock.tsx`: GSAP-powered dock with magnification physics
- Barrel exports via `src/components/index.ts`

## Path Aliases (Critical)
Vite is configured with hash-prefixed aliases in `vite.config.ts`:

- `#components` → `src/components/index.ts`
- `#constants` → `src/constants/index.ts`
- `#store` → `src/store/window.ts`
- `#hoc` → `src/hoc`
- `#windows` → `src/windows`

Never use relative imports (`../components`). Use `#components`, `#constants`, `#store`, `#hoc`, `#windows`.
