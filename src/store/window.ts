import { INITIAL_Z_INDEX, WINDOW_CONFIG } from '#constants';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type WindowKey = keyof typeof WINDOW_CONFIG;

type WindowData = unknown;

interface WindowMeta {
	isOpen: boolean;
	zIndex: number;
	data: WindowData | null;
}

interface WindowState {
	windows: Record<WindowKey, WindowMeta>;
	nextZIndex: number;
	openWindow: (windowKey: WindowKey, data?: WindowData | null) => void;
	closeWindow: (windowKey: WindowKey) => void;
	focusWindow: (windowKey: WindowKey) => void;
}

const useWindowStore = create<WindowState>()(
	immer((set) => ({
		windows: WINDOW_CONFIG as Record<WindowKey, WindowMeta>,
		nextZIndex: INITIAL_Z_INDEX + 1,

		openWindow: (windowKey, data = null) =>
			set((state) => {
				const win = state.windows[windowKey];
				win.isOpen = true;
				win.zIndex = state.nextZIndex;
				win.data = data ?? win.data;
				state.nextZIndex++;
			}),
		closeWindow: (windowKey) =>
			set((state) => {
				const win = state.windows[windowKey];
				win.isOpen = false;
				win.zIndex = INITIAL_Z_INDEX;
				win.data = null;
			}),
		focusWindow: (windowKey) =>
			set((state) => {
				const win = state.windows[windowKey];
				if (!win.isOpen) return;
				win.zIndex = state.nextZIndex++;
			}),
	})),
);

export default useWindowStore;
