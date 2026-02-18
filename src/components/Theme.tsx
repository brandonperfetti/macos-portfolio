import { useThemeStore } from '#store';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '#components/ui/dropdown-menu';
import type { ThemeMode } from '#types';
import clsx from 'clsx';
import { Laptop, MoonIcon, SunIcon } from 'lucide-react';
import { useEffect, useRef, type ReactElement } from 'react';

const STORAGE_KEY = 'theme';

const Theme = (): ReactElement => {
	const { theme, setTheme } = useThemeStore();
	const didHydrateTheme = useRef(false);
	const shouldAnimateThemeSwitch = useRef(false);

	useEffect(() => {
		if (didHydrateTheme.current) return;
		didHydrateTheme.current = true;

		const savedTheme = localStorage.getItem(STORAGE_KEY);
		if (
			savedTheme === 'light' ||
			savedTheme === 'dark' ||
			savedTheme === 'system'
		) {
			if (savedTheme !== theme) {
				setTheme(savedTheme);
			}
		}
	}, [setTheme, theme]);

	useEffect(() => {
		const root = document.documentElement;
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const shouldAnimate = shouldAnimateThemeSwitch.current;
		shouldAnimateThemeSwitch.current = true;

		let timeoutId: number | null = null;
		if (shouldAnimate) {
			root.classList.add('theme-switching');
			timeoutId = window.setTimeout(() => {
				root.classList.remove('theme-switching');
			}, 280);
		}

		const applyTheme = () => {
			if (theme === 'light') {
				root.classList.remove('dark');
				localStorage.setItem(STORAGE_KEY, 'light');
				return;
			}
			if (theme === 'dark') {
				root.classList.add('dark');
				localStorage.setItem(STORAGE_KEY, 'dark');
				return;
			}
			if (media.matches) {
				root.classList.add('dark');
			} else {
				root.classList.remove('dark');
			}
			localStorage.setItem(STORAGE_KEY, 'system');
		};

		const handleSystemThemeChange = () => {
			if (theme === 'system') applyTheme();
		};

		applyTheme();
		media.addEventListener('change', handleSystemThemeChange);

		return () => {
			if (timeoutId !== null) {
				window.clearTimeout(timeoutId);
			}
			if (shouldAnimate) {
				root.classList.remove('theme-switching');
			}
			media.removeEventListener('change', handleSystemThemeChange);
		};
	}, [theme]);

	const selectTheme = (value: ThemeMode) => {
		setTheme(value);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className="theme-trigger"
					aria-label="Select theme mode"
				>
					<img
						src="/icons/mode.svg"
						className="icon dark:invert"
						alt="Theme"
					/>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="theme-items"
				sideOffset={8}
				align="end"
			>
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={() => {
							selectTheme('light');
						}}
						className={clsx(
							'theme-item',
							theme === 'light' && 'theme-item-active',
						)}
					>
						<SunIcon className="size-4" />
						Light
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => {
							selectTheme('dark');
						}}
						className={clsx(
							'theme-item',
							theme === 'dark' && 'theme-item-active',
						)}
					>
						<MoonIcon className="size-4" />
						Dark
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => {
							selectTheme('system');
						}}
						className={clsx(
							'theme-item',
							theme === 'system' && 'theme-item-active',
						)}
					>
						<Laptop className="size-4" />
						System
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Theme;
