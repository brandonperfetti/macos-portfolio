import { gsap } from '#lib';
import { useGSAP } from '@gsap/react';
import type { ReactElement } from 'react';
import { useRef } from 'react';

interface RenderTextProps {
	text: string;
	className: string;
	baseWeight?: number;
}

/**
 * Renders a string as individual spans to enable per-letter animation.
 */
const renderText = ({ text, className, baseWeight = 400 }: RenderTextProps) => {
	const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
	const segments = Array.from(
		segmenter.segment(text),
		(segment) => segment.segment,
	);

	return segments.map((char, index) => {
		const isSpace = char === ' ';

		return (
			<span
				key={index}
				className={className}
				aria-hidden="true"
				style={{
					fontVariationSettings: `"wght" ${String(baseWeight)}`,
				}}
			>
				{/* Preserve spaces with non-breaking space */}
				{isSpace ? '\u00A0' : char}
			</span>
		);
	});
};

const FONT_WEIGHTS = {
	title: { min: 400, max: 900, default: 400 },
	subtitle: { min: 100, max: 400, default: 100 },
};

interface SetupTextHoverProps {
	container: HTMLElement | null;
	type: 'title' | 'subtitle';
}

interface AnimateLetterProps {
	letter: HTMLElement;
	weight: number;
	duration?: number;
}

/**
 * Binds hover-driven font weight animation to a container's letter spans.
 */
const setupTextHover = ({ container, type }: SetupTextHoverProps) => {
	if (!container) return;
	const letters = container.querySelectorAll('span');
	const { min, max, default: base } = FONT_WEIGHTS[type];

	const animateLetter = ({
		letter,
		weight,
		duration = 0.25,
	}: AnimateLetterProps) => {
		return gsap.to(letter, {
			duration,
			ease: 'power2.out',
			fontVariationSettings: `"wght" ${String(weight)}`,
		});
	};

	const handleMouseMove = (e: MouseEvent) => {
		const { left } = container.getBoundingClientRect();
		const mouseX = e.clientX - left;

		letters.forEach((letter) => {
			const { left: l, width: w } = letter.getBoundingClientRect();
			const distance = Math.abs(mouseX - (l - left + w / 2));
			// Gaussian falloff keeps the weight change smooth near the cursor.
			const intensity = Math.exp(-(distance ** 2 / 20000));

			animateLetter({ letter, weight: min + (max - min) * intensity });
		});
	};

	const handleMouseLeave = () => {
		letters.forEach((letter) => {
			animateLetter({ letter, weight: base, duration: 0.3 });
		});
	};

	container.addEventListener('mousemove', handleMouseMove);
	container.addEventListener('mouseleave', handleMouseLeave);

	return () => {
		container.removeEventListener('mousemove', handleMouseMove);
		container.removeEventListener('mouseleave', handleMouseLeave);
	};
};

/**
 * Welcome hero with GSAP-driven variable font hover effect.
 */
export const Welcome = (): ReactElement => {
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);

	useGSAP(() => {
		const titleCleanup = setupTextHover({
			container: titleRef.current,
			type: 'title',
		});
		const subtitleCleanup = setupTextHover({
			container: subtitleRef.current,
			type: 'subtitle',
		});

		return () => {
			titleCleanup?.();
			subtitleCleanup?.();
		};
	}, []);

	return (
		<section id="welcome">
			<p ref={subtitleRef} aria-label="Hey, I'm Brandon! Welcome to my">
				{renderText({
					text: "Hey, I'm Brandon! Welcome to my",
					className: 'text-3xl font-georama',
					baseWeight: 100,
				})}
			</p>
			<h1 ref={titleRef} className="mt-7" aria-label="Portfolio">
				{renderText({
					text: 'Portfolio',
					className: 'text-9xl italic font-georama',
					baseWeight: 400,
				})}
			</h1>
			<div className="small-screen">
				<p>
					This Portfolio is designed for desktop/tablet screens only.
				</p>
			</div>
		</section>
	);
};
