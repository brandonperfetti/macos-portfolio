// Use local type imports inside /types to avoid circular #types barrel resolution.
import type { WindowKey } from './windows';

// Shared shapes for constant-driven config data.

/** Allowed targets for top-nav links. */
type NavLinkTarget = Extract<WindowKey, 'finder' | 'contact' | 'resume'>;

/** Top-nav link entry. */
export interface NavLink {
	/** Stable numeric id. */
	id: number;
	/** Visible label. */
	name: string;
	/** Target window key. */
	type: NavLinkTarget;
}

/** Status/action icon entry for the top nav. */
export interface NavIcon {
	/** Stable numeric id. */
	id: number;
	/** Icon asset path. */
	img: string;
}

/** Base shape for dock apps. */
interface DockAppBase {
	/** App id or key. */
	id: string;
	/** App label. */
	name: string;
	/** Icon filename. */
	icon: string;
}

/** Dock app config with enforced WindowKey when openable. */
export type DockApp =
	| (DockAppBase & { id: WindowKey; canOpen: true })
	| (DockAppBase & { canOpen: false });

/** Blog/article card entry. */
export interface BlogPost {
	/** Stable numeric id. */
	id: number;
	/** Display date. */
	date: string;
	/** Article title. */
	title: string;
	/** Preview image path. */
	image: string;
	/** External link URL. */
	link: string;
}

/** Tech stack grouping entry. */
export interface TechStackCategory {
	/** Section label. */
	category: string;
	/** List of technologies. */
	items: string[];
}

/** Social link entry with an accent color. */
export interface SocialLink {
	/** Stable numeric id. */
	id: number;
	/** Display label. */
	text: string;
	/** Icon asset path. */
	icon: string;
	/** Accent background color. */
	bg: string;
	/** External link URL. */
	link: string;
}

/** Sidebar link entry for Photos window. */
export interface PhotosLink {
	/** Stable numeric id. */
	id: number;
	/** Icon asset path. */
	icon: string;
	/** Visible label. */
	title: string;
}

/** Gallery tile entry. */
export interface GalleryItem {
	/** Stable numeric id. */
	id: number;
	/** Image asset path. */
	img: string;
}
