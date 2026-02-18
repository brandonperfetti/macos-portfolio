import { lazy, Suspense, type ReactElement } from 'react';

import {
	Dock,
	Home,
	MobileHome,
	MobileNavbar,
	Navbar,
	Welcome,
} from '#components';
import { useWindowStore, type WindowState } from '#store';

const Contact = lazy(() => import('#windows/Contact'));
const Finder = lazy(() => import('#windows/Finder'));
const ImageFile = lazy(() => import('#windows/ImageFile'));
const MobileContact = lazy(() => import('#windows/mobile/Contact'));
const MobileFinder = lazy(() => import('#windows/mobile/Finder'));
const MobileImageFile = lazy(() => import('#windows/mobile/file/Image'));
const MobilePhotos = lazy(() => import('#windows/mobile/Photos'));
const MobileResume = lazy(() => import('#windows/mobile/Resume'));
const MobileSafari = lazy(() => import('#windows/mobile/Safari'));
const MobileTerminal = lazy(() => import('#windows/mobile/Terminal'));
const MobileText = lazy(() => import('#windows/mobile/file/Text'));
const Photos = lazy(() => import('#windows/Photos'));
const Resume = lazy(() => import('#windows/Resume'));
const Safari = lazy(() => import('#windows/Safari'));
const Terminal = lazy(() => import('#windows/Terminal'));
const Text = lazy(() => import('#windows/Text'));

/**
 * Root layout for the macOS-style portfolio.
 */
const App = (): ReactElement => {
	const windows = useWindowStore((state: WindowState) => state.windows);

	return (
		<main>
			<Navbar />
			<MobileNavbar />
			<Home />
			<MobileHome />
			<Welcome />

			<Dock />

			<Suspense fallback={null}>
				{windows.resume.isOpen ? <Resume /> : null}
				{windows.resume.isOpen ? <MobileResume /> : null}

				{windows.imgfile.isOpen ? <ImageFile /> : null}
				{windows.imgfile.isOpen ? <MobileImageFile /> : null}

				{windows.txtfile.isOpen ? <Text /> : null}
				{windows.txtfile.isOpen ? <MobileText /> : null}

				{windows.finder.isOpen ? <Finder /> : null}
				{windows.finder.isOpen ? <MobileFinder /> : null}

				{windows.safari.isOpen ? <Safari /> : null}
				{windows.safari.isOpen ? <MobileSafari /> : null}

				{windows.photos.isOpen ? <Photos /> : null}
				{windows.photos.isOpen ? <MobilePhotos /> : null}

				{windows.contact.isOpen ? <Contact /> : null}
				{windows.contact.isOpen ? <MobileContact /> : null}

				{windows.terminal.isOpen ? <Terminal /> : null}
				{windows.terminal.isOpen ? <MobileTerminal /> : null}
			</Suspense>
		</main>
	);
};

export default App;
