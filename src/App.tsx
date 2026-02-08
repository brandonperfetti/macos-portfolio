import type { ReactElement } from 'react';

import { Dock, Navbar, Welcome } from '#components';
import { Safari, Terminal } from '#windows';


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
			<Safari />
		</main>
	);
};

export default App;
