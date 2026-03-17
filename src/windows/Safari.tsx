import { WindowControls } from '#components';
import { blogPosts, safariBookmarks } from '#constants';
import { WindowWrapper } from '#hoc';
import { resolveSafariAddressInput } from '#lib/safari-address';
import { useWindowStore, type WindowState } from '#store';
import {
	ChevronLeft,
	ChevronRight,
	MoveRight,
	PanelLeft,
	Plus,
	SearchIcon,
	Share,
} from 'lucide-react';
import {
	useEffect,
	useMemo,
	useState,
	type FormEvent,
	type ReactElement,
} from 'react';

const SAFARI_PAGE_SIZE = 3;

/**
 * Safari-like window that previews blog posts and navigation controls.
 */
const Safari = (): ReactElement => {
	const [addressInput, setAddressInput] = useState('');
	const [pageIndex, setPageIndex] = useState(0);
	const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
	const [addressInputEl, setAddressInputEl] =
		useState<HTMLInputElement | null>(null);
	const windows = useWindowStore((state: WindowState) => state.windows);

	const isSafariTopmost = useMemo(() => {
		const openWindows = Object.values(windows).filter(
			(windowMeta) => windowMeta.isOpen,
		);
		if (openWindows.length === 0) return false;

		const topZIndex = Math.max(
			...openWindows.map((windowMeta) => windowMeta.zIndex),
		);
		return windows.safari.isOpen && windows.safari.zIndex === topZIndex;
	}, [windows]);

	const handleAddressSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const targetUrl = resolveSafariAddressInput(addressInput);
		if (!targetUrl) return;

		window.open(targetUrl, '_blank', 'noopener,noreferrer');
	};

	const totalPages = Math.max(
		1,
		Math.ceil(blogPosts.length / SAFARI_PAGE_SIZE),
	);

	const visiblePosts = useMemo(() => {
		const start = pageIndex * SAFARI_PAGE_SIZE;
		return blogPosts.slice(start, start + SAFARI_PAGE_SIZE);
	}, [pageIndex]);

	const canGoBack = pageIndex > 0;
	const canGoForward = pageIndex < totalPages - 1;

	const bookmarksByCategory = useMemo(() => {
		const grouped = new Map<string, typeof safariBookmarks>();
		safariBookmarks.forEach((bookmark) => {
			const current = grouped.get(bookmark.category) ?? [];
			grouped.set(bookmark.category, [...current, bookmark]);
		});
		return Array.from(grouped.entries());
	}, []);

	const openExternalUrl = (url: string): void => {
		window.open(url, '_blank', 'noopener,noreferrer');
	};

	const handleShare = async (): Promise<void> => {
		const shareUrl = window.location.href;
		try {
			await navigator.share({
				title: "Brandon's macOS Portfolio",
				url: shareUrl,
			});
			return;
		} catch {
			// Fall back to clipboard below.
		}

		try {
			await navigator.clipboard.writeText(shareUrl);
		} catch {
			// No-op if clipboard is unavailable.
		}
	};

	const toggleBookmarksMenu = (): void => {
		setIsBookmarksOpen((previous) => !previous);
	};

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			const isAddressShortcut =
				(event.metaKey || event.ctrlKey) &&
				!event.shiftKey &&
				!event.altKey &&
				(event.key === '/' || event.code === 'Slash');

			if (!isAddressShortcut || !isSafariTopmost) return;

			event.preventDefault();
			addressInputEl?.focus();
			addressInputEl?.select();
		};

		window.addEventListener('keydown', onKeyDown);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isSafariTopmost, addressInputEl]);

	return (
		<>
			<div className="window-header safari-header">
				<div className="safari-header-left">
					<WindowControls target="safari" />
					<button
						type="button"
						className="safari-toolbar-btn ml-6"
						aria-label="Toggle bookmarks sidebar"
						aria-expanded={isBookmarksOpen}
						onClick={toggleBookmarksMenu}
					>
						<PanelLeft
							className="safari-toolbar-icon"
							aria-hidden="true"
						/>
					</button>

					<div className="ml-3 flex items-center gap-1">
						<button
							type="button"
							className="safari-toolbar-btn"
							aria-label="Previous articles page"
							onClick={() => {
								setPageIndex((previous) => previous - 1);
							}}
							disabled={!canGoBack}
						>
							<ChevronLeft
								className="safari-toolbar-icon"
								aria-hidden="true"
							/>
						</button>
						<button
							type="button"
							className="safari-toolbar-btn"
							aria-label="Next articles page"
							onClick={() => {
								setPageIndex((previous) => previous + 1);
							}}
							disabled={!canGoForward}
						>
							<ChevronRight
								className="safari-toolbar-icon"
								aria-hidden="true"
							/>
						</button>
					</div>
				</div>

				<div className="safari-header-center">
					<form className="search" onSubmit={handleAddressSubmit}>
						<SearchIcon
							className="safari-toolbar-icon pointer-events-none"
							aria-hidden="true"
						/>
						<input
							ref={setAddressInputEl}
							type="text"
							placeholder="Search or enter website name"
							aria-label="Search or enter website name"
							className="flex-1"
							value={addressInput}
							onChange={(event) => {
								setAddressInput(event.target.value);
							}}
						/>
					</form>
				</div>

				<div className="safari-header-right">
					<button
						type="button"
						className="safari-toolbar-btn"
						aria-label="Share current page"
						onClick={() => {
							void handleShare();
						}}
					>
						<Share
							className="safari-toolbar-icon"
							aria-hidden="true"
						/>
					</button>
					<button
						type="button"
						className="safari-toolbar-btn"
						aria-label="Open new tab"
						onClick={() => {
							openExternalUrl('https://www.google.com');
						}}
					>
						<Plus
							className="safari-toolbar-icon"
							aria-hidden="true"
						/>
					</button>
				</div>
			</div>

			<div className="safari-content">
				<aside
					className={`safari-sidebar ${isBookmarksOpen ? 'safari-sidebar-open' : ''}`}
					aria-hidden={!isBookmarksOpen}
				>
					<div className="safari-sidebar-scroll">
						<div className="safari-sidebar-header">
							<p className="safari-sidebar-title">
								Bookmarks Sidebar
							</p>
						</div>
						{bookmarksByCategory.map(([category, bookmarks]) => (
							<div
								key={category}
								className="safari-bookmarks-group"
							>
								<p className="safari-bookmarks-heading">
									{category}
								</p>
								{bookmarks.map((bookmark) => (
									<button
										key={bookmark.id}
										type="button"
										className="safari-bookmark-item"
										tabIndex={isBookmarksOpen ? 0 : -1}
										onClick={() => {
											openExternalUrl(bookmark.url);
										}}
									>
										{bookmark.title}
									</button>
								))}
							</div>
						))}
					</div>
				</aside>

				<div className="blog">
					<h2>My Developer Blog</h2>
					<div className="space-y-8">
						{visiblePosts.map(
							({ id, image, title, date, link }) => (
								<div key={id} className="blog-post">
									<div className="col-span-2">
										<img src={image} alt={title} />
									</div>
									<div className="content">
										<p>{date}</p>
										<h3>{title}</h3>
										<a
											href={link}
											target="_blank"
											rel="noopener noreferrer"
										>
											Check out the full post{' '}
											<MoveRight className="icon-hover" />
										</a>
									</div>
								</div>
							),
						)}
					</div>
				</div>
			</div>
		</>
	);
};

const SafariWindow = WindowWrapper(Safari, 'safari');

export default SafariWindow;
