import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import { UserProvider } from "./context/UserContext";
import { MusicProvider } from "./context/MusicContext";

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
		<>
			<Router>
				<UserProvider>
					<MusicProvider>
						<Switch>
							<PrivateRoute path="/" exact>
								<Layout component={HomePage} />
							</PrivateRoute>
							<PrivateRoute path="/search" exact>
								<Layout component={SearchPage} />
							</PrivateRoute>
							<PrivateRoute path="/playlists" exact>
								<Layout component={PlaylistsPage} />
							</PrivateRoute>
							<PrivateRoute path="/queue" exact>
								<Layout component={QueuePage} />
							</PrivateRoute>
							<Route path="/login">
								<LoginPage />
							</Route>
							<Route path="/signup">
								<SignupPage />
							</Route>
							<PrivateRoute path="/artist/:browseId">
								<Layout component={ArtistPage} />
							</PrivateRoute>
							<PrivateRoute path="/playlist/:playlistId">
								<Layout component={PlaylistPage} />
							</PrivateRoute>
						</Switch>
					</MusicProvider>
				</UserProvider>
			</Router>
		</>
	);
}

export default App;
