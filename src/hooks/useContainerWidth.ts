import { useLayoutEffect, useRef, useState, type RefObject } from 'react';

/**
 * Tracks a container element's width and updates when its size changes.
 */
export const useContainerWidth = <T extends HTMLElement = HTMLDivElement>(
	initialWidth = 0,
): [RefObject<T | null>, number] => {
	const containerRef = useRef<T>(null);
	const [width, setWidth] = useState(initialWidth);

	useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const syncWidth = () => {
			setWidth(container.clientWidth);
		};

		syncWidth();

		if (typeof ResizeObserver !== 'undefined') {
			const observer = new ResizeObserver(syncWidth);
			observer.observe(container);
			return () => {
				observer.disconnect();
			};
		}

		window.addEventListener('resize', syncWidth);
		return () => {
			window.removeEventListener('resize', syncWidth);
		};
	}, []);

	return [containerRef, width];
};
