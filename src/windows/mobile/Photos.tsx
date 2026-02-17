import { MobileWindowHeader } from '#components/mobile/WindowHeader';
import { locations } from '#constants';
import { MobileWindowWrapper } from '#hoc';
import { useWindowStore } from '#store';
import type { ReactElement } from 'react';

const MobilePhotos = (): ReactElement => {
	const { openWindow } = useWindowStore();
	const photos = locations.photos.children;

	return (
		<>
			<MobileWindowHeader windowKey="photos" title="All Photos" />
			<div className="gallery">
				<ul>
					{photos.map((item) => (
						<li key={item.id}>
							<button
								type="button"
								onClick={() => {
									openWindow('imgfile', item);
								}}
							>
								<img
									src={item.imageUrl}
									alt={
										item.name ||
										`Gallery image ${String(item.id)}`
									}
								/>
							</button>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

const MobilePhotosWindow = MobileWindowWrapper(MobilePhotos, 'photos');
export default MobilePhotosWindow;
