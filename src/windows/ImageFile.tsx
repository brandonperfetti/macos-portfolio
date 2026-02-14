import { WindowControls } from '#components';
import { WindowWrapper } from '#hoc';
import { useWindowStore, type WindowState } from '#store';
import type { FinderImageFile } from '#types';
import { useState, type ReactElement } from 'react';

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
	const isImageFile = isFinderImageFile(data);
	const imageUrl = isImageFile ? data.imageUrl : null;
	const [failedSrc, setFailedSrc] = useState<string | null>(null);

	if (!isImageFile) return null;
	const hasFailed = failedSrc === imageUrl;

	return (
		<>
			<div id="window-header">
				<WindowControls target="imgfile" />
				<h2>{data.name}</h2>
			</div>
			<div className="preview">
				{hasFailed ? (
					<div className="flex h-64 items-center justify-center rounded bg-neutral-100 p-6 text-center text-sm font-medium text-neutral-600">
						Preview unavailable for {data.name}
					</div>
				) : (
					<img
						src={data.imageUrl}
						alt={`Preview of ${data.name}`}
						onError={() => {
							setFailedSrc(data.imageUrl);
						}}
					/>
				)}
			</div>
		</>
	);
};

const ImageFileWindow = WindowWrapper(ImageFile, 'imgfile');

export default ImageFileWindow;
