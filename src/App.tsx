import type { ReactElement } from 'react';

import { Dock, Navbar, Welcome } from '#components';
import {
	Contact,
	Finder,
	ImageFile,
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
			<Welcome />
			<Dock />

			<Terminal />
			<Safari />
			<Resume />
			<Finder />
			<ImageFile />
			<Text />
			<Contact />
		</main>
	);
};

export default App;
