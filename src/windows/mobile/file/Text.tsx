import { MobileWindowHeader } from '#components/mobile/WindowHeader';
import { MobileWindowWrapper } from '#hoc';
import { useWindowStore, type WindowState } from '#store';
import { isFinderTextFile } from '#types';
import type { ReactElement } from 'react';

const MobileText = (): ReactElement | null => {
	const data = useWindowStore(
		(state: WindowState) => state.windows.txtfile.data,
	);
	if (!isFinderTextFile(data)) return null;

	return (
		<>
			<MobileWindowHeader windowKey="txtfile" title="Preview" />
			<div className="mobile-file-scroll">
				<div className="space-y-7 px-5 pt-6 pb-8">
					{data.image ? (
						<img
							src={data.image}
							alt={data.name}
							className="w-20 rounded-full"
						/>
					) : null}
					{data.subtitle ? (
						<h1 className="font-bold text-black dark:text-white">
							{data.subtitle}
						</h1>
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
