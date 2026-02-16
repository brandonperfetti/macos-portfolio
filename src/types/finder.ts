// Finder file/folder discriminated unions.
/** Allowed file types for Finder entries. */
export type FinderFileType = 'txt' | 'url' | 'img' | 'fig' | 'pdf';

/** Base fields shared by all Finder entries. */
export interface FinderBase {
	/** Stable numeric id. */
	id: number;
	/** Display name. */
	name: string;
	/** Icon asset path. */
	icon: string;
	/** Optional icon position within a window. */
	position?: string;
}

/** Finder folder entry. */
export type FinderFolder = FinderBase & {
	/** Discriminator for folder entries. */
	kind: 'folder';
	/** Distinguishes root locations from nested folders. */
	scope: 'root' | 'nested';
	/** Optional position for the folder window itself. */
	windowPosition?: string;
	/** Child items contained within the folder. */
	children: FinderNode[];
};

/** Finder text file entry. */
export type FinderTextFile = FinderBase & {
	/** Discriminator for file entries. */
	kind: 'file';
	/** Text file type. */
	fileType: 'txt';
	/** Text content rendered in the viewer. */
	description: string[];
	/** Optional subtitle for the viewer. */
	subtitle?: string;
	/** Optional cover image for the viewer. */
	image?: string;
};

/** Finder URL or design file entry. */
export type FinderUrlFile = FinderBase & {
	/** Discriminator for file entries. */
	kind: 'file';
	/** URL-based file type ('url' or 'fig'). */
	fileType: 'url' | 'fig';
	/** External link URL. */
	href: string;
};

/** Finder image file entry. */
export type FinderImageFile = FinderBase & {
	/** Discriminator for file entries. */
	kind: 'file';
	/** Image file type. */
	fileType: 'img';
	/** Image asset path. */
	imageUrl: string;
};

/** Finder PDF file entry. */
export type FinderPdfFile = FinderBase & {
	/** Discriminator for file entries. */
	kind: 'file';
	/** PDF file type. */
	fileType: 'pdf';
	/**
	 * Optional because some PDFs are local/embedded or represent metadata-only entries.
	 * Consumers of FinderPdfFile should guard for undefined before using href.
	 */
	href?: string;
};

/** Union of all Finder file entry types. */
export type FinderFile =
	| FinderTextFile
	| FinderUrlFile
	| FinderImageFile
	| FinderPdfFile;

/** Union of all Finder nodes (folders or files). */
export type FinderNode = FinderFolder | FinderFile;

/** Supported Finder root locations. */
export type LocationType = 'work' | 'about' | 'resume' | 'photos' | 'trash';

/** Root Finder location with a typed location key. */
export type FinderLocation = FinderFolder & {
	/** Location key used in routing/navigation. */
	type: LocationType;
	/** Root locations only. */
	scope: 'root';
};

/** Finder folder type used in navigation (root or nested). */
export type FinderLocationFolder = FinderLocation | FinderFolder;

/** Map of location keys to Finder root nodes. */
export type LocationsMap = Record<LocationType, FinderLocation>;
