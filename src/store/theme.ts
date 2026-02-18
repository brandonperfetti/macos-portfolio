import type { ThemeMode } from '#types';
import { create } from 'zustand';

interface ThemeState {
	theme: ThemeMode;
	setTheme: (theme: ThemeMode) => void;
}

const useThemeStore = create<ThemeState>((set) => ({
	theme: 'system',
	setTheme: (theme) => {
		set({ theme });
	},
}));

export type { ThemeMode, ThemeState };
export default useThemeStore;
