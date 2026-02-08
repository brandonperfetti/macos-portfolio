import { WindowControls } from '#components';
import { blogPosts } from '#constants';
import { WindowWrapper } from '#hoc';
import {
	ChevronLeft,
	ChevronRight,
	Copy,
	MoveRight,
	PanelLeft,
	Plus,
	SearchIcon,
	Share,
	ShieldHalf,
} from 'lucide-react';
import type { ReactElement } from 'react';

/**
 * Safari-like window that previews blog posts and navigation controls.
 */
const Safari = (): ReactElement => {
	return (
		<>
			<div id="window-header">
				<WindowControls target="safari" />

				{/* TODO: Toolbar actions are decorative for now; wire buttons later. */}
				<PanelLeft className="icon ml-10" aria-hidden="true" />

				<div className="ml-5 flex items-center gap-1">
					<ChevronLeft className="icon" aria-hidden="true" />
					<ChevronRight className="icon" aria-hidden="true" />
				</div>

				<div className="flex-center flex-1 gap-3">
					<ShieldHalf className="icon" aria-hidden="true" />
					<div className="search">
						<SearchIcon className="icon" aria-hidden="true" />
						<input
							type="text"
							placeholder="Search or enter website name"
							aria-label="Search or enter website name"
							className="flex-1"
						/>
					</div>
				</div>

				<div className="flex items-center gap-5">
					<Share className="icon" aria-hidden="true" />
					<Plus className="icon" aria-hidden="true" />
					<Copy className="icon" aria-hidden="true" />
				</div>
			</div>

			<div className="blog">
				<h2>My Developer Blog</h2>
				<div className="space-y-8">
					{blogPosts.map(({ id, image, title, date, link }) => (
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
					))}
				</div>
			</div>
		</>
	);
};

const SafariWindow = WindowWrapper(Safari, 'safari');

export default SafariWindow;
