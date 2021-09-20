import React, { useContext, useEffect } from "react";
import { UserContext } from "./../context/UserContext";
import { getUser } from "./../services/userService";

function HomePage() {
	const [userContext, updateUserContext] = useContext(UserContext);

	// useEffect(async () => {
	// 	setUserData();
	// }, []);

	// async function setUserData() {
	// 	const data = await getUser(localStorage.getItem("token"));
	// 	console.log("Data from useeffect is: ", data);
	// 	updateUserContext({
	// 		user: data,
	// 	});
	// }

	return (
		<div className="home-page">
			{userContext.user?.firstName && (
				<div>
					<h1 className="home-page__heading">
						Welcome back, {userContext.user?.firstName}! 👋
					</h1>
					<p>What music are you in the mood for today? 🥳</p>
				</div>
			)}
		</div>
	);
}

export default HomePage;
