import type { WindowKey } from '#types';

// Shared shapes for constant-driven config data.

type NavLinkTarget = Extract<WindowKey, 'finder' | 'contact' | 'resume'>;

export interface NavLink {
	id: number;
	name: string;
	type: NavLinkTarget;
}

export interface NavIcon {
	id: number;
	img: string;
}

interface DockAppBase {
	id: string;
	name: string;
	icon: string;
}

export type DockApp =
	| (DockAppBase & { id: WindowKey; canOpen: true })
	| (DockAppBase & { canOpen: false });

export interface BlogPost {
	id: number;
	date: string;
	title: string;
	image: string;
	link: string;
}

export interface TechStackCategory {
	category: string;
	items: string[];
}

export interface SocialLink {
	id: number;
	text: string;
	icon: string;
	bg: string;
	link: string;
}

export interface PhotosLink {
	id: number;
	icon: string;
	title: string;
}

export interface GalleryItem {
	id: number;
	img: string;
}
