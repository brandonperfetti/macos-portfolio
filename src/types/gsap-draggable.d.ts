/**
 * Type shim for GSAP's Draggable plugin.
 * Provides a minimal public API surface used by this app.
 */
declare module 'gsap/draggable' {
	/** Namespace for Draggable option types. */
	namespace Draggable {
		/** Options passed to Draggable.create. */
		interface Vars {
			onPress?: () => void;
		}
	}

	/** Draggable plugin class from GSAP. */
	class Draggable {
		/**
		 * Creates draggable instances for the provided targets.
		 * @param target Target element(s) to make draggable.
		 * @param vars Optional Draggable options.
		 * @returns Array of Draggable instances.
		 */
		static create(
			target: gsap.DOMTarget,
			vars?: Draggable.Vars,
		): Draggable[];

		/** Destroys the draggable instance and cleans up listeners. */
		kill(): void;
	}

	export default Draggable;
}

/** Re-export the shim to match the GSAP module casing. */
declare module 'gsap/Draggable' {
	export { default } from 'gsap/draggable';
}
