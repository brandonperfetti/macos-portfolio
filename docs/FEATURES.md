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
1. Curate shortcut items with `homeItems` in `src/constants/index.ts` using path-based references into `locations`.
2. Mirror Finder file/folder open behavior on double-click (folders open Finder, files open their mapped windows/links).
3. Scope GSAP Draggable selectors to the Home container ref (avoid global selectors without container scope).

### Photos Behavior
- Dock `Photos` opens the dedicated `Photos` window (`WindowKey: 'photos'`).
- Finder `Photos` location renders an in-Finder gallery view.
- Clicking any gallery image (in Photos app or Finder photos view) opens the image file window (`WindowKey: 'imgfile'`).

### Trash Behavior
- `trash` is intentionally configured with `canOpen: false` in `dockApps`.
- Dock still treats `trash` as a special-case click target that opens Finder with the Trash location selected.
