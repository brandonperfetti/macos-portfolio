// Use local type imports inside /types to avoid circular #types barrel resolution.
import type { FinderNode } from './finder';

// Shared window state types.
/** Supported window keys for the desktop UI. */
export type WindowKey =
	| 'finder'
	| 'contact'
	| 'resume'
	| 'safari'
	| 'photos'
	| 'terminal'
	| 'txtfile'
	| 'imgfile';

/** Arbitrary data payload stored on each window instance. */
export type WindowData = FinderNode | Record<string, unknown>;

/** Window state entry for a single window. */
export interface WindowConfigEntry {
	/** Whether the window is currently open. */
	isOpen: boolean;
	/** Stacking order (higher values appear on top). */
	zIndex: number;
	/** Optional window-scoped data payload. */
	data: WindowData | null;
}

/** Map of all window keys to their current state. */
export type WindowConfig = Record<WindowKey, WindowConfigEntry>;
