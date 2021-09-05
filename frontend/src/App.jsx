import React, { useContext } from "react";
import Player from "./components/Player";

import { UserContext } from "../context/UserContext";

function App() {
	const [context, updateContext] = useContext(UserContext);
	console.log(context);

	return (
		<div className="App">
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

export default App;
