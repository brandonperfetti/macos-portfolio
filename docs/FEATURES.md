# Features

## Adding New Features

### Adding a New Window/App
1. Add entry to `WINDOW_CONFIG` in `src/constants/index.ts`
2. Add to `dockApps` array with `canOpen: true`
3. Create window component (reference existing patterns)
4. Export the window from `src/windows/index.ts`
5. Add lazy imports in `src/App.tsx`, then mount conditionally by `windows.<key>.isOpen`
6. If the window has separate desktop/mobile variants, gate rendering through `useIsMobile` so only one variant mounts per key
7. Update Zustand/types if the window requires custom data shape
8. Move reusable display values (for example contact email/avatar URLs) into `src/constants/index.ts` and import them into the window.

### Adding Navigation Items
Update `navLinks` in `src/constants/index.ts` with `type` matching window keys.

### Adding Home Desktop Shortcuts
1. Curate shortcut items with `homeItems` in `src/constants/index.ts` using path-based references into `locations`.
2. Mirror Finder file/folder open behavior on double-click (folders open Finder, files open their mapped windows/links).
3. Scope GSAP Draggable selectors to the Home container ref (avoid global selectors without container scope).

### Theme Modes (Desktop + Mobile)
- Global theme supports `light`, `dark`, and `system`.
- Theme selector lives in desktop navbar (`src/components/Theme.tsx`) and uses Radix dropdown primitives.
- Active mode persists in `localStorage` and updates `document.documentElement` `.dark` class.
- `system` mode follows OS preference changes.

### Mobile Window Experience
- Mobile-specific windows are lazy-loaded in `src/App.tsx` and selected via `useIsMobile`.
- Desktop/mobile pairings should render exactly one variant per window key at runtime.
- Mobile variants are wrapped with `MobileWindowWrapper`.
- Shared mobile header (`src/components/mobile/WindowHeader.tsx`) provides back navigation and title.
- Mobile layout offsets use CSS variables in `src/index.css`:
  - `--mobile-navbar-height`
  - `--mobile-window-header-height`
  to prevent header/navbar overlap regressions.

### Bundle Performance
- Keep heavy modules out of shared barrels used by core UI (for example, import PDF helpers from `#lib/pdf`, not `#lib`).
- Prefer lazy window loading so rarely opened apps do not inflate the initial JS payload.

### Resume PDF Rendering
- Desktop and mobile resume windows render all pages from the loaded PDF (`numPages`) instead of hardcoding page 1.
- Width scaling for both resume views is shared via `useContainerWidth` (`src/hooks/useContainerWidth.ts`) to keep sizing behavior consistent across breakpoints.

### Photos Behavior
- Dock `Photos` opens the dedicated `Photos` window (`WindowKey: 'photos'`).
- Finder `Photos` location renders an in-Finder gallery view.
- Clicking any gallery image (in Photos app or Finder photos view) opens the image file window (`WindowKey: 'imgfile'`).

### Desktop Selection Behavior
- Home items:
  - single-click selects (label/icon highlight)
  - double-click opens
  - clicking outside clears selection
- Finder content items:
  - single-click selects
  - double-click opens
  - clicking outside clears selection

### Trash Behavior
- `trash` is intentionally configured with `canOpen: false` in `dockApps`.
- Dock still treats `trash` as a special-case click target that opens Finder with the Trash location selected.
