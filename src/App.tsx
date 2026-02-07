import gsap from 'gsap';
import Draggable from 'gsap/draggable';
import type { ReactElement } from 'react';

import { Dock, Navbar, Welcome } from '#components';
import { Terminal } from '#windows';

gsap.registerPlugin(Draggable);

/**
 * Root layout for the macOS-style portfolio.
 */
const App = (): ReactElement => {
	return (
		<main>
			<Navbar />
			<Welcome />
			<Dock />

			<Terminal />
		</main>
	);
};

export default App;
