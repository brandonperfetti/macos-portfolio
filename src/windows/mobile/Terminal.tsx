import { MobileWindowHeader } from '#components/mobile/WindowHeader';
import { techStack } from '#constants';
import { MobileWindowWrapper } from '#hoc';
import { Check, ChevronRight, Flag } from 'lucide-react';
import type { ReactElement } from 'react';

const MobileTerminal = (): ReactElement => {
	return (
		<>
			<MobileWindowHeader windowKey="terminal" title="Terminal" />
			<div className="techstack">
				<p>
					<span className="font-bold">@brandon %</span> show tech
					stack
				</p>
				<ul className="content">
					{techStack.map(({ category, items }) => (
						<li key={category} className="flex flex-col">
							<div className="flex flex-row">
								<ChevronRight className="check" size={20} />
								<h3>{category}</h3>
							</div>
							<ul>
								{items.map((item, index) => (
									<li
										key={`${category}-${String(index)}-${item}`}
									>
										{item}
										{index < items.length - 1 ? ',' : ''}
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
				<div className="footnote">
					<p>
						<Check size={20} /> {techStack.length} of{' '}
						{techStack.length} stacks loaded successfully (100%)
					</p>
					<p className="text-black dark:text-white">
						<Flag size={15} fill="currentColor" /> Render time: 6ms
					</p>
				</div>
			</div>
		</>
	);
};

const MobileTerminalWindow = MobileWindowWrapper(MobileTerminal, 'terminal');
export default MobileTerminalWindow;
