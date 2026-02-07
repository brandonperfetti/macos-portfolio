import type { WindowState } from '#store';
import { useWindowStore } from '#store';
import type { WindowKey } from '#types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Draggable from 'gsap/draggable';
import type { ComponentType, ReactElement, JSX as ReactJSX } from 'react';
import { useLayoutEffect, useRef } from 'react';

const WindowWrapper = <Props extends ReactJSX.IntrinsicAttributes>(
	Component: ComponentType<Props>,
	windowKey: WindowKey,
): ComponentType<Props> => {
	const Wrapped = (props: Props): ReactElement => {
		const windows = useWindowStore((state: WindowState) => state.windows);
		const focusWindow = useWindowStore(
			(state: WindowState) => state.focusWindow,
		);
		const { isOpen, zIndex } = windows[windowKey];
		const ref = useRef<HTMLElement | null>(null);

		useGSAP(() => {
			const el = ref.current;
			if (!el || !isOpen) return;

			el.style.display = 'block';

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
		}, [isOpen]);

		useGSAP(() => {
			const el = ref.current;
			if (!el || !isOpen) return;

			const [instance] = Draggable.create(el, {
				onPress: () => {
					focusWindow(windowKey);
				},
			});

			return () => {
				instance.kill();
			};
		}, [focusWindow, isOpen, windowKey]);

		useLayoutEffect(() => {
			const el = ref.current;
			if (!el) return;
			el.style.display = isOpen ? 'block' : 'none';
		}, [isOpen]);

		return (
			<section
				id={windowKey}
				ref={ref}
				style={{ zIndex }}
				className="absolute"
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
