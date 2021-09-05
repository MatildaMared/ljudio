import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import Player from "../components/Player";

function HomePage() {
	const [context, updateContext] = useContext(UserContext);
	console.log(context);

	return (
		<div>
			<button
				onClick={() => {
					updateContext({ isAuthenticated: true });
				}}>
				Click to authenticate
			</button>
			<Player videoId="z4WCaWJgOqM" />
		</div>
	);
}

export default HomePage;
