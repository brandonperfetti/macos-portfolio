import { homeItems } from '#constants';
import { Draggable } from '#lib/gsap-draggable';
import { useLocationStore, useWindowStore } from '#store';
import type { FinderNode } from '#types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { useEffect, useRef, useState, type ReactElement } from 'react';

/**
 * Desktop home surface for project folders.
 * Double-clicking a folder opens Finder focused on that project.
 */
export const Home = (): ReactElement => {
	const { setActiveLocation } = useLocationStore();
	const { openWindow } = useWindowStore();
	const containerRef = useRef<HTMLElement | null>(null);
	const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

	const openItem = (item: FinderNode) => {
		if (item.kind === 'folder') {
			// Select the target folder first, then open the Finder window shell.
			setActiveLocation(item);
			openWindow('finder');
			return;
		}

		switch (item.fileType) {
			case 'pdf':
				openWindow('resume');
				return;
			case 'fig':
			case 'url': {
				if (!item.href) return;

				try {
					const safeUrl = new URL(item.href).toString();
					window.open(safeUrl, '_blank', 'noopener,noreferrer');
				} catch {
					console.warn('Invalid home item URL', item);
				}
				return;
			}
			case 'txt':
				openWindow('txtfile', item);
				return;
			case 'img':
				openWindow('imgfile', item);
				return;
			default:
				console.warn('Unhandled home item type', item);
		}
	};

	useGSAP(() => {
		const container = containerRef.current;
		if (!container) return;

		// Scope draggable targets to Home to avoid global selector collisions.
		const items = container.querySelectorAll<HTMLElement>('.home-item');
		const instances = Draggable.create(Array.from(items));
		return () => {
			instances.forEach((instance) => {
				instance.kill();
			});
		};
	}, []);

	useEffect(() => {
		const handlePointerDown = (event: PointerEvent) => {
			const target = event.target as HTMLElement | null;
			if (target?.closest('.home-item')) return;
			setSelectedItemId(null);
		};

		document.addEventListener('pointerdown', handlePointerDown);
		return () => {
			document.removeEventListener('pointerdown', handlePointerDown);
		};
	}, []);

	return (
		<section id="home" ref={containerRef}>
			<ul>
				{homeItems.map((item, index) => (
					<li
						key={`${item.kind}-${String(item.id)}-${String(index)}`}
						className={clsx(
							'group home-item',
							selectedItemId === item.id && 'home-item-selected',
							item.kind === 'folder'
								? (item.windowPosition ?? item.position)
								: item.position,
						)}
						onClick={() => {
							setSelectedItemId(item.id);
						}}
						onDoubleClick={() => {
							openItem(item);
						}}
					>
						<img src={item.icon} alt={item.name} />
						<p>{item.name}</p>
					</li>
				))}
			</ul>
		</section>
	);
};
