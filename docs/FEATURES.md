# Features

## Adding New Features

### Adding a New Window/App
1. Add entry to `WINDOW_CONFIG` in `src/constants/index.ts`
2. Add to `dockApps` array with `canOpen: true`
3. Create window component (reference existing patterns)
4. Export the window from `src/windows/index.ts`
5. Mount the window in `src/App.tsx` if it should be globally render-ready
6. Update Zustand/types if the window requires custom data shape

### Adding Navigation Items
Update `navLinks` in `src/constants/index.ts` with `type` matching window keys.
