declare module 'gsap/draggable' {
	class Draggable {
		static create(
			target: gsap.DOMTarget,
			vars?: Draggable.Vars,
		): Draggable[];

		kill(): void;
	}

	export default Draggable;
}

declare module 'gsap/Draggable' {
	export { default } from 'gsap/draggable';
}
