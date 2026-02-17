import { useWindowStore, type WindowState } from '#store';
import type { WindowKey } from '#types';
import type { ComponentType, ReactElement, JSX as ReactJSX } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const MobileWindowWrapper = <Props extends ReactJSX.IntrinsicAttributes>(
	Component: ComponentType<Props>,
	windowKey: WindowKey,
): ComponentType<Props> => {
	const Wrapped = (props: Props): ReactElement => {
		const windows = useWindowStore((state: WindowState) => state.windows);
		const { isOpen, zIndex } = windows[windowKey];
		const [isMobile, setIsMobile] = useState(false);
		const ref = useRef<HTMLElement | null>(null);

		useEffect(() => {
			const media = window.matchMedia('(max-width: 639px)');
			const sync = () => {
				setIsMobile(media.matches);
			};

			sync();
			media.addEventListener('change', sync);
			return () => {
				media.removeEventListener('change', sync);
			};
		}, []);

		useLayoutEffect(() => {
			const el = ref.current;
			if (!el) return;
			el.style.display = isOpen && isMobile ? 'block' : 'none';
		}, [isMobile, isOpen]);

		if (!isMobile || !isOpen) return <></>;

		return (
			<section id={`mobile-${windowKey}`} ref={ref} style={{ zIndex }}>
				<Component {...props} />
			</section>
		);
	};

	const componentName = Component.displayName ?? Component.name;
	Wrapped.displayName = `mobileWindowWrapper(${componentName})`;

	return Wrapped;
};

export default MobileWindowWrapper;
