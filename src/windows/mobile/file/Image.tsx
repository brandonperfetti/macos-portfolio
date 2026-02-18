import { MobileWindowHeader } from '#components/mobile/WindowHeader';
import { MobileWindowWrapper } from '#hoc';
import { useWindowStore, type WindowState } from '#store';
import { isFinderImageFile } from '#types';
import type { ReactElement } from 'react';

const MobileImage = (): ReactElement | null => {
	const data = useWindowStore(
		(state: WindowState) => state.windows.imgfile.data,
	);
	if (!isFinderImageFile(data)) return null;

	return (
		<>
			<MobileWindowHeader windowKey="imgfile" title="Preview" />
			<div className="mobile-file-scroll">
				<div className="preview">
					<img src={data.imageUrl} alt={data.name} />
				</div>
			</div>
		</>
	);
};

const MobileImageWindow = MobileWindowWrapper(MobileImage, 'imgfile');
export default MobileImageWindow;
