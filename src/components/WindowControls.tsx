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
		<div id="window-controls">
			<div
				className="close"
				onClick={() => {
					closeWindow(target);
				}}
			/>
			<div className="minimize" />
			<div className="maximize" />
		</div>
	);
};
