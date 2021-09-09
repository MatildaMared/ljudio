import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUser } from "../services/userService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [context, setContext] = useState({
		isAuthenticated: null,
		user: {},
		fetchResult: null,
		nowPlaying: null,
	});

	useEffect(() => {
		console.log(context);
	}, [context.fetchResult]);

	const history = useHistory();

	// Tries to set user data on initial page load
	useEffect(() => {
		setUserData();
	}, []);

	// If the user is not authenticated,
	// redirect to Login page
	useEffect(() => {
		if (context.isAuthenticated === false) {
			history.push("/login");
		}
	}, [context.isAuthenticated]);

	async function setUserData() {
		try {
			// Get JWT token from local storage
			const token = localStorage.getItem("token");

			let user = null;

			// if there was a token, get user data from database
			if (token) {
				user = await getUser(token);

				// if the API call returned a user,
				// set isAuthenticated to true and
				// user equal to user object from database
				if (user) {
					updateContext({
						isAuthenticated: true,
						user,
					});

					// if the API call did not return a user,
					// set isAuthenticated to false
				} else {
					updateContext({
						isAuthenticated: false,
					});
				}
			}
		} catch (err) {
			console.log(err);
		}
	}

	function updateContext(updates) {
		setContext((prevState) => {
			return {
				...prevState,
				...updates,
			};
		});
	}

	const value = [context, updateContext];

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
