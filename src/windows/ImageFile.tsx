import { WindowControls } from '#components';
import { WindowWrapper } from '#hoc';
import { useWindowStore, type WindowState } from '#store';
import { isFinderImageFile } from '#types';
import { useEffect, useRef, useState, type ReactElement } from 'react';

const ImageFile = (): ReactElement | null => {
	const data = useWindowStore(
		(state: WindowState) => state.windows.imgfile.data,
	);
	const isImageFile = isFinderImageFile(data);
	const imageUrl = isImageFile ? data.imageUrl : null;
	const [failedSrc, setFailedSrc] = useState<string | null>(null);
	const [isRetrying, setIsRetrying] = useState(false);
	const isMountedRef = useRef(true);

	useEffect(() => {
		return () => {
			isMountedRef.current = false;
		};
	}, []);

	if (!isImageFile) return null;
	const hasFailed = failedSrc === imageUrl;

	return (
		<>
			<div className="window-header">
				<WindowControls target="imgfile" />
				<h2>{data.name}</h2>
				<div className="window-header-spacer" aria-hidden="true" />
			</div>
			<div className="preview">
				{hasFailed ? (
					<div className="flex h-64 flex-col items-center justify-center gap-3 rounded bg-neutral-100 p-6 text-center text-sm font-medium text-neutral-600">
						<p>Preview unavailable for {data.name}</p>
						<button
							type="button"
							className="rounded bg-neutral-700 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
							disabled={isRetrying}
							onClick={() => {
								setIsRetrying(true);
								const probe = new Image();
								probe.onload = () => {
									if (!isMountedRef.current) return;
									setFailedSrc(null);
									setIsRetrying(false);
								};
								probe.onerror = () => {
									if (!isMountedRef.current) return;
									setIsRetrying(false);
								};
								probe.src = data.imageUrl;
							}}
						>
							{isRetrying ? 'Retrying...' : 'Retry'}
						</button>
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

/** Finder-backed image-preview window. */
const ImageFileWindow = WindowWrapper(ImageFile, 'imgfile');

export default ImageFileWindow;
