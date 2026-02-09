import { locations } from '#constants';
import type { FinderLocation } from '#types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const DEFAULT_LOCATION: FinderLocation = locations.work;

/**
 * Store shape for the active Finder location.
 */
export interface LocationState {
	/** Currently active location, or null when unset. */
	activeLocation: FinderLocation | null;
	/** Sets the active location (or clears it with null). */
	setActiveLocation: (location: FinderLocation | null) => void;
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
