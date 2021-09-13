import React, { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
	const [context, setContext] = useState({
		nowPlayingIndex: null,
		queue: [],
		fetchResult: null,
		resultType: null,
		isLoading: false,
		searchString: "",
	});

	const [userContext] = useContext(UserContext);
	const history = useHistory();

	useEffect(() => {
		console.log(context);
	}, [context]);

	// Makes sure, with every update to the state,
	// that the user is still logged in
	useEffect(() => {
		if (context.isAuthenticated === false || !localStorage.getItem("token")) {
			history.push("/login");
		}
	}, [context]);

	function updateContext(updates) {
		setContext((prevState) => {
			return {
				...prevState,
				...updates,
			};
		});
	}

	const value = [context, updateContext];

	return (
		<MusicContext.Provider value={value}>{children}</MusicContext.Provider>
	);
};
