// Finder file/folder discriminated unions.
export type FinderFileType = 'txt' | 'url' | 'img' | 'fig' | 'pdf';

export interface FinderBase {
	id: number;
	name: string;
	icon: string;
	position?: string;
}

export type FinderFolder = FinderBase & {
	kind: 'folder';
	windowPosition?: string;
	children: FinderNode[];
};

export type FinderTextFile = FinderBase & {
	kind: 'file';
	fileType: 'txt';
	description: string[];
	subtitle?: string;
	image?: string;
};

export type FinderUrlFile = FinderBase & {
	kind: 'file';
	fileType: 'url' | 'fig';
	href: string;
};

export type FinderImageFile = FinderBase & {
	kind: 'file';
	fileType: 'img';
	imageUrl: string;
};

export type FinderPdfFile = FinderBase & {
	kind: 'file';
	fileType: 'pdf';
	/**
	 * Optional because some PDFs are local/embedded or represent metadata-only entries.
	 * Consumers of FinderPdfFile should guard for undefined before using href.
	 */
	href?: string;
};

export type FinderFile =
	| FinderTextFile
	| FinderUrlFile
	| FinderImageFile
	| FinderPdfFile;

export type FinderNode = FinderFolder | FinderFile;

export type LocationType = 'work' | 'about' | 'resume' | 'trash';

export type FinderLocation = FinderFolder & {
	type: LocationType;
};

export type LocationsMap = Record<LocationType, FinderLocation>;
