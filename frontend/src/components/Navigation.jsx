import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
	return (
		<nav className="navigation">
			<h1>Menu</h1>
			<ul>
				<Link to="/">
					<li>
						Home
					</li>
				</Link>
				<Link to="/search">
					<li>
						Search
					</li>
				</Link>
				<Link to="/playlists">
					<li>
						Playlists
					</li>
				</Link>
				<Link to="/queue">
					<li>
						Queue
					</li>
				</Link>
			</ul>
		</nav>
	);
}

export default Navigation;
