import type { SafariBookmark } from '#types';

/**
 * Groups Safari bookmarks by category in insertion order.
 */
export const groupBookmarksByCategory = (
	bookmarks: readonly SafariBookmark[],
): [string, SafariBookmark[]][] => {
	const grouped = new Map<string, SafariBookmark[]>();

	bookmarks.forEach((bookmark) => {
		const current = grouped.get(bookmark.category);
		if (current) {
			current.push(bookmark);
			return;
		}
		grouped.set(bookmark.category, [bookmark]);
	});

	return Array.from(grouped.entries());
};
