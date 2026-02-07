import { Dock, Navbar, Welcome } from '#components';

/**
 * Root layout for the macOS-style portfolio.
 */
const App = () => {
	return (
		<main>
			<Navbar />
			<Welcome />
			<Dock />
		</main>
	);
};

export default App;
