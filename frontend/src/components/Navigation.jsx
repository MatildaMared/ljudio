import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
	return (
		<nav className="navigation">
			<h1>Menu</h1>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/search">Search</Link>
				</li>
				<li>
					<Link to="/playlists">Playlists</Link>
				</li>
				<li>Queue</li>
			</ul>
		</nav>
	);
}

export default Navigation;
