import { WindowControls } from '#components';
import { WindowWrapper } from '#hoc';
import { useWindowStore, type WindowState } from '#store';
import type { FinderTextFile } from '#types';
import type { ReactElement } from 'react';

const isFinderTextFile = (value: unknown): value is FinderTextFile => {
	if (!value || typeof value !== 'object') return false;

	const candidate = value as Partial<FinderTextFile>;
	return (
		candidate.kind === 'file' &&
		candidate.fileType === 'txt' &&
		typeof candidate.name === 'string' &&
		Array.isArray(candidate.description) &&
		candidate.description.every(
			(description) => typeof description === 'string',
		)
	);
};

/**
 * Generic text-file window used by Finder "txt" file entries.
 */
const Text = (): ReactElement | null => {
	const data = useWindowStore(
		(state: WindowState) => state.windows.txtfile.data,
	);
	if (!isFinderTextFile(data)) return null;

	return (
		<>
			<div id="window-header">
				<WindowControls target="txtfile" />
				<h2>{data.name}</h2>
				<div className="window-header-spacer" aria-hidden="true" />
			</div>

			<div className="space-y-4 p-5">
				{data.image ? (
					<img
						src={data.image}
						alt={data.name}
						className="h-full w-full rounded-lg object-cover object-center"
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

const TextWindow = WindowWrapper(Text, 'txtfile');

export default TextWindow;
