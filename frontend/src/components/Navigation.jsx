import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdHome, MdSearch, MdQueueMusic, MdList } from "react-icons/md";
import LogoutBtn from "./LogoutBtn";
import { LayoutContext } from "../context/LayoutContext";

function Navigation() {
	const [layoutContext, updateLayoutContext] = useContext(LayoutContext);
	const location = useLocation();

	return (
		<nav
			className={
				!layoutContext.showSmallDeviceMenu
					? "navigation"
					: "navigation navigation--show"
			}>
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
			<LogoutBtn />
		</nav>
	);
}

export default Navigation;
