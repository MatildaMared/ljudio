import React, { createContext, useState } from "react";

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
	const [context, setContext] = useState({
    showSmallDeviceMenu: false,
    showPlayerOnSmallDevice: false,
	});

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
		<LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
	);
};
