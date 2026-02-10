import { locations } from '#constants';
import type { FinderLocationFolder } from '#types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const DEFAULT_LOCATION: FinderLocationFolder = locations.work;

/**
 * Store shape for the active Finder location.
 */
export interface LocationState {
	/** Currently active folder, or null when unset. */
	activeLocation: FinderLocationFolder | null;
	/** Sets the active folder (or clears it with null). */
	setActiveLocation: (location: FinderLocationFolder | null) => void;
	/** Resets the active location to the default. */
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
