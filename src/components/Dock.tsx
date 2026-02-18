import { dockApps, locations } from '#constants';
import { gsap } from '#lib';
import { useLocationStore, useWindowStore } from '#store';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import type { ReactElement } from 'react';
import { useRef } from 'react';
import { Tooltip } from 'react-tooltip';

type DockApp = (typeof dockApps)[number];

interface AnimateIconsProps {
	mouseX: number;
}

/**
 * macOS-style dock with GSAP-driven magnification and window toggles.
 */
export const Dock = (): ReactElement => {
	const dockRef = useRef<HTMLDivElement>(null);
	const { openWindow, closeWindow, windows } = useWindowStore();
	const { activeLocation, setActiveLocation } = useLocationStore();

	useGSAP(() => {
		const dock = dockRef.current;
		if (!dock) return;

		const iconEls = dock.querySelectorAll('.dock-icon');

		const animateIcons = ({ mouseX }: AnimateIconsProps) => {
			const { left } = dock.getBoundingClientRect();

			iconEls.forEach((el) => {
				if (!(el instanceof HTMLElement)) return;
				const { left: iconLeft, width } = el.getBoundingClientRect();
				const center = iconLeft - left + width / 2;
				const distance = Math.abs(mouseX - center);
				// Gaussian falloff keeps the dock scaling smooth near the cursor.
				const intensity = Math.exp(-(distance ** 2.75 / 20000));

				gsap.to(el, {
					scale: 1 + 0.25 * intensity,
					y: -15 * intensity,
					duration: 0.2,
					ease: 'power1.out',
				});
			});
		};

		const handleMouseMove = (e: MouseEvent) => {
			const { left } = dock.getBoundingClientRect();
			// Translate mouse X into dock-local coordinates.
			animateIcons({ mouseX: e.clientX - left });
		};

		const resetIcons = () => {
			iconEls.forEach((el) => {
				if (!(el instanceof HTMLElement)) return;
				gsap.to(el, {
					scale: 1,
					y: 0,
					duration: 0.3,
					ease: 'power2.out',
				});
			});
		};

		dock.addEventListener('mousemove', handleMouseMove);
		dock.addEventListener('mouseleave', resetIcons);

		return () => {
			dock.removeEventListener('mousemove', handleMouseMove);
			dock.removeEventListener('mouseleave', resetIcons);
		};
	}, []);

	/**
	 * Opens or closes a window if the dock app is allowed to open.
	 */
	// `DockApp` guarantees `WindowKey` when `canOpen` is true.
	const toggleApp = (app: DockApp) => {
		if (app.id === 'trash') {
			const isFinderOpen = windows.finder.isOpen;
			const isViewingTrash = activeLocation?.id === locations.trash.id;

			// Treat Trash as a contextual Finder toggle: close only when already viewing Trash.
			if (isFinderOpen && isViewingTrash) {
				closeWindow('finder');
				return;
			}

			setActiveLocation(locations.trash);
			openWindow('finder');
			return;
		}
		if (!app.canOpen) return;

		const win = windows[app.id];

		if (win.isOpen) {
			closeWindow(app.id);
		} else {
			openWindow(app.id);
		}
	};

	return (
		<section id="dock">
			<div ref={dockRef} className="dock-container">
				{dockApps.map((app) => {
					const isDisabled = !app.canOpen && app.id !== 'trash';

					return (
						<div
							key={app.id}
							className={clsx(
								'relative flex justify-center',
								!app.showOnMobile && 'max-sm:hidden',
							)}
						>
							<button
								type="button"
								className="dock-icon"
								aria-label={app.name}
								data-tooltip-id="dock-tooltip"
								data-tooltip-content={app.name}
								data-tooltip-delay-show={150}
								// Keep trash clickable even though its `canOpen` flag is false.
								disabled={isDisabled}
								onClick={() => {
									toggleApp(app);
								}}
							>
								<img
									src={`/images/${app.icon}`}
									alt={app.name}
									loading="lazy"
									className={isDisabled ? 'opacity-60' : ''}
								/>
							</button>
						</div>
					);
				})}
				<Tooltip id="dock-tooltip" place="top" className="tooltip" />
			</div>
		</section>
	);
};
