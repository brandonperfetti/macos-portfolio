import { useWindowStore } from '#store';
import type { ReactElement } from 'react';

/**
 * Mobile landing screen with quick-launch actions for key windows.
 * Uses `useWindowStore().openWindow` to open target windows from icon taps.
 * @returns {ReactElement}
 */
export const MobileHome = (): ReactElement => {
	const { openWindow } = useWindowStore();

	return (
		<section id="mobile-home">
			<ul>
				<li>
					<button
						type="button"
						onClick={() => {
							openWindow('resume');
						}}
					>
						<img src="/images/pages.png" alt="Resume" />
						<p>Resume</p>
					</button>
				</li>
				<li>
					<button
						type="button"
						onClick={() => {
							openWindow('terminal');
						}}
					>
						<img src="/images/terminal.png" alt="Terminal" />
						<p>Skills</p>
					</button>
				</li>
			</ul>
		</section>
	);
};
