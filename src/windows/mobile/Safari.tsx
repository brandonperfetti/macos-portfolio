import { MobileWindowHeader } from '#components/mobile/WindowHeader';
import { blogPosts } from '#constants';
import { MobileWindowWrapper } from '#hoc';
import {
	BookOpen,
	ChevronLeft,
	ChevronRight,
	Copy,
	Mic,
	MoveRight,
	Search,
	Share,
} from 'lucide-react';
import type { ReactElement } from 'react';

const MobileSafari = (): ReactElement => {
	return (
		<>
			<MobileWindowHeader windowKey="safari" title="Safari" />
			<div className="blog">
				<h2>My Developer Blog</h2>
				<div className="space-y-8">
					{blogPosts.map(({ id, image, title, date, link }) => (
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
				<div className="search">
					<Search className="icon" aria-hidden="true" />
					<input
						type="text"
						placeholder="Search or enter website name"
						className="flex-1"
						aria-label="Search or enter website name"
					/>
					<Mic className="icon" aria-hidden="true" />
				</div>
				<div>
					<button
						type="button"
						className="mobile-safari-action icon text-gray-500"
						aria-label="Go back"
					>
						<ChevronLeft aria-hidden="true" />
					</button>
					<button
						type="button"
						className="mobile-safari-action icon text-gray-500"
						aria-label="Go forward"
					>
						<ChevronRight aria-hidden="true" />
					</button>
					<button
						type="button"
						className="mobile-safari-action icon text-blue-600"
						aria-label="Share page"
					>
						<Share aria-hidden="true" />
					</button>
					<button
						type="button"
						className="mobile-safari-action icon text-blue-600"
						aria-label="Open bookmarks"
					>
						<BookOpen aria-hidden="true" />
					</button>
					<button
						type="button"
						className="mobile-safari-action icon text-blue-600"
						aria-label="Copy page URL"
					>
						<Copy aria-hidden="true" />
					</button>
				</div>
			</footer>
		</>
	);
};

const MobileSafariWindow = MobileWindowWrapper(MobileSafari, 'safari');
export default MobileSafariWindow;
