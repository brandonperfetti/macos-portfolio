import type { ReactElement } from 'react';

import { Dock, Home, Navbar, Welcome } from '#components';
import {
	Contact,
	Finder,
	ImageFile,
	Photos,
	Resume,
	Safari,
	Terminal,
	Text,
} from '#windows';

/**
 * Root layout for the macOS-style portfolio.
 */
const App = (): ReactElement => {
	return (
		<main>
			<Navbar />
			<Home />
			<Welcome />

			<Resume />
			<ImageFile />
			<Text />

			<Dock />
			<Finder />
			<Safari />
			<Photos />
			<Contact />
			<Terminal />
		</main>
	);
};

export default App;
