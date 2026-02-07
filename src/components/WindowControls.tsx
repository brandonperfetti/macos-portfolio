import type { WindowKey } from '#store';
import { useWindowStore } from '#store';
import type { ReactElement } from 'react';

interface WindowControlsProps {
	target: WindowKey;
}

export const WindowControls = ({
	target,
}: WindowControlsProps): ReactElement => {
	const { closeWindow } = useWindowStore();
	return (
		<div className="window-controls">
			<button
				type="button"
				className="close"
				aria-label="Close window"
				onClick={() => {
					closeWindow(target);
				}}
			/>
			<button
				type="button"
				className="minimize"
				aria-label="Minimize window"
				aria-disabled="true"
				// TODO: Wire minimize behavior.
			/>
			<button
				type="button"
				className="maximize"
				aria-label="Maximize window"
				aria-disabled="true"
				// TODO: Wire maximize behavior.
			/>
		</div>
	);
};
