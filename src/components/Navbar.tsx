import { navIcons, navLinks } from '#constants';
import { useCurrentTime } from '#hooks';
import { useWindowStore } from '#store';
import type { ReactElement } from 'react';
import Theme from './Theme';

/**
 * Top navigation bar with portfolio links and current time.
 */
export const Navbar = (): ReactElement => {
	const currentTime = useCurrentTime();
	const { openWindow } = useWindowStore();

	return (
		<nav>
			<div>
				<img
					src="/images/logo.svg"
					alt="logo"
					className="dark:invert"
				/>
				<p className="font-bold">Brandon's Portfolio</p>

				<ul>
					{navLinks.map(({ id, name, type }) => (
						<li key={id}>
							<button
								type="button"
								className="cursor-pointer"
								onClick={() => {
									openWindow(type);
								}}
							>
								{name}
							</button>
						</li>
					))}
				</ul>
			</div>

			<div>
				<ul>
					{navIcons.map(({ id, img }) => (
						<li key={id}>
							{id === 4 ? (
								<Theme />
							) : (
								<img
									src={img}
									alt={`icon-${String(id)}`}
									className="icon-hover dark:invert"
								/>
							)}
						</li>
					))}
				</ul>
				{/* Local time display for desktop-like feel */}
				<time dateTime={currentTime.toISOString()}>
					{currentTime.format('ddd MMM D h:mm A')}
				</time>
			</div>
		</nav>
	);
};
