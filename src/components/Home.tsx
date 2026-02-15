import { locations } from '#constants';
import { Draggable } from '#lib/gsap-draggable';
import { useLocationStore, useWindowStore } from '#store';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import type { ReactElement } from 'react';

const projects = locations.work.children;

export const Home = (): ReactElement => {
	const { setActiveLocation } = useLocationStore();
	const { openWindow } = useWindowStore();

	const handleOpenProjectFinder = (project: (typeof projects)[number]) => {
		setActiveLocation(project);
		openWindow('finder');
	};

	useGSAP(() => {
		const instances = Draggable.create('.folder');
		return () => {
			instances.forEach((instance) => {
				instance.kill();
			});
		};
	}, []);
	return (
		<>
			<section id="home">
				<ul>
					{projects.map((project) => (
						<li
							key={project.id}
							className={clsx(
								'group folder',
								project.windowPosition,
							)}
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
		</>
	);
};
