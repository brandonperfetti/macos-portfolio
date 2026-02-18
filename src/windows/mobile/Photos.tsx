import { MobileWindowHeader } from '#components/mobile/WindowHeader';
import { locations } from '#constants';
import { MobileWindowWrapper } from '#hoc';
import { useWindowStore } from '#store';
import { isFinderImageFile, type FinderImageFile } from '#types';
import type { ReactElement } from 'react';

const MobilePhotos = (): ReactElement => {
	const { openWindow } = useWindowStore();
	const photos = locations.photos.children;

	return (
		<>
			<MobileWindowHeader windowKey="photos" title="All Photos" />
			<div className="gallery">
				<ul>
					{photos.map((item) => {
						if (!isFinderImageFile(item)) return null;
						const imageFile: FinderImageFile = item;

						return (
							<li key={imageFile.id}>
								<button
									type="button"
									onClick={() => {
										openWindow('imgfile', imageFile);
									}}
								>
									<img
										src={imageFile.imageUrl}
										alt={
											imageFile.name ||
											`Gallery image ${String(imageFile.id)}`
										}
									/>
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
};

const MobilePhotosWindow = MobileWindowWrapper(MobilePhotos, 'photos');
export default MobilePhotosWindow;
