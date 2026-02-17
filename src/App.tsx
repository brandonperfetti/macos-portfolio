import type { ReactElement } from 'react';

import {
	Dock,
	Home,
	MobileHome,
	MobileNavbar,
	Navbar,
	Welcome,
} from '#components';
import {
	Contact,
	Finder,
	ImageFile,
	MobileContact,
	MobileFinder,
	MobileImageFile,
	MobilePhotos,
	MobileResume,
	MobileSafari,
	MobileTerminal,
	MobileText,
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
			<MobileNavbar />
			<Home />
			<MobileHome />
			<Welcome />

			<Resume />
			<MobileResume />
			<ImageFile />
			<MobileImageFile />
			<Text />
			<MobileText />

			<Dock />
			<Finder />
			<MobileFinder />
			<Safari />
			<MobileSafari />
			<Photos />
			<MobilePhotos />
			<Contact />
			<MobileContact />
			<Terminal />
			<MobileTerminal />
		</main>
	);
};

export default App;
