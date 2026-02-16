import { Document, Page, pdfjs } from 'react-pdf';

const cdnWorkerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const localWorkerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.mjs',
	import.meta.url,
).toString();

// Start with the bundled worker so PDF rendering works immediately.
// Upgrade to CDN asynchronously when the worker URL is confirmed reachable.
pdfjs.GlobalWorkerOptions.workerSrc = localWorkerSrc;
if (typeof window !== 'undefined') {
	void fetch(cdnWorkerSrc, { method: 'HEAD' })
		.then((res) => {
			if (res.ok) {
				pdfjs.GlobalWorkerOptions.workerSrc = cdnWorkerSrc;
			}
		})
		.catch(() => {
			// CDN unreachable; keep local worker.
		});
}

export { Document, Page, pdfjs };
