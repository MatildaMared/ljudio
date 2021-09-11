import React from "react";
import { useHistory } from "react-router-dom";

function Header() {
	const history = useHistory();
	
	function logoutHandler() {
		localStorage.removeItem("token");
		history.push("/login");
	}

	return (
		<header>
			<h1>Ljudio</h1>
			<button onClick={logoutHandler}>Log Out</button>
		</header>
	);
}

export default Header;
