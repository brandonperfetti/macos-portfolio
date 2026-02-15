import { locations } from '#constants';
import { Draggable } from '#lib/gsap-draggable';
import { useLocationStore, useWindowStore } from '#store';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import type { ReactElement } from 'react';
import { useRef } from 'react';

const projects = locations.work.children;

/**
 * Desktop home surface for project folders.
 * Double-clicking a folder opens Finder focused on that project.
 */
export const Home = (): ReactElement => {
	const { setActiveLocation } = useLocationStore();
	const { openWindow } = useWindowStore();
	const containerRef = useRef<HTMLElement | null>(null);

	const handleOpenProjectFinder = (project: (typeof projects)[number]) => {
		// Select the target folder first, then open the Finder window shell.
		setActiveLocation(project);
		openWindow('finder');
	};

	useGSAP(() => {
		const container = containerRef.current;
		if (!container) return;

		// Scope draggable targets to Home to avoid global ".folder" collisions.
		const folders = container.querySelectorAll<HTMLElement>('.folder');
		const instances = Draggable.create(Array.from(folders));
		return () => {
			instances.forEach((instance) => {
				instance.kill();
			});
		};
	}, []);
	return (
		<section id="home" ref={containerRef}>
			<ul>
				{projects.map((project) => (
					<li
						key={project.id}
						className={clsx('group folder', project.windowPosition)}
						onDoubleClick={() => {
							handleOpenProjectFinder(project);
						}}
					>
						<img src="/images/folder.png" alt={project.name} />
						<p>{project.name}</p>
					</li>
				))}
			</ul>
		</section>
	);
};
