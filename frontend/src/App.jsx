import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/" exact>
						<HomePage />
					</Route>
					<Route path="/login">
						<LoginPage />
					</Route>
					<Route path="/signup">
						<SignupPage />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
