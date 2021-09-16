import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdHome, MdSearch, MdQueueMusic, MdList } from "react-icons/md";

function Navigation() {
	const location = useLocation();
	console.log(location);
	return (
		<nav className="navigation">
			<ul className="navigation__list">
				<Link to="/" className="navigation__link">
					<li
						className={
							location.pathname === "/"
								? "navigation__item navigation__item--active"
								: "navigation__item"
						}>
						<MdHome className="navigation__icon" />
						<span className="navigation__text">Home</span>
					</li>
				</Link>
				<Link to="/search">
					<li
						className={
							location.pathname === "/search"
								? "navigation__item navigation__item--active"
								: "navigation__item"
						}>
						<MdSearch className="navigation__icon" />
						<span className="navigation__text">Search</span>
					</li>
				</Link>
				<Link to="/playlists">
					<li
						className={
							location.pathname === "/playlists"
								? "navigation__item navigation__item--active"
								: "navigation__item"
						}>
						<MdQueueMusic className="navigation__icon" />
						<span className="navigation__text">Playlists</span>
					</li>
				</Link>
				<Link to="/queue">
					<li
						className={
							location.pathname === "/queue"
								? "navigation__item navigation__item--active"
								: "navigation__item"
						}>
						<MdList className="navigation__icon" />
						<span className="navigation__text">Queue</span>
					</li>
				</Link>
			</ul>
		</nav>
	);
}

export default Navigation;
