import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, layout: Layout, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) => {
				return localStorage.getItem("token") ? (
					<Layout component={Component} />
				) : (
					<Redirect to="/login" />
				);
			}}
		/>
	);
}

export default PrivateRoute;
