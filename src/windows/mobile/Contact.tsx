import { MobileWindowHeader } from '#components/mobile/WindowHeader';
import { CONTACT_AVATAR_URL, socials } from '#constants';
import { MobileWindowWrapper } from '#hoc';
import type { ReactElement } from 'react';

const MobileContact = (): ReactElement => {
	return (
		<>
			<MobileWindowHeader windowKey="contact" title="Contact" />
			<div className="content">
				<img
					src={CONTACT_AVATAR_URL}
					alt="Brandon Perfetti avatar"
					className="w-20 rounded-full"
				/>
				<h3>Let's Connect</h3>
				<p>
					Got an idea? A bug to squash? Or just want to talk tech?
					I&apos;m in.
				</p>
				<ul>
					{socials.map(({ id, bg, link, icon, text }) => (
						<li key={id} style={{ backgroundColor: bg }}>
							<a
								href={link}
								target="_blank"
								rel="noopener noreferrer"
								title={text}
							>
								<img src={icon} alt={text} className="size-5" />
								<p>{text}</p>
							</a>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

const MobileContactWindow = MobileWindowWrapper(MobileContact, 'contact');
export default MobileContactWindow;
