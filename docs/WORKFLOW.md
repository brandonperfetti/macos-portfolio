# Workflow

## Commands
- `npm run dev` - Start dev server (Vite)
- `npm run build` - TypeScript check + production build
- `npm run lint` - ESLint with TypeScript rules
- `npm run preview` - Preview production build

## Type Safety
- Strict TypeScript with project references (`tsconfig.json` → `tsconfig.app.json`)
- Prefer `satisfies` for config/data objects to enforce shape without losing literal types.
- Shared type definitions live under `src/types/` and are re-exported via `#types`.
- Dock apps enforce `WindowKey` when `canOpen: true`, so extra window-key guards are usually unnecessary.

## Imports
- Prefer alias-based imports via barrels (e.g. `#components`, `#hooks`, `#store`).
