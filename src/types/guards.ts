import type { FinderFile, FinderImageFile, FinderTextFile } from './finder';

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

/**
 * Runtime guard for Finder text files.
 */
export const isFinderTextFile = (value: unknown): value is FinderTextFile => {
	if (!isFinderFile(value) || value.fileType !== 'txt') return false;

	return (
		Array.isArray(value.description) &&
		value.description.every(
			(description) => typeof description === 'string',
		)
	);
};

/**
 * Runtime guard for Finder image files.
 */
export const isFinderImageFile = (value: unknown): value is FinderImageFile => {
	if (!isFinderFile(value) || value.fileType !== 'img') return false;
	return typeof value.imageUrl === 'string';
};
