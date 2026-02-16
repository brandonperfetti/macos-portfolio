# Navigation

## Finder/Locations Structure
Finder-like navigation is driven by `locations` in `src/constants/index.ts`.

- `locations` contains the hierarchical folder/file tree used by the Finder UI
- `useLocationStore` tracks the currently active folder selection
- `LocationType` includes `photos` so Photos can be represented as a first-class Finder location
- `locations.work.children` includes nested project folders (no `type` field)
- Folder nodes include `scope: 'root' | 'nested'` to distinguish root locations from nested folders
- Keep names and nesting consistent with existing patterns

Photos location behavior:
- Selecting the Photos location in Finder swaps the content area to a gallery view.
- Selecting non-Photos locations keeps the standard Finder file/folder grid.

Pattern: When adding new items, update `locations` to reflect the correct hierarchy and include any metadata used by the UI.
