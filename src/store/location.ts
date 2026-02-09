import { locations } from '#constants';
import type { FinderLocation } from '#types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const DEFAULT_LOCATION: FinderLocation = locations.work;

export interface LocationState {
	activeLocation: FinderLocation | null;
	setActiveLocation: (location: FinderLocation | null) => void;
	resetActiveLocation: () => void;
}

const useLocationStore = create<LocationState>()(
	immer((set) => ({
		activeLocation: DEFAULT_LOCATION,

		setActiveLocation: (location) => {
			set((state) => {
				state.activeLocation = location;
			});
		},

		resetActiveLocation: () => {
			set((state) => {
				state.activeLocation = DEFAULT_LOCATION;
			});
		},
	})),
);

export default useLocationStore;
