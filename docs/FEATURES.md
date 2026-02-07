# Features

## Adding New Features

### Adding a New Window/App
1. Add entry to `WINDOW_CONFIG` in `src/constants/index.ts`
2. Add to `dockApps` array with `canOpen: true`
3. Create window component (reference existing patterns)
4. Update Zustand types if new window requires custom data shape

### Adding Navigation Items
Update `navLinks` in `src/constants/index.ts` with `type` matching window keys.
