import { navIcons, navLinks } from '#constants';
import { useCurrentTime } from '#hooks';
import type { ReactElement } from 'react';

/**
 * Top navigation bar with portfolio links and current time.
 */
export const Navbar = (): ReactElement => {
	const currentTime = useCurrentTime();

	return (
		<nav>
			<div>
				<img src="/images/logo.svg" alt="logo" />
				<p className="font-bold">Brandon's Portfolio</p>

				<ul>
					{navLinks.map((item) => (
						<li key={item.id}>{item.name}</li>
					))}
				</ul>
			</div>

			<div>
				<ul>
					{navIcons.map(({ id, img }) => (
						<li key={id}>
							<img
								src={img}
								alt={`icon-${String(id)}`}
								className="icon-hover"
							/>
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
