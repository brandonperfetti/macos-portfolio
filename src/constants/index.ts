import type {
	BlogPost,
	DockApp,
	FinderNode,
	FinderLocation,
	GalleryItem,
	LocationType,
	LocationsMap,
	NavIcon,
	NavLink,
	SafariBookmark,
	SocialLink,
	TechStackCategory,
	WindowConfig,
} from '#types';

/**
 * Top-nav link labels and their window targets.
 */
const navLinks = [
	{
		id: 1,
		name: 'Projects',
		type: 'finder',
	},
	{
		id: 3,
		name: 'Contact',
		type: 'contact',
	},
	{
		id: 4,
		name: 'Resume',
		type: 'resume',
	},
] satisfies NavLink[];

/**
 * Status/action icons shown in the top nav.
 */
const navIcons = [
	{
		id: 1,
		type: 'status',
		img: '/icons/wifi.svg',
	},
	{
		id: 2,
		type: 'status',
		img: '/icons/search.svg',
	},
	{
		id: 3,
		type: 'status',
		img: '/icons/user.svg',
	},
	{
		id: 4,
		type: 'theme',
		img: '/icons/mode.svg',
	},
] satisfies NavIcon[];

/**
 * Dock icon config. `id` must map to a window key when `canOpen` is true.
 */
const dockApps = [
	{
		id: 'finder',
		name: 'Portfolio', // was "Finder"
		icon: 'finder.png',
		canOpen: true,
		showOnMobile: true,
	},
	{
		id: 'safari',
		name: 'Articles', // was "Safari"
		icon: 'safari.png',
		canOpen: true,
		showOnMobile: true,
	},
	{
		id: 'photos',
		name: 'Gallery', // was "Photos"
		icon: 'photos.png',
		canOpen: true,
		showOnMobile: true,
	},
	{
		id: 'contact',
		name: 'Contact', // or "Get in touch"
		icon: 'contact.png',
		canOpen: true,
		showOnMobile: true,
	},
	{
		id: 'terminal',
		name: 'Skills', // was "Terminal"
		icon: 'terminal.png',
		canOpen: true,
		showOnMobile: false,
	},
	{
		id: 'trash',
		name: 'Archive', // was "Trash"
		icon: 'trash.png',
		canOpen: false,
		showOnMobile: false,
	},
] satisfies DockApp[];

/**
 * Article cards shown in the Safari/Articles window.
 */
const blogPosts = [
	{
		id: 1,
		date: 'Feb 28, 2026',
		title: 'pgvector + PostgreSQL: Production-Ready Semantic Search Without a Vector DB',
		image: 'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1772210712/bp-portfolio/images/articles/pgvector-postgresql-production-ready-semantic-search-without-a-vector-db/cover-A.png',
		link: 'https://brandonperfetti.com/articles/pgvector-postgresql-production-ready-semantic-search-without-a-vector-db',
	},
	{
		id: 2,
		date: 'Nov 10, 2025',
		title: 'Building a CLI Tool in Node.js: From Script to Publishable Package',
		image: 'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1773360598/bp-portfolio/images/articles/building-a-cli-tool-in-node-js-from-script-to-publishable-package/cover-A.png',
		link: 'https://brandonperfetti.com/articles/building-a-cli-tool-in-node-js-from-script-to-publishable-package',
	},
	{
		id: 3,
		date: 'May 6, 2024',
		title: 'Prisma + PostgreSQL: The Data Layer Setup I Use on Every Project',
		image: 'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1771890378/bp-portfolio/images/articles/prisma-postgresql-the-data-layer-setup-i-use-on-every-project/cover-B.png',
		link: 'https://brandonperfetti.com/articles/prisma-postgresql-the-data-layer-setup-i-use-on-every-project',
	},
	{
		id: 4,
		date: 'Oct 9, 2023',
		title: 'GSAP ScrollTrigger in React: The Patterns That Actually Work',
		image: 'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1773238896/bp-portfolio/images/articles/gsap-scrolltrigger-in-react-the-patterns-that-actually-work/cover-B-sop.png',
		link: 'https://brandonperfetti.com/articles/gsap-scrolltrigger-in-react-the-patterns-that-actually-work',
	},
	{
		id: 5,
		date: 'Jul 3, 2023',
		title: 'Component Composition Patterns in React That Actually Scale',
		image: 'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1773183818/bp-portfolio/images/articles/component-composition-patterns-in-react-that-actually-scale/cover-C-sop.png',
		link: 'https://brandonperfetti.com/articles/component-composition-patterns-in-react-that-actually-scale',
	},
] satisfies BlogPost[];

/**
 * Curated bookmarks shown in Safari bookmark menus.
 */
const safariBookmarks = [
	{
		id: 1,
		category: 'Portfolio',
		title: "Brandon's Portfolio",
		url: 'https://brandonperfetti.com',
	},
	{
		id: 2,
		category: 'Portfolio',
		title: "Brandon's Articles",
		url: 'https://brandonperfetti.com/articles',
	},
	{
		id: 3,
		category: 'Content',
		title: 'Latest Blog Post',
		url: blogPosts[0]?.link ?? 'https://brandonperfetti.com/articles',
	},
	{
		id: 4,
		category: 'Learning',
		title: 'JS Mastery',
		url: 'https://jsmastery.com',
	},
	{
		id: 5,
		category: 'Learning',
		title: 'Epic Web',
		url: 'https://www.epicweb.dev',
	},
	{
		id: 6,
		category: 'Social',
		title: 'GitHub',
		url: 'https://github.com/brandonperfetti',
	},
	{
		id: 7,
		category: 'Social',
		title: 'LinkedIn',
		url: 'https://www.linkedin.com/in/brandonperfetti/',
	},
] satisfies SafariBookmark[];

/**
 * Tech stack grouped by category.
 */
const techStack = [
	{
		category: 'Frontend',
		items: ['React', 'JavaScript', 'TypeScript'],
	},
	{
		category: 'Framework',
		items: ['Next.js', 'Nuxt', 'Remix', 'React Router'],
	},
	{
		category: 'Mobile',
		items: ['React Native', 'Expo'],
	},
	{
		category: 'Styling',
		items: ['Tailwind CSS', 'Headless UI', 'shadcn/ui'],
	},
	{
		category: 'Backend',
		items: ['Node.js', 'Express.js'],
	},
	{
		category: 'Data',
		items: ['PostgreSQL', 'MongoDB', 'Prisma', 'GraphQL'],
	},
	{
		category: 'Testing',
		items: ['Vitest', 'Playwright', 'Testing Library'],
	},
	{
		category: 'Tooling',
		items: ['Vite', 'NPM', 'Vercel', 'Zod'],
	},
	{
		category: 'AI',
		items: ['OpenAI', 'AI SDK', 'MCP'],
	},
] satisfies TechStackCategory[];

/**
 * Social links with icon and accent color.
 */
const socials = [
	{
		id: 1,
		text: 'Github',
		icon: '/icons/github.svg',
		bg: '#f4656b',
		link: 'https://github.com/brandonperfetti',
	},
	{
		id: 2,
		text: 'Website',
		icon: '/icons/atom.svg',
		bg: '#4bcb63',
		link: 'https://brandonperfetti.com/',
	},
	{
		id: 3,
		text: 'Twitter/X',
		icon: '/icons/twitter.svg',
		bg: '#ff866b',
		link: 'https://x.com/brandonperfetti',
	},
	{
		id: 4,
		text: 'LinkedIn',
		icon: '/icons/linkedin.svg',
		bg: '#05b6f6',
		link: 'https://www.linkedin.com/in/brandonperfetti/',
	},
] satisfies SocialLink[];

/** Certification cards shown in Photos and Finder > Photos. */
const ISSUER_URLS = {
	'JS Mastery': 'https://jsmastery.com/all-courses',
	'AI Hero': 'https://www.aihero.dev',
	'Epic AI': 'https://www.epicai.pro/',
	'Epic Web': 'https://www.epicweb.dev',
	'Testing Accessibility': 'https://testingaccessibility.com/',
	'Total TypeScript': 'https://www.totaltypescript.com',
	'Mastering Nuxt': 'https://masteringnuxt.com',
} as const;

/** Certification cards shown in Photos and Finder > Photos. */
const GALLERY_IMAGES = [
	{
		title: 'Database Mastery: SQL to Prisma',
		issuer: 'JS Mastery',
		issuerUrl: ISSUER_URLS['JS Mastery'],
		category: 'Data',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1771694012/bp-portfolio/certificates/database_mastery__sql_to_prisma_pzizqg.png',
	},
	{
		title: 'Vanilla Three.js Course',
		issuer: 'JS Mastery',
		issuerUrl: ISSUER_URLS['JS Mastery'],
		category: 'Frontend',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1771694541/bp-portfolio/certificates/vanilla_threejs_course_vnkbkr.png',
	},
	{
		title: 'The Complete Next.js Testing Course',
		issuer: 'JS Mastery',
		issuerUrl: ISSUER_URLS['JS Mastery'],
		category: 'Testing',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1771693734/bp-portfolio/certificates/next_js_testing_course_fbv4hr.png',
	},
	{
		title: 'Build Your Own AI Personal Assistant in TypeScript',
		issuer: 'AI Hero',
		issuerUrl: ISSUER_URLS['AI Hero'],
		category: 'AI',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1767218650/bp-portfolio/certificates/certificate-build-your-own-ai-personal-assistant-in-typescript_xeycuc.png',
	},
	{
		title: 'AI SDK v6 Crash Course',
		issuer: 'AI Hero',
		issuerUrl: ISSUER_URLS['AI Hero'],
		category: 'AI',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1773507613/bp-portfolio/certificates/certificate-ai-sdk-v6-crash-course_qvdane.png',
	},
	{
		title: 'AI SDK v5 Crash Course',
		issuer: 'AI Hero',
		issuerUrl: ISSUER_URLS['AI Hero'],
		category: 'AI',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1766426483/bp-portfolio/certificates/certificate-ai-sdk-v5-crash-course_vxiaeb.png',
	},
	{
		title: 'Master the Model Context Protocol (MCP)',
		issuer: 'Epic AI',
		issuerUrl: ISSUER_URLS['Epic AI'],
		category: 'AI',
		imageUrl:
			'https://res.cloudinary.com/epic-web/image/upload/v1762115259/certificate/8414cfa5-7b49-4e55-a96a-086fa37d18a2/master-mcp.png',
	},
	{
		title: 'Web Animations Full Course | Build a GTA VI Website',
		issuer: 'JS Mastery',
		issuerUrl: ISSUER_URLS['JS Mastery'],
		category: 'Frontend',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1771692163/bp-portfolio/certificates/Web_Animations_Full_Course_Certificate_of_Completion_bqys2q.png',
	},
	{
		title: 'React Mastery Course',
		issuer: 'JS Mastery',
		issuerUrl: ISSUER_URLS['JS Mastery'],
		category: 'Frontend',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1771692294/bp-portfolio/certificates/react_mastery_credential_8c81ab912013_yaealb.png',
	},
	{
		title: 'Complete Path to JavaScript Mastery',
		issuer: 'JS Mastery',
		issuerUrl: ISSUER_URLS['JS Mastery'],
		category: 'Frontend',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1771692518/bp-portfolio/certificates/javascript_mastery_credential_b48745132172_sshu2y.png',
	},
	{
		title: 'Ultimate Next.js 16 Course',
		issuer: 'JS Mastery',
		issuerUrl: ISSUER_URLS['JS Mastery'],
		category: 'Framework',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1773607786/bp-portfolio/certificates/Screenshot_2026-03-15_at_1.48.54_PM_po03cr.png',
	},
	{
		title: 'Pixel Perfect Figma to Tailwind',
		issuer: 'Epic Web',
		issuerUrl: ISSUER_URLS['Epic Web'],
		category: 'Styling',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1721494219/bp-portfolio/certificates/pixel_perfect_figma_to_tailwind_certificate_tr1xmb.png',
	},
	{
		title: 'Web Application Testing',
		issuer: 'Epic Web',
		issuerUrl: ISSUER_URLS['Epic Web'],
		category: 'Testing',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1720292710/bp-portfolio/certificates/web_application_testing_certificate_qmjfhw.png',
	},
	{
		title: 'Authentication Strategies & Implementation',
		issuer: 'Epic Web',
		issuerUrl: ISSUER_URLS['Epic Web'],
		category: 'Backend',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1720206232/bp-portfolio/certificates/authentication_stratigies_and_implementaton_certificate_rkeouz.png',
	},
	{
		title: "Beginner's TypeScript",
		issuer: 'Total TypeScript',
		issuerUrl: ISSUER_URLS['Total TypeScript'],
		category: 'Frontend',
		imageUrl:
			'https://res.cloudinary.com/total-typescript/image/upload/v1720118515/certificate/0faea01f-d145-438b-a152-fb7d16d9c1f2/beginners-typescript.png',
	},
	{
		title: 'Full Stack Foundations',
		issuer: 'Epic Web',
		issuerUrl: ISSUER_URLS['Epic Web'],
		category: 'Backend',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1720119864/bp-portfolio/certificates/full_stack_foundations_certificate_ejbfkz.png',
	},
	{
		title: 'Certified Nuxt Master',
		issuer: 'Mastering Nuxt',
		issuerUrl: ISSUER_URLS['Mastering Nuxt'],
		category: 'Framework',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1721776224/bp-portfolio/certificates/mastering_nuxt_3_certificate-1_olinr6.png',
	},
	{
		title: 'Automated Accessibility Testing',
		issuer: 'Testing Accessibility',
		issuerUrl: ISSUER_URLS['Testing Accessibility'],
		category: 'Accessibility',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1721666251/bp-portfolio/certificates/automated_accessibility_testing_certificate_raqncm.png',
	},
	{
		title: 'Coding Accessible Interactions and Mechanics',
		issuer: 'Testing Accessibility',
		issuerUrl: ISSUER_URLS['Testing Accessibility'],
		category: 'Accessibility',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1721593308/bp-portfolio/certificates/coding_accessible_interactions_and_mechanics_certificate_wzsxnq.png',
	},
	{
		title: 'Semantic Markup with HTML and ARIA',
		issuer: 'Testing Accessibility',
		issuerUrl: ISSUER_URLS['Testing Accessibility'],
		category: 'Accessibility',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1720464148/bp-portfolio/certificates/semantic_markup_with_html_and_aria_certificate_wyv5kd.png',
	},
	{
		title: 'Manual Accessibility Testing',
		issuer: 'Testing Accessibility',
		issuerUrl: ISSUER_URLS['Testing Accessibility'],
		category: 'Accessibility',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1720392568/bp-portfolio/certificates/manual_accessibility_testing_certificate_syvdha.png',
	},
	{
		title: 'Design Thinking & People Skills for Accessibility',
		issuer: 'Testing Accessibility',
		issuerUrl: ISSUER_URLS['Testing Accessibility'],
		category: 'Accessibility',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1720111969/bp-portfolio/certificates/design_thinking_and_people_skills_for_accessibility_certificate_abp4v5.png',
	},
	{
		title: 'Foundations of Accessibility',
		issuer: 'Testing Accessibility',
		issuerUrl: ISSUER_URLS['Testing Accessibility'],
		category: 'Accessibility',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1719868110/bp-portfolio/certificates/accessibility_foundations_certificate_ekfgs6.png',
	},
	{
		title: 'Data Modeling Deep Dive',
		issuer: 'Epic Web',
		issuerUrl: ISSUER_URLS['Epic Web'],
		category: 'Data',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1721776360/bp-portfolio/certificates/data_modeling_deep_dive_certificate_bwbcjg.png',
	},
	{
		title: 'Professional Web Forms',
		issuer: 'Epic Web',
		issuerUrl: ISSUER_URLS['Epic Web'],
		category: 'Frontend',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1720119970/bp-portfolio/certificates/professional_web_forms_certificate_uti04p.png',
	},
	{
		title: 'Testing Fundamentals',
		issuer: 'Epic Web',
		issuerUrl: ISSUER_URLS['Epic Web'],
		category: 'Testing',
		imageUrl:
			'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1720119864/bp-portfolio/certificates/testing_fundamentals_certificate_vt6ntr.png',
	},
] as const;

/**
 * Finder icon positions for photos root.
 * Layout is designed for 4 tiles; extra images reuse slots.
 */
const GALLERY_POSITIONS = [
	'top-10 left-10',
	'top-10 left-56',
	'top-56 left-10',
	'top-56 left-56',
] as const;

/**
 * Gallery image tiles for the Photos window.
 */
const gallery = GALLERY_IMAGES.map((img, index) => ({
	id: index + 1,
	title: img.title,
	issuer: img.issuer,
	issuerUrl: img.issuerUrl,
	category: img.category,
	img: img.imageUrl,
})) satisfies GalleryItem[];

/** Avatar URL shown in the Contact window. */
const CONTACT_AVATAR_URL =
	'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1683142617/bp-spotlight/images/avatar_jeycju.jpg';

/** Primary email shown in the Contact window. */
const CONTACT_EMAIL = 'info@brandonperfetti.com';

export {
	blogPosts,
	CONTACT_AVATAR_URL,
	CONTACT_EMAIL,
	dockApps,
	gallery,
	navIcons,
	navLinks,
	safariBookmarks,
	socials,
	techStack,
};

/**
 * Finder root: Work projects and related assets.
 */
const WORK_LOCATION = {
	id: 1,
	type: 'work',
	name: 'Work',
	icon: '/icons/work.svg',
	kind: 'folder',
	scope: 'root',
	children: [
		// ▶ Project 1
		{
			id: 5,
			name: "Brandon Perfetti's Portfolio",
			icon: '/images/folder.png',
			kind: 'folder',
			scope: 'nested',
			position: 'top-8 left-12', // icon position inside Finder
			windowPosition: 'top-[5.25rem] right-8', // optional: Finder window position
			children: [
				{
					id: 1,
					name: 'Portfolio Platform Project.txt',
					icon: '/images/txt.png',
					kind: 'file',
					fileType: 'txt',
					position: 'top-5 left-10',
					description: [
						'Source code for my personal site and content platform.',
						'It powers my portfolio experience, projects showcase, and publishing workflow.',
						'The platform is optimized for performance, accessibility, and a clean editorial reading experience.',
						'It is designed as both a public-facing brand surface and a technical sandbox for ongoing experimentation.',
					],
				},
				{
					id: 2,
					name: 'brandonperfetti.com',
					icon: '/images/safari.png',
					kind: 'file',
					fileType: 'url',
					href: 'https://brandonperfetti.com/',
					position: 'top-10 right-20',
				},
				{
					id: 4,
					name: 'brandonperfetti-portfolio.png',
					icon: '/images/image.png',
					kind: 'file',
					fileType: 'img',
					position: 'top-52 right-80',
					imageUrl:
						'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1773625480/project-brandon-portfolio.png',
				},
				{
					id: 5,
					name: 'Source Code.url',
					icon: '/images/plain.png',
					kind: 'file',
					fileType: 'url',
					href: 'https://github.com/brandonperfetti/bp-portfolio',
					position: 'top-60 right-20',
				},
			],
		},

		// ▶ Project 2
		{
			id: 6,
			name: 'macOS Portfolio',
			icon: '/images/folder.png',
			kind: 'folder',
			scope: 'nested',
			position: 'top-8 left-72',
			windowPosition: 'top-[17.75rem] right-8',
			children: [
				{
					id: 1,
					name: 'macOS Portfolio Project.txt',
					icon: '/images/txt.png',
					kind: 'file',
					fileType: 'txt',
					position: 'top-5 right-10',
					description: [
						'Interactive macOS-inspired portfolio experience built with React, TypeScript, GSAP, Zustand, and Tailwind CSS.',
						'It recreates familiar desktop and mobile window interactions to present projects, certifications, and content.',
						'The experience balances playful interface design with practical performance and accessibility considerations.',
						'This project serves as both a personal showcase and a systems-thinking exercise in front-end architecture.',
					],
				},
				{
					id: 2,
					name: 'macos.brandonperfetti.com',
					icon: '/images/safari.png',
					kind: 'file',
					fileType: 'url',
					href: 'https://macos.brandonperfetti.com/',
					position: 'top-20 left-20',
				},
				{
					id: 4,
					name: 'macos-portfolio.png',
					icon: '/images/image.png',
					kind: 'file',
					fileType: 'img',
					position: 'top-52 left-80',
					imageUrl:
						'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1773624811/project-macos-portfolio.png',
				},
				{
					id: 5,
					name: 'Source Code.url',
					icon: '/images/plain.png',
					kind: 'file',
					fileType: 'url',
					href: 'https://github.com/brandonperfetti/macos-portfolio',
					position: 'top-60 left-5',
				},
			],
		},

		// ▶ Project 3
		{
			id: 7,
			name: 'Sans Faux Studios',
			icon: '/images/folder.png',
			kind: 'folder',
			scope: 'nested',
			position: 'top-36 left-12',
			windowPosition: 'top-[30.25rem] right-8',
			children: [
				{
					id: 1,
					name: 'Sans Faux Studios Project.txt',
					icon: '/images/txt.png',
					kind: 'file',
					fileType: 'txt',
					position: 'top-5 left-10',
					description: [
						'A web studio focused on modern product websites and apps.',
						'The site communicates a clear studio identity with streamlined service messaging and polished visuals.',
						'It emphasizes responsive design, brand consistency, and conversion-friendly information architecture.',
						'The project reflects a practical approach to balancing storytelling, trust signals, and technical execution.',
					],
				},
				{
					id: 2,
					name: 'sansfaux.com',
					icon: '/images/safari.png',
					kind: 'file',
					fileType: 'url',
					href: 'https://sansfaux.com/',
					position: 'top-10 right-20',
				},
				{
					id: 4,
					name: 'sans-faux-studios.png',
					icon: '/images/image.png',
					kind: 'file',
					fileType: 'img',
					position: 'top-52 right-80',
					imageUrl:
						'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1773624812/project-sans-faux-studios.png',
				},
			],
		},

		// ▶ Project 4
		{
			id: 8,
			name: 'Top Timelines',
			icon: '/images/folder.png',
			kind: 'folder',
			scope: 'nested',
			position: 'top-36 left-72',
			windowPosition: 'top-[36.5rem] right-8',
			children: [
				{
					id: 1,
					name: 'Top Timelines Project.txt',
					icon: '/images/txt.png',
					kind: 'file',
					fileType: 'txt',
					position: 'top-5 left-10',
					description: [
						'Event timelines made simple for teams and organizations.',
						'The product focuses on clear scheduling visibility and approachable planning workflows.',
						'Its UX is designed to reduce timeline friction and make cross-team coordination easier.',
						'This project highlights practical product design with polished front-end execution.',
					],
				},
				{
					id: 2,
					name: 'toptimelines.com',
					icon: '/images/safari.png',
					kind: 'file',
					fileType: 'url',
					href: 'https://toptimelines.com/',
					position: 'top-10 right-20',
				},
				{
					id: 4,
					name: 'top-timelines.png',
					icon: '/images/image.png',
					kind: 'file',
					fileType: 'img',
					position: 'top-52 right-80',
					imageUrl:
						'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1773625484/project-top-timelines.png',
				},
			],
		},

		// ▶ Project 5
		{
			id: 9,
			name: 'Dev Flow',
			icon: '/images/folder.png',
			kind: 'folder',
			scope: 'nested',
			position: 'top-64 left-12',
			windowPosition: 'top-[11.5rem] right-8',
			children: [
				{
					id: 1,
					name: 'Dev Flow Project.txt',
					icon: '/images/txt.png',
					kind: 'file',
					fileType: 'txt',
					position: 'top-5 left-10',
					description: [
						'A Stack Overflow style question-and-answer platform.',
						'It is built around discoverability, practical developer workflows, and community-style interaction.',
						'The application emphasizes scalable front-end patterns and clean, focused information architecture.',
						'This project demonstrates a production-minded approach to full-stack product delivery.',
					],
				},
				{
					id: 2,
					name: 'devflow-coral2.vercel.app',
					icon: '/images/safari.png',
					kind: 'file',
					fileType: 'url',
					href: 'https://devflow-coral2.vercel.app/',
					position: 'top-10 right-20',
				},
				{
					id: 4,
					name: 'dev-flow.png',
					icon: '/images/image.png',
					kind: 'file',
					fileType: 'img',
					position: 'top-52 right-80',
					imageUrl:
						'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1773625484/project-dev-flow.png',
				},
				{
					id: 5,
					name: 'Source Code.url',
					icon: '/images/plain.png',
					kind: 'file',
					fileType: 'url',
					href: 'https://github.com/brandonperfetti/next-stack-overflow',
					position: 'top-60 right-20',
				},
			],
		},

		// ▶ Project 6
		{
			id: 10,
			name: 'Filmpire',
			icon: '/images/folder.png',
			kind: 'folder',
			scope: 'nested',
			position: 'top-64 left-72',
			windowPosition: 'top-[24rem] right-8',
			children: [
				{
					id: 1,
					name: 'Filmpire Project.txt',
					icon: '/images/txt.png',
					kind: 'file',
					fileType: 'txt',
					position: 'top-5 left-10',
					description: [
						'A media experience for exploring and tracking movies.',
						'The app focuses on discovery, rich browsing, and visually engaging content presentation.',
						'Its UX blends entertainment-first design with practical filtering and navigation patterns.',
						'This project showcases API-driven interfaces and immersive front-end implementation.',
					],
				},
				{
					id: 2,
					name: 'filmpire-beta.vercel.app',
					icon: '/images/safari.png',
					kind: 'file',
					fileType: 'url',
					href: 'https://filmpire-beta.vercel.app/',
					position: 'top-10 right-20',
				},
				{
					id: 4,
					name: 'filmpire.png',
					icon: '/images/image.png',
					kind: 'file',
					fileType: 'img',
					position: 'top-52 right-80',
					imageUrl:
						'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1773625485/project-filmpire.png',
				},
				{
					id: 5,
					name: 'Source Code.url',
					icon: '/images/plain.png',
					kind: 'file',
					fileType: 'url',
					href: 'https://github.com/brandonperfetti/filmpire',
					position: 'top-60 right-20',
				},
			],
		},
	],
} as const satisfies FinderLocation;

/**
 * Finder root: About me content.
 */
const ABOUT_LOCATION = {
	id: 2,
	type: 'about',
	name: 'About me',
	icon: '/icons/info.svg',
	kind: 'folder',
	scope: 'root',
	children: [
		{
			id: 1,
			name: 'about-me.txt',
			icon: '/images/txt.png',
			kind: 'file',
			fileType: 'txt',
			position: 'top-10 left-10',
			subtitle:
				'Senior Frontend Engineer • Frontend-first Full-Stack Engineer',
			image: 'https://res.cloudinary.com/dgwdyrmsn/image/upload/v1773617050/MacOS%20Portfolio/Photos/IMG_2148_lddqgw_c_crop_ar_3_4_skdads.webp',
			description: [
				"I'm Brandon Perfetti, a senior frontend-focused software engineer with 10+ years across SaaS product delivery, web architecture, and systems integration.",
				'I specialize in TypeScript applications, scalable React and Next.js UI architecture, and practical full-stack execution with GraphQL, SQL, and API integration patterns.',
				'At Brytecore, I build and evolve core web platform experiences for real estate brokerages across North America, partnering across engineering, product, design, and client stakeholders to ship maintainable, high-impact outcomes.',
				'I am increasingly focused on AI-enabled engineering workflows, including AI SDK and MCP-based integrations, to improve delivery quality, automation, and operational clarity.',
				'My approach combines frontend excellence, accessibility-first implementation, and product-minded systems thinking so teams can move faster without sacrificing long-term maintainability.',
			],
		},
		{
			id: 2,
			name: 'highlights.txt',
			icon: '/images/txt.png',
			kind: 'file',
			fileType: 'txt',
			position: 'top-10 left-52',
			subtitle: 'Core Competencies • Current Focus • Delivery Strengths',
			description: [
				'Core competencies: TypeScript, React, Next.js, Tailwind CSS, component architecture, GraphQL, SQL, APIs, authentication and integration workflows.',
				'Current focus: AI-enabled engineering workflows using AI SDK and MCP-based integrations to improve speed, reliability, and operational clarity.',
				'Professional strengths: translating ambiguous product goals into shippable systems, improving delivery quality, and building maintainable software that scales with teams.',
				'Role context: Senior Frontend Developer at Brytecore, building and evolving platform experiences for real estate brokerages across North America.',
				'Working style: frontend excellence + full-stack systems thinking + practical cross-functional execution.',
			],
		},
	],
} as const satisfies FinderLocation;

/**
 * Finder root: Resume files (pdf or external links).
 */
const RESUME_LOCATION = {
	id: 3,
	type: 'resume',
	name: 'Resume',
	icon: '/icons/file.svg',
	kind: 'folder',
	scope: 'root',
	children: [
		{
			id: 1,
			name: 'Resume.pdf',
			icon: '/images/pdf.png',
			kind: 'file',
			fileType: 'pdf',
			// you can add `href` if you want to open a hosted resume
			// href: "/your/resume/path.pdf",
		},
	],
} as const satisfies FinderLocation;

/**
 * Finder root: Photos gallery files.
 */
const PHOTOS_LOCATION = {
	id: 4,
	type: 'photos',
	name: 'Certifications',
	icon: '/icons/file.svg',
	kind: 'folder',
	scope: 'root',
	children: GALLERY_IMAGES.map((certificate, index) => ({
		id: index + 1,
		name: certificate.title,
		subtitle: certificate.issuer,
		issuerUrl: certificate.issuerUrl,
		category: certificate.category,
		icon: '/images/image.png',
		kind: 'file',
		fileType: 'img',
		position: GALLERY_POSITIONS[index % GALLERY_POSITIONS.length],
		imageUrl: certificate.imageUrl,
	})),
} as const satisfies FinderLocation;

/**
 * Finder root: Trash items (non-openable by default).
 */
const TRASH_LOCATION = {
	id: 5,
	type: 'trash',
	name: 'Trash',
	icon: '/icons/trash.svg',
	kind: 'folder',
	scope: 'root',
	children: [
		{
			id: 1,
			name: 'trash1.png',
			icon: '/images/image.png',
			kind: 'file',
			fileType: 'img',
			position: 'top-10 left-10',
			imageUrl: '/images/trash-1.png',
		},
		{
			id: 2,
			name: 'trash2.png',
			icon: '/images/image.png',
			kind: 'file',
			fileType: 'img',
			position: 'top-40 left-80',
			imageUrl: '/images/trash-2.png',
		},
	],
} as const satisfies FinderLocation;

/**
 * Finder root map by location key.
 */
export const locations = {
	work: WORK_LOCATION,
	about: ABOUT_LOCATION,
	resume: RESUME_LOCATION,
	photos: PHOTOS_LOCATION,
	trash: TRASH_LOCATION,
} as const satisfies LocationsMap;

interface HomeItemRef {
	location: LocationType;
	// Path of node IDs from the location root to the item to render on Home.
	path: number[];
}

const homeItemRefs = [
	{ location: 'work', path: [5] },
	{ location: 'work', path: [9] },
	{ location: 'work', path: [10] },
	{ location: 'work', path: [6] },
	{ location: 'work', path: [7] },
	{ location: 'work', path: [8] },
] satisfies HomeItemRef[];

const resolveHomeItem = ({
	location,
	path,
}: HomeItemRef): FinderNode | null => {
	let current: FinderNode = locations[location];

	for (const nodeId of path) {
		if (current.kind !== 'folder') return null;
		const next: FinderNode | undefined = current.children.find(
			(child: FinderNode) => child.id === nodeId,
		);
		if (!next) return null;
		current = next;
	}

	return current;
};

/** Curated Finder nodes rendered as desktop shortcuts on Home. */
export const homeItems = homeItemRefs
	.map((ref, index) => {
		const item = resolveHomeItem(ref);
		if (!item) {
			console.warn('Invalid home item reference', { index, ref });
		}
		return item;
	})
	.filter((item): item is FinderNode => item !== null);

/**
 * Baseline z-index for unfocused windows.
 */
const INITIAL_Z_INDEX = 1000;

/**
 * Initial window state for all supported window ids.
 */
const WINDOW_CONFIG: WindowConfig = {
	finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
	contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
	resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
	safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
	photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
	terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
	txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
	imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
