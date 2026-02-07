# Workflow

## Commands
- `npm run dev` - Start dev server (Vite)
- `npm run build` - TypeScript check + production build
- `npm run lint` - ESLint with TypeScript rules
- `npm run preview` - Preview production build

## Type Safety
- Strict TypeScript with project references (`tsconfig.json` → `tsconfig.app.json`)
- `as const` assertions for literal type inference (see `dockApps`)
- Type guards for window keys: `id is keyof typeof windows`
