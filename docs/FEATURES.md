# Features

## Adding New Features

### Adding a New Window/App
1. Add entry to `WINDOW_CONFIG` in `src/constants/index.ts`
2. Add to `dockApps` array with `canOpen: true`
3. Create window component (reference existing patterns)
4. Export the window from `src/windows/index.ts`
5. Mount the window in `src/App.tsx` if it should be globally render-ready
6. Update Zustand/types if the window requires custom data shape
7. Move reusable display values (for example contact email/avatar URLs) into `src/constants/index.ts` and import them into the window.

### Adding Navigation Items
Update `navLinks` in `src/constants/index.ts` with `type` matching window keys.

### Adding Home Desktop Shortcuts
1. Source shortcut items from `locations` in `src/constants/index.ts` so Finder and Home stay aligned.
2. On double-click, call `setActiveLocation(project)` before `openWindow('finder')` to open Finder focused on the selected folder.
3. Scope GSAP Draggable selectors to the Home container ref (avoid global selectors like `.folder` without a container scope).
