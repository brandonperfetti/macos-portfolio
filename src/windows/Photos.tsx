import { WindowControls } from '#components';
import { locations } from '#constants';
import { WindowWrapper } from '#hoc';
import { useWindowStore, type WindowState } from '#store';
import { Mail, Search } from 'lucide-react';
import { useMemo, useState, type ReactElement } from 'react';

type PhotoItem = (typeof locations.photos.children)[number];

/** Photos gallery window showing a sidebar and clickable image grid. */
const Photos = (): ReactElement => {
	const openWindow = useWindowStore((state: WindowState) => state.openWindow);
	const photos = useMemo<PhotoItem[]>(() => [...locations.photos.children], []);
	const [activeCategory, setActiveCategory] = useState<string>('All');

	const categoryCounts = useMemo(() => {
		const counts = new Map<string, number>();
		counts.set('All', photos.length);

		photos.forEach((photo) => {
			const category = photo.category;
			counts.set(category, (counts.get(category) ?? 0) + 1);
		});

		const categoryList = [
			'All',
			...Array.from(counts.keys())
				.filter((category) => category !== 'All')
				.sort((a, b) => a.localeCompare(b)),
		];

		return categoryList.map((category, index) => ({
			id: index + 1,
			category,
			count: counts.get(category) ?? 0,
		}));
	}, [photos]);

	const filteredPhotos = useMemo(() => {
		const visiblePhotos =
			activeCategory === 'All'
				? photos
				: photos.filter((photo) => photo.category === activeCategory);

		return [...visiblePhotos].sort((a, b) =>
			a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
		);
	}, [activeCategory, photos]);

	return (
		<>
			<div className="window-header">
				<WindowControls target="photos" />
				<h2>Certifications</h2>

				<div className="window-header-actions gap-3 text-gray-500">
					<Mail className="icon" />
					<Search className="icon" />
				</div>
			</div>

			<div className="flex min-h-0 w-full flex-1 overflow-hidden">
				<div className="sidebar">
					<h2>Categories</h2>

					<ul>
						{categoryCounts.map(({ id, category, count }) => {
							const isActive = category === activeCategory;

							return (
								<li key={id}>
									<button
										type="button"
										className={
											isActive
												? 'photos-filter photos-filter-active'
												: 'photos-filter photos-filter-hover'
										}
										onClick={() => {
											setActiveCategory(category);
										}}
									>
										<span>{category}</span>
										<span className="photos-filter-count">{count}</span>
									</button>
								</li>
							);
						})}
					</ul>
				</div>

				<div className="gallery">
					<ul className="gallery-grid">
						{filteredPhotos.map((item) => {
							return (
								<li key={item.id}>
									<button
										type="button"
										aria-label={`Open gallery image ${item.name}`}
										onClick={() => {
											openWindow('imgfile', item);
										}}
									>
										<img src={item.imageUrl} alt={item.name} />
									</button>
									<p className="gallery-item-title">{item.name}</p>
									<p className="gallery-item-issuer">
										<a
											href={item.issuerUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="gallery-item-issuer-link"
										>
											{item.subtitle}
										</a>
									</p>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	);
};

/** Finder-backed photos gallery window. */
const PhotosWindow = WindowWrapper(Photos, 'photos');

export default PhotosWindow;
