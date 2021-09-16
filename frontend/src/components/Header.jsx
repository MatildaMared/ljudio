import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./../context/UserContext";

function Header() {
	const history = useHistory();
	const [userContext, updateUserContext] = useContext(UserContext);

	function logoutHandler() {
		localStorage.removeItem("token");
		updateUserContext({
			isAuthenticated: null,
			user: {},
		});
		history.push("/login");
	}

	return (
		<header className="header">
			<h1 className="header__heading">Ljudio</h1>
			{/* <button onClick={logoutHandler}>Log Out</button> */}
		</header>
	);
}

export default Header;
