import type { ReactElement } from 'react';

import { Dock, Navbar, Welcome } from '#components';
import { Terminal } from '#windows';


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
