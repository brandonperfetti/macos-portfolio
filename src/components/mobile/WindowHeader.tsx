import { useWindowStore } from '#store';
import type { WindowKey } from '#types';
import clsx from 'clsx';
import { ChevronLeft } from 'lucide-react';
import type { ReactElement } from 'react';

interface MobileWindowHeaderProps {
	windowKey: WindowKey;
	title: string;
	onBack?: () => void;
	className?: string;
}

export const MobileWindowHeader = ({
	windowKey,
	title,
	onBack,
	className,
}: MobileWindowHeaderProps): ReactElement => {
	const { closeWindow } = useWindowStore();

	const handleBack = () => {
		if (onBack) {
			onBack();
			return;
		}
		closeWindow(windowKey);
	};

	return (
		<div className={clsx('mobile-window-header', className)}>
			<button
				type="button"
				className="mobile-header-back"
				onClick={handleBack}
			>
				<ChevronLeft className="mobile-back-icon" aria-hidden="true" />
				<span>Go Back</span>
			</button>
			<p className="mobile-header-title">{title}</p>
		</div>
	);
};
