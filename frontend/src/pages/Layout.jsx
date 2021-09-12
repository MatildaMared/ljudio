import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Player from "../components/Player";

function Layout({ component: Component }) {
	return (
		<div className="App">
			<Header />
			<div className="content-wrapper">
				<Navigation />
				<main className="main">
					<Component />
					<Player />
				</main>
			</div>
			<Footer />
		</div>
	);
}

export default Layout;
