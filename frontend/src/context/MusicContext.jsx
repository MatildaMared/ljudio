import React, { createContext, useState, useEffect } from "react";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
	const [context, setContext] = useState({
		nowPlaying: null,
		fetchResult: null,
		resultType: null,
	});

	useEffect(() => {
		console.log(context);
	}, [context.fetchResult]);

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
