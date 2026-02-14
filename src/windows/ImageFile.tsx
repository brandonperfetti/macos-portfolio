import { WindowControls } from '#components';
import { WindowWrapper } from '#hoc';
import { useWindowStore, type WindowState } from '#store';
import type { FinderImageFile } from '#types';
import type { ReactElement } from 'react';

const isFinderImageFile = (value: unknown): value is FinderImageFile => {
	if (!value || typeof value !== 'object') return false;

	const candidate = value as Partial<FinderImageFile>;
	return (
		candidate.kind === 'file' &&
		candidate.fileType === 'img' &&
		typeof candidate.name === 'string' &&
		typeof candidate.imageUrl === 'string'
	);
};

const ImageFile = (): ReactElement | null => {
	const data = useWindowStore(
		(state: WindowState) => state.windows.imgfile.data,
	);
	if (!isFinderImageFile(data)) return null;

	return (
		<>
			<div id="window-header">
				<WindowControls target="imgfile" />
				<h2>{data.name}</h2>
			</div>
			<div className="preview">
				<img src={data.imageUrl} alt={data.name} />
			</div>
		</>
	);
};

const ImageFileWindow = WindowWrapper(ImageFile, 'imgfile');

export default ImageFileWindow;
