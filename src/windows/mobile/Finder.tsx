import { MobileWindowHeader } from '#components/mobile/WindowHeader';
import { locations } from '#constants';
import { MobileWindowWrapper } from '#hoc';
import { useWindowStore } from '#store';
import type { FinderLocationFolder, FinderNode } from '#types';
import { ChevronRight } from 'lucide-react';
import { useState, type ReactElement } from 'react';

const rootFolders = Object.values(locations);

const MobileFinder = (): ReactElement => {
	const { closeWindow, openWindow } = useWindowStore();
	const [currentFolder, setCurrentFolder] =
		useState<FinderLocationFolder | null>(null);
	const [breadcrumb, setBreadcrumb] = useState<FinderLocationFolder[]>([]);

	const openFolder = (folder: FinderLocationFolder) => {
		setCurrentFolder(folder);
		setBreadcrumb((prev) => [...prev, folder]);
	};

	const handleBack = () => {
		if (breadcrumb.length === 0) {
			closeWindow('finder');
			return;
		}
		if (breadcrumb.length === 1) {
			setCurrentFolder(null);
			setBreadcrumb([]);
			return;
		}
		const next = breadcrumb.slice(0, -1);
		const previousFolder = next[next.length - 1] ?? null;
		setBreadcrumb(next);
		setCurrentFolder(previousFolder);
	};

	const openItem = (item: FinderNode) => {
		if (item.kind === 'folder') {
			openFolder(item);
			return;
		}

		switch (item.fileType) {
			case 'pdf':
				openWindow('resume');
				return;
			case 'fig':
			case 'url':
				if (!item.href) return;
				try {
					window.open(
						new URL(item.href).toString(),
						'_blank',
						'noopener,noreferrer',
					);
				} catch {
					console.warn(
						'Invalid URL in mobile finder item',
						item.href,
					);
				}
				return;
			case 'txt':
				openWindow('txtfile', item);
				return;
			case 'img':
				openWindow('imgfile', item);
				return;
			default:
				console.warn('Unhandled mobile finder item', item);
		}
	};

	const currentItems = currentFolder?.children ?? rootFolders;

	return (
		<>
			<MobileWindowHeader
				windowKey="finder"
				title={currentFolder?.name ?? 'Portfolio'}
				onBack={handleBack}
			/>
			{breadcrumb.length > 0 ? (
				<div className="breadcrumb">
					<button
						type="button"
						onClick={() => {
							setCurrentFolder(null);
							setBreadcrumb([]);
						}}
					>
						Portfolio
					</button>
					{breadcrumb.map((folder, index) => (
						<span
							key={`${String(folder.id)}-${String(index)}`}
							className="flex items-center"
						>
							<ChevronRight
								size={16}
								className="mx-1 text-gray-400"
							/>
							<button
								type="button"
								onClick={() => {
									const next = breadcrumb.slice(0, index + 1);
									setBreadcrumb(next);
									setCurrentFolder(
										next[next.length - 1] ?? null,
									);
								}}
							>
								{folder.name}
							</button>
						</span>
					))}
				</div>
			) : null}
			<div className="finder-gallery">
				<ul>
					{currentItems.map((item, index) => (
						<li key={`${String(item.id)}-${String(index)}`}>
							<button
								type="button"
								onClick={() => {
									openItem(item);
								}}
							>
								<div className="finder-item">
									{item.kind === 'folder' ? (
										<img
											src="/images/folder.png"
											alt="folder"
											className="folder-icon"
										/>
									) : (
										<img
											src={item.icon}
											alt={item.name}
											className="file-icon"
										/>
									)}
									<p className="item-name">{item.name}</p>
								</div>
							</button>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

const MobileFinderWindow = MobileWindowWrapper(MobileFinder, 'finder');
export default MobileFinderWindow;
