import { WindowControls } from '#components';
import { locations } from '#constants';
import { WindowWrapper } from '#hoc';
import { useLocationStore, useWindowStore } from '#store';
import type { FinderLocationFolder, FinderNode } from '#types';
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

	const openItem = (item: FinderNode) => {
		if (item.kind === 'folder') {
			setActiveLocation(item);
			return;
		}
		if (item.fileType === 'pdf') {
			openWindow('resume');
			return;
		}
		if ('href' in item && ['fig', 'url'].includes(item.fileType)) {
			window.open(item.href, '_blank');
			return;
		}

		if (item.fileType === 'txt') {
			openWindow('txtfile', item);
			return;
		}
		if (item.fileType === 'img') {
			openWindow('imgfile', item);
		}
	};

	const renderList = (name: string, items: FinderLocationFolder[]) => (
		<div>
			<h3>{name}</h3>
			<ul>
				{items.map((item) => (
					<li
						key={item.id}
						className={clsx(
							item.id === activeLocation?.id
								? 'active'
								: 'not-active',
						)}
					>
						<button
							type="button"
							className="flex w-full items-center gap-2"
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
			<div id="window-header">
				<WindowControls target="finder" />
				<Search className="icon" aria-hidden="true" />
			</div>

			<div className="flex h-full bg-white">
				<div className="sidebar">
					{renderList('Favorites', Object.values(locations))}
					{renderList('Projects', locations.work.children)}
				</div>
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
			</div>
		</>
	);
};

const FinderWindow = WindowWrapper(Finder, 'finder');

export default FinderWindow;
