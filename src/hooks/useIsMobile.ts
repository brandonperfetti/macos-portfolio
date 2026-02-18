import { useEffect, useState } from 'react';

const MOBILE_MEDIA_QUERY = '(max-width: 639px)';

/**
 * Returns whether the viewport matches the mobile breakpoint.
 */
export const useIsMobile = (): boolean => {
	const [isMobile, setIsMobile] = useState(() =>
		typeof window !== 'undefined'
			? window.matchMedia(MOBILE_MEDIA_QUERY).matches
			: false,
	);

	useEffect(() => {
		const media = window.matchMedia(MOBILE_MEDIA_QUERY);
		const sync = () => {
			setIsMobile(media.matches);
		};

		sync();
		media.addEventListener('change', sync);
		return () => {
			media.removeEventListener('change', sync);
		};
	}, []);

	return isMobile;
};
