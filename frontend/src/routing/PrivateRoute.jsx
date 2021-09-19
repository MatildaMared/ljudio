import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import LoginPage from "../pages/LoginPage";

function PrivateRoute({ component: Component, layout: Layout, ...rest }) {
	const [userContext, updateUserContext] = useContext(UserContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				return localStorage.getItem("token") &&
					userContext.isAuthenticated === true && userContext.isLoading === false ? (
					<Layout component={Component} />
				) : (
					userContext.isLoading !== true && <div className="loginpage__wrapper">
						<h1 className="loginpage__alert">You need to be logged in to access this page</h1>
						<LoginPage />
					</div>
				);
			}}
		/>
	);
}

export default PrivateRoute;
