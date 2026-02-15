import { Document, Page, pdfjs } from 'react-pdf';

const cdnWorkerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const localWorkerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.mjs',
	import.meta.url,
).toString();

// Prefer CDN worker for hosted deployments; fall back to bundled worker if CDN fetch fails.
pdfjs.GlobalWorkerOptions.workerSrc = cdnWorkerSrc;
if (typeof window !== 'undefined') {
	void fetch(cdnWorkerSrc, { method: 'HEAD' }).catch(() => {
		pdfjs.GlobalWorkerOptions.workerSrc = localWorkerSrc;
	});
}

export { Document, Page, pdfjs };
