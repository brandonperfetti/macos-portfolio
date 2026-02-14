import { WindowControls } from '#components';
import { CONTACT_AVATAR_URL, CONTACT_EMAIL, socials } from '#constants';
import { WindowWrapper } from '#hoc';

const Contact = () => {
	return (
		<>
			<div id="window-header">
				<WindowControls target="contact" />
				<h2>Contact Me</h2>
			</div>

			<div className="space-y-5 p-5">
				<img
					src={CONTACT_AVATAR_URL}
					alt="Brandon"
					className="w-20 rounded-full"
				/>

				<h3>Let's Connect</h3>
				<p>
					Got an idea? A bug to squash? Or just want to talk tech? I'm
					In!
				</p>
				<p>{CONTACT_EMAIL}</p>

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

const ContactWindow = WindowWrapper(Contact, 'contact');

export default ContactWindow;
