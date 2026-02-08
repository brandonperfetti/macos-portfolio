import { INITIAL_Z_INDEX, WINDOW_CONFIG } from '#constants';
import type { WindowData, WindowKey } from '#types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type { WindowData, WindowKey };

interface WindowMeta {
	isOpen: boolean;
	zIndex: number;
	data: WindowData | null;
}

export interface WindowState {
	windows: Record<WindowKey, WindowMeta>;
	nextZIndex: number;
	openWindow: (windowKey: WindowKey, data?: WindowData | null) => void;
	closeWindow: (windowKey: WindowKey) => void;
	focusWindow: (windowKey: WindowKey) => void;
}

/**
 * Central window store for open/close/focus actions.
 * Uses monotonic z-index to keep focused windows above others.
 */
const useWindowStore = create<WindowState>()(
	immer((set) => ({
		windows: WINDOW_CONFIG as Record<WindowKey, WindowMeta>,
		nextZIndex: INITIAL_Z_INDEX + 1,

		openWindow: (windowKey, data = null) => {
			set((state: WindowState) => {
				const win = state.windows[windowKey];
				win.isOpen = true;
				// Assign newest z-index to bring the window to the front.
				win.zIndex = state.nextZIndex;
				win.data = data ?? win.data;
				state.nextZIndex++;
			});
		},
		closeWindow: (windowKey) => {
			set((state: WindowState) => {
				const win = state.windows[windowKey];
				win.isOpen = false;
				win.zIndex = INITIAL_Z_INDEX;
				win.data = null;
			});
		},
		focusWindow: (windowKey) => {
			set((state: WindowState) => {
				const win = state.windows[windowKey];
				if (!win.isOpen) return;
				// Bump z-index only for open windows to preserve stacking order.
				win.zIndex = state.nextZIndex++;
			});
		},
	})),
);

export default useWindowStore;
