import React, { useContext } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Player from "../components/Player";
import { LayoutContext } from "../context/LayoutContext";

function Layout({ component: Component }) {
	const [layoutContext, updateLayoutContext] = useContext(LayoutContext);
	return (
		<>
			<Header />
			<div className={layoutContext.showPlayerOnSmallDevice ? "layout layout--extra-padding" : "layout"}>
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
