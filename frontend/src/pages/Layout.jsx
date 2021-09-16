import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Player from "../components/Player";

function Layout({ component: Component }) {
	return (
		<>
			<Header />
			<div className="layout">
				<Navigation />
				<>
					<Component />
					<Player />
				</>
			</div>
			<Footer />
		</>
	);
}

export default Layout;
