import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Player from "../components/Player";
import SearchBar from "../components/SearchBar";
import Result from "../components/Result";

function HomePage() {

	return (
		<div className="app">
			<Header />
			<main className="main">
				<SearchBar />
				<div className="content-wrapper">
				<Result />
				<Player videoId="z4WCaWJgOqM" />
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default HomePage;
