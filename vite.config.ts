import type { Alias } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const rootDir = dirname(fileURLToPath(import.meta.url));
const aliases: Alias[] = [
	{
		// GSAP ships Draggable with uppercase filename; this alias prevents
		// Linux build failures when source imports lowercase path.
		find: /^gsap\/draggable$/,
		replacement: 'gsap/Draggable',
	},
	{
		find: '#components',
		replacement: resolve(rootDir, 'src/components'),
	},
	{
		find: '#constants',
		replacement: resolve(rootDir, 'src/constants'),
	},
	{
		find: '#hooks',
		replacement: resolve(rootDir, 'src/hooks'),
	},
	{
		find: '#store',
		replacement: resolve(rootDir, 'src/store'),
	},
	{
		find: '#hoc',
		replacement: resolve(rootDir, 'src/hoc'),
	},
	{
		find: '#lib',
		replacement: resolve(rootDir, 'src/lib'),
	},
	{
		find: '#windows',
		replacement: resolve(rootDir, 'src/windows'),
	},
	{
		find: '#types',
		replacement: resolve(rootDir, 'src/types'),
	},
];

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: aliases,
	},
});
