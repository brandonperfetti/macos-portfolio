// Shared window state types.
export type WindowKey =
	| 'finder'
	| 'contact'
	| 'resume'
	| 'safari'
	| 'photos'
	| 'terminal'
	| 'txtfile'
	| 'imgfile';

export type WindowData = Record<string, unknown>;

export interface WindowConfigEntry {
	isOpen: boolean;
	zIndex: number;
	data: WindowData | null;
}

export type WindowConfig = Record<WindowKey, WindowConfigEntry>;
