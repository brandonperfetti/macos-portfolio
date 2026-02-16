import { WindowControls } from '#components';
import { gallery, photosLinks } from '#constants';
import { WindowWrapper } from '#hoc';
import { useWindowStore } from '#store';
import { Mail, Search } from 'lucide-react';
import type { ReactElement } from 'react';

const Photos = (): ReactElement => {
	const { openWindow } = useWindowStore();

	return (
		<>
			<div className="window-header">
				<WindowControls target="photos" />

				<div className="flex w-full items-center justify-end gap-3 text-gray-500">
					<Mail className="icon" />
					<Search className="icon" />
				</div>
			</div>

			<div className="flex w-full">
				<div className="sidebar">
					<h2>Photos</h2>

					<ul>
						{photosLinks.map(({ id, icon, title }) => {
							return (
								<li key={id}>
									<img src={icon} alt={title} />
									<p>{title}</p>
								</li>
							);
						})}
					</ul>
				</div>

				<div className="gallery">
					<ul className="gallery-grid">
						{gallery.map(({ id, img }) => (
							<li key={id}>
								<button
									type="button"
									aria-label={`Open gallery image ${String(id)}`}
									onClick={() => {
										openWindow('imgfile', {
											id,
											name: 'Gallery image',
											icon: '/images/image.png',
											kind: 'file',
											fileType: 'img',
											imageUrl: img,
										});
									}}
								>
									<img
										src={img}
										alt={`Gallery image ${String(id)}`}
									/>
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

/** Finder-backed photos gallery window. */
const PhotosWindow = WindowWrapper(Photos, 'photos');

export default PhotosWindow;
