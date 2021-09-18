import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import { UserProvider } from "./context/UserContext";
import { MusicProvider } from "./context/MusicContext";
import "./styles/style.scss";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SearchPage from "./pages/SearchPage";
import ArtistPage from "./pages/ArtistPage";
import Layout from "./pages/Layout";
import PlaylistsPage from './pages/PlaylistsPage';
import PlaylistPage from './pages/PlaylistPage';
import QueuePage from "./pages/QueuePage";

function App() {
	return (
		<div className="app">
			<Router>
				<UserProvider>
					<MusicProvider>
						<Switch>
							<PrivateRoute path="/" exact component={HomePage} layout={Layout} />
							<PrivateRoute path="/search" exact component={SearchPage} layout={Layout} />
							<PrivateRoute path="/playlists" exact component={PlaylistsPage} layout={Layout} />
							<PrivateRoute path="/queue" exact component={QueuePage} layout={Layout} />
							<Route path="/login" component={LoginPage} />
							<Route path="/signup" component={SignupPage} />
							<PrivateRoute path="/artist/:browseId" component={ArtistPage} layout={Layout} />
							<PrivateRoute path="/playlist/:playlistId" component={PlaylistPage} layout={Layout} />
						</Switch>
					</MusicProvider>
				</UserProvider>
			</Router>
		</div>
	);
}

export default App;
