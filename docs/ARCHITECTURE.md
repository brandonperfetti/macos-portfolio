# Architecture

## State Management (Zustand + Immer)
Window state is centralized in `src/store/window.ts` using Zustand with Immer middleware.

- `windows`: Record of all window instances keyed by app id (`finder`, `safari`, `photos`, `contact`, `terminal`, `txtfile`, `imgfile`)
- `nextZIndex`: Auto-incrementing value for focus management
- Actions: `openWindow()`, `closeWindow()`, `focusWindow()` modify state immutably via Immer

Pattern: Always use Immer draft mutations (e.g. `state.windows[key].isOpen = true`) instead of returning new objects.

Theme state is centralized in `src/store/theme.ts`.
- `theme`: `light | dark | system`
- `setTheme()`: updates current mode used by `src/components/Theme.tsx`

## Constants-Driven Configuration
All app metadata lives in `src/constants/index.ts`:

- `dockApps`: Dock icon configuration with `canOpen` flags
- `WINDOW_CONFIG`: Initial window state structure
- `locations`: Hierarchical folder/file data for Finder-like navigation
- `homeItems`: Curated desktop shortcut nodes resolved from `locations`
- `GALLERY_IMAGES`: Shared source-of-truth for Photos app and Finder photos location image data
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
- `src/lib/pdf.ts`: pdf.js worker setup + React PDF exports (CDN-first `.mjs` worker with local bundled fallback)

## Component Architecture
- `src/App.tsx`: Root layout with desktop + mobile surfaces (`Navbar`/`MobileNavbar`, `Home`/`MobileHome`) and mounted desktop/mobile windows.
- `src/components/Home.tsx`: Desktop home surface for project folder shortcuts that route into Finder.
- `src/components/Theme.tsx`: Theme selector using Radix dropdown primitives.
- `src/components/Dock.tsx`: GSAP-powered dock with magnification physics and explicit Trash-to-Finder exception behavior
- `src/windows/Finder.tsx`: Finder shell that switches between standard file-grid mode and photos-gallery mode when the active location is Photos
- `src/windows/Photos.tsx`: Standalone Photos app-style gallery window
- `src/hoc/MobileWindowWrapper.tsx`: mobile window mount/visibility wrapper
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

Default: use `#components`, `#constants`, `#hooks`, `#store`, `#hoc`, `#windows`, `#lib`, `#types` instead of relative imports.
Exception: inside `src/types/*`, use local relative imports (for example `./finder`, `./windows`) instead of `#types` to avoid barrel cycles and ESLint "error type"/unsafe-call false positives.
