import { MobileWindowHeader } from '#components/mobile/WindowHeader';
import { blogPosts, safariBookmarks } from '#constants';
import { MobileWindowWrapper } from '#hoc';
import { resolveSafariAddressInput } from '#lib/safari-address';
import {
	BookOpen,
	ChevronLeft,
	ChevronRight,
	ChevronDown,
	Copy,
	Mic,
	MoveRight,
	Search,
	Share,
} from 'lucide-react';
import {
	useMemo,
	useState,
	type FormEvent,
	type ReactElement,
} from 'react';

const MOBILE_SAFARI_PAGE_SIZE = 2;

const MobileSafari = (): ReactElement => {
	const [addressInput, setAddressInput] = useState('');
	const [pageIndex, setPageIndex] = useState(0);
	const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

	const handleAddressSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const targetUrl = resolveSafariAddressInput(addressInput);
		if (!targetUrl) return;

		window.open(targetUrl, '_blank', 'noopener,noreferrer');
	};

	const totalPages = Math.max(
		1,
		Math.ceil(blogPosts.length / MOBILE_SAFARI_PAGE_SIZE),
	);
	const visiblePosts = useMemo(() => {
		const start = pageIndex * MOBILE_SAFARI_PAGE_SIZE;
		return blogPosts.slice(start, start + MOBILE_SAFARI_PAGE_SIZE);
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
			// Ignore clipboard failures.
		}
	};

	const toggleBookmarksMenu = (): void => {
		setIsBookmarksOpen((previous) => !previous);
	};

	return (
		<>
			<MobileWindowHeader windowKey="safari" title="Safari" />
			<div className="blog">
				<h2>My Developer Blog</h2>
				<div className="space-y-8">
					{visiblePosts.map(({ id, image, title, date, link }) => (
						<div key={id} className="blog-post">
							<div>
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
					))}
				</div>
			</div>
			<footer>
				<form className="search" onSubmit={handleAddressSubmit}>
					<Search className="mobile-safari-search-icon pointer-events-none" aria-hidden="true" />
					<input
						type="text"
						placeholder="Search or enter website name"
						className="flex-1"
						aria-label="Search or enter website name"
						value={addressInput}
						onChange={(event) => {
							setAddressInput(event.target.value);
						}}
					/>
					<Mic className="mobile-safari-search-icon" aria-hidden="true" />
				</form>
				<div className="mobile-safari-actions">
					<button
						type="button"
						className="mobile-safari-action"
						aria-label="Go back"
						disabled={!canGoBack}
						onClick={() => {
							if (!canGoBack) return;
							setPageIndex((previous) => previous - 1);
						}}
					>
						<ChevronLeft aria-hidden="true" />
					</button>
					<button
						type="button"
						className="mobile-safari-action"
						aria-label="Go forward"
						disabled={!canGoForward}
						onClick={() => {
							if (!canGoForward) return;
							setPageIndex((previous) => previous + 1);
						}}
					>
						<ChevronRight aria-hidden="true" />
					</button>
					<button
						type="button"
						className="mobile-safari-action"
						aria-label="Share page"
						onClick={() => {
							void handleShare();
						}}
					>
						<Share aria-hidden="true" />
					</button>
					<div className="mobile-safari-bookmarks">
						<button
							type="button"
							className="mobile-safari-action"
							aria-label="Open bookmarks"
							aria-expanded={isBookmarksOpen}
							onClick={toggleBookmarksMenu}
						>
							<BookOpen aria-hidden="true" />
						</button>
					</div>
					<button
						type="button"
						className="mobile-safari-action"
						aria-label="Open new tab"
						onClick={() => {
							openExternalUrl('https://www.google.com');
						}}
					>
						<Copy aria-hidden="true" />
					</button>
				</div>
			</footer>
			{isBookmarksOpen ? (
				<div className="mobile-safari-bookmarks-drawer" role="dialog" aria-label="Bookmarks">
					<button
						type="button"
						className="mobile-safari-bookmarks-backdrop"
						aria-label="Close bookmarks"
						onClick={() => {
							setIsBookmarksOpen(false);
						}}
					/>
					<div className="mobile-safari-bookmarks-sheet">
						<div className="mobile-safari-bookmarks-sheet-handle" aria-hidden="true" />
						<div className="mobile-safari-bookmarks-sheet-header">
							<h3>Bookmarks</h3>
							<button
								type="button"
								className="mobile-safari-sheet-close"
								aria-label="Close bookmarks"
								onClick={() => {
									setIsBookmarksOpen(false);
								}}
							>
								<ChevronDown aria-hidden="true" />
							</button>
						</div>
						<div className="mobile-safari-bookmarks-sheet-content">
							{bookmarksByCategory.map(([category, bookmarks]) => (
								<div key={category} className="safari-bookmarks-group">
									<p className="safari-bookmarks-heading">{category}</p>
									{bookmarks.map((bookmark) => (
										<button
											key={bookmark.id}
											type="button"
											className="safari-bookmark-item"
											onClick={() => {
												openExternalUrl(bookmark.url);
												setIsBookmarksOpen(false);
											}}
										>
											{bookmark.title}
										</button>
									))}
								</div>
							))}
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};

const MobileSafariWindow = MobileWindowWrapper(MobileSafari, 'safari');
export default MobileSafariWindow;
