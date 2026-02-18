import { lazy, Suspense, type ReactElement } from 'react';

import {
	Dock,
	Home,
	MobileHome,
	MobileNavbar,
	Navbar,
	Welcome,
} from '#components';
import { useIsMobile } from '#hooks';
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
	const isMobile = useIsMobile();

	return (
		<main>
			<Navbar />
			<MobileNavbar />
			<Home />
			<MobileHome />
			<Welcome />

			<Dock />

			<Suspense fallback={null}>
				{windows.resume.isOpen ? (isMobile ? <MobileResume /> : <Resume />) : null}

				{windows.imgfile.isOpen ? (isMobile ? <MobileImageFile /> : <ImageFile />) : null}

				{windows.txtfile.isOpen ? (isMobile ? <MobileText /> : <Text />) : null}

				{windows.finder.isOpen ? (isMobile ? <MobileFinder /> : <Finder />) : null}

				{windows.safari.isOpen ? (isMobile ? <MobileSafari /> : <Safari />) : null}

				{windows.photos.isOpen ? (isMobile ? <MobilePhotos /> : <Photos />) : null}

				{windows.contact.isOpen ? (isMobile ? <MobileContact /> : <Contact />) : null}

				{windows.terminal.isOpen ? (isMobile ? <MobileTerminal /> : <Terminal />) : null}
			</Suspense>
		</main>
	);
};

export default App;
