import { MobileWindowHeader } from '#components/mobile/WindowHeader';
import { MobileWindowWrapper } from '#hoc';
import { useWindowStore, type WindowState } from '#store';
import { isFinderTextFile } from '#types';
import { useState, type ReactElement } from 'react';

const MobileText = (): ReactElement | null => {
	const data = useWindowStore(
		(state: WindowState) => state.windows.txtfile.data,
	);
	const [failedImageSrc, setFailedImageSrc] = useState<string | null>(null);
	if (!isFinderTextFile(data)) return null;
	const imageSrc = data.image ?? null;
	const showImage = imageSrc !== null && failedImageSrc !== imageSrc;

	return (
		<>
			<MobileWindowHeader windowKey="txtfile" title="Preview" />
			<div className="mobile-file-scroll">
				<div className="space-y-7 px-5 pt-6 pb-8">
					{showImage ? (
						<img
							src={imageSrc}
							alt={data.name}
							className="w-20 rounded-full"
							onError={() => {
								setFailedImageSrc(imageSrc);
							}}
						/>
					) : null}
					{data.subtitle ? (
						<p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
							{data.subtitle}
						</p>
					) : null}
					{data.description.map((text, index) => (
						<p
							key={`${text}-${String(index)}`}
							className="text-base leading-8 text-black dark:text-white"
						>
							{text}
						</p>
					))}
				</div>
			</div>
		</>
	);
};

const MobileTextWindow = MobileWindowWrapper(MobileText, 'txtfile');
export default MobileTextWindow;
