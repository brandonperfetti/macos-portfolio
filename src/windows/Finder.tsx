import { WindowControls } from '#components';
import { locations } from '#constants';
import { WindowWrapper } from '#hoc';
import { useLocationStore, useWindowStore } from '#store';
import type { FinderImageFile, FinderLocationFolder, FinderNode } from '#types';
import clsx from 'clsx';
import { Search } from 'lucide-react';
import type { ReactElement } from 'react';

/**
 * Finder window for browsing locations and opening file entries.
 */
const Finder = (): ReactElement => {
	const { openWindow } = useWindowStore();
	const { activeLocation, setActiveLocation } = useLocationStore();
	const currentLocation = activeLocation ?? locations.work;
	const isPhotosLocation = currentLocation.id === locations.photos.id;

	const photos = currentLocation.children.filter(
		(item): item is FinderImageFile =>
			item.kind === 'file' && item.fileType === 'img',
	);

	const openItem = (item: FinderNode) => {
		if (item.kind === 'folder') {
			setActiveLocation(item);
			return;
		}
		switch (item.fileType) {
			case 'pdf':
				openWindow('resume');
				return;
			case 'fig':
			case 'url':
				window.open(item.href, '_blank', 'noopener,noreferrer');
				return;
			case 'txt':
				openWindow('txtfile', item);
				return;
			case 'img':
				openWindow('imgfile', item);
				return;
			default: {
				// Warn if a new fileType is added without handling.
				console.warn('Unhandled file type', item);
			}
		}
	};

	const renderList = (name: string, items: FinderNode[]) => (
		<div>
			<h3>{name}</h3>
			<ul>
				{items
					.filter(
						(item): item is FinderLocationFolder =>
							item.kind === 'folder',
					)
					.map((item) => (
						<li
							key={item.id}
							className={clsx(
								item === activeLocation
									? 'active'
									: 'not-active',
							)}
						>
							<button
								type="button"
								className="flex w-full cursor-pointer items-center gap-2"
								onClick={() => {
									setActiveLocation(item);
								}}
							>
								<img
									src={item.icon}
									alt={item.name}
									className="w-4"
								/>
								<p className="truncate text-sm font-medium">
									{item.name}
								</p>
							</button>
						</li>
					))}
			</ul>
		</div>
	);
	return (
		<>
			<div className="window-header">
				<WindowControls target="finder" />
				<Search className="icon" aria-hidden="true" />
			</div>

			<div className="flex h-full bg-white">
				<div className="sidebar">
					{renderList('Favorites', Object.values(locations))}
					{renderList('Projects', locations.work.children)}
				</div>
				{isPhotosLocation ? (
					<div className="photos-view">
						<ul className="photos-gallery gallery-grid">
							{photos.map((item) => (
								<li key={item.id}>
									<button
										type="button"
										onClick={() => {
											openItem(item);
										}}
									>
										<img
											src={item.imageUrl}
											alt={item.name}
										/>
									</button>
								</li>
							))}
						</ul>
					</div>
				) : (
					<ul className="content">
						{currentLocation.children.map((item) => (
							<li key={item.id} className={item.position}>
								<button
									type="button"
									className="flex flex-col items-center gap-2"
									onClick={() => {
										openItem(item);
									}}
								>
									<img src={item.icon} alt={item.name} />
									<p className="truncate text-sm font-medium">
										{item.name}
									</p>
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
};

const FinderWindow = WindowWrapper(Finder, 'finder');

export default FinderWindow;
