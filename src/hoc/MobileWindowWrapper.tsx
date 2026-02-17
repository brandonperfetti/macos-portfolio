import { useWindowStore, type WindowState } from '#store';
import type { WindowKey } from '#types';
import type { ComponentType, ReactElement, JSX as ReactJSX } from 'react';
import { useEffect, useState } from 'react';

const MobileWindowWrapper = <Props extends ReactJSX.IntrinsicAttributes>(
	Component: ComponentType<Props>,
	windowKey: WindowKey,
): ComponentType<Props> => {
	const Wrapped = (props: Props): ReactElement => {
		const { isOpen, zIndex } = useWindowStore(
			(state: WindowState) => state.windows[windowKey],
		);
		const [isMobile, setIsMobile] = useState(false);

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

		if (!isMobile || !isOpen) return <></>;

		return (
			<section id={`mobile-${windowKey}`} style={{ zIndex }}>
				<Component {...props} />
			</section>
		);
	};

	const componentName = Component.displayName ?? Component.name;
	Wrapped.displayName = `mobileWindowWrapper(${componentName})`;

	return Wrapped;
};

export default MobileWindowWrapper;
