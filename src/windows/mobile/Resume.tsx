import { MobileWindowHeader } from '#components/mobile/WindowHeader';
import { MobileWindowWrapper } from '#hoc';
import { useContainerWidth } from '#hooks';
import { Document, Page } from '#lib/pdf';
import { useState, type ReactElement } from 'react';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

/**
 * Mobile resume window content that renders the resume PDF preview.
 * @returns {ReactElement}
 */
const MobileResume = (): ReactElement => {
	const [containerRef, containerWidth] = useContainerWidth();
	const [resumeLoadError, setResumeLoadError] = useState<string | null>(null);
	const [resumeNumPages, setResumeNumPages] = useState(1);
	const [resumeRetryCount, setResumeRetryCount] = useState(0);

	const handleRetryLoad = () => {
		setResumeLoadError(null);
		setResumeRetryCount((prev) => prev + 1);
	};

	return (
		<>
			<MobileWindowHeader windowKey="resume" title="Resume" />
			<div className="mobile-file-scroll">
				<div ref={containerRef} className="w-full px-3 pb-6">
					{resumeLoadError ? (
						<div className="flex items-center justify-between gap-3">
							<p role="alert">{resumeLoadError}</p>
							<button
								type="button"
								className="cursor-pointer text-sm text-blue-600 hover:underline"
								onClick={handleRetryLoad}
							>
								Retry
							</button>
						</div>
					) : (
						<Document
							className="resume-pdf"
							file={`/files/resume.pdf?retry=${String(resumeRetryCount)}`}
							loading={<p>Loading resume…</p>}
							onLoadSuccess={({ numPages }) => {
								setResumeLoadError(null);
								setResumeNumPages(numPages);
							}}
							onLoadError={(error) => {
								if (import.meta.env.DEV) {
									console.error(
										'Failed to load mobile resume PDF:',
										error,
									);
								}
								setResumeLoadError(
									error instanceof Error
										? error.message
										: 'Failed to load resume.',
								);
							}}
						>
							{Array.from(
								{ length: resumeNumPages },
								(_, index) => {
									const pageNumber = index + 1;
									return (
										<Page
											key={pageNumber}
											pageNumber={pageNumber}
											width={containerWidth || undefined}
											renderTextLayer
											renderAnnotationLayer
										/>
									);
								},
							)}
						</Document>
					)}
				</div>
			</div>
		</>
	);
};

/** Mobile window wrapper for the resume view; exported as the default mobile resume window component. */
const MobileResumeWindow = MobileWindowWrapper(MobileResume, 'resume');
export default MobileResumeWindow;
