import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import { UserProvider } from "./context/UserContext";
import { MusicProvider } from "./context/MusicContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ArtistPage from "./pages/ArtistPage";

function App() {
	return (
		<div className="App">
			<Router>
				<UserProvider>
					<MusicProvider>
						<Switch>
							<PrivateRoute path="/" exact component={HomePage} />
							<Route path="/login" component={LoginPage} />
							<Route path="/signup" component={SignupPage} />
							<PrivateRoute path="/artist/:browseId" component={ArtistPage} />
						</Switch>
					</MusicProvider>
				</UserProvider>
			</Router>
		</div>
	);
}

export default App;
