import { MobileWindowHeader } from '#components/mobile/WindowHeader';
import { locations } from '#constants';
import { MobileWindowWrapper } from '#hoc';
import { useWindowStore } from '#store';
import { useMemo, type ReactElement } from 'react';

const MobilePhotos = (): ReactElement => {
	const { openWindow } = useWindowStore();
	const photos = useMemo(
		() =>
			[...locations.photos.children].sort((a, b) =>
				a.name.localeCompare(b.name, undefined, {
					sensitivity: 'base',
				}),
			),
		[],
	);

	return (
		<>
			<MobileWindowHeader windowKey="photos" title="Certifications" />
			<div className="gallery">
				<ul>
					{photos.map((imageFile) => {
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
										alt={imageFile.name}
										loading="lazy"
										decoding="async"
									/>
								</button>
								<p className="gallery-item-title">
									{imageFile.name}
								</p>
								<p className="gallery-item-issuer">
									<a
										href={imageFile.issuerUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="gallery-item-issuer-link"
									>
										{imageFile.subtitle}
									</a>
								</p>
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
