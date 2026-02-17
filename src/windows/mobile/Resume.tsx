import { MobileWindowHeader } from '#components/mobile/WindowHeader';
import { MobileWindowWrapper } from '#hoc';
import { Document, Page } from '#lib';
import { useLayoutEffect, useRef, useState, type ReactElement } from 'react';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const MobileResume = (): ReactElement => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState(0);

	useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const syncWidth = () => {
			setContainerWidth(container.offsetWidth);
		};

		syncWidth();

		const observer = new ResizeObserver(syncWidth);
		observer.observe(container);

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<>
			<MobileWindowHeader windowKey="resume" title="Resume" />
			<div className="mobile-file-scroll">
				<div ref={containerRef} className="w-full px-3 pb-6">
					<Document className="resume-pdf" file="/files/resume.pdf">
						<Page
							pageNumber={1}
							width={containerWidth || undefined}
							renderTextLayer
							renderAnnotationLayer
						/>
					</Document>
				</div>
			</div>
		</>
	);
};

const MobileResumeWindow = MobileWindowWrapper(MobileResume, 'resume');
export default MobileResumeWindow;
