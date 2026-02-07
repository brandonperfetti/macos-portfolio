import { dockApps } from '#constants';
import { useWindowStore } from '#store';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { Tooltip } from 'react-tooltip';

type DockApp = (typeof dockApps)[number];

interface ToggleAppProps {
	app: Pick<DockApp, 'id' | 'canOpen'>;
}

interface AnimateIconsProps {
	mouseX: number;
}

/**
 * macOS-style dock with GSAP-driven magnification and window toggles.
 */
export const Dock = () => {
	const dockRef = useRef<HTMLDivElement>(null);
	const { openWindow, closeWindow, windows } = useWindowStore();
	const isWindowKey = (id: string): id is keyof typeof windows =>
		id in windows;

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
	const toggleApp = ({ app }: ToggleAppProps) => {
		if (!app.canOpen || !isWindowKey(app.id)) return;

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
				{dockApps.map(({ id, name, icon, canOpen }) => (
					<div
						key={id ?? name}
						className="relative flex justify-center"
					>
						<button
							type="button"
							className="dock-icon"
							aria-label={name}
							data-tooltip-id="dock-tooltip"
							data-tooltip-content={name}
							data-tooltip-delay-show={150}
							disabled={!canOpen}
							onClick={() => toggleApp({ app: { id, canOpen } })}
						>
							<img
								src={`/images/${icon}`}
								alt={name}
								loading="lazy"
								className={canOpen ? '' : 'opacity-60'}
							/>
						</button>
					</div>
				))}
				<Tooltip id="dock-tooltip" place="top" className="tooltip" />
			</div>
		</section>
	);
};
