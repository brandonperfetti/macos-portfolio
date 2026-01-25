import { navIcons, navLinks } from '#constants';
import dayjs from 'dayjs';

const Navbar = () => {
	return (
		<nav>
			<div>
				<img src="/images/logo.svg" alt="logo" />
				<p className="font-bold">Brandon's Portfolio</p>

				<ul>
					{navLinks.map((item) => (
						<li key={item.id}>{item.name}</li>
					))}
				</ul>
			</div>

			<div>
				<ul>
					{navIcons.map(({ id, img }) => (
						<li key={id}>
							<img
								src={img}
								alt={`icon-${id}`}
								className="icon-hover"
							/>
						</li>
					))}
				</ul>
				<time>{dayjs().format('ddd MMM D h:mm A')}</time>
			</div>
		</nav>
	);
};

export default Navbar;
