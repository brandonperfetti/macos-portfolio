import { dockApps } from '#constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { Tooltip } from 'react-tooltip';

interface AppProps {
	name: string;
	icon: string;
	id?: string;
	canOpen: boolean;
}

interface ToggleAppProps {
	app: Pick<AppProps, 'id' | 'canOpen'>;
}

interface AnimateIconsProps {
	mouseX: number;
}

export const Dock = () => {
	const dockRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const dock = dockRef.current;
		if (!dock) return;

		const iconEls = dock.querySelectorAll('.dock-icon');

		const { left } = dock.getBoundingClientRect();
		const animateIcons = ({ mouseX }: AnimateIconsProps) => {
			iconEls.forEach((el) => {
				if (!(el instanceof HTMLElement)) return;
				const { left: iconLeft, width } = el.getBoundingClientRect();
				const center = iconLeft - left + width / 2;
				const distance = Math.abs(mouseX - center);
				const intensity = Math.exp(-(distance ** 2.75 / 20000)); // Gaussian falloff

				gsap.to(el, {
					scale: 1 + 0.25 * intensity,
					y: -15 * intensity,
					duration: 0.2,
					ease: 'power1.out',
				});
			});
		};
		const handleMouseMove = (e: MouseEvent) => {
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

	const toggleApp = ({ app }: ToggleAppProps) => {
		// TODO: Implement open window logic
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
