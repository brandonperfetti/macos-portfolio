import { WindowControls } from '#components';
import { WindowWrapper } from '#hoc';
import { useWindowStore, type WindowState } from '#store';
import { isFinderTextFile } from '#types';
import { useState, type ReactElement } from 'react';

/**
 * Generic text-file window used by Finder "txt" file entries.
 */
const Text = (): ReactElement | null => {
	const data = useWindowStore(
		(state: WindowState) => state.windows.txtfile.data,
	);
	const [failedImageSrc, setFailedImageSrc] = useState<string | null>(null);
	if (!isFinderTextFile(data)) return null;
	const imageSrc = data.image ?? null;
	const showImage = imageSrc !== null && failedImageSrc !== imageSrc;

	return (
		<>
			<div className="window-header">
				<WindowControls target="txtfile" />
				<h2>{data.name}</h2>
				<div className="window-header-spacer" aria-hidden="true" />
			</div>

			<div className="space-y-4 p-5">
				{showImage ? (
					<img
						src={imageSrc}
						alt={data.name}
						className="h-full w-full rounded-lg object-cover object-center"
						onError={() => {
							setFailedImageSrc(imageSrc);
						}}
					/>
				) : null}
				{data.subtitle ? (
					<p className="text-sm font-semibold text-neutral-700">
						{data.subtitle}
					</p>
				) : null}
				<div className="space-y-3">
					{data.description.map((paragraph, index) => (
						<p
							key={index}
							className="text-sm leading-6 text-neutral-800"
						>
							{paragraph}
						</p>
					))}
				</div>
			</div>
		</>
	);
};

/** Finder-backed text content window. */
const TextWindow = WindowWrapper(Text, 'txtfile');

export default TextWindow;
