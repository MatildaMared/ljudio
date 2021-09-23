import React, { createContext, useState, useEffect } from "react";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
	const [context, setContext] = useState({
		nowPlayingIndex: null,
		queue: [],
		fetchResult: null,
		resultType: null,
		isLoading: false,
		searchString: "",
		resetPlayer: false,
	});

	useEffect(() => {
		console.log("queue is: ", context.queue);
		console.log("nowPlayingIndex is: ", context.nowPlayingIndex);
	}, [context.queue, context.nowPlayingIndex]);

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
