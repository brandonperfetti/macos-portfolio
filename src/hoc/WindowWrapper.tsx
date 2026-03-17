import { Draggable, gsap } from '#lib/gsap-draggable';
import { useWindowStore, type WindowState } from '#store';
import type { WindowKey } from '#types';
import { useGSAP } from '@gsap/react';
import type { ComponentType, ReactElement, JSX as ReactJSX } from 'react';
import { useEffect, useRef, useState } from 'react';

/**
 * Wraps a window component with open/close animation, drag behavior, and z-index focus.
 */
const WindowWrapper = <Props extends ReactJSX.IntrinsicAttributes>(
	Component: ComponentType<Props>,
	windowKey: WindowKey,
): ComponentType<Props> => {
	const Wrapped = (props: Props): ReactElement | null => {
		const windows = useWindowStore((state: WindowState) => state.windows);
		const focusWindow = useWindowStore(
			(state: WindowState) => state.focusWindow,
		);
		const { isOpen, zIndex } = windows[windowKey];
		const ref = useRef<HTMLElement | null>(null);
		const [isDesktop, setIsDesktop] = useState<boolean>(() =>
			typeof window !== 'undefined'
				? window.matchMedia('(min-width: 640px)').matches
				: true,
		);

		useEffect(() => {
			const media = window.matchMedia('(min-width: 640px)');
			const sync = () => {
				setIsDesktop(media.matches);
			};

			sync();
			media.addEventListener('change', sync);
			return () => {
				media.removeEventListener('change', sync);
			};
		}, []);

		useGSAP(() => {
			const el = ref.current;
			if (!el || !isOpen || !isDesktop) return;

			gsap.fromTo(
				el,
				{ scale: 0.8, opacity: 0, y: 40 },
				{
					scale: 1,
					opacity: 1,
					y: 0,
					duration: 0.4,
					ease: 'power3.out',
				},
			);
		}, [isDesktop, isOpen]);

		useGSAP(() => {
			const el = ref.current;
			if (!el || !isOpen || !isDesktop) return;
			const headerTrigger =
				el.querySelector<HTMLElement>('.window-header');
			const draggableOptions = {
				trigger: headerTrigger ?? el,
				dragClickables: false,
				allowEventDefault: true,
				onPress: () => {
					focusWindow(windowKey);
				},
				// GSAP Draggable options typing is stricter than this inferred shape; cast keeps compile-time compatibility.
			} as unknown as Parameters<typeof Draggable.create>[1];

			const [instance] = Draggable.create(el, draggableOptions);

			return () => {
				instance.kill();
			};
		}, [focusWindow, isDesktop, isOpen, windowKey]);

		if (!isDesktop) return null;

		return (
			<section
				id={windowKey}
				ref={ref}
				onPointerDown={() => {
					focusWindow(windowKey);
				}}
				style={{
					zIndex,
					display: isOpen ? undefined : 'none',
				}}
				className="desktop-window absolute"
			>
				<Component {...props} />
			</section>
		);
	};

	const componentName = Component.displayName ?? Component.name;
	Wrapped.displayName = `windowWrapper(${componentName})`;

	return Wrapped;
};

export default WindowWrapper;
