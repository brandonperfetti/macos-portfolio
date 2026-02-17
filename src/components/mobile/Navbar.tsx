import { useCurrentTime } from '#hooks';
import { useWindowStore } from '#store';
import clsx from 'clsx';
import { Battery, Wifi } from 'lucide-react';
import type { ReactElement } from 'react';

export const MobileNavbar = (): ReactElement => {
	const currentTime = useCurrentTime();
	const shouldUseOpaqueNavbar = useWindowStore((state) =>
		Object.values(state.windows).some((window) => window.isOpen),
	);

	return (
		<section
			id="mobile-navbar"
			className={clsx(
				'sm:hidden',
				shouldUseOpaqueNavbar && 'mobile-navbar-opaque',
			)}
		>
			<time dateTime={currentTime.toISOString()}>
				{currentTime.format('h:mm A')}
			</time>
			<div className="mobile-notch" aria-hidden="true" />
			<ul>
				<li>
					<Wifi size={26} className="icon" aria-hidden="true" />
				</li>
				<li>
					<Battery size={26} className="icon" aria-hidden="true" />
				</li>
			</ul>
		</section>
	);
};
