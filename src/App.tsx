import type { ReactElement } from 'react';

import { Dock, Navbar, Welcome } from '#components';
import { Finder, ImageFile, Resume, Safari, Terminal, Text } from '#windows';

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
			<Resume />
			<Finder />
			<ImageFile />
			<Text />
		</main>
	);
};

export default App;
