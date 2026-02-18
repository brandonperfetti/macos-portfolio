import { WindowControls } from '#components';
import { WindowWrapper } from '#hoc';
import { useContainerWidth } from '#hooks';
import { Document, Page } from '#lib/pdf';
import { Download } from 'lucide-react';
import type { ReactElement } from 'react';
import { useState } from 'react';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

/**
 * Resume window rendering a PDF preview with a download action.
 */
const Resume = (): ReactElement => {
	const [containerRef, pageWidth] = useContainerWidth(720);
	const [loadError, setLoadError] = useState<string | null>(null);
	const [numPages, setNumPages] = useState(1);

	return (
		<>
			<div className="window-header">
				<WindowControls target="resume" />
				<h2>Resume.pdf</h2>

				<a
					href="/files/resume.pdf"
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
					file="/files/resume.pdf"
					loading={<p>Loading resume…</p>}
					onLoadSuccess={({ numPages: loadedNumPages }) => {
						setLoadError(null);
						setNumPages(loadedNumPages);
					}}
					onLoadError={(error) => {
						setLoadError(
							error instanceof Error
								? error.message
								: 'Failed to load resume.',
						);
					}}
				>
					{Array.from({ length: numPages }, (_, index) => {
						const pageNumber = index + 1;
						return (
							<Page
								key={pageNumber}
								pageNumber={pageNumber}
								width={pageWidth}
								renderTextLayer
								renderAnnotationLayer
							/>
						);
					})}
				</Document>
			</div>
		</>
	);
};

const ResumeWindow = WindowWrapper(Resume, 'resume');
export default ResumeWindow;
