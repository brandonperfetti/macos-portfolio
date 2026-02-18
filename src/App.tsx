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
import { useWindowStore } from '#store';
import { useShallow } from 'zustand/react/shallow';

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

interface OpenWindows {
	resume: boolean;
	imgfile: boolean;
	txtfile: boolean;
	finder: boolean;
	safari: boolean;
	photos: boolean;
	contact: boolean;
	terminal: boolean;
}

/**
 * Root layout for the macOS-style portfolio.
 */
const App = (): ReactElement => {
	const openWindows = useWindowStore(
		useShallow(
			(state): OpenWindows => ({
				resume: state.windows.resume.isOpen,
				imgfile: state.windows.imgfile.isOpen,
				txtfile: state.windows.txtfile.isOpen,
				finder: state.windows.finder.isOpen,
				safari: state.windows.safari.isOpen,
				photos: state.windows.photos.isOpen,
				contact: state.windows.contact.isOpen,
				terminal: state.windows.terminal.isOpen,
			}),
		),
	);
	const isMobile = useIsMobile();

	return (
		<main>
			<Navbar />
			<MobileNavbar />
			<Home />
			<MobileHome />
			<Welcome />

			<Dock />

			{openWindows.resume ? (
				<Suspense fallback={null}>
					{isMobile ? <MobileResume /> : <Resume />}
				</Suspense>
			) : null}

			{openWindows.imgfile ? (
				<Suspense fallback={null}>
					{isMobile ? <MobileImageFile /> : <ImageFile />}
				</Suspense>
			) : null}

			{openWindows.txtfile ? (
				<Suspense fallback={null}>
					{isMobile ? <MobileText /> : <Text />}
				</Suspense>
			) : null}

			{openWindows.finder ? (
				<Suspense fallback={null}>
					{isMobile ? <MobileFinder /> : <Finder />}
				</Suspense>
			) : null}

			{openWindows.safari ? (
				<Suspense fallback={null}>
					{isMobile ? <MobileSafari /> : <Safari />}
				</Suspense>
			) : null}

			{openWindows.photos ? (
				<Suspense fallback={null}>
					{isMobile ? <MobilePhotos /> : <Photos />}
				</Suspense>
			) : null}

			{openWindows.contact ? (
				<Suspense fallback={null}>
					{isMobile ? <MobileContact /> : <Contact />}
				</Suspense>
			) : null}

			{openWindows.terminal ? (
				<Suspense fallback={null}>
					{isMobile ? <MobileTerminal /> : <Terminal />}
				</Suspense>
			) : null}
		</main>
	);
};

export default App;
