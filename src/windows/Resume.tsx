import { WindowControls } from '#components';
import { WindowWrapper } from '#hoc';
import { Document, Page } from '#lib';
import { Download } from 'lucide-react';
import type { ReactElement } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

/**
 * Resume window rendering a PDF preview with a download action.
 */
const Resume = (): ReactElement => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [pageWidth, setPageWidth] = useState(720);
	const [loadError, setLoadError] = useState<string | null>(null);

	useLayoutEffect(() => {
		const updateWidth = () => {
			if (!containerRef.current) return;
			setPageWidth(containerRef.current.clientWidth);
		};

		updateWidth();
		window.addEventListener('resize', updateWidth);

		return () => {
			window.removeEventListener('resize', updateWidth);
		};
	}, []);

	return (
		<>
			<div id="window-header">
				<WindowControls target="resume" />
				<h2>Resume.pdf</h2>

				<a
					href="files/resume.pdf"
					download
					className="cursor-pointer"
					title="Download resume"
					aria-label="Download resume"
				>
					<Download className="icon" aria-hidden="true" />
				</a>
			</div>
			<div ref={containerRef}>
				{loadError ? <p role="alert">{loadError}</p> : null}
				<Document
					file="files/resume.pdf"
					loading={<p>Loading resume…</p>}
					onLoadSuccess={() => {
						setLoadError(null);
					}}
					onLoadError={(error) => {
						setLoadError(
							error instanceof Error
								? error.message
								: 'Failed to load resume.',
						);
					}}
				>
					<Page
						pageNumber={1}
						width={pageWidth}
						renderTextLayer
						renderAnnotationLayer
					/>
				</Document>
			</div>
		</>
	);
};

const ResumeWindow = WindowWrapper(Resume, 'resume');
export default ResumeWindow;
