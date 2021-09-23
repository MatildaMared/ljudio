import React from "react";
import MenuToggler from './MenuToggler';

function Header() {

	return (
		<header className="header">
			<h1 className="header__heading">Ljudio</h1>
			<MenuToggler />
		</header>
	);
}

export default Header;
