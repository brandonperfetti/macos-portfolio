import type { FinderFile } from './finder';

/**
 * Base runtime guard for Finder file-like nodes.
 */
export const isFinderFile = (value: unknown): value is FinderFile => {
	if (!value || typeof value !== 'object') return false;

	const candidate = value as Partial<FinderFile>;
	return (
		candidate.kind === 'file' &&
		typeof candidate.fileType === 'string' &&
		typeof candidate.name === 'string'
	);
};
