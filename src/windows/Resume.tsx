import { WindowControls } from '#components';
import { WindowWrapper } from '#hoc';
import { Document, Page } from '#lib';
import { Download } from 'lucide-react';
import type { ReactElement } from 'react';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

/**
 * Resume window rendering a PDF preview with a download action.
 */
const Resume = (): ReactElement => {
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
			<Document file="files/resume.pdf">
				<Page pageNumber={1} renderTextLayer renderAnnotationLayer />
			</Document>
		</>
	);
};

const ResumeWindow = WindowWrapper(Resume, 'resume');
export default ResumeWindow;
