declare module 'gsap/Draggable' {
	const Draggable: typeof Draggable;
	export default Draggable;
}

declare module 'gsap/draggable' {
	export { default } from 'gsap/Draggable';
}
